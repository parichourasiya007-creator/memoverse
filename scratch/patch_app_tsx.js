import fs from 'fs';
import path from 'path';

const appPath = path.resolve('src/App.tsx');
let code = fs.readFileSync(appPath, 'utf8');

console.log("Patching App.tsx with localized t keys...");

// 1. Patch CATEGORIES and ALL_GAMES in ActivitiesScreen
const oldActivities = `  const CATEGORIES = ["All", "Memory", "Attention & Recognition", "Visual-Spatial", "Routine & Sequencing", "Logic & Categorization"];

  const ALL_GAMES = [
    // 1. MEMORY
    { icon: "🧠", title: t.activities.memoryMatch || "Memory Photo Match", desc: t.activities.memoryMatchDesc || "Match paired cards featuring familiar cultural artifacts and places.", screen: "game-memory" as Screen, category: "Memory", tag: "Matching" },
    { icon: "🔎", title: "What's Missing?", desc: "Observe items before one vanishes, then recall the missing object.", screen: "game-whats-missing" as Screen, category: "Memory", tag: "Observation & Recall" },
    { icon: "🖼️", title: "Memory Lane: Purana NE", desc: "Digital reminiscence photo carousel with ambient cultural sounds.", screen: "game-memory-lane" as Screen, category: "Memory", tag: "Reminiscence" },
    { icon: "🔊", title: "Sound Memory & Recognition", desc: "Listen to familiar nature and cultural sounds, then identify what you heard.", screen: "game-sound-rec" as Screen, category: "Memory", tag: "Audio Recall" },

    // 2. ATTENTION & RECOGNITION
    { icon: "🧩", title: "Pattern Recognition", desc: "Complete repeating visual sequence patterns with familiar items.", screen: "game-pattern" as Screen, category: "Attention & Recognition", tag: "Patterning" },
    { icon: "🎧", title: t.activities.soundLounge || "Sound Lounge", desc: t.activities.soundLoungeDesc || "Relax and listen to authentic regional sounds and nature.", screen: "game-sounds" as Screen, category: "Attention & Recognition", tag: "Listening" },
    { icon: "🎯", title: "Interactive Cognitive Activity", desc: "Slow-paced video activity to tap target objects and follow prompts.", screen: "game-interactive" as Screen, category: "Attention & Recognition", tag: "Visual Focus" },

    // 3. VISUAL-SPATIAL
    { icon: "🖼️", title: "Large-Piece Jigsaw Puzzle", desc: "Assemble large piece jigsaw puzzles of Kaziranga, Majuli, and tea gardens.", screen: "game-jigsaw" as Screen, category: "Visual-Spatial", tag: "Spatial Grid" },
    { icon: "🦏", title: "Kaziranga 4-Piece Puzzle", desc: "Dedicated 2x2 simplified visual puzzle featuring Kaziranga rhino.", screen: "game-kaziranga-puzzle" as Screen, category: "Visual-Spatial", tag: "2x2 Assembly" },

    // 4. ROUTINE & SEQUENCING
    { icon: "🌅", title: "Daily Routine Ordering", desc: "Arrange daily activities into a natural morning to evening order.", screen: "game-routine" as Screen, category: "Routine & Sequencing", tag: "Sequencing" },
    { icon: "📖", title: t.activities.storyRecall || "Folk Tale Story Recall", desc: t.activities.storyRecallDesc || "Listen to traditional folk tales and answer gentle memory questions.", screen: "game-story" as Screen, category: "Routine & Sequencing", tag: "Storytelling" },

    // 5. LOGIC & CATEGORIZATION
    { icon: "🥗", title: "NER Bazaar Sorting", desc: "Sort regional items into Food vs Household Handicraft baskets.", screen: "game-bazaar" as Screen, category: "Logic & Categorization", tag: "Sorting" },
    { icon: "🔤", title: "Word Puzzles", desc: "Anagram letter unscrambles and simple culture riddles.", screen: "game-word" as Screen, category: "Logic & Categorization", tag: "Word Play" },
    { icon: "🎲", title: "Dice Cognitive Activity", desc: "Roll the dice, observe numbers, and complete counting matching tasks.", screen: "game-dice" as Screen, category: "Logic & Categorization", tag: "Counting" },
    { icon: "🏁", title: "Cognitive Board Game", desc: "Roll dice to move your token forward through landmark steps.", screen: "game-board" as Screen, category: "Logic & Categorization", tag: "Path Game" },
    { icon: "🛒", title: t.activities.marketMemory || "Village Market Memory", desc: t.activities.marketMemoryDesc || "Remember items from a traditional bazaar shopping trip.", screen: "game-market" as Screen, category: "Logic & Categorization", tag: "Everyday" },
  ];`;

