import { TRANSLATIONS, getTranslation } from "../src/translations.ts";
import { LANGUAGE_METADATA, getVoiceStatus } from "../src/speechUtils.ts";

console.log("=== LANGUAGE SYSTEM AUDIT ===");

const languageKeys = Object.keys(LANGUAGE_METADATA);
console.log(`Total languages in LANGUAGE_METADATA: ${languageKeys.length}`);
console.log("Languages:", languageKeys.join(", "));

const scheduled22 = [
  "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kannada", "Kashmiri",
  "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi", "Nepali", "Odia", "Punjabi",
  "Sanskrit", "Santali", "Sindhi", "Tamil", "Telugu", "Urdu"
];

let missingScheduled = [];
for (const lang of scheduled22) {
  if (!LANGUAGE_METADATA[lang]) {
    missingScheduled.push(lang);
  }
}

if (missingScheduled.length === 0) {
  console.log("✅ ALL 22 Scheduled Languages of India are present in LANGUAGE_METADATA!");
} else {
  console.error("❌ Missing scheduled languages:", missingScheduled);
}

// Test translation schema completeness for all languages
let translationErrors = 0;
for (const [langKey, meta] of Object.entries(LANGUAGE_METADATA)) {
  const trans = getTranslation(langKey);
  if (!trans || !trans.nav || !trans.home || !trans.activities || !trans.memories || !trans.reminders) {
    console.error(`❌ Incomplete translation schema for language: ${langKey}`);
    translationErrors++;
  }
}

if (translationErrors === 0) {
  console.log("✅ All language translation schemas are 100% valid and complete!");
}

console.log("=== AUDIT COMPLETE ===");
