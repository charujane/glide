import { del, get, put } from "@vercel/blob";
import { timingSafeEqual } from "node:crypto";
import { Readable } from "node:stream";

const METADATA_PATH = "glide-audio/metadata.json";

function validPin(value) {
  const expected = process.env.GLIDE_AUDIO_PIN || "";
  const supplied = String(value || "");
  if (!expected || supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

function authorized(request) {
  return validPin(request.headers["x-glide-pin"] || request.body?.pin);
}

async function readMetadata() {
  try {
    const result = await get(METADATA_PATH, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return {};
    const text = await new Response(result.stream).text();
    return JSON.parse(text || "{}");
  } catch {
    return {};
  }
}

async function writeMetadata(metadata) {
  await put(METADATA_PATH, JSON.stringify(metadata), {
    access: "private",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

function validItemId(itemId) {
  return typeof itemId === "string" && /^[a-zA-Z0-9_-]{1,120}$/.test(itemId);
}

export default async function handler(request, response) {
  if (!authorized(request)) return response.status(401).json({ error: "Incorrect recording PIN." });

  if (request.method === "GET" && request.query.metadata === "1") {
    return response.status(200).json(await readMetadata());
  }

  if (request.method === "GET") {
    const itemId = request.query.itemId;
    if (!validItemId(itemId)) return response.status(400).json({ error: "Invalid item." });
    const metadata = await readMetadata();
    const record = metadata[itemId];
    if (!record?.pathname) return response.status(404).json({ error: "No recording found." });
    const result = await get(record.pathname, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return response.status(404).json({ error: "Recording not found." });
    response.setHeader("content-type", result.blob.contentType || record.contentType || "audio/webm");
    response.setHeader("cache-control", "private, no-store");
    response.setHeader("x-content-type-options", "nosniff");
    return Readable.fromWeb(result.stream).pipe(response);
  }

  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  const { action, itemId, record } = request.body || {};
  if (action === "verify") return response.status(200).json({ ok: true });
  if (!validItemId(itemId)) return response.status(400).json({ error: "Invalid item." });

  const metadata = await readMetadata();
  if (action === "save") {
    if (!record?.pathname?.startsWith(`glide-audio/${itemId}/`) || !record?.url) {
      return response.status(400).json({ error: "Invalid recording metadata." });
    }
    const previous = metadata[itemId];
    metadata[itemId] = record;
    await writeMetadata(metadata);
    if (previous?.url && previous.url !== record.url) await del(previous.url).catch(() => {});
    return response.status(200).json({ ok: true, url: record.url });
  }
  if (action === "delete") {
    if (metadata[itemId]?.url) await del(metadata[itemId].url);
    delete metadata[itemId];
    await writeMetadata(metadata);
    return response.status(200).json({ ok: true });
  }
  return response.status(400).json({ error: "Unknown action." });
}
