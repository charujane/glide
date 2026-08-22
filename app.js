const DEFAULT_BEACONS = [
  {
    id: "home-joyful-space",
    category: "Home",
    title: "Return to joyful spaciousness.",
    context:
      "Joy becomes available when I stop organizing every moment around vigilance, performance, and survival. Fear may visit, but it is not my home.",
    practice: "Ask: What can I gently put down today so joy has more room?",
  },
  {
    id: "moment-vote",
    category: "Momentum",
    title: "Every moment is a vote for the life I am creating.",
    context:
      "I do not arrive at joy in one leap, and I do not lose myself all at once. Each moment contributes a little momentum. Over time, these small votes become a way of living.",
    practice: "Ask: What direction do I want this moment to strengthen?",
  },
  {
    id: "upward-spiral",
    category: "Momentum",
    title: "I cultivate an upward spiral.",
    context:
      "My attention influences my breath, my nervous system, my energy, and the way I experience my day. When I notice safety, beauty, gratitude, curiosity, and possibility, my body begins to organize itself around those signals. One small act of noticing creates momentum for the next.",
    practice: "Ask: What can I notice right now that reminds my nervous system it is safe? Stay with it for a few breaths.",
  },
  {
    id: "momentum-over-intensity",
    category: "Momentum",
    title: "Momentum matters more than intensity.",
    context:
      "I do not need one extraordinary moment of peace. I need hundreds of small moments that gently reinforce the life I am building. Gentle repetition changes my lived experience more reliably than dramatic effort.",
    practice: "Ask: Does this add one more step toward the life I am cultivating?",
  },
  {
    id: "stand-tall",
    category: "Courage",
    title: "I stand tall when life calls me.",
    context:
      "Food, scrolling, and other comforts can become ways of numbing myself away from my own life. I want nourishment, not numbness. When life calls me into challenge, I choose to stand straight, trust myself, and answer the call.",
    practice: "Before reaching for comfort, ask: Am I nourishing myself, or hiding from the call?",
  },
  {
    id: "legacy-home",
    category: "Home",
    title: "My legacy is the home I return to.",
    context:
      "My legacy is not something I leave behind. It is the home I build through my work, relationships, values, and courage. When I doubt myself, I return home rather than seeking validation in someone else’s eyes.",
    practice: "Remember what I have already built. Walk through my own house.",
  },
  {
    id: "shape-understanding",
    category: "Communication",
    title: "I may shape how I am understood without surrendering who I am.",
    context:
      "Perception matters because humans live socially. I can intentionally improve communication and clarity without shrinking or abandoning myself.",
    practice: "Help people understand me. Do not become someone else.",
  },
  {
    id: "stay-by-choice",
    category: "Freedom",
    title: "I stay by choice.",
    context:
      "Freedom means remembering I always have options. Jobs, conversations, relationships, and environments—I stay because I choose to, not because I feel trapped.",
    practice: "Remember my exit exists. Choose freely.",
  },
  {
    id: "healing-time",
    category: "Restoration",
    title: "Healing deserves time.",
    context:
      "Moving away from homeostasis has a real energetic cost. Recovery is not the interruption of life—it is part of life.",
    practice: "After disruption, restore before producing.",
  },
  {
    id: "joy-spaciousness",
    category: "Joy",
    title: "Joy moves through spaciousness.",
    context:
      "When I laugh in my sleep, it feels like life itself is laughing through me. I do not manufacture joy. I create enough inner space that joy naturally moves through me.",
    practice: "Ask: What can I gently put down today so joy has more room?",
  },
  {
    id: "beyond-survival",
    category: "Freedom",
    title: "I no longer organize my life around survival.",
    context:
      "I organize my life around freedom, vitality, expansion, stewardship, restoration, and joyful spaciousness.",
    practice: "Whenever fear appears, ask: Am I organizing around survival or freedom?",
  },
  {
    id: "independence-love",
    category: "Parenting",
    title: "I celebrate the independence my love helped create.",
    context:
      "My children’s independence is not rejection. Love changes shape. Their growth returns energy back into my own life.",
    practice: "Support their freedom while tending to my own heart.",
  },
  {
    id: "attention",
    category: "Leadership",
    title: "My leadership is my attention.",
    context:
      "Leadership is not the force of my personality. It is the quality of attention I bring to the room, the person, and the problem in front of me.",
    practice: "Pause. Read the room. Place my attention deliberately.",
  },
  {
    id: "survival",
    category: "Freedom",
    title: "I no longer shrink for survival.",
    context:
      "Self-censorship was once a survival strategy. I have built a life where I can trust my judgment, question what challenges my values, and remain fully myself.",
    practice: "Question without abandoning myself.",
  },
  {
    id: "belonging",
    category: "Freedom",
    title: "I expand because I belong to myself.",
    context:
      "Fear may still visit, but it no longer determines the size of my life. I do not need to make myself smaller to preserve belonging.",
    practice: "Let belonging begin inside me.",
  },
  {
    id: "pick-up",
    category: "Attention",
    title: "I choose what I pick up.",
    context:
      "Not every urgency, opinion, responsibility, or emotional charge deserves residency in my mind. My attention is mine to place.",
    practice: "Ask: Does this deserve my energy?",
  },
  {
    id: "observer",
    category: "Observer",
    title: "Cultivate the posture of the observer.",
    context:
      "The observer is gentle, curious, spacious, intentional, patient, trusting, and light-handed. It notices without immediately gripping.",
    practice: "Glide. Don’t grip.",
  },
  {
    id: "return",
    category: "Navigation",
    title: "I return early.",
    context:
      "Small deviations compound. Returning is always possible, but it becomes more costly the farther I drift from my own center.",
    practice: "Do not wait until I am lost to look for home.",
  },
  {
    id: "detour",
    category: "Choice",
    title: "Every detour has a cost.",
    context:
      "A detour is not forbidden. Rest, risk, adventure, or helping someone may be worth it. The point is to see the tradeoff before choosing it.",
    practice: "Choose with open eyes, then release regret.",
  },
  {
    id: "love",
    category: "Parenting",
    title: "Love changes its shape as people grow.",
    context:
      "Maya’s growing independence is not rejection. One form of motherhood is ending while another—guide, witness, safe place—is beginning.",
    practice: "Support her independence while caring for my own heart.",
  },
  {
    id: "ending",
    category: "Transformation",
    title: "Every ending returns energy to life.",
    context:
      "When a role changes, the love does not disappear. Energy becomes available for health, dreams, creativity, friendship, joy, and a wider purpose.",
    practice: "Ask: Where will this newly available love go?",
  },
  {
    id: "stories",
    category: "Freedom",
    title: "I decide which stories about me become part of me.",
    context:
      "Other people may overlay their fears and insecurities onto me. Feedback can be examined without being absorbed as identity.",
    practice: "Look for evidence. Keep what is true. Release the rest.",
  },
  {
    id: "space",
    category: "Restoration",
    title: "Spaciousness is how life expands through me.",
    context:
      "My clearest choices do not emerge from constant pressure. Restoration is fertile ground, not time stolen from progress.",
    practice: "Protect enough quiet for life to speak back.",
  },
  {
    id: "tomorrow",
    category: "Restoration",
    title: "Tomorrow belongs to tomorrow’s Charu.",
    context:
      "Evening is not the time to solve every future problem. I can lovingly set down unfinished work and let my nervous system return home.",
    practice: "Name what can wait. Close the day gently.",
  },
  {
    id: "freedom-remembers",
    category: "Freedom",
    title: "My freedom is remembering who I am—even in familiar situations.",
    context:
      "Old environments can awaken old roles without recreating the old reality. Familiar activation does not require familiar self-abandonment.",
    practice: "Remember who I am before deciding how to respond.",
  },
  {
    id: "passive-mirror",
    category: "Freedom",
    title: "I can be a mirror without becoming a sponge.",
    context:
      "I can let another person’s fear, insecurity, or name-calling reveal what belongs to them. I do not have to absorb it, defend against it, or carry it away.",
    practice: "Reflect what is useful. Do not absorb what is not mine.",
  },
  {
    id: "conditions",
    category: "Living",
    title: "I cultivate conditions more than I chase outcomes.",
    context:
      "The life I want grows from the conditions I repeatedly create: attention, nourishment, movement, rest, courage, and room to listen.",
    practice: "Ask which condition I can create now.",
  },
  {
    id: "activation",
    category: "Leadership",
    title: "I can carry activation.",
    context:
      "A racing heart does not mean I am failing or must retreat. I can feel the charge, remain in the room, and continue with care.",
    practice: "Feel my feet. Take the micro-pause. Continue.",
  },
  {
    id: "thought-freedom",
    category: "Freedom",
    title: "Think freely, and speaking freely will follow.",
    context:
      "Expression becomes constrained long before words leave my mouth. My first freedom is allowing the uncensored thought to exist inside me.",
    practice: "Let the honest thought form before polishing it.",
  },
  {
    id: "body-knows",
    category: "Vitality",
    title: "My body already knows.",
    context:
      "My body carries information beneath urgency, rules, and performance. Guidance begins by listening closely enough to notice what restores, nourishes, and strengthens me.",
    practice: "Listen before overriding.",
  },
  {
    id: "healing-space",
    category: "Transformation",
    title: "Healing deserves space.",
    context:
      "Deep change cannot always be optimized, rushed, or completed on demand. What is being integrated needs room, gentleness, and honest attention.",
    practice: "Make room for the feeling without making it the whole world.",
  },
  {
    id: "joy",
    category: "Living",
    title: "Joy is not a reward for finishing everything.",
    context:
      "Delight, cooking, wandering, creating, resting, and being with the people I love are not interruptions to life. They are life.",
    practice: "Let one uncomplicated joy belong to today.",
  },
  {
    id: "direction",
    category: "Navigation",
    title: "Direction matters more than distance.",
    context:
      "I do not need a dramatic correction or a perfect day. A small choice toward my center changes the direction of travel.",
    practice: "Choose the next faithful step, not the whole path.",
  },
  {
    id: "intentional-choice",
    category: "Choice",
    title: "An informed choice leaves less room for repentance.",
    context:
      "I am allowed to choose the dark alley, the pause, the risk, or the indulgence. Freedom includes seeing the likely cost and deciding that I am willing to pay it.",
    practice: "Name the cost before I choose.",
  },
];

