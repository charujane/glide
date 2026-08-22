import { handleUpload } from "@vercel/blob/client";
import { timingSafeEqual } from "node:crypto";

function validPin(value) {
  const expected = process.env.GLIDE_AUDIO_PIN || "";
  const supplied = String(value || "");
  if (!expected || supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  try {
    const jsonResponse = await handleUpload({
      body: request.body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = JSON.parse(clientPayload || "{}");
        if (!validPin(payload.pin)) throw new Error("Incorrect recording PIN.");
        if (typeof payload.itemId !== "string" || !/^[a-zA-Z0-9_-]{1,120}$/.test(payload.itemId)) {
          throw new Error("Invalid philosophy item.");
        }
        if (!/^[a-zA-Z0-9/_-]+\.(webm|m4a|ogg)$/.test(pathname) || !pathname.startsWith(`glide-audio/${payload.itemId}/`)) {
          throw new Error("Invalid recording path.");
        }
        return {
          access: "private",
          allowedContentTypes: ["audio/webm", "audio/mp4", "audio/ogg"],
          maximumSizeInBytes: 75 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ itemId: payload.itemId }),
        };
      },
      onUploadCompleted: async () => {},
    });
    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message || "Upload failed" });
  }
}
