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

export interface CanonicalBook {
  id: string; // e.g. 'GEN', 'JHN'
  bookNumber: number; // 1 to 66
  nameEn: string; // 'Genesis'
  nameBn: string; // 'আদিপুস্তক'
  shortNameBn: string; // 'আদি'
  abbreviation: string; // 'Gen'
  testament: Testament;
  division: BookDivision;
  chaptersCount: number;
  verseCount: number;
  hebrewGreekName: string;
  authorBn: string;
  dateBn: string;
  themeBn: string;
  descriptionBn: string;
  chapterVersesCount: number[]; // Exact verse count for every chapter (1..chaptersCount)
}

export interface CanonicalVerseIdentifier {
  verseId: string; // e.g. 'GEN-1-1', 'JHN-3-16'
  bookId: string;
  chapter: number;
  verse: number;
  testament: Testament;
}

export interface BibleVerseRecord {
  verseId: string; // e.g. 'JHN-3-16'
  translationId: string; // e.g. 'CAREY_BN', 'BSI_BN', 'CANONICAL_BN'
  bookId: string;
  chapter: number;
  verse: number;
  textBn: string;
  textEn?: string;
  searchText: string;
  isVerified: boolean;
  licenseStatus: 'public_domain' | 'authorized_bsi' | 'open_license' | 'pending_verification';
}
