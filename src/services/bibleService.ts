import { BibleBook, BibleVerse, SearchResult } from '../types/bible';
import { BIBLE_BOOKS, getBookById, getBookByName } from '../data/books';
import { DAILY_VERSES, DailyVerseItem } from '../data/verses';
import { fromBengaliDigits } from '../utils/bengaliNumerals';
import { PRELOADED_BIBLE_BOOKS, StoredBookData } from '../data/preloadedVerses';
import { DeepBibleDatabase } from './deepBibleDatabase';
import { getExpectedVerses } from '../data/authoritativeBibleManifest';

export interface ChapterLoadResult {
  verses: BibleVerse[];
  status: 'SUCCESS' | 'NO_TEXT' | 'ERROR' | 'LICENSE_RESTRICTED';
  message?: string;
  isRecovered?: boolean;
}

export class BibleService {
  private static bookCache: Map<string, StoredBookData> = new Map();
  private static versesMap: Map<string, BibleVerse[]> = new Map();
  private static fullyLoadedBooks: Set<string> = new Set();
  private static pendingFetches: Map<string, Promise<StoredBookData | null>> = new Map();
  private static searchIndex: Array<{ b: string; c: number; v: number; t: string }> | null = null;
  private static isInitialized = false;
  private static isSearchIndexLoading = false;

