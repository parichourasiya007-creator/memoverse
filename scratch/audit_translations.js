import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, '..', 'src', 'translations.ts');
const code = fs.readFileSync(file, 'utf8');

const langs = [
  "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kannada", "Kashmiri",
  "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi", "Nepali", "Odia", "Punjabi",
  "Sanskrit", "Santali", "Sindhi", "Tamil", "Telugu", "Urdu"
];

console.log('=== AUDITING TRANSLATIONS ===\n');

langs.forEach(lang => {
  const exists = code.includes(`${lang}: {`) || code.includes(`${lang}: baseEnglish`);
  console.log(`Language [${lang}]: ${exists ? '✅ PRESENT' : '❌ MISSING'}`);
});
