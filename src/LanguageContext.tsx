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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<string>(() => storageGet("mv_lang", "Assamese"));
  const [notice, setNotice] = useState<string | null>(null);

  const isRtl = ["Urdu", "Sindhi", "Kashmiri"].includes(lang);

  useEffect(() => {
    storageSet("mv_lang", lang);
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
    if (LANGUAGE_METADATA[newLang]) {
      setLangState(newLang);
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
