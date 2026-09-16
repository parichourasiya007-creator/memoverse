import fs from 'fs';
import path from 'path';

const file = path.resolve('src/CognitiveGames.tsx');
let code = fs.readFileSync(file, 'utf8');

// Replace hardcoded strings in CognitiveGames.tsx with t usages
console.log("Patching CognitiveGames.tsx with localized t keys...");

// 1. AdaptiveGameHeader locked level text
code = code.replace(
  /\🔒 Complete \{levelLabels\[level\]\} with 75%\+ accuracy to unlock Level \{level \+ 1\}\./g,
  '{t.games.unlockLevelMsg ? t.games.unlockLevelMsg.replace("{level}", String(level)).replace("{nextLevel}", String(level + 1)) : `🔒 Complete Level \${level} with 75%+ accuracy to unlock Level \${level + 1}.`}'
);

// 2. Word Puzzles
code = code.replace(
  'const ANAGRAMS = [\n    { target: "TEA", hint: "Popular morning warm drink in Assam", letters: ["A", "T", "E"] },\n    { target: "RHINO", hint: "Famous one-horned animal in Kaziranga", letters: ["N", "R", "I", "O", "H"] },\n    { target: "BIHU", hint: "Spring harvest festival of Assam", letters: ["H", "B", "I", "U"] },\n    { target: "BAMBOO", hint: "Tall green plant used to make baskets", letters: ["O", "B", "M", "A", "B", "O"] },\n    { target: "RIVER", hint: "Brahmaputra flowing through Northeast", letters: ["V", "R", "E", "R", "I"] },\n  ];',
  'const ANAGRAMS = [\n    { target: "TEA", hint: t.games.hintTea, letters: ["A", "T", "E"] },\n    { target: "RHINO", hint: t.games.hintRhino, letters: ["N", "R", "I", "O", "H"] },\n    { target: "BIHU", hint: t.games.hintBihu, letters: ["H", "B", "I", "U"] },\n    { target: "BAMBOO", hint: t.games.hintBamboo, letters: ["O", "B", "M", "A", "B", "O"] },\n    { target: "RIVER", hint: t.games.hintRiver, letters: ["V", "R", "E", "R", "I"] },\n  ];'
);

code = code.replace(
  'const RIDDLES = [\n    { question: "Which golden silk is natively produced in Assam?", options: ["Muga", "Cotton", "Wool"], correct: "Muga" },\n    { question: "Which animal is Kaziranga National Park famous for?", options: ["Rhino", "Camel", "Polar Bear"], correct: "Rhino" },\n    { question: "What instrument produces the lively spring beats of Bihu?", options: ["Dhol", "Piano", "Guitar"], correct: "Dhol" },\n    { question: "Which island in Assam is known as the world\'s largest river island?", options: ["Majuli", "Goa", "Lakshadweep"], correct: "Majuli" },\n  ];',
  'const RIDDLES = [\n    { question: t.games.riddleGoldenSilk, options: [t.games.optMuga, t.games.optCotton, t.games.optWool], correct: t.games.optMuga },\n    { question: t.games.riddleKazirangaAnimal, options: [t.games.itemRhino || "Rhino", "Camel", "Polar Bear"], correct: t.games.itemRhino || "Rhino" },\n    { question: t.games.riddleBihuInstrument, options: [t.games.itemDhol || "Dhol", "Piano", "Guitar"], correct: t.games.itemDhol || "Dhol" },\n    { question: t.games.riddleLargestIsland, options: ["Majuli", "Goa", "Lakshadweep"], correct: "Majuli" },\n  ];'
);

code = code.replace('setFeedback("✨ Correct!");', 'setFeedback(t.games.feedbackCorrect);');
code = code.replace('setFeedback(`Incorrect spelling ("${spelled}"). Try again!`);', 'setFeedback(`${t.games.feedbackWrongSpelling} ("${spelled}")`);');
code = code.replace('setFeedback("✨ Excellent!");', 'setFeedback(t.games.feedbackExcellent);');
code = code.replace('setFeedback("Not quite, try another option!");', 'setFeedback(t.games.feedbackTryAnother);');
code = code.replace('setFeedback(`✨ Found "${match}"!`);', 'setFeedback(`${t.games.feedbackFound} "${match}"!`);');

