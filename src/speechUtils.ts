// ─── MemoVerse Speech Synthesis & Capability Engine (22 Scheduled Languages) ───

export interface LanguageVoiceInfo {
  code: string;
  fallbacks: string[];
  nativeName: string;
}

export const LANGUAGE_METADATA: Record<string, LanguageVoiceInfo> = {
  Assamese:  { code: "as-IN", fallbacks: ["as"], nativeName: "অসমীয়া (Assamese)" },
  Bengali:   { code: "bn-IN", fallbacks: ["bn"], nativeName: "বাংলা (Bengali)" },
  Bodo:      { code: "brx-IN", fallbacks: ["brx"], nativeName: "बड़ो (Bodo)" },
  Dogri:     { code: "doi-IN", fallbacks: ["doi"], nativeName: "डोगरी (Dogri)" },
  Gujarati:  { code: "gu-IN", fallbacks: ["gu"], nativeName: "ગુજરાતી (Gujarati)" },
  Hindi:     { code: "hi-IN", fallbacks: ["hi"], nativeName: "हिन्दी (Hindi)" },
  Kannada:   { code: "kn-IN", fallbacks: ["kn"], nativeName: "ಕನ್ನಡ (Kannada)" },
  Kashmiri:  { code: "ks-IN", fallbacks: ["ks"], nativeName: "کٲشُر (Kashmiri)" },
  Konkani:   { code: "kok-IN", fallbacks: ["kok"], nativeName: "कोंकणी (Konkani)" },
  Maithili:  { code: "mai-IN", fallbacks: ["mai"], nativeName: "मैथिली (Maithili)" },
  Malayalam: { code: "ml-IN", fallbacks: ["ml"], nativeName: "മലയാളം (Malayalam)" },
  Manipuri:  { code: "mni-IN", fallbacks: ["mni"], nativeName: "মৈতৈলোন (Manipuri / Meitei)" },
  Marathi:   { code: "mr-IN", fallbacks: ["mr"], nativeName: "मराठी (Marathi)" },
  Nepali:    { code: "ne-NP",  fallbacks: ["ne-IN", "ne"], nativeName: "नेपाली (Nepali)" },
  Odia:      { code: "or-IN",  fallbacks: ["or"], nativeName: "ଓଡ଼ିଆ (Odia)" },
  Punjabi:   { code: "pa-IN",  fallbacks: ["pa"], nativeName: "ਪੰਜਾਬੀ (Punjabi)" },
  Sanskrit:  { code: "sa-IN",  fallbacks: ["sa"], nativeName: "संस्कृतम् (Sanskrit)" },
  Santali:   { code: "sat-IN", fallbacks: ["sat"], nativeName: "ᱥᱟᱱᱛᱟᱲᱤ (Santali)" },
  Sindhi:    { code: "sd-IN",  fallbacks: ["sd"], nativeName: "سنڌي (Sindhi)" },
  Tamil:     { code: "ta-IN",  fallbacks: ["ta"], nativeName: "தமிழ் (Tamil)" },
  Telugu:    { code: "te-IN",  fallbacks: ["te"], nativeName: "తెలుగు (Telugu)" },
  Urdu:      { code: "ur-IN",  fallbacks: ["ur"], nativeName: "اردو (Urdu)" },
  English:   { code: "en-IN", fallbacks: ["en-GB", "en-US", "en"], nativeName: "English" },
  Khasi:     { code: "kha-IN", fallbacks: ["kha"], nativeName: "Ka Ktien Khasi (Khasi)" },
  Garo:      { code: "grt-IN", fallbacks: ["grt"], nativeName: "A·chik Kku (Garo)" },
  Mizo:      { code: "lus-IN", fallbacks: ["lus"], nativeName: "Mizo Ṭawng (Mizo)" },
};

/**
 * Check if a browser TTS voice is installed on this device for the target language.
 */
export function findBestVoiceForLanguage(languageName: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const meta = LANGUAGE_METADATA[languageName] || { code: "en-IN", fallbacks: ["en"], nativeName: languageName };
  const targetCodes = [meta.code, ...meta.fallbacks].map(c => c.toLowerCase());

  // 1. Direct match by lang code prefix or exact code
  for (const targetCode of targetCodes) {
    const matched = voices.find(v => v.lang.toLowerCase() === targetCode || v.lang.toLowerCase().startsWith(targetCode));
    if (matched) return matched;
  }

  // 2. Match voice name if it mentions the language name
  const langLower = languageName.toLowerCase();
  const nameMatched = voices.find(v => v.name.toLowerCase().includes(langLower));
  if (nameMatched) return nameMatched;

  return null;
}

export interface VoiceStatus {
  hasSpeechSynthesis: boolean;
  voiceAvailable: boolean;
  voiceName?: string;
  langCode: string;
}

export function getVoiceStatus(languageName: string): VoiceStatus {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { hasSpeechSynthesis: false, voiceAvailable: false, langCode: "en" };
  }

  const voice = findBestVoiceForLanguage(languageName);
  const meta = LANGUAGE_METADATA[languageName] || { code: "en-IN", fallbacks: ["en"], nativeName: languageName };

  return {
    hasSpeechSynthesis: true,
    voiceAvailable: !!voice,
    voiceName: voice ? voice.name : undefined,
    langCode: meta.code,
  };
}

/**
 * Speak text in the requested language.
 * STRICT RULE: If no voice exists for the target language, DO NOT fall back to English/Hindi.
 * Return an explicit status indicating voice unavailability for that specific language.
 */
export function speakInLanguage(
  text: string,
  languageName: string,
  onEnd?: () => void,
  onError?: (errMessage: string) => void
): { success: boolean; message?: string } {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    const msg = "Speech synthesis is not supported on this browser.";
    if (onError) onError(msg);
    return { success: false, message: msg };
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const voice = findBestVoiceForLanguage(languageName);

  if (!voice && languageName !== "English") {
    const msg = `Voice audio for ${languageName} is currently unavailable on your device's browser engine. Interface text is 100% active.`;
    if (onError) onError(msg);
    return { success: false, message: msg };
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else if (languageName === "English") {
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.9; // Comfortable pace for senior elders
    utterance.pitch = 1.0;

    if (onEnd) utterance.onend = () => onEnd();
    if (onError) utterance.onerror = () => onError("Audio playback encountered an error.");

    window.speechSynthesis.speak(utterance);
    return { success: true };
  } catch {
    const msg = "Error starting audio speech synthesis.";
    if (onError) onError(msg);
    return { success: false, message: msg };
  }
}

export function stopSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
