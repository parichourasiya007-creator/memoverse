// ─── MemoVerse Complete 22-Language Centralized Translation System ─────────────

export interface TranslationSchema {
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    close: string;
    next: string;
    back: string;
    start: string;
    continue: string;
    tryAgain: string;
    clear: string;
    submit: string;
    correct: string;
    incorrect: string;
    hint: string;
    level: string;
    score: string;
    points: string;
    completed: string;
    loading: string;
    error: string;
    yes: string;
    no: string;
    ok: string;
    confirm: string;
    profile: string;
    logout: string;
    settings: string;
    accuracy: string;
    attempts: string;
    time: string;
  };
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
    back: string;
    archival: string;
    cognitiveCompanion: string;
    offlineActive: string;
    onlineNormal: string;
  };
  home: {
    title: string;
    titleAccent: string;
    subtitle: string;
    heroDescription: string;
    exploreActivities: string;
    caregiverGuide: string;
    heroBadge: string;
    heroBadge1: string;
    heroBadge2: string;
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
    viewAll: string;
  };
  sounds: {
    title: string;
    subtitle: string;
    listen: string;
    playing: string;
    stop: string;
    pause: string;
    resume: string;
    replay: string;
    unavailable: string;
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
    whatsMissingTitle: string;
    whatsMissingDesc: string;
    patternTitle: string;
    patternDesc: string;
    jigsawTitle: string;
    jigsawDesc: string;
    routineTitle: string;
    routineDesc: string;
    wordPuzzlesTitle: string;
    wordPuzzlesDesc: string;
    diceTitle: string;
    diceDesc: string;
    boardTitle: string;
    boardDesc: string;
    soundRecTitle: string;
    soundRecDesc: string;
    kazirangaTitle: string;
    kazirangaDesc: string;
    memoryLaneTitle: string;
    memoryLaneDesc: string;
    interactiveTitle: string;
    interactiveDesc: string;
    bazaarTitle: string;
    bazaarDesc: string;
    catAll: string;
    catMemory: string;
    catAttention: string;
    catSpatial: string;
    catRoutine: string;
    catLogic: string;
    tagMatching: string;
    tagObservation: string;
    tagReminiscence: string;
    tagAudioRecall: string;
    tagPatterning: string;
    tagListening: string;
    tagVisualFocus: string;
    tagSpatialGrid: string;
    tagAssembly: string;
    tagSequencing: string;
    tagStorytelling: string;
    tagSorting: string;
    tagWordPlay: string;
    tagCounting: string;
    tagPathGame: string;
    tagEveryday: string;
    feedbackCorrect: string;
    feedbackWrongSpelling: string;
    feedbackExcellent: string;
    feedbackTryAnother: string;
    feedbackFound: string;
    feedbackPiecePlaced: string;
    feedbackPuzzleComplete: string;
    feedbackCorrectCount: string;
    feedbackPickedRolled: string;
    feedbackAdvancedLandmark: string;
    feedbackReachedFinish: string;
    feedbackGreatObservation: string;
    feedbackLookClosely: string;
    feedbackSortedItem: string;
    feedbackBelongsOther: string;
    feedbackRemembered: string;
    feedbackPerfectRoutine: string;
    feedbackRoutineHint: string;
    feedbackPatternComplete: string;
    feedbackPatternOrder: string;
    feedbackSoundIdentified: string;
    feedbackListenCarefully: string;
    promptRollDice: string;
    promptRollMove: string;
    promptTapTeaLeaf: string;
    promptTapRedPot: string;
    promptTapLargestRhino: string;
    promptNotBelongNature: string;
    promptLookItems: string;
    promptOneVanished: string;
    promptWhatNextSequence: string;
    promptCheckOrder: string;
    promptResetOrder: string;
    labelTeaLeaf: string;
    labelBoat: string;
    labelRhino: string;
    labelBasket: string;
    labelBluePot: string;
    labelRedPot: string;
    labelGreenPot: string;
    labelSmallRhino: string;
    labelLargeRhino: string;
    labelMediumRhino: string;
    labelFlower: string;
    labelLeaf: string;
    labelAirplane: string;
    labelFoodBasket: string;
    labelHouseholdBasket: string;
    itemTeaLeaf: string;
    itemChaiCup: string;
    itemMilk: string;
    itemPitha: string;
    itemDhol: string;
    itemSilkCloth: string;
    itemFlute: string;
    itemPepa: string;
    itemMustardOil: string;
    stepWakeUp: string;
    stepChai: string;
    stepMedicine: string;
    stepWalk: string;
    stepDinner: string;
    soundSongbirds: string;
    soundBihuBeat: string;
    soundTempleBell: string;
    soundBirdChirping: string;
    soundMonsoonRain: string;
    soundRiverFlow: string;
    hintTea: string;
    hintRhino: string;
    hintBihu: string;
    hintBamboo: string;
    hintRiver: string;
    riddleGoldenSilk: string;
    riddleKazirangaAnimal: string;
    riddleBihuInstrument: string;
    riddleLargestIsland: string;
    landmarkStart: string;
    landmarkTeaGarden: string;
    landmarkKaziranga: string;
    landmarkMajuli: string;
    landmarkFinish: string;
    unlockLevelMsg: string;
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
    readAloud: string;
    bihuTitle: string;
    bihuDesc: string;
    teaGardenTitle: string;
    teaGardenDesc: string;
    radioTitle: string;
    radioDesc: string;
    twoDaysAgo: string;
    oneWeekAgo: string;
    twoWeeksAgo: string;
    justNow: string;
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
    r1Text: string;
    r2Text: string;
    r3Text: string;
    r4Text: string;
    today: string;
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
    aiPerformanceProfile: string;
    cognitiveBreakdown: string;
    cognitiveBreakdownDesc: string;
    improving: string;
    strong: string;
    practicing: string;
    stable: string;
    sessionLogged: string;
    sessionsLogged: string;
    performanceRating: string;
    excellent: string;
    good: string;
    activePractice: string;
    activityRecords: string;
    saved: string;
    noHistoryRecorded: string;
    difficultyLabel: string;
    easy: string;
    medium: string;
    hard: string;
    standard: string;
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
    createNewProfile: string;
    age: string;
    gender: string;
    phone: string;
    region: string;
    location: string;
    familyContact: string;
    familyContactName: string;
    familyContactPhone: string;
    address: string;
    personalDetails: string;
    contactDetails: string;
    level: string;
    activeProfile: string;
    welcomeBack: string;
    editProfile: string;
    logout: string;
    startJourney: string;
    lockedTitle: string;
    lockedMemoriesMsg: string;
    lockedRemindersMsg: string;
    lockedProgressMsg: string;
    maybeLater: string;
    saveChanges: string;
    cancel: string;
    selectProfileTitle: string;
    selectProfileSubtitle: string;
    createProfileTitle: string;
    createProfileSubtitle: string;
    welcomeMEMOVERSE: string;
    welcomeCreatedDesc: string;
    personalInfo: string;
    quickActions: string;
    emergencyContact: string;
    skipExplore: string;
    editProfileTitle: string;
    unlockMemoriesTitle: string;
    unlockRemindersTitle: string;
    unlockProgressTitle: string;
    createProfileNow: string;
    fullName: string;
    ageLabel: string;
    yearsOld: string;
    genderLabel: string;
    female: string;
    male: string;
    other: string;
    notSpecified: string;
    locationLabel: string;
    phoneNumber: string;
    notProvided: string;
    familyEmergencyContact: string;
    notConfigured: string;
    addressLabel: string;
    fullAddress: string;
    noAddressEntered: string;
    profileActions: string;
    applicationSettings: string;
    configureSettingsDesc: string;
    openSettingsButton: string;
    startYourJourneyDesc: string;
    loadDemoProfile: string;
    guestMode: string;
    guestModeDesc: string;
    activeBadge: string;
    continueGuestMode: string;
    profileRequired: string;
    backHome: string;
    chooseAvatar: string;
    contactNamePlaceholder: string;
    contactPhonePlaceholder: string;
    fullAddressPlaceholder: string;
    greatJob: string;
    greatJobDesc: string;
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
  ai: {
    recommendedForYou: string;
    recommendedNext: string;
    playNow: string;
    level: string;
    levelEasy: string;
    levelMedium: string;
    levelHard: string;
    levelAdvanced: string;
    previousLevel: string;
    nextLevel: string;
    lockedLevel: string;
    levelUnlocked: string;
    gamePerformance: string;
    activityProgress: string;
    practiceTrends: string;
    cognitiveSkills: string;
    recommendationTitle: string;
    recommendPattern: string;
    recommendAuditory: string;
    recommendRoutine: string;
  };
}

