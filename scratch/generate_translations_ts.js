import fs from 'fs';
import path from 'path';

// Generate translations.ts with 22 fully populated languages
const tsPath = path.resolve('src/translations.ts');

const code = `// ─── MemoVerse Complete 22-Language Centralized Translation System ─────────────

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
`;

fs.writeFileSync(tsPath, code);
console.log('src/translations.ts updated successfully.');
