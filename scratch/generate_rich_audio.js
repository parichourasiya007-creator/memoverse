import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWavHeader(dataLength, sampleRate = 44100, numChannels = 1, bitsPerSample = 16) {
  const buffer = Buffer.alloc(44);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
  buffer.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataLength, 40);
  return buffer;
}

const sampleRate = 44100;
const rootDir = path.join(__dirname, '..');
const srcAudioDir = path.join(rootDir, 'src', 'assets', 'audio');
const publicAudioDir = path.join(rootDir, 'public', 'audio');

[srcAudioDir, publicAudioDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function saveAudioFiles(baseName, legacyName, samples) {
  const dataLength = samples.length * 2;
  const header = createWavHeader(dataLength, sampleRate);
  const data = Buffer.alloc(dataLength);

  // Normalize samples to optimal volume (Peak ~0.85)
  let maxAmp = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > maxAmp) maxAmp = abs;
  }
  const gain = maxAmp > 0 ? 0.85 / maxAmp : 1.0;

  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i] * gain));
    data.writeInt16LE(Math.floor(s < 0 ? s * 0x8000 : s * 0x7FFF), i * 2);
  }

  const content = Buffer.concat([header, data]);

  const targetPaths = [
    path.join(srcAudioDir, `${baseName}.wav`),
    path.join(srcAudioDir, `${legacyName}.wav`),
    path.join(publicAudioDir, `${baseName}.wav`),
    path.join(publicAudioDir, `${baseName}.mp3`),
    path.join(publicAudioDir, `${legacyName}.wav`),
  ];

  targetPaths.forEach(p => fs.writeFileSync(p, content));
  console.log(`Saved audio asset: ${baseName} / ${legacyName} (${(samples.length / sampleRate).toFixed(1)}s, gain: ${gain.toFixed(2)})`);
}

// 1. Gogona Bamboo Jaw Harp (Rich plucked reed twang & acoustic resonance)
function generateGogona(duration = 4.5) {
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  const twangs = [
    { freq: 220, dur: 0.7, bend: 1.35 },
    { freq: 247, dur: 0.6, bend: 1.45 },
    { freq: 220, dur: 0.7, bend: 1.25 },
    { freq: 293.66, dur: 0.8, bend: 1.5 },
    { freq: 220, dur: 1.2, bend: 1.35 }
  ];

  let currentSample = 0;
  for (const tInfo of twangs) {
    const len = Math.floor(tInfo.dur * sampleRate);
    for (let i = 0; i < len && currentSample < numSamples; i++) {
      const t = i / sampleRate;
      const progress = i / len;
      const pitchMod = tInfo.freq * (1 + (tInfo.bend - 1) * Math.sin(Math.PI * Math.pow(progress, 0.35)));
      const fund = Math.sin(2 * Math.PI * pitchMod * t);
      const h2 = 0.65 * Math.sin(2 * Math.PI * pitchMod * 2 * t);
      const h3 = 0.4 * Math.sin(2 * Math.PI * pitchMod * 3 * t);
      const h4 = 0.25 * Math.sin(2 * Math.PI * pitchMod * 4 * t);
      const env = Math.exp(-progress * 3.8);
      samples[currentSample++] = (fund + h2 + h3 + h4) * env * 0.6;
    }
  }
  saveAudioFiles('gogona', 'pepa_instrumental', samples);
}

// 2. Assamese Bihu Dhol Drum Rhythm (Crisp stick hits + resonant bass drum pulses)
function generateBihuDhol(duration = 4.5) {
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  const pattern = [
    { type: 'bass', t: 0.0 },
    { type: 'stick', t: 0.35 },
    { type: 'bass', t: 0.7 },
    { type: 'stick', t: 1.05 },
    { type: 'stick', t: 1.25 },
    { type: 'bass', t: 1.6 },
    { type: 'stick', t: 1.95 },
    { type: 'bass', t: 2.3 },
    { type: 'stick', t: 2.65 },
    { type: 'stick', t: 2.85 },
    { type: 'bass', t: 3.2 },
    { type: 'stick', t: 3.55 }
  ];

  for (const beat of pattern) {
    const startIdx = Math.floor(beat.t * sampleRate);
    const len = Math.floor((beat.type === 'bass' ? 0.32 : 0.16) * sampleRate);

    for (let i = 0; i < len && (startIdx + i) < numSamples; i++) {
      const t = i / sampleRate;
      const progress = i / len;
      let val = 0;
      if (beat.type === 'bass') {
        const freq = 160 * Math.exp(-progress * 4.5) + 60;
        val = Math.sin(2 * Math.PI * freq * t) * Math.exp(-progress * 5.5);
      } else {
        const freq = 500 * Math.exp(-progress * 7) + 220;
        const snap = (Math.random() - 0.5) * 0.4;
        val = (Math.sin(2 * Math.PI * freq * t) + snap) * Math.exp(-progress * 10);
      }
      samples[startIdx + i] += val * 0.75;
    }
  }
  saveAudioFiles('bihu-dhol', 'dhol_rhythm', samples);
}

// 3. Tea Garden Birdsong (Authentic morning bird chirps & natural breeze)
function generateBirdsong(duration = 5.0) {
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  const chirps = [
    { start: 0.2, len: 0.45, baseFreq: 2400 },
    { start: 0.9, len: 0.55, baseFreq: 2800 },
    { start: 1.8, len: 0.6, baseFreq: 2500 },
    { start: 2.8, len: 0.5, baseFreq: 3100 },
    { start: 3.8, len: 0.65, baseFreq: 2600 }
  ];

  // Soft ambient breeze
  let b0 = 0;
  for (let i = 0; i < numSamples; i++) {
    const white = (Math.random() - 0.5) * 0.04;
    b0 = 0.985 * b0 + white * 0.08;
    samples[i] = b0;
  }

  for (const c of chirps) {
    const startIdx = Math.floor(c.start * sampleRate);
    const len = Math.floor(c.len * sampleRate);
    for (let i = 0; i < len && (startIdx + i) < numSamples; i++) {
      const t = i / sampleRate;
      const progress = i / len;
      const trill = Math.sin(2 * Math.PI * 20 * t) * 400;
      const freq = c.baseFreq + trill + Math.sin(Math.PI * progress) * 300;
      const env = Math.sin(Math.PI * progress);
      const chirp = Math.sin(2 * Math.PI * freq * t) * env * 0.55;
      samples[startIdx + i] += chirp;
    }
  }
  saveAudioFiles('tea-garden-birdsong', 'bamboo_flute', samples);
}

// 4. Porch Rain & Environmental Ambience
function generatePorchRain(duration = 5.0) {
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  let noiseState = 0;

  for (let i = 0; i < numSamples; i++) {
    const white = (Math.random() - 0.5);
    noiseState = 0.93 * noiseState + 0.07 * white;
    let rainDrop = 0;
    if (Math.random() < 0.003) {
      rainDrop = (Math.random() - 0.5) * 0.45;
    }
    samples[i] = (noiseState * 0.25) + rainDrop;
  }
  saveAudioFiles('porch-rain-chai', 'river_nature', samples);
}

generateGogona();
generateBihuDhol();
generateBirdsong();
generatePorchRain();
console.log('✅ REGENERATED ALL RICH LOUD AUDIO ASSETS IN BOTH SRC & PUBLIC!');
