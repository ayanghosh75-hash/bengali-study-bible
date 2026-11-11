import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { RightsService } from '../services/rightsService';
import { SourceAttribution } from '../components/rights/SourceAttribution';

export const SourcesDirectoryScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const sources = RightsService.getSources();

  const filteredSources = sources.filter((s) => {
    const matchesQuery =
      s.titleBn.toLowerCase().includes(search.toLowerCase()) ||
      s.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      (s.authorBn && s.authorBn.toLowerCase().includes(search.toLowerCase())) ||
      (s.publisherBn && s.publisherBn.toLowerCase().includes(search.toLowerCase()));

    if (!matchesQuery) return false;

    if (selectedType === 'all') return true;
    if (selectedType === 'bible') return s.sourceType.includes('Bible');
    if (selectedType === 'commentary') return s.sourceType.includes('Commentary') || s.sourceType.includes('Book');
    if (selectedType === 'lexicon') return s.sourceType.includes('Lexicon') || s.sourceType.includes('Dataset');
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100 font-sans">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-semibold mb-2 border border-gold-500/20">
          <BookOpen className="w-4 h-4" />
          <span>গ্রন্থপঞ্জি ও গবেষণার ভিত্তি</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-gold-300">
          উৎস নির্দেশিকা ও গ্রন্থপঞ্জি তালিকা
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          বাংলা স্টাডি বাইবেলে ব্যবহৃত প্রতিটি তথ্যের প্রামাণ্য উৎস, প্রকাশনা বছর এবং একাডেমিক সাইটেশন তথ্যমালা।
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="পুস্তক, অনুবাদক বা প্রকাশকের নাম দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { id: 'all', label: 'সকল উৎস' },
              { id: 'bible', label: 'বাইবেল অনুবাদ' },
              { id: 'commentary', label: 'কমেন্টারি ও গ্রন্থ' },
              { id: 'lexicon', label: 'লেক্সিকন ও ডেটাসেট' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedType === t.id
                  ? 'bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-4">
        {filteredSources.map((s) => {
          const resId = s.id.replace('src-', 'res-');
          return (
            <SourceAttribution
              key={s.id}
              resourceId={resId}
              compact={false}
            />
          );
        })}
      </div>
    </div>
  );
};
