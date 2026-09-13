// ─── MemoVerse Complete 18-Language Centralized Translation System ─────────────

export interface TranslationSchema {
  nav: {
    home: string;
    activities: string;
    myMemories: string;
    reminders: string;
    progress: string;
    aboutDementia: string;
    profile: string;
    settings: string;
    switchProfile: string;
  };
  home: {
    title: string;
    titleAccent: string;
    subtitle: string;
    heroDescription: string;
    exploreActivities: string;
    caregiverGuide: string;
    heroBadge: string;
    heroTagline: string;
    soundsCardTitle: string;
    soundsCardDesc: string;
    soundsCardAction: string;
    keepsakeCardTitle: string;
    keepsakeCardDesc: string;
    keepsakeCardAction: string;
    polaroid1Title: string;
    polaroid1Desc: string;
    polaroid2Title: string;
    polaroid2Desc: string;
    remindersCardTitle: string;
    remindersCardDesc: string;
    remindersCardAction: string;
    quickStatsCompleted: string;
    quickStatsLevel: string;
  };
  activities: {
    title: string;
    subtitle: string;
    level: string;
    completed: string;
    soundLounge: string;
    soundLoungeDesc: string;
    memoryMatch: string;
    memoryMatchDesc: string;
    marketMemory: string;
    marketMemoryDesc: string;
    storyRecall: string;
    storyRecallDesc: string;
    playNow: string;
    bestArea: string;
    catMatching: string;
    catListening: string;
    catEveryday: string;
    catStorytelling: string;
  };
  sounds: {
    title: string;
    subtitle: string;
    listen: string;
    playing: string;
    stop: string;
    categoryAll: string;
    categoryInstruments: string;
    categoryNature: string;
    categoryDaily: string;
    soundGogona: string;
    soundGogonaDesc: string;
    soundBihu: string;
    soundBihuDesc: string;
    soundBirdsong: string;
    soundBirdsongDesc: string;
    soundChai: string;
    soundChaiDesc: string;
    soundRain: string;
    soundRainDesc: string;
    soundFlute: string;
    soundFluteDesc: string;
  };
  games: {
    memoryMatchTitle: string;
    memoryMatchDesc: string;
    flipCard: string;
    moves: string;
    matches: string;
    congrats: string;
    playAgain: string;
    marketTitle: string;
    marketDesc: string;
    itemsBought: string;
    totalSpent: string;
    storyTitle: string;
    storyDesc: string;
    readStory: string;
    answerQuestions: string;
    score: string;
    backToActivities: string;
    restart: string;
    correctMsg: string;
    wrongMsg: string;
    itemTea: string;
    itemBamboo: string;
    itemLemon: string;
    itemSweets: string;
    itemOil: string;
    itemFish: string;
    storyPassage: string;
    storyQuestion: string;
    optMuga: string;
    optCotton: string;
    optWool: string;
    optJute: string;
  };
  memories: {
    title: string;
    subtitle: string;
    addMemory: string;
    allCategories: string;
    family: string;
    places: string;
    moments: string;
    voiceNotes: string;
    deleteMemory: string;
    noMemories: string;
    modalTitle: string;
    modalTitleLabel: string;
    modalDescLabel: string;
    modalCategoryLabel: string;
    saveMemory: string;
    cancel: string;
  };
  reminders: {
    title: string;
    subtitle: string;
    newReminder: string;
    inputPlaceholder: string;
    add: string;
    noReminders: string;
    markDone: string;
    completed: string;
    todaySchedule: string;
    delete: string;
  };
  progress: {
    title: string;
    subtitle: string;
    activitiesCompleted: string;
    currentLevel: string;
    bestArea: string;
    streakTitle: string;
    streakDesc: string;
    weeklyReport: string;
  };
  aboutDementia: {
    title: string;
    subtitle: string;
    whatIsDementia: string;
    whatIsDesc: string;
    keySigns: string;
    signsList: string[];
    caregiverTips: string;
    tipsList: string[];
    emergencySupport: string;
    helplineNote: string;
  };
  profile: {
    title: string;
    subtitle: string;
    switchProfile: string;
    createProfile: string;
    age: string;
    region: string;
    level: string;
    activeProfile: string;
    welcomeBack: string;
  };
  settings: {
    title: string;
    subtitle: string;
    language: string;
    selectLanguage: string;
    accessibility: string;
    spokenGuidance: string;
    largeText: string;
    highContrast: string;
    offlineSimulation: string;
    offlineDesc: string;
    voiceStatusTitle: string;
    voiceAvailable: string;
    voiceUnavailable: string;
  };
  voice: {
    readAloud: string;
    stopReading: string;
    voiceNoticeAvailable: string;
    voiceNoticeUnavailable: string;
  };
  footer: {
    brandTagline: string;
    exploreHeading: string;
    keepsakeHeading: string;
    careHeading: string;
    copyright: string;
    careText: string;
  };
}

