import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Users,
  Compass,
  HelpCircle,
} from 'lucide-react';
import {
  ACADEMY_LESSONS,
  MINISTRY_SCENARIOS,
  DEVOTIONAL_ROUTINES,
  HELP_FAQS,
} from '../data/tutorial/tutorialData';
import { TutorialService } from '../services/tutorialService';
import { toBengaliDigits } from '../utils/bengaliNumerals';
import { NavTab } from '../components/BottomNav';
import { FacebookPageLink } from '../components/social/FacebookLogo';

interface AcademyScreenProps {
  onNavigateTab: (tab: NavTab) => void;
  onNavigateToBible: (bookId: string, chapter: number, verse?: number) => void;
  onOpenTour: () => void;
  onOpenDevotionChecklist: () => void;
}

export const AcademyScreen: React.FC<AcademyScreenProps> = ({
  onNavigateTab,
  onNavigateToBible: _onNavigateToBible,
  onOpenTour,
  onOpenDevotionChecklist,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'lessons' | 'scenarios' | 'routines' | 'faqs'>(
    'lessons'
  );
  const [lessonCategoryFilter, setLessonCategoryFilter] = useState<string>('all');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>('lesson-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<string>('all');

  // Academy progress state
  const [academyProgress, setAcademyProgress] = useState(() =>
    TutorialService.getAcademyProgress()
  );

  const handleToggleLesson = (lessonId: string) => {
    const updated = TutorialService.toggleLessonComplete(lessonId);
    setAcademyProgress(updated);
  };

  const completedCount = academyProgress.completedLessonIds.length;
  const totalLessons = ACADEMY_LESSONS.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return ACADEMY_LESSONS.filter((lesson) => {
      const matchCategory =
        lessonCategoryFilter === 'all' || lesson.category === lessonCategoryFilter;
      const matchSearch =
        !searchQuery ||
        lesson.titleBn.includes(searchQuery) ||
        lesson.subtitleBn.includes(searchQuery) ||
        lesson.summaryBn.includes(searchQuery);
      return matchCategory && matchSearch;
    });
  }, [lessonCategoryFilter, searchQuery]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return HELP_FAQS.filter((faq) => {
      const matchCategory = faqCategoryFilter === 'all' || faq.category === faqCategoryFilter;
      const matchSearch =
        !searchQuery ||
        faq.questionBn.includes(searchQuery) ||
        faq.answerBn.includes(searchQuery);
      return matchCategory && matchSearch;
    });
  }, [faqCategoryFilter, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 pb-32 animate-fadeIn font-sans">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-8 border border-navy-700/80 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gold-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>বাংলা স্টাডি বাইবেল একাডেমি ও প্রশিক্ষণ কেন্দ্র</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              কীভাবে ব্যবহার করবেন — একাডেমি
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ১০টি সহজ পাঠ, বাস্তব পরিচর্যা প্রশিক্ষণ এবং আধ্যাত্মিক রুটিনের মাধ্যমে প্ল্যাটফর্মের প্রতিটি শক্তিশালী শাস্ত্রীয় টুলের সর্বোচ্চ ব্যবহার শিখুন।
            </p>

            <div className="flex items-center gap-2 text-xs text-gold-400 font-serif pt-1">
              <span>পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={onOpenTour}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-bold text-xs shadow-md shadow-gold-500/20 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-navy-950" />
              <span>🔄 ১২-ধাপের পরিচিতি সফর দেখুন</span>
            </button>

            <button
              onClick={onOpenDevotionChecklist}
              className="px-4 py-2.5 rounded-2xl border border-slate-700 bg-navy-900/80 hover:bg-navy-800 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4 text-gold-400" />
              <span>📋 ১৫-মিনিট ভক্তি চেকলিস্ট</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-navy-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-semibold">
              আপনার শেখার অগ্রগতি: {toBengaliDigits(completedCount)} /{' '}
              {toBengaliDigits(totalLessons)} পাঠ সম্পন্ন
            </span>
            <span className="text-gold-400 font-mono font-bold">({progressPercent}%)</span>
          </div>

          <div className="flex-1 max-w-xs bg-navy-950 rounded-full h-2 overflow-hidden border border-navy-800">
            <div
              className="bg-gradient-to-r from-gold-400 to-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Subtabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-navy-800 overflow-x-auto no-scrollbar gap-2 sm:gap-4 text-sm font-semibold">
        <button
          onClick={() => setActiveSubTab('lessons')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'lessons'
              ? 'border-gold-500 text-gold-600 dark:text-gold-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>১০টি ব্যবহার পাঠ ({toBengaliDigits(ACADEMY_LESSONS.length)})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('scenarios')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'scenarios'
              ? 'border-gold-500 text-gold-600 dark:text-gold-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>পরিচর্যা প্রশিক্ষণ দৃশ্যপট ({toBengaliDigits(MINISTRY_SCENARIOS.length)})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('routines')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'routines'
              ? 'border-gold-500 text-gold-600 dark:text-gold-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>দৈনিক ভক্তি ও স্টাডি রুটিন</span>
        </button>

        <button
          onClick={() => setActiveSubTab('faqs')}
          className={`pb-3 px-3 sm:px-4 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'faqs'
              ? 'border-gold-500 text-gold-600 dark:text-gold-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>সহায়িকা ও সচরাচর প্রশ্ন ({toBengaliDigits(HELP_FAQS.length)})</span>
        </button>
      </div>

      {/* Global Quick Search within Academy */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="একাডেমির যেকোনো বিষয়, টিউটোরিয়াল বা প্রশ্ন খুঁজুন..."
          className="w-full px-4 py-3 pl-11 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-gold-500 shadow-xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            মুছুন ✕
          </button>
        )}
      </div>

      {/* ================= TAB 1: 10 PRACTICAL LESSONS ================= */}
      {activeSubTab === 'lessons' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'all', label: 'সব পাঠ' },
              { id: 'basics', label: '📖 মৌলিক ধাপ' },
              { id: 'study', label: '🔍 গভীর অধ্যয়ন' },
              { id: 'sermon', label: '✍️ প্রচার ও সার্মন' },
              { id: 'tools', label: '🗺️ মানচিত্র ও লাইব্রেরি' },
              { id: 'devotion', label: '⏱️ আত্মিক ভক্তি' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setLessonCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-medium transition ${
                  lessonCategoryFilter === cat.id
                    ? 'bg-navy-950 dark:bg-gold-500 text-white dark:text-navy-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-navy-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Lessons List */}
          <div className="space-y-4">
            {filteredLessons.map((lesson) => {
              const isCompleted = academyProgress.completedLessonIds.includes(lesson.id);
              const isExpanded = expandedLessonId === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isCompleted
                      ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-300 dark:border-emerald-800/50'
                      : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-800 hover:border-slate-300 dark:hover:border-navy-700 shadow-xs'
                  }`}
                >
                  {/* Lesson Card Header */}
                  <div
                    onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 font-serif ${
                          isCompleted
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'bg-gold-500/20 text-gold-700 dark:text-gold-300 border border-gold-500/30'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : lesson.numberBn}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif font-bold text-base text-navy-950 dark:text-white">
                            পাঠ {lesson.numberBn}: {lesson.titleBn}
                          </h3>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
                            {lesson.badgeBn}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {toBengaliDigits(lesson.durationMinutes)} মিনিট
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {lesson.subtitleBn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleLesson(lesson.id);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                          isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'সম্পন্ন' : 'সম্পন্ন করুন'}</span>
                      </button>

                      <div className="text-slate-400">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Accordion Content */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-navy-800 space-y-4 text-xs sm:text-sm animate-fadeIn">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {lesson.summaryBn}
                      </p>

                      {/* Step by Step Breakdown */}
                      <div className="space-y-2.5 pt-1">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          ধাপসমূহ (Step-by-Step Guide):
                        </h4>
                        <div className="grid grid-cols-1 gap-2.5">
                          {lesson.steps.map((st) => (
                            <div
                              key={st.stepNumber}
                              className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-1"
                            >
                              <div className="font-bold text-xs text-navy-950 dark:text-white flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-gold-500 text-navy-950 text-[10px] flex items-center justify-center font-bold">
                                  {toBengaliDigits(st.stepNumber)}
                                </span>
                                <span>{st.titleBn}</span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 pl-5 leading-relaxed">
                                {st.detailBn}
                              </p>
                              {st.actionTipBn && (
                                <div className="text-[11px] text-amber-700 dark:text-gold-400 pl-5 font-medium">
                                  💡 পরামর্শ: {st.actionTipBn}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Takeaway */}
                      <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-navy-950/50 border border-amber-200/50 dark:border-navy-800 text-xs text-slate-700 dark:text-gold-300/90 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <strong>মূল শিক্ষা: </strong>
                          <span>{lesson.keyTakeawayBn}</span>
                        </div>
                      </div>

                      {/* Action CTA */}
                      {lesson.relatedTab && (
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-xs text-slate-400">
                            এখনই এই ফিচারে গিয়ে অনুশীলন করুন:
                          </span>
                          <button
                            onClick={() => onNavigateTab(lesson.relatedTab!)}
                            className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                          >
                            <span>এই ফিচারে যান</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: MINISTRY TRAINING SCENARIOS ================= */}
      {activeSubTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-navy-950/60 border border-amber-200/60 dark:border-navy-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <h3 className="font-bold text-sm text-navy-950 dark:text-white mb-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-gold-500" />
              <span>মণ্ডলী ও ব্যক্তিগত পরিচর্যার ৬টি বাস্তব ফ্রেমওয়ার্ক</span>
            </h3>
            <span>
              আপনার পরিচর্যার ভূমিকার সাথে মানানসই ক্ষেত্রটি বেছে নিন। প্রতিটি ক্ষেত্রে সুনির্দিষ্ট পদক্ষেপ ও প্ল্যাটফর্মের সংশ্লিষ্ট টুলগুলো সংযুক্ত করা হয়েছে।
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MINISTRY_SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-400 border border-gold-500/20">
                      {scenario.roleBn}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-navy-950 dark:text-white">
                    {scenario.titleBn}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {scenario.objectiveBn}
                  </p>

                  {/* Practical steps */}
                  <div className="pt-2 space-y-1.5 border-t border-slate-100 dark:border-navy-800">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      ব্যবহারিক পদক্ষেপ:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {scenario.practicalStepsBn.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-gold-500 font-bold">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-navy-800 space-y-2">
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    <span className="text-slate-400">উপযোগী টুলস:</span>
                    {scenario.recommendedTools.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {scenario.suggestedScriptures && (
                    <div className="text-[11px] text-gold-600 dark:text-gold-400 font-medium">
                      প্রস্তাবিত শাস্ত্রসূত্র: {scenario.suggestedScriptures.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: DEVOTIONAL ROUTINES ================= */}
      {activeSubTab === 'routines' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-white">
              প্রস্তাবিত আত্মিক রুটিনসমূহ
            </h3>
            <button
              onClick={onOpenDevotionChecklist}
              className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-xs transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ইন্টারেক্টিভ চেকলিস্ট ও প্রিন্ট ভিউ খুলুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEVOTIONAL_ROUTINES.map((routine) => (
              <div
                key={routine.id}
                className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-700 dark:text-gold-300 text-xs font-bold font-mono">
                      {toBengaliDigits(routine.totalMinutes)} মিনিট
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{routine.badgeBn}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-white">
                    {routine.titleBn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{routine.subtitleBn}</p>

                  <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-navy-950/60 border border-amber-200/50 dark:border-navy-800 text-xs italic font-serif text-slate-700 dark:text-gold-300/90">
                    {routine.quoteBn}
                  </div>

                  <div className="space-y-2 pt-2">
                    {routine.steps.map((st) => (
                      <div
                        key={st.order}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-navy-800 flex items-start gap-2.5"
                      >
                        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-[10px] font-mono font-bold shrink-0 mt-0.5">
                          {st.minuteLabel}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs text-navy-950 dark:text-white">
                            {st.titleBn}
                          </h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                            {st.instructionsBn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">প্রতিদিনের অভ্যাস</span>
                  <button
                    onClick={onOpenDevotionChecklist}
                    className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1"
                  >
                    <span>চেকলিস্ট শুরু করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: SEARCHABLE HELP CENTER / FAQS ================= */}
      {activeSubTab === 'faqs' && (
        <div className="space-y-6">
          {/* FAQ Categories */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'all', label: 'সব প্রশ্ন' },
              { id: 'offline', label: '📱 অফলাইন ও ইনস্টল' },
              { id: 'reading', label: '📖 পঠন ও সেটিংস' },
              { id: 'notes', label: '✍️ নোট ও গোপনীয়তা' },
              { id: 'sermons', label: '⛪ সার্মন বিল্ডার' },
              { id: 'copyright', label: '⚖️ অনুবাদ ও স্বত্বাধিকার' },
              { id: 'general', label: '💡 সাধারণ সহায়তা' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setFaqCategoryFilter(c.id)}
                className={`px-3 py-1.5 rounded-xl font-medium transition ${
                  faqCategoryFilter === c.id
                    ? 'bg-navy-950 dark:bg-gold-500 text-white dark:text-navy-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* FAQs Accordion/Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-navy-950 dark:text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-gold-500 shrink-0" />
                    <span>{faq.questionBn}</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-[10px] font-semibold text-slate-500 shrink-0">
                    {faq.categoryLabelBn}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans pl-6">
                  {faq.answerBn}
                </p>

                {faq.relatedLessonId && (
                  <div className="pt-2 pl-6">
                    <button
                      onClick={() => {
                        setActiveSubTab('lessons');
                        setExpandedLessonId(faq.relatedLessonId!);
                      }}
                      className="text-xs font-semibold text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1"
                    >
                      <span>সম্পর্কিত পাঠ দেখুন →</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Founder Attribution & Support Card */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-serif font-bold text-sm text-navy-950 dark:text-white">
            বাংলা স্টাডি বাইবেল (Bengali Study Bible)
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            প্রকল্প প্রতিষ্ঠাতা ও প্রস্তুতকারক: <strong>রেভা. অয়ন কুমার ঘোষ</strong> |{' '}
            <a href="mailto:ayanghosh75@gmail.com" className="text-gold-600 dark:text-gold-400 hover:underline">
              ayanghosh75@gmail.com
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FacebookPageLink variant="badge" labelBn="ফেসবুক পেজে যুক্ত হন" />
        </div>
      </div>
    </div>
  );
};
