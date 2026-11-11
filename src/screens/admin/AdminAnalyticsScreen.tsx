import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Smartphone,
  BookOpen,
  Search,
  Sparkles,
  MessageSquare,
  Mail,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  UserCheck,
  UserPlus,
  Repeat,
  Download,
  Calendar,
  Layers,
  Activity,
  Globe2,
  FileText,
  Share2,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Radio,
  Filter,
  Copy,
  Check,
  ExternalLink,
  Link2,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCheck,
} from 'lucide-react';
import { AnalyticsService } from '../../services/analyticsService';
import { CampaignService, CampaignChannel, CampaignTarget } from '../../services/campaignService';
import { AnalyticsSummaryReport, TimeFilterRange, BookPopularityItem } from '../../types/analytics';
import { toBengaliDigits } from '../../utils/bengaliNumerals';
import { AdminSecurityGate } from '../../components/admin/AdminSecurityGate';
import { AdminInstallsLinksSharesTab } from '../../components/admin/AdminInstallsLinksSharesTab';

interface AdminAnalyticsScreenProps {
  onBackToApp?: () => void;
  onNavigateToFeedback?: () => void;
}

type AnalyticsSubTab =
  | 'overview'
  | 'installs_links_shares'
  | 'users'
  | 'bible'
  | 'search_study'
  | 'sermon_ask'
  | 'install_device'
  | 'traffic_global'
  | 'funnel_retention'
  | 'feedback_health'
  | 'reports_export';

