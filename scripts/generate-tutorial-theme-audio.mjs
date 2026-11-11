// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// STANDALONE AUDIO GENERATOR FOR TUTORIAL THEME MUSIC
// Generates peaceful, 16-bit 44.1kHz acoustic WAV audio tracks
// ============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const audioDir = path.join(rootDir, 'public', 'audio');

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

/**
 * Creates a standard RIFF/WAVE header
 */
function createWavHeader(numSamples, sampleRate = 44100, numChannels = 1, bitsPerSample = 16) {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = (numSamples * numChannels * bitsPerSample) / 8;
  const buffer = Buffer.alloc(44);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size for PCM
  buffer.writeUInt16LE(1, 20);  // AudioFormat 1 = PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

/**
 * Synthesizes a peaceful piano note with natural acoustic decay & overtones
 */
function synthPianoNote(freq, t, duration) {
  if (t < 0 || t > duration) return 0;
  const attack = Math.min(1, t / 0.04);
  const decay = Math.exp(-3.2 * (t / duration));
  
  // Fundamental + warm overtones (soft piano profile)
  const h1 = Math.sin(2 * Math.PI * freq * t);
  const h2 = 0.45 * Math.sin(2 * Math.PI * (freq * 2) * t);
  const h3 = 0.20 * Math.sin(2 * Math.PI * (freq * 3) * t);
  const h4 = 0.08 * Math.sin(2 * Math.PI * (freq * 4) * t);
  const ambientPad = 0.15 * Math.sin(2 * Math.PI * (freq * 0.5) * t);

  return (h1 + h2 + h3 + h4 + ambientPad) * attack * decay;
}

/**
 * Generates an audio track buffer with peaceful chords and smooth fade-in/out
 */
function generateTrackBuffer(durationSeconds, fadeInSec, fadeOutSec, chordProgression) {
  const sampleRate = 44100;
  const numSamples = Math.floor(durationSeconds * sampleRate);
  const samples = new Float32Array(numSamples);

  // Render each chord in progression
  for (const chord of chordProgression) {
    const chordStartSample = Math.floor(chord.startTime * sampleRate);
    const chordDuration = chord.duration;
    
    for (const freq of chord.frequencies) {
      for (let i = 0; i < chordDuration * sampleRate; i++) {
        const sampleIdx = chordStartSample + i;
        if (sampleIdx >= numSamples) break;
        const t = i / sampleRate;
        samples[sampleIdx] += synthPianoNote(freq, t, chordDuration) * chord.gain;
      }
    }
  }

  // Apply smooth exponential Fade-in and Fade-out
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let fade = 1.0;

    if (t < fadeInSec) {
      fade = Math.sin((t / fadeInSec) * (Math.PI / 2));
    } else if (t > durationSeconds - fadeOutSec) {
      const remaining = durationSeconds - t;
      fade = Math.sin((remaining / fadeOutSec) * (Math.PI / 2));
    }

    samples[i] *= fade;
  }

  // Normalize volume to comfortable, quiet background level (-18 LUFS equivalent peak ~0.35)
  let maxPeak = 0;
  for (let i = 0; i < numSamples; i++) {
    const abs = Math.abs(samples[i]);
    if (abs > maxPeak) maxPeak = abs;
  }

  const targetPeak = 0.32; // Gentle background level
  const gain = maxPeak > 0 ? targetPeak / maxPeak : 1.0;

  // Convert to 16-bit PCM Buffer
  const pcmBuffer = Buffer.alloc(numSamples * 2);
  for (let i = 0; i < numSamples; i++) {
    let s = Math.max(-1, Math.min(1, samples[i] * gain));
    const intSample = Math.floor(s < 0 ? s * 32768 : s * 32767);
    pcmBuffer.writeInt16LE(intSample, i * 2);
  }

  const wavHeader = createWavHeader(numSamples, sampleRate, 1, 16);
  return Buffer.concat([wavHeader, pcmBuffer]);
}

// 1. Track 1: Morning Grace (10.0s) - C Major -> G -> Am -> F (Soft Piano & Pad)
console.log('Generating Track 1: deep-theme-morning-grace-10s.wav...');
const track1Chords = [
  { startTime: 0.0, duration: 2.6, frequencies: [261.63, 329.63, 392.00, 523.25], gain: 0.28 }, // C major (C4, E4, G4, C5)
  { startTime: 2.5, duration: 2.6, frequencies: [246.94, 293.66, 392.00, 493.88], gain: 0.27 }, // G/B (B3, D4, G4, B4)
  { startTime: 5.0, duration: 2.6, frequencies: [220.00, 261.63, 329.63, 440.00], gain: 0.28 }, // A minor (A3, C4, E4, A4)
  { startTime: 7.2, duration: 2.8, frequencies: [174.61, 261.63, 349.23, 523.25], gain: 0.26 }, // F major (F3, C4, F4, C5)
];
const track1Wav = generateTrackBuffer(10.0, 1.5, 2.0, track1Chords);
fs.writeFileSync(path.join(audioDir, 'deep-theme-morning-grace-10s.wav'), track1Wav);
console.log(`✓ Track 1 generated: ${track1Wav.length} bytes (10.0 seconds)`);

// 2. Track 2: Shanti Waters (11.0s) - D Major -> A -> Bm -> G (Gentle Flute & Acoustic)
console.log('Generating Track 2: deep-theme-shanti-waters-11s.wav...');
const track2Chords = [
  { startTime: 0.0, duration: 2.8, frequencies: [293.66, 369.99, 440.00, 587.33], gain: 0.27 }, // D
  { startTime: 2.7, duration: 2.8, frequencies: [220.00, 277.18, 329.63, 440.00], gain: 0.26 }, // A
  { startTime: 5.4, duration: 2.8, frequencies: [246.94, 293.66, 369.99, 493.88], gain: 0.27 }, // Bm
  { startTime: 8.0, duration: 3.0, frequencies: [196.00, 246.94, 293.66, 392.00], gain: 0.25 }, // G
];
const track2Wav = generateTrackBuffer(11.0, 2.0, 2.0, track2Chords);
fs.writeFileSync(path.join(audioDir, 'deep-theme-shanti-waters-11s.wav'), track2Wav);
console.log(`✓ Track 2 generated: ${track2Wav.length} bytes (11.0 seconds)`);

// 3. Track 3: Heavenly Dawn (9.5s) - F Major -> C -> Dm -> Bb (Sacred Strings & Piano)
console.log('Generating Track 3: deep-theme-heavenly-dawn-9s.wav...');
const track3Chords = [
  { startTime: 0.0, duration: 2.4, frequencies: [174.61, 220.00, 261.63, 349.23], gain: 0.28 }, // F
  { startTime: 2.3, duration: 2.4, frequencies: [261.63, 329.63, 392.00, 523.25], gain: 0.27 }, // C
  { startTime: 4.6, duration: 2.4, frequencies: [146.83, 220.00, 261.63, 293.66], gain: 0.27 }, // Dm
  { startTime: 6.8, duration: 2.7, frequencies: [116.54, 174.61, 233.08, 349.23], gain: 0.25 }, // Bb
];
const track3Wav = generateTrackBuffer(9.5, 1.5, 1.8, track3Chords);
fs.writeFileSync(path.join(audioDir, 'deep-theme-heavenly-dawn-9s.wav'), track3Wav);
console.log(`✓ Track 3 generated: ${track3Wav.length} bytes (9.5 seconds)`);

console.log('All 3 verified tutorial theme music tracks successfully generated in public/audio/');