const DEFAULT_SIGNALS = [
  {
    id: "unwanted-momentum",
    title: "I’m feeding momentum I don’t actually want.",
    meaning:
      "I have started giving repeated attention to fear, outrage, comparison, rumination, or urgency. None of these need to define my day, but repeated attention gives them momentum.",
    beacon: "I cultivate an upward spiral.",
  },
  {
    id: "replay",
    title: "I’m replaying conversations.",
    meaning:
      "My nervous system may still believe that reviewing every word can manufacture safety.",
    beacon: "Tomorrow belongs to tomorrow’s Charu.",
  },
  {
    id: "arguments",
    title: "I’m imagining future arguments.",
    meaning:
      "I am spending present energy defending myself against something that has not happened.",
    beacon: "I choose what I pick up.",
  },
  {
    id: "body",
    title: "I’m abandoning my body to serve my calendar.",
    meaning:
      "Urgency has begun to outrank vitality. This is an early signal, not a moral failure.",
    beacon: "I return early.",
  },
  {
    id: "explain",
    title: "I’m explaining myself to someone who isn’t trying to understand.",
    meaning:
      "I may be trying to earn safety or correct another person’s projection.",
    beacon: "I decide which stories about me become part of me.",
  },
  {
    id: "shrink",
    title: "I’m shrinking to preserve belonging.",
    meaning:
      "An old survival strategy is asking me to trade full expression for acceptance.",
    beacon: "I expand because I belong to myself.",
  },
  {
    id: "responsibility",
    title: "I’m picking up what isn’t mine.",
    meaning:
      "I have confused care with ownership of someone else’s feelings, work, or consequences.",
    beacon: "I choose what I pick up.",
  },
  {
    id: "fear",
    title: "I’m making a fear-based decision.",
    meaning:
      "Fear is supplying information, but it may have quietly taken the steering wheel.",
    beacon: "I no longer shrink for survival.",
  },
  {
    id: "grip",
    title: "I’m forcing an answer before it is ready.",
    meaning:
      "Activation is disguising itself as productivity. More force may create less clarity.",
    beacon: "Cultivate the posture of the observer.",
  },
  {
    id: "self-censor",
    title: "I’m editing myself before I have even formed the thought.",
    meaning:
      "Self-censorship may be protecting me from an old danger by preventing honest thought and expression in the present.",
    beacon: "Think freely, and speaking freely will follow.",
  },
  {
    id: "familiar-role",
    title: "I’m becoming an older, smaller version of myself in a familiar situation.",
    meaning:
      "The setting may be familiar enough to awaken an old role, even though I now have more freedom, authority, and choice.",
    beacon: "My freedom is remembering who I am—even in familiar situations.",
  },
  {
    id: "absorb",
    title: "I’m absorbing someone else’s insecurity as information about me.",
    meaning:
      "I may be treating projection, name-calling, or discomfort as a verdict instead of noticing what belongs to the other person.",
    beacon: "I can be a mirror without becoming a sponge.",
  },
  {
    id: "perform",
    title: "I’m monitoring how I sound instead of attending to the room.",
    meaning:
      "Activation has turned my attention inward toward performance, judgment, and the fear of sounding inadequate.",
    beacon: "My leadership is my attention.",
  },
  {
    id: "racing-heart",
    title: "My heart is racing, and I’m treating activation as a stop sign.",
    meaning:
      "My body is carrying charge. The sensation is real, but it does not automatically mean I am unsafe or incapable.",
    beacon: "I can carry activation.",
  },
  {
    id: "rush-rest",
    title: "I’m treating restoration as something I must earn.",
    meaning:
      "Pressure has made rest, delight, and spaciousness look like rewards instead of conditions that support clear living.",
    beacon: "Spaciousness is how life expands through me.",
  },
  {
    id: "outcome-chase",
    title: "I’m chasing the outcome and neglecting the conditions.",
    meaning:
      "I may be applying force to a result while overlooking the daily environment from which that result can naturally grow.",
    beacon: "I cultivate conditions more than I chase outcomes.",
  },
  {
    id: "override-body",
    title: "I’m overriding my body’s signals with urgency, rules, or appetite.",
    meaning:
      "I may be reaching for immediate relief or productivity without listening to the sleep, comfort, strength, or nourishment I am protecting.",
    beacon: "My body already knows.",
  },
  {
    id: "solve-everything",
    title: "I’m trying to solve the whole journey from this one difficult moment.",
    meaning:
      "Activation is making the path feel all-or-nothing. I only need enough clarity for the next visible step.",
    beacon: "Direction matters more than distance.",
  },
  {
    id: "unseen-cost",
    title: "I’m choosing a detour without naming its cost.",
    meaning:
      "The choice may still be worth making, but leaving the tradeoff invisible increases the chance of regret and prolonged drift.",
    beacon: "An informed choice leaves less room for repentance.",
  },
  {
    id: "numb-with-food",
    title: "I’m using food to numb instead of nourish.",
    meaning: "I may not want to hear life’s invitation in this moment.",
    beacon: "I stand tall when life calls me.",
  },
  {
    id: "compulsive-scroll",
    title: "I’m compulsively scrolling.",
    meaning: "My nervous system may be trying to regulate discomfort without truly restoring.",
    beacon: "Healing deserves time.",
  },
  {
    id: "fix-perception",
    title: "I’m trying to fix every perception of me.",
    meaning: "I have confused perception with identity.",
    beacon: "I may shape how I am understood without surrendering who I am.",
  },
  {
    id: "mirror-disliked-energy",
    title: "I’m mirroring the energy I dislike.",
    meaning: "I have forgotten the precious response window between another person’s energy and my own response.",
    beacon: "I lead from the response window.",
  },
  {
    id: "validation-explaining",
    title: "I’m explaining myself to people who are not trying to understand.",
    meaning: "I am chasing validation instead of offering clarity.",
    beacon: "My legacy is the home I return to.",
  },
  {
    id: "compensating",
    title: "I’m compensating instead of healing.",
    meaning: "I am pretending difficult things did not cost me energy.",
    beacon: "Healing deserves time.",
  },
];

