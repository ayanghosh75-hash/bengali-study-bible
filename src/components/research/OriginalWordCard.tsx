import React from 'react';
import { BookOpen, Hash, Layers } from 'lucide-react';
import { OriginalWordStudy } from '../../types/researchEngine';

interface OriginalWordCardProps {
  word: OriginalWordStudy;
}

export const OriginalWordCard: React.FC<OriginalWordCardProps> = ({ word }) => {
  const isHebrew = word.language === 'Hebrew';

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 shadow-sm hover:shadow-md transition-all space-y-4">
      {/* Header: Original Lemma, Pronunciation & Strong's */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-navy-800 pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                isHebrew
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
              }`}
            >
              {word.language}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Hash className="w-3.5 h-3.5 text-gold-500" />
              {word.strongNumber}
            </span>
          </div>

          {/* Original Script */}
          <div className="flex items-baseline gap-3">
            <span
              dir={isHebrew ? 'rtl' : 'ltr'}
              className={`font-serif text-3xl font-bold tracking-normal ${
                isHebrew ? 'text-amber-700 dark:text-amber-400' : 'text-sky-700 dark:text-sky-400'
              }`}
            >
              {word.originalLemma}
            </span>
            <span className="text-sm italic font-sans text-slate-500 dark:text-slate-400">
              ({word.transliteration})
            </span>
          </div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
            বাংলা উচ্চারণ: <span className="font-semibold text-navy-950 dark:text-gold-300">{word.pronunciationBn}</span> • {word.partOfSpeechBn}
          </p>
        </div>

        {/* Total Occurrences Badge */}
        <div className="text-right flex-shrink-0">
          <div className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-gold-500" />
            <span>{word.usageCount.total} বার উল্লিখিত</span>
          </div>
        </div>
      </div>

      {/* Root & Etymology */}
      <div className="bg-slate-50/70 dark:bg-navy-950/50 p-3 rounded-xl border border-slate-100 dark:border-navy-800/80 text-xs space-y-1">
        <div className="text-slate-500 dark:text-slate-400">
          মূল ধাতু (Root): <strong className="font-serif text-slate-800 dark:text-slate-200">{word.rootWord}</strong>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          ধাতুগত অর্থ: {word.rootMeaningBn}
        </p>
      </div>

      {/* Meaning in Bengali */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          বাইবেলীয় অর্থ (Biblical Definition)
        </h4>
        <p className="font-serif text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
          {word.meaningBn}
        </p>
      </div>

      {/* Semantic Range Nuances */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          অর্থের বৈচিত্র্য ও ব্যবহারিক ক্ষেত্র (Semantic Range)
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {word.semanticRange.map((nuance, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-navy-800 text-gold-900 dark:text-gold-300 border border-gold-200 dark:border-navy-700 leading-tight"
            >
              • {nuance}
            </span>
          ))}
        </div>
      </div>

      {/* First Occurrence & Key Verses */}
      <div className="pt-2 border-t border-slate-100 dark:border-navy-800 space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              প্রথম উল্লেখ: {word.firstOccurrence.referenceBn}
            </span>
            <p className="font-serif text-slate-600 dark:text-slate-400 italic mt-0.5">
              "{word.firstOccurrence.textBn}"
            </p>
          </div>
        </div>

        {/* Word Family */}
        {word.wordFamily && word.wordFamily.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              শব্দ পরিবার (Word Family):
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {word.wordFamily.map((fam, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-[11px]"
                >
                  <strong className="font-serif">{fam.term}</strong> — {fam.meaningBn}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
