import React, { useState } from 'react';
import { X, Search as SearchIcon, ArrowRight, Sparkles, Layers, Minimize2 } from 'lucide-react';
import { BibleService } from '../services/bibleService';
import { SearchResult } from '../types/bible';
import { formatVerseRef } from '../utils/bengaliNumerals';
import { ResearchDashboard } from './research/ResearchDashboard';
import { AnalyticsService } from '../services/analyticsService';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (bookId: string, chapter: number, verse: number) => void;
  useBengaliDigits?: boolean;
  initialMode?: 'quick' | 'research';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  useBengaliDigits = true,
  initialMode = 'quick',
}) => {
  const [mode, setMode] = useState<'quick' | 'research'>(initialMode);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (searchTerm: string) => {
    setQuery(searchTerm);
    if (!searchTerm.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    const syncRes = BibleService.searchVerses(searchTerm);
    setResults(syncRes);
    setHasSearched(true);
    let finalCount = syncRes.length;

    try {
      const asyncRes = await BibleService.searchVersesAsync(searchTerm);
      if (asyncRes && asyncRes.length > 0) {
        setResults(asyncRes);
        finalCount = asyncRes.length;
      }
    } catch {
      // Keep synchronous results on any fetch issue
    }

    AnalyticsService.trackSearch(searchTerm, finalCount);
  };

  const handleSelect = (item: SearchResult) => {
    AnalyticsService.trackSearchToBibleOpen(query, item.bookId, item.chapter, item.verse);
    onSelectResult(item.bookId, item.chapter, item.verse);
    onClose();
  };

  const quickSuggestions = [
    'পরিত্রাণ',
    'যোহন ৩:১৬',
    'ঈশ্বরের প্রেম',
    'বিশ্বাস',
    'অনুগ্রহ',
    'শান্তি',
    'গীতসংহিতা ২৩',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div
        className={`bg-white dark:bg-navy-900 w-full rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100 transition-all duration-300 mt-2 sm:mt-6 ${
          mode === 'research' ? 'max-w-4xl max-h-[94vh]' : 'max-w-xl max-h-[85vh]'
        }`}
      >
        {/* Header & Mode Switcher */}
        <div className="p-4 border-b border-slate-100 dark:border-navy-800 bg-slate-50/70 dark:bg-navy-950/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-500">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-navy-950 dark:text-gold-300 text-base">
                  {mode === 'research' ? 'বাইবেল রিসার্চ ইঞ্জিন (Research Desk)' : 'বাইবেল অনুসন্ধান (Search Scripture)'}
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  {mode === 'research'
                    ? '৮-মাত্রিক সমন্বিত গবেষণা ড্যাশবোর্ড ও স্ট্রংস কঙ্কর্ডেন্স'
                    : 'পদ ও শাস্ত্রাংশ দ্রুত অন্বেষণ'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Mode Toggle Button */}
              <button
                onClick={() => setMode(mode === 'quick' ? 'research' : 'quick')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  mode === 'research'
                    ? 'bg-gold-500 text-navy-950 border-gold-400 shadow-sm'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-navy-700 hover:bg-gold-500/20'
                }`}
                title={mode === 'research' ? 'দ্রুত পদে ফিরে যান' : 'পূর্ণাঙ্গ গবেষণা ড্যাশবোর্ড খুলুন'}
              >
                {mode === 'research' ? <Minimize2 className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                <span>{mode === 'research' ? 'দ্রুত পদ খুঁজুন' : 'গবেষণা ড্যাশবোর্ড'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {mode === 'quick' && (
            <>
              <div className="relative flex items-center">
                <SearchIcon className="w-5 h-5 absolute left-3.5 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="পদ বা বিষয় লিখুন (যেমন: পরিত্রাণ, প্রেম, যোহন ৩:১৬, ঈশ্বর)..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      // If it's a topical query like 'পরিত্রাণ', auto-switch to research mode
                      if (!query.match(/\d/)) {
                        setMode('research');
                      }
                    }
                  }}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-gold-500/50 outline-none text-sm font-medium"
                />
                {query && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Suggestions */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
                <span className="text-[11px] text-slate-400 whitespace-nowrap">দ্রুত পরামর্শ:</span>
                {quickSuggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSearch(sug)}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-200/70 hover:bg-gold-500/20 text-slate-700 dark:bg-navy-800 dark:text-slate-300 dark:hover:text-gold-300 transition-colors whitespace-nowrap"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Research Desk Switch Banner if searching a topic */}
              {query.trim() && (
                <div className="mt-1 p-2 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-between gap-2 text-xs">
                  <span className="text-gold-900 dark:text-gold-300 font-medium">
                    "{query}" সম্পর্কে গভীর গবেষণা করতে চান?
                  </span>
                  <button
                    onClick={() => setMode('research')}
                    className="px-2.5 py-1 rounded-lg bg-gold-500 text-navy-950 font-bold text-[11px] shadow-sm hover:brightness-105 flex items-center gap-1"
                  >
                    <span>গবেষণা ড্যাশবোর্ড খুলুন</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Body */}
        {mode === 'quick' ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {!hasSearched && (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <SearchIcon className="w-10 h-10 mx-auto opacity-30 text-gold-500" />
                <p className="text-sm font-medium">যেকোনো বাংলা শব্দ, বাক্য বা পদের নাম দিয়ে খুঁজুন</p>
                <p className="text-xs text-slate-400">উদাহরণ: "পরিত্রাণ", "যোহন ৩:১৬", "সদাপ্রভু আমার পালক", "প্রেম"</p>
              </div>
            )}

            {hasSearched && results.length === 0 && (
              <div className="text-center py-12 text-slate-400 space-y-3">
                <p className="text-sm font-medium">সরাসরি কোনো পদ খুঁজে পাওয়া যায়নি</p>
                <p className="text-xs text-slate-400">বানান সঠিক আছে কি না পরীক্ষা করুন অথবা গবেষণা ড্যাশবোর্ডে অন্বেষণ করুন</p>
                <button
                  onClick={() => setMode('research')}
                  className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs"
                >
                  গবেষণা ড্যাশবোর্ডে "{query}" অনুসন্ধান করুন
                </button>
              </div>
            )}

            {results.map((item, idx) => {
              const refStr = formatVerseRef(item.bookNameBn, item.chapter, item.verse, useBengaliDigits);
              return (
                <button
                  key={`${item.bookId}_${item.chapter}_${item.verse}_${idx}`}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200/80 dark:border-navy-700 hover:border-gold-400/60 bg-white hover:bg-gold-50/40 dark:bg-navy-800/60 dark:hover:bg-navy-700/60 transition-all group flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-serif font-bold text-xs sm:text-sm text-gold-700 dark:text-gold-400">
                        {refStr}
                      </span>
                      <span className="text-[10px] text-slate-400 font-sans">
                        ({item.bookNameEn})
                      </span>
                    </div>
                    <p className="font-serif text-sm text-slate-700 dark:text-slate-200 line-clamp-2 leading-relaxed">
                      {item.textBn}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <ResearchDashboard
              initialQuery={query || 'পরিত্রাণ'}
              onNavigateToVerse={(bookId, chapter, verse) => {
                onSelectResult(bookId, chapter, verse || 1);
                onClose();
              }}
              useBengaliDigits={useBengaliDigits}
            />
          </div>
        )}
      </div>
    </div>
  );
};
