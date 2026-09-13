import { readState, sendPush, writeState } from "./_shared.js";

export default async function handler(request, response) {
  const secret = process.env.CRON_SECRET || "";
  if (!secret || request.headers.authorization !== `Bearer ${secret}`) return response.status(401).json({ error: "Unauthorized" });
  try {
    const state = await readState();
    const kept = [];
    let sent = 0;
    for (const device of state.devices || []) {
      try {
        await sendPush(device.subscription, {
          title: "Voice before comfort",
          body: "Before today ends, is there anything you’d like to give a voice to?",
          url: "/?checkin=voice",
          tag: "glide-voice-checkin",
        });
        sent += 1;
        device.sentCount = Number(device.sentCount || 0) + 1;
        device.lastSentAt = new Date().toISOString();
        kept.push(device);
      } catch (error) {
        if (![404, 410].includes(error.status)) kept.push(device);
      }
    }
    state.devices = kept;
    await writeState(state);
    return response.status(200).json({ ok: true, sent, devices: kept.length });
  } catch (error) {
    return response.status(500).json({ error: error.message || "Check-ins could not be sent." });
  }
}
