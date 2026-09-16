import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(__dirname, '..', 'src', 'assets', 'audio');
const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.wav'));

console.log(`Found ${files.length} WAV files in ${audioDir}:\n`);

files.forEach(file => {
  const filePath = path.join(audioDir, file);
  const buffer = fs.readFileSync(filePath);

  const riff = buffer.toString('ascii', 0, 4);
  const fileSizeInHeader = buffer.readUInt32LE(4);
  const wave = buffer.toString('ascii', 8, 12);
  const fmt = buffer.toString('ascii', 12, 16);
  const audioFormat = buffer.readUInt16LE(20); // 1 = PCM
  const numChannels = buffer.readUInt16LE(22);
  const sampleRate = buffer.readUInt32LE(24);
  const byteRate = buffer.readUInt32LE(28);
  const blockAlign = buffer.readUInt16LE(32);
  const bitsPerSample = buffer.readUInt16LE(34);
  const dataTag = buffer.toString('ascii', 36, 40);
  const dataSize = buffer.readUInt32LE(40);

  const duration = (dataSize / (sampleRate * numChannels * (bitsPerSample / 8))).toFixed(2);
  const isValidPCM = riff === 'RIFF' && wave === 'WAVE' && fmt === 'fmt ' && audioFormat === 1 && dataTag === 'data';

  console.log(`File: ${file}`);
  console.log(`  Size on disk: ${buffer.length} bytes`);
  console.log(`  Valid RIFF/WAVE PCM: ${isValidPCM}`);
  console.log(`  Channels: ${numChannels}, SampleRate: ${sampleRate}Hz, Bits: ${bitsPerSample}`);
  console.log(`  Duration: ${duration} seconds`);
  console.log(`  Header ChunkSize: ${fileSizeInHeader}, DataSize: ${dataSize}`);
  console.log('---');
});
