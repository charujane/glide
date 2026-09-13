# Glide — Guided Listening

This version keeps Glide's existing philosophy and PWA experience, and includes clean voice recording, private cloud upload, live ambience, playback controls, the Return to the Hearth action center, and gentle Voice Before Comfort check-ins.

It also includes a once-per-day Morning Greeting. On the first opening between 4:00 a.m. and noon in the device’s local time, Glide offers Charu a quiet reflection with options to speak, write, or simply carry it into the day. Written reflections remain on the device; voice reflections use the existing private recording store. Earlier responses can be revisited from the greeting on a future morning.

## Parking the Fire

The **My intensity is energy looking for its rightful direction** Beacon includes the full Parking the Fire practice in its existing context and reflection. Within that Beacon's overlay, a single sentence or a short voice observation can be saved with the date and time. Earlier entries appear in a collapsed list for quiet pattern-noticing. Written observations and the list of voice observations stay in this browser's local storage; voice files themselves use the existing private Blob store and recording PIN. Avoid clearing browser data if you want to retain the list. This does not add navigation, streaks, scores, or goals.

## One-time Vercel setup

1. Upload this project to GitHub and connect the repository to the existing Vercel project.
2. In Vercel, open **Storage → Create Database → Blob**.
3. Create a **Private** Blob store and connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
4. Open **Project Settings → Environment Variables** and add `GLIDE_AUDIO_PIN` with a private PIN only you know.
5. Add `CRON_SECRET` as a **Sensitive, Production** environment variable. Use a long random value. Vercel uses it to authorize the private daily reminder.
6. Redeploy the project.

On first use in a browser session, Glide asks for this PIN before recording or playing cloud audio.

## Voice Before Comfort reminders

- Open the **Voice Before Comfort** Beacon and unlock its voice studio with your recording PIN.
- Tap **Turn on daily reminder**. The Hobby-compatible version sends one end-of-day invitation.
- On iPhone or iPad, Glide must be installed with **Add to Home Screen**. Apple supports Web Push for Home Screen web apps on iOS/iPadOS 16.4 or later.
- The Vercel Hobby cron runs once each day at 01:00 UTC, approximately 9:00 p.m. Toronto daylight time or 8:00 p.m. Toronto standard time. Hobby may deliver it later within that hour, and the phone may add a small delay.
- Notification keys are generated automatically and stored inside the same private Blob store. No additional VAPID environment variables are required.
- Each device must opt in separately. Notification permission is requested only after tapping the reminder button.
- Journal, voice-note, nothing, and “not right now” responses are saved with timestamps. There are no streaks, scores, or penalties.

## Audio behavior

- Voice is captured clean through the browser microphone.
- Recordings upload directly to private Vercel Blob storage.
- A private metadata record maps each philosophy item to its current recording URL.
- Re-recording replaces the mapping and removes the prior cloud file.
- Bowl and ambience are synthesized during playback and never baked into the voice file.
- Ambient volume defaults to 15% and is adjustable independently.
- The data model is keyed by philosophy item ID so a future Sessions feature can queue multiple items without changing stored recordings.
