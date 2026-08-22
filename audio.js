import { upload } from "@vercel/blob/client";

const PIN_KEY = "glide-audio-pin";
const DEFAULT_AMBIENT_VOLUME = 15;
const audio = new Audio();
audio.preload = "metadata";

let metadata = {};
let metadataLoaded = false;
let activeItemId = null;
let mediaRecorder = null;
let recordingStream = null;
let recordingItemId = null;
let recordingCompletion = null;
let resolveRecordingCompletion = null;
let chunks = [];
let localBlob = null;
let objectUrl = null;
let ambience = null;
let introPlayed = false;
let playbackGeneration = 0;

const getPin = () => sessionStorage.getItem(PIN_KEY) || "";
const studio = () => document.querySelector("[data-audio-studio]");
const byAction = (name) => studio()?.querySelector(`[data-audio-action="${name}"]`);

function setStatus(message, tone = "") {
  const el = studio()?.querySelector("[data-audio-status]");
  if (!el) return;
  el.textContent = message;
  el.dataset.tone = tone;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  return `${mins}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("x-glide-pin", getPin());
  if (options.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  const response = await fetch(path, { ...options, headers });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "The voice cloud could not be reached.");
  }
  return response;
}

async function loadMetadata(force = false) {
  if (metadataLoaded && !force) return metadata;
  const response = await api("/api/audio?metadata=1");
  metadata = await response.json();
  metadataLoaded = true;
  return metadata;
}

function updateStudio() {
  const el = studio();
  if (!el) return;
  const locked = !getPin();
  el.querySelector("[data-audio-lock]").hidden = !locked;
  el.querySelector("[data-audio-controls]").hidden = locked;
  if (locked) return;

  const saved = metadata[activeItemId];
  const hasAudio = Boolean(saved || localBlob);
  el.querySelectorAll("[data-requires-audio]").forEach((button) => {
    button.disabled = !hasAudio;
  });
  byAction("delete").disabled = !saved;
  el.querySelector("[data-saved-url]").textContent = saved
    ? "Private cloud recording saved"
    : localBlob
      ? "Recording ready"
      : "No voice recording yet";
}

export function audioStudioMarkup(itemId) {
  const locked = !getPin();
  return `<section class="voice-studio" data-audio-studio data-item-id="${itemId}">
    <div class="voice-heading"><div><small>Guided listening</small><h4>Your voice, first.</h4></div><span data-saved-url>No voice recording yet</span></div>
    <form class="audio-unlock" data-audio-lock ${locked ? "" : "hidden"}>
      <label>Recording PIN<input type="password" inputmode="numeric" autocomplete="current-password" placeholder="Enter your private PIN" required></label>
      <button type="submit">Unlock voice studio</button>
      <p>Your PIN stays in this browser session. It is never stored with the recording.</p>
    </form>
    <div data-audio-controls ${locked ? "hidden" : ""}>
      <div class="record-row">
        <button data-audio-action="record" class="record-button" type="button"><i></i>Record</button>
        <button data-audio-action="stop-recording" type="button" disabled>Stop</button>
        <button data-audio-action="replay" data-requires-audio type="button" disabled>Replay</button>
        <button data-audio-action="delete" type="button" disabled>Delete</button>
        <button data-audio-action="rerecord" data-requires-audio type="button" disabled>Re-record</button>
      </div>
      <div class="player-row">
        <button class="play-button" data-audio-action="play" data-requires-audio type="button" disabled aria-label="Play or pause">▶</button>
        <div class="timeline"><input data-audio-progress type="range" min="0" max="100" value="0" step="0.1" aria-label="Playback progress"><span><b data-current-time>0:00</b><b data-duration>0:00</b></span></div>
      </div>
      <div class="speed-row" aria-label="Playback speed">
        <span>Speed</span>${[1, 1.25, 1.5].map((speed) => `<button type="button" data-speed="${speed}" class="${speed === 1 ? "active" : ""}">${speed}×</button>`).join("")}
      </div>
      <div class="sound-settings">
        <label>Opening<select data-opening><option value="none">No opening</option><option value="bowl" selected>Soft bowl + 2 sec silence</option></select></label>
        <label>Ambience<select data-ambient><option value="silent">Silent</option><option value="ocean">Ocean</option><option value="forest">Forest</option><option value="rain">Rain</option><option value="pad">Soft pad</option><option value="breath">Breath cue</option></select></label>
        <label class="volume-label">Ambient volume <output data-volume-output>${DEFAULT_AMBIENT_VOLUME}%</output><input data-ambient-volume type="range" min="0" max="40" value="${DEFAULT_AMBIENT_VOLUME}" aria-label="Ambient volume"></label>
      </div>
      <p class="audio-status" data-audio-status role="status">Voice is recorded clean. Ambience is added only while listening.</p>
    </div>
  </section>`;
}

function preferredMimeType() {
  return ["audio/mp4", "audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"]
    .find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

function extensionFor(type) {
  if (type.includes("mp4")) return "m4a";
  if (type.includes("ogg")) return "ogg";
  return "webm";
}

async function beginRecording() {
  stopAudioSession();
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    throw new Error("Voice recording is not supported in this browser.");
  }
  recordingStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  const mimeType = preferredMimeType();
  recordingItemId = activeItemId;
  recordingCompletion = new Promise((resolve) => { resolveRecordingCompletion = resolve; });
  mediaRecorder = new MediaRecorder(recordingStream, mimeType ? { mimeType } : undefined);
  chunks = [];
  mediaRecorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
  mediaRecorder.onstop = async () => {
    const itemId = recordingItemId;
    const completedBlob = new Blob(chunks, { type: mediaRecorder.mimeType || mimeType || "audio/webm" });
    if (activeItemId === itemId) localBlob = completedBlob;
    recordingStream?.getTracks().forEach((track) => track.stop());
    recordingStream = null;
    if (activeItemId === itemId && studio()) {
      byAction("record").disabled = false;
      byAction("stop-recording").disabled = true;
      updateStudio();
    }
    try {
      await uploadRecording(completedBlob, itemId);
      resolveRecordingCompletion?.(true);
    } catch (error) {
      if (activeItemId === itemId) setStatus(`${error.message} Keep this overlay open and try recording again.`, "error");
      resolveRecordingCompletion?.(false);
    }
  };
  mediaRecorder.start(500);
  byAction("record").disabled = true;
  byAction("stop-recording").disabled = false;
  setStatus("Recording clean voice… ambience is off.", "recording");
}

function stopRecording() {
  if (mediaRecorder?.state === "recording") mediaRecorder.stop();
}

async function uploadRecording(recordedBlob, itemId) {
  if (!recordedBlob || !itemId) throw new Error("The recording could not be prepared.");
  setStatus("Uploading privately…", "working");
  const type = recordedBlob.type || "audio/webm";
  const ext = extensionFor(type);
  const filename = `glide-audio/${itemId}/${Date.now()}.${ext}`;
  const file = new File([recordedBlob], filename.split("/").pop(), { type });
  const blob = await upload(filename, file, {
    access: "private",
    handleUploadUrl: "/api/upload",
    clientPayload: JSON.stringify({ pin: getPin(), itemId }),
  });
  const record = {
    url: blob.url,
    pathname: blob.pathname,
    contentType: blob.contentType || type,
    size: blob.size || recordedBlob.size,
    updatedAt: new Date().toISOString(),
  };
  await api("/api/audio", { method: "POST", body: JSON.stringify({ action: "save", itemId, record }) });
  metadata[itemId] = record;
  if (activeItemId === itemId) {
    setStatus("Saved privately to your voice library.", "saved");
    updateStudio();
  }
}

async function deleteRecording() {
  if (!metadata[activeItemId]) return;
  if (!window.confirm("Delete this voice recording? This cannot be undone.")) return;
  await api("/api/audio", { method: "POST", body: JSON.stringify({ action: "delete", itemId: activeItemId }) });
  delete metadata[activeItemId];
  localBlob = null;
  clearAudioSource();
  setStatus("Recording deleted.");
  updateStudio();
}

function clearAudioSource() {
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = null;
  introPlayed = false;
  stopAmbience();
}

async function ensureAudioSource() {
  if (audio.src) return;
  let blob = localBlob;
  if (!blob && metadata[activeItemId]) {
    setStatus("Preparing your recording…", "working");
    const response = await api(`/api/audio?itemId=${encodeURIComponent(activeItemId)}`);
    blob = await response.blob();
  }
  if (!blob) throw new Error("Record your voice first.");
  objectUrl = URL.createObjectURL(blob);
  audio.src = objectUrl;
  audio.load();
}

function createNoise(ctx, seconds = 4) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function startAmbience(kind, volume) {
  stopAmbience();
  if (kind === "silent" || volume <= 0) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = (volume / 100) * 0.32;
  master.connect(ctx.destination);
  const nodes = [master];
  let timer = null;

  if (["ocean", "forest", "rain"].includes(kind)) {
    const noise = createNoise(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = kind === "rain" ? "highpass" : kind === "ocean" ? "lowpass" : "bandpass";
    filter.frequency.value = kind === "rain" ? 1800 : kind === "ocean" ? 650 : 1200;
    noise.connect(filter).connect(master);
    noise.start();
    nodes.push(noise, filter);
    if (kind === "ocean") {
      const lfo = ctx.createOscillator();
      const depth = ctx.createGain();
      lfo.frequency.value = 0.09;
      depth.gain.value = master.gain.value * 0.6;
      lfo.connect(depth).connect(master.gain);
      lfo.start();
      nodes.push(lfo, depth);
    }
    if (kind === "forest") {
      timer = setInterval(() => {
        const chirp = ctx.createOscillator();
        const gain = ctx.createGain();
        chirp.frequency.setValueAtTime(1100 + Math.random() * 700, ctx.currentTime);
        chirp.frequency.exponentialRampToValueAtTime(1700 + Math.random() * 600, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
        chirp.connect(gain).connect(master);
        chirp.start(); chirp.stop(ctx.currentTime + 0.24);
      }, 2800);
    }
  } else if (kind === "pad") {
    [130.81, 196, 261.63].forEach((frequency) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(master);
      oscillator.start();
      nodes.push(oscillator);
    });
  } else if (kind === "breath") {
    const oscillator = ctx.createOscillator();
    const breathGain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const depth = ctx.createGain();
    oscillator.type = "sine"; oscillator.frequency.value = 174;
    breathGain.gain.value = 0.35;
    lfo.frequency.value = 0.1; depth.gain.value = 0.3;
    lfo.connect(depth).connect(breathGain.gain);
    oscillator.connect(breathGain).connect(master);
    oscillator.start(); lfo.start();
    nodes.push(oscillator, breathGain, lfo, depth);
  }
  ambience = { ctx, master, nodes, timer };
}

function stopAmbience() {
  if (!ambience) return;
  if (ambience.timer) clearInterval(ambience.timer);
  ambience.nodes.forEach((node) => { try { node.stop?.(); node.disconnect?.(); } catch {} });
  ambience.ctx.close().catch(() => {});
  ambience = null;
}

async function playBowl(generation) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.connect(ctx.destination);
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.4);
  [432, 864, 1296].forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine"; oscillator.frequency.value = frequency;
    gain.gain.value = 1 / (index + 1.3);
    oscillator.connect(gain).connect(master);
    oscillator.start(); oscillator.stop(ctx.currentTime + 2.5);
  });
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await ctx.close();
  if (generation !== playbackGeneration) throw new Error("cancelled");
}

async function togglePlayback(restart = false) {
  if (!audio.paused && !restart) {
    audio.pause();
    stopAmbience();
    return;
  }
  await ensureAudioSource();
  if (restart) audio.currentTime = 0;
  const generation = ++playbackGeneration;
  const el = studio();
  if (!introPlayed && el.querySelector("[data-opening]").value === "bowl") {
    setStatus("Arriving…", "working");
    await playBowl(generation);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (generation !== playbackGeneration) return;
    introPlayed = true;
  }
  const kind = el.querySelector("[data-ambient]").value;
  const volume = Number(el.querySelector("[data-ambient-volume]").value);
  startAmbience(kind, volume);
  audio.playbackRate = Number(el.querySelector("[data-speed].active")?.dataset.speed || 1);
  await audio.play();
  setStatus("Listening…", "playing");
}

export function stopAudioSession() {
  playbackGeneration += 1;
  audio.pause();
  stopAmbience();
  if (mediaRecorder?.state === "recording") mediaRecorder.stop();
}

export async function finishAudioStudio() {
  playbackGeneration += 1;
  audio.pause();
  stopAmbience();
  if (mediaRecorder?.state === "recording") {
    setStatus("Stopping and saving your recording…", "working");
    mediaRecorder.stop();
  }
  if (recordingCompletion) {
    setStatus("Saving your recording before closing…", "working");
    const saved = await recordingCompletion;
    if (!saved) return false;
  }
  return true;
}

export function bindAudioStudio() {
  const el = studio();
  if (!el) return;
  const itemId = el.dataset.itemId;
  if (activeItemId !== itemId) {
    stopAudioSession();
    clearAudioSource();
    localBlob = null;
    activeItemId = itemId;
  }

  audio.ontimeupdate = () => {
    const progress = el.querySelector("[data-audio-progress]");
    if (!progress) return;
    progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    el.querySelector("[data-current-time]").textContent = formatTime(audio.currentTime);
    el.querySelector("[data-duration]").textContent = formatTime(audio.duration);
  };
  audio.onplay = () => { const button = byAction("play"); if (button) button.textContent = "Ⅱ"; };
  audio.onpause = () => { const button = byAction("play"); if (button) button.textContent = "▶"; };
  audio.onended = () => { stopAmbience(); introPlayed = false; setStatus("Complete. Take the reflection with you.", "saved"); };

  el.querySelector("[data-audio-lock]").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector("input");
    sessionStorage.setItem(PIN_KEY, input.value);
    try {
      await api("/api/audio", { method: "POST", body: JSON.stringify({ action: "verify" }) });
      await loadMetadata(true);
      updateStudio();
      setStatus("Voice studio unlocked.", "saved");
    } catch (error) {
      sessionStorage.removeItem(PIN_KEY);
      input.value = "";
      input.focus();
      setStatus(error.message, "error");
    }
  });

  el.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-audio-action]");
    if (!button) return;
    const action = button.dataset.audioAction;
    try {
      if (action === "record" || action === "rerecord") await beginRecording();
      if (action === "stop-recording") stopRecording();
      if (action === "play") await togglePlayback();
      if (action === "replay") await togglePlayback(true);
      if (action === "delete") await deleteRecording();
    } catch (error) {
      if (error.message !== "cancelled") setStatus(error.message, "error");
    }
  });

  el.querySelector("[data-audio-progress]").addEventListener("input", (event) => {
    if (audio.duration) audio.currentTime = (Number(event.target.value) / 100) * audio.duration;
  });
  el.querySelectorAll("[data-speed]").forEach((button) => button.addEventListener("click", () => {
    el.querySelectorAll("[data-speed]").forEach((other) => other.classList.remove("active"));
    button.classList.add("active");
    audio.playbackRate = Number(button.dataset.speed);
  }));
  el.querySelector("[data-ambient]").addEventListener("change", () => {
    if (!audio.paused) startAmbience(el.querySelector("[data-ambient]").value, Number(el.querySelector("[data-ambient-volume]").value));
  });
  el.querySelector("[data-ambient-volume]").addEventListener("input", (event) => {
    el.querySelector("[data-volume-output]").textContent = `${event.target.value}%`;
    if (ambience) ambience.master.gain.value = (Number(event.target.value) / 100) * 0.32;
  });

  if (getPin()) {
    loadMetadata().then(updateStudio).catch((error) => {
      sessionStorage.removeItem(PIN_KEY);
      updateStudio();
      setStatus(error.message, "error");
    });
  } else {
    updateStudio();
  }
}
