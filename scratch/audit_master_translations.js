import { TRANSLATIONS, TranslationSchema } from "../src/translations.js";
import { LANGUAGE_METADATA } from "../src/speechUtils.js";

const expectedLanguages = [
  "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi",
  "Kannada", "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri",
  "Marathi", "Nepali", "Odia", "Punjabi", "Sanskrit", "Santali",
  "Sindhi", "Tamil", "Telugu", "Urdu", "English"
];

console.log("Checking languages defined in TRANSLATIONS...");
const translationLangs = Object.keys(TRANSLATIONS);
console.log("Found languages count:", translationLangs.length);

expectedLanguages.forEach((lang) => {
  if (!TRANSLATIONS[lang]) {
    console.error(`❌ Missing language in TRANSLATIONS: ${lang}`);
  } else {
    console.log(`✓ ${lang} present in TRANSLATIONS`);
  }
});

console.log("\nChecking BCP-47 speech codes in LANGUAGE_METADATA...");
expectedLanguages.forEach((lang) => {
  const meta = LANGUAGE_METADATA[lang];
  if (!meta) {
    console.error(`❌ Missing voice metadata for: ${lang}`);
  } else {
    console.log(`✓ ${lang} -> code: ${meta.code}, fallbacks: ${meta.fallbacks.join(", ")}`);
  }
});
