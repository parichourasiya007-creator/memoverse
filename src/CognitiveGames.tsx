import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "./LanguageContext";
import { speakInLanguage, stopSpeech } from "./speechUtils";

// ═══════════════════════════════════════════════════════════════════
//  GAME RECORD & PROGRESS TRACKING ENGINE
// ═══════════════════════════════════════════════════════════════════

export interface GameRecord {
  id: string;
  gameId: string;
  gameTitle: string;
  category: string;
  score: number | string;
  attempts?: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Standard";
  completedAt: string;
  timestamp: number;
}

export function saveGameRecord(record: Omit<GameRecord, "id" | "completedAt" | "timestamp">) {
  try {
    const raw = localStorage.getItem("memoverse_game_history");
    const list: GameRecord[] = raw ? JSON.parse(raw) : [];
    const newRecord: GameRecord = {
      ...record,
      id: "rec_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      completedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: Date.now(),
    };
    list.unshift(newRecord);
    localStorage.setItem("memoverse_game_history", JSON.stringify(list.slice(0, 50)));
  } catch {}
}

export function getGameRecords(): GameRecord[] {
  try {
    const raw = localStorage.getItem("memoverse_game_history");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Sound tone synthesizer fallback
export function playSoundTone(type: "correct" | "wrong" | "flip" | "bell" | "bird" | "water" | "rain" | "dhol") {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime;

    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, t);
      osc.frequency.setValueAtTime(659.25, t + 0.1);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t); osc.stop(t + 0.35);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.setValueAtTime(175, t + 0.15);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t); osc.stop(t + 0.3);
    } else if (type === "flip") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.start(t); osc.stop(t + 0.08);
    } else if (type === "bell") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, t);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.start(t); osc.stop(t + 0.5);
    } else if (type === "bird") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, t);
      osc.frequency.linearRampToValueAtTime(2400, t + 0.08);
      osc.frequency.linearRampToValueAtTime(1950, t + 0.18);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.start(t); osc.stop(t + 0.18);
    } else if (type === "dhol") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(190, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.25);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t); osc.stop(t + 0.25);
    } else if (type === "water" || type === "rain") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.linearRampToValueAtTime(480, t + 0.15);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t); osc.stop(t + 0.25);
    }
  } catch {}
}

interface CommonGameProps {
  onNav: (s: any) => void;
  onBack?: () => void;
  active: any;
  onProgress: () => void;
}

