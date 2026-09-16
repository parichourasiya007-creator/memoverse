import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "./LanguageContext";
import { recordGamePerformance, getUnlockedLevel, CognitiveSkill, DetailedGameResult } from "./adaptiveEngine";

import bihuCelebrationImg from "./assets/images/memories/bihu-celebration.png";
import teaGardenImg from "./assets/images/memories/ancestral-tea-garden.png";
import vintageRadioImg from "./assets/images/memories/radio-memory.png";
import heroElderlyImg from "./assets/images/hero_elderly.png";
import kazirangaRhinoImg from "./assets/images/kaziranga_rhino_memory.png";
import majuliBoatImg from "./assets/images/majuli_boat_memory.png";
import defaultMemoryCoverImg from "./assets/images/default_memory_cover.png";
import caregiverSupportImg from "./assets/images/caregiver-companionship.png";

import pepaAudio from "./assets/audio/pepa_instrumental.wav";
import fluteAudio from "./assets/audio/bamboo_flute.wav";
import dholAudio from "./assets/audio/dhol_rhythm.wav";
import riverAudio from "./assets/audio/river_nature.wav";
import teaAudio from "./assets/audio/tea_garden.wav";

export const REAL_AUDIO_MAP: Record<string, string> = {
  water: riverAudio,
  river: riverAudio,
  rain: riverAudio,
  bird: fluteAudio,
  flute: fluteAudio,
  dhol: dholAudio,
  pepa: pepaAudio,
  bell: teaAudio,
  tea: teaAudio,
};

export function stopAllRealAudio() {
  if (typeof window !== "undefined") {
    if ((window as any).__activeMemoverseAudio) {
      try {
        (window as any).__activeMemoverseAudio.pause();
        (window as any).__activeMemoverseAudio.currentTime = 0;
      } catch (_) {}
    }
    (window as any).__activeMemoverseAudio = null;
    (window as any).__activeMemoverseAudioKey = null;
  }
}

export function pauseRealAudio() {
  if (typeof window !== "undefined" && (window as any).__activeMemoverseAudio) {
    try {
      (window as any).__activeMemoverseAudio.pause();
    } catch (_) {}
  }
}

export function resumeRealAudio() {
  if (typeof window !== "undefined" && (window as any).__activeMemoverseAudio) {
    try {
      (window as any).__activeMemoverseAudio.play().catch((err: any) => {
        console.warn("Audio resume promise rejected:", err);
      });
    } catch (_) {}
  }
}

export function getActiveRealAudioKey(): string | null {
  if (typeof window !== "undefined") {
    return (window as any).__activeMemoverseAudioKey || null;
  }
  return null;
}

export function isRealAudioPlaying(): boolean {
  if (typeof window !== "undefined" && (window as any).__activeMemoverseAudio) {
    const audio = (window as any).__activeMemoverseAudio as HTMLAudioElement;
    return !audio.paused && !audio.ended && audio.readyState > 2;
  }
  return false;
}

export function playRealInstrumentalAudio(soundKey: string, onEnded?: () => void, onError?: (err: any) => void) {
  stopAllRealAudio();
  if (typeof window === "undefined") return null;

  const audioUrl = REAL_AUDIO_MAP[soundKey] || pepaAudio;
  const audio = new Audio(audioUrl);
  (window as any).__activeMemoverseAudio = audio;
  (window as any).__activeMemoverseAudioKey = soundKey;

  if (onEnded) {
    audio.onended = () => {
      if ((window as any).__activeMemoverseAudioKey === soundKey) {
        (window as any).__activeMemoverseAudioKey = null;
      }
      onEnded();
    };
  }

  audio.onerror = (e) => {
    console.error("❌ Audio load error for key:", soundKey, "src:", audio.src, "error:", audio.error);
    if ((window as any).__activeMemoverseAudioKey === soundKey) {
      (window as any).__activeMemoverseAudioKey = null;
    }
    if (onError) onError(e);
  };

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Playback started successfully
      })
      .catch((err: any) => {
        if (err && (err.name === "AbortError" || err.message?.includes("interrupted"))) {
          // Playback interrupted by pause() or sound switch - normal behavior, do not trigger error state
          return;
        }
        console.warn("⚠️ Audio play promise rejected:", err.name, err.message);
        if ((window as any).__activeMemoverseAudioKey === soundKey) {
          (window as any).__activeMemoverseAudioKey = null;
        }
        if (onError) onError(err);
      });
  }

  return audio;
}

const GAME_IMAGE_MAP: Record<string, string> = {
  "hero_elderly.png": heroElderlyImg,
  "bihu_celebration_memory.png": bihuCelebrationImg,
  "tea_garden_memory.png": teaGardenImg,
  "vintage_radio_memory.png": vintageRadioImg,
  "caregiver_support.png": caregiverSupportImg,
  "default_memory_cover.png": defaultMemoryCoverImg,
  "kaziranga_rhino_memory.png": kazirangaRhinoImg,
  "majuli_boat_memory.png": majuliBoatImg,
};

const GAME_KEYWORD_MAP: Array<{ keywords: string[]; img: string }> = [
  {
    keywords: ["caregiver", "care", "companion", "empathetic", "support", "dementia", "nursing", "help"],
    img: caregiverSupportImg,
  },
  {
    keywords: ["bihu", "jorhat", "mustard", "dance", "dhol", "celebration", "festival", "assamese", "assam"],
    img: bihuCelebrationImg,
  },
  {
    keywords: ["tea", "garden", "ancestral", "estate", "chai", "upper assam", "plantation"],
    img: teaGardenImg,
  },
  {
    keywords: ["radio", "bhupen", "hazarika", "song", "music", "golden voice", "gramophone"],
    img: vintageRadioImg,
  },
  {
    keywords: ["rhino", "kaziranga", "safari", "wildlife", "park", "national park"],
    img: kazirangaRhinoImg,
  },
  {
    keywords: ["majuli", "boat", "ferry", "river", "island", "brahmaputra"],
    img: majuliBoatImg,
  },
  {
    keywords: ["hero", "elderly", "elder", "grandfather", "home", "morning", "senior", "peaceful"],
    img: heroElderlyImg,
  },
];

export function resolveGameImage(src?: string, title?: string): string {
  if (title) {
    const tLower = title.toLowerCase();
    for (const entry of GAME_KEYWORD_MAP) {
      if (entry.keywords.some((kw) => tLower.includes(kw))) {
        return entry.img;
      }
    }
  }

  if (!src || typeof src !== "string" || src.includes("<svg") || src.startsWith("data:image/svg+xml") || src.includes("MEMOVERSE")) {
    return defaultMemoryCoverImg;
  }

  if (src.startsWith("data:image/png") || src.startsWith("data:image/jpeg") || src.startsWith("blob:")) {
    return src;
  }

  const filename = src.split("/").pop()?.split("?")[0] || "";
  if (GAME_IMAGE_MAP[filename]) {
    return GAME_IMAGE_MAP[filename];
  }

  for (const key of Object.keys(GAME_IMAGE_MAP)) {
    const baseName = key.replace(/\.[^/.]+$/, "");
    if (src.includes(baseName)) {
      return GAME_IMAGE_MAP[key];
    }
  }

  const srcLower = src.toLowerCase();
  for (const entry of GAME_KEYWORD_MAP) {
    if (entry.keywords.some((kw) => srcLower.includes(kw))) {
      return entry.img;
    }
  }

  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/") || src.startsWith("./") || src.startsWith("assets/")) {
    return src;
  }

  return defaultMemoryCoverImg;
}

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

// Adaptive Game Header with visible Level Navigation Controls (Level 1..4)
export function AdaptiveGameHeader({
  gameId,
  title,
  subtitle,
  level,
  setLevel,
  unlockedLevel,
  onBack,
  onNav,
}: {
  gameId: string;
  title: string;
  subtitle: string;
  level: number;
  setLevel: (lvl: number) => void;
  unlockedLevel: number;
  onBack?: () => void;
  onNav: (s: any) => void;
}) {
  const { t } = useLanguage();

  const levelLabels: Record<number, string> = {
    1: `LEVEL 1 · ${t.ai.levelEasy || "Easy"}`,
    2: `LEVEL 2 · ${t.ai.levelMedium || "Medium"}`,
    3: `LEVEL 3 · ${t.ai.levelHard || "Hard"}`,
    4: `LEVEL 4 · ${t.ai.levelAdvanced || "Advanced"}`,
  };

  const handlePrev = () => {
    if (level > 1) setLevel(level - 1);
  };

  const handleNext = () => {
    if (level < unlockedLevel && level < 4) {
      setLevel(level + 1);
    }
  };

  return (
    <div className="space-y-4 text-center max-w-xl mx-auto px-4 mb-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack || (() => onNav("activities"))}
          className="inline-flex items-center gap-1 text-sm font-extrabold text-[var(--text-secondary)] hover:text-[var(--oxblood-dark)] cursor-pointer"
        >
          <span>←</span> {t.games.backToActivities}
        </button>

        <div className="inline-flex items-center gap-1.5 bg-[var(--oxblood-light)] border border-[var(--oxblood)] px-3 py-1 rounded-full text-xs font-black text-[var(--oxblood-dark)] shadow-sm">
          <span>🧠</span> {t.ai.cognitiveSkills || "AI Adaptive Training"}
        </div>
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">{title}</h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium mt-1 leading-relaxed">{subtitle}</p>
      </div>

      {/* Adaptive Level Navigation Controls */}
      <div className="flex items-center justify-between gap-2 bg-[var(--bg-card)] border border-[var(--border)] p-2 rounded-2xl shadow-sm max-w-lg mx-auto">
        <button
          onClick={handlePrev}
          disabled={level <= 1}
          className={`px-3 py-2 text-xs sm:text-sm font-black rounded-xl transition-all ${
            level > 1
              ? "bg-[var(--bg-section)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border)] cursor-pointer active:scale-95 shadow-sm"
              : "opacity-40 text-[var(--text-muted)] cursor-not-allowed border border-transparent"
          }`}
        >
          ← {t.ai.previousLevel}
        </button>

        <div className="px-3 py-1.5 bg-[var(--oxblood)] text-white font-black text-xs sm:text-sm rounded-xl shadow-md min-w-[140px] text-center tracking-wide">
          {levelLabels[level] || `LEVEL ${level}`}
        </div>

        <button
          onClick={handleNext}
          disabled={level >= unlockedLevel || level >= 4}
          className={`px-3 py-2 text-xs sm:text-sm font-black rounded-xl transition-all ${
            level < unlockedLevel && level < 4
              ? "bg-[var(--bg-section)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border)] cursor-pointer active:scale-95 shadow-sm"
              : "opacity-40 text-[var(--text-muted)] cursor-not-allowed border border-transparent"
          }`}
        >
          {t.ai.nextLevel} →
        </button>
      </div>

      {level >= unlockedLevel && level < 4 && (
        <p className="text-xs text-[var(--text-muted)] italic font-semibold">
          {t.games.unlockLevelMsg ? t.games.unlockLevelMsg.replace("{level}", String(level)).replace("{nextLevel}", String(level + 1)) : `🔒 Complete Level ${level} with 75%+ accuracy to unlock Level ${level + 1}.`}
        </p>
      )}
    </div>
  );
}

