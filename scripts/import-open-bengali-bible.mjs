import { rangesInUsfm } from './audit-verse-ranges.mjs';
import fs from 'fs';
import path from 'path';

const USFM_DIR = path.resolve(process.cwd(), 'data-raw/usfm');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public/bible-data/irv');
const PRELOAD_FILE = path.resolve(process.cwd(), 'src/data/preloadedVerses.ts');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Canonical books reference mapping
const CANONICAL_BOOKS = [
  // OT
  { id: 'GEN', nameBn: 'আদিপুস্তক', nameEn: 'Genesis', chapters: 50 },
  { id: 'EXO', nameBn: 'যাত্রাপুস্তক', nameEn: 'Exodus', chapters: 40 },
  { id: 'LEV', nameBn: 'লেবীয় পুস্তক', nameEn: 'Leviticus', chapters: 27 },
  { id: 'NUM', nameBn: 'গণনা পুস্তক', nameEn: 'Numbers', chapters: 36 },
  { id: 'DEU', nameBn: 'দ্বিতীয় বিবরণ', nameEn: 'Deuteronomy', chapters: 34 },
  { id: 'JOS', nameBn: 'যিহোশূয়', nameEn: 'Joshua', chapters: 24 },
  { id: 'JDG', nameBn: 'বিচারকর্তৃগণ', nameEn: 'Judges', chapters: 21 },
  { id: 'RUT', nameBn: 'রূথ', nameEn: 'Ruth', chapters: 4 },
  { id: '1SA', nameBn: '১ শমূয়েল', nameEn: '1 Samuel', chapters: 31 },
  { id: '2SA', nameBn: '২ শমূয়েল', nameEn: '2 Samuel', chapters: 24 },
  { id: '1KI', nameBn: '১ রাজাবলি', nameEn: '1 Kings', chapters: 22 },
  { id: '2KI', nameBn: '২ রাজাবলি', nameEn: '2 Kings', chapters: 25 },
  { id: '1CH', nameBn: '১ বংশাবলি', nameEn: '1 Chronicles', chapters: 29 },
  { id: '2CH', nameBn: '২ বংশাবলি', nameEn: '2 Chronicles', chapters: 36 },
  { id: 'EZR', nameBn: 'ইষ্রা', nameEn: 'Ezra', chapters: 10 },
  { id: 'NEH', nameBn: 'নহিমিয়', nameEn: 'Nehemiah', chapters: 13 },
  { id: 'EST', nameBn: 'ইষ্টের', nameEn: 'Esther', chapters: 10 },
  { id: 'JOB', nameBn: 'ইয়োব', nameEn: 'Job', chapters: 42 },
  { id: 'PSA', nameBn: 'গীতসংহিতা', nameEn: 'Psalms', chapters: 150 },
  { id: 'PRO', nameBn: 'হিতোপদেশ', nameEn: 'Proverbs', chapters: 31 },
  { id: 'ECC', nameBn: 'উপদেশক', nameEn: 'Ecclesiastes', chapters: 12 },
  { id: 'SNG', nameBn: 'পরমগীত', nameEn: 'Song of Solomon', chapters: 8 },
  { id: 'ISA', nameBn: 'যিশাইয়', nameEn: 'Isaiah', chapters: 66 },
  { id: 'JER', nameBn: 'যিরমিয়', nameEn: 'Jeremiah', chapters: 52 },
  { id: 'LAM', nameBn: 'বিলাপ', nameEn: 'Lamentations', chapters: 5 },
  { id: 'EZK', nameBn: 'যিহিষ্কেল', nameEn: 'Ezekiel', chapters: 48 },
  { id: 'DAN', nameBn: 'দানিয়েল', nameEn: 'Daniel', chapters: 12 },
  { id: 'HOS', nameBn: 'হোশেয়', nameEn: 'Hosea', chapters: 14 },
  { id: 'JOL', nameBn: 'যোয়েল', nameEn: 'Joel', chapters: 3 },
  { id: 'AMO', nameBn: 'আমোষ', nameEn: 'Amos', chapters: 9 },
  { id: 'OBA', nameBn: 'ওবদিয়', nameEn: 'Obadiah', chapters: 1 },
  { id: 'JON', nameBn: 'যোনা', nameEn: 'Jonah', chapters: 4 },
  { id: 'MIC', nameBn: 'মীখা', nameEn: 'Micah', chapters: 7 },
  { id: 'NAM', nameBn: 'নহূম', nameEn: 'Nahum', chapters: 3 },
  { id: 'HAB', nameBn: 'হবক্কূক', nameEn: 'Habakkuk', chapters: 3 },
  { id: 'ZEP', nameBn: 'সফনিয়', nameEn: 'Zephaniah', chapters: 3 },
  { id: 'HAG', nameBn: 'হগয়', nameEn: 'Haggai', chapters: 2 },
  { id: 'ZEC', nameBn: 'সখরিয়', nameEn: 'Zechariah', chapters: 14 },
  { id: 'MAL', nameBn: 'মালাখি', nameEn: 'Malachi', chapters: 4 },
  // NT
  { id: 'MAT', nameBn: 'মথি', nameEn: 'Matthew', chapters: 28 },
  { id: 'MRK', nameBn: 'মার্ক', nameEn: 'Mark', chapters: 16 },
  { id: 'LUK', nameBn: 'লূক', nameEn: 'Luke', chapters: 24 },
  { id: 'JHN', nameBn: 'যোহন', nameEn: 'John', chapters: 21 },
  { id: 'ACT', nameBn: 'প্রেরিতদের কার্য', nameEn: 'Acts', chapters: 28 },
  { id: 'ROM', nameBn: 'রোমীয়', nameEn: 'Romans', chapters: 16 },
  { id: '1CO', nameBn: '১ করিন্থীয়', nameEn: '1 Corinthians', chapters: 16 },
  { id: '2CO', nameBn: '২ করিন্থীয়', nameEn: '2 Corinthians', chapters: 13 },
  { id: 'GAL', nameBn: 'গালাতীয়', nameEn: 'Galatians', chapters: 6 },
  { id: 'EPH', nameBn: 'ইফিষীয়', nameEn: 'Ephesians', chapters: 6 },
  { id: 'PHP', nameBn: 'ফিলিপীয়', nameEn: 'Philippians', chapters: 4 },
  { id: 'COL', nameBn: 'কলসীয়', nameEn: 'Colossians', chapters: 4 },
  { id: '1TH', nameBn: '১ থিষলনীকীয়', nameEn: '1 Thessalonians', chapters: 5 },
  { id: '2TH', nameBn: '২ থিষলনীকীয়', nameEn: '2 Thessalonians', chapters: 3 },
  { id: '1TI', nameBn: '১ তীমথিয়', nameEn: '1 Timothy', chapters: 6 },
  { id: '2TI', nameBn: '২ তীমথিয়', nameEn: '2 Timothy', chapters: 4 },
  { id: 'TIT', nameBn: 'তীত', nameEn: 'Titus', chapters: 3 },
  { id: 'PHM', nameBn: 'ফিলীমন', nameEn: 'Philemon', chapters: 1 },
  { id: 'HEB', nameBn: 'ইব্রীয়', nameEn: 'Hebrews', chapters: 13 },
  { id: 'JAS', nameBn: 'যাকোব', nameEn: 'James', chapters: 5 },
  { id: '1PE', nameBn: '১ পিতর', nameEn: '1 Peter', chapters: 5 },
  { id: '2PE', nameBn: '২ পিতর', nameEn: '2 Peter', chapters: 3 },
  { id: '1JN', nameBn: '১ যোহন', nameEn: '1 John', chapters: 5 },
  { id: '2JN', nameBn: '২ যোহন', nameEn: '2 John', chapters: 1 },
  { id: '3JN', nameBn: '৩ যোহন', nameEn: '3 John', chapters: 1 },
  { id: 'JUD', nameBn: 'যিহূদা', nameEn: 'Jude', chapters: 1 },
  { id: 'REV', nameBn: 'প্রকাশিত বাক্য', nameEn: 'Revelation', chapters: 22 },
];