const DEFAULT_LIGHTHOUSES = [
  {
    id: "emotional-climate",
    title: "My presence changes the emotional climate.",
    context:
      "The inner climate I cultivate rarely stays contained within me. Calm, authenticity, hope, and steadiness ripple outward into my family, meetings, and relationships. I do not create safety by telling people to relax. I create it by embodying it.",
    practice: "Before entering a room, ask: What climate do I want to contribute here? Then become the first example of it.",
  },
  {
    id: "response-window",
    title: "I lead from the response window.",
    context: "Other people’s reactions often tell me more about their nervous system than about my worth. I have a precious response window where I can choose curiosity over mirroring.",
    practice: "Pause. Ask: What might they be protecting right now?",
  },
  {
    id: "highest-common-factor",
    title: "I magnify the Highest Common Factor.",
    context: "Groups naturally sink toward the lowest common denominator. I choose to notice and amplify the highest qualities already present—curiosity, generosity, courage, humor, and kindness.",
    practice: "Ask: What is the highest quality already present here? Then strengthen it.",
  },
  {
    id: "attention-amplifies",
    title: "My leadership is the quality of my attention.",
    context: "Attention amplifies whatever it rests upon. Leadership is not merely paying attention—it is choosing what deserves amplification.",
    practice: "Direct attention toward possibility rather than fear.",
  },
  {
    id: "regulating-presence",
    title: "I become a regulating presence.",
    context: "I cannot control another person’s nervous system, but I can remain steady enough that they experience safety, clarity, and thoughtful leadership in my presence.",
    practice: "Steady myself before trying to steady the room.",
  },
  {
    id: "love-direction",
    title: "Love offers direction. It does not seize the steering wheel.",
    context: "Whether with my children, my mother, my team, or anyone I care about, I can guide without controlling. Free will belongs to each person.",
    practice: "Offer wisdom. Respect choice.",
  },
  {
    id: "legacy-shelter",
    title: "My legacy becomes shelter for others.",
    context: "The life I build is not only a home for me. Its steadiness, integrity, and compassion become a place where others can orient themselves if they choose.",
    practice: "Live in a way that others experience hope, not pressure.",
  },
];

