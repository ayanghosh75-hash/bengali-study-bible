// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// ADMIN FEEDBACK, CORRECTION & USER RESEARCH DASHBOARD
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Mail,
  RefreshCw,
  Search,
  Download,
  BookOpen,
  User,
  Eye,
  BarChart2,
  Flame,
} from 'lucide-react';
import {
  FeedbackItem,
  FeedbackStatus,
  FeedbackPriority,
  FeedbackCategory,
  EmailDeliveryStatus,
  FeedbackFilterOptions,
} from '../../types/feedback';
import {
  STATUS_LABELS,
  PRIORITY_LABELS,
  EMAIL_STATUS_LABELS,
  PRIMARY_FEEDBACK_CARDS,
} from '../../data/feedback/feedbackCategoriesData';
import { FeedbackService } from '../../services/feedbackService';

export const AdminFeedbackDashboardScreen: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(() =>
    FeedbackService.getAllFeedback()
  );
  const [selectedItem, setSelectedItem] = useState<FeedbackItem | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<FeedbackCategory | 'ALL'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<FeedbackPriority | 'ALL'>('ALL');
  const [emailStatusFilter, setEmailStatusFilter] = useState<EmailDeliveryStatus | 'ALL'>('ALL');

  // Edit / Review Form State
  const [editStatus, setEditStatus] = useState<FeedbackStatus>('NEW');
  const [editPriority, setEditPriority] = useState<FeedbackPriority>('NORMAL');
  const [resolutionSummary, setResolutionSummary] = useState<string>('');
  const [userFacingResponse, setUserFacingResponse] = useState<string>('');
  const [newInternalNote, setNewInternalNote] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isRetryingEmails, setIsRetryingEmails] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  // Load items
  const reloadData = () => {
    const all = FeedbackService.getAllFeedback();
    setFeedbackList(all);
  };

  // Analytics summary
  const analytics = useMemo(() => {
    return FeedbackService.getAnalyticsSummary(feedbackList);
  }, [feedbackList]);

  // Filtered list
  const filteredList = useMemo(() => {
    const options: FeedbackFilterOptions = {
      searchTerm: searchQuery,
      status: statusFilter,
      category: categoryFilter,
      priority: priorityFilter,
      emailStatus: emailStatusFilter,
    };
    return FeedbackService.filterFeedback(options, feedbackList);
  }, [feedbackList, searchQuery, statusFilter, categoryFilter, priorityFilter, emailStatusFilter]);

  // Open item inspection
  const handleOpenItem = (item: FeedbackItem) => {
    setSelectedItem(item);
    setEditStatus(item.status);
    setEditPriority(item.priority);
    setResolutionSummary(item.resolutionSummary || '');
    setUserFacingResponse(item.userFacingResponse || '');
    setNewInternalNote('');
    setUpdateMessage(null);
  };

  // Save changes to item
  const handleSaveChanges = () => {
    if (!selectedItem) return;
    setIsUpdating(true);

    try {
      // 1. Add internal note if entered
      if (newInternalNote.trim().length > 0) {
        FeedbackService.addInternalNote(
          selectedItem.id,
          newInternalNote.trim(),
          'Rev. Ayan Kumar Ghosh'
        );
      }

      // 2. Update status and resolution
      const updated = FeedbackService.updateFeedbackStatus(
        selectedItem.id,
        editStatus,
        editPriority,
        resolutionSummary.trim() || undefined,
        userFacingResponse.trim() || undefined,
        'Rev. Ayan Kumar Ghosh'
      );

      if (updated) {
        setSelectedItem(updated);
        reloadData();
        setNewInternalNote('');
        setUpdateMessage('আবেদনের স্থিতি ও মীমাংসা সফলভাবে সংরক্ষিত হয়েছে।');
      }
    } catch (e: any) {
      setUpdateMessage('আপডেট করতে ব্যর্থ: ' + e.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Retry failed emails
  const handleRetryEmails = async () => {
    setIsRetryingEmails(true);
    try {
      const res = await FeedbackService.retryFailedEmails();
      reloadData();
      alert(`ইমেইল প্রক্রিয়া সম্পন্ন: ${res.retried}টি চেষ্টা করা হয়েছে, ${res.succeeded}টি প্রেরিত হয়েছে।`);
    } catch (e: any) {
      alert('ইমেইল প্রেরণে সমস্যা: ' + e.message);
    } finally {
      setIsRetryingEmails(false);
    }
  };

  // Export handlers
  const handleExportJson = () => {
    const jsonStr = FeedbackService.exportFeedbackJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bsb-feedback-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const csvStr = FeedbackService.exportFeedbackCsv();
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bsb-feedback-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 border border-amber-900/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              অ্যাডমিন সাপোর্ট কনসোল
            </span>
            <span className="text-xs text-stone-400 font-mono">BSB Feedback Engine v1.0</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            ব্যবহারকারী মতামত, শাস্ত্রীয় সংশোধন ও কারিগরি সহায়তা
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            প্রতিটি সাবমিশন ডেটাবেসে স্থায়ীভাবে সংরক্ষিত এবং স্বয়ংক্রিয়ভাবে <strong className="text-amber-300 font-mono">ayanghosh75@gmail.com</strong> এ ট্রান্সফার হয়।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleRetryEmails}
            disabled={isRetryingEmails}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRetryingEmails ? 'animate-spin' : ''}`} />
            <span>ইমেইল কিউ পুনঃপ্রেরণ</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV এক্সপোর্ট</span>
          </button>
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON ব্যাকআপ</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-xs font-medium text-stone-500">সর্বমোট জমা</span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            {analytics.totalCount}
          </div>
          <span className="text-[11px] text-stone-400">BSB-FB সিরিয়াল</span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 shadow-sm">
          <span className="text-xs font-medium text-amber-800 dark:text-amber-400">নতুন / অপেক্ষমাণ</span>
          <div className="text-2xl font-bold text-amber-900 dark:text-amber-200 mt-1">
            {analytics.newCount}
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-400">অব্যবহিত পর্যালোচনা</span>
        </div>

        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 shadow-sm">
          <span className="text-xs font-medium text-rose-800 dark:text-rose-400">বাইবেল পাঠ সংশোধন</span>
          <div className="text-2xl font-bold text-rose-900 dark:text-rose-200 mt-1">
            {analytics.bibleCorrectionsCount}
          </div>
          <span className="text-[11px] text-rose-700 dark:text-rose-400">মূলপাঠ যাচাইকরণ আবশ্যক</span>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 shadow-sm">
          <span className="text-xs font-medium text-blue-800 dark:text-blue-400">কারিগরি ত্রুটি</span>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
            {analytics.technicalProblemsCount}
          </div>
          <span className="text-[11px] text-blue-700 dark:text-blue-400">মোবাইল ও ওয়েব ত্রুটি</span>
        </div>

        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 shadow-sm">
          <span className="text-xs font-medium text-purple-800 dark:text-purple-400">ফিচার ও পরিচর্যা</span>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-200 mt-1">
            {analytics.featureRequestsCount + analytics.ministryNeedsCount}
          </div>
          <span className="text-[11px] text-purple-700 dark:text-purple-400">ব্যবহারকারী চাহিদা</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <span className="text-xs font-medium text-emerald-800 dark:text-emerald-400">ইমেইল নোটিফিকেশন</span>
          <div className="text-lg font-bold text-emerald-900 dark:text-emerald-200 mt-1 flex items-center gap-1">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>{analytics.emailsSentCount} প্রেরিত</span>
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
            {analytics.emailsFailedCount > 0
              ? `${analytics.emailsFailedCount} ব্যর্থ`
              : 'সবগুলো সফল'}
          </span>
        </div>
      </div>

      {/* Theological Safeguard Note */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">পবিত্র শাস্ত্র সুরক্ষা নির্দেশিকা:</strong> ব্যবহারকারীর সংশোধন রিপোর্ট শাস্ত্রের কোনো পদ স্বয়ংক্রিয়ভাবে পরিবর্তন করতে পারে না। যে কোনো বাইবেল পদ সংক্রান্ত রিপোর্ট বাধ্যতামূলকভাবে{' '}
          <span className="font-mono font-bold">BIBLE_DATA_REVIEW_REQUIRED</span> অথবা{' '}
          <span className="font-mono font-bold">THEOLOGICAL_REVIEW_REQUIRED</span> অবস্থায় থাকে এবং অনুমোদিত স্কলারের মূল হিব্রু/গ্রিক ও অনুমোদিত মুদ্রণ মিলিয়ে দেখার পরই কেবল সমাধান হতে পারে।
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="রেফারেন্স, পদ, বিষয়, প্রেরকের নাম বা ইমেইল খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">সকল স্থিতি (All Statuses)</option>
              {Object.entries(STATUS_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.bn} ({k})
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">সকল ক্যাটাগরি (All Categories)</option>
              {PRIMARY_FEEDBACK_CARDS.map((card) => (
                <option key={card.category} value={card.category}>
                  {card.titleBn}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">সকল অগ্রাধিকার (All Priorities)</option>
              {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.bn} ({k})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
          <span>মোট {filteredList.length}টি আবেদন দৃশ্যমান</span>
          {(searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL' || priorityFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setCategoryFilter('ALL');
                setPriorityFilter('ALL');
                setEmailStatusFilter('ALL');
              }}
              className="text-amber-600 hover:underline font-medium"
            >
              ফিল্টার রিসেট করুন
            </button>
          )}
        </div>
      </div>

      {/* Main Inbox List */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center text-stone-500 text-sm">
            কোনো আবেদন পাওয়া যায়নি।
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {filteredList.map((item) => {
              const statusInfo = STATUS_LABELS[item.status] || {
                bn: item.status,
                color: 'text-stone-800',
                badgeBg: 'bg-stone-100 border-stone-200',
              };
              const priorityInfo = PRIORITY_LABELS[item.priority] || {
                bn: item.priority,
                color: 'text-stone-800',
                badgeBg: 'bg-stone-100 border-stone-200',
              };
              const emailInfo = EMAIL_STATUS_LABELS[item.emailDelivery?.status || 'QUEUED'];

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                        {item.referenceNumber}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${statusInfo.badgeBg} ${statusInfo.color}`}
                      >
                        {statusInfo.bn}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${priorityInfo.badgeBg} ${priorityInfo.color}`}
                      >
                        {priorityInfo.bn}
                      </span>
                      {item.duplicateOf && (
                        <span className="text-[10px] bg-purple-100 text-purple-800 border border-purple-200 px-1.5 py-0.5 rounded">
                          পুনরাবৃত্তি ({item.duplicateOf})
                        </span>
                      )}
                      {item.consentForTestimonial && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold">
                          ★ টেস্টমোনিয়াল সম্মতি আছে
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                      {item.subject}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 pt-1">
                      {item.name && (
                        <span className="flex items-center gap-1 font-medium text-stone-700 dark:text-stone-300">
                          <User className="w-3 h-3 text-stone-400" />
                          {item.name}
                        </span>
                      )}
                      {item.bibleContext && (
                        <span className="flex items-center gap-1 text-amber-800 dark:text-amber-400 font-medium">
                          <BookOpen className="w-3 h-3 text-amber-600" />
                          {item.bibleContext.bookNameBn} {item.bibleContext.chapter}:
                          {item.bibleContext.verse || '১'}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-stone-400" />
                        ইমেইল: <span className={emailInfo.color}>{emailInfo.bn}</span>
                      </span>
                      <span>
                        {new Date(item.createdAt).toLocaleDateString('bn-BD', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenItem(item)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>পর্যালোচনা ও উত্তর</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* User Research & Insights Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Top Problems */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>শীর্ষ রিপোর্টকৃত সমস্যা</span>
          </h3>
          <div className="space-y-2">
            {analytics.topReportedProblems.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300 p-2 rounded-lg bg-stone-50 dark:bg-stone-800/60"
              >
                <span className="truncate">{p.label}</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                  {p.count}টি
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What Users Need */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4 text-blue-500" />
            <span>ব্যবহারকারীরা কী চান (চাহিদা)</span>
          </h3>
          <div className="space-y-2">
            {analytics.whatUsersNeed.map((n, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300 p-2 rounded-lg bg-stone-50 dark:bg-stone-800/60"
              >
                <span className="truncate">{n.label}</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-400">
                  {n.count}টি
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ministry Needs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-emerald-500" />
            <span>পরিচর্যা ও সেবামূলক চাহিদা</span>
          </h3>
          <div className="space-y-2">
            {analytics.ministryResearchBreakdown.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300 p-2 rounded-lg bg-stone-50 dark:bg-stone-800/60"
              >
                <span className="truncate">{m.label}</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {m.count}টি
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Inspection & Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-3xl w-full p-6 my-8 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-300 dark:border-amber-700">
                    {selectedItem.referenceNumber}
                  </span>
                  <span className="text-xs text-stone-500">
                    জমাদান: {new Date(selectedItem.createdAt).toLocaleString('bn-BD')}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-1 font-serif">
                  {selectedItem.subject}
                </h2>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
              >
                ✕
              </button>
            </div>

            {updateMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{updateMessage}</span>
              </div>
            )}

            {/* Submission Details */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
                <div className="font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  বিস্তারিত বিবরণ:
                </div>
                <p className="text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Bible Context */}
              {selectedItem.bibleContext && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200">
                  <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-900 dark:text-amber-300">
                    <BookOpen className="w-3.5 h-3.5" />
                    বাইবেল শ্লোক ও অনুবাদের প্রেক্ষাপট:
                  </div>
                  <div>
                    পুস্তক: <strong className="font-semibold">{selectedItem.bibleContext.bookNameBn}</strong> | অধ্যায়: {selectedItem.bibleContext.chapter} | পদ: {selectedItem.bibleContext.verse || '১'} | সংস্করণ: {selectedItem.bibleContext.translationId}
                  </div>
                  {selectedItem.bibleContext.displayedText && (
                    <div className="mt-1 font-mono text-[11px] bg-white/60 dark:bg-stone-900/60 p-2 rounded border border-amber-200 dark:border-amber-900">
                      {selectedItem.bibleContext.displayedText}
                    </div>
                  )}
                </div>
              )}

              {/* Technical Context */}
              {selectedItem.technicalContext && (
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[11px] font-mono text-stone-600 dark:text-stone-400 space-y-0.5">
                  <div className="font-bold text-stone-800 dark:text-stone-200 font-sans mb-1">
                    কারিগরি ডায়াগনস্টিক তথ্য:
                  </div>
                  <div>ডিভাইস/ওএস: {selectedItem.technicalContext.osFamily} | ব্রাউজার: {selectedItem.technicalContext.browserFamily}</div>
                  <div>পর্দার ধরন: {selectedItem.technicalContext.screenCategory} | অ্যাপ মোড: {selectedItem.technicalContext.pwaMode}</div>
                  <div>অনলাইন স্থিতি: {selectedItem.technicalContext.isOnline ? 'সক্রিয় (Online)' : 'অফলাইন'}</div>
                </div>
              )}

              {/* Attached Screenshot */}
              {selectedItem.screenshotBase64 && (
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  <div className="font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    সংযুক্ত স্ক্রিনশট ({selectedItem.screenshotName || 'Image'}):
                  </div>
                  <img
                    src={selectedItem.screenshotBase64}
                    alt="Attached Screenshot"
                    className="max-h-56 rounded-lg border border-stone-300 shadow-sm object-contain"
                  />
                </div>
              )}

              {/* Submitter & Email Dispatch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <div>
                  <div className="font-semibold text-stone-700 dark:text-stone-300">প্রেরকের তথ্য:</div>
                  <div className="text-stone-600 dark:text-stone-400">নাম: {selectedItem.name || 'নাম প্রকাশে অনিচ্ছুক'}</div>
                  <div className="text-stone-600 dark:text-stone-400">ইমেইল: {selectedItem.email || 'ইমেইল দেওয়া হয়নি'}</div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    টেস্টমোনিয়াল সম্মতি: {selectedItem.consentForTestimonial ? 'হ্যাঁ (অনুমোদিত)' : 'না'}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-stone-700 dark:text-stone-300">ইমেইল নোটিফিকেশন:</div>
                  <div className="text-stone-600 dark:text-stone-400">
                    প্রাপক: <span className="font-mono text-amber-700 dark:text-amber-400">{selectedItem.emailDelivery.recipient}</span>
                  </div>
                  <div className="text-stone-600 dark:text-stone-400">
                    স্ট্যাটাস: <span className="font-semibold">{selectedItem.emailDelivery.status}</span> (চেষ্টা: {selectedItem.emailDelivery.retryCount})
                  </div>
                </div>
              </div>

              {/* Internal Notes Timeline */}
              {selectedItem.internalNotes && selectedItem.internalNotes.length > 0 && (
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
                  <div className="font-bold text-purple-900 dark:text-purple-300">
                    অভ্যন্তরীণ সম্পাদকীয় নোট ইতিহাস:
                  </div>
                  {selectedItem.internalNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-2 rounded bg-white/80 dark:bg-stone-900/80 border border-purple-100 dark:border-purple-900 text-xs"
                    >
                      <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                        <span className="font-semibold text-purple-800 dark:text-purple-400">{note.author}</span>
                        <span>{new Date(note.timestamp).toLocaleString('bn-BD')}</span>
                      </div>
                      <p className="text-stone-800 dark:text-stone-200">{note.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status & Resolution Update Form */}
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-3 text-xs">
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                আবেদনের স্থিতি ও মীমাংসা আপডেট করুন
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    স্থিতি (Status)
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as FeedbackStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs"
                  >
                    {Object.entries(STATUS_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.bn} ({k})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    অগ্রাধিকার (Priority)
                  </label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value as FeedbackPriority)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs"
                  >
                    {Object.entries(PRIORITY_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.bn} ({k})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  মীমাংসার সারসংক্ষেপ (অভ্যন্তরীণ রেকর্ড)
                </label>
                <input
                  type="text"
                  value={resolutionSummary}
                  onChange={(e) => setResolutionSummary(e.target.value)}
                  placeholder="উদা: IRV মূলপাঠ যাচাই করে মন্তব্য কলামে ব্যাখ্যা যুক্ত করা হয়েছে।"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  ব্যবহারকারীর প্রতি উত্তর (প্রকাশ্য নোটিফিকেশন বা ট্র্যাকারে দৃশ্যমান)
                </label>
                <textarea
                  rows={2}
                  value={userFacingResponse}
                  onChange={(e) => setUserFacingResponse(e.target.value)}
                  placeholder="ব্যবহারকারী যখন তার রেফারেন্স নম্বর দিয়ে ট্র্যাকার দেখবেন তখন এই বার্তাটি প্রদর্শিত হবে..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  নতুন অভ্যন্তরীণ নোট যুক্ত করুন (Rev. Ayan Kumar Ghosh)
                </label>
                <input
                  type="text"
                  value={newInternalNote}
                  onChange={(e) => setNewInternalNote(e.target.value)}
                  placeholder="পর্যালোচনামূলক কোনো ব্যক্তিগত নোট বা সিদ্ধান্ত..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 font-semibold text-xs hover:bg-stone-200 dark:hover:bg-stone-700"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={isUpdating}
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isUpdating ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackDashboardScreen;
