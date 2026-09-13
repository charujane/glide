import { getVapid } from "./_shared.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed" });
  try {
    const vapid = await getVapid();
    response.setHeader("cache-control", "private, no-store");
    return response.status(200).json({ publicKey: vapid.publicKey });
  } catch (error) {
    return response.status(500).json({ error: error.message || "Notification setup failed." });
  }
}

