import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft, ShieldCheck, Eye, Info } from 'lucide-react';
import { AuthService } from '../../services/authService';

interface AdminSecurityGateProps {
  children: React.ReactNode;
  onBackToApp?: () => void;
  title?: string;
}

export const AdminSecurityGate: React.FC<AdminSecurityGateProps> = ({
  children,
  onBackToApp,
  title = 'স্বত্বাধিকারী বিশ্লেষণ ও ডায়াগনস্টিক কেন্দ্র',
}) => {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(() => AuthService.isAdmin());

  const handleOpenReadOnlyDiagnostic = () => {
    AuthService.enableReadOnlyDiagnosticView();
    setIsDiagnosticOpen(true);
  };

  if (isDiagnosticOpen) {
    return (
      <div>
        {/* Phase 0 / Phase 2 Mandatory Truthful Status Banner */}
        <div className="bg-amber-950/90 border-b border-amber-700/60 px-4 py-3 text-xs text-amber-100">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>READ-ONLY DIAGNOSTIC INTERFACE — Admin Command Centre: RESTRICTED UNTIL SERVER-SIDE AUTH IS ACTIVE</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700">Core Bible Reader: PUBLIC BETA</span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700">Deep 24×7 Monitoring: NOT YET ACTIVE</span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700">Backup: LOCAL ONLY UNTIL OFF-SITE BACKUP IS VERIFIED</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <ShieldAlert className="w-3.5 h-3.5" />
            RESTRICTED UNTIL SERVER-SIDE AUTH IS ACTIVE
          </span>
        </div>

        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {title}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Phase 2 Security Hardening • Client-Side Credential Verifiers Removed
          </p>
        </div>

        {/* Truthful System Status Matrix (Phase 0 & Phase 15) */}
        <div className="p-4 bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl mb-5 text-xs space-y-2 font-mono">
          <div className="font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1.5 font-sans">
            <Info className="w-4 h-4 text-amber-500" />
            <span>বর্তমান যাচাইকৃত সিস্টেম স্থিতি (Truthful System Status):</span>
          </div>
          <div className="flex justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-1">
            <span className="text-stone-500">Core Bible Reader:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">PUBLIC BETA</span>
          </div>
          <div className="flex justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-1">
            <span className="text-stone-500">Deep 24×7 Monitoring:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">NOT YET ACTIVE</span>
          </div>
          <div className="flex justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-1">
            <span className="text-stone-500">Admin Command Centre:</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">RESTRICTED UNTIL SERVER-SIDE AUTH IS ACTIVE</span>
          </div>
          <div className="flex justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-1">
            <span className="text-stone-500">Emergency Recovery Console:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">DIAGNOSTIC GUIDE ONLY</span>
          </div>
          <div className="flex justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-1">
            <span className="text-stone-500">Offline Bible:</span>
            <span className="font-bold text-sky-600 dark:text-sky-400">5 BOOKS PRE-CACHED; OTHER BOOKS ON-DEMAND</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-stone-500">Backup:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">LOCAL ONLY UNTIL OFF-SITE BACKUP IS VERIFIED</span>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl mb-5 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <p className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>নিরাপত্তা নীতিমালা (Phase 2):</strong> স্ট্যাটিক ফ্রন্টএন্ড বান্ডেল থেকে সকল পাসওয়ার্ড হ্যাশ, পিন হ্যাশ ও রিকভারি কোড হ্যাশ সম্পূর্ণভাবে অপসারণ করা হয়েছে। সার্ভার/এজ অথেনটিকেশন (Cloudflare Access / Firebase Auth) সক্রিয় না হওয়া পর্যন্ত সকল প্রিভিলেজড পরিবর্তন বন্ধ রয়েছে এবং কেবল <strong>পঠনযোগ্য ডায়াগনস্টিক ভিউ (Read-Only Diagnostic Interface)</strong> উন্মুক্ত আছে।
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleOpenReadOnlyDiagnostic}
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>পঠনযোগ্য ডায়াগনস্টিক ইন্টারফেস খুলুন (Read-Only Diagnostic View)</span>
          </button>

          {onBackToApp && (
            <button
              type="button"
              onClick={onBackToApp}
              className="w-full py-2.5 px-4 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>বাইবেল পাঠে ফিরে যান</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
