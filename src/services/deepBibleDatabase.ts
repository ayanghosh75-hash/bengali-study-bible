// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ Bible Database Engine” — Persistent IndexedDB Storage Layer
// Scripture Motto: গীতসংহিতা ১১৯:১০৫
// ============================================================

import { StoredBookData } from '../data/preloadedVerses';
import { BibleVerse } from '../types/bible';

const DB_NAME = 'bengali_study_bible_db';
const DB_VERSION = 2;
const BOOKS_STORE = 'canonical_books';
const INTEGRITY_STORE = 'chapter_integrity';

export interface ChapterIntegrityRecord {
  bookId: string;
  chapter: number;
  verseCount: number;
  checksum: string;
  verifiedAt: string;
  status: 'VERIFIED' | 'PARTIAL' | 'CORRUPTED';
}

export class DeepBibleDatabase {
  private static dbPromise: Promise<IDBDatabase | null> | null = null;

  /**
   * Initializes or returns the open IndexedDB instance.
   */
  public static async getDB(): Promise<IDBDatabase | null> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return null;
    }

    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve) => {
        try {
          const req = window.indexedDB.open(DB_NAME, DB_VERSION);

          req.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(BOOKS_STORE)) {
              db.createObjectStore(BOOKS_STORE, { keyPath: 'bookId' });
            }
            if (!db.objectStoreNames.contains(INTEGRITY_STORE)) {
              const intStore = db.createObjectStore(INTEGRITY_STORE, { keyPath: 'key' });
              intStore.createIndex('by_book', 'bookId', { unique: false });
            }
          };

          req.onsuccess = () => {
            resolve(req.result);
          };

          req.onerror = () => {
            console.warn('[DeepBibleDatabase] IndexedDB open error, falling back to in-memory cache.');
            resolve(null);
          };

          req.onblocked = () => {
            console.warn('[DeepBibleDatabase] IndexedDB open blocked.');
            resolve(null);
          };
        } catch (e) {
          console.warn('[DeepBibleDatabase] IndexedDB not available:', e);
          resolve(null);
        }
      });
    }

    return this.dbPromise;
  }

  /**
   * Retrieves a full book from IndexedDB persistent storage.
   */
  public static async getBook(bookId: string): Promise<StoredBookData | null> {
    const db = await this.getDB();
    if (!db) return null;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(BOOKS_STORE, 'readonly');
        const store = tx.objectStore(BOOKS_STORE);
        const req = store.get(bookId.toUpperCase());

        req.onsuccess = () => {
          resolve(req.result || null);
        };

        req.onerror = () => {
          resolve(null);
        };
      } catch {
        resolve(null);
      }
    });
  }

  /**
   * Stores or updates a full book in IndexedDB persistent storage.
   */
  public static async saveBook(data: StoredBookData): Promise<void> {
    const db = await this.getDB();
    if (!db) return;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(BOOKS_STORE, 'readwrite');
        const store = tx.objectStore(BOOKS_STORE);
        const bookCopy = {
          ...data,
          bookId: data.bookId.toUpperCase(),
          updatedAt: new Date().toISOString(),
        };
        store.put(bookCopy);

        tx.oncomplete = () => {
          resolve();
        };

        tx.onerror = () => {
          resolve();
        };
      } catch {
        resolve();
      }
    });
  }

  /**
   * Retrieves verses for a specific chapter from local storage.
   */
  public static async getChapterVerses(
    bookId: string,
    chapter: number
  ): Promise<BibleVerse[] | null> {
    const book = await this.getBook(bookId);
    if (!book || !book.chapters) return null;

    const list = book.chapters[chapter.toString()];
    if (!list || list.length === 0) return null;

    const verses: BibleVerse[] = list.map((v) => ({
      bookId: book.bookId,
      chapter,
      verse: v.verse,
      textBn: v.textBn,
      verseKey: `${book.bookId}.${chapter}.${v.verse}`,
    }));

    verses.sort((a, b) => a.verse - b.verse);
    return verses;
  }

  /**
   * Fast non-cryptographic checksum for chapter verification.
   */
  public static computeChecksum(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return 'chk_' + Math.abs(hash).toString(16);
  }

  /**
   * Safe repair: clears corrupted store without touching user notes/bookmarks.
   */
  public static async clearCorruptedScriptureCache(): Promise<void> {
    const db = await this.getDB();
    if (!db) return;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(BOOKS_STORE, 'readwrite');
        const store = tx.objectStore(BOOKS_STORE);
        store.clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  }
}
