// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// FACEBOOK COMMUNITY & USER-RESEARCH DASHBOARD SCREEN
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import React, { useState, useMemo } from 'react';
import {
  Share2,
  Calendar,
  CheckCircle2,
  Lightbulb,
  Settings,
  RefreshCw,
  Layers,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  SocialPost,
  DayOfWeek,
  PostStatus,
  FacebookPageConfig,
  PostTemplate,
} from '../types/social';
import { SocialService } from '../services/social/socialService';
import { FacebookIntegrationService } from '../services/social/facebookIntegrationService';
import { WEEKLY_TEMPLATES } from '../data/social/socialTemplatesData';
import { SocialPostCard } from '../components/social/SocialPostCard';
import { OwnerApprovalModal } from '../components/social/OwnerApprovalModal';
import { CommunityInsightWidget } from '../components/social/CommunityInsightWidget';
import { FacebookPageLink } from '../components/social/FacebookLogo';
import { toBengaliDigits } from '../utils/bengaliNumerals';

export const SocialCommunityDashboardScreen: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'overview' | 'queue' | 'approval' | 'research' | 'settings'
  >('overview');

  const [posts, setPosts] = useState<SocialPost[]>(() => SocialService.getAllPosts());
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

  // Filters for Queue tab
  const [selectedDayFilter, setSelectedDayFilter] = useState<DayOfWeek | 'ALL'>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<PostStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Meta connection configuration state
  const [fbConfig, setFbConfig] = useState<FacebookPageConfig>(() =>
    FacebookIntegrationService.getConfig()
  );
  const [inputAppId, setInputAppId] = useState(fbConfig.appId || '');
  const [inputPageId, setInputPageId] = useState(fbConfig.pageId || '');
  const [inputPageUrl, setInputPageUrl] = useState(
    fbConfig.pageUrl || 'https://www.facebook.com/bengalistudybible'
  );
  const [inputToken, setInputToken] = useState('');
  const [isCheckingToken, setIsCheckingToken] = useState(false);
  const [tokenCheckMessage, setTokenCheckMessage] = useState<string | null>(null);

  // High-level metrics
  const metrics = useMemo(() => {
    const total = posts.length;
    const approved = posts.filter((p) => p.status === 'APPROVED').length;
    const published = posts.filter((p) => p.status === 'PUBLISHED').length;
    const readyForApproval = posts.filter(
      (p) => p.status === 'READY_FOR_APPROVAL' || p.status === 'DRAFT'
    ).length;
    const scheduled = posts.filter((p) => p.status === 'SCHEDULED').length;

    return { total, approved, published, readyForApproval, scheduled };
  }, [posts]);

  // Handle post review trigger
  const handleOpenReview = (post: SocialPost) => {
    setSelectedPost(post);
    setIsApprovalModalOpen(true);
  };

  const handlePostUpdated = (updatedPost: SocialPost) => {
    setPosts(SocialService.getAllPosts());
    setSelectedPost(updatedPost);
  };

  const handleQuickApprove = (post: SocialPost) => {
    const updated = SocialService.approvePost(post.id, 'Rev. Ayan Kumar Ghosh');
    if (updated) {
      setPosts(SocialService.getAllPosts());
    }
  };

  // Filtered queue items
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchDay = selectedDayFilter === 'ALL' || p.dayOfWeek === selectedDayFilter;
      const matchStatus = selectedStatusFilter === 'ALL' || p.status === selectedStatusFilter;
      const matchSearch =
        !searchQuery ||
        p.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.topicBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.scriptureReference.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDay && matchStatus && matchSearch;
    });
  }, [posts, selectedDayFilter, selectedStatusFilter, searchQuery]);

  // Handle Facebook Token Health Check
  const handleTestToken = async () => {
    setIsCheckingToken(true);
    setTokenCheckMessage(null);
    try {
      FacebookIntegrationService.saveConfig({
        pageUrl: inputPageUrl,
        appId: inputAppId,
        pageId: inputPageId,
      });
      const result = await FacebookIntegrationService.checkTokenHealth(inputToken, inputPageId);
      setFbConfig(FacebookIntegrationService.getConfig());
      setTokenCheckMessage(result.messageBn);
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : String(e);
      setTokenCheckMessage(`ত্রুটি: ${errMsg}`);
    } finally {
      setIsCheckingToken(false);
    }
  };

  const handleDisconnectFb = () => {
    const disconnected = FacebookIntegrationService.disconnect();
    setFbConfig(disconnected);
    setInputToken('');
    setTokenCheckMessage('ফেসবুক সংযোগ সফলভাবে বিচ্ছিন্ন করা হয়েছে। ম্যানুয়াল পাবলিশিং মোড সক্রিয়।');
  };

  const handleResetQueue = () => {
    if (window.confirm('আপনি কি সত্যিই সম্পূর্ণ ৩০ দিনের কন্টেন্ট কিউ ডিফল্ট অবস্থায় রিসেট করতে চান?')) {
      const reset = SocialService.resetToDefaultQueue();
      setPosts(reset);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Share2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  ফেসবুক সম্প্রদায় ও ইউজার রিসার্চ ইঞ্জিন
                </h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Rev. Ayan Kumar Ghosh
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1.5 max-w-3xl">
                শাস্ত্রভিত্তিক বিষয়বস্তু প্রচার • পাঠক সম্পৃক্ততা ও প্রশ্ন সংগ্রহ • ফিডব্যাক লুপের মাধ্যমে বাংলা স্টাডি বাইবেল সমৃদ্ধকরণ
              </p>
            </div>
          </div>

          {/* Facebook Official Page Button & Connection Status */}
          <div className="flex flex-wrap items-center gap-3">
            <FacebookPageLink
              pageUrl={fbConfig.pageUrl || 'https://www.facebook.com/bengalistudybible'}
              labelBn="অফিসিয়াল ফেসবুক পেজ"
              variant="button"
            />

            <div
              className={`p-3 rounded-2xl border flex items-center gap-3 ${
                fbConfig.isConnected
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-stone-100 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  fbConfig.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
                }`}
              />
              <div className="text-xs">
                <div className="font-bold">
                  {fbConfig.isConnected
                    ? fbConfig.pageName || 'মেটা পেজ সংযুক্ত'
                    : 'ম্যানুয়াল পাবলিশিং মোড'}
                </div>
                <div className="text-[11px] opacity-80">
                  {fbConfig.isConnected ? 'অটো পাবলিশিং সক্রিয়' : '১-ক্লিক কপি ও কার্ড ডাউনলোড প্রস্তুত'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Summary KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/40">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">৩০ দিনের কিউ</span>
            <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              {toBengaliDigits(metrics.total)} / ৩০
            </div>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">১০০% প্রস্তুত</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/40">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">অনুমোদনের অপেক্ষায়</span>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
              {toBengaliDigits(metrics.readyForApproval)} টি
            </div>
            <span className="text-xs text-stone-500 font-medium">রিভিউ ডেস্কে প্রস্তুত</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/40">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">স্বাক্ষরিত ও অনুমোদিত</span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {toBengaliDigits(metrics.approved)} টি
            </div>
            <span className="text-xs text-emerald-600 font-medium">প্রকাশের জন্য প্রস্তুত</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/40">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">শিডিউল করা হয়েছে</span>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
              {toBengaliDigits(metrics.scheduled)} টি
            </div>
            <span className="text-xs text-purple-600 font-medium">ক্যালেন্ডারে ধার্য</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/40 col-span-2 sm:col-span-1">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">ফেসবুকে প্রকাশিত</span>
            <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">
              {toBengaliDigits(metrics.published)} টি
            </div>
            <span className="text-xs text-sky-600 font-medium">লাইভ সামাজিক পোস্ট</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 space-x-2 overflow-x-auto pb-px scrollbar-none">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'overview'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>সার্বিক রূপরেখা ও সাত দিনের ফ্রেমওয়ার্ক</span>
        </button>

        <button
          onClick={() => setActiveSubTab('queue')}
          className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'queue'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>৩০ দিনের কন্টেন্ট কিউ ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('approval')}
          className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'approval'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>অনুমোদন ও রিভিউ ডেস্ক ({metrics.readyForApproval})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('research')}
          className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'research'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>ইউজার রিসার্চ ও পাঠক প্রতিক্রিয়া</span>
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeSubTab === 'settings'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>মেটা সংযোগ ও নীতি কনফিগারেশন</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* SUB-TAB 1: OVERVIEW & WEEKLY FRAMEWORK */}
      {/* ============================================================ */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          {/* Continuous Feedback Loop Philosophy Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-900/10 via-amber-600/10 to-transparent border border-amber-500/20">
            <div className="max-w-3xl space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>অবিচ্ছিন্ন গবেষণা ও সেবা চক্র (Continuous Value Loop)</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                সোশ্যাল পোস্ট শুধু প্রচার নয় — এটি একটি যৌথ শাস্ত্রীয় সংলাপ
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                বাংলা স্টাডি বাইবেল থেকে বিশুদ্ধ শাস্ত্রীয় বিষয়বস্তু নিয়ে ফেসবুকে মানসম্পন্ন পোস্ট তৈরি হয়। পোস্টের প্রতিক্রিয়া ও মন্তব্য থেকে আমরা বুঝতে পারি বাংলাভাষী মণ্ডলী ও শিক্ষার্থীদের প্রকৃত জিজ্ঞাসা কী। সেই সংকেতের ভিত্তিতে অ্যাপের স্টাডি নোটস, সার্মন ও রিসার্চ ডেস্কে সমাধান প্রদান করা হয়।
              </p>

              {/* Loop flowchart inline */}
              <div className="pt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                  📖 শাস্ত্রীয় তথ্য
                </span>
                <ChevronRight className="w-4 h-4 text-amber-500" />
                <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                  📱 ফেসবুক পোস্ট
                </span>
                <ChevronRight className="w-4 h-4 text-amber-500" />
                <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                  💬 পাঠক প্রতিক্রিয়া ও প্রশ্ন
                </span>
                <ChevronRight className="w-4 h-4 text-amber-500" />
                <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                  💡 প্রোডাক্ট ইনসাইটস
                </span>
                <ChevronRight className="w-4 h-4 text-amber-500" />
                <span className="px-3 py-1.5 rounded-xl bg-amber-600 text-white shadow-sm font-bold">
                  🚀 উন্নত বাংলা স্টাডি বাইবেল
                </span>
              </div>
            </div>
          </div>

          {/* 7-Day Weekly Rhythm Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  সাপ্তাহিক ৭-দিনের সুষম রূপরেখা (Weekly Editorial Framework)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  প্রতিটি দিনের জন্য নির্ধারিত ধর্মতাত্ত্বিক লক্ষ্য, রঙ এবং কল-টু-অ্যাকশন
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {WEEKLY_TEMPLATES.map((tmpl: PostTemplate) => {
                const dayPosts = posts.filter((p) => p.dayOfWeek === tmpl.dayOfWeek);
                return (
                  <div
                    key={tmpl.id}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-amber-500/40 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {tmpl.dayOfWeek}
                        </span>
                        <div
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: tmpl.accentColor }}
                        />
                      </div>

                      <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                        {tmpl.nameBn}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                        {tmpl.nameEn}
                      </p>

                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-1">
                        {tmpl.guidelinesBn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {toBengaliDigits(dayPosts.length)} টি পোস্ট প্রস্তুত
                      </span>
                      <button
                        onClick={() => {
                          setSelectedDayFilter(tmpl.dayOfWeek);
                          setActiveSubTab('queue');
                        }}
                        className="text-xs text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 font-bold inline-flex items-center gap-1"
                      >
                        <span>দেখুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 2: 30-DAY CONTENT QUEUE */}
      {/* ============================================================ */}
      {activeSubTab === 'queue' && (
        <div className="space-y-6">
          {/* Controls Bar: Search, Day Filter, Status Filter */}
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="পোস্টের শিরোনাম, পদ (যেমন: যোহন ৩:১৬), বা বিষয় অনুসন্ধান করুন..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetQueue}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  ডিফল্ট কিউ রিসেট
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-400 mr-1">বার নির্বাচন:</span>
              <button
                onClick={() => setSelectedDayFilter('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedDayFilter === 'ALL'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                সব দিন ({posts.length})
              </button>
              {(
                [
                  'MONDAY',
                  'TUESDAY',
                  'WEDNESDAY',
                  'THURSDAY',
                  'FRIDAY',
                  'SATURDAY',
                  'SUNDAY',
                ] as DayOfWeek[]
              ).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDayFilter(day)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedDayFilter === day
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Status Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-400 mr-1">অবস্থা (Status):</span>
              <button
                onClick={() => setSelectedStatusFilter('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedStatusFilter === 'ALL'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                সব স্ট্যাটাস
              </button>
              {(
                [
                  'READY_FOR_APPROVAL',
                  'APPROVED',
                  'SCHEDULED',
                  'PUBLISHED',
                ] as PostStatus[]
              ).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedStatusFilter === status
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {status === 'READY_FOR_APPROVAL' ? 'অপেক্ষমান' : status === 'APPROVED' ? 'অনুমোদিত' : status === 'SCHEDULED' ? 'শিডিউলড' : 'প্রকাশিত'}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
              <BookOpen className="w-10 h-10 mx-auto text-stone-400 mb-3" />
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
                কোনো পোস্ট মেলেনি
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => (
                <SocialPostCard
                  key={post.id}
                  post={post}
                  onOpenReview={handleOpenReview}
                  onQuickApprove={handleQuickApprove}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 3: APPROVAL DESK (REV. AYAN KUMAR GHOSH) */}
      {/* ============================================================ */}
      {activeSubTab === 'approval' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-amber-900 dark:text-amber-200">
                Rev. Ayan Kumar Ghosh ১-ট্যাপ অনুমোদন ডেস্ক
              </h3>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1">
                ধর্মতাত্ত্বিক শুদ্ধতা ও কপিরাইট যাচাই শেষে প্রতিটি পোস্ট অনুমোদন করুন অথবা প্রয়োজনীয় সংশোধন পাঠান।
              </p>
            </div>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-amber-600 text-white shrink-0 self-start sm:self-center shadow-sm">
              {toBengaliDigits(metrics.readyForApproval)} টি পোস্ট অপেক্ষমান
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts
              .filter((p) => p.status === 'READY_FOR_APPROVAL' || p.status === 'DRAFT')
              .map((post) => (
                <SocialPostCard
                  key={post.id}
                  post={post}
                  onOpenReview={handleOpenReview}
                  onQuickApprove={handleQuickApprove}
                />
              ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 4: COMMUNITY RESEARCH & INSIGHTS WIDGET */}
      {/* ============================================================ */}
      {activeSubTab === 'research' && <CommunityInsightWidget />}

      {/* ============================================================ */}
      {/* SUB-TAB 5: META CONNECTION SETTINGS */}
      {/* ============================================================ */}
      {activeSubTab === 'settings' && (
        <div className="max-w-3xl space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                মেটা ফেসবুক পেজ এপিআই কনফিগারেশন
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                মেটা গ্রাফ এপিআই (v20.0) এর মাধ্যমে স্বয়ংক্রিয় শিডিউলিং ও পাবলিশিং সক্রিয় করার কনসোল
              </p>
            </div>

            {/* Status notice */}
            <div
              className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                fbConfig.isConnected
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
              }`}
            >
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">
                  {fbConfig.isConnected
                    ? `সংযুক্ত: ${fbConfig.pageName} (Page ID: ${fbConfig.pageId})`
                    : 'বর্তমানে ফেসবুক মেটা এপিআই সংযোগ নিষ্ক্রিয় — ম্যানুয়াল পাবলিশিং মোড সক্রিয়'}
                </span>
                <p className="leading-relaxed">
                  টোকেন কনফিগার না থাকলেও কোনো সমস্যা নেই! আমাদের সিস্টেমে ১-ক্লিকে যেকোনো পোস্টের সম্পূর্ণ টেক্সট কপি করা যায় এবং ১০৮০×১০৮০ এইচডি কার্ড সরাসরি ডাউনলোড করে আপনার ফেসবুক পেজে পোস্ট করা যায়।
                </p>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  মেটা অ্যাপ আইডি (Meta App ID - ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={inputAppId}
                  onChange={(e) => setInputAppId(e.target.value)}
                  placeholder="যেমন: 102938475610293"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  ফেসবুক পেজ আইডি (Facebook Page ID)
                </label>
                <input
                  type="text"
                  value={inputPageId}
                  onChange={(e) => setInputPageId(e.target.value)}
                  placeholder="যেমন: 102938475610293"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  ফেসবুক পেজ ওয়েব ইউআরএল (Facebook Page URL)
                </label>
                <input
                  type="url"
                  value={inputPageUrl}
                  onChange={(e) => setInputPageUrl(e.target.value)}
                  placeholder="https://www.facebook.com/bengalistudybible"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-sm font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  যেকোনো ব্যবহারকারী ওয়েবসাইটে ফেসবুক লোগো ক্লিক করলে সরাসরি এই পেজে পৌঁছে যাবেন।
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  মেটা পেজ অ্যাক্সেস টোকেন (Page Access Token)
                </label>
                <input
                  type="password"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="EAA..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-sm font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  টোকেনে অবশ্যই <code className="text-amber-600 font-mono">pages_manage_posts</code> এবং <code className="text-amber-600 font-mono">pages_read_engagement</code> পারমিশন থাকতে হবে।
                </p>
              </div>

              {tokenCheckMessage && (
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-mono text-stone-700 dark:text-stone-300">
                  {tokenCheckMessage}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleTestToken}
                  disabled={isCheckingToken}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isCheckingToken ? 'animate-spin' : ''}`} />
                  <span>{isCheckingToken ? 'যাচাই করা হচ্ছে...' : 'টোকেন পরীক্ষা ও সংরক্ষণ'}</span>
                </button>

                {fbConfig.isConnected && (
                  <button
                    onClick={handleDisconnectFb}
                    className="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-colors"
                  >
                    সংযোগ বিচ্ছিন্ন করুন
                  </button>
                )}
              </div>
            </div>

            {/* Policy & Security Notice */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-xs space-y-2 text-stone-500">
              <div className="font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>নিরাপত্তা ও গোপনীয়তা নীতি</span>
              </div>
              <p>
                ১. আপনার মেটা এপিআই ক্রেডেনশিয়ালস শুধুমাত্র আপনার ব্রাউজারে সুরক্ষিতভাবে সংরক্ষিত থাকে। কোনো বহিরাগত সার্ভারে টোকেন সঞ্চয় করা হয় না।
              </p>
              <p>
                ২. সিস্টেমটি কোনো কৃত্রিম মেক-বিলিভ স্ট্যাটাস দেয় না। বাস্তব মেটা রেসপন্স ছাড়া কোনো পোস্টকে "স্বয়ংক্রিয়ভাবে প্রকাশিত" বলা হয় না।
              </p>
              <p>
                ৩. অফিসিয়াল পরিচালক: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Owner Review & Approval Modal */}
      <OwnerApprovalModal
        post={selectedPost}
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onPostUpdated={handlePostUpdated}
      />
    </div>
  );
};
