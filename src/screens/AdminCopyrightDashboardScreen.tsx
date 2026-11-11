import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { RightsService, RightsIntegrityAuditResult } from '../services/rightsService';
import { RightsBadge } from '../components/rights/RightsBadge';
import { CopyrightConcernRecord } from '../types/rights';

export const AdminCopyrightDashboardScreen: React.FC = () => {
  const [auditResult, setAuditResult] = useState<RightsIntegrityAuditResult>(() =>
    RightsService.runRightsIntegrityAudit()
  );
  const [selectedResourceId, setSelectedResourceId] = useState<string>('res-irv-ben');
  const [concerns, setConcerns] = useState<CopyrightConcernRecord[]>(() =>
    RightsService.getConcerns()
  );

  const resources = RightsService.getResourceRightsList();
  const translations = RightsService.getBibleTranslationRightsList();
  const selectedSummary = RightsService.getProvenanceSummary(selectedResourceId);

  const handleRunAudit = () => {
    const res = RightsService.runRightsIntegrityAudit();
    setAuditResult(res);
  };

  const handleUpdateConcern = (id: string, status: CopyrightConcernRecord['status']) => {
    RightsService.updateConcernStatus(id, status, 'এডমিন কর্তৃক পর্যালোচিত');
    setConcerns(RightsService.getConcerns());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950 text-gold-400 text-xs font-semibold mb-2 border border-navy-800">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>প্রশাসনিক স্বত্বাধিকার নিরীক্ষা ড্যাশবোর্ড</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-navy-950 dark:text-gold-300">
            রাইটস ম্যানেজমেন্ট ও অডিট কনসোল
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            প্রকল্প পরিচালক: <strong>রেভা. অয়ন কুমার ঘোষ</strong> | অফিসিয়াল যোগাযোগ: ayanghosh75@gmail.com
          </p>
        </div>

        <button
          onClick={handleRunAudit}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400 text-xs font-bold shadow transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>সম্পূর্ণ লাইসেন্স অডিট চালান</span>
        </button>
      </div>

      {/* Audit Summary Box */}
      <div
        className={`p-5 rounded-3xl border mb-8 ${
          auditResult.status === 'PASSED'
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-100'
            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-100'
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            {auditResult.status === 'PASSED' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            )}
            <h3 className="font-serif font-bold text-base">
              স্বত্বাধিকার নিরীক্ষা স্থিতি: {auditResult.status === 'PASSED' ? '১০০% উত্তীর্ণ (PASSED)' : 'ত্রুটি শনাক্ত (FAILED)'}
            </h3>
          </div>
          <span className="text-xs opacity-75 font-mono">
            সর্বশেষ নিরীক্ষা: {new Date(auditResult.auditedAt).toLocaleTimeString()}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
          <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-navy-900/60 border border-current/10">
            <span className="opacity-75 block text-[11px]">মোট নিরীক্ষিত উপাদান:</span>
            <strong className="text-base font-mono">{auditResult.totalAudited}</strong>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-navy-900/60 border border-current/10">
            <span className="opacity-75 block text-[11px]">আইনত বৈধ ও প্রতিপাদিত:</span>
            <strong className="text-base font-mono text-emerald-600 dark:text-emerald-400">{auditResult.passed}</strong>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-navy-900/60 border border-current/10">
            <span className="opacity-75 block text-[11px]">সতর্কতা (Warnings):</span>
            <strong className="text-base font-mono text-amber-600">{auditResult.warnings.length}</strong>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-navy-900/60 border border-current/10">
            <span className="opacity-75 block text-[11px]">উদ্বেগজনক ত্রুটি (Errors):</span>
            <strong className="text-base font-mono text-rose-600">{auditResult.errors.length}</strong>
          </div>
        </div>

        {auditResult.errors.length > 0 && (
          <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-xs font-mono space-y-1">
            <div className="font-bold">শনাক্তকৃত ত্রুটিসমূহ:</div>
            {auditResult.errors.map((err, i) => (
              <div key={i}>• {err}</div>
            ))}
          </div>
        )}
      </div>

      {/* 3 Core Questions Provenance Explorer */}
      <div className="mb-8">
        <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-2">
          ৩টি মৌলিক প্রশ্নের তাৎক্ষণিক উত্তর অন্বেষণ
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          প্রতিটি উপাদান উত্তর দিতে সক্ষম: ১. এটি কোথা থেকে এসেছে? ২. এর মালিক কে? ৩. এটি দিয়ে কী করার অনুমতি রয়েছে?
        </p>

        {/* Resource Selector Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {resources.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedResourceId(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                selectedResourceId === r.id
                  ? 'bg-navy-950 text-white dark:bg-gold-500 dark:text-navy-950 font-bold border-transparent shadow'
                  : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-navy-700 hover:bg-slate-50'
              }`}
            >
              {r.resourceTitleBn}
            </button>
          ))}
        </div>

        {selectedSummary && (
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800 mb-4">
              <div>
                <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300">
                  {selectedSummary.titleBn}
                </h3>
                <p className="text-slate-400">{selectedSummary.titleEn} ({selectedSummary.resourceId})</p>
              </div>
              <RightsBadge status={selectedSummary.rightsStatus} size="md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800">
                <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">
                  ১. কোথা থেকে এসেছে? (Origin)
                </span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                  {selectedSummary.origin.sourceTitleBn}
                </p>
                <div className="text-slate-500 space-y-0.5 text-[11px]">
                  <div>প্রকাশক: {selectedSummary.origin.publisher || 'N/A'}</div>
                  <div>বছর/সংস্করণ: {selectedSummary.origin.publicationDate || selectedSummary.origin.edition || 'N/A'}</div>
                  <div>আইনি প্রতিপাদন: {selectedSummary.origin.verified ? '✅ যাচাইকৃত' : '⏳ যাচাইধীন'}</div>
                </div>
              </div>

              {/* Box 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                  ২. এর মালিক কে? (Ownership)
                </span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                  {selectedSummary.owner.nameBn}
                </p>
                <div className="text-slate-500 space-y-0.5 text-[11px]">
                  <div>প্রকার: {selectedSummary.owner.rightsHolderType}</div>
                  <div>প্রজেক্ট প্রতিষ্ঠাতা: {selectedSummary.owner.isProjectOwner ? 'হ্যাঁ (রেভা. অয়ন কুমার ঘোষ)' : 'না (তৃতীয় পক্ষ)'}</div>
                  <div>কপিরাইট: {selectedSummary.owner.copyrightNoticeBn}</div>
                </div>
              </div>

              {/* Box 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                  ৩. কী করার অনুমতি রয়েছে? (Permissions)
                </span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                  লাইসেন্স: {selectedSummary.licenseCode}
                </p>
                <div className="text-slate-600 dark:text-slate-400 space-y-0.5 text-[11px]">
                  <div>পাবলিশ স্থিতি: {selectedSummary.allowedUses.canPublish ? '✅ প্রকাশিত' : '🛑 স্থগিত / বন্ধ'}</div>
                  <div>অনলাইনে পঠন: {selectedSummary.allowedUses.canDisplay ? '✅ লভ্য' : '❌ সীমাবদ্ধ'}</div>
                  <div>অফলাইন স্টোরেজ: {selectedSummary.allowedUses.canOfflineStore ? '✅ অনুমতি আছে' : '❌ নিষিদ্ধ'}</div>
                  <div>এআই আরএজি গবেষণা: {selectedSummary.allowedUses.canAIIngest ? '✅ অনুমোদিত' : '❌ নিষিদ্ধ'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Translation Rights Status Queue */}
      <div className="mb-8">
        <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3">
          বাইবেল অনুবাদ স্বত্বাধিকার তালিকা
        </h2>
        <div className="space-y-3">
          {translations.map((t) => (
            <div
              key={t.translationId}
              className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-navy-950 dark:text-gold-300">{t.translationNameBn}</span>
                  <span className="font-mono text-[10px] text-slate-400">({t.shortCode})</span>
                  <RightsBadge status={t.rightsStatus} size="sm" />
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  প্রকাশক: {t.publisherBn} | স্থিতি: {t.permissionStatus === 'GRANTED' ? 'অনুমোদিত' : t.permissionStatus === 'NOT_REQUIRED' ? 'পাবলিক ডোমেইন' : 'লাইসেন্স যাচাইধীন'}
                </p>
              </div>

              <div className="text-right sm:self-center">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    t.fullTextStorageAllowed
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  পূর্ণ টেক্সট: {t.fullTextStorageAllowed ? 'সক্রিয় (ENABLED)' : 'স্থগিত (DISABLED)'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Concerns Queue */}
      <div>
        <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3">
          কপিরাইট আপত্তি ও যোগাযোগ কিউ ({concerns.length})
        </h2>

        {concerns.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-center text-xs text-slate-400">
            বর্তমানে কোনো বকেয়া কপিরাইট আপত্তি বা অভিযোগ নেই।
          </div>
        ) : (
          <div className="space-y-3">
            {concerns.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm text-xs"
              >
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 dark:border-navy-800 mb-2">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{c.complainantName}</span>
                    <span className="text-slate-400 ml-2">({c.complainantEmail})</span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">আইডি: {c.id}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    {c.status}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-2">{c.concernDescription}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateConcern(c.id, 'UNDER_REVIEW')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px]"
                  >
                    পর্যালোচনায় নিন
                  </button>
                  <button
                    onClick={() => handleUpdateConcern(c.id, 'RESOLVED')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px]"
                  >
                    নিষ্পন্ন চিহ্নিত করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
