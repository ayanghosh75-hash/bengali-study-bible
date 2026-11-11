import React, { useState } from 'react';
import { X, Share2, PlusSquare, MoreVertical, CheckCircle2 } from 'lucide-react';
import { LogoSymbol } from './brand/LogoSymbol';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'android' | 'ios';
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'android'
}) => {
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-navy-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 flex flex-col max-h-[92vh] overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/50">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <LogoSymbol size={36} variant="default" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy-950 dark:text-gold-300">
                অ্যাপ ইনস্টলেশন নির্দেশিকা
              </h3>
              <p className="text-[11px] text-slate-400 font-sans">
                সহজে ফোনে সেভ করুন ও অফলাইনে ব্যবহার করুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex border-b border-slate-200 dark:border-navy-800 bg-slate-100/60 dark:bg-navy-950/30 p-1.5 gap-1.5">
          <button
            onClick={() => setActivePlatform('android')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activePlatform === 'android'
                ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm border border-slate-200/60 dark:border-navy-700'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <span>🤖 Android (Google Chrome)</span>
          </button>
          <button
            onClick={() => setActivePlatform('ios')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activePlatform === 'ios'
                ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm border border-slate-200/60 dark:border-navy-700'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <span>🍎 iPhone / iPad (Safari)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activePlatform === 'android' ? (
            <div className="space-y-3.5">
              <div className="p-3 bg-amber-50/70 dark:bg-navy-950/60 rounded-2xl border border-amber-200/50 dark:border-navy-800 text-xs text-amber-900 dark:text-amber-200">
                💡 Chrome ব্রাউজারে স্বয়ংক্রিয় পপআপ না আসলে নিচের সহজ ৪টি ধাপ অনুসরণ করুন:
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-navy-800">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ১
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-navy-950 dark:text-slate-100">
                      Chrome ব্রাউজারে সাইটটি খোলা রাখুন
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Bengali Study Bible ওয়েবসাইটটি ব্রাউজারে প্রস্তুত রাখুন।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-navy-800">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ২
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-navy-950 dark:text-slate-100 flex items-center gap-1.5">
                      <span>থ্রি-ডট মেনু চাপুন</span>
                      <MoreVertical className="w-3.5 h-3.5 text-gold-500" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      ব্রাউজারের উপরের ডান কোনায় থাকা তিনটি বিন্দু (⋮) আইকনে ট্যাপ করুন।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-navy-800">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ৩
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-navy-950 dark:text-slate-100 flex items-center gap-1.5">
                      <span>"Install app" বা "Add to Home screen" নির্বাচন করুন</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      মেনু থেকে "অ্যাপ ইনস্টল করুন" বা "হোম স্ক্রিনে যোগ করুন" চাপুন।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-navy-800">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ৪
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-navy-950 dark:text-slate-100 flex items-center gap-1.5">
                      <span>ইনস্টলেশন নিশ্চিত করুন</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      নিশ্চিতকরণ উইন্ডোতে "Install" চাপলেই ফোনের অ্যাপ তালিকায় চলে আসবে!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="p-3 bg-blue-50/70 dark:bg-navy-950/60 rounded-2xl border border-blue-200/50 dark:border-navy-800 text-xs text-blue-900 dark:text-blue-200">
                💡 iPhone বা iPad-এ Safari ব্রাউজারের মাধ্যমে সরাসরি ইনস্টল করার নিয়ম:
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-navy-800">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ১
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-navy-950 dark:text-slate-100 flex items-center gap-1.5">
                      <span>Safari ব্রাউজারে শেয়ার আইকনে চাপুন</span>
                      <Share2 className="w-3.5 h-3.5 text-blue-500" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Safari ব্রাউজারের নিচে থাকা মাঝের 'Share' বোতামে ক্লিক করুন।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-navy-800">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ২
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-navy-950 dark:text-slate-100 flex items-center gap-1.5">
                      <span>"Add to Home Screen" চাপুন</span>
                      <PlusSquare className="w-3.5 h-3.5 text-blue-500" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      মেনু স্ক্রল করে নিচে গিয়ে "Add to Home Screen" অপশনটি বেছে নিন।
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-navy-800">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ৩
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-navy-950 dark:text-slate-100 flex items-center gap-1.5">
                      <span>উপরে "Add" চাপুন</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      উপরে ডান দিকের "Add" বোতাম চাপলেই আপনার আইফোনের হোম স্ক্রিনে অ্যাপ আইকন তৈরি হয়ে যাবে!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* After Installation Note */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 text-center space-y-1">
            <p className="text-xs font-bold text-gold-600 dark:text-gold-400">
              ✨ ইনস্টল করার সুবিধা
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
              একবার ইনস্টল হলে আর লিংক খুঁজতে বা QR স্ক্যান করতে হবে না—মোবাইলের হোম স্ক্রিনের আইকন চাপলেই পূর্ণাঙ্গ অ্যাপের মতো খুলবে!
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-navy-800 bg-slate-50/60 dark:bg-navy-950/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-navy-950 dark:bg-gold-500 text-white dark:text-navy-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all shadow-md"
          >
            বুঝেছি • ঠিক আছে
          </button>
        </div>
      </div>
    </div>
  );
};