const DEFAULT_GROWING = [
  {
    id: "natural-joyful-space",
    title: "My natural state is joyful spaciousness.",
    note: "Fear is a visitor, not my home. This may be the destination toward which all the other beacons point.",
    status: "Exploring",
  },
  {
    id: "safe-curious-playful",
    title: "I am safe enough to be curious and free enough to be playful.",
    note: "Play may be evidence that my nervous system no longer needs to stand guard every waking moment.",
    status: "Exploring",
  },
];

const NAV = [
  ["beacons", "Beacons", "Move toward"],
  ["drift", "Drift signals", "Notice early"],
  ["guide", "Guide me", "Find the next step"],
  ["lighthouses", "Lighthouses", "Illuminate"],
  ["anchors", "Anchors", "Nourish life"],
  ["growing", "Growing", "Let wisdom evolve"],
];

const ANCHORS = [
  ["Vitality", "What would help me feel strong and deeply connected to my body?", "Move, nourish, breathe, sleep."],
  ["Expansion", "Where am I ready to grow, create, or express myself more fully?", "Practice courage without force."],
  ["Stewardship", "What deserves my loving care today?", "Guide without taking the wheel."],
  ["Restoration", "What will return energy to my life?", "Make room for quiet and delight."],
];

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const loadAndMerge = (key, defaults) => {
  const stored = load(key, []);
  if (!Array.isArray(stored) || stored.length === 0) return defaults;
  const storedIds = new Set(stored.map((item) => item.id));
  return [...stored, ...defaults.filter((item) => !storedIds.has(item.id))];
};

