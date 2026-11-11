import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Circle,
  X,
  ExternalLink,
  Bookmark,
  Sparkles,
  Share2,
  Check,
} from 'lucide-react';
import { StudyService } from '../services/studyService';
import { WorkspaceService } from '../services/workspaceService';
import { StudyTopic, BiblicalCharacter, TopicCategory } from '../types/study';
import { formatVerseRef, toBengaliDigits } from '../utils/bengaliNumerals';
import { ResearchDashboard } from '../components/research/ResearchDashboard';
import { AnalyticsService } from '../services/analyticsService';

interface StudyScreenProps {
  onNavigateToTopic: (bookId: string, chapter: number, verse?: number) => void;
  useBengaliDigits?: boolean;
}

type StudySubTab = 'topics' | 'characters' | 'plans' | 'research';

export const StudyScreen: React.FC<StudyScreenProps> = ({
  onNavigateToTopic,
  useBengaliDigits = true,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<StudySubTab>('topics');
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [activeTopicModal, setActiveTopicModal] = useState<StudyTopic | null>(null);
  const [activeCharacterModal, setActiveCharacterModal] = useState<BiblicalCharacter | null>(null);
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);
  const [, setProgressRefreshKey] = useState(0);

  useEffect(() => {
    AnalyticsService.trackStudyPageOpen(activeSubTab);
  }, [activeSubTab]);

  // Handle incoming deep links (/study?topic=xyz or /study?char=xyz)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const topicId = params.get('topic');
        const charId = params.get('char');
        if (topicId) {
          const found = StudyService.getTopics().find((t) => t.id === topicId);
          if (found) {
            setActiveTopicModal(found);
            setActiveSubTab('topics');
          }
        } else if (charId) {
          const found = StudyService.getCharacters().find((c) => c.id === charId);
          if (found) {
            setActiveCharacterModal(found);
            setActiveSubTab('characters');
          }
        }
      }
    } catch {}
  }, []);

  const handleShareTopic = (topic: StudyTopic) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://bengalistudybible.com';
    const url = `${origin}/study?topic=${topic.id}`;
    const text = `📖 বিষয়ভিত্তিক বাইবেল অধ্যয়ন: ${topic.titleBn} (${topic.titleEn})\n${topic.summaryBn}\n\nসরাসরি পড়ুন: ${url}\n(বাংলা স্টাডি বাইবেল)`;

    if (navigator.share) {
      navigator.share({ title: topic.titleBn, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedShareId(`topic_${topic.id}`);
        setTimeout(() => setCopiedShareId(null), 2000);
      });
    }
  };

  const handleShareCharacter = (char: BiblicalCharacter) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://bengalistudybible.com';
    const url = `${origin}/study?char=${char.id}`;
    const text = `👤 বাইবেলের চরিত্র অধ্যয়ন: ${char.nameBn} (${char.nameEn})\n${char.biographyBn}\n\nসরাসরি পড়ুন: ${url}\n(বাংলা স্টাডি বাইবেল)`;

    if (navigator.share) {
      navigator.share({ title: char.nameBn, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedShareId(`char_${char.id}`);
        setTimeout(() => setCopiedShareId(null), 2000);
      });
    }
  };

  const allTopics = StudyService.getTopics();
  const allCharacters = StudyService.getCharacters();
  const allPlans = StudyService.getReadingPlans();

  // Filtered topics
  const filteredTopics = allTopics.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      t.titleBn.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      t.titleEn.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      t.summaryBn.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCat && matchesQuery;
  });

  // Filtered characters
  const filteredCharacters = allCharacters.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      c.nameBn.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.biographyBn.toLowerCase().includes(q)
    );
  });

  const categories: { id: TopicCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'সকল বিষয়' },
    { id: 'salvation', label: 'পরিত্রাণ ও অনুগ্রহ' },
    { id: 'god', label: 'ঈশ্বরতত্ত্ব' },
    { id: 'christian_life', label: 'খ্রীষ্টিয়ান জীবন' },
  ];

  const handleTogglePlanDay = (planId: string, dayNumber: number) => {
    StudyService.togglePlanDayCompletion(planId, dayNumber);
    setProgressRefreshKey((k) => k + 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28 space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white border border-navy-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold border border-gold-500/30">
          <GraduationCap className="w-4 h-4" />
          <span>ফেজ ২: ধর্মতাত্ত্বিক স্টাডি সিস্টেম</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          বাইবেল অধ্যয়ন ও আধ্যাত্মিক গবেষণাগার
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
          বিষয়ভিত্তিক শাস্ত্রীয় অনুসন্ধান, বাইবেলের ঐতিহাসিক চরিত্র পর্যালোচনা এবং নিয়মানুগ পাঠ পরিকল্পনা।
        </p>
      </div>

      {/* Sub-Tabs Switcher */}
      <div className="flex border-b border-slate-200 dark:border-navy-800 overflow-x-auto no-scrollbar">
        {[
          { id: 'research' as StudySubTab, label: 'গবেষণা ডেস্ক', count: 8, icon: Sparkles },
          { id: 'topics' as StudySubTab, label: 'বিষয়ভিত্তিক অধ্যয়ন', count: allTopics.length, icon: BookOpen },
          { id: 'characters' as StudySubTab, label: 'বাইবেলের চরিত্র', count: allCharacters.length, icon: Users },
          { id: 'plans' as StudySubTab, label: 'পাঠ পরিকল্পনা', count: allPlans.length, icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id);
                setSearchQuery('');
              }}
              className={`flex-1 py-3 px-2 text-xs sm:text-sm font-semibold border-b-2 flex items-center justify-center gap-1.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-gold-500 text-gold-600 dark:text-gold-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${tab.id === 'research' ? 'text-gold-500' : ''}`} />
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-500">
                {useBengaliDigits ? toBengaliDigits(tab.count) : tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar for Topics, Characters & Research */}
      {activeSubTab !== 'plans' && activeSubTab !== 'research' && (
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={
              activeSubTab === 'topics'
                ? 'বিষয় বা শিরোনাম অনুসন্ধান করুন...'
                : 'চরিত্রের নাম বা জীবনী অনুসন্ধান করুন...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-gold-500/50 outline-none"
          />
        </div>
      )}

      {/* ================= SUB-TAB 1: TOPIC STUDIES ================= */}
      {activeSubTab === 'topics' && (
        <div className="space-y-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-sm shadow-gold-500/30'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Topics Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => {
                  setActiveTopicModal(topic);
                  AnalyticsService.trackTopicStudyOpen(topic.id, topic.titleBn);
                }}
                className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 hover:border-gold-400/60 transition-all cursor-pointer shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-700 dark:text-gold-300 font-semibold border border-gold-500/20">
                      {topic.categoryNameBn}
                    </span>
                    <span className="text-[11px] text-slate-400 font-sans">
                      {useBengaliDigits ? toBengaliDigits(topic.scriptureChain.length) : topic.scriptureChain.length}টি মূল পদ
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-navy-950 dark:text-slate-100 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors mt-2">
                    {topic.titleBn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans line-clamp-2 leading-relaxed">
                    {topic.summaryBn}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs font-bold text-gold-600 dark:text-gold-400">
                  <span>সম্পূর্ণ অধ্যয়ন দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SUB-TAB 2: BIBLICAL CHARACTERS ================= */}
      {activeSubTab === 'characters' && (
        <div className="grid sm:grid-cols-2 gap-3.5">
          {filteredCharacters.map((char) => (
            <div
              key={char.id}
              onClick={() => {
                setActiveCharacterModal(char);
                AnalyticsService.trackCharacterStudyOpen(char.id, char.nameBn);
              }}
              className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 hover:border-gold-400/60 transition-all cursor-pointer shadow-sm group flex items-start gap-3.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 text-gold-600 dark:text-gold-400 font-serif font-bold text-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                {char.nameBn[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-navy-950 dark:text-slate-100 group-hover:text-gold-600 transition-colors">
                    {char.nameBn}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-500">
                    {char.testament === 'OT' ? 'পুরাতন নিয়ম' : 'নতুন নিয়ম'}
                  </span>
                </div>
                <p className="text-[11px] text-gold-700 dark:text-gold-400 font-semibold mt-0.5">
                  অর্থ: {char.nameMeaningBn}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans line-clamp-2">
                  {char.biographyBn}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= SUB-TAB 3: READING PLANS ================= */}
      {activeSubTab === 'plans' && (
        <div className="space-y-4">
          {allPlans.map((plan) => {
            const progress = StudyService.getPlanProgress(plan.id);
            const percent = Math.round((progress.completedDays.length / plan.totalDays) * 100);

            return (
              <div
                key={plan.id}
                className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-md space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-300 font-bold uppercase tracking-wider">
                      {plan.categoryBn}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-slate-100 mt-1">
                      {plan.titleBn}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans">
                      {plan.descriptionBn}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-lg font-bold font-serif text-gold-600 dark:text-gold-400">
                      {useBengaliDigits ? toBengaliDigits(percent) : percent}%
                    </span>
                    <span className="block text-[10px] text-slate-400">সম্পূর্ণ</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Day-by-Day Checklist */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    দৈনিক পাঠ তালিকা:
                  </h4>
                  <div className="grid gap-2">
                    {plan.days.map((d) => {
                      const isDone = progress.completedDays.includes(d.dayNumber);
                      const passage = d.passages[0];

                      return (
                        <div
                          key={d.dayNumber}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                            isDone
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-950 dark:text-emerald-100'
                              : 'bg-slate-50/60 dark:bg-navy-800/50 border-slate-200/70 dark:border-navy-700 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <button
                              onClick={() => handleTogglePlanDay(plan.id, d.dayNumber)}
                              className="text-slate-400 hover:text-gold-500 transition-colors flex-shrink-0"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs">
                                  দিন {useBengaliDigits ? toBengaliDigits(d.dayNumber) : d.dayNumber}: {d.titleBn}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                                {d.devotionalThoughtBn}
                              </span>
                            </div>
                          </div>

                          {/* Jump to Bible Reader */}
                          {passage && (
                            <button
                              onClick={() => onNavigateToTopic(passage.bookId, passage.chapter)}
                              className="px-3 py-1.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 hover:border-gold-500 text-xs font-bold text-gold-600 dark:text-gold-400 transition-all flex items-center gap-1 flex-shrink-0 shadow-sm"
                            >
                              <span>পাঠ করুন</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= SUB-TAB 4: RESEARCH DESK ================= */}
      {activeSubTab === 'research' && (
        <div className="space-y-4">
          <ResearchDashboard
            initialQuery={searchQuery || 'পরিত্রাণ'}
            onNavigateToVerse={onNavigateToTopic}
            useBengaliDigits={useBengaliDigits}
          />
        </div>
      )}

      {/* ================= DETAIL MODAL: TOPIC STUDY ================= */}
      {activeTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-navy-800 bg-slate-50/70 dark:bg-navy-950/50 flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-700 dark:text-gold-300 font-bold uppercase tracking-wider">
                  {activeTopicModal.categoryNameBn}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 dark:text-gold-300 mt-1">
                  {activeTopicModal.titleBn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                  {activeTopicModal.titleEn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    WorkspaceService.toggleSaveStudy({
                      type: 'topic',
                      targetId: activeTopicModal.id,
                      titleBn: activeTopicModal.titleBn,
                      subtitleBn: activeTopicModal.titleEn,
                      summaryBn: activeTopicModal.summaryBn,
                      categoryBn: activeTopicModal.categoryNameBn,
                    });
                    setProgressRefreshKey((k) => k + 1);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    WorkspaceService.isStudySaved(activeTopicModal.id)
                      ? 'bg-gold-500 text-navy-950 border-gold-500 shadow-xs'
                      : 'border-slate-200 dark:border-navy-700 hover:border-gold-400 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {WorkspaceService.isStudySaved(activeTopicModal.id)
                      ? 'সংরক্ষিত ✓'
                      : 'আমার স্টাডিতে সংরক্ষণ'}
                  </span>
                </button>
                <button
                  onClick={() => handleShareTopic(activeTopicModal)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-gold-400 text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200 transition"
                  title="শেয়ার করুন"
                >
                  {copiedShareId === `topic_${activeTopicModal.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-gold-500" />
                      <span>শেয়ার</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveTopicModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* 1. Historical & Contextual Background */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gold-700 dark:text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ঐতিহাসিক ও শাস্ত্রীয় প্রেক্ষাপট:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-slate-50 dark:bg-navy-950/60 p-4 rounded-2xl border border-slate-200/60 dark:border-navy-800">
                  {activeTopicModal.historicalContextBn}
                </p>
              </div>

              {/* 2. Authentic Scripture Chain */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gold-700 dark:text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>শাস্ত্রীয় প্রামাণ্য পদমালা (Scripture Chain):</span>
                </h4>
                <div className="space-y-3">
                  {activeTopicModal.scriptureChain.map((item, idx) => {
                    const refStr = formatVerseRef(item.bookNameBn, item.chapter, item.verse, useBengaliDigits);
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-gold-50/30 dark:bg-navy-800/60 border border-gold-200/50 dark:border-navy-700 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-gold-700 dark:text-gold-400">
                            {refStr}
                          </span>
                          <button
                            onClick={() => {
                              onNavigateToTopic(item.bookId, item.chapter, item.verse);
                              setActiveTopicModal(null);
                            }}
                            className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1"
                          >
                            <span>অধ্যায়ে যান</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <blockquote className="font-serif text-sm text-slate-800 dark:text-slate-100 italic border-l-2 border-gold-500 pl-3">
                          "{item.textBn}"
                        </blockquote>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-sans pt-1">
                          <strong>অন্তর্দৃষ্টি: </strong>{item.insightBn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Theological Takeaways */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gold-700 dark:text-gold-400 uppercase tracking-wider">
                  মূল ধর্মতাত্ত্বিক সত্যসমূহ:
                </h4>
                <ul className="space-y-1.5 list-disc pl-5 text-xs text-slate-700 dark:text-slate-300">
                  {activeTopicModal.theologicalPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* 4. Practical Application */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1 font-sans">
                <strong className="block font-bold text-sm text-amber-800 dark:text-amber-300">
                  ব্যবহারিক প্রয়োগ (Life Application):
                </strong>
                <p>{activeTopicModal.practicalApplicationBn}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= DETAIL MODAL: CHARACTER STUDY ================= */}
      {activeCharacterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-navy-800 bg-slate-50/70 dark:bg-navy-950/50 flex items-start justify-between gap-3">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-600 dark:text-gold-400 font-serif font-bold text-xl flex items-center justify-center flex-shrink-0">
                  {activeCharacterModal.nameBn[0]}
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 dark:text-gold-300">
                    {activeCharacterModal.nameBn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    {activeCharacterModal.nameEn} • {activeCharacterModal.eraBn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    WorkspaceService.toggleSaveStudy({
                      type: 'character',
                      targetId: activeCharacterModal.id,
                      titleBn: activeCharacterModal.nameBn,
                      subtitleBn: `${activeCharacterModal.nameEn} • ${activeCharacterModal.eraBn}`,
                      summaryBn: activeCharacterModal.biographyBn,
                      categoryBn: 'বাইবেলের চরিত্র',
                    });
                    setProgressRefreshKey((k) => k + 1);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    WorkspaceService.isStudySaved(activeCharacterModal.id)
                      ? 'bg-gold-500 text-navy-950 border-gold-500 shadow-xs'
                      : 'border-slate-200 dark:border-navy-700 hover:border-gold-400 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {WorkspaceService.isStudySaved(activeCharacterModal.id)
                      ? 'সংরক্ষিত ✓'
                      : 'আমার স্টাডিতে সংরক্ষণ'}
                  </span>
                </button>
                <button
                  onClick={() => handleShareCharacter(activeCharacterModal)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-gold-400 text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200 transition"
                  title="শেয়ার করুন"
                >
                  {copiedShareId === `char_${activeCharacterModal.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-gold-500" />
                      <span>শেয়ার</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveCharacterModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Biography */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gold-700 dark:text-gold-400 uppercase tracking-wider">
                  সংক্ষিপ্ত জীবনী ও পরিচিতি:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-slate-50 dark:bg-navy-950/60 p-4 rounded-2xl border border-slate-200/60 dark:border-navy-800">
                  {activeCharacterModal.biographyBn}
                </p>
              </div>

              {/* Event Timeline */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gold-700 dark:text-gold-400 uppercase tracking-wider">
                  জীবনের প্রধান ঘটনাবলী ও শাস্ত্রীয় ভিত্তি:
                </span>
                <div className="space-y-2.5">
                  {activeCharacterModal.timeline.map((ev, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-200/70 dark:border-navy-700 bg-white dark:bg-navy-800 flex items-start justify-between gap-3 shadow-sm"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-navy-950 dark:text-slate-100">
                            {ev.titleBn}
                          </h5>
                          <span className="text-[10px] text-gold-600 dark:text-gold-400 font-semibold">
                            ({ev.reference})
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                          {ev.descriptionBn}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          onNavigateToTopic(ev.bookId, ev.chapter, ev.verse);
                          setActiveCharacterModal(null);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-navy-700 text-gold-600 dark:text-gold-400 hover:bg-gold-500 hover:text-navy-950 transition-colors flex-shrink-0"
                        title="পদে যান"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spiritual Lessons */}
              <div className="p-4 rounded-2xl bg-gold-50/50 dark:bg-navy-950/60 border border-gold-200/50 dark:border-navy-800 space-y-2">
                <span className="text-xs font-bold text-gold-800 dark:text-gold-300 uppercase tracking-wider block">
                  আমাদের জীবনের জন্য আত্মিক শিক্ষা:
                </span>
                <ul className="space-y-1.5 list-disc pl-5 text-xs text-slate-700 dark:text-slate-300">
                  {activeCharacterModal.spiritualLessons.map((les, i) => (
                    <li key={i}>{les}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
