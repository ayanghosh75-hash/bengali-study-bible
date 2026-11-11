// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার” (Deep Bengali Christian Knowledge Base)
// Subtitle: “যাচাইকৃত বাংলা খ্রিষ্টীয় গ্রন্থ, প্রবন্ধ, গবেষণা ও শিক্ষাসামগ্রীর মুক্ত সংগ্রহ”
// MAIN PUBLIC RESEARCH & RESOURCE SCREEN
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Filter,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  SlidersHorizontal,
  X,
  Library,
  ExternalLink,
} from 'lucide-react';
import { deepKnowledgeBase } from '../services/deepKnowledgeBaseService';
import {
  DeepKnowledgeResource,
  KnowledgeCategory,
  TheologicalTradition,
  ResourceDifficulty,
  CopyrightStatus,
  AudienceRole,
  KnowledgeBaseFilterState,
} from '../types/deepKnowledgeBase';
import { ResourceCard } from '../components/knowledgeBase/ResourceCard';
import { ResourceReaderModal } from '../components/knowledgeBase/ResourceReaderModal';
import { DeepReportProblemModal } from '../components/common/DeepReportProblemModal';

interface DeepKnowledgeBaseScreenProps {
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
  onNavigateToBible?: (bookId: string, chapter: number, verse?: number) => void;
  initialBookId?: string;
  initialChapter?: number;
}

const CATEGORY_ITEMS: Array<{ id: KnowledgeCategory | 'ALL'; labelBn: string }> = [
  { id: 'ALL', labelBn: 'সকল সংগ্রহ' },
  { id: 'bible_intro', labelBn: 'বাইবেল পরিচিতি' },
  { id: 'old_testament', labelBn: 'পুরাতন নিয়ম' },
  { id: 'new_testament', labelBn: 'নতুন নিয়ম' },
  { id: 'biblical_background', labelBn: 'বাইবেলের পটভূমি' },
  { id: 'bible_dictionary', labelBn: 'বাইবেল অভিধান' },
  { id: 'commentaries', labelBn: 'ব্যাখ্যাগ্রন্থ' },
  { id: 'theology', labelBn: 'ধর্মতত্ত্ব' },
  { id: 'church_history', labelBn: 'মণ্ডলীর ইতিহাস' },
  { id: 'bengal_christian_history', labelBn: 'ভারত ও বাংলার ইতিহাস' },
  { id: 'missions_evangelism', labelBn: 'মিশন ও প্রচার' },
  { id: 'discipleship', labelBn: 'শিষ্যত্ব' },
  { id: 'prayer', labelBn: 'প্রার্থনা' },
  { id: 'praise_worship', labelBn: 'প্রশংসা ও উপাসনা' },
  { id: 'pastoral_care', labelBn: 'পালকীয় পরিচর্যা' },
  { id: 'youth_children', labelBn: 'যুব ও শিশু' },
  { id: 'family', labelBn: 'পরিবার' },
  { id: 'christian_ethics', labelBn: 'খ্রিষ্টীয় নৈতিকতা' },
  { id: 'apologetics', labelBn: 'আত্মপক্ষসমর্থন' },
  { id: 'biography', labelBn: 'জীবনী' },
  { id: 'research_papers', labelBn: 'গবেষণাপত্র' },
  { id: 'audio_video', labelBn: 'অডিও ও ভিডিও' },
  { id: 'free_books', labelBn: 'মুক্ত বই' },
  { id: 'external_links', labelBn: 'বহিরাগত যাচাইকৃত লিংক' },
];

