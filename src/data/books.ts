import { BibleBook } from '../types/bible';
import { toBengaliDigits, fromBengaliDigits } from '../utils/bengaliNumerals';

export const BIBLE_BOOKS: BibleBook[] = [
  // OLD TESTAMENT (পুরাতন নিয়ম) - 39 Books
  // Law (মোশির ব্যবস্থা)
  { id: 'GEN', bookNumber: 1, nameBn: 'আদিপুস্তক', nameEn: 'Genesis', shortNameBn: 'আদি', testament: 'OT', division: 'মোশির ব্যবস্থা (Law)', chaptersCount: 50 },
  { id: 'EXO', bookNumber: 2, nameBn: 'যাত্রাপুস্তক', nameEn: 'Exodus', shortNameBn: 'যাত্রা', testament: 'OT', division: 'মোশির ব্যবস্থা (Law)', chaptersCount: 40 },
  { id: 'LEV', bookNumber: 3, nameBn: 'লেবীয় পুস্তক', nameEn: 'Leviticus', shortNameBn: 'লেবীয়', testament: 'OT', division: 'মোশির ব্যবস্থা (Law)', chaptersCount: 27 },
  { id: 'NUM', bookNumber: 4, nameBn: 'গণনা পুস্তক', nameEn: 'Numbers', shortNameBn: 'গণনা', testament: 'OT', division: 'মোশির ব্যবস্থা (Law)', chaptersCount: 36 },
  { id: 'DEU', bookNumber: 5, nameBn: 'দ্বিতীয় বিবরণ', nameEn: 'Deuteronomy', shortNameBn: 'দ্বিতীয়', testament: 'OT', division: 'মোশির ব্যবস্থা (Law)', chaptersCount: 34 },

  // History (ঐতিহাসিক বিবরণ)
  { id: 'JOS', bookNumber: 6, nameBn: 'যিহোশূয়', nameEn: 'Joshua', shortNameBn: 'যিহো', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 24 },
  { id: 'JDG', bookNumber: 7, nameBn: 'বিচারকর্তৃগণ', nameEn: 'Judges', shortNameBn: 'বিচার', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 21 },
  { id: 'RUT', bookNumber: 8, nameBn: 'রূথ', nameEn: 'Ruth', shortNameBn: 'রূথ', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 4 },
  { id: '1SA', bookNumber: 9, nameBn: '১ শমূয়েল', nameEn: '1 Samuel', shortNameBn: '১ শমূ', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 31 },
  { id: '2SA', bookNumber: 10, nameBn: '২ শমূয়েল', nameEn: '2 Samuel', shortNameBn: '২ শমূ', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 24 },
  { id: '1KI', bookNumber: 11, nameBn: '১ রাজাবলি', nameEn: '1 Kings', shortNameBn: '১ রাজা', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 22 },
  { id: '2KI', bookNumber: 12, nameBn: '২ রাজাবলি', nameEn: '2 Kings', shortNameBn: '২ রাজা', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 25 },
  { id: '1CH', bookNumber: 13, nameBn: '১ বংশাবলি', nameEn: '1 Chronicles', shortNameBn: '১ বংশা', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 29 },
  { id: '2CH', bookNumber: 14, nameBn: '২ বংশাবলি', nameEn: '2 Chronicles', shortNameBn: '২ বংশা', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 36 },
  { id: 'EZR', bookNumber: 15, nameBn: 'ইষ্রা', nameEn: 'Ezra', shortNameBn: 'ইষ্রা', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 10 },
  { id: 'NEH', bookNumber: 16, nameBn: 'নহিমিয়', nameEn: 'Nehemiah', shortNameBn: 'নহি', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 13 },
  { id: 'EST', bookNumber: 17, nameBn: 'ইষ্টের', nameEn: 'Esther', shortNameBn: 'ইষ্টে', testament: 'OT', division: 'ঐতিহাসিক বিবরণ (History)', chaptersCount: 10 },

  // Poetry & Wisdom (কাব্য ও প্রজ্ঞা)
  { id: 'JOB', bookNumber: 18, nameBn: 'ইয়োব', nameEn: 'Job', shortNameBn: 'ইয়োব', testament: 'OT', division: 'কাব্য ও প্রজ্ঞা (Poetry & Wisdom)', chaptersCount: 42 },
  { id: 'PSA', bookNumber: 19, nameBn: 'গীতসংহিতা', nameEn: 'Psalms', shortNameBn: 'গীত', testament: 'OT', division: 'কাব্য ও প্রজ্ঞা (Poetry & Wisdom)', chaptersCount: 150 },
  { id: 'PRO', bookNumber: 20, nameBn: 'হিতোপদেশ', nameEn: 'Proverbs', shortNameBn: 'হিতো', testament: 'OT', division: 'কাব্য ও প্রজ্ঞা (Poetry & Wisdom)', chaptersCount: 31 },
  { id: 'ECC', bookNumber: 21, nameBn: 'উপদেশক', nameEn: 'Ecclesiastes', shortNameBn: 'উপদে', testament: 'OT', division: 'কাব্য ও প্রজ্ঞা (Poetry & Wisdom)', chaptersCount: 12 },
  { id: 'SNG', bookNumber: 22, nameBn: 'পরমগীত', nameEn: 'Song of Solomon', shortNameBn: 'পরম', testament: 'OT', division: 'কাব্য ও প্রজ্ঞা (Poetry & Wisdom)', chaptersCount: 8 },

  // Major Prophets (প্রধান ভাববাদী)
  { id: 'ISA', bookNumber: 23, nameBn: 'যিশাইয়', nameEn: 'Isaiah', shortNameBn: 'যিশা', testament: 'OT', division: 'প্রধান ভাববাদী (Major Prophets)', chaptersCount: 66 },
  { id: 'JER', bookNumber: 24, nameBn: 'যিরমিয়', nameEn: 'Jeremiah', shortNameBn: 'যির', testament: 'OT', division: 'প্রধান ভাববাদী (Major Prophets)', chaptersCount: 52 },
  { id: 'LAM', bookNumber: 25, nameBn: 'বিলাপ', nameEn: 'Lamentations', shortNameBn: 'বিলাপ', testament: 'OT', division: 'প্রধান ভাববাদী (Major Prophets)', chaptersCount: 5 },
  { id: 'EZK', bookNumber: 26, nameBn: 'যিহিষ্কেল', nameEn: 'Ezekiel', shortNameBn: 'যিহি', testament: 'OT', division: 'প্রধান ভাববাদী (Major Prophets)', chaptersCount: 48 },
  { id: 'DAN', bookNumber: 27, nameBn: 'দানিয়েল', nameEn: 'Daniel', shortNameBn: 'দানি', testament: 'OT', division: 'প্রধান ভাববাদী (Major Prophets)', chaptersCount: 12 },

  // Minor Prophets (অপ্রধান ভাববাদী)
  { id: 'HOS', bookNumber: 28, nameBn: 'হোশেয়', nameEn: 'Hosea', shortNameBn: 'হোশে', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 14 },
  { id: 'JOL', bookNumber: 29, nameBn: 'যোয়েল', nameEn: 'Joel', shortNameBn: 'যোয়ে', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 3 },
  { id: 'AMO', bookNumber: 30, nameBn: 'আমোষ', nameEn: 'Amos', shortNameBn: 'আমো', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 9 },
  { id: 'OBA', bookNumber: 31, nameBn: 'ওবদিয়', nameEn: 'Obadiah', shortNameBn: 'ওবদি', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 1 },
  { id: 'JON', bookNumber: 32, nameBn: 'যোনা', nameEn: 'Jonah', shortNameBn: 'যোনা', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 4 },
  { id: 'MIC', bookNumber: 33, nameBn: 'মীখা', nameEn: 'Micah', shortNameBn: 'মীখা', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 7 },
  { id: 'NAM', bookNumber: 34, nameBn: 'নহূম', nameEn: 'Nahum', shortNameBn: 'নহূম', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 3 },
  { id: 'HAB', bookNumber: 35, nameBn: 'হবক্কূক', nameEn: 'Habakkuk', shortNameBn: 'হবক্কূ', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 3 },
  { id: 'ZEP', bookNumber: 36, nameBn: 'সফনিয়', nameEn: 'Zephaniah', shortNameBn: 'সফনি', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 3 },
  { id: 'HAG', bookNumber: 37, nameBn: 'হগয়', nameEn: 'Haggai', shortNameBn: 'হগয়', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 2 },
  { id: 'ZEC', bookNumber: 38, nameBn: 'সখরিয়', nameEn: 'Zechariah', shortNameBn: 'সখরি', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 14 },
  { id: 'MAL', bookNumber: 39, nameBn: 'মালাখি', nameEn: 'Malachi', shortNameBn: 'মালা', testament: 'OT', division: 'অপ্রধান ভাববাদী (Minor Prophets)', chaptersCount: 4 },

  // NEW TESTAMENT (নতুন নিয়ম) - 27 Books
  // Gospels (সুসমাচার)
  { id: 'MAT', bookNumber: 40, nameBn: 'মথি', nameEn: 'Matthew', shortNameBn: 'মথি', testament: 'NT', division: 'সুসমাচার (Gospels)', chaptersCount: 28 },
  { id: 'MRK', bookNumber: 41, nameBn: 'মার্ক', nameEn: 'Mark', shortNameBn: 'মার্ক', testament: 'NT', division: 'সুসমাচার (Gospels)', chaptersCount: 16 },
  { id: 'LUK', bookNumber: 42, nameBn: 'লূক', nameEn: 'Luke', shortNameBn: 'লূক', testament: 'NT', division: 'সুসমাচার (Gospels)', chaptersCount: 24 },
  { id: 'JHN', bookNumber: 43, nameBn: 'যোহন', nameEn: 'John', shortNameBn: 'যোহন', testament: 'NT', division: 'সুসমাচার (Gospels)', chaptersCount: 21 },

  // Acts (প্রেরিতদের কাজ)
  { id: 'ACT', bookNumber: 44, nameBn: 'প্রেরিতদের কার্য', nameEn: 'Acts', shortNameBn: 'প্রেরিত', testament: 'NT', division: 'প্রেরিতদের কাজ (Acts)', chaptersCount: 28 },

  // Pauline Epistles (পৌলের পত্রাবলী)
  { id: 'ROM', bookNumber: 45, nameBn: 'রোমীয়', nameEn: 'Romans', shortNameBn: 'রোমীয়', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 16 },
  { id: '1CO', bookNumber: 46, nameBn: '১ করিন্থীয়', nameEn: '1 Corinthians', shortNameBn: '১ করি', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 16 },
  { id: '2CO', bookNumber: 47, nameBn: '২ করিন্থীয়', nameEn: '2 Corinthians', shortNameBn: '২ করি', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 13 },
  { id: 'GAL', bookNumber: 48, nameBn: 'গালাতীয়', nameEn: 'Galatians', shortNameBn: 'গালা', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 6 },
  { id: 'EPH', bookNumber: 49, nameBn: 'ইফিষীয়', nameEn: 'Ephesians', shortNameBn: 'ইফি', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 6 },
  { id: 'PHP', bookNumber: 50, nameBn: 'ফিলিপীয়', nameEn: 'Philippians', shortNameBn: 'ফিলি', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 4 },
  { id: 'COL', bookNumber: 51, nameBn: 'কলসীয়', nameEn: 'Colossians', shortNameBn: 'কল', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 4 },
  { id: '1TH', bookNumber: 52, nameBn: '১ থিষলনীকীয়', nameEn: '1 Thessalonians', shortNameBn: '১ থিষ', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 5 },
  { id: '2TH', bookNumber: 53, nameBn: '২ থিষলনীকীয়', nameEn: '2 Thessalonians', shortNameBn: '২ থিষ', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 3 },
  { id: '1TI', bookNumber: 54, nameBn: '১ তীমথিয়', nameEn: '1 Timothy', shortNameBn: '১ তীম', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 6 },
  { id: '2TI', bookNumber: 55, nameBn: '২ তীমথিয়', nameEn: '2 Timothy', shortNameBn: '২ তীম', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 4 },
  { id: 'TIT', bookNumber: 56, nameBn: 'তীত', nameEn: 'Titus', shortNameBn: 'তীত', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 3 },
  { id: 'PHM', bookNumber: 57, nameBn: 'ফিলীমন', nameEn: 'Philemon', shortNameBn: 'ফিলী', testament: 'NT', division: 'পৌলের পত্রাবলী (Pauline Epistles)', chaptersCount: 1 },

  // General Epistles (সাধারণ পত্রাবলী)
  { id: 'HEB', bookNumber: 58, nameBn: 'ইব্রীয়', nameEn: 'Hebrews', shortNameBn: 'ইব্রীয়', testament: 'NT', division: 'সাধারণ পত্রাবলী (General Epistles)', chaptersCount: 13 },
  { id: 'JAS', bookNumber: 59, nameBn: 'যাকোব', nameEn: 'James', shortNameBn: 'যাকোব', testament: 'NT', division: 'সাধারণ পত্রাবলী (General Epistles)', chaptersCount: 5 },
  { id: '1PE', bookNumber: 60, nameBn: '১ পিতর', nameEn: '1 Peter', shortNameBn: '১ পিত', testament: 'NT', division: 'সাধারণ পত্রাবলী (General Epistles)', chaptersCount: 5 },
  { id: '2PE', bookNumber: 61, nameBn: '২ পিতর', nameEn: '2 Peter', shortNameBn: '২ পিত', testament: 'NT', division: 'সাধারণ পত্রাবলী (General Epistles)', chaptersCount: 3 },
  { id: '1JN', bookNumber: 62, nameBn: '১ যোহন', nameEn: '1 John', shortNameBn: '১ যোহন', testament: 'NT', division: 'সাধারণ পত্রাবলী (General Epistles)', chaptersCount: 5 },
  { id: '2JN', bookNumber: 63, nameBn: '২ যোহন', nameEn: '2 John', shortNameBn: '২ যোহন', testament: 'NT', division: 'সাধারণ পত্রাবলী (General Epistles)', chaptersCount: 1 },
  { id: '3JN', bookNumber: 64, nameBn: '৩ যোহন', nameEn: '3 John', shortNameBn: '৩ যোহন', testament: 'NT', division: 'সাধারণ পত্রাবলী (General Epistles)', chaptersCount: 1 },
  { id: 'JUD', bookNumber: 65, nameBn: 'যিহূদা', nameEn: 'Jude', shortNameBn: 'যিহূদা', testament: 'NT', division: 'সাধারণ পত্রাবলী (General Epistles)', chaptersCount: 1 },

  // Apocalyptic (প্রকাশিত বাক্য)
  { id: 'REV', bookNumber: 66, nameBn: 'প্রকাশিত বাক্য', nameEn: 'Revelation', shortNameBn: 'প্রকা', testament: 'NT', division: 'প্রকাশিত বাক্য (Apocalyptic)', chaptersCount: 22 },
];

