import { prepareLocalAudioLibrary, stopAudioSession } from "./audio.js";

const LAST_FIRST_KEY = "glide-walk-last-first-v1";
const walkAudio = new Audio();
walkAudio.preload = "auto";

let titles = new Map();
let preparedLibrary = Promise.resolve([]);
let queue = [];
let currentIndex = -1;
let currentUrl = null;
let sessionActive = false;
let preparingWalk = false;
let status = "";

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    const swapIndex = values[0] % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function currentItem() {
  return queue[currentIndex] || null;
}

function innerMarkup() {
  const item = currentItem();
  if (sessionActive && item) {
    return `<div class="walk-playing">
      <small>🎧 Walk with me</small>
      <h3>${escapeHtml(item.title)}</h3>
      <div class="walk-controls" aria-label="Walk With Me playback controls">
        <button type="button" data-walk-action="previous" aria-label="Previous recording" ${currentIndex <= 0 ? "disabled" : ""}>← <span>Previous</span></button>
        <button type="button" class="walk-main-control" data-walk-action="toggle" aria-label="${walkAudio.paused ? "Play" : "Pause"}">${walkAudio.paused ? "▶" : "Ⅱ"}</button>
        <button type="button" data-walk-action="next" aria-label="Next recording"> <span>Next</span> →</button>
      </div>
      ${status ? `<p class="walk-status" role="status">${escapeHtml(status)}</p>` : ""}
    </div>`;
  }

  return `<div class="walk-start">
    <small>A listening walk</small>
    <h3>🎧 Walk With Me</h3>
    <blockquote>“Let the philosophy find me.”</blockquote>
    <button type="button" class="walk-play" data-walk-action="start" ${preparingWalk ? "disabled" : ""}>▶ <span>Play</span></button>
    <p class="walk-tagline">Press play and walk. My own voice will find me.</p>
    ${status ? `<p class="walk-status" role="status">${escapeHtml(status)}</p>` : ""}
  </div>`;
}

export function walkWithMeMarkup() {
  return `<section class="walk-with-me" data-walk-with-me aria-label="Walk With Me">${innerMarkup()}</section>`;
}

function renderSurface() {
  const surface = document.querySelector("[data-walk-with-me]");
  if (surface) surface.innerHTML = innerMarkup();
}

function releaseCurrentUrl() {
  if (!currentUrl) return;
  URL.revokeObjectURL(currentUrl);
  currentUrl = null;
}

function setMediaSession(item) {
  if (!("mediaSession" in navigator) || !("MediaMetadata" in window)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: item.title,
    artist: "Glide · Walk With Me",
    album: "My philosophy",
    artwork: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  });
}

function updateMediaPosition() {
  if (!("mediaSession" in navigator) || !navigator.mediaSession.setPositionState) return;
  if (!Number.isFinite(walkAudio.duration) || walkAudio.duration <= 0) return;
  try {
    navigator.mediaSession.setPositionState({
      duration: walkAudio.duration,
      playbackRate: walkAudio.playbackRate,
      position: Math.min(walkAudio.currentTime, walkAudio.duration),
    });
  } catch {
    // Some mobile browsers expose Media Session without position-state support.
  }
}

async function playCurrent() {
  const item = currentItem();
  if (!item) return;
  walkAudio.pause();
  releaseCurrentUrl();
  currentUrl = URL.createObjectURL(item.blob);
  walkAudio.src = currentUrl;
  walkAudio.load();
  setMediaSession(item);
  status = "";
  renderSurface();
  try {
    await walkAudio.play();
  } catch (error) {
    status = error?.name === "NotAllowedError"
      ? "Tap Play once more to begin."
      : "This recording could not be played on this device.";
    renderSurface();
  }
}

async function nextRecording() {
  if (!sessionActive) return;
  if (currentIndex >= queue.length - 1) {
    walkAudio.pause();
    walkAudio.removeAttribute("src");
    releaseCurrentUrl();
    queue = [];
    currentIndex = -1;
    sessionActive = false;
    status = "Your walk is complete.";
    if ("mediaSession" in navigator) navigator.mediaSession.metadata = null;
    renderSurface();
    return;
  }
  currentIndex += 1;
  await playCurrent();
}

async function previousRecording() {
  if (!sessionActive || currentIndex <= 0) return;
  currentIndex -= 1;
  await playCurrent();
}

async function startWalk() {
  if (preparingWalk) return;
  preparingWalk = true;
  stopAudioSession();
  status = "Preparing your offline recordings…";
  renderSurface();
  try {
    const records = await preparedLibrary;
    const available = records
      .filter((record) => titles.has(record.itemId))
      .map((record) => ({ ...record, title: titles.get(record.itemId) }));
    if (!available.length) {
      status = navigator.onLine
        ? "No philosophy recordings are saved on this device yet. Unlock your voice studio while online once to prepare them for offline walks."
        : "No philosophy recordings are available offline on this device yet.";
      return;
    }

    queue = shuffle(available);
    const previousFirst = localStorage.getItem(LAST_FIRST_KEY);
    if (queue.length > 1 && queue[0].itemId === previousFirst) {
      const random = new Uint32Array(1);
      crypto.getRandomValues(random);
      const nextFirst = 1 + (random[0] % (queue.length - 1));
      [queue[0], queue[nextFirst]] = [queue[nextFirst], queue[0]];
    }
    localStorage.setItem(LAST_FIRST_KEY, queue[0].itemId);
    currentIndex = 0;
    sessionActive = true;
    status = "";
    await playCurrent();
  } finally {
    preparingWalk = false;
    renderSurface();
  }
}

async function handleAction(action) {
  if (action === "start") await startWalk();
  if (action === "toggle") {
    if (walkAudio.paused) {
      try {
        await walkAudio.play();
      } catch {
        status = "Tap Play once more to begin.";
        renderSurface();
      }
    } else {
      walkAudio.pause();
    }
  }
  if (action === "next") await nextRecording();
  if (action === "previous") await previousRecording();
}

function configureMediaControls() {
  if (!("mediaSession" in navigator)) return;
  const actions = {
    play: () => walkAudio.play().catch(() => {}),
    pause: () => walkAudio.pause(),
    nexttrack: () => nextRecording(),
    previoustrack: () => previousRecording(),
  };
  Object.entries(actions).forEach(([action, handler]) => {
    try {
      navigator.mediaSession.setActionHandler(action, handler);
    } catch {
      // The browser may support only a subset of media actions.
    }
  });
}

export function bindWalkWithMe(items) {
  titles = new Map(items.map((item) => [item.id, item.title]));
  preparedLibrary = prepareLocalAudioLibrary();
  const surface = document.querySelector("[data-walk-with-me]");
  if (!surface) return;
  renderSurface();
  surface.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-walk-action]");
    if (!button) return;
    button.disabled = true;
    try {
      await handleAction(button.dataset.walkAction);
    } catch {
      status = "This recording could not be played on this device.";
      renderSurface();
    }
  });
  configureMediaControls();
}

export function pauseWalkWithMe() {
  walkAudio.pause();
}

walkAudio.addEventListener("play", () => {
  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
  renderSurface();
});
walkAudio.addEventListener("pause", () => {
  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
  renderSurface();
});
walkAudio.addEventListener("ended", () => { nextRecording(); });
walkAudio.addEventListener("timeupdate", updateMediaPosition);
walkAudio.addEventListener("loadedmetadata", updateMediaPosition);
