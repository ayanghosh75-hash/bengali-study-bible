// 🤖 Ask Bible Screen
// "Search. Study. Understand." — Authoritative AI Bible Research Assistant

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Users,
  GraduationCap,
  Landmark,
  FileText,
  Scale,
  Heart,
  Layers,
  X,
  Loader2,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { AskBibleResponse } from '../types/askBible';
import { AskBibleService } from '../services/askBibleService';
import { AskBibleResponseCard } from '../components/askBible/AskBibleResponseCard';

interface AskBibleScreenProps {
  onNavigateToScripture: (bookId: string, chapter: number, verse?: number) => void;
  useBengaliDigits?: boolean;
}

export const AskBibleScreen: React.FC<AskBibleScreenProps> = ({
  onNavigateToScripture,
  useBengaliDigits: _useBengaliDigits = true,
}) => {
  const [query, setQuery] = useState('রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?');
  const [activeCategory, setActiveCategory] = useState<string>('bible');
  const [response, setResponse] = useState<AskBibleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeepResearch, setIsDeepResearch] = useState(false);

  const handleSearch = async (searchQuery: string, deepMode = isDeepResearch) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setQuery(searchQuery);

    try {
      const res = await AskBibleService.ask(searchQuery, deepMode);
      setResponse(res);
    } catch (err) {
      console.error('Ask Bible search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load featured query on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      void handleSearch('রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?', false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleDeep = (enable: boolean) => {
    setIsDeepResearch(enable);
    if (query) {
      handleSearch(query, enable);
    }
  };

  const questionCategories = [
    {
      id: 'bible',
      labelBn: 'বাইবেল ও অধ্যায়',
      icon: BookOpen,
      questions: [
        'রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?',
        'যোহন ৩:১৬ ব্যাখ্যা করো',
        'মথি ৫ অধ্যায়ের সারাংশ',
        'প্রকাশিত বাক্য বোঝা কঠিন কেন?',
      ],
    },
    {
      id: 'character',
      labelBn: 'বাইবেলীয় চরিত্র',
      icon: Users,
      questions: [
        'পৌল কে ছিলেন?',
        'পিতরের জীবনের শিক্ষা কী?',
        'যোনা কেন পালিয়ে গিয়েছিলেন?',
        'দাউদের সবচেয়ে বড় ভুল কী ছিল?',
      ],
    },
    {
      id: 'theology',
      labelBn: 'মূল ধর্মতত্ত্ব',
      icon: GraduationCap,
      questions: [
        'পরিত্রাণ কী?',
        'অনুগ্রহ কী?',
        'ত্রিত্ব কী?',
        'পবিত্র আত্মার বাপ্তিস্ম কী?',
      ],
    },
    {
      id: 'historical',
      labelBn: 'ইতিহাস ও সংস্কৃতি',
      icon: Landmark,
      questions: [
        'ফরীশীরা কারা ছিলেন?',
        'সদূকীরা কারা ছিলেন?',
        'রোমান সাম্রাজ্যের ভূমিকা কী ছিল?',
        'প্রথম শতাব্দীর ইহুদি সমাজ কেমন ছিল?',
      ],
    },
    {
      id: 'word_study',
      labelBn: 'মূল শব্দার্থ',
      icon: FileText,
      questions: [
        'আগাপে শব্দের অর্থ কী?',
        'সোতেরিয়া (σωτηρία) কী?',
        'হিব্রু ভাষায় করুণা কী?',
        'লগোস (Logos) বলতে কী বোঝায়?',
      ],
    },
    {
      id: 'comparative',
      labelBn: 'তুলনামূলক অধ্যয়ন',
      icon: Scale,
      questions: [
        'পৌল ও যাকোবের শিক্ষা কি বিরোধপূর্ণ?',
        'চারটি সুসমাচারের পার্থক্য কী?',
        'ইস্রায়েল ও চার্চের সম্পর্ক কী?',
      ],
    },
    {
      id: 'practical',
      labelBn: 'ব্যবহারিক জীবন',
      icon: Heart,
      questions: [
        'খ্রিস্টীয় ক্ষমা কীভাবে চর্চা করব?',
        'কষ্টের সময় বাইবেল কী শিক্ষা দেয়?',
        'ভয় মোকাবেলা করার জন্য কোন পদগুলো গুরুত্বপূর্ণ?',
      ],
    },
    {
      id: 'research',
      labelBn: 'গবেষণা ও ডসিয়ার',
      icon: Layers,
      questions: [
        'পরিত্রাণ বিষয়ে সব গুরুত্বপূর্ণ পদ দেখাও',
        'অনুগ্রহ সম্পর্কে বাইবেলের পূর্ণ শিক্ষা',
        'পরিত্রাণ কি হারানো সম্ভব? অনন্ত জীবনের নিশ্চয়তা',
      ],
    },
  ];

  const currentCategory = questionCategories.find((c) => c.id === activeCategory) || questionCategories[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Hero Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 text-white border border-navy-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>প্রামাণ্য ধর্মতাত্ত্বিক এআই সহকারী (Grounded RAG)</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>অনুমানমুক্ত • সম্পূর্ণ প্রামাণ্য শাস্ত্রভিত্তিক</span>
          </div>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            🤖 Ask Bible
          </h1>
          <p className="text-xs sm:text-sm text-gold-300 font-sans mt-1">
            "অনুসন্ধান করুন • অধ্যয়ন করুন • উপলব্ধি করুন" — Search. Study. Understand.
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
          এটি কোনো সাধারণ চ্যাটবট নয়; প্রশ্ন করার সাথে সাথে এআই প্রথমে সমগ্র বাংলা বাইবেল ক্যানন, স্ট্রংস গ্রীক-হিব্রু অভিধান, ঐতিহাসিক পটভূমি ও অনুমোদিত গবেষণাপত্র আহরণ করে, তারপর সত্যনিষ্ঠ উত্তর প্রদান করে।
        </p>

        {/* 2. Search & Ask Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="pt-2 relative flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="যেকোনো শাস্ত্রীয় বা ধর্মতাত্ত্বিক প্রশ্ন লিখুন... যেমন: রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?"
              className="w-full pl-10 pr-10 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-gold-400 text-sm text-white placeholder-slate-400 outline-none transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">অনুসন্ধান চলছে...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>আস্ক বাইবেল</span>
              </>
            )}
          </button>
        </form>

        {/* Deep Research Switch */}
        <div className="flex items-center justify-between pt-1 text-xs text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isDeepResearch}
              onChange={(e) => handleToggleDeep(e.target.checked)}
              className="w-4 h-4 rounded text-gold-500 focus:ring-gold-400 bg-navy-800 border-navy-700"
            />
            <span className="flex items-center gap-1 font-medium">
              <Flame className="w-3.5 h-3.5 text-purple-400" />
              <span>গভীর প্রাতিষ্ঠানিক গবেষণা মোড (Advanced Deep Research Dossier)</span>
            </span>
          </label>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            ৭-দিনের পাঠ পরিকল্পনা ও গবেষণা গ্রন্থতালিকা অন্তর্ভুক্ত
          </span>
        </div>
      </div>

      {/* 3. Universal Question Categories & Prompt Chips */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {questionCategories.map((cat) => {
            const Icon = cat.icon;
            const isSel = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  isSel
                    ? 'bg-gold-500 text-navy-950 border-gold-400 shadow-sm'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-navy-800 hover:border-gold-400/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.labelBn}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Sample Question Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentCategory.questions.map((qText, qIdx) => (
            <button
              key={qIdx}
              onClick={() => handleSearch(qText)}
              className={`p-3 text-left rounded-2xl border text-xs font-serif transition-all flex items-center justify-between gap-2 shadow-2xs group ${
                query === qText
                  ? 'bg-gold-50/80 dark:bg-gold-500/10 border-gold-400/80 text-navy-950 dark:text-gold-300 font-bold'
                  : 'bg-white dark:bg-navy-900 border-slate-200/80 dark:border-navy-800 text-slate-700 dark:text-slate-200 hover:border-gold-400'
              }`}
            >
              <span className="group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors line-clamp-1">
                {qText}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold-500 transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* 4. Loading State or Active Response Card */}
      {isLoading ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-center space-y-4 shadow-sm">
          <Loader2 className="w-8 h-8 text-gold-500 animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-slate-100">
              বাংলা বাইবেল গবেষণা তথ্যভাণ্ডার অনুসন্ধান ও বিশ্লেষণ চলছে...
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              শাস্ত্রাংশ শনাক্তকরণ → পদ সংগ্রহ → ঐতিহাসিক প্রেক্ষাপট → মূল গ্রীক/হিব্রু শব্দার্থ → ধর্মতাত্ত্বিক সংশ্লেষণ
            </p>
          </div>
        </div>
      ) : response ? (
        <AskBibleResponseCard
          response={response}
          onNavigateToScripture={onNavigateToScripture}
          onAskFollowUp={(followUpQuery) => handleSearch(followUpQuery)}
          onToggleDeepResearch={handleToggleDeep}
          isDeepResearchActive={isDeepResearch}
        />
      ) : null}
    </div>
  );
};
