import React, { useState } from 'react';
import { Bookmark, FileText, Clock, Trash2, ArrowRight, Download, Sparkles } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Bookmark as BookmarkType, Highlight, PersonalNote, ReadingHistoryItem } from '../types/bible';
import { toBengaliDigits, formatVerseRef } from '../utils/bengaliNumerals';

interface LibraryScreenProps {
  onNavigateToVerse: (bookId: string, chapter: number, verse?: number) => void;
  useBengaliDigits?: boolean;
}

type LibraryTab = 'bookmarks' | 'highlights' | 'notes' | 'history';

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  onNavigateToVerse,
  useBengaliDigits = true,
}) => {
  const [activeTab, setActiveTab] = useState<LibraryTab>('bookmarks');
  const [, setRefreshKey] = useState(0);

  const bookmarks: BookmarkType[] = StorageService.getBookmarks();
  const highlights: Highlight[] = StorageService.getHighlights();
  const notes: PersonalNote[] = StorageService.getNotes();
  const history: ReadingHistoryItem[] = StorageService.getReadingHistory();

  const handleRemoveBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    StorageService.removeBookmark(id);
    setRefreshKey((k) => k + 1);
  };

  const handleRemoveHighlight = (h: Highlight, e: React.MouseEvent) => {
    e.stopPropagation();
    StorageService.setHighlight(h.bookId, h.bookNameBn, h.chapter, h.verse, null);
    setRefreshKey((k) => k + 1);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    StorageService.deleteNote(id);
    setRefreshKey((k) => k + 1);
  };

  const handleClearHistory = () => {
    if (confirm('আপনি কি পড়ার সমস্ত ইতিহাস মুছে ফেলতে চান?')) {
      StorageService.clearReadingHistory();
      setRefreshKey((k) => k + 1);
    }
  };

  const handleExportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bengali_bible_study_notes_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getHighlightColorBadge = (color: string) => {
    switch (color) {
      case 'gold':
        return 'bg-amber-400 text-amber-950';
      case 'green':
        return 'bg-emerald-400 text-emerald-950';
      case 'blue':
        return 'bg-sky-400 text-sky-950';
      case 'rose':
        return 'bg-rose-400 text-rose-950';
      default:
        return 'bg-slate-300 text-slate-900';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28 space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-950 dark:text-gold-300">
            ব্যক্তিগত লাইব্রেরি ও সংগ্রহশালা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            আপনার চিহ্নিত বুকমার্ক, হাইলাইট, নোট এবং অধ্যয়নের অগ্রগতি
          </p>
        </div>

        {activeTab === 'notes' && notes.length > 0 && (
          <button
            onClick={handleExportNotes}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-gold-600 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>নোট ডাউনলোড (Export)</span>
          </button>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 dark:border-navy-800 overflow-x-auto no-scrollbar">
        {[
          { id: 'bookmarks' as LibraryTab, label: 'বুকমার্কসমূহ', count: bookmarks.length, icon: Bookmark },
          { id: 'highlights' as LibraryTab, label: 'হাইলাইটসমূহ', count: highlights.length, icon: Sparkles },
          { id: 'notes' as LibraryTab, label: 'ব্যক্তিগত নোট', count: notes.length, icon: FileText },
          { id: 'history' as LibraryTab, label: 'পড়ার ইতিহাস', count: history.length, icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
                {useBengaliDigits ? toBengaliDigits(tab.count) : tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Bookmark className="w-12 h-12 mx-auto opacity-30 text-gold-500" />
              <p className="text-sm">এখনো কোনো পদ বুকমার্ক করা হয়নি</p>
              <p className="text-xs">বাইবেল পাঠের সময় যেকোনো পদে ট্যাপ করে বুকমার্ক করুন</p>
            </div>
          ) : (
            <div className="grid gap-2.5">
              {bookmarks.map((bm) => {
                const refStr = formatVerseRef(bm.bookNameBn, bm.chapter, bm.verse, useBengaliDigits);
                return (
                  <div
                    key={bm.id}
                    onClick={() => onNavigateToVerse(bm.bookId, bm.chapter, bm.verse)}
                    className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 hover:border-gold-400/50 transition-all cursor-pointer flex items-start justify-between gap-3 shadow-sm group"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-serif font-bold text-sm text-gold-700 dark:text-gold-400 block mb-1">
                        {refStr}
                      </span>
                      <p className="font-serif text-xs sm:text-sm text-slate-700 dark:text-slate-200 line-clamp-2 italic">
                        "{bm.verseText}"
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleRemoveBookmark(bm.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                      title="বুকমার্ক সরান"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Highlights */}
      {activeTab === 'highlights' && (
        <div className="space-y-3">
          {highlights.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Sparkles className="w-12 h-12 mx-auto opacity-30 text-gold-500" />
              <p className="text-sm">এখনো কোনো পদ হাইলাইট করা হয়নি</p>
              <p className="text-xs">বাইবেল পড়ার সময় আপনার পছন্দের পদে ট্যাপ করে বিভিন্ন রঙে হাইলাইট করুন</p>
            </div>
          ) : (
            <div className="grid gap-2.5">
              {highlights.map((hl) => {
                const refStr = formatVerseRef(hl.bookNameBn, hl.chapter, hl.verse, useBengaliDigits);
                return (
                  <div
                    key={hl.id}
                    onClick={() => onNavigateToVerse(hl.bookId, hl.chapter, hl.verse)}
                    className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 hover:border-gold-400/50 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-sm group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-3.5 h-3.5 rounded-full ${getHighlightColorBadge(hl.color)} flex-shrink-0 shadow-sm`} />
                      <span className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100 group-hover:text-gold-600 transition-colors">
                        {refStr}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleRemoveHighlight(hl, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                        title="হাইলাইট সরান"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Personal Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-3">
          {notes.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <FileText className="w-12 h-12 mx-auto opacity-30 text-blue-500" />
              <p className="text-sm">এখনো কোনো ব্যক্তিগত স্টাডি নোট যোগ করা হয়নি</p>
              <p className="text-xs">বাইবেলের পদ নির্বাচন করে আপনার ব্যক্তিগত অনুধ্যান নোট আকারে সংরক্ষণ করুন</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {notes.map((note) => {
                const refStr = formatVerseRef(note.bookNameBn, note.chapter, note.verse, useBengaliDigits);
                return (
                  <div
                    key={note.id}
                    onClick={() => onNavigateToVerse(note.bookId, note.chapter, note.verse)}
                    className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 hover:border-gold-400/50 transition-all cursor-pointer shadow-sm space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs sm:text-sm text-gold-700 dark:text-gold-400">
                        {refStr}
                      </span>
                      <button
                        onClick={(e) => handleDeleteNote(note.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                        title="নোট মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {note.title && (
                      <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100">
                        {note.title}
                      </h4>
                    )}

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-navy-950/60 p-3 rounded-xl border border-slate-100 dark:border-navy-800">
                      {note.content}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-sans">
                      <span className="truncate max-w-[200px]">"{note.verseText}"</span>
                      <span className="text-gold-600 dark:text-gold-400 group-hover:underline flex items-center gap-0.5">
                        পদে যান <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Reading History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-sans">
              সর্বশেষ পঠিত অধ্যায়সমূহ ({useBengaliDigits ? toBengaliDigits(history.length) : history.length})
            </span>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-rose-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ইতিহাস মুছুন</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Clock className="w-12 h-12 mx-auto opacity-30 text-gold-500" />
              <p className="text-sm">কোনো পড়ার ইতিহাস এখনো নেই</p>
            </div>
          ) : (
            <div className="grid gap-2">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigateToVerse(item.bookId, item.chapter, item.verse)}
                  className="w-full text-left p-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 hover:border-gold-400/50 transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gold-500" />
                    <div>
                      <span className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100 group-hover:text-gold-600 transition-colors">
                        {item.bookNameBn} {useBengaliDigits ? toBengaliDigits(item.chapter) : item.chapter} অধ্যায়
                      </span>
                      <span className="block text-[11px] text-slate-400 font-sans">
                        {new Date(item.lastReadAt).toLocaleDateString('bn-BD', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

