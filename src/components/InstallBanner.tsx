import React from 'react';
import { X, Download } from 'lucide-react';
import { LogoSymbol } from './brand/LogoSymbol';

interface InstallBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({ onInstall, onDismiss }) => {
  return (
    <aside 
      aria-label="App Installation Banner"
      className="relative z-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border-b border-gold-500/30 shadow-lg px-4 py-3 animate-in slide-in-from-top duration-300"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Banner Content */}
        <div className="flex items-start space-x-3 pr-6 sm:pr-0">
          <div className="flex-shrink-0 mt-0.5">
            <LogoSymbol size={38} variant="default" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base text-gold-300">
                📖 বাংলা স্টাডি বাইবেল
              </span>
              <span className="text-[10px] font-sans font-semibold uppercase px-1.5 py-0.2 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                মোবাইল অ্যাপ
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug font-sans max-w-xl">
              আপনার ফোনে অ্যাপটি ইনস্টল করুন। পরের বার ব্রাউজার না খুলেই সরাসরি Study Bible ব্যবহার করুন।
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto justify-end">
          <button
            onClick={onDismiss}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors rounded-lg font-medium"
            title="পরে স্মরণ করিয়ে দিন"
          >
            পরে
          </button>

          <button
            onClick={onInstall}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 hover:brightness-105 text-navy-950 font-bold text-xs sm:text-sm shadow-md shadow-gold-500/20 flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>অ্যাপ ইনস্টল করুন</span>
          </button>

          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 sm:hidden absolute top-2 right-2"
            aria-label="বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
