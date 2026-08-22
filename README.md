# Glide — Guided Listening

This version keeps Glide's existing philosophy and PWA experience, and adds clean voice recording, private cloud upload, live ambience, playback controls, and cross-device audio metadata.

## One-time Vercel setup

1. Upload this project to GitHub and connect the repository to the existing Vercel project.
2. In Vercel, open **Storage → Create Database → Blob**.
3. Create a **Private** Blob store and connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
4. Open **Project Settings → Environment Variables** and add `GLIDE_AUDIO_PIN` with a private PIN only you know.
5. Redeploy the project.

On first use in a browser session, Glide asks for this PIN before recording or playing cloud audio.

## Audio behavior

- Voice is captured clean through the browser microphone.
- Recordings upload directly to private Vercel Blob storage.
- A private metadata record maps each philosophy item to its current recording URL.
- Re-recording replaces the mapping and removes the prior cloud file.
- Bowl and ambience are synthesized during playback and never baked into the voice file.
- Ambient volume defaults to 15% and is adjustable independently.
- The data model is keyed by philosophy item ID so a future Sessions feature can queue multiple items without changing stored recordings.
