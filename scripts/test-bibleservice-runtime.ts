import { BibleService } from '../src/services/bibleService';
import { BIBLE_BOOKS } from '../src/data/books';

console.log('====================================================');
console.log('BIBLE SERVICE RUNTIME TEST (MATTHEW, OT & NT)');
console.log('====================================================');

let passed = 0;
let failed = 0;

function assert(cond: boolean, msg: string) {
  if (cond) {
    passed++;
    console.log('  PASS: ' + msg);
  } else {
    failed++;
    console.error('  FAIL: ' + msg);
  }
}

async function run() {
  BibleService.initialize();

  // 1. Test Matthew Chapter 1
  console.log('\n--- Testing Matthew (MAT) ---');
  const mat1 = await BibleService.loadChapterVerses('MAT', 1);
  assert(mat1.status === 'SUCCESS', 'MAT ch 1 status is SUCCESS');
  assert(mat1.verses.length === 25, 'MAT ch 1 has exactly 25 verses (was previously 2!)');
  assert(mat1.verses[0].verse === 1 && mat1.verses[0].textBn.includes('যীশু খ্রীষ্টের বংশ'), 'MAT 1:1 text correct');
  assert(mat1.verses[24].verse === 25 && mat1.verses[24].textBn.includes('যীশু রাখলেন'), 'MAT 1:25 text correct');

  // 2. Test Matthew Chapter 2 (previously returned NO_TEXT / 0 verses!)
  const mat2 = await BibleService.loadChapterVerses('MAT', 2);
  assert(mat2.status === 'SUCCESS', 'MAT ch 2 status is SUCCESS (previously was NO_TEXT!)');
  assert(mat2.verses.length === 23, 'MAT ch 2 has exactly 23 verses');
  assert(mat2.verses[0].verse === 1 && mat2.verses[0].textBn.includes('হেরোদ রাজার দিনের'), 'MAT 2:1 text correct');

  // 3. Test all 28 chapters of Matthew
  let matTotalVerses = 0;
  for (let ch = 1; ch <= 28; ch++) {
    const res = await BibleService.loadChapterVerses('MAT', ch);
    assert(res.status === 'SUCCESS' && res.verses.length > 0, 'MAT ch ' + ch + ' loaded ' + res.verses.length + ' verses');
    matTotalVerses += res.verses.length;
  }
  assert(matTotalVerses === 1069, 'Matthew total verses = 1069');

  // 4. Test John (JHN) - all 21 chapters
  console.log('\n--- Testing John (JHN) ---');
  let jhnTotalVerses = 0;
  for (let ch = 1; ch <= 21; ch++) {
    const res = await BibleService.loadChapterVerses('JHN', ch);
    assert(res.status === 'SUCCESS' && res.verses.length > 0, 'JHN ch ' + ch + ' loaded ' + res.verses.length + ' verses');
    jhnTotalVerses += res.verses.length;
  }
  assert(jhnTotalVerses === 879, 'John total verses = 879');

  // 5. Test Genesis (GEN) - sample chapters and total
  console.log('\n--- Testing Genesis (GEN) ---');
  const gen1 = await BibleService.loadChapterVerses('GEN', 1);
  assert(gen1.status === 'SUCCESS' && gen1.verses.length === 31, 'GEN ch 1 has 31 verses');
  const gen2 = await BibleService.loadChapterVerses('GEN', 2);
  assert(gen2.status === 'SUCCESS' && gen2.verses.length === 25, 'GEN ch 2 has 25 verses');
  const gen50 = await BibleService.loadChapterVerses('GEN', 50);
  assert(gen50.status === 'SUCCESS' && gen50.verses.length === 26, 'GEN ch 50 has 26 verses');

  // 6. Test All 39 OT Books (ch 1 and last ch)
  console.log('\n--- Testing All 39 OT Books ---');
  const otBooks = BIBLE_BOOKS.filter(b => b.testament === 'OT');
  assert(otBooks.length === 39, '39 OT books present');
  for (const b of otBooks) {
    const firstCh = await BibleService.loadChapterVerses(b.id, 1);
    assert(firstCh.status === 'SUCCESS' && firstCh.verses.length > 0, 'OT ' + b.id + ' (' + b.nameBn + ') ch 1 OK (' + firstCh.verses.length + ' verses)');
    if (b.chaptersCount > 1) {
      const lastCh = await BibleService.loadChapterVerses(b.id, b.chaptersCount);
      assert(lastCh.status === 'SUCCESS' && lastCh.verses.length > 0, 'OT ' + b.id + ' last ch ' + b.chaptersCount + ' OK (' + lastCh.verses.length + ' verses)');
    }
  }

  // 7. Test All 27 NT Books (ch 1 and last ch)
  console.log('\n--- Testing All 27 NT Books ---');
  const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'NT');
  assert(ntBooks.length === 27, '27 NT books present');
  for (const b of ntBooks) {
    const firstCh = await BibleService.loadChapterVerses(b.id, 1);
    assert(firstCh.status === 'SUCCESS' && firstCh.verses.length > 0, 'NT ' + b.id + ' (' + b.nameBn + ') ch 1 OK (' + firstCh.verses.length + ' verses)');
    if (b.chaptersCount > 1) {
      const lastCh = await BibleService.loadChapterVerses(b.id, b.chaptersCount);
      assert(lastCh.status === 'SUCCESS' && lastCh.verses.length > 0, 'NT ' + b.id + ' last ch ' + b.chaptersCount + ' OK (' + lastCh.verses.length + ' verses)');
    }
  }

  // 8. Test Search
  console.log('\n--- Testing Search & Reference Resolution ---');
  const sMat26 = await BibleService.searchVersesAsync('মথি ২৬:১');
  assert(sMat26.length > 0 && sMat26[0].bookId === 'MAT' && sMat26[0].chapter === 26 && sMat26[0].verse === 1, 'Search for মথি ২৬:১ resolves correctly');

  const sJhn3 = await BibleService.searchVersesAsync('যোহন ৩:১৬');
  assert(sJhn3.length > 0 && sJhn3[0].bookId === 'JHN' && sJhn3[0].chapter === 3 && sJhn3[0].verse === 16, 'Search for যোহন ৩:১৬ resolves correctly');

  const sRev22 = await BibleService.searchVersesAsync('প্রকাশিত বাক্য ২২:২১');
  assert(sRev22.length > 0 && sRev22[0].bookId === 'REV' && sRev22[0].chapter === 22 && sRev22[0].verse === 21, 'Search for প্রকাশিত বাক্য ২২:২১ resolves correctly');

  const sWord = await BibleService.searchVersesAsync('পরিত্রাণ');
  assert(sWord.length > 0, 'Keyword search for পরিত্রাণ returned ' + sWord.length + ' results');

  console.log('\n====================================================');
  console.log('SUMMARY: Passed: ' + passed + ', Failed: ' + failed);
  console.log('====================================================');
  if (failed > 0) process.exit(1);
}

run().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