// Standard Header Component for Games
function GameHeader({
  title,
  subtitle,
  onBack,
  onNav,
  difficulty,
  setDifficulty,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
  onNav: (s: any) => void;
  difficulty?: "Easy" | "Medium" | "Hard";
  setDifficulty?: (d: "Easy" | "Medium" | "Hard") => void;
}) {
  return (
    <div className="space-y-4 text-center max-w-xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack || (() => onNav("activities"))}
          className="inline-flex items-center gap-1 text-sm font-extrabold text-[var(--text-secondary)] hover:text-[var(--oxblood-dark)] cursor-pointer"
        >
          <span>←</span> Back to Library
        </button>

        {setDifficulty && difficulty && (
          <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border)] p-1 rounded-xl text-xs font-bold">
            {(["Easy", "Medium", "Hard"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  difficulty === d
                    ? "bg-[var(--oxblood)] text-white font-black shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">{title}</h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium mt-1 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

// Victory Screen Component for Games
function GameVictoryModal({
  title = "Wonderful Job!",
  message = "You completed this cognitive exercise successfully.",
  score,
  onReplay,
  onBack,
  onNav,
}: {
  title?: string;
  message?: string;
  score?: string | number;
  onReplay: () => void;
  onBack?: () => void;
  onNav: (s: any) => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--brass)] rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl anim-fade">
        <div className="text-7xl animate-bounce">🎉</div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-[var(--text-primary)]">{title}</h2>
          <p className="text-base text-[var(--text-secondary)] font-semibold leading-relaxed">{message}</p>
          {score !== undefined && (
            <div className="inline-block px-4 py-2 bg-[var(--oxblood-light)] border border-[var(--oxblood)] text-[var(--oxblood-dark)] font-black text-lg rounded-2xl mt-2">
              Performance Metric: {score}
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onReplay}
            className="flex-1 min-h-[48px] px-5 py-3 rounded-2xl font-extrabold text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md transition-all cursor-pointer"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onBack || (() => onNav("activities"))}
            className="flex-1 min-h-[48px] px-5 py-3 rounded-2xl font-extrabold text-[var(--text-primary)] bg-[var(--bg-section)] hover:bg-[var(--bg-hover)] border border-[var(--border)] transition-all cursor-pointer"
          >
            ← Activities
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  1. WORD PUZZLES GAME (Word Search, Anagram, Crossword Riddle)
// ═══════════════════════════════════════════════════════════════════

export function GameWordPuzzlesScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [mode, setMode] = useState<"anagram" | "crossword">("anagram");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const ANAGRAMS = [
    { scrambled: "T E A", target: "TEA", hint: "Popular morning warm drink in Assam" },
    { scrambled: "R H I N O", target: "RHINO", hint: "Famous one-horned animal in Kaziranga" },
    { scrambled: "B I H U", target: "BIHU", hint: "Spring harvest festival of Assam" },
    { scrambled: "B A M B O O", target: "BAMBOO", hint: "Tall green plant used to make baskets" },
    { scrambled: "R I V E R", target: "RIVER", hint: "Brahmaputra flowing through Northeast" },
  ];

  const RIDDLES = [
    { question: "Which golden silk is natively produced in Assam?", options: ["Muga", "Cotton", "Wool"], correct: "Muga" },
    { question: "Which animal is Kaziranga National Park famous for?", options: ["Rhino", "Camel", "Polar Bear"], correct: "Rhino" },
    { question: "What instrument produces the lively spring beats of Bihu?", options: ["Dhol", "Piano", "Guitar"], correct: "Dhol" },
    { question: "Which island in Assam is known as the world's largest river island?", options: ["Majuli", "Goa", "Lakshadweep"], correct: "Majuli" },
  ];

  const currentAnagram = ANAGRAMS[currentIndex % ANAGRAMS.length];
  const currentRiddle = RIDDLES[currentIndex % RIDDLES.length];

  function handleAnagramSubmit(selectedWord: string) {
    if (selectedWord.toUpperCase() === currentAnagram.target) {
      playSoundTone("correct");
      setFeedback("✨ Correct!");
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 >= (difficulty === "Easy" ? 3 : 5)) {
          setWon(true);
          saveGameRecord({
            gameId: "game-word",
            gameTitle: "Word Puzzles",
            category: "Logic & Categorization",
            score: `${nextScore} pts`,
            difficulty,
          });
          onProgress();
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 1000);
    } else {
      playSoundTone("wrong");
      setFeedback("Try again!");
      setTimeout(() => setFeedback(null), 1200);
    }
  }

  function handleRiddleSubmit(option: string) {
    if (option === currentRiddle.correct) {
      playSoundTone("correct");
      setFeedback("✨ Excellent!");
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 >= RIDDLES.length) {
          setWon(true);
          saveGameRecord({
            gameId: "game-word",
            gameTitle: "Word Puzzles",
            category: "Logic & Categorization",
            score: `${nextScore} pts`,
            difficulty,
          });
          onProgress();
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 1000);
    } else {
      playSoundTone("wrong");
      setFeedback("Not quite, try another option!");
      setTimeout(() => setFeedback(null), 1200);
    }
  }

  function restart() {
    setCurrentIndex(0);
    setUserAnswer("");
    setScore(0);
    setWon(false);
    setFeedback(null);
  }

  if (won) {
    return <GameVictoryModal score={`${score} points`} onReplay={restart} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Word Puzzles"
        subtitle="Unscramble letters and answer simple nature & culture riddles."
        onBack={onBack}
        onNav={onNav}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        <div className="flex justify-center gap-2 bg-[var(--bg-section)] p-1.5 rounded-2xl border border-[var(--border)]">
          <button
            onClick={() => { setMode("anagram"); restart(); }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              mode === "anagram" ? "bg-[var(--oxblood)] text-white shadow-md" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            🔤 Anagram Word Search
          </button>
          <button
            onClick={() => { setMode("crossword"); restart(); }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm transition-all cursor-pointer ${
              mode === "crossword" ? "bg-[var(--oxblood)] text-white shadow-md" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            🧩 Culture Riddles
          </button>
        </div>

        {mode === "anagram" && (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-lg">
            <div className="inline-block px-3.5 py-1 bg-[var(--brass-light)] text-[var(--brass-dark)] border border-[var(--brass)] font-extrabold text-xs rounded-xl">
              Word {currentIndex + 1} of {difficulty === "Easy" ? 3 : 5}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Unscramble these letters:</div>
              <div className="text-4xl sm:text-5xl font-black tracking-widest text-[var(--oxblood-dark)] bg-[var(--bg-section)] py-4 rounded-2xl border border-[var(--border)]">
                {currentAnagram.scrambled}
              </div>
              <p className="text-sm font-semibold text-[var(--text-secondary)] pt-2">💡 Hint: {currentAnagram.hint}</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                placeholder="Type word here..."
                className="w-full text-center text-xl font-black px-4 py-3.5 rounded-2xl border-2 border-[var(--brass)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--oxblood)]"
              />
              <button
                onClick={() => handleAnagramSubmit(userAnswer)}
                className="w-full py-3.5 rounded-2xl font-black text-lg text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md cursor-pointer transition-all"
              >
                Check Answer ✨
              </button>
            </div>

            {feedback && (
              <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Correct") ? "text-green-600" : "text-amber-600"}`}>
                {feedback}
              </div>
            )}
          </div>
        )}

        {mode === "crossword" && (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-lg">
            <div className="inline-block px-3.5 py-1 bg-[var(--brass-light)] text-[var(--brass-dark)] border border-[var(--brass)] font-extrabold text-xs rounded-xl">
              Riddle {currentIndex + 1} of {RIDDLES.length}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] leading-snug">
              "{currentRiddle.question}"
            </h3>

            <div className="space-y-3 pt-2">
              {currentRiddle.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleRiddleSubmit(opt)}
                  className="w-full min-h-[52px] px-5 py-3 rounded-2xl text-lg font-black text-[var(--text-primary)] bg-[var(--bg-section)] hover:bg-[var(--oxblood-light)] hover:border-[var(--oxblood)] border border-[var(--border)] transition-all cursor-pointer text-left flex items-center justify-between"
                >
                  <span>{opt}</span>
                  <span className="text-sm font-bold text-[var(--text-muted)]">Select →</span>
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Excellent") ? "text-green-600" : "text-amber-600"}`}>
                {feedback}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  2. JIGSAW PUZZLE (Large-Piece 2x2 or 3x2 Grid)
// ═══════════════════════════════════════════════════════════════════

export function GameJigsawScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [selectedTheme, setSelectedTheme] = useState(0);

  const THEMES = [
    { name: "Kaziranga Rhino", emoji: "🦏", bg: "bg-emerald-800", img: import.meta.env.BASE_URL + "hero_elderly.png" },
    { name: "Majuli River Boat", emoji: "🛶", bg: "bg-amber-800", img: import.meta.env.BASE_URL + "vintage_radio_memory.png" },
    { name: "Assam Tea Garden", emoji: "🍃", bg: "bg-teal-800", img: import.meta.env.BASE_URL + "tea_garden_memory.png" },
  ];

  const pieceCount = difficulty === "Easy" ? 4 : 6;
  const [grid, setGrid] = useState<(number | null)[]>(Array(pieceCount).fill(null));
  const [selectedTrayPiece, setSelectedTrayPiece] = useState<number | null>(null);
  const [trayPieces, setTrayPieces] = useState<number[]>([]);
  const [won, setWon] = useState(false);

  const initPuzzle = useCallback(() => {
    const pieces = Array.from({ length: pieceCount }, (_, i) => i);
    // Shuffle tray
    const shuffled = [...pieces].sort(() => Math.random() - 0.5);
    setTrayPieces(shuffled);
    setGrid(Array(pieceCount).fill(null));
    setSelectedTrayPiece(null);
    setWon(false);
  }, [pieceCount]);

  useEffect(() => { initPuzzle(); }, [initPuzzle, selectedTheme, difficulty]);

  function handleSlotClick(slotIdx: number) {
    if (selectedTrayPiece === null) return;

    playSoundTone("flip");
    const nextGrid = [...grid];
    const oldOccupant = nextGrid[slotIdx];
    nextGrid[slotIdx] = selectedTrayPiece;
    setGrid(nextGrid);

    // Remove placed piece from tray and put back old occupant if any
    setTrayPieces((prev) => {
      const filtered = prev.filter((p) => p !== selectedTrayPiece);
      if (oldOccupant !== null) filtered.push(oldOccupant);
      return filtered;
    });

    setSelectedTrayPiece(null);

    // Check completion
    const isComplete = nextGrid.every((p, idx) => p === idx);
    if (isComplete) {
      playSoundTone("correct");
      setWon(true);
      saveGameRecord({
        gameId: "game-jigsaw",
        gameTitle: "Jigsaw Puzzle",
        category: "Visual-Spatial",
        score: "100% Completed",
        difficulty,
      });
      onProgress();
    }
  }

  if (won) {
    return <GameVictoryModal title="Puzzle Solved!" message={`You completed the ${THEMES[selectedTheme].name} jigsaw puzzle!`} score="100%" onReplay={initPuzzle} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Large-Piece Jigsaw Puzzle"
        subtitle="Select a piece from the tray and place it into the correct position."
        onBack={onBack}
        onNav={onNav}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        {/* Theme Picker */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-1">
          {THEMES.map((theme, idx) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(idx)}
              className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border ${
                selectedTheme === idx
                  ? "bg-[var(--oxblood)] text-white border-[var(--brass)] shadow-md"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)]"
              }`}
            >
              <span>{theme.emoji}</span>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>

        {/* Puzzle Target Board */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-5 space-y-4 shadow-lg text-center">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Puzzle Target Grid ({pieceCount === 4 ? "2 × 2" : "3 × 2"})
          </div>

          <div className={`grid ${pieceCount === 4 ? "grid-cols-2" : "grid-cols-3"} gap-2 max-w-sm mx-auto aspect-square p-2 bg-[var(--bg-section)] rounded-2xl border-2 border-dashed border-[var(--brass)]`}>
            {grid.map((piece, slotIdx) => (
              <button
                key={slotIdx}
                onClick={() => handleSlotClick(slotIdx)}
                className={`rounded-xl flex flex-col items-center justify-center font-black transition-all cursor-pointer relative overflow-hidden border-2 border-[var(--border)] ${
                  piece !== null ? "bg-[var(--brass-light)] border-[var(--brass)]" : "bg-[var(--bg-card)] hover:bg-[var(--bg-hover)]"
                }`}
              >
                {piece !== null ? (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl">{THEMES[selectedTheme].emoji}</span>
                    <span className="text-[10px] font-black text-[var(--oxblood-dark)] uppercase">Piece {piece + 1}</span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-[var(--text-muted)]">Slot {slotIdx + 1}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tray of Pieces */}
        <div className="bg-[var(--bg-section)] border border-[var(--border)] rounded-3xl p-5 space-y-3 text-center">
          <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Piece Tray (Tap piece then tap slot)
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {trayPieces.map((piece) => (
              <button
                key={piece}
                onClick={() => { playSoundTone("flip"); setSelectedTrayPiece(piece); }}
                className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black transition-all cursor-pointer border-2 shadow-sm ${
                  selectedTrayPiece === piece
                    ? "bg-[var(--oxblood)] text-white border-[var(--brass)] ring-4 ring-[var(--brass-light)] scale-105"
                    : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--oxblood)]"
                }`}
              >
                <span className="text-2xl">{THEMES[selectedTheme].emoji}</span>
                <span className="text-[10px] uppercase tracking-wide">Piece {piece + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  3. DICE GAME (Counting, Memory, Decision Making)
// ═══════════════════════════════════════════════════════════════════

export function GameDiceScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [diceVal, setDiceVal] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [userSelected, setUserSelected] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [targetTask, setTargetTask] = useState<number>(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function rollDice() {
    playSoundTone("flip");
    setRolling(true);
    setFeedback(null);
    let count = 0;
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 6) + 1;
      setDiceVal(random);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setRolling(false);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceVal(finalVal);
        setTargetTask(finalVal);
        setUserSelected(0);
      }
    }, 80);
  }

  function handleItemTap() {
    playSoundTone("flip");
    setUserSelected((prev) => prev + 1);
  }

  function verifyTask() {
    if (userSelected === targetTask) {
      playSoundTone("correct");
      setFeedback("✨ Perfect match!");
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        setFeedback(null);
        if (nextScore >= 30) {
          setWon(true);
          saveGameRecord({
            gameId: "game-dice",
            gameTitle: "Dice Cognitive Activity",
            category: "Logic & Categorization",
            score: `${nextScore} pts`,
            difficulty,
          });
          onProgress();
        } else {
          setDiceVal(null);
        }
      }, 1000);
    } else {
      playSoundTone("wrong");
      setFeedback(`You selected ${userSelected}. Need exactly ${targetTask}!`);
    }
  }

  if (won) {
    return <GameVictoryModal score={`${score} points`} onReplay={() => { setScore(0); setDiceVal(null); setWon(false); }} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Dice Activity"
        subtitle="Roll the dice, observe the number, and tap the items to match the count!"
        onBack={onBack}
        onNav={onNav}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        {/* Dice Rolling Area */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 space-y-6 shadow-lg">
          <div className="text-8xl select-none cursor-pointer transition-transform active:scale-95" onClick={rollDice}>
            {rolling ? "🎲" : diceVal ? ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][diceVal - 1] : "🎲"}
          </div>

          {!diceVal ? (
            <button
              onClick={rollDice}
              className="w-full py-4 rounded-2xl text-xl font-black text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md cursor-pointer transition-all"
            >
              🎲 Roll the Dice
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-[var(--brass-light)] border border-[var(--brass)] rounded-2xl text-[var(--brass-dark)] font-black text-lg">
                Task: Tap exactly {targetTask} Tea Leaves!
              </div>

              {/* Tappable items grid */}
              <div className="flex flex-wrap justify-center gap-3 p-4 bg-[var(--bg-section)] rounded-2xl border border-[var(--border)] min-h-[100px] items-center">
                {Array.from({ length: userSelected }).map((_, i) => (
                  <span key={i} className="text-3xl animate-fade">🍃</span>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleItemTap}
                  className="flex-1 py-3.5 rounded-2xl text-base font-black text-white bg-teal-700 hover:bg-teal-800 border border-teal-600 cursor-pointer"
                >
                  ➕ Add Leaf ({userSelected})
                </button>
                <button
                  onClick={() => setUserSelected(0)}
                  className="py-3.5 px-4 rounded-2xl text-base font-bold text-[var(--text-secondary)] bg-[var(--bg-section)] border border-[var(--border)] cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <button
                onClick={verifyTask}
                className="w-full py-3.5 rounded-2xl text-lg font-black text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md cursor-pointer"
              >
                Submit Count ✨
              </button>
            </div>
          )}

          {feedback && (
            <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Perfect") ? "text-green-600" : "text-amber-600"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  4. BOARD GAME (Path Journey Cognitive Board Game)
// ═══════════════════════════════════════════════════════════════════

export function GameBoardScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [position, setPosition] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [won, setWon] = useState(false);

  const BOARD_STEPS = [
    { title: "Start", emoji: "🏁", prompt: "Welcome to the Journey!" },
    { title: "Tea Estate", emoji: "🍃", prompt: "Take a deep breath of fresh mountain tea air." },
    { title: "Village Stream", emoji: "🌊", prompt: "Listen to the gentle flowing river water." },
    { title: "Banyan Tree", emoji: "🌳", prompt: "Count 3 green birds sitting on the branches." },
    { title: "Kaziranga Park", emoji: "🦏", prompt: "Spot the magnificent one-horned rhino!" },
    { title: "Silk Workshop", emoji: "🧶", prompt: "Feel the soft golden texture of Muga silk." },
    { title: "Bihu Pavilion", emoji: "🥁", prompt: "Clap your hands to the rhythm of the Dhol beat!" },
    { title: "Majuli Ghat", emoji: "🛶", prompt: "Enjoy the peaceful sunset over the river." },
    { title: "Grand Finish", emoji: "🏆", prompt: "You reached the end of the board game!" },
  ];

  function rollAndMove() {
    if (rolling) return;
    playSoundTone("flip");
    setRolling(true);

    const roll = Math.floor(Math.random() * 3) + 1; // 1 to 3 for gentle pacing
    setLastRoll(roll);

    setTimeout(() => {
      setRolling(false);
      const nextPos = Math.min(position + roll, BOARD_STEPS.length - 1);
      setPosition(nextPos);

      if (nextPos === BOARD_STEPS.length - 1) {
        playSoundTone("correct");
        setWon(true);
        saveGameRecord({
          gameId: "game-board",
          gameTitle: "Cognitive Board Game",
          category: "Logic & Categorization",
          score: "Reached Finish Line",
          difficulty: "Standard",
        });
        onProgress();
      }
    }, 600);
  }

  function restart() {
    setPosition(0);
    setLastRoll(null);
    setWon(false);
  }

  if (won) {
    return <GameVictoryModal title="Journey Completed!" message="You navigated through all 9 landmark steps on the board!" score="Victory" onReplay={restart} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Cognitive Board Game"
        subtitle="Roll the dice to move your token forward through cultural landmark steps."
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        {/* Active Step Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--brass)] rounded-3xl p-6 text-center space-y-4 shadow-lg">
          <div className="flex items-center justify-between text-xs font-black text-[var(--text-muted)] border-b border-[var(--border)] pb-3">
            <span>Step {position + 1} of {BOARD_STEPS.length}</span>
            <span>{lastRoll ? `Rolled: ${lastRoll}` : "Ready to Roll"}</span>
          </div>

          <div className="text-6xl">{BOARD_STEPS[position].emoji}</div>
          <h2 className="text-2xl font-black text-[var(--text-primary)]">{BOARD_STEPS[position].title}</h2>
          <p className="text-base text-[var(--text-secondary)] font-semibold leading-relaxed">
            "{BOARD_STEPS[position].prompt}"
          </p>

          <button
            onClick={rollAndMove}
            disabled={rolling}
            className="w-full min-h-[52px] py-3.5 rounded-2xl text-lg font-black text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md cursor-pointer transition-all disabled:opacity-50"
          >
            {rolling ? "Rolling..." : "🎲 Roll Dice & Move"}
          </button>
        </div>

        {/* Board Path Visualizer */}
        <div className="bg-[var(--bg-section)] border border-[var(--border)] rounded-3xl p-6 space-y-3">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider text-center">
            Board Progress Map
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
            {BOARD_STEPS.map((step, idx) => {
              const isCurrent = idx === position;
              const isPassed = idx < position;
              return (
                <div
                  key={step.title}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                    isCurrent
                      ? "bg-[var(--oxblood)] text-white border-[var(--brass)] shadow-lg scale-105"
                      : isPassed
                      ? "bg-teal-900/20 text-teal-700 border-teal-600/30"
                      : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border)]"
                  }`}
                >
                  <span className="text-2xl">{step.emoji}</span>
                  <span className="text-xs font-black truncate max-w-full">{step.title}</span>
                  {isCurrent && <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[var(--brass)] text-black rounded-full">YOU HERE</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  5. INTERACTIVE COGNITIVE ACTIVITY / VIDEO GAME
// ═══════════════════════════════════════════════════════════════════

export function GameInteractiveScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const TASKS = [
    {
      instruction: "Tap the RED Tea Pot",
      options: [
        { emoji: "🫖", color: "red", isCorrect: true, label: "Red Tea Pot" },
        { emoji: "🫖", color: "blue", isCorrect: false, label: "Blue Tea Pot" },
        { emoji: "🫖", color: "green", isCorrect: false, label: "Green Tea Pot" },
      ],
    },
    {
      instruction: "Tap the LARGEST Rhino",
      options: [
        { emoji: "🦏", size: "text-2xl", isCorrect: false, label: "Small Rhino" },
        { emoji: "🦏", size: "text-6xl", isCorrect: true, label: "Large Rhino" },
        { emoji: "🦏", size: "text-4xl", isCorrect: false, label: "Medium Rhino" },
      ],
    },
    {
      instruction: "Which object does NOT belong in nature?",
      options: [
        { emoji: "🌸", isCorrect: false, label: "Flower" },
        { emoji: "🍃", isCorrect: false, label: "Leaf" },
        { emoji: "✈️", isCorrect: true, label: "Airplane" },
      ],
    },
  ];

  const currentTask = TASKS[stepIndex % TASKS.length];

  function handleSelect(isCorrect: boolean) {
    if (isCorrect) {
      playSoundTone("correct");
      setFeedback("✨ Great observation!");
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        setFeedback(null);
        if (stepIndex + 1 >= TASKS.length) {
          setWon(true);
          saveGameRecord({
            gameId: "game-interactive",
            gameTitle: "Interactive Cognitive Activity",
            category: "Attention & Recognition",
            score: `${nextScore} pts`,
            difficulty,
          });
          onProgress();
        } else {
          setStepIndex((i) => i + 1);
        }
      }, 900);
    } else {
      playSoundTone("wrong");
      setFeedback("Look closely and try again!");
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  function restart() {
    setStepIndex(0);
    setScore(0);
    setWon(false);
  }

  if (won) {
    return <GameVictoryModal score={`${score} points`} onReplay={restart} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Interactive Cognitive Activity"
        subtitle="Follow simple visual instructions at your own relaxed pace."
        onBack={onBack}
        onNav={onNav}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
          <div className="inline-block px-3.5 py-1 bg-[var(--brass-light)] text-[var(--brass-dark)] border border-[var(--brass)] font-extrabold text-xs rounded-xl">
            Task {stepIndex + 1} of {TASKS.length}
          </div>

          <h2 className="text-2xl font-black text-[var(--text-primary)] leading-snug">
            "{currentTask.instruction}"
          </h2>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {currentTask.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt.isCorrect)}
                className="aspect-square rounded-2xl border-2 border-[var(--border)] hover:border-[var(--oxblood)] bg-[var(--bg-section)] flex flex-col items-center justify-center p-3 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <span className={opt.size || "text-4xl"}>{opt.emoji}</span>
                <span className="text-[11px] font-extrabold text-[var(--text-secondary)] mt-2">{opt.label}</span>
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Great") ? "text-green-600" : "text-amber-600"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  6. NER BAZAAR / TEA GARDEN SORT (Categorization Game)
// ═══════════════════════════════════════════════════════════════════

export function GameBazaarScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");

  const ITEMS = [
    { name: "Assam Tea Leaf", category: "FOOD", emoji: "🍃" },
    { name: "Bhoot Jolokia", category: "FOOD", emoji: "🌶️" },
    { name: "Banana", category: "FOOD", emoji: "🍌" },
    { name: "Bamboo Basket", category: "HANDICRAFT", emoji: "🧺" },
    { name: "Eri Silk Yarn", category: "HANDICRAFT", emoji: "🧶" },
    { name: "Brass Utensil", category: "HANDICRAFT", emoji: "🫖" },
  ];

  const [remainingItems, setRemainingItems] = useState(ITEMS);
  const [selectedItem, setSelectedItem] = useState<(typeof ITEMS)[0] | null>(null);
  const [foodBasket, setFoodBasket] = useState<typeof ITEMS>([]);
  const [craftBasket, setCraftBasket] = useState<typeof ITEMS>([]);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleCategoryChoice(targetCategory: "FOOD" | "HANDICRAFT") {
    if (!selectedItem) return;

    if (selectedItem.category === targetCategory) {
      playSoundTone("correct");
      setFeedback(`✨ Correct! Stored ${selectedItem.name}`);

      if (targetCategory === "FOOD") setFoodBasket((prev) => [...prev, selectedItem]);
      else setCraftBasket((prev) => [...prev, selectedItem]);

      const nextRemaining = remainingItems.filter((i) => i.name !== selectedItem.name);
      setRemainingItems(nextRemaining);
      setSelectedItem(null);

      if (nextRemaining.length === 0) {
        setTimeout(() => {
          setWon(true);
          saveGameRecord({
            gameId: "game-bazaar",
            gameTitle: "NER Bazaar Sorting Game",
            category: "Logic & Categorization",
            score: "All Sorted",
            difficulty,
          });
          onProgress();
        }, 600);
      }
    } else {
      playSoundTone("wrong");
      setFeedback(`Oops! ${selectedItem.name} belongs to the other basket.`);
      setTimeout(() => setFeedback(null), 1200);
    }
  }

  function restart() {
    setRemainingItems(ITEMS);
    setSelectedItem(null);
    setFoodBasket([]);
    setCraftBasket([]);
    setWon(false);
  }

  if (won) {
    return <GameVictoryModal title="Bazaar Sorted!" message="You correctly sorted all food & handicraft items!" score="100%" onReplay={restart} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="NER Bazaar Sorting Game"
        subtitle="Tap an item card and select the correct basket category."
        onBack={onBack}
        onNav={onNav}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        {/* Items to Sort Tray */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-5 space-y-3 text-center shadow-md">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Unsorted Bazaar Items (Tap to Select)
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {remainingItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { playSoundTone("flip"); setSelectedItem(item); }}
                className={`px-4 py-3 rounded-2xl border-2 flex items-center gap-2 font-black transition-all cursor-pointer ${
                  selectedItem?.name === item.name
                    ? "bg-[var(--oxblood)] text-white border-[var(--brass)] ring-4 ring-[var(--brass-light)] scale-105"
                    : "bg-[var(--bg-section)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--oxblood)]"
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Labeled Baskets */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Food Basket */}
          <button
            onClick={() => handleCategoryChoice("FOOD")}
            className="p-6 rounded-3xl border-2 border-emerald-600/40 bg-emerald-950/20 hover:bg-emerald-950/40 text-center space-y-3 transition-all cursor-pointer min-h-[160px] flex flex-col items-center justify-between"
          >
            <div>
              <span className="text-4xl">🥗</span>
              <h3 className="text-lg font-black text-emerald-700 dark:text-emerald-400 mt-1">FOOD ITEMS</h3>
            </div>
            <div className="text-xs font-bold text-[var(--text-muted)]">
              {foodBasket.length} stored ({foodBasket.map((i) => i.emoji).join(" ")})
            </div>
          </button>

          {/* Handicraft Basket */}
          <button
            onClick={() => handleCategoryChoice("HANDICRAFT")}
            className="p-6 rounded-3xl border-2 border-amber-600/40 bg-amber-950/20 hover:bg-amber-950/40 text-center space-y-3 transition-all cursor-pointer min-h-[160px] flex flex-col items-center justify-between"
          >
            <div>
              <span className="text-4xl">🏡</span>
              <h3 className="text-lg font-black text-amber-700 dark:text-amber-400 mt-1">HOUSEHOLD &amp; HANDICRAFT</h3>
            </div>
            <div className="text-xs font-bold text-[var(--text-muted)]">
              {craftBasket.length} stored ({craftBasket.map((i) => i.emoji).join(" ")})
            </div>
          </button>
        </div>

        {feedback && (
          <div className={`text-center text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Correct") ? "text-green-600" : "text-amber-600"}`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  7. MEMORY LANE: PURANA NORTH-EAST (Digital Reminiscence)
// ═══════════════════════════════════════════════════════════════════

export function GameMemoryLaneScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const CARDS = [
    {
      title: "Guwahati River Ghat & Brahmaputra Ferries",
      prompt: "Kya aapne kabhi river ferry par yatra ki hai? (Have you ever taken a river ferry ride?)",
      sound: "water",
      img: import.meta.env.BASE_URL + "vintage_radio_memory.png",
    },
    {
      title: "Traditional Assam Tea Estate House",
      prompt: "Kya aapko chai ke baugon ki subah ki taaza thand yaad hai? (Do you remember cool tea garden mornings?)",
      sound: "bird",
      img: import.meta.env.BASE_URL + "tea_garden_memory.png",
    },
    {
      title: "Bihu Festival & Spring Celebrations",
      prompt: "Kya aapne Dhol ki taal par Bihu nritya dekha ya kiya hai? (Have you enjoyed Bihu dance & Dhol beats?)",
      sound: "dhol",
      img: import.meta.env.BASE_URL + "bihu_celebration_memory.png",
    },
  ];

  const current = CARDS[activeIdx];

  function playAmbientSound(soundType: string) {
    playSoundTone(soundType as any);
  }

  function handleComplete() {
    saveGameRecord({
      gameId: "game-memory-lane",
      gameTitle: "Memory Lane Reminiscence",
      category: "Memory",
      score: "Completed",
      difficulty: "Standard",
    });
    onProgress();
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Memory Lane: Purana North-East"
        subtitle="Digital reminiscence activity with nostalgic photos and ambient sounds."
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--brass)] rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="rounded-2xl overflow-hidden h-64 sm:h-80 border border-[var(--border)] relative">
            <img src={current.img} alt={current.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-black text-left">{current.title}</h3>
            </div>
          </div>

          <div className="p-4 bg-[var(--oxblood-light)] border border-[var(--oxblood)] rounded-2xl space-y-2">
            <p className="text-base text-[var(--oxblood-dark)] font-bold italic">"{current.prompt}"</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => playAmbientSound(current.sound)}
              className="flex-1 py-3 px-4 rounded-2xl font-black text-sm text-[var(--brass-dark)] bg-[var(--brass-light)] border border-[var(--brass)] cursor-pointer"
            >
              🔊 Play Ambient Sound
            </button>
            <button
              onClick={() => {
                const next = (activeIdx + 1) % CARDS.length;
                setActiveIdx(next);
                if (next === 0) handleComplete();
              }}
              className="flex-1 py-3 px-4 rounded-2xl font-black text-sm text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] cursor-pointer"
            >
              Next Photo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  8. KAZIRANGA 4-PIECE PUZZLE (2x2 Dedicated Puzzle)
// ═══════════════════════════════════════════════════════════════════

export function GameKazirangaPuzzleScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [grid, setGrid] = useState<(number | null)[]>([null, null, null, null]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [tray, setTray] = useState<number[]>([2, 0, 3, 1]); // Shuffled
  const [won, setWon] = useState(false);

  function handleSlotClick(idx: number) {
    if (selectedPiece === null) return;
    playSoundTone("flip");

    const nextGrid = [...grid];
    const old = nextGrid[idx];
    nextGrid[idx] = selectedPiece;
    setGrid(nextGrid);

    setTray((prev) => {
      const filtered = prev.filter((p) => p !== selectedPiece);
      if (old !== null) filtered.push(old);
      return filtered;
    });

    setSelectedPiece(null);

    if (nextGrid.every((p, i) => p === i)) {
      playSoundTone("correct");
      setWon(true);
      saveGameRecord({
        gameId: "game-kaziranga-puzzle",
        gameTitle: "Kaziranga 4-Piece Puzzle",
        category: "Visual-Spatial",
        score: "100% Completed",
        difficulty: "Easy",
      });
      onProgress();
    }
  }

  function restart() {
    setGrid([null, null, null, null]);
    setSelectedPiece(null);
    setTray([2, 0, 3, 1]);
    setWon(false);
  }

  if (won) {
    return <GameVictoryModal title="Kaziranga Rhino Complete!" message="You assembled all 4 puzzle pieces correctly!" score="100%" onReplay={restart} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Kaziranga 4-Piece Visual Puzzle"
        subtitle="Tap a piece from the tray and place it into its slot."
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 space-y-4 shadow-lg">
          <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto aspect-square p-2 bg-[var(--bg-section)] rounded-2xl border-2 border-dashed border-[var(--brass)]">
            {grid.map((piece, slotIdx) => (
              <button
                key={slotIdx}
                onClick={() => handleSlotClick(slotIdx)}
                className={`rounded-xl flex flex-col items-center justify-center font-black transition-all cursor-pointer ${
                  piece !== null ? "bg-emerald-800 text-white border-2 border-emerald-500" : "bg-[var(--bg-card)] text-[var(--text-muted)]"
                }`}
              >
                {piece !== null ? (
                  <div className="text-center">
                    <span className="text-4xl">🦏</span>
                    <span className="text-[10px] block font-black uppercase">Part {piece + 1}</span>
                  </div>
                ) : (
                  <span>Slot {slotIdx + 1}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-section)] border border-[var(--border)] rounded-3xl p-5 space-y-3">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase">Tray Pieces</div>
          <div className="flex justify-center gap-3">
            {tray.map((piece) => (
              <button
                key={piece}
                onClick={() => { playSoundTone("flip"); setSelectedPiece(piece); }}
                className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black border-2 cursor-pointer transition-all ${
                  selectedPiece === piece
                    ? "bg-[var(--oxblood)] text-white border-[var(--brass)] ring-4 ring-[var(--brass-light)] scale-105"
                    : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border)]"
                }`}
              >
                <span className="text-3xl">🦏</span>
                <span className="text-[10px]">Part {piece + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  9. WHAT'S MISSING? (Observation & Recall)
// ═══════════════════════════════════════════════════════════════════

export function GameWhatsMissingScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [phase, setPhase] = useState<"observe" | "recall">("observe");
  const [timer, setTimer] = useState(5);
  const [missingItem, setMissingItem] = useState<{ name: string; emoji: string } | null>(null);
  const [displayItems, setDisplayItems] = useState<{ name: string; emoji: string }[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const ITEMS = [
    { name: "Assam Tea Leaf", emoji: "🍃" },
    { name: "Kaziranga Rhino", emoji: "🦏" },
    { name: "Bamboo Basket", emoji: "🧺" },
    { name: "River Boat", emoji: "🛶" },
    { name: "Eri Silk Yarn", emoji: "🧶" },
    { name: "Orchid Flower", emoji: "🌸" },
  ];

  const startRound = useCallback(() => {
    const count = difficulty === "Easy" ? 3 : difficulty === "Medium" ? 4 : 5;
    const shuffled = [...ITEMS].sort(() => Math.random() - 0.5).slice(0, count);
    setDisplayItems(shuffled);

    const missing = shuffled[Math.floor(Math.random() * shuffled.length)];
    setMissingItem(missing);

    // Create 3 option choices
    const incorrect = ITEMS.filter((i) => i.name !== missing.name).map((i) => i.name);
    const opts = [missing.name, incorrect[0], incorrect[1]].sort(() => Math.random() - 0.5);
    setOptions(opts);

    setPhase("observe");
    setTimer(5);
    setFeedback(null);
  }, [difficulty]);

  useEffect(() => { startRound(); }, [startRound]);

  useEffect(() => {
    if (phase !== "observe") return;
    if (timer <= 0) {
      setPhase("recall");
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [phase, timer]);

  function handleGuess(guess: string) {
    if (missingItem && guess === missingItem.name) {
      playSoundTone("correct");
      setFeedback("✨ Correct! You remembered!");
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        if (nextScore >= 30) {
          setWon(true);
          saveGameRecord({
            gameId: "game-whats-missing",
            gameTitle: "What's Missing?",
            category: "Memory",
            score: `${nextScore} pts`,
            difficulty,
          });
          onProgress();
        } else {
          startRound();
        }
      }, 1000);
    } else {
      playSoundTone("wrong");
      setFeedback("Not quite, try another option!");
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  if (won) {
    return <GameVictoryModal score={`${score} points`} onReplay={() => { setScore(0); setWon(false); startRound(); }} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="What's Missing?"
        subtitle="Observe the objects carefully before one disappears!"
        onBack={onBack}
        onNav={onNav}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        {phase === "observe" ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider animate-pulse">
              Observe carefully: {timer}s remaining
            </div>

            <div className="flex flex-wrap justify-center gap-4 py-6">
              {displayItems.map((item) => (
                <div key={item.name} className="p-4 bg-[var(--bg-section)] border border-[var(--border)] rounded-2xl flex flex-col items-center">
                  <span className="text-5xl">{item.emoji}</span>
                  <span className="text-xs font-black text-[var(--text-secondary)] mt-2">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
            <h2 className="text-2xl font-black text-[var(--text-primary)]">Which object is missing?</h2>

            <div className="flex flex-wrap justify-center gap-4 py-4">
              {displayItems.map((item) => (
                <div key={item.name} className="p-4 bg-[var(--bg-section)] border border-[var(--border)] rounded-2xl flex flex-col items-center">
                  {item.name === missingItem?.name ? (
                    <span className="text-5xl font-black text-[var(--oxblood)] animate-pulse">❓</span>
                  ) : (
                    <span className="text-5xl">{item.emoji}</span>
                  )}
                  <span className="text-xs font-black text-[var(--text-secondary)] mt-2">
                    {item.name === missingItem?.name ? "MISSING" : item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleGuess(opt)}
                  className="w-full min-h-[50px] py-3 px-5 rounded-2xl text-base font-black text-[var(--text-primary)] bg-[var(--bg-section)] hover:bg-[var(--oxblood-light)] border border-[var(--border)] cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Correct") ? "text-green-600" : "text-amber-600"}`}>
                {feedback}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  10. DAILY ROUTINE ORDERING (Sequencing Activity)
// ═══════════════════════════════════════════════════════════════════

export function GameRoutineScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const ROUTINE = [
    { id: 1, title: "Wake Up", emoji: "🌅" },
    { id: 2, title: "Brush Teeth", emoji: "🪥" },
    { id: 3, title: "Breakfast & Tea", emoji: "☕" },
    { id: 4, title: "Take Medicine", emoji: "💊" },
    { id: 5, title: "Afternoon Rest", emoji: "🌙" },
  ];

  const [cards, setCards] = useState([...ROUTINE].sort(() => Math.random() - 0.5));
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function move(idx: number, direction: -1 | 1) {
    playSoundTone("flip");
    const nextIdx = idx + direction;
    if (nextIdx < 0 || nextIdx >= cards.length) return;
    const nextCards = [...cards];
    [nextCards[idx], nextCards[nextIdx]] = [nextCards[nextIdx], nextCards[idx]];
    setCards(nextCards);
  }

  function checkOrder() {
    const isCorrect = cards.every((c, idx) => c.id === idx + 1);
    if (isCorrect) {
      playSoundTone("correct");
      setFeedback("✨ Perfect daily sequence!");
      setTimeout(() => {
        setWon(true);
        saveGameRecord({
          gameId: "game-routine",
          gameTitle: "Daily Routine Ordering",
          category: "Routine & Sequencing",
          score: "100% Sequence",
          difficulty: "Standard",
        });
        onProgress();
      }, 800);
    } else {
      playSoundTone("wrong");
      setFeedback("Some activities are out of order. Hint: Wake Up is first!");
      setTimeout(() => setFeedback(null), 1500);
    }
  }

  if (won) {
    return <GameVictoryModal title="Routine Ordered!" message="You arranged all daily activities into proper sequence!" score="100%" onReplay={() => { setCards([...ROUTINE].sort(() => Math.random() - 0.5)); setWon(false); }} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Daily Routine Ordering"
        subtitle="Arrange the daily activities into a natural morning-to-evening sequence."
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-md mx-auto px-4 space-y-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 space-y-4 shadow-lg">
          <div className="space-y-3">
            {cards.map((card, idx) => (
              <div key={card.id} className="flex items-center justify-between p-3.5 bg-[var(--bg-section)] border border-[var(--border)] rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[var(--oxblood-light)] border border-[var(--oxblood)] text-[var(--oxblood-dark)] flex items-center justify-center font-black text-xs">
                    {idx + 1}
                  </span>
                  <span className="text-2xl">{card.emoji}</span>
                  <span className="text-base font-black text-[var(--text-primary)]">{card.title}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    className="w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] font-black text-base cursor-pointer disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(idx, 1)}
                    disabled={idx === cards.length - 1}
                    className="w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] font-black text-base cursor-pointer disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={checkOrder}
            className="w-full min-h-[50px] py-3.5 rounded-2xl text-lg font-black text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md cursor-pointer"
          >
            Check Sequence ✨
          </button>

          {feedback && (
            <div className={`text-center text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Perfect") ? "text-green-600" : "text-amber-600"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  11. PATTERN RECOGNITION (ABAB / AABB / ABCABC)
// ═══════════════════════════════════════════════════════════════════

export function GamePatternScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const PATTERNS = [
    {
      sequence: ["🍃", "🦏", "🍃", "🦏", "?"],
      answer: "🍃",
      options: ["🍃", "🦏", "🧺"],
    },
    {
      sequence: ["🧺", "🧺", "🛶", "🛶", "🧺", "?"],
      answer: "🧺",
      options: ["🛶", "🧺", "🦏"],
    },
    {
      sequence: ["🦏", "🍃", "🧶", "🦏", "🍃", "?"],
      answer: "🧶",
      options: ["🍃", "🦏", "🧶"],
    },
  ];

  const current = PATTERNS[step % PATTERNS.length];

  function handleSelect(choice: string) {
    if (choice === current.answer) {
      playSoundTone("correct");
      setFeedback("✨ Pattern completed!");
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        if (step + 1 >= PATTERNS.length) {
          setWon(true);
          saveGameRecord({
            gameId: "game-pattern",
            gameTitle: "Pattern Recognition",
            category: "Attention & Recognition",
            score: `${nextScore} pts`,
            difficulty,
          });
          onProgress();
        } else {
          setStep((s) => s + 1);
          setFeedback(null);
        }
      }, 900);
    } else {
      playSoundTone("wrong");
      setFeedback("Look at the repeating order!");
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  if (won) {
    return <GameVictoryModal score={`${score} points`} onReplay={() => { setStep(0); setScore(0); setWon(false); }} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Pattern Recognition"
        subtitle="Identify the repeating pattern and pick the item that comes next."
        onBack={onBack}
        onNav={onNav}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase">
            Pattern {step + 1} of {PATTERNS.length}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 py-6 bg-[var(--bg-section)] rounded-2xl border border-[var(--border)]">
            {current.sequence.map((item, idx) => (
              <span key={idx} className={`text-4xl ${item === "?" ? "font-black text-[var(--oxblood)] animate-pulse" : ""}`}>
                {item}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {current.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className="aspect-square rounded-2xl border-2 border-[var(--border)] hover:border-[var(--oxblood)] bg-[var(--bg-card)] text-4xl flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("completed") ? "text-green-600" : "text-amber-600"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  12. SOUND RECOGNITION / SOUND MEMORY
// ═══════════════════════════════════════════════════════════════════

export function GameSoundRecScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const SOUND_TASKS = [
    { title: "Songbirds in Morning", sound: "bird", options: ["Bird Chirping", "Monsoon Rain", "River Flow"], correct: "Bird Chirping" },
    { title: "Bihu Dhol Beat", sound: "dhol", options: ["Bihu Dhol", "Temple Bell", "Bird Chirping"], correct: "Bihu Dhol" },
    { title: "Morning Temple Bell", sound: "bell", options: ["Monsoon Rain", "Temple Bell", "River Flow"], correct: "Temple Bell" },
  ];

  const current = SOUND_TASKS[step % SOUND_TASKS.length];

  function playSound() {
    playSoundTone(current.sound as any);
  }

  function handleAnswer(ans: string) {
    if (ans === current.correct) {
      playSoundTone("correct");
      setFeedback("✨ Correct sound identified!");
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        if (step + 1 >= SOUND_TASKS.length) {
          setWon(true);
          saveGameRecord({
            gameId: "game-sound-rec",
            gameTitle: "Sound Recognition & Memory",
            category: "Memory",
            score: `${nextScore} pts`,
            difficulty,
          });
          onProgress();
        } else {
          setStep((s) => s + 1);
          setFeedback(null);
        }
      }, 900);
    } else {
      playSoundTone("wrong");
      setFeedback("Listen again carefully!");
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  if (won) {
    return <GameVictoryModal score={`${score} points`} onReplay={() => { setStep(0); setScore(0); setWon(false); }} onBack={onBack} onNav={onNav} />;
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <GameHeader
        title="Sound Recognition & Memory"
        subtitle="Tap to listen to the audio sound, then pick the correct answer."
        onBack={onBack}
        onNav={onNav}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
          <button
            onClick={playSound}
            className="w-full py-6 rounded-2xl border-2 border-[var(--brass)] bg-[var(--brass-light)] text-[var(--brass-dark)] font-black text-xl flex flex-col items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            <span className="text-5xl">🔊</span>
            <span>Tap to Play Sound</span>
          </button>

          <div className="space-y-3">
            {current.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="w-full min-h-[50px] py-3.5 px-5 rounded-2xl text-base font-black text-[var(--text-primary)] bg-[var(--bg-section)] hover:bg-[var(--oxblood-light)] border border-[var(--border)] cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Correct") ? "text-green-600" : "text-amber-600"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
