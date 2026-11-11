// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// CONTEXT-AWARE REPORT PROBLEM & CORRECTION MODAL
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState } from 'react';
import { X, AlertCircle, Send, Shield, Image } from 'lucide-react';
import { BibleContext, StudyContext, FeedbackCategory, FeedbackItem } from '../../types/feedback';
import { FeedbackService } from '../../services/feedbackService';

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (feedback: FeedbackItem) => void;
  bibleContext?: BibleContext;
  studyContext?: StudyContext;
  module?: string;
  defaultCategory?: FeedbackCategory;
}

export const ReportProblemModal: React.FC<ReportProblemModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  bibleContext,
  studyContext,
  module = 'Bible Reader',
  defaultCategory = 'BIBLE_TEXT_CONCERN',
}) => {
  const category = bibleContext ? 'BIBLE_TEXT_CONCERN' : defaultCategory;
  const [subcategory, setSubcategory] = useState<string>(
    bibleContext ? 'পাঠে সমস্যা' : 'অন্য সমস্যা'
  );
  const [subject, setSubject] = useState<string>(
    bibleContext
      ? `${bibleContext.bookNameBn} ${bibleContext.chapter}:${bibleContext.verse || ''} পদে সমস্যা`
      : studyContext
      ? `${studyContext.resourceTitle || 'স্টাডি'} বিষয়ে সংশোধন`
      : 'সমস্যা সংক্রান্ত প্রতিবেদন'
  );
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [screenshotBase64, setScreenshotBase64] = useState<string | undefined>(undefined);
  const [screenshotName, setScreenshotName] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setErrorMessage('স্ক্রিনশট ফাইলের আকার ৩ মেগাবাইটের (3MB) কম হতে হবে।');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('শুধুমাত্র ছবি ফাইল (PNG, JPG, WebP) আপলোড করা যাবে।');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotBase64(reader.result as string);
      setScreenshotName(file.name);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!description || description.trim().length < 5) {
      setErrorMessage('দয়া করে সমস্যাটি সংক্ষেপে লিখুন (কমপক্ষে ৫টি হরফ)।');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await FeedbackService.submitFeedback({
        category,
        subcategory,
        subject,
        description,
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        module,
        pageUrl: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/',
        bibleContext,
        studyContext,
        screenshotBase64,
        screenshotName,
      });

      if (result.success && result.feedback) {
        onSuccess(result.feedback);
        onClose();
      } else {
        setErrorMessage(result.error || 'প্রতিবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch {
      setErrorMessage('নেটওয়ার্ক ত্রুটি। ইন্টারনেট সংযোগ যাচাই করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/70 dark:bg-navy-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy-950 dark:text-gold-300">
                সমস্যা বা সংশোধন জানান
              </h3>
              <p className="text-[11px] text-slate-400 font-sans">
                আপনার মতামত সরাসরি প্রকল্প পরিচালকের কাছে পাঠানো হবে
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Context Banner */}
          {bibleContext && (
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-navy-950/60 border border-amber-200/60 dark:border-navy-800 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-navy-950 dark:text-gold-300">
                <span>📖 {bibleContext.bookNameBn} {bibleContext.chapter}:{bibleContext.verse || ''}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-gold-500/20 text-gold-700 dark:text-gold-300 font-mono">
                  {bibleContext.translationId.toUpperCase()}
                </span>
              </div>
              {bibleContext.displayedText && (
                <p className="text-slate-600 dark:text-slate-300 italic line-clamp-2 text-[11.5px] border-l-2 border-gold-500 pl-2 mt-1">
                  "{bibleContext.displayedText}"
                </p>
              )}
            </div>
          )}

          {studyContext && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-800 text-xs text-slate-600 dark:text-slate-300">
              🎓 <strong>স্টাডি রিসোর্স:</strong> {studyContext.resourceTitle || studyContext.resourceId}
            </div>
          )}

          {/* Issue Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
              কী ধরনের সমস্যা?
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-100 outline-none focus:border-gold-500"
            >
              {bibleContext ? (
                <>
                  <option value="পাঠে সমস্যা">পাঠে বানান বা শব্দের ভুল</option>
                  <option value="পদ নম্বর ভুল">পদ বা শ্লোক নম্বর ভুল</option>
                  <option value="অনুবাদ নিয়ে প্রশ্ন">অনুবাদ নিয়ে প্রশ্ন বা স্পষ্টতা</option>
                  <option value="পদ অনুপস্থিত">কোনো পদ বা অংশ অনুপস্থিত</option>
                  <option value="পুনরাবৃত্ত পদ">একই পদ একাধিকবার এসেছে</option>
                  <option value="রেফারেন্স সমস্যা">ক্রস রেফারেন্স বা পাদটীকা সমস্যা</option>
                  <option value="অন্য সমস্যা">অন্য কোনো সমস্যা</option>
                </>
              ) : (
                <>
                  <option value="ভুল রেফারেন্স">ভুল বাইবেল রেফারেন্স</option>
                  <option value="প্রেক্ষাপট সংশোধন">ঐতিহাসিক প্রেক্ষাপট বা ব্যাখ্যা সংশোধন</option>
                  <option value="বানান/ভাষা সংশোধন">বানান বা ভাষা সংশোধন</option>
                  <option value="প্রযুক্তিগত সমস্যা">প্রযুক্তিগত বা ডিসপ্লে সমস্যা</option>
                  <option value="অন্য সমস্যা">অন্য কোনো সমস্যা</option>
                </>
              )}
            </select>
          </div>

          {/* Subject Line */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
              বিষয় <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-100 outline-none focus:border-gold-500"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
              সমস্যার বিবরণ <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="এখানে স্পষ্ট করে লিখুন কী ভুল বা কী পরিবর্তন দরকার..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-100 outline-none focus:border-gold-500 resize-none"
            />
          </div>

          {/* Optional Screenshot Upload */}
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              স্ক্রিনশট যুক্ত করুন (ঐচ্ছিক)
            </label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-xs text-slate-600 dark:text-slate-300 hover:border-gold-500 cursor-pointer transition">
                <Image className="w-4 h-4 text-gold-500" />
                <span>{screenshotName ? 'ছবি পরিবর্তন করুন' : 'ছবি নির্বাচন করুন (Max 3MB)'}</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {screenshotName && (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 truncate max-w-[150px]">
                  ✓ {screenshotName}
                </span>
              )}
            </div>
          </div>

          {/* Optional Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                আপনার নাম (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: অমল বিশ্বাস"
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-100 outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                ইমেইল ঠিকানা (ঐচ্ছিক)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="উত্তর পেতে চাইলে ইমেইল দিন"
                className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-800 dark:text-slate-100 outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <Shield className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span>যোগাযোগের তথ্য শুধুমাত্র এই পর্যালোচনার জন্য ব্যবহৃত হবে।</span>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
              {errorMessage}
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-navy-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-navy-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs shadow-md shadow-gold-500/20 flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isSubmitting ? 'পাঠানো হচ্ছে...' : 'প্রতিবেদন পাঠান'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