const state = {
  tab: "beacons",
  beacons: loadAndMerge("glide-beacons-v1", DEFAULT_BEACONS),
  signals: loadAndMerge("glide-signals-v1", DEFAULT_SIGNALS),
  lighthouses: loadAndMerge("glide-lighthouses-v1", DEFAULT_LIGHTHOUSES),
  growing: loadAndMerge("glide-growing-v1", DEFAULT_GROWING),
  intentions: load("glide-intentions-v1", {}),
  activeBeacon: "attention",
  activeSignal: "replay",
  activeLighthouse: "response-window",
  detailOpen: null,
  guide: null,
};

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const save = () => {
  localStorage.setItem("glide-beacons-v1", JSON.stringify(state.beacons));
  localStorage.setItem("glide-signals-v1", JSON.stringify(state.signals));
  localStorage.setItem("glide-lighthouses-v1", JSON.stringify(state.lighthouses));
  localStorage.setItem("glide-growing-v1", JSON.stringify(state.growing));
  localStorage.setItem("glide-intentions-v1", JSON.stringify(state.intentions));
};

function guidance(text) {
  const q = text.toLowerCase();
  if (/(momentum|spiral|attention|focus|outrage|comparison|negativ|doom|bad news|what i consume|feeding|climate)/.test(q))
    return [
      "Your attention may be giving momentum to a climate you did not consciously choose.",
      "This is not a demand to deny reality or force positivity. Perception does not determine everything, but it powerfully shapes your lived experience—your breath, nervous system, energy, and next choice. You can notice what is true without repeatedly feeding what you do not want to grow.",
      "Every moment is a vote for the life I am creating.",
      "Find one real signal of safety, beauty, gratitude, curiosity, or possibility. Stay with it for three breaths and let this moment cast one gentle vote in your chosen direction.",
    ];
  if (/(food|eat|eating|scroll|numb|comfort|hide|avoid)/.test(q))
    return [
      "Comfort may be helping you turn down the volume on life’s invitation.",
      "There is no need to shame the impulse. First ask what you actually need: nourishment, restoration, or the courage to face what is calling you.",
      "I stand tall when life calls me.",
      "Pause before reaching. Ask: am I nourishing myself, restoring myself, or hiding from the call?",
    ];
  if (/(misunderstood|perception|clarity|explain myself|what they think)/.test(q))
    return [
      "You can help someone understand you without handing them authority over who you are.",
      "Clarity is a social skill; self-erasure is a survival strategy. Improve the bridge if the relationship deserves it, but do not rebuild yourself to fit another person’s projection.",
      "I may shape how I am understood without surrendering who I am.",
      "Offer one clear sentence. Then notice whether they are trying to understand before offering more.",
    ];
  if (/(recover|healing|produce|productive|cost me|drained|disruption)/.test(q))
    return [
      "Something difficult cost you real energy.",
      "Recovery is not evidence that you are behind. Compensating asks you to perform as though nothing happened; healing lets your system complete the return.",
      "Healing deserves time.",
      "Restore before producing. Choose the smallest act that tells your body the disruption is over.",
    ];
  if (/(control|steering|fix them|their reaction|mirroring|energy I dislike)/.test(q))
    return [
      "This is your response window.",
      "You cannot take over another person’s nervous system or free will. You can stay steady, become curious about what they are protecting, and offer direction without force.",
      "I lead from the response window.",
      "Steady yourself first. Ask what is worth amplifying in this room, then respond from that quality.",
    ];
  if (/(maya|samir|kid|child|mother|parent|room|independ)/.test(q))
    return [
      "This may be grief and love arriving together.",
      "A familiar shape of motherhood is changing. Being needed differently is not the same as being loved less. The independence in front of you is partly the fruit of the safety and agency you helped create.",
      "Love changes its shape as people grow.",
      "Offer space without withdrawing love. Then give your own heart one kind thing it needs today.",
    ];
  if (/(meeting|work|leader|roadmap|executive|speak|present|questioned|inarticulate)/.test(q))
    return [
      "You do not need to perform certainty to lead.",
      "Activation may be pulling your attention inward—toward how you sound or how you are judged. Your strongest leadership begins when attention returns to the room and the useful question in front of you.",
      "My leadership is my attention.",
      "Feel your feet. Take one slower breath. Ask: what does this room need from me now?",
    ];
  if (/(replay|ruminat|said|argument|conversation|tonight|sleep)/.test(q))
    return [
      "Your mind is trying to complete a loop that may not need completing tonight.",
      "Replaying can feel like preparation, but it keeps the nervous system inside a moment that has already passed. You may keep the insight and set down the charge.",
      "Tomorrow belongs to tomorrow’s Charu.",
      "Write one useful sentence from the experience. Let the rest remain unfinished until morning.",
    ];
  if (/(selfish|family|prove|defend|called me|label|misunderstand)/.test(q))
    return [
      "Not every story told about you deserves a home inside you.",
      "Someone else’s words may contain information, projection, or both. You can examine the evidence without entering a courtroom where your worth is on trial.",
      "I decide which stories about me become part of me.",
      "Ask whether the label matches your careful observation and values. Keep any truth; release the rest.",
    ];
  if (/(afraid|fear|shrink|survival|safe|belong|censor)/.test(q))
    return [
      "An old survival response may be speaking in a life that has changed.",
      "Fear can be real without being in charge. You have built freedom, judgment, and the capacity to revise your choices without abandoning yourself.",
      "I no longer shrink for survival.",
      "Make your body feel safe, then choose the smallest honest expression that does not abandon you.",
    ];
  if (/(tired|overwhelm|busy|body|health|exhaust|calendar|too much)/.test(q))
    return [
      "Your body may be the first beacon asking to be seen.",
      "Urgency can make care look optional. It is not. Returning early may be water, a meal, ten quiet minutes, or one thing removed from the day.",
      "I return early.",
      "Choose one act of vitality and one thing you will not carry today.",
    ];
  return [
    "You do not need to solve the whole path from here.",
    "Pause long enough to separate what is happening from the story gathering around it. Notice what belongs to you, what does not, and which choice leaves you closer to your center.",
    "Cultivate the posture of the observer.",
    "Name the feeling, soften your grip, and choose only the next faithful step.",
  ];
}

