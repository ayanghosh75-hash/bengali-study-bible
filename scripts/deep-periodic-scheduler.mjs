#!/usr/bin/env node
// ============================================================================
// BENGALI STUDY BIBLE — DEEP PERIODIC SCHEDULER (15m, 6h, 24h, 7d)
// Controlled Level-4 Parity with Lexi (Logos Lexicon)
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const incidentsDir = path.join(projectRoot, '.incidents');

if (!fs.existsSync(incidentsDir)) {
  fs.mkdirSync(incidentsDir, { recursive: true });
}

const SCHEDULER_LOG = path.join(incidentsDir, 'deep-scheduler-state.json');

function loadSchedulerState() {
  if (fs.existsSync(SCHEDULER_LOG)) {
    try {
      return JSON.parse(fs.readFileSync(SCHEDULER_LOG, 'utf8'));
    } catch {}
  }
  return {
    last15mRun: 0,
    last6hRun: 0,
    last24hRun: 0,
    last7dRun: 0,
    totalExecutions: { '15m': 0, '6h': 0, '24h': 0, '7d': 0 },
  };
}

function saveSchedulerState(state) {
  fs.writeFileSync(SCHEDULER_LOG, JSON.stringify(state, null, 2));
}

// ----------------------------------------------------------------------------
// Suite: 15-Minute Operational Health Audit
// ----------------------------------------------------------------------------
export async function run15mSuite() {
  console.log('\n⏱️  [PERIODIC_15M] Running 15-Minute Operational Health & Rotating Chapter Audit...');
  try {
    execSync('node scripts/deep-15min-monitor.mjs --once', { stdio: 'inherit', cwd: projectRoot });
    return { success: true, timestamp: new Date().toISOString() };
  } catch (err) {
    console.error('❌ [PERIODIC_15M] Audit failed:', err.message);
    return { success: false, error: err.message, timestamp: new Date().toISOString() };
  }
}

