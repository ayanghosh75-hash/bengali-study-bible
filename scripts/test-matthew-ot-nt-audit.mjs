import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('MATTHEW & ALL 66 OT/NT BOOKS COMPREHENSIVE AUDIT');
console.log('====================================================');

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    passed++;
    console.log('  PASS: ' + msg);
  } else {
    failed++;
    console.error('  FAIL: ' + msg);
  }
}

// 1. Audit public JSON files
const irvDir = path.resolve('public/bible-data/irv');
const booksTs = fs.readFileSync('src/data/books.ts', 'utf8');
const idRegex = /id:\s*'([A-Z0-9]+)',\s*bookNumber:\s*(\d+),.*?testament:\s*'([A-Z]+)',.*?chaptersCount:\s*(\d+)/gs;
const bookDefs = [];
let m;
while ((m = idRegex.exec(booksTs)) !== null) {
  bookDefs.push({ id: m[1], bookNumber: parseInt(m[2]), testament: m[3], chaptersCount: parseInt(m[4]) });
}

assert(bookDefs.length === 66, 'Found 66 canonical books in books.ts');

// 2. Test Matthew (MAT) in depth
const matJson = JSON.parse(fs.readFileSync(path.join(irvDir, 'MAT.json'), 'utf8'));
assert(matJson.actualChapters === 28, 'Matthew has 28 actual chapters in MAT.json');
assert(matJson.totalVerses === 1069, 'Matthew has 1069 total verses in MAT.json');
assert(matJson.chapters['1'].length === 25, 'Matthew chapter 1 has 25 verses');
assert(matJson.chapters['2'].length === 23, 'Matthew chapter 2 has 23 verses');
assert(matJson.chapters['28'].length === 20, 'Matthew chapter 28 has 20 verses');

// 3. Test preloaded verses for Matthew
const preloadedTs = fs.readFileSync('src/data/preloadedVerses.ts', 'utf8');
assert(preloadedTs.includes('MAT:'), 'preloadedVerses.ts includes MAT');
assert(preloadedTs.includes('যীশু খ্রীষ্টের বংশ'), 'preloadedVerses.ts MAT 1:1 is present');

// 4. Test all 39 OT books
let otChaptersCount = 0;
let otVersesCount = 0;
const otBooks = bookDefs.filter(b => b.testament === 'OT');
assert(otBooks.length === 39, 'Exactly 39 Old Testament books identified');

for (const b of otBooks) {
  const file = path.join(irvDir, b.id + '.json');
  assert(fs.existsSync(file), 'OT Book ' + b.id + ' file exists');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const actualCh = Object.keys(data.chapters).length;
  assert(actualCh === b.chaptersCount, 'OT Book ' + b.id + ' has expected ' + b.chaptersCount + ' chapters');
  otChaptersCount += actualCh;
  for (let c = 1; c <= b.chaptersCount; c++) {
    const vList = data.chapters[c.toString()];
    assert(Array.isArray(vList) && vList.length > 0, 'OT ' + b.id + ' ch ' + c + ' has verses');
    otVersesCount += vList.length;
  }
}

// 5. Test all 27 NT books
let ntChaptersCount = 0;
let ntVersesCount = 0;
const ntBooks = bookDefs.filter(b => b.testament === 'NT');
assert(ntBooks.length === 27, 'Exactly 27 New Testament books identified');

for (const b of ntBooks) {
  const file = path.join(irvDir, b.id + '.json');
  assert(fs.existsSync(file), 'NT Book ' + b.id + ' file exists');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const actualCh = Object.keys(data.chapters).length;
  assert(actualCh === b.chaptersCount, 'NT Book ' + b.id + ' has expected ' + b.chaptersCount + ' chapters');
  ntChaptersCount += actualCh;
  for (let c = 1; c <= b.chaptersCount; c++) {
    const vList = data.chapters[c.toString()];
    assert(Array.isArray(vList) && vList.length > 0, 'NT ' + b.id + ' ch ' + c + ' has verses');
    ntVersesCount += vList.length;
  }
}

assert(otChaptersCount === 929, 'Total OT chapters = 929');
assert(ntChaptersCount === 260, 'Total NT chapters = 260');
assert(otChaptersCount + ntChaptersCount === 1189, 'Total canonical Bible chapters = 1189');
assert(otVersesCount + ntVersesCount === 31088, 'Total canonical Bible verses = 31088');

// 6. Test search-index.json
const searchIndex = JSON.parse(fs.readFileSync(path.join(irvDir, 'search-index.json'), 'utf8'));
assert(searchIndex.length === 31088, 'Search index contains all 31,088 verses');
const mat1_1 = searchIndex.find(item => item.b === 'MAT' && item.c === 1 && item.v === 1);
assert(mat1_1 !== undefined, 'Matthew 1:1 is indexed in search-index.json');
assert(mat1_1.t.includes('যীশু খ্রীষ্টের বংশ'), 'Matthew 1:1 text matches');

const mat26_1 = searchIndex.find(item => item.b === 'MAT' && item.c === 26 && item.v === 1);
assert(mat26_1 !== undefined, 'Matthew 26:1 is indexed in search-index.json');

const jhn3_16 = searchIndex.find(item => item.b === 'JHN' && item.c === 3 && item.v === 16);
assert(jhn3_16 !== undefined, 'John 3:16 is indexed in search-index.json');
assert(jhn3_16.t.includes('ঈশ্বর জগতকে এত ভালবাসলেন'), 'John 3:16 text matches');

console.log('====================================================');
console.log('SUMMARY: Passed: ' + passed + ', Failed: ' + failed);
console.log('====================================================');
if (failed > 0) process.exit(1);
