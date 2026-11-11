// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — Autonomous Site Steward and Operations Assistant”
// DOCKED/FLOATING “সমস্যা জানাবেন” BUTTON & ACCESSIBLE REPORT MODAL
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// PII-Scrubbed & Reference Tracking (BSB-PR-2026-XXXXX)
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  X,
  Send,
  ShieldCheck,
  CheckCircle2,
  Copy,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { deepSteward } from '../../services/deepStewardService';
import { UserProblemCategory, UserProblemReport } from '../../types/deepSteward';

const CATEGORIES: Array<{ value: UserProblemCategory; labelBn: string; descriptionBn: string }> = [
  {
    value: 'BIBLE_TEXT',
    labelBn: 'বাইবেল পাঠ্য বা শব্দের অসংগতি',
    descriptionBn: 'কোনো নির্দিষ্ট পদের বানান, পাঠান্তর বা শব্দগত ভুল',
  },
  {
    value: 'MISSING_CHAPTER',
    labelBn: 'অনুপস্থিত বা অপূর্ণ অধ্যায়',
    descriptionBn: 'কোনো অধ্যায়ের পদ দৃশ্যমান না হওয়া বা ফাঁকা প্রদর্শন',
  },
  {
    value: 'INCORRECT_REF',
    labelBn: 'ভুল রেফারেন্স বা সূচি',
    descriptionBn: 'ক্রস রেফারেন্স বা বইয়ের সূচিতে অসঙ্গতি',
  },
  {
    value: 'LOGIN',
    labelBn: 'লগইন বা অ্যাকাউন্ট সমস্যা',
    descriptionBn: 'অ্যাকাউন্টে প্রবেশ বা পাসওয়ার্ড সংক্রান্ত ত্রুটি',
  },
  {
    value: 'NOTIFICATION',
    labelBn: 'প্রতিদিনের পদ বা নোটিফিকেশন সমস্যা',
    descriptionBn: 'সকালের দৈনিক পদ ডেলিভারি না হওয়া',
  },
  {
    value: 'ACCESSIBILITY',
    labelBn: 'দৃষ্টি বা কীবোর্ড অ্যাক্সেসিবিলিটি',
    descriptionBn: 'স্ক্রিন রিডার, ফন্ট সাইজ বা কীবোর্ড নেভিগেশন বাধা',
  },
  {
    value: 'MOBILE_DISPLAY',
    labelBn: 'মোবাইল বা ডিসপ্লে সমস্যা',
    descriptionBn: 'স্ক্রিনের বাইরে লেখা চলে যাওয়া বা বোতাম চেপে থাকা',
  },
  {
    value: 'AI_ANSWER',
    labelBn: 'দীপের উত্তরে অসংগতি',
    descriptionBn: 'এআই সহকারীর প্রদত্ত ব্যাখ্যায় কোনো ধর্মতাত্ত্বিক অস্পষ্টতা',
  },
  {
    value: 'OTHER',
    labelBn: 'অন্যান্য কারিগরি বিষয়',
    descriptionBn: 'সাইটের অন্য যেকোনো কারিগরি সমস্যা',
  },
];

interface DeepReportProblemModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  showFloatingTrigger?: boolean;
}

