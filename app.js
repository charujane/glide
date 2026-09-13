import {
  audioStudioMarkup,
  bindAudioStudio,
  finishAudioStudio,
  getRecordingPin,
  playSavedVoiceNote,
  saveVoiceNoteBlob,
  stopAudioSession,
  unlockRecordingPin,
} from "./audio.js";

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
    id: "voice-before-comfort",
    category: "Expression",
    title: "When discomfort arises, I pause and give it voice before seeking comfort.",
    context:
      "When I feel activated, blocked, overwhelmed, lonely, disconnected, or emotionally uncomfortable, comfort may not be what I need first. I can pause long enough to notice whether something inside me wants expression. I do not have to solve it, explain it perfectly, or force an answer. I simply give it a chance to have a voice.",
    practice: "Ask: What is asking to be spoken right now?",
  },
  {
    id: "energy-rightful-direction",
    category: "Stewardship",
    title: "My intensity is energy looking for its rightful direction. I don’t have to spend it on whatever happens to be in front of me.",
    context: `There is a powerful drive in me—to search, understand, create, solve, build, and go deep.

Sometimes that energy attaches itself to something small, and I can mistake the intensity of the drive for the importance of the task.

I don’t need to suppress this energy. And I don’t need to obey it.

I am learning to steward it.

My purpose may not arrive as one grand revelation. I can discover it by noticing, over time, where this energy repeatedly wants to go.

PARKING THE FIRE

1. Stop. Put down the phone or step away from what I am doing.

2. Feel the fire. For about 20 seconds, notice the intensity in my body without trying to discharge it.

3. Name what it grabbed: “My energy grabbed ________.”

4. Ask once: What might this energy actually want to move toward?

5. If something comes up, capture one sentence or a short voice note. Do not investigate it further.

6. Place a hand over my chest and close: “I am not extinguishing this. I am parking the fire. It will still be here tomorrow.”

Then leave the activity.

Do not immediately redirect the energy into researching my purpose or another problem. The purpose of Parking the Fire is to experience having intense energy without needing to spend it.`,
    practice: "What is this energy actually trying to move toward? Ask once, capture one sentence if it comes, and leave the activity. I am not extinguishing this. I am parking the fire. It will still be here tomorrow.",
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
    id: "unblocked-river",
    category: "Flow",
    title: "Life flows where I stop damming my own energy.",
    context:
      "Sometimes my energy becomes trapped behind fear, overthinking, unnecessary obligations, or trying to satisfy expectations that aren’t mine. When those blockers fall away, my energy naturally flows toward what feels alive. This became vivid during a severe rainstorm after I received weather warnings and drove home from Costco. When I got into the car, I discovered that the trunk wasn’t properly closed and had to get back into the rain to close it. I deliberately reframed the annoyance and thought that perhaps those few extra seconds had a reason. Shortly afterward, a huge lightning strike hit the road immediately ahead of my car. I experienced it as an extraordinarily close call and a moment of profound clarity. What stayed with me was how quickly the unnecessary fell away. Fear, expectations, and things that don’t deserve my life suddenly seemed much less important. I felt my own energy becoming unblocked.",
    practice:
      "Ask: What is blocking my energy today? If that blocker were gone, where would my energy naturally go? Does this deserve my life? Is this coming from my authentic self or from an old pattern?",
  },
  {
    id: "shared-wonder",
    category: "Connection",
    title: "Connection grows through shared wonder.",
    context:
      "Some of my deepest connection with my kids comes from shared curiosity—walking outside, noticing trees and water, collecting seeds, playing little games, and talking without rush. I don’t need elaborate plans. I need moments of shared noticing. This Beacon came alive during a walk with my daughter at Holy Trinity School while my son was at soccer practice. We walked for more than an hour through beautiful surroundings. We talked about the new school year and did affirmations together. We noticed the smell of the trees and a clear running stream and listened to the sound of the water. We collected interesting things from nature, played catch with a bean or pod we found, and collected seeds to plant at home. Later that night, my daughter told me that the walk was the highlight of her day. This is what Shared Wonder feels like to me: nature, movement, curiosity, play, conversation, and presence.",
    practice: "Ask: Where could we wonder together today?",
  },
  {
    id: "prepare-for-joy",
    category: "Joy",
    title: "I prepare for joy.",
    context:
      "Small preparations make spontaneous joy easier. A play kit in the car means that when life offers us an opportunity to play badminton, pickleball, or simply stay outside longer, it is easier to say yes.",
    practice: "Ask: What small preparation would help me say yes when opportunity appears?",
  },
  {
    id: "authentic-current",
    category: "Authenticity",
    title: "When I stop giving energy to what isn’t truly mine, my authentic life emerges naturally.",
    context:
      "During a severe rainstorm after I received weather warnings, I drove home from Costco. When I got into the car, I discovered that the trunk wasn’t properly closed and had to get back into the rain to close it. I deliberately reframed the annoyance and thought that perhaps those few extra seconds had a reason. Shortly afterward, a huge lightning strike hit the road immediately ahead of my car. I experienced it as an extraordinarily close call and a moment of profound clarity. What stayed with me was how quickly the unnecessary fell away. Fear, expectations, and things that don’t deserve my life suddenly seemed much less important. I felt my own energy becoming unblocked. When I release what comes from fear, expectation, or an old pattern, the current of my authentic life does not need to be forced. It emerges naturally.",
    practice: "Ask: Does this deserve my life? Is this coming from my authentic self or from an old pattern?",
  },
  {
    id: "fit-framework-to-me",
    category: "Body Wisdom",
    title: "I adapt frameworks to fit my body. I do not contort my body to fit frameworks.",
    context:
      "I spent years trying to contort my body to fit clothes. I eventually became freer when I reversed the relationship: I buy clothes that fit and honor my body rather than trying to make my body fit a predetermined size. I want to bring that same freedom to food. A framework like 18:6 or 16:8 is a tool, not something my body has to obey. If thinking about a fasting window makes me overeat because I am afraid of becoming hungry later, the framework is not serving me in that form. What ultimately matters is learning what leaves my particular body nourished, energized, light and satisfied.",
    practice: "Ask: What framework fits and honors my body today?",
  },
  {
    id: "satisfy-hunger-fire",
    category: "Nourishment",
    title: "Respond to the hunger that actually exists.",
    context:
      "Vinoja told me that sometimes at night she has one rye cracker simply to give her hunger fire something, and then she feels content. That inspired me because I often interpret hunger as: I need a full meal now so I can stop eating for a long time afterward. There is another possibility. Notice the hunger. Give it what it needs. Notice satisfaction. Stop. Food can be available without needing to be consumed preemptively.",
    practice: "Notice hunger. Offer enough. Notice satisfaction. Stop.",
  },
  {
    id: "hoarding-daemon",
    category: "Nourishment",
    title: "I don’t need to eat tomorrow’s food tonight. Tomorrow’s hunger belongs to tomorrow’s me.",
    context:
      "Sometimes in the evening I feel like a hoarding daemon—as though I need to prepare for a coming famine. There are two different signals I want to learn to distinguish. Physical hunger: my body is asking for nourishment right now. The hoarding daemon: ‘The eating window is closing. This is your last chance. Eat enough now so you won’t be hungry later.’ The second signal is anticipatory scarcity, not necessarily present-moment hunger. Rigid ideas such as 18:6 can amplify this for me. I start provisioning against future hunger rather than responding to the body I actually have in this moment. I don’t need to suppress the daemon or fight with it. I can notice it. I can eat enough to satisfy the hunger that actually exists, pause, and notice whether I am satisfied, still light, and still physically hungry—or trying to prevent tomorrow’s hunger. My desired evening state is not maximum fullness. It is satisfied, nourished, light, and sleep-ready. This connects to another principle I already hold: I do not need to solve tomorrow tonight.",
    practice:
      "Ask: How hungry is my body right now? How loud is the hoarding daemon? Eat enough for the hunger that exists, pause, and ask: Am I satisfied? Do I still feel light? Is my body still hungry? Or am I trying to prevent tomorrow’s hunger?",
  },
  {
    id: "one-gentle-step",
    category: "Navigation",
    title: "Clear intention. One gentle step. Then another.",
    context:
      "During an overnight awakening, I wanted to return to sleep. I elevated my head so I could breathe comfortably, listened to the gentle gong from my breathing app, and focused on one breath at a time. Thoughts came. My attention wandered. I did not castigate myself or doubt my ability. I applauded myself for having a clear intention. Then I simply returned and took the next step well. I eventually had beautiful sleep. Wandering is not failure. Know the intention. Do the next thing well. Return gently.",
    practice: "Name the intention. Do the next thing well. Return gently.",
  },
  {
    id: "true-co-creator",
    category: "Creation",
    title: "I am here to be a true co-creator.",
    context:
      "I experience life as a relationship with something larger than myself. Challenges can reveal sticking points—places where fear, resistance, or old patterns remain. Instead of asking only, ‘Why is this happening to me?’ I can ask: What wants to become freer through this? My role is not simply to receive life. I want to participate in its creation—to become freer, more open, and more capable of channeling the gifts available through me.",
    practice: "Ask: What wants to become freer through this?",
  },
  {
    id: "creation-through-relationship",
    category: "Relationship",
    title: "I don’t command the system I inhabit. I collaborate with it.",
    context:
      "I am consciousness, and I am also my tissues. I see this as fractal. At another scale there are people, creatures, objects, environments and systems within my purview. To change a state, I don’t have to dominate all of its parts. We can work together. This applies to my body, my family, leadership, teams and my environment. Creation happens through relationship rather than control.",
    practice: "Collaborate with the body, person, or system instead of commanding it.",
  },
  {
    id: "cultivate-guide",
    category: "Guidance",
    title: "Cultivate the presence of a guide.",
    context:
      "I want to become someone whose energy and presence naturally make people want to reach out for guidance. I don’t need to convince people that I am a guide or perform wisdom for them. I cultivate clarity, listening, articulation, presence, generosity and wisdom. When someone reaches out, I help them see more clearly and find their own way forward.",
    practice: "Listen closely. Help the person see clearly and find their own way forward.",
  },
  {
    id: "observer-glides",
    category: "Observer",
    title: "Gentle intention is not weak intention.",
    context:
      "I am discovering that forceful control often creates more resistance. My observer can know exactly where I want to go while remaining gentle about how I get there. When attention wanders, I return. When something doesn’t work, I adjust. I don’t turn deviation into self-doubt. The observer glides: clear in direction, light-handed in execution, and trusting in the return.",
    practice: "Hold direction clearly. Execute lightly. Trust the return.",
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
    practice: "Ask: Does this deserve my energy? Optional deeper reflection: Is this worthy of my life?",
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
    id: "how-i-walk-purpose",
    title: "I am not walking toward some distant summit where my life will finally become meaningful. How I walk is my purpose.",
    context: `WHAT I WANT TO REMEMBER

This Lighthouse came from a morning when I woke with a familiar heaviness in my chest—a gloomy, constricted feeling that felt like carrying luggage. This feeling has visited me many times.

Part of it may be grief for what I did not receive growing up. I did not experience my life force simply being cherished as precious. I learned, implicitly, that value came from being useful, accomplishing something, doing something worthwhile, or proving myself.

That old equation can still appear:

Useful = valuable.
Achievement = purpose.
Struggle = seriousness.
Suffering = a meaningful life.
Joy and spaciousness = dilly-dallying.

But these are inherited equations. I do not have to organize my life around them.

On this particular morning, I was also confronting the contrast between my life and the lives of people around me. Some people I love are struggling. Some people seem freer or more untethered than I feel. Comparison makes my own drag feel heavier.

But while walking outside, something became very clear: My life is already happening.

I was walking because I wanted to walk. I could feel the breeze against my skin. I was looking at plants, insects, sunlight and color. I felt myself becoming lighter.

This is not what I do while waiting for my real life to begin. This is my life.

I don't have to earn the right to enjoy it. I don't have to add enough value to humanity to justify my existence. I don't have to discover and fulfill some cosmic duty before I can say that my life mattered.

I am already precious. I am already a life force worthy of being cherished.

My purpose is not a verdict waiting for me at the end of my life. My purpose is expressed in how I walk through my life: how deeply I inhabit it; how honestly I listen to myself; how freely I express myself; how much room I give to curiosity, creation, connection, love, beauty, music, nature, rest and joy; and how courageously I follow what feels genuinely alive in me.

JOY IS MY TRAINING GROUND

Joy is not a distraction from purpose. Joy is my training ground.

This is particularly important for me because allowing joy, spaciousness and apparently “unproductive” time can sometimes make me feel purposeless. I am learning another way.

When I give my joy room, I become more connected to myself. From that connection, I can hear what repeatedly calls me.

Purpose does not require torture. Purpose may require commitment, perseverance, discipline, frustration, repetition and doing difficult things. But suffering is not evidence that I am living meaningfully.

I already possess enormous drive and perseverance. I do not need to manufacture struggle. I need to learn where I genuinely want to direct my life force.

Joy helps me hear. Purpose gives me direction. Commitment carries me when joy temporarily isn't there.

DIRECTION OVER DRAG

There may still be drag. Grief may arise. Heaviness may arise. Dread may arise. Old conditioning may arise. Comparison may arise. I do not need to become completely untethered before I am allowed to run.

The drag can exist without steering my life. Its return does not mean I have failed or gone backward.

When I notice the drag, I do not need to investigate it endlessly, fear it, numb it, or make eliminating it my project. I can acknowledge it: There is the drag. And then ask: Where is my direction?

Sometimes the drag may even be useful information. It can remind me to look at whether I have drifted away from my own life—whether joy, expression, connection, creativity or something deeply alive in me needs more room.

The drag is a signal, not a verdict. I can cherish the part of me carrying the weight while continuing to move toward my own life.

It came back. And I kept moving. That is freedom.

WHEN I START COMPARING

Other people may appear untethered. They are living their lives. I am living mine. I don't need their experience in order for mine to be beautiful.

Comparison takes my attention away from the extraordinary life already happening around and within me. Return to my own path. Return to what I love. Return to what wants expression. Return to this moment.

THE PRACTICE

When I feel gloomy, heavy, constrained or purposeless:

1. Notice the drag. I don't need to immediately explain or eliminate it.

2. Give it compassion. I can say: I feel you. You are allowed to be here.

3. Don't give it the whole field. Look around. What else is here? What is beautiful? What is alive? What wants my attention?

4. Ask: Where is my direction? What part of me wants more room to live right now?

5. Take one step toward my own life. Not toward proving myself. Not toward earning value. Toward living.

REMEMBER

I cherish my life force when it is productive and when it is resting. When it is exuberant and when it is gloomy. When it is creating something extraordinary and when it simply wants to feel the breeze.

I don't have to prove my value. I don't have to fulfill a cosmic duty. I don't have to reach a distant summit.

The way I walk is the life. The way I walk is the practice. The way I walk is my purpose.

I am already precious. Now I get to live.`,
    practice: "There is the drag. I feel you. You are allowed to be here. Where is my direction? What part of me wants more room to live right now?",
  },
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
  ["hearth", "Hearth", "Take one step"],
  ["beacons", "Beacons", "Move toward"],
  ["drift", "Drift signals", "Notice early"],
  ["guide", "Guide me", "Find the next step"],
  ["lighthouses", "Lighthouses", "Illuminate"],
  ["anchors", "Anchors", "Nourish life"],
  ["growing", "Growing", "Let wisdom evolve"],
];