function renderNav() {
  const html = NAV.map(
    ([id, label]) =>
      `<button class="${state.tab === id ? "active" : ""}" data-tab="${id}">
        <i class="nav-dot ${id}"></i><span>${label}</span>
      </button>`,
  ).join("");
  document.querySelector(".desktop-nav").innerHTML = html;
  document.querySelector(".mobile-nav").innerHTML = html;
}

const heading = (tone, kicker, title, copy, action = "") => `
  <header class="section-heading">
    <div><p class="kicker ${tone}">${kicker}</p><h2>${title}</h2><p>${copy}</p></div>
    ${action}
  </header>`;

function renderBeacons() {
  const active =
    state.beacons.find((item) => item.id === state.activeBeacon) || state.beacons[0];
  return `
    <section class="page-content">
      ${heading("green-text", "Move toward", "Beacons", "You do not need to hold every principle in mind. You only need to see the next light.", '<button class="quiet-button" data-add="beacon">+ Add a beacon</button>')}
      <div class="philosophy-layout">
        <div class="light-grid">
          ${state.beacons
            .map(
              (item) => `<button class="light-card beacon-card ${item.id === active.id ? "selected" : ""}" data-beacon="${item.id}">
                <i class="beacon-light"></i><small>${escapeHtml(item.category)}</small>
                <strong>${escapeHtml(item.title)}</strong><span>Open beacon →</span>
              </button>`,
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function renderDrift() {
  const active =
    state.signals.find((item) => item.id === state.activeSignal) || state.signals[0];
  return `
    <section class="page-content">
      ${heading("red-text", "Notice early", "Early drift signals", "These are not failures. They are warning lights that make an early, gentle return possible.", '<button class="quiet-button red-button" data-add="signal">+ Add a signal</button>')}
      <div class="philosophy-layout">
        <div class="light-grid">
          ${state.signals
            .map(
              (item) => `<button class="light-card signal-card ${item.id === active.id ? "selected" : ""}" data-signal="${item.id}">
                <i class="signal-light"></i><small>Early warning</small>
                <strong>${escapeHtml(item.title)}</strong><span>Understand signal →</span>
              </button>`,
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function renderLighthouses() {
  const active = state.lighthouses.find((item) => item.id === state.activeLighthouse) || state.lighthouses[0];
  return `
    <section class="page-content">
      ${heading("violet-text", "Illuminate the path", "Lighthouses", "Beacons guide me home. Lighthouses are how my steadiness, attention, and love help others orient without pressure.")}
      <div class="philosophy-layout">
        <div class="light-grid">
          ${state.lighthouses.map((item) => `<button class="light-card lighthouse-card ${item.id === active.id ? "selected" : ""}" data-lighthouse="${item.id}">
            <i class="lighthouse-light"></i><small>Influence</small><strong>${escapeHtml(item.title)}</strong><span>Open lighthouse →</span>
          </button>`).join("")}
        </div>
      </div>
    </section>`;
}

function renderDetailOverlay() {
  if (!state.detailOpen) return "";

  const config = {
    beacon: {
      items: state.beacons,
      activeId: state.activeBeacon,
      panelClass: "beacon-detail",
      lightClass: "green",
      label: "Your nearest beacon",
    },
    signal: {
      items: state.signals,
      activeId: state.activeSignal,
      panelClass: "signal-detail",
      lightClass: "red",
      label: "You noticed",
    },
    lighthouse: {
      items: state.lighthouses,
      activeId: state.activeLighthouse,
      panelClass: "lighthouse-detail",
      lightClass: "violet",
      label: "How you illuminate",
    },
  }[state.detailOpen];

  if (!config) return "";
  const item = config.items.find((entry) => entry.id === config.activeId) || config.items[0];
  const isSignal = state.detailOpen === "signal";
  const body = isSignal ? item.meaning : item.context;
  const practiceLabel = isSignal ? "Nearest beacon" : "Practice";
  const practiceText = isSignal ? item.beacon : item.practice;
  const returnButton = isSignal
    ? `<button data-return="${escapeHtml(item.beacon)}">Return to this beacon</button>`
    : "";

  return `<div class="detail-overlay" role="dialog" aria-modal="true" aria-label="${escapeHtml(item.title)}">
    <button class="detail-backdrop" data-close-detail aria-label="Close details"></button>
    <article class="detail-modal detail-panel ${config.panelClass}">
      <button class="detail-close" data-close-detail aria-label="Close details">×</button>
      <i class="large-light ${config.lightClass}"></i>
      <small>${config.label}</small>
      <h3>${escapeHtml(item.title)}</h3><hr>
      <p>${escapeHtml(body)}</p>
      <div class="practice"><small>${practiceLabel}</small><strong>${escapeHtml(practiceText)}</strong>${returnButton}</div>
      <div class="detail-actions">
        <button class="detail-done" data-close-detail>Done</button>
        <button class="detail-next" data-detail-next>Next item →</button>
      </div>
    </article>
  </div>`;
}

function renderGrowing() {
  return `<section class="page-content">
    ${heading("sprout-text", "Wisdom in motion", "Growing philosophy", "Not every insight needs to become a principle immediately. Let it breathe here until its true shape becomes clear.", '<button class="quiet-button sprout-button" data-add="growing">+ Add an insight</button>')}
    <div class="growing-grid">
      ${state.growing.map((item) => `<article class="growing-card"><div class="sprout-mark">↗</div><small>${escapeHtml(item.status || "Exploring")}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.note)}</p><div class="promotion-row"><span>Could become</span><b>Beacon · Drift Signal · Lighthouse</b></div></article>`).join("")}
    </div>
  </section>`;
}

function renderGuide() {
  const response = state.guide
    ? `<article class="guide-response">
        <small>A reflection from your philosophy</small>
        <h3>${escapeHtml(state.guide[0])}</h3><p>${escapeHtml(state.guide[1])}</p>
        <blockquote><i class="beacon-light"></i><div><small>Your beacon</small><strong>${escapeHtml(state.guide[2])}</strong></div></blockquote>
        <div class="next-step"><small>One next step</small><p>${escapeHtml(state.guide[3])}</p></div>
        <button class="text-button" data-reset-guide>Begin again</button>
      </article>`
    : `<article class="return-home-card">
        <img src="images/charu-path.jpg" alt="">
        <div class="photo-copy"><small>Return home</small><blockquote>“You do not need to see the whole path. Find the next visible beacon.”</blockquote></div>
      </article>`;

  return `<section class="guide-page">
    <div class="guide-copy">
      <p class="kicker blue-text">Find the next step</p><h2>Tell me what’s happening.</h2>
      <p class="guide-intro">Bring the unedited version. Glide will reflect your own living philosophy back to you—one useful beacon at a time.</p>
      <form id="guide-form">
        <label for="guide-input">What are you feeling or carrying?</label>
        <textarea id="guide-input" rows="7" placeholder="I keep replaying a conversation from yesterday…" required></textarea>
        <div class="emotion-row">${["Fearful", "Angry", "Grieving", "Scattered", "Ashamed"].map((x) => `<button type="button" data-feeling="${x}">${x}</button>`).join("")}</div>
        <button class="primary-button" type="submit">Guide me home <span>→</span></button>
      </form>
    </div><div>${response}</div>
  </section>`;
}

function renderAnchors() {
  return `<section class="page-content">
    ${heading("gold-text", "Nourish life", "Your four anchors", "These are not tasks to complete. They are places to return energy, attention, and love.")}
    <div class="anchor-layout"><div class="anchor-grid">
      ${ANCHORS.map(
        ([name, prompt, suggestion]) => `<article class="anchor-card">
          <i>${name[0]}</i><small>${suggestion}</small><h3>${name}</h3><p>${prompt}</p>
          <label>Today’s intention<input data-intention="${name}" value="${escapeHtml(state.intentions[name] || "")}" placeholder="One gentle sentence…"></label>
        </article>`,
      ).join("")}
    </div>
    <aside class="season-card"><img src="images/charu-sunset.jpg" alt=""><div>
      <p class="kicker">The season of return</p><h3>Your hands are becoming free.</h3>
      <p>Not because your purpose is ending, but because its nature is changing. There is room now for your body, dreams, creativity, friendships, joy, and a wider life.</p>
    </div></aside></div>
  </section>`;
}

function render() {
  renderNav();
  const page =
    state.tab === "beacons"
      ? renderBeacons()
      : state.tab === "drift"
        ? renderDrift()
        : state.tab === "guide"
          ? renderGuide()
          : state.tab === "lighthouses"
            ? renderLighthouses()
            : state.tab === "anchors"
              ? renderAnchors()
              : renderGrowing();
  document.getElementById("content").innerHTML = page + renderDetailOverlay();
  document.body.classList.toggle("detail-open", Boolean(state.detailOpen));
}

function setTab(tab) {
  state.tab = tab;
  if (!['beacons', 'drift', 'lighthouses'].includes(tab)) state.detailOpen = null;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDialog(mode) {
  const dialog = document.getElementById("add-dialog");
  dialog.dataset.mode = mode;
  document.getElementById("dialog-title").textContent =
    mode === "beacon" ? "Add a beacon" : mode === "signal" ? "Add an early signal" : "Add a growing insight";
  document.getElementById("add-form").innerHTML =
    mode === "beacon"
      ? `<label>Principle<input name="title" placeholder="I…" required></label>
         <label>Context<textarea name="context" rows="4" placeholder="What happened, and what did you realize?" required></textarea></label>
         <label>Practice<input name="practice" placeholder="What does this ask you to remember?"></label>
         <button class="primary-button" type="submit">Save beacon</button>`
      : mode === "signal" ? `<label>Signal<input name="title" placeholder="I’m noticing…" required></label>
         <label>What it usually means<textarea name="meaning" rows="4" placeholder="What may be happening underneath?" required></textarea></label>
         <label>Nearest beacon<input name="beacon" placeholder="Which principle helps you return?"></label>
         <button class="primary-button" type="submit">Save signal</button>`
      : `<label>Emerging insight<input name="title" placeholder="I’m beginning to see…" required></label>
         <label>What is unfolding<textarea name="note" rows="5" placeholder="Let the thought remain unfinished…" required></textarea></label>
         <button class="primary-button" type="submit">Save insight</button>`;
  dialog.showModal();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.tab) setTab(button.dataset.tab);
  if (button.dataset.status) setTab(button.dataset.status);
  if (button.dataset.beacon) {
    state.activeBeacon = button.dataset.beacon;
    state.detailOpen = "beacon";
    render();
  }
  if (button.dataset.signal) {
    state.activeSignal = button.dataset.signal;
    state.detailOpen = "signal";
    render();
  }
  if (button.dataset.lighthouse) {
    state.activeLighthouse = button.dataset.lighthouse;
    state.detailOpen = "lighthouse";
    render();
  }
  if (button.hasAttribute("data-close-detail")) {
    state.detailOpen = null;
    render();
  }
  if (button.hasAttribute("data-detail-next")) {
    const lists = {
      beacon: [state.beacons, "activeBeacon"],
      signal: [state.signals, "activeSignal"],
      lighthouse: [state.lighthouses, "activeLighthouse"],
    };
    const [items, activeKey] = lists[state.detailOpen];
    const currentIndex = items.findIndex((item) => item.id === state[activeKey]);
    state[activeKey] = items[(currentIndex + 1) % items.length].id;
    render();
  }
  if (button.dataset.add) openDialog(button.dataset.add);
  if (button.classList.contains("dialog-close"))
    document.getElementById("add-dialog").close();
  if (button.dataset.return) {
    const found = state.beacons.find((item) => item.title === button.dataset.return);
    const lighthouse = state.lighthouses.find((item) => item.title === button.dataset.return);
    if (found) {
      state.activeBeacon = found.id;
      state.detailOpen = "beacon";
      setTab("beacons");
    } else if (lighthouse) {
      state.activeLighthouse = lighthouse.id;
      state.detailOpen = "lighthouse";
      setTab("lighthouses");
    }
  }
  if (button.dataset.feeling) {
    const input = document.getElementById("guide-input");
    input.value = input.value
      ? `${input.value} I feel ${button.dataset.feeling.toLowerCase()}.`
      : `I feel ${button.dataset.feeling.toLowerCase()} because `;
    input.focus();
  }
  if (button.hasAttribute("data-reset-guide")) {
    state.guide = null;
    render();
  }
});