export const DeepReportProblemModal: React.FC<DeepReportProblemModalProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  showFloatingTrigger = true,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [category, setCategory] = useState<UserProblemCategory>('BIBLE_TEXT');
  const [description, setDescription] = useState('');
  const [contactPermission, setContactPermission] = useState(false);
  const [userContact, setUserContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<UserProblemReport | null>(null);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleOpen = () => {
    setInternalIsOpen(true);
    setSubmittedReport(null);
    setValidationError(null);
  };

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
    setSubmittedReport(null);
    setValidationError(null);
    triggerRef.current?.focus();
  };

  // Focus trap and ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!description.trim() || description.trim().length < 5) {
      setValidationError('দয়া করে সমস্যার বিবরণ সংক্ষেপে লিখুন (কমপক্ষে ৫টি হরফ)।');
      return;
    }

    setIsSubmitting(true);
    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
      const report = await deepSteward.submitProblemReport({
        category,
        description: description.trim(),
        pageUrl,
        contactPermission,
        userContact: contactPermission ? userContact.trim() : undefined,
      });

      setSubmittedReport(report);
      setDescription('');
      setUserContact('');
      setContactPermission(false);
    } catch (err: any) {
      setValidationError('দুঃখিত, প্রতিবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRefId = () => {
    if (!submittedReport) return;
    navigator.clipboard.writeText(submittedReport.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. DOCKED / FLOATING UNTRUSIVE TRIGGER BUTTON */}
      {showFloatingTrigger && (
        <button
          ref={triggerRef}
          onClick={handleOpen}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-full bg-slate-900/90 dark:bg-slate-800/90 hover:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-lg border border-slate-700/60 backdrop-blur-sm transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="সমস্যা জানাবেন বা ত্রুটি রিপোর্ট করুন"
          title="ওয়েবসাইটের কোনো সমস্যা বা পাঠ্য ত্রুটি দীপকে জানান"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-xs md:text-sm font-medium">সমস্যা জানাবেন</span>
        </button>
      )}

      {/* 2. ACCESSIBLE MODAL DIALOG */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="deep-problem-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div
            ref={modalRef}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="deep-problem-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                    সমস্যা জানাবেন — সাইট অভিভাবক “দীপ”
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    যেকোনো ত্রুটি, বাইবেল পাঠ্যের অসংগতি বা মতামত সরাসরি জানান
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {submittedReport ? (
                /* Success & Tracking Screen */
                <div className="space-y-4 text-center py-4 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">প্রতিবেদন গৃহীত হয়েছে!</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      দীপ বিষয়টি পর্যালোচনা করছে এবং নিরাপত্তা বিধি মেনে প্রয়োজনীয় পদক্ষেপ গ্রহণ করবে।
                    </p>
                  </div>

                  {/* Reference Tracking Badge */}
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                        ট্র্যাকিং রেফারেন্স আইডি
                      </span>
                      <span className="font-mono text-sm md:text-base font-bold text-blue-600 dark:text-blue-400">
                        {submittedReport.id}
                      </span>
                    </div>
                    <button
                      onClick={copyRefId}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600"
                      title="আইডি কপি করুন"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'কপি হয়েছে!' : 'কপি'}</span>
                    </button>
                  </div>

                  <div className="text-left p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 space-y-1">
                    <div className="font-semibold flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>দীপের পরিচালন সুরক্ষা নীতি:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {submittedReport.category === 'BIBLE_TEXT' || submittedReport.category === 'MISSING_CHAPTER'
                        ? 'শাস্ত্রীয় কোনো পাঠ্য দীপ একা নিজ থেকে পরিবর্তন করে না। এটি রেভারেন্ড অয়ন কুমার ঘোষের সিদ্ধান্তের জন্য কন্ট্রোল সেন্টারে সারিবদ্ধ করা হয়েছে।'
                        : 'এটি একটি সাধারণ টেকনিক্যাল বিষয় হওয়ায় দীপ স্বয়ংক্রিয় ক্যানারি টেস্ট ও নিরাপত্তা নিরীক্ষা সম্পন্ন করে সাইটকে নিখুঁত রাখবে।'}
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    ধন্যবাদ, ঠিক আছে
                  </button>
                </div>
              ) : (
                /* Report Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {validationError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Category Selection */}
                  <div>
                    <label htmlFor="problem-category" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      সমস্যার বিভাগ নির্বাচন করুন *
                    </label>
                    <select
                      id="problem-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as UserProblemCategory)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.labelBn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description Input */}
                  <div>
                    <label htmlFor="problem-desc" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      সমস্যার বিস্তারিত বিবরণ *
                    </label>
                    <textarea
                      id="problem-desc"
                      ref={textareaRef}
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="সমস্যাটি কোথায় এবং কীভাবে হয়েছে সংক্ষেপে উল্লেখ করুন (যেমন: যোহন ৩:১৬ পদে কোনো শব্দ দেখতে সমস্যা, অথবা স্ক্রিন লোড হচ্ছে না)..."
                      className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  {/* Contact Checkbox (Optional) */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={contactPermission}
                        onChange={(e) => setContactPermission(e.target.checked)}
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600"
                      />
                      <span>সমস্যাটির সমাধান বা অগ্রগতির তথ্য পেতে চাই (ঐচ্ছিক)</span>
                    </label>

                    {contactPermission && (
                      <input
                        type="text"
                        value={userContact}
                        onChange={(e) => setUserContact(e.target.value)}
                        placeholder="আপনার ইমেইল বা ফোন নম্বর লিখুন..."
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      />
                    )}
                  </div>

                  {/* Privacy & Anti-PII Guarantee Badge */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>ব্যক্তিগত তথ্যের সম্পূর্ণ গোপনীয়তা নিশ্চিত। অনাকাঙ্ক্ষিত ডেটা স্বয়ংক্রিয়ভাবে স্ক্রাব করা হয়।</span>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow transition-colors"
                    >
                      {isSubmitting ? (
                        <span>প্রেরণ করা হচ্ছে...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>প্রতিবেদন জমা দিন</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
