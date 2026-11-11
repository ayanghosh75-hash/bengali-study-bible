import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const ROOT_DIR=process.cwd();
const sha256File=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function runAuthoritativeUsfmComparison() {
  const usfmDir = path.join(ROOT_DIR, 'data-raw', 'usfm');
  const irvDir = path.join(ROOT_DIR, 'public', 'bible-data', 'irv');
  const manifestData = JSON.parse(fs.readFileSync(path.join(irvDir, 'manifest.json'), 'utf8'));
  const searchIndexData = JSON.parse(fs.readFileSync(path.join(irvDir, 'search-index.json'), 'utf8'));

  const usfmFiles = fs.readdirSync(usfmDir).filter((f) => f.endsWith('.usfm')).sort();

  function cleanUsfmText(s) {
    return (s || '')
      .replace(/\\f\s+[\s\S]*?\\f\*/g, '')
      .replace(/\\fe\s+[\s\S]*?\\fe\*/g, '')
      .replace(/\\x\s+[\s\S]*?\\x\*/g, '')
      .replace(/\\[a-z0-9]+\*?/gi, '')
      .replace(/\s+/g, ' ')
      .normalize('NFC')
      .trim();
  }

  const usfmBooks = {};
  const hyphenatedRanges = [];

  for (const file of usfmFiles) {
    const raw = fs.readFileSync(path.join(usfmDir, file), 'utf8');
    const lines = raw.split(/\r?\n/);
    let bookId = null;
    let currentChapter = null;
    let currentVerse = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('\\id ')) {
        bookId = trimmed.split(/\s+/)[1].trim();
        usfmBooks[bookId] = { file, chapters: {} };
      } else if (trimmed.startsWith('\\c ')) {
        currentChapter = String(parseInt(trimmed.slice(3).trim(), 10));
        if (bookId) usfmBooks[bookId].chapters[currentChapter] = {};
        currentVerse = null;
      } else if (/^\\v\s+(\d+)\s+(.*)$/.test(trimmed)) {
        const m = trimmed.match(/^\\v\s+(\d+)\s+(.*)$/);
        if (m && currentChapter && bookId) {
          currentVerse = String(parseInt(m[1], 10));
          usfmBooks[bookId].chapters[currentChapter][currentVerse] = m[2].trim();
        }
      } else if (/^\\v\s+(\d+-\d+)\s+(.*)$/.test(trimmed)) {
        const m = trimmed.match(/^\\v\s+(\d+-\d+)\s+(.*)$/);
        if (m && currentChapter && bookId && currentVerse) {
          hyphenatedRanges.push({
            bookId,
            chapter: Number(currentChapter),
            range: m[1],
            attachedToVerse: Number(currentVerse),
          });
          usfmBooks[bookId].chapters[currentChapter][currentVerse] = (
            usfmBooks[bookId].chapters[currentChapter][currentVerse] +
            ' ' +
            m[1] +
            ' ' +
            m[2].trim()
          ).trim();
        }
      } else if (
        currentVerse &&
        currentChapter &&
        bookId &&
        !/^\\(s\d*|r|ms\d*|mr|d|cl|sp|qa|iot|io\d*|ip|is\d*|mt\d*|h|toc\d*|rem|ide|ib|ili\d*|im|imi|imq|ipq|ipr|iq\d*|iex|ie)\b/i.test(
          trimmed
        )
      ) {
        const cleaned = trimmed
          .replace(/^\\(q\d*|p|m|pi\d*|mi|nb|b|li\d*|pc|pm|pmo|pmc|pmr|qr|qc|qs)\b\s*/, '')
          .trim();
        if (cleaned) {
          usfmBooks[bookId].chapters[currentChapter][currentVerse] = (
            usfmBooks[bookId].chapters[currentChapter][currentVerse] +
            ' ' +
            cleaned
          ).trim();
        }
      }
    }
  }

  let totalBooks = 0;
  let totalChapters = 0;
  let totalVerses = 0;
  let exactRawMatches = 0;
  let tagCleanedMatches = 0;
  let unexplainedDiffs = [];
  let corruptedUnicodeCount = 0;
  const perBookSummary = [];

  for (const bookMeta of manifestData.books) {
    const bookId = bookMeta.id;
    const jsonPath = path.join(irvDir, `${bookId}.json`);
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const usfmBook = usfmBooks[bookId];

    const chKeys = Object.keys(jsonData.chapters || {}).sort((a, b) => Number(a) - Number(b));
    let bookVerses = 0;
    let bookMatched = 0;

    for (const ch of chKeys) {
      totalChapters++;
      const versesArr = jsonData.chapters[ch];
      for (const vObj of versesArr) {
        totalVerses++;
        bookVerses++;
        const vNum = String(vObj.verse);
        const jText = (vObj.textBn || vObj.text || '').normalize('NFC').replace(/\s+/g, ' ').trim();
        const rawU = usfmBook?.chapters?.[ch]?.[vNum] || '';

        if (jText.includes('\uFFFD')) {
          corruptedUnicodeCount++;
        }

        if (rawU.normalize('NFC').replace(/\s+/g, ' ').trim() === jText) {
          exactRawMatches++;
          bookMatched++;
        } else if (cleanUsfmText(rawU).replace(/\s+/g, '') === jText.replace(/\s+/g, '')) {
          tagCleanedMatches++;
          bookMatched++;
        } else {
          unexplainedDiffs.push({
            ref: `${bookId} ${ch}:${vNum}`,
            usfm: cleanUsfmText(rawU).slice(0, 100),
            json: jText.slice(0, 100),
          });
        }
      }
    }

    totalBooks++;
    perBookSummary.push({
      order: bookMeta.order,
      bookId,
      nameBn: bookMeta.nameBn,
      nameEn: bookMeta.nameEn,
      usfmFile: usfmBook?.file || 'N/A',
      chapters: chKeys.length,
      verses: bookVerses,
      matchedVerses: bookMatched,
      sha256: sha256File(jsonPath),
    });
  }

  // John (JHN) specific audit for Phase 7
  const jhnJson = JSON.parse(fs.readFileSync(path.join(irvDir, 'JHN.json'), 'utf8'));
  const jhnChapterCounts = Object.keys(jhnJson.chapters)
    .sort((a, b) => Number(a) - Number(b))
    .map((ch) => ({
      chapter: Number(ch),
      jsonVerses: jhnJson.chapters[ch].length,
      usfmVerses: Object.keys(usfmBooks['JHN'].chapters[ch] || {}).length,
    }));
  const jhnSearchCount = (searchIndexData.verses || []).filter((v) => v.b === 'JHN').length;
  const jhnManifestEntry = manifestData.books.find((b) => b.id === 'JHN');

  // Verify Matthew 1:18-25 and John 1:1-18, 3:16, 14:6
  const matJson = JSON.parse(fs.readFileSync(path.join(irvDir, 'MAT.json'), 'utf8'));
  const mat1_18_25 = matJson.chapters['1'].filter((v) => v.verse >= 18 && v.verse <= 25);
  const jhn3_16 = jhnJson.chapters['3'].find((v) => v.verse === 16);
  const jhn14_6 = jhnJson.chapters['14'].find((v) => v.verse === 6);
  const jhn5_4 = jhnJson.chapters['5'].find((v) => v.verse === 4);

  return {
    totalBooks,
    totalChapters,
    totalVerses,
    exactRawMatches,
    tagCleanedMatches,
    totalVerifiedMatches: exactRawMatches + tagCleanedMatches,
    unexplainedDiffsCount: unexplainedDiffs.length,
    unexplainedDiffs,
    corruptedUnicodeCount,
    hyphenatedRanges,
    perBookSummary,
    johnAudit: {
      usfmFile: usfmBooks['JHN'].file,
      usfmTotalVerses: jhnChapterCounts.reduce((a, c) => a + c.usfmVerses, 0),
      jsonTotalVerses: jhnChapterCounts.reduce((a, c) => a + c.jsonVerses, 0),
      manifestTotalVerses: jhnManifestEntry?.totalVerses || 879,
      searchIndexTotalVerses: jhnSearchCount,
      chapterBreakdown: jhnChapterCounts,
      jhn5_4_textBn: jhn5_4?.textBn || '',
      jhn3_16_textBn: jhn3_16?.textBn || '',
      jhn14_6_textBn: jhn14_6?.textBn || '',
    },
    matthew1_18_25_count: mat1_18_25.length,
    matthew1_22_textBn: mat1_18_25.find((v) => v.verse === 22)?.textBn || '',
  };
}


const r=runAuthoritativeUsfmComparison();
fs.mkdirSync('.ops-reports',{recursive:true});
fs.writeFileSync('.ops-reports/usfm-comparison.json',JSON.stringify(r,null,2));
console.log(JSON.stringify({books:r.totalBooks,chapters:r.totalChapters,verses:r.totalVerses,matched:r.totalVerifiedMatches,differences:r.unexplainedDiffsCount,verseRanges:r.hyphenatedRanges,john:r.johnAudit.jsonTotalVerses}));
console.log('Comparison uses locally supplied USFM and the existing normalization rules; it does not independently authenticate the upstream source. Verse-range mappings are retained in the report.');
process.exitCode=r.totalBooks===66 && r.totalChapters===1189 && r.totalVerses===31088 && r.unexplainedDiffsCount===0 && r.corruptedUnicodeCount===0 ? 0 : 1;
