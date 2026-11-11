// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// FEEDBACK SUBMISSION SUCCESS & ACKNOWLEDGEMENT MODAL
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, X, ShieldCheck, Clock } from 'lucide-react';
import { LogoSymbol } from '../brand/LogoSymbol';
import { FeedbackItem } from '../../types/feedback';

export interface FeedbackSuccessModalProps {
  isOpen?: boolean;
  onClose: () => void;
  referenceNumber?: string;
  categoryLabel?: string;
  feedback?: FeedbackItem;
  onNewFeedback?: () => void;
  onViewHistory?: () => void;
}

export const FeedbackSuccessModal: React.FC<FeedbackSuccessModalProps> = ({
  isOpen = true,
  onClose,
  referenceNumber,
  categoryLabel,
  feedback,
  onNewFeedback,
  onViewHistory,
}) => {
  const [copied, setCopied] = useState(false);
  const refNum = referenceNumber || feedback?.referenceNumber || 'BSB-FB-2026-00000';

  if (!isOpen) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refNum).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-5 text-slate-800 dark:text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Success Icon */}
        <div className="flex flex-col items-center justify-center space-y-2 pt-2">
          <div className="relative">
            <LogoSymbol size={52} variant="default" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 dark:text-gold-300">
            ধন্যবাদ! মতামত গৃহীত হয়েছে
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
            আপনার মতামত সফলভাবে গ্রহণ করা হয়েছে এবং বাংলা স্টাডি বাইবেল টিমের কাছে পাঠানো হয়েছে।
          </p>
        </div>

        {/* Human-readable Reference Card */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-navy-950/70 border border-amber-200 dark:border-navy-800 space-y-2">
          <div className="text-[11px] uppercase font-bold tracking-wider text-amber-900 dark:text-amber-400">
            আপনার ট্র্যাকিং রেফারেন্স নম্বর
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-base sm:text-lg font-extrabold text-navy-950 dark:text-gold-300 select-all">
              {refNum}
            </span>
            <button
              onClick={handleCopyRef}
              className="p-1.5 rounded-lg bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-700 hover:text-gold-600 transition"
              title="রেফারেন্স কপি করুন"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          {categoryLabel && (
            <span className="inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              বিভাগ: {categoryLabel}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          প্রয়োজন হলে এই রেফারেন্স নম্বরটি উল্লেখ করে আমাদের সঙ্গে যোগাযোগ করতে পারেন। আমাদের রিভিউয়ার দল আপনার পাঠানো তথ্য সতর্কতার সাথে যাচাই করবে।
        </p>

        {/* Privacy reassurance */}
        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
          <span>আপনার তথ্য সম্পূর্ণ নিরাপদ ও গোপনীয় রাখা হয়</span>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          {onViewHistory && (
            <button
              onClick={onViewHistory}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 font-semibold text-xs transition flex items-center justify-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>আবেদন ইতিহাস</span>
            </button>
          )}
          {onNewFeedback && (
            <button
              onClick={onNewFeedback}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800 font-semibold text-xs transition"
            >
              আরেকটি বার্তা পাঠান
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs shadow-md shadow-gold-500/20 transition cursor-pointer"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSuccessModal;
