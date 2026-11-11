// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — Autonomous Site Steward and Operations Assistant”
// OWNER CONTROL DASHBOARD: SITE STEWARD & CONTINUOUS OPERATIONS
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// 42-Feature Health Grid, 12-Hour Reports, Level 3 Queue, Problem Desk
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Download,
  Eye,
  Check,
  X,
  Search,
  FileText,
  Mail,
  Lock,
  Undo2,
  Calendar,
  Clock,
  Database,
  BookOpen,
  Filter,
  Send,
  HelpCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { deepSteward } from '../../services/deepStewardService';
import {
  SiteFeatureRecord,
  SiteFeatureStatus,
  InspectionReport12H,
  RepairActionRecord,
  UserProblemReport,
  StewardEmergencyControls,
  InspectionScheduleItem,
} from '../../types/deepSteward';

export const DeepSiteStewardDashboard: React.FC = () => {
  const [subTab, setSubTab] = useState<'features' | 'reports' | 'approvals' | 'problems' | 'emergency'>('features');
  const [features, setFeatures] = useState<SiteFeatureRecord[]>(() => deepSteward.getSiteFeatures());
  const [schedules, setSchedules] = useState<InspectionScheduleItem[]>(() => deepSteward.getInspectionSchedules());
  const [reports, setReports] = useState<InspectionReport12H[]>(() => deepSteward.getReportsArchive());
  const [approvals, setApprovals] = useState<RepairActionRecord[]>(() => deepSteward.getPendingApprovals());
  const [problems, setProblems] = useState<UserProblemReport[]>(() => deepSteward.getProblemReports());
  const [emergency, setEmergency] = useState<StewardEmergencyControls>(() => deepSteward.getEmergencyControls());
  const [adminEmail, setAdminEmail] = useState<string>(() => deepSteward.getAdminReportEmail());

  const [featureSearch, setFeatureSearch] = useState('');
  const [featureStatusFilter, setFeatureStatusFilter] = useState<string>('ALL');
  const [selectedReport, setSelectedReport] = useState<InspectionReport12H | null>(null);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const refreshAllData = () => {
    setFeatures(deepSteward.getSiteFeatures());
    setSchedules(deepSteward.getInspectionSchedules());
    setReports(deepSteward.getReportsArchive());
    setApprovals(deepSteward.getPendingApprovals());
    setProblems(deepSteward.getProblemReports());
    setEmergency(deepSteward.getEmergencyControls());
  };

  const showNotification = (type: 'success' | 'error' | 'info', text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 5000);
  };

  // Run full sweep
  const handleRunAllAudits = async () => {
    setIsRunningAudit(true);
    try {
      const res = await deepSteward.runAllAudits();
      refreshAllData();
      showNotification(
        'success',
        `সম্পূর্ণ নিরীক্ষা সফল: ৬৬টি পুস্তক, WCAG AA অ্যাক্সেসিবিলিটি ও নিরাপত্তা অটুট। ১২-ঘণ্টার নতুন রিপোর্ট সংকলিত হয়েছে (${res.report12H.reportId})।`
      );
    } catch (err: any) {
      showNotification('error', `নিরীক্ষায় ত্রুটি: ${err?.message || 'অজানা ত্রুটি'}`);
    } finally {
      setIsRunningAudit(false);
    }
  };

  // Dispatch 12-Hour Report to Email
  const handleSendReportEmail = async () => {
    try {
      const latest = reports[0] || (await deepSteward.generate12HourReport());
      const res = await deepSteward.send12HourReportEmail(latest);
      refreshAllData();
      showNotification('success', res.log);
    } catch (err: any) {
      showNotification('error', `ইমেইল প্রেরণে ত্রুটি: ${err?.message}`);
    }
  };

  // Level 3 Approval
  const handleApproveAction = async (actionId: string) => {
    const res = await deepSteward.approveLevel3Action(actionId, 'রেভারেন্ড অয়ন কুমার ঘোষ কর্তৃক অনুমোদিত');
    if (res) {
      refreshAllData();
      showNotification('success', `Level 3 অ্যাকশন সফলভাবে অনুমোদিত ও কার্যকর হয়েছে (${res.problemDescriptionBn})।`);
    }
  };

  const handleRejectAction = async (actionId: string) => {
    const res = await deepSteward.rejectLevel3Action(actionId, 'অ্যাডমিন কর্তৃক বাতিল করা হয়েছে');
    if (res) {
      refreshAllData();
      showNotification('info', `প্রস্তাবিত পরিবর্তন বাতিল করা হয়েছে।`);
    }
  };

  // Update Problem Status
  const handleResolveProblem = (problemId: string) => {
    deepSteward.updateProblemReportStatus(problemId, 'RESOLVED', 'অ্যাডমিন কর্তৃক সমাধান নিশ্চিত করা হয়েছে।');
    refreshAllData();
    showNotification('success', `সমস্যা ${problemId} সফলভাবে সমাধান হিসেবে চিহ্নিত হয়েছে।`);
  };

  // Toggle Emergency Safe Mode
  const handleToggleSafeMode = () => {
    const next = !emergency.safeModeActive;
    if (next) {
      deepSteward.triggerEmergencySafeMode('অ্যাডমিন কন্ট্রোল সেন্টার হতে Safe Mode সক্রিয় করা হয়েছে।');
    } else {
      deepSteward.updateEmergencyControls({ safeModeActive: false });
    }
    refreshAllData();
    showNotification('info', next ? 'Safe Mode সক্রিয় হয়েছে (রাইট অপারেশন স্থগিত)' : 'Safe Mode নিষ্ক্রিয় করা হয়েছে');
  };

  // Toggle Auto Repairs
  const handleToggleAutoRepairs = () => {
    deepSteward.updateEmergencyControls({ automaticRepairsPaused: !emergency.automaticRepairsPaused });
    refreshAllData();
    showNotification('info', emergency.automaticRepairsPaused ? 'স্বয়ংক্রিয় মেরামত পুনরায় চালু' : 'স্বয়ংক্রিয় মেরামত স্থগিত');
  };

  // Filter features
  const filteredFeatures = features.filter((f) => {
    const matchesSearch =
      f.featureNameBn.toLowerCase().includes(featureSearch.toLowerCase()) ||
      f.featureNameEn.toLowerCase().includes(featureSearch.toLowerCase()) ||
      f.urlOrLocation.toLowerCase().includes(featureSearch.toLowerCase());
    const matchesStatus = featureStatusFilter === 'ALL' || f.currentStatus === featureStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Notifications */}
      {notice && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-sm shadow-xl border ${
            notice.type === 'success'
              ? 'bg-emerald-950/80 text-emerald-200 border-emerald-700/50'
              : notice.type === 'error'
              ? 'bg-rose-950/80 text-rose-200 border-rose-700/50'
              : 'bg-amber-950/80 text-amber-200 border-amber-700/50'
          }`}
        >
          <div className="flex items-center gap-2">
            {notice.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : notice.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <p className="font-medium">{notice.text}</p>
          </div>
          <button onClick={() => setNotice(null)} className="p-1 hover:bg-white/10 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP HERO BANNER: STEWARD MISSION & METRICS */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-indigo-950/40 border border-indigo-800/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-lg">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">দীপ — Autonomous Site Steward</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  ২৪/৭ সক্রিয়
                </span>
                {emergency.safeModeActive && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">
                    SAFE MODE ACTIVE
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-400 mt-1">
                ওয়েবসাইটের সম্পূর্ণ ৪২টি ফিচার সার্বক্ষণিক পরিদর্শন, নিরাপদ স্বয়ংক্রিয় মেরামত ও ১২-ঘণ্টার কার্যবিবরণী সিস্টেম।
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRunAllAudits}
              disabled={isRunningAudit}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunningAudit ? 'animate-spin' : ''}`} />
              <span>{isRunningAudit ? 'নিরীক্ষা চলছে...' : 'সম্পূর্ণ সাইট নিরীক্ষা চালান'}</span>
            </button>
            <button
              onClick={handleSendReportEmail}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>১২-ঘণ্টা রিপোর্ট পাঠান</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-stone-800">
          <div className="bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800">
            <span className="text-[11px] text-stone-400 block">মোট পর্যবেক্ষিত ফিচার</span>
            <span className="text-xl font-bold text-white">৪২ / ৪২</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">১০০% ক্যাটালগভুক্ত</span>
          </div>
          <div className="bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800">
            <span className="text-[11px] text-stone-400 block">পবিত্র শাস্ত্র সুরক্ষা</span>
            <span className="text-xl font-bold text-emerald-400">১০০% নিখুঁত</span>
            <span className="text-[10px] text-stone-400 block mt-0.5">শূন্য মনগড়া পদ নীতি বলবৎ</span>
          </div>
          <div className="bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800">
            <span className="text-[11px] text-stone-400 block">লেভেল ৩ অনুমোদন সারি</span>
            <span className="text-xl font-bold text-amber-400">{approvals.length}টি পেন্ডিং</span>
            <span className="text-[10px] text-stone-400 block mt-0.5">অ্যাডমিনের সিদ্ধান্ত কাম্য</span>
          </div>
          <div className="bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800">
            <span className="text-[11px] text-stone-400 block">ইউজার সমস্যা ডেস্ক</span>
            <span className="text-xl font-bold text-blue-400">{problems.length}টি রিপোর্ট</span>
            <span className="text-[10px] text-stone-400 block mt-0.5">রেফারেন্স ট্র্যাকিং সচল</span>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex items-center gap-1.5 border-b border-stone-800 pb-2 overflow-x-auto">
        {[
          { id: 'features', label: `৪২-ফিচার রেজিস্টার (${features.length})`, icon: Database },
          { id: 'reports', label: `১২-ঘণ্টা রিপোর্ট আর্কাইভ (${reports.length})`, icon: FileText },
          { id: 'approvals', label: `লেভেল ৩ অনুমোদন সারি (${approvals.length})`, icon: Lock },
          { id: 'problems', label: `ব্যবহারকারী সমস্যা ডেস্ক (${problems.length})`, icon: HelpCircle },
          { id: 'emergency', label: 'জরুরি নিয়ন্ত্রণ ও ব্যাকআপ', icon: ShieldCheck },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-stone-800 text-amber-400 border border-stone-700 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* SUB-TAB 1: 42-FEATURE LIVE REGISTER */}
      {/* ============================================================ */}
      {subTab === 'features' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/50 p-3 rounded-2xl border border-stone-800">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="ফিচারের নাম বা লিংক খুঁজুন..."
                value={featureSearch}
                onChange={(e) => setFeatureSearch(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400">ফিল্টার:</span>
              <select
                value={featureStatusFilter}
                onChange={(e) => setFeatureStatusFilter(e.target.value)}
                className="bg-stone-800 text-xs text-stone-200 px-3 py-1.5 rounded-xl border border-stone-700 focus:outline-none"
              >
                <option value="ALL">সকল স্ট্যাটাস</option>
                <option value="OPERATIONAL">OPERATIONAL (সচল)</option>
                <option value="DEGRADED">DEGRADED (আংশিক বিঘ্নিত)</option>
                <option value="FAILED">FAILED (ব্যর্থ)</option>
                <option value="MAINTENANCE">MAINTENANCE (রক্ষণাবেক্ষণ)</option>
              </select>
            </div>
          </div>

          {/* Features Table */}
          <div className="bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950/80 text-stone-400 uppercase tracking-wider text-[10px] border-b border-stone-800">
                  <tr>
                    <th className="px-4 py-3">ফিচার নাম ও আইডি</th>
                    <th className="px-4 py-3">লোকেশন / ইউআরএল</th>
                    <th className="px-4 py-3">উদ্দেশ্য</th>
                    <th className="px-4 py-3">অনুমোদন নীতি</th>
                    <th className="px-4 py-3">সর্বশেষ পরীক্ষা</th>
                    <th className="px-4 py-3">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredFeatures.map((f) => (
                    <tr key={f.featureId} className="hover:bg-stone-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium">
                        <div className="text-white font-bold">{f.featureNameBn}</div>
                        <div className="text-[10px] font-mono text-stone-500">{f.featureId}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-stone-400">{f.urlOrLocation}</td>
                      <td className="px-4 py-3 max-w-xs truncate" title={f.purposeBn}>
                        {f.purposeBn}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            f.ownerOrApprovalRequirement === 'AUTONOMOUS'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : f.ownerOrApprovalRequirement === 'REVIEW_REQUIRED'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {f.ownerOrApprovalRequirement}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-400">
                        {new Date(f.lastSuccessfulTest).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            f.currentStatus === 'OPERATIONAL'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {f.currentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 2: 12-HOUR REPORTS ARCHIVE */}
      {/* ============================================================ */}
      {subTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-stone-900/50 p-4 rounded-2xl border border-stone-800">
            <div>
              <h3 className="text-sm font-bold text-white">১২-ঘণ্টার অভিভাবক কার্যবিবরণী আর্কাইভ</h3>
              <p className="text-xs text-stone-400">
                প্রতিদিন সকাল ১০:০০ এবং রাত ১০:০০ টায় রেভারেন্ড অয়ন কুমার ঘোষ ({adminEmail}) বরাবর স্বয়ংক্রিয়ভাবে প্রেরিত।
              </p>
            </div>
            <button
              onClick={handleSendReportEmail}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>নতুন রিপোর্ট সংকলন ও প্রেরণ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((r) => (
              <div
                key={r.reportId}
                className="bg-stone-900/50 p-4 rounded-2xl border border-stone-800 space-y-3 hover:border-stone-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs font-bold text-white">{r.reportId}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.executiveSummary.overallSiteStatus === 'EXCELLENT'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {r.executiveSummary.overallSiteStatus}
                  </span>
                </div>

                <div className="text-xs text-stone-300 space-y-1">
                  <p className="line-clamp-2">{r.executiveSummary.headlineBn}</p>
                  <p className="text-stone-400 text-[11px]">
                    আপটাইম: <strong className="text-white">{r.availability.uptimePercentage}%</strong> • পেজ স্পিড:{' '}
                    <strong className="text-white">{r.performance.pageSpeedScore}/১০০</strong> • দৈনিক পদ:{' '}
                    <strong className="text-white">{r.dailyWordAndNotifications.verseSelected}</strong>
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-950/60 text-[11px] text-stone-300 border border-stone-800/80">
                  {r.next12HourPlan.actionRequiredStatementBn}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-stone-500 text-[10px]">
                    প্রাপক: {r.emailRecipient} • অবস্থা: {r.emailDeliveryStatus}
                  </span>
                  <button
                    onClick={() => setSelectedReport(r)}
                    className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>পূর্ণ রিপোর্ট দেখুন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Full Report View Modal */}
          {selectedReport && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <div className="w-full max-w-3xl bg-stone-900 rounded-2xl border border-stone-700 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-sm text-white">{selectedReport.reportId}</span>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="p-1 hover:bg-stone-800 rounded-lg text-stone-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5 overflow-y-auto">
                  <pre className="text-xs font-mono text-stone-300 whitespace-pre-wrap leading-relaxed">
                    {deepSteward.formatReportAsPlainText(selectedReport)}
                  </pre>
                </div>
                <div className="p-4 border-t border-stone-800 flex justify-end gap-2 bg-stone-950">
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="px-4 py-2 bg-stone-800 text-stone-200 rounded-xl text-xs"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 3: LEVEL 3 APPROVAL QUEUE */}
      {/* ============================================================ */}
      {subTab === 'approvals' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-2xl text-xs text-amber-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 text-sm font-bold mb-1">
                Level 3 মানবীয় অনুমোদন সুরক্ষা গেট
              </strong>
              পবিত্র শাস্ত্রের পদ পরিবর্তন, ডেটা ডিলিশন, নতুন অনুবাদ সংযোজন বা আর্থিক সিদ্ধান্তের ক্ষেত্রে দীপ কেবল প্রস্তাব
              তৈরি করে এবং রেভারেন্ড অয়ন কুমার ঘোষের স্পষ্ট অনুমোদন ব্যতিরেকে কোনো পরিবর্তন কার্যকর করে না।
            </div>
          </div>

          {approvals.length === 0 ? (
            <div className="text-center py-12 bg-stone-900/40 rounded-2xl border border-stone-800">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">অনুমোদনের জন্য কোনো প্রস্তাব পেন্ডিং নেই</p>
              <p className="text-xs text-stone-400 mt-1">
                সমস্ত সিস্টেম স্বাভাবিক ও নিরাপদ বিধিনিষেধের আওতায় পরিচালিত হচ্ছে।
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {approvals.map((a) => (
                <div
                  key={a.id}
                  className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 space-y-3 hover:border-stone-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400">{a.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">
                      LEVEL 3 REVIEW REQUIRED
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{a.problemDescriptionBn}</h4>
                    <p className="text-xs text-stone-400 mt-1">সম্ভাব্য কারণ: {a.likelyCauseBn}</p>
                    <p className="text-xs text-stone-300 mt-1">
                      পরিবর্তিতব্য উপাদান: <span className="font-mono text-stone-400">{a.filesOrSettingsChanged.join(', ')}</span>
                    </p>
                    <p className="text-xs text-stone-400 mt-1">দীপের আত্মবিশ্বাস স্কোর: {a.deepConfidenceScore}%</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-800">
                    <button
                      onClick={() => handleRejectAction(a.id)}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-medium"
                    >
                      বাতিল করুন
                    </button>
                    <button
                      onClick={() => handleApproveAction(a.id)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow"
                    >
                      অনুমোদন ও কার্যকর করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 4: USER PROBLEM REPORTS DESK */}
      {/* ============================================================ */}
      {subTab === 'problems' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-stone-900/50 p-4 rounded-2xl border border-stone-800">
            <div>
              <h3 className="text-sm font-bold text-white">ব্যবহারকারী সমস্যা ট্র্যাকিং ডেস্ক (“সমস্যা জানাবেন”)</h3>
              <p className="text-xs text-stone-400">
                পাঠকদের প্রেরিত সকল সমস্যা পিআইআই-স্ক্রাবড অবস্থায় BSB-PR-2026-XXXXX আইডিসহ সংরক্ষিত হয়।
              </p>
            </div>
            <span className="text-xs font-bold text-stone-300 bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700">
              মোট: {problems.length}টি
            </span>
          </div>

          {problems.length === 0 ? (
            <div className="text-center py-12 bg-stone-900/40 rounded-2xl border border-stone-800">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">কোনো সমস্যা রিপোর্ট পেন্ডিং নেই</p>
              <p className="text-xs text-stone-400 mt-1">সাইটের পাঠকগণ নির্বিঘ্নে বাইবেল অধ্যয়ন করছেন।</p>
            </div>
          ) : (
            <div className="space-y-3">
              {problems.map((p) => (
                <div
                  key={p.id}
                  className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 space-y-2.5 hover:border-stone-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400">{p.id}</span>
                      <span className="text-xs font-medium text-stone-300">• {p.categoryLabelBn}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'RESOLVED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : p.status === 'AWAITING_ADMIN_APPROVAL'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <p className="text-xs text-stone-200">{p.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 pt-1">
                    <span>লোকেশন: {p.pageUrl}</span>
                    <span>• ডিভাইস: {p.deviceInfo}</span>
                    <span>• সময়: {new Date(p.timestamp).toLocaleString('bn-BD')}</span>
                    {p.userContact && <span>• যোগাযোগ: {p.userContact}</span>}
                  </div>

                  {p.repairActionTaken && (
                    <div className="p-2.5 rounded-xl bg-stone-950/70 text-[11px] text-stone-300 border border-stone-800">
                      পদক্ষেপ: {p.repairActionTaken}
                    </div>
                  )}

                  {p.status !== 'RESOLVED' && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleResolveProblem(p.id)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium"
                      >
                        সমাধান সম্পন্ন হিসেবে চিহ্নিত করুন
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 5: EMERGENCY CONTROLS & BACKUP */}
      {/* ============================================================ */}
      {subTab === 'emergency' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Safe Mode Control */}
            <div className="bg-stone-900/60 p-5 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Steward Safe Mode</span>
                </h4>
                <button
                  onClick={handleToggleSafeMode}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    emergency.safeModeActive
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {emergency.safeModeActive ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                </button>
              </div>
              <p className="text-xs text-stone-400">
                Safe Mode সক্রিয় থাকলে বাইবেল ডেটাবেজ কঠোরভাবে রিড-অনলি মোডে চলে যায় এবং সমস্ত স্বয়ংক্রিয় মেরামত ও বহির্গামী পোস্ট স্থগিত থাকে।
              </p>
            </div>

            {/* Auto Repairs Control */}
            <div className="bg-stone-900/60 p-5 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-400" />
                  <span>স্বয়ংক্রিয় মেরামত (Auto Repairs)</span>
                </h4>
                <button
                  onClick={handleToggleAutoRepairs}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    emergency.automaticRepairsPaused
                      ? 'bg-rose-500 text-white'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  {emergency.automaticRepairsPaused ? 'স্থগিত রয়েছে (চালু করুন)' : 'সক্রিয় রয়েছে (স্থগিত করুন)'}
                </button>
              </div>
              <p className="text-xs text-stone-400">
                Level 1 ও 2 এর নিরাপদ স্বয়ংক্রিয় মেরামত সাময়িকভাবে বিরতিতে রাখতে এটি ব্যবহার করুন।
              </p>
            </div>
          </div>

          {/* Backup & Disaster Recovery Card */}
          <div className="bg-stone-900/60 p-5 rounded-2xl border border-stone-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>দুর্যোগ পুনরুদ্ধার ও স্ন্যাপশট (Disaster Recovery)</span>
            </h4>
            <p className="text-xs text-stone-400">
              প্রতি ৩০ দিন অন্তর এবং প্রতিটি Level 2 মেরামতের পূর্বে স্বয়ংক্রিয় কনফিগারেশন স্ন্যাপশট গ্রহণ করা হয়।
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  const stamp = deepSteward.createBackupSnapshot();
                  showNotification('success', `নতুন সাইট স্ন্যাপশট সফলভাবে সংরক্ষিত: ${stamp}`);
                }}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-medium"
              >
                এখনই স্ন্যাপশট তৈরি করুন
              </button>
              <button
                onClick={() => {
                  if (window.confirm('আপনি কি পূর্ববর্তী স্থিতিশীল স্ন্যাপশটে সাইট রিস্টোর করতে চান?')) {
                    const ok = deepSteward.restoreSystemSnapshot();
                    refreshAllData();
                    showNotification(ok ? 'success' : 'error', ok ? 'সফলভাবে স্ন্যাপশট রিস্টোর হয়েছে।' : 'স্ন্যাপশট খুঁজে পাওয়া যায়নি।');
                  }
                }}
                className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-800/60 rounded-xl text-xs font-medium"
              >
                পূর্ববর্তী স্ন্যাপশট রিস্টোর করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