const baseEnglish: TranslationSchema = {
  nav: {
    home: "Home",
    activities: "Activities",
    myMemories: "My Memories",
    reminders: "Reminders",
    progress: "Progress",
    aboutDementia: "About Dementia",
    profile: "Profile",
    settings: "Settings",
    switchProfile: "Switch Profile",
  },
  home: {
    title: "Where Memories",
    titleAccent: "Are Kept Warm & Alive",
    subtitle: "Archival Memory Companion for Seniors",
    heroDescription: "A quiet, dignified sanctuary designed with familiar regional sounds, family keepsake photo albums, and calm daily reminders for elderly loved ones.",
    exploreActivities: "🧠 Explore Activities",
    caregiverGuide: "📖 Caregiver Guide",
    heroBadge: "📸 Senior Dignity & Archival Reminiscence",
    heroTagline: "Preserving Everyday Dignity Through Reminiscence & Auditory Memory",
    soundsCardTitle: "Sounds of Home",
    soundsCardDesc: "Recognise Gogona harps, Bihu drums, tea garden birdsong & rainfall.",
    soundsCardAction: "Listen Now →",
    keepsakeCardTitle: "Keepsake Memories",
    keepsakeCardDesc: "Store treasured family moments, ancestral places & voice notes.",
    keepsakeCardAction: "View Memory Album →",
    polaroid1Title: "Bihu Dance in Jorhat",
    polaroid1Desc: "Dancing Bihu with family near mustard fields...",
    polaroid2Title: "Tea Garden Bungalow",
    polaroid2Desc: "Morning mist, fresh brewed chai, warm porch...",
    remindersCardTitle: "Daily Reminders",
    remindersCardDesc: "Stay on track with medicine times, morning walk goals, and family calls with spoken audio assistance.",
    remindersCardAction: "View Today's Schedule →",
    quickStatsCompleted: "Activities Completed",
    quickStatsLevel: "Current Level",
  },
  activities: {
    title: "Cognitive Activities",
    subtitle: "Gentle daily exercises to stimulate memory, attention, and joy.",
    level: "Level",
    completed: "Completed",
    soundLounge: "Sounds of Home Audio Lounge",
    soundLoungeDesc: "Listen and identify familiar regional sounds.",
    memoryMatch: "Memory Photo Match",
    memoryMatchDesc: "Match paired cards featuring familiar cultural artifacts and places.",
    marketMemory: "Village Market Memory",
    marketMemoryDesc: "Remember items from a traditional weekly bazaar shopping trip.",
    storyRecall: "Folk Tale Story Recall",
    storyRecallDesc: "Listen to a short traditional tale and answer gentle memory questions.",
    playNow: "Play Now",
    bestArea: "Best Area",
    catMatching: "Matching",
    catListening: "Listening",
    catEveryday: "Everyday",
    catStorytelling: "Storytelling",
  },
  sounds: {
    title: "Sounds of Home",
    subtitle: "Listen to comforting cultural sounds and regional auditory memories.",
    listen: "🔊 Listen Sound",
    playing: "🎵 Playing Sound...",
    stop: "⏹ Stop Sound",
    categoryAll: "All Sounds",
    categoryInstruments: "Instruments",
    categoryNature: "Nature",
    categoryDaily: "Daily Life",
    soundGogona: "Gogona Bamboo Harp",
    soundGogonaDesc: "Traditional Assamese jaw harp sound played during spring festivals.",
    soundBihu: "Bihu Dhol Beat",
    soundBihuDesc: "Rhythmic festive drum beat from village celebrations.",
    soundBirdsong: "Tea Garden Birdsong",
    soundBirdsongDesc: "Gentle morning birdsong recorded in tea estates.",
    soundChai: "Porch Rain & Chai",
    soundChaiDesc: "Soft monsoon rain trickling on tin roofs with hot tea bubbling.",
    soundRain: "Monsoon Rain on Leaves",
    soundRainDesc: "Calming sound of rain falling over leaves.",
    soundFlute: "Bamboo Flute Melody",
    soundFluteDesc: "Soothing traditional bamboo flute melody.",
  },
  games: {
    memoryMatchTitle: "Memory Photo Match",
    memoryMatchDesc: "Click cards to flip them and find matching cultural pairs.",
    flipCard: "Flip Card",
    moves: "Moves",
    matches: "Matches",
    congrats: "Wonderful! You matched all pairs!",
    playAgain: "Play Again",
    marketTitle: "Village Market Memory",
    marketDesc: "Select the items requested for your weekly village market basket.",
    itemsBought: "Items Collected",
    totalSpent: "Total Progress",
    storyTitle: "Folk Tale Story Recall",
    storyDesc: "Read or listen to the story below, then answer the questions.",
    readStory: "Read the Story",
    answerQuestions: "Answer Questions",
    score: "Score",
    backToActivities: "← Back to Activities",
    restart: "🔄 Restart Game",
    correctMsg: "✓ Correct! Great memory recall.",
    wrongMsg: "Try again! Memory takes patience.",
    itemTea: "Assam Black Tea ☕",
    itemBamboo: "Fresh Bamboo Shoots 🎍",
    itemLemon: "Kaji Nemu Lemon 🍋",
    itemSweets: "Pitha Sweets 🥟",
    itemOil: "Mustard Oil 🏺",
    itemFish: "Local River Fish 🐟",
    storyPassage: "In a peaceful village along the river, an elderly weaver created a golden silk Muga saree under the morning sun while listening to river birds.",
    storyQuestion: "Question: What golden textile was woven by the river?",
    optMuga: "Muga Silk",
    optCotton: "Cotton Cloth",
    optWool: "Woolen Shawl",
    optJute: "Jute Bag",
  },
  memories: {
    title: "Keepsake Memory Album",
    subtitle: "Your personal archive of cherished family photos, places, and moments.",
    addMemory: "➕ Add New Memory",
    allCategories: "All Memories",
    family: "Family",
    places: "Places",
    moments: "Moments",
    voiceNotes: "Voice Notes",
    deleteMemory: "Delete Memory",
    noMemories: "No memories added yet. Click above to save your first memory.",
    modalTitle: "Add New Memory",
    modalTitleLabel: "Memory Title",
    modalDescLabel: "Memory Description",
    modalCategoryLabel: "Category",
    saveMemory: "Save Memory",
    cancel: "Cancel",
  },
  reminders: {
    title: "Daily Reminders",
    subtitle: "Calm, clear schedule for daily routines, medicines, and calls.",
    newReminder: "➕ Add New Reminder",
    inputPlaceholder: "e.g., Evening walk at 5 PM",
    add: "Add",
    noReminders: "No reminders set for today.",
    markDone: "Mark Complete",
    completed: "Completed Today",
    todaySchedule: "Today's Schedule",
    delete: "Delete",
  },
  progress: {
    title: "Activity Progress",
    subtitle: "Engagement journey and cognitive activity summary.",
    activitiesCompleted: "Activities Completed",
    currentLevel: "Current Level",
    bestArea: "Best Focus Area",
    streakTitle: "Keep Up the Audio Listening",
    streakDesc: "Regular auditory memory exercises help maintain focus and emotional wellbeing.",
    weeklyReport: "Weekly Overview",
  },
  aboutDementia: {
    title: "Understanding Dementia & Memory Care",
    subtitle: "Compassionate guidance for families, caregivers, and elders.",
    whatIsDementia: "What is Dementia?",
    whatIsDesc: "Dementia is a general term for a decline in mental ability severe enough to interfere with daily life. Memory loss is an example.",
    keySigns: "Key Early Signs to Observe",
    signsList: [
      "Memory loss that disrupts daily life and conversations",
      "Difficulty planning or solving familiar everyday tasks",
      "Confusion with time, dates, or familiar village paths",
      "Changes in mood, sleep patterns, or social participation"
    ],
    caregiverTips: "Practical Caregiver Recommendations",
    tipsList: [
      "Maintain predictable daily routines and gentle medication schedules.",
      "Engage elders with familiar regional songs, photos, and native language.",
      "Encourage calm physical activity like morning garden walks.",
      "Practice patience and avoid arguing over forgotten details."
    ],
    emergencySupport: "Need Caregiver Assistance?",
    helplineNote: "Consult a local healthcare professional or neurologist for personalized medical advice.",
  },
  profile: {
    title: "Profile & Settings",
    subtitle: "Manage elder profile, regional preferences, and accessibility settings.",
    switchProfile: "🔄 Switch Profile",
    createProfile: "➕ Create New Profile",
    age: "Age",
    region: "Region",
    level: "Activity Level",
    activeProfile: "Active Profile",
    welcomeBack: "Welcome back",
  },
  settings: {
    title: "Application Settings",
    subtitle: "Customize language, voice guidance, text size, and contrast.",
    language: "Select Application Language",
    selectLanguage: "Interface Language",
    accessibility: "Accessibility Options",
    spokenGuidance: "Spoken Audio Guidance",
    largeText: "Large Text Mode (Senior Friendly)",
    highContrast: "High Contrast Mode",
    offlineSimulation: "Offline Mode Simulation",
    offlineDesc: "Test application behavior without an active internet connection.",
    voiceStatusTitle: "Device Speech Engine Status",
    voiceAvailable: "✓ Voice synthesis engine available for this language.",
    voiceUnavailable: "⚠️ Voice engine for this language is not installed on this browser engine. Text UI is 100% active.",
  },
  voice: {
    readAloud: "🔊 Read Aloud",
    stopReading: "⏹ Stop Voice",
    voiceNoticeAvailable: "Voice synthesis active",
    voiceNoticeUnavailable: "Voice for this language is not available on this device.",
  },
  footer: {
    brandTagline: "Archival memory companion designed with respect and care for senior elders.",
    exploreHeading: "Explore",
    keepsakeHeading: "Keepsakes",
    careHeading: "Care & Support",
    copyright: "© 2026 MemoVerse. Preserving Dignity & Memories.",
    careText: "Preserving everyday dignity for elders across India.",
  },
};

