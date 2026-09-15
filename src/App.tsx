import { useState, useEffect, useCallback, useRef } from "react";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { LANGUAGE_METADATA } from "./speechUtils";
import {
  AdaptiveGameHeader,
  GameVictoryModal,
  GameWordPuzzlesScreen,
  GameJigsawScreen,
  GameDiceScreen,
  GameBoardScreen,
  GameInteractiveScreen,
  GameBazaarScreen,
  GameMemoryLaneScreen,
  GameKazirangaPuzzleScreen,
  GameWhatsMissingScreen,
  GameRoutineScreen,
  GamePatternScreen,
  GameSoundRecScreen,
  getGameRecords,
} from "./CognitiveGames";
import {
  getAIRecommendation,
  getSkillProfiles,
  getUnlockedLevel,
  recordGamePerformance,
} from "./adaptiveEngine";

import bihuCelebrationImg from "./assets/images/memories/bihu-celebration.png";
import teaGardenImg from "./assets/images/memories/ancestral-tea-garden.png";
import vintageRadioImg from "./assets/images/memories/radio-memory.png";
import heroElderlyImg from "./assets/images/hero_elderly.png";
import caregiverSupportImg from "./assets/images/caregiver-companionship.png";
import defaultMemoryCoverImg from "./assets/images/default_memory_cover.png";
import kazirangaRhinoImg from "./assets/images/kaziranga_rhino_memory.png";
import majuliBoatImg from "./assets/images/majuli_boat_memory.png";

const IMAGE_MAP: Record<string, string> = {
  "bihu-celebration.png": bihuCelebrationImg,
  "bihu-celebration": bihuCelebrationImg,
  "bihu_celebration_memory.png": bihuCelebrationImg,
  "ancestral-tea-garden.png": teaGardenImg,
  "ancestral-tea-garden": teaGardenImg,
  "tea_garden_memory.png": teaGardenImg,
  "radio-memory.png": vintageRadioImg,
  "radio-memory": vintageRadioImg,
  "vintage_radio_memory.png": vintageRadioImg,
  "hero_elderly.png": heroElderlyImg,
  "caregiver_support.png": caregiverSupportImg,
  "default_memory_cover.png": defaultMemoryCoverImg,
  "kaziranga_rhino_memory.png": kazirangaRhinoImg,
  "majuli_boat_memory.png": majuliBoatImg,
};

const KEYWORD_IMAGE_MAP: Array<{ keywords: string[]; img: string }> = [
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
    keywords: ["caregiver", "care", "companion", "empathetic", "support", "dementia", "nursing", "help"],
    img: caregiverSupportImg,
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

export function resolveImageByTitle(title: string): string | null {
  const tLower = title.toLowerCase();
  for (const entry of KEYWORD_IMAGE_MAP) {
    if (entry.keywords.some((kw) => tLower.includes(kw))) {
      return entry.img;
    }
  }
  return null;
}

export function resolveImage(src?: string, title?: string): string {
  // 1. If title matches a memory keyword, return exact imported image
  if (title) {
    const titleMatch = resolveImageByTitle(title);
    if (titleMatch) return titleMatch;
  }

  // 2. If src matches a memory keyword or filename, return exact imported image
  if (src && typeof src === "string") {
    // Check keyword map against src
    const sLower = src.toLowerCase();
    for (const entry of KEYWORD_IMAGE_MAP) {
      if (entry.keywords.some((kw) => sLower.includes(kw))) {
        return entry.img;
      }
    }

    // Check custom uploaded photo (base64/blob)
    if (src.startsWith("data:image/png") || src.startsWith("data:image/jpeg") || src.startsWith("blob:")) {
      return src;
    }
  }

  return defaultMemoryCoverImg;
}

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (!target.dataset.failed) {
    target.dataset.failed = "true";
    target.src = defaultMemoryCoverImg;
  }
};

// ═══════════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════════

interface Memory {
  id: string;
  title: string;
  description: string;
  category: "family" | "places" | "moments" | "voice";
  emoji: string;
  date: string;
  image?: string;
}

interface Reminder {
  id: string;
  time: string;
  text: string;
  done: boolean;
}

interface Profile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  location: string;
  phone: string;
  familyContactName: string;
  familyContactPhone: string;
  address: string;
  language: string;
  region: string;
  accessibility: {
    spokenGuidance: boolean;
    largeText: boolean;
    highContrast: boolean;
  };
  activities: { completed: number; bestCategory: string; level: number };
  memories: Memory[];
  reminders: Reminder[];
}

type Screen =
  | "home"
  | "play"
  | "more"
  | "about-dementia"
  | "activities"
  | "game-memory"
  | "game-sounds"
  | "game-market"
  | "game-story"
  | "game-word"
  | "game-jigsaw"
  | "game-dice"
  | "game-board"
  | "game-interactive"
  | "game-bazaar"
  | "game-memory-lane"
  | "game-kaziranga-puzzle"
  | "game-whats-missing"
  | "game-routine"
  | "game-pattern"
  | "game-sound-rec"
  | "profiles-select"
  | "start-journey"
  | "profile-created"
  | "profile-home"
  | "my-memories"
  | "reminders"
  | "progress"
  | "gate";

// ═══════════════════════════════════════════════════════════════════
//  CONSTANTS & DEMO DATA
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_PROFILES: Profile[] = [
  {
    id: "kamla-devi",
    name: "Kamla Devi",
    avatar: "👵",
    age: 68,
    gender: "Female",
    location: "Jorhat, Assam",
    phone: "+91 98765 43210",
    familyContactName: "Ananya Devi (Daughter)",
    familyContactPhone: "+91 98123 45678",
    address: "House No. 42, Tea Estate Road, Near Central Park, Jorhat, Assam - 785001",
    language: "Assamese",
    region: "Assam",
    accessibility: { spokenGuidance: true, largeText: true, highContrast: false },
    activities: { completed: 12, bestCategory: "Listening", level: 3 },
    memories: [
      {
        id: "m1",
        title: "Bihu Celebration in Jorhat",
        description: "Dancing Bihu with my family near our village mustard fields. The dhol beats filled the warm spring air.",
        category: "family",
        emoji: "👨‍👩‍👧",
        date: "2 days ago",
        image: bihuCelebrationImg,
      },
      {
        id: "m2",
        title: "Our Ancestral Tea Garden",
        description: "The wooden tea estate house where I grew up in Upper Assam. Morning mist and fresh brewed chai.",
        category: "places",
        emoji: "🏡",
        date: "1 week ago",
        image: teaGardenImg,
      },
      {
        id: "m3",
        title: "Bhupen Hazarika on the Radio",
        description: "Listening to the golden voice of Bhupen da on the morning radio every Sunday with my parents.",
        category: "moments",
        emoji: "🎵",
        date: "2 weeks ago",
        image: vintageRadioImg,
      },
    ],
    reminders: [
      { id: "r1", time: "08:00 AM", text: "Morning blood pressure medicine", done: true },
      { id: "r2", time: "01:00 PM", text: "Lunch and rest time", done: false },
      { id: "r3", time: "05:00 PM", text: "Evening medicine with warm water", done: false },
      { id: "r4", time: "07:00 PM", text: "Call Ananya (Daughter)", done: false },
    ],
  },
];

function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function storageSet<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

function tone(type: "flip" | "correct" | "wrong" | "gogona" | "dhol" | "bird" | "bell") {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime;

    switch (type) {
      case "flip":
        osc.type = "sine";
        osc.frequency.setValueAtTime(280, t);
        osc.frequency.exponentialRampToValueAtTime(560, t + 0.08);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.start(t); osc.stop(t + 0.1);
        break;
      case "correct":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523, t);
        osc.frequency.setValueAtTime(659, t + 0.1);
        osc.frequency.setValueAtTime(784, t + 0.2);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.start(t); osc.stop(t + 0.35);
        break;
      case "wrong":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.setValueAtTime(170, t + 0.15);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t); osc.stop(t + 0.3);
        break;
      case "gogona":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.linearRampToValueAtTime(290, t + 0.12);
        osc.frequency.linearRampToValueAtTime(190, t + 0.3);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.start(t); osc.stop(t + 0.35);
        break;
      case "dhol":
        osc.type = "sine";
        osc.frequency.setValueAtTime(190, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
        gain.gain.setValueAtTime(0.38, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.start(t); osc.stop(t + 0.25);
        break;
      case "bird":
        osc.type = "sine";
        osc.frequency.setValueAtTime(1800, t);
        osc.frequency.linearRampToValueAtTime(2400, t + 0.08);
        osc.frequency.linearRampToValueAtTime(1950, t + 0.18);
        gain.gain.setValueAtTime(0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.start(t); osc.stop(t + 0.18);
        break;
      case "bell":
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
        osc.start(t); osc.stop(t + 0.55);
        break;
    }
  } catch {}
}

function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const loaded: Profile[] = storageGet("mv_profiles", DEFAULT_PROFILES);
    const valid = Array.isArray(loaded) && loaded.length > 0 ? loaded : DEFAULT_PROFILES;
    return valid.map((p) => ({
      ...p,
      memories: Array.isArray(p?.memories)
        ? p.memories.map((m) => ({
            ...m,
            image: resolveImage(m?.image, m?.title),
          }))
        : [],
    }));
  });
  const [activeId, setActiveId] = useState<string | null>(() =>
    storageGet("mv_active_id", null)
  );

  useEffect(() => {
    if (!Array.isArray(profiles)) return;
    const sanitized = profiles.map((p) => ({
      ...p,
      memories: Array.isArray(p?.memories)
        ? p.memories.map((m) => {
            let cleanImage = m?.image || "";
            if (m?.title?.includes("Bihu")) cleanImage = "bihu-celebration";
            else if (m?.title?.includes("Tea") || m?.title?.includes("Ancestral")) cleanImage = "ancestral-tea-garden";
            else if (m?.title?.includes("Radio") || m?.title?.includes("Bhupen")) cleanImage = "radio-memory";
            else if (m?.title?.includes("Kaziranga")) cleanImage = "kaziranga_rhino_memory.png";
            else if (m?.title?.includes("Majuli")) cleanImage = "majuli_boat_memory.png";
            return { ...m, image: cleanImage };
          })
        : [],
    }));
    storageSet("mv_profiles", sanitized);
  }, [profiles]);
  useEffect(() => storageSet("mv_active_id", activeId), [activeId]);

  const active = profiles.find((p) => p.id === activeId) || null;

  function saveProfile(updated: Profile) {
    setProfiles((prev) => {
      const idx = prev.findIndex((p) => p.id === updated.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [...prev, updated];
    });
  }

  function logout() {
    setActiveId(null);
  }

  function switchTo(id: string) {
    setActiveId(id);
  }

  return { profiles, activeId, active, saveProfile, logout, switchTo };
}

function useDarkTheme() {
  const [dark, setDark] = useState<boolean>(() => storageGet("mv_dark", false));

  useEffect(() => {
    storageSet("mv_dark", dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return { dark, toggleDark: () => setDark((d) => !d) };
}

// ═══════════════════════════════════════════════════════════════════
//  UI COMPONENTS & NAVIGATION SYSTEM
// ═══════════════════════════════════════════════════════════════════

const TOP_LEVEL_SCREENS = new Set<Screen>([
  "home",
  "activities",
  "about-dementia",
  "my-memories",
  "reminders",
  "progress",
  "profile-home",
]);

function BackButton({ onClick, label }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        tone("flip");
        onClick();
      }}
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer border border-[var(--brass)] bg-[var(--oxblood-light)] text-[var(--oxblood-dark)] hover:bg-[var(--brass-light)] shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--oxblood)]"
      aria-label="Go back to previous page"
    >
      <span className="text-base font-black leading-none">←</span>
      <span>{label || "Back"}</span>
    </button>
  );
}