const HEARTH_GROUPS = [
  {
    id: "connect",
    icon: "💛",
    title: "Connect",
    actions: [
      ["hug-maya", "Hug Maya"],
      ["hug-samir", "Hug Samir"],
      ["curious-question", "Ask one curious question"],
      ["walk-together", "Go for a 10-minute walk together"],
      ["shared-wonder", "Create one moment of shared wonder"],
    ],
  },
  {
    id: "voice",
    icon: "🎙️",
    title: "Give it a Voice",
    actions: [
      ["talk-chatgpt", "Talk with ChatGPT"],
      ["voice-note", "Record a 2-minute voice note"],
      ["journal-five", "Journal for 5 minutes"],
      ["unsaid-sentence", "Write the one sentence I haven’t said yet"],
      ["schedule-conversation", "Schedule the conversation if now isn’t the right time"],
    ],
  },
  {
    id: "ground",
    icon: "🌳",
    title: "Ground",
    actions: [
      ["step-outside", "Step outside"],
      ["walk-ten", "Walk for 10 minutes"],
      ["look-trees", "Look at trees"],
      ["look-birds", "Look for birds"],
      ["five-beautiful-things", "Notice five beautiful things"],
      ["sit-water", "Sit beside water if available"],
    ],
  },
  {
    id: "restore",
    icon: "🍵",
    title: "Restore",
    actions: [
      ["drink-water", "Drink a glass of water"],
      ["tulsi-tea", "Make Tulsi tea"],
      ["nourishing-meal", "Eat a nourishing meal if physically hungry"],
      ["stretch-two", "Stretch for 2 minutes"],
      ["breathing-gong", "Do my breathing practice with the gong"],
      ["short-nap", "Take a short nap if I’m tired"],
    ],
  },
  {
    id: "create",
    icon: "🎨",
    title: "Create",
    actions: [
      ["crochet-fifteen", "Crochet for 15 minutes"],
      ["build-glide", "Build my Glide app"],
      ["magazine-article", "Read one magazine article"],
      ["leadership-beacon", "Listen to one Leadership Beacon"],
      ["articulation-run", "Practice one 20-second articulation run"],
    ],
  },
  {
    id: "perspective",
    icon: "🧠",
    title: "Return to Perspective",
    actions: [
      ["return-hearth", "Return to the hearth."],
      ["deserves-energy", "Ask: What deserves my energy right now?"],
      ["today-or-memory", "Ask: Am I responding to today or to an old memory?"],
      ["asking-spoken", "Ask: What is asking to be spoken?"],
      ["physical-or-comfort", "Ask: Is this physical hunger or emotional comfort?"],
      ["remember-agency", "Remember: I have agency."],
      ["remember-enough", "Remember: There is enough."],
    ],
  },
];

