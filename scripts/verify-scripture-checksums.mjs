import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const dir = path.resolve('public/bible-data/irv');
const checksumFile = path.join(dir, 'checksums.json');

if (!fs.existsSync(checksumFile)) {
  console.error('SCRIPTURE_INTEGRITY_ALERT: Checksums file missing!');
  process.exit(1);
}

const recorded = JSON.parse(fs.readFileSync(checksumFile, 'utf8'));
let mismatches = [];
const canon = 'GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV'.split(' ');
const required = [...canon.map(id=>id+'.json'),'manifest.json','search-index.json'].sort();
const actual = Object.keys(recorded.fileChecksums ?? {}).sort();
if (JSON.stringify(required)!==JSON.stringify(actual)) {
 console.error('Invalid checksum manifest: expected exactly 66 canonical books, manifest.json and search-index.json.');
 process.exit(1);
}
if (Object.values(recorded.fileChecksums).some(v=>typeof v!=='string'|| !/^[a-f0-9]{64}$/.test(v))) {
 console.error('Invalid SHA-256 checksum format.'); process.exit(1);
}
const master = crypto.createHash('sha256');
for(const file of actual) master.update(file+':'+recorded.fileChecksums[file]+'\n');
if(master.digest('hex')!==recorded.masterChecksum) { console.error('Master checksum does not match the manifest entries.'); process.exit(1); }


for (const [file, expectedHash] of Object.entries(recorded.fileChecksums)) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    mismatches.push({ file, error: 'FILE_MISSING' });
    continue;
  }
  const actualHash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
  if (actualHash !== expectedHash) {
    mismatches.push({ file, expected: expectedHash, actual: actualHash, error: 'HASH_MISMATCH' });
  }
}

if (mismatches.length > 0) {
  console.error('====================================================');
  console.error('CRITICAL: SCRIPTURE_INTEGRITY_ALERT RAISED!');
  console.error('Found', mismatches.length, 'file integrity violations:');
  console.error(mismatches);
  console.error('====================================================');
  process.exit(1);
} else {
  console.log('PASS: All', Object.keys(recorded.fileChecksums).length, 'Bible dataset files verified against SHA-256 checksums!');
  console.log('Master Checksum:', recorded.masterChecksum);
  console.log('Checksum consistency verified; this is not a complete release approval.');
}