function cleanUsfmText(text) {
  return text
    // Strip footnotes \f ... \f*
    .replace(/\\f\s+[\s\S]*?\\f\*/g, '')
    // Strip cross references \x ... \x*
    .replace(/\\x\s+[\s\S]*?\\x\*/g, '')
    // Retain text within \wj, \add, \nd, \it, \bd, \qs, \tl but strip the tags
    .replace(/\\[a-z0-9]+\*?/g, '')
    // Normalize spaces
    .replace(/\s+/g, ' ')
    .trim();
}

function parseUsfmFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const idMatch = content.match(/\\id\s+([A-Z0-9]+)/);
  if (!idMatch) return null;
  const bookId = idMatch[1].trim();

  const lines = content.split(/\r?\n/);
  const chaptersMap = new Map();
  let currentChapter = 0;
  let currentVerse = 0;
  let currentTextParts = [];

  function saveCurrentVerse() {
    if (currentChapter > 0 && currentVerse > 0 && currentTextParts.length > 0) {
      const clean = cleanUsfmText(currentTextParts.join(' '));
      if (clean) {
        if (!chaptersMap.has(currentChapter)) {
          chaptersMap.set(currentChapter, []);
        }
        chaptersMap.get(currentChapter).push({
          verse: currentVerse,
          textBn: clean,
        });
      }
    }
    currentTextParts = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Chapter marker \c <num>
    const cMatch = trimmed.match(/^\\c\s+(\d+)/);
    if (cMatch) {
      saveCurrentVerse();
      currentChapter = parseInt(cMatch[1], 10);
      currentVerse = 0;
      continue;
    }

    // Verse marker \v <num> <text...>
    const vMatch = trimmed.match(/^\\v\s+(\d+)(?:\s+(.*))?$/);
    if (vMatch) {
      saveCurrentVerse();
      currentVerse = parseInt(vMatch[1], 10);
      if (vMatch[2]) {
        currentTextParts.push(vMatch[2]);
      }
      continue;
    }

    // Inside a verse
    if (currentChapter > 0 && currentVerse > 0) {
      // Skip section headers: \s, \s1, \s2, \r, \d, \ms, \mr, etc.
      if (/^\\[srmd][0-9]?\b/.test(trimmed)) {
        continue;
      }
      // Formatting tags like \p, \q, \q1, \m: remove the tag prefix and retain text
      const textLine = trimmed.replace(/^\\[a-z0-9]+\*?\s*/, '');
      if (textLine) {
        currentTextParts.push(textLine);
      }
    }
  }
  saveCurrentVerse();

  return { bookId, chaptersMap };
}