export const AdminAnalyticsScreen: React.FC<AdminAnalyticsScreenProps> = ({
  onBackToApp,
  onNavigateToFeedback,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AnalyticsSubTab>('overview');
  const [timeRange, setTimeRange] = useState<TimeFilterRange>('7days');
  const [envFilter, setEnvFilter] = useState<'production' | 'development' | 'all'>('production');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [bookTestamentFilter, setBookTestamentFilter] = useState<'ALL' | 'OT' | 'NT'>('ALL');
  const [bookSearchQuery, setBookSearchQuery] = useState('');

  // Owner Campaign Link Generator state
  const [genTarget, setGenTarget] = useState<CampaignTarget>('home');
  const [genChannel, setGenChannel] = useState<CampaignChannel>('whatsapp');
  const [genCampaign, setGenCampaign] = useState<string>('gospel-outreach');
  const [genContent, setGenContent] = useState<string>('study-bible');
  const [genRef, setGenRef] = useState<string>('REV-AYAN');
  const [genCopied, setGenCopied] = useState<boolean>(false);

  const generatedCampaignUrl = useMemo(() => {
    return CampaignService.buildCampaignUrl({
      target: genTarget,
      channel: genChannel,
      campaignName: genCampaign || 'outreach',
      content: genContent || undefined,
      refCode: genRef || undefined,
      useCanonicalDomain: true,
    });
  }, [genTarget, genChannel, genCampaign, genContent, genRef]);

  const handleCopyGeneratedCampaignUrl = () => {
    navigator.clipboard.writeText(generatedCampaignUrl);
    setGenCopied(true);
    setTimeout(() => setGenCopied(false), 2500);
  };

  // Compute analytics report based on selected filters
  const report: AnalyticsSummaryReport = useMemo(() => {
    return AnalyticsService.getAnalyticsReport(
      timeRange,
      customStartDate || undefined,
      customEndDate || undefined,
      envFilter
    );
  }, [timeRange, envFilter, customStartDate, customEndDate, refreshKey]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRefreshKey((k) => k + 1);
      setIsRefreshing(false);
    }, 400);
  };

  const handleSendWeeklyEmail = async () => {
    setEmailStatus('প্রস্তুত হচ্ছে...');
    try {
      const ok = await AnalyticsService.sendWeeklyEmailSummary(report);
      if (ok) {
        setEmailStatus('✓ সাপ্তাহিক প্রতিবেদন সফলভাবে ayanghosh75@gmail.com এ সংরক্ষিত ও প্রেরণ করা হয়েছে!');
        setTimeout(() => setEmailStatus(null), 5000);
      }
    } catch {
      setEmailStatus('প্রতিবেদন প্রেরণে ত্রুটি হয়েছে।');
    }
  };

  const handleExportCsv = () => {
    try {
      const csvContent = AnalyticsService.exportAnalyticsCsv(report);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `bengali-study-bible-analytics-${report.startDate}-to-${report.endDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  const maxDau = useMemo(() => {
    if (!report.dailyActivityTrend.length) return 1;
    return Math.max(...report.dailyActivityTrend.map((d) => d.dau), 1);
  }, [report.dailyActivityTrend]);

  const maxHourly = useMemo(() => {
    return Math.max(...report.hourlyActivity.byHour, 1);
  }, [report.hourlyActivity.byHour]);

  const filteredBooks = useMemo(() => {
    return report.bookPopularity.filter((b) => {
      const matchTestament = bookTestamentFilter === 'ALL' || b.testament === bookTestamentFilter;
      const q = bookSearchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        b.nameBn.toLowerCase().includes(q) ||
        b.nameEn.toLowerCase().includes(q) ||
        b.bookId.toLowerCase().includes(q);
      return matchTestament && matchSearch;
    });
  }, [report.bookPopularity, bookTestamentFilter, bookSearchQuery]);

  return (
    <AdminSecurityGate onBackToApp={onBackToApp}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans text-stone-900 dark:text-stone-100">
        {/* Top Header Banner */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    বাংলা স্টাডি বাইবেল — ব্যবহার ও পরিসংখ্যান
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Owner Analytics Center
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
                  স্বত্বাধিকারী ও তত্ত্বাবধায়ক: <strong>রেভাঃ অয়ন কুমার ঘোষ</strong> • অফিসিয়াল যোগাযোগ:{' '}
                  <span className="font-mono text-amber-600 dark:text-amber-400">ayanghosh75@gmail.com</span>
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setActiveSubTab('installs_links_shares')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  activeSubTab === 'installs_links_shares'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>📲 ইনস্টল, লিংক ও শেয়ার</span>
              </button>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>রিফ্রেশ</span>
              </button>

              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-stone-200 dark:border-stone-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV এক্সপোর্ট</span>
              </button>

              <button
                onClick={handleSendWeeklyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>সাপ্তাহিক রিপোর্ট পাঠান</span>
              </button>
            </div>
          </div>

          {emailStatus && (
            <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{emailStatus}</span>
            </div>
          )}

          {/* Environment & Time Range Filters Bar */}
          <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Environment Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500">পরিবেশ:</span>
              <div className="inline-flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setEnvFilter('production')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    envFilter === 'production'
                      ? 'bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  প্রডাকশন (বাস্তব ব্যবহার)
                </button>
                <button
                  onClick={() => setEnvFilter('development')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    envFilter === 'development'
                      ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 font-bold shadow-sm'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  পরীক্ষামূলক / টেস্ট
                </button>
                <button
                  onClick={() => setEnvFilter('all')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    envFilter === 'all'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold shadow-sm'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  সকল ডেটা
                </button>
              </div>
            </div>

            {/* Time Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {(
                [
                  { id: 'today', label: 'আজ (Today)' },
                  { id: 'yesterday', label: 'গতকাল' },
                  { id: '7days', label: 'বিগত ৭ দিন' },
                  { id: '30days', label: 'বিগত ৩০ দিন' },
                  { id: '90days', label: 'বিগত ৯০ দিন' },
                  { id: 'year', label: 'এই বছর' },
                  { id: 'all', label: 'সর্বমোট' },
                  { id: 'custom', label: 'কাস্টম' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTimeRange(f.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                    timeRange === f.id
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Date Picker Inputs */}
          {timeRange === 'custom' && (
            <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl flex flex-wrap items-center gap-4 text-xs animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-stone-500">শুরুর তারিখ:</span>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-500">শেষের তারিখ:</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 24 & TOP KPI BOXES: "TODAY AT A GLANCE" (14 Cards) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-serif font-bold text-sm text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <span>📊 আজ এক নজরে (Today at a Glance & Key Metrics)</span>
            </h3>
            <span className="text-xs text-stone-400">পরিসর: {report.startDate} থেকে {report.endDate}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {/* 1. Today's Users */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">👥 আজকের পাঠক</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.todayUsers)}
              </div>
              <span className="text-[10px] text-stone-400">Today's Users</span>
            </div>

            {/* 2. Currently Active */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl bg-emerald-50/20">
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>বর্তমানে সক্রিয়</span>
              </span>
              <div className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400 mt-1">
                {toBengaliDigits(report.usersRecentlyActive)}
              </div>
              <span className="text-[10px] text-stone-400">Active Last 30m</span>
            </div>

            {/* 3. New Users */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 block truncate">🆕 নতুন ব্যবহারকারী</span>
              <div className="text-2xl font-bold font-serif text-sky-600 dark:text-sky-400 mt-1">
                {toBengaliDigits(report.newUsers)}
              </div>
              <span className="text-[10px] text-stone-400">First Time</span>
            </div>

            {/* 4. Returning Users */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block truncate">🔁 ফিরে আসা পাঠক</span>
              <div className="text-2xl font-bold font-serif text-amber-600 dark:text-amber-400 mt-1">
                {toBengaliDigits(report.returningUsers)}
              </div>
              <span className="text-[10px] text-stone-400">{report.returningUserPercentage}% পুনরাবৃত্তি</span>
            </div>

            {/* 5. 7-Day Active */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">📅 ৭ দিনের সক্রিয়</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.last7DaysUsers)}
              </div>
              <span className="text-[10px] text-stone-400">7-Day Active (WAU)</span>
            </div>

            {/* 6. 30-Day Active */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">📅 ৩০ দিনের সক্রিয়</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.last30DaysUsers)}
              </div>
              <span className="text-[10px] text-stone-400">30-Day Active (MAU)</span>
            </div>

            {/* 7. Observed Installs */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block truncate">📲 নিশ্চিত PWA ইনস্টল</span>
              <div className="text-2xl font-bold font-serif text-indigo-600 dark:text-indigo-400 mt-1">
                {toBengaliDigits(report.observedPwaInstalls)}
              </div>
              <span className="text-[10px] text-stone-400">Observed Installs</span>
            </div>

            {/* 8. Avg Session Time */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">⏱ গড় এনগেজড সময়</span>
              <div className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {report.engagementTime.averageDurationSeconds < 60
                  ? `${toBengaliDigits(report.engagementTime.averageDurationSeconds)} সে.`
                  : `${toBengaliDigits(Math.round(report.engagementTime.averageDurationSeconds / 60))} মিনিট`}
              </div>
              <span className="text-[10px] text-stone-400">Avg Session Time</span>
            </div>

            {/* 9. Sessions Today */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">🔄 আজকের সেশন</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.sessionMetrics.sessionsToday)}
              </div>
              <span className="text-[10px] text-stone-400">Sessions Today</span>
            </div>

            {/* 10. Bible Reads */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">📖 বাইবেল পাঠ</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.bibleUsage.chaptersReadCount)}
              </div>
              <span className="text-[10px] text-stone-400">Chapters Read</span>
            </div>

            {/* 11. Searches */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">🔎 মোট অনুসন্ধান</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.searchStats.totalSearches)}
              </div>
              <span className="text-[10px] text-stone-400">Searches</span>
            </div>

            {/* 12. Study Sessions */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">📚 স্টাডি টুলস</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.studyMetrics.studyPagesOpened)}
              </div>
              <span className="text-[10px] text-stone-400">Study Sessions</span>
            </div>

            {/* 13. Sermon Builder */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">✍️ সার্মন তৈরি</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.sermonMetrics.generationsCompleted)}
              </div>
              <span className="text-[10px] text-stone-400">Sermons Built</span>
            </div>

            {/* 14. Feedback */}
            <div className="p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <span className="text-[11px] font-semibold text-stone-500 block truncate">💬 প্রাপ্ত মতামত</span>
              <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {toBengaliDigits(report.feedbackMetrics.totalReceived)}
              </div>
              <span className="text-[10px] text-stone-400">Feedback Reports</span>
            </div>
          </div>
        </div>

        {/* SECTION 36: SUB-NAVIGATION TABS */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-2 mb-6 shadow-sm overflow-x-auto">
          <div className="flex items-center space-x-1 min-w-max text-xs font-semibold">
            {[
              { id: 'overview', label: 'সার্বিক চিত্র ও ট্রেন্ড', icon: Activity },
              { id: 'installs_links_shares', label: '📲 ইনস্টল, লিংক ও শেয়ার', icon: Smartphone },
              { id: 'users', label: 'পাঠক ও সময় ব্যয়', icon: Users },
              { id: 'bible', label: 'বাইবেল ও ৬৬ পুস্তক', icon: BookOpen },
              { id: 'search_study', label: 'অনুসন্ধান ও স্টাডি', icon: Search },
              { id: 'sermon_ask', label: 'সার্মন ও আস্ক বাইবেল', icon: Sparkles },
              { id: 'install_device', label: 'ইনস্টলেশন ও ডিভাইস', icon: Smartphone },
              { id: 'traffic_global', label: 'উৎস ও বৈশ্বিক বিস্তার', icon: Globe2 },
              { id: 'funnel_retention', label: 'যাত্রা ফানেল ও রিটেনশন', icon: TrendingUp },
              { id: 'feedback_health', label: 'মতামত ও সিস্টেম স্বাস্থ্য', icon: ShieldCheck },
              { id: 'reports_export', label: 'রিপোর্ট ও এক্সপোর্ট', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as AnalyticsSubTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    activeSubTab === tab.id
                      ? 'bg-amber-600 text-white shadow-sm font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW & TREND ================= */}
        {activeSubTab === 'overview' && (
          <div className="space-y-6">
            {/* SECTION 1: DAILY USERS LINE/BAR CHART */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                    👥 দৈনিক ব্যবহারকারী (Date vs Active Users Trend)
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    বাস্তব প্রডাকশন ডেটা অনুযায়ী দৈনিক সক্রিয় অনন্য পাঠক সেশন
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="inline-block w-3 h-3 rounded bg-amber-500" />
                  <span>সক্রিয় পাঠক (DAU)</span>
                </div>
              </div>

              {report.dailyActivityTrend.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-400">কোনো ট্রেন্ড ডেটা নেই</div>
              ) : (
                <div className="mt-6">
                  <div className="h-44 flex items-end gap-2 sm:gap-3 border-b border-stone-200 dark:border-stone-800 pb-2">
                    {report.dailyActivityTrend.map((pt) => {
                      const heightPct = Math.max(8, Math.round((pt.dau / maxDau) * 100));
                      return (
                        <div key={pt.dateKey} className="flex-1 flex flex-col items-center gap-1 group relative">
                          {/* Tooltip */}
                          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-stone-900 text-white text-[10px] px-2 py-1 rounded shadow-lg transition-all pointer-events-none whitespace-nowrap z-20">
                            {pt.dateKey}: {pt.dau} জন সক্রিয় ({pt.newUsers} নতুন, {pt.returningUsers} পুনরাবৃত্ত)
                          </div>
                          <div className="w-full max-w-[28px] bg-amber-500/20 hover:bg-amber-500/40 rounded-t-md relative flex items-end justify-center transition-all h-full">
                            <div
                              style={{ height: `${heightPct}%` }}
                              className="w-full bg-amber-600 rounded-t-md transition-all group-hover:bg-amber-500"
                            />
                          </div>
                          <span className="text-[10px] font-mono text-stone-500 truncate w-full text-center">
                            {pt.displayDateBn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 22: RECENT REAL-TIME ACTIVITY & SECTION 23: COMPARISON */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Real-time Pulse */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Radio className="w-5 h-5 text-emerald-500 animate-pulse" />
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    ⚡ সাম্প্রতিক সক্রিয় পালস (Real-time Activity)
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="text-[11px] text-stone-500">বিগত ১৫ মিনিটে সক্রিয়</span>
                    <div className="text-xl font-bold text-emerald-600 mt-0.5">
                      {toBengaliDigits(report.realtimePulse.activeSessionsLast15m)} সেশন
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                    <span className="text-[11px] text-stone-500">বিগত ৩০ মিনিটে সক্রিয়</span>
                    <div className="text-xl font-bold text-emerald-600 mt-0.5">
                      {toBengaliDigits(report.realtimePulse.activeSessionsLast30m)} সেশন
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">সক্রিয় মডিউল বন্টন:</span>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>📖 বাইবেল পঠন সেশন:</span>
                    <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
                      {toBengaliDigits(report.realtimePulse.activeModules.bibleReading)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>📚 শাস্ত্রীয় অধ্যয়ন (Study):</span>
                    <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
                      {toBengaliDigits(report.realtimePulse.activeModules.studyTools)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>🔎 অনুসন্ধান কার্যক্রম:</span>
                    <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
                      {toBengaliDigits(report.realtimePulse.activeModules.searchEngine)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>✍️ সার্মন বিল্ডার:</span>
                    <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
                      {toBengaliDigits(report.realtimePulse.activeModules.sermonBuilder)}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-400 mt-3">
                  * গোপনীয়তা নীতির কারণে কোনো ব্যক্তির নাম, অবস্থান বা ব্যক্তিগত পাঠের বিবরণ সংরক্ষণ করা হয় না।
                </p>
              </div>

              {/* Section 23: Period Comparison */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    <span>আজ বনাম গতকাল তুলনা (Today vs Yesterday)</span>
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600">
                    রিয়েল টাইম
                  </span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-4 p-2 font-semibold text-stone-500 border-b border-stone-100 dark:border-stone-800">
                    <span>মেট্রিক</span>
                    <span className="text-center">আজ</span>
                    <span className="text-center">গতকাল</span>
                    <span className="text-right">পরিবর্তন</span>
                  </div>

                  <div className="grid grid-cols-4 p-2 items-center rounded-lg bg-stone-50/70 dark:bg-stone-800/30">
                    <span className="font-medium">ব্যবহারকারী</span>
                    <span className="text-center font-mono font-bold">{toBengaliDigits(report.comparison.current.users)}</span>
                    <span className="text-center font-mono text-stone-400">{toBengaliDigits(report.comparison.previous.users)}</span>
                    <span className={`text-right font-mono font-bold ${report.comparison.percentChange.users >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {report.comparison.percentChange.users >= 0 ? '+' : ''}{toBengaliDigits(report.comparison.percentChange.users)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-4 p-2 items-center rounded-lg bg-stone-50/70 dark:bg-stone-800/30">
                    <span className="font-medium">বাইবেল পাঠ</span>
                    <span className="text-center font-mono font-bold">{toBengaliDigits(report.comparison.current.bibleReads)}</span>
                    <span className="text-center font-mono text-stone-400">{toBengaliDigits(report.comparison.previous.bibleReads)}</span>
                    <span className={`text-right font-mono font-bold ${report.comparison.percentChange.bibleReads >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {report.comparison.percentChange.bibleReads >= 0 ? '+' : ''}{toBengaliDigits(report.comparison.percentChange.bibleReads)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-4 p-2 items-center rounded-lg bg-stone-50/70 dark:bg-stone-800/30">
                    <span className="font-medium">অনুসন্ধান</span>
                    <span className="text-center font-mono font-bold">{toBengaliDigits(report.comparison.current.searches)}</span>
                    <span className="text-center font-mono text-stone-400">{toBengaliDigits(report.comparison.previous.searches)}</span>
                    <span className={`text-right font-mono font-bold ${report.comparison.percentChange.searches >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {report.comparison.percentChange.searches >= 0 ? '+' : ''}{toBengaliDigits(report.comparison.percentChange.searches)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-4 p-2 items-center rounded-lg bg-stone-50/70 dark:bg-stone-800/30">
                    <span className="font-medium">স্টাডি সেশন</span>
                    <span className="text-center font-mono font-bold">{toBengaliDigits(report.comparison.current.studySessions)}</span>
                    <span className="text-center font-mono text-stone-400">{toBengaliDigits(report.comparison.previous.studySessions)}</span>
                    <span className={`text-right font-mono font-bold ${report.comparison.percentChange.studySessions >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {report.comparison.percentChange.studySessions >= 0 ? '+' : ''}{toBengaliDigits(report.comparison.percentChange.studySessions)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-4 p-2 items-center rounded-lg bg-stone-50/70 dark:bg-stone-800/30">
                    <span className="font-medium">PWA ইনস্টলেশন</span>
                    <span className="text-center font-mono font-bold">{toBengaliDigits(report.comparison.current.installs)}</span>
                    <span className="text-center font-mono text-stone-400">{toBengaliDigits(report.comparison.previous.installs)}</span>
                    <span className={`text-right font-mono font-bold ${report.comparison.percentChange.installs >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {report.comparison.percentChange.installs >= 0 ? '+' : ''}{toBengaliDigits(report.comparison.percentChange.installs)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 1.5: INSTALLS, LINK ACCESS & SHARES ================= */}
        {activeSubTab === 'installs_links_shares' && (
          <AdminInstallsLinksSharesTab report={report} envFilter={envFilter} />
        )}

        {/* ================= TAB 2: USERS, ENGAGEMENT & SESSIONS ================= */}
        {activeSubTab === 'users' && (
          <div className="space-y-6">
            {/* SECTION 2: DAU, WAU, MAU Standard Rates */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                👥 সক্রিয় পাঠক মেট্রিক্স (DAU, WAU, MAU)
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                আন্তর্জাতিক স্ট্যান্ডার্ড অ্যাক্টিভ ইউজার পরিমাপ এবং সহজ বাংলা বিশ্লেষণ
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300">DAU — দৈনিক সক্রিয় পাঠক</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200/60 text-amber-900 font-bold">Daily Active</span>
                  </div>
                  <div className="text-3xl font-bold font-serif text-amber-900 dark:text-amber-100 my-2">
                    {toBengaliDigits(report.dauCurrent)}
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    আজকের দিনে অ্যাপ খুলে অন্তত একটি অর্থপূর্ণ কাজ (বাইবেল পাঠ, সার্চ বা স্টাডি) করেছেন এমন অনন্য পাঠক।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">WAU — সাপ্তাহিক সক্রিয় পাঠক</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900 font-bold">Weekly Active</span>
                  </div>
                  <div className="text-3xl font-bold font-serif text-emerald-900 dark:text-emerald-100 my-2">
                    {toBengaliDigits(report.wauCurrent)}
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    বিগত ৭ দিনে অন্তত একবার অ্যাপে এসে সময় দিয়েছেন এমন মোট অনন্য পাঠক সংখ্যা।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-800 dark:text-sky-300">MAU — মাসিক সক্রিয় পাঠক</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-200/60 text-sky-900 font-bold">Monthly Active</span>
                  </div>
                  <div className="text-3xl font-bold font-serif text-sky-900 dark:text-sky-100 my-2">
                    {toBengaliDigits(report.mauCurrent)}
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    বিগত ৩০ দিনের মধ্যে সক্রিয় থাকা মোট পৃথক পাঠক। দীর্ঘমেয়াদি প্রসারের প্রধান নির্দেশক।
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: NEW VS RETURNING & SECTION 4: TIME SPENT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Section 3: New vs Returning */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    🆕 নতুন বনাম ফিরে আসা পাঠক (New vs Returning)
                  </h3>
                  <span className="text-xs font-bold text-amber-600">{report.returningUserPercentage}% পুনরাবৃত্তি</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span className="text-sky-600">নতুন পাঠক: {toBengaliDigits(report.newUsers)} জন</span>
                      <span className="text-amber-600">ফিরে আসা পাঠক: {toBengaliDigits(report.returningUsers)} জন</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden flex">
                      <div
                        style={{
                          width: `${report.totalUsers > 0 ? (report.newUsers / report.totalUsers) * 100 : 50}%`,
                        }}
                        className="bg-sky-500 h-full"
                      />
                      <div
                        style={{
                          width: `${report.totalUsers > 0 ? (report.returningUsers / report.totalUsers) * 100 : 50}%`,
                        }}
                        className="bg-amber-500 h-full"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                    <p className="font-semibold text-stone-900 dark:text-stone-100 mb-1">স্বত্বাধিকারী পর্যবেক্ষণ:</p>
                    {report.returningUserPercentage >= 30 ? (
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ পাঠকেরা বাংলা স্টাডি বাইবেল নিয়মিতভাবে ব্যবহার করছেন এবং পুনরায় ফিরে আসছেন ({report.returningUserPercentage}% পুনরাবৃত্তি হার)।
                      </p>
                    ) : (
                      <p className="text-stone-600 dark:text-stone-400">
                        বর্তমানে নতুন পাঠক সংগ্রহের পর্যায়ে রয়েছে। প্রচারণা ও পিডব্লিউএ ইনস্টলেশনের মাধ্যমে পুনরাবৃত্তি বৃদ্ধি পাবে।
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Engaged Time Spent & 6 Buckets */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>⏱ ব্যবহারকারীরা কতক্ষণ ব্যবহার করছেন (Engaged Time)</span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                    <span className="text-[11px] text-stone-500">গড় সম্পৃক্ত সময়</span>
                    <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
                      {toBengaliDigits(Math.round(report.engagementTime.averageDurationSeconds / 60))} মিনিট
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                    <span className="text-[11px] text-stone-500">মধ্যক সময় (Median)</span>
                    <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
                      {toBengaliDigits(Math.round(report.engagementTime.medianDurationSeconds / 60))} মিনিট
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-semibold text-stone-600 dark:text-stone-400">সময়ভিত্তিক বাকেট বন্টন:</span>
                  {[
                    { label: '১ মিনিটের কম (Quick Glance)', count: report.engagementTime.timeBuckets.under1Min },
                    { label: '১–৫ মিনিট (Short Reading)', count: report.engagementTime.timeBuckets.oneTo5Mins },
                    { label: '৫–১৫ মিনিট (Devotional Study)', count: report.engagementTime.timeBuckets.fiveTo15Mins },
                    { label: '১৫–৩০ মিনিট (In-Depth Study)', count: report.engagementTime.timeBuckets.fifteenTo30Mins },
                    { label: '৩০–৬০ মিনিট (Deep Sermon Prep)', count: report.engagementTime.timeBuckets.thirtyTo60Mins },
                    { label: '৬০+ মিনিট (Extended Research)', count: report.engagementTime.timeBuckets.sixtyPlusMins },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-stone-50 dark:bg-stone-800/30">
                      <span>{b.label}</span>
                      <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{toBengaliDigits(b.count)} সেশন</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 5: SESSIONS & SECTION 6: HOURLY ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Section 5: Sessions Distribution */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-3">
                  🔄 সেশন বণ্টন ও পুনরাবৃত্তি (Sessions Distribution)
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                    <span className="text-[11px] text-stone-500">গড় সেশন প্রতি পাঠক</span>
                    <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
                      {toBengaliDigits(report.sessionMetrics.avgSessionsPerUser)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                    <span className="text-[11px] text-stone-500">ফিরে আসা পাঠকের গড়</span>
                    <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
                      {toBengaliDigits(report.sessionMetrics.avgSessionsPerReturningUser)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/30">
                    <span>১টি সেশন (One-time):</span>
                    <span className="font-mono font-bold">{toBengaliDigits(report.sessionMetrics.distribution.oneSession)} জন</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/30">
                    <span>২–৩টি সেশন (Occasional):</span>
                    <span className="font-mono font-bold">{toBengaliDigits(report.sessionMetrics.distribution.twoToThree)} জন</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/30">
                    <span>৪–১০টি সেশন (Regular):</span>
                    <span className="font-mono font-bold">{toBengaliDigits(report.sessionMetrics.distribution.fourToTen)} জন</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/30">
                    <span>১০+ সেশন (Power Users):</span>
                    <span className="font-mono font-bold">{toBengaliDigits(report.sessionMetrics.distribution.tenPlus)} জন</span>
                  </div>
                </div>
              </div>

              {/* Section 6: Hourly Activity & 4 Dayparts */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-3">
                  🕐 কোন সময় সবচেয়ে বেশি ব্যবহার হচ্ছে (Hourly Activity)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-center">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                    <span className="text-[10px] text-amber-800 dark:text-amber-300">সকাল (06-12)</span>
                    <div className="text-base font-bold font-mono mt-0.5">
                      {toBengaliDigits(report.hourlyActivity.byDaypart.morning)}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                    <span className="text-[10px] text-amber-800 dark:text-amber-300">দুপুর (12-17)</span>
                    <div className="text-base font-bold font-mono mt-0.5">
                      {toBengaliDigits(report.hourlyActivity.byDaypart.afternoon)}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                    <span className="text-[10px] text-amber-800 dark:text-amber-300">সন্ধ্যা (17-21)</span>
                    <div className="text-base font-bold font-mono mt-0.5">
                      {toBengaliDigits(report.hourlyActivity.byDaypart.evening)}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                    <span className="text-[10px] text-amber-800 dark:text-amber-300">রাত (21-06)</span>
                    <div className="text-base font-bold font-mono mt-0.5">
                      {toBengaliDigits(report.hourlyActivity.byDaypart.night)}
                    </div>
                  </div>
                </div>

                <div className="h-24 flex items-end gap-1 border-b border-stone-200 dark:border-stone-800 pb-1">
                  {report.hourlyActivity.byHour.map((cnt, h) => {
                    const hPct = Math.max(5, Math.round((cnt / maxHourly) * 100));
                    return (
                      <div key={h} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                        <div
                          style={{ height: `${hPct}%` }}
                          className={`w-full rounded-t-sm transition-all ${
                            h === report.hourlyActivity.peakHour ? 'bg-amber-600' : 'bg-stone-300 dark:bg-stone-700'
                          }`}
                        />
                        <span className="text-[8px] text-stone-400 mt-1">{h}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-400 mt-2">
                  <span>০:০০ (রাত)</span>
                  <span>১২:০০ (দুপুর)</span>
                  <span>২৩:০০ (রাত)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: BIBLE READING & 66-BOOK POPULARITY ================= */}
        {activeSubTab === 'bible' && (
          <div className="space-y-6">
            {/* SECTION 7: BIBLE READING ANALYTICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Read Books */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>সর্বোচ্চ পঠিত পুস্তক (Top Books)</span>
                </h3>
                {report.bibleUsage.mostReadBooks.length === 0 ? (
                  <p className="text-xs text-stone-400">কোনো পাঠ ডেটা পাওয়া যায়নি</p>
                ) : (
                  <div className="space-y-2">
                    {report.bibleUsage.mostReadBooks.slice(0, 5).map((b, i) => (
                      <div key={b.bookId} className="flex items-center justify-between p-2 rounded-xl bg-stone-50 dark:bg-stone-800/40 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-[10px]">
                            {toBengaliDigits(i + 1)}
                          </span>
                          <span className="font-bold">{b.bookNameBn}</span>
                          <span className="text-stone-400 font-mono text-[10px]">({b.bookId})</span>
                        </div>
                        <span className="font-bold font-mono text-stone-700 dark:text-stone-300">
                          {toBengaliDigits(b.reads)} বার
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Read Chapters */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>সর্বোচ্চ পঠিত অধ্যায় (Top Chapters)</span>
                </h3>
                {report.bibleUsage.mostReadChapters.length === 0 ? (
                  <p className="text-xs text-stone-400">কোনো পাঠ ডেটা পাওয়া যায়নি</p>
                ) : (
                  <div className="space-y-2">
                    {report.bibleUsage.mostReadChapters.slice(0, 5).map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-stone-50 dark:bg-stone-800/40 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-[10px]">
                            {toBengaliDigits(i + 1)}
                          </span>
                          <span className="font-bold">{c.refBn}</span>
                        </div>
                        <span className="font-bold font-mono text-stone-700 dark:text-stone-300">
                          {toBengaliDigits(c.reads)} বার
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Interactions & Bookmarks */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>পদ মিথস্ক্রিয়া ও নোট (Interactions)</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>বুকমার্ক যুক্ত হয়েছে:</span>
                    <span className="font-mono font-bold text-amber-600">{toBengaliDigits(report.bibleUsage.bookmarksCreated)}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>হাইলাইট যুক্ত হয়েছে:</span>
                    <span className="font-mono font-bold text-amber-600">{toBengaliDigits(report.bibleUsage.highlightsCreated)}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>তৈরিকৃত ব্যক্তিগত নোট:</span>
                    <span className="font-mono font-bold text-amber-600">{toBengaliDigits(report.bibleUsage.notesCreated)}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>অনুসন্ধান থেকে পদ খোলা:</span>
                    <span className="font-mono font-bold text-amber-600">{toBengaliDigits(report.bibleUsage.searchToBibleOpens)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 8: 66-BOOK POPULARITY TABLE */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                    📚 কোন বই সবচেয়ে বেশি পড়া হচ্ছে (66-Book Popularity Ranking)
                  </h3>
                  <p className="text-xs text-stone-500">
                    ওপেন, অধ্যায় পাঠ এবং এনগেজড সেশনের ভিত্তিতে সম্পূর্ণ ৬৬টি পুস্তকের জনপ্রিয়তা ক্রম
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex rounded-xl bg-stone-100 dark:bg-stone-800 p-1 text-xs">
                    <button
                      onClick={() => setBookTestamentFilter('ALL')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        bookTestamentFilter === 'ALL' ? 'bg-white dark:bg-stone-900 font-bold shadow' : 'text-stone-500'
                      }`}
                    >
                      সকল ৬৬টি
                    </button>
                    <button
                      onClick={() => setBookTestamentFilter('OT')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        bookTestamentFilter === 'OT' ? 'bg-white dark:bg-stone-900 font-bold shadow' : 'text-stone-500'
                      }`}
                    >
                      পুরাতন (৩৯)
                    </button>
                    <button
                      onClick={() => setBookTestamentFilter('NT')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        bookTestamentFilter === 'NT' ? 'bg-white dark:bg-stone-900 font-bold shadow' : 'text-stone-500'
                      }`}
                    >
                      নতুন (২৭)
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="পুস্তক খুঁজুন..."
                    value={bookSearchQuery}
                    onChange={(e) => setBookSearchQuery(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 w-36"
                  />
                </div>
              </div>

              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="sticky top-0 bg-stone-100 dark:bg-stone-800 z-10">
                    <tr className="border-b border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300">
                      <th className="py-2.5 px-3 w-12 text-center">র‍্যাংক</th>
                      <th className="py-2.5 px-3">পুস্তকের নাম</th>
                      <th className="py-2.5 px-3 w-16">কোড</th>
                      <th className="py-2.5 px-3 w-20">নিয়ম</th>
                      <th className="py-2.5 px-3 text-right">ওপেন সংখ্যা</th>
                      <th className="py-2.5 px-3 text-right">অধ্যায় পাঠ</th>
                      <th className="py-2.5 px-3 text-right">এনগেজড সেশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {filteredBooks.map((b) => (
                      <tr key={b.bookId} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                        <td className="py-2 px-3 text-center font-mono font-bold text-stone-500">
                          {toBengaliDigits(b.rank)}
                        </td>
                        <td className="py-2 px-3 font-semibold text-stone-800 dark:text-stone-200">
                          <span>{b.nameBn}</span>{' '}
                          <span className="text-stone-400 text-[10px]">({b.nameEn})</span>
                        </td>
                        <td className="py-2 px-3 font-mono text-stone-500">{b.bookId}</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.testament === 'OT' ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'}`}>
                            {b.testament === 'OT' ? 'পুরাতন' : 'নতুন'}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-mono">{toBengaliDigits(b.opens)}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-amber-600">{toBengaliDigits(b.chapterReads)}</td>
                        <td className="py-2 px-3 text-right font-mono">{toBengaliDigits(b.engagedSessions)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: SEARCH & STUDY TOOLS ================= */}
        {activeSubTab === 'search_study' && (
          <div className="space-y-6">
            {/* SECTION 9: SEARCH ANALYTICS */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Search className="w-5 h-5 text-amber-500" />
                  <span>🔎 মানুষ কী খুঁজছেন (Search Analytics)</span>
                </h3>
                <span className="text-xs text-stone-400">গোপনীয়তা-সুরক্ষিত সংক্ষেপিত কোয়েরি</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-500">মোট অনুসন্ধান</span>
                  <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.searchStats.totalSearches)}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30">
                  <span className="text-xs text-emerald-700 dark:text-emerald-400">সফল অনুসন্ধান</span>
                  <div className="text-2xl font-bold font-serif text-emerald-700 dark:text-emerald-400 mt-1">
                    {toBengaliDigits(report.searchStats.successfulSearches)}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30">
                  <span className="text-xs text-rose-700 dark:text-rose-400">ফলাফলহীন অনুসন্ধান</span>
                  <div className="text-2xl font-bold font-serif text-rose-700 dark:text-rose-400 mt-1">
                    {toBengaliDigits(report.searchStats.noResultSearches)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2.5">
                    অনুসন্ধানকৃত প্রধান বিষয়শ্রেণী:
                  </h4>
                  <div className="space-y-2">
                    {report.searchStats.commonCategories.map((c, i) => (
                      <div key={i} className="flex justify-between items-center p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 text-xs">
                        <span>{c.category}</span>
                        <span className="font-bold font-mono text-amber-600">{toBengaliDigits(c.count)} বার</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2.5">
                    শীর্ষ অনুমোদিত পাবলিক অনুসন্ধান পদ (Privacy-safe Aggregate):
                  </h4>
                  {report.searchPopularTerms.length === 0 ? (
                    <p className="text-xs text-stone-400">কোনো পাবলিক সার্চ কোয়েরি নেই</p>
                  ) : (
                    <div className="space-y-2">
                      {report.searchPopularTerms.map((t, i) => (
                        <div key={i} className="flex justify-between items-center p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 text-xs">
                          <span className="font-serif font-bold">"{t.term}"</span>
                          <span className="font-mono font-semibold">{toBengaliDigits(t.count)} বার</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 10: STUDY TOOLS USAGE */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span>📚 স্টাডি টুলস ব্যবহার (Study Usage Analytics)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2">শীর্ষ স্টাডি টপিকস:</h4>
                  {report.studyMetrics.popularTopics.length === 0 ? (
                    <p className="text-xs text-stone-400">কোনো টপিক স্টাডি রেকর্ড নেই</p>
                  ) : (
                    <div className="space-y-1.5">
                      {report.studyMetrics.popularTopics.map((t) => (
                        <div key={t.topicId} className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/30 text-xs">
                          <span>{t.titleBn}</span>
                          <span className="font-mono font-bold text-stone-600">{toBengaliDigits(t.count)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2">শীর্ষ স্টাডি চরিত্রসমূহ:</h4>
                  {report.studyMetrics.popularCharacters.length === 0 ? (
                    <p className="text-xs text-stone-400">কোনো চরিত্র স্টাডি রেকর্ড নেই</p>
                  ) : (
                    <div className="space-y-1.5">
                      {report.studyMetrics.popularCharacters.map((c) => (
                        <div key={c.characterId} className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/30 text-xs">
                          <span>{c.nameBn}</span>
                          <span className="font-mono font-bold text-stone-600">{toBengaliDigits(c.count)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2">স্টাডি টুলস এনগেজমেন্ট:</h4>
                  <div className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>ক্রস-রেফারেন্স ক্লিক:</span>
                    <span className="font-mono font-bold text-amber-600">{toBengaliDigits(report.studyMetrics.crossRefsFollowed)}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>শব্দার্থ ও স্ট্রংস স্টাডি:</span>
                    <span className="font-mono font-bold text-amber-600">{toBengaliDigits(report.studyMetrics.wordStudiesOpened)}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/40">
                    <span>স্টাডি পেজ দর্শন:</span>
                    <span className="font-mono font-bold text-amber-600">{toBengaliDigits(report.studyMetrics.studyPagesOpened)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: SERMON BUILDER & ASK BIBLE ================= */}
        {activeSubTab === 'sermon_ask' && (
          <div className="space-y-6">
            {/* SECTION 11: SERMON BUILDER ANALYTICS */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>✍️ সার্মন বিল্ডার পরিসংখ্যান (Sermon Builder Analytics)</span>
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                পালক ও শিক্ষকদের খুতবা প্রস্তুতকারক টুলসের সমষ্টিগত ব্যবহার (ব্যক্তিগত পাণ্ডুলিপি সম্পূর্ণ গোপন রাখা হয়)
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-500">বিল্ডার খোলা হয়েছে</span>
                  <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.sermonMetrics.builderOpens)}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-500">সার্মন সম্পন্ন</span>
                  <div className="text-2xl font-bold font-serif text-emerald-600 mt-1">
                    {toBengaliDigits(report.sermonMetrics.generationsCompleted)}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-500">সংরক্ষিত সার্মন</span>
                  <div className="text-2xl font-bold font-serif text-amber-600 mt-1">
                    {toBengaliDigits(report.sermonMetrics.sermonsSaved)}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-500">মুদ্রণ ও এক্সপোর্ট</span>
                  <div className="text-2xl font-bold font-serif text-sky-600 mt-1">
                    {toBengaliDigits(report.sermonMetrics.sermonsExported)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <span className="font-semibold text-stone-600 dark:text-stone-400 block mb-2">পছন্দনীয় সময়কাল (Duration Breakdown):</span>
                  <div className="space-y-1.5">
                    {Object.entries(report.sermonMetrics.durationsBreakdown).map(([d, count]) => (
                      <div key={d} className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/30">
                        <span>{d} মিনিট:</span>
                        <span className="font-mono font-bold">{toBengaliDigits(count)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-stone-600 dark:text-stone-400 block mb-2">শ্রোতামণ্ডলীর ধরণ (Audience):</span>
                  <div className="space-y-1.5">
                    {Object.entries(report.sermonMetrics.audienceBreakdown).map(([a, count]) => (
                      <div key={a} className="flex justify-between p-2 rounded-lg bg-stone-50 dark:bg-stone-800/30">
                        <span>{a}:</span>
                        <span className="font-mono font-bold">{toBengaliDigits(count)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 12: ASK BIBLE ANALYTICS */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span>🤖 আস্ক বাইবেল মেট্রিক্স (Ask Bible AI Analytics)</span>
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                শাস্ত্রীয় প্রশ্নোত্তর সিস্টেমের কার্যকারিতা ও প্রতিক্রিয়া গতি
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">প্রশ্ন জমা পড়েছে</span>
                  <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
                    {toBengaliDigits(report.askBibleMetrics.questionsSubmitted)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">সফল উত্তর</span>
                  <div className="text-xl font-bold font-mono text-emerald-600 mt-0.5">
                    {toBengaliDigits(report.askBibleMetrics.successfulAnswers)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">ব্যর্থ বা বাতিল</span>
                  <div className="text-xl font-bold font-mono text-rose-500 mt-0.5">
                    {toBengaliDigits(report.askBibleMetrics.failedAnswers)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">গড় প্রতিক্রিয়া সময়</span>
                  <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">
                    {toBengaliDigits(report.askBibleMetrics.avgResponseTimeMs)} ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: INSTALLATION & DEVICES ================= */}
        {activeSubTab === 'install_device' && (
          <div className="space-y-6">
            {/* SECTION 13: APP INSTALLATION SIGNALS VS CONFIRMED */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-indigo-500" />
                <span>📲 অ্যাপ্লিকেশন ইনস্টলেশন ফানেল (PWA Install Signals)</span>
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                ব্রাউজার প্রযুক্তি সীমাবদ্ধতার কারণে 'Install Button Click' এবং 'Confirmed OS Install' সম্পূর্ণ আলাদাভাবে পরিমাপ করা হয়েছে।
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
                  <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300">নিশ্চিত PWA ইনস্টলেশন</span>
                  <div className="text-2xl font-bold font-serif text-indigo-900 dark:text-indigo-100 mt-1">
                    {toBengaliDigits(report.observedPwaInstalls)}
                  </div>
                  <span className="text-[10px] text-stone-400">appinstalled + accepted</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-500">ইনস্টল আগ্রহ (Intent)</span>
                  <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.pwaFunnel.installButtonClicks)}
                  </div>
                  <span className="text-[10px] text-stone-400">বোতামে ক্লিক</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-500">ইনস্টল পেজ দর্শন</span>
                  <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.pwaFunnel.installPageViews)}
                  </div>
                  <span className="text-[10px] text-stone-400">/install ভিউ</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-500">iOS সাফারি নির্দেশিকা</span>
                  <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.pwaFunnel.iosInstructionsViews)}
                  </div>
                  <span className="text-[10px] text-stone-400">Share to Home</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/30 border border-stone-200 dark:border-stone-700 text-xs">
                <span className="font-semibold">ব্যবহারকারী মোড বন্টন:</span>
                <div className="grid grid-cols-3 gap-3 mt-2 text-center">
                  <div className="p-2 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <span className="text-stone-400 text-[10px]">স্ট্যান্ডঅ্যালোন PWA</span>
                    <div className="font-bold font-mono text-sm mt-0.5">{toBengaliDigits(report.modeDistribution.standalone)}</div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <span className="text-stone-400 text-[10px]">মোবাইল ব্রাউজার</span>
                    <div className="font-bold font-mono text-sm mt-0.5">{toBengaliDigits(report.modeDistribution.mobileBrowser)}</div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <span className="text-stone-400 text-[10px]">ডেস্কটপ ব্রাউজার</span>
                    <div className="font-bold font-mono text-sm mt-0.5">{toBengaliDigits(report.modeDistribution.desktopBrowser)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 14: DEVICE ANALYTICS */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                <span>📱 ডিভাইস ও অপারেটিং সিস্টেম (Device Analytics — Zero Fingerprinting)</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">Android</span>
                  <div className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.platformDistribution.android)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">iOS (iPhone/iPad)</span>
                  <div className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.platformDistribution.ios)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">Windows</span>
                  <div className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.platformDistribution.windows)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">macOS</span>
                  <div className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.platformDistribution.macOS)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">অন্যান্য</span>
                  <div className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(report.platformDistribution.other)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: TRAFFIC & GLOBAL REACH ================= */}
        {activeSubTab === 'traffic_global' && (
          <div className="space-y-6">
            {/* SECTION 15: TRAFFIC SOURCES */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-500" />
                <span>🌍 ব্যবহারকারীরা কোথা থেকে আসছেন (Traffic & Referral Sources)</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-6">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">সরাসরি (Direct)</span>
                  <div className="text-xl font-bold font-mono mt-0.5">{toBengaliDigits(report.trafficMetrics.direct)}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-emerald-600">হোয়াটসঅ্যাপ (WhatsApp)</span>
                  <div className="text-xl font-bold font-mono text-emerald-600 mt-0.5">
                    {toBengaliDigits(report.trafficMetrics.whatsapp)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-blue-600">ফেসবুক (Facebook)</span>
                  <div className="text-xl font-bold font-mono text-blue-600 mt-0.5">
                    {toBengaliDigits(report.trafficMetrics.facebook)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-amber-600">মুদ্রিত QR কোড</span>
                  <div className="text-xl font-bold font-mono text-amber-600 mt-0.5">{toBengaliDigits(report.trafficMetrics.qr)}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-purple-600">মণ্ডলী পার্টনার কিট</span>
                  <div className="text-xl font-bold font-mono text-purple-600 mt-0.5">
                    {toBengaliDigits(report.trafficMetrics.churchPartner)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-teal-600">অ্যাম্বাসেডর রেফারেল</span>
                  <div className="text-xl font-bold font-mono text-teal-600 mt-0.5">
                    {toBengaliDigits(report.trafficMetrics.ambassador)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">গুগল / সার্চ ইঞ্জিন</span>
                  <div className="text-xl font-bold font-mono mt-0.5">
                    {toBengaliDigits(report.trafficMetrics.searchEngine)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">অন্যান্য রেফারেল</span>
                  <div className="text-xl font-bold font-mono mt-0.5">
                    {toBengaliDigits(report.trafficMetrics.otherReferral)}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 16: COARSE GLOBAL REACH (ZERO GPS) */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-amber-500" />
                <span>🌍 বিশ্বব্যাপী ভৌগোলিক বিস্তার (Coarse Global Reach — Zero GPS)</span>
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                গোপনীয়তা অক্ষুণ্ণ রাখতে কোনো প্রকার জিপিএস লোকেশন ট্র্যাক করা হয় না; ব্রাউজার টাইমজোন ও লোকেল ম্যাপিং দ্বারা সংকলিত।
              </p>

              <div className="space-y-2.5">
                {report.globalReach.regions.map((r) => (
                  <div key={r.regionCode} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{r.regionNameBn}</span>
                      <span className="text-stone-400 text-[10px] block">{r.regionNameEn}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold font-mono text-sm text-stone-900 dark:text-stone-100">
                        {toBengaliDigits(r.activeUsers)} জন
                      </span>
                      <span className="text-[10px] text-stone-400 block">({toBengaliDigits(r.percentage)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 8: USER JOURNEY FUNNEL & RETENTION ================= */}
        {activeSubTab === 'funnel_retention' && (
          <div className="space-y-6">
            {/* SECTION 19: USER JOURNEY FUNNEL */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                🧭 ব্যবহারকারী যাত্রা ফানেল (User Journey Funnel)
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                অ্যাপ ওপেন থেকে শাস্ত্র পাঠ, এনগেজমেন্ট, রিটার্ন ভিজিট, এবং ইনস্টলেশন রূপান্তর
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: '১. অ্যাপ ওপেন (App Open)',
                    count: report.journeyFunnel.appOpen,
                    rate: '১০০%',
                    desc: 'ওয়েব বা অ্যাপ প্রথম খোলা',
                  },
                  {
                    step: '২. বাইবেল বা স্টাডি শুরু (Content Open)',
                    count: report.journeyFunnel.bibleOrStudyOpen,
                    rate: `${toBengaliDigits(report.journeyFunnel.conversionRates.openToContent)}%`,
                    desc: 'বাইবেল রিডার বা স্টাডি খুলেছেন',
                  },
                  {
                    step: '৩. অর্থপূর্ণ সম্পৃক্ততা (Meaningful Engagement)',
                    count: report.journeyFunnel.meaningfulEngagement,
                    rate: `${toBengaliDigits(report.journeyFunnel.conversionRates.contentToEngaged)}%`,
                    desc: 'অধ্যায় পাঠ, সার্চ, বা নোট তৈরি',
                  },
                  {
                    step: '৪. পুনরায় ফিরে আসা (Return Visit)',
                    count: report.journeyFunnel.returnVisit,
                    rate: `${toBengaliDigits(report.journeyFunnel.conversionRates.engagedToReturn)}%`,
                    desc: 'একাধিক দিন বা সেশনে ফিরে এসেছেন',
                  },
                  {
                    step: '৫. ফোনে ইনস্টল / স্ট্যান্ডঅ্যালোন (Install & PWA)',
                    count: report.journeyFunnel.installOrStandalone,
                    rate: `${toBengaliDigits(report.journeyFunnel.conversionRates.returnToInstall)}%`,
                    desc: 'হোম স্ক্রিনে ইনস্টল করে ব্যবহার',
                  },
                  {
                    step: '৬. প্রচার ও প্রতিক্রিয়া (Share & Feedback)',
                    count: report.journeyFunnel.shareOrFeedback,
                    rate: `${toBengaliDigits(report.journeyFunnel.conversionRates.installToShare)}%`,
                    desc: 'শেয়ার করেছেন বা মতামত পাঠিয়েছেন',
                  },
                ].map((s, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-stone-100">{s.step}</span>
                      <span className="text-stone-400 text-[10px] block mt-0.5">{s.desc}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">
                        {toBengaliDigits(s.count)} সেশন
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-[10px]">
                        রূপান্তর: {s.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 17: RETENTION COHORTS */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                🔁 রিটেনশন মেট্রিক্স (Retention & Habitual Return)
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                "যারা একবার ব্যবহার করছেন, তাঁরা কি আবার ফিরে আসছেন?"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-center">
                  <span className="text-xs text-stone-500">পরের দিন ফিরে আসা (Day 1 Return)</span>
                  <div className="text-2xl font-bold font-serif text-amber-600 mt-1">
                    {report.retention.nextDayReturnRate !== null
                      ? `${toBengaliDigits(report.retention.nextDayReturnRate)}%`
                      : 'তথ্য সংগৃহীত হচ্ছে'}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-center">
                  <span className="text-xs text-stone-500">৭ম দিনে ফিরে আসা (Day 7 Return)</span>
                  <div className="text-2xl font-bold font-serif text-amber-600 mt-1">
                    {report.retention.day7ReturnRate !== null
                      ? `${toBengaliDigits(report.retention.day7ReturnRate)}%`
                      : 'তথ্য সংগৃহীত হচ্ছে'}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-center">
                  <span className="text-xs text-stone-500">৩০তম দিনে ফিরে আসা (Day 30 Return)</span>
                  <div className="text-2xl font-bold font-serif text-stone-400 mt-1">
                    তথ্য সংগৃহীত হচ্ছে
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed bg-stone-50 dark:bg-stone-800/30 p-3 rounded-xl">
                {report.retention.explanationBn}
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 9: FEEDBACK & HEALTH / ERRORS ================= */}
        {activeSubTab === 'feedback_health' && (
          <div className="space-y-6">
            {/* SECTION 20: FEEDBACK STATISTICS */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-500" />
                  <span>💬 ব্যবহারকারীর মতামত ও প্রতিক্রিয়া (Feedback Statistics)</span>
                </h3>
                {onNavigateToFeedback && (
                  <button
                    onClick={onNavigateToFeedback}
                    className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>সম্পূর্ণ ফিডব্যাক ইনবক্স দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">মোট রিপোর্ট</span>
                  <div className="text-xl font-bold font-mono mt-0.5">{toBengaliDigits(report.feedbackMetrics.totalReceived)}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-amber-600">বাইবেল ও বানান সংশোধন</span>
                  <div className="text-xl font-bold font-mono text-amber-600 mt-0.5">
                    {toBengaliDigits(report.feedbackMetrics.corrections)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-rose-600">প্রযুক্তিগত সমস্যা</span>
                  <div className="text-xl font-bold font-mono text-rose-600 mt-0.5">
                    {toBengaliDigits(report.feedbackMetrics.technicalProblems)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-emerald-600">মীমাংসিত রিপোর্ট</span>
                  <div className="text-xl font-bold font-mono text-emerald-600 mt-0.5">
                    {toBengaliDigits(report.feedbackMetrics.resolvedCount)}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 21: SYSTEM HEALTH & PROBLEMS */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>⚠️ সিস্টেম স্বাস্থ্য ও ত্রুটি পরিসংখ্যান (System Health & Incident Monitoring)</span>
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                ব্যবহারের সাথে সিস্টেম স্বাস্থ্যের তুলনা করার রিয়েল-টাইম মেট্রিক্স
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">বাইবেল রিডার ত্রুটি</span>
                  <div className="text-lg font-bold font-mono text-emerald-600 mt-0.5">
                    {toBengaliDigits(report.healthMetrics.bibleReaderErrors)} (০ ত্রুটি)
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">সার্চ ইঞ্জিন ত্রুটি</span>
                  <div className="text-lg font-bold font-mono text-emerald-600 mt-0.5">
                    {toBengaliDigits(report.healthMetrics.searchErrors)} (০ ত্রুটি)
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">PWA / ক্যাশ ত্রুটি</span>
                  <div className="text-lg font-bold font-mono text-emerald-600 mt-0.5">
                    {toBengaliDigits(report.healthMetrics.pwaErrors)} (০ ত্রুটি)
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500">ওপেন ইনসিডেন্টস</span>
                  <div className="text-lg font-bold font-mono text-emerald-600 mt-0.5">
                    {toBengaliDigits(report.healthMetrics.openIncidents)} (স্বাভাবিক)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 10: REPORTS & EXPORT ================= */}
        {activeSubTab === 'reports_export' && (
          <div className="space-y-6">
            {/* SECTION 25: WEEKLY EMAIL REPORT & SECTION 26: MONTHLY REPORT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Email Report */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-500" />
                  <span>সাপ্তাহিক সংক্ষিপ্ত ইমেইল প্রতিবেদন (Weekly Email Summary)</span>
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  প্রাপক: <strong>ayanghosh75@gmail.com</strong> (কোনো স্প্যাম ছাড়া প্রতি সপ্তাহে ১টি সারাংশ)
                </p>

                <div className="bg-stone-50 dark:bg-stone-800/40 p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 font-mono text-[11px] whitespace-pre-line text-stone-800 dark:text-stone-200 max-h-60 overflow-y-auto mb-4">
                  {AnalyticsService.generateWeeklyEmailSummaryText(report)}
                </div>

                <button
                  onClick={handleSendWeeklyEmail}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>এখনই ayanghosh75@gmail.com এ প্রেরণ করুন</span>
                </button>
              </div>

              {/* Monthly Growth Report */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <span>মাসিক প্রবৃদ্ধি ও বিস্তার প্রতিবেদন (Monthly Growth Report)</span>
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  মাসের দীর্ঘমেয়াদী ব্যবহারের সারসংক্ষেপ
                </p>

                <div className="bg-stone-50 dark:bg-stone-800/40 p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 font-mono text-[11px] whitespace-pre-line text-stone-800 dark:text-stone-200 max-h-60 overflow-y-auto mb-4">
                  {AnalyticsService.generateMonthlyGrowthReport(report)}
                </div>

                <button
                  onClick={handleExportCsv}
                  className="w-full py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs transition-all border border-stone-200 dark:border-stone-700 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>সম্পূর্ণ ডেটা CSV ডাউনলোড করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminSecurityGate>
  );
};
