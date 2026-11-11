// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// PERMANENT DAILY WORD PAGE COMPONENT
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  Sun,
  Calendar,
  BookOpen,
  Share2,
  Copy,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Check,
  Sparkles,
  Sliders,
  HelpCircle,
  HeartHandshake,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { FacebookIcon } from '../components/social/FacebookLogo';
import { DeepDailyWord } from '../types/deepDailyWord';
import { DeepDailyWordService } from '../services/deepDailyWordService';
import { DeepSubscriberPreferencesModal } from '../components/dailyVerse/DeepSubscriberPreferencesModal';

interface DailyWordPageScreenProps {
  initialDate?: string;
  onNavigateToBible?: (bookId: string, chapter: number, verse?: number) => void;
}

export const DailyWordPageScreen: React.FC<DailyWordPageScreenProps> = ({
  initialDate,
  onNavigateToBible,
}) => {
  const [currentDate, setCurrentDate] = useState<string>(() => {
    if (initialDate) return initialDate;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qDate = params.get('date');
      if (qDate && /^\d{4}-\d{2}-\d{2}$/.test(qDate)) return qDate;
    }
    return new Date().toISOString().split('T')[0];
  });

  const [dailyWord, setDailyWord] = useState<DeepDailyWord>(() =>
    DeepDailyWordService.getDailyWordForDate(currentDate)
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);

  useEffect(() => {
    const dw = DeepDailyWordService.getDailyWordForDate(currentDate);
    setDailyWord(dw);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentDate]);

  const changeDateByDays = (days: number) => {
    const [y, m, d] = currentDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + days);
    const newDateStr = dateObj.toISOString().split('T')[0];
    setCurrentDate(newDateStr);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = dailyWord.distributionPackage.campaignTrackedUrl;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(dailyWord.distributionPackage.whatsappShareMessage);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(dailyWord.distributionPackage.campaignTrackedUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 font-sans pb-16">
      {/* Top Banner / Date Navigator */}
      <div className="border-b border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 sticky top-0 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => changeDateByDays(-1)}
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
          >
            <ChevronLeft className="w-4 h-4" /> পূর্ববর্তী দিন
          </button>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold-500" />
            <span className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300">
              {new Date(currentDate).toLocaleDateString('bn-BD', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <button
            onClick={() => changeDateByDays(1)}
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
          >
            পরবর্তী দিন <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Assistant Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-amber-500/10 border border-gold-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-gold-400">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-gold-400">
                  দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/60 dark:bg-navy-900 border border-amber-300 dark:border-navy-700">
                  {dailyWord.category}
                </span>
              </div>
              <h1 className="font-serif font-bold text-xl text-navy-950 dark:text-gold-300">
                {dailyWord.distributionPackage.notificationTitle}
              </h1>
            </div>
          </div>

          <button
            onClick={() => setIsPreferencesOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-semibold shadow-sm transition"
          >
            <Sliders className="w-3.5 h-3.5 text-gold-500" /> নোটিফিকেশন সেটিংস
          </button>
        </div>

        {/* SECTION 1: আজকের বাক্য (বাইবেল সরাসরি যা বলে) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border-2 border-gold-500/40 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-navy-800">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> বাইবেল সরাসরি যা বলে (Scripture Text)
            </span>
            <span className="text-xs font-mono font-semibold text-slate-400">
              {dailyWord.versionBn}
            </span>
          </div>

          <blockquote className="font-serif text-xl sm:text-2xl text-navy-950 dark:text-gold-100 leading-relaxed italic mb-4">
            “{dailyWord.verseTextBn}”
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-navy-800 text-xs">
            <div className="font-bold text-gold-600 dark:text-gold-400 text-sm">
              — {dailyWord.verseRefBn} ({dailyWord.verseRefEn})
            </div>

            {onNavigateToBible && (
              <button
                onClick={() => onNavigateToBible(dailyWord.bookId, dailyWord.chapter, dailyWord.verseStart)}
                className="inline-flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <BookOpen className="w-4 h-4" /> মূল বাইবেল পাঠকের এই অধ্যায় খুলুন
              </button>
            )}
          </div>
        </div>

        {/* SECTION 2: সম্পূর্ণ বাইবেল পাঠ (Full Passage Context) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3">
          <h2 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold-500" /> সম্পূর্ণ বাইবেল পাঠ (Full Passage Context)
          </h2>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
            {dailyWord.fullPassageBn}
          </div>
        </div>

        {/* SECTION 3, 4, 5: প্রেক্ষাপট, দীপের ব্যাখ্যা, জীবনে প্রয়োগ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SECTION 3: পটভূমি ও প্রেক্ষাপট */}
          <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-amber-600 dark:text-gold-400 block uppercase tracking-wider">
              প্রেক্ষাপট (Biblical Context)
            </span>
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300">
              ঐতিহাসিক পটভূমি
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {dailyWord.contextBn}
            </p>
          </div>

          {/* SECTION 4: সহজ ব্যাখ্যা (দীপের ব্যাখ্যা) */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-white dark:from-navy-900 dark:via-navy-950 dark:to-navy-900 border border-gold-500/30 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 block uppercase tracking-wider">
              দীপের ব্যাখ্যা (Simple Exposition)
            </span>
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300">
              আধ্যাত্মিক অন্তর্দৃষ্টি
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
              {dailyWord.simpleExplanationBn}
            </p>
          </div>

          {/* SECTION 5: জীবনে প্রয়োগ */}
          <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider">
              জীবনে প্রয়োগ (Life Application)
            </span>
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300">
              আজকের করণীয়
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {dailyWord.lifeApplicationBn}
            </p>
          </div>
        </div>

        {/* SECTION 6 & 7: চিন্তার প্রশ্ন & সংক্ষিপ্ত প্রার্থনা */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* চিন্তার প্রশ্ন */}
          <div className="p-5 rounded-3xl bg-slate-100/70 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-xs">
              <HelpCircle className="w-4 h-4" /> চিন্তার প্রশ্ন (Reflection Question)
            </div>
            <p className="font-serif text-sm text-navy-950 dark:text-slate-100 italic leading-relaxed">
              “{dailyWord.reflectionQuestionBn}”
            </p>
          </div>

          {/* সংক্ষিপ্ত প্রার্থনা */}
          <div className="p-5 rounded-3xl bg-amber-500/10 border border-gold-500/30 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-700 dark:text-gold-400 font-bold text-xs">
              <HeartHandshake className="w-4 h-4" /> প্রার্থনা (Short Prayer)
            </div>
            <p className="font-serif text-sm text-navy-950 dark:text-slate-100 italic leading-relaxed">
              “{dailyWord.shortPrayerBn}”
            </p>
          </div>
        </div>

        {/* SECTION 8: সম্পর্কিত বাইবেল পদ (Related Passages) */}
        {dailyWord.relatedPassages.length > 0 && (
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300">
              সম্পর্কিত বাইবেল পদ (Related Cross-References)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dailyWord.relatedPassages.map((rp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-xs flex flex-col justify-between"
                >
                  <div className="font-bold text-gold-600 dark:text-gold-400 mb-1">
                    {rp.refBn} ({rp.refEn})
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic mb-2">
                    “{rp.textBn}”
                  </p>
                  {onNavigateToBible && (
                    <button
                      onClick={() => onNavigateToBible(rp.bookId, rp.chapter, rp.verse)}
                      className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline self-start"
                    >
                      শাস্ত্রাংশে পড়ুন →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voluntary Sharing Callout Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-gold-500/10 to-amber-500/15 border border-gold-500/40 text-center space-y-4">
          <div className="inline-flex items-center gap-2 p-2 rounded-full bg-white dark:bg-navy-900 text-gold-600 dark:text-gold-400 text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4" /> ঈশ্বরের বাক্য বিস্তার
          </div>

          <h3 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
            “এই বাক্যটি কারও জীবনে আশা আনতে পারে। প্রার্থনা করে একজন মানুষের সঙ্গে শেয়ার করুন।”
          </h3>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp-এ শেয়ার করুন
            </button>

            <button
              onClick={handleFacebookShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition hover:scale-105"
            >
              <FacebookIcon className="w-4 h-4 fill-white" /> Facebook-এ শেয়ার করুন
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-navy-800 dark:hover:bg-navy-700 text-white font-bold text-xs shadow-md transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'লিংক কপি হয়েছে!' : 'লিংক কপি করুন'}
            </button>
          </div>
        </div>

        {/* SECTION 9: অনুবাদ সংস্করণ ও স্বত্বাধিকার নোটিশ */}
        <div className="p-4 rounded-2xl bg-slate-100/60 dark:bg-navy-900/60 text-center text-slate-400 text-[11px] space-y-1">
          <div>
            বাইবেল অনুবাদ: <strong>{dailyWord.versionBn}</strong> (ইন্ডিয়ান রিভাইজড ভার্সন) • ইংরেজি: {dailyWord.versionEn}
          </div>
          <div>
            স্বত্বাধিকার নোটিশ: {dailyWord.licenceNotice}
          </div>
          <div>
            বাংলা স্টাডি বাইবেল • উদ্যোগ ও পরিচালনা: <strong>রেভাঃ অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)</strong>
          </div>
        </div>
      </main>

      <DeepSubscriberPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </div>
  );
};
