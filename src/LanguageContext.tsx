import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS, getTranslation, TranslationSchema } from "./translations";
import { speakInLanguage, stopSpeech, getVoiceStatus, VoiceStatus, LANGUAGE_METADATA } from "./speechUtils";

interface LanguageContextType {
  lang: string;
  setLang: (l: string) => void;
  t: TranslationSchema;
  speakText: (text: string) => void;
  stopText: () => void;
  voiceStatus: VoiceStatus;
  notice: string | null;
  clearNotice: () => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DEFAULT_LANGUAGE = "English";

// ISO / Language Code normalization map for supported languages
const CODE_TO_LANG: Record<string, string> = {
  en: "English",
  "en-in": "English",
  "en-us": "English",
  "en-gb": "English",
  as: "Assamese",
  "as-in": "Assamese",
  bn: "Bengali",
  "bn-in": "Bengali",
  hi: "Hindi",
  "hi-in": "Hindi",
  gu: "Gujarati",
  "gu-in": "Gujarati",
  kn: "Kannada",
  "kn-in": "Kannada",
  ml: "Malayalam",
  "ml-in": "Malayalam",
  mr: "Marathi",
  "mr-in": "Marathi",
  ne: "Nepali",
  "ne-in": "Nepali",
  "ne-np": "Nepali",
  or: "Odia",
  "or-in": "Odia",
  pa: "Punjabi",
  "pa-in": "Punjabi",
  ta: "Tamil",
  "ta-in": "Tamil",
  te: "Telugu",
  "te-in": "Telugu",
  ur: "Urdu",
  "ur-in": "Urdu",
  sa: "Sanskrit",
  "sa-in": "Sanskrit",
  sat: "Santali",
  "sat-in": "Santali",
  sd: "Sindhi",
  "sd-in": "Sindhi",
  ks: "Kashmiri",
  "ks-in": "Kashmiri",
  kok: "Konkani",
  "kok-in": "Konkani",
  mai: "Maithili",
  "mai-in": "Maithili",
  mni: "Manipuri",
  "mni-in": "Manipuri",
  brx: "Bodo",
  "brx-in": "Bodo",
  doi: "Dogri",
  "doi-in": "Dogri",
  kha: "Khasi",
  "kha-in": "Khasi",
  grt: "Garo",
  "grt-in": "Garo",
  lus: "Mizo",
  "lus-in": "Mizo",
};

/**
 * Normalizes a raw language string to a supported LANGUAGE_METADATA key.
 * Returns null if invalid or unsupported.
 */
function normalizeSupportedLanguage(val: unknown): string | null {
  if (typeof val !== "string" || !val.trim()) return null;
  const cleaned = val.trim();

  // 1. Direct match with exact key in LANGUAGE_METADATA (e.g. "English", "Hindi", "Assamese")
  if (LANGUAGE_METADATA[cleaned]) return cleaned;

  // 2. Case-insensitive key match
  const lower = cleaned.toLowerCase();
  for (const key of Object.keys(LANGUAGE_METADATA)) {
    if (key.toLowerCase() === lower) return key;
  }

  // 3. Match language code string (e.g. "en", "hi", "en-IN")
  if (CODE_TO_LANG[lower]) return CODE_TO_LANG[lower];

  return null;
}

/**
 * Determines the initial language for MemoVerse.
 * - Always defaults to "English" on first visit or if no valid preference is saved.
 * - Checks 'memoverse_language' primary key, then legacy 'mv_lang'.
 * - NEVER uses navigator.language or device language detection.
 */
function getInitialLanguage(): string {
  try {
    const keysToTry = ["memoverse_language", "mv_lang"];
    for (const key of keysToTry) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      let val: unknown = raw;
      try {
        val = JSON.parse(raw);
      } catch {
        val = raw;
      }

      const normalized = normalizeSupportedLanguage(val);
      if (normalized) return normalized;
    }
  } catch {
    // If localStorage access throws, safely fall back to English
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<string>(getInitialLanguage);
  const [notice, setNotice] = useState<string | null>(null);

  const isRtl = ["Urdu", "Sindhi", "Kashmiri"].includes(lang);

  useEffect(() => {
    try {
      localStorage.setItem("memoverse_language", lang);
      localStorage.setItem("mv_lang", JSON.stringify(lang));
    } catch {}
    stopSpeech(); // Stop speech when language changes

    if (typeof document !== "undefined") {
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
      const meta = LANGUAGE_METADATA[lang];
      if (meta) {
        document.documentElement.lang = meta.code;
      }
    }
  }, [lang, isRtl]);

  function setLang(newLang: string) {
    const valid = normalizeSupportedLanguage(newLang);
    if (valid) {
      setLangState(valid);
    }
  }

  function clearNotice() {
    setNotice(null);
  }

  function speakText(text: string) {
    const res = speakInLanguage(
      text,
      lang,
      undefined,
      (err) => {
        setNotice(err);
        setTimeout(() => setNotice(null), 5000);
      }
    );

    if (!res.success && res.message) {
      setNotice(res.message);
      setTimeout(() => setNotice(null), 5000);
    }
  }

  function stopText() {
    stopSpeech();
  }

  const t = getTranslation(lang);
  const voiceStatus = getVoiceStatus(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, speakText, stopText, voiceStatus, notice, clearNotice, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