async function run() {
  console.log('Starting Authoritative Open Bengali Bible (IRV) Import Pipeline...');
  console.log('Source Directory:', USFM_DIR);

  const files = fs.readdirSync(USFM_DIR).filter((f) => f.endsWith('.usfm'));
  console.log(`Found ${files.length} USFM files.`);
  const unsupported = files.flatMap(file => rangesInUsfm(fs.readFileSync(path.join(USFM_DIR, file), 'utf8')));
  if (unsupported.length) throw new Error('Import blocked before any dataset writes: explicit verse-bridge mapping is required for ' + unsupported.length + ' source ranges. Do not append bridge text to preceding verses.');

  let grandTotalVerses = 0;
  let grandTotalChapters = 0;
  const manifestBooks = [];
  const searchIndex = [];
  const preloadedBooksData = {};

  for (const meta of CANONICAL_BOOKS) {
    const file = files.find((f) => {
      const content = fs.readFileSync(path.join(USFM_DIR, f), 'utf8');
      const idMatch = content.match(/\\id\s+([A-Z0-9]+)/);
      return idMatch && idMatch[1].trim() === meta.id;
    });

    if (!file) {
      console.error(`FATAL: File not found for canonical book ${meta.id} (${meta.nameBn})`);
      process.exit(1);
    }

    const parsed = parseUsfmFile(path.join(USFM_DIR, file));
    if (!parsed) {
      console.error(`FATAL: Failed to parse ${file}`);
      process.exit(1);
    }

    const chaptersObj = {};
    let bookVerseCount = 0;
    const sortedChapters = Array.from(parsed.chaptersMap.keys()).sort((a, b) => a - b);

    for (const ch of sortedChapters) {
      const versesList = parsed.chaptersMap.get(ch);
      // Sort verses in chapter
      versesList.sort((a, b) => a.verse - b.verse);
      chaptersObj[ch] = versesList;
      bookVerseCount += versesList.length;

      // Add to search index
      for (const v of versesList) {
        searchIndex.push({
          b: meta.id,
          c: ch,
          v: v.verse,
          t: v.textBn,
        });
      }
    }

    grandTotalChapters += sortedChapters.length;
    grandTotalVerses += bookVerseCount;

    const bookJsonData = {
      translationId: 'irv-ben',
      translationName: 'ইন্ডিয়ান রিভাইজড ভার্সন (IRV) - বেঙ্গলী',
      bookId: meta.id,
      nameBn: meta.nameBn,
      nameEn: meta.nameEn,
      expectedChapters: meta.chapters,
      actualChapters: sortedChapters.length,
      totalVerses: bookVerseCount,
      chapters: chaptersObj,
    };

    // Save individual book JSON to public/bible-data/irv/{bookId}.json
    const bookFilePath = path.join(OUTPUT_DIR, `${meta.id}.json`);
    fs.writeFileSync(bookFilePath, JSON.stringify(bookJsonData), 'utf8');

    // Preload Matthew (MAT) and John (JHN) and Genesis (GEN) in initial memory cache
    if (['MAT', 'JHN', 'GEN', 'PSA', 'ROM'].includes(meta.id)) {
      preloadedBooksData[meta.id] = bookJsonData;
    }

    manifestBooks.push({
      id: meta.id,
      nameBn: meta.nameBn,
      nameEn: meta.nameEn,
      expectedChapters: meta.chapters,
      actualChapters: sortedChapters.length,
      totalVerses: bookVerseCount,
      status: sortedChapters.length === meta.chapters ? 'COMPLETE' : 'PARTIAL',
    });
  }

  // Save search index
  const searchIndexPath = path.join(OUTPUT_DIR, 'search-index.json');
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex), 'utf8');

  // Compute manifest hash
  const manifestData = {
    translation: {
      id: 'irv-ben',
      nameBn: 'ভারতীয় সংশোধিত সংস্করণ (IRV বাংলা)',
      nameEn: 'Indian Revised Version (IRV) Bengali',
      vernacularTitle: 'ইন্ডিয়ান রিভাইজড ভার্সন (IRV) - বেঙ্গলী',
      publisher: 'Bridge Connectivity Solutions Pvt. Ltd.',
      publisherUrl: 'https://bridgeconn.com/',
      sourceUrl: 'https://ebible.org/find/details.php?id=benirv',
      license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      attribution: 'Indian Revised Version (IRV) Bengali, copyright © 2018, 2019 Bridge Connectivity Solutions Pvt. Ltd. Distributed under CC BY-SA 4.0.',
      dateImported: new Date().toISOString(),
      format: 'USFM to JSON canonical pipeline',
    },
    statistics: {
      canonicalBooks: 66,
      importedBooks: manifestBooks.length,
      canonicalChapters: 1189,
      importedChapters: grandTotalChapters,
      importedVerses: grandTotalVerses,
    },
    books: manifestBooks,
  };

  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');

  // Save preloaded verses module for instant zero-latency rendering of Matthew 26 and core passages
  const preloadedContent = `// Preloaded Canonical Bengali Scripture for Instant Offline/Zero-Latency Reading
// Translation: Indian Revised Version (IRV) Bengali (CC BY-SA 4.0)
// Bridge Connectivity Solutions Pvt. Ltd.

export interface StoredBookData {
  translationId: string;
  translationName: string;
  bookId: string;
  nameBn: string;
  nameEn: string;
  expectedChapters: number;
  actualChapters: number;
  totalVerses: number;
  chapters: Record<string, Array<{ verse: number; textBn: string }>>;
}

export const PRELOADED_BIBLE_BOOKS: Record<string, StoredBookData> = ${JSON.stringify(preloadedBooksData)};
`;
  fs.writeFileSync(PRELOAD_FILE, preloadedContent, 'utf8');

  console.log('====================================================');
  console.log('OPEN BENGALI BIBLE (IRV) IMPORT COMPLETED SUCCESSFULLY');
  console.log('====================================================');
  console.log(`Total Books Imported:    ${manifestBooks.length} / 66`);
  console.log(`Total Chapters Imported: ${grandTotalChapters} / 1189`);
  console.log(`Total Verses Imported:   ${grandTotalVerses}`);
  console.log(`Matthew (MAT) Chapters:  ${manifestBooks.find(b => b.id === 'MAT').actualChapters} (Verses: ${manifestBooks.find(b => b.id === 'MAT').totalVerses})`);
  console.log(`Output Directory:        ${OUTPUT_DIR}`);
  console.log(`Preload Module:          ${PRELOAD_FILE}`);
}

run().catch((err) => {
  console.error('Fatal Import Error:', err);
  process.exit(1);
});
