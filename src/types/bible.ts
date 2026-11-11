export type Testament = 'OT' | 'NT';

export type BookDivision =
  | 'মোশির ব্যবস্থা (Law)'
  | 'ঐতিহাসিক বিবরণ (History)'
  | 'কাব্য ও প্রজ্ঞা (Poetry & Wisdom)'
  | 'প্রধান ভাববাদী (Major Prophets)'
  | 'অপ্রধান ভাববাদী (Minor Prophets)'
  | 'সুসমাচার (Gospels)'
  | 'প্রেরিতদের কাজ (Acts)'
  | 'পৌলের পত্রাবলী (Pauline Epistles)'
  | 'সাধারণ পত্রাবলী (General Epistles)'
  | 'প্রকাশিত বাক্য (Apocalyptic)';

export interface BibleBook {
  id: string; // e.g. 'GEN', 'JHN'
  bookNumber: number; // 1 to 66
  nameBn: string; // 'আদিপুস্তক'
  nameEn: string; // 'Genesis'
  shortNameBn: string; // 'আদি'
  testament: Testament;
  division: BookDivision;
  chaptersCount: number;
}

export interface BibleVerse {
  bookId: string;
  chapter: number;
  verse: number;
  textBn: string;
  verseKey: string; // e.g. 'JHN.1.1'
}

export interface BibleChapter {
  bookId: string;
  chapter: number;
  verses: BibleVerse[];
}

export type HighlightColor = 'gold' | 'green' | 'blue' | 'rose';

export interface Highlight {
  id: string;
  bookId: string;
  bookNameBn: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  bookNameBn: string;
  chapter: number;
  verse: number;
  verseText: string;
  createdAt: string;
}

export interface PersonalNote {
  id: string;
  bookId: string;
  bookNameBn: string;
  chapter: number;
  verse: number;
  verseText: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface ReadingHistoryItem {
  id: string;
  bookId: string;
  bookNameBn: string;
  chapter: number;
  verse?: number;
  lastReadAt: string;
}

export type ThemeMode = 'light' | 'dark' | 'sepia';
export type FontFamily = 'serif' | 'sans';

export interface ReaderSettings {
  fontSize: number; // e.g. 18
  lineHeight: number; // e.g. 1.8
  fontFamily: FontFamily;
  theme: ThemeMode;
  bengaliNumerals: boolean;
  verseByVerse: boolean;
}

export interface SearchResult {
  bookId: string;
  bookNameBn: string;
  bookNameEn: string;
  chapter: number;
  verse: number;
  textBn: string;
  matchScore: number;
}