  public static initialize(): void {
    if (this.isInitialized) return;

    // Load preloaded core preview chapters (MAT 1, JHN 1, GEN 1, PSA 23, ROM 8) for zero-latency initial paint
    // Marked as NOT fully loaded so complete chapters and all other chapters are loaded on demand
    for (const [, bookData] of Object.entries(PRELOADED_BIBLE_BOOKS)) {
      this.registerBookData(bookData, false);
    }

    this.isInitialized = true;

    // In browser environment, initiate background load of full search index
    // and pre-warm core Gospels (MAT, MRK, LUK, JHN)
    if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
      this.loadSearchIndex().catch(() => {});
      setTimeout(() => {
        this.fetchBook('MAT').catch(() => {});
        this.fetchBook('MRK').catch(() => {});
        this.fetchBook('LUK').catch(() => {});
        this.fetchBook('JHN').catch(() => {});
      }, 50);
    }
  }

  public static evictBookFromCache(bookId: string): void {
    const upperId = bookId.toUpperCase();
    this.bookCache.delete(upperId);
    this.fullyLoadedBooks.delete(upperId);
    this.pendingFetches.delete(upperId);
    for (const key of Array.from(this.versesMap.keys())) {
      if (key.startsWith(`${upperId}_`)) {
        this.versesMap.delete(key);
      }
    }
  }

  private static registerBookData(data: StoredBookData, isComplete = false): void {
    const upperId = data.bookId.toUpperCase();
    const existing = this.bookCache.get(upperId);
    if (existing) {
      existing.chapters = { ...existing.chapters, ...data.chapters };
      existing.actualChapters = Object.keys(existing.chapters).length;
      if (data.totalVerses > existing.totalVerses) {
        existing.totalVerses = data.totalVerses;
      }
    } else {
      this.bookCache.set(upperId, {
        ...data,
        chapters: { ...data.chapters },
        actualChapters: Object.keys(data.chapters).length,
      });
    }

    if (isComplete) {
      this.fullyLoadedBooks.add(upperId);
    }

    for (const [chStr, vList] of Object.entries(data.chapters)) {
      const ch = parseInt(chStr, 10);
      const key = `${upperId}_${ch}`;
      const verses: BibleVerse[] = vList.map((v) => ({
        bookId: data.bookId,
        chapter: ch,
        verse: v.verse,
        textBn: v.textBn,
        verseKey: `${data.bookId}.${ch}.${v.verse}`,
      }));
      verses.sort((a, b) => a.verse - b.verse);
      this.versesMap.set(key, verses);
    }
  }

  public static async fetchBook(
    bookId: string,
    requiredChapter?: number,
    forceRefresh = false
  ): Promise<StoredBookData | null> {
    this.initialize();
    const upperId = bookId.toUpperCase();

    // 1. Hot in-memory cache check
    const cached = this.bookCache.get(upperId);
    if (!forceRefresh && this.fullyLoadedBooks.has(upperId) && cached) {
      if (!requiredChapter || (cached.chapters && cached.chapters[requiredChapter.toString()])) {
        return cached;
      }
    }

    // 2. Persistent IndexedDB local storage check
    if (!forceRefresh && typeof window !== 'undefined') {
      try {
        const idbBook = await DeepBibleDatabase.getBook(upperId);
        if (idbBook && (!requiredChapter || (idbBook.chapters && idbBook.chapters[requiredChapter.toString()]))) {
          this.registerBookData(idbBook, true);
          return this.bookCache.get(upperId) || idbBook;
        }
      } catch (e) {
        console.warn(`[BibleService] IndexedDB read bypassed for ${upperId}:`, e);
      }
    }

    // Deduplicate in-flight fetch requests for the same book
    if (this.pendingFetches.has(upperId) && !forceRefresh) {
      return this.pendingFetches.get(upperId)!;
    }

    const fetchPromise = (async (): Promise<StoredBookData | null> => {
      try {
        if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
          let attempts = 0;
          const maxAttempts = 3;
          let lastError: any = null;

          while (attempts < maxAttempts) {
            attempts++;
            try {
              const origin = window.location.origin;
              const cacheBust = forceRefresh || attempts > 1 ? `?t=${Date.now()}` : '';
              const fetchUrl = `${origin}/bible-data/irv/${upperId}.json${cacheBust}`;

              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 8000);

              const res = await fetch(fetchUrl, {
                signal: controller.signal,
                cache: forceRefresh ? 'reload' : 'default',
              });
              clearTimeout(timeoutId);

              if (res.ok) {
                const data: StoredBookData = await res.json();
                this.registerBookData(data, true);
                DeepBibleDatabase.saveBook(data).catch(() => {});
                return this.bookCache.get(upperId) || data;
              } else {
                lastError = new Error(`HTTP ${res.status}: ${res.statusText}`);
              }
            } catch (err) {
              lastError = err;
            }

            if (attempts < maxAttempts) {
              await new Promise((r) => setTimeout(r, attempts * 150));
            }
          }

          console.warn(`[BibleService] All ${maxAttempts} network fetch attempts failed for ${upperId}:`, lastError);

          // Final fallback check to IndexedDB
          try {
            const fallbackIdb = await DeepBibleDatabase.getBook(upperId);
            if (fallbackIdb) {
              this.registerBookData(fallbackIdb, true);
              return this.bookCache.get(upperId) || fallbackIdb;
            }
          } catch {}
        } else if (
          typeof window === 'undefined' &&
          typeof (globalThis as any).process !== 'undefined' &&
          (globalThis as any).process.versions?.node
        ) {
          try {
            const nodeProcess = (globalThis as any).process;
            const fsModuleName = 'fs';
            const pathModuleName = 'path';
            const fsModule = await import(/* @vite-ignore */ fsModuleName);
            const pathModule = await import(/* @vite-ignore */ pathModuleName);
            const filePath = pathModule.resolve(nodeProcess.cwd(), `public/bible-data/irv/${upperId}.json`);
            if (fsModule.existsSync(filePath)) {
              const data: StoredBookData = JSON.parse(fsModule.readFileSync(filePath, 'utf8'));
              this.registerBookData(data, true);
              return this.bookCache.get(upperId) || data;
            }
          } catch {
            // Fallback ignored
          }
        }
      } catch (e) {
        console.warn(`[BibleService] Failed to fetch book ${upperId}:`, e);
      } finally {
        this.pendingFetches.delete(upperId);
      }

      return this.bookCache.get(upperId) || null;
    })();

    this.pendingFetches.set(upperId, fetchPromise);
    return fetchPromise;
  }

  public static async loadSearchIndex(): Promise<Array<{ b: string; c: number; v: number; t: string }>> {
    if (this.searchIndex) return this.searchIndex;
    if (this.isSearchIndexLoading) {
      // Wait for existing load
      while (this.isSearchIndexLoading) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      return this.searchIndex || [];
    }

    this.isSearchIndexLoading = true;
    try {
      if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
        const res = await fetch('/bible-data/irv/search-index.json');
        if (res.ok) {
          this.searchIndex = await res.json();
        }
      }
    } catch (e) {
      console.warn('[BibleService] Could not load search-index.json:', e);
    } finally {
      this.isSearchIndexLoading = false;
    }

    return this.searchIndex || [];
  }

  public static getBooks(): BibleBook[] {
    return BIBLE_BOOKS;
  }

  public static getBook(bookId: string): BibleBook | undefined {
    return getBookById(bookId);
  }

  /**
   * Synchronous getter for chapter verses.
   * Returns empty array if book is not yet in memory cache, and triggers background fetch.
   * NEVER returns a fabricated placeholder verse.
   */
  public static getChapterVerses(bookId: string, chapter: number): BibleVerse[] {
    this.initialize();
    const upperId = bookId.toUpperCase();
    const key = `${upperId}_${chapter}`;
    const existing = this.versesMap.get(key);

    // If book is not fully loaded, trigger background fetch of the complete book
    if (!this.fullyLoadedBooks.has(upperId)) {
      this.fetchBook(bookId, chapter).catch(() => {});
    }

    return existing || [];
  }

  /**
   * Asynchronous chapter loader with full license and error status differentiation.
   */
  public static async loadChapterVerses(
    bookId: string,
    chapter: number,
    translationId = 'irv-ben',
    forceRefresh = false
  ): Promise<ChapterLoadResult> {
    this.initialize();

    // Check licensing restriction
    if (translationId === 'bsi-ben') {
      return {
        verses: [],
        status: 'LICENSE_RESTRICTED',
        message:
          'এই অনুবাদের পাঠ বর্তমানে উপলব্ধ নয়। বাইবেল সোসাইটি অফ ইন্ডিয়ার (BSI) অনুমোদিত লাইসেন্স যাচাইকরণ প্রক্রিয়াধীন। সম্পূর্ণ অনুমোদিত পাঠ্যের জন্য IRV বাংলা নির্বাচন করুন।',
      };
    }

    const upperId = bookId.toUpperCase();
    const key = `${upperId}_${chapter}`;

    if (forceRefresh) {
      this.evictBookFromCache(upperId);
    }

    // Check in-memory versesMap first if not force refresh
    if (!forceRefresh) {
      const existing = this.versesMap.get(key);
      if (existing && existing.length > 0) {
        return {
          verses: existing,
          status: 'SUCCESS',
        };
      }
    }

    // Fetch book (checks IndexedDB, then network with retries & origin URL)
    const bookData = await this.fetchBook(bookId, chapter, forceRefresh);

    const verses = this.versesMap.get(key);
    if (verses && verses.length > 0) {
      return {
        verses,
        status: 'SUCCESS',
      };
    }

    // Check if book was loaded but this specific chapter is missing
    if (bookData && bookData.chapters) {
      const chList = bookData.chapters[chapter.toString()];
      if (chList && chList.length > 0) {
        this.registerBookData(bookData, true);
        const refreshed = this.versesMap.get(key);
        if (refreshed && refreshed.length > 0) {
          return {
            verses: refreshed,
            status: 'SUCCESS',
          };
        }
      }

      // Check authoritative manifest
      const expected = getExpectedVerses(bookId, chapter);
      if (expected > 0) {
        return {
          verses: [],
          status: 'NO_TEXT',
          message:
            'এই অধ্যায়ের অনুমোদিত পাঠ এখনো যুক্ত করা যায়নি। দীপ বিষয়টি প্রশাসকের কাছে পাঠিয়েছে।',
        };
      }
    }

    // If fetch failed completely, return temporary error with Deep's comforting message
    return {
      verses: [],
      status: 'ERROR',
      message: 'অধ্যায়টি লোড হতে সাময়িক সমস্যা হচ্ছে। দীপ পুনরায় চেষ্টা করছে...',
    };
  }

  public static getVerse(bookId: string, chapter: number, verse: number): BibleVerse | undefined {
    this.initialize();
    const verses = this.getChapterVerses(bookId, chapter);
    return verses.find((v) => v.verse === verse);
  }

  public static getDailyVerse(): DailyVerseItem {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const index = dayOfYear % DAILY_VERSES.length;
    return DAILY_VERSES[index];
  }

  public static searchVerses(rawQuery: string): SearchResult[] {
    this.initialize();
    const query = rawQuery.trim();
    if (!query) return [];

    const results: SearchResult[] = [];
    const normalizedDigitsQuery = fromBengaliDigits(query);

    // 1. Check if user typed a reference (e.g. "মথি ২৬:১", "মথি ২৬", "যোহন ৩:১৬", "John 3:16", "১ যোহন ৩:১৬")
    const refMatch =
      normalizedDigitsQuery.match(/^([1-3]?\s*[\u0980-\u09FFa-zA-Z\s]+?)\s+(\d+)(?::(\d+))?$/i) ||
      normalizedDigitsQuery.match(/^([^\d:]+?)\s*(\d+)(?::(\d+))?$/i);

    if (refMatch) {
      const bookQuery = refMatch[1].trim();
      const targetChapter = parseInt(refMatch[2], 10);
      const targetVerse = refMatch[3] ? parseInt(refMatch[3], 10) : undefined;

      const matchedBook = getBookByName(bookQuery);
      if (matchedBook) {
        let chapterVerses = this.getChapterVerses(matchedBook.id, targetChapter);

        // If not in versesMap yet, extract directly from searchIndex if loaded
        if (chapterVerses.length === 0 && this.searchIndex && this.searchIndex.length > 0) {
          const filtered = this.searchIndex.filter(
            (item) => item.b === matchedBook.id && item.c === targetChapter
          );
          if (filtered.length > 0) {
            chapterVerses = filtered.map((item) => ({
              bookId: item.b,
              chapter: item.c,
              verse: item.v,
              textBn: item.t,
              verseKey: `${item.b}.${item.c}.${item.v}`,
            }));
          }
        }

        if (chapterVerses.length > 0) {
          if (targetVerse) {
            const v = chapterVerses.find((item) => item.verse === targetVerse);
            if (v) {
              results.push({
                bookId: matchedBook.id,
                bookNameBn: matchedBook.nameBn,
                bookNameEn: matchedBook.nameEn,
                chapter: targetChapter,
                verse: targetVerse,
                textBn: v.textBn,
                matchScore: 100,
              });
              return results;
            }
          } else {
            // Return first 10 verses of the chapter as preview
            for (const v of chapterVerses.slice(0, 10)) {
              results.push({
                bookId: matchedBook.id,
                bookNameBn: matchedBook.nameBn,
                bookNameEn: matchedBook.nameEn,
                chapter: targetChapter,
                verse: v.verse,
                textBn: v.textBn,
                matchScore: 90,
              });
            }
            return results;
          }
        }
      }
    }

    // 2. Keyword search across searchIndex (if loaded) or loaded verses
    const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);

    if (this.searchIndex && this.searchIndex.length > 0) {
      for (const item of this.searchIndex) {
        const textLower = item.t.toLowerCase();
        let matchCount = 0;
        for (const term of searchTerms) {
          if (textLower.includes(term)) {
            matchCount++;
          }
        }
        if (matchCount > 0) {
          const book = getBookById(item.b);
          results.push({
            bookId: item.b,
            bookNameBn: book ? book.nameBn : item.b,
            bookNameEn: book ? book.nameEn : item.b,
            chapter: item.c,
            verse: item.v,
            textBn: item.t,
            matchScore: matchCount * 20 + (matchCount === searchTerms.length ? 50 : 0),
          });
        }
      }
      return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 40);
    }

    // Fallback: search through all currently loaded verses in versesMap
    for (const [, chapterVerses] of this.versesMap.entries()) {
      for (const verse of chapterVerses) {
        const textLower = verse.textBn.toLowerCase();
        let matchCount = 0;
        for (const term of searchTerms) {
          if (textLower.includes(term)) {
            matchCount++;
          }
        }
        if (matchCount > 0) {
          const book = getBookById(verse.bookId);
          results.push({
            bookId: verse.bookId,
            bookNameBn: book ? book.nameBn : verse.bookId,
            bookNameEn: book ? book.nameEn : verse.bookId,
            chapter: verse.chapter,
            verse: verse.verse,
            textBn: verse.textBn,
            matchScore: matchCount * 20,
          });
        }
      }
    }

    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 40);
  }

  public static async searchVersesAsync(rawQuery: string): Promise<SearchResult[]> {
    await this.loadSearchIndex();

    // If query is a reference, pre-fetch that book if needed
    const normalizedDigitsQuery = fromBengaliDigits(rawQuery.trim());
    const refMatch =
      normalizedDigitsQuery.match(/^([1-3]?\s*[\u0980-\u09FFa-zA-Z\s]+?)\s+(\d+)(?::(\d+))?$/i) ||
      normalizedDigitsQuery.match(/^([^\d:]+?)\s*(\d+)(?::(\d+))?$/i);

    if (refMatch) {
      const bookQuery = refMatch[1].trim();
      const targetChapter = parseInt(refMatch[2], 10);
      const matchedBook = getBookByName(bookQuery);
      if (matchedBook && !this.fullyLoadedBooks.has(matchedBook.id.toUpperCase())) {
        await this.fetchBook(matchedBook.id, targetChapter);
      }
    }

    return this.searchVerses(rawQuery);
  }
}