const ALL_HEARTH_ACTIONS = HEARTH_GROUPS.flatMap((group) =>
  group.actions.map(([id, label]) => ({ id, label, groupId: group.id, groupTitle: group.title, icon: group.icon })),
);

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

const DEFAULT_VOICE_SETTINGS = {
  enabled: false,
  rhythm: "daily",
  customTimes: [],
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
};

const savedVoiceSettings = load("glide-voice-checkin-settings-v1", DEFAULT_VOICE_SETTINGS);
const initialVoiceCheckinOpen = new URLSearchParams(window.location.search).get("checkin") === "voice";
const localDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const todayKey = localDateKey();
const morningHour = new Date().getHours();
const shouldOpenMorning = morningHour >= 4 && morningHour < 12
  && load("glide-morning-greeting-last-shown-v1", "") !== todayKey
  && !initialVoiceCheckinOpen;

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
  hearthFeedback: load("glide-hearth-feedback-v1", {}),
  hearthAction: null,
  voiceSettings: { ...DEFAULT_VOICE_SETTINGS, ...savedVoiceSettings },
  voiceEntries: load("glide-voice-checkin-entries-v1", []),
  voiceCheckinOpen: initialVoiceCheckinOpen,
  voiceCheckinMode: null,
  voiceCheckinStatus: "",
  morningOpen: shouldOpenMorning,
  morningMode: null,
  morningStatus: "",
  morningEntries: load("glide-morning-reflections-v1", []),
  energyObservations: load("glide-energy-observations-v1", []),
  energyStatus: "",
};