// Legacy Header Component wrapper for backwards compatibility
function GameHeader({
  title,
  subtitle,
  onBack,
  onNav,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
  onNav: (s: any) => void;
  difficulty?: "Easy" | "Medium" | "Hard";
  setDifficulty?: (d: "Easy" | "Medium" | "Hard") => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="space-y-4 text-center max-w-xl mx-auto px-4 mb-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack || (() => onNav("activities"))}
          className="inline-flex items-center gap-1 text-sm font-extrabold text-[var(--text-secondary)] hover:text-[var(--oxblood-dark)] cursor-pointer"
        >
          <span>←</span> {t.games.backToActivities}
        </button>
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">{title}</h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium mt-1 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

// Adaptive Victory Screen Component for Games
export function GameVictoryModal({
  title,
  message,
  score,
  feedbackMessage,
  unlockedNewLevel,
  nextRecommendedLevel,
  currentLevel,
  onReplay,
  onNextLevel,
  onBack,
  onNav,
}: {
  title?: string;
  message?: string;
  score?: string | number;
  feedbackMessage?: string;
  unlockedNewLevel?: boolean;
  nextRecommendedLevel?: number;
  currentLevel?: number;
  onReplay: () => void;
  onNextLevel?: (lvl: number) => void;
  onBack?: () => void;
  onNav: (s: any) => void;
}) {
  const { t } = useLanguage();
  const displayTitle = title || t.games.congrats;
  const displayMsg = message || t.activities.subtitle;

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--brass)] rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl anim-fade">
        <div className="text-7xl animate-bounce">🎉</div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-[var(--text-primary)]">{displayTitle}</h2>
          <p className="text-base text-[var(--text-secondary)] font-semibold leading-relaxed">{displayMsg}</p>

          {feedbackMessage && (
            <div className="p-3.5 bg-[var(--bg-section)] border border-[var(--brass)] rounded-2xl text-sm font-bold text-[var(--oxblood-dark)] leading-snug shadow-sm">
              🤖 {feedbackMessage}
            </div>
          )}

          {score !== undefined && (
            <div className="inline-block px-4 py-2 bg-[var(--oxblood-light)] border border-[var(--oxblood)] text-[var(--oxblood-dark)] font-black text-lg rounded-2xl mt-2">
              {t.games.score}: {score}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 pt-2">
          {onNextLevel && nextRecommendedLevel && currentLevel && nextRecommendedLevel > currentLevel && (
            <button
              onClick={() => onNextLevel(nextRecommendedLevel)}
              className="w-full min-h-[48px] px-5 py-3 rounded-2xl font-black text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md transition-all cursor-pointer text-base"
            >
              🚀 {t.ai.playNow} ({t.ai.level} {nextRecommendedLevel}) →
            </button>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onReplay}
              className="flex-1 min-h-[48px] px-5 py-3 rounded-2xl font-extrabold text-[var(--text-primary)] bg-[var(--bg-section)] hover:bg-[var(--bg-hover)] border border-[var(--border)] transition-all cursor-pointer"
            >
              🔄 {t.games.playAgain}
            </button>
            <button
              onClick={onBack || (() => onNav("activities"))}
              className="flex-1 min-h-[48px] px-5 py-3 rounded-2xl font-extrabold text-[var(--text-primary)] bg-[var(--bg-section)] hover:bg-[var(--bg-hover)] border border-[var(--border)] transition-all cursor-pointer"
            >
              ← {t.games.backToActivities}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  1. WORD PUZZLES GAME (Anagram Scramble, Word Search, Culture Riddles)
// ═══════════════════════════════════════════════════════════════════

export function GameWordPuzzlesScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "word_puzzles";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const [mode, setMode] = useState<"anagram" | "wordsearch" | "riddle">("anagram");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [constructedLetters, setConstructedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const ANAGRAMS = [
    { target: "TEA", hint: t.games.hintTea, letters: ["A", "T", "E"] },
    { target: "RHINO", hint: t.games.hintRhino, letters: ["N", "R", "I", "O", "H"] },
    { target: "BIHU", hint: t.games.hintBihu, letters: ["H", "B", "I", "U"] },
    { target: "BAMBOO", hint: t.games.hintBamboo, letters: ["O", "B", "M", "A", "B", "O"] },
    { target: "RIVER", hint: t.games.hintRiver, letters: ["V", "R", "E", "R", "I"] },
  ];

  const RIDDLES = [
    { question: t.games.riddleGoldenSilk, options: [t.games.optMuga, t.games.optCotton, t.games.optWool], correct: t.games.optMuga },
    { question: t.games.riddleKazirangaAnimal, options: [t.games.labelRhino || "Rhino", t.games.labelSmallRhino || "Small", t.games.labelLargeRhino || "Large"], correct: t.games.labelRhino || "Rhino" },
    { question: t.games.riddleBihuInstrument, options: [t.games.itemDhol || "Dhol", t.games.itemFlute || "Flute", t.games.itemPepa || "Pepa"], correct: t.games.itemDhol || "Dhol" },
    { question: t.games.riddleLargestIsland, options: ["Majuli", "Guwahati", "Jorhat"], correct: "Majuli" },
  ];

  const SEARCH_WORDS = ["TEA", "BIHU", "RHINO", "SILK"];
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [gridSelected, setGridSelected] = useState<string>("");

  const WORD_SEARCH_GRID = [
    ["T", "E", "A", "X"],
    ["B", "I", "H", "U"],
    ["R", "H", "I", "N"],
    ["O", "S", "I", "L"],
  ];

  const currentAnagram = ANAGRAMS[currentIndex % ANAGRAMS.length];
  const currentRiddle = RIDDLES[currentIndex % RIDDLES.length];

  function handleLetterTap(letter: string) {
    playSoundTone("flip");
    setConstructedLetters((prev) => [...prev, letter]);
  }

  function handleClearLetters() {
    playSoundTone("flip");
    setConstructedLetters([]);
  }

  function finishGame(finalScore: number) {
    const totalQ = mode === "anagram" ? (level === 1 ? 3 : level === 2 ? 4 : 5) : RIDDLES.length;
    const res = recordGamePerformance({
      gameId,
      gameTitle: t.games.wordPuzzlesTitle || "Word Puzzles",
      skill: "Attention",
      level,
      accuracy: 100,
      correctAnswers: totalQ,
      totalQuestions: totalQ,
      attempts: 1,
      completionTime: 30,
      hintsUsed: 0,
      retries: 0,
      timestamp: Date.now(),
      completed: true,
    });
    setAdaptiveResult(res);
    setWon(true);
    saveGameRecord({
      gameId: "game-word",
      gameTitle: t.games.wordPuzzlesTitle || "Word Puzzles",
      category: t.games.catAttention || "Attention",
      score: `${finalScore} pts`,
      difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
    });
    onProgress();
  }

  function handleAnagramCheck() {
    const spelled = constructedLetters.join("");
    if (spelled === currentAnagram.target) {
      playSoundTone("correct");
      setFeedback(t.games.feedbackCorrect);
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        setFeedback(null);
        setConstructedLetters([]);
        const targetQ = level === 1 ? 3 : level === 2 ? 4 : 5;
        if (currentIndex + 1 >= targetQ) {
          finishGame(nextScore);
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 1000);
    } else {
      playSoundTone("wrong");
      setFeedback(`${t.games.feedbackWrongSpelling} ("${spelled}")`);
      setTimeout(() => setFeedback(null), 1400);
    }
  }

  function handleRiddleSubmit(option: string) {
    if (option === currentRiddle.correct) {
      playSoundTone("correct");
      setFeedback(t.games.feedbackExcellent);
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 >= RIDDLES.length) {
          finishGame(nextScore);
        } else {
          setCurrentIndex((i) => i + 1);
        }
      }, 1000);
    } else {
      playSoundTone("wrong");
      setFeedback(t.games.feedbackTryAnother);
      setTimeout(() => setFeedback(null), 1200);
    }
  }

  function handleWordSearchLetter(char: string) {
    playSoundTone("flip");
    const nextStr = gridSelected + char;
    setGridSelected(nextStr);

    const match = SEARCH_WORDS.find((w) => w === nextStr);
    if (match && !foundWords.includes(match)) {
      playSoundTone("correct");
      const nextFound = [...foundWords, match];
      setFoundWords(nextFound);
      setGridSelected("");
      setFeedback(`${t.games.feedbackFound} "${match}"!`);
      setTimeout(() => setFeedback(null), 1000);

      if (nextFound.length === SEARCH_WORDS.length) {
        finishGame(40);
      }
    }
  }

  function restart() {
    setCurrentIndex(0);
    setConstructedLetters([]);
    setFoundWords([]);
    setGridSelected("");
    setScore(0);
    setWon(false);
    setFeedback(null);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.feedbackPuzzleComplete || "Word Master!"}
        message={t.games.congrats}
        score={`${score || 40} ${t.common.points || "points"}`}
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => {
          setLevel(newLvl);
          restart();
        }}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.wordPuzzlesTitle}
        subtitle={t.games.wordPuzzlesDesc}
        level={level}
        setLevel={(lvl) => { setLevel(lvl); restart(); }}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        <div className="flex justify-center gap-1.5 bg-[var(--bg-section)] p-1.5 rounded-2xl border border-[var(--border)] text-xs font-bold">
          <button
            onClick={() => { setMode("anagram"); restart(); }}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              mode === "anagram" ? "bg-[var(--oxblood)] text-white font-black shadow-md" : "text-[var(--text-secondary)]"
            }`}
          >
            🔤 {t.games.tagWordPlay}
          </button>
          <button
            onClick={() => { setMode("wordsearch"); restart(); }}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              mode === "wordsearch" ? "bg-[var(--oxblood)] text-white font-black shadow-md" : "text-[var(--text-secondary)]"
            }`}
          >
            🔍 {t.games.tagObservation}
          </button>
          <button
            onClick={() => { setMode("riddle"); restart(); }}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
              mode === "riddle" ? "bg-[var(--oxblood)] text-white font-black shadow-md" : "text-[var(--text-secondary)]"
            }`}
          >
            🧩 {t.games.wordPuzzlesTitle}
          </button>
        </div>

        {mode === "anagram" && (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-lg">
            <div className="inline-block px-3.5 py-1 bg-[var(--brass-light)] text-[var(--brass-dark)] border border-[var(--brass)] font-extrabold text-xs rounded-xl">
              {t.common.level} {currentIndex + 1} / {level === 1 ? 3 : 5}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-[var(--text-secondary)]">💡 {t.common.hint}: {currentAnagram.hint}</p>
            </div>

            {/* Answer Display Box */}
            <div className="min-h-[64px] p-3 rounded-2xl border-2 border-dashed border-[var(--brass)] bg-[var(--bg-section)] flex items-center justify-center gap-2">
              {constructedLetters.length === 0 ? (
                <span className="text-sm font-bold text-[var(--text-muted)]">{t.games.wordPuzzlesDesc}</span>
              ) : (
                constructedLetters.map((l, i) => (
                  <span key={i} className="w-12 h-12 rounded-xl bg-[var(--oxblood)] text-white font-black text-2xl flex items-center justify-center shadow-md animate-fade">
                    {l}
                  </span>
                ))
              )}
            </div>

            {/* Tappable Scrambled Letter Buttons */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[var(--text-muted)] uppercase">{t.games.wordPuzzlesTitle}:</div>
              <div className="flex flex-wrap justify-center gap-3">
                {currentAnagram.letters.map((char, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLetterTap(char)}
                    className="w-14 h-14 rounded-2xl font-black text-2xl text-[var(--text-primary)] bg-[var(--bg-card)] border-2 border-[var(--brass)] shadow-md hover:bg-[var(--brass-light)] cursor-pointer active:scale-95 transition-all"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleClearLetters}
                className="py-3 px-5 rounded-2xl font-bold text-sm text-[var(--text-secondary)] bg-[var(--bg-section)] border border-[var(--border)] cursor-pointer"
              >
                {t.common.clear} ✕
              </button>
              <button
                onClick={handleAnagramCheck}
                className="flex-1 py-3 px-5 rounded-2xl font-black text-base text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md cursor-pointer"
              >
                {t.common.submit} ✨
              </button>
            </div>

            {feedback && (
              <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Correct") ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {feedback}
              </div>
            )}
          </div>
        )}

        {mode === "wordsearch" && (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-lg">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[var(--text-muted)] uppercase">{t.games.wordPuzzlesTitle}:</div>
              <div className="flex justify-center gap-2">
                {SEARCH_WORDS.map((w) => (
                  <span
                    key={w}
                    className={`px-3 py-1 rounded-xl text-xs font-black border ${
                      foundWords.includes(w) ? "bg-green-100 text-green-800 border-green-400 line-through" : "bg-[var(--bg-section)] text-[var(--text-secondary)] border-[var(--border)]"
                    }`}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[var(--bg-section)] rounded-2xl border border-[var(--border)] text-sm font-bold min-h-[44px] flex items-center justify-center">
              {t.common.score}: <span className="font-black text-lg ml-2 text-[var(--oxblood-dark)]">{gridSelected || "..."}</span>
              {gridSelected && (
                <button onClick={() => setGridSelected("")} className="ml-3 text-xs text-amber-700 dark:text-amber-400 underline cursor-pointer">{t.common.clear}</button>
              )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {WORD_SEARCH_GRID.map((row, rIdx) =>
                row.map((char, cIdx) => (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleWordSearchLetter(char)}
                    className="w-16 h-16 rounded-2xl font-black text-2xl bg-[var(--bg-card)] border-2 border-[var(--border)] hover:border-[var(--oxblood)] text-[var(--text-primary)] cursor-pointer active:scale-95 transition-all flex items-center justify-center shadow-sm"
                  >
                    {char}
                  </button>
                ))
              )}
            </div>

            {feedback && (
              <div className="text-base font-black text-green-600 dark:text-emerald-400 py-2 rounded-xl animate-pulse">
                {feedback}
              </div>
            )}
          </div>
        )}

        {mode === "riddle" && (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-lg">
            <div className="inline-block px-3.5 py-1 bg-[var(--brass-light)] text-[var(--brass-dark)] border border-[var(--brass)] font-extrabold text-xs rounded-xl">
              {t.games.wordPuzzlesTitle} {currentIndex + 1} / {RIDDLES.length}
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
                  <span className="text-sm font-bold text-[var(--text-muted)]">{t.common.next} →</span>
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Excellent") ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
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
//  2. JIGSAW PUZZLE (Adaptive Grid with Touch & Tap Support)
// ═══════════════════════════════════════════════════════════════════

export function GameJigsawScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "jigsaw_puzzle";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState(0);

  const THEMES = [
    { name: t.games.kazirangaTitle || "Kaziranga Rhino", emoji: "🦏", bg: "bg-emerald-800", img: kazirangaRhinoImg },
    { name: t.games.landmarkMajuli || "Majuli River Boat", emoji: "🛶", bg: "bg-amber-800", img: majuliBoatImg },
    { name: t.games.landmarkTeaGarden || "Assam Tea Garden", emoji: "🍃", bg: "bg-teal-800", img: teaGardenImg },
  ];

  const pieceCount = level === 1 ? 4 : level === 2 ? 6 : level === 3 ? 9 : 12;
  const gridCols = level === 1 ? "grid-cols-2" : level === 2 ? "grid-cols-3" : level === 3 ? "grid-cols-3" : "grid-cols-4";

  const [grid, setGrid] = useState<(number | null)[]>(() => Array(pieceCount).fill(null));
  const [selectedTrayPiece, setSelectedTrayPiece] = useState<number | null>(null);
  const [trayPieces, setTrayPieces] = useState<number[]>([]);
  const [won, setWon] = useState(false);

  const initPuzzle = useCallback(() => {
    const pieces = Array.from({ length: pieceCount }, (_, i) => i);
    const shuffled = [...pieces].sort(() => Math.random() - 0.5);
    setTrayPieces(shuffled);
    setGrid(Array(pieceCount).fill(null));
    setSelectedTrayPiece(null);
    setWon(false);
  }, [pieceCount]);

  useEffect(() => { initPuzzle(); }, [initPuzzle, selectedTheme, level]);

  function placePiece(slotIdx: number, pieceIdx: number) {
    playSoundTone("flip");
    const nextGrid = [...grid];
    const oldOccupant = nextGrid[slotIdx];
    nextGrid[slotIdx] = pieceIdx;
    setGrid(nextGrid);

    setTrayPieces((prev) => {
      const filtered = prev.filter((p) => p !== pieceIdx);
      if (oldOccupant !== null) filtered.push(oldOccupant);
      return filtered;
    });

    setSelectedTrayPiece(null);

    // Check complete
    if (nextGrid.every((p, idx) => p === idx)) {
      playSoundTone("correct");
      const res = recordGamePerformance({
        gameId,
        gameTitle: t.games.jigsawTitle || "Jigsaw Puzzle",
        skill: "Visual-Spatial",
        level,
        accuracy: 100,
        correctAnswers: pieceCount,
        totalQuestions: pieceCount,
        attempts: 1,
        completionTime: 40,
        hintsUsed: 0,
        retries: 0,
        timestamp: Date.now(),
        completed: true,
      });
      setAdaptiveResult(res);
      setWon(true);
      saveGameRecord({
        gameId: "game-jigsaw",
        gameTitle: t.games.jigsawTitle || "Jigsaw Puzzle",
        category: t.games.catSpatial || "Visual-Spatial",
        score: "100% Solved",
        difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
      });
      onProgress();
    }
  }

  function handleSlotClick(slotIdx: number) {
    if (selectedTrayPiece !== null) {
      placePiece(slotIdx, selectedTrayPiece);
    }
  }

  function handleDragStart(e: React.DragEvent, pieceIdx: number) {
    e.dataTransfer.setData("text/plain", pieceIdx.toString());
    setSelectedTrayPiece(pieceIdx);
  }

  function handleDrop(e: React.DragEvent, slotIdx: number) {
    e.preventDefault();
    const pieceIdxStr = e.dataTransfer.getData("text/plain");
    const pieceIdx = Number(pieceIdxStr);
    if (!isNaN(pieceIdx)) {
      placePiece(slotIdx, pieceIdx);
    }
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.feedbackPuzzleComplete || "Jigsaw Completed!"}
        message={`${t.games.feedbackPiecePlaced} ${THEMES[selectedTheme].name}`}
        score="100%"
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => setLevel(newLvl)}
        onReplay={initPuzzle}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.jigsawTitle}
        subtitle={t.games.jigsawDesc}
        level={level}
        setLevel={setLevel}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        <div className="flex justify-center gap-2">
          {THEMES.map((theme, idx) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(idx)}
              className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border ${
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

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 space-y-4 shadow-lg text-center">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            {pieceCount} {t.games.jigsawTitle}
          </div>

          <div className={`grid ${gridCols} gap-3 max-w-sm mx-auto p-3 bg-[var(--bg-section)] rounded-2xl border-2 border-dashed border-[var(--brass)]`}>
            {grid.map((piece, slotIdx) => (
              <div
                key={slotIdx}
                onClick={() => handleSlotClick(slotIdx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, slotIdx)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center font-black transition-all cursor-pointer relative overflow-hidden border-2 border-[var(--border)] ${
                  piece !== null
                    ? piece === slotIdx
                      ? "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300"
                      : "bg-amber-100 dark:bg-amber-950/60 border-amber-400 dark:border-amber-600 text-amber-800 dark:text-amber-300"
                    : "bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)]"
                }`}
              >
                {piece !== null ? (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl">{THEMES[selectedTheme].emoji}</span>
                    <span className="text-[10px] font-black uppercase mt-1">{t.common.level} {piece + 1} {piece === slotIdx ? "✓" : ""}</span>
                  </div>
                ) : (
                  <span className="text-xs font-bold">{t.common.level} {slotIdx + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-section)] border border-[var(--border)] rounded-3xl p-5 space-y-3 text-center">
          <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            {t.games.jigsawTitle}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {trayPieces.map((pieceIdx) => (
              <div
                key={pieceIdx}
                draggable
                onDragStart={(e) => handleDragStart(e, pieceIdx)}
                onClick={() => { playSoundTone("flip"); setSelectedTrayPiece(pieceIdx); }}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center font-black border-2 cursor-pointer transition-all active:scale-95 shadow-md ${
                  selectedTrayPiece === pieceIdx
                    ? "bg-[var(--oxblood)] text-white border-[var(--brass)] ring-4 ring-[var(--brass-light)] scale-105"
                    : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--oxblood)]"
                }`}
              >
                <span className="text-3xl">{THEMES[selectedTheme].emoji}</span>
                <span className="text-[10px] uppercase">{t.common.level} {pieceIdx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  3. DICE GAME (Interactive Rolling & Recall Task)
// ═══════════════════════════════════════════════════════════════════

export function GameDiceScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "dice_activity";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const [phase, setPhase] = useState<"roll" | "remember" | "question">("roll");
  const [rolledVal, setRolledVal] = useState<number>(1);
  const [rolling, setRolling] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function rollDice() {
    playSoundTone("flip");
    setRolling(true);
    setFeedback(null);
    let count = 0;
    const interval = setInterval(() => {
      setRolledVal(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setRolling(false);
        const finalNum = Math.floor(Math.random() * 6) + 1;
        setRolledVal(finalNum);
        setPhase("remember");

        setTimeout(() => {
          setPhase("question");
        }, 2500);
      }
    }, 80);
  }

  function handleAnswer(ans: number) {
    if (ans === rolledVal) {
      playSoundTone("correct");
      setFeedback(t.games.feedbackCorrectCount);
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        setFeedback(null);
        if (rounds + 1 >= 3) {
          const res = recordGamePerformance({
            gameId,
            gameTitle: t.games.diceTitle || "Dice Activity",
            skill: "Attention",
            level,
            accuracy: 100,
            correctAnswers: 3,
            totalQuestions: 3,
            attempts: 3,
            completionTime: 20,
            hintsUsed: 0,
            retries: 0,
            timestamp: Date.now(),
            completed: true,
          });
          setAdaptiveResult(res);
          setWon(true);
          saveGameRecord({
            gameId: "game-dice",
            gameTitle: t.games.diceTitle || "Dice Cognitive Activity",
            category: t.games.catAttention || "Attention",
            score: `${nextScore} pts`,
            difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
          });
          onProgress();
        } else {
          setRounds((r) => r + 1);
          setPhase("roll");
        }
      }, 1000);
    } else {
      playSoundTone("wrong");
      setFeedback((t.games.feedbackPickedRolled || "Picked {ans}, rolled {rolledVal}").replace("{ans}", String(ans)).replace("{rolledVal}", String(rolledVal)));
      setTimeout(() => {
        setFeedback(null);
        setPhase("roll");
      }, 1500);
    }
  }

  function restart() {
    setRounds(0);
    setScore(0);
    setPhase("roll");
    setWon(false);
    setFeedback(null);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.feedbackCorrectCount || "Dice Champion!"}
        message={t.games.congrats}
        score={`${score} ${t.common.points || "points"}`}
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => { setLevel(newLvl); restart(); }}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.diceTitle}
        subtitle={t.games.diceDesc}
        level={level}
        setLevel={(lvl) => { setLevel(lvl); restart(); }}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 space-y-6 shadow-lg">
          <div className="inline-block px-3.5 py-1 bg-[var(--brass-light)] text-[var(--brass-dark)] border border-[var(--brass)] font-extrabold text-xs rounded-xl">
            {t.common.level} {rounds + 1} / 3
          </div>

          {phase === "roll" && (
            <div className="space-y-6">
              <div className="text-8xl select-none">{rolling ? "🎲" : "🎲"}</div>
              <button
                onClick={rollDice}
                disabled={rolling}
                className="w-full py-4 rounded-2xl text-xl font-black text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md cursor-pointer transition-all disabled:opacity-50"
              >
                {rolling ? t.common.loading : t.games.promptRollDice}
              </button>
            </div>
          )}

          {phase === "remember" && (
            <div className="space-y-4 animate-fade">
              <div className="text-8xl select-none text-[var(--oxblood-dark)] font-black">
                {["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][rolledVal - 1]}
              </div>
              <div className="p-3 bg-[var(--brass-light)] border border-[var(--brass)] rounded-2xl text-[var(--brass-dark)] font-black text-lg">
                {t.games.promptRollDice}: {rolledVal}!
              </div>
            </div>
          )}

          {phase === "question" && (
            <div className="space-y-6 animate-fade">
              <h3 className="text-2xl font-black text-[var(--text-primary)]">"{t.games.promptRollDice}?"</h3>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAnswer(num)}
                    className="h-16 rounded-2xl font-black text-2xl text-[var(--text-primary)] bg-[var(--bg-section)] hover:bg-[var(--oxblood-light)] hover:border-[var(--oxblood)] border-2 border-[var(--border)] cursor-pointer transition-all active:scale-95 shadow-sm"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {feedback && (
            <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes("Correct") ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  4. BOARD GAME (Mini 12-Space Path Journey Board)
// ═══════════════════════════════════════════════════════════════════

export function GameBoardScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "board_game";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const [position, setPosition] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [won, setWon] = useState(false);

  const maxSteps = level === 1 ? 6 : level === 2 ? 9 : level === 3 ? 12 : 15;

  const ALL_STEPS = [
    { title: t.games.landmarkStart || "Start", emoji: "🏁", prompt: t.home.heroTagline },
    { title: t.games.landmarkTeaGarden || "Tea Estate", emoji: "🍃", prompt: t.sounds.soundChaiDesc },
    { title: t.games.landmarkKaziranga || "Kaziranga", emoji: "🦏", prompt: t.games.kazirangaDesc },
    { title: t.games.landmarkMajuli || "Majuli Ghat", emoji: "🛶", prompt: t.games.jigsawDesc },
    { title: t.games.landmarkFinish || "Finish", emoji: "🏆", prompt: t.games.feedbackReachedFinish },
  ];

  const BOARD_STEPS = ALL_STEPS.slice(0, maxSteps);

  function rollAndMove() {
    if (rolling) return;
    playSoundTone("flip");
    setRolling(true);

    const roll = Math.floor(Math.random() * 3) + 1;
    setLastRoll(roll);

    setTimeout(() => {
      setRolling(false);
      const nextPos = Math.min(position + roll, BOARD_STEPS.length - 1);
      setPosition(nextPos);
      setActivePrompt(BOARD_STEPS[nextPos].prompt);

      if (nextPos === BOARD_STEPS.length - 1) {
        playSoundTone("correct");
        const res = recordGamePerformance({
          gameId,
          gameTitle: t.games.boardTitle || "Assam Board Game",
          skill: "Attention",
          level,
          accuracy: 100,
          correctAnswers: maxSteps,
          totalQuestions: maxSteps,
          attempts: 1,
          completionTime: 40,
          hintsUsed: 0,
          retries: 0,
          timestamp: Date.now(),
          completed: true,
        });
        setAdaptiveResult(res);
        setWon(true);
        saveGameRecord({
          gameId: "game-board",
          gameTitle: t.games.boardTitle || "Assam Board Game",
          category: t.games.catAttention || "Attention",
          score: "Journey Completed!",
          difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
        });
        onProgress();
      }
    }, 600);
  }

  function restart() {
    setPosition(0);
    setLastRoll(null);
    setActivePrompt(null);
    setWon(false);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.feedbackReachedFinish || "Board Journey Completed!"}
        message={t.games.congrats}
        score="Victory"
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => { setLevel(newLvl); restart(); }}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.boardTitle}
        subtitle={t.games.boardDesc}
        level={level}
        setLevel={(lvl) => { setLevel(lvl); restart(); }}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        {/* Step Info Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--brass)] rounded-3xl p-6 text-center space-y-4 shadow-lg">
          <div className="flex items-center justify-between text-xs font-black text-[var(--text-muted)] border-b border-[var(--border)] pb-3">
            <span>{t.common.level} {position + 1} / {BOARD_STEPS.length}</span>
            <span>{lastRoll ? `+${lastRoll}` : t.common.start}</span>
          </div>

          <div className="text-6xl">{BOARD_STEPS[position].emoji}</div>
          <h2 className="text-2xl font-black text-[var(--text-primary)]">{BOARD_STEPS[position].title}</h2>
          <p className="text-base text-[var(--text-secondary)] font-semibold italic">"{BOARD_STEPS[position].prompt}"</p>

          <button
            onClick={rollAndMove}
            disabled={rolling}
            className="w-full min-h-[52px] py-3.5 rounded-2xl text-lg font-black text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] shadow-md cursor-pointer transition-all disabled:opacity-50"
          >
            {rolling ? t.common.loading : t.games.promptRollMove}
          </button>
        </div>

        {/* 12-Space Board Grid */}
        <div className="bg-[var(--bg-section)] border border-[var(--border)] rounded-3xl p-5 space-y-3">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider text-center">
            {t.games.boardTitle}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {BOARD_STEPS.map((step, idx) => {
              const isCurrent = idx === position;
              const isPassed = idx < position;
              return (
                <div
                  key={step.title}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                    isCurrent
                      ? "bg-[var(--oxblood)] text-white border-[var(--brass)] shadow-lg ring-4 ring-[var(--brass-light)] scale-105"
                      : isPassed
                      ? "bg-teal-900/20 text-teal-700 border-teal-600/30"
                      : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border)]"
                  }`}
                >
                  <span className="text-2xl">{step.emoji}</span>
                  <span className="text-[11px] font-black truncate max-w-full">{step.title}</span>
                  {isCurrent && <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[var(--brass)] text-black rounded-full">{t.common.ok}</span>}
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
//  5. INTERACTIVE COGNITIVE VIDEO GAME (Target Object Tap)
// ═══════════════════════════════════════════════════════════════════

export function GameInteractiveScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "interactive_stories";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const TASKS = [
    {
      instruction: t.games.promptTapTeaLeaf,
      target: t.games.labelTeaLeaf,
      options: [
        { emoji: "🍃", label: t.games.labelTeaLeaf, isCorrect: true },
        { emoji: "🛶", label: t.games.labelBoat, isCorrect: false },
        { emoji: "🦏", label: t.games.labelRhino, isCorrect: false },
        { emoji: "🧺", label: t.games.labelBasket, isCorrect: false },
      ],
    },
    {
      instruction: t.games.promptTapRedPot,
      target: t.games.labelRedPot,
      options: [
        { emoji: "🫖", color: "blue", label: t.games.labelBluePot, isCorrect: false },
        { emoji: "🫖", color: "red", label: t.games.labelRedPot, isCorrect: true },
        { emoji: "🫖", color: "green", label: t.games.labelGreenPot, isCorrect: false },
      ],
    },
    {
      instruction: t.games.promptTapLargestRhino,
      target: t.games.labelLargeRhino,
      options: [
        { emoji: "🦏", size: "text-3xl", label: t.games.labelSmallRhino, isCorrect: false },
        { emoji: "🦏", size: "text-6xl", label: t.games.labelLargeRhino, isCorrect: true },
        { emoji: "🦏", size: "text-4xl", label: t.games.labelMediumRhino, isCorrect: false },
      ],
    },
    {
      instruction: t.games.promptNotBelongNature,
      target: t.games.labelAirplane,
      options: [
        { emoji: "🌸", label: t.games.labelFlower, isCorrect: false },
        { emoji: "🍃", label: t.games.labelLeaf, isCorrect: false },
        { emoji: "✈️", label: t.games.labelAirplane, isCorrect: true },
      ],
    },
  ];

  const totalTasks = level === 1 ? 2 : level === 2 ? 3 : TASKS.length;
  const currentTask = TASKS[stepIndex % TASKS.length];

  function handleSelect(isCorrect: boolean) {
    if (isCorrect) {
      playSoundTone("correct");
      setFeedback(t.games.feedbackGreatObservation);
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        setFeedback(null);
        if (stepIndex + 1 >= totalTasks) {
          const res = recordGamePerformance({
            gameId,
            gameTitle: t.games.interactiveTitle,
            skill: "Recognition",
            level,
            accuracy: 100,
            correctAnswers: totalTasks,
            totalQuestions: totalTasks,
            attempts: 1,
            completionTime: 25,
            hintsUsed: 0,
            retries: 0,
            timestamp: Date.now(),
            completed: true,
          });
          setAdaptiveResult(res);
          setWon(true);
          saveGameRecord({
            gameId: "game-interactive",
            gameTitle: t.games.interactiveTitle,
            category: "Recognition",
            score: `${nextScore} ${t.common.points}`,
            difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
          });
          onProgress();
        } else {
          setStepIndex((i) => i + 1);
        }
      }, 900);
    } else {
      playSoundTone("wrong");
      setFeedback(t.games.feedbackLookClosely);
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  function restart() {
    setStepIndex(0);
    setScore(0);
    setWon(false);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.congrats}
        message={`${t.common.completed} ${t.games.interactiveTitle}!`}
        score={`${score} ${t.common.points}`}
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => { setLevel(newLvl); restart(); }}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.interactiveTitle}
        subtitle={t.games.interactiveDesc}
        level={level}
        setLevel={(lvl) => { setLevel(lvl); restart(); }}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
          <div className="inline-block px-3.5 py-1 bg-[var(--brass-light)] text-[var(--brass-dark)] border border-[var(--brass)] font-extrabold text-xs rounded-xl">
            {stepIndex + 1} / {totalTasks}
          </div>

          <h2 className="text-2xl font-black text-[var(--text-primary)] leading-snug">
            "{currentTask.instruction}"
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-2">
            {currentTask.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt.isCorrect)}
                className="aspect-square rounded-2xl border-2 border-[var(--border)] hover:border-[var(--oxblood)] bg-[var(--bg-section)] flex flex-col items-center justify-center p-4 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <span className={(opt as any).size || "text-5xl"} style={{ color: (opt as any).color || undefined }}>{opt.emoji}</span>
                <span className="text-xs font-extrabold text-[var(--text-primary)] mt-2">{opt.label}</span>
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes(t.games.feedbackGreatObservation) || feedback.includes("Great") ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  6. NER BAZAAR / TEA GARDEN SORT (Tap & Drag Categorization)
// ═══════════════════════════════════════════════════════════════════

