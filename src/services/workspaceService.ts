import {
  SavedBibleStudy,
  SavedBook,
  ResearchProject,
  ResearchProjectVerse,
  ResearchProjectNote,
  FullWorkspaceBackup,
} from '../types/workspace';
import { StorageService } from './storageService';
import { SermonStorageService } from './sermonStorageService';
import { AuthService } from './authService';

const WORKSPACE_KEYS = {
  STUDIES: 'bsb_saved_studies_v1',
  BOOKS: 'bsb_saved_books_v1',
  PROJECTS: 'bsb_research_projects_v1',
};

export class WorkspaceService {
  // ================= 6. SAVED BIBLE STUDIES =================
  public static getSavedStudies(): SavedBibleStudy[] {
    try {
      const data = localStorage.getItem(WORKSPACE_KEYS.STUDIES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load saved studies:', e);
    }
    return this.getInitialSampleStudies();
  }

  public static isStudySaved(targetId: string): boolean {
    const list = this.getSavedStudies();
    return list.some((s) => s.targetId === targetId);
  }

  public static toggleSaveStudy(study: {
    type: 'topic' | 'character' | 'custom';
    targetId: string;
    titleBn: string;
    subtitleBn: string;
    summaryBn?: string;
    categoryBn?: string;
  }): boolean {
    const list = this.getSavedStudies();
    const existingIndex = list.findIndex((s) => s.targetId === study.targetId);

    if (existingIndex >= 0) {
      list.splice(existingIndex, 1);
      localStorage.setItem(WORKSPACE_KEYS.STUDIES, JSON.stringify(list));
      return false; // Unsaved
    } else {
      const newItem: SavedBibleStudy = {
        id: 'study_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        type: study.type,
        targetId: study.targetId,
        titleBn: study.titleBn,
        subtitleBn: study.subtitleBn,
        summaryBn: study.summaryBn,
        categoryBn: study.categoryBn,
        savedAt: new Date().toISOString(),
      };
      list.unshift(newItem);
      localStorage.setItem(WORKSPACE_KEYS.STUDIES, JSON.stringify(list));
      return true; // Saved
    }
  }

  public static removeStudy(id: string): void {
    const list = this.getSavedStudies().filter((s) => s.id !== id);
    localStorage.setItem(WORKSPACE_KEYS.STUDIES, JSON.stringify(list));
  }

  private static getInitialSampleStudies(): SavedBibleStudy[] {
    return [
      {
        id: 'sample_study_salvation',
        type: 'topic',
        targetId: 'salvation_by_grace',
        titleBn: 'অনুগ্রহের দ্বারা পরিত্রাণ (Salvation by Grace)',
        subtitleBn: 'রোমীয় ও ইফিষীয় পত্রের আলোকে ঈশ্বরের বিনামূল্যের অনুগ্রহ',
        summaryBn: 'মানুষ নিজের ধার্মিকতা দিয়ে নয়, বরং খ্রীষ্ট যীশুতে বিশ্বাসের মাধ্যমে পরিত্রাণ লাভ করে।',
        categoryBn: 'পরিত্রাণ ও উদ্ধার',
        savedAt: new Date().toISOString(),
      },
      {
        id: 'sample_study_david',
        type: 'character',
        targetId: 'david',
        titleBn: 'রাজা দায়ূদ: ঈশ্বরের হৃদয়ের অনুগত ব্যক্তি',
        subtitleBn: 'রাখাল বালক থেকে ইস্রায়েলের মহান রাজা ও স্তোত্র রচয়িতা',
        summaryBn: 'দায়ূদের জীবনের সবচেয়ে বড় পাঠ হলো নম্রতা এবং পাপের পর প্রকৃত অনুতাপ।',
        categoryBn: 'বাইবেলের চরিত্র',
        savedAt: new Date().toISOString(),
      },
    ];
  }

  // ================= 7. SAVED BOOKS =================
  public static getSavedBooks(): SavedBook[] {
    try {
      const data = localStorage.getItem(WORKSPACE_KEYS.BOOKS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load saved books:', e);
    }
    return this.getInitialSampleBooks();
  }

  public static isBookPinned(bookId: string): boolean {
    const list = this.getSavedBooks();
    return list.some((b) => b.bookId === bookId);
  }

  public static togglePinBook(
    bookId: string,
    bookNameBn: string,
    testament: 'OT' | 'NT',
    totalChapters: number
  ): boolean {
    const list = this.getSavedBooks();
    const existingIndex = list.findIndex((b) => b.bookId === bookId);

    if (existingIndex >= 0) {
      list.splice(existingIndex, 1);
      localStorage.setItem(WORKSPACE_KEYS.BOOKS, JSON.stringify(list));
      return false; // Unpinned
    } else {
      const newBook: SavedBook = {
        bookId,
        bookNameBn,
        testament,
        totalChapters,
        lastReadChapter: 1,
        pinnedAt: new Date().toISOString(),
        favoriteVersesCount: 0,
      };
      list.unshift(newBook);
      localStorage.setItem(WORKSPACE_KEYS.BOOKS, JSON.stringify(list));
      return true; // Pinned
    }
  }

  public static unpinBook(bookId: string): void {
    const list = this.getSavedBooks().filter((b) => b.bookId !== bookId);
    localStorage.setItem(WORKSPACE_KEYS.BOOKS, JSON.stringify(list));
  }

  public static updateBookProgress(bookId: string, chapter: number): void {
    const list = this.getSavedBooks();
    const item = list.find((b) => b.bookId === bookId);
    if (item) {
      item.lastReadChapter = chapter;
      localStorage.setItem(WORKSPACE_KEYS.BOOKS, JSON.stringify(list));
    }
  }

  private static getInitialSampleBooks(): SavedBook[] {
    return [
      {
        bookId: 'JHN',
        bookNameBn: 'যোহন লিখিত সুসমাচার',
        testament: 'NT',
        totalChapters: 21,
        lastReadChapter: 3,
        pinnedAt: new Date().toISOString(),
        favoriteVersesCount: 4,
        personalNote: 'খ্রীষ্টের দেবত্ব ও অনন্ত জীবনের প্রধান পাঠ্যপুস্তক',
      },
      {
        bookId: 'PSA',
        bookNameBn: 'গীতসংহিতা',
        testament: 'OT',
        totalChapters: 150,
        lastReadChapter: 23,
        pinnedAt: new Date().toISOString(),
        favoriteVersesCount: 6,
        personalNote: 'প্রতিদিনের স্তুতি ও ব্যক্তিগত প্রার্থনার বই',
      },
      {
        bookId: 'ROM',
        bookNameBn: 'রোমীয় মণ্ডলীর প্রতি পত্র',
        testament: 'NT',
        totalChapters: 16,
        lastReadChapter: 8,
        pinnedAt: new Date().toISOString(),
        favoriteVersesCount: 5,
        personalNote: 'বিশ্বাসের দ্বারা ধার্মিকতার গভীর ধর্মতাত্ত্বিক শিক্ষা',
      },
    ];
  }

  // ================= 8. RESEARCH PROJECTS =================
  public static getProjects(): ResearchProject[] {
    try {
      const data = localStorage.getItem(WORKSPACE_KEYS.PROJECTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load research projects:', e);
    }
    return this.getInitialSampleProjects();
  }

  public static getProjectById(id: string): ResearchProject | undefined {
    return this.getProjects().find((p) => p.id === id);
  }

  public static createProject(project: {
    titleBn: string;
    descriptionBn: string;
    category: ResearchProject['category'];
    categoryNameBn: string;
    tags?: string[];
  }): ResearchProject {
    const list = this.getProjects();
    const now = new Date().toISOString();
    const newProj: ResearchProject = {
      id: 'proj_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      titleBn: project.titleBn.trim(),
      descriptionBn: project.descriptionBn.trim(),
      category: project.category,
      categoryNameBn: project.categoryNameBn,
      verses: [],
      notes: [],
      tags: project.tags || ['ধর্মতত্ত্ব', 'বাইবেল গবেষণা'],
      createdAt: now,
      updatedAt: now,
    };

    list.unshift(newProj);
    localStorage.setItem(WORKSPACE_KEYS.PROJECTS, JSON.stringify(list));
    return newProj;
  }

  public static updateProject(id: string, updates: Partial<ResearchProject>): ResearchProject | undefined {
    const list = this.getProjects();
    const index = list.findIndex((p) => p.id === id);
    if (index >= 0) {
      list[index] = {
        ...list[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(WORKSPACE_KEYS.PROJECTS, JSON.stringify(list));
      return list[index];
    }
    return undefined;
  }

  public static deleteProject(id: string): void {
    const list = this.getProjects().filter((p) => p.id !== id);
    localStorage.setItem(WORKSPACE_KEYS.PROJECTS, JSON.stringify(list));
  }

  public static addVerseToProject(
    projectId: string,
    verse: {
      bookId: string;
      bookNameBn: string;
      chapter: number;
      verse: number;
      verseText: string;
      reflectionBn?: string;
    }
  ): ResearchProjectVerse | undefined {
    const list = this.getProjects();
    const project = list.find((p) => p.id === projectId);
    if (!project) return undefined;

    const newVerse: ResearchProjectVerse = {
      id: 'pv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
      bookId: verse.bookId,
      bookNameBn: verse.bookNameBn,
      chapter: verse.chapter,
      verse: verse.verse,
      verseText: verse.verseText,
      reflectionBn: verse.reflectionBn,
      addedAt: new Date().toISOString(),
    };

    project.verses.unshift(newVerse);
    project.updatedAt = new Date().toISOString();
    localStorage.setItem(WORKSPACE_KEYS.PROJECTS, JSON.stringify(list));
    return newVerse;
  }

  public static removeVerseFromProject(projectId: string, verseId: string): void {
    const list = this.getProjects();
    const project = list.find((p) => p.id === projectId);
    if (project) {
      project.verses = project.verses.filter((v) => v.id !== verseId);
      project.updatedAt = new Date().toISOString();
      localStorage.setItem(WORKSPACE_KEYS.PROJECTS, JSON.stringify(list));
    }
  }

  public static addNoteToProject(
    projectId: string,
    titleBn: string,
    contentBn: string
  ): ResearchProjectNote | undefined {
    const list = this.getProjects();
    const project = list.find((p) => p.id === projectId);
    if (!project) return undefined;

    const now = new Date().toISOString();
    const newNote: ResearchProjectNote = {
      id: 'pn_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
      titleBn: titleBn.trim() || 'নতুন পর্যবেক্ষণ',
      contentBn: contentBn.trim(),
      createdAt: now,
      updatedAt: now,
    };

    project.notes.unshift(newNote);
    project.updatedAt = now;
    localStorage.setItem(WORKSPACE_KEYS.PROJECTS, JSON.stringify(list));
    return newNote;
  }

  public static removeNoteFromProject(projectId: string, noteId: string): void {
    const list = this.getProjects();
    const project = list.find((p) => p.id === projectId);
    if (project) {
      project.notes = project.notes.filter((n) => n.id !== noteId);
      project.updatedAt = new Date().toISOString();
      localStorage.setItem(WORKSPACE_KEYS.PROJECTS, JSON.stringify(list));
    }
  }

  private static getInitialSampleProjects(): ResearchProject[] {
    const now = new Date().toISOString();
    return [
      {
        id: 'sample_proj_resurrection',
        titleBn: 'খ্রীষ্টের পুনরুত্থানের ঐতিহাসিক ও ধর্মতাত্ত্বিক প্রমাণসমূহ',
        descriptionBn: 'নতুন নিয়মের সুসমাচার এবং পৌলীয় পত্রাবলি থেকে প্রভুর পুনরুত্থানের অকাট্য সাক্ষ্য সংগ্রহ।',
        category: 'theology',
        categoryNameBn: 'মৌলিক ধর্মতত্ত্ব',
        tags: ['পুনরুত্থান', 'যীশু খ্রীষ্ট', 'সুসমাচার', 'বিশ্বাস'],
        createdAt: now,
        updatedAt: now,
        verses: [
          {
            id: 'pv_1',
            bookId: '1CO',
            bookNameBn: '১ করিন্থীয়',
            chapter: 15,
            verse: 3,
            verseText: 'শাস্ত্রানুসারে খ্রীষ্ট আমাদের পাপের জন্য মরলেন এবং শাস্ত্রানুসারে তৃতীয় দিনে পুনরুত্থিত হলেন।',
            reflectionBn: 'প্রারম্ভিক প্রেরিতীয় বিশ্বাসের মূল ভিত্তিস্তম্ভ।',
            addedAt: now,
          },
          {
            id: 'pv_2',
            bookId: 'JHN',
            bookNameBn: 'যোহন',
            chapter: 11,
            verse: 25,
            verseText: 'যীশু তাকে বললেন, "আমিই পুনরুত্থান ও জীবন; যে আমাকে বিশ্বাস করে, সে মরলেও জীবিত থাকবে।"',
            reflectionBn: 'মার্থার কাছে প্রভু যীশুর সরাসরি দাবি।',
            addedAt: now,
          },
        ],
        notes: [
          {
            id: 'pn_1',
            titleBn: 'খালি কবরের ঐতিহাসিক গুরুত্ব',
            contentBn: 'যিরূশালেমে রোমান পাহারা এবং তৎকালীন ধর্মীয় নেতাদের বিরোধিতা সত্ত্বেও যীশুর কবর খালি পাওয়া যায়, যা প্রত্যক্ষদর্শীদের সাক্ষ্যে সুপ্রতিষ্ঠিত।',
            createdAt: now,
            updatedAt: now,
          },
        ],
      },
    ];
  }

  // ================= WORKSPACE OVERALL STATS =================
  public static getWorkspaceStats() {
    return {
      bookmarksCount: StorageService.getBookmarks().length,
      notesCount: StorageService.getNotes().length,
      highlightsCount: StorageService.getHighlights().length,
      historyCount: StorageService.getReadingHistory().length,
      sermonsCount: SermonStorageService.getSavedSermons().length,
      studiesCount: this.getSavedStudies().length,
      booksCount: this.getSavedBooks().length,
      projectsCount: this.getProjects().length,
    };
  }

  // ================= BACKUP & RESTORE =================
  public static exportCompleteWorkspace(): FullWorkspaceBackup {
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      userProfile: AuthService.getCurrentUser(),
      bookmarks: StorageService.getBookmarks(),
      highlights: StorageService.getHighlights(),
      notes: StorageService.getNotes(),
      readingHistory: StorageService.getReadingHistory(),
      sermons: SermonStorageService.getSavedSermons(),
      savedStudies: this.getSavedStudies(),
      savedBooks: this.getSavedBooks(),
      researchProjects: this.getProjects(),
    };
  }

  public static importCompleteWorkspace(data: any): { success: boolean; error?: string } {
    try {
      if (!data || typeof data !== 'object') {
        return { success: false, error: 'অবৈধ ফাইল ফরম্যাট — সঠিক JSON ফাইল আপলোড করুন' };
      }

      if (Array.isArray(data.bookmarks)) {
        localStorage.setItem('bsb_bookmarks_v1', JSON.stringify(data.bookmarks));
      }
      if (Array.isArray(data.highlights)) {
        localStorage.setItem('bsb_highlights_v1', JSON.stringify(data.highlights));
      }
      if (Array.isArray(data.notes)) {
        localStorage.setItem('bsb_personal_notes_v1', JSON.stringify(data.notes));
      }
      if (Array.isArray(data.readingHistory)) {
        localStorage.setItem('bsb_reading_history_v1', JSON.stringify(data.readingHistory));
      }
      if (Array.isArray(data.sermons)) {
        localStorage.setItem('bengali_study_bible_saved_sermons_v1', JSON.stringify(data.sermons));
      }
      if (Array.isArray(data.savedStudies)) {
        localStorage.setItem(WORKSPACE_KEYS.STUDIES, JSON.stringify(data.savedStudies));
      }
      if (Array.isArray(data.savedBooks)) {
        localStorage.setItem(WORKSPACE_KEYS.BOOKS, JSON.stringify(data.savedBooks));
      }
      if (Array.isArray(data.researchProjects)) {
        localStorage.setItem(WORKSPACE_KEYS.PROJECTS, JSON.stringify(data.researchProjects));
      }
      if (data.userProfile && typeof data.userProfile === 'object') {
        AuthService.updateProfile(data.userProfile);
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'ডেটা রিস্টোর করার সময় সমস্যা হয়েছে' };
    }
  }
}
