// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// PRIVATE OWNER-ONLY DASHBOARD: DAILY VERSE MONITOR
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Send,
  PauseCircle,
  PlayCircle,
  Download,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Globe,
  Mail,
  Smartphone,
  Calendar,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { AdminSecurityGate } from '../../components/admin/AdminSecurityGate';
import { DailyVerseService, OFFICIAL_CONSENT_TEXT } from '../../services/dailyVerseService';
import { DailyVerseMonitorMetrics, DailyVerseHealthCheck, DailyVerseDeliveryLog } from '../../types/dailyVerse';

export const DailyVerseMonitorScreen: React.FC = () => {
  const [metrics, setMetrics] = useState<DailyVerseMonitorMetrics>(() => DailyVerseService.getMonitorMetrics());
  const [health, setHealth] = useState<DailyVerseHealthCheck>(() => DailyVerseService.runHealthCheck());
  const [logs, setLogs] = useState<DailyVerseDeliveryLog[]>(() => DailyVerseService.getAllDeliveryLogs());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterChannel, setFilterChannel] = useState<string>('ALL');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'warning'; text: string } | null>(null);

  const refreshData = () => {
    setMetrics(DailyVerseService.getMonitorMetrics());
    setHealth(DailyVerseService.runHealthCheck());
    setLogs(DailyVerseService.getAllDeliveryLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSendTestToAdmin = async (channel: 'EMAIL' | 'PUSH') => {
    setIsProcessing(true);
    setActionNotice(null);
    try {
      const res = await DailyVerseService.sendTestToAdmin(channel);
      setActionNotice({ type: 'success', text: res.message });
      refreshData();
    } catch (err: any) {
      setActionNotice({ type: 'warning', text: err.message || 'টেস্ট বার্তা প্রেরণে ত্রুটি ঘটেছে।' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleEmergencyPause = () => {
    if (metrics.emergencyPaused) {
      DailyVerseService.resumeAll();
      setActionNotice({ type: 'success', text: 'জরুরি স্থগিতাদেশ প্রত্যাহার করা হয়েছে। নোটিফিকেশন ইঞ্জিন পুনরায় সক্রিয়।' });
    } else {
      const reason = window.prompt(
        'জরুরি স্থগিতাদেশের কারণ লিখুন:',
        'রেভাঃ অয়ন কুমার ঘোষ কর্তৃক সাময়িক স্থগিতাদেশ'
      );
      if (reason) {
        DailyVerseService.emergencyPauseAll(reason);
        setActionNotice({ type: 'warning', text: `নোটিফিকেশন ইঞ্জিন স্থগিত করা হয়েছে: ${reason}` });
      }
    }
    refreshData();
  };

  const handleRunBatchNow = async () => {
    const confirm = window.confirm('আপনি কি এখনই সকল সক্রিয় গ্রাহকদের জন্য নোটিফিকেশন রান করতে চান?');
    if (!confirm) return;

    setIsProcessing(true);
    setActionNotice(null);
    try {
      const result = await DailyVerseService.runDailyDispatch({ forceAll: true });
      setActionNotice({
        type: 'success',
        text: `ব্যাচ সম্পন্ন: ${result.delivered} প্রেরিত, ${result.failed} ব্যর্থ, ${result.skippedDuplicates} ডুপ্লিকেট স্কিপড, ${result.retried} রিট্রাইড।`,
      });
      refreshData();
    } catch (err: any) {
      setActionNotice({ type: 'warning', text: err.message || 'ব্যাচ চালনায় ত্রুটি ঘটেছে।' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportReport = (period: 'daily' | 'weekly' | 'monthly') => {
    const reportText = DailyVerseService.generateReport(period);
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bengali-study-bible-daily-verse-${period}-report-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const csvContent = DailyVerseService.exportDeliveryHistoryCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily-verse-delivery-logs-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered Logs
  const filteredLogs = logs.filter((log) => {
    const matchQuery =
      searchQuery === '' ||
      log.maskedRecipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.verseRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.failureReason && log.failureReason.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchStatus = filterStatus === 'ALL' || log.status === filterStatus;
    const matchChannel = filterChannel === 'ALL' || log.channel === filterChannel;

    return matchQuery && matchStatus && matchChannel;
  });

  return (
    <AdminSecurityGate
      title="দৈনিক বাইবেল পদ নোটিফিকেশন মনিটর (Daily Bible Verse Notification Monitor)"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-slate-800 dark:text-slate-100 font-sans">
        {/* Top Breadcrumb & Status Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-navy-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-navy-950 text-gold-400 border border-gold-500/30">
                স্বত্বাধিকারী কনসোল (Owner-Only)
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${
                  health.status === 'HEALTHY'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : health.status === 'WARNING'
                    ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                    : 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    health.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-rose-500 animate-ping'
                  }`}
                />
                স্বাস্থ্য স্থিতি: {health.status} ({health.successRate}% সাফল্য)
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-gold-300">
              Daily Verse Monitor (দৈনিক পদ মনিটর)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              তত্ত্বাবধায়ক: <strong>রেভাঃ অয়ন কুমার ঘোষ</strong> | অফিসিয়াল ইমেল:{' '}
              <span className="font-mono">ayanghosh75@gmail.com</span>
            </p>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSendTestToAdmin('EMAIL')}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400 text-xs font-bold shadow-sm transition"
              title="অ্যাডমিন ইমেইলে টেস্ট বার্তা পাঠান"
            >
              <Send className="w-3.5 h-3.5" /> Send test to admin
            </button>

            <button
              onClick={handleRunBatchNow}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-bold transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} /> Run Batch Now
            </button>

            <button
              onClick={handleToggleEmergencyPause}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                metrics.emergencyPaused
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                  : 'bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800 hover:bg-rose-100'
              }`}
            >
              {metrics.emergencyPaused ? (
                <>
                  <PlayCircle className="w-3.5 h-3.5 text-emerald-500" /> Resume All Messages
                </>
              ) : (
                <>
                  <PauseCircle className="w-3.5 h-3.5 text-rose-500" /> Pause All Messages
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Notice / Feedback Alert */}
        {actionNotice && (
          <div
            className={`p-4 rounded-2xl flex items-start justify-between gap-3 border ${
              actionNotice.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800'
            }`}
          >
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="whitespace-pre-line">{actionNotice.text}</div>
            </div>
            <button onClick={() => setActionNotice(null)} className="text-xs font-bold opacity-60 hover:opacity-100">
              ✕
            </button>
          </div>
        )}

        {/* Emergency Paused Banner if active */}
        {metrics.emergencyPaused && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500 text-rose-900 dark:text-rose-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <strong className="block text-sm">সতর্কতা: নোটিফিকেশন সিস্টেম জরুরি স্থগিত রয়েছে!</strong>
                <span>কারণ: {metrics.emergencyPausedReason || 'নির্দিষ্ট কারণ নেই'}</span>
              </div>
            </div>
            <button
              onClick={handleToggleEmergencyPause}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
            >
              পুনরায় চালু করুন
            </button>
          </div>
        )}

        {/* 8 Primary KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Total Subscribers */}
          <div className="p-4 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">মোট গ্রাহক (Total)</span>
              <Bell className="w-4 h-4 text-gold-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-navy-950 dark:text-gold-300">
              {metrics.totalSubscribers}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>সক্রিয়: {metrics.activeSubscribers}</span>
              <span>স্থগিত: {metrics.pausedSubscribers}</span>
            </div>
          </div>

          {/* Card 2: New & Unsubscribes */}
          <div className="p-4 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">নতুন ও বাতিল</span>
              <TrendingUp className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-navy-950 dark:text-gold-300">
              {metrics.activeSubscribers}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span className="text-emerald-600 font-semibold">কার্যকর: {metrics.activeSubscribers}</span>
              <span className="text-rose-500">বাতিল: {metrics.unsubscribedCount}</span>
            </div>
          </div>

          {/* Card 3: Scheduled & Delivered Today */}
          <div className="p-4 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">আজকের সফল ডেলিভারি</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {metrics.deliveredToday}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>নির্ধারিত: {metrics.scheduledToday}</span>
              <span className="text-rose-500 font-semibold">ব্যর্থ: {metrics.failedToday}</span>
            </div>
          </div>

          {/* Card 4: Delivery Percentage (>95% target) */}
          <div className="p-4 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">সাফল্যের হার (Success)</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-navy-950 dark:text-gold-300">
                {metrics.deliveryRate}%
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  metrics.deliveryRate >= 95
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                }`}
              >
                {metrics.deliveryRate >= 95 ? '✓ ৯৫%+ লক্ষ্যপূরণ' : 'সতর্কতা'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              রিট্রাই কিউতে বকেয়া: {metrics.retryQueueCount} টি
            </div>
          </div>
        </div>

        {/* Secondary Row: Channel Breakdown, Language, Tomorrow's Verse */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Delivery Channels Breakdown */}
          <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm text-xs">
            <h3 className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300 mb-3 flex items-center justify-between">
              <span>ডেলিভারি চ্যানেল ও ডিভাইস ব্রেকডাউন</span>
              <Smartphone className="w-4 h-4 text-gold-500" />
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-gold-500" /> ব্রাউজার পুশ নোটিফিকেশন
                  </span>
                  <span className="font-mono">{metrics.byChannel.push} জন</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-navy-950 rounded-full h-2">
                  <div
                    className="bg-gold-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        metrics.totalSubscribers > 0
                          ? (metrics.byChannel.push / metrics.totalSubscribers) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-500" /> সরাসরি ইমেইল বার্তা
                  </span>
                  <span className="font-mono">{metrics.byChannel.email} জন</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-navy-950 rounded-full h-2">
                  <div
                    className="bg-sky-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        metrics.totalSubscribers > 0
                          ? (metrics.byChannel.email / metrics.totalSubscribers) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex justify-between text-slate-500">
                <span>বাংলা ভাষা: <strong>{metrics.byLanguage.bn}</strong></span>
                <span>ইংরেজি ভাষা: <strong>{metrics.byLanguage.en}</strong></span>
              </div>
            </div>
          </div>

          {/* Tomorrow's Verse Calendar Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-white dark:from-navy-950 dark:via-navy-900 dark:to-navy-900 border border-gold-500/30 shadow-sm text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-amber-700 dark:text-gold-400 font-bold mb-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> আগামীকালের নির্ধারিত পদ
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-navy-950 border border-amber-300 dark:border-navy-700">
                  {metrics.tomorrowVerse?.versionBn || 'IRV'}
                </span>
              </div>
              <h4 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 mb-1">
                {metrics.tomorrowVerse?.verseRefBn || 'N/A'}
              </h4>
              <p className="italic text-slate-700 dark:text-slate-200 line-clamp-3 mb-2">
                “{metrics.tomorrowVerse?.textBn || 'কোনো পদ নির্ধারিত নেই'}”
              </p>
              <div className="text-[11px] text-slate-400">
                থিম: {metrics.tomorrowVerse?.themeBn || 'সাধারণ অধ্যয়ন'}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>অনুমোদনকারী: <strong>{metrics.tomorrowVerse?.approvedBy || 'Rev. Ayan Kumar Ghosh'}</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ প্রতিপাদিত</span>
            </div>
          </div>

          {/* Daily Health Check & Reports */}
          <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm text-xs flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300 mb-2 flex items-center justify-between">
                <span>স্বয়ংক্রিয় স্বাস্থ্য নিরীক্ষা ও রিপোর্ট</span>
                <FileText className="w-4 h-4 text-emerald-500" />
              </h3>
              <p className="text-slate-500 mb-3">
                প্রতিদিন ডেলিভারি হার, পদের সত্যতা ও টোকেন কার্যকারিতা স্বয়ংক্রিয়ভাবে পরীক্ষা করা হয়।
              </p>

              {health.issues.length > 0 ? (
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 space-y-1 mb-3">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> শনাক্তকৃত সমস্যাসমূহ:
                  </div>
                  {health.issues.map((issue, idx) => (
                    <div key={idx} className="text-[11px] ml-4 list-disc">
                      • {issue}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>কোনো সমস্যা নেই। সিস্টেম শতভাগ সুস্থভাবে পরিচালিত হচ্ছে।</span>
                </div>
              )}
            </div>

            {/* Report Export Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex flex-wrap gap-2">
              <button
                onClick={() => handleExportReport('daily')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition"
              >
                দৈনিক রিপোর্ট
              </button>
              <button
                onClick={() => handleExportReport('weekly')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition"
              >
                সাপ্তাহিক রিপোর্ট
              </button>
              <button
                onClick={() => handleExportReport('monthly')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition"
              >
                মাসিক রিপোর্ট
              </button>
            </div>
          </div>
        </div>

        {/* Delivery Logs & Searchable Audit History */}
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-navy-800 mb-4">
            <div>
              <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300">
                ডেলিভারি ইতিহাস ও অডিট ট্রেইল (Delivery History)
              </h3>
              <p className="text-slate-400 text-[11px]">
                মোট {logs.length} টি রেকর্ড সংরক্ষিত • গোপনীয়তা রক্ষার্থে সকল ইমেল ও টোকেন মাস্কড
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="রেসিপিয়েন্ট বা পদ খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs focus:ring-1 focus:ring-gold-500 focus:outline-none"
                />
              </div>

              {/* Filter by Status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs focus:ring-1 focus:ring-gold-500"
              >
                <option value="ALL">সকল স্থিতি</option>
                <option value="DELIVERED">সফল (Delivered)</option>
                <option value="FAILED">ব্যর্থ (Failed)</option>
                <option value="RETRYING">পুনঃচেষ্টা (Retrying)</option>
              </select>

              {/* Filter by Channel */}
              <select
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs focus:ring-1 focus:ring-gold-500"
              >
                <option value="ALL">সকল চ্যানেল</option>
                <option value="PUSH">পুশ নোটিফিকেশন</option>
                <option value="EMAIL">ইমেইল</option>
              </select>

              {/* Export CSV Button */}
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950 text-xs font-bold transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> CSV এক্সপোর্ট
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-navy-800 text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">তারিখ ও সময়</th>
                  <th className="py-2.5 px-3">গ্রাহক (মাস্কড)</th>
                  <th className="py-2.5 px-3">চ্যানেল</th>
                  <th className="py-2.5 px-3">পদ</th>
                  <th className="py-2.5 px-3">স্থিতি</th>
                  <th className="py-2.5 px-3">রিট্রাই</th>
                  <th className="py-2.5 px-3">মন্তব্য / কারণ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-navy-800/50">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      কোনো ডেলিভারি লগ পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  filteredLogs.slice(-50).reverse().map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-navy-800/30 transition">
                      <td className="py-2.5 px-3 font-mono text-[11px] whitespace-nowrap">
                        {new Date(log.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({log.date})
                      </td>
                      <td className="py-2.5 px-3 font-mono font-medium">{log.maskedRecipient}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            log.channel === 'PUSH'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                              : 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                          }`}
                        >
                          {log.channel === 'PUSH' ? <Bell className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                          {log.channel}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-serif font-bold text-navy-950 dark:text-gold-300 whitespace-nowrap">
                        {log.verseRef}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            log.status === 'DELIVERED'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : log.status === 'FAILED'
                              ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {log.status === 'DELIVERED' ? 'সফল' : log.status === 'FAILED' ? 'ব্যর্থ' : log.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">{log.retryCount}</td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-xs">
                        {log.failureReason || 'সফলভাবে প্রেরিত'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminSecurityGate>
  );
};