// 3. Interactive Focus
code = code.replace('instruction: "Tap the TEA LEAF 🍃"', 'instruction: t.games.promptTapTeaLeaf');
code = code.replace('instruction: "Tap the RED TEA POT 🫖"', 'instruction: t.games.promptTapRedPot');
code = code.replace('instruction: "Tap the LARGEST Rhino 🦏"', 'instruction: t.games.promptTapLargestRhino');
code = code.replace('instruction: "Which item does NOT belong in nature?"', 'instruction: t.games.promptNotBelongNature');
code = code.replace('{ emoji: "🍃", label: "Tea Leaf", isCorrect: true }', '{ emoji: "🍃", label: t.games.labelTeaLeaf, isCorrect: true }');
code = code.replace('{ emoji: "🛶", label: "Boat", isCorrect: false }', '{ emoji: "🛶", label: t.games.labelBoat, isCorrect: false }');
code = code.replace('{ emoji: "🦏", label: "Rhino", isCorrect: false }', '{ emoji: "🦏", label: t.games.labelRhino, isCorrect: false }');
code = code.replace('{ emoji: "🧺", label: "Basket", isCorrect: false }', '{ emoji: "🧺", label: t.games.labelBasket, isCorrect: false }');
code = code.replace('setFeedback("✨ Great observation!");', 'setFeedback(t.games.feedbackGreatObservation);');
code = code.replace('setFeedback("Look closely and try again!");', 'setFeedback(t.games.feedbackLookClosely);');

// 4. Bazaar Sorting
code = code.replace('{ id: "food", title: "Food & Spices 🥗", icon: "🥗" }', '{ id: "food", title: t.games.labelFoodBasket, icon: "🥗" }');
code = code.replace('{ id: "household", title: "Household & Handicraft 🏡", icon: "🏡" }', '{ id: "household", title: t.games.labelHouseholdBasket, icon: "🏡" }');
code = code.replace('setFeedback(`✨ Sorted "${item.name}"!`);', 'setFeedback(`${t.games.feedbackSortedItem} "${item.name}"`);');

// 5. Sound Rec
code = code.replace('{ title: "Songbirds in Morning", sound: "bird", options: ["Bird Chirping", "Monsoon Rain", "River Flow"], correct: "Bird Chirping" }', '{ title: t.games.soundSongbirds, sound: "bird", options: [t.games.soundBirdChirping, t.games.soundMonsoonRain, t.games.soundRiverFlow], correct: t.games.soundBirdChirping }');
code = code.replace('{ title: "Bihu Dhol Beat", sound: "dhol", options: ["Bihu Dhol", "Temple Bell", "Bird Chirping"], correct: "Bihu Dhol" }', '{ title: t.games.soundBihuBeat, sound: "dhol", options: [t.games.soundBihuBeat, t.games.soundTempleBell, t.games.soundBirdChirping], correct: t.games.soundBihuBeat }');
code = code.replace('{ title: "Morning Temple Bell", sound: "bell", options: ["Monsoon Rain", "Temple Bell", "River Flow"], correct: "Temple Bell" }', '{ title: t.games.soundTempleBell, sound: "bell", options: [t.games.soundMonsoonRain, t.games.soundTempleBell, t.games.soundRiverFlow], correct: t.games.soundTempleBell }');
code = code.replace('setFeedback("✨ Correct sound identified!");', 'setFeedback(t.games.feedbackSoundIdentified);');
code = code.replace('setFeedback("Listen again carefully!");', 'setFeedback(t.games.feedbackListenCarefully);');

// 6. Routine
code = code.replace('setFeedback("✨ Perfect daily sequence!");', 'setFeedback(t.games.feedbackPerfectRoutine);');
code = code.replace('setFeedback("Some activities are out of order. Hint: Wake Up is first!");', 'setFeedback(t.games.feedbackRoutineHint);');

// 7. Pattern
code = code.replace('setFeedback("✨ Pattern completed!");', 'setFeedback(t.games.feedbackPatternComplete);');
code = code.replace('setFeedback("Look at the repeating order!");', 'setFeedback(t.games.feedbackPatternOrder);');

// 8. What's Missing
code = code.replace('setFeedback("✨ Correct! You remembered!");', 'setFeedback(t.games.feedbackRemembered);');

fs.writeFileSync(file, code);
console.log("CognitiveGames.tsx patched successfully!");
