import { Bookmark, Highlight, PersonalNote, ReadingHistoryItem } from './bible';
import { SavedSermon } from './sermon';
import { UserProfile } from './auth';

export type WorkspaceTab =
  | 'bookmarks'
  | 'notes'
  | 'highlights'
  | 'history'
  | 'sermons'
  | 'studies'
  | 'books'
  | 'projects';

export interface SavedBibleStudy {
  id: string;
  type: 'topic' | 'character' | 'custom';
  targetId: string; // topicId or characterId
  titleBn: string;
  subtitleBn: string;
  summaryBn?: string;
  categoryBn?: string;
  savedAt: string;
  personalNotes?: string;
}

export interface SavedBook {
  bookId: string;
  bookNameBn: string;
  testament: 'OT' | 'NT';
  totalChapters: number;
  lastReadChapter: number;
  pinnedAt: string;
  favoriteVersesCount: number;
  personalNote?: string;
}

export interface ResearchProjectVerse {
  id: string;
  bookId: string;
  bookNameBn: string;
  chapter: number;
  verse: number;
  verseText: string;
  reflectionBn?: string;
  addedAt: string;
}

export interface ResearchProjectNote {
  id: string;
  titleBn: string;
  contentBn: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory = 'theology' | 'sermon_prep' | 'church_teaching' | 'personal';

export interface ResearchProject {
  id: string;
  titleBn: string;
  descriptionBn: string;
  category: ProjectCategory;
  categoryNameBn: string;
  verses: ResearchProjectVerse[];
  notes: ResearchProjectNote[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FullWorkspaceBackup {
  version: string;
  exportedAt: string;
  userProfile: UserProfile;
  bookmarks: Bookmark[];
  highlights: Highlight[];
  notes: PersonalNote[];
  readingHistory: ReadingHistoryItem[];
  sermons: SavedSermon[];
  savedStudies: SavedBibleStudy[];
  savedBooks: SavedBook[];
  researchProjects: ResearchProject[];
}
