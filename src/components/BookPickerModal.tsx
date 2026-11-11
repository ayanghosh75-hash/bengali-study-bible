import React, { useState } from 'react';
import { X, Search, ChevronLeft, Book } from 'lucide-react';
import { BibleBook, Testament } from '../types/bible';
import { BIBLE_BOOKS, OLD_TESTAMENT_BOOKS, NEW_TESTAMENT_BOOKS } from '../data/books';
import { toBengaliDigits } from '../utils/bengaliNumerals';

interface BookPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBookId: string;
  selectedChapter: number;
  onSelect: (bookId: string, chapter: number) => void;
  useBengaliDigits?: boolean;
}

export const BookPickerModal: React.FC<BookPickerModalProps> = ({
  isOpen,
  onClose,
  selectedBookId,
  selectedChapter,
  onSelect,
  useBengaliDigits = true,
}) => {
  const [testamentTab, setTestamentTab] = useState<Testament>('NT');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookForChapters, setActiveBookForChapters] = useState<BibleBook | null>(null);

  if (!isOpen) return null;

  // Filter books
  const currentBooks = testamentTab === 'OT' ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;
  const filteredBooks = searchQuery.trim()
    ? BIBLE_BOOKS.filter((b) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          b.nameBn.toLowerCase().includes(q) ||
          b.nameEn.toLowerCase().includes(q) ||
          b.shortNameBn.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q)
        );
      })
    : currentBooks;

  const handleBookClick = (book: BibleBook) => {
    if (book.chaptersCount === 1) {
      onSelect(book.id, 1);
      onClose();
    } else {
      setActiveBookForChapters(book);
    }
  };

  const handleChapterSelect = (chapterNum: number) => {
    if (activeBookForChapters) {
      onSelect(activeBookForChapters.id, chapterNum);
      setActiveBookForChapters(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 w-full max-w-xl max-h-[85vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/50">
          <div className="flex items-center space-x-2">
            {activeBookForChapters ? (
              <button
                onClick={() => setActiveBookForChapters(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-gold-500 hover:bg-slate-200 dark:hover:bg-navy-800 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>পুস্তক তালিকা</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-gold-500" />
                <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300">
                  বাইবেল পুস্তক নির্বাচন
                </h3>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setActiveBookForChapters(null);
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {activeBookForChapters ? (
          /* Chapter Selection Grid */
          <div className="p-5 overflow-y-auto flex-1">
            <div className="mb-4 pb-3 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-xl font-bold text-navy-900 dark:text-gold-400">
                  {activeBookForChapters.nameBn}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeBookForChapters.nameEn} • {activeBookForChapters.division}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-300 border border-gold-500/20">
                মোট {useBengaliDigits ? toBengaliDigits(activeBookForChapters.chaptersCount) : activeBookForChapters.chaptersCount} অধ্যায়
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
              {Array.from({ length: activeBookForChapters.chaptersCount }, (_, i) => i + 1).map((ch) => {
                const isSelected =
                  activeBookForChapters.id === selectedBookId && ch === selectedChapter;
                return (
                  <button
                    key={ch}
                    onClick={() => handleChapterSelect(ch)}
                    className={`h-11 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center ${
                      isSelected
                        ? 'bg-gradient-to-br from-gold-500 to-gold-600 text-navy-950 font-bold shadow-md shadow-gold-500/30 ring-2 ring-gold-400'
                        : 'bg-slate-100 hover:bg-gold-50 dark:bg-navy-800 hover:dark:bg-navy-700 text-slate-700 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-300 border border-slate-200/60 dark:border-navy-700'
                    }`}
                  >
                    {useBengaliDigits ? toBengaliDigits(ch) : ch}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Book Selection List */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-slate-100 dark:border-navy-800 bg-white dark:bg-navy-900">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="পুস্তক অনুসন্ধান করুন (যেমন: যোহন, আদিপুস্তক, John)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-navy-800 border-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-gold-500/50 outline-none"
                />
              </div>
            </div>

            {/* Old / New Testament Segmented Control (hidden if searching) */}
            {!searchQuery.trim() && (
              <div className="flex border-b border-slate-100 dark:border-navy-800 px-4 pt-2 bg-slate-50/50 dark:bg-navy-950/30">
                <button
                  onClick={() => setTestamentTab('OT')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                    testamentTab === 'OT'
                      ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'
                  }`}
                >
                  পুরাতন নিয়ম (৩৯)
                </button>
                <button
                  onClick={() => setTestamentTab('NT')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                    testamentTab === 'NT'
                      ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'
                  }`}
                >
                  নতুন নিয়ম (২৭)
                </button>
              </div>
            )}

            {/* Books Grid */}
            <div className="p-4 overflow-y-auto flex-1 space-y-1">
              {filteredBooks.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">
                  কোনো পুস্তক খুঁজে পাওয়া যায়নি
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredBooks.map((book) => {
                    const isCurrent = book.id === selectedBookId;
                    return (
                      <button
                        key={book.id}
                        onClick={() => handleBookClick(book)}
                        className={`text-left p-2.5 rounded-xl border transition-all flex flex-col justify-between ${
                          isCurrent
                            ? 'bg-gold-50 dark:bg-gold-500/10 border-gold-400/50 text-gold-700 dark:text-gold-300 font-semibold'
                            : 'bg-white hover:bg-slate-50 dark:bg-navy-800/60 dark:hover:bg-navy-700 border-slate-200/70 dark:border-navy-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-serif text-sm font-bold truncate">
                            {book.nameBn}
                          </span>
                          <span className="text-[10px] text-slate-400 font-sans">
                            {useBengaliDigits ? toBengaliDigits(book.chaptersCount) : book.chaptersCount} অধ্যায়
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 dark:text-slate-400 font-sans truncate mt-0.5">
                          {book.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