// Put this new Lighthouse first once for existing browsers, without changing or replacing saved items.
const storedLighthouses = load("glide-lighthouses-v1", []);
if (!Array.isArray(storedLighthouses) || !storedLighthouses.some((item) => item.id === "how-i-walk-purpose")) {
  const newLighthouse = state.lighthouses.find((item) => item.id === "how-i-walk-purpose");
  state.lighthouses = [newLighthouse, ...state.lighthouses.filter((item) => item.id !== "how-i-walk-purpose")];
  localStorage.setItem("glide-lighthouses-v1", JSON.stringify(state.lighthouses));
}

if (state.morningOpen) localStorage.setItem("glide-morning-greeting-last-shown-v1", JSON.stringify(todayKey));

let checkinRecorder = null;
let checkinStream = null;
let checkinChunks = [];
let morningRecorder = null;
let morningStream = null;
let morningChunks = [];
let energyRecorder = null;
let energyStream = null;
let energyChunks = [];
let energyPendingBlob = null;
let energySaving = false;

const pickUpBeacon = state.beacons.find((item) => item.id === "pick-up");
if (pickUpBeacon && !String(pickUpBeacon.practice || "").includes("Is this worthy of my life?")) {
  const existingPractice = String(pickUpBeacon.practice || "Ask: Does this deserve my energy?").trim();
  pickUpBeacon.practice = `${existingPractice} Optional deeper reflection: Is this worthy of my life?`;
  try {
    localStorage.setItem("glide-beacons-v1", JSON.stringify(state.beacons));
  } catch {
    // The updated reflection still remains available for this session.
  }
}

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
  localStorage.setItem("glide-hearth-feedback-v1", JSON.stringify(state.hearthFeedback));
  localStorage.setItem("glide-voice-checkin-settings-v1", JSON.stringify(state.voiceSettings));
  localStorage.setItem("glide-voice-checkin-entries-v1", JSON.stringify(state.voiceEntries));
  localStorage.setItem("glide-morning-reflections-v1", JSON.stringify(state.morningEntries));
  localStorage.setItem("glide-energy-observations-v1", JSON.stringify(state.energyObservations));
};

function addVoiceEntry(type, content = "") {
  state.voiceEntries.unshift({ id: `voice-entry-${Date.now()}`, type, content, createdAt: new Date().toISOString() });
  state.voiceEntries = state.voiceEntries.slice(0, 250);
  save();
}

function addMorningEntry(type, content = "", recordingId = "") {
  state.morningEntries.unshift({
    id: `morning-${Date.now()}`,
    type,
    content,
    recordingId,
    date: localDateKey(),
    createdAt: new Date().toISOString(),
  });
  state.morningEntries = state.morningEntries.slice(0, 250);
  save();
}

function addEnergyObservation(type, content = "", recordingId = "") {
  state.energyObservations.unshift({
    id: `energy-${Date.now()}-${crypto.randomUUID()}`,
    type, content, recordingId,
    createdAt: new Date().toISOString(),
  });
  save();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function voiceSettingsMarkup() {
  const settings = state.voiceSettings;
  const support = "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
  return `<section class="voice-reminders">
    <div class="voice-reminder-heading"><div><small>Daily gentle check-in</small><h4>Voice before comfort</h4></div><span>${settings.enabled ? "Reminder on" : "Reminder off"}</span></div>
    <p>One quiet evening invitation to notice whether something inside you wants expression. Delivery will usually be around 8–10 p.m. Toronto time.</p>
    ${support ? `
    <div class="voice-reminder-actions">
      ${settings.enabled ? "" : '<button type="button" data-save-voice-reminders>Turn on daily reminder</button>'}
      ${settings.enabled ? '<button type="button" data-disable-voice-reminders>Turn off</button>' : ""}
    </div>
    <p class="voice-reminder-status" data-voice-reminder-status>${escapeHtml(state.voiceCheckinStatus || "On iPhone, install Glide to your Home Screen before turning reminders on.")}</p>` : '<p class="voice-reminder-status">This browser does not support background notifications.</p>'}
  </section>`;
}

function voiceCheckinOverlayMarkup() {
  if (!state.voiceCheckinOpen) return "";
  const mode = state.voiceCheckinMode;
  const pinField = !getRecordingPin()
    ? '<label class="checkin-pin">Recording PIN<input type="password" inputmode="numeric" data-checkin-pin placeholder="Your private PIN"></label>'
    : "";
  const actionArea = mode === "journal"
    ? `<form class="checkin-entry" data-checkin-journal><label>Give it a few words<textarea rows="4" name="entry" autofocus placeholder="What wants to be expressed?"></textarea></label><button type="submit">Save this entry</button></form>`
    : mode === "record"
      ? `<div class="checkin-entry">${pinField}<p data-checkin-record-status>${escapeHtml(state.voiceCheckinStatus || "Your voice will be saved privately with a timestamp.")}</p><div class="checkin-record-actions"><button type="button" data-checkin-record>● Record</button><button type="button" data-checkin-stop disabled>Stop & save</button></div></div>`
      : `<div class="checkin-choices">
          <button type="button" data-checkin-mode="record"><span>🎙️</span>Record a voice note</button>
          <button type="button" data-checkin-mode="journal"><span>✍️</span>Write a quick journal entry</button>
          <button type="button" data-checkin-nothing><span>○</span>Nothing right now</button>
        </div>`;
  return `<div class="checkin-overlay" role="dialog" aria-modal="true" aria-label="Voice before comfort check-in">
    <div class="checkin-backdrop"></div>
    <article class="checkin-modal">
      <button class="checkin-close" type="button" data-close-checkin aria-label="Close">×</button>
      <small>A gentle pause</small>
      <h2>What is asking to be spoken right now?</h2>
      <div class="checkin-questions"><p>What am I feeling right now?</p><p>Is there anything left unsaid?</p><p>Am I seeking comfort when what I really need is expression?</p></div>
      ${actionArea}
      <p class="checkin-status" role="status">${escapeHtml(state.voiceCheckinStatus)}</p>
      <div class="checkin-l-actions"><button type="button" data-checkin-skip>Not right now</button></div>
      <blockquote>“You don’t have to solve everything right now. Let’s just take one step back to yourself.”</blockquote>
    </article>
  </div>`;
}

function morningGreetingMarkup() {
  if (!state.morningOpen) return "";
  const mode = state.morningMode;
  const pinField = !getRecordingPin()
    ? '<label class="morning-pin">Recording PIN<input type="password" inputmode="numeric" data-morning-pin placeholder="Your private PIN"></label>'
    : "";
  const history = state.morningEntries.slice(0, 40).map((entry) => {
    const date = new Date(entry.createdAt);
    const label = date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
    if (entry.type === "voice") {
      return `<article class="morning-memory"><small>${escapeHtml(label)}</small><div><span>🎙 Voice reflection</span><button type="button" data-play-morning="${escapeHtml(entry.recordingId)}">Play</button></div></article>`;
    }
    return `<article class="morning-memory"><small>${escapeHtml(label)}</small><p>${escapeHtml(entry.content)}</p></article>`;
  }).join("");
  const responseArea = mode === "write"
    ? `<form class="morning-response" data-morning-write><label>What wants more room today?<textarea name="response" rows="4" autofocus placeholder="A few words are enough."></textarea></label><button type="submit">Save this reflection</button><button type="button" class="morning-text-button" data-morning-back>Back</button></form>`
    : mode === "speak"
      ? `<div class="morning-response">${pinField}<p data-morning-record-status>${escapeHtml(state.morningStatus || "Your voice will be saved privately with today’s date.")}</p><div class="morning-record-actions"><button type="button" data-morning-record>● Record</button><button type="button" data-morning-stop disabled>Stop & save</button></div><button type="button" class="morning-text-button" data-morning-back>Back</button></div>`
      : mode === "history"
        ? `<section class="morning-history"><div class="morning-history-head"><h3>Earlier reflections</h3><button type="button" data-morning-back>Back</button></div>${pinField}${history || "<p>No morning reflections yet.</p>"}</section>`
        : `<div class="morning-actions">
            <button type="button" data-morning-mode="speak"><span>🎙</span><b>Speak it</b><small>Record a short voice note</small></button>
            <button type="button" data-morning-mode="write"><span>✍️</span><b>Write it</b><small>Enter a short response</small></button>
            <button type="button" data-morning-carry><span>🌱</span><b>Just carry it with me</b><small>Nothing needs to be recorded</small></button>
          </div>`;
  return `<div class="morning-overlay" role="dialog" aria-modal="true" aria-label="Morning greeting">
    <div class="morning-backdrop"></div>
    <article class="morning-modal">
      <button class="morning-close" type="button" data-morning-carry aria-label="Carry this with me and close">×</button>
      ${mode === "history" ? responseArea : `<div class="morning-copy">
        <small>Morning, Charu</small>
        <h2>Good morning, Charu.</h2>
        <h3>There is more of you waiting to live.</h3>
        <p>Remember what you have already nurtured.</p>
        <p>You have nurtured two human beings into this world.</p>
        <p>You have built a meaningful career.</p>
        <p>You became a yoga teacher and an Ayurvedic coach.</p>
        <p>You have learned to lead, create, teach, care and begin again.</p>
        <p class="morning-proof"><strong>You have proof.</strong></p>
        <p>You know how to nurture something until it becomes real.</p>
        <p>Now you can bring that same capacity to the parts of yourself that are asking for more life.</p>
        <p>You don’t need to invent a new you.</p>
        <p class="morning-create"><strong>Create room for what is already alive.</strong></p>
        <div class="morning-question"><small>Morning reflection</small><blockquote>What part of me wants a little more room to live today?</blockquote></div>
      </div>${responseArea}`}
      <p class="morning-status" role="status">${escapeHtml(state.morningStatus)}</p>
      ${mode !== "history" && state.morningEntries.length ? '<button type="button" class="morning-past" data-morning-mode="history">Look back at earlier reflections</button>' : ""}
    </article>
  </div>`;
}

function urlBase64ToUint8Array(value) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob((value + padding).replaceAll("-", "+").replaceAll("_", "/"));
  return Uint8Array.from([...binary].map((character) => character.charCodeAt(0)));
}

