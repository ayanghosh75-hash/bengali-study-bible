import React, { useState } from 'react';
import { X, Type, Sun, Moon, Coffee, AlignLeft, Hash, GraduationCap, RotateCcw, Clock, Sparkles, RefreshCw, ShieldCheck, CheckCircle2, Download } from 'lucide-react';
import { ReaderSettings, ThemeMode, FontFamily } from '../types/bible';
import { toBengaliDigits } from '../utils/bengaliNumerals';
import { AppUpdateService } from '../services/appUpdateService';

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  onReplayTour?: () => void;
  onOpenAcademy?: () => void;
  onOpenDevotionChecklist?: () => void;
  onOpenUpdatePrompt?: () => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReplayTour,
  onOpenAcademy,
  onOpenDevotionChecklist,
  onOpenUpdatePrompt,
}) => {
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheckUpdate = async () => {
    setIsCheckingUpdate(true);
    setUpdateMsg(null);
    try {
      const res = await AppUpdateService.getInstance().checkForUpdate(true);
      if (res.hasUpdate) {
        setUpdateMsg('নতুন সংস্করণ প্রস্তুত!');
        if (onOpenUpdatePrompt) {
          onOpenUpdatePrompt();
        }
      } else {
        setUpdateMsg(`সর্বশেষ সংস্করণ v${res.currentVersion} সক্রিয়।`);
      }
    } catch {
      setUpdateMsg('আপডেট চেক ব্যর্থ হয়েছে।');
    } finally {
      setIsCheckingUpdate(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col text-slate-800 dark:text-slate-100 p-5 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-3">
          <div className="flex items-center space-x-2">
            <Type className="w-5 h-5 text-gold-500" />
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300">
              বাইবেল পাঠ্য সেটিংস
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Theme Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            রং ও ব্যাকগ্রাউন্ড থিম (Reading Theme)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onUpdateSettings({ theme: 'light' as ThemeMode })}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                settings.theme === 'light'
                  ? 'border-gold-500 bg-gold-50/50 text-gold-800 font-semibold ring-2 ring-gold-500/20'
                  : 'border-slate-200 bg-parchment-100 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-xs">উষ্ণ আলো (Light)</span>
            </button>

            <button
              onClick={() => onUpdateSettings({ theme: 'sepia' as ThemeMode })}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                settings.theme === 'sepia'
                  ? 'border-gold-600 bg-sepia-100 text-sepia-text font-semibold ring-2 ring-gold-500/30'
                  : 'border-amber-200 bg-sepia-50 text-amber-900 hover:bg-sepia-100'
              }`}
            >
              <Coffee className="w-5 h-5 text-amber-700" />
              <span className="text-xs">সেপিয়া (Sepia)</span>
            </button>

            <button
              onClick={() => onUpdateSettings({ theme: 'dark' as ThemeMode })}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                settings.theme === 'dark'
                  ? 'border-gold-400 bg-navy-950 text-gold-300 font-semibold ring-2 ring-gold-400/30'
                  : 'border-navy-700 bg-navy-950 text-slate-300 hover:bg-navy-900'
              }`}
            >
              <Moon className="w-5 h-5 text-gold-400" />
              <span className="text-xs">ডিপ নেভি (Dark)</span>
            </button>
          </div>
        </div>

        {/* 2. Font Size Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-wider">অক্ষরের আকার (Font Size)</span>
            <span className="text-gold-600 dark:text-gold-400 font-bold">
              {toBengaliDigits(settings.fontSize)} px
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400">ছোট</span>
            <input
              type="range"
              min="14"
              max="28"
              step="1"
              value={settings.fontSize}
              onChange={(e) => onUpdateSettings({ fontSize: parseInt(e.target.value, 10) })}
              className="flex-1 h-2 bg-slate-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            <span className="text-lg font-serif text-slate-700 dark:text-slate-300">বড়</span>
          </div>
        </div>

        {/* 3. Font Family Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            ফন্ট শৈলী (Typography Style)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdateSettings({ fontFamily: 'serif' as FontFamily })}
              className={`p-2.5 rounded-xl border text-sm transition-all flex items-center justify-center gap-2 ${
                settings.fontFamily === 'serif'
                  ? 'border-gold-500 bg-gold-50/50 dark:bg-navy-800 text-gold-700 dark:text-gold-300 font-bold ring-2 ring-gold-500/20'
                  : 'border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="font-serif text-base">শাস্ত্ৰীয় সেরিফ</span>
              <span className="text-[10px] opacity-75">(Noto Serif)</span>
            </button>

            <button
              onClick={() => onUpdateSettings({ fontFamily: 'sans' as FontFamily })}
              className={`p-2.5 rounded-xl border text-sm transition-all flex items-center justify-center gap-2 ${
                settings.fontFamily === 'sans'
                  ? 'border-gold-500 bg-gold-50/50 dark:bg-navy-800 text-gold-700 dark:text-gold-300 font-bold ring-2 ring-gold-500/20'
                  : 'border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="font-sans text-base">আধুনিক স্যান্স</span>
              <span className="text-[10px] opacity-75">(Noto Sans)</span>
            </button>
          </div>
        </div>

        {/* 4. Line Spacing */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlignLeft className="w-3.5 h-3.5" />
            <span>লাইনের ফাঁকা জায়গা (Line Spacing)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 1.5, label: 'কম' },
              { val: 1.8, label: 'স্বাভাবিক' },
              { val: 2.2, label: 'খোলামেলা' },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => onUpdateSettings({ lineHeight: opt.val })}
                className={`py-2 text-xs rounded-xl border transition-all ${
                  settings.lineHeight === opt.val
                    ? 'border-gold-500 bg-gold-50 dark:bg-navy-800 text-gold-600 dark:text-gold-300 font-bold'
                    : 'border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Bengali Digits Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-navy-800">
          <div className="flex items-center space-x-2">
            <Hash className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              বাংলা সংখ্যায়ন (১, ২, ৩)
            </span>
          </div>
          <button
            onClick={() => onUpdateSettings({ bengaliNumerals: !settings.bengaliNumerals })}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
              settings.bengaliNumerals ? 'bg-gold-500 justify-end' : 'bg-slate-300 dark:bg-navy-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        {/* 6. Guide, Tour & Devotion Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-navy-800 space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>সহায়িকা ও পরিচিতি সফর (Guide & Tour)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {onReplayTour && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onReplayTour();
                }}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-gold-500 bg-slate-50 dark:bg-navy-950 text-xs font-semibold text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gold-500" />
                <span>ট্যুর পুনরায় শুরু করুন</span>
              </button>
            )}

            {onOpenAcademy && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAcademy();
                }}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:border-gold-500 bg-slate-50 dark:bg-navy-950 text-xs font-semibold text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-gold-500" />
                <span>কীভাবে ব্যবহার করবেন</span>
              </button>
            )}
          </div>

          {onOpenDevotionChecklist && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDevotionChecklist();
              }}
              className="w-full p-2.5 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 text-gold-800 dark:text-gold-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>📋 দৈনিক ১৫-মিনিট ভক্তি চেকলিস্ট</span>
            </button>
          )}
        </div>

        {/* 7. App Update (PWA Installed-User Updates) */}
        <div className="pt-4 border-t border-slate-100 dark:border-navy-800 space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-gold-500" />
              <span>অ্যাপ আপডেট (App Update)</span>
            </span>
            <span className="text-[11px] font-mono text-gold-600 dark:text-gold-400 font-bold">
              v{AppUpdateService.CURRENT_VERSION}
            </span>
          </label>

          <div className="bg-slate-50 dark:bg-navy-950 p-3 rounded-xl border border-slate-200 dark:border-navy-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300">ইনস্টলকৃত সংস্করণ:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                সংস্করণ {toBengaliDigits(AppUpdateService.CURRENT_VERSION)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>বুকমার্ক, ব্যক্তিগত নোট ও ইতিহাস সম্পূর্ণ নিরাপদ</span>
            </div>

            {updateMsg && (
              <div className="p-2 rounded-lg bg-gold-50 dark:bg-navy-900 border border-gold-300 dark:border-gold-500/30 text-xs text-gold-800 dark:text-gold-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{updateMsg}</span>
              </div>
            )}

            <button
              type="button"
              disabled={isCheckingUpdate}
              onClick={handleCheckUpdate}
              className="w-full py-2 px-3 rounded-lg border border-gold-500/50 hover:border-gold-500 bg-white dark:bg-navy-900 hover:bg-gold-50 dark:hover:bg-navy-800 text-gold-700 dark:text-gold-300 text-xs font-semibold transition flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingUpdate ? 'animate-spin' : ''}`} />
              <span>{isCheckingUpdate ? 'পরীক্ষা করা হচ্ছে...' : 'আপডেট পরীক্ষা করুন / Check for update'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
