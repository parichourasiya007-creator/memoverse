import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsFile = path.join(__dirname, '..', 'dist', 'assets', 'index-CgDVjZZW.js');
const content = fs.readFileSync(jsFile, 'utf8');

const targets = [
  'pepa_instrumental-nX23IMNm.wav',
  'bamboo_flute-sSae6rAN.wav',
  'dhol_rhythm-D-ZmDqP2.wav',
  'river_nature-u04hEizZ.wav',
  'tea_garden-CsUXETAP.wav'
];

targets.forEach(target => {
  const idx = content.indexOf(target);
  if (idx !== -1) {
    const snippet = content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 100));
    console.log(`Snippet for ${target}:\n---`);
    console.log(snippet);
    console.log('---\n');
  }
});
