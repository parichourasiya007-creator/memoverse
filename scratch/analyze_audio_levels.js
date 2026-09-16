import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(__dirname, '..', 'src', 'assets', 'audio');
const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.wav'));

console.log('=== AUDIO SAMPLE AMPLITUDE ANALYSIS ===\n');

files.forEach(file => {
  const filePath = path.join(audioDir, file);
  const buffer = fs.readFileSync(filePath);

  const dataBuffer = buffer.slice(44);
  const sampleCount = dataBuffer.length / 2;

  let min = 0;
  let max = 0;
  let sumSq = 0;
  let nonZeroCount = 0;

  for (let i = 0; i < sampleCount; i++) {
    const val = dataBuffer.readInt16LE(i * 2) / 32768;
    if (val < min) min = val;
    if (val > max) max = val;
    if (val !== 0) nonZeroCount++;
    sumSq += val * val;
  }

  const rms = Math.sqrt(sumSq / sampleCount);

  console.log(`File: ${file}`);
  console.log(`  Total Samples: ${sampleCount}`);
  console.log(`  Non-zero Samples: ${nonZeroCount} (${((nonZeroCount/sampleCount)*100).toFixed(1)}%)`);
  console.log(`  Min Amplitude: ${min.toFixed(4)}`);
  console.log(`  Max Amplitude: ${max.toFixed(4)}`);
  console.log(`  RMS Level: ${rms.toFixed(4)}`);
  console.log(`  Audible Status: ${rms > 0.01 ? '🔊 AUDIBLE (Good signal)' : '⚠️ VERY FAINT OR SILENT'}`);
  console.log('----------------------------------------');
});