export const baseEnglish: TranslationSchema = {
  common: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    close: "Close",
    next: "Next",
    back: "Back",
    start: "Start",
    continue: "Continue",
    tryAgain: "Try Again",
    clear: "Clear",
    submit: "Submit",
    correct: "Correct!",
    incorrect: "Incorrect",
    hint: "Hint",
    level: "Level",
    score: "Score",
    points: "points",
    completed: "Completed",
    loading: "Loading...",
    error: "Error",
    yes: "Yes",
    no: "No",
    ok: "OK",
    confirm: "Confirm",
    profile: "Profile",
    logout: "Logout",
    settings: "Settings",
    accuracy: "Accuracy",
    attempts: "Attempts",
    time: "Time",
  },
  ai: {
    recommendedForYou: "Recommended for You",
    recommendedNext: "Recommended Next",
    playNow: "Play Now",
    level: "Level",
    levelEasy: "Easy",
    levelMedium: "Medium",
    levelHard: "Hard",
    levelAdvanced: "Advanced",
    previousLevel: "← Previous Level",
    nextLevel: "Next Level →",
    lockedLevel: "Complete current level with strong score to unlock",
    levelUnlocked: "Level Unlocked!",
    gamePerformance: "Game Performance",
    activityProgress: "Activity Progress",
    practiceTrends: "Practice Trends",
    cognitiveSkills: "Cognitive Skill Profile",
    recommendationTitle: "AI Recommended Activity",
    recommendPattern: "Great for training visual memory and pattern recognition.",
    recommendAuditory: "Calm auditory exercise for attention and relaxation.",
    recommendRoutine: "Helpful for daily routine recall and memory structure.",
  },
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
    back: "Back",
    archival: "Archival Memory Companion",
    cognitiveCompanion: "Cognitive Companion",
    offlineActive: "Offline Active",
    onlineNormal: "Online Normal",
  },
  home: {
    title: "Where Memories",
    titleAccent: "Are Kept Warm & Alive",
    subtitle: "Archival Memory Companion for Seniors",
    heroDescription: "A quiet, dignified sanctuary designed with familiar regional sounds, family keepsake photo albums, and calm daily reminders for elderly loved ones.",
    exploreActivities: "🧠 Explore Activities",
    caregiverGuide: "📖 Caregiver Guide",
    heroBadge: "📸 Senior Dignity & Archival Reminiscence",
    heroBadge1: "Senior Dignity",
    heroBadge2: "Archival Companion",
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
    viewAll: "View All Activities →",
  },
  sounds: {
    title: "Sounds of Home",
    subtitle: "Listen to comforting cultural sounds and regional auditory memories.",
    listen: "🔊 Listen Sound",
    playing: "🎵 Playing Sound...",
    stop: "⏹ Stop Sound",
    pause: "Pause Sound",
    resume: "Resume Sound",
    replay: "Replay Sound",
    unavailable: "Sound unavailable",
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
    soundFluteDesc: "Traditional bamboo melody.",
  },
  games: {
    memoryMatchTitle: "Memory Photo Match",
    memoryMatchDesc: "Match paired cards featuring familiar cultural artifacts and places.",
    flipCard: "Flip Card",
    moves: "Moves",
    matches: "Matches",
    congrats: "Wonderful! You matched all memory cards!",
    playAgain: "Play Again",
    marketTitle: "Village Market Memory",
    marketDesc: "Remember items from a traditional bazaar shopping trip.",
    itemsBought: "Items in Basket",
    totalSpent: "Total Spent",
    storyTitle: "Folk Tale Story Recall",
    storyDesc: "Listen to a short traditional tale and answer gentle memory questions.",
    readStory: "Read Story",
    answerQuestions: "Answer Question",
    score: "Score",
    backToActivities: "← Back to Activities",
    restart: "Restart Game",
    correctMsg: "Correct! Muga Silk is the traditional golden silk of Assam.",
    wrongMsg: "Try again! Think about the golden silk produced in Assam.",
    itemTea: "Assam Tea Leaf",
    itemBamboo: "Bamboo Shoot",
    itemLemon: "Assam Kazi Nemu",
    itemSweets: "Pitha Sweets",
    itemOil: "Mustard Oil",
    itemFish: "Fresh River Fish",
    storyPassage: "In a quiet village in Upper Assam, grandma sat on the wooden porch weaving golden silk called Muga...",
    storyQuestion: "What type of silk was grandma weaving in the story?",
    optMuga: "Muga Silk",
    optCotton: "Cotton",
    optWool: "Wool",
    optJute: "Jute",
    whatsMissingTitle: "What's Missing?",
    whatsMissingDesc: "Observe items before one vanishes, then recall the missing object.",
    patternTitle: "Pattern Recognition",
    patternDesc: "Complete repeating visual sequence patterns with familiar items.",
    jigsawTitle: "Large-Piece Jigsaw Puzzle",
    jigsawDesc: "Assemble large piece jigsaw puzzles of Kaziranga, Majuli, and tea gardens.",
    routineTitle: "Daily Routine Ordering",
    routineDesc: "Arrange daily activities into a natural morning to evening order.",
    wordPuzzlesTitle: "Word Puzzles",
    wordPuzzlesDesc: "Anagram letter unscrambles and simple culture riddles.",
    diceTitle: "Dice Cognitive Activity",
    diceDesc: "Roll the dice, observe numbers, and complete counting matching tasks.",
    boardTitle: "Cognitive Board Game",
    boardDesc: "Roll dice to move your token forward through landmark steps.",
    soundRecTitle: "Sound Memory & Recognition",
    soundRecDesc: "Listen to familiar nature and cultural sounds, then identify what you heard.",
    kazirangaTitle: "Kaziranga 4-Piece Puzzle",
    kazirangaDesc: "Dedicated 2x2 simplified visual puzzle featuring Kaziranga rhino.",
    memoryLaneTitle: "Memory Lane: Purana NE",
    memoryLaneDesc: "Digital reminiscence photo carousel with ambient cultural sounds.",
    interactiveTitle: "Interactive Cognitive Focus",
    interactiveDesc: "Slow-paced video activity to tap target objects and follow prompts.",
    bazaarTitle: "NER Bazaar Sorting",
    bazaarDesc: "Sort regional items into Food vs Household Handicraft baskets.",
    catAll: "All",
    catMemory: "Memory",
    catAttention: "Attention & Recognition",
    catSpatial: "Visual-Spatial",
    catRoutine: "Routine & Sequencing",
    catLogic: "Logic & Categorization",
    tagMatching: "Matching",
    tagObservation: "Observation & Recall",
    tagReminiscence: "Reminiscence",
    tagAudioRecall: "Audio Recall",
    tagPatterning: "Patterning",
    tagListening: "Listening",
    tagVisualFocus: "Visual Focus",
    tagSpatialGrid: "Spatial Grid",
    tagAssembly: "2x2 Assembly",
    tagSequencing: "Sequencing",
    tagStorytelling: "Storytelling",
    tagSorting: "Sorting",
    tagWordPlay: "Word Play",
    tagCounting: "Counting",
    tagPathGame: "Path Game",
    tagEveryday: "Everyday",
    feedbackCorrect: "✨ Correct!",
    feedbackWrongSpelling: "Incorrect spelling. Try again!",
    feedbackExcellent: "✨ Excellent!",
    feedbackTryAnother: "Not quite, try another option!",
    feedbackFound: "✨ Found",
    feedbackPiecePlaced: "✨ Piece placed!",
    feedbackPuzzleComplete: "✨ Puzzle completed!",
    feedbackCorrectCount: "✨ Correct count matched!",
    feedbackPickedRolled: "You picked {ans}. The rolled number was {rolledVal}.",
    feedbackAdvancedLandmark: "✨ Advanced to landmark!",
    feedbackReachedFinish: "🎉 Reached the finish landmark!",
    feedbackGreatObservation: "✨ Great observation!",
    feedbackLookClosely: "Look closely and try again!",
    feedbackSortedItem: "✨ Sorted item!",
    feedbackBelongsOther: "Item belongs in the other basket.",
    feedbackRemembered: "✨ Correct! You remembered!",
    feedbackPerfectRoutine: "✨ Perfect daily sequence!",
    feedbackRoutineHint: "Some activities are out of order. Hint: Wake Up is first!",
    feedbackPatternComplete: "✨ Pattern completed!",
    feedbackPatternOrder: "Look at the repeating order!",
    feedbackSoundIdentified: "✨ Correct sound identified!",
    feedbackListenCarefully: "Listen again carefully!",
    promptRollDice: "🎲 Roll Dice",
    promptRollMove: "🎲 Roll & Move",
    promptTapTeaLeaf: "Tap the TEA LEAF 🍃",
    promptTapRedPot: "Tap the RED TEA POT 🫖",
    promptTapLargestRhino: "Tap the LARGEST Rhino 🦏",
    promptNotBelongNature: "Which item does NOT belong in nature?",
    promptLookItems: "Look carefully at the items below:",
    promptOneVanished: "One item vanished! What is missing?",
    promptWhatNextSequence: "What comes next in the sequence?",
    promptCheckOrder: "Check Order",
    promptResetOrder: "Reset Order",
    labelTeaLeaf: "Tea Leaf",
    labelBoat: "Boat",
    labelRhino: "Rhino",
    labelBasket: "Basket",
    labelBluePot: "Blue Pot",
    labelRedPot: "Red Pot",
    labelGreenPot: "Green Pot",
    labelSmallRhino: "Small Rhino",
    labelLargeRhino: "Large Rhino",
    labelMediumRhino: "Medium Rhino",
    labelFlower: "Flower",
    labelLeaf: "Leaf",
    labelAirplane: "Airplane",
    labelFoodBasket: "Food & Spices 🥗",
    labelHouseholdBasket: "Household & Handicraft 🏡",
    itemTeaLeaf: "Assam Tea Leaf",
    itemChaiCup: "Chai Cup",
    itemMilk: "Fresh Milk",
    itemPitha: "Pitha Sweets",
    itemDhol: "Bihu Dhol",
    itemSilkCloth: "Muga Silk Cloth",
    itemFlute: "Bamboo Flute",
    itemPepa: "Pepa Horn",
    itemMustardOil: "Mustard Oil",
    stepWakeUp: "Wake Up 🌅",
    stepChai: "Morning Chai 🍵",
    stepMedicine: "Take Medicine 💊",
    stepWalk: "Evening Walk 🚶",
    stepDinner: "Dinner & Rest 🌙",
    soundSongbirds: "Songbirds in Morning",
    soundBihuBeat: "Bihu Dhol Beat",
    soundTempleBell: "Morning Temple Bell",
    soundBirdChirping: "Bird Chirping",
    soundMonsoonRain: "Monsoon Rain",
    soundRiverFlow: "River Flow",
    hintTea: "Popular morning warm drink in Assam",
    hintRhino: "Famous one-horned animal in Kaziranga",
    hintBihu: "Spring harvest festival of Assam",
    hintBamboo: "Tall green plant used to make baskets",
    hintRiver: "Brahmaputra flowing through Northeast",
    riddleGoldenSilk: "Which golden silk is natively produced in Assam?",
    riddleKazirangaAnimal: "Which animal is Kaziranga National Park famous for?",
    riddleBihuInstrument: "What instrument produces the lively spring beats of Bihu?",
    riddleLargestIsland: "Which island in Assam is known as the world's largest river island?",
    landmarkStart: "Start 🏡",
    landmarkTeaGarden: "Tea Garden 🍃",
    landmarkKaziranga: "Kaziranga 🦏",
    landmarkMajuli: "Majuli Island 🛶",
    landmarkFinish: "Finish 🏆",
    unlockLevelMsg: "🔒 Complete Level {level} with 75%+ accuracy to unlock Level {nextLevel}.",
  },
  memories: {
    title: "Keepsake Memory Vault",
    subtitle: "Store treasured family moments, ancestral places, and spoken memories.",
    addMemory: "➕ Add New Memory",
    allCategories: "All Keepsakes",
    family: "Family",
    places: "Places",
    moments: "Moments",
    voiceNotes: "Voice Notes",
    deleteMemory: "Delete Memory",
    noMemories: "No memories added yet. Click above to add your first keepsake.",
    modalTitle: "Add New Keepsake Memory",
    modalTitleLabel: "Memory Title",
    modalDescLabel: "Memory Description",
    modalCategoryLabel: "Category",
    saveMemory: "Save Memory",
    cancel: "Cancel",
    readAloud: "Read Aloud",
    bihuTitle: "Bihu Celebration in Jorhat",
    bihuDesc: "Dancing Bihu with my family near our village mustard fields. The dhol beats filled the warm spring air.",
    teaGardenTitle: "Our Ancestral Tea Garden",
    teaGardenDesc: "The wooden tea estate house where I grew up in Upper Assam. Morning mist and fresh brewed chai.",
    radioTitle: "Bhupen Hazarika on the Radio",
    radioDesc: "Listening to the golden voice of Bhupen da on the morning radio every Sunday with my parents.",
    twoDaysAgo: "2 days ago",
    oneWeekAgo: "1 week ago",
    twoWeeksAgo: "2 weeks ago",
    justNow: "Just now",
  },
  reminders: {
    title: "Daily Reminders",
    subtitle: "Gentle daily schedule and medication assistance for elders.",
    newReminder: "➕ Add Reminder",
    inputPlaceholder: "Enter new reminder (e.g. Evening medicine)...",
    add: "Add Schedule",
    noReminders: "No reminders set for today.",
    markDone: "Done",
    completed: "Completed",
    todaySchedule: "Today's Schedule",
    delete: "Delete",
    r1Text: "Morning blood pressure medicine",
    r2Text: "Lunch and rest time",
    r3Text: "Evening medicine with warm water",
    r4Text: "Call Ananya (Daughter)",
    today: "Today",
  },
  progress: {
    title: "Cognitive Journey & Progress",
    subtitle: "Track activity involvement, level achievements, and focus milestones.",
    activitiesCompleted: "Activities Completed",
    currentLevel: "Current Level",
    bestArea: "Best Focus Category",
    streakTitle: "Gentle Daily Focus",
    streakDesc: "Regular engagement with familiar sounds, matching cards, and folk stories helps preserve cognitive sharpness and daily peace.",
    weeklyReport: "Weekly Engagement Summary",
    aiPerformanceProfile: "AI Performance Profile",
    cognitiveBreakdown: "Cognitive Practice Breakdown",
    cognitiveBreakdownDesc: "Activity performance metrics automatically updated from gameplay history.",
    improving: "Improving",
    strong: "Strong",
    practicing: "Practicing",
    stable: "Stable",
    sessionLogged: "session logged",
    sessionsLogged: "sessions logged",
    performanceRating: "Performance Rating",
    excellent: "Excellent",
    good: "Good",
    activePractice: "Active Practice",
    activityRecords: "Activity Performance Records",
    saved: "Saved",
    noHistoryRecorded: "No game history recorded yet. Play any cognitive game to log performance metrics!",
    difficultyLabel: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    standard: "Standard",
  },
  aboutDementia: {
    title: "About Dementia & Senior Care",
    subtitle: "Empathetic caregiver guidance, early awareness signs, and practical tips.",
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
    title: "Your Profile",
    subtitle: "Personal identity details and caregiver contact information.",
    switchProfile: "Switch Profile",
    createProfile: "Create Profile",
    createNewProfile: "Create New Profile",
    age: "Age",
    gender: "Gender",
    phone: "Phone Number",
    region: "Location",
    location: "Location",
    familyContact: "Family / Emergency Contact",
    familyContactName: "Contact Name",
    familyContactPhone: "Contact Phone Number",
    address: "Full Address",
    personalDetails: "Personal Details",
    contactDetails: "Contact Details",
    level: "Activity Level",
    activeProfile: "Active Profile",
    welcomeBack: "Welcome back",
    editProfile: "Edit Profile",
    logout: "Logout",
    startJourney: "Start Your Journey",
    lockedTitle: "Unlock Personalized Features",
    lockedMemoriesMsg: "Create your profile to start saving and revisiting personal memories.",
    lockedRemindersMsg: "Create your profile to set up personal daily reminders.",
    lockedProgressMsg: "Create your profile to track your activity journey.",
    maybeLater: "Maybe Later",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    selectProfileTitle: "Select Profile",
    selectProfileSubtitle: "Choose your account to access your personalized memories, reminders, and progress.",
    createProfileTitle: "Create Senior Profile",
    createProfileSubtitle: "Set up a personalized space for memories, reminders, and cognitive activities.",
    welcomeMEMOVERSE: "Welcome to MEMOVERSE!",
    welcomeCreatedDesc: "Your profile has been created successfully.",
    personalInfo: "Personal Information",
    quickActions: "Quick Actions",
    emergencyContact: "Emergency Contact",
    skipExplore: "Skip & Explore",
    editProfileTitle: "Edit Profile Details",
    unlockMemoriesTitle: "Unlock Keepsake Memories",
    unlockRemindersTitle: "Unlock Daily Reminders",
    unlockProgressTitle: "Unlock Cognitive Progress",
    createProfileNow: "Create Profile Now",
    fullName: "Full Name",
    ageLabel: "Age",
    yearsOld: "years old",
    genderLabel: "Gender",
    female: "Female",
    male: "Male",
    other: "Other",
    notSpecified: "Not specified",
    locationLabel: "Location",
    phoneNumber: "Phone Number",
    notProvided: "Not provided",
    familyEmergencyContact: "Family / Emergency Contact",
    notConfigured: "Not configured",
    addressLabel: "Address",
    fullAddress: "Full Address",
    noAddressEntered: "No address entered.",
    profileActions: "Profile Actions",
    applicationSettings: "Application Settings",
    configureSettingsDesc: "Configure interface language, audio guidance, text sizing, and contrast options.",
    openSettingsButton: "Open Settings",
    startYourJourneyDesc: "Create your senior profile to unlock personalized keepsake albums, medicine reminders, and focus metrics.",
    loadDemoProfile: "Load Demo Profile (Kamla Devi)",
    guestMode: "Guest Mode",
    guestModeDesc: "You are currently exploring as a guest. You can play cognitive activities freely, or create a profile to save personal memories, daily reminders, and activity progress.",
    activeBadge: "Active",
    continueGuestMode: "Continue in Guest Mode",
    profileRequired: "Profile Required",
    backHome: "Back Home",
    chooseAvatar: "Choose Avatar",
    contactNamePlaceholder: "Contact Name (e.g. Daughter)",
    contactPhonePlaceholder: "Contact Phone Number",
    fullAddressPlaceholder: "Full residence address...",
    greatJob: "Great Job! Start Your Journey",
    greatJobDesc: "You've completed your activity. Create your profile to save your progress, personal memories, and daily reminders.",
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
    readAloud: "Read Aloud",
    stopReading: "Stop Voice",
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
    common: { ...baseEnglish.common, save: "সংৰক্ষণ কৰক", cancel: "বাতিল কৰক", delete: "মচি পেলাওক", edit: "সম্পাদনা", create: "সৃষ্টি কৰক", close: "বন্ধ কৰক", next: "পৰৱৰ্তী", back: "পিছলৈ", start: "আৰম্ভ", continue: "অব্যাহত ৰাখক", tryAgain: "পুনৰ চেষ্টা কৰক", submit: "জমা দিয়ক", correct: "সঠিক!", incorrect: "ভুল", hint: "ইংগিত", level: "স্তৰ", score: "স্কোৰ", completed: "সম্পূৰ্ণ" },
    ai: { ...baseEnglish.ai, recommendedForYou: "আপোনাৰ বাবে পৰামৰ্শিত", playNow: "এতিয়াই খেলক", level: "স্তৰ", levelEasy: "সহজ", levelMedium: "মধ্যম", levelHard: "কঠিন", levelAdvanced: "উন্নত", recommendationTitle: "এআই পৰামৰ্শিত কাৰ্যসূচী", recommendPattern: "দৃষ্টিগত স্মৃতিশক্তি আৰু সজ্জা চিনাক্তকৰণৰ বাবে উপযুক্ত।", recommendAuditory: "মনোযোগ আৰু বিশ্ৰামৰ বাবে শান্ত শ্ৰৱণ অনুশীলন।", recommendRoutine: "দৈনিক সময়সূচী স্মৰণৰ বাবে সহায়ক।" },
    nav: { ...baseEnglish.nav, home: "মুখ্য পৃষ্ঠা", activities: "কাৰ্যসূচী", myMemories: "মোৰ স্মৃতিসমূহ", reminders: "মনত পেলোৱা", progress: "অগ্ৰগতি", aboutDementia: "ডিমেঞ্চিয়া বিষয়ে", profile: "প্ৰফাইল", settings: "সংৰচনা", switchProfile: "প্ৰফাইল সলনি কৰক" },
    home: { ...baseEnglish.home, title: "য'ত স্মৃতিসমূহ", titleAccent: "মৰমেৰে সজীৱ হৈ থাকে", subtitle: "জ্যেষ্ঠসকলৰ বাবে সজোৱা স্মৃতি সংৰক্ষণ সংগী", heroDescription: "আপোনজনৰ বাবে চিনাকি আঞ্চলিক শব্দ, পৰিয়ালৰ স্মৃতি সংৰক্ষণ এলবাম আৰু শান্ত দৈনিক সময়সূচীৰ সৈতে সজোৱা এক প্ৰশান্ত আশ্ৰয়স্থল।", exploreActivities: "🧠 কাৰ্যসূচী চাওক", caregiverGuide: "📖 সেৱাকাৰীৰ হাতপুথি", heroBadge1: "জ্যেষ্ঠ সন্মান", heroBadge2: "স্মৃতি সংৰক্ষণ সংগী", heroTagline: "স্মৃতি আৰু শ্ৰৱণ অভিজ্ঞতাৰ জৰিয়তে দৈনিক মৰ্যাদা সংৰক্ষণ", soundsCardTitle: "গৃহৰ চিনাকি শব্দ", soundsCardDesc: "গগনা, বিহু ঢোলৰ মাত, চাহ বাগিচাৰ চৰাইৰ কাকলি আৰু বৰষুণৰ শব্দ চিনাক্ত কৰক।", soundsCardAction: "এতিয়াই শুনক →", keepsakeCardTitle: "স্মৃতিৰ এলবাম", keepsakeCardDesc: "পৰিয়ালৰ মৰমৰ মুহূৰ্ত, পূৰ্বপুৰুষৰ স্থান আৰু কণ্ঠৰ টোকা সংৰক্ষণ কৰক।", keepsakeCardAction: "স্মৃতি এলবাম চাওক →", remindersCardTitle: "দৈনিক সময়সূচী", remindersCardDesc: "ঔষধৰ সময়, পুৱাৰ খোজ কঢ়া আৰু পৰিয়ালৰ কলৰ সময়সূচী মনত ৰাখক।", remindersCardAction: "আজিৰ সময়সূচী চাওক →" },
    activities: { ...baseEnglish.activities, title: "মানসিক অনুশীলন", subtitle: "স্মৃতিশক্তি আৰু মনোযোগ বৃদ্ধিৰ বাবে দৈনিক কাৰ্যসূচী।", playNow: "আৰম্ভ কৰক", viewAll: "সকলো কাৰ্যসূচী চাওক →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "স্মৃতি ফটো মিলাওক", memoryMatchDesc: "কাৰ্ডসমূহত ক্লিক কৰি মিল থকা ফটো যোৰা বিচাৰি উলিয়াওক।", flipCard: "কাৰ্ড উলিয়াওক", moves: "চেষ্টা", matches: "মিলসমূহ", congrats: "বৰ ধুনীয়া! আপুনি সকলো ফটো মিলালে!", playAgain: "পুনৰ খেলক", backToActivities: "← পিছলৈ যান", wordPuzzlesTitle: "শব্দ বুজৰুকি", wordPuzzlesDesc: "আখৰ সজাই শব্দ আৰু সৰু ৰহস্য সমাধান কৰক।", whatsMissingTitle: "কি হেৰাল?", whatsMissingDesc: "বস্তুবোৰ ভালদৰে মন কৰক, তাৰ পিছত হেৰোৱা বস্তুটো মনত পেলাওক।", patternTitle: "সজ্জা চিনাক্তকৰণ", patternDesc: "চিনাকি বস্তুবোৰৰ পুনৰাবৃত্তিমূলক সজ্জা সম্পূৰ্ণ কৰক।", jigsawTitle: "ডাঙৰ টুকুৰাৰ জিগছ' পাজল", jigsawDesc: "কাজিৰঙা আৰু চাহ বাগিচাৰ ছবিৰ পাজল মিলাওক।", routineTitle: "দৈনিক ক্ৰম সজোৱা", routineDesc: "পুৱাৰ পৰা গধূলিলৈ দৈনিক কামবোৰ সঠিক ক্ৰমত সজাওক।", diceTitle: "পাশা গণনাই কাৰ্যসূচী", diceDesc: "পাশা গুটি দলিয়াই সংখ্যা গণনা আৰু মিলাই খেলক।", boardTitle: "বৰ্ড গেম", boardDesc: "পাশা দলিয়াই কাজিৰঙা আৰু মাজুলীৰ পথত আগবাঢ়ক।", soundRecTitle: "শব্দ চিনাক্তকৰণ", soundRecDesc: "প্ৰাকৃতিক আৰু সাংস্কৃতিক শব্দ শুনি সঠিক চিনাক্ত কৰক।", kazirangaTitle: "কাজিৰঙা ৪-টুকুৰাৰ পাজল", kazirangaDesc: "সৰল ২x২ পাজলত কাজিৰঙাৰ গঁড় সজাওক।", memoryLaneTitle: "স্মৃতিৰ আলিবাট", memoryLaneDesc: "আঞ্চলিক শব্দৰ সৈতে পুৰণি দিনৰ ফটো এলবাম চাওক।", interactiveTitle: "ইণ্টাৰেক্টিভ মনোযোগ", interactiveDesc: "ধীৰ গতিৰ দৃশ্যমান কাৰ্যসূচী।", bazaarTitle: "বজাৰৰ বস্তু ভাগ কৰা", bazaarDesc: "আঞ্চলিক বস্তুসমূহ খাদ্য আৰু গৃহস্থালীৰ খাছ বাস্কেটত সজাওক।" },
    memories: {
      ...baseEnglish.memories,
      title: "স্মৃতিৰ এলবাম",
      subtitle: "পৰিয়ালৰ মৰমৰ মুহূৰ্ত আৰু পূৰ্বপুৰুষৰ স্থানসমূহ সংৰক্ষণ কৰক।",
      addMemory: "➕ নতুন স্মৃতি যোগ কৰক",
      allCategories: "সকলো স্মৃতি",
      family: "পৰিয়াল",
      places: "স্থানসমূহ",
      moments: "বিশেষ মুহূৰ্ত",
      deleteMemory: "মচি পেলাওক",
      readAloud: "শব্দ কৰি পঢ়ক",
      bihuTitle: "যোৰহাটত বিহু উদযাপন",
      bihuDesc: "সৰিয়হ পথাৰৰ ওচৰত পৰিয়ালৰ সৈতে বিহু নাচি থকা ধুনীয়া মুহূৰ্ত।",
      teaGardenTitle: "আমাৰ পূৰ্বপুৰুষৰ চাহ বাগিচা",
      teaGardenDesc: "পুৱাৰ কুঁৱলী, সতেজ চাহ আৰু শীতল বাৰাণ্ডা।",
      radioTitle: "পুৰণি ৰেডিঅ' আৰু সুৰ",
      radioDesc: "গধূলিৰ সময়ত আকাশবাণীৰ পুৰণি গীত আৰু ৰেডিঅ'ৰ মাত।",
      twoDaysAgo: "২ দিন আগতে",
      oneWeekAgo: "১ সপ্তাহ আগতে",
      twoWeeksAgo: "২ সপ্তাহ আগতে",
      justNow: "এইমাত্ৰ",
    },
    reminders: {
      ...baseEnglish.reminders,
      title: "দৈনিক সময়সূচী",
      subtitle: "ঔষধ আৰু দৈনিক কামৰ সহায়ক সময়সূচী।",
      newReminder: "➕ নতুন মনত পেলোৱা যোগ কৰক",
      add: "যোগ কৰক",
      todaySchedule: "আজিৰ সময়সূচী",
      delete: "মচি পেলাওক",
      r1Text: "পুৱাৰ ৰক্তচাপৰ ঔষধ",
      r2Text: "দুপৰীয়াৰ আহাৰ আৰু বিশ্ৰাম",
      r3Text: "গধূলিৰ গৰম পানীৰ সৈতে ঔষধ",
      r4Text: "অনন্যা (জীয়াৰী) লৈ ফোন কৰক",
      today: "আজি",
    },
    progress: {
      ...baseEnglish.progress,
      title: "মানসিক যাত্ৰা আৰু অগ্ৰগতি",
      subtitle: "কাৰ্যসূচীৰ অংশগ্ৰহণ আৰু সফলতাৰ তথ্য নিৰীক্ষণ কৰক।",
      activitiesCompleted: "সম্পূৰ্ণ কৰা কাৰ্যসূচী",
      currentLevel: "বৰ্তমানৰ স্তৰ",
      bestArea: "শ্ৰেষ্ঠ মানসিক বিভাগ",
      streakTitle: "শান্ত দৈনিক মনোযোগ",
      streakDesc: "চিনাকি শব্দ আৰু ফটো কাৰ্ডৰ অনুশীলন স্মৃতিশক্তি আৰু মানসিক শান্তি বজাই ৰখাত সহায়ক।",
      aiPerformanceProfile: "এআই কাৰ্যদক্ষতা প্ৰফাইল",
      cognitiveBreakdown: "মানসিক অনুশীলন বিভাজন",
      cognitiveBreakdownDesc: "খেলৰ তথ্যৰ পৰা স্বয়ংক্ৰিয়ভাৱে উন্নীত কৰা কাৰ্যদক্ষতা।",
      improving: "উন্নত হৈছে",
      strong: "শক্তিশালী",
      practicing: "অনুশীলনৰত",
      stable: "স্থিৰ",
      sessionLogged: "অনুশীলন সংৰক্ষিত",
      sessionsLogged: "অনুশীলনসমূহ সংৰক্ষিত",
      performanceRating: "কাৰ্যদক্ষতা ৰেটিং",
      excellent: "উৎকৃষ্ট",
      good: "ভাল",
      activePractice: "সক্ৰিয় অনুশীলন",
      activityRecords: "কাৰ্যসূচীৰ ৰেকৰ্ডসমূহ",
      saved: "সংৰক্ষিত",
      noHistoryRecorded: "কোনো খেলৰ ৰেকৰ্ড নাই। খেল খেলক আৰু অগ্ৰগতি ৰেকৰ্ড কৰক!",
      difficultyLabel: "কঠিনতা",
    },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ডিমেঞ্চিয়া আৰু স্মৃতি পৰিচৰ্যা", whatIsDementia: "ডিমেঞ্চিয়া কি?", keySigns: "প্ৰাৰম্ভিক লক্ষণসমূহ", caregiverTips: "সেৱাকাৰীৰ বাবে পৰামৰ্শ" },
    profile: {
      ...baseEnglish.profile,
      title: "আপোনাৰ প্ৰফাইল",
      subtitle: "ব্যক্তিগত চিনাক্তকৰণ আৰু সেৱাকাৰীৰ যোগাযোগৰ তথ্য।",
      welcomeBack: "পুনৰ স্বাগতম",
      selectProfileTitle: "প্ৰফাইল বাছনি কৰক",
      createProfileTitle: "জ্যেষ্ঠ প্ৰফাইল সৃষ্টি কৰক",
      fullName: "সম্পূৰ্ণ নাম",
      ageLabel: "বয়স",
      yearsOld: "বছৰ",
      genderLabel: "লিঙ্গ",
      female: "মহিলা",
      male: "পুৰুষ",
      other: "অন্যান্য",
      notSpecified: "উল্লেখনীয় নহয়",
      locationLabel: "স্থান",
      phoneNumber: "ফোন নম্বৰ",
      notProvided: "দিয়া হোৱা নাই",
      familyEmergencyContact: "পৰিয়াল / জৰুৰীকালীন যোগাযোগ",
      notConfigured: "কনফিগাৰ কৰা হোৱা নাই",
      addressLabel: "ঠিকনা",
      fullAddress: "সম্পূৰ্ণ ঠিকানা",
      noAddressEntered: "কোনো ঠিকানা দিয়া হোৱা নাই",
      profileActions: "প্ৰফাইল কাৰ্যসমূহ",
      applicationSettings: "এপ্লিকেশ্যন সংৰচনা",
      configureSettingsDesc: "ভাষা, শ্ৰৱণ পৰামৰ্শ আৰু দৃশ্যমানতা সলনি কৰক।",
      openSettingsButton: "সংৰচনা খোলক",
      guestMode: "অতিথি মোড",
      guestModeDesc: "আপুনি বৰ্তমান অতিথি হিচাপে কাৰ্যসূচীবোৰ ভ্ৰমণ কৰি আছে।",
      loadDemoProfile: "ডেমো প্ৰফাইল ল'ড কৰক (কমলা দেৱী)",
    },
  },

  // ─── BENGALI ─────────────────────────────────────────────────────────────
  Bengali: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "সংরক্ষণ করুন", cancel: "বাতিল করুন", delete: "মুছুন", edit: "সম্পাদনা", create: "তৈরি করুন", close: "বন্ধ করুন", next: "পরবর্তী", back: "পেছনে", start: "শুরু", continue: "চালিয়ে যান", tryAgain: "আবার চেষ্টা করুন", submit: "জমা দিন", correct: "সঠিক!", incorrect: "ভুল", hint: "ইঙ্গিত", level: "স্তর", score: "স্কোর", completed: "সম্পন্ন" },
    ai: { ...baseEnglish.ai, recommendedForYou: "আপনার জন্য সুপারিশকৃত", playNow: "এখন খেলুন", level: "স্তর", levelEasy: "সহজ", levelMedium: "মাঝারি", levelHard: "কঠিন", levelAdvanced: "উন্নত", recommendationTitle: "এআই সুপারিশকৃত কার্যক্রম", recommendPattern: "দৃষ্টিগত স্মৃতি ও প্যাটার্ন চেনার জন্য সেরা।", recommendAuditory: "মনোযোগ ও শান্তির জন্য শব্দ অনুশীলন।", recommendRoutine: "দৈনিক নিয়ম মনে রাখার জন্য সহায়ক।" },
    nav: { ...baseEnglish.nav, home: "মূল পাতা", activities: "কার্যক্রম", myMemories: "আমার স্মৃতিমালা", reminders: "স্মারকসূচি", progress: "অগ্রগতি", aboutDementia: "ডিমেনশিয়া তথ্য", profile: "প্রোফাইল", settings: "সেটিংস", switchProfile: "প্রোফাইল পরিবর্তন" },
    home: { ...baseEnglish.home, title: "যেখানে স্মৃতিরা", titleAccent: "মমতায় সজীব থাকে", subtitle: "বয়োজ্যেষ্ঠদের জন্য স্মৃতি সংরক্ষণ সঙ্গী", heroDescription: "আপনজনদের জন্য পরিচিত আঞ্চলিক শব্দ, পারিবারিক স্মৃতির অ্যালবাম এবং শান্ত দৈনিক সময়সূচীর একটি মমতাময় স্থান।", exploreActivities: "🧠 কার্যক্রম দেখুন", caregiverGuide: "📖 পরিচর্যাকারী নির্দেশিকা", heroBadge1: "জ্যেষ্ঠ সম্মান", heroBadge2: "স্মৃতি সংরক্ষণ সঙ্গী", heroTagline: "স্মৃতি ও শ্রবণ অভিজ্ঞতার মাধ্যমে দৈনন্দিন মর্যাদা রক্ষা", soundsCardTitle: "চেনা সুর", soundsCardDesc: "গোগোনা হার্প, বিহুর ঢোল, চা বাগানের পাখির ডাক ও বৃষ্টির শব্দ শুনুন।", soundsCardAction: "এখন শুনুন →", keepsakeCardTitle: "স্মৃতি অ্যালবাম", keepsakeCardDesc: "পারিবারিক মুহূর্ত, পূর্বপুরুষের স্মৃতি ও কণ্ঠস্বর সংরক্ষণ করুন।", keepsakeCardAction: "স্মৃতি অ্যালবাম দেখুন →", remindersCardTitle: "দৈনিক সময়সূচী", remindersCardDesc: "ঔষধের সময়, সকালের হাঁটা ও পারিবারিক ফোন কলের কথা মনে রাখুন।", remindersCardAction: "আজকের সময়সূচী দেখুন →" },
    activities: { ...baseEnglish.activities, title: "মানসিক শরীরচর্চা", subtitle: "স্মৃতিশক্তি ও মনোযোগ বৃদ্ধির জন্য দৈনিক অনুশীলন।", playNow: "শুরু করুন", viewAll: "সব কার্যক্রম দেখুন →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "স্মৃতি ফটো মেলান", memoryMatchDesc: "কার্ডে ক্লিক করে মেলানো ছবি জোড়া খুঁজুন।", flipCard: "কার্ড উল্টান", moves: "চেষ্টা", matches: "জোড়া", congrats: "চমৎকার! আপনি সব ছবি মিলিয়েছেন!", playAgain: "পুনরায় খেলুন", backToActivities: "← ফিরুন", wordPuzzlesTitle: "শব্দ ধাঁধা", wordPuzzlesDesc: "বর্ণ সাজিয়ে শব্দ তৈরি করুন ও ধাঁধা মেলান।", whatsMissingTitle: "কোনটি হারাল?", whatsMissingDesc: "ছবিগুলো দেখে হারিয়ে যাওয়া জিনিসটি মনে করুন।", patternTitle: "প্যাটার্ন মেলানো", patternDesc: "ধারাবাহিক ক্রম মেলান।", jigsawTitle: "জিগস পাজল", jigsawDesc: "ছবি সাজিয়ে পাজল মেলান।", routineTitle: "দৈনিক রুটিন", routineDesc: "সকাল থেকে রাতের কাজ সঠিকভাবে সাজান।", diceTitle: "লুডো ও ছক্কা গণনা", diceDesc: "ছক্কা ফেলে গণনা মেলাও।", boardTitle: "বোর্ড গেম", boardDesc: "বোর্ডে গুটি এগিয়ে নিয়ে চলুন।", soundRecTitle: "শব্দ চেনা", soundRecDesc: "শব্দ শুনে সঠিক উত্তর দিন।", kazirangaTitle: "কাজিরাঙ্গা পাজল", kazirangaDesc: "সহজ পাজল মেলান।", memoryLaneTitle: "স্মৃতির অ্যালবাম", memoryLaneDesc: "পুরোনো দিনের ছবি ও সুর শুনুন।", interactiveTitle: "মনোযোগ চর্চা", interactiveDesc: "ধীর গতির দৃশ্য চর্চা।", bazaarTitle: "বাজারের জিনিস বাছাই", bazaarDesc: "খাবার ও গৃহস্থালি জিনিস আলাদা করুন।" },
    memories: { ...baseEnglish.memories, title: "স্মৃতি অ্যালবাম", addMemory: "➕ নতুন স্মৃতি যুক্ত করুন", family: "পরিবার", places: "স্থানসমূহ", moments: "বিশেষ মুহূর্ত" },
    reminders: { ...baseEnglish.reminders, title: "দৈনিক সময়সূচী", newReminder: "➕ নতুন স্মারক যোগ করুন", add: "যোগ করুন", todaySchedule: "আজকের সময়সূচী", delete: "মুছুন" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ডিমেনশিয়া ও স্মৃতি যত্ন", whatIsDementia: "ডিমেনশিয়া কি?", keySigns: "প্রাথমিক লক্ষণসমূহ", caregiverTips: "পরিচর্যাকারীর পরামর্শ" },
    profile: { ...baseEnglish.profile, title: "আপনার প্রোফাইল", welcomeBack: "স্বাগতম", selectProfileTitle: "প্রোফাইল নির্বাচন করুন", createProfileTitle: "প্রোফাইল তৈরি করুন" },
  },

  // ─── HINDI ───────────────────────────────────────────────────────────────
  Hindi: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "सहेजें", cancel: "रद्द करें", delete: "हटाएँ", edit: "संपादित करें", create: "बनाएँ", close: "बंद करें", next: "अगला", back: "पीछे", start: "शुरू करें", continue: "जारी रखें", tryAgain: "पुनः प्रयास करें", submit: "जमा करें", correct: "सही!", incorrect: "गलत", hint: "संकेत", level: "स्तर", score: "अंक", completed: "पूर्ण" },
    ai: { ...baseEnglish.ai, recommendedForYou: "आपके लिए अनुशंसित", playNow: "अभी खेलें", level: "स्तर", levelEasy: "आसान", levelMedium: "मध्यम", levelHard: "कठिन", levelAdvanced: "उन्नत", recommendationTitle: "एआई अनुशंसित गतिविधि", recommendPattern: "दृश्य स्मृति और पैटर्न पहचान के अभ्यास के लिए सर्वोत्तम।", recommendAuditory: "ध्यान और विश्राम के लिए शांत ध्वनियों का अभ्यास।", recommendRoutine: "दैनिक दिनचर्या और समय तालिका याद रखने में सहायक।" },
    nav: { ...baseEnglish.nav, home: "मुख्य पृष्ठ", activities: "गतिविधियाँ", myMemories: "मेरी यादें", reminders: "स्मरणपत्र", progress: "प्रगति", aboutDementia: "डिमेंशिया के बारे में", profile: "प्रोफ़ाइल", settings: "सेटिंग्स", switchProfile: "प्रोफ़ाइल बदलें" },
    home: { ...baseEnglish.home, title: "जहाँ यादें", titleAccent: "स्नेह से जीवंत रहती हैं", subtitle: "वरिष्ठ नागरिकों के लिए स्मृति संरक्षण साथी", heroDescription: "आत्मीय क्षेत्रीय ध्वनियों, पारिवारिक यादों के एल्बम और शांत दैनिक स्मरणपत्रों के साथ एक शांत और गरिमामय आश्रय स्थल।", exploreActivities: "🧠 गतिविधियाँ देखें", caregiverGuide: "📖 देखभालकर्ता मार्गदर्शिका", heroBadge1: "वरिष्ठ गरिमा", heroBadge2: "स्मृति संरक्षण साथी", heroTagline: "संस्मरण और श्रवण अनुभवों के माध्यम से दैनिक गरिमा की रक्षा", soundsCardTitle: "आत्मीय धुनें", soundsCardDesc: "गोगोना, बिहू ढोल, चाय बागान के पक्षी और बारिश की आवाज़ें पहचानें।", soundsCardAction: "अभी सुनें →", keepsakeCardTitle: "यादों का एल्बम", keepsakeCardDesc: "पारिवारिक पलों, पैतृक स्थानों और आवाज़ की रिकॉर्डिंग सहेजें।", keepsakeCardAction: "स्मृति एल्बम देखें →", remindersCardTitle: "दैनिक दिनचर्या", remindersCardDesc: "दवा के समय, सुबह की सैर और पारिवारिक फ़ोन कॉल याद रखें।", remindersCardAction: "आज की कार्यसूची देखें →" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यास", subtitle: "स्मरणशक्ति और ध्यान को सक्रिय रखने के लिए दैनिक सरल अभ्यास।", playNow: "शुरू करें", viewAll: "सभी गतिविधियाँ देखें →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "स्मृति फ़ोटो मिलाएँ", memoryMatchDesc: "कार्डों पर क्लिक करके तस्वीरों के जोड़े ढूँढें।", flipCard: "कार्ड पलटें", moves: "प्रयास", matches: "जोड़े", congrats: "बहुत बढ़िया! आपने सभी जोड़े मिला लिए!", playAgain: "पुनः खेलें", backToActivities: "← गतिविधियों पर लौटें", wordPuzzlesTitle: "शब्द पहेलियाँ", wordPuzzlesDesc: "अक्षर सजाकर शब्द बनाएँ और पहेलियाँ सुलझाएँ।", whatsMissingTitle: "क्या गायब है?", whatsMissingDesc: "वस्तुओं को ध्यान से देखें और गायब हुई वस्तु याद करें।", patternTitle: "पैटर्न पहचान", patternDesc: "दिए गए क्रम के अनुसार अगला चित्र चुनें।", jigsawTitle: "ज़िग्सा पहेली", jigsawDesc: "चित्र जोड़कर पहेली पूरी करें।", routineTitle: "दैनिक दिनचर्या क्रम", routineDesc: "सुबह से रात की गतिविधियों को सही क्रम में लगाएँ।", diceTitle: "पासा और गिनती", diceDesc: "पासा फेंकें और संख्या मिलाएँ।", boardTitle: "बोर्ड गेम", boardDesc: "पासा फेंककर बोर्ड पर आगे बढ़ें।", soundRecTitle: "आवाज़ पहचान", soundRecDesc: "आवाज़ सुनकर सही विकल्प चुनें।", kazirangaTitle: "काज़ीरंगा 4-टुकड़ा पहेली", kazirangaDesc: "सरल 2x2 गेंडा पहेली मिलाएँ।", memoryLaneTitle: "यादों की गलियारा", memoryLaneDesc: "पुरानी यादों की तस्वीरें और शांत धुनें सुनें।", interactiveTitle: "ध्यान केंद्रित गतिविधि", interactiveDesc: "धीमी गति की दृश्य गतिविधि।", bazaarTitle: "बाज़ार वस्तु छँटाई", bazaarDesc: "खान-पान और घरेलू सामान अलग-अलग टोकरी में रखें।" },
    memories: { ...baseEnglish.memories, title: "स्मृति एल्बम", addMemory: "➕ नई याद जोड़ें", family: "परिवार", places: "स्थान", moments: "विशेष पल" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक दिनचर्या", newReminder: "➕ नया स्मरण जोड़ें", add: "जोड़ें", todaySchedule: "आज की कार्यसूची", delete: "हटाएँ" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "डिमेंशिया एवं स्मृति देखभाल", whatIsDementia: "डिमेंशिया क्या है?", keySigns: "शुरुआती संकेत", caregiverTips: "देखभालकर्ता सुझाव" },
    profile: { ...baseEnglish.profile, title: "आपकी प्रोफ़ाइल", welcomeBack: "पुनः स्वागत है", selectProfileTitle: "प्रोफ़ाइल चुनें", createProfileTitle: "वरिष्ठ प्रोफ़ाइल बनाएँ" },
  },

  // ─── TAMIL ───────────────────────────────────────────────────────────────
  Tamil: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "சேமி", cancel: "ரத்து செய்", delete: "நீக்கு", edit: "திருத்து", create: "உருவாக்கு", close: "மூடு", next: "அடுத்து", back: "பின்னால்", start: "தொடங்கு", continue: "தொடரவும்", tryAgain: "மீண்டும் முயல்க", submit: "சமர்ப்பி", correct: "சரி!", incorrect: "தவறு", hint: "குறிப்பு", level: "நிலை", score: "மதிப்பெண்", completed: "முடிந்தது" },
    ai: { ...baseEnglish.ai, recommendedForYou: "உங்களுக்கான பரிந்துரை", playNow: "இப்போது விளையாடு", level: "நிலை", levelEasy: "எளிது", levelMedium: "நடுத்தரம்", levelHard: "கடினம்", levelAdvanced: "உயர் நிலை", recommendationTitle: "AI பரிந்துரைத்த செயல்பாடு", recommendPattern: "பார்வை நினைவாற்றல் மற்றும் வடிவங்களை கண்டறிய சிறந்தது.", recommendAuditory: "கவனத்தை மேம்படுத்தும் அமைதியான ஒலி பயிற்சி.", recommendRoutine: "தினசரி வழக்கத்தை நினைவில் கொள்ள உதவும்." },
    nav: { ...baseEnglish.nav, home: "முகப்பு", activities: "செயல்பாடுகள்", myMemories: "என் நினைவுகள்", reminders: "நினைவூட்டல்கள்", progress: "முன்னேற்றம்", aboutDementia: "டிமென்ஷியா பற்றி", profile: "சுயவிவரம்", settings: "அமைப்புகள்", switchProfile: "சுயவிவரம் மாற்று" },
    home: { ...baseEnglish.home, title: "நினைவுகள்", titleAccent: "அன்போடு வாழும் இடம்", subtitle: "முதியோர்களுக்கான நினைவு பாதுகாப்பு துணைவன்", heroDescription: "அன்பான முதியவர்களுக்கான அமைதியான மற்றும் கண்ணியமான நினைவக புகலிடம்.", exploreActivities: "🧠 செயல்பாடுகளைப் பார்க்க", caregiverGuide: "📖 பராமரிப்பாளர் வழிகாட்டி", heroBadge1: "முதியோர் கண்ணியம்", heroBadge2: "நினைவு துணைவன்", heroTagline: "நினைவுகள் மற்றும் ஒலிகள் மூலம் தினசரி கண்ணியத்தை பாதுகாத்தல்", soundsCardTitle: "சொந்த ஊர் ஒலிகள்", soundsCardDesc: "பழக்கப்பட்ட இசைக்கருவிகள் மற்றும் இயற்கை ஒலிகளைக் கண்டறியவும்.", soundsCardAction: "இப்போது கேட்க →", keepsakeCardTitle: "நினைவுப் பேழை", keepsakeCardDesc: "குடும்பப் படங்கள் மற்றும் குரல் பதிவுகளைச் சேமிக்கவும்.", keepsakeCardAction: "நினைவுப் பேழையைப் பார்க்க →", remindersCardTitle: "தினசரி அட்டவணை", remindersCardDesc: "மருந்து நேரம் மற்றும் காலை நடைப்பயிற்சியை நினைவில் கொள்ளவும்.", remindersCardAction: "இன்றைய அட்டவணையைப் பார்க்க →" },
    activities: { ...baseEnglish.activities, title: "மனப் பயிற்சிகள்", subtitle: "நினைவாற்றலை அதிகரிக்க தினசரி எளிய பயிற்சிகள்.", playNow: "தொடங்கவும்", viewAll: "அனைத்து செயல்பாடுகளையும் பார்க்க →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "நினைவுப் படம் பொருத்துதல்", memoryMatchDesc: "ஒரே மாதிரியான பட ஜோடிகளைக் கண்டுபிடிக்கவும்.", flipCard: "கார்டை திருப்பு", moves: "முயற்சிகள்", matches: "ஜோடிகள்", congrats: "அற்புதம்! அனைத்து படங்களையும் பொருத்திவிட்டீர்கள்!", playAgain: "மீண்டும் விளையாடு", backToActivities: "← திரும்பச் செல்", wordPuzzlesTitle: "சொல் புதிர்கள்", wordPuzzlesDesc: "எழுத்துக்களை அடுக்கி சொற்களை உருவாக்கவும்.", whatsMissingTitle: "எது மறைந்தது?", whatsMissingDesc: "மறைந்த பொருளை நினைவுகூரவும்.", patternTitle: "வடிவப் பொருத்தம்", patternDesc: "அடுத்த படத்தைக் கண்டறியவும்.", jigsawTitle: "பட புதிர்", jigsawDesc: "துண்டுகளைச் சேர்த்து படத்தை முடிக்கவும்.", routineTitle: "தினசரி வழக்க முறை", routineDesc: "காலை முதல் இரவு வரையிலான பணிகளை வரிசைப்படுத்தவும்.", diceTitle: "பகடை விளையாட்டு", diceDesc: "பகடையை உருட்டி எண்களைப் பொருத்தவும்.", boardTitle: "பலகை விளையாட்டு", boardDesc: "பகடை உருட்டி முன்னோக்கிச் செல்லவும்.", soundRecTitle: "ஒலி கண்டறிதல்", soundRecDesc: "ஒலியைக் கேட்டு சரியான பதிலைத் தேர்ந்தெடுக்கவும்.", kazirangaTitle: "காசிரங்கா புதிர்", kazirangaDesc: "எளிய காண்டாமிருக புதிர்.", memoryLaneTitle: "நினைவுப் பாதை", memoryLaneDesc: "பழைய நினைவுகளின் புகைப்படங்களைக் காணவும்.", interactiveTitle: "கவனப் பயிற்சி", interactiveDesc: "மெதுவான காட்சிப் பயிற்சி.", bazaarTitle: "சந்தை பொருட்கள் பிரித்தல்", bazaarDesc: "உணவு மற்றும் வீட்டுப் பொருட்களை பிரிக்கவும்." },
    memories: { ...baseEnglish.memories, title: "நினைவுப் பேழை", addMemory: "➕ புதிய நினைவு சேர்க்க", family: "குடும்பம்", places: "இடங்கள்", moments: "சிறப்பு தருணங்கள்" },
    reminders: { ...baseEnglish.reminders, title: "தினசரி அட்டவணை", newReminder: "➕ புதிய நினைவூட்டல் சேர்க்க", add: "சேர்க்க", todaySchedule: "இன்றைய அட்டவணை", delete: "நீக்கு" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "டிமென்ஷியா பராமரிப்பு", whatIsDementia: "டிமென்ஷியா என்றால் என்ன?", keySigns: "ஆரம்ப அறிகுறிகள்", caregiverTips: "பராமரிப்பாளர் ஆலோசனைகள்" },
    profile: { ...baseEnglish.profile, title: "உங்கள் சுயவிவரம்", welcomeBack: "மீண்டும் வருக", selectProfileTitle: "சுயவிவரம் தேர்ந்தெடுக்கவும்", createProfileTitle: "சுயவிவரம் உருவாக்கவும்" },
  },

  // ─── TELUGU ──────────────────────────────────────────────────────────────
  Telugu: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "సేవ్ చేయి", cancel: "రద్దు చేయి", delete: "తొలగించు", edit: "సవరించు", create: "సృష్టించు", close: "మూసివేయి", next: "తరువాత", back: "వెనుకకు", start: "ప్రారంభించు", continue: "కొనసాగించు", tryAgain: "మళ్ళీ ప్రయత్నించు", submit: "సమర్పించు", correct: "సరియైనది!", incorrect: "తప్పు", hint: "సూచన", level: "స్థాయి", score: "స్కోరు", completed: "పూర్తయింది" },
    ai: { ...baseEnglish.ai, recommendedForYou: "మీ కోసం సిఫార్సు చేయబడింది", playNow: "ఇప్పుడే ఆడు", level: "స్థాయి", levelEasy: "సులభం", levelMedium: "మధ్యస్థం", levelHard: "కఠినం", levelAdvanced: "ఉన్నత స్థాయి", recommendationTitle: "AI సిఫార్సు చేసిన కార్యకలాపం", recommendPattern: "విజువల్ మెమరీ మరియు ప్యాటర్న్ గుర్తింపుకు అనువైనది.", recommendAuditory: "శ్రద్ధ మరియు విశ్రాంతి కోసం ప్రశాంత శబ్ద వ్యాయామం.", recommendRoutine: "దినచర్య గుర్తుంచుకోవడానికి ఉపయోగపడుతుంది." },
    nav: { ...baseEnglish.nav, home: "ముఖ్య పుట", activities: "కార్యకలాపాలు", myMemories: "నా జ్ఞాపకాలు", reminders: "జ్ఞాపికలు", progress: "పురోగతి", aboutDementia: "డిమెన్షియా గురించి", profile: "ప్రొఫైల్", settings: "సెట్టింగ్‌లు", switchProfile: "ప్రొఫైల్ మార్చు" },
    home: { ...baseEnglish.home, title: "జ్ఞాపకాలు", titleAccent: "ప్రేమతో పదిలంగా ఉండే చోటు", subtitle: "వృద్ధుల కోసం జ్ఞాపకాల సంరక్షణ సేవకుడు", heroDescription: "వృద్ధుల కోసం ఆత్మీయ ప్రాంతీయ శబ్దాలు, కుటుంబ జ్ఞాపకాల ఆల్బమ్‌లు మరియు దినచర్య జ్ఞాపికలతో కూడిన ప్రశాంత ప్రదేశం.", exploreActivities: "🧠 కార్యకలాపాలు చూడండి", caregiverGuide: "📖 సంరక్షకుల మార్గదర్శి", heroBadge1: "వృద్ధుల గౌరవం", heroBadge2: "జ్ఞాపకాల తోడు", heroTagline: "జ్ఞాపకాలు మరియు శబ్దాల ద్వారా దినచర్య గౌరవాన్ని కాపాడటం", soundsCardTitle: "సొంత ఊరి శబ్దాలు", soundsCardDesc: "సంగీత వాయిద్యాలు మరియు ప్రకృతి శబ్దాలను గుర్తించండి.", soundsCardAction: "ఇప్పుడే వినండి →", keepsakeCardTitle: "జ్ఞాపకాల ఆల్బమ్", keepsakeCardDesc: "కుటుంబ ఫోటోలు మరియు వాయిస్ రికార్డింగ్‌లను దాచుకోండి.", keepsakeCardAction: "జ్ఞాపకాల ఆల్బమ్ చూడండి →", remindersCardTitle: "దినచర్య పట్టిక", remindersCardDesc: "మందుల సమయం మరియు ఉదయపు నడకను గుర్తుంచుకోండి.", remindersCardAction: "నేటి పట్టిక చూడండి →" },
    activities: { ...baseEnglish.activities, title: "మానసిక వ్యాయామాలు", subtitle: "జ్ఞాపకశక్తిని పెంచే దినచర్య వ్యాయామాలు.", playNow: "ప్రారంభించు", viewAll: "అన్ని కార్యకలాపాలు చూడండి →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "జ్ఞాపకాల ఫోటో మ్యాచ్", memoryMatchDesc: "ఒకే రకమైన ఫోటో జోడీలను గుర్తించండి.", flipCard: "కార్డ్ తిప్పు", moves: "ప్రయత్నాలు", matches: "జోడీలు", congrats: "అద్భుతం! అన్ని ఫోటోలను సరిగ్గా జతచేశారు!", playAgain: "మళ్ళీ ఆడు", backToActivities: "← వెనుకకు వెళ్ళు", wordPuzzlesTitle: "పదాల పొడుపుకథలు", wordPuzzlesDesc: "అక్షరాలను సరిచేసి పదాలు తయారు చేయండి.", whatsMissingTitle: "ఏది మాయమైంది?", whatsMissingDesc: "మాయమైన వస్తువును గుర్తుతెచ్చుకోండి.", patternTitle: "ప్యాటర్న్ గుర్తింపు", patternDesc: "తరువాతి చిత్రాన్ని గుర్తించండి.", jigsawTitle: "జిగ్సా పజిల్", jigsawDesc: "ముక్కలను చేర్చి చిత్రాన్ని పూర్తి చేయండి.", routineTitle: "దినచర్య క్రమం", routineDesc: "ఉదయం నుండి రాత్రి పనులను క్రమంలో పెట్టండి.", diceTitle: "పాచికల ఆట", diceDesc: "పాచికలు దొర్లించి సంఖ్యలను జత చేయండి.", boardTitle: "బోర్డ్ గేమ్", boardDesc: "పాచికలు దొర్లించి ముందుకు కదలండి.", soundRecTitle: "శబ్దం గుర్తింపు", soundRecDesc: "శబ్దం విని సరియైన సమాధానం ఎంచుకోండి.", kazirangaTitle: "కాజీరంగా పజిల్", kazirangaDesc: "సులభమైన ఖడ్గమృగం పజిల్.", memoryLaneTitle: "జ్ఞాపకాల వీధి", memoryLaneDesc: "పాత రోజు జ్ఞాపకాల ఫోటోలు మరియు శబ్దాలు.", interactiveTitle: "శ్రద్ధ వ్యాయామం", interactiveDesc: "ప్రశాంత దృశ్య వ్యాయామం.", bazaarTitle: "మార్కెట్ వస్తువుల వేరుచేయడం", bazaarDesc: "ఆహారం మరియు గృహ వస్తువులను వేరు చేయండి." },
    memories: { ...baseEnglish.memories, title: "జ్ఞాపకాల ఆల్బమ్", addMemory: "➕ కొత్త జ్ఞాపకం జోడించు", family: "కుటుంబం", places: "ప్రాంతాలు", moments: "ప్రత్యేక క్షణాలు" },
    reminders: { ...baseEnglish.reminders, title: "దినచర్య పట్టిక", newReminder: "➕ కొత్త జ్ఞాపిక జోడించు", add: "జోడించు", todaySchedule: "నేటి పట్టిక", delete: "తొలగించు" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "డిమెన్షియా సంరక్షణ", whatIsDementia: "డిమెన్షియా అంటే ఏమిటి?", keySigns: "ప్రారంభ గుర్తులు", caregiverTips: "సంరక్షకుల సూచనలు" },
    profile: { ...baseEnglish.profile, title: "మీ ప్రొఫైల్", welcomeBack: "తిరిగి స్వాగతం", selectProfileTitle: "ప్రొఫైల్ ఎంచుకోండి", createProfileTitle: "ప్రొఫైల్ సృష్టించండి" },
  },

  // ─── KANNADA ─────────────────────────────────────────────────────────────
  Kannada: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "ಉಳಿಸಿ", cancel: "ರದ್ದುಮಾಡಿ", delete: "ಅಳಿಸಿ", edit: "ಸಂಪಾದಿಸಿ", create: "ರಚಿಸಿ", close: "ಮುಚ್ಚಿ", next: "ಮುಂದೆ", back: "ಹಿಂಗೆ", start: "ಪ್ರಾರಂಭಿಸಿ", continue: "ಮುಂದುವರಿಸಿ", tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", submit: "ಸಲ್ಲಿಸಿ", correct: "ಸರಿ!", incorrect: "ತಪ್ಪು", hint: "ಸುಳಿವು", level: "ಮಟ್ಟ", score: "ಅಂಕ", completed: "ಪೂರ್ಣಗೊಂಡಿದೆ" },
    ai: { ...baseEnglish.ai, recommendedForYou: "ನಿಮಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ", playNow: "ಈಗಲೇ ಆಡಿ", level: "ಮಟ್ಟ", levelEasy: "ಸುಲಭ", levelMedium: "ಮಧ್ಯಮ", levelHard: "ಕಠಿಣ", levelAdvanced: "ಉನ್ನತ ಮಟ್ಟ", recommendationTitle: "AI ಶಿಫಾರಸು ಮಾಡಿದ ಚಟುವಟಿಕೆ", recommendPattern: "ದೃಶ್ಯ ನೆನಪು ಮತ್ತು ಮಾದರಿ ಗುರುತಿಸುವಿಕೆಗೆ ಸೂಕ್ತವಾಗಿದೆ.", recommendAuditory: "ಗಮನ ಮತ್ತು ವಿಶ್ರಾಂತಿಗಾಗಿ ಶಾಂತ ಧ್ವನಿ ಅಭ್ಯಾಸ.", recommendRoutine: "ದೈನಂದಿನ ದಿನಚರಿಯನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳಲು ಸಹಕಾರಿ." },
    nav: { ...baseEnglish.nav, home: "ಮುಖ್ಯ ಪುಟ", activities: "ಚಟುವಟಿಕೆಗಳು", myMemories: "ನನ್ನ ನೆನಪುಗಳು", reminders: "ನೆನಪೂಲೆಗಳು", progress: "ಪ್ರಗತಿ", aboutDementia: "ಡಿಮೆನ್ಷಿಯಾ ಬಗ್ಗೆ", profile: "ಪ್ರೊಫೈಲ್", settings: "ಸರಿಹೊಂದಿಕೆಗಳು", switchProfile: "ಪ್ರೊಫೈಲ್ ಬದಲಾಯಿಸಿ" },
    home: { ...baseEnglish.home, title: "ನೆನಪುಗಳು", titleAccent: "ಪ್ರೀತಿಯಿಂದ ಜೀವಂತವಾಗಿರುವ ಸ್ಥಳ", subtitle: "ಹಿರಿಯರಿಗಾಗಿ ನೆನಪಿನ ಸಂರಕ್ಷಣಾ ಸಂಗಾತಿ", heroDescription: "ಹಿರಿಯರಿಗಾಗಿ ಪ್ರಾದೇಶಿಕ ಶಬ್ದಗಳು, ಕೌಟುಂಬಿಕ ನೆನಪಿನ ಆಲ್ಬಮ್‌ಗಳು ಮತ್ತು ದೈನಂದಿನ ನೆನಪೂಲೆಗಳನ್ನೊಳಗೊಂಡ ಶಾಂತಿಯುತ ತಾಣ.", exploreActivities: "🧠 ಚಟುವಟಿಕೆಗಳನ್ನು ನೋಡಿ", caregiverGuide: "📖 ಆರೈಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ", heroBadge1: "ಹಿರಿಯ ಗೌರವ", heroBadge2: "ನೆನಪಿನ ಸಂಗಾತಿ", heroTagline: "ನೆನಪುಗಳು ಮತ್ತು ಶಬ್ದಗಳ ಮೂಲಕ ದೈನಂದಿನ ಗೌರವ ರಕ್ಷಣೆ", soundsCardTitle: "ನಮ್ಮೂರಿನ ಶಬ್ದಗಳು", soundsCardDesc: "ಸಂಗೀತ ವಾದ್ಯಗಳು ಮತ್ತು ಪ್ರಕೃತಿಯ ಧ್ವನಿಗಳನ್ನು ಗುರುತಿಸಿ.", soundsCardAction: "ಈಗಲೇ ಕೇಳಿ →", keepsakeCardTitle: "ನೆನಪಿನ ಆಲ್ಬಮ್", keepsakeCardDesc: "ಕುಟುಂಬದ ಫೋಟೋಗಳು ಮತ್ತು ಧ್ವನಿ ಮುದ್ರಿಕೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ.", keepsakeCardAction: "ನೆನಪಿನ ಆಲ್ಬಮ್ ನೋಡಿ →", remindersCardTitle: "ದೈನಂದಿನ ವೇಳಾಪಟ್ಟಿ", remindersCardDesc: "ಔಷಧಿಯ ಸಮಯ ಮತ್ತು ಬೆಳಗಿನ ನಡಿಗೆಯನ್ನು ನೆನಪಿಡಿ.", remindersCardAction: "ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ ನೋಡಿ →" },
    activities: { ...baseEnglish.activities, title: "ಮಾನಸಿಕ ಅಭ್ಯಾಸಗಳು", subtitle: "ನೆನಪಿನ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸುವ ದೈನಂದಿನ ಸರಳ ಅಭ್ಯಾಸಗಳು.", playNow: "ಪ್ರಾರಂಭಿಸಿ", viewAll: "ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳನ್ನು ನೋಡಿ →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "ನೆನಪಿನ ಫೋಟೋ ಜೋಡಿ", memoryMatchDesc: "ಒಂದೇ ರೀತಿಯ ಫೋಟೋ ಜೋಡಿಗಳನ್ನು ಹುಡುಕಿ.", flipCard: "ಕಾರ್ಡ್ ತಿರುಗಿಸಿ", moves: "ಪ್ರಯತ್ನಗಳು", matches: "ಜೋಡಿಗಳು", congrats: "ಅದ್ಭುತ! ಎಲ್ಲಾ ಫೋಟೋಗಳನ್ನು ಸರಿಯಾಗಿ ಜೋಡಿಸಿದ್ದೀರಿ!", playAgain: "ಮತ್ತೆ ಆಡಿ", backToActivities: "← ಹಿಂದೆ ಹೋಗಿ", wordPuzzlesTitle: "ಪದಗಳ ಒಗಟು", wordPuzzlesDesc: "ಅಕ್ಷರಗಳನ್ನು ಜೋಡಿಸಿ ಪದಗಳನ್ನು ರಚಿಸಿ.", whatsMissingTitle: "ಯಾವುದು ಕಣ್ಮರೆಯಾಗಿದೆ?", whatsMissingDesc: "ಕಣ್ಮರೆಯಾದ ವಸ್ತುವನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಿ.", patternTitle: "ಮಾದರಿ ಗುರುತಿಸುವಿಕೆ", patternDesc: "ಮುಂದಿನ ಚಿತ್ರವನ್ನು ಗುರುತಿಸಿ.", jigsawTitle: "ಜಿಗ್ಸಾ ಪಝಲ್", jigsawDesc: "ಚಿತ್ರದ ತುಂಡುಗಳನ್ನು ಸೇರಿಸಿ ಪೂರ್ಣಗೊಳಿಸಿ.", routineTitle: "ದೈನಂದಿನ ದಿನಚರಿ ಕ್ರಮ", routineDesc: "ಬೆಳಗಿನಿಂದ ರಾತ್ರಿಯ ಕೆಲಸಗಳನ್ನು ಕ್ರಮವಾಗಿ ಜೋಡಿಸಿ.", diceTitle: "ದಾಳದ ಆಟ", diceDesc: "ದಾಳ ಎಸೆದು ಸಂಖ್ಯೆಗಳನ್ನು ಜೋಡಿಸಿ.", boardTitle: "ಬೋರ್ಡ್ ಗೇಮ್", boardDesc: "ದಾಳ ಎಸೆದು ಮುಂದೆ ಸಾಗಿ.", soundRecTitle: "ಶಬ್ದ ಗುರುತಿಸುವಿಕೆ", soundRecDesc: "ಶಬ್ದ ಕೇಳಿ ಸರಿಯಾದ ಉತ್ತರ ಆಯ್ಕೆಮಾಡಿ.", kazirangaTitle: "ಕಾಜಿರಂಗ ಪಝಲ್", kazirangaDesc: "ಸರಳ ಖಡ್ಗಮೃಗದ ಪಝಲ್.", memoryLaneTitle: "ನೆನಪಿನ ಹಾದಿ", memoryLaneDesc: "ಹಳೆಯ ದಿನಗಳ ಫೋಟೋಗಳು ಮತ್ತು ಶಬ್ದಗಳು.", interactiveTitle: "ಗಮನ ಅಭ್ಯಾಸ", interactiveDesc: "ಶಾಂತ ದೃಶ್ಯ ಅಭ್ಯಾಸ.", bazaarTitle: "ಸಂತೆ ವಸ್ತುಗಳ ವಿಂಗಡಣೆ", bazaarDesc: "ಆಹಾರ ಮತ್ತು ಗೃಹಬಳಕೆಯ ವಸ್ತುಗಳನ್ನು ಬೇರ್ಪಡಿಸಿ." },
    memories: { ...baseEnglish.memories, title: "ನೆನಪಿನ ಆಲ್ಬಮ್", addMemory: "➕ ಹೊಸ ನೆನಪು ಸೇರಿಸಿ", family: "ಕುಟುಂಬ", places: "ಸ್ಥಳಗಳು", moments: "ವಿಶೇಷ ಕ್ಷಣಗಳು" },
    reminders: { ...baseEnglish.reminders, title: "ದೈನಂದಿನ ವೇಳಾಪಟ್ಟಿ", newReminder: "➕ ಹೊಸ ನೆನಪೂಲೆ ಸೇರಿಸಿ", add: "ಸೇರಿಸಿ", todaySchedule: "ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ", delete: "ಅಳಿಸಿ" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ಡಿಮೆನ್ಷಿಯಾ ಆರೈಕೆ", whatIsDementia: "ಡಿಮೆನ್ಷಿಯಾ ಎಂದರೇನು?", keySigns: "ಆರಂಭಿಕ ಲಕ್ಷಣಗಳು", caregiverTips: "ಆರೈಕೆದಾರ ಸಲಹೆಗಳು" },
    profile: { ...baseEnglish.profile, title: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್", welcomeBack: "ಮತ್ತೆ ಸ್ವಾಗತ", selectProfileTitle: "ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ", createProfileTitle: "ಪ್ರೊಫೈಲ್ ರಚಿಸಿ" },
  },

  // ─── MALAYALAM ─────────────────────────────────────────────────────────
  Malayalam: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "സേവ് ചെയ്യുക", cancel: "റദ്ദാക്കുക", delete: "മായ്ക്കുക", edit: "തിരുത്തുക", create: "ഉണ്ടാക്കുക", close: "അടയ്ക്കുക", next: "അടുത്തത്", back: "പിന്നോട്ട്", start: "തുടങ്ങുക", continue: "തുടരുക", tryAgain: "വീണ്ടും ശ്രമിക്കുക", submit: "സമർപ്പിക്കുക", correct: "ശരി!", incorrect: "തെറ്റ്", hint: "സൂചന", level: "ലെവൽ", score: "സ്കോർ", completed: "പൂർത്തിയായി" },
    ai: { ...baseEnglish.ai, recommendedForYou: "നിങ്ങൾക്കായി ശുപാർശ ചെയ്തത്", playNow: "ഇപ്പോൾ കളിക്കുക", level: "ലെവൽ", levelEasy: "എളുപ്പം", levelMedium: "ഇടത്തരം", levelHard: "കഠിനം", levelAdvanced: "ഉയർന്ന ലെവൽ", recommendationTitle: "AI ശുപാർശ ചെയ്ത പ്രവർത്തനം", recommendPattern: "ദൃശ്യ ഓർമ്മയ്ക്കും പാറ്റേൺ തിരിച്ചറിയലിനും അനുയോജ്യമായത്.", recommendAuditory: "ശ്രദ്ധയ്ക്കും വിശ്രമത്തിനുമുള്ള ശാന്തമായ ശബ്ദ പരിശീലനം.", recommendRoutine: "ദിനചര്യകൾ ഓർത്തെടുക്കാൻ സഹായിക്കുന്നു." },
    nav: { ...baseEnglish.nav, home: "പ്രധാന താൾ", activities: "പ്രവർത്തനങ്ങൾ", myMemories: "എന്റെ ഓർമ്മകൾ", reminders: "ഓർമ്മപ്പെടുത്തലുകൾ", progress: "പുരോഗതി", aboutDementia: "ഡിമെൻഷ്യയെക്കുറിച്ച്", profile: "പ്രൊഫൈൽ", settings: "ക്രമീകരണങ്ങൾ", switchProfile: "പ്രൊഫൈൽ മാറ്റുക" },
    home: { ...baseEnglish.home, title: "ഓർമ്മകൾ", titleAccent: "സ്നേഹത്തോടെ ജീവിക്കുന്ന ഇടം", subtitle: "മുതിർന്നവർക്കായുള്ള ഓർമ്മ സംരക്ഷണ സഹായി", heroDescription: "മുതിർന്നവർക്കായി പരിചയമുള്ള പ്രാദേശിക ശബ്ദങ്ങളും കുടുംബ ചിത്രങ്ങളും ദിനചര്യ ഓർമ്മപ്പെടുത്തലുകളും അടങ്ങിയ ശാന്തമായ ഇടം.", exploreActivities: "🧠 പ്രവർത്തനങ്ങൾ കാണുക", caregiverGuide: "📖 പരിചരണ ഗൈഡ്", heroBadge1: "മുതിർന്നവരുടെ മാന്യത", heroBadge2: "ഓർമ്മ സഹായി", heroTagline: "ഓർമ്മകളിലൂടെയും ശബ്ദങ്ങളിലൂടെയും ദിനചര്യ മാന്യത സംരക്ഷിക്കുന്നു", soundsCardTitle: "നാടൻ ശബ്ദങ്ങൾ", soundsCardDesc: "സംഗീതോപകരണങ്ങളും പ്രകൃതി ശബ്ദങ്ങളും തിരിച്ചറിയുക.", soundsCardAction: "ഇപ്പോൾ കേൾക്കൂ →", keepsakeCardTitle: "ഓർമ്മ ആൽബം", keepsakeCardDesc: "കുടുംബ ചിത്രങ്ങളും ശബ്ദ സന്ദേശങ്ങളും സൂക്ഷിക്കുക.", keepsakeCardAction: "ഓർമ്മ ആൽബം കാണുക →", remindersCardTitle: "ദിനചര്യ സമയം", remindersCardDesc: "മരുന്നുകളുടെ സമയവും രാവിലത്തെ നടപ്പും ഓർമ്മിക്കുക.", remindersCardAction: "ഇന്നത്തെ സമയം കാണുക →" },
    activities: { ...baseEnglish.activities, title: "മാനസിക വ്യായാമങ്ങൾ", subtitle: "ഓർമ്മശക്തി വർദ്ധിപ്പിക്കുന്ന ലളിതമായ ദിനചര്യകൾ.", playNow: "ആരംഭിക്കുക", viewAll: "എല്ലാ പ്രവർത്തനങ്ങളും കാണുക →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "ഓർമ്മ ചിത്ര ജോഡി", memoryMatchDesc: "ഒരേപോലെയുള്ള ചിത്ര ജോഡികൾ കണ്ടെത്തുക.", flipCard: "കാർഡ് മറിക്കുക", moves: "ശ്രമങ്ങൾ", matches: "ജോഡികൾ", congrats: "മികച്ച നേട്ടം! എല്ലാ ചിത്രങ്ങളും ശരിയായി ചേർത്തുവെച്ചു!", playAgain: "വീണ്ടും കളിക്കുക", backToActivities: "← തിരികെ പോവുക", wordPuzzlesTitle: "വാക്ക് കടങ്കഥകൾ", wordPuzzlesDesc: "അക്ഷരങ്ങൾ അടുക്കി വാക്കുകൾ ഉണ്ടാക്കുക.", whatsMissingTitle: "ഏതാണ് കാണാതായത്?", whatsMissingDesc: "കാണാതായ വസ്തു ഓർത്തെടുക്കുക.", patternTitle: "പാറ്റേൺ തിരിച്ചറിയൽ", patternDesc: "അടുത്ത ചിത്രം കണ്ടെത്തുക.", jigsawTitle: "ജിഗ്സോ പസിൽ", jigsawDesc: "ചിത്ര കഷണങ്ങൾ ചേർത്തു പൂർത്തിയാക്കുക.", routineTitle: "ദിനചര്യ ക്രമം", routineDesc: "രാവിലെ മുതൽ രാത്രി വരെയുള്ള ജോലികൾ ക്രമീകരിക്കുക.", diceTitle: "കരു കളി", diceDesc: "കരു എറിഞ്ഞു അക്കങ്ങൾ കണ്ടെത്തുക.", boardTitle: "ബോർഡ് ഗെയിം", boardDesc: "കരു എറിഞ്ഞു മുന്നോട്ട് നീങ്ങുക.", soundRecTitle: "ശബ്ദം തിരിച്ചറിയൽ", soundRecDesc: "ശബ്ദം കേട്ട് ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കുക.", kazirangaTitle: "കാസിരംഗ പസിൽ", kazirangaDesc: "ലളിതമായ കാണ്ടാമൃഗ പസിൽ.", memoryLaneTitle: "ഓർമ്മ വഴി", memoryLaneDesc: "പഴയകാല ചിത്രങ്ങളും ശബ്ദങ്ങളും.", interactiveTitle: "ശ്രദ്ധ പരിശീലനം", interactiveDesc: "ശാന്തമായ ദൃശ്യ പരിശീലനം.", bazaarTitle: "അങ്ങാടി സാധനങ്ങൾ വേർതിരിക്കൽ", bazaarDesc: "ഭക്ഷണ സാധനങ്ങളും വീട്ടാവശ്യ സാധനങ്ങളും വേർതിരിക്കുക." },
    memories: { ...baseEnglish.memories, title: "ഓർമ്മ ആൽബം", addMemory: "➕ പുതിയ ഓർമ്മ ചേർക്കുക", family: "കുടുംബം", places: "സ്ഥലങ്ങൾ", moments: "പ്രത്യേക നിമിഷങ്ങൾ" },
    reminders: { ...baseEnglish.reminders, title: "ദിനചര്യ സമയം", newReminder: "➕ പുതിയ ഓർമ്മപ്പെടുത്തൽ", add: "ചേർക്കുക", todaySchedule: "ഇന്നത്തെ സമയം", delete: "മായ്ക്കുക" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ഡിമെൻഷ്യ പരിചരണം", whatIsDementia: "എന്താണ് ഡിമെൻഷ്യ?", keySigns: "ആദ്യകാല ലക്ഷണങ്ങൾ", caregiverTips: "പരിചരണ നിർദ്ദേശങ്ങൾ" },
    profile: { ...baseEnglish.profile, title: "നിങ്ങളുടെ പ്രൊഫൈൽ", welcomeBack: "വീണ്ടും സ്വാഗതം", selectProfileTitle: "പ്രൊഫൈൽ തിരഞ്ഞെടുക്കുക", createProfileTitle: "പ്രൊഫൈൽ ഉണ്ടാക്കുക" },
  },

  // ─── MARATHI ─────────────────────────────────────────────────────────────
  Marathi: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "जतन करा", cancel: "रद्द करा", delete: "हटवा", edit: "संपादित करा", create: "तयार करा", close: "बंद करा", next: "पुढील", back: "मागे", start: "सुरू करा", continue: "चालू ठेवा", tryAgain: "पुन्हा प्रयत्न करा", submit: "सादर करा", correct: "बरोबर!", incorrect: "चुकीचे", hint: "संकेत", level: "पातळी", score: "गुण", completed: "पूर्ण" },
    ai: { ...baseEnglish.ai, recommendedForYou: "तुमच्यासाठी सुचवलेले", playNow: "आत्ता खेळा", level: "पातळी", levelEasy: "सोपे", levelMedium: "मध्यम", levelHard: "कठीण", levelAdvanced: "प्रगत", recommendationTitle: "एआय सुचवलेला उपक्रम", recommendPattern: "दृष्य स्मरणशक्ती आणि नक्षी ओळखण्यासाठी उत्तम.", recommendAuditory: "लक्ष आणि विश्रांतीसाठी शांत ध्वनी सराव.", recommendRoutine: "दैनिक दिनचर्या आठवण्यासाठी उपयुक्त." },
    nav: { ...baseEnglish.nav, home: "मुख्य पृष्ठ", activities: "उपक्रम", myMemories: "माझ्या आठवणी", reminders: "आठवणपत्र", progress: "प्रगती", aboutDementia: "डिमेंशिया बद्दल", profile: "प्रोफाइल", settings: "सेटिंग्ज", switchProfile: "प्रोफाइल बदला" },
    home: { ...baseEnglish.home, title: "जिथे आठवणी", titleAccent: "जुलमाने ताज्या राहतात", subtitle: "जेष्ठ नागरिकांसाठी आठवणी जपणारा सोबती", heroDescription: "जेष्ठ नागरिकांसाठी ओळखीचे प्रादेशिक आवाज, कौटुंबिक आठवणींचे अल्बम आणि दैनंदिन आठवणपत्रांसह शांत ठिकाण.", exploreActivities: "🧠 उपक्रम पहा", caregiverGuide: "📖 काळजीवाहू मार्गदर्शिका", heroBadge1: "जेष्ठ नागरिक सन्मान", heroBadge2: "आठवणींचा सोबती", heroTagline: "आठवणी आणि ध्वनींच्या माध्यमातून दैनंदिन सन्मान जपणे", soundsCardTitle: "ओळखीचे आवाज", soundsCardDesc: "संगीत वाद्ये आणि निसर्गाचे आवाज ओळखा.", soundsCardAction: "आत्ता ऐका →", keepsakeCardTitle: "आठवणींचा अल्बम", keepsakeCardDesc: "कौटुंबिक फोटो आणि आवाजाचे संदेश जतन करा.", keepsakeCardAction: "आठवणींचा अल्बम पहा →", remindersCardTitle: "दैनिक वेळापत्रक", remindersCardDesc: "औषधांची वेळ आणि सकाळची सफर आठवणीत ठेवा.", remindersCardAction: "आजचे वेळापत्रक पहा →" },
    activities: { ...baseEnglish.activities, title: "मानसिक व्यायाम", subtitle: "स्मरणशक्ती वाढवणारे दैनंदिन सोपे सराव.", playNow: "सुरू करा", viewAll: "सर्व उपक्रम पहा →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "स्मृती फोटो जोडी", memoryMatchDesc: "सारख्या फोटोच्या जोड्या शोधा.", flipCard: "कार्ड उलटा", moves: "प्रयत्न", matches: "जोड्या", congrats: "छान! तुम्ही सर्व फोटो योग्य जोडले!", playAgain: "पुन्हा खेळा", backToActivities: "← मागे जा", wordPuzzlesTitle: "शब्द कोडी", wordPuzzlesDesc: "अक्षरे जुळवून शब्द तयार करा.", whatsMissingTitle: "काय हरवले आहे?", whatsMissingDesc: "हरवलेली वस्तू आठवा.", patternTitle: "नक्षी ओळख", patternDesc: "पुढील चित्र ओळखा.", jigsawTitle: "जिगसॉ कोडे", jigsawDesc: "चित्र जोडून कोडे पूर्ण करा.", routineTitle: "दैनिक दिनचर्या क्रम", routineDesc: "सकाळपासून रात्रीची कामे क्रमाने लावा.", diceTitle: "फासा खेळ", diceDesc: "फासा फेकून संख्या जोडा.", boardTitle: "बोर्ड गेम", boardDesc: "फासा फेकून पुढे जा.", soundRecTitle: "आवाज ओळख", soundRecDesc: "आवाज ऐकून योग्य उत्तर निवडा.", kazirangaTitle: "काझीरंगा कोडे", kazirangaDesc: "सोपे गेंडा कोडे.", memoryLaneTitle: "आठवणींचा रस्ता", memoryLaneDesc: "जुन्या आठवणींचे फोटो आणि आवाज.", interactiveTitle: "लक्ष सराव", interactiveDesc: "शांत दृष्य सराव.", bazaarTitle: "बाजार वस्तू वर्गीकरण", bazaarDesc: "अन्न आणि घरगुती वस्तू वेगळ्या करा." },
    memories: { ...baseEnglish.memories, title: "आठवणींचा अल्बम", addMemory: "➕ नवीन आठवण जोडा", family: "कुटुंब", places: "ठिकाणे", moments: "खास क्षण" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक वेळापत्रक", newReminder: "➕ नवीन आठवणपत्र", add: "जोडा", todaySchedule: "आजचे वेळापत्रक", delete: "हटवा" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "डिमेंशिया काळजी", whatIsDementia: "डिमेंशिया म्हणजे काय?", keySigns: "सुरवातीची लक्षणे", caregiverTips: "काळजीवाहू सल्ला" },
    profile: { ...baseEnglish.profile, title: "तुमचे प्रोफाइल", welcomeBack: "पुन्हा स्वागत आहे", selectProfileTitle: "प्रोफाइल निवडा", createProfileTitle: "प्रोफाइल तयार करा" },
  },

  // ─── GUJARATI ────────────────────────────────────────────────────────────
  Gujarati: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "સાચવો", cancel: "રદ કરો", delete: "કાઢી નાખો", edit: "ફેરફાર કરો", create: "બનાવો", close: "બંધ કરો", next: "આગળ", back: "પાછળ", start: "શરૂ કરો", continue: "ચાલુ રાખો", tryAgain: "ફરી પ્રયાસ કરો", submit: "સબમિટ કરો", correct: "સાચું!", incorrect: "ખોટું", hint: "ઇશારો", level: "સ્તર", score: "સ્કોર", completed: "પૂર્ણ" },
    ai: { ...baseEnglish.ai, recommendedForYou: "તમારા માટે સુચવેલ", playNow: "હમણાં રમો", level: "સ્તર", levelEasy: "સરળ", levelMedium: "મધ્યમ", levelHard: "કઠિન", levelAdvanced: "પ્રગત", recommendationTitle: "એઆઈ સુચવેલ પ્રવૃત્તિ", recommendPattern: "દ્રશ્ય યાદશક્તિ અને પેટર્ન ઓળખવા માટે ઉત્તમ.", recommendAuditory: "ધ્યાન અને શાંતિ માટે અવાજની કસરત.", recommendRoutine: "દૈનિક દિનચર્યા યાદ રાખવા માટે મદદરૂપ." },
    nav: { ...baseEnglish.nav, home: "મુખ્ય પૃષ્ઠ", activities: "પ્રવૃત્તિઓ", myMemories: "મારી યાદો", reminders: "યાદ અપાવનાર", progress: "પ્રગતિ", aboutDementia: "ડિમેન્શિયા વિશે", profile: "પ્રોફાઇલ", settings: "સેટિંગ્સ", switchProfile: "પ્રોફાઇલ બદલો" },
    home: { ...baseEnglish.home, title: "જ્યાં યાદો", titleAccent: "પ્રેમથી જીવંત રહે છે", subtitle: "વરિષ્ઠ નાગરિકો માટે યાદો સાચવનાર સાથી", heroDescription: "વરિષ્ઠ નાગરિકો માટે ઘર જેવા પ્રાદેશિક અવાજો, કૌટુંબિક યાદોના આલ્બમ અને દૈનિક યાદ અપાવનાર સાથેનું પ્રશાંત સ્થાન.", exploreActivities: "🧠 પ્રવૃત્તિઓ જુઓ", caregiverGuide: "📖 સંભાળ રાખનાર માર્ગદર્શિકા", heroBadge1: "વરિષ્ઠ ગરિમા", heroBadge2: "યાદોનો સાથી", heroTagline: "યાદો અને અવાજો દ્વારા દૈનિક ગરિમાની સુરક્ષા", soundsCardTitle: "ઘરના અવાજો", soundsCardDesc: "સંગીતના સાધનો અને પ્રકૃતિના અવાજો ઓળખો.", soundsCardAction: "હમણાં સાંભળો →", keepsakeCardTitle: "યાદોનું આલ્બમ", keepsakeCardDesc: "કૌટુંબિક ફોટા અને અવાજના સંદેશા સાચવો.", keepsakeCardAction: "યાદોનું આલ્બમ જુઓ →", remindersCardTitle: "દૈનિક સમયપત્રક", remindersCardDesc: "દવાની વેળા અને સવારની સેર યાદ રાખો.", remindersCardAction: "આજનું સમયપત્રક જુઓ →" },
    activities: { ...baseEnglish.activities, title: "માનસિક કસરત", subtitle: "યાદશક્તિ વધારતી દૈનિક સરળ કસરતો.", playNow: "શરૂ કરો", viewAll: "બધી પ્રવૃત્તિઓ જુઓ →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "યાદો ફોટો જોડી", memoryMatchDesc: "સરખા ફોટોની જોડીઓ શોધો.", flipCard: "કાર્ડ ઉલટાવો", moves: "પ્રયાસો", matches: "જોડીઓ", congrats: "સરસ! તમે બધા ફોટા સાચા જોડ્યા!", playAgain: "ફરી રમો", backToActivities: "← પાછા જાઓ", wordPuzzlesTitle: "શબ્દ કોયડા", wordPuzzlesDesc: "અક્ષરો ગોઠવી શબ્દો બનાવો.", whatsMissingTitle: "શું ગાયબ છે?", whatsMissingDesc: "ગાયબ થયેલી વસ્તુ યાદ કરો.", patternTitle: "પેટર્ન ઓળખ", patternDesc: "આગળનું ચિત્ર ઓળખો.", jigsawTitle: "જીગ્સૉ કોયડો", jigsawDesc: "ચિત્ર જોડી કોયડો પૂર્ણ કરો.", routineTitle: "દૈનિક દિનચર્યા ક્રમ", routineDesc: "સવારથી રાત સુધીના કામો ક્રમમાં ગોઠવો.", diceTitle: "પાસાની રમત", diceDesc: "પાસો ફેંકી સંખ્યાઓ જોડો.", boardTitle: "બોર્ડ ગેમ", boardDesc: "પાસો ફેંકી આગળ વધો.", soundRecTitle: "અવાજ ઓળખ", soundRecDesc: "અવાજ સાંભળી સાચો જવાબ પસંદ કરો.", kazirangaTitle: "કાઝીરાંગા કોયડો", kazirangaDesc: "સરળ ગેંડા કોયડો.", memoryLaneTitle: "યાદોની શેરી", memoryLaneDesc: "જૂની યાદોના ફોટા અને અવાજો.", interactiveTitle: "ધ્યાન અભ્યાસ", interactiveDesc: "શાંત દ્રશ્ય અભ્યાસ.", bazaarTitle: "બજાર વસ્તુ વર્ગીકરણ", bazaarDesc: "ખોરાક અને ઘરવપરાશની વસ્તુઓ અલગ કરો." },
    memories: { ...baseEnglish.memories, title: "યાદોનું આલ્બમ", addMemory: "➕ નવી યાદ ઉમેરો", family: "કુટુંબ", places: "સ્થળો", moments: "ખાસ ક્ષણો" },
    reminders: { ...baseEnglish.reminders, title: "દૈનિક સમયપત્રક", newReminder: "➕ નવું યાદ અપાવનાર", add: "ઉમેરો", todaySchedule: "આજનું સમયપત્રક", delete: "કાઢી નાખો" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ડિમેન્શિયા સંભાળ", whatIsDementia: "ડિમેન્શિયા શું છે?", keySigns: "શરૂઆતના લક્ષણો", caregiverTips: "સંભાળ રાખનાર સલાહ" },
    profile: { ...baseEnglish.profile, title: "તમારું પ્રોફાઇલ", welcomeBack: "પુનઃ સ્વાગત છે", selectProfileTitle: "પ્રોફાઇલ પસંદ કરો", createProfileTitle: "પ્રોફાઇલ બનાવો" },
  },

  // ─── PUNJABI ────────────────────────────────────────────────────────────
  Punjabi: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "ਸੰਭਾਲੋ", cancel: "ਰੱਦ ਕਰੋ", delete: "ਹਟਾਓ", edit: "ਸੋਧੋ", create: "ਬਣਾਓ", close: "ਬੰਦ ਕਰੋ", next: "ਅਗਲਾ", back: "ਪਿੱਛੇ", start: "ਸ਼ੁਰੂ ਕਰੋ", continue: "ਜਾਰੀ ਰੱਖੋ", tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ", submit: "ਜਮ੍ਹਾਂ ਕਰੋ", correct: "ਸਹੀ!", incorrect: "ਗਲਤ", hint: "ਇਸ਼ਾਰਾ", level: "ਲੇਵਲ", score: "ਸਕੋਰ", completed: "ਪੂਰਾ ਹੋਇਆ" },
    ai: { ...baseEnglish.ai, recommendedForYou: "ਤੁਹਾਡੇ ਲਈ ਸੁਝਾਇਆ ਗਿਆ", playNow: "ਹੁਣੇ ਖੇਡੋ", level: "ਲੇਵਲ", levelEasy: "ਸੌਖਾ", levelMedium: "ਦਰਮਿਆਨਾ", levelHard: "ਔਖਾ", levelAdvanced: "ਉੱਨਤ", recommendationTitle: "ਏਆਈ ਸੁਝਾਈ ਗਈ ਗਤੀਵਿਧੀ", recommendPattern: "ਦ੍ਰਿਸ਼ ਯਾਦਦਾਸ਼ਤ ਅਤੇ ਪੈਟਰਨ ਪਛਾਣ ਲਈ ਵਧੀਆ।", recommendAuditory: "ਧਿਆਨ ਅਤੇ ਆਰਾਮ ਲਈ ਸ਼ਾਂਤ ਆਵਾਜ਼ ਅਭਿਆਸ।", recommendRoutine: "ਰੋਜ਼ਾਨਾ ਰੁਟੀਨ ਯਾਦ ਰੱਖਣ ਵਿੱਚ ਮਦਦਗਾਰ।" },
    nav: { ...baseEnglish.nav, home: "ਮੁੱਖ ਸਫ਼ਾ", activities: "ਗਤੀਵਿਧੀਆਂ", myMemories: "ਮੇਰੀਆਂ ਯਾਦਾਂ", reminders: "ਯਾਦ-ਦਹਾਨੀ", progress: "ਤਰੱਕੀ", aboutDementia: "ਡੀਮੈਂਸ਼ੀਆ ਬਾਰੇ", profile: "ਪ੍ਰੋਫਾਈਲ", settings: "ਸੈਟਿੰਗਾਂ", switchProfile: "ਪ੍ਰੋਫਾਈਲ ਬਦਲੋ" },
    home: { ...baseEnglish.home, title: "ਜਿੱਥੇ ਯਾਦਾਂ", titleAccent: "ਪਿਆਰ ਨਾਲ ਜਿਊਂਦੀਆਂ ਰਹਿੰਦੀਆਂ ਹਨ", subtitle: "ਬਜ਼ੁਰਗਾਂ ਲਈ ਯਾਦਾਂ ਸਾਂਭਣ ਵਾਲਾ ਸਾਥੀ", heroDescription: "ਬਜ਼ੁਰਗਾਂ ਲਈ ਜਾਣੀਆਂ-ਪਛਾਣੀਆਂ ਆਵਾਜ਼ਾਂ, ਪਰਿਵਾਰਕ ਯਾਦਾਂ ਦੇ ਐਲਬਮਾਂ ਅਤੇ ਰੋਜ਼ਾਨਾ ਯਾਦਾਂ ਨਾਲ ਭਰੀ ਸ਼ਾਂਤ ਥਾਂ।", exploreActivities: "🧠 ਗਤੀਵਿਧੀਆਂ ਵੇਖੋ", caregiverGuide: "📖 ਦੇਖਭਾਲ ਗਾਈਡ", heroBadge1: "ਬਜ਼ੁਰਗ ਸਤਿਕਾਰ", heroBadge2: "ਯਾਦਾਂ ਦਾ ਸਾਥੀ", heroTagline: "ਯਾਦਾਂ ਅਤੇ ਆਵਾਜ਼ਾਂ ਰਾਹੀਂ ਰੋਜ਼ਾਨਾ ਸਤਿਕਾਰ ਦੀ ਰੱਖਿਆ", soundsCardTitle: "ਘਰ ਦੀਆਂ ਆਵਾਜ਼ਾਂ", soundsCardDesc: "ਸੰਗੀਤਕ ਸਾਜ਼ਾਂ ਅਤੇ ਕੁਦਰਤ ਦੀਆਂ ਆਵਾਜ਼ਾਂ ਪਛਾਣੋ।", soundsCardAction: "ਹੁਣੇ ਸੁਣੋ →", keepsakeCardTitle: "ਯਾਦਾਂ ਦਾ ਐਲਬਮ", keepsakeCardDesc: "ਪਰਿਵਾਰਕ ਤਸਵੀਰਾਂ ਅਤੇ ਆਵਾਜ਼ੀ ਸੁਨੇਹੇ ਸਾਂਭੋ।", keepsakeCardAction: "ਯਾਦਾਂ ਦਾ ਐਲਬਮ ਵੇਖੋ →", remindersCardTitle: "ਰੋਜ਼ਾਨਾ ਸ਼ਡਿਊਲ", remindersCardDesc: "ਦਵਾਈ ਦਾ ਸਮਾਂ ਅਤੇ ਸਵੇਰ ਦੀ ਸੈਰ ਯਾਦ ਰੱਖੋ।", remindersCardAction: "ਅੱਜ ਦਾ ਸ਼ਡਿਊਲ ਵੇਖੋ →" },
    activities: { ...baseEnglish.activities, title: "ਮਾਨਸਿਕ ਅਭਿਆਸ", subtitle: "ਯਾਦਦਾਸ਼ਤ ਵਧਾਉਣ ਵਾਲੇ ਰੋਜ਼ਾਨਾ ਸੌਖੇ ਅਭਿਆਸ।", playNow: "ਸ਼ੁਰੂ ਕਰੋ", viewAll: "ਸਾਰੀਆਂ ਗਤੀਵਿਧੀਆਂ ਵੇਖੋ →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "ਯਾਦਾਂ ਦੀ ਫੋਟੋ ਜੋੜੀ", memoryMatchDesc: "ਇੱਕੋ ਜਿਹੀਆਂ ਫੋਟੋਆਂ ਦੇ ਜੋੜੇ ਲੱਭੋ।", flipCard: "ਕਾਰਡ ਪਲਟੋ", moves: "ਕੋਸ਼ਿਸ਼ਾਂ", matches: "ਜੋੜੇ", congrats: "ਬਹੁਤ ਵਧੀਆ! ਤੁਸੀਂ ਸਾਰੀਆਂ ਫੋਟੋਆਂ ਸਹੀ ਜੋੜੀਆਂ!", playAgain: "ਦੁਬਾਰਾ ਖੇਡੋ", backToActivities: "← ਪਿੱਛੇ ਜਾਓ", wordPuzzlesTitle: "ਸ਼ਬਦ ਬੁਝਾਰਤਾਂ", wordPuzzlesDesc: "ਅੱਖਰ ਜੋੜ ਕੇ ਸ਼ਬਦ ਬਣਾਓ।", whatsMissingTitle: "ਕੀ ਗੁਆਚ ਗਿਆ?", whatsMissingDesc: "ਗੁਆਚੀ ਹੋਈ ਚੀਜ਼ ਯਾਦ ਕਰੋ।", patternTitle: "ਪੈਟਰਨ ਪਛਾਣ", patternDesc: "ਅਗਲੀ ਤਸਵੀਰ ਪਛਾਣੋ।", jigsawTitle: "ਜਿਗਸਾ ਪਹੇਲੀ", jigsawDesc: "ਤਸਵੀਰ ਜੋੜ ਕੇ ਪਹੇਲੀ ਪੂਰੀ ਕਰੋ।", routineTitle: "ਰੋਜ਼ਾਨਾ ਰੁਟੀਨ ਕ੍ਰਮ", routineDesc: "ਸਵੇਰ ਤੋਂ ਰਾਤ ਦੇ ਕੰਮ ਕ੍ਰਮਵਾਰ ਲਗਾਓ।", diceTitle: "ਪਾਸਾ ਖੇਡ", diceDesc: "ਪਾਸਾ ਸੁੱਟ ਕੇ ਗਿਣਤੀ ਜੋੜੋ।", boardTitle: "ਬੋਰਡ ਗੇਮ", boardDesc: "ਪਾਸਾ ਸੁੱਟ ਕੇ ਅੱਗੇ ਵਧੋ।", soundRecTitle: "ਆਵਾਜ਼ ਪਛਾਣ", soundRecDesc: "ਆਵਾਜ਼ ਸੁਣ ਕੇ ਸਹੀ ਜਵਾਬ ਚੁਣੋ।", kazirangaTitle: "ਕਾਜ਼ੀਰੰਗਾ ਪਹੇਲੀ", kazirangaDesc: "ਸੌਖੀ ਗੈਂਡਾ ਪਹੇਲੀ।", memoryLaneTitle: "ਯਾਦਾਂ ਦੀ ਗਲੀ", memoryLaneDesc: "ਪੁਰਾਣੀਆਂ ਯਾਦਾਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਅਤੇ ਆਵਾਜ਼ਾਂ।", interactiveTitle: "ਧਿਆਨ ਅਭਿਆਸ", interactiveDesc: "ਸ਼ਾਂਤ ਦ੍ਰਿਸ਼ ਅਭਿਆਸ।", bazaarTitle: "ਬਜ਼ਾਰੀ ਚੀਜ਼ਾਂ ਦੀ ਵੰਡ", bazaarDesc: "ਖਾਣ-ਪੀਣ ਅਤੇ ਘਰੇਲੂ ਚੀਜ਼ਾਂ ਵੱਖ ਕਰੋ।" },
    memories: { ...baseEnglish.memories, title: "ਯਾਦਾਂ ਦਾ ਐਲਬਮ", addMemory: "➕ ਨਵੀਂ ਯਾਦ ਜੋੜੋ", family: "ਪਰਿਵਾਰ", places: "ਥਾਵਾਂ", moments: "ਖਾਸ ਪਲ" },
    reminders: { ...baseEnglish.reminders, title: "ਰੋਜ਼ਾਨਾ ਸ਼ਡਿਊਲ", newReminder: "➕ ਨਵੀਂ ਯਾਦ-ਦਹਾਨੀ", add: "ਜੋੜੋ", todaySchedule: "ਅੱਜ ਦਾ ਸ਼ਡਿਊਲ", delete: "ਹਟਾਓ" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ਡੀਮੈਂਸ਼ੀਆ ਦੇਖਭਾਲ", whatIsDementia: "ਡੀਮੈਂਸ਼ੀਆ ਕੀ ਹੈ?", keySigns: "ਸ਼ੁਰੂਆਤੀ ਲੱਛਣ", caregiverTips: "ਦੇਖਭਾਲ ਸੁਝਾਅ" },
    profile: { ...baseEnglish.profile, title: "ਤੁਹਾਡਾ ਪ੍ਰੋਫਾਈਲ", welcomeBack: "ਜੀ ਆਇਆਂ ਨੂੰ", selectProfileTitle: "ਪ੍ਰੋਫਾਈਲ ਚੁਣੋ", createProfileTitle: "ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ" },
  },

  // ─── URDU ──────────────────────────────────────────────────────────────
  Urdu: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "محفوظ کریں", cancel: "منسوخ کریں", delete: "حذف کریں", edit: "ترمیم", create: "بنائیں", close: "بند کریں", next: "اگلا", back: "پیچھے", start: "شروع", continue: "جاری رکھیں", tryAgain: "دوبارہ کوشش کریں", submit: "جمع کرائیں", correct: "صحیح!", incorrect: "غلط", hint: "اشارہ", level: "سطح", score: "اسکور", completed: "مکمل" },
    ai: { ...baseEnglish.ai, recommendedForYou: "آپ کے لیے تجویز کردہ", playNow: "ابھی کھیلیں", level: "سطح", levelEasy: "آسان", levelMedium: "درمیانہ", levelHard: "مشکل", levelAdvanced: "اعلیٰ", recommendationTitle: "اے آئی تجویز کردہ سرگرمی", recommendPattern: "بصری یادداشت اور پیٹرن کی شناخت کے لیے بہترین۔", recommendAuditory: "توجہ اور سکون کے لیے پرسکون آواز کی مشق۔", recommendRoutine: "روزمرہ کے معمولات یاد رکھنے میں مددگار۔" },
    nav: { ...baseEnglish.nav, home: "صفحہ اول", activities: "سرگرمیاں", myMemories: "میری یادیں", reminders: "یاد دہانی", progress: "پیش رفت", aboutDementia: "ڈیمینشیا کے بارے میں", profile: "پروفائل", settings: "سیٹنگز", switchProfile: "پروفائل تبدیل کریں" },
    home: { ...baseEnglish.home, title: "جہاں یادیں", titleAccent: "محبت سے زندہ رہتی ہیں", subtitle: "بزرگ شہریوں کے لیے یادداشت کا ساتھی", heroDescription: "بزرگوں کے لیے مانوس علاقائی آوازوں، خاندانی یادوں کے البمز اور پرسکون روزمرہ کی یاد دہانیوں کا ایک پرسکون اور باوقار مسکن۔", exploreActivities: "🧠 سرگرمیاں دیکھیں", caregiverGuide: "📖 دیکھ بھال کرنے والے کی رہنمائی", heroBadge1: "بزرگوں کا وقار", heroBadge2: "یادوں کا ساتھی", heroTagline: "یادوں اور آوازوں کے ذریعے روزمرہ کے وقار کی حفاظت", soundsCardTitle: "گھر کی آوازیں", soundsCardDesc: "موسیقی کے آلات اور قدرت کی آوازیں پہچانیں۔", soundsCardAction: "ابھی سنیں →", keepsakeCardTitle: "یادوں کا البم", keepsakeCardDesc: "خاندانی تصاویر اور صوتی پیغامات محفوظ کریں۔", keepsakeCardAction: "یادوں کا البم دیکھیں →", remindersCardTitle: "روزمرہ کا شیڈول", remindersCardDesc: "ادویات کے اوقات اور صبح کی سیر یاد رکھیں۔", remindersCardAction: "آج کا شیڈول دیکھیں →" },
    activities: { ...baseEnglish.activities, title: "دماغي مشقیں", subtitle: "یادداشت اور توجہ کے لیے روزانہ کی آسان مشقیں۔", playNow: "شروع کریں", viewAll: "تمام سرگرمیاں دیکھیں →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "یادداشت کی تصاویر ملائیں", memoryMatchDesc: "ایک جیسی تصویروں کے جوڑے تلاش کریں۔", flipCard: "کارڈ پلٹیں", moves: "کوششیں", matches: "جوڑے", congrats: "بہت خوب! آپ نے تمام جوڑے ملا لیے!", playAgain: "دوبارہ کھیلیں", backToActivities: "← واپس جائیں", wordPuzzlesTitle: "الفاظ کی پہیلیاں", wordPuzzlesDesc: "حروف جوڑ کر الفاظ بنائیں۔", whatsMissingTitle: "کیا غائب ہوا؟", whatsMissingDesc: "غائب شدہ چیز یاد کریں۔", patternTitle: "پیٹرن کی شناخت", patternDesc: "اگلی تصویر پہچانیں۔", jigsawTitle: "تصویری پہیلی", jigsawDesc: "ٹکڑے جوڑ کر تصویر مکمل کریں۔", routineTitle: "روزمرہ کے معمولات", routineDesc: "صبح سے رات کے کام ترتیب سے لگائیں۔", diceTitle: "پاسہ کھیل", diceDesc: "پاسہ پھینک کر گنتی ملائیں۔", boardTitle: "بورڈ گیم", boardDesc: "پاسہ پھینک کر آگے بڑھیں۔", soundRecTitle: "آواز کی شناخت", soundRecDesc: "آواز سن کر درست جواب منتخب کریں۔", kazirangaTitle: "گینڈا پہیلی", kazirangaDesc: "آسان تصویری پہیلی۔", memoryLaneTitle: "یادوں کی گلی", memoryLaneDesc: "پرانی یادوں کی تصاویر اور آوازیں۔", interactiveTitle: "توجہ کی مشق", interactiveDesc: "پرسکون بصری مشق۔", bazaarTitle: "بازاری اشیاء کی درجہ بندی", bazaarDesc: "کھانے پینے اور گھریلو سامان الگ کریں۔" },
    memories: { ...baseEnglish.memories, title: "یادوں کا البم", addMemory: "➕ نئی یاد شامل کریں", family: "خاندان", places: "مقامات", moments: "خاص لمحات" },
    reminders: { ...baseEnglish.reminders, title: "روزمرہ کا شیڈول", newReminder: "➕ نئی یاد دہانی", add: "شامل کریں", todaySchedule: "آج کا شیڈول", delete: "حذف کریں" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ڈیمینشیا کی دیکھ بھال", whatIsDementia: "ڈیمینشیا کیا ہے؟", keySigns: "ابتدائی علامات", caregiverTips: "دیکھ بھال کے مشورے" },
    profile: { ...baseEnglish.profile, title: "آپ کا پروفائل", welcomeBack: "خوش آمدید", selectProfileTitle: "پروفائل منتخب کریں", createProfileTitle: "پروفائل بنائیں" },
  },
};

export function getTranslation(languageName: string): TranslationSchema {
  return TRANSLATIONS[languageName] || TRANSLATIONS.English;
}
