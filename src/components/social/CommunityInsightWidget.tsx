// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// COMMUNITY RESEARCH & PRODUCT INSIGHTS WIDGET
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Plus,
  Lightbulb,
} from 'lucide-react';
import {
  CommunityQuestion,
  ProductInsight,
  InsightCategory,
} from '../../types/social';
import { CommunityResearchService } from '../../services/social/communityResearchService';
import { INSIGHT_CATEGORIES } from '../../data/social/socialCategoriesData';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

export const CommunityInsightWidget: React.FC = () => {
  const [questions, setQuestions] = useState<CommunityQuestion[]>(() =>
    CommunityResearchService.getAllQuestions()
  );
  const [insights, setInsights] = useState<ProductInsight[]>(() =>
    CommunityResearchService.getAllProductInsights()
  );
  const [activeCategory, setActiveCategory] = useState<InsightCategory | 'ALL'>('ALL');
  const [activeView, setActiveView] = useState<'QUESTIONS' | 'PRODUCT_INSIGHTS'>('QUESTIONS');

  // Form states for new question
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCategory, setNewCategory] = useState<InsightCategory>('BIBLE_QUESTION');
  const [newTopic, setNewTopic] = useState('');

  // Form states for new insight
  const [isAddingInsight, setIsAddingInsight] = useState(false);
  const [newInsightTitle, setNewInsightTitle] = useState('');
  const [newInsightCategory, setNewInsightCategory] = useState<InsightCategory>('TOPIC_REQUEST');
  const [newInsightSignal, setNewInsightSignal] = useState('');
  const [newInsightFeature, setNewInsightFeature] = useState('');

  const summary = CommunityResearchService.getResearchSummary();

  const handleUpvote = (id: string) => {
    const updated = CommunityResearchService.upvoteQuestion(id);
    if (updated) {
      setQuestions(CommunityResearchService.getAllQuestions());
    }
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    CommunityResearchService.addQuestion({
      questionTextBn: newQuestionText.trim(),
      category: newCategory,
      relatedTopic: newTopic.trim() || undefined,
      votesOrCount: 1,
      status: 'NEW',
    });

    setQuestions(CommunityResearchService.getAllQuestions());
    setNewQuestionText('');
    setNewTopic('');
    setIsAddingQuestion(false);
  };

  const handleCreateInsight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInsightTitle.trim() || !newInsightFeature.trim()) return;

    CommunityResearchService.addProductInsight({
      titleBn: newInsightTitle.trim(),
      category: newInsightCategory,
      signalDescriptionBn: newInsightSignal.trim(),
      recommendedFeatureOrContentBn: newInsightFeature.trim(),
      requestCount: 1,
      priority: 'MEDIUM',
      status: 'PENDING_REVIEW',
    });

    setInsights(CommunityResearchService.getAllProductInsights());
    setNewInsightTitle('');
    setNewInsightSignal('');
    setNewInsightFeature('');
    setIsAddingInsight(false);
  };

  const filteredQuestions = questions.filter(
    (q) => activeCategory === 'ALL' || q.category === activeCategory
  );

  const filteredInsights = insights.filter(
    (i) => activeCategory === 'ALL' || i.category === activeCategory
  );

  return (
    <div className="space-y-6">
      {/* Research Loop Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400">সংগৃহীত প্রশ্ন ও প্রতিক্রিয়া</span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            {toBengaliDigits(summary.totalQuestions)} টি
          </div>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">ফেসবুক কমেন্ট সংকেত</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400">সক্রিয় প্রোডাক্ট ইনসাইট</span>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
            {toBengaliDigits(summary.activeInsights)} টি
          </div>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">অ্যাপ ও কন্টেন্ট চাহিদা</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400">সমাধানকৃত জিজ্ঞাসা</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {toBengaliDigits(summary.addressedQuestions)} টি
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">স্টাডি ও নোটে উত্তরিত</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400">শীর্ষ কাঙ্ক্ষিত বিষয়</span>
          <div className="text-base font-bold text-stone-900 dark:text-stone-100 mt-1 truncate">
            {summary.topRequestedTopics[0]?.topic || 'প্রার্থনা'}
          </div>
          <span className="text-xs text-rose-500 font-medium">সর্বোচ্চ পাঠক চাহিদা</span>
        </div>
      </div>

      {/* Navigation Switch & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('QUESTIONS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
              activeView === 'QUESTIONS'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>পাঠক প্রতিক্রিয়া ও প্রশ্ন ({filteredQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveView('PRODUCT_INSIGHTS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
              activeView === 'PRODUCT_INSIGHTS'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>প্রোডাক্ট ও স্টাডি ইনসাইটস ({filteredInsights.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeView === 'QUESTIONS' ? (
            <button
              onClick={() => setIsAddingQuestion(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন কমেন্ট বা প্রশ্ন যোগ করুন</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAddingInsight(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ইনসাইট তৈরি করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeCategory === 'ALL'
              ? 'bg-amber-600 text-white'
              : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50'
          }`}
        >
          সব ক্যাটাগরি
        </button>
        {INSIGHT_CATEGORIES.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === cat.category
                ? 'bg-amber-600 text-white'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50'
            }`}
          >
            {cat.nameBn}
          </button>
        ))}
      </div>

      {/* Form: Add Question Modal/Drawer */}
      {isAddingQuestion && (
        <form
          onSubmit={handleCreateQuestion}
          className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              ফেসবুক কমেন্ট বা পাঠকের প্রশ্ন যুক্ত করুন
            </h4>
            <button
              type="button"
              onClick={() => setIsAddingQuestion(false)}
              className="text-xs text-stone-500 hover:underline"
            >
              বাতিল
            </button>
          </div>

          <textarea
            required
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="ফেসবুক পোস্টের নিচে পাঠক কী প্রশ্ন বা জিজ্ঞাসা করেছেন..."
            className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm"
            rows={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                শ্রেণীবিভাগ (Category)
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as InsightCategory)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
              >
                {INSIGHT_CATEGORIES.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.nameBn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                সম্পর্কিত বিষয় বা পুস্তক (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="যেমন: প্রকাশিত বাক্য, ত্রিত্ব, প্রার্থনা"
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              প্রশ্ন সংরক্ষণ করুন
            </button>
          </div>
        </form>
      )}

      {/* Form: Add Insight Modal/Drawer */}
      {isAddingInsight && (
        <form
          onSubmit={handleCreateInsight}
          className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              সম্প্রদায়ের চাহিদা থেকে নতুন ইনসাইট তৈরি করুন
            </h4>
            <button
              type="button"
              onClick={() => setIsAddingInsight(false)}
              className="text-xs text-stone-500 hover:underline"
            >
              বাতিল
            </button>
          </div>

          <input
            required
            type="text"
            value={newInsightTitle}
            onChange={(e) => setNewInsightTitle(e.target.value)}
            placeholder="ইনসাইটের শিরোনাম (যেমন: প্রকাশিত বাক্য অধ্যায়ভিত্তিক গাইড)"
            className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                ক্যাটাগরি
              </label>
              <select
                value={newInsightCategory}
                onChange={(e) => setNewInsightCategory(e.target.value as InsightCategory)}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
              >
                {INSIGHT_CATEGORIES.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.nameBn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                কমিউনিটি সিগন্যাল বিবরণ
              </label>
              <input
                type="text"
                value={newInsightSignal}
                onChange={(e) => setNewInsightSignal(e.target.value)}
                placeholder="যেমন: ৩০ জনেরও বেশি পাঠক মন্তব্য করেছেন..."
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
              প্রস্তাবিত সমাধান বা ফিচার
            </label>
            <textarea
              required
              value={newInsightFeature}
              onChange={(e) => setNewInsightFeature(e.target.value)}
              placeholder="বাংলা স্টাডি বাইবেল অ্যাপে কী কন্টেন্ট বা টুল যোগ করা উচিত..."
              className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
              rows={2}
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              ইনসাইট সংরক্ষণ করুন
            </button>
          </div>
        </form>
      )}

      {/* Main List Area: Questions or Insights */}
      {activeView === 'QUESTIONS' ? (
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
              <MessageSquare className="w-8 h-8 mx-auto text-stone-400 mb-2" />
              <p className="text-sm text-stone-500">এই বিভাগে কোনো প্রশ্ন জমা পড়েনি।</p>
            </div>
          ) : (
            filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-start justify-between gap-4 hover:border-amber-500/40 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      {q.category}
                    </span>
                    {q.relatedTopic && (
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        • {q.relatedTopic}
                      </span>
                    )}
                    <span className="text-[11px] text-stone-400">
                      {new Date(q.receivedAt).toLocaleDateString('bn-BD')}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    "{q.questionTextBn}"
                  </p>

                  {q.productInsightBn && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300">
                      <span className="font-bold">প্রোডাক্ট সমাধান:</span> {q.productInsightBn}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleUpvote(q.id)}
                  className="inline-flex flex-col items-center justify-center p-2 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 transition-colors shrink-0"
                  title="এই প্রশ্নে পাঠকের আগ্রহ বৃদ্ধি করুন"
                >
                  <ThumbsUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-bold mt-1">
                    {toBengaliDigits(q.votesOrCount || 1)}
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInsights.length === 0 ? (
            <div className="col-span-2 text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
              <Lightbulb className="w-8 h-8 mx-auto text-stone-400 mb-2" />
              <p className="text-sm text-stone-500">এই বিভাগে কোনো ইনসাইট পাওয়া যায়নি।</p>
            </div>
          ) : (
            filteredInsights.map((ins) => (
              <div
                key={ins.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-3 hover:border-amber-500/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      {ins.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                      অগ্রাধিকার: {ins.priority}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                    {ins.titleBn}
                  </h4>

                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      কমিউনিটি সংকেত ({toBengaliDigits(ins.requestCount)} জন):
                    </span>{' '}
                    {ins.signalDescriptionBn}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <span className="font-bold block">বাস্তবায়ন পরিকল্পনা:</span>
                    <p>{ins.recommendedFeatureOrContentBn}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400">
                    স্ট্যাটাস: <span className="font-bold text-stone-600 dark:text-stone-300">{ins.status}</span>
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {new Date(ins.identifiedAt).toLocaleDateString('bn-BD')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