export function GameBazaarScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "sorting_game";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const ALL_ITEMS = [
    { name: t.games.itemTeaLeaf || t.games.itemTea, category: "FOOD", emoji: "🍃" },
    { name: t.games.itemPitha || "Bhoot Jolokia", category: "FOOD", emoji: "🌶️" },
    { name: t.games.itemMilk || "Banana", category: "FOOD", emoji: "🍌" },
    { name: t.games.itemLemon, category: "FOOD", emoji: "🍋" },
    { name: t.games.itemBamboo, category: "HANDICRAFT", emoji: "🧺" },
    { name: t.games.itemSilkCloth, category: "HANDICRAFT", emoji: "🧶" },
    { name: t.games.itemSweets || "Brass Utensil", category: "HANDICRAFT", emoji: "🫖" },
    { name: t.games.itemMustardOil || "Handloom Gamusa", category: "HANDICRAFT", emoji: "🧣" },
  ];

  const itemCount = level === 1 ? 4 : level === 2 ? 6 : 8;
  const ITEMS = ALL_ITEMS.slice(0, itemCount);

  const [remainingItems, setRemainingItems] = useState(ITEMS);
  const [selectedItem, setSelectedItem] = useState<(typeof ITEMS)[0] | null>(null);
  const [foodBasket, setFoodBasket] = useState<typeof ITEMS>([]);
  const [craftBasket, setCraftBasket] = useState<typeof ITEMS>([]);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setRemainingItems(ITEMS);
    setSelectedItem(null);
    setFoodBasket([]);
    setCraftBasket([]);
    setWon(false);
  }, [level, t]);

  function sortItem(item: (typeof ITEMS)[0], targetCategory: "FOOD" | "HANDICRAFT") {
    if (item.category === targetCategory) {
      playSoundTone("correct");
      setFeedback(`${t.games.feedbackSortedItem} "${item.name}"`);

      if (targetCategory === "FOOD") setFoodBasket((prev) => [...prev, item]);
      else setCraftBasket((prev) => [...prev, item]);

      const nextRemaining = remainingItems.filter((i) => i.name !== item.name);
      setRemainingItems(nextRemaining);
      setSelectedItem(null);

      if (nextRemaining.length === 0) {
        setTimeout(() => {
          const res = recordGamePerformance({
            gameId,
            gameTitle: t.games.bazaarTitle,
            skill: "Categorization",
            level,
            accuracy: 100,
            correctAnswers: itemCount,
            totalQuestions: itemCount,
            attempts: 1,
            completionTime: 35,
            hintsUsed: 0,
            retries: 0,
            timestamp: Date.now(),
            completed: true,
          });
          setAdaptiveResult(res);
          setWon(true);
          saveGameRecord({
            gameId: "game-bazaar",
            gameTitle: t.games.bazaarTitle,
            category: "Categorization",
            score: t.common.completed,
            difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
          });
          onProgress();
        }, 600);
      }
    } else {
      playSoundTone("wrong");
      setFeedback(`"${item.name}" ${t.games.feedbackBelongsOther}`);
      setTimeout(() => setFeedback(null), 1200);
    }
  }

  function handleCategoryChoice(targetCategory: "FOOD" | "HANDICRAFT") {
    if (selectedItem) {
      sortItem(selectedItem, targetCategory);
    }
  }

  function handleDragStart(e: React.DragEvent, item: (typeof ITEMS)[0]) {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
    setSelectedItem(item);
  }

  function handleDrop(e: React.DragEvent, targetCategory: "FOOD" | "HANDICRAFT") {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    try {
      const item = JSON.parse(raw);
      sortItem(item, targetCategory);
    } catch {}
  }

  function restart() {
    setRemainingItems(ITEMS);
    setSelectedItem(null);
    setFoodBasket([]);
    setCraftBasket([]);
    setWon(false);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.congrats}
        message={`${t.common.completed} ${t.games.bazaarTitle}!`}
        score="100%"
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => setLevel(newLvl)}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.bazaarTitle}
        subtitle={t.games.bazaarDesc}
        level={level}
        setLevel={setLevel}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        {/* Items Tray */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-5 space-y-3 text-center shadow-md">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            {t.games.bazaarTitle} ({t.games.promptLookItems})
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {remainingItems.map((item) => (
              <div
                key={item.name}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onClick={() => { playSoundTone("flip"); setSelectedItem(item); }}
                className={`px-4 py-3 rounded-2xl border-2 flex items-center gap-2 font-black cursor-pointer transition-all active:scale-95 ${
                  selectedItem?.name === item.name
                    ? "bg-[var(--oxblood)] text-white border-[var(--brass)] ring-4 ring-[var(--brass-light)] scale-105"
                    : "bg-[var(--bg-section)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--oxblood)]"
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Baskets */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div
            onClick={() => handleCategoryChoice("FOOD")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "FOOD")}
            className="p-6 rounded-3xl border-2 border-emerald-600/40 bg-emerald-950/20 hover:bg-emerald-950/40 text-center space-y-3 transition-all cursor-pointer min-h-[160px] flex flex-col items-center justify-between shadow-sm"
          >
            <div>
              <span className="text-4xl">🥗</span>
              <h3 className="text-lg font-black text-emerald-700 dark:text-emerald-400 mt-1">{t.games.labelFoodBasket}</h3>
            </div>
            <div className="text-xs font-bold text-[var(--text-muted)]">
              {foodBasket.length} ({foodBasket.map((i) => i.emoji).join(" ")})
            </div>
          </div>

          <div
            onClick={() => handleCategoryChoice("HANDICRAFT")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "HANDICRAFT")}
            className="p-6 rounded-3xl border-2 border-amber-600/40 bg-amber-950/20 hover:bg-amber-950/40 text-center space-y-3 transition-all cursor-pointer min-h-[160px] flex flex-col items-center justify-between shadow-sm"
          >
            <div>
              <span className="text-4xl">🏡</span>
              <h3 className="text-lg font-black text-amber-700 dark:text-amber-400 mt-1">{t.games.labelHouseholdBasket}</h3>
            </div>
            <div className="text-xs font-bold text-[var(--text-muted)]">
              {craftBasket.length} ({craftBasket.map((i) => i.emoji).join(" ")})
            </div>
          </div>
        </div>

        {feedback && (
          <div className={`text-center text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes(t.games.feedbackSortedItem) ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  7. MEMORY LANE: PURANA NORTH-EAST (Interactive Reminiscence)
// ═══════════════════════════════════════════════════════════════════

export function GameMemoryLaneScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "memory_lane";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [activeIdx, setActiveIdx] = useState(0);
  const [userChoice, setUserChoice] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioStatus, setAudioStatus] = useState<string | null>(null);
  const audioInstanceRef = React.useRef<HTMLAudioElement | null>(null);

  const CARDS = [
    {
      title: t.games.landmarkMajuli || "Guwahati River Ghat & Brahmaputra Ferries",
      prompt: t.games.hintRiver || "Have you ever traveled on a river ferry across the majestic river?",
      sound: "water",
      img: majuliBoatImg,
    },
    {
      title: t.games.landmarkTeaGarden || "Traditional Assam Tea Estate House",
      prompt: t.games.hintTea || "Do you remember the fresh morning breeze near green tea gardens?",
      sound: "bird",
      img: teaGardenImg,
    },
    {
      title: t.games.landmarkFinish || "Bihu Festival & Spring Celebrations",
      prompt: t.games.hintBihu || "Have you enjoyed the rhythmic Dhol beats during Bihu celebrations?",
      sound: "dhol",
      img: bihuCelebrationImg,
    },
  ];

  const current = CARDS[activeIdx];

  // Stop previous audio whenever card changes or component unmounts
  useEffect(() => {
    stopAllRealAudio();
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current.currentTime = 0;
      audioInstanceRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setAudioStatus(null);

    return () => {
      stopAllRealAudio();
    };
  }, [activeIdx]);

  function handlePlayAudio() {
    stopAllRealAudio();
    const audioUrl = REAL_AUDIO_MAP[current.sound] || pepaAudio;
    const audio = new Audio(audioUrl);
    audioInstanceRef.current = audio;
    (window as any).__activeMemoverseAudio = audio;

    audio.onended = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setAudioStatus(null);
    };

    audio.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setAudioStatus(null);
    };

    setAudioStatus(t.sounds.playing);
    setIsPlaying(true);
    setIsPaused(false);

    audio.play().catch((err) => {
      console.warn("Audio autoplay blocked or failed:", err);
      setIsPlaying(false);
      setIsPaused(true);
      setAudioStatus(t.sounds.listen);
    });
  }

  function handlePauseAudio() {
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
      setAudioStatus(t.sounds.pause);
    }
  }

  function handleReplayAudio() {
    if (audioInstanceRef.current) {
      audioInstanceRef.current.currentTime = 0;
      audioInstanceRef.current.play().then(() => {
        setIsPlaying(true);
        setIsPaused(false);
        setAudioStatus(t.sounds.playing);
      }).catch(() => {
        handlePlayAudio();
      });
    } else {
      handlePlayAudio();
    }
  }

  function handleResponse(choice: string) {
    setUserChoice(choice);
  }

  function handleNext() {
    stopAllRealAudio();
    setUserChoice(null);
    const next = (activeIdx + 1) % CARDS.length;
    setActiveIdx(next);
    if (next === 0) {
      recordGamePerformance({
        gameId,
        gameTitle: t.games.memoryLaneTitle,
        skill: "Memory",
        level,
        accuracy: 100,
        correctAnswers: CARDS.length,
        totalQuestions: CARDS.length,
        attempts: 1,
        completionTime: 30,
        hintsUsed: 0,
        retries: 0,
        timestamp: Date.now(),
        completed: true,
      });
      saveGameRecord({
        gameId: "game-memory-lane",
        gameTitle: t.games.memoryLaneTitle,
        category: "Memory",
        score: t.common.completed,
        difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
      });
      onProgress();
    }
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.memoryLaneTitle}
        subtitle={t.games.memoryLaneDesc}
        level={level}
        setLevel={setLevel}
        unlockedLevel={unlockedLevel}
        onBack={() => { stopAllRealAudio(); if (onBack) onBack(); else onNav("activities"); }}
        onNav={(s) => { stopAllRealAudio(); onNav(s); }}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--brass)] rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="rounded-2xl overflow-hidden h-64 sm:h-80 border border-[var(--border)] relative">
            <img src={resolveGameImage(current.img, current.title)} alt={current.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = defaultMemoryCoverImg; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-black text-left">{current.title}</h3>
            </div>
          </div>

          <div className="p-4 bg-[var(--oxblood-light)] border border-[var(--oxblood)] rounded-2xl space-y-2">
            <p className="text-base text-[var(--oxblood-dark)] font-bold italic">"{current.prompt}"</p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase">{t.activities.storyRecall}:</div>
            <div className="flex justify-center gap-2">
              {[t.common.yes, t.common.confirm, t.common.no].map((resp) => (
                <button
                  key={resp}
                  onClick={() => handleResponse(resp)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                    userChoice === resp
                      ? "bg-[var(--oxblood)] text-white border-[var(--brass)] shadow-md"
                      : "bg-[var(--bg-section)] text-[var(--text-primary)] border-[var(--border)] hover:border-[var(--oxblood)]"
                  }`}
                >
                  {resp}
                </button>
              ))}
            </div>
          </div>

          {/* REAL INSTRUMENTAL AUDIO CONTROLLER */}
          <div className="p-4 bg-[var(--bg-section)] border border-[var(--border)] rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-black uppercase text-[var(--oxblood-dark)]">
              <span className="flex items-center gap-1.5">
                <span>🎵</span> {t.sounds.title}
              </span>
              {isPlaying && <span className="animate-pulse text-green-600 dark:text-emerald-400 font-extrabold">● {t.sounds.playing}</span>}
            </div>

            {audioStatus && (
              <div className="text-xs font-extrabold text-[var(--text-secondary)] italic">
                {audioStatus}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={handlePlayAudio}
                  className="flex-1 py-3 px-5 rounded-2xl font-black text-sm text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>▶</span> {isPaused ? t.sounds.resume : t.sounds.listen}
                </button>
              ) : (
                <button
                  onClick={handlePauseAudio}
                  className="flex-1 py-3 px-5 rounded-2xl font-black text-sm text-[var(--oxblood-dark)] bg-[var(--oxblood-light)] hover:bg-[var(--brass-light)] border border-[var(--oxblood)] cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <span>⏸</span> {t.sounds.pause}
                </button>
              )}

              <button
                onClick={handleReplayAudio}
                className="py-3 px-4 rounded-2xl font-black text-sm text-[var(--text-primary)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border)] cursor-pointer shadow-xs flex items-center justify-center gap-1"
              >
                <span>↻</span> {t.sounds.replay}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleNext}
              className="w-full py-3.5 px-4 rounded-2xl font-black text-sm text-white bg-[var(--oxblood)] hover:bg-[var(--oxblood-dark)] border border-[var(--brass)] cursor-pointer shadow-md"
            >
              {t.common.next} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  8. KAZIRANGA PUZZLE (Dedicated Grid Assembly)
// ═══════════════════════════════════════════════════════════════════

export function GameKazirangaPuzzleScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "kaziranga_puzzle";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const pieceCount = level === 1 ? 4 : level === 2 ? 6 : level === 3 ? 9 : 12;
  const gridCols = level === 1 ? "grid-cols-2" : level === 2 ? "grid-cols-3" : level === 3 ? "grid-cols-3" : "grid-cols-4";

  const [grid, setGrid] = useState<(number | null)[]>(() => Array(pieceCount).fill(null));
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [tray, setTray] = useState<number[]>(() => Array.from({ length: pieceCount }, (_, i) => i).sort(() => Math.random() - 0.5));
  const [won, setWon] = useState(false);

  useEffect(() => {
    setGrid(Array(pieceCount).fill(null));
    setSelectedPiece(null);
    setTray(Array.from({ length: pieceCount }, (_, i) => i).sort(() => Math.random() - 0.5));
    setWon(false);
  }, [level, pieceCount]);

  function placePiece(slotIdx: number, pieceIdx: number) {
    playSoundTone("flip");
    const nextGrid = [...grid];
    const old = nextGrid[slotIdx];
    nextGrid[slotIdx] = pieceIdx;
    setGrid(nextGrid);

    setTray((prev) => {
      const filtered = prev.filter((p) => p !== pieceIdx);
      if (old !== null) filtered.push(old);
      return filtered;
    });

    setSelectedPiece(null);

    if (nextGrid.every((p, i) => p === i)) {
      playSoundTone("correct");
      const res = recordGamePerformance({
        gameId,
        gameTitle: t.games.kazirangaTitle,
        skill: "Visual-Spatial",
        level,
        accuracy: 100,
        correctAnswers: pieceCount,
        totalQuestions: pieceCount,
        attempts: 1,
        completionTime: 35,
        hintsUsed: 0,
        retries: 0,
        timestamp: Date.now(),
        completed: true,
      });
      setAdaptiveResult(res);
      setWon(true);
      saveGameRecord({
        gameId: "game-kaziranga-puzzle",
        gameTitle: t.games.kazirangaTitle,
        category: "Visual-Spatial",
        score: "100%",
        difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
      });
      onProgress();
    }
  }

  function handleSlotClick(idx: number) {
    if (selectedPiece !== null) {
      placePiece(idx, selectedPiece);
    }
  }

  function restart() {
    setGrid(Array(pieceCount).fill(null));
    setSelectedPiece(null);
    setTray(Array.from({ length: pieceCount }, (_, i) => i).sort(() => Math.random() - 0.5));
    setWon(false);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.congrats}
        message={`${t.common.completed} ${t.games.kazirangaTitle}!`}
        score="100%"
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => setLevel(newLvl)}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.kazirangaTitle}
        subtitle={t.games.kazirangaDesc}
        level={level}
        setLevel={setLevel}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 space-y-4 shadow-lg">
          <div className={`grid ${gridCols} gap-2 max-w-xs mx-auto aspect-square p-2 bg-[var(--bg-section)] rounded-2xl border-2 border-dashed border-[var(--brass)]`}>
            {grid.map((piece, slotIdx) => (
              <button
                key={slotIdx}
                onClick={() => handleSlotClick(slotIdx)}
                className={`rounded-xl flex flex-col items-center justify-center font-black transition-all cursor-pointer ${
                  piece !== null
                    ? piece === slotIdx
                      ? "bg-emerald-700 dark:bg-emerald-800 text-white border-2 border-emerald-400 dark:border-emerald-500"
                      : "bg-amber-700 dark:bg-amber-800 text-white border-2 border-amber-400 dark:border-amber-500"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)]"
                }`}
              >
                {piece !== null ? (
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl">🦏</span>
                    <span className="text-[10px] block font-black uppercase">{piece + 1} {piece === slotIdx ? "✓" : ""}</span>
                  </div>
                ) : (
                  <span className="text-xs">{slotIdx + 1}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-section)] border border-[var(--border)] rounded-3xl p-5 space-y-3">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase">{t.games.kazirangaTitle}</div>
          <div className="flex flex-wrap justify-center gap-3">
            {tray.map((piece) => (
              <button
                key={piece}
                onClick={() => { playSoundTone("flip"); setSelectedPiece(piece); }}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center font-black border-2 cursor-pointer transition-all active:scale-95 ${
                  selectedPiece === piece
                    ? "bg-[var(--oxblood)] text-white border-[var(--brass)] ring-4 ring-[var(--brass-light)] scale-105"
                    : "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border)]"
                }`}
              >
                <span className="text-2xl sm:text-3xl">🦏</span>
                <span className="text-[10px]">{piece + 1}</span>
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
  const { t } = useLanguage();
  const gameId = "whats_missing";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const [phase, setPhase] = useState<"observe" | "recall">("observe");
  const [timer, setTimer] = useState(5);
  const [missingItem, setMissingItem] = useState<{ name: string; emoji: string } | null>(null);
  const [displayItems, setDisplayItems] = useState<{ name: string; emoji: string }[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const ITEMS = [
    { name: t.games.itemTeaLeaf || t.games.itemTea, emoji: "🍃" },
    { name: t.games.labelRhino || "Kaziranga Rhino", emoji: "🦏" },
    { name: t.games.itemBamboo, emoji: "🧺" },
    { name: t.games.labelBoat || "River Boat", emoji: "🛶" },
    { name: t.games.itemSilkCloth, emoji: "🧶" },
    { name: t.games.labelFlower || "Orchid Flower", emoji: "🌸" },
  ];

  const startRound = useCallback(() => {
    const count = level === 1 ? 3 : level === 2 ? 4 : level === 3 ? 5 : 6;
    const obsTime = level === 1 ? 5 : level === 2 ? 4 : 3;
    const shuffled = [...ITEMS].sort(() => Math.random() - 0.5).slice(0, count);
    setDisplayItems(shuffled);

    const missing = shuffled[Math.floor(Math.random() * shuffled.length)];
    setMissingItem(missing);

    const incorrect = ITEMS.filter((i) => i.name !== missing.name).map((i) => i.name);
    const opts = [missing.name, incorrect[0], incorrect[1]].sort(() => Math.random() - 0.5);
    setOptions(opts);

    setPhase("observe");
    setTimer(obsTime);
    setFeedback(null);
  }, [level, t]);

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
      setFeedback(t.games.feedbackRemembered);
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        if (rounds + 1 >= 3) {
          const res = recordGamePerformance({
            gameId,
            gameTitle: t.games.whatsMissingTitle,
            skill: "Visual-Spatial",
            level,
            accuracy: Math.round((nextScore / 30) * 100),
            correctAnswers: Math.round(nextScore / 10),
            totalQuestions: 3,
            attempts: 3,
            completionTime: 25,
            hintsUsed: 0,
            retries: 0,
            timestamp: Date.now(),
            completed: true,
          });
          setAdaptiveResult(res);
          setWon(true);
          saveGameRecord({
            gameId: "game-whats-missing",
            gameTitle: t.games.whatsMissingTitle,
            category: "Visual-Spatial",
            score: `${nextScore} ${t.common.points}`,
            difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
          });
          onProgress();
        } else {
          setRounds((r) => r + 1);
          startRound();
        }
      }, 1000);
    } else {
      playSoundTone("wrong");
      setFeedback(t.common.incorrect);
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  function restart() {
    setScore(0);
    setRounds(0);
    setWon(false);
    startRound();
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.congrats}
        message={`${t.common.completed} ${t.games.whatsMissingTitle}!`}
        score={`${score} ${t.common.points}`}
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => { setLevel(newLvl); restart(); }}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.whatsMissingTitle}
        subtitle={t.games.whatsMissingDesc}
        level={level}
        setLevel={(lvl) => { setLevel(lvl); restart(); }}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        {phase === "observe" ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider animate-pulse">
              {t.games.promptLookItems}: {timer}s
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
            <h2 className="text-2xl font-black text-[var(--text-primary)]">{t.games.promptOneVanished}</h2>

            <div className="flex flex-wrap justify-center gap-4 py-4">
              {displayItems.map((item) => (
                <div key={item.name} className="p-4 bg-[var(--bg-section)] border border-[var(--border)] rounded-2xl flex flex-col items-center">
                  {item.name === missingItem?.name ? (
                    <span className="text-5xl font-black text-[var(--oxblood)] animate-pulse">❓</span>
                  ) : (
                    <span className="text-5xl">{item.emoji}</span>
                  )}
                  <span className="text-xs font-black text-[var(--text-secondary)] mt-2">
                    {item.name === missingItem?.name ? "?" : item.name}
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
              <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes(t.games.feedbackRemembered) ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
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
  const { t } = useLanguage();
  const gameId = "daily_routine";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const ALL_ROUTINE = [
    { id: 1, title: t.games.stepWakeUp, emoji: "🌅" },
    { id: 2, title: t.games.stepChai || "Brush Teeth", emoji: "🪥" },
    { id: 3, title: t.games.stepChai, emoji: "☕" },
    { id: 4, title: t.games.stepMedicine, emoji: "💊" },
    { id: 5, title: t.games.stepWalk, emoji: "🚶‍♂️" },
    { id: 6, title: t.games.stepDinner || "Lunch", emoji: "🍲" },
    { id: 7, title: t.common.back || "Afternoon Rest", emoji: "🌙" },
    { id: 8, title: t.games.routineTitle || "Family Call", emoji: "📞" },
  ];

  const cardCount = level === 1 ? 3 : level === 2 ? 4 : level === 3 ? 6 : 8;
  const ROUTINE = ALL_ROUTINE.slice(0, cardCount);

  const [cards, setCards] = useState(() => [...ROUTINE].sort(() => Math.random() - 0.5));
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setCards([...ROUTINE].sort(() => Math.random() - 0.5));
    setWon(false);
    setFeedback(null);
  }, [level, t]);

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
      setFeedback(t.games.feedbackPerfectRoutine);
      setTimeout(() => {
        const res = recordGamePerformance({
          gameId,
          gameTitle: t.games.routineTitle,
          skill: "Sequencing",
          level,
          accuracy: 100,
          correctAnswers: cardCount,
          totalQuestions: cardCount,
          attempts: 1,
          completionTime: 30,
          hintsUsed: 0,
          retries: 0,
          timestamp: Date.now(),
          completed: true,
        });
        setAdaptiveResult(res);
        setWon(true);
        saveGameRecord({
          gameId: "game-routine",
          gameTitle: t.games.routineTitle,
          category: "Sequencing",
          score: t.common.completed,
          difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
        });
        onProgress();
      }, 700);
    } else {
      playSoundTone("wrong");
      setFeedback(t.games.feedbackRoutineHint);
      setTimeout(() => setFeedback(null), 1500);
    }
  }

  function restart() {
    setCards([...ROUTINE].sort(() => Math.random() - 0.5));
    setWon(false);
    setFeedback(null);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.congrats}
        message={`${t.common.completed} ${t.games.routineTitle}!`}
        score="100%"
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => setLevel(newLvl)}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.routineTitle}
        subtitle={t.games.routineDesc}
        level={level}
        setLevel={setLevel}
        unlockedLevel={unlockedLevel}
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
            {t.games.promptCheckOrder} ✨
          </button>

          {feedback && (
            <div className={`text-center text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes(t.games.feedbackPerfectRoutine) ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  11. PATTERN RECOGNITION (ABAB / AABB / ABCABC / ABCD)
// ═══════════════════════════════════════════════════════════════════

export function GamePatternScreen({ onNav, onBack, onProgress }: CommonGameProps) {
  const { t } = useLanguage();
  const gameId = "pattern_recognition";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const PATTERNS_LEVEL1 = [
    { sequence: ["🌺", "🍃", "🌺", "🍃", "?"], answer: "🌺", options: ["🌺", "🍃", "🦏"] },
    { sequence: ["☕", "🍵", "☕", "🍵", "?"], answer: "☕", options: ["☕", "🍵", "🧺"] },
  ];

  const PATTERNS_LEVEL2 = [
    { sequence: ["🔴", "🔴", "🔵", "🔵", "🔴", "?"], answer: "🔴", options: ["🔴", "🔵", "🟡"] },
    { sequence: ["🌸", "🌸", "🍃", "🍃", "🌸", "?"], answer: "🌸", options: ["🌸", "🍃", "🌾"] },
  ];

  const PATTERNS_LEVEL3 = [
    { sequence: ["🌞", "🌙", "⭐", "🌞", "🌙", "?"], answer: "⭐", options: ["⭐", "🌞", "🌙"] },
    { sequence: ["🦏", "🐘", "🐅", "🦏", "🐘", "?"], answer: "🐅", options: ["🐅", "🦏", "🐘"] },
  ];

  const PATTERNS_LEVEL4 = [
    { sequence: ["🟢", "🟡", "🔵", "🔴", "🟢", "🟡", "🔵", "?"], answer: "🔴", options: ["🔴", "🔵", "🟢"] },
  ];

  const PATTERNS = level === 1 ? PATTERNS_LEVEL1 : level === 2 ? PATTERNS_LEVEL2 : level === 3 ? PATTERNS_LEVEL3 : PATTERNS_LEVEL4;
  const current = PATTERNS[step % PATTERNS.length];

  function handleSelect(choice: string) {
    if (choice === current.answer) {
      playSoundTone("correct");
      setFeedback(t.games.feedbackPatternComplete);
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        if (step + 1 >= PATTERNS.length) {
          const res = recordGamePerformance({
            gameId,
            gameTitle: t.games.patternTitle,
            skill: "Pattern Recognition",
            level,
            accuracy: 100,
            correctAnswers: PATTERNS.length,
            totalQuestions: PATTERNS.length,
            attempts: 1,
            completionTime: 20,
            hintsUsed: 0,
            retries: 0,
            timestamp: Date.now(),
            completed: true,
          });
          setAdaptiveResult(res);
          setWon(true);
          saveGameRecord({
            gameId: "game-pattern",
            gameTitle: t.games.patternTitle,
            category: "Pattern Recognition",
            score: `${nextScore} ${t.common.points}`,
            difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
          });
          onProgress();
        } else {
          setStep((s) => s + 1);
          setFeedback(null);
        }
      }, 900);
    } else {
      playSoundTone("wrong");
      setFeedback(t.games.feedbackPatternOrder);
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  function restart() {
    setStep(0);
    setScore(0);
    setWon(false);
    setFeedback(null);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.congrats}
        message={`${t.common.completed} ${t.games.patternTitle}!`}
        score={`${score} ${t.common.points}`}
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => { setLevel(newLvl); restart(); }}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.patternTitle}
        subtitle={t.games.patternDesc}
        level={level}
        setLevel={(lvl) => { setLevel(lvl); restart(); }}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
          <div className="text-xs font-bold text-[var(--text-muted)] uppercase">
            {step + 1} / {PATTERNS.length}
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
            <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes(t.games.feedbackPatternComplete) ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
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
  const { t } = useLanguage();
  const gameId = "sound_rec";
  const [level, setLevel] = useState<number>(() => getUnlockedLevel(gameId));
  const unlockedLevel = getUnlockedLevel(gameId);
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const SOUND_TASKS = [
    { title: t.games.soundSongbirds, sound: "bird", options: [t.games.soundBirdChirping, t.games.soundMonsoonRain, t.games.soundRiverFlow], correct: t.games.soundBirdChirping },
    { title: t.games.soundBihuBeat, sound: "dhol", options: [t.games.soundBihuBeat, t.games.soundTempleBell, t.games.soundBirdChirping], correct: t.games.soundBihuBeat },
    { title: t.games.soundTempleBell, sound: "bell", options: [t.games.soundMonsoonRain, t.games.soundTempleBell, t.games.soundRiverFlow], correct: t.games.soundTempleBell },
  ];

  const current = SOUND_TASKS[step % SOUND_TASKS.length];

  function playSound() {
    playRealInstrumentalAudio(current.sound);
  }

  function handleAnswer(ans: string) {
    if (ans === current.correct) {
      playSoundTone("correct");
      setFeedback(t.games.feedbackSoundIdentified);
      const nextScore = score + 10;
      setScore(nextScore);
      setTimeout(() => {
        if (step + 1 >= SOUND_TASKS.length) {
          const res = recordGamePerformance({
            gameId,
            gameTitle: t.games.soundRecTitle,
            skill: "Recognition",
            level,
            accuracy: 100,
            correctAnswers: SOUND_TASKS.length,
            totalQuestions: SOUND_TASKS.length,
            attempts: 1,
            completionTime: 25,
            hintsUsed: 0,
            retries: 0,
            timestamp: Date.now(),
            completed: true,
          });
          setAdaptiveResult(res);
          setWon(true);
          saveGameRecord({
            gameId: "game-sound-rec",
            gameTitle: t.games.soundRecTitle,
            category: "Recognition",
            score: `${nextScore} ${t.common.points}`,
            difficulty: level === 1 ? "Easy" : level === 2 ? "Medium" : level === 3 ? "Hard" : "Standard",
          });
          onProgress();
        } else {
          setStep((s) => s + 1);
          setFeedback(null);
        }
      }, 900);
    } else {
      playSoundTone("wrong");
      setFeedback(t.games.feedbackListenCarefully);
      setTimeout(() => setFeedback(null), 1000);
    }
  }

  function restart() {
    setStep(0);
    setScore(0);
    setWon(false);
    setFeedback(null);
  }

  if (won) {
    return (
      <GameVictoryModal
        title={t.games.congrats}
        message={`${t.common.completed} ${t.games.soundRecTitle}!`}
        score={`${score} ${t.common.points}`}
        feedbackMessage={adaptiveResult?.feedbackMessage}
        unlockedNewLevel={adaptiveResult?.unlockedNewLevel}
        nextRecommendedLevel={adaptiveResult?.nextRecommendedLevel}
        currentLevel={level}
        onNextLevel={(newLvl) => { setLevel(newLvl); restart(); }}
        onReplay={restart}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId={gameId}
        title={t.games.soundRecTitle}
        subtitle={t.games.soundRecDesc}
        level={level}
        setLevel={(lvl) => { setLevel(lvl); restart(); }}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-md mx-auto px-4 space-y-6 text-center">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
          <div className="flex gap-2">
            <button
              onClick={playSound}
              className="flex-1 py-5 rounded-2xl border-2 border-[var(--brass)] bg-[var(--brass-light)] text-[var(--brass-dark)] font-black text-lg flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
            >
              <span className="text-3xl">🔊</span>
              <span>{t.sounds.listen}</span>
            </button>
            <button
              onClick={playSound}
              className="px-4 py-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-section)] text-sm font-bold text-[var(--text-secondary)] cursor-pointer"
            >
              🔁 {t.sounds.replay}
            </button>
          </div>

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
            <div className={`text-base font-black py-2 rounded-xl animate-pulse ${feedback.includes(t.games.feedbackSoundIdentified) ? "text-green-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