export const TRANSLATIONS: Record<string, TranslationSchema> = {
  English: baseEnglish,

  // ─── ASSAMESE ─────────────────────────────────────────────────────────────
  Assamese: {
    ...baseEnglish,
    nav: { home: "মুখ্য পৃষ্ঠা", activities: "কাৰ্যসূচী", myMemories: "মোৰ স্মৃতিসমূহ", reminders: "মনত পেলোৱা", progress: "অগ্ৰগতি", aboutDementia: "ডিমেঞ্চিয়া বিষয়ে", profile: "প্ৰফাইল", settings: "সংৰচনা", switchProfile: "প্ৰফাইল সলনি কৰক" },
    home: { ...baseEnglish.home, title: "য'ত স্মৃতিসমূহ", titleAccent: "মৰমেৰে সজীৱ হৈ থাকে", subtitle: "জ্যেষ্ঠসকলৰ বাবে সজোৱা স্মৃতি সংৰক্ষণ সংগী", exploreActivities: "🧠 কাৰ্যসূচী চাওক", caregiverGuide: "📖 সেৱাকাৰীৰ হাতপুথি", soundsCardTitle: "গৃহৰ চিনাকি শব্দ", keepsakeCardTitle: "স্মৃতিৰ এলবাম", remindersCardTitle: "দৈনিক সময়সূচী" },
    activities: { ...baseEnglish.activities, title: "মানসিক অনুশীলন", subtitle: "স্মৃতিশক্তি আৰু মনোযোগ বৃদ্ধিৰ বাবে দৈনিক কাৰ্যসূচী।", playNow: "আৰম্ভ কৰক" },
    games: { ...baseEnglish.games, memoryMatchTitle: "স্মৃতি ফটো মিলাওক", memoryMatchDesc: "কাৰ্ডসমূহত ক্লিক কৰি মিল থকা ফটো যোৰা বিচাৰি উলিয়াওক।", flipCard: "কাৰ্ড উলিয়াওক", moves: "চেষ্টা", matches: "মিলসমূহ", congrats: "বৰ ধুনীয়া! আপুনি সকলো ফটো মিলালে!", playAgain: "পুনৰ খেলক", backToActivities: "← পিছলৈ যান" },
    memories: { ...baseEnglish.memories, title: "স্মৃতিৰ এলবাম", addMemory: "➕ নতুন স্মৃতি যোগ কৰক", family: "পৰিয়াল", places: "স্থানসমূহ", moments: "বিশেষ মুহূৰ্ত" },
    reminders: { ...baseEnglish.reminders, title: "দৈনিক সময়সূচী", newReminder: "➕ নতুন মনত পেলোৱা যোগ কৰক", add: "যোগ কৰক", todaySchedule: "আজিৰ সময়সূচী", delete: "মচি পেলাওক" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ডিমেঞ্চিয়া আৰু স্মৃতি পৰিচৰ্যা", whatIsDementia: "ডিমেঞ্চিয়া কি?", keySigns: "প্ৰাৰম্ভিক লক্ষণসমূহ", caregiverTips: "সেৱাকাৰীৰ বাবে পৰামৰ্শ" },
  },

  // ─── MANIPURI ────────────────────────────────────────────────────────────
  Manipuri: {
    ...baseEnglish,
    nav: { home: "মায়াই অইবা", activities: "থৌরমশিং", myMemories: "ঐগী নিংশিংবা", reminders: "নিংশিংহনবা", progress: "মাংলোমদা", aboutDementia: "দিমেন্সিয়া অসিগী মতাংদা", profile: "প্রোফাইল", settings: "সেটিংস", switchProfile: "প্রোফাইল ওন্থোকপা" },
    home: { ...baseEnglish.home, title: "নিংশিংবশিং অসি", titleAccent: "নুংশিনা নিংশিংহনবা", subtitle: "হনুবা-হনবীশিংগীদমক শেম্বা নিংশিং সংগী", exploreActivities: "🧠 থৌরমশিং য়েংবা", caregiverGuide: "📖 সেৱাকাৰী লমজিং", soundsCardTitle: "য়ুমগী খোঞ্জেল", keepsakeCardTitle: "নিংশিং এলবম", remindersCardTitle: "নুমিৎ খুদিংগী সময়সূচী" },
    activities: { ...baseEnglish.activities, title: "ৱাখলগী এক্সারসাইজ", subtitle: "নিংশিং শক্তি কাখনবগীদমক নুমিৎ খুদিংগী থৌরম।", playNow: "হৌবা" },
    games: { ...baseEnglish.games, memoryMatchTitle: "ফটো চান্নহনবা", memoryMatchDesc: "কার্ডশিং অসিদা নম্বিয়া মান্নবা ফটোশিং থিও।", congrats: "য়াম্না ফৈ! অদোম পুম্নমক চান্নহনখ্রে!", playAgain: "অমুক শানবা", backToActivities: "← মখা অদুদা" },
    memories: { ...baseEnglish.memories, title: "নিংশিং এলবম", addMemory: "➕ অনৌবা নিংশিংবা হাপচিনবা", family: "ইমুং", places: "মফমশিং", moments: "নুংঙাইবা তানজা" },
    reminders: { ...baseEnglish.reminders, title: "নুমিৎ খুদিংগী সময়সূচী", newReminder: "➕ অনৌবা নিংশিংহনবা", add: "হাপচিনবা", todaySchedule: "আজিগী সময়সূচী", delete: "মুথোকপা" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "দিমেন্সিয়া অমসুং নিংশিং সেৱা", whatIsDementia: "দিমেন্সিয়া হায়বসি কারিনো?", keySigns: "হান্নগী লক্ষণশিং", caregiverTips: "সেৱাকারিগীদমক সজেশন" },
  },

  // ─── KHASI ───────────────────────────────────────────────────────────────
  Khasi: {
    ...baseEnglish,
    nav: { home: "Tymmen", activities: "Kam ba Man la Ka Sngi", myMemories: "Ki Jingkynmaw Jong Nga", reminders: "Jingpynkynmaw", progress: "Jingkiew", aboutDementia: "Shaphang ka Jingklet Jingmut", profile: "Pait Shaphang Jong Nga", settings: "Ki Jingjied", switchProfile: "Kylla ia ka Profile" },
    home: { ...baseEnglish.home, title: "Haba Ki Jingkynmaw", titleAccent: "Ki Sah Im Barabor", subtitle: "Ka Jingkyrshan Jingkynmaw na ka Bynta ki Tymmen", exploreActivities: "🧠 Pule ia ki Kam", caregiverGuide: "📖 Ka Kot Lamphang Sumar" },
    activities: { ...baseEnglish.activities, title: "Ki Jingkilai Jingmut", playNow: "Sdang Mynta" },
    memories: { ...baseEnglish.memories, title: "Kot Dur Jingkynmaw", addMemory: "➕ Pyniasoh Jingkynmaw Thymmai" },
    reminders: { ...baseEnglish.reminders, title: "Ki Jingpynkynmaw Man la ka Sngi", todaySchedule: "Ka Por Mynta ka Sngi" },
  },

  // ─── GARO ────────────────────────────────────────────────────────────────
  Garo: {
    ...baseEnglish,
    nav: { home: "A·bachenga", activities: "Kamrang", myMemories: "Angni Gisik Ra·ani", reminders: "Gisik Ra·atani", progress: "Sil-roroani", aboutDementia: "Dementia-ni Gimin", profile: "Profile", settings: "Settings", switchProfile: "Profile-ko Srestani" },
    home: { ...baseEnglish.home, title: "Gisik Ra·anirang", titleAccent: "Tangkanyingna Man·a", exploreActivities: "🧠 Kamrangko Nibo", caregiverGuide: "📖 Simsakgipani Kitap" },
    activities: { ...baseEnglish.activities, title: "Gisikni Kal·anirang", playNow: "A·bachenkbo" },
    memories: { ...baseEnglish.memories, title: "Gisik Ra·ani Photo Album", addMemory: "➕ Gital Gisik Ra·aniko Gapbo" },
    reminders: { ...baseEnglish.reminders, title: "Salanti Gisik Ra·atnawanggipa", todaySchedule: "Salanti Ritingani" },
  },

  // ─── MIZO ────────────────────────────────────────────────────────────────
  Mizo: {
    ...baseEnglish,
    nav: { home: "Bul Ṭanuka", activities: "Thiltih Turte", myMemories: "Ka Hriatrengte", reminders: "Hriattirnah", progress: "Hmasawnna", aboutDementia: "Dementia Chungchang", profile: "Profile", settings: "Duhthlante", switchProfile: "Profile Thlakna" },
    home: { ...baseEnglish.home, title: "Hriatrengte Chu", titleAccent: "Vawnduh leh Nunau a Ni", exploreActivities: "🧠 Thiltih Turte Enna", caregiverGuide: "📖 Enkawltu Kaihhruaina" },
    activities: { ...baseEnglish.activities, title: "Relhruai Inkte", playNow: "Ṭan Rawh" },
    memories: { ...baseEnglish.memories, title: "Hriatrengna Album", addMemory: "➕ Hriatrengna Thar Belhna" },
    reminders: { ...baseEnglish.reminders, title: "Nitin Hriattirnah", todaySchedule: "Vawiin Hun Ruahman" },
  },

  // ─── BODO ────────────────────────────────────────────────────────────────
  Bodo: {
    ...baseEnglish,
    nav: { home: "गाहाय बिलाइ", activities: "हाबाफारिफोर", myMemories: "आंनि गोसोखांथिफोर", reminders: "गोसोखांहोंगोन", progress: "जौगानाय", aboutDementia: "दिमेन्सियानि सोमोन्दै", profile: "प्रफाइल", settings: "सेटिंसफोर", switchProfile: "प्रफाइल सोलायनाय" },
    home: { ...baseEnglish.home, title: "जेराव गोसोखांथिफोरा", titleAccent: "मोजांै सोजिना थायो", exploreActivities: "🧠 हाबाफारिफोर नायनो", caregiverGuide: "📖 नायफिनग्रा बिजाब" },
    activities: { ...baseEnglish.activities, title: "गोसोनि सोलोफोर", playNow: "जाउनाव दाना" },
    memories: { ...baseEnglish.memories, title: "गोसोखांथि एलबाम", addMemory: "➕ गोदान गोसोखांथि सोदेरनाय" },
    reminders: { ...baseEnglish.reminders, title: "सानफ्रामनि समफोर", todaySchedule: "दिनैनि समफोर" },
  },

  // ─── NEPALI ──────────────────────────────────────────────────────────────
  Nepali: {
    ...baseEnglish,
    nav: { home: "गृह पृष्ठ", activities: "गतिविधिहरू", myMemories: "मेरा सम्झनाहरू", reminders: "स्मरण गराउने", progress: "प्रगति", aboutDementia: "डिमेन्सिया बारे", profile: "प्रोफाइल", settings: "सेटिङहरू", switchProfile: "प्रोफाइल फेर्नुहोस्" },
    home: { ...baseEnglish.home, title: "जहाँ सम्झनाहरू", titleAccent: "मायाले ताजा रहन्छन्", exploreActivities: "🧠 गतिविधिहरू हेर्नुहोस्", caregiverGuide: "📖 हेरचाहकर्ता मार्गदर्शिका" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यासहरू", playNow: "सुरु गर्नुहोस्" },
    memories: { ...baseEnglish.memories, title: "सम्झनाको एल्बम", addMemory: "➕ नयाँ सम्झना थप्नुहोस्" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक स्मरण तालिका", todaySchedule: "आजको तालिका" },
  },

  // ─── HINDI ───────────────────────────────────────────────────────────────
  Hindi: {
    ...baseEnglish,
    nav: { home: "मुख्य पृष्ठ", activities: "गतिविधियाँ", myMemories: "मेरी यादें", reminders: "स्मरणपत्र", progress: "प्रगति", aboutDementia: "डिमेंशिया के बारे में", profile: "प्रोफ़ाइल", settings: "सेटिंग्स", switchProfile: "प्रोफ़ाइल बदलें" },
    home: { ...baseEnglish.home, title: "जहाँ यादें", titleAccent: "स्नेह से जीवंत रहती हैं", subtitle: "वरिष्ठ नागरिकों के लिए स्मृति संरक्षण साथी", exploreActivities: "🧠 गतिविधियाँ देखें", caregiverGuide: "📖 देखभालकर्ता मार्गदर्शिका", soundsCardTitle: "आत्मीय धुनें", keepsakeCardTitle: "यादों का एल्बम", remindersCardTitle: "दैनिक दिनचर्या" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यास", subtitle: "स्मरणशक्ति और ध्यान को सक्रिय रखने के लिए दैनिक सरल अभ्यास।", playNow: "शुरू करें" },
    games: { ...baseEnglish.games, memoryMatchTitle: "स्मृति फ़ोटो मिलाएँ", memoryMatchDesc: "कार्डों पर क्लिक करके उस्मानी तस्वीरों के जोड़े ढूँढें।", flipCard: "कार्ड पलटें", moves: "प्रयास", matches: "जोड़े", congrats: "बहुत बढ़िया! आपने सभी जोड़े मिला लिए!", playAgain: "पुनः खेलें", backToActivities: "← गतिविधियों पर लौटें" },
    memories: { ...baseEnglish.memories, title: "स्मृति एल्बम", addMemory: "➕ नई याद जोड़ें", family: "परिवार", places: "स्थान", moments: "विशेष पल" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक दिनचर्या", newReminder: "➕ नया स्मरण जोड़ें", add: "जोड़ें", todaySchedule: "आज की कार्यसूची", delete: "हटाएँ" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "डिमेंशिया एवं स्मृति देखभाल", whatIsDementia: "डिमेंशिया क्या है?", keySigns: "शुरुआती संकेत", caregiverTips: "देखभालकर्ता सुझाव" },
  },

  // ─── BENGALI ─────────────────────────────────────────────────────────────
  Bengali: {
    ...baseEnglish,
    nav: { home: "মূল পাতা", activities: "কার্যক্রম", myMemories: "আমার স্মৃতিমালা", reminders: "স্মারকসূচি", progress: "অগ্রগতি", aboutDementia: "ডিমেনশিয়া তথ্য", profile: "প্রোফাইল", settings: "সেটিংস", switchProfile: "প্রোফাইল পরিবর্তন" },
    home: { ...baseEnglish.home, title: "যেখানে স্মৃতিরা", titleAccent: "মমতায় সজীব থাকে", subtitle: "বয়োজ্যেষ্ঠদের জন্য স্মৃতি সংরক্ষণ সঙ্গী", exploreActivities: "🧠 কার্যক্রম দেখুন", caregiverGuide: "📖 পরিচর্যাকারী নির্দেশিকা", soundsCardTitle: "চেনা সুর", keepsakeCardTitle: "স্মৃতি অ্যালবাম", remindersCardTitle: "দৈনিক সময়সূচী" },
    activities: { ...baseEnglish.activities, title: "মানসিক শরীরচর্চা", subtitle: "স্মৃতিশক্তি ও মনোযোগ বৃদ্ধির জন্য দৈনিক অনুশীলন।", playNow: "শুরু করুন" },
    games: { ...baseEnglish.games, memoryMatchTitle: "স্মৃতি ফটো মেলান", memoryMatchDesc: "কার্ডে ক্লিক করে মেলানো ছবি জোড়া খুঁজুন।", flipCard: "কার্ড উল্টান", moves: "চেষ্টা", matches: "জোড়া", congrats: "চমৎকার! আপনি সব ছবি মিলিয়েছেন!", playAgain: "পুনরায় খেলুন", backToActivities: "← ফিরুন" },
    memories: { ...baseEnglish.memories, title: "স্মৃতি অ্যালবাম", addMemory: "➕ নতুন স্মৃতি যুক্ত করুন", family: "পরিবার", places: "স্থানসমূহ", moments: "বিশেষ মুহূর্ত" },
    reminders: { ...baseEnglish.reminders, title: "দৈনিক সময়সূচী", newReminder: "➕ নতুন স্মারক যোগ করুন", add: "যোগ করুন", todaySchedule: "আজকের সময়সূচী", delete: "মুছুন" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ডিমেনশিয়া ও স্মৃতি যত্ন", whatIsDementia: "ডিমেনশিয়া কি?", keySigns: "প্রাথমিক লক্ষণসমূহ", caregiverTips: "পরিচর্যাকারীর পরামর্শ" },
  },

  // ─── ODIA ────────────────────────────────────────────────────────────────
  Odia: {
    ...baseEnglish,
    nav: { home: "ମୁଖ୍ୟ ପୃଷ୍ଠା", activities: "କାର୍ଯ୍ୟକ୍ରମ", myMemories: "ମୋର ସ୍ମୃତି", reminders: "ମନେରଖିବା ସୂଚୀ", progress: "ଅଗ୍ରଗତି", aboutDementia: "ଡିମେନ୍ସିଆ ବିଷୟରେ", profile: "ପ୍ରୋଫାଇଲ୍", settings: "ସେଟିଂସ", switchProfile: "ପ୍ରୋଫାଇଲ୍ ବଦଳାନ୍ତୁ" },
    home: { ...baseEnglish.home, title: "ଯେଉଁଠି ସ୍ମୃତିସବୁ", titleAccent: "ଆଦରରେ ସଜୀବ ରହେ", exploreActivities: "🧠 କାର୍ଯ୍ୟକ୍ରମ ଦେଖନ୍ତୁ", caregiverGuide: "📖 ଯତ୍ନଗ୍ରହଣକାରୀ ମାର୍ଗଦର୍ଶିକା" },
    activities: { ...baseEnglish.activities, title: "ମାନସିକ ଅଭ୍ୟାସ", playNow: "ଆରମ୍ଭ କରନ୍ତୁ" },
    memories: { ...baseEnglish.memories, title: "ସ୍ମୃତି ଆଲବମ୍", addMemory: "➕ ନୂତନ ସ୍ମୃତି ଯୋଡ଼ନ୍ତୁ" },
    reminders: { ...baseEnglish.reminders, title: "ଦୈନନ୍ଦିନ ସୂଚୀ", todaySchedule: "ଆଜିର ସୂଚୀ" },
  },

  // ─── MARATHI ─────────────────────────────────────────────────────────────
  Marathi: {
    ...baseEnglish,
    nav: { home: "मुख्य पृष्ठ", activities: "उपक्रम", myMemories: "माझ्या आठवणी", reminders: "आठवणपत्र", progress: "प्रगती", aboutDementia: "डिमेंशिया बद्दल", profile: "प्रोफाइल", settings: "सेटिंग्ज", switchProfile: "प्रोफाइल बदला" },
    home: { ...baseEnglish.home, title: "जिथे आठवणी", titleAccent: "जुलमाने ताज्या राहतात", exploreActivities: "🧠 उपक्रम पहा", caregiverGuide: "📖 काळजीवाहू मार्गदर्शिका" },
    activities: { ...baseEnglish.activities, title: "मानसिक व्यायाम", playNow: "सुरू करा" },
    memories: { ...baseEnglish.memories, title: "आठवणींचा अल्बम", addMemory: "➕ नवीन आठवण जोडा" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक वेळापत्रक", todaySchedule: "आजचे वेळापत्रक" },
  },

  // ─── GUJARATI ────────────────────────────────────────────────────────────
  Gujarati: {
    ...baseEnglish,
    nav: { home: "મુખ્ય પૃષ્ઠ", activities: "પ્રવૃત્તિઓ", myMemories: "મારી યાદો", reminders: "યાદ અપાવનાર", progress: "પ્રગતિ", aboutDementia: "ડિમેન્શિયા વિશે", profile: "પ્રોફાઇલ", settings: "સેટિંગ્સ", switchProfile: "પ્રોફાઇલ બદલો" },
    home: { ...baseEnglish.home, title: "જ્યાં યાદો", titleAccent: "પ્રેમથી જીવંત રહે છે", exploreActivities: "🧠 પ્રવૃત્તિઓ જુઓ", caregiverGuide: "📖 સંભાળ રાખનાર માર્ગદર્શિકા" },
    activities: { ...baseEnglish.activities, title: "માનસિક કસરત", playNow: "શરૂ કરો" },
    memories: { ...baseEnglish.memories, title: "યાદોનું આલ્બમ", addMemory: "➕ નવી યાદ ઉમેરો" },
    reminders: { ...baseEnglish.reminders, title: "દૈનિક સમયપત્રક", todaySchedule: "આજનું સમયપત્રક" },
  },

  // ─── PUNJABI ────────────────────────────────────────────────────────────
  Punjabi: {
    ...baseEnglish,
    nav: { home: "ਮੁੱਖ ਸਫ਼ਾ", activities: "ਗਤੀਵਿਧੀਆਂ", myMemories: "ਮੇਰੀਆਂ ਯਾਦਾਂ", reminders: "ਯਾਦ-ਦਹਾਨੀ", progress: "ਤਰੱਕੀ", aboutDementia: "ਡੀਮੈਂਸ਼ੀਆ ਬਾਰੇ", profile: "ਪ੍ਰੋਫਾਈਲ", settings: "ਸੈਟਿੰਗਾਂ", switchProfile: "ਪ੍ਰੋਫਾਈਲ ਬਦਲੋ" },
    home: { ...baseEnglish.home, title: "ਜਿੱਥੇ ਯਾਦਾਂ", titleAccent: "ਪਿਆਰ ਨਾਲ ਜਿਊਂਦੀਆਂ ਰਹਿੰਦੀਆਂ ਹਨ", exploreActivities: "🧠 ਗਤੀਵਿਧੀਆਂ ਵੇਖੋ", caregiverGuide: "📖 ਦੇਖਭਾਲ ਗਾਈਡ" },
    activities: { ...baseEnglish.activities, title: "ਮਾਨਸਿਕ ਅਭਿਆਸ", playNow: "ਸ਼ੁਰੂ ਕਰੋ" },
    memories: { ...baseEnglish.memories, title: "ਯਾਦਾਂ ਦਾ ਐਲਬਮ", addMemory: "➕ ਨਵੀਂ ਯਾਦ ਜੋੜੋ" },
    reminders: { ...baseEnglish.reminders, title: "ਰੋਜ਼ਾਨਾ ਸ਼ਡਿਊਲ", todaySchedule: "ਅੱਜ ਦਾ ਸ਼ਡਿਊਲ" },
  },

  // ─── TAMIL ───────────────────────────────────────────────────────────────
  Tamil: {
    ...baseEnglish,
    nav: { home: "முகப்பு", activities: "செயல்பாடுகள்", myMemories: "என் நினைவுகள்", reminders: "நினைவூட்டல்கள்", progress: "முன்னேற்றம்", aboutDementia: "டிமென்ஷியா பற்றி", profile: "சுயவிவரம்", settings: "அமைப்புகள்", switchProfile: "சுயவிவரம் மாற்று" },
    home: { ...baseEnglish.home, title: "நினைவுகள்", titleAccent: "அன்போடு வாழும் இடம்", exploreActivities: "🧠 செயல்பாடுகளைப் பார்க்க", caregiverGuide: "📖 பராமரிப்பாளர் வழிகாட்டி" },
    activities: { ...baseEnglish.activities, title: "மனப் பயிற்சிகள்", playNow: "தொடங்கவும்" },
    memories: { ...baseEnglish.memories, title: "நினைவுப் பேழை", addMemory: "➕ புதிய நினைவு சேர்க்க" },
    reminders: { ...baseEnglish.reminders, title: "தினசரி அட்டவணை", todaySchedule: "இன்றைய அட்டவணை" },
  },

  // ─── TELUGU ──────────────────────────────────────────────────────────────
  Telugu: {
    ...baseEnglish,
    nav: { home: "ముఖ్య పుట", activities: "కార్యకలాపాలు", myMemories: "నా జ్ఞాపకాలు", reminders: "జ్ఞాపికలు", progress: "పురోగతి", aboutDementia: "డిమెన్షియా గురించి", profile: "ప్రొఫైల్", settings: "సెట్టింగ్‌లు", switchProfile: "ప్రొఫైల్ మార్చు" },
    home: { ...baseEnglish.home, title: "జ్ఞాపకాలు", titleAccent: "ప్రేమతో పదిలంగా ఉండే చోటు", exploreActivities: "🧠 కార్యకలాపాలు చూడండి", caregiverGuide: "📖 సంరక్షకుల మార్గదర్శి" },
    activities: { ...baseEnglish.activities, title: "మానసిక వ్యాయామాలు", playNow: "ప్రారంభించు" },
    memories: { ...baseEnglish.memories, title: "జ్ఞాపకాల ఆల్బమ్", addMemory: "➕ కొత్త జ్ఞాపకం జోడించు" },
    reminders: { ...baseEnglish.reminders, title: "దినచర్య పట్టిక", todaySchedule: "నేటి పట్టిక" },
  },

  // ─── KANNADA ─────────────────────────────────────────────────────────────
  Kannada: {
    ...baseEnglish,
    nav: { home: "ಮುಖ್ಯ ಪುಟ", activities: "ಚಟುವಟಿಕೆಗಳು", myMemories: "ನನ್ನ ನೆನಪುಗಳು", reminders: "ನೆನಪೂಲೆಗಳು", progress: "ಪ್ರಗತಿ", aboutDementia: "ಡಿಮೆನ್ಷಿಯಾ ಬಗ್ಗೆ", profile: "ಪ್ರೊಫೈಲ್", settings: "ಸರಿಹೊಂದಿಕೆಗಳು", switchProfile: "ಪ್ರೊಫೈಲ್ ಬದಲಾಯಿಸಿ" },
    home: { ...baseEnglish.home, title: "ನೆನಪುಗಳು", titleAccent: "ಪ್ರೀತಿಯಿಂದ ಜೀವಂತವಾಗಿರುವ ಸ್ಥಳ", exploreActivities: "🧠 ಚಟುವಟಿಕೆಗಳನ್ನು ನೋಡಿ", caregiverGuide: "📖 ಆರೈಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ" },
    activities: { ...baseEnglish.activities, title: "ಮಾನಸಿಕ ಅಭ್ಯಾಸಗಳು", playNow: "ಪ್ರಾರಂಭಿಸಿ" },
    memories: { ...baseEnglish.memories, title: "ನೆನಪಿನ ಆಲ್ಬಮ್", addMemory: "➕ ಹೊಸ ನೆನಪು ಸೇರಿಸಿ" },
    reminders: { ...baseEnglish.reminders, title: "ದೈನಂದಿನ ವೇಳಾಪಟ್ಟಿ", todaySchedule: "ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ" },
  },

  // ─── MALAYALAM ─────────────────────────────────────────────────────────
  Malayalam: {
    ...baseEnglish,
    nav: { home: "പ്രധാന താൾ", activities: "പ്രവർത്തനങ്ങൾ", myMemories: "എന്റെ ഓർമ്മകൾ", reminders: "ഓർമ്മപ്പെടുത്തലുകൾ", progress: "പുരോഗതി", aboutDementia: "ഡിമെൻഷ്യയെക്കുറിച്ച്", profile: "പ്രൊഫൈൽ", settings: "ക്രമീകരണങ്ങൾ", switchProfile: "പ്രൊഫൈൽ മാറ്റുക" },
    home: { ...baseEnglish.home, title: "ഓർമ്മകൾ", titleAccent: "സ്നേഹത്തോടെ ജീവിക്കുന്ന ഇടം", exploreActivities: "🧠 പ്രവർത്തനങ്ങൾ കാണുക", caregiverGuide: "📖 പരിചരണ ഗൈഡ്" },
    activities: { ...baseEnglish.activities, title: "മാനസിക വ്യായാമങ്ങൾ", playNow: "ആരംഭിക്കുക" },
    memories: { ...baseEnglish.memories, title: "ഓർമ്മ ആൽബം", addMemory: "➕ പുതിയ ഓർമ്മ ചേർക്കുക" },
    reminders: { ...baseEnglish.reminders, title: "ദിനചര്യ സമയം", todaySchedule: "ഇന്നത്തെ സമയം" },
  },

  // ─── DOGRI ─────────────────────────────────────────────────────────────
  Dogri: {
    ...baseEnglish,
    nav: { home: "मुक्ख पन्ना", activities: "गतिविधियां", myMemories: "मेरी यादें", reminders: "स्मरण पत्र", progress: "प्रगति", aboutDementia: "डिमेंशिया बारै", profile: "प्रोफाइल", settings: "सेटिंग्स", switchProfile: "प्रोफाइल बदलो" },
    home: { ...baseEnglish.home, title: "जित्थै यादें", titleAccent: "सनेह कन्नै अमर र‍हंदियां न", exploreActivities: "🧠 गतिविधियां देक्खो", caregiverGuide: "📖 देखभालकर्ता मार्गदर्शिका" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यास", playNow: "शुरू करो" },
    games: { ...baseEnglish.games, memoryMatchTitle: "स्मृति फोटो रलाओ", flipCard: "कार्ड पलटो", moves: "प्रयास", matches: "जोड़े", congrats: "शाबाश! तुस्सां सारे जोड़े मिलाई ले!" },
    memories: { ...baseEnglish.memories, title: "स्मृति एल्बम", addMemory: "➕ नवी याद जोड़ो", family: "परिवार", places: "स्थान", moments: "विशेष पल" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक दिनचर्या", newReminder: "➕ नया स्मरण जोड़ो", add: "जोड़ो", todaySchedule: "अज्ज दी सूची", delete: "हटाओ" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "डिमेंशिया ते याददाश्ता दी देखभाल", whatIsDementia: "डिमेंशिया क्या ए?", keySigns: "शुरुआती लक्षण", caregiverTips: "देखभालकर्ता सलाह" },
  },

  // ─── KASHMIRI ──────────────────────────────────────────────────────────
  Kashmiri: {
    ...baseEnglish,
    nav: { home: "اہم صفحہ", activities: "سرگرمیاں", myMemories: "میانی یاوہ", reminders: "یاد دہانی", progress: "ترقی", aboutDementia: "ڈیماینشیا متعلق", profile: "پروفائل", settings: "سیٹنگز", switchProfile: "پروفائل تبدیل کریں" },
    home: { ...baseEnglish.home, title: "یتھ جائے یادیں", titleAccent: "محبت سیت زندا روزان", exploreActivities: "🧠 سرگرمیاں وچھو", caregiverGuide: "📖 دیکھ بھال راہنمائی" },
    activities: { ...baseEnglish.activities, title: "دماغی مشق", playNow: "شروع کرو" },
    games: { ...baseEnglish.games, memoryMatchTitle: "یاد فوٹو ملاو", flipCard: "کارڈ الٹاو", moves: "کوشش", matches: "جوڑے", congrats: "واریاہ خوب! توہِ رلاو سأری فوٹو!" },
    memories: { ...baseEnglish.memories, title: "یادین البم", addMemory: "➕ نٔو یاد تھوو", family: "خاندان", places: "جائے", moments: "خاص لمحہ" },
    reminders: { ...baseEnglish.reminders, title: "روزانہ کاوش", newReminder: "➕ نٔو یاد دہانی", add: "شامل کرو", todaySchedule: "ازوک وقت", delete: "مٹاو" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ڈیماینشیا تدابیر", whatIsDementia: "ڈیماینشیا کیا گو؟", keySigns: "ابتدائی نشانی", caregiverTips: "نگہداشت مشورے" },
  },

  // ─── KONKANI ───────────────────────────────────────────────────────────
  Konkani: {
    ...baseEnglish,
    nav: { home: "मुखेल पान", activities: "वावर", myMemories: "म्हज्यो यादो", reminders: "उगडास", progress: "प्रगती", aboutDementia: "डिमेंशिया विशीं", profile: "प्रोफाइल", settings: "सेटिंग्स", switchProfile: "प्रोफाइल बदला" },
    home: { ...baseEnglish.home, title: "जंय यादो", titleAccent: "मोगान ताज्यो उरतात", exploreActivities: "🧠 वावर पळेयात", caregiverGuide: "📖 सांबाळपी मार्गदर्शक" },
    activities: { ...baseEnglish.activities, title: "मातयेच्यो कसरती", playNow: "सुरू करात" },
    games: { ...baseEnglish.games, memoryMatchTitle: "यादो तसवीर मेळयात", flipCard: "कार्ड उलटयात", moves: "प्रयत्न", matches: "जोड्यो", congrats: "शाब्बास! तुमी सगळ्यो जोड्यो मेळयल्यो!" },
    memories: { ...baseEnglish.memories, title: "यादींचो अल्बम", addMemory: "➕ नवी याद जोडात", family: "कुटुंब", places: "जागो", moments: "खाशेल क्षण" },
    reminders: { ...baseEnglish.reminders, title: "दिसपट्टे वेळापत्रक", newReminder: "➕ नवो उगडास जोडात", add: "जोडात", todaySchedule: "आयचें वेळापत्रक", delete: "काडून उडयात" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "डिमेंशिया आणी याददाश्त", whatIsDementia: "डिमेंशिया म्हणजे कितें?", keySigns: "सुरवेच्यो कुरयो", caregiverTips: "सांबाळपी सल्लो" },
  },

  // ─── MAITHILI ──────────────────────────────────────────────────────────
  Maithili: {
    ...baseEnglish,
    nav: { home: "मुख्य पृष्ठ", activities: "गतिविधि सभ", myMemories: "हमर सम्झौना", reminders: "स्मरणपत्र", progress: "प्रगति", aboutDementia: "डिमेंशिया विषयमे", profile: "प्रोफाइल", settings: "सेटिंग्स", switchProfile: "प्रोफाइल बदलू" },
    home: { ...baseEnglish.home, title: "जतए याद सभ", titleAccent: "स्नेह सँ जीवंत रहैत अछि", exploreActivities: "🧠 गतिविधि देखू", caregiverGuide: "📖 देखरेखकर्ता मार्गदर्शिका" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यास", playNow: "शुरू करू" },
    games: { ...baseEnglish.games, memoryMatchTitle: "स्मृति फोटो मिलाऊ", flipCard: "कार्ड उलटू", moves: "प्रयास", matches: "जोड़ा", congrats: "अति सुंदर! अहाँ सब जोड़ा मिला देलियौ!" },
    memories: { ...baseEnglish.memories, title: "यादगार एल्बम", addMemory: "➕ नव याद जोड़ू", family: "परिवार", places: "ठाम", moments: "विशेष क्षण" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक तालिका", newReminder: "➕ नव स्मरण जोड़ू", add: "जोड़ू", todaySchedule: "आजुक तालिका", delete: "हटाऊ" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "डिमेंशिया आ ध्यान", whatIsDementia: "डिमेंशिया कि अछि?", keySigns: "शुरुआती लक्षण", caregiverTips: "देखरेखकर्ता सुझाव" },
  },

  // ─── SANSKRIT ──────────────────────────────────────────────────────────
  Sanskrit: {
    ...baseEnglish,
    nav: { home: "मुख्यपृष्ठम्", activities: "गतिविधयः", myMemories: "मम स्मृतयः", reminders: "स्मरणपत्राणि", progress: "प्रगतिः", aboutDementia: "स्मृतिभ्रंशविषये", profile: "प्रोफाइल", settings: "विन्यासाः", switchProfile: "प्रोफाइलं परिवर्तयतु" },
    home: { ...baseEnglish.home, title: "यत्र स्मृतयः", titleAccent: "स्नेहेन जीवन्त्यः तिष्ठन्ति", exploreActivities: "🧠 गतिविधयः पश्यतु", caregiverGuide: "📖 रक्षकदर्शकः" },
    activities: { ...baseEnglish.activities, title: "मानसिक-अभ्यासाः", playNow: "आरभताम्" },
    games: { ...baseEnglish.games, memoryMatchTitle: "स्मृतिचित्रं मेलयतु", flipCard: "पत्रं परावर्तयतु", moves: "प्रयत्नाः", matches: "युग्मानि", congrats: "साधु! भवद्भिः सर्वाणि युग्मानि मेलितानि!" },
    memories: { ...baseEnglish.memories, title: "स्मृति-संग्रहः", addMemory: "➕ नूतनस्मृतिं योजयतु", family: "कुटुम्बम्", places: "स्थानानि", moments: "विशेषक्षणाः" },
    reminders: { ...baseEnglish.reminders, title: "दैनिकसारणी", newReminder: "➕ नूतनस्मरणं योजयतु", add: "योजयतु", todaySchedule: "अद्यतनसारणी", delete: "निवारयतु" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "स्मृतिभ्रंश-संरक्षणम्", whatIsDementia: "स्मृतिभ्रंशः किम्?", keySigns: "प्राथमिकलक्षणाानि", caregiverTips: "रक्षकपरामर्शाः" },
  },

  // ─── SANTALI ───────────────────────────────────────────────────────────
  Santali: {
    ...baseEnglish,
    nav: { home: "ᱢᱩᱬᱩᱛ ᱥᱟᱠᱟᱢ", activities: "ᱠᱟᱹᱢᱤᱦᱚᱨᱟ", myMemories: "ᱤᱧᱟᱜ ᱫᱤᱥᱟᱹ", reminders: "ᱩᱭᱦᱟᱹᱨ", progress: "ᱞᱟᱦᱟᱱᱛᱤ", aboutDementia: "ᱰᱤᱢᱮᱱᱥᱤᱭᱟ ᱵᱟᱵᱚᱛ", profile: "ᱯᱨᱳᱯᱷᱟᱭᱤᱞ", settings: "ᱥᱮᱴᱤᱝᱥ", switchProfile: "ᱯᱨᱳᱯᱷᱟᱭᱤᱞ ᱵᱚᱫᱚᱞ" },
    home: { ...baseEnglish.home, title: "ᱡᱟᱦᱟᱸᱨᱮ ᱫᱤᱥᱟᱹ", titleAccent: "ᱫᱩᱞᱟᱹᱲ ᱛᱮ ᱡᱤᱣᱤᱫ ᱛᱟᱦᱮᱸᱱᱟ", exploreActivities: "🧠 ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱧᱮᱞᱢᱮ", caregiverGuide: "📖 ᱡᱚᱛᱚᱱᱤᱭᱟᱹ ᱩᱫᱩᱜ" },
    activities: { ...baseEnglish.activities, title: "ᱢᱚᱱᱮ ᱵᱤᱰᱟᱹᱣ", playNow: "ᱮᱦᱚᱵᱽ ᱢᱮ" },
    games: { ...baseEnglish.games, memoryMatchTitle: "ᱫᱤᱥᱟᱹ ᱪᱤᱛᱟᱹᱨ ᱢᱤᱞᱟᱹᱣ", flipCard: "ᱠᱟᱨᱰ ᱩᱞᱴᱟᱹᱣ ᱢᱮ", moves: "ᱠᱩᱨᱩᱢᱩᱴᱩ", matches: "ᱡᱳᱲᱟ", congrats: "ᱵᱮᱥ ᱠᱟᱹᱢᱤ! ᱟᱢ ᱡᱚᱛᱚ ᱡᱳᱲᱟᱢ ᱢᱤᱞᱟᱹᱣ ᱠᱮᱫᱟ!" },
    memories: { ...baseEnglish.memories, title: "ᱫᱤᱥᱟᱹ ᱟᱞᱵᱚᱢ", addMemory: "➕ ᱱᱟᱣᱟ ᱫᱤᱥᱟᱹ ᱥᱮᱞᱮᱫᱽ ᱢᱮ", family: "ᱜᱷᱟᱸᱡᱽ", places: "ᱴᱷᱟᱶ", moments: "ᱵᱤᱥᱮᱥ ᱚᱠᱛᱚ" },
    reminders: { ...baseEnglish.reminders, title: "ᱫᱤᱱᱟᱹᱢ ᱠᱟᱹᱢᱤ", newReminder: "➕ ᱱᱟᱣᱟ ᱩᱭᱦᱟᱹᱨ ᱥᱮᱞᱮᱫᱽ ᱢᱮ", add: "ᱥᱮᱞᱮᱫᱽ ᱢᱮ", todaySchedule: "ᱛᱮᱦᱮᱧᱟᱜ ᱚᱠᱛᱚ", delete: "ᱢᱮᱴᱟᱣ ᱢᱮ" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ᱰᱤᱢᱮᱱᱥᱤᱭᱟ ᱡᱚᱛᱚᱱ", whatIsDementia: "ᱰᱤᱢᱮᱱᱥᱤᱭᱟ ᱫᱚ ᱪᱮᱫ?", keySigns: "ᱮᱛᱚᱦᱚᱵ ᱪᱤᱱᱦᱟᱹ", caregiverTips: "ᱡᱚᱛᱚᱱᱤᱭᱟᱹ ᱩᱭᱦᱟᱹᱨ" },
  },

  // ─── SINDHI ────────────────────────────────────────────────────────────
  Sindhi: {
    ...baseEnglish,
    nav: { home: "خاص صفحو", activities: "سرگرميون", myMemories: "منهنجيون يادون", reminders: "يادگيريون", progress: "ترقي", aboutDementia: "ڊيمينشيا بابت", profile: "پروفائل", settings: "سيٽنگون", switchProfile: "پروفائل تبديل ڪريو" },
    home: { ...baseEnglish.home, title: "جتي يادون", titleAccent: "پيار سان زنده رهن ٿيون", exploreActivities: "🧠 سرگرميون ڏسو", caregiverGuide: "📖 سنڀاليندڙ رهنمائي" },
    activities: { ...baseEnglish.activities, title: "دماغي مشقون", playNow: "شروع ڪريو" },
    games: { ...baseEnglish.games, memoryMatchTitle: "يادگار تصويرون ملايو", flipCard: "ڪارڊ مٽايو", moves: "ڪوششون", matches: "جوڙا", congrats: "شاباش! توهان سڀ جوڙا ملائي ورتا!" },
    memories: { ...baseEnglish.memories, title: "يادن جو البم", addMemory: "➕ نئين ياد شامل ڪريو", family: "خاندان", places: "جايون", moments: "خاص لمحات" },
    reminders: { ...baseEnglish.reminders, title: "روزاني ڏينهن جي رٿا", newReminder: "➕ نئين يادگيري", add: "شامل ڪريو", todaySchedule: "اڄ جي رٿا", delete: "خارج ڪريو" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ڊيمينشيا سنڀال", whatIsDementia: "ڊيمينشيا ڇا آهي؟", keySigns: "ابتدائي نشانيون", caregiverTips: "سنڀاليندڙ مشورا" },
  },

  // ─── URDU ──────────────────────────────────────────────────────────────
  Urdu: {
    ...baseEnglish,
    nav: { home: "صفحہ اول", activities: "سرگرمیاں", myMemories: "میری یادیں", reminders: "یاد دہانی", progress: "پیش رفت", aboutDementia: "ڈیمینشیا کے بارے میں", profile: "پروفائل", settings: "سیٹنگز", switchProfile: "پروفائل تبدیل کریں" },
    home: { ...baseEnglish.home, title: "جہاں یادیں", titleAccent: "محبت سے زندہ رہتی ہیں", subtitle: "بزرگ شہریوں کے لیے یادداشت کا ساتھی", exploreActivities: "🧠 سرگرمیاں دیکھیں", caregiverGuide: "📖 دیکھ بھال کرنے والے کی رہنمائی" },
    activities: { ...baseEnglish.activities, title: "دماغي مشقیں", subtitle: "یادداشت اور توجہ کے لیے روزانہ کی آسان مشقیں۔", playNow: "شروع کریں" },
    games: { ...baseEnglish.games, memoryMatchTitle: "یادداشت کی تصاویر ملائیں", flipCard: "کارڈ پلٹیں", moves: "کوششیں", matches: "جوڑے", congrats: "بہت خوب! آپ نے تمام جوڑے ملا لیے!", playAgain: "دوبارہ کھیلیں", backToActivities: "← واپس جائیں" },
    memories: { ...baseEnglish.memories, title: "یادوں کا البم", addMemory: "➕ نئی یاد شامل کریں", family: "خاندان", places: "مقامات", moments: "خاص لمحات" },
    reminders: { ...baseEnglish.reminders, title: "روزمرہ کا شیڈول", newReminder: "➕ نئی یاد دہانی", add: "شامل کریں", todaySchedule: "آج کا شیڈول", delete: "حذف کریں" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ڈیمینشیا اور یادداشت کی دیکھ بھال", whatIsDementia: "ڈیمینشیا کیا ہے؟", keySigns: "ابتدائی علامات", caregiverTips: "دیکھ بھال کے مشورے" },
  },
};

/**
 * Helper to get active translation object safely
 */
export function getTranslation(languageName: string): TranslationSchema {
  return TRANSLATIONS[languageName] || TRANSLATIONS.English;
}
