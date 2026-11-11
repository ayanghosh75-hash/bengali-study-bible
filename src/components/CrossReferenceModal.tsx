import React from 'react';
import { X, GitFork, ArrowRight, BookOpen } from 'lucide-react';
import { CrossReference } from '../types/study';
import { BibleVerse } from '../types/bible';
import { formatVerseRef } from '../utils/bengaliNumerals';

interface CrossReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceVerse: BibleVerse | null;
  bookNameBn: string;
  crossReferences: CrossReference[];
  onNavigateToTarget: (bookId: string, chapter: number, verse: number) => void;
  useBengaliDigits?: boolean;
}

export const CrossReferenceModal: React.FC<CrossReferenceModalProps> = ({
  isOpen,
  onClose,
  sourceVerse,
  bookNameBn,
  crossReferences,
  onNavigateToTarget,
  useBengaliDigits = true,
}) => {
  if (!isOpen || !sourceVerse) return null;

  const sourceRefStr = formatVerseRef(
    bookNameBn,
    sourceVerse.chapter,
    sourceVerse.verse,
    useBengaliDigits
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col max-h-[85vh] overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/50">
          <div className="flex items-center space-x-2">
            <GitFork className="w-5 h-5 text-gold-500" />
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300">
              সমান্তরাল পদ ও ক্রস-রেফারেন্স
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Verse Preview */}
        <div className="px-5 py-3.5 bg-gold-50/50 dark:bg-navy-950/40 border-b border-gold-200/40 dark:border-navy-800">
          <span className="font-serif font-bold text-sm text-gold-700 dark:text-gold-400 block mb-0.5">
            মূল পদ: {sourceRefStr}
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-serif italic line-clamp-2">
            "{sourceVerse.textBn}"
          </p>
        </div>

        {/* Cross References List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {crossReferences.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <BookOpen className="w-10 h-10 mx-auto opacity-30 text-gold-500" />
              <p className="text-sm">এই পদের জন্য সরাসরি সংরক্ষিত ক্রস-রেফারেন্স নেই</p>
              <p className="text-xs text-slate-400 font-sans">
                ফেজ ২ ও ৩-এ সম্পূর্ণ ট্রেজারি অফ স্ক্রিপচার নলেজ (TSK) ডেটাবেস যুক্ত করা হবে।
              </p>
            </div>
          ) : (
            crossReferences.map((cr) => {
              const targetRefStr = formatVerseRef(
                cr.targetBookNameBn,
                cr.targetChapter,
                cr.targetVerse,
                useBengaliDigits
              );
              return (
                <div
                  key={cr.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-800/70 border border-slate-200/80 dark:border-navy-700 shadow-sm space-y-2 hover:border-gold-400/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300">
                      {targetRefStr}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-300 border border-gold-500/20">
                      {cr.relationshipNameBn}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                    {cr.explanationBn}
                  </p>

                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => {
                        onNavigateToTarget(cr.targetBookId, cr.targetChapter, cr.targetVerse);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 hover:border-gold-500 text-xs font-bold text-gold-600 dark:text-gold-400 flex items-center gap-1.5 transition-all shadow-sm group"
                    >
                      <span>পদে যান</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