async function reminderApi(body) {
  const response = await fetch("/api/checkins/subscription", {
    method: "POST",
    headers: { "content-type": "application/json", "x-glide-pin": getRecordingPin() },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "The reminder could not be saved.");
  return data;
}

async function saveVoiceReminders() {
  if (!getRecordingPin()) throw new Error("Unlock the voice studio with your recording PIN first.");
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error("Notifications are not allowed on this device.");
  const registration = await navigator.serviceWorker.ready;
  const configResponse = await fetch("/api/checkins/config");
  const config = await configResponse.json();
  if (!configResponse.ok) throw new Error(config.error || "Notification setup is unavailable.");
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(config.publicKey) });
  }
  await reminderApi({ action: "save", subscription: subscription.toJSON(), settings: state.voiceSettings });
  state.voiceSettings.enabled = true;
  state.voiceCheckinStatus = "Gentle reminders are on for this device.";
  save();
}

async function disableVoiceReminders() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await reminderApi({ action: "delete", endpoint: subscription.endpoint });
    await subscription.unsubscribe();
  }
  state.voiceSettings.enabled = false;
  state.voiceCheckinStatus = "Reminders are off on this device.";
  save();
}

function hearthScore(actionId) {
  const feedback = state.hearthFeedback[actionId] || {};
  const yes = Number(feedback.yes || 0);
  const little = Number(feedback.little || 0);
  const no = Number(feedback.no || 0);
  const total = yes + little + no;
  if (!total) return 0;
  const average = (yes + little * 0.45 - no * 0.35) / total;
  const confidence = Math.min(total / 4, 1);
  return average * confidence;
}

function rankedHearthActions(actions) {
  return [...actions].sort((a, b) => hearthScore(b[0]) - hearthScore(a[0]));
}

function pickHearthAction() {
  const pool = ALL_HEARTH_ACTIONS.filter((action) => action.id !== state.hearthAction);
  const action = pool[Math.floor(Math.random() * pool.length)] || ALL_HEARTH_ACTIONS[0];
  state.hearthAction = action.id;
  render();
}