const newActivities = `  const CATEGORIES = [
    t.games.catAll || "All",
    t.games.catMemory || "Memory",
    t.games.catAttention || "Attention & Recognition",
    t.games.catSpatial || "Visual-Spatial",
    t.games.catRoutine || "Routine & Sequencing",
    t.games.catLogic || "Logic & Categorization"
  ];

  const ALL_GAMES = [
    // 1. MEMORY
    { icon: "🧠", title: t.activities.memoryMatch || t.games.memoryMatchTitle, desc: t.activities.memoryMatchDesc || t.games.memoryMatchDesc, screen: "game-memory" as Screen, category: t.games.catMemory, tag: t.games.tagMatching },
    { icon: "🔎", title: t.games.whatsMissingTitle, desc: t.games.whatsMissingDesc, screen: "game-whats-missing" as Screen, category: t.games.catMemory, tag: t.games.tagObservation },
    { icon: "🖼️", title: t.games.memoryLaneTitle, desc: t.games.memoryLaneDesc, screen: "game-memory-lane" as Screen, category: t.games.catMemory, tag: t.games.tagReminiscence },
    { icon: "🔊", title: t.games.soundRecTitle, desc: t.games.soundRecDesc, screen: "game-sound-rec" as Screen, category: t.games.catMemory, tag: t.games.tagAudioRecall },

    // 2. ATTENTION & RECOGNITION
    { icon: "🧩", title: t.games.patternTitle, desc: t.games.patternDesc, screen: "game-pattern" as Screen, category: t.games.catAttention, tag: t.games.tagPatterning },
    { icon: "🎧", title: t.activities.soundLounge, desc: t.activities.soundLoungeDesc, screen: "game-sounds" as Screen, category: t.games.catAttention, tag: t.games.tagListening },
    { icon: "🎯", title: t.games.interactiveTitle, desc: t.games.interactiveDesc, screen: "game-interactive" as Screen, category: t.games.catAttention, tag: t.games.tagVisualFocus },

    // 3. VISUAL-SPATIAL
    { icon: "🖼️", title: t.games.jigsawTitle, desc: t.games.jigsawDesc, screen: "game-jigsaw" as Screen, category: t.games.catSpatial, tag: t.games.tagSpatialGrid },
    { icon: "🦏", title: t.games.kazirangaTitle, desc: t.games.kazirangaDesc, screen: "game-kaziranga-puzzle" as Screen, category: t.games.catSpatial, tag: t.games.tagAssembly },

    // 4. ROUTINE & SEQUENCING
    { icon: "🌅", title: t.games.routineTitle, desc: t.games.routineDesc, screen: "game-routine" as Screen, category: t.games.catRoutine, tag: t.games.tagSequencing },
    { icon: "📖", title: t.activities.storyRecall, desc: t.activities.storyRecallDesc, screen: "game-story" as Screen, category: t.games.catRoutine, tag: t.games.tagStorytelling },

    // 5. LOGIC & CATEGORIZATION
    { icon: "🥗", title: t.games.bazaarTitle, desc: t.games.bazaarDesc, screen: "game-bazaar" as Screen, category: t.games.catLogic, tag: t.games.tagSorting },
    { icon: "🔤", title: t.games.wordPuzzlesTitle, desc: t.games.wordPuzzlesDesc, screen: "game-word" as Screen, category: t.games.catLogic, tag: t.games.tagWordPlay },
    { icon: "🎲", title: t.games.diceTitle, desc: t.games.diceDesc, screen: "game-dice" as Screen, category: t.games.catLogic, tag: t.games.tagCounting },
    { icon: "🏁", title: t.games.boardTitle, desc: t.games.boardDesc, screen: "game-board" as Screen, category: t.games.catLogic, tag: t.games.tagPathGame },
    { icon: "🛒", title: t.activities.marketMemory, desc: t.activities.marketMemoryDesc, screen: "game-market" as Screen, category: t.games.catLogic, tag: t.games.tagEveryday },
  ];`;

if (code.includes(oldActivities)) {
  code = code.replace(oldActivities, newActivities);
  console.log("Replaced ALL_GAMES in ActivitiesScreen.");
} else {
  console.log("WARNING: oldActivities block not matched exactly.");
}

// 2. Patch Keepsake Cards tags in Home
code = code.replace('tag: "Family Celebration",', 'tag: t.memories.family,');
code = code.replace('tag: "Heritage Places",', 'tag: t.memories.places,');
code = code.replace('tag: "Cultural Moments",', 'tag: t.memories.moments,');

// 3. Patch AI Recommendation Card
code = code.replace('<span>🤖</span> AI Recommendation', '<span>🤖</span> {t.ai.recommendationTitle || "AI Recommendation"}');
code = code.replace('{t.ai.recommendedForYou}', '{t.ai.recommendedForYou}');

fs.writeFileSync(appPath, code);
console.log("App.tsx patched successfully!");