export const DeepKnowledgeBaseScreen: React.FC<DeepKnowledgeBaseScreenProps> = ({
  onNavigateToScripture,
  onNavigateToBible,
  initialBookId,
  initialChapter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'ALL'>('ALL');
  const [selectedTradition, setSelectedTradition] = useState<TheologicalTradition | 'ALL'>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ResourceDifficulty | 'ALL'>('ALL');
  const [selectedCopyright, setSelectedCopyright] = useState<CopyrightStatus | 'ALL'>('ALL');
  const [selectedAudience, setSelectedAudience] = useState<AudienceRole | 'ALL'>('ALL');

  const [activeResourceForReading, setActiveResourceForReading] = useState<DeepKnowledgeResource | null>(null);
  const [reportingResource, setReportingResource] = useState<DeepKnowledgeResource | null>(null);
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter evaluation
  const filteredResources = useMemo(() => {
    return deepKnowledgeBase.filterResources({
      searchQuery,
      category: selectedCategory,
      theologicalTradition: selectedTradition,
      difficulty: selectedDifficulty,
      copyrightStatus: selectedCopyright,
      audience: selectedAudience,
      bibleBookId: initialBookId,
      chapterNumber: initialChapter,
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedTradition,
    selectedDifficulty,
    selectedCopyright,
    selectedAudience,
    initialBookId,
    initialChapter,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedTradition('ALL');
    setSelectedDifficulty('ALL');
    setSelectedCopyright('ALL');
    setSelectedAudience('ALL');
  };

  const handleOpenProblemModal = (res: DeepKnowledgeResource) => {
    setReportingResource(res);
    setIsProblemModalOpen(true);
  };

  const handleSelectPassage = (passageRef: string) => {
    const nav = onNavigateToScripture || onNavigateToBible;
    if (!nav) return;
    const parts = passageRef.trim().split(' ');
    if (parts.length >= 2) {
      const bookId = parts[0];
      const chVerse = parts[1].split(':');
      const chapter = parseInt(chVerse[0], 10) || 1;
      const verse = chVerse[1] ? parseInt(chVerse[1], 10) : undefined;
      nav(bookId, chapter, verse);
    }
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'ALL' ||
    selectedTradition !== 'ALL' ||
    selectedDifficulty !== 'ALL' ||
    selectedCopyright !== 'ALL' ||
    selectedAudience !== 'ALL';

  return (
    <div className="min-h-screen pb-24 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white transition-colors">
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-blue-950 via-indigo-950 to-stone-900 text-white border-b border-indigo-900/60 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>আইনসম্মত ও মুক্ত খ্রিষ্টীয় সংগ্রহশালা</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>পাবলিক ডোমেইন ও লাইসেন্স যাচাইকৃত</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার
            </h1>
            <p className="text-sm sm:text-base text-stone-300 mt-2 font-serif max-w-3xl leading-relaxed">
              “যাচাইকৃত বাংলা খ্রিষ্টীয় গ্রন্থ, প্রবন্ধ, গবেষণা ও শিক্ষাসামগ্রীর মুক্ত সংগ্রহ”
            </p>
          </div>

          <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
            সাধারণ পাঠক, যাজক, ধর্মতত্ত্বের ছাত্র ও গবেষকদের জন্য পবিত্র শাস্ত্রকেন্দ্রিক বাংলা খ্রিষ্টীয় সাহিত্যের অখণ্ড সংগ্রহশালা।
            এখানে সংরক্ষিত প্রতিটি রচনা কপিরাইট আইন ও খ্রিষ্টীয় ধর্মতাত্ত্বিক ভারসাম্য মেনে সংকলিত।
          </p>

          {/* Search Box */}
          <div className="pt-3 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="বিষয়, লেখক, বই, প্রবন্ধ বা বাইবেল পদ দিয়ে অনুসন্ধান করুন (যেমন: কেরি, অনুগ্রহ, যোহন ৩:১৬)..."
                className="w-full pl-12 pr-10 py-3.5 text-sm rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white dark:focus:bg-stone-900 text-white focus:text-stone-900 dark:focus:text-white placeholder-stone-400 border border-white/20 focus:border-blue-500 focus:outline-none shadow-lg transition-all backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1.5 text-stone-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Category Horizontal Scroll Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-800">
          {CATEGORY_ITEMS.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {c.labelBn}
              </button>
            );
          })}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>ফিল্টার:</span>
            </span>

            {/* Tradition Filter */}
            <select
              value={selectedTradition}
              onChange={(e) => setSelectedTradition(e.target.value as any)}
              className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-2.5 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="ALL">সকল ধর্মতাত্ত্বিক ধারা</option>
              <option value="Protestant">Protestant</option>
              <option value="Reformed">Reformed</option>
              <option value="Baptist">Baptist</option>
              <option value="Anglican">Anglican</option>
              <option value="Evangelical">Evangelical</option>
              <option value="Ecumenical">Ecumenical</option>
              <option value="Historical">Historical</option>
              <option value="Academic">Academic</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-2.5 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="ALL">সকল পাঠ স্তর</option>
              <option value="beginner">প্রাথমিক স্তর (Beginner)</option>
              <option value="intermediate">মধ্যম স্তর (Intermediate)</option>
              <option value="advanced">উন্নত স্তর (Advanced)</option>
              <option value="academic">উচ্চতর গবেষক (Academic)</option>
            </select>

            {/* Copyright Filter */}
            <select
              value={selectedCopyright}
              onChange={(e) => setSelectedCopyright(e.target.value as any)}
              className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-2.5 py-1.5 text-xs text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="ALL">সকল লাইসেন্স</option>
              <option value="PUBLIC_DOMAIN">পাবলিক ডোমেইন (Public Domain)</option>
              <option value="CREATIVE_COMMONS">ক্রিয়েটিভ কমন্স (Creative Commons)</option>
              <option value="EXTERNAL_LINK_ONLY">শুধু বহিরাগত লিংক</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-500 dark:text-stone-400">
              ফলাফল: <strong className="text-stone-900 dark:text-white">{filteredResources.length}</strong> টি উপাদান
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>রিসেট</span>
              </button>
            )}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4">
            <Library className="w-12 h-12 text-stone-400 mx-auto" />
            <h3 className="text-base font-bold text-stone-900 dark:text-white">কোনো উপাদান খুঁজে পাওয়া যায়নি</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              আপনার অনুসন্ধানের সাথে মিলে এমন কোনো যাচাইকৃত রচনা পাওয়া যায়নি। অনুসন্ধান পরিমার্জন করুন অথবা রিসেট বোতামে চাপুন।
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl"
            >
              সকল ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onRead={(res) => setActiveResourceForReading(res)}
                onReportProblem={(res) => handleOpenProblemModal(res)}
                onSelectPassage={handleSelectPassage}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <ResourceReaderModal
        isOpen={!!activeResourceForReading}
        resource={activeResourceForReading}
        onClose={() => setActiveResourceForReading(null)}
        onReportProblem={(res) => handleOpenProblemModal(res)}
      />

      {/* Problem Modal */}
      {isProblemModalOpen && (
        <DeepReportProblemModal
          isOpen={isProblemModalOpen}
          onClose={() => {
            setIsProblemModalOpen(false);
            setReportingResource(null);
          }}
          showFloatingTrigger={false}
        />
      )}
    </div>
  );
};