document.addEventListener("input", (event) => {
  if (!event.target.dataset.intention) return;
  state.intentions[event.target.dataset.intention] = event.target.value;
  save();
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "guide-form") {
    event.preventDefault();
    state.guide = guidance(document.getElementById("guide-input").value);
    render();
  }
});

document.getElementById("add-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const mode = document.getElementById("add-dialog").dataset.mode;
  const id = `custom-${Date.now()}`;
  if (mode === "beacon") {
    state.beacons.push({
      id,
      category: "Growing philosophy",
      title: data.title,
      context: data.context,
      practice: data.practice || "Pause and remember what this asks of me.",
    });
    state.activeBeacon = id;
  } else if (mode === "signal") {
    state.signals.push({
      id,
      title: data.title,
      meaning: data.meaning,
      beacon: data.beacon || "I return early.",
    });
    state.activeSignal = id;
  } else {
    state.growing.push({ id, title: data.title, note: data.note, status: "Exploring" });
  }
  save();
  document.getElementById("add-dialog").close();
  render();
  const toast = document.getElementById("toast");
  toast.textContent = mode === "beacon" ? "New beacon added." : mode === "signal" ? "New drift signal added." : "New insight planted.";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
});

document.querySelector(".brand").addEventListener("click", () => setTab("beacons"));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.detailOpen) {
    state.detailOpen = null;
    render();
  }
});
render();
