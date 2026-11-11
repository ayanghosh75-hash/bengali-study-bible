import React, { useState, useMemo } from 'react';
import {
  Smartphone,
  Share2,
  ExternalLink,
  Link2,
  Users,
  UserCheck,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Copy,
  Check,
  Clock,
  TrendingUp,
  Activity,
  Globe2,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCheck,
  Info,
  Sparkles,
  QrCode,
  Send,
  MessageCircle,
} from 'lucide-react';
import { AnalyticsSummaryReport } from '../../types/analytics';
import { CampaignService, CampaignChannel, CampaignTarget } from '../../services/campaignService';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

interface AdminInstallsLinksSharesTabProps {
  report: AnalyticsSummaryReport;
  envFilter: 'production' | 'development' | 'all';
}

export const AdminInstallsLinksSharesTab: React.FC<AdminInstallsLinksSharesTabProps> = ({
  report,
  envFilter,
}) => {
  const metrics = report.installLinkShare;

  // Owner Campaign Link Generator state
  const [genTarget, setGenTarget] = useState<CampaignTarget>('home');
  const [genChannel, setGenChannel] = useState<CampaignChannel>('whatsapp');
  const [genCampaign, setGenCampaign] = useState<string>('gospel-outreach');
  const [genContent, setGenContent] = useState<string>('study-bible');
  const [genRef, setGenRef] = useState<string>('REV-AYAN');
  const [genCopied, setGenCopied] = useState<boolean>(false);

  // Active Comparison Tab
  const [comparisonPeriod, setComparisonPeriod] = useState<'todayVsYesterday' | 'weekVsLastWeek' | 'monthVsLastMonth'>('todayVsYesterday');

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

  // Helper for percentage
  const getPct = (value: number, total: number) => {
    if (!total || total <= 0) return 0;
    return Math.round((value / total) * 100);
  };

  const getDelta = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 100 : 0;
    return Math.round(((curr - prev) / prev) * 100);
  };

  // Total devices sum for platform breakdown
  const totalDevices = useMemo(() => {
    const { android, ios, windows, macOS, other } = metrics.deviceBreakdown;
    return android + ios + windows + macOS + other;
  }, [metrics.deviceBreakdown]);

  // Selected comparison data
  const compData = metrics.comparisons[comparisonPeriod];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ================= HEADER BANNER ================= */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent dark:from-amber-950/30 dark:via-stone-900 border border-amber-200/80 dark:border-amber-900/50 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  📲 ইনস্টল, লিংক ব্যবহার ও শেয়ার
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  INSTALLS, LINK ACCESS & SHARES
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>বাস্তব উৎপাদন ডেটা (Real Production Only)</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-3xl">
                কোনো অনুমান বা স্থানধারক (placeholder) সংখ্যা নেই। শুধুমাত্র বাস্তব ব্রাউজার ইভেন্ট ও পর্যবেক্ষণযোগ্য প্রডাকশন সংকেত।
                বট, ক্রলার এবং অ্যাডমিনের টেস্ট সেশন প্রডাকশন ডেটা থেকে স্বয়ংক্রিয়ভাবে বাদ দেওয়া হয়।
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="text-right text-xs">
              <span className="text-stone-400 block">বর্তমান ফিল্টার মোড:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {envFilter === 'production' ? '✓ প্রডাকশন (বাস্তব ব্যবহার)' : envFilter === 'development' ? 'টেস্ট / ডেভেলপার' : 'সকল ডেটা'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 11 SUMMARY CARDS ================= */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-serif font-bold text-sm text-stone-700 dark:text-stone-300 flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-600" />
            <span>📊 ১১টি সারসংক্ষেপ কার্ড (Summary Cards)</span>
          </h3>
          <span className="text-xs text-stone-400">পরিসর: {report.startDate} থেকে {report.endDate}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Card 1: Observed Mobile/PWA Installs */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">১. পর্যবেক্ষিত মোবাইল/PWA ইনস্টল</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Download className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.observedMobileInstalls)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              প্রম্পট গ্রহণ: <strong>{toBengaliDigits(metrics.installPromptsAccepted)}</strong> • appinstalled: <strong>{toBengaliDigits(metrics.appinstalledEvents)}</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-amber-500 shrink-0" />
              <span>Observed Mobile/PWA Installs (ব্রাউজার নিশ্চিত)</span>
            </div>
          </div>

          {/* Card 2: Probable Installed Users */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">২. অনুমিত ইনস্টলকারী পাঠক</span>
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Smartphone className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.probableInstalledUsers)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              স্ট্যান্ডঅ্যালোন মোড সেশন: <strong>{toBengaliDigits(metrics.standaloneLaunches)}</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-indigo-500 shrink-0" />
              <span>Probable Installed Users (হোমস্ক্রিন বা স্ট্যান্ডঅ্যালোন)</span>
            </div>
          </div>

          {/* Card 3: Active Installed-App Users */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">৩. সক্রিয় ইনস্টল্ড অ্যাপ পাঠক</span>
              <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <UserCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.activeInstalledUsers)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              পুনরাবৃত্ত স্ট্যান্ডঅ্যালোন পাঠক: <strong>{toBengaliDigits(metrics.returningStandaloneUsers)}</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-teal-500 shrink-0" />
              <span>Active Installed-App Users (ইনস্টল্ড অ্যাপে পাঠরত)</span>
            </div>
          </div>

          {/* Card 4: Total Public-Link Opens */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">৪. মোট পাবলিক-লিংক ওপেন</span>
              <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Globe2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.totalPublicLinkOpens)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              মোট পাবলিক সেশন: <strong>{toBengaliDigits(metrics.totalSessions)}</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-sky-500 shrink-0" />
              <span>Total Public-Link Opens (ওয়েব ও রেফারাল পেজভিউ)</span>
            </div>
          </div>

          {/* Card 5: Privacy-Safe Unique Link Visitors */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">৫. স্বতন্ত্র লিংক পরিদর্শক</span>
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.uniqueLinkVisitors)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              নতুন পাঠক: <strong>{toBengaliDigits(metrics.newLinkVisitors)}</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-amber-500 shrink-0" />
              <span>Privacy-Safe Unique Link Visitors (ব্যক্তিগত কুকিহীন)</span>
            </div>
          </div>

          {/* Card 6: Returning Link Visitors */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">৬. ফিরে আসা লিংক পরিদর্শক</span>
              <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.returningLinkVisitors)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              রিটার্ন অনুপাত: <strong>{toBengaliDigits(getPct(metrics.returningLinkVisitors, metrics.uniqueLinkVisitors))}%</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-orange-500 shrink-0" />
              <span>Returning Link Visitors (পূর্বে এসে পুনরায় প্রবেশ)</span>
            </div>
          </div>

          {/* Card 7: Total Share Actions */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">৭. মোট শেয়ার পদক্ষেপ</span>
              <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.totalShareActions)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              শুরু প্রক্রিয়া: <strong>{toBengaliDigits(metrics.shareInitiated)}</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-rose-500 shrink-0" />
              <span>Total Share Actions (অ্যাপের ভেতর শেয়ার বোতাম ক্লিক)</span>
            </div>
          </div>

          {/* Card 8: Successful Shares Where Detectable */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">৮. শনাক্তযোগ্য সফল শেয়ার</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.successfulSharesDetectable)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              সিস্টেম: <strong>{toBengaliDigits(metrics.nativeShareCompleted)}</strong> • কপি: <strong>{toBengaliDigits(metrics.copyLinkActions)}</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>Successful Shares Where Detectable (সিস্টেম নিশ্চিত)</span>
            </div>
          </div>

          {/* Card 9: Shared-Link Opens */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">৯. শেয়ারকৃত লিংক ওপেন</span>
              <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.sharedLinkOpens)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              শেয়ার ইনবাউন্ড পেজভিউ
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-purple-500 shrink-0" />
              <span>Shared-Link Opens (ref=share বা শেয়ার লিংকে ক্লিক)</span>
            </div>
          </div>

          {/* Card 10: Visitors Acquired Through Shares */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">১০. শেয়ারের মাধ্যমে অর্জিত পাঠক</span>
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.visitorsAcquiredThroughShares)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              অনন্য ভিজিটর: <strong>{toBengaliDigits(metrics.sharedLinkUniqueVisitors)}</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-blue-500 shrink-0" />
              <span>Visitors Acquired Through Shares (স্বতন্ত্র পরিদর্শক)</span>
            </div>
          </div>

          {/* Card 11: Install Signals Following Shared-Link Visits */}
          <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:border-amber-400 transition-colors group relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">১১. শেয়ার ভিজিটের পর ইনস্টল সংকেত</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-2">
              {toBengaliDigits(metrics.installSignalsFollowingSharedVisits)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              শেয়ার-টু-ইনস্টল রূপান্তর: <strong>{toBengaliDigits(getPct(metrics.installSignalsFollowingSharedVisits, metrics.sharedLinkUniqueVisitors))}%</strong>
            </p>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-stone-100 dark:border-stone-800 pt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>Install Signals Following Shared-Link Visits</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PART 2: MOBILE/PWA INSTALL TRACKING ================= */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Smartphone className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            📱 মোবাইল ও PWA ইনস্টলেশন ট্র্যাকিং (Mobile & PWA Install Tracking)
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          ইনস্টলেশন আগ্রহ (Intent) এবং ব্রাউজার নিশ্চিত ইনস্টলেশন (Confirmed) পৃথকভাবে ট্র্যাক করা হয়।
        </p>

        {/* Essential Rule Alert */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 rounded-2xl mb-6 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>কঠোর নীতিগত নীতি:</strong> ইনস্টল বোতাম ক্লিক বা নির্দেশিকা দেখা কখনোই "নিশ্চিত ইনস্টলেশন" হিসেবে গণ্য করা হয় না।
            শুধুমাত্র ব্রাউজারের <code className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 font-mono text-[11px]">appinstalled</code> ইভেন্ট গ্রহণ,
            প্রম্পট অ্যাক্সেপ্ট বা সরাসরি স্ট্যান্ডঅ্যালোন মোডে অ্যাপ লঞ্চই নিশ্চিত বা পর্যবেক্ষিত ইনস্টলেশন হিসেবে পরিগণিত হয়।
          </div>
        </div>

        {/* Intent vs Confirmed Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Installation Intent */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 flex items-center gap-2">
                <span>🎯 ইনস্টলেশন আগ্রহ (Installation Intent)</span>
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-mono">
                Intent Signals
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                <span className="text-stone-600 dark:text-stone-400">ইনস্টল বোতামে ক্লিক:</span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-base">
                  {toBengaliDigits(metrics.installButtonClicks)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                <span className="text-stone-600 dark:text-stone-400">ইনস্টলেশন প্রম্পট প্রদর্শিত:</span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-base">
                  {toBengaliDigits(metrics.installPromptsShown)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                <span className="text-stone-600 dark:text-stone-400">iOS হোমস্ক্রিন নির্দেশিকা প্রদর্শন:</span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-base">
                  {toBengaliDigits(metrics.iosInstructionViews)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Confirmed / Observed Installation */}
          <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>✅ নিশ্চিত ও পর্যবেক্ষিত ইনস্টলেশন (Confirmed)</span>
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-mono">
                Confirmed Telemetry
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-800/40">
                <span className="text-stone-600 dark:text-stone-400">ইনস্টলেশন প্রম্পট গ্রহণ:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                  {toBengaliDigits(metrics.installPromptsAccepted)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-800/40">
                <span className="text-stone-600 dark:text-stone-400">ব্রাউজার রিপোর্ট করা appinstalled ইভেন্ট:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                  {toBengaliDigits(metrics.appinstalledEvents)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-800/40">
                <span className="text-stone-600 dark:text-stone-400">স্ট্যান্ডঅ্যালোন PWA মোডে লঞ্চ:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                  {toBengaliDigits(metrics.standaloneLaunches)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-800/40">
                <span className="text-stone-600 dark:text-stone-400">অনুমিত iOS হোমস্ক্রিন ইনস্টলেশন:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                  {toBengaliDigits(metrics.probableIosInstalls)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div>
          <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>অপারেটিং সিস্টেম ও প্ল্যাটফর্ম বন্টন (Operating System Breakdown)</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            {[
              { id: 'android', label: 'Android', count: metrics.deviceBreakdown.android },
              { id: 'ios', label: 'iOS (Safari / A2HS)', count: metrics.deviceBreakdown.ios },
              { id: 'windows', label: 'Windows', count: metrics.deviceBreakdown.windows },
              { id: 'macOS', label: 'macOS', count: metrics.deviceBreakdown.macOS },
              { id: 'other', label: 'অন্যান্য (Other)', count: metrics.deviceBreakdown.other },
            ].map((d) => {
              const pct = totalDevices > 0 ? Math.round((d.count / totalDevices) * 100) : 0;
              return (
                <div key={d.id} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{d.label}</span>
                    <span className="font-mono text-stone-400">{pct}%</span>
                  </div>
                  <div className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                    {toBengaliDigits(d.count)}
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      style={{ width: `${Math.max(pct, d.count > 0 ? 5 : 0)}%` }}
                      className="bg-amber-600 h-full rounded-full transition-all"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= PART 3: PUBLIC-LINK ACCESS TRACKING & CAMPAIGN GENERATOR ================= */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Globe2 className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            🌐 পাবলিক-লিংক ব্যবহার ও প্রচার ট্র্যাকিং (Public-Link Access & Outreach)
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          সোশ্যাল মিডিয়া, মেসেঞ্জার, চার্চ পার্টনার ও কিউআর কোডের মাধ্যমে সার্বিক প্রবেশ পরিসংখ্যান।
        </p>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 text-xs">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">মোট লিংক ওপেন</span>
            <div className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mt-0.5">
              {toBengaliDigits(metrics.totalPublicLinkOpens)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">স্বতন্ত্র পরিদর্শক</span>
            <div className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mt-0.5">
              {toBengaliDigits(metrics.uniqueLinkVisitors)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">ফিরে আসা পরিদর্শক</span>
            <div className="text-lg font-bold font-serif text-amber-600 mt-0.5">
              {toBengaliDigits(metrics.returningLinkVisitors)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">অর্থপূর্ণ সম্পৃক্ত সেশন</span>
            <div className="text-lg font-bold font-serif text-emerald-600 mt-0.5">
              {toBengaliDigits(metrics.engagedSessions)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">গড় সম্পৃক্ততার সময়</span>
            <div className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 mt-0.5">
              {toBengaliDigits(metrics.avgEngagedTimeSeconds)} সেঃ
            </div>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">লিংক-টু-ইনস্টল হার</span>
            <div className="text-lg font-bold font-serif text-indigo-600 mt-0.5">
              {toBengaliDigits(metrics.linkVisitorToInstallConversion)}%
            </div>
          </div>
        </div>

        {/* Traffic Sources Grid */}
        <div className="mb-8">
          <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
            <span>উৎস অনুযায়ী ট্রাফিক (Access by Traffic Source)</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            {[
              { label: 'Direct / ম্যানুয়াল', count: metrics.sources.direct, color: 'text-stone-800 dark:text-stone-200' },
              { label: 'WhatsApp', count: metrics.sources.whatsapp, color: 'text-emerald-600' },
              { label: 'Facebook', count: metrics.sources.facebook, color: 'text-blue-600' },
              { label: 'Messenger', count: metrics.sources.messenger, color: 'text-indigo-600' },
              { label: 'Email', count: metrics.sources.email, color: 'text-amber-600' },
              { label: 'QR কোড প্রিন্ট', count: metrics.sources.qrCode, color: 'text-purple-600' },
              { label: 'Google সার্চ ইঞ্জিন', count: metrics.sources.googleSearch, color: 'text-rose-600' },
              { label: 'চার্চ পার্টনার / মন্ত্রণালয়', count: metrics.sources.churchPartner, color: 'text-teal-600' },
              { label: 'YouTube ভিডিও', count: metrics.sources.youtube, color: 'text-red-600' },
              { label: 'অন্যান্য রেফারাল', count: metrics.sources.otherReferral, color: 'text-stone-600 dark:text-stone-400' },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
                <span className="text-stone-500 block truncate">{s.label}</span>
                <div className={`text-xl font-bold font-serif mt-1 ${s.color}`}>
                  {toBengaliDigits(s.count)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UTM Parameters Analytics */}
        <div className="mb-8">
          <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
            <span>📊 UTM ক্যাম্পেইন প্যারামিটার পরিসংখ্যান (UTM Parameter Statistics)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* utm_source */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-stone-700 dark:text-stone-300 block mb-2 font-mono">utm_source</span>
              {Object.keys(metrics.utmStats.sources).length === 0 ? (
                <span className="text-stone-400 italic">কোনো রেকর্ড নেই</span>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {Object.entries(metrics.utmStats.sources).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between p-1.5 bg-white dark:bg-stone-900 rounded-lg">
                      <span className="font-mono text-stone-600 dark:text-stone-400 truncate max-w-[120px]">{k}</span>
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{toBengaliDigits(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* utm_medium */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-stone-700 dark:text-stone-300 block mb-2 font-mono">utm_medium</span>
              {Object.keys(metrics.utmStats.mediums).length === 0 ? (
                <span className="text-stone-400 italic">কোনো রেকর্ড নেই</span>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {Object.entries(metrics.utmStats.mediums).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between p-1.5 bg-white dark:bg-stone-900 rounded-lg">
                      <span className="font-mono text-stone-600 dark:text-stone-400 truncate max-w-[120px]">{k}</span>
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{toBengaliDigits(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* utm_campaign */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-stone-700 dark:text-stone-300 block mb-2 font-mono">utm_campaign</span>
              {Object.keys(metrics.utmStats.campaigns).length === 0 ? (
                <span className="text-stone-400 italic">কোনো রেকর্ড নেই</span>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {Object.entries(metrics.utmStats.campaigns).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between p-1.5 bg-white dark:bg-stone-900 rounded-lg">
                      <span className="font-mono text-stone-600 dark:text-stone-400 truncate max-w-[120px]">{k}</span>
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{toBengaliDigits(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* utm_content */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
              <span className="font-bold text-stone-700 dark:text-stone-300 block mb-2 font-mono">utm_content</span>
              {Object.keys(metrics.utmStats.contents).length === 0 ? (
                <span className="text-stone-400 italic">কোনো রেকর্ড নেই</span>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {Object.entries(metrics.utmStats.contents).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between p-1.5 bg-white dark:bg-stone-900 rounded-lg">
                      <span className="font-mono text-stone-600 dark:text-stone-400 truncate max-w-[120px]">{k}</span>
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{toBengaliDigits(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* OWNER-ONLY CAMPAIGN LINK GENERATOR */}
        <div className="p-6 rounded-3xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-300/70 dark:border-amber-900/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                👑 স্বত্বাধিকারী প্রচার লিংক জেনারেটর (Owner Campaign Link Generator)
              </h4>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-semibold">
              Owner-Only Tool
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 mb-6">
            সোশ্যাল মিডিয়া, চার্চ বুলেটিন, পোস্টার বা প্রচারের জন্য পূর্ব-ট্যাগকৃত সঠিক ট্র্যাকিং ইউআরএল তৈরি ও কপি করুন।
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4 text-xs">
            {/* Target */}
            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1">গন্তব্য পৃষ্ঠা (Target):</label>
              <select
                value={genTarget}
                onChange={(e) => setGenTarget(e.target.value as CampaignTarget)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"
              >
                <option value="home">হোম পেজ (Home)</option>
                <option value="install">ইনস্টল গাইড (Install)</option>
                <option value="bible">বাইবেল রিডার (Bible)</option>
                <option value="study">স্টাডি টুলস (Study)</option>
                <option value="sermon">সার্মন বিল্ডার (Sermon)</option>
                <option value="partners">অংশীদারিত্ব (Partners)</option>
                <option value="academy">একাডেমি (Academy)</option>
              </select>
            </div>

            {/* Channel */}
            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1">বিতরণ মাধ্যম (Channel):</label>
              <select
                value={genChannel}
                onChange={(e) => setGenChannel(e.target.value as CampaignChannel)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"
              >
                <option value="whatsapp">হোয়াটসঅ্যাপ (WhatsApp)</option>
                <option value="facebook">ফেসবুক (Facebook)</option>
                <option value="church_bulletin">চার্চ বুলেটিন (Bulletin)</option>
                <option value="conference">কনফারেন্স / সেমিনার</option>
                <option value="youth">যুব সমাজ (Youth)</option>
                <option value="print_qr">প্রিন্ট কিউআর কোড (QR)</option>
                <option value="ambassador">দূত / সেবক (Ambassador)</option>
                <option value="direct">সরাসরি প্রচার (Direct)</option>
              </select>
            </div>

            {/* Campaign Name */}
            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1">ক্যাম্পেইন নাম (Campaign):</label>
              <input
                type="text"
                value={genCampaign}
                onChange={(e) => setGenCampaign(e.target.value)}
                placeholder="যেমন: easter-2026"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"
              />
            </div>

            {/* Content Tag */}
            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1">কন্টেন্ট ট্যাগ (Content):</label>
              <input
                type="text"
                value={genContent}
                onChange={(e) => setGenContent(e.target.value)}
                placeholder="যেমন: verse-card"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"
              />
            </div>

            {/* Ref Code */}
            <div>
              <label className="block text-stone-600 dark:text-stone-400 font-medium mb-1">রেফারেল কোড (Ref):</label>
              <input
                type="text"
                value={genRef}
                onChange={(e) => setGenRef(e.target.value)}
                placeholder="যেমন: REV-AYAN"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>

          {/* Output Display & Copy Button */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 w-full bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-700 rounded-xl px-3.5 py-2.5 font-mono text-xs text-stone-800 dark:text-stone-200 truncate select-all">
              {generatedCampaignUrl}
            </div>
            <button
              onClick={handleCopyGeneratedCampaignUrl}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-all shadow cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              {genCopied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>কপি করা হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>ক্যাম্পেইন লিংক কপি করুন</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= PART 4: SHARE TRACKING ================= */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-5 h-5 text-rose-600" />
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            📤 শেয়ার ট্র্যাকিং ও মাধ্যম বন্টন (Share Tracking & Content Breakdown)
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          ব্যবহারকারীরা কোন চ্যানেলে শেয়ার করছেন এবং কোন শাস্ত্রীয় বিষয়বস্তু বেশি শেয়ার হচ্ছে।
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Share Channels */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-600" />
              <span>শেয়ার চ্যানেল (Share Channels)</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              {[
                { label: 'WhatsApp শেয়ার', count: metrics.whatsappShareClicks, color: 'text-emerald-600' },
                { label: 'Facebook শেয়ার', count: metrics.facebookShareClicks, color: 'text-blue-600' },
                { label: 'Messenger শেয়ার', count: metrics.messengerShareClicks, color: 'text-indigo-600' },
                { label: 'সরাসরি লিংক কপি (Copy Link)', count: metrics.copyLinkActions, color: 'text-amber-600' },
                { label: 'ইমেইল শেয়ার (Email)', count: metrics.emailShareClicks, color: 'text-purple-600' },
                { label: 'সিস্টেম / অন্যান্য শেয়ার', count: metrics.otherShareClicks, color: 'text-stone-600 dark:text-stone-400' },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-600 dark:text-stone-400">{c.label}</span>
                  <span className={`font-mono font-bold ${c.color}`}>{toBengaliDigits(c.count)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shared Content Breakdown */}
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <h4 className="font-serif font-bold text-sm text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>শেয়ারকৃত বিষয়বস্তু (Shared Content Breakdown)</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              {[
                { label: 'সম্পূর্ণ অ্যাপ আমন্ত্রণ (Entire App)', count: metrics.sharingByContent.entireApp },
                { label: 'নির্দিষ্ট বাইবেলের পদ (Bible Verse)', count: metrics.sharingByContent.bibleVerse },
                { label: 'বাইবেলের অধ্যায় (Bible Chapter)', count: metrics.sharingByContent.bibleChapter },
                { label: 'স্টাডি মেটেরিয়াল (Study Material)', count: metrics.sharingByContent.studyMaterial },
                { label: 'সার্মন আউটলাইন (Sermon Outline)', count: metrics.sharingByContent.sermonOutline },
                { label: 'দৈনিক ধ্যান ও পদ (Daily Devotional)', count: metrics.sharingByContent.devotional },
                { label: 'অন্যান্য বিষয়বস্তু', count: metrics.sharingByContent.otherContent },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-600 dark:text-stone-400">{c.label}</span>
                  <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{toBengaliDigits(c.count)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PART 5: VISITS PRODUCED BY SHARING ================= */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <ExternalLink className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            🤝 শেয়ারের মাধ্যমে আগত ভিজিট ও সম্পৃক্ততা (Visits Produced by Sharing)
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          অন্যদের পাঠানো লিংকে ক্লিক করে অ্যাপে আগত পাঠকদের পরবর্তী আচরণ ও বাইবেল অধ্যয়ন পরিসংখ্যান।
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 text-xs">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">শেয়ার লিংক ওপেন</span>
            <div className="text-xl font-bold font-serif text-purple-600 mt-1">
              {toBengaliDigits(metrics.sharedLinkOpens)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">অনন্য ভিজিটর</span>
            <div className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
              {toBengaliDigits(metrics.sharedLinkUniqueVisitors)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">নতুন অর্জিত পাঠক</span>
            <div className="text-xl font-bold font-serif text-emerald-600 mt-1">
              {toBengaliDigits(metrics.newUsersAcquiredThroughShare)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">ফিরে আসা পাঠক</span>
            <div className="text-xl font-bold font-serif text-amber-600 mt-1">
              {toBengaliDigits(metrics.returningUsersThroughShare)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">গভীর সম্পৃক্ততা ও পাঠ</span>
            <div className="text-xl font-bold font-serif text-blue-600 mt-1">
              {toBengaliDigits(metrics.meaningfulEngagementAfterShare)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500">পরবর্তী ইনস্টল সংকেত</span>
            <div className="text-xl font-bold font-serif text-teal-600 mt-1">
              {toBengaliDigits(metrics.installSignalsAfterShare)}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-stone-500 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>গোপনীয়তা ও নিরাপত্তা: কোনো ব্যক্তিগত তথ্য, নাম, ফোন নম্বর বা বাহ্যিক ট্র্যাকিং কুকি কখনোই সংরক্ষণ করা হয় না।</span>
        </div>
      </div>

      {/* ================= PART 6: SHARING FUNNEL (6 STAGES) ================= */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            🔄 সম্পূর্ণ শেয়ারিং ফানেল (Sharing Funnel — 6 Stages)
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          শেয়ার সূচনা থেকে অ্যাপ ইনস্টলেশন পর্যন্ত ছয়টি পূর্ণ পর্যবেক্ষণযোগ্য ধাপ।
        </p>

        <div className="space-y-4">
          {/* Stage 1 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">
                ১
              </div>
              <div>
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-xs sm:text-sm block">
                  শেয়ার কার্যপ্রক্রিয়া শুরু (Share Action Initiated)
                </span>
                <span className="text-[11px] text-stone-400">অ্যাপের ভেতর শেয়ার বোতাম ক্লিক</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {toBengaliDigits(metrics.funnel.shareActions)}
              </span>
              <span className="text-[10px] text-stone-400 block">১০০% বেসলাইন</span>
            </div>
          </div>

          {/* Connector 1 -> 2 */}
          <div className="px-6 flex items-center gap-2 text-xs text-stone-500">
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            <span>রূপান্তর হার: <strong>{toBengaliDigits(metrics.funnel.conversionRates.actionToLinkRate ?? 100)}%</strong></span>
          </div>

          {/* Stage 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">
                ২
              </div>
              <div>
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-xs sm:text-sm block">
                  ট্র্যাকযোগ্য লিংক তৈরি বা কপি (Trackable Link Created / Copied)
                </span>
                <span className="text-[11px] text-stone-400">ক্লিপবোর্ডে কপি বা সিস্টেম ডায়ালগ সফল</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {toBengaliDigits(metrics.funnel.trackableSharedLinks)}
              </span>
              <span className="text-[10px] text-stone-400 block">সফল লিংক জেনারেশন</span>
            </div>
          </div>

          {/* Connector 2 -> 3 (Off-platform limitation callout) */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>ধাপ ২ থেকে ৩: হোয়াটসঅ্যাপ ও মেসেঞ্জারের প্রাইভেট চ্যাটের অভ্যন্তর পরিমাপ সম্ভব নয়</span>
            </div>
            <span className="font-semibold text-[11px] px-2 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
              সম্পূর্ণ পরিমাপযোগ্য নয় (Not fully measurable)
            </span>
          </div>

          {/* Stage 3 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">
                ৩
              </div>
              <div>
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-xs sm:text-sm block">
                  শেয়ারকৃত লিংক ওপেন (Shared-Link Opened by Recipient)
                </span>
                <span className="text-[11px] text-stone-400">প্রাপক দ্বারা অ্যাপে সফলভাবে প্রবেশ</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-serif text-purple-600">
                {toBengaliDigits(metrics.funnel.sharedLinkVisitors)}
              </span>
              <span className="text-[10px] text-stone-400 block">ইনবাউন্ড পরিদর্শক</span>
            </div>
          </div>

          {/* Connector 3 -> 4 */}
          <div className="px-6 flex items-center gap-2 text-xs text-stone-500">
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            <span>রূপান্তর হার (Visitor to Engaged): <strong>{toBengaliDigits(metrics.funnel.conversionRates.visitorToEngagedRate ?? 0)}%</strong></span>
          </div>

          {/* Stage 4 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">
                ৪
              </div>
              <div>
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-xs sm:text-sm block">
                  কন্টেন্টে গভীর মনোযোগ ও পাঠ (Recipient Engaged with Content)
                </span>
                <span className="text-[11px] text-stone-400">বাইবেল পাঠ, সার্চ বা শাস্ত্রীয় অধ্যয়ন</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-serif text-blue-600">
                {toBengaliDigits(metrics.funnel.meaningfulEngagement)}
              </span>
              <span className="text-[10px] text-stone-400 block">অর্থপূর্ণ সম্পৃক্ততা</span>
            </div>
          </div>

          {/* Connector 4 -> 5 */}
          <div className="px-6 flex items-center gap-2 text-xs text-stone-500">
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            <span>রূপান্তর হার (Engaged to Return): <strong>{toBengaliDigits(metrics.funnel.conversionRates.engagedToReturnRate ?? 0)}%</strong></span>
          </div>

          {/* Stage 5 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">
                ৫
              </div>
              <div>
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-xs sm:text-sm block">
                  পুনরায় ফিরে আসা পাঠক (Recipient Returned)
                </span>
                <span className="text-[11px] text-stone-400">পরবর্তী সেশনে পুনরায় বাইবেলে আগমন</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-serif text-amber-600">
                {toBengaliDigits(metrics.funnel.returnVisits)}
              </span>
              <span className="text-[10px] text-stone-400 block">পুনরাবৃত্ত পাঠক</span>
            </div>
          </div>

          {/* Connector 3 -> 6 */}
          <div className="px-6 flex items-center gap-2 text-xs text-stone-500">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>রূপান্তর হার (Visitor to Install): <strong>{toBengaliDigits(metrics.funnel.conversionRates.visitorToInstallRate ?? 0)}%</strong></span>
          </div>

          {/* Stage 6 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                ৬
              </div>
              <div>
                <span className="font-semibold text-emerald-950 dark:text-emerald-100 text-xs sm:text-sm block">
                  অ্যাপ ইনস্টলেশন সংকেত (Recipient Installed the App)
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400">PWA ইনস্টল সম্পন্ন বা ইনস্টল বোতাম ক্লিক</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-serif text-emerald-600 dark:text-emerald-400">
                {toBengaliDigits(metrics.funnel.observedOrProbableInstalls)}
              </span>
              <span className="text-[10px] text-stone-400 block">ইনস্টল রূপান্তর</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PART 7: FILTERS & COMPARISONS ================= */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <span>📊 তুলনামূলক বিশ্লেষণ (Comparative Analysis)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">পূর্ববর্তী সময়ের সাথে ইনস্টল ও লিংকের বাস্তব তুলনা</p>
          </div>

          <div className="inline-flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setComparisonPeriod('todayVsYesterday')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                comparisonPeriod === 'todayVsYesterday'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 font-bold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              আজ বনাম গতকাল
            </button>
            <button
              onClick={() => setComparisonPeriod('weekVsLastWeek')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                comparisonPeriod === 'weekVsLastWeek'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 font-bold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              এই সপ্তাহ বনাম বিগত সপ্তাহ
            </button>
            <button
              onClick={() => setComparisonPeriod('monthVsLastMonth')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                comparisonPeriod === 'monthVsLastMonth'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 font-bold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              এই মাস বনাম বিগত মাস
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Installs Comparison */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500 block mb-1">PWA ইনস্টলেশন</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {toBengaliDigits(compData.currentInstalls)}
              </span>
              <span className="text-xs text-stone-400">পূর্ববর্তী: {toBengaliDigits(compData.prevInstalls)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-stone-400">পরিবর্তন:</span>
              <span className={`font-mono font-bold ${getDelta(compData.currentInstalls, compData.prevInstalls) >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {getDelta(compData.currentInstalls, compData.prevInstalls) >= 0 ? '+' : ''}{toBengaliDigits(getDelta(compData.currentInstalls, compData.prevInstalls))}%
              </span>
            </div>
          </div>

          {/* Public Opens Comparison */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500 block mb-1">পাবলিক-লিংক ওপেন</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {toBengaliDigits(compData.currentLinkOpens)}
              </span>
              <span className="text-xs text-stone-400">পূর্ববর্তী: {toBengaliDigits(compData.prevLinkOpens)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-stone-400">পরিবর্তন:</span>
              <span className={`font-mono font-bold ${getDelta(compData.currentLinkOpens, compData.prevLinkOpens) >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {getDelta(compData.currentLinkOpens, compData.prevLinkOpens) >= 0 ? '+' : ''}{toBengaliDigits(getDelta(compData.currentLinkOpens, compData.prevLinkOpens))}%
              </span>
            </div>
          </div>

          {/* Shares Comparison */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500 block mb-1">শেয়ার পদক্ষেপ</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {toBengaliDigits(compData.currentShares)}
              </span>
              <span className="text-xs text-stone-400">পূর্ববর্তী: {toBengaliDigits(compData.prevShares)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-stone-400">পরিবর্তন:</span>
              <span className={`font-mono font-bold ${getDelta(compData.currentShares, compData.prevShares) >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {getDelta(compData.currentShares, compData.prevShares) >= 0 ? '+' : ''}{toBengaliDigits(getDelta(compData.currentShares, compData.prevShares))}%
              </span>
            </div>
          </div>

          {/* Open to Share Efficiency */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
            <span className="text-stone-500 block mb-1">লিংক ওপেন প্রতি শেয়ার</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {toBengaliDigits(compData.currentShares > 0 ? (compData.currentLinkOpens / compData.currentShares).toFixed(1) : '০.০')}x
              </span>
              <span className="text-xs text-stone-400">পূর্ববর্তী: {toBengaliDigits(compData.prevShares > 0 ? (compData.prevLinkOpens / compData.prevShares).toFixed(1) : '০.০')}x</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-stone-400">প্রচার দক্ষতা:</span>
              <span className="font-mono font-bold text-amber-600">
                কার্যকর
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PART 8: DEFINITIONS & TOOLTIPS REFERENCE GUIDE ================= */}
      <div className="bg-amber-500/5 dark:bg-amber-950/20 border border-amber-300/60 dark:border-amber-900/50 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            📖 গুরুত্বপূর্ণ পরিভাষাসমূহ ও ব্যাখ্যা (Important Definitions & Reference)
          </h3>
        </div>
        <p className="text-xs text-stone-600 dark:text-stone-400 mb-6">
          পরিসংখ্যানগুলোর স্পষ্ট ও নির্ভুল বোঝার জন্য অফিসিয়াল সংজ্ঞাসমূহ:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Def 1 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5 font-bold text-stone-900 dark:text-stone-100">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 text-center leading-5 font-mono text-[11px]">১</span>
              <span>Observed Mobile/PWA Installs</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              ব্রাউজারের অফিসিয়াল <code className="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">appinstalled</code> ইভেন্ট
              অথবা স্বতন্ত্র PWA স্ট্যান্ডঅ্যালোন ডিসপ্লে মোডে অ্যাপটির প্রথম নিশ্চিত লঞ্চ। কোনো সাধারণ ক্লিক নয়।
            </p>
          </div>

          {/* Def 2 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5 font-bold text-stone-900 dark:text-stone-100">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 text-center leading-5 font-mono text-[11px]">২</span>
              <span>Probable Installed Users</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              যেসব পাঠক বা ডিভাইস ব্রাউজারের অ্যাড্রেস বার ও নেভিগেশন নিয়ন্ত্রণ ব্যতীত স্বতন্ত্র হোমস্ক্রিন উইন্ডোতে বা স্ট্যান্ডঅ্যালোন মোডে অ্যাপ পরিচালনা করেছেন।
            </p>
          </div>

          {/* Def 3 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5 font-bold text-stone-900 dark:text-stone-100">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 text-center leading-5 font-mono text-[11px]">৩</span>
              <span>Active Installed-App Users</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              নির্বাচিত সময়সীমায় ইনস্টলকৃত PWA-এর ভেতর সরাসরি সক্রিয় থেকে শাস্ত্র পাঠ, অধ্যায় অধ্যয়ন বা অনুসন্ধান সম্পন্নকারী পাঠকবৃন্দ।
            </p>
          </div>

          {/* Def 4 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5 font-bold text-stone-900 dark:text-stone-100">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 text-center leading-5 font-mono text-[11px]">৪</span>
              <span>Total Public-Link Opens</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              পাবলিক ইউআরএল, সোশ্যাল মিডিয়া পোস্ট, কিউআর কোড স্ক্যান বা বন্ধুদের শেয়ারকৃত লিংকের মাধ্যমে অ্যাপে প্রবেশকারী মোট পেজভিউ ও ভিজিট।
            </p>
          </div>

          {/* Def 5 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm md:col-span-2">
            <div className="flex items-center gap-2 mb-1.5 font-bold text-stone-900 dark:text-stone-100">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 text-center leading-5 font-mono text-[11px]">৫</span>
              <span>Visitors Acquired Through Shares</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              শেয়ারকৃত লিংকে (যেমন: <code className="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">ref=share</code> বা <code className="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">utm_medium=share</code>)
              ক্লিক করে অ্যাপে প্রবেশকারী মোট অনন্য সেশন পাঠকবৃন্দ। এটি ব্যক্তিগত তথ্য সংরক্ষণ না করে সম্পূর্ণ গোপনীয়তাসম্মত উপায়ে নিরূপিত হয়।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
