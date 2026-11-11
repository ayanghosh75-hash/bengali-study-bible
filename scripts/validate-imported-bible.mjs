import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'public/bible-data/irv');
const manifest = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'manifest.json'), 'utf8'));

console.log('================================================================');
console.log('       AUTOMATED BIBLE VERSE INTEGRITY & 66-BOOK AUDIT        ');
console.log('================================================================');
console.log(`Translation: ${manifest.translation.nameBn} (${manifest.translation.shortCode || 'IRV'})`);
console.log(`License:     ${manifest.translation.license}`);
console.log(`Publisher:   ${manifest.translation.publisher}`);
console.log(`Source:      ${manifest.translation.sourceUrl}`);
console.log('----------------------------------------------------------------');

let grandTotalBooks = 0;
let grandTotalChapters = 0;
let grandTotalVerses = 0;
let totalIntegrityErrors = 0;
const bookAuditList = [];

for (const b of manifest.books) {
  const filePath = path.join(DATA_DIR, `${b.id}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File missing for ${b.id}`);
    totalIntegrityErrors++;
    continue;
  }

  const bookData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  grandTotalBooks++;

  const chapters = Object.keys(bookData.chapters).map(Number).sort((x, y) => x - y);
  const populatedChapters = chapters.length;
  let bookVerses = 0;
  let bookErrors = 0;

  for (const ch of chapters) {
    grandTotalChapters++;
    const verses = bookData.chapters[ch.toString()];
    bookVerses += verses.length;
    grandTotalVerses += verses.length;

    // Check verses integrity
    const seenVerses = new Set();
    for (let i = 0; i < verses.length; i++) {
      const v = verses[i];
      if (v.verse <= 0) {
        console.error(`Integrity Error in ${b.id} ch ${ch}: non-positive verse number ${v.verse}`);
        bookErrors++;
      }
      if (seenVerses.has(v.verse)) {
        console.error(`Integrity Error in ${b.id} ch ${ch}: duplicate verse ${v.verse}`);
        bookErrors++;
      }
      seenVerses.add(v.verse);
      if (!v.textBn || v.textBn.trim() === '') {
        console.error(`Integrity Error in ${b.id} ch ${ch} v ${v.verse}: empty text`);
        bookErrors++;
      }
    }
  }

  totalIntegrityErrors += bookErrors;
  const status = (populatedChapters === b.expectedChapters && bookErrors === 0) ? 'COMPLETE' : 'DATA ERROR';

  bookAuditList.push({
    book: `${b.nameBn} (${b.id})`,
    expectedChapters: b.expectedChapters,
    populatedChapters,
    verses: bookVerses,
    missingData: b.expectedChapters - populatedChapters,
    status
  });
}

console.log('\n--- 66 BOOK AUDIT SUMMARY ---');
console.table(bookAuditList.slice(0, 10)); // sample first 10
console.log(`... (${bookAuditList.length - 10} more books) ...`);

// Specific Regression & Mandatory Chapter Tests
console.log('\n--- MANDATORY TEST SUITE (STEP 22 & 23) ---');
const testTargets = [
  { id: 'GEN', ch: 1, expectedLast: 31, name: 'Genesis 1' },
  { id: 'GEN', ch: 50, expectedLast: 26, name: 'Genesis 50' },
  { id: 'EXO', ch: 1, expectedLast: 22, name: 'Exodus 1' },
  { id: 'PSA', ch: 1, expectedLast: 6, name: 'Psalm 1' },
  { id: 'PSA', ch: 23, expectedLast: 6, name: 'Psalm 23' },
  { id: 'PSA', ch: 119, expectedLast: 176, name: 'Psalm 119' },
  { id: 'ISA', ch: 53, expectedLast: 12, name: 'Isaiah 53' },
  { id: 'MAT', ch: 1, expectedLast: 25, name: 'Matthew 1' },
  { id: 'MAT', ch: 5, expectedLast: 48, name: 'Matthew 5' },
  { id: 'MAT', ch: 26, expectedLast: 75, name: 'Matthew 26 (CRITICAL REGRESSION)' },
  { id: 'MAT', ch: 28, expectedLast: 20, name: 'Matthew 28' },
  { id: 'MRK', ch: 1, expectedLast: 45, name: 'Mark 1' },
  { id: 'LUK', ch: 2, expectedLast: 52, name: 'Luke 2' },
  { id: 'JHN', ch: 1, expectedLast: 51, name: 'John 1' },
  { id: 'JHN', ch: 3, expectedLast: 36, name: 'John 3' },
  { id: 'ACT', ch: 2, expectedLast: 47, name: 'Acts 2' },
  { id: 'ROM', ch: 8, expectedLast: 39, name: 'Romans 8' },
  { id: '1CO', ch: 13, expectedLast: 13, name: '1 Corinthians 13' },
  { id: 'HEB', ch: 11, expectedLast: 40, name: 'Hebrews 11' },
  { id: 'REV', ch: 1, expectedLast: 20, name: 'Revelation 1' },
  { id: 'REV', ch: 22, expectedLast: 21, name: 'Revelation 22' },
];

let allTestsPassed = true;
for (const t of testTargets) {
  const bData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${t.id}.json`), 'utf8'));
  const chVerses = bData.chapters[t.ch.toString()] || [];
  const firstVerse = chVerses[0]?.verse;
  const lastVerse = chVerses[chVerses.length - 1]?.verse;
  const pass = chVerses.length === t.expectedLast && firstVerse === 1 && lastVerse === t.expectedLast;
  if (!pass) allTestsPassed = false;
  console.log(
    `[${pass ? 'PASS' : 'FAIL'}] ${t.name.padEnd(35)}: Verses: ${chVerses.length}/${t.expectedLast} (First: ${firstVerse}, Last: ${lastVerse})`
  );
}

// Special check on Matthew 26
console.log('\n--- MATTHEW 26 DEEP INSPECTION ---');
const matData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'MAT.json'), 'utf8'));
const mat26 = matData.chapters['26'];
console.log(`Total verses in Matthew 26: ${mat26.length}`);
console.log(`Verse 1:  ${mat26[0].textBn}`);
console.log(`Verse 26: ${mat26[25].textBn}`);
console.log(`Verse 75: ${mat26[74].textBn}`);

console.log('\n================================================================');
console.log(`FINAL REPORT STATUS:`);
console.log(`Total Books:           ${grandTotalBooks} / 66`);
console.log(`Total Chapters:        ${grandTotalChapters} / 1189`);
console.log(`Total Verses:          ${grandTotalVerses}`);
console.log(`Integrity Violations:  ${totalIntegrityErrors}`);
console.log(`Mandatory Test Pass:   ${allTestsPassed ? 'ALL PASSED (100%)' : 'FAILED'}`);
console.log('================================================================\n');

if (!allTestsPassed || totalIntegrityErrors > 0) {
  process.exit(1);
}
