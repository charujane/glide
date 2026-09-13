import { endpointId, readState, validPin, writeState } from "./_shared.js";

function cleanSettings(value = {}) {
  const timezone = typeof value.timezone === "string" && value.timezone.length < 80 ? value.timezone : "UTC";
  try { new Intl.DateTimeFormat("en", { timeZone: timezone }).format(); } catch { return { rhythm: "daily", timezone: "UTC" }; }
  return { rhythm: "daily", timezone };
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  if (!validPin(request.headers["x-glide-pin"])) return response.status(401).json({ error: "Unlock the voice studio with your recording PIN first." });
  try {
    const body = request.body || {};
    const state = await readState();
    state.devices = Array.isArray(state.devices) ? state.devices : [];
    const endpoint = body.subscription?.endpoint || body.endpoint;
    if (typeof endpoint !== "string" || !endpoint.startsWith("https://")) return response.status(400).json({ error: "Invalid notification subscription." });
    const id = endpointId(endpoint);
    const existingIndex = state.devices.findIndex((device) => device.id === id);

    if (body.action === "delete") {
      state.devices = state.devices.filter((device) => device.id !== id);
      await writeState(state);
      return response.status(200).json({ ok: true });
    }
    if (body.action !== "save" || !body.subscription?.keys?.p256dh || !body.subscription?.keys?.auth) {
      return response.status(400).json({ error: "Invalid reminder request." });
    }
    const settings = cleanSettings(body.settings);
    const now = new Date();
    const device = {
      ...(existingIndex >= 0 ? state.devices[existingIndex] : {}),
      id,
      subscription: body.subscription,
      settings,
      updatedAt: now.toISOString(),
      sentCount: existingIndex >= 0 ? Number(state.devices[existingIndex].sentCount || 0) : 0,
    };
    if (existingIndex >= 0) state.devices[existingIndex] = device;
    else state.devices.push(device);
    await writeState(state);
    return response.status(200).json({ ok: true });
  } catch (error) {
    return response.status(500).json({ error: error.message || "The reminder could not be saved." });
  }
}
