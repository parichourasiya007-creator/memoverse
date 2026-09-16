import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist', 'assets');
const jsFiles = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));

console.log('JS files in dist/assets:', jsFiles);

jsFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`Checking ${file} (${content.length} bytes)...`);

  // Search for audio references
  const matches = content.match(/[a-zA-Z0-9_\-\.\/]+\.wav/g);
  console.log('Found .wav occurrences:', matches);
});