export const OLD_TESTAMENT_BOOKS = BIBLE_BOOKS.filter((b) => b.testament === 'OT');
export const NEW_TESTAMENT_BOOKS = BIBLE_BOOKS.filter((b) => b.testament === 'NT');

export function getBookById(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id.toUpperCase() === id.toUpperCase());
}

// Common abbreviation aliases for high-speed reference parsing
const BOOK_ALIASES: Record<string, string> = {
  'jn': 'JHN', 'jhn': 'JHN', 'john': 'JHN', 'যোহন': 'JHN',
  'gen': 'GEN', 'genesis': 'GEN', 'আদি': 'GEN', 'আদিপুস্তক': 'GEN',
  'exo': 'EXO', 'exodus': 'EXO', 'যাত্রা': 'EXO', 'যাত্রাপুস্তক': 'EXO',
  'ps': 'PSA', 'psa': 'PSA', 'psalm': 'PSA', 'psalms': 'PSA', 'গীত': 'PSA', 'গীতসংহিতা': 'PSA',
  'matt': 'MAT', 'mat': 'MAT', 'matthew': 'MAT', 'মথি': 'MAT',
  'mrk': 'MRK', 'mark': 'MRK', 'মার্ক': 'MRK',
  'luk': 'LUK', 'luke': 'LUK', 'লূক': 'LUK',
  'act': 'ACT', 'acts': 'ACT', 'প্রেরিত': 'ACT', 'প্রেরিতদের কার্য': 'ACT',
  'rom': 'ROM', 'romans': 'ROM', 'রোমীয়': 'ROM',
  '1co': '1CO', '1cor': '1CO', '1 cor': '1CO', '1 corinthians': '1CO', '১ করি': '1CO', '১ করিন্থীয়': '1CO',
  '2co': '2CO', '2cor': '2CO', '2 cor': '2CO', '2 corinthians': '2CO', '২ করি': '2CO', '২ করিন্থীয়': '2CO',
  'gal': 'GAL', 'galatians': 'GAL', 'গালা': 'GAL', 'গালাতীয়': 'GAL',
  'eph': 'EPH', 'ephesians': 'EPH', 'ইফি': 'EPH', 'ইফিষীয়': 'EPH',
  'php': 'PHP', 'phil': 'PHP', 'philippians': 'PHP', 'ফিলি': 'PHP', 'ফিলিপীয়': 'PHP',
  'col': 'COL', 'colossians': 'COL', 'কল': 'COL', 'কলসীয়': 'COL',
  '1th': '1TH', '1thess': '1TH', '1 thess': '1TH', '১ থিষ': '1TH', '১ থিষলনীকীয়': '1TH',
  '2th': '2TH', '2thess': '2TH', '2 thess': '2TH', '২ থিষ': '2TH', '২ থিষলনীকীয়': '2TH',
  '1ti': '1TI', '1tim': '1TI', '1 tim': '1TI', '১ তীম': '1TI', '১ তীমথিয়': '1TI',
  '2ti': '2TI', '2tim': '2TI', '2 tim': '2TI', '২ তীম': '2TI', '২ তীমথিয়': '2TI',
  'tit': 'TIT', 'titus': 'TIT', 'তীত': 'TIT',
  'phm': 'PHM', 'philemon': 'PHM', 'ফিলী': 'PHM', 'ফিলীমন': 'PHM',
  'heb': 'HEB', 'hebrews': 'HEB', 'ইব্রীয়': 'HEB',
  'jas': 'JAS', 'james': 'JAS', 'যাকোব': 'JAS',
  '1pe': '1PE', '1pet': '1PE', '1 pet': '1PE', '১ পিত': '1PE', '১ পিতর': '1PE',
  '2pe': '2PE', '2pet': '2PE', '2 pet': '2PE', '২ পিত': '2PE', '২ পিতর': '2PE',
  '1jn': '1JN', '1 jn': '1JN', '1 john': '1JN', '১ যোহন': '1JN',
  '2jn': '2JN', '2 jn': '2JN', '2 john': '2JN', '২ যোহন': '2JN',
  '3jn': '3JN', '3 jn': '3JN', '3 john': '3JN', '৩ যোহন': '3JN',
  'jud': 'JUD', 'jude': 'JUD', 'যিহূদা': 'JUD',
  'rev': 'REV', 'revelation': 'REV', 'প্রকা': 'REV', 'প্রকাশিত বাক্য': 'REV',
  'pro': 'PRO', 'prov': 'PRO', 'proverbs': 'PRO', 'হিতো': 'PRO', 'হিতোপদেশ': 'PRO',
  'isa': 'ISA', 'isaiah': 'ISA', 'যিশা': 'ISA', 'যিশাইয়': 'ISA',
  'jer': 'JER', 'jeremiah': 'JER', 'যির': 'JER', 'যিরমিয়': 'JER',
  'dan': 'DAN', 'daniel': 'DAN', 'দানি': 'DAN', 'দানিয়েল': 'DAN',
};

export function getBookByName(name: string): BibleBook | undefined {
  const raw = name.trim().toLowerCase().replace(/\s+/g, ' ');
  const bengaliNormalized = toBengaliDigits(raw);
  const englishNormalized = fromBengaliDigits(raw);

  // Direct alias lookup first
  for (const cand of [raw, englishNormalized, bengaliNormalized]) {
    if (BOOK_ALIASES[cand]) {
      const aliasedId = BOOK_ALIASES[cand];
      const found = getBookById(aliasedId);
      if (found) return found;
    }
  }

  // Canonical name matching
  return BIBLE_BOOKS.find((b) => {
    const bBn = b.nameBn.toLowerCase();
    const bEn = b.nameEn.toLowerCase();
    const bShort = b.shortNameBn.toLowerCase();
    const bId = b.id.toLowerCase();
    return (
      bBn === raw || bBn === bengaliNormalized || bBn === englishNormalized ||
      bEn === raw || bEn === bengaliNormalized || bEn === englishNormalized ||
      bShort === raw || bShort === bengaliNormalized || bShort === englishNormalized ||
      bId === raw
    );
  });
}
