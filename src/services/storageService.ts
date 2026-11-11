import {
  Bookmark,
  Highlight,
  HighlightColor,
  PersonalNote,
  ReaderSettings,
  ReadingHistoryItem,
} from '../types/bible';

const STORAGE_KEYS = {
  BOOKMARKS: 'bsb_bookmarks_v1',
  HIGHLIGHTS: 'bsb_highlights_v1',
  NOTES: 'bsb_personal_notes_v1',
  HISTORY: 'bsb_reading_history_v1',
  SETTINGS: 'bsb_reader_settings_v1',
  LAST_READ: 'bsb_last_read_v1',
};

export const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 18,
  lineHeight: 1.8,
  fontFamily: 'serif',
  theme: 'light',
  bengaliNumerals: true,
  verseByVerse: true,
};

export class StorageService {
  // ================= BOOKMARKS =================
  public static getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static isBookmarked(bookId: string, chapter: number, verse: number): boolean {
    const bookmarks = this.getBookmarks();
    return bookmarks.some(
      (b) => b.bookId === bookId && b.chapter === chapter && b.verse === verse
    );
  }

  public static toggleBookmark(
    bookId: string,
    bookNameBn: string,
    chapter: number,
    verse: number,
    verseText: string
  ): boolean {
    const bookmarks = this.getBookmarks();
    const existingIndex = bookmarks.findIndex(
      (b) => b.bookId === bookId && b.chapter === chapter && b.verse === verse
    );

    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return false; // Removed
    } else {
      const newBookmark: Bookmark = {
        id: `bm_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        bookId,
        bookNameBn,
        chapter,
        verse,
        verseText,
        createdAt: new Date().toISOString(),
      };
      bookmarks.unshift(newBookmark);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return true; // Added
    }
  }

  public static removeBookmark(id: string): void {
    const bookmarks = this.getBookmarks().filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }

  // ================= HIGHLIGHTS =================
  public static getHighlights(): Highlight[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static getHighlightForVerse(
    bookId: string,
    chapter: number,
    verse: number
  ): Highlight | undefined {
    const highlights = this.getHighlights();
    return highlights.find(
      (h) => h.bookId === bookId && h.chapter === chapter && h.verse === verse
    );
  }

  public static setHighlight(
    bookId: string,
    bookNameBn: string,
    chapter: number,
    verse: number,
    color: HighlightColor | null
  ): void {
    let highlights = this.getHighlights();
    // Remove any existing highlight on this verse
    highlights = highlights.filter(
      (h) => !(h.bookId === bookId && h.chapter === chapter && h.verse === verse)
    );

    if (color) {
      highlights.unshift({
        id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        bookId,
        bookNameBn,
        chapter,
        verse,
        color,
        createdAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
  }

  // ================= PERSONAL NOTES =================
  public static getNotes(): PersonalNote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static getNoteForVerse(
    bookId: string,
    chapter: number,
    verse: number
  ): PersonalNote | undefined {
    const notes = this.getNotes();
    return notes.find(
      (n) => n.bookId === bookId && n.chapter === chapter && n.verse === verse
    );
  }

  public static saveNote(note: Omit<PersonalNote, 'id' | 'updatedAt'> & { id?: string }): PersonalNote {
    const notes = this.getNotes();
    const now = new Date().toISOString();

    if (note.id) {
      const index = notes.findIndex((n) => n.id === note.id);
      if (index >= 0) {
        notes[index] = {
          ...notes[index],
          title: note.title,
          content: note.content,
          updatedAt: now,
        };
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
        return notes[index];
      }
    }

    // Check if a note for this verse already exists
    const existingIndex = notes.findIndex(
      (n) => n.bookId === note.bookId && n.chapter === note.chapter && n.verse === note.verse
    );

    if (existingIndex >= 0) {
      notes[existingIndex] = {
        ...notes[existingIndex],
        title: note.title,
        content: note.content,
        updatedAt: now,
      };
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
      return notes[existingIndex];
    }

    const newNote: PersonalNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      bookId: note.bookId,
      bookNameBn: note.bookNameBn,
      chapter: note.chapter,
      verse: note.verse,
      verseText: note.verseText,
      title: note.title,
      content: note.content,
      updatedAt: now,
    };
    notes.unshift(newNote);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return newNote;
  }

  public static deleteNote(id: string): void {
    const notes = this.getNotes().filter((n) => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }

  // ================= READING HISTORY =================
  public static getReadingHistory(): ReadingHistoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static recordReadingHistory(
    bookId: string,
    bookNameBn: string,
    chapter: number,
    verse?: number
  ): void {
    let history = this.getReadingHistory();
    // Remove previous entry for same book & chapter so latest is on top
    history = history.filter(
      (h) => !(h.bookId === bookId && h.chapter === chapter)
    );

    history.unshift({
      id: `hist_${Date.now()}`,
      bookId,
      bookNameBn,
      chapter,
      verse,
      lastReadAt: new Date().toISOString(),
    });

    // Keep top 30 history records
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 30)));

    // Save as last read
    localStorage.setItem(
      STORAGE_KEYS.LAST_READ,
      JSON.stringify({ bookId, bookNameBn, chapter, verse })
    );
  }

  public static getLastRead(): { bookId: string; bookNameBn: string; chapter: number; verse?: number } | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_READ);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static clearReadingHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  }

  // ================= READER SETTINGS =================
  public static getSettings(): ReaderSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static saveSettings(settings: Partial<ReaderSettings>): ReaderSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  }
}
