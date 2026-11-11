import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, RefreshCw, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AppUpdateService, AppUpdateCheckResult } from '../../services/appUpdateService';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

interface AppUpdatePromptModalProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const AppUpdatePromptModal: React.FC<AppUpdatePromptModalProps> = ({
  forceOpen = false,
  onClose,
}) => {
  const [updateResult, setUpdateResult] = useState<AppUpdateCheckResult | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isManualChecking, setIsManualChecking] = useState(false);
  const [manualCheckMessage, setManualCheckMessage] = useState<string | null>(null);

  const updateService = AppUpdateService.getInstance();

  useEffect(() => {
    const unsubscribe = updateService.subscribe((result) => {
      setUpdateResult(result);
    });
    return () => unsubscribe();
  }, [updateService]);

  const isOpen = forceOpen || (updateResult?.hasUpdate === true);

  if (!isOpen) return null;

  const handleApplyUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateService.applyUpdate();
    } catch (err) {
      console.error('Update failed:', err);
      setIsUpdating(false);
    }
  };

  const handleLater = () => {
    updateService.dismissCurrentUpdate();
    if (onClose) onClose();
  };

  const handleManualCheck = async () => {
    setIsManualChecking(true);
    setManualCheckMessage(null);
    try {
      const result = await updateService.checkForUpdate(true);
      if (!result.hasUpdate) {
        setManualCheckMessage('আপনি সর্বশেষ সংস্করণে আছেন। কোনো নতুন আপডেট নেই।');
      }
    } catch {
      setManualCheckMessage('আপডেট পরীক্ষা ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন।');
    } finally {
      setIsManualChecking(false);
    }
  };

  const currentVer = updateResult?.currentVersion || AppUpdateService.CURRENT_VERSION;
  const latestVer = updateResult?.latestVersion || AppUpdateService.CURRENT_VERSION;
  const versionInfo = updateResult?.versionInfo;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-update-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-navy-900 border border-gold-500/40 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 dark:text-slate-100">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-gold-600 via-amber-500 to-gold-600 px-5 py-4 text-navy-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-navy-950/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-navy-950 animate-pulse" />
            </div>
            <div>
              <h3 id="app-update-title" className="font-serif font-bold text-base leading-tight">
                অ্যাপ আপডেট পাওয়া গেছে
              </h3>
              <p className="text-xs text-navy-950/80 font-medium">
                New Version Available
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLater}
            className="p-1.5 rounded-lg text-navy-950/70 hover:text-navy-950 hover:bg-navy-950/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Version Comparison Badge */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-navy-950/60 p-3 rounded-xl border border-slate-200 dark:border-navy-800 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">বর্তমান সংস্করণ (Current)</span>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-200">v{currentVer}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gold-500" />
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">নতুন সংস্করণ (Latest)</span>
              <span className="font-mono font-bold text-gold-600 dark:text-gold-400">v{latestVer}</span>
            </div>
          </div>

          {/* Bilingual Announcement */}
          <div className="space-y-2 bg-gold-50/40 dark:bg-gold-500/5 p-3.5 rounded-xl border border-gold-200 dark:border-gold-500/20">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed font-serif">
              “নতুন সংস্করণ প্রস্তুত। এখন আপডেট করলে আপনার বুকমার্ক, নোট ও পড়ার ইতিহাস সংরক্ষিত থাকবে।”
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              “A new version is ready. Updating will preserve your bookmarks, notes and reading history.”
            </p>
          </div>

          {/* Release Notes if provided */}
          {versionInfo?.releaseNotesBn && (
            <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-navy-800/60 p-3 rounded-lg">
              <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">কী পরিবর্তন এসেছে:</span>
              <p>{versionInfo.releaseNotesBn}</p>
            </div>
          )}

          {/* User Data Protection Badge */}
          <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              তথ্য সুরক্ষা নিশ্চিত: <strong>বুকমার্ক, ব্যক্তিগত নোট, হাইলাইট ও পড়ার ইতিহাস সংরক্ষিত থাকবে।</strong>
            </span>
          </div>

          {/* Manual check feedback message */}
          {manualCheckMessage && (
            <div className="text-xs text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{manualCheckMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              disabled={isUpdating}
              onClick={handleApplyUpdate}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-navy-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>{isUpdating ? 'আপডেট প্রয়োগ হচ্ছে...' : 'এখন আপডেট করুন / Update now'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleLater}
                className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                পরে / Later
              </button>

              <button
                type="button"
                disabled={isManualChecking || isUpdating}
                onClick={handleManualCheck}
                className="py-2.5 px-3 rounded-xl border border-gold-500/40 hover:bg-gold-50 dark:hover:bg-navy-800 text-xs font-semibold text-gold-700 dark:text-gold-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isManualChecking ? 'animate-spin' : ''}`} />
                <span>আপডেট পরীক্ষা করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
