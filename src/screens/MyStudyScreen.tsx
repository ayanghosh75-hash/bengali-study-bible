import React, { useState } from 'react';
import {
  Bookmark,
  FileText,
  Clock,
  Sparkles,
  BookOpen,
  FolderGit2,
  Trash2,
  ArrowRight,
  Plus,
  X,
  User,
  GraduationCap,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { SermonStorageService } from '../services/sermonStorageService';
import { WorkspaceService } from '../services/workspaceService';
import { AuthService } from '../services/authService';
import { Bookmark as BookmarkType, Highlight, PersonalNote, ReadingHistoryItem } from '../types/bible';
import { SavedSermon } from '../types/sermon';
import { SavedBibleStudy, SavedBook, ResearchProject, WorkspaceTab } from '../types/workspace';
import { UserProfile, ROLE_LABELS_BN } from '../types/auth';
import { toBengaliDigits, formatVerseRef } from '../utils/bengaliNumerals';
import { BIBLE_BOOKS } from '../data/books';

interface MyStudyScreenProps {
  onNavigateToVerse: (bookId: string, chapter: number, verse?: number) => void;
  onOpenSermon: (sermon: SavedSermon) => void;
  onCreateSermon: () => void;
  onOpenAccountModal: () => void;
  onOpenAcademy?: () => void;
  useBengaliDigits?: boolean;
}

export const MyStudyScreen: React.FC<MyStudyScreenProps> = ({
  onNavigateToVerse,
  onOpenSermon,
  onCreateSermon,
  onOpenAccountModal,
  onOpenAcademy,
  useBengaliDigits = true,
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('bookmarks');
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => AuthService.getCurrentUser());
  const [, setRefreshKey] = useState(0);

  // Filter
  const [highlightColorFilter, setHighlightColorFilter] = useState<string>('all');

  // Modals inside Workspace
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<ResearchProject['category']>('theology');

  // Data sources
  const bookmarks: BookmarkType[] = StorageService.getBookmarks();
  const notes: PersonalNote[] = StorageService.getNotes();
  const highlights: Highlight[] = StorageService.getHighlights();
  const history: ReadingHistoryItem[] = StorageService.getReadingHistory();
  const sermons: SavedSermon[] = SermonStorageService.getSavedSermons();
  const studies: SavedBibleStudy[] = WorkspaceService.getSavedStudies();
  const books: SavedBook[] = WorkspaceService.getSavedBooks();
  const projects: ResearchProject[] = WorkspaceService.getProjects();

  const handleRefresh = () => {
    setCurrentUser(AuthService.getCurrentUser());
    setRefreshKey((k) => k + 1);
  };

  // Actions
  const handleRemoveBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    StorageService.removeBookmark(id);
    handleRefresh();
  };

  const handleRemoveHighlight = (h: Highlight, e: React.MouseEvent) => {
    e.stopPropagation();
    StorageService.setHighlight(h.bookId, h.bookNameBn, h.chapter, h.verse, null);
    handleRefresh();
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    StorageService.deleteNote(id);
    handleRefresh();
  };

  const handleDeleteSermon = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('আপনি কি এই প্রচার রূপরেখাটি মুছে ফেলতে চান?')) {
      SermonStorageService.deleteSermon(id);
      handleRefresh();
    }
  };

  const handleRemoveStudy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    WorkspaceService.removeStudy(id);
    handleRefresh();
  };

  const handleUnpinBook = (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    WorkspaceService.unpinBook(bookId);
    handleRefresh();
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('আপনি কি এই গবেষণা প্রজেক্টটি মুছে ফেলতে চান?')) {
      WorkspaceService.deleteProject(id);
      handleRefresh();
    }
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;

    WorkspaceService.createProject({
      titleBn: newProjectTitle,
      descriptionBn: newProjectDesc,
      category: newProjectCategory,
      categoryNameBn:
        newProjectCategory === 'theology'
          ? 'ধর্মতত্ত্ব গবেষণা'
          : newProjectCategory === 'sermon_prep'
          ? 'প্রচার প্রস্তুতি'
          : 'ব্যক্তিগত অনুসন্ধান',
    });

    setNewProjectTitle('');
    setNewProjectDesc('');
    setIsAddProjectModalOpen(false);
    handleRefresh();
  };

  const handlePinNewBook = (book: (typeof BIBLE_BOOKS)[0]) => {
    WorkspaceService.togglePinBook(
      book.id,
      book.nameBn,
      book.testament as 'OT' | 'NT',
      book.chaptersCount
    );
    setIsAddBookModalOpen(false);
    handleRefresh();
  };

  // Tabs metadata
  const workspaceTabs: { id: WorkspaceTab; labelBn: string; count: number; icon: React.ElementType }[] = [
    { id: 'bookmarks', labelBn: 'বুকমার্ক', count: bookmarks.length, icon: Bookmark },
    { id: 'notes', labelBn: 'নোট ও টীকা', count: notes.length, icon: FileText },
    { id: 'highlights', labelBn: 'হাইলাইট', count: highlights.length, icon: Sparkles },
    { id: 'history', labelBn: 'পড়ার ইতিহাস', count: history.length, icon: Clock },
    { id: 'sermons', labelBn: 'সার্মনসমূহ', count: sermons.length, icon: Sparkles },
    { id: 'studies', labelBn: 'বাইবেল স্টাডি', count: studies.length, icon: GraduationCap },
    { id: 'books', labelBn: 'সংরক্ষিত পুস্তক', count: books.length, icon: BookOpen },
    { id: 'projects', labelBn: 'রিসার্চ প্রজেক্ট', count: projects.length, icon: FolderGit2 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-28 space-y-6 animate-in fade-in duration-200">
      {/* Hero Header: User Identity & Workspace Vault */}
      <div className="rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-5 sm:p-6 border border-navy-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-gold-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 text-navy-950 font-bold text-xl flex items-center justify-center shadow-lg shadow-gold-500/20 flex-shrink-0">
              {currentUser.displayName.charAt(0) || 'অ'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  আমার স্টাডি
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  {ROLE_LABELS_BN[currentUser.role] || currentUser.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {currentUser.displayName} — ব্যক্তিগত সুরক্ষিত বাইবেল স্টাডি ও পরিচর্যা কেন্দ্র
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAccountModal}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5 text-gold-400" />
              <span>একাউন্ট ও ব্যাকআপ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8 Workspace Tab Selector Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {workspaceTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-2xl font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                isActive
                  ? 'bg-navy-950 text-gold-400 border-navy-950 dark:bg-gold-500/15 dark:border-gold-500/40 shadow-sm'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.labelBn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-gold-500/30 text-gold-300'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-500'
                }`}
              >
                {toBengaliDigits(tab.count)}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= 1. BOOKMARKS TAB ================= */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
              চিহ্নিত বুকমার্কসমূহ ({toBengaliDigits(bookmarks.length)})
            </h3>
          </div>

          {bookmarks.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-3xl border border-dashed border-slate-200 dark:border-navy-800 p-8 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto">
                <Bookmark className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-navy-950 dark:text-white">
                এখনো কোনো পদ বুকমার্ক করা হয়নি
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                বাইবেল পড়ার সময় যেকোনো পদের পাশের বুকমার্ক আইকনে চাপ দিয়ে প্রিয় পদগুলো এখানে সাজিয়ে রাখুন।
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => onNavigateToVerse('JHN', 1, 1)}
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>বাইবেল রিডার খুলুন</span>
                </button>
                {onOpenAcademy && (
                  <button
                    onClick={onOpenAcademy}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-gold-500 text-slate-700 dark:text-slate-300 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-gold-500" />
                    <span>বুকমার্ক নির্দেশিকা দেখুন</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bookmarks.map((b) => (
                <div
                  key={b.id}
                  onClick={() => onNavigateToVerse(b.bookId, b.chapter, b.verse)}
                  className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 transition shadow-xs cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-gold-600 dark:text-gold-400">
                        {formatVerseRef(b.bookNameBn, b.chapter, b.verse, useBengaliDigits)}
                      </span>
                      <button
                        onClick={(e) => handleRemoveBookmark(b.id, e)}
                        title="মুছে ফেলুন"
                        className="p-1 rounded-lg text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-serif text-sm text-slate-800 dark:text-slate-200 line-clamp-2">
                      "{b.verseText}"
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[10px]">
                      {new Date(b.createdAt).toLocaleDateString('bn-BD')}
                    </span>
                    <span className="text-gold-600 dark:text-gold-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>অধ্যায়ে যান</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 2. NOTES TAB ================= */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
              ব্যক্তিগত স্টাডি নোট ({toBengaliDigits(notes.length)})
            </h3>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-3xl border border-dashed border-slate-200 dark:border-navy-800 p-8 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-navy-950 dark:text-white">
                এখনো কোনো ব্যক্তিগত স্টাডি নোট নেই
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                বাইবেল পাঠের সময় কোনো পদ নির্বাচন করে আপনার ব্যক্তিগত অনুধ্যান, প্রতিফলন বা প্রার্থনা নোটে লিখে রাখুন।
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => onNavigateToVerse('JHN', 1, 1)}
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>বাইবেল পড়তে যান</span>
                </button>
                {onOpenAcademy && (
                  <button
                    onClick={onOpenAcademy}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-gold-500 text-slate-700 dark:text-slate-300 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-gold-500" />
                    <span>নোট লেখার টিউটোরিয়াল দেখুন</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => onNavigateToVerse(n.bookId, n.chapter, n.verse)}
                      className="font-serif font-bold text-sm text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1.5"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{formatVerseRef(n.bookNameBn, n.chapter, n.verse, useBengaliDigits)}</span>
                    </button>
                    <button
                      onClick={(e) => handleDeleteNote(n.id, e)}
                      title="নোট মুছুন"
                      className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {n.title && (
                    <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                      {n.title}
                    </h4>
                  )}

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {n.content}
                  </p>

                  <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-navy-800">
                    আপডেট: {new Date(n.updatedAt).toLocaleString('bn-BD')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 3. HIGHLIGHTS TAB ================= */}
      {activeTab === 'highlights' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
              চিহ্নিত পদসমূহ ({toBengaliDigits(highlights.length)})
            </h3>
            <div className="flex gap-1.5 text-xs">
              {['all', 'gold', 'green', 'blue', 'rose'].map((c) => (
                <button
                  key={c}
                  onClick={() => setHighlightColorFilter(c)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold capitalize transition ${
                    highlightColorFilter === c
                      ? 'bg-navy-950 dark:bg-white text-white dark:text-navy-950 font-bold'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {c === 'all'
                    ? 'সব'
                    : c === 'gold'
                    ? '🟡 প্রতিজ্ঞা'
                    : c === 'green'
                    ? '🟢 আজ্ঞা'
                    : c === 'blue'
                    ? '🔵 প্রার্থনা'
                    : '🔴 গভীর সত্য'}
                </button>
              ))}
            </div>
          </div>

          {highlights.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 p-6 space-y-2">
              <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                এখনো কোনো পদ হাইলাইট করা হয়নি।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights
                .filter((h) => highlightColorFilter === 'all' || h.color === highlightColorFilter)
                .map((h) => (
                  <div
                    key={h.id}
                    onClick={() => onNavigateToVerse(h.bookId, h.chapter, h.verse)}
                    className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-400 transition shadow-xs cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${
                          h.color === 'gold'
                            ? 'bg-amber-400'
                            : h.color === 'green'
                            ? 'bg-emerald-400'
                            : h.color === 'blue'
                            ? 'bg-sky-400'
                            : 'bg-rose-400'
                        }`}
                      />
                      <div>
                        <span className="font-serif font-bold text-sm text-navy-950 dark:text-white block">
                          {formatVerseRef(h.bookNameBn, h.chapter, h.verse, useBengaliDigits)}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(h.createdAt).toLocaleDateString('bn-BD')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleRemoveHighlight(h, e)}
                        title="রং মুছুন"
                        className="p-1 rounded-lg text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 4. READING HISTORY TAB ================= */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
              পড়ার ইতিহাস ও সাম্প্রতিক অধ্যায় ({toBengaliDigits(history.length)})
            </h3>
            {history.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('আপনি কি সমস্ত ইতিহাস মুছে ফেলতে চান?')) {
                    StorageService.clearReadingHistory();
                    handleRefresh();
                  }
                }}
                className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline"
              >
                ইতিহাস মুছুন
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 p-6 space-y-2">
              <Clock className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                কোনো সাম্প্রতিক পঠন পাওয়া যায়নি।
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((h) => (
                <div
                  key={h.id}
                  onClick={() => onNavigateToVerse(h.bookId, h.chapter, h.verse)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-400 transition shadow-xs cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800 text-gold-500">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-sm text-navy-950 dark:text-white block">
                        {h.bookNameBn} {toBengaliDigits(h.chapter)} অধ্যায়
                      </span>
                      <span className="text-[10px] text-slate-400">
                        সর্বশেষ পঠিত: {new Date(h.lastReadAt).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-gold-600 dark:text-gold-400 flex items-center gap-1">
                    <span>পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 5. SERMONS TAB ================= */}
      {activeTab === 'sermons' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
              সংরক্ষিত সার্মন ও প্রচার রূপরেখা ({toBengaliDigits(sermons.length)})
            </h3>
            <button
              onClick={onCreateSermon}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-bold text-xs shadow-md shadow-gold-500/20 hover:brightness-105 transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>নতুন সার্মন তৈরি</span>
            </button>
          </div>

          {sermons.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 p-6 space-y-2">
              <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                এখনো কোনো প্রচার রূপরেখা সংরক্ষিত নেই।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sermons.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onOpenSermon(s)}
                  className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 transition shadow-sm cursor-pointer group flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400 border border-gold-500/30">
                        {s.passage}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span>{s.durationMinutes} মিনিট</span>
                        <span>•</span>
                        <span>{s.audienceLabelBn}</span>
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-base text-navy-950 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition">
                      {s.title}
                    </h4>

                    {s.content.bigIdeaBn && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                        "{s.content.bigIdeaBn}"
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">
                      {new Date(s.updatedAt).toLocaleDateString('bn-BD')}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleDeleteSermon(s.id, e)}
                        title="মুছুন"
                        className="p-1 rounded-lg text-slate-300 hover:text-rose-500 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-gold-600 dark:text-gold-400 flex items-center gap-1">
                        <span>খুলুন</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 6. BIBLE STUDIES TAB ================= */}
      {activeTab === 'studies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
              সংরক্ষিত বিষয় ও চরিত্র স্টাডি ({toBengaliDigits(studies.length)})
            </h3>
          </div>

          {studies.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-800 p-6 space-y-2">
              <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                কোনো বিষয় বা চরিত্র স্টাডি সংরক্ষিত নেই।
              </p>
              <p className="text-xs text-slate-400">
                “অধ্যয়ন” ট্যাব থেকে যেকোনো ধর্মতাত্ত্বিক বিষয় বা চরিত্রের পাশে সংরক্ষণ আইকনে চাপ দিন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {studies.map((st) => (
                <div
                  key={st.id}
                  className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-xs flex flex-col justify-between space-y-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {st.categoryBn || (st.type === 'character' ? 'চরিত্র অধ্যয়ন' : 'বিষয় স্টাডি')}
                      </span>
                      <button
                        onClick={(e) => handleRemoveStudy(st.id, e)}
                        className="text-slate-300 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-white">
                      {st.titleBn}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{st.subtitleBn}</p>
                    {st.summaryBn && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic pt-1 line-clamp-2">
                        "{st.summaryBn}"
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-navy-800 text-[10px] text-slate-400">
                    সংরক্ষিত: {new Date(st.savedAt).toLocaleDateString('bn-BD')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 7. SAVED BOOKS TAB ================= */}
      {activeTab === 'books' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
              সংরক্ষিত ও প্রিয় পুস্তকসমূহ ({toBengaliDigits(books.length)})
            </h3>
            <button
              onClick={() => setIsAddBookModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>বই যুক্ত করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {books.map((b) => (
              <div
                key={b.bookId}
                onClick={() => onNavigateToVerse(b.bookId, b.lastReadChapter || 1)}
                className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-400 transition shadow-xs cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {b.testament === 'OT' ? 'পুরাতন নিয়ম' : 'নতুন নিয়ম'}
                    </span>
                    <button
                      onClick={(e) => handleUnpinBook(b.bookId, e)}
                      title="সরিয়ে ফেলুন"
                      className="text-slate-300 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-serif font-bold text-base text-navy-950 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition">
                    {b.bookNameBn}
                  </h4>

                  {b.personalNote && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2">
                      {b.personalNote}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    {toBengaliDigits(b.totalChapters)} অধ্যায়
                  </span>
                  <span className="font-bold text-gold-600 dark:text-gold-400 flex items-center gap-1">
                    <span>পড়ুন</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Book Selector Modal */}
          {isAddBookModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
              <div className="bg-white dark:bg-navy-900 w-full max-w-md rounded-3xl p-5 border border-slate-200 dark:border-navy-700 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-3">
                  <h4 className="font-serif font-bold text-base text-navy-950 dark:text-white">
                    সংরক্ষিত তালিকায় বই পিন করুন
                  </h4>
                  <button onClick={() => setIsAddBookModalOpen(false)}>
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="overflow-y-auto flex-1 space-y-1 pr-1">
                  {BIBLE_BOOKS.map((bk) => {
                    const isPinned = books.some((b) => b.bookId === bk.id);
                    return (
                      <div
                        key={bk.id}
                        onClick={() => handlePinNewBook(bk)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          isPinned
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-50 dark:bg-navy-950 border-slate-200/60 dark:border-navy-800 hover:border-gold-400'
                        }`}
                      >
                        <span className="font-serif font-bold text-xs text-navy-950 dark:text-white">
                          {bk.nameBn}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {isPinned ? 'পিন করা আছে ✓' : '+ পিন করুন'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 8. RESEARCH PROJECTS TAB ================= */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
              থিয়োলজিক্যাল রিসার্চ প্রজেক্ট ({toBengaliDigits(projects.length)})
            </h3>
            <button
              onClick={() => setIsAddProjectModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>নতুন প্রজেক্ট তৈরি</span>
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        {proj.categoryNameBn}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(proj.updatedAt).toLocaleDateString('bn-BD')}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-lg text-navy-950 dark:text-white">
                      {proj.titleBn}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {proj.descriptionBn}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDeleteProject(proj.id, e)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Attached Verses Section */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-navy-800">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                    সংগৃহীত শাস্ত্রাংশ ({toBengaliDigits(proj.verses.length)}টি পদ):
                  </span>
                  {proj.verses.map((v) => (
                    <div
                      key={v.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-850 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <span
                          onClick={() => onNavigateToVerse(v.bookId, v.chapter, v.verse)}
                          className="font-serif font-bold text-gold-600 dark:text-gold-400 hover:underline cursor-pointer"
                        >
                          {v.bookNameBn} {toBengaliDigits(v.chapter)}:{toBengaliDigits(v.verse)}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 italic mt-0.5">
                          "{v.verseText}"
                        </p>
                        {v.reflectionBn && (
                          <p className="text-[11px] text-slate-500 mt-1 font-sans">
                            📝 {v.reflectionBn}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          WorkspaceService.removeVerseFromProject(proj.id, v.id);
                          handleRefresh();
                        }}
                        className="text-slate-300 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Research Observations / Notes */}
                {proj.notes.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                      গবেষণা পর্যবেক্ষণ ও ধর্মতাত্ত্বিক নোট:
                    </span>
                    {proj.notes.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl bg-amber-50/50 dark:bg-navy-850 border border-amber-200/50 dark:border-navy-800 text-xs space-y-1"
                      >
                        <span className="font-bold text-navy-950 dark:text-white block">
                          {n.titleBn}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                          {n.contentBn}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Project Modal */}
          {isAddProjectModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
              <div className="bg-white dark:bg-navy-900 w-full max-w-md rounded-3xl p-5 border border-slate-200 dark:border-navy-700 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-3">
                  <h4 className="font-serif font-bold text-base text-navy-950 dark:text-white">
                    নতুন গবেষণা প্রজেক্ট খুলুন
                  </h4>
                  <button onClick={() => setIsAddProjectModalOpen(false)}>
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleCreateProjectSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      প্রজেক্টের শিরোনাম
                    </label>
                    <input
                      type="text"
                      value={newProjectTitle}
                      onChange={(e) => setNewProjectTitle(e.target.value)}
                      placeholder="যেমন: খ্রীষ্টের পুনরুত্থানের প্রমাণসমূহ"
                      required
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      বিবরণ ও মূল লক্ষ্য
                    </label>
                    <textarea
                      value={newProjectDesc}
                      onChange={(e) => setNewProjectDesc(e.target.value)}
                      placeholder="এই গবেষণার মূল প্রতিপাদ্য কী?"
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      বিভাগ
                    </label>
                    <select
                      value={newProjectCategory}
                      onChange={(e) =>
                        setNewProjectCategory(e.target.value as ResearchProject['category'])
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:outline-none"
                    >
                      <option value="theology">মৌলিক ধর্মতত্ত্ব</option>
                      <option value="sermon_prep">প্রচার প্রস্তুতি</option>
                      <option value="church_teaching">মণ্ডলী শিক্ষা ও ক্লাস</option>
                      <option value="personal">ব্যক্তিগত আত্মিক অন্বেষণ</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-md transition"
                  >
                    প্রজেক্ট তৈরি করুন
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
