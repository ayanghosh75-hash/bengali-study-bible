// 🤖 Ask Bible Response Card Component
// Grounded AI Theological Research Assistant — "Search. Study. Understand."

import React, { useState } from 'react';
import {
  BookOpen,
  Landmark,
  Compass,
  FileText,
  Link2,
  Users,
  Scale,
  GraduationCap,
  Sparkles,
  BookmarkPlus,
  Copy,
  Check,
  Printer,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Flame,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { AskBibleResponse } from '../../types/askBible';
import { AskBibleService } from '../../services/askBibleService';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

interface AskBibleResponseCardProps {
  response: AskBibleResponse;
  onNavigateToScripture?: (bookId: string, chapter: number, verse?: number) => void;
  onAskFollowUp?: (query: string) => void;
  onToggleDeepResearch?: (enable: boolean) => void;
  isDeepResearchActive?: boolean;
}

export const AskBibleResponseCard: React.FC<AskBibleResponseCardProps> = ({
  response,
  onNavigateToScripture,
  onAskFollowUp,
  onToggleDeepResearch,
  isDeepResearchActive = false,
}) => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'scripture' | 'context' | 'exposition' | 'words' | 'crossrefs' | 'characters' | 'perspectives' | 'sources' | 'further'
  >('all');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const handleSaveToWorkspace = () => {
    const success = AskBibleService.saveToWorkspace(response);
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      const markdown = AskBibleService.exportAsMarkdown(response);
      await navigator.clipboard.writeText(markdown);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 text-white border border-navy-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold border border-gold-500/30">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>🤖 Ask Bible • অনুসন্ধান • অধ্যয়ন • উপলব্ধি</span>
            </div>

            {/* Confidence Badge */}
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              response.confidence.level === 'high'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{response.confidence.labelBn} ({toBengaliDigits(response.confidence.scorePercent)}%)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-0.5 rounded-full bg-navy-800 text-slate-300 border border-navy-700">
              {response.theologicalCategory}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {toBengaliDigits(response.executionTimeMs)} মি.সে.
            </span>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
            {response.titleBn}
          </h2>
          <p className="text-xs sm:text-sm text-gold-400/90 font-sans mt-1">
            {response.subtitleBn}
          </p>
        </div>

        {/* Confidence Explanation Note */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-2">
          <span className="text-gold-400 font-bold">আস্থার ভিত্তি:</span>
          <span>{response.confidence.explanationBn}</span>
        </div>

        {/* 2. Visual Live Retrieval Pipeline Tracker */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2 font-sans font-medium">
            <span className="flex items-center gap-1 text-gold-300">
              <Layers className="w-3 h-3 text-gold-400" />
              <span>প্রামাণ্য গবেষণা তথ্যভাণ্ডার অনুসন্ধান পর্যায় (Strict Retrieval Before Reasoning)</span>
            </span>
            <span className="text-emerald-400 font-semibold">✓ সূত্র প্রমাণিত</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {response.retrievalPipeline.map((step) => (
              <div
                key={step.stepNumber}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors space-y-1"
                title={step.summaryBn}
              >
                <div className="flex items-center justify-between">
                  <span className="w-4 h-4 rounded-full bg-gold-500/20 text-gold-300 text-[10px] flex items-center justify-center font-bold">
                    {toBengaliDigits(step.stepNumber)}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-medium">
                    {step.status === 'synthesized' ? 'সংশ্লেষিত' : 'আহরিত'}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-200 line-clamp-1">
                  {step.stepNameBn}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">
                  {step.summaryBn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Action Toolbar */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveToWorkspace}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                savedSuccess
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-gold-500 hover:bg-gold-400 text-navy-950 shadow-gold-500/20'
              }`}
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
              <span>{savedSuccess ? 'আমার স্টাডিতে সংরক্ষিত!' : 'আমার স্টাডিতে সংরক্ষণ'}</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
            >
              {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSuccess ? 'কপি সম্পন্ন!' : 'ডসিয়ার কপি'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট</span>
            </button>

            {onToggleDeepResearch && (
              <button
                onClick={() => onToggleDeepResearch(!isDeepResearchActive)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  isDeepResearchActive
                    ? 'bg-purple-600 text-white border-purple-400 shadow-purple-500/30'
                    : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border-purple-400/40'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-purple-300" />
                <span>{isDeepResearchActive ? 'গভীর গবেষণা মোড সক্রিয়' : 'গভীর গবেষণা ডসিয়ার'}</span>
              </button>
            )}
          </div>

          {response.targetPassage && onNavigateToScripture && (
            <button
              onClick={() => onNavigateToScripture(response.targetPassage!.bookId, response.targetPassage!.chapter)}
              className="inline-flex items-center gap-1 text-xs text-gold-300 hover:text-gold-200 font-semibold transition-colors"
            >
              <span>{response.targetPassage.bookNameBn} {toBengaliDigits(response.targetPassage.chapter)} সম্পূর্ণ অধ্যায় পড়ুন</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Section Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-navy-800">
        {[
          { key: 'all', label: 'সমগ্র গবেষণা ডসিয়ার', icon: Layers },
          { key: 'scripture', label: '১. বাইবেল সরাসরি যা বলে', icon: BookOpen },
          { key: 'context', label: '২. প্রেক্ষাপট', icon: Landmark },
          { key: 'exposition', label: '৩. ব্যাখ্যা', icon: Compass },
          { key: 'words', label: '৪. মূল শব্দ', icon: FileText },
          { key: 'crossrefs', label: '৫. ক্রস রেফারেন্স', icon: Link2 },
          { key: 'characters', label: '৬. সম্পর্কিত ব্যক্তি', icon: Users },
          { key: 'perspectives', label: '৭. বিভিন্ন মত', icon: Scale },
          { key: 'sources', label: '৮. গবেষণার সূত্র', icon: GraduationCap },
          { key: 'further', label: '৯. আরও অধ্যয়ন করুন', icon: ArrowRight },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'text-navy-950 dark:text-gold-400 border-gold-500 bg-gold-500/10 dark:bg-gold-500/10'
                  : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          SECTION 1: 📖 বাইবেল সরাসরি যা বলে (What the Bible Directly Says)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'scripture') && (
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-3">
            <div className="flex items-center gap-2 text-navy-950 dark:text-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg leading-snug">
                  ১. 📖 বাইবেল সরাসরি যা বলে
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                  {response.directScripture.summaryBn}
                </p>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-navy-800 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200/60 dark:border-navy-700">
              {toBengaliDigits(response.directScripture.verses.length)}টি প্রামাণ্য পদ
            </span>
          </div>

          <div className="grid gap-3.5">
            {response.directScripture.verses.map((v, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800 space-y-2 hover:border-gold-400/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-navy-900 dark:text-gold-400">
                      {v.reference}
                    </span>
                    {v.highlightText && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-300 font-semibold border border-gold-500/20">
                        {v.highlightText}
                      </span>
                    )}
                  </div>
                  {onNavigateToScripture && (
                    <button
                      onClick={() => onNavigateToScripture(v.bookId, v.chapter, v.verse)}
                      className="text-xs text-slate-400 hover:text-gold-600 dark:hover:text-gold-400 inline-flex items-center gap-1 font-medium transition-colors"
                      title="বাইবেল রিডারে এই পদটি খুলুন"
                    >
                      <span>রিডারে দেখুন</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <p className="font-serif text-base text-slate-800 dark:text-slate-200 leading-relaxed pl-3 border-l-2 border-gold-500/60">
                  “{v.textBn}”
                </p>

                {v.contextNoteBn && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans italic">
                    💡 {v.contextNoteBn}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Key Observations */}
          {response.directScripture.keyObservationsBn && response.directScripture.keyObservationsBn.length > 0 && (
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-navy-950/40 border border-blue-100 dark:border-navy-800 space-y-2">
              <div className="text-xs font-bold text-blue-900 dark:text-blue-300">
                🔍 মূল শাস্ত্রীয় পর্যবেক্ষণসমূহ:
              </div>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 list-disc pl-5 leading-relaxed">
                {response.directScripture.keyObservationsBn.map((obs, oIdx) => (
                  <li key={oIdx}>{obs}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* ========================================================
          SECTION 2: 📜 প্রেক্ষাপট (Historical & Literary Context)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'context') && (
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                ২. 📜 প্রেক্ষাপট (Historical & Literary Context)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                ঐতিহাসিক বাস্তবতা, লেখক, উদ্দিষ্ট পাঠক ও তৎকালীন সামাজিক পটভূমি
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-navy-950/50 border border-amber-500/20 space-y-1.5">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                ✍️ লেখক ও রচনাকাল
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {response.context.authorDateBn}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-navy-950/50 border border-amber-500/20 space-y-1.5">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                👥 উদ্দিষ্ট পাঠকবর্গ
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {response.context.historicalAudienceBn}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-navy-950/50 border border-amber-500/20 space-y-1.5">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                🏛️ ভৌগোলিক ও রাজনৈতিক পরিবেশ
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {response.context.geographicalSettingBn}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-navy-950/50 border border-amber-500/20 space-y-1.5">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                📜 সাহিত্যিক রূপ ও গঠন
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {response.context.literaryGenreStructureBn}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 space-y-2">
            <div className="text-xs font-bold text-navy-950 dark:text-gold-300">
              🔍 সামাজিক ও আইনি পটভূমির তাৎপর্য
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {response.context.socioPoliticalBackgroundBn}
            </p>
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 3: 📚 ব্যাখ্যা (Exposition & Theological Breakdown)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'exposition') && (
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-navy-950 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                ৩. 📚 ব্যাখ্যা (Theological Exposition)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                মূল বক্তব্য, যুক্তিকাঠামো, পদভিত্তিক বিশ্লেষণ ও ব্যবহারিক যাজকীয় প্রয়োগ
              </p>
            </div>
          </div>

          {/* Core Thesis Callout */}
          <div className="p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-950/30 border border-purple-500/30 space-y-1.5">
            <div className="text-xs font-bold text-purple-900 dark:text-purple-300">
              💎 কেন্দ্রীয় মূল বক্তব্য (Central Thesis)
            </div>
            <p className="font-serif text-sm sm:text-base text-purple-950 dark:text-purple-100 font-semibold leading-relaxed">
              {response.exposition.coreThesisBn}
            </p>
          </div>

          {/* Structural Outline Breakdown */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              অনুচ্ছেদভিত্তিক ব্যাখ্যা ও যুক্তিপ্রবাহ
            </h4>
            {response.exposition.structuralOutline.map((sec, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100">
                    {sec.titleBn}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-navy-800 text-purple-700 dark:text-purple-300">
                    {sec.verseRange}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>সারসংক্ষেপ:</strong> {sec.summaryBn}
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {sec.analysisBn}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {sec.keyDoctrinalTruths.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      🏷️ {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practical Application */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              🌱 যাজকীয় ও ব্যবহারিক জীবন প্রয়োগ (Pastoral Application)
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed">
              {response.exposition.pastoralApplicationBn}
            </p>
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 4: 🔍 মূল শব্দ (Original Biblical Words)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'words') && (
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                ৪. 🔍 মূল শব্দ (Greek & Hebrew Word Studies)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                মূল গ্রীক ও হিব্রু শব্দার্থ, স্ট্রংস নম্বর, ব্যাকরণগত ব্যবহার ও সমগোত্রীয় শব্দ
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {response.originalWords.map((w, wIdx) => (
              <div
                key={wIdx}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800 space-y-2 hover:border-gold-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gold-600 dark:text-gold-400">
                    {w.strongs} ({w.language})
                  </span>
                  <span className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100">
                    {w.originalWord}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  উচ্চারণ: <strong>{w.pronunciationBn}</strong> ({w.transliteration})
                </div>
                <div className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  অর্থ: {w.meaningBn}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  {w.contextUsageBn}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 5: 🔗 ক্রস রেফারেন্স (Cross References)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'crossrefs') && (
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                ৫. 🔗 ক্রস রেফারেন্স ও শাস্ত্রীয় সংযোগ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                সমান্তরাল শিক্ষা, ভাববাণী ও পূর্ণতা এবং আন্তঃশাস্ত্রীয় সম্পর্ক
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {response.crossReferences.map((cr, crIdx) => (
              <div
                key={crIdx}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-navy-950/50 border border-slate-200/60 dark:border-navy-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-navy-950 dark:text-gold-400">
                    {cr.ref}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    cr.testament === 'OT' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {cr.typeBn}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cr.relevanceBn}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 6: 👥 সম্পর্কিত ব্যক্তি (Related Biblical Characters)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'characters') && (
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                ৬. 👥 সম্পর্কিত বাইবেলীয় চরিত্র
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                আলোচ্য শাস্ত্রাংশ ও বিষয়ের সাথে সংশ্লিষ্ট বিশিষ্ট ব্যক্তিত্ব এবং তাঁদের জীবনের শিক্ষা
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {response.relatedCharacters.map((c, cIdx) => (
              <div
                key={cIdx}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-navy-950 dark:text-slate-100">
                    {c.nameBn}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-sans">
                    {c.nameEn}
                  </span>
                </div>
                <div className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                  {c.roleBn}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {c.connectionToTopicBn}
                </p>
                <div className="pt-2 border-t border-slate-200/60 dark:border-navy-800 text-xs text-slate-700 dark:text-slate-300">
                  <strong>আত্মিক শিক্ষা:</strong> {c.keySpiritualLessonsBn}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 7: ⚖️ বিভিন্ন মত (Theological Perspectives & Historical Views)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'perspectives') && (
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-navy-950 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                ৭. ⚖️ বিভিন্ন ঐতিহাসিক মত ও পাণ্ডিত্যপূর্ণ ঐতিহ্য
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                {response.theologicalPerspectives.dialogueTopicBn}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {response.theologicalPerspectives.perspectives.map((persp, pIdx) => (
              <div
                key={pIdx}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400">
                    {persp.traditionBn}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-slate-100">
                    {persp.perspectiveNameBn}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {persp.coreArgumentBn}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 dark:border-navy-800 text-[10px] text-slate-400 font-mono">
                  শাস্ত্রীয় সূত্র: {persp.scriptureBasis.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Unifying Christian Consensus */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-1.5">
            <div className="text-xs font-bold text-blue-900 dark:text-blue-300">
              🤝 সার্বজনীন খ্রিস্টীয় ঐকমত্য (The Unifying Consensus)
            </div>
            <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-100 leading-relaxed font-serif">
              {response.theologicalPerspectives.unifyingConsensusBn}
            </p>
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 8: 📖 গবেষণার সূত্র (Research Sources, Lexicons & Citations)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'sources') && (
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-navy-950 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                ৮. 📖 গবেষণার প্রামাণ্য সূত্র ও উদ্ধৃতিমালা
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                ব্যবহৃত বাইবেল সংস্করণ, প্রাচীন পাণ্ডুলিপি ও ঐতিহাসিক ভাষ্যকারদের নির্ভরযোগ্য সূত্র
              </p>
            </div>
          </div>

          {/* Primary Bible Editions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              মূল বাইবেল সংস্করণ ও টেক্সট
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {response.researchSources.primaryBibleEditions.map((ed, eIdx) => (
                <div
                  key={eIdx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800 text-xs text-slate-700 dark:text-slate-300 font-mono flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{ed}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarly Citations */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              ঐতিহাসিক পণ্ডিত ও ভাষ্যকারগণের প্রামাণ্য উদ্ধৃতি
            </h4>
            <div className="space-y-2.5">
              {response.researchSources.scholarlyCitations.map((cit, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950/50 border border-slate-200 dark:border-navy-800 space-y-1"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-serif font-bold text-xs text-navy-950 dark:text-slate-200">
                      {cit.authorBn}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {cit.eraOrYear}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gold-600 dark:text-gold-400">
                    {cit.workBn}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cit.theologicalContributionBn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          ADVANCED DEEP RESEARCH DOSSIER ("গভীর গবেষণা")
         ======================================================== */}
      {response.deepResearch && response.deepResearch.isEnabled && (
        <section className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/30 to-navy-950/50 border border-purple-500/40 shadow-md space-y-5">
          <div className="flex items-center gap-2 text-purple-950 dark:text-purple-200 border-b border-purple-500/20 pb-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                গভীর গবেষণা ডসিয়ার (Advanced Deep Research Dossier)
              </h3>
              <p className="text-xs text-purple-300/80 font-sans">
                ঐতিহাসিক বিকাশ, প্রাতিষ্ঠানিক পর্যালোচনা ও ৭-দিনের সুশৃঙ্খল পাঠ পরিকল্পনা
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              ১. সামগ্রিক ক্যানোনিকাল রূপরেখা
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {response.deepResearch.topicOverviewBn}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              ২. ৭-দিনের সুশৃঙ্খল ব্যক্তিগত ও দলীয় অধ্যয়ন পরিকল্পনা
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {response.deepResearch.sevenDayStudyPlan.map((plan, pIdx) => (
                <div
                  key={pIdx}
                  className="p-3 rounded-2xl bg-purple-900/20 border border-purple-500/20 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-gold-400">
                    <span>{plan.day}</span>
                    <span className="font-mono text-[11px]">{plan.passage}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {plan.focusBn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-purple-500/20">
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              ৩. রেফারেন্স গ্রন্থতালিকা (Research Bibliography)
            </div>
            <ul className="space-y-1 text-xs text-slate-400 font-mono list-disc pl-5">
              {response.deepResearch.biblicalBibliography.map((bib, bIdx) => (
                <li key={bIdx}>{bib}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 9: ➜ আরও অধ্যয়ন করুন (Further Study Recommendations)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'further') && (
        <section className="p-6 rounded-3xl bg-slate-100/80 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-4">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-navy-800 pb-3">
            <ArrowRight className="w-4 h-4 text-gold-500" />
            <h3 className="font-serif font-bold text-base">
              ৯. ➜ আরও গভীর অধ্যয়ন করুন (Further Study Recommendations)
            </h3>
          </div>

          {/* Related Topics */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              সম্পর্কিত শাস্ত্রীয় বিষয়াবলী:
            </div>
            <div className="flex flex-wrap gap-2">
              {response.furtherStudy.relatedTopics.map((top, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => onAskFollowUp && onAskFollowUp(top.query)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-gold-400 hover:text-gold-600 transition-colors shadow-xs"
                >
                  📖 {top.titleBn}
                </button>
              ))}
            </div>
          </div>

          {/* Related Chapters */}
          <div className="space-y-2 pt-1">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              সমান্তরাল অধ্যায় পাঠ:
            </div>
            <div className="grid sm:grid-cols-3 gap-2">
              {response.furtherStudy.relatedChapters.map((ch, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-0.5"
                >
                  <div className="font-serif font-bold text-xs text-navy-950 dark:text-gold-400">
                    {ch.ref}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {ch.descriptionBn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Follow-ups */}
          {response.suggestedFollowUps && response.suggestedFollowUps.length > 0 && onAskFollowUp && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-navy-800">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>পরবর্তী অনুবর্তী শাস্ত্রীয় প্রশ্নসমূহ (Follow-up Inquiries):</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {response.suggestedFollowUps.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAskFollowUp(q)}
                    className="p-3 text-left rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-400 transition-colors group flex items-center justify-between gap-2 shadow-xs"
                  >
                    <span className="text-xs font-serif text-slate-800 dark:text-slate-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {q}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