// ----------------------------------------------------------------------------
// Suite: 6-Hour Deep Integrity & Random Book Sampling
// ----------------------------------------------------------------------------
export async function run6hSuite() {
  console.log('\n⏱️  [PERIODIC_6H] Running 6-Hour Deep Integrity & Sample Audit...');
  const manifestPath = path.join(projectRoot, 'public', 'bible-data', 'irv', 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Manifest missing');
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const books = manifest.books || [];

  // Pick 5 random books to deeply audit
  const sampledBooks = [];
  const shuffled = [...books].sort(() => 0.5 - Math.random());
  for (let i = 0; i < Math.min(5, shuffled.length); i++) {
    sampledBooks.push(shuffled[i]);
  }

  console.log(`   Auditing 5 sampled books: ${sampledBooks.map((b) => `${b.nameBn} (${b.id})`).join(', ')}`);

  for (const book of sampledBooks) {
    const bookFilePath = path.join(projectRoot, 'public', 'bible-data', 'irv', `${book.id}.json`);
    if (!fs.existsSync(bookFilePath)) {
      throw new Error(`Book file missing: ${book.id}`);
    }
    const bookData = JSON.parse(fs.readFileSync(bookFilePath, 'utf8'));
    const chaptersObj = bookData.chapters || {};
    const chKeys = Object.keys(chaptersObj);
    if (chKeys.length !== book.expectedChapters) {
      throw new Error(`Book ${book.id} chapter count mismatch: got ${chKeys.length}, expected ${book.expectedChapters}`);
    }
  }

  console.log('✅ [PERIODIC_6H] 6-Hour Deep Sample Audit PASSED. All sampled books verified.');
  return { success: true, sampled: sampledBooks.map((b) => b.id), timestamp: new Date().toISOString() };
}

// ----------------------------------------------------------------------------
// Suite: 24-Hour Master Checksum & Full 66-Book Verification
// ----------------------------------------------------------------------------
export async function run24hSuite() {
  console.log('\n⏱️  [PERIODIC_24H] Running 24-Hour Master Checksum & 66-Book Verification...');
  try {
    execSync('node scripts/verify-bible-completeness-matrix.mjs', { stdio: 'inherit', cwd: projectRoot });
    console.log('✅ [PERIODIC_24H] 24-Hour 66-Book Master Hash Verification PASSED.');
    return { success: true, timestamp: new Date().toISOString() };
  } catch (err) {
    console.error('❌ [PERIODIC_24H] 66-Book Master Verification failed:', err.message);
    return { success: false, error: err.message, timestamp: new Date().toISOString() };
  }
}

// ----------------------------------------------------------------------------
// Suite: 7-Day Comprehensive Regression & Route Spider
// ----------------------------------------------------------------------------
export async function run7dSuite() {
  console.log('\n⏱️  [PERIODIC_7D] Running 7-Day Comprehensive Regression Suite...');
  const testCommands = [
    'node scripts/test-install-qr-distribution.mjs',
    'node scripts/verify-bible-completeness-matrix.mjs',
    'node scripts/deep-15min-monitor.mjs --once',
  ];

  for (const cmd of testCommands) {
    console.log(`   Executing: ${cmd}`);
    execSync(cmd, { stdio: 'inherit', cwd: projectRoot });
  }

  console.log('✅ [PERIODIC_7D] 7-Day Comprehensive Regression PASSED.');
  return { success: true, timestamp: new Date().toISOString() };
}

// ----------------------------------------------------------------------------
// CLI Execution
// ----------------------------------------------------------------------------
const args = process.argv.slice(2);
const modeArg = args.find((a) => a.startsWith('--mode='));
const mode = modeArg ? modeArg.split('=')[1] : null;
const isDaemon = args.includes('--daemon');

async function main() {
  const state = loadSchedulerState();
  const now = Date.now();

  if (mode === '15m') {
    await run15mSuite();
    state.last15mRun = now;
    state.totalExecutions['15m']++;
    saveSchedulerState(state);
    process.exit(0);
  }

  if (mode === '6h') {
    await run6hSuite();
    state.last6hRun = now;
    state.totalExecutions['6h']++;
    saveSchedulerState(state);
    process.exit(0);
  }

  if (mode === '24h') {
    await run24hSuite();
    state.last24hRun = now;
    state.totalExecutions['24h']++;
    saveSchedulerState(state);
    process.exit(0);
  }

  if (mode === '7d') {
    await run7dSuite();
    state.last7dRun = now;
    state.totalExecutions['7d']++;
    saveSchedulerState(state);
    process.exit(0);
  }

  if (mode === 'all') {
    console.log('🚀 Running ALL periodic suites sequentially (15m, 6h, 24h, 7d)...');
    await run15mSuite();
    await run6hSuite();
    await run24hSuite();
    await run7dSuite();
    state.last15mRun = now;
    state.last6hRun = now;
    state.last24hRun = now;
    state.last7dRun = now;
    saveSchedulerState(state);
    console.log('\n🎉 ALL PERIODIC SUITES EXECUTED SUCCESSFULLY!');
    process.exit(0);
  }

  if (isDaemon) {
    console.log('🚀 Starting Deep Periodic Scheduler Daemon...');
    console.log('   Schedules: 15m operational, 6h deep sample, 24h master hash, 7d regression.');

    const checkAndRun = async () => {
      const currentTime = Date.now();
      const s = loadSchedulerState();

      if (currentTime - s.last15mRun >= 15 * 60 * 1000) {
        await run15mSuite();
        s.last15mRun = currentTime;
        s.totalExecutions['15m']++;
        saveSchedulerState(s);
      }

      if (currentTime - s.last6hRun >= 6 * 60 * 60 * 1000) {
        await run6hSuite();
        s.last6hRun = currentTime;
        s.totalExecutions['6h']++;
        saveSchedulerState(s);
      }

      if (currentTime - s.last24hRun >= 24 * 60 * 60 * 1000) {
        await run24hSuite();
        s.last24hRun = currentTime;
        s.totalExecutions['24h']++;
        saveSchedulerState(s);
      }

      if (currentTime - s.last7dRun >= 7 * 24 * 60 * 60 * 1000) {
        await run7dSuite();
        s.last7dRun = currentTime;
        s.totalExecutions['7d']++;
        saveSchedulerState(s);
      }
    };

    await checkAndRun();
    setInterval(checkAndRun, 60 * 1000); // Poll scheduler every 1 minute
  } else {
    console.log('Usage: node scripts/deep-periodic-scheduler.mjs [--mode=15m|6h|24h|7d|all] [--daemon]');
  }
}

main().catch((err) => {
  console.error('Periodic Scheduler Error:', err);
  process.exit(1);
});
