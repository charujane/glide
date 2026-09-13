import { get, put } from "@vercel/blob";
import {
  createCipheriv,
  createHash,
  createHmac,
  createPrivateKey,
  diffieHellman,
  generateKeyPairSync,
  randomBytes,
  sign,
  timingSafeEqual,
  createPublicKey,
} from "node:crypto";

const STATE_PATH = "glide-checkins/state.json";
const VAPID_PATH = "glide-checkins/vapid.json";

export function validPin(value) {
  const expected = process.env.GLIDE_AUDIO_PIN || "";
  const supplied = String(value || "");
  return Boolean(expected) && supplied.length === expected.length && timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

export function endpointId(endpoint) {
  return createHash("sha256").update(String(endpoint || "")).digest("hex").slice(0, 32);
}

async function readPrivateJson(pathname, fallback) {
  try {
    const result = await get(pathname, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return fallback;
    return JSON.parse(await new Response(result.stream).text());
  } catch {
    return fallback;
  }
}

async function writePrivateJson(pathname, value) {
  await put(pathname, JSON.stringify(value), {
    access: "private",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export const readState = () => readPrivateJson(STATE_PATH, { devices: [] });
export const writeState = (state) => writePrivateJson(STATE_PATH, state);

export async function getVapid() {
  const stored = await readPrivateJson(VAPID_PATH, null);
  if (stored?.publicKey && stored?.privateJwk) return stored;
  const { privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
  const privateJwk = privateKey.export({ format: "jwk" });
  const publicKey = Buffer.concat([
    Buffer.from([4]),
    Buffer.from(privateJwk.x, "base64url"),
    Buffer.from(privateJwk.y, "base64url"),
  ]).toString("base64url");
  const vapid = { publicKey, privateJwk, createdAt: new Date().toISOString() };
  await writePrivateJson(VAPID_PATH, vapid);
  return vapid;
}

function hkdf(salt, input, info, length) {
  const key = createHmac("sha256", salt).update(input).digest();
  let output = Buffer.alloc(0);
  let previous = Buffer.alloc(0);
  for (let counter = 1; output.length < length; counter += 1) {
    previous = createHmac("sha256", key).update(Buffer.concat([previous, info, Buffer.from([counter])])).digest();
    output = Buffer.concat([output, previous]);
  }
  return output.subarray(0, length);
}

function makeJwt(endpoint, vapid) {
  const header = Buffer.from(JSON.stringify({ typ: "JWT", alg: "ES256" })).toString("base64url");
  const origin = new URL(endpoint).origin;
  const claims = Buffer.from(JSON.stringify({ aud: origin, exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, sub: "mailto:charujane@gmail.com" })).toString("base64url");
  const unsigned = `${header}.${claims}`;
  const signature = sign("sha256", Buffer.from(unsigned), { key: createPrivateKey({ key: vapid.privateJwk, format: "jwk" }), dsaEncoding: "ieee-p1363" }).toString("base64url");
  return `${unsigned}.${signature}`;
}

export function encryptPayload(subscription, payload) {
  const receiverPublic = Buffer.from(subscription.keys.p256dh, "base64url");
  const authSecret = Buffer.from(subscription.keys.auth, "base64url");
  const receiverKey = createPublicKey({ key: { kty: "EC", crv: "P-256", x: receiverPublic.subarray(1, 33).toString("base64url"), y: receiverPublic.subarray(33, 65).toString("base64url") }, format: "jwk" });
  const sender = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
  const senderJwk = sender.publicKey.export({ format: "jwk" });
  const senderPublic = Buffer.concat([Buffer.from([4]), Buffer.from(senderJwk.x, "base64url"), Buffer.from(senderJwk.y, "base64url")]);
  const secret = diffieHellman({ privateKey: sender.privateKey, publicKey: receiverKey });
  const keyInfo = Buffer.concat([Buffer.from("WebPush: info\0"), receiverPublic, senderPublic]);
  const inputKey = hkdf(authSecret, secret, keyInfo, 32);
  const salt = randomBytes(16);
  const contentKey = hkdf(salt, inputKey, Buffer.from("Content-Encoding: aes128gcm\0"), 16);
  const nonce = hkdf(salt, inputKey, Buffer.from("Content-Encoding: nonce\0"), 12);
  const plaintext = Buffer.concat([Buffer.from(JSON.stringify(payload)), Buffer.from([2])]);
  const cipher = createCipheriv("aes-128-gcm", contentKey, nonce);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
  const recordSize = Buffer.alloc(4);
  recordSize.writeUInt32BE(4096);
  return Buffer.concat([salt, recordSize, Buffer.from([senderPublic.length]), senderPublic, encrypted]);
}

export async function sendPush(subscription, payload) {
  const vapid = await getVapid();
  const response = await fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      TTL: "86400",
      Urgency: "normal",
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      Authorization: `vapid t=${makeJwt(subscription.endpoint, vapid)}, k=${vapid.publicKey}`,
    },
    body: encryptPayload(subscription, payload),
  });
  if (!response.ok && response.status !== 201) {
    const error = new Error(`Push service returned ${response.status}`);
    error.status = response.status;
    throw error;
  }
}