function Btn({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const base =
    "inline-flex items-center justify-center font-extrabold rounded-2xl transition-all duration-200 min-h-[48px] px-5 py-3 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  let vClass = "";
  if (variant === "primary") vClass = "btn-clay-primary border border-[var(--brass)]";
  if (variant === "secondary") vClass = "btn-glass-secondary";
  if (variant === "ghost") vClass = "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-hover)] border border-transparent";
  if (variant === "danger") vClass = "bg-[var(--error)] text-white hover:bg-[var(--error)]/90 border border-red-700 shadow-md";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          tone("flip");
          onClick?.();
        }
      }}
      className={`${base} ${vClass} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
  onClick,
  level = 1,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  level?: 1 | 2 | 3;
}) {
  const levels = {
    1: "clay-card rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] shadow-sm",
    2: "clay-card rounded-3xl bg-[var(--bg-card)] border border-[var(--border-dark)] shadow-md",
    3: "glass-panel rounded-3xl border border-[var(--glass-border)] shadow-xl",
  };

  return (
    <div
      onClick={onClick}
      className={`${levels[level]} ${onClick ? "cursor-pointer hover:border-[var(--oxblood)] transition-all" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SpeakBtn({ text, size = "sm" }: { text: string; size?: "sm" | "md" }) {
  const { speakText, t } = useLanguage();

  return (
    <button
      onClick={() => speakText(text)}
      title={t.voice.readAloud}
      className={`inline-flex items-center gap-2 font-extrabold rounded-xl border border-[var(--border)] bg-[var(--bg-hover)] text-[var(--text-primary)] hover:border-[var(--oxblood)] hover:text-[var(--oxblood-dark)] transition-all cursor-pointer ${
        size === "md" ? "px-4 py-2.5 text-base" : "px-3 py-1.5 text-sm"
      }`}
    >
      <span>🔊</span>
      <span>{t.voice.readAloud}</span>
    </button>
  );
}

function Badge({ children, color = "oxblood" }: { children: React.ReactNode; color?: "oxblood" | "brass" | "mineral" }) {
  const styles = {
    oxblood: "bg-[var(--oxblood-light)] text-[var(--oxblood-dark)] border-[var(--oxblood)]",
    brass: "bg-[var(--brass-light)] text-[var(--brass-dark)] border-[var(--brass)]",
    mineral: "bg-[var(--mineral-light)] text-[var(--mineral-dark)] border-[var(--mineral)]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${styles[color]}`}>
      {children}
    </span>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => { tone("flip"); onChange(!value); }}
      className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 cursor-pointer border ${
        value ? "bg-[var(--oxblood)] border-[var(--brass)]" : "bg-[var(--bg-hover)] border-[var(--border)]"
      }`}
    >
      <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${value ? "translate-x-6" : "translate-x-0"}`} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  NAVBAR
// ═══════════════════════════════════════════════════════════════════

function NavBar({
  screen,
  onNav,
  active,
  onOpenLockModal,
  dark,
  toggleDark,
  isOffline,
  toggleOffline,
}: {
  screen: Screen;
  onNav: (s: Screen, source?: "navbar" | "user") => void;
  active: Profile | null;
  onOpenLockModal: (feature: "memories" | "reminders" | "progress") => void;
  dark: boolean;
  toggleDark: () => void;
  isOffline: boolean;
  toggleOffline: () => void;
}) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const NAV_ITEMS: { label: string; screen: Screen; gated?: boolean; featureKey?: "memories" | "reminders" | "progress" }[] = [
    { label: t.nav.home,          screen: "home" },
    { label: t.nav.activities,    screen: "activities" },
    { label: t.nav.aboutDementia, screen: "about-dementia" },
    { label: t.nav.myMemories,    screen: "my-memories", gated: true, featureKey: "memories" },
    { label: t.nav.reminders,     screen: "reminders",   gated: true, featureKey: "reminders" },
    { label: t.nav.progress,      screen: "progress",    gated: true, featureKey: "progress" },
  ];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function go(s: Screen, gated?: boolean, featureKey?: "memories" | "reminders" | "progress") {
    setMobileOpen(false);
    if (gated && !active) {
      onOpenLockModal(featureKey || "memories");
      return;
    }
    onNav(s, "navbar");
  }

  const currentNativeName = LANGUAGE_METADATA[lang]?.nativeName || lang;

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 pb-1">
      <div className="max-w-7xl mx-auto rounded-2xl px-5 py-3 border border-[var(--border)] shadow-xl flex items-center justify-between transition-colors glass-panel"
           style={{ backgroundColor: "var(--glass-nav-bg)", color: "var(--text-primary)" }}>
        <button onClick={() => go("home")} className="flex items-center gap-3 text-left group cursor-pointer">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 font-extrabold text-white shadow-md border border-[var(--brass)]" style={{ backgroundColor: "var(--oxblood)" }}>
            🧠
          </div>
          <div>
            <div className="text-lg font-black tracking-wider leading-none text-[var(--text-primary)] flex items-center gap-1.5">
              MEMOVERSE <span className="text-[10px] text-[var(--brass)] font-serif italic font-normal">Archival</span>
            </div>
            <div className="text-[10px] font-bold text-[var(--text-muted)] leading-tight mt-1 hidden sm:block">
              Cognitive Companion
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-section)] p-1.5 rounded-xl border border-[var(--border)]">
          {NAV_ITEMS.map((link) => {
            const isActive = screen === link.screen;
            return (
              <button
                key={link.screen}
                onClick={() => go(link.screen, link.gated, link.featureKey)}
                className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--oxblood)] text-[#F3F0E8] shadow-md border border-[var(--brass)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                }`}
              >
                {link.label}
                {link.gated && !active && <span className="ml-1 opacity-50">🔒</span>}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="relative hidden sm:block" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--brass)] transition-colors cursor-pointer"
            >
              <span>🌐</span>
              <span className="truncate max-w-[120px]">{currentNativeName}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl border border-[var(--border)] shadow-2xl py-2 z-50 bg-[var(--bg-card)] text-[var(--text-primary)] anim-fade">
                {Object.entries(LANGUAGE_METADATA).map(([key, meta]) => {
                  const isSelected = lang === key;
                  return (
                    <button
                      key={key}
                      onClick={() => { setLang(key); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                        isSelected ? "bg-[var(--oxblood)] text-white font-extrabold" : "hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {meta.nativeName}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile control button (Always shows "Profile", never "Kamla") */}
          <button
            onClick={() => onNav("profile-home", "navbar")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
              screen === "profile-home"
                ? "bg-[var(--oxblood)] text-white border-[var(--brass)] shadow-md"
                : "border-[var(--brass)] bg-[var(--oxblood-light)] text-[var(--oxblood-dark)] hover:bg-[var(--brass-light)]"
            }`}
            title="Profile & Details"
          >
            <span>{active ? active.avatar : "👤"}</span>
            <span>Profile</span>
          </button>

          <button onClick={() => { tone("flip"); toggleDark(); }} className="p-2 rounded-xl text-sm border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer">
            {dark ? "☀️" : "🌙"}
          </button>

          <button onClick={() => setMobileOpen((o) => !o)} className="lg:hidden p-2 rounded-xl text-base border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] cursor-pointer">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl p-4 border border-[var(--border)] shadow-2xl bg-[var(--bg-card)] text-[var(--text-primary)] space-y-3 anim-slide">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[var(--border)]">
            {NAV_ITEMS.map((link) => (
              <button
                key={link.screen}
                onClick={() => go(link.screen, link.gated, link.featureKey)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-extrabold cursor-pointer ${
                  screen === link.screen ? "bg-[var(--oxblood)] text-white border border-[var(--brass)]" : "bg-[var(--bg-section)] text-[var(--text-primary)] border border-[var(--border)]"
                }`}
              >
                {link.label} {link.gated && !active && "🔒"}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <button onClick={toggleOffline} className="px-3 py-2 rounded-xl text-xs font-bold border border-[var(--border)] bg-[var(--bg-hover)] text-left cursor-pointer">
              {isOffline ? "🔴 Offline Active" : "🟢 Online"}
            </button>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-extrabold border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer"
            >
              {Object.entries(LANGUAGE_METADATA).map(([key, meta]) => (
                <option key={key} value={key}>🌐 {meta.nativeName}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  AI RECOMMENDATION CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

function AIRecommendationCard({ onNav }: { onNav: (s: Screen) => void }) {
  const { t } = useLanguage();
  const rec = getAIRecommendation();

  const gameToScreenMap: Record<string, Screen> = {
    "memory_match": "game-memory",
    "whats_missing": "game-whats-missing",
    "pattern_recognition": "game-pattern",
    "jigsaw_puzzle": "game-jigsaw",
    "kaziranga_puzzle": "game-kaziranga-puzzle",
    "sorting_game": "game-bazaar",
    "daily_routine": "game-routine",
    "word_puzzles": "game-word",
    "dice_activity": "game-dice",
    "board_game": "game-board",
    "sound_rec": "game-sound-rec",
    "interactive_stories": "game-interactive",
    "memory_lane": "game-memory-lane",
  };

  const targetScreen = gameToScreenMap[rec.recommendedGameId] || "game-memory";
  const levelLabels: Record<number, string> = {
    1: "LEVEL 1 · Easy",
    2: "LEVEL 2 · Medium",
    3: "LEVEL 3 · Hard",
    4: "LEVEL 4 · Advanced",
  };

  const levelName = levelLabels[rec.recommendedLevel] || `LEVEL ${rec.recommendedLevel}`;
  const userReason = rec.reasonDefault;

  return (
    <Card className="p-6 sm:p-8 bg-gradient-to-r from-[var(--oxblood-light)] via-[var(--bg-card)] to-[var(--brass-light)] border border-[var(--oxblood)] shadow-lg rounded-3xl relative overflow-hidden">
      <style>{`
        .rec-level-badge {
          color: #4D2926 !important;
        }
        .dark .rec-level-badge,
        html.dark .rec-level-badge {
          color: #000000 !important;
        }
      `}</style>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1 bg-[var(--oxblood)] text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <span>🤖</span> {t.ai?.recommendedForYou || "Recommended for You"}
            </span>
            <span className="rec-level-badge text-xs font-black bg-white/90 px-3 py-1 rounded-full border border-[var(--oxblood)] shadow-xs">
              {levelName}
            </span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              {rec.recommendedGameTitle}
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium mt-1.5 leading-relaxed">
              "{userReason}"
            </p>
          </div>
        </div>
        <Btn
          onClick={() => onNav(targetScreen)}
          variant="primary"
          className="text-base px-7 py-3.5 shadow-lg group cursor-pointer whitespace-nowrap shrink-0"
        >
          {t.ai?.playNow || "Play Now"} →
        </Btn>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  HOMEPAGE
// ═══════════════════════════════════════════════════════════════════

function HomeScreen({ onNav, active, onSwitchProfile }: { onNav: (s: Screen) => void; active: Profile | null; onSwitchProfile: () => void }) {
  const { lang, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      {active ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div className="rounded-2xl p-4 border border-[var(--oxblood)] bg-[var(--oxblood-light)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{active.avatar}</span>
              <div>
                <div className="font-extrabold text-base text-[var(--oxblood-dark)]">{t.profile.welcomeBack}, {active.name}!</div>
                <div className="text-xs font-bold text-[var(--text-secondary)]">{active.language} · Level {active.activities.level} · {active.activities.completed} {t.activities.completed}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Btn onClick={() => onNav("profile-home")} variant="primary" className="text-xs px-4 py-2 min-h-[36px]">Dashboard</Btn>
              <Btn onClick={onSwitchProfile} variant="ghost" className="text-xs px-3 py-2 min-h-[36px]">Switch</Btn>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div className="rounded-2xl p-4 border border-[var(--brass)] bg-[var(--brass-light)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✨</span>
              <div>
                <div className="font-extrabold text-base text-[var(--brass-dark)]">Welcome to MEMOVERSE Archival</div>
                <div className="text-xs font-bold text-[var(--text-secondary)]">Explore cognitive activities freely or create a profile to save personal memories.</div>
              </div>
            </div>
            <Btn onClick={() => onNav("start-journey")} variant="primary" className="text-xs px-4 py-2 min-h-[36px]">✨ {t.profile.startJourney}</Btn>
          </div>
        </div>
      )}

      {/* AI Recommendation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <AIRecommendationCard onNav={onNav} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-2">
        <div className="rounded-3xl bg-[var(--bg-section)] text-[var(--text-primary)] p-8 sm:p-14 border border-[var(--border)] shadow-xl relative overflow-hidden space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--border)] relative z-10">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge color="oxblood">🌿 Senior Dignity</Badge>
                <Badge color="brass">Archival Companion</Badge>
                <Badge color="mineral">🌐 {LANGUAGE_METADATA[lang]?.nativeName || lang}</Badge>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-[var(--text-primary)]">
                {t.home.title} <br />
                <span className="italic font-serif font-normal text-[var(--oxblood)]">{t.home.titleAccent}</span>
              </h1>
            </div>
            <div className="max-w-md space-y-5">
              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium leading-relaxed">
                {t.home.heroDescription}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Btn onClick={() => onNav("activities")} variant="primary" className="text-base px-7 py-4">{t.home.exploreActivities}</Btn>
                <Btn onClick={() => onNav("about-dementia")} variant="secondary" className="text-base px-6 py-4">{t.home.caregiverGuide}</Btn>
                <SpeakBtn text={`${t.home.title} ${t.home.titleAccent}. ${t.home.heroDescription}`} size="md" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-[var(--border)] shadow-xl relative group min-h-[360px] sm:min-h-[440px]">
              <img src={resolveImage(heroElderlyImg)} alt="Senior elder in peaceful morning home setting" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={handleImageError} />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(37,44,48,0.88)] via-[rgba(37,44,48,0.2)] to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-black/50 backdrop-blur-md border border-white/30 text-white dark:text-[var(--brass)]">
                  <span>📸</span> {t.home.heroBadge}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black !text-white leading-tight">{t.home.heroTagline}</h2>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-5 justify-start">
              <div onClick={() => onNav("game-sounds")} className="rounded-3xl p-6 bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--oxblood)] transition-all cursor-pointer group flex flex-col justify-start shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--oxblood)] border border-[var(--brass)] flex items-center justify-center text-2xl text-white shadow-md">🎧</div>
                  <span className="text-xs font-black uppercase tracking-wider text-[var(--oxblood-dark)] bg-[var(--oxblood-light)] px-3 py-1 rounded-full border border-[var(--oxblood)]">Audio Lounge</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--oxblood)] transition-colors">{t.home.soundsCardTitle}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed font-medium">{t.home.soundsCardDesc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border)] text-xs font-black text-[var(--oxblood-dark)] flex items-center justify-between">
                  <span>{t.home.soundsCardAction}</span>
                </div>
              </div>

              <div onClick={() => onNav("my-memories")} className="rounded-3xl p-6 bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--brass)] transition-all cursor-pointer group flex flex-col justify-start shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--brass-light)] border border-[var(--brass)] flex items-center justify-center text-2xl text-[var(--brass-dark)] shadow-sm">📸</div>
                  <span className="text-xs font-bold text-[var(--text-muted)]">Personal Space</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--brass-dark)] transition-colors">{t.home.keepsakeCardTitle}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed font-medium">{t.home.keepsakeCardDesc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border)] text-xs font-black text-[var(--text-primary)] flex items-center justify-between">
                  <span>{t.home.keepsakeCardAction}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div>
              <Badge color="oxblood">🎮 {t.activities.title}</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mt-1">{t.activities.subtitle}</h2>
            </div>
            <Btn onClick={() => onNav("activities")} variant="secondary" className="text-sm py-2.5 px-5">View All Activities →</Btn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🧠", title: t.activities.memoryMatch, desc: t.activities.memoryMatchDesc, screen: "game-memory" as Screen, tag: t.activities.catMatching },
              { icon: "🎧", title: t.activities.soundLounge, desc: t.activities.soundLoungeDesc, screen: "game-sounds" as Screen, tag: t.activities.catListening },
              { icon: "🛒", title: t.activities.marketMemory, desc: t.activities.marketMemoryDesc, screen: "game-market" as Screen, tag: t.activities.catEveryday },
              { icon: "📖", title: t.activities.storyRecall, desc: t.activities.storyRecallDesc, screen: "game-story" as Screen, tag: t.activities.catStorytelling },
            ].map((g) => (
              <Card key={g.title} className="p-6 flex flex-col justify-between gap-4 hover:border-[var(--oxblood)] transition-all group cursor-pointer" onClick={() => onNav(g.screen)}>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--oxblood-light)] border border-[var(--oxblood)] flex items-center justify-center text-2xl">{g.icon}</div>
                  <div>
                    <h3 className="font-extrabold text-xl text-[var(--text-primary)] group-hover:text-[var(--oxblood)] transition-colors">{g.title}</h3>
                    <span className="text-xs font-black uppercase text-[var(--oxblood-dark)]">{g.tag}</span>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed font-medium">{g.desc}</p>
                  </div>
                </div>
                <div className="text-xs font-extrabold text-[var(--oxblood-dark)] pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <span>{t.activities.playNow}</span>
                  <span>→</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Keepsake Memories Gallery Section on Homepage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div>
              <Badge color="brass">📸 Keepsake Memory Vault</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mt-1">{t.home.keepsakeCardTitle}</h2>
              <p className="text-sm text-[var(--text-secondary)] font-medium mt-1">{t.home.keepsakeCardDesc}</p>
            </div>
            <Btn onClick={() => onNav("my-memories")} variant="primary" className="text-sm py-2.5 px-5">Open Memory Album →</Btn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Bihu Celebration in Jorhat",
                desc: "Dancing Bihu with my family near our village mustard fields. The dhol beats filled the warm spring air.",
                image: bihuCelebrationImg,
                tag: "Family Celebration",
                emoji: "👨‍👩‍👧",
              },
              {
                title: "Our Ancestral Tea Garden",
                desc: "The wooden tea estate house where I grew up in Upper Assam. Morning mist and fresh brewed chai.",
                image: teaGardenImg,
                tag: "Heritage Places",
                emoji: "🏡",
              },
              {
                title: "Bhupen Hazarika on the Radio",
                desc: "Listening to the golden voice of Bhupen da on the morning radio every Sunday with my parents.",
                image: vintageRadioImg,
                tag: "Cultural Moments",
                emoji: "🎵",
              },
            ].map((m) => (
              <div key={m.title} onClick={() => onNav("my-memories")} className="clay-card rounded-3xl p-5 space-y-4 border border-[var(--border)] bg-[var(--bg-card)] flex flex-col justify-between cursor-pointer hover:border-[var(--oxblood)] transition-all group shadow-sm">
                <div className="space-y-3">
                  <div className="h-48 sm:h-52 rounded-2xl overflow-hidden border border-[var(--border)] relative">
                    <img src={resolveImage(m.image, m.title)} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={handleImageError} />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                      <span>{m.emoji}</span> {m.tag}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--oxblood)] transition-colors">{m.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed font-medium">{m.desc}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-black text-[var(--oxblood-dark)]">
                  <span>View Full Memory</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  ACTIVITIES & OTHER PAGES
// ═══════════════════════════════════════════════════════════════════

function ActivitiesScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const CATEGORIES = ["All", "Memory", "Attention & Recognition", "Visual-Spatial", "Routine & Sequencing", "Logic & Categorization"];

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
  ];

  const filteredGames = activeCategory === "All" ? ALL_GAMES : ALL_GAMES.filter((g) => g.category === activeCategory);

  return (
    <div className="min-h-screen pb-24 space-y-12">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        <div className="text-center space-y-3">
          <Badge color="brass">🎮 Complete 16-Activity Cognitive Library</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[var(--text-primary)]">{t.activities.title}</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto font-medium">{t.activities.subtitle}</p>
        </div>

        {/* AI Recommended Activity Header */}
        <AIRecommendationCard onNav={onNav} />

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-2 border-b border-[var(--border)]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer border ${
                activeCategory === cat
                  ? "bg-[var(--oxblood)] text-white border-[var(--brass)] shadow-md scale-105"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--oxblood)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((item) => (
            <Card key={item.title} className="p-6 space-y-4 hover:border-[var(--oxblood)] transition-all cursor-pointer flex flex-col justify-between" onClick={() => onNav(item.screen)}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{item.icon}</span>
                  <Badge color="oxblood">{item.tag}</Badge>
                </div>
                <h2 className="text-xl font-black text-[var(--text-primary)]">{item.title}</h2>
                <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed">{item.desc}</p>
              </div>
              <Btn variant="primary" fullWidth className="mt-2 py-2.5 text-sm">{t.activities.playNow || "Play Now"} →</Btn>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function AboutDementiaScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-24 space-y-12">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 text-center space-y-4">
        <Badge color="oxblood">🧠 Caregiver Guidance &amp; Awareness</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-[var(--text-primary)] tracking-tight">{t.aboutDementia.title}</h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-medium">{t.aboutDementia.subtitle}</p>
        <div className="pt-2">
          <SpeakBtn text={`${t.aboutDementia.title}. ${t.aboutDementia.whatIsDesc}`} size="md" />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="rounded-3xl overflow-hidden border border-[var(--border)] shadow-md h-56 sm:h-72 relative">
          <img src={resolveImage("Empathetic Care & Daily Companionship")} alt="Empathetic Care & Daily Companionship" className="w-full h-full object-cover" onError={handleImageError} />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,27,30,0.75)] via-transparent to-transparent flex items-end p-6">
            <span className="text-white font-extrabold text-lg sm:text-xl">Empathetic Care &amp; Daily Companionship</span>
          </div>
        </div>

        <Card className="p-8 space-y-4 bg-[var(--bg-section)]">
          <h2 className="text-2xl font-black text-[var(--text-primary)]">{t.aboutDementia.whatIsDementia}</h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed font-medium">{t.aboutDementia.whatIsDesc}</p>
        </Card>

        <Card className="p-8 space-y-5 bg-[var(--bg-card)]">
          <h2 className="text-2xl font-black text-[var(--text-primary)]">{t.aboutDementia.keySigns}</h2>
          <ul className="space-y-3">
            {t.aboutDementia.signsList.map((sign, idx) => (
              <li key={idx} className="flex items-start gap-3 text-base text-[var(--text-secondary)] font-semibold">
                <span className="w-6 h-6 rounded-full bg-[var(--oxblood-light)] text-[var(--oxblood-dark)] border border-[var(--oxblood)] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">✓</span>
                {sign}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-8 space-y-5 bg-[var(--bg-section)]">
          <h2 className="text-2xl font-black text-[var(--text-primary)]">{t.aboutDementia.caregiverTips}</h2>
          <ul className="space-y-3">
            {t.aboutDementia.tipsList.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 text-base text-[var(--text-secondary)] font-semibold">
                <span className="w-6 h-6 rounded-full bg-[var(--brass-light)] text-[var(--brass-dark)] border border-[var(--brass)] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        <div className="text-center p-8 rounded-3xl bg-[var(--oxblood-light)] border border-[var(--oxblood)] space-y-4">
          <h3 className="text-2xl font-black text-[var(--oxblood-dark)]">{t.aboutDementia.emergencySupport}</h3>
          <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto font-medium">{t.aboutDementia.helplineNote}</p>
          <Btn onClick={() => onNav("activities")} variant="primary" className="px-8 py-4">{t.home.exploreActivities} →</Btn>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  SETTINGS & ACCESSIBILITY SCREEN
// ═══════════════════════════════════════════════════════════════════

function MoreScreen({
  active,
  onSwitchProfile,
  isOffline,
  toggleOffline,
}: {
  onNav: (s: Screen) => void;
  active: Profile | null;
  onSwitchProfile: () => void;
  isOffline: boolean;
  toggleOffline: () => void;
}) {
  const { lang, setLang, t, voiceStatus } = useLanguage();
  const [spoken, setSpoken] = useState(true);
  const [largeText, setLargeText] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="min-h-screen pb-24 space-y-8">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        <div>
          <Badge color="brass">⚙️ {t.nav.settings}</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-1">{t.settings.title}</h1>
          <p className="text-base text-[var(--text-secondary)] font-medium">{t.settings.subtitle}</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{active ? active.avatar : "👤"}</span>
              <div>
                <h3 className="text-xl font-black text-[var(--text-primary)]">{active ? active.name : "Guest Mode"}</h3>
                <p className="text-xs text-[var(--text-muted)] font-bold">{active ? `${active.language} · Age ${active.age}` : "No active profile"}</p>
              </div>
            </div>
            <Btn onClick={onSwitchProfile} variant="primary" className="text-xs py-2 px-4">{t.profile.switchProfile}</Btn>
          </div>
        </Card>

        {/* 22 Scheduled Languages Selection Grid */}
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-black text-[var(--text-primary)]">{t.settings.language} ({Object.keys(LANGUAGE_METADATA).length} Available)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(LANGUAGE_METADATA).map(([key, meta]) => {
              const isSelected = lang === key;
              return (
                <button
                  key={key}
                  onClick={() => setLang(key)}
                  className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[var(--oxblood)] border-[var(--brass)] text-white shadow-md scale-[1.02]"
                      : "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--oxblood)]"
                  }`}
                >
                  <div className="font-extrabold text-xs truncate">{meta.nativeName}</div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-section)] border border-[var(--border)] text-xs font-semibold leading-relaxed text-[var(--text-secondary)]">
            <div className="font-bold text-[var(--text-primary)] mb-1">{t.settings.voiceStatusTitle} ({LANGUAGE_METADATA[lang]?.nativeName})</div>
            {voiceStatus.voiceAvailable ? (
              <span className="text-emerald-700 font-extrabold">{t.settings.voiceAvailable}</span>
            ) : (
              <span className="text-amber-800 font-bold">{t.settings.voiceUnavailable}</span>
            )}
          </div>
        </Card>

        <Card className="p-6 space-y-4 divide-y divide-[var(--border)]">
          <h2 className="text-xl font-black text-[var(--text-primary)] pb-2">{t.settings.accessibility}</h2>
          {[
            { icon: "🔊", label: t.settings.spokenGuidance, val: spoken, set: setSpoken },
            { icon: "🔤", label: t.settings.largeText, val: largeText, set: setLargeText },
            { icon: "◑",  label: t.settings.highContrast,  val: highContrast, set: setHighContrast },
          ].map(({ icon, label, val, set }) => (
            <div key={label} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 font-extrabold text-base text-[var(--text-primary)]">
                <span>{icon}</span> {label}
              </div>
              <Toggle value={val} onChange={set} label={label} />
            </div>
          ))}
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <div className="font-black text-lg text-[var(--text-primary)]">{t.settings.offlineSimulation}</div>
            <div className="text-xs text-[var(--text-muted)] font-medium">{t.settings.offlineDesc}</div>
          </div>
          <Btn onClick={toggleOffline} variant={isOffline ? "danger" : "secondary"}>
            {isOffline ? "🔴 Offline Mode" : "🟢 Online Normal"}
          </Btn>
        </Card>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  OTHER SCREENS (GameMemory, GameSounds, Memories, Reminders, Progress)
// ═══════════════════════════════════════════════════════════════════

function GameMemoryScreen({ onNav, onBack, active, onProgress }: { onNav: (s: Screen) => void; onBack?: () => void; active: Profile | null; onProgress: () => void }) {
  const { t } = useLanguage();
  const [level, setLevel] = useState<number>(() => getUnlockedLevel("memory_match"));
  const unlockedLevel = getUnlockedLevel("memory_match");

  const ALL_ITEMS = [
    { id: "1", emoji: "🍃", label: "Tea Leaf" },
    { id: "2", emoji: "🦏", label: "Rhino" },
    { id: "3", emoji: "🎋", label: "Bamboo" },
    { id: "4", emoji: "🛶", label: "Boat" },
    { id: "5", emoji: "🧶", label: "Eri Silk" },
    { id: "6", emoji: "🌸", label: "Orchid" },
    { id: "7", emoji: "🫖", label: "Tea Pot" },
    { id: "8", emoji: "🧺", label: "Basket" },
    { id: "9", emoji: "🐦", label: "Hornbill" },
    { id: "10", emoji: "🥁", label: "Bihu Dhol" },
  ];

  const targetPairCount = level === 1 ? 3 : level === 2 ? 5 : level === 3 ? 8 : 10;
  const activeItems = ALL_ITEMS.slice(0, targetPairCount);

  const [cards, setCards] = useState<{ id: number; itemId: string; emoji: string; label: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [won, setWon] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [victoryData, setVictoryData] = useState<{ feedbackMessage?: string; unlockedNewLevel?: boolean; nextRecommendedLevel?: number } | null>(null);

  const initGame = useCallback(() => {
    const doubled = [...activeItems, ...activeItems].map((item, idx) => ({
      id: idx, itemId: item.id, emoji: item.emoji, label: item.label, flipped: false, matched: false,
    }));
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    setCards(doubled); setFlipped([]); setMoves(0); setMatched(0); setWon(false); setStartTime(Date.now()); setVictoryData(null);
  }, [level]);

  useEffect(() => { initGame(); }, [initGame]);

  function flip(id: number) {
    if (flipped.length === 2 || cards.find((c) => c.id === id)?.flipped || cards.find((c) => c.id === id)?.matched) return;
    tone("flip");
    const nextFlipped = [...flipped, id];
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      const [first, second] = nextFlipped;
      const c1 = cards.find((c) => c.id === first);
      const c2 = cards.find((c) => c.id === second);

      if (c1 && c2 && c1.itemId === c2.itemId) {
        tone("correct");
        setCards((prev) => prev.map((c) => (c.id === first || c.id === second ? { ...c, matched: true } : c)));
        setMatched((m) => {
          const nextVal = m + 1;
          if (nextVal === activeItems.length) {
            setWon(true);
            const duration = Math.round((Date.now() - startTime) / 1000);
            const accuracy = Math.max(0, Math.min(100, Math.round((targetPairCount / Math.max(targetPairCount, nextMoves)) * 100)));
            const res = recordGamePerformance({
              gameId: "memory_match",
              gameTitle: "Memory Photo Match",
              skill: "Memory",
              accuracy,
              correctAnswers: targetPairCount,
              totalQuestions: targetPairCount,
              attempts: nextMoves,
              completionTime: duration,
              hintsUsed: 0,
              retries: 0,
              level,
              timestamp: Date.now(),
              completed: true,
            });
            onProgress();
            setVictoryData({
              feedbackMessage: res.feedbackMessage,
              unlockedNewLevel: res.unlockedNewLevel,
              nextRecommendedLevel: res.nextRecommendedLevel,
            });
          }
          return nextVal;
        });
        setFlipped([]);
      } else {
        tone("wrong");
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === first || c.id === second ? { ...c, flipped: false } : c)));
          setFlipped([]);
        }, 900);
      }
    }
  }

  if (won) {
    return (
      <GameVictoryModal
        title="Memory Match Complete!"
        score={`${moves} moves (${Math.round((targetPairCount / Math.max(targetPairCount, moves)) * 100)}% accuracy)`}
        feedbackMessage={victoryData?.feedbackMessage}
        unlockedNewLevel={victoryData?.unlockedNewLevel}
        nextRecommendedLevel={victoryData?.nextRecommendedLevel}
        currentLevel={level}
        onReplay={initGame}
        onNextLevel={(nextLvl) => { setLevel(nextLvl); initGame(); }}
        onBack={onBack}
        onNav={onNav}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6 space-y-6">
      <AdaptiveGameHeader
        gameId="memory_match"
        title={t.games.memoryMatchTitle || "Memory Photo Match"}
        subtitle={t.games.memoryMatchDesc || "Turn over photos to find matching pairs and train visual memory."}
        level={level}
        setLevel={setLevel}
        unlockedLevel={unlockedLevel}
        onBack={onBack}
        onNav={onNav}
      />

      <div className="max-w-xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <Card className="px-4 py-2 text-sm font-bold text-[var(--text-primary)]">
            {t.games.matches || "Matches"}: {matched} / {activeItems.length}
          </Card>
          <Card className="px-4 py-2 text-sm font-bold text-[var(--text-primary)]">
            {t.games.moves || "Moves"}: {moves}
          </Card>
          <Btn onClick={initGame} variant="secondary" className="text-xs py-1.5 px-3">
            🔄 Reset
          </Btn>
        </div>

        <div className={`grid gap-3 ${targetPairCount <= 3 ? "grid-cols-3" : targetPairCount <= 5 ? "grid-cols-4" : "grid-cols-4 sm:grid-cols-5"}`}>
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => flip(card.id)}
              className="aspect-square rounded-2xl flex flex-col items-center justify-center border-2 transition-all active:scale-95 shadow-sm cursor-pointer"
              style={{
                backgroundColor: card.matched ? "var(--success-light)" : card.flipped ? "var(--bg-card)" : "var(--oxblood)",
                borderColor: card.matched ? "var(--success)" : card.flipped ? "var(--border-dark)" : "var(--oxblood-dark)",
              }}
            >
              {card.flipped || card.matched ? (
                <>
                  <span className="text-3xl sm:text-4xl">{card.emoji}</span>
                  <span className="text-[10px] font-black uppercase text-[var(--text-muted)] mt-1 truncate max-w-full">{card.label}</span>
                </>
              ) : (
                <span className="text-3xl font-black text-white">?</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function GameSoundsScreen({ onNav, onBack, active, onProgress }: { onNav: (s: Screen) => void; onBack?: () => void; active: Profile | null; onProgress: () => void }) {
  const { t, speakText } = useLanguage();
  const [playing, setPlaying] = useState<string | null>(null);

  const soundsList = [
    { title: t.sounds.soundGogona, desc: t.sounds.soundGogonaDesc, icon: "🪕", type: "gogona" as const },
    { title: t.sounds.soundBihu, desc: t.sounds.soundBihuDesc, icon: "🥁", type: "dhol" as const },
    { title: t.sounds.soundBirdsong, desc: t.sounds.soundBirdsongDesc, icon: "🐦", type: "bird" as const },
    { title: t.sounds.soundChai, desc: t.sounds.soundChaiDesc, icon: "☕", type: "bell" as const },
  ];

  function handlePlay(s: typeof soundsList[0]) {
    setPlaying(s.title);
    tone(s.type);
    speakText(s.title);
    onProgress();
    setTimeout(() => setPlaying(null), 2000);
  }

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="space-y-2 text-center">
          <button onClick={onBack || (() => onNav("activities"))} className="text-sm font-bold text-[var(--text-muted)] cursor-pointer hover:underline">
            {t.games.backToActivities}
          </button>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)]">{t.sounds.title}</h1>
          <p className="text-base text-[var(--text-secondary)] font-medium max-w-lg mx-auto">{t.sounds.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {soundsList.map((s) => (
            <Card key={s.title} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[var(--oxblood-light)] border border-[var(--oxblood)] flex items-center justify-center text-3xl">{s.icon}</div>
                <div>
                  <h3 className="font-extrabold text-xl text-[var(--text-primary)]">{s.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1 font-medium">{s.desc}</p>
                </div>
              </div>
              <Btn onClick={() => handlePlay(s)} variant={playing === s.title ? "primary" : "secondary"} fullWidth className="text-sm py-2.5">
                {playing === s.title ? t.sounds.playing : t.sounds.listen}
              </Btn>
            </Card>
          ))}
        </div>

        {!active && <StartYourJourneyCTA onNav={onNav} />}
      </div>
    </div>
  );
}

function GameMarketScreen({ onNav, onBack, active, onProgress }: { onNav: (s: Screen) => void; onBack?: () => void; active: Profile | null; onProgress: () => void }) {
  const { t } = useLanguage();
  const [basket, setBasket] = useState<string[]>([]);
  const items = [t.games.itemTea, t.games.itemBamboo, t.games.itemLemon, t.games.itemSweets, t.games.itemOil, t.games.itemFish];

  function toggle(item: string) {
    tone("flip");
    setBasket((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
    if (basket.length + 1 >= 3) onProgress();
  }

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="max-w-2xl mx-auto px-4 space-y-6 text-center">
        <button onClick={onBack || (() => onNav("activities"))} className="text-sm font-bold text-[var(--text-muted)] cursor-pointer hover:underline">
          {t.games.backToActivities}
        </button>
        <h1 className="text-3xl font-black text-[var(--text-primary)]">{t.games.marketTitle}</h1>
        <p className="text-base text-[var(--text-secondary)] font-medium">{t.games.marketDesc}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
          {items.map((item) => {
            const inBasket = basket.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggle(item)}
                className={`p-5 rounded-2xl border-2 font-extrabold text-sm transition-all cursor-pointer ${
                  inBasket ? "bg-[var(--oxblood)] border-[var(--brass)] text-white scale-105 shadow-md" : "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--oxblood)]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <Card className="p-6 text-left space-y-2 bg-[var(--bg-section)]">
          <div className="text-xs font-black uppercase text-[var(--oxblood-dark)]">{t.games.itemsBought} ({basket.length})</div>
          <div className="text-base font-extrabold text-[var(--text-primary)]">
            {basket.length > 0 ? basket.join(", ") : "Basket empty."}
          </div>
        </Card>

        {basket.length >= 3 && !active && <StartYourJourneyCTA onNav={onNav} />}
      </div>
    </div>
  );
}

function GameStoryScreen({ onNav, onBack, active, onProgress }: { onNav: (s: Screen) => void; onBack?: () => void; active: Profile | null; onProgress: () => void }) {
  const { t } = useLanguage();
  const [ans, setAns] = useState<string | null>(null);

  function answer(opt: string) {
    setAns(opt);
    if (opt === t.games.optMuga) {
      tone("correct");
      onProgress();
    } else {
      tone("wrong");
    }
  }

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <div className="space-y-2 text-center">
          <button onClick={onBack || (() => onNav("activities"))} className="text-sm font-bold text-[var(--text-muted)] cursor-pointer hover:underline">
            {t.games.backToActivities}
          </button>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">{t.games.storyTitle}</h1>
          <p className="text-base text-[var(--text-secondary)] font-medium">{t.games.storyDesc}</p>
        </div>

        <Card className="p-6 space-y-4 bg-[var(--bg-card)]">
          <div className="flex items-center justify-between">
            <Badge color="brass">📖 Folk Tale</Badge>
            <SpeakBtn text={t.games.storyPassage} />
          </div>
          <p className="text-lg leading-relaxed font-serif italic text-[var(--text-primary)]">
            &quot;{t.games.storyPassage}&quot;
          </p>
        </Card>

        <Card className="p-6 space-y-4 bg-[var(--bg-section)]">
          <h3 className="font-black text-lg text-[var(--text-primary)]">{t.games.storyQuestion}</h3>
          <div className="grid grid-cols-2 gap-3">
            {[t.games.optMuga, t.games.optCotton, t.games.optWool, t.games.optJute].map((opt) => (
              <button
                key={opt}
                onClick={() => answer(opt)}
                className={`p-3 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer ${
                  ans === opt
                    ? opt === t.games.optMuga
                      ? "bg-[var(--success)] text-white border-green-700"
                      : "bg-[var(--error)] text-white border-red-700"
                    : "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--oxblood)]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {ans === t.games.optMuga && (
            <div className="p-3 rounded-xl bg-[var(--success-light)] border border-[var(--success)] text-[var(--success)] font-extrabold text-sm text-center">
              {t.games.correctMsg}
            </div>
          )}
        </Card>

        {ans === t.games.optMuga && !active && <StartYourJourneyCTA onNav={onNav} />}
      </div>
    </div>
  );
}

function MyMemoriesScreen({ profile, onUpdate }: { profile: Profile; onUpdate: (p: Profile) => void }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState<"family" | "places" | "moments">("family");

  const filtered = filter === "all" ? profile.memories : profile.memories.filter((m) => m.category === filter);

  function addMemory() {
    if (!title.trim()) return;
    const newM: Memory = {
      id: "mem_" + Date.now(),
      title: title.trim(),
      description: desc.trim() || "A cherished personal memory.",
      category: cat,
      emoji: cat === "family" ? "👨‍👩‍👧" : cat === "places" ? "🏡" : "🎵",
      date: "Just now",
      image: defaultMemoryCoverImg,
    };
    onUpdate({ ...profile, memories: [newM, ...profile.memories] });
    setTitle(""); setDesc(""); setShowAdd(false);
  }

  function remove(id: string) {
    onUpdate({ ...profile, memories: profile.memories.filter((m) => m.id !== id) });
  }

  return (
    <div className="min-h-screen pb-24 pt-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Badge color="brass">📸 Keepsakes</Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-1">{t.memories.title}</h1>
            <p className="text-base text-[var(--text-secondary)] font-medium">{t.memories.subtitle}</p>
          </div>
          <Btn onClick={() => setShowAdd(true)} variant="primary" className="px-6 py-3">{t.memories.addMemory}</Btn>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: "all", label: t.memories.allCategories },
            { id: "family", label: t.memories.family },
            { id: "places", label: t.memories.places },
            { id: "moments", label: t.memories.moments },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter === c.id ? "bg-[var(--oxblood)] text-white border border-[var(--brass)] shadow-sm" : "bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => (
            <div key={m.id} className="clay-card rounded-3xl p-6 space-y-4 border border-[var(--border)] bg-[var(--bg-card)] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-xs font-bold text-[var(--text-muted)]">{m.date}</span>
                </div>
                {m.image && (
                  <div className="h-40 rounded-2xl overflow-hidden border border-[var(--border)]">
                    <img src={resolveImage(m.image, m.title)} alt={m.title} className="w-full h-full object-cover" onError={handleImageError} />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-black text-[var(--text-primary)]">{m.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed font-medium">{m.description}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <SpeakBtn text={`${m.title}. ${m.description}`} />
                <button onClick={() => remove(m.id)} className="text-xs font-bold text-[var(--error)] hover:underline cursor-pointer">{t.memories.deleteMemory}</button>
              </div>
            </div>
          ))}
        </div>

        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm anim-fade">
            <Card className="w-full max-w-md p-6 space-y-5 border border-[var(--glass-border)] shadow-2xl bg-[var(--bg-card)]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-[var(--text-primary)]">{t.memories.modalTitle}</h2>
                <button onClick={() => setShowAdd(false)} className="text-lg font-bold text-[var(--text-muted)] cursor-pointer">✕</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase text-[var(--text-muted)]">{t.memories.modalTitleLabel}</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 mt-1" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase text-[var(--text-muted)]">{t.memories.modalDescLabel}</label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Description..." className="w-full p-3 mt-1" />
                </div>
                <div className="flex gap-3 pt-2">
                  <Btn onClick={addMemory} variant="primary" fullWidth>{t.memories.saveMemory}</Btn>
                  <Btn onClick={() => setShowAdd(false)} variant="secondary" fullWidth>{t.memories.cancel}</Btn>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function RemindersScreen({ profile, onUpdate }: { profile: Profile; onUpdate: (p: Profile) => void }) {
  const { t } = useLanguage();
  const [text, setText] = useState("");

  function add() {
    if (!text.trim()) return;
    const newR: Reminder = { id: "rem_" + Date.now(), time: "Today", text: text.trim(), done: false };
    onUpdate({ ...profile, reminders: [...profile.reminders, newR] });
    setText("");
  }

  function toggle(id: string) {
    onUpdate({ ...profile, reminders: profile.reminders.map((r) => (r.id === id ? { ...r, done: !r.done } : r)) });
  }

  function remove(id: string) {
    onUpdate({ ...profile, reminders: profile.reminders.filter((r) => r.id !== id) });
  }

  return (
    <div className="min-h-screen pb-24 pt-8">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <div>
          <Badge color="oxblood">🔔 {t.reminders.title}</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-1">{t.reminders.todaySchedule}</h1>
          <p className="text-base text-[var(--text-secondary)] font-medium">Schedule for {profile.name}</p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex gap-3">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={t.reminders.inputPlaceholder} className="flex-1 p-3" />
            <Btn onClick={add} variant="primary">{t.reminders.add}</Btn>
          </div>
        </Card>

        <div className="space-y-3">
          {profile.reminders.map((r) => (
            <Card key={r.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button onClick={() => toggle(r.id)} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm cursor-pointer ${r.done ? "bg-[var(--success)] text-white border-green-700" : "border-[var(--border)] bg-[var(--bg-input)]"}`}>
                  {r.done ? "✓" : ""}
                </button>
                <div>
                  <div className={`text-base font-extrabold ${r.done ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}>{r.text}</div>
                  <div className="text-xs text-[var(--text-muted)] font-bold">{r.time}</div>
                </div>
              </div>
              <button onClick={() => remove(r.id)} className="text-xs font-bold text-[var(--error)] hover:underline cursor-pointer">{t.reminders.delete}</button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressScreen({ profile }: { profile: Profile; onNav: (s: Screen) => void }) {
  const { t } = useLanguage();
  const gameRecords = getGameRecords();
  const skillProfiles = getSkillProfiles();

  return (
    <div className="min-h-screen pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div>
          <Badge color="brass">📊 Journey Summary</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-1">{t.progress.title}</h1>
          <p className="text-base text-[var(--text-secondary)] font-medium">{t.progress.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <Card className="p-6 text-center space-y-2">
            <div className="text-4xl font-black text-[var(--oxblood-dark)]">{profile.activities.completed}</div>
            <div className="text-xs font-bold text-[var(--text-muted)]">{t.progress.activitiesCompleted}</div>
          </Card>

          <Card className="p-6 text-center space-y-2">
            <div className="text-4xl font-black text-[var(--oxblood-dark)]">Level {profile.activities.level}</div>
            <div className="text-xs font-bold text-[var(--text-muted)]">{t.progress.currentLevel}</div>
          </Card>

          <Card className="p-6 text-center space-y-2">
            <div className="text-2xl font-black text-[var(--oxblood-dark)] truncate">{profile.activities.bestCategory}</div>
            <div className="text-xs font-bold text-[var(--text-muted)]">{t.progress.bestArea}</div>
          </Card>
        </div>

        <Card className="p-8 space-y-4 bg-[var(--oxblood-light)] border border-[var(--oxblood)]">
          <h3 className="text-2xl font-black text-[var(--oxblood-dark)]">{t.progress.streakTitle}</h3>
          <p className="text-base text-[var(--text-secondary)] font-medium leading-relaxed">{t.progress.streakDesc}</p>
        </Card>

        {/* Cognitive Skill Performance Breakdown */}
        <Card className="p-6 space-y-6 bg-[var(--bg-card)] border border-[var(--border)] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <Badge color="oxblood">🧠 AI Performance Profile</Badge>
              <h3 className="text-2xl font-black text-[var(--text-primary)] mt-1">Cognitive Practice Breakdown</h3>
              <p className="text-xs text-[var(--text-secondary)] font-medium">Activity performance metrics automatically updated from gameplay history.</p>
            </div>
            <span className="text-2xl">📈</span>
          </div>

          <div className="space-y-4">
            {Object.values(skillProfiles).map((sk) => {
              const trendBadges = {
                improving: { label: "📈 Improving", bg: "bg-green-100 text-green-800 border-green-300" },
                strong: { label: "⭐ Strong", bg: "bg-amber-100 text-amber-800 border-amber-300" },
                struggling: { label: "🔄 Practicing", bg: "bg-blue-100 text-blue-800 border-blue-300" },
                stable: { label: "⚖️ Stable", bg: "bg-slate-100 text-slate-800 border-slate-300" },
              };
              const badge = trendBadges[sk.trend] || trendBadges.stable;

              return (
                <div key={sk.skill} className="space-y-2 p-3.5 rounded-2xl bg-[var(--bg-section)] border border-[var(--border)]">
                  <div className="flex items-center justify-between text-sm font-extrabold text-[var(--text-primary)]">
                    <span className="flex items-center gap-2">
                      <span className="capitalize">{sk.skill}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-black ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </span>
                    <span className="font-black text-[var(--oxblood-dark)]">{sk.score} / 100</span>
                  </div>
                  <div className="w-full bg-[var(--bg-card)] h-3 rounded-full overflow-hidden border border-[var(--border)]">
                    <div
                      className="bg-[var(--oxblood)] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${sk.score}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-bold text-[var(--text-muted)] flex justify-between">
                    <span>{sk.gamesPlayed} session{sk.gamesPlayed === 1 ? "" : "s"} logged</span>
                    <span>Performance Rating: {sk.score >= 80 ? "Excellent" : sk.score >= 60 ? "Good" : "Active Practice"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Game Activity Records */}
        <Card className="p-6 space-y-4 bg-[var(--bg-card)] border border-[var(--border)] shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[var(--text-primary)]">🎮 Activity Performance Records</h3>
            <Badge color="brass">{gameRecords.length} Saved</Badge>
          </div>

          {gameRecords.length === 0 ? (
            <p className="text-sm font-semibold text-[var(--text-muted)] leading-relaxed py-4 text-center">
              No game history recorded yet. Play any cognitive game to log performance metrics!
            </p>
          ) : (
            <div className="space-y-3">
              {gameRecords.slice(0, 10).map((rec) => (
                <div key={rec.id} className="p-4 rounded-2xl bg-[var(--bg-section)] border border-[var(--border)] flex items-center justify-between gap-3 text-sm">
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-[var(--text-primary)]">{rec.gameTitle}</div>
                    <div className="text-xs font-bold text-[var(--text-muted)]">{rec.category} • {rec.difficulty} Difficulty</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-black text-[var(--oxblood-dark)] text-base">{rec.score}</div>
                    <div className="text-[10px] font-extrabold text-[var(--text-muted)]">{rec.completedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function LockedFeatureModal({
  open,
  feature,
  onClose,
  onCreateProfile,
}: {
  open: boolean;
  feature: "memories" | "reminders" | "progress" | null;
  onClose: () => void;
  onCreateProfile: () => void;
}) {
  const { t } = useLanguage();
  if (!open || !feature) return null;

  const details = {
    memories: {
      icon: "🖼️",
      title: t.nav.myMemories,
      message: t.profile.lockedMemoriesMsg,
    },
    reminders: {
      icon: "🔔",
      title: t.nav.reminders,
      message: t.profile.lockedRemindersMsg,
    },
    progress: {
      icon: "📊",
      title: t.nav.progress,
      message: t.profile.lockedProgressMsg,
    },
  }[feature];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm anim-fade">
      <Card level={3} className="w-full max-w-md p-6 sm:p-8 space-y-6 text-center border border-[var(--brass)] bg-[var(--bg-card)] shadow-2xl">
        <div className="mx-auto w-16 h-16 rounded-full bg-[var(--oxblood-light)] border border-[var(--brass)] flex items-center justify-center text-3xl shadow-inner">
          🔒
        </div>
        <div className="space-y-2">
          <Badge color="brass">{details.icon} {details.title}</Badge>
          <h2 className="text-2xl font-black text-[var(--text-primary)]">{t.profile.lockedTitle}</h2>
          <p className="text-sm font-semibold text-[var(--text-secondary)] leading-relaxed">
            {details.message}
          </p>
        </div>
        <div className="space-y-3 pt-2">
          <Btn onClick={() => { onClose(); onCreateProfile(); }} variant="primary" fullWidth className="py-3.5 text-base">
            ✨ {t.profile.createProfile}
          </Btn>
          <Btn onClick={onClose} variant="ghost" fullWidth className="py-2.5 text-sm">
            {t.profile.maybeLater}
          </Btn>
        </div>
      </Card>
    </div>
  );
}

function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
}: {
  open: boolean;
  profile: Profile | null;
  onClose: () => void;
  onSave: (p: Profile) => void;
}) {
  const { t } = useLanguage();
  const [name, setName] = useState(profile?.name || "");
  const [age, setAge] = useState(profile?.age || 68);
  const [gender, setGender] = useState(profile?.gender || "Female");
  const [location, setLocation] = useState(profile?.location || profile?.region || "Jorhat, Assam");
  const [phone, setPhone] = useState(profile?.phone || "+91 98765 43210");
  const [familyContactName, setFamilyContactName] = useState(profile?.familyContactName || "");
  const [familyContactPhone, setFamilyContactPhone] = useState(profile?.familyContactPhone || "");
  const [address, setAddress] = useState(profile?.address || "");
  const [avatar, setAvatar] = useState(profile?.avatar || "👵");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAge(profile.age);
      setGender(profile.gender || "Female");
      setLocation(profile.location || profile.region || "Jorhat, Assam");
      setPhone(profile.phone || "+91 98765 43210");
      setFamilyContactName(profile.familyContactName || "");
      setFamilyContactPhone(profile.familyContactPhone || "");
      setAddress(profile.address || "");
      setAvatar(profile.avatar);
    }
  }, [profile]);

  if (!open || !profile) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !profile) return;
    onSave({
      ...profile,
      name: name.trim(),
      age: Number(age) || 68,
      gender,
      location: location.trim(),
      phone: phone.trim(),
      familyContactName: familyContactName.trim(),
      familyContactPhone: familyContactPhone.trim(),
      address: address.trim(),
      avatar,
    });
    onClose();
  }

  const AVATARS = ["👵", "👨‍🦳", "👵‍🦳", "👴", "🌸", "🌿", "🧠"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm anim-fade">
      <Card level={3} className="w-full max-w-lg p-6 sm:p-8 space-y-6 border border-[var(--brass)] bg-[var(--bg-card)] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
          <h2 className="text-2xl font-black text-[var(--text-primary)]">✏️ {t.profile.editProfile}</h2>
          <button onClick={onClose} className="text-xl font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Choose Avatar</label>
            <div className="flex flex-wrap gap-2.5 mt-2 justify-center sm:justify-start">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setAvatar(av)}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                    avatar === av ? "bg-[var(--oxblood-light)] border-[var(--oxblood)] scale-110 shadow-md" : "bg-[var(--bg-section)] border-[var(--border)]"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.age}</label>
              <input
                type="number"
                min="18"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.gender}</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)] cursor-pointer"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.location}</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Jorhat, Assam"
              className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)]"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.phone}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)]"
            />
          </div>

          <div className="pt-2 border-t border-[var(--border)]">
            <label className="text-xs font-black uppercase text-[var(--oxblood-dark)] tracking-wider">{t.profile.familyContact}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <input
                type="text"
                value={familyContactName}
                onChange={(e) => setFamilyContactName(e.target.value)}
                placeholder="Contact Name (e.g. Daughter)"
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-sm text-[var(--text-primary)]"
              />
              <input
                type="tel"
                value={familyContactPhone}
                onChange={(e) => setFamilyContactPhone(e.target.value)}
                placeholder="Contact Phone Number"
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-sm text-[var(--text-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.address}</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full residence address..."
              className="w-full p-3 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-sm text-[var(--text-primary)]"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
            <Btn type="submit" variant="primary" fullWidth className="py-3.5 flex items-center justify-center gap-2">
              <span>💾</span> {t.profile.saveChanges}
            </Btn>
            <Btn onClick={onClose} type="button" variant="secondary" fullWidth className="py-3.5 flex items-center justify-center gap-2">
              <span>✕</span> {t.profile.cancel}
            </Btn>
          </div>
        </form>
      </Card>
    </div>
  );
}

function StartYourJourneyCTA({ onNav }: { onNav: (s: Screen) => void }) {
  const { t } = useLanguage();
  return (
    <div className="p-5 rounded-2xl bg-[var(--oxblood-light)] border border-[var(--oxblood)] space-y-3 text-center mt-4 anim-fade">
      <div className="text-3xl">🌟</div>
      <h3 className="text-lg font-black text-[var(--oxblood-dark)]">Great Job! Start Your Journey</h3>
      <p className="text-xs font-semibold text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
        You've completed your activity. Create your profile to save your progress, personal memories, and daily reminders.
      </p>
      <Btn onClick={() => onNav("start-journey")} variant="primary" fullWidth className="py-3 text-sm flex items-center justify-center gap-2">
        <span>🚀</span> {t.profile.startJourney}
      </Btn>
    </div>
  );
}

function ProfilesSelectScreen({ profiles, active, onSelect, onCreateNew, onSkip }: { profiles: Profile[]; active: Profile | null; onSelect: (id: string) => void; onCreateNew: () => void; onSkip: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen pb-24 flex items-center justify-center p-4">
      <Card level={3} className="w-full max-w-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <Badge color="brass">👤 User Profiles</Badge>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">{t.profile.switchProfile}</h1>
        </div>
        <div className="space-y-3">
          {profiles.map((p) => (
            <button key={p.id} onClick={() => onSelect(p.id)} className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between cursor-pointer ${active?.id === p.id ? "bg-[var(--oxblood-light)] border-[var(--oxblood)]" : "bg-[var(--bg-card)] border-[var(--border)]"}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{p.avatar}</span>
                <div className="font-extrabold text-base text-[var(--text-primary)]">{p.name}</div>
              </div>
              {active?.id === p.id && <Badge color="oxblood">Active</Badge>}
            </button>
          ))}
        </div>
        <Btn onClick={onCreateNew} variant="primary" fullWidth className="flex items-center justify-center gap-2"><span>✨</span> {t.profile.createProfile}</Btn>
        <Btn onClick={onSkip} variant="ghost" fullWidth>Continue Guest Mode</Btn>
      </Card>
    </div>
  );
}

function StartJourneyScreen({ onNav, onSave }: { onNav: (s: Screen) => void; onSave: (p: Profile) => void }) {
  const { t, lang } = useLanguage();
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(68);
  const [gender, setGender] = useState("Female");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [familyContactName, setFamilyContactName] = useState("");
  const [familyContactPhone, setFamilyContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("👵");

  const AVATARS = ["👵", "👨‍🦳", "👵‍🦳", "👴", "🌸", "🌿", "🧠"];

  function create(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const newP: Profile = {
      id: "p_" + Date.now(),
      name: name.trim(),
      avatar,
      age: Number(age) || 68,
      gender,
      location: location.trim() || "India",
      phone: phone.trim() || "+91 98765 00000",
      familyContactName: familyContactName.trim(),
      familyContactPhone: familyContactPhone.trim(),
      address: address.trim(),
      language: lang,
      region: location.trim() || "India",
      accessibility: { spokenGuidance: true, largeText: true, highContrast: false },
      activities: { completed: 0, bestCategory: "Listening", level: 1 },
      memories: [],
      reminders: [],
    };
    onSave(newP);
    onNav("profile-home");
  }

  return (
    <div className="min-h-screen pb-24 flex items-center justify-center p-4 pt-8">
      <Card level={3} className="w-full max-w-lg p-6 sm:p-8 space-y-6 border border-[var(--brass)] bg-[var(--bg-card)] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="text-center space-y-2">
          <Badge color="brass">✨ {t.profile.startJourney}</Badge>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">{t.profile.createProfile}</h1>
          <p className="text-sm font-semibold text-[var(--text-secondary)]">
            Enter your details to create your personalized memory companion.
          </p>
        </div>

        <form onSubmit={create} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Choose Avatar</label>
            <div className="flex flex-wrap gap-2.5 mt-2 justify-center">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setAvatar(av)}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                    avatar === av ? "bg-[var(--oxblood-light)] border-[var(--oxblood)] scale-110 shadow-md" : "bg-[var(--bg-section)] border-[var(--border)]"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kamla Devi"
              className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.age}</label>
              <input
                type="number"
                min="18"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)]"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.gender}</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)] cursor-pointer"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.location}</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Jorhat, Assam"
              className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)]"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.phone}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full p-3.5 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-base text-[var(--text-primary)]"
            />
          </div>

          <div className="pt-2 border-t border-[var(--border)]">
            <label className="text-xs font-black uppercase text-[var(--oxblood-dark)] tracking-wider">{t.profile.familyContact}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <input
                type="text"
                value={familyContactName}
                onChange={(e) => setFamilyContactName(e.target.value)}
                placeholder="Contact Name (e.g. Daughter)"
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-sm text-[var(--text-primary)]"
              />
              <input
                type="tel"
                value={familyContactPhone}
                onChange={(e) => setFamilyContactPhone(e.target.value)}
                placeholder="Contact Phone Number"
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-sm text-[var(--text-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">{t.profile.address}</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full residence address..."
              className="w-full p-3 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] font-bold text-sm text-[var(--text-primary)]"
            />
          </div>

          <div className="pt-3">
            <Btn type="submit" variant="primary" fullWidth className="py-4 text-base flex items-center justify-center gap-2">
              <span>🚀</span> {t.profile.startJourney}
            </Btn>
          </div>
        </form>
      </Card>
    </div>
  );
}

function ProfileCreatedScreen({ active, onNav }: { active: Profile | null; onNav: (s: Screen) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center space-y-6">
      <div className="max-w-md space-y-6">
        <div className="text-8xl">🎉</div>
        <h1 className="text-3xl font-black text-[var(--text-primary)]">Welcome, {active?.name}!</h1>
        <Btn onClick={() => onNav("home")} variant="primary" fullWidth className="flex items-center justify-center gap-2">Go to Homepage →</Btn>
      </div>
    </div>
  );
}

function ProfileHomeScreen({
  profile,
  onNav,
  onEditProfile,
  onCreateNewAccount,
  onLogout,
  onLoadDemo,
}: {
  profile: Profile | null;
  onNav: (s: Screen) => void;
  onEditProfile: () => void;
  onCreateNewAccount: () => void;
  onLogout: () => void;
  onLoadDemo: () => void;
}) {
  const { t } = useLanguage();

  if (!profile) {
    return (
      <div className="min-h-screen pb-24 pt-8">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <div>
            <Badge color="brass">👤 Guest Mode</Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-1">Welcome to MEMOVERSE</h1>
            <p className="text-base text-[var(--text-secondary)] font-medium mt-2 leading-relaxed">
              You are currently exploring as a guest. You can play cognitive activities freely, or create a profile to save personal memories, daily reminders, and activity progress.
            </p>
          </div>

          <Card level={2} className="p-8 space-y-6 text-center bg-[var(--bg-card)] border border-[var(--border)]">
            <div className="text-6xl">✨</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[var(--text-primary)]">Start Your Journey</h2>
              <p className="text-sm font-semibold text-[var(--text-secondary)] max-w-md mx-auto">
                Create your senior profile to unlock personalized keepsake albums, medicine reminders, and focus metrics.
              </p>
            </div>
            <div className="space-y-3 max-w-sm mx-auto pt-2">
              <Btn onClick={onCreateNewAccount} variant="primary" fullWidth className="py-4 text-base flex items-center justify-center gap-2">
                <span>✨</span> {t.profile.createProfile}
              </Btn>
              <Btn onClick={onLoadDemo} variant="secondary" fullWidth className="py-3.5 text-sm flex items-center justify-center gap-2">
                <span>👵</span> Load Demo Profile (Kamla Devi)
              </Btn>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-8 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <Badge color="oxblood">👤 {t.profile.title}</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mt-1">{profile.name}</h1>
          <p className="text-base text-[var(--text-secondary)] font-medium">{t.profile.subtitle}</p>
        </div>

        {/* Profile Photo & Name Card */}
        <Card level={2} className="p-6 sm:p-8 space-y-6 bg-[var(--bg-card)] border border-[var(--border)] shadow-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-[var(--oxblood-light)] border-2 border-[var(--brass)] flex items-center justify-center text-5xl shadow-md shrink-0">
              {profile.avatar}
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <h2 className="text-3xl font-black text-[var(--text-primary)]">{profile.name}</h2>
              <p className="text-sm font-semibold text-[var(--text-secondary)]">Senior Profile · Language: {profile.language}</p>
            </div>
          </div>
        </Card>

        {/* Personal Details */}
        <Card level={2} className="p-6 sm:p-8 space-y-4 bg-[var(--bg-card)] border border-[var(--border)] shadow-sm">
          <h3 className="text-xl font-black text-[var(--text-primary)] border-b border-[var(--border)] pb-3 flex items-center gap-2">
            <span>👤</span> Personal Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-1">
            <div>
              <div className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Full Name</div>
              <div className="text-lg font-black text-[var(--text-primary)] mt-0.5">{profile.name}</div>
            </div>
            <div>
              <div className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Age</div>
              <div className="text-lg font-black text-[var(--text-primary)] mt-0.5">{profile.age} years old</div>
            </div>
            <div>
              <div className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Gender</div>
              <div className="text-lg font-black text-[var(--text-primary)] mt-0.5">{profile.gender || "Not specified"}</div>
            </div>
            <div>
              <div className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Location</div>
              <div className="text-lg font-black text-[var(--text-primary)] mt-0.5">{profile.location || profile.region || "India"}</div>
            </div>
          </div>
        </Card>

        {/* Contact Details */}
        <Card level={2} className="p-6 sm:p-8 space-y-4 bg-[var(--bg-card)] border border-[var(--border)] shadow-sm">
          <h3 className="text-xl font-black text-[var(--text-primary)] border-b border-[var(--border)] pb-3 flex items-center gap-2">
            <span>📞</span> Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-1">
            <div>
              <div className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Phone Number</div>
              <div className="text-lg font-black text-[var(--text-primary)] mt-0.5">{profile.phone || "Not provided"}</div>
            </div>
            <div>
              <div className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Family / Emergency Contact</div>
              <div className="text-lg font-black text-[var(--oxblood-dark)] mt-0.5">
                {profile.familyContactName ? (
                  <>
                    <div>{profile.familyContactName}</div>
                    <div className="text-sm font-bold text-[var(--text-secondary)]">{profile.familyContactPhone}</div>
                  </>
                ) : (
                  "Not configured"
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card level={2} className="p-6 sm:p-8 space-y-4 bg-[var(--bg-card)] border border-[var(--border)] shadow-sm">
          <h3 className="text-xl font-black text-[var(--text-primary)] border-b border-[var(--border)] pb-3 flex items-center gap-2">
            <span>🏡</span> Address
          </h3>
          <div className="text-left pt-1">
            <div className="text-xs font-black uppercase text-[var(--text-muted)] tracking-wider">Full Address</div>
            <div className="text-base font-bold text-[var(--text-primary)] mt-1 leading-relaxed">
              {profile.address || "No address entered."}
            </div>
          </div>
        </Card>

        {/* Profile Actions */}
        <Card level={2} className="p-6 sm:p-8 space-y-4 bg-[var(--bg-section)] border border-[var(--border)]">
          <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">Profile Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Btn onClick={onEditProfile} variant="primary" className="py-4 text-sm flex items-center justify-center gap-2">
              <span>✏️</span> {t.profile.editProfile}
            </Btn>
            <Btn onClick={onCreateNewAccount} variant="secondary" className="py-4 text-sm flex items-center justify-center gap-2">
              <span>👤</span> {t.profile.createNewProfile}
            </Btn>
            <Btn onClick={onLogout} variant="danger" className="py-4 text-sm flex items-center justify-center gap-2">
              <span>🚪</span> {t.profile.logout}
            </Btn>
          </div>
        </Card>

        {/* Settings Access Card inside Profile */}
        <Card level={2} className="p-6 sm:p-8 space-y-4 bg-[var(--bg-card)] border border-[var(--brass)] shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <h3 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
                <span>⚙️</span> Application Settings
              </h3>
              <p className="text-xs font-semibold text-[var(--text-secondary)]">
                Configure interface language ({profile.language}), audio guidance, text sizing, and high contrast options.
              </p>
            </div>
            <Btn onClick={() => onNav("more")} variant="secondary" className="py-3 px-6 text-sm flex items-center gap-2 shrink-0">
              <span>⚙️</span> Open Settings
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}

function GateScreen({ onNav, onProfiles }: { onNav: (s: Screen) => void; onProfiles: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <Card level={3} className="w-full max-w-md p-8 space-y-6">
        <div className="text-6xl">🔒</div>
        <h1 className="text-2xl font-black text-[var(--text-primary)]">Profile Required</h1>
        <Btn onClick={onProfiles} variant="primary" fullWidth>{t.profile.switchProfile}</Btn>
        <Btn onClick={() => onNav("home")} variant="ghost" fullWidth>Back Home</Btn>
      </Card>
    </div>
  );
}

function SwitchProfileModal({ open, onClose, profiles, active, onSelect, onCreateNew }: { open: boolean; onClose: () => void; profiles: Profile[]; active: Profile | null; onSelect: (id: string) => void; onCreateNew: () => void }) {
  const { t } = useLanguage();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm anim-fade">
      <Card level={3} className="w-full max-w-md p-6 space-y-5 border border-[var(--glass-border)] shadow-2xl bg-[var(--bg-card)]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-[var(--text-primary)]">{t.profile.switchProfile}</h3>
          <button onClick={onClose} className="text-lg font-bold text-[var(--text-muted)] cursor-pointer">✕</button>
        </div>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {profiles.map((p) => (
            <button key={p.id} onClick={() => { onSelect(p.id); onClose(); }} className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between cursor-pointer ${active?.id === p.id ? "bg-[var(--oxblood-light)] border-[var(--oxblood)]" : "bg-[var(--bg-section)] border-[var(--border)]"}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.avatar}</span>
                <div className="font-extrabold text-sm text-[var(--text-primary)]">{p.name}</div>
              </div>
            </button>
          ))}
        </div>
        <Btn onClick={() => { onCreateNew(); onClose(); }} variant="primary" fullWidth>{t.profile.createProfile}</Btn>
      </Card>
    </div>
  );
}

function Footer({ onNav }: { onNav: (s: Screen) => void }) {
  const { t } = useLanguage();

  return (
    <footer className="py-16 px-4 sm:px-6 bg-[var(--bg-section)] text-[var(--text-primary)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--oxblood)] border border-[var(--brass)] flex items-center justify-center text-xl text-white shadow-md">🧠</div>
            <span className="text-xl font-black tracking-wider text-[var(--text-primary)]">MEMOVERSE</span>
          </div>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)] font-medium">{t.footer.brandTagline}</p>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[var(--oxblood-dark)] mb-4">{t.footer.exploreHeading}</h4>
          <ul className="space-y-2 text-sm font-semibold">
            <li><button onClick={() => onNav("home")} className="hover:text-[var(--oxblood)] cursor-pointer">{t.nav.home}</button></li>
            <li><button onClick={() => onNav("activities")} className="hover:text-[var(--oxblood)] cursor-pointer">{t.nav.activities}</button></li>
            <li><button onClick={() => onNav("about-dementia")} className="hover:text-[var(--oxblood)] cursor-pointer">{t.nav.aboutDementia}</button></li>
            <li><button onClick={() => onNav("more")} className="hover:text-[var(--oxblood)] cursor-pointer">{t.nav.settings}</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[var(--oxblood-dark)] mb-4">{t.footer.keepsakeHeading}</h4>
          <ul className="space-y-2 text-sm font-semibold">
            <li><button onClick={() => onNav("my-memories")} className="hover:text-[var(--oxblood)] cursor-pointer">{t.nav.myMemories}</button></li>
            <li><button onClick={() => onNav("reminders")} className="hover:text-[var(--oxblood)] cursor-pointer">{t.nav.reminders}</button></li>
            <li><button onClick={() => onNav("progress")} className="hover:text-[var(--oxblood)] cursor-pointer">{t.nav.progress}</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-[var(--oxblood-dark)] mb-4">{t.footer.careHeading}</h4>
          <p className="text-xs leading-relaxed text-[var(--text-muted)] font-medium">{t.footer.careText}</p>
          <div className="pt-3 text-xs font-bold border-t border-[var(--border)] text-[var(--text-muted)] mt-4">{t.footer.copyright}</div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN CONTENT WRAPPER
// ═══════════════════════════════════════════════════════════════════

function MainAppContent() {
  const { profiles, active, saveProfile, logout, switchTo } = useProfiles();
  const { dark, toggleDark } = useDarkTheme();
  const { notice, clearNotice, t } = useLanguage();

  const [screen, setScreen] = useState<Screen>("home");
  const [isOffline, setIsOffline] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [lockModalFeature, setLockModalFeature] = useState<"memories" | "reminders" | "progress" | null>(null);

  function getValidScreen(raw?: string): Screen {
    if (!raw) return "home";
    const clean = raw.replace("#", "").split("-modal")[0].split("-edit")[0].split("-profiles")[0].split("-locked")[0];
    if (
      TOP_LEVEL_SCREENS.has(clean as Screen) ||
      clean.startsWith("game-") ||
      ["play", "more", "profiles-select", "start-journey", "profile-created", "gate"].includes(clean)
    ) {
      return clean as Screen;
    }
    return "home";
  }

  // Initialize root history entry on mount
  useEffect(() => {
    document.title = "MEMOVERSE";

    const hash = window.location.hash;
    const initialScreen = getValidScreen(hash);
    setScreen(initialScreen);
    window.history.replaceState({ screen: initialScreen, isRoot: true }, "", `#${initialScreen}`);
  }, []);

  // Listen for browser / Android device Back button (popstate)
  useEffect(() => {
    function handlePopState(e: PopStateEvent) {
      if (editProfileOpen || profileModalOpen || lockModalFeature !== null) {
        setEditProfileOpen(false);
        setProfileModalOpen(false);
        setLockModalFeature(null);
      }

      const targetScreen = getValidScreen(e.state?.screen || window.location.hash);
      setScreen(targetScreen);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [editProfileOpen, profileModalOpen, lockModalFeature]);

  function nav(s: Screen, source?: "navbar" | "user") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const target = getValidScreen(s);
    if (target === screen && !editProfileOpen && !profileModalOpen && lockModalFeature === null) return;

    setEditProfileOpen(false);
    setProfileModalOpen(false);
    setLockModalFeature(null);

    setScreen(target);
    try {
      window.history.pushState({ screen: target }, "", `#${target}`);
    } catch {
      // Ignore fallback
    }
  }

  function goBack() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (editProfileOpen || profileModalOpen || lockModalFeature !== null) {
      setEditProfileOpen(false);
      setProfileModalOpen(false);
      setLockModalFeature(null);
    }
    if (window.history.length > 1) {
      window.history.back();
    } else {
      const fallbackMap: Record<string, Screen> = {
        more: "profile-home",
        "start-journey": "profile-home",
        "profiles-select": "profile-home",
        "profile-created": "profile-home",
        gate: "home",
        play: "activities",
      };
      const target = screen.startsWith("game-") ? "activities" : fallbackMap[screen] || "home";
      nav(target);
    }
  }

  function openEditProfileModal() {
    setEditProfileOpen(true);
    try {
      window.history.pushState({ screen, modal: "edit-profile" }, "", `#${screen}`);
    } catch {
      // Ignore fallback
    }
  }

  function openProfileModal() {
    setProfileModalOpen(true);
    try {
      window.history.pushState({ screen, modal: "switch-profile" }, "", `#${screen}`);
    } catch {
      // Ignore fallback
    }
  }

  function openLockModal(feature: "memories" | "reminders" | "progress") {
    setLockModalFeature(feature);
    try {
      window.history.pushState({ screen, modal: "lock-feature" }, "", `#${screen}`);
    } catch {
      // Ignore fallback
    }
  }

  function recordProgress() {
    if (!active) return;
    saveProfile({
      ...active,
      activities: {
        ...active.activities,
        completed: active.activities.completed + 1,
        level: Math.floor((active.activities.completed + 1) / 5) + 1,
      },
    });
  }

  const activeScreen = getValidScreen(screen);

  return (
    <div className="page-root">
      {notice && (
        <div className="fixed top-20 right-4 z-50 max-w-sm p-4 rounded-2xl bg-[var(--oxblood-dark)] text-white border border-[var(--brass)] shadow-2xl text-xs font-bold flex items-start gap-3 anim-fade">
          <span className="text-lg">📢</span>
          <div className="flex-1">{notice}</div>
          <button onClick={clearNotice} className="font-extrabold hover:opacity-75 cursor-pointer">✕</button>
        </div>
      )}

      <NavBar
        screen={activeScreen}
        onNav={nav}
        active={active}
        onOpenLockModal={(feature) => openLockModal(feature)}
        dark={dark}
        toggleDark={toggleDark}
        isOffline={isOffline}
        toggleOffline={() => setIsOffline((v) => !v)}
      />

      <main>
        {!TOP_LEVEL_SCREENS.has(activeScreen) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-0 flex items-center justify-start">
            <BackButton onClick={goBack} label={t.nav.back || "Back"} />
          </div>
        )}

        {activeScreen === "home" && <HomeScreen onNav={nav} active={active} onSwitchProfile={openProfileModal} />}
        {activeScreen === "more" && <MoreScreen onNav={nav} active={active} onSwitchProfile={openProfileModal} isOffline={isOffline} toggleOffline={() => setIsOffline((v) => !v)} />}
        {activeScreen === "about-dementia" && <AboutDementiaScreen onNav={nav} />}
        {activeScreen === "activities"     && <ActivitiesScreen onNav={nav} />}

        {activeScreen === "game-memory" && <GameMemoryScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-sounds" && <GameSoundsScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-market" && <GameMarketScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-story"  && <GameStoryScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}

        {activeScreen === "game-word" && <GameWordPuzzlesScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-jigsaw" && <GameJigsawScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-dice" && <GameDiceScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-board" && <GameBoardScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-interactive" && <GameInteractiveScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-bazaar" && <GameBazaarScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-memory-lane" && <GameMemoryLaneScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-kaziranga-puzzle" && <GameKazirangaPuzzleScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-whats-missing" && <GameWhatsMissingScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-routine" && <GameRoutineScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-pattern" && <GamePatternScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}
        {activeScreen === "game-sound-rec" && <GameSoundRecScreen onNav={nav} onBack={goBack} active={active} onProgress={recordProgress} />}

        {activeScreen === "profiles-select" && (
          <ProfilesSelectScreen
            profiles={profiles}
            active={active}
            onSelect={(id) => { switchTo(id); nav("profile-home"); }}
            onCreateNew={() => nav("start-journey")}
            onSkip={() => nav("activities")}
          />
        )}
        {activeScreen === "start-journey"  && <StartJourneyScreen onNav={nav} onSave={saveProfile} />}
        {activeScreen === "profile-created"&& <ProfileCreatedScreen active={active} onNav={nav} />}

        {activeScreen === "profile-home" && (
          <ProfileHomeScreen
            profile={active}
            onNav={nav}
            onEditProfile={openEditProfileModal}
            onCreateNewAccount={() => nav("start-journey")}
            onLogout={() => { logout(); nav("home"); }}
            onLoadDemo={() => { switchTo("kamla-devi"); nav("profile-home"); }}
          />
        )}
        {activeScreen === "my-memories" && (
          active ? <MyMemoriesScreen profile={active} onUpdate={saveProfile} /> : <GateScreen onNav={nav} onProfiles={openProfileModal} />
        )}
        {activeScreen === "reminders" && (
          active ? <RemindersScreen profile={active} onUpdate={saveProfile} /> : <GateScreen onNav={nav} onProfiles={openProfileModal} />
        )}
        {activeScreen === "progress" && (
          active ? <ProgressScreen profile={active} onNav={nav} /> : <GateScreen onNav={nav} onProfiles={openProfileModal} />
        )}
        {activeScreen === "gate" && <GateScreen onNav={nav} onProfiles={openProfileModal} />}
      </main>

      <Footer onNav={nav} />

      <SwitchProfileModal
        open={profileModalOpen}
        onClose={goBack}
        profiles={profiles}
        active={active}
        onSelect={(id) => { switchTo(id); nav("profile-home"); }}
        onCreateNew={() => nav("start-journey")}
      />

      <EditProfileModal
        open={editProfileOpen}
        profile={active}
        onClose={goBack}
        onSave={(updated) => {
          saveProfile(updated);
          goBack();
        }}
      />

      <LockedFeatureModal
        open={lockModalFeature !== null}
        feature={lockModalFeature}
        onClose={goBack}
        onCreateProfile={() => nav("start-journey")}
      />
    </div>
  );
}

export default function AppMain() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
