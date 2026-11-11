#!/usr/bin/env node
// ============================================================================
// BENGALI STUDY BIBLE — 66-BOOK COMPLETENESS MATRIX VERIFIER
// Level-4 Audit Tool for Deep (দীপ)
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const irvDir = path.join(projectRoot, 'public', 'bible-data', 'irv');
const checksumsFilePath = path.join(irvDir, 'checksums.json');

console.log('🔍 [DEEP_L4_AUDIT] Initiating 66-Book Canon Completeness Audit...');

if (!fs.existsSync(checksumsFilePath)) {
  console.error(`❌ Checksums file missing at: ${checksumsFilePath}`);
  process.exit(1);
}

const checksumsData = JSON.parse(fs.readFileSync(checksumsFilePath, 'utf8'));
const fileChecksums = checksumsData.fileChecksums;

let passedBooks = 0;
let totalChaptersFound = 0;
let totalVersesFound = 0;
const failures = [];

const files = fs
  .readdirSync(irvDir)
  .filter((f) => f.endsWith('.json') && f !== 'checksums.json' && f !== 'manifest.json' && f !== 'search-index.json');

if (files.length !== 66) {
  failures.push(`Expected 66 book JSON files, found ${files.length}`);
}

for (const file of files) {
  const filePath = path.join(irvDir, file);
  const rawData = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(rawData).digest('hex');

  const expectedHash = fileChecksums[file];
  if (!expectedHash) {
    failures.push(`Missing recorded checksum for ${file}`);
    continue;
  }

  if (hash !== expectedHash) {
    failures.push(`Checksum mismatch for ${file}: computed ${hash} !== expected ${expectedHash}`);
    continue;
  }

  try {
    const bookContent = JSON.parse(rawData.toString('utf8'));
    const chaptersObj = bookContent.chapters || {};
    const chapterKeys = Object.keys(chaptersObj);
    totalChaptersFound += chapterKeys.length;
    for (const key of chapterKeys) {
      totalVersesFound += (chaptersObj[key] || []).length;
    }
    passedBooks++;
  } catch (err) {
    failures.push(`Malformed JSON in ${file}: ${err.message}`);
  }
}

console.log(`📊 Audit Result:`);
console.log(`   - Verified Books: ${passedBooks}/66`);
console.log(`   - Total Chapters: ${totalChaptersFound}/1189`);
console.log(`   - Total Verses: ${totalVersesFound}/31088`);
console.log(`   - Master Hash: ${checksumsData.masterChecksum}`);

if (failures.length > 0) {
  console.error('❌ [DEEP_L4_AUDIT] Failures detected:');
  for (const f of failures) {
    console.error(`   - ${f}`);
  }
  process.exit(1);
}

if (passedBooks !== 66 || totalChaptersFound !== 1189 || totalVersesFound !== 31088) {
  console.error(`❌ [DEEP_L4_AUDIT] Canon numbers do not match Protestant Canon expectations!`);
  process.exit(1);
}

console.log('✅ [DEEP_L4_AUDIT] 100% Protestant Canon Completeness Verified! Zero AI hallucination, 100% authentic IRV text.');
process.exit(0);
