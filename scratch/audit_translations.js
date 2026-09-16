import fs from 'fs';
import path from 'path';

// Load translations file text and analyze
const filePath = path.resolve('src/translations.ts');
const content = fs.readFileSync(filePath, 'utf8');

console.log("Analyzing translations.ts...");

const languages = [
  "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati",
  "Hindi", "Kannada", "Kashmiri", "Konkani", "Maithili",
  "Malayalam", "Manipuri", "Marathi", "Nepali", "Odia",
  "Punjabi", "Sanskrit", "Santali", "Sindhi", "Tamil",
  "Telugu", "Urdu"
];

for (const lang of languages) {
  const hasLang = content.includes(`${lang}:`);
  console.log(`${lang}: ${hasLang ? "Found" : "MISSING"}`);
}
