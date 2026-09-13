import { useState, useEffect, useCallback, useRef } from "react";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { LANGUAGE_METADATA } from "./speechUtils";

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
        image: import.meta.env.BASE_URL + "bihu_celebration_memory.png",
      },
      {
        id: "m2",
        title: "Our Ancestral Tea Garden",
        description: "The wooden tea estate house where I grew up in Upper Assam. Morning mist and fresh brewed chai.",
        category: "places",
        emoji: "🏡",
        date: "1 week ago",
        image: import.meta.env.BASE_URL + "tea_garden_memory.png",
      },
      {
        id: "m3",
        title: "Bhupen Hazarika on the Radio",
        description: "Listening to the golden voice of Bhupen da on the morning radio every Sunday with my parents.",
        category: "moments",
        emoji: "🎵",
        date: "2 weeks ago",
        image: import.meta.env.BASE_URL + "vintage_radio_memory.png",
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
  const [profiles, setProfiles] = useState<Profile[]>(() =>
    storageGet("mv_profiles", DEFAULT_PROFILES)
  );
  const [activeId, setActiveId] = useState<string | null>(() =>
    storageGet("mv_active_id", "kamla-devi")
  );

  useEffect(() => storageSet("mv_profiles", profiles), [profiles]);
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

  function switchTo(id: string) {
    setActiveId(id);
  }

  return { profiles, activeId, active, saveProfile, switchTo };
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
//  UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function Btn({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
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
  onSwitchProfile,
  dark,
  toggleDark,
  isOffline,
  toggleOffline,
}: {
  screen: Screen;
  onNav: (s: Screen) => void;
  active: Profile | null;
  onSwitchProfile: () => void;
  dark: boolean;
  toggleDark: () => void;
  isOffline: boolean;
  toggleOffline: () => void;
}) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const NAV_ITEMS: { label: string; screen: Screen; gated?: boolean }[] = [
    { label: t.nav.home,          screen: "home" },
    { label: t.nav.activities,    screen: "activities" },
    { label: t.nav.aboutDementia, screen: "about-dementia" },
    { label: t.nav.myMemories,    screen: "my-memories", gated: true },
    { label: t.nav.reminders,     screen: "reminders",   gated: true },
    { label: t.nav.progress,      screen: "progress",    gated: true },
  ];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function go(s: Screen, gated?: boolean) {
    setMobileOpen(false);
    if (gated && !active) { onNav("gate"); return; }
    onNav(s);
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
                onClick={() => go(link.screen, link.gated)}
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

          {active ? (
            <button onClick={onSwitchProfile} className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold border border-[var(--brass)] bg-[var(--oxblood-light)] text-[var(--oxblood-dark)] cursor-pointer">
              <span>{active.avatar}</span>
              <span className="hidden sm:inline">{active.name.split(" ")[0]}</span>
            </button>
          ) : (
            <Btn onClick={() => go("profiles-select")} variant="primary" className="text-xs px-3.5 py-1.5 min-h-[36px] rounded-xl">
              Profiles 👤
            </Btn>
          )}

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
                onClick={() => go(link.screen, link.gated)}
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
//  HOMEPAGE
// ═══════════════════════════════════════════════════════════════════

function HomeScreen({ onNav, active, onSwitchProfile }: { onNav: (s: Screen) => void; active: Profile | null; onSwitchProfile: () => void }) {
  const { lang, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      {active && (
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
      )}

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
              <img src={import.meta.env.BASE_URL + "hero_elderly.png"} alt="Senior elder" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(37,44,48,0.88)] via-[rgba(37,44,48,0.2)] to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-black/50 backdrop-blur-md border border-white/30 text-[var(--brass)]">
                  <span>📸</span> {t.home.heroBadge}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{t.home.heroTagline}</h2>
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
              <Card key={g.title} className="p-6 flex flex-col justify-between gap-4 hover:border-[var(--oxblood)] transition-all group" onClick={() => onNav(g.screen)}>
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
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  ACTIVITIES & OTHER PAGES
// ═══════════════════════════════════════════════════════════════════

function ActivitiesScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pb-24 space-y-12">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        <div className="text-center space-y-3">
          <Badge color="brass">🎮 Cognitive Library</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-[var(--text-primary)]">{t.activities.title}</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto font-medium">{t.activities.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: "🧠", title: t.activities.memoryMatch, desc: t.activities.memoryMatchDesc, screen: "game-memory" as Screen, tag: t.activities.catMatching },
            { icon: "🎧", title: t.activities.soundLounge, desc: t.activities.soundLoungeDesc, screen: "game-sounds" as Screen, tag: t.activities.catListening },
            { icon: "🛒", title: t.activities.marketMemory, desc: t.activities.marketMemoryDesc, screen: "game-market" as Screen, tag: t.activities.catEveryday },
            { icon: "📖", title: t.activities.storyRecall, desc: t.activities.storyRecallDesc, screen: "game-story" as Screen, tag: t.activities.catStorytelling },
          ].map((item) => (
            <Card key={item.title} className="p-8 space-y-4 hover:border-[var(--oxblood)] transition-all cursor-pointer" onClick={() => onNav(item.screen)}>
              <div className="flex items-center justify-between">
                <span className="text-4xl">{item.icon}</span>
                <Badge color="oxblood">{item.tag}</Badge>
              </div>
              <h2 className="text-2xl font-black text-[var(--text-primary)]">{item.title}</h2>
              <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">{item.desc}</p>
              <Btn variant="primary" fullWidth>{t.activities.playNow} →</Btn>
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
          <img src={import.meta.env.BASE_URL + "caregiver_support.png"} alt="Caregiver support" className="w-full h-full object-cover" />
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

        {/* 18-Language Selection Grid */}
        <Card className="p-6 space-y-5">
          <h2 className="text-xl font-black text-[var(--text-primary)]">{t.settings.language} (18 Available)</h2>
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

function GameMemoryScreen({ onNav, onProgress }: { onNav: (s: Screen) => void; active: Profile | null; onProgress: () => void }) {
  const { t } = useLanguage();
  const CARD_ITEMS = [
    { id: "1", emoji: "🫖", label: "Tea Cup" },
    { id: "2", emoji: "🌸", label: "Orchid" },
    { id: "3", emoji: "🦏", label: "Rhino" },
    { id: "4", emoji: "🪘", label: "Drum" },
    { id: "5", emoji: "🏡", label: "Home" },
    { id: "6", emoji: "🌾", label: "Flora" },
  ];

  const [cards, setCards] = useState<{ id: number; itemId: string; emoji: string; label: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [won, setWon] = useState(false);

  const initGame = useCallback(() => {
    const doubled = [...CARD_ITEMS, ...CARD_ITEMS].map((item, idx) => ({
      id: idx, itemId: item.id, emoji: item.emoji, label: item.label, flipped: false, matched: false,
    }));
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    setCards(doubled); setFlipped([]); setMoves(0); setMatched(0); setWon(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  function flip(id: number) {
    if (flipped.length === 2 || cards.find((c) => c.id === id)?.flipped || cards.find((c) => c.id === id)?.matched) return;
    tone("flip");
    const nextFlipped = [...flipped, id];
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = nextFlipped;
      const c1 = cards.find((c) => c.id === first);
      const c2 = cards.find((c) => c.id === second);

      if (c1 && c2 && c1.itemId === c2.itemId) {
        tone("correct");
        setCards((prev) => prev.map((c) => (c.id === first || c.id === second ? { ...c, matched: true } : c)));
        setMatched((m) => {
          const nextVal = m + 1;
          if (nextVal === CARD_ITEMS.length) { setWon(true); onProgress(); }
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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="text-8xl">🎉</div>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">{t.games.congrats}</h1>
          <p className="text-sm font-bold text-[var(--text-muted)]">{t.games.moves}: {moves}</p>
          <div className="flex gap-3 justify-center">
            <Btn onClick={initGame} variant="primary">{t.games.playAgain}</Btn>
            <Btn onClick={() => onNav("activities")} variant="secondary">Back</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="max-w-xl mx-auto px-4 space-y-6">
        <div className="space-y-2 text-center">
          <button onClick={() => onNav("activities")} className="text-sm font-bold text-[var(--text-muted)] cursor-pointer hover:underline">
            {t.games.backToActivities}
          </button>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">{t.games.memoryMatchTitle}</h1>
          <p className="text-base text-[var(--text-secondary)] font-medium">{t.games.memoryMatchDesc}</p>
        </div>

        <div className="flex items-center justify-between">
          <Card className="px-4 py-2 text-sm font-bold text-[var(--text-primary)]">
            {t.games.matches}: {matched} / {CARD_ITEMS.length}
          </Card>
          <Btn onClick={initGame} variant="ghost" className="text-sm py-2 min-h-[38px]">
            {t.games.restart}
          </Btn>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
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
                  <span className="text-3xl">{card.emoji}</span>
                  <span className="text-[10px] font-black uppercase text-[var(--text-muted)] mt-1">{card.label}</span>
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

function GameSoundsScreen({ onNav, onProgress }: { onNav: (s: Screen) => void; active: Profile | null; onProgress: () => void }) {
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
          <button onClick={() => onNav("activities")} className="text-sm font-bold text-[var(--text-muted)] cursor-pointer hover:underline">
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
      </div>
    </div>
  );
}

function GameMarketScreen({ onNav, onProgress }: { onNav: (s: Screen) => void; active: Profile | null; onProgress: () => void }) {
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
        <button onClick={() => onNav("activities")} className="text-sm font-bold text-[var(--text-muted)] cursor-pointer hover:underline">
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
      </div>
    </div>
  );
}

function GameStoryScreen({ onNav, onProgress }: { onNav: (s: Screen) => void; active: Profile | null; onProgress: () => void }) {
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
          <button onClick={() => onNav("activities")} className="text-sm font-bold text-[var(--text-muted)] cursor-pointer hover:underline">
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
      image: import.meta.env.BASE_URL + "default_memory_cover.png",
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
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
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
      </div>
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
        <Btn onClick={onCreateNew} variant="primary" fullWidth>{t.profile.createProfile}</Btn>
        <Btn onClick={onSkip} variant="ghost" fullWidth>Continue Guest Mode</Btn>
      </Card>
    </div>
  );
}

function StartJourneyScreen({ onNav, onSave }: { onNav: (s: Screen) => void; onSave: (p: Profile) => void }) {
  const { t } = useLanguage();
  const [name, setName] = useState("");

  function create() {
    if (!name.trim()) return;
    const newP: Profile = {
      id: "p_" + Date.now(), name: name.trim(), avatar: "👵", age: 68, language: "Assamese", region: "Assam",
      accessibility: { spokenGuidance: true, largeText: true, highContrast: false },
      activities: { completed: 0, bestCategory: "Listening", level: 1 }, memories: [], reminders: [],
    };
    onSave(newP); onNav("profile-created");
  }

  return (
    <div className="min-h-screen pb-24 flex items-center justify-center p-4">
      <Card level={3} className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-black text-[var(--text-primary)]">{t.profile.createProfile}</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-3" />
        <Btn onClick={create} variant="primary" fullWidth>Save &amp; Start</Btn>
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
        <Btn onClick={() => onNav("home")} variant="primary" fullWidth>Go to Homepage →</Btn>
      </div>
    </div>
  );
}

function ProfileHomeScreen({ profile, onNav, onSwitchProfile }: { profile: Profile; onNav: (s: Screen) => void; onSwitchProfile: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen pb-24 pt-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{profile.avatar}</span>
            <div>
              <h1 className="text-3xl font-black text-[var(--text-primary)]">{profile.name}</h1>
              <p className="text-sm font-bold text-[var(--text-muted)]">{profile.region} · {profile.language} · Age {profile.age}</p>
            </div>
          </div>
          <Btn onClick={onSwitchProfile} variant="secondary" className="text-xs py-2 px-4">{t.profile.switchProfile}</Btn>
        </div>
        <div className="flex gap-4">
          <Btn onClick={() => onNav("activities")} variant="primary">{t.activities.title}</Btn>
          <Btn onClick={() => onNav("my-memories")} variant="secondary">{t.memories.title}</Btn>
        </div>
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
  const { profiles, active, saveProfile, switchTo } = useProfiles();
  const { dark, toggleDark } = useDarkTheme();
  const { notice, clearNotice } = useLanguage();

  const [screen, setScreen] = useState<Screen>("home");
  const [isOffline, setIsOffline] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    document.title = "MEMOVERSE";
  }, []);

  function nav(s: Screen) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScreen(s);
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
        screen={screen}
        onNav={nav}
        active={active}
        onSwitchProfile={() => setProfileModalOpen(true)}
        dark={dark}
        toggleDark={toggleDark}
        isOffline={isOffline}
        toggleOffline={() => setIsOffline((v) => !v)}
      />

      <main>
        {screen === "home" && <HomeScreen onNav={nav} active={active} onSwitchProfile={() => setProfileModalOpen(true)} />}
        {screen === "more" && <MoreScreen onNav={nav} active={active} onSwitchProfile={() => setProfileModalOpen(true)} isOffline={isOffline} toggleOffline={() => setIsOffline((v) => !v)} />}
        {screen === "about-dementia" && <AboutDementiaScreen onNav={nav} />}
        {screen === "activities"     && <ActivitiesScreen onNav={nav} />}

        {screen === "game-memory" && <GameMemoryScreen onNav={nav} active={active} onProgress={recordProgress} />}
        {screen === "game-sounds" && <GameSoundsScreen onNav={nav} active={active} onProgress={recordProgress} />}
        {screen === "game-market" && <GameMarketScreen onNav={nav} active={active} onProgress={recordProgress} />}
        {screen === "game-story"  && <GameStoryScreen onNav={nav} active={active} onProgress={recordProgress} />}

        {screen === "profiles-select" && (
          <ProfilesSelectScreen
            profiles={profiles}
            active={active}
            onSelect={(id) => { switchTo(id); nav("profile-home"); }}
            onCreateNew={() => nav("start-journey")}
            onSkip={() => nav("activities")}
          />
        )}
        {screen === "start-journey"  && <StartJourneyScreen onNav={nav} onSave={saveProfile} />}
        {screen === "profile-created"&& <ProfileCreatedScreen active={active} onNav={nav} />}

        {screen === "profile-home" && active && <ProfileHomeScreen profile={active} onNav={nav} onSwitchProfile={() => setProfileModalOpen(true)} />}
        {screen === "my-memories" && active && <MyMemoriesScreen profile={active} onUpdate={saveProfile} />}
        {screen === "reminders" && active && <RemindersScreen profile={active} onUpdate={saveProfile} />}
        {screen === "progress" && active && <ProgressScreen profile={active} onNav={nav} />}
        {screen === "gate" && <GateScreen onNav={nav} onProfiles={() => setProfileModalOpen(true)} />}
      </main>

      <Footer onNav={nav} />

      <SwitchProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profiles={profiles}
        active={active}
        onSelect={(id) => { switchTo(id); nav("profile-home"); }}
        onCreateNew={() => nav("start-journey")}
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