function recordHearthFeedback(actionId, response) {
  const current = state.hearthFeedback[actionId] || { yes: 0, little: 0, no: 0 };
  current[response] = Number(current[response] || 0) + 1;
  current.lastResponse = response;
  current.lastUsed = Date.now();
  state.hearthFeedback[actionId] = current;
  save();
  state.hearthAction = null;
  render();
  const toast = document.getElementById("toast");
  toast.textContent = response === "yes" ? "Keep this close. It helped." : response === "little" ? "Noted. It helped a little." : "Noted. We’ll let other actions rise.";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

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

function renderHearth() {
  if (state.hearthAction) {
    const action = ALL_HEARTH_ACTIONS.find((item) => item.id === state.hearthAction);
    if (!action) state.hearthAction = null;
    else return `<section class="hearth-focus page-content" aria-live="polite">
      <button class="hearth-back" data-hearth-back>← See all actions</button>
      <article class="hearth-focus-card">
        <span class="hearth-focus-icon" aria-hidden="true">${action.icon}</span>
        <small>${escapeHtml(action.groupTitle)}</small>
        <h2>${escapeHtml(action.label)}</h2>
        <blockquote>“You don’t have to solve everything right now. Let’s just take one step back to yourself.”</blockquote>
        <div class="hearth-reflection">
          <p>Did this help you return to your hearth?</p>
          <div class="hearth-feedback">
            <button data-hearth-rate="yes" data-hearth-id="${action.id}">✅ Yes</button>
            <button data-hearth-rate="little" data-hearth-id="${action.id}">➖ A little</button>
            <button data-hearth-rate="no" data-hearth-id="${action.id}">❌ Not really</button>
          </div>
        </div>
        <button class="hearth-reroll" data-pick-hearth>Choose another for me</button>
      </article>
    </section>`;
  }

  return `<section class="hearth-page page-content">
    <header class="hearth-heading">
      <div><p class="kicker hearth-text">One step back to yourself</p><h2>🌿 Return to the Hearth</h2><p>Choose one small action. That’s enough.</p></div>
      <button class="hearth-pick" data-pick-hearth><span aria-hidden="true">🎲</span> Pick One For Me</button>
    </header>
    <p class="hearth-note">No advice. No pressure. The actions that genuinely help will rise gently over time.</p>
    <div class="hearth-groups">
      ${HEARTH_GROUPS.map((group) => `<section class="hearth-group">
        <header><span aria-hidden="true">${group.icon}</span><h3>${escapeHtml(group.title)}</h3></header>
        <div class="hearth-action-grid">
          ${rankedHearthActions(group.actions).map(([id, label]) => `<button class="hearth-action" data-hearth-action="${id}"><span>${escapeHtml(label)}</span><i aria-hidden="true">→</i></button>`).join("")}
        </div>
      </section>`).join("")}
    </div>
  </section>`;
}

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

function energyObservationsMarkup() {
  const observations = state.energyObservations.map((entry) => {
    const date = new Date(entry.createdAt).toLocaleString([], {
      dateStyle: "medium", timeStyle: "short",
    });
    return `<li><time datetime="${escapeHtml(entry.createdAt)}">${escapeHtml(date)}</time>
      ${entry.type === "voice"
        ? `<button type="button" data-play-energy="${escapeHtml(entry.recordingId)}">▶ Listen to voice note</button>`
        : `<p>${escapeHtml(entry.content)}</p>`}</li>`;
  }).join("");
  return `<section class="energy-observations" aria-label="Parking the Fire observations">
    <small>Parking the Fire · A trace, not a task</small>
    <form data-energy-form>
      <label for="energy-sentence">One sentence, if something comes</label>
      <textarea id="energy-sentence" name="sentence" rows="2" maxlength="700" placeholder="My energy grabbed… It might want to move toward…"></textarea>
      <button type="submit">Save this observation</button>
    </form>
    <div class="energy-voice-actions">
      ${!getRecordingPin() ? '<label>Recording PIN<input type="password" inputmode="numeric" data-energy-pin placeholder="Your private PIN"></label>' : ""}
      <button type="button" data-energy-record ${energyRecorder?.state === "recording" || energySaving ? "disabled" : ""}>🎙 ${energyPendingBlob ? "Try saving again" : "Short voice note"}</button>
      <button type="button" data-energy-stop ${energyRecorder?.state === "recording" ? "" : "disabled"}>Stop & save</button>
      ${energyPendingBlob ? '<button type="button" data-energy-discard>Discard unsaved note</button>' : ""}
    </div>
    <p class="energy-status" role="status">${escapeHtml(state.energyStatus)}</p>
    ${observations ? `<details><summary>Earlier observations</summary><ol>${observations}</ol></details>` : ""}
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
  const practiceLabel = "Reflection prompt";
  const practiceText = isSignal
    ? `What is this signal asking me to stop feeding—and what would an early return to “${item.beacon}” look like?`
    : item.practice;
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
      ${audioStudioMarkup(item.id)}
      ${state.detailOpen === "beacon" && item.id === "voice-before-comfort" ? voiceSettingsMarkup() : ""}
      <div class="transcript-block"><small>Transcript</small><p class="${["energy-rightful-direction", "how-i-walk-purpose"].includes(item.id) ? "energy-context" : ""}">${escapeHtml(body)}</p></div>
      <div class="practice"><small>${practiceLabel}</small><strong>${escapeHtml(practiceText)}</strong>${returnButton}</div>
      ${state.detailOpen === "beacon" && item.id === "energy-rightful-direction" ? energyObservationsMarkup() : ""}
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
    state.tab === "hearth"
      ? renderHearth()
      : state.tab === "beacons"
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
  document.getElementById("content").innerHTML = page + renderDetailOverlay() + voiceCheckinOverlayMarkup() + morningGreetingMarkup();
  document.body.classList.toggle("detail-open", Boolean(state.detailOpen || state.voiceCheckinOpen || state.morningOpen));
  bindAudioStudio();
}

function setTab(tab) {
  state.tab = tab;
  if (!['beacons', 'drift', 'lighthouses'].includes(tab)) state.detailOpen = null;
  if (tab !== "hearth") state.hearthAction = null;
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

function closeMorningGreeting() {
  if (morningRecorder?.state === "recording") {
    const status = document.querySelector("[data-morning-record-status]");
    if (status) status.textContent = "Stop and save your recording before continuing.";
    return false;
  }
  morningStream?.getTracks().forEach((track) => track.stop());
  morningStream = null;
  state.morningOpen = false;
  state.morningMode = null;
  state.morningStatus = "";
  render();
  return true;
}

function setEnergyStatus(message) {
  state.energyStatus = message;
  const status = document.querySelector(".energy-status");
  if (status) status.textContent = message;
}

async function unlockEnergyVoiceIfNeeded() {
  if (getRecordingPin()) return;
  const pin = document.querySelector("[data-energy-pin]")?.value;
  if (!pin) throw new Error("Enter your recording PIN first.");
  await unlockRecordingPin(pin);
}

async function saveEnergyVoice() {
  if (!energyPendingBlob || energySaving) return;
  energySaving = true;
  setEnergyStatus("Saving your observation privately…");
  try {
    // A fresh ID keeps every dated observation; the Beacon's guided recording is untouched.
    const recordingId = `energy-${Date.now()}-${crypto.randomUUID()}`;
    await saveVoiceNoteBlob(energyPendingBlob, recordingId);
    addEnergyObservation("voice", "", recordingId);
    energyPendingBlob = null;
    setEnergyStatus("Voice observation saved. You can leave the activity now.");
  } catch (error) {
    setEnergyStatus(`${error.message} Your note is still here; try saving again or discard it.`);
  } finally {
    energySaving = false;
    render();
  }
}

async function beginEnergyRecording() {
  if (energyPendingBlob) {
    await unlockEnergyVoiceIfNeeded();
    await saveEnergyVoice();
    return;
  }
  if (!await finishAudioStudio()) throw new Error("Finish saving the Beacon recording first.");
  await unlockEnergyVoiceIfNeeded();
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    throw new Error("Voice recording is not supported in this browser.");
  }
  energyStream = await navigator.mediaDevices.getUserMedia({ audio: {
    echoCancellation: true, noiseSuppression: true, autoGainControl: true,
  } });
  const mimeType = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"]
    .find((type) => MediaRecorder.isTypeSupported(type)) || "";
  energyChunks = [];
  energyRecorder = new MediaRecorder(energyStream, mimeType ? { mimeType } : undefined);
  energyRecorder.ondataavailable = (event) => { if (event.data.size) energyChunks.push(event.data); };
  energyRecorder.onstop = async () => {
    energyStream?.getTracks().forEach((track) => track.stop());
    energyStream = null;
    energyPendingBlob = new Blob(energyChunks, { type: energyRecorder.mimeType || mimeType || "audio/webm" });
    energyRecorder = null;
    if (!energyPendingBlob.size) {
      energyPendingBlob = null;
      setEnergyStatus("No sound was captured. You can try again.");
      render();
      return;
    }
    await saveEnergyVoice();
  };
  energyRecorder.start(500);
  const record = document.querySelector("[data-energy-record]");
  const stop = document.querySelector("[data-energy-stop]");
  if (record) { record.disabled = true; record.textContent = "Recording…"; }
  if (stop) stop.disabled = false;
  setEnergyStatus("A short voice note is enough. Stop when you’re ready.");
}

function canLeaveEnergyObservation() {
  if (state.detailOpen !== "beacon" || state.activeBeacon !== "energy-rightful-direction") return true;
  if (!energyRecorder && !energySaving && !energyPendingBlob) return true;
  setEnergyStatus(energyPendingBlob
    ? "Save or discard this unsaved note before leaving."
    : "Stop and let your voice note finish saving before leaving.");
  return false;
}

async function beginMorningRecording() {
  const pinInput = document.querySelector("[data-morning-pin]");
  if (!getRecordingPin()) {
    if (!pinInput?.value) throw new Error("Enter your recording PIN first.");
    await unlockRecordingPin(pinInput.value);
  }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error("Voice recording is not supported in this browser.");
  morningStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  const mimeType = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"].find((type) => MediaRecorder.isTypeSupported(type)) || "";
  morningChunks = [];
  morningRecorder = new MediaRecorder(morningStream, mimeType ? { mimeType } : undefined);
  morningRecorder.ondataavailable = (event) => { if (event.data.size) morningChunks.push(event.data); };
  morningRecorder.onstop = async () => {
    const status = document.querySelector("[data-morning-record-status]");
    try {
      if (status) status.textContent = "Saving your morning reflection privately…";
      const blob = new Blob(morningChunks, { type: morningRecorder.mimeType || mimeType || "audio/webm" });
      const itemId = `morning-${localDateKey().replaceAll("-", "")}-${Date.now()}`;
      await saveVoiceNoteBlob(blob, itemId);
      addMorningEntry("voice", "", itemId);
      morningStream?.getTracks().forEach((track) => track.stop());
      morningStream = null;
      state.morningOpen = false;
      state.morningMode = null;
      state.morningStatus = "";
      render();
      showToast("Morning voice reflection saved.");
    } catch (error) {
      state.morningStatus = `${error.message} Your reflection is still open—please try again.`;
      render();
    }
  };
  morningRecorder.start(500);
  const recordButton = document.querySelector("[data-morning-record]");
  const stopButton = document.querySelector("[data-morning-stop]");
  if (recordButton) { recordButton.disabled = true; recordButton.textContent = "Recording…"; }
  if (stopButton) stopButton.disabled = false;
  const status = document.querySelector("[data-morning-record-status]");
  if (status) status.textContent = "Listening. A few honest words are enough.";
}

function closeVoiceCheckin() {
  if (checkinRecorder?.state === "recording") checkinRecorder.stop();
  checkinStream?.getTracks().forEach((track) => track.stop());
  checkinStream = null;
  state.voiceCheckinOpen = false;
  state.voiceCheckinMode = null;
  state.voiceCheckinStatus = "";
  if (new URLSearchParams(window.location.search).has("checkin")) history.replaceState({}, "", window.location.pathname);
  render();
}

async function beginCheckinRecording() {
  const pinInput = document.querySelector("[data-checkin-pin]");
  if (!getRecordingPin()) {
    if (!pinInput?.value) throw new Error("Enter your recording PIN first.");
    await unlockRecordingPin(pinInput.value);
  }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error("Voice recording is not supported in this browser.");
  checkinStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  const mimeType = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"].find((type) => MediaRecorder.isTypeSupported(type)) || "";
  checkinChunks = [];
  checkinRecorder = new MediaRecorder(checkinStream, mimeType ? { mimeType } : undefined);
  checkinRecorder.ondataavailable = (event) => { if (event.data.size) checkinChunks.push(event.data); };
  checkinRecorder.onstop = async () => {
    const status = document.querySelector("[data-checkin-record-status]");
    try {
      if (status) status.textContent = "Saving your voice privately…";
      const blob = new Blob(checkinChunks, { type: checkinRecorder.mimeType || mimeType || "audio/webm" });
      const itemId = `checkin-${Date.now()}`;
      const record = await saveVoiceNoteBlob(blob, itemId);
      addVoiceEntry("voice", itemId);
      state.voiceCheckinStatus = `Voice note saved at ${new Date(record.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.`;
      checkinStream?.getTracks().forEach((track) => track.stop());
      checkinStream = null;
      render();
    } catch (error) {
      state.voiceCheckinStatus = `${error.message} Your note is still open—please try again.`;
      render();
    }
  };
  checkinRecorder.start(500);
  const recordButton = document.querySelector("[data-checkin-record]");
  const stopButton = document.querySelector("[data-checkin-stop]");
  if (recordButton) { recordButton.disabled = true; recordButton.textContent = "Recording…"; }
  if (stopButton) stopButton.disabled = false;
  const status = document.querySelector("[data-checkin-record-status]");
  if (status) status.textContent = "Listening. Say only what wants a voice.";
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.hasAttribute("data-energy-record")) {
    try { await beginEnergyRecording(); }
    catch (error) {
      energyStream?.getTracks().forEach((track) => track.stop());
      energyStream = null;
      setEnergyStatus(error.message);
    }
    return;
  }
  if (button.hasAttribute("data-energy-stop")) {
    if (energyRecorder?.state === "recording") {
      button.disabled = true;
      button.textContent = "Saving…";
      energyRecorder.stop();
    }
    return;
  }
  if (button.hasAttribute("data-energy-discard")) {
    energyPendingBlob = null;
    setEnergyStatus("Unsaved note discarded. The fire can rest.");
    render();
    return;
  }
  if (button.dataset.playEnergy) {
    try {
      await unlockEnergyVoiceIfNeeded();
      button.disabled = true;
      button.textContent = "Playing…";
      const clip = await playSavedVoiceNote(button.dataset.playEnergy);
      clip.addEventListener("ended", () => { button.disabled = false; button.textContent = "▶ Listen to voice note"; }, { once: true });
    } catch (error) {
      button.disabled = false;
      button.textContent = "▶ Listen to voice note";
      setEnergyStatus(error.message);
    }
    return;
  }
  if (button.dataset.morningMode) {
    state.morningMode = button.dataset.morningMode;
    state.morningStatus = "";
    render();
    return;
  }
  if (button.hasAttribute("data-morning-back")) {
    state.morningMode = null;
    state.morningStatus = "";
    render();
    return;
  }
  if (button.hasAttribute("data-morning-carry")) {
    closeMorningGreeting();
    return;
  }
  if (button.hasAttribute("data-morning-record")) {
    try { await beginMorningRecording(); } catch (error) { state.morningStatus = error.message; render(); }
    return;
  }
  if (button.hasAttribute("data-morning-stop")) {
    if (morningRecorder?.state === "recording") {
      button.disabled = true;
      button.textContent = "Saving…";
      morningRecorder.stop();
    }
    return;
  }
  if (button.dataset.playMorning) {
    try {
      if (!getRecordingPin()) {
        const pin = document.querySelector("[data-morning-pin]")?.value;
        if (!pin) throw new Error("Enter your recording PIN to listen.");
        await unlockRecordingPin(pin);
      }
      button.disabled = true;
      button.textContent = "Playing…";
      const clip = await playSavedVoiceNote(button.dataset.playMorning);
      clip.addEventListener("ended", () => { button.disabled = false; button.textContent = "Play"; }, { once: true });
    } catch (error) {
      state.morningStatus = error.message;
      render();
    }
    return;
  }
  if (button.dataset.checkinMode) {
    state.voiceCheckinMode = button.dataset.checkinMode;
    state.voiceCheckinStatus = "";
    render();
    return;
  }
  if (button.hasAttribute("data-close-checkin")) { closeVoiceCheckin(); return; }
  if (button.hasAttribute("data-checkin-nothing")) {
    addVoiceEntry("nothing");
    closeVoiceCheckin();
    return;
  }
  if (button.hasAttribute("data-checkin-skip")) {
    addVoiceEntry("skipped");
    closeVoiceCheckin();
    return;
  }
  if (button.hasAttribute("data-checkin-record")) {
    try { await beginCheckinRecording(); } catch (error) { state.voiceCheckinStatus = error.message; render(); }
    return;
  }
  if (button.hasAttribute("data-checkin-stop")) {
    if (checkinRecorder?.state === "recording") {
      button.disabled = true;
      button.textContent = "Saving…";
      checkinRecorder.stop();
    }
    return;
  }
  if (button.hasAttribute("data-save-voice-reminders")) {
    state.voiceSettings = { ...state.voiceSettings, rhythm: "daily", customTimes: [], timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Toronto" };
    try {
      button.disabled = true;
      button.textContent = "Saving…";
      await saveVoiceReminders();
    } catch (error) {
      state.voiceCheckinStatus = error.message;
    }
    render();
    return;
  }
  if (button.hasAttribute("data-disable-voice-reminders")) {
    try { await disableVoiceReminders(); } catch (error) { state.voiceCheckinStatus = error.message; }
    render();
    return;
  }
  if (button.dataset.tab) setTab(button.dataset.tab);
  if (button.dataset.status) setTab(button.dataset.status);
  if (button.hasAttribute("data-pick-hearth")) pickHearthAction();
  if (button.dataset.hearthAction) {
    state.hearthAction = button.dataset.hearthAction;
    render();
  }
  if (button.hasAttribute("data-hearth-back")) {
    state.hearthAction = null;
    render();
  }
  if (button.dataset.hearthRate && button.dataset.hearthId) {
    recordHearthFeedback(button.dataset.hearthId, button.dataset.hearthRate);
  }
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
    if (!canLeaveEnergyObservation()) return;
    const originalLabel = button.textContent;
    button.disabled = true;
    if (button.classList.contains("detail-done")) button.textContent = "Saving…";
    const readyToClose = await finishAudioStudio();
    if (!readyToClose) {
      button.disabled = false;
      button.textContent = originalLabel;
      return;
    }
    state.detailOpen = null;
    render();
  }
  if (button.hasAttribute("data-detail-next")) {
    if (!canLeaveEnergyObservation()) return;
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = "Saving…";
    const readyToContinue = await finishAudioStudio();
    if (!readyToContinue) {
      button.disabled = false;
      button.textContent = originalLabel;
      return;
    }
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
  if (event.target.hasAttribute("data-energy-form")) {
    event.preventDefault();
    const content = String(new FormData(event.target).get("sentence") || "").trim();
    if (!content) return;
    addEnergyObservation("written", content);
    setEnergyStatus("Observation saved with today’s date and time. No need to investigate it now.");
    render();
    return;
  }
  if (event.target.hasAttribute("data-morning-write")) {
    event.preventDefault();
    const response = String(new FormData(event.target).get("response") || "").trim();
    if (!response) return;
    addMorningEntry("written", response);
    state.morningOpen = false;
    state.morningMode = null;
    render();
    showToast("Morning reflection saved.");
    return;
  }
  if (event.target.matches("[data-checkin-journal]")) {
    event.preventDefault();
    const entry = new FormData(event.target).get("entry")?.trim();
    if (!entry) return;
    addVoiceEntry("journal", entry);
    closeVoiceCheckin();
    return;
  }
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
document.addEventListener("keydown", async (event) => {
  if (event.key === "Escape" && state.morningOpen) {
    closeMorningGreeting();
    return;
  }
  if (event.key === "Escape" && state.voiceCheckinOpen) {
    closeVoiceCheckin();
    return;
  }
  if (event.key === "Escape" && state.detailOpen) {
    if (!canLeaveEnergyObservation()) return;
    const readyToClose = await finishAudioStudio();
    if (!readyToClose) return;
    state.detailOpen = null;
    render();
  }
});
navigator.serviceWorker?.addEventListener("message", (event) => {
  if (event.data?.type !== "OPEN_VOICE_CHECKIN") return;
  state.morningOpen = false;
  state.voiceCheckinOpen = true;
  state.voiceCheckinMode = null;
  state.voiceCheckinStatus = "";
  render();
});
render();

if (state.voiceCheckinOpen) history.replaceState({}, "", window.location.pathname);
