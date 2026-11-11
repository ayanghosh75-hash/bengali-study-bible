import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Clock,
  Share2,
  Copy,
  ArrowRight,
  Bookmark,
  Check,
  Download,
  FileText,
  GraduationCap,
  BookmarkCheck,
  Users,
  HelpCircle,
  ShieldCheck,
  Search,
  Church,
  Globe2,
  Smartphone,
} from 'lucide-react';
import { BibleService } from '../services/bibleService';
import { StorageService } from '../services/storageService';
import { SermonStorageService } from '../services/sermonStorageService';
import { toBengaliDigits } from '../utils/bengaliNumerals';
import { LogoSymbol } from '../components/brand/LogoSymbol';
import { EasyAccessHub } from '../components/home/EasyAccessHub';
import { AnalyticsService } from '../services/analyticsService';
import { DeepVisitorInvitation } from '../components/dailyVerse/DeepVisitorInvitation';
import { DeepSubscriberPreferencesModal } from '../components/dailyVerse/DeepSubscriberPreferencesModal';

interface HomeScreenProps {
  onNavigateToSermonBuilder: () => void;
  onNavigateToSavedSermons: () => void;
  onNavigateToBible: (bookId: string, chapter: number, verse?: number) => void;
  onNavigateToStudy: () => void;
  onNavigateToLibrary: () => void;
  onOpenNotes: () => void;
  onOpenBookPicker: () => void;
  onOpenSearch: () => void;
  onOpenInstall?: () => void;
  onNavigateToAcademy?: () => void;
  onNavigateToPartners?: () => void;
  onNavigateToBeta?: () => void;
  onOpenDevotionChecklist?: () => void;
  onNavigateToAdminAnalytics?: () => void;
  onNavigateToAdmin?: () => void;
  onNavigateToAskBible?: () => void;
  onNavigateToStart?: () => void;
  onNavigateToDailyWord?: () => void;
  showInstallCard?: boolean;
  useBengaliDigits?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToSermonBuilder,
  onNavigateToSavedSermons,
  onNavigateToBible,
  onNavigateToStudy,
  onNavigateToLibrary,
  onOpenNotes,
  onOpenBookPicker: _onOpenBookPicker,
  onOpenSearch,
  onOpenInstall,
  onNavigateToAcademy,
  onNavigateToPartners,
  onNavigateToBeta,
  onOpenDevotionChecklist,
  onNavigateToAdminAnalytics,
  onNavigateToAdmin,
  onNavigateToAskBible,
  onNavigateToStart,
  onNavigateToDailyWord,
  showInstallCard = false,
  useBengaliDigits: _useBengaliDigits = true,
}) => {
  const dailyVerse = BibleService.getDailyVerse();
  const lastRead = StorageService.getLastRead();
  const _bookmarks = StorageService.getBookmarks();
  const notes = StorageService.getNotes();
  const savedSermons = SermonStorageService.getSavedSermons();
  const [copied, setCopied] = useState(false);
  const [isSubscriberModalOpen, setIsSubscriberModalOpen] = useState(false);

  const handleCopyDailyVerse = () => {
    const trackableUrl = AnalyticsService.buildTrackableShareUrl({
      targetRoute: '/',
      channel: 'copy_link',
      contentType: 'bible_verse',
      contentId: dailyVerse.verseRef,
    });
    const text = `${dailyVerse.verseRef} — "${dailyVerse.textBn}" (বাংলা স্টাডি বাইবেল)\n${trackableUrl}`;
    AnalyticsService.trackShareAction({
      channel: 'copy_link',
      contentType: 'bible_verse',
      contentTitle: dailyVerse.verseRef,
      isCompleted: true,
    });
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareDailyVerse = () => {
    const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
    const trackableUrl = AnalyticsService.buildTrackableShareUrl({
      targetRoute: '/',
      channel: hasNativeShare ? 'native' : 'copy_link',
      contentType: 'bible_verse',
      contentId: dailyVerse.verseRef,
    });
    const text = `${dailyVerse.verseRef} — "${dailyVerse.textBn}" (বাংলা স্টাডি বাইবেল)\n${trackableUrl}`;
    AnalyticsService.trackShareAction({
      channel: hasNativeShare ? 'native' : 'copy_link',
      contentType: 'bible_verse',
      contentTitle: dailyVerse.verseRef,
      isCompleted: true,
    });
    if (hasNativeShare) {
      navigator
        .share({
          title: dailyVerse.verseRef,
          text,
          url: trackableUrl,
        })
        .catch(() => {});
    } else {
      handleCopyDailyVerse();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-7 pb-28 animate-fadeIn">
      {/* Hero Welcome & Dashboard Header */}
      <div
        id="tour-home-hero"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-8 border border-navy-700/80 shadow-2xl"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-gold-500/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন</span>
          </div>

          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="p-1 rounded-2xl bg-navy-900/90 border border-gold-500/30 shadow-lg shadow-gold-500/10 flex-shrink-0">
              <LogoSymbol size={44} variant="default" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                বাংলা স্টাডি বাইবেল
                <span className="hidden xs:inline-block text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  OFFICIAL
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-gold-200/90 font-medium mt-1 leading-relaxed max-w-2xl">
                বাংলা ভাষায় বাইবেল পড়ুন, জানুন ও গভীরভাবে অধ্যয়ন করুন। আপনি খ্রিষ্টান, বাইবেলের শিক্ষার্থী, গবেষক অথবা কেবল বাইবেল সম্পর্কে জানতে আগ্রহী—সকলের জন্য উন্মুক্ত।
              </p>
            </div>
          </div>

          {/* Global Diaspora & Universal Access Banner */}
          <div className="py-1 px-3 rounded-xl bg-navy-900/60 border border-gold-500/20 text-[11px] text-gold-200/90 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <Globe2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span className="truncate">ভারত, বাংলাদেশ ও সারা বিশ্বের বাংলাভাষী খ্রীষ্টবিশ্বাসীদের জন্য ১০০% বিনামূল্যে ও বিজ্ঞাপনহীন</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {onNavigateToPartners && (
                <button
                  onClick={onNavigateToPartners}
                  className="text-gold-300 hover:text-white font-semibold underline text-[10px]"
                >
                  মণ্ডলী পার্টনার কিট
                </button>
              )}
              {onNavigateToBeta && (
                <button
                  onClick={onNavigateToBeta}
                  className="text-amber-300 hover:text-white font-semibold underline text-[10px]"
                >
                  পাবলিক বিটা
                </button>
              )}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-slate-300 mb-3 font-semibold">আজ কী অধ্যয়ন করবেন?</p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary CTA: 📖 বাইবেল পড়ুন */}
              <button
                id="tour-bible-reader-btn"
                onClick={() =>
                  onNavigateToBible(
                    lastRead ? lastRead.bookId : 'JHN',
                    lastRead ? lastRead.chapter : 1
                  )
                }
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-navy-950 font-extrabold text-sm shadow-xl shadow-gold-500/25 hover:brightness-105 transition transform active:scale-98 flex items-center gap-2.5 cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-navy-950 stroke-[2.5]" />
                <span>📖 বাইবেল পড়ুন</span>
              </button>

              {/* Secondary CTA: 🔎 বাইবেল অধ্যয়ন করুন */}
              <button
                onClick={onNavigateToStudy}
                className="px-5 py-3.5 rounded-2xl bg-navy-800/90 hover:bg-navy-700 text-gold-300 border border-gold-500/40 font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-gold-400" />
                <span>🔎 বাইবেল অধ্যয়ন করুন</span>
              </button>

              {/* Additional CTA 1: 🌱 বাইবেল প্রথমবার পড়ছেন? */}
              {onNavigateToStart && (
                <button
                  onClick={onNavigateToStart}
                  className="px-4 py-3 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs border border-emerald-500/40 shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🌱 বাইবেল প্রথমবার পড়ছেন?</span>
                </button>
              )}

              {/* Additional CTA 2: 📱 ফোনে ইনস্টল করুন */}
              {onOpenInstall && (
                <button
                  onClick={onOpenInstall}
                  className="px-4 py-3 rounded-2xl bg-navy-800/80 hover:bg-navy-700 text-slate-200 font-semibold text-xs border border-navy-700 shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>📱 ফোনে ইনস্টল করুন</span>
                </button>
              )}

              {/* Additional CTA 3: 🎓 কীভাবে ব্যবহার করবেন */}
              {onNavigateToAcademy && (
                <button
                  onClick={onNavigateToAcademy}
                  className="px-4 py-3 rounded-2xl bg-navy-800/60 hover:bg-navy-800 text-slate-300 font-semibold text-xs border border-navy-700 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
                  <span>🎓 কীভাবে ব্যবহার করবেন</span>
                </button>
              )}
            </div>

            {/* Minor action shortcuts: আমার নোট & আমার সার্মন */}
            <div className="pt-4 flex items-center gap-4 text-xs font-semibold text-slate-300">
              <button
                onClick={onNavigateToSavedSermons}
                className="hover:text-gold-300 transition flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-gold-400" />
                <span>আমার সার্মন ({toBengaliDigits(savedSermons.length)})</span>
              </button>
              <span>•</span>
              <button
                onClick={onOpenNotes}
                className="hover:text-gold-300 transition flex items-center gap-1.5"
              >
                <Bookmark className="w-4 h-4 text-gold-400" />
                <span>আমার নোট ({toBengaliDigits(notes.length)})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Universal Easy Access Box (সহজ একসেস বক্স) */}
      <EasyAccessHub
        onNavigateToBible={onNavigateToBible}
        onNavigateToSearch={onOpenSearch}
        onNavigateToSermonBuilder={onNavigateToSermonBuilder}
        onNavigateToAskBible={onNavigateToAskBible}
        onNavigateToStudy={onNavigateToStudy}
        onNavigateToLibrary={onNavigateToLibrary}
        onNavigateToAdminAnalytics={onNavigateToAdminAnalytics}
        onNavigateToAdmin={onNavigateToAdmin}
        onNavigateToPartners={onNavigateToPartners}
        onNavigateToInstall={onOpenInstall}
      />
      <div
        onClick={onOpenSearch}
        className="p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm hover:border-gold-400 dark:hover:border-gold-500 cursor-pointer transition flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3 text-slate-400 min-w-0">
          <Search className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 font-medium truncate">
            যেকোনো বিষয়, পদ বা মূল হিব্রু-গ্রিক ধাতু অনুসন্ধান করুন (যেমন: পরিত্রাণ, প্রেম, বিশ্বাস)...
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-[11px] font-mono text-slate-400 border border-slate-200 dark:border-navy-700">
            Ctrl + K
          </span>
          <span className="px-3 py-1 rounded-xl bg-gold-500/10 text-gold-700 dark:text-gold-300 font-bold text-xs border border-gold-500/30">
            গবেষণা
          </span>
        </div>
      </div>

      {/* Quick Access Dashboard Grid (দ্রুত প্রবেশ) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          দ্রুত প্রবেশ (Quick Access)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* 1. Bible */}
          <button
            onClick={() =>
              onNavigateToBible(
                lastRead ? lastRead.bookId : 'JHN',
                lastRead ? lastRead.chapter : 1
              )
            }
            className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 shadow-xs flex flex-col items-center text-center transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-navy-800 text-gold-600 dark:text-gold-400 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy-950 dark:text-white">বাইবেল</span>
            <span className="text-[10px] text-slate-400">৬৬ পুস্তক পাঠ</span>
          </button>

          {/* 2. Sermon */}
          <button
            onClick={onNavigateToSermonBuilder}
            className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-gold-300/80 dark:border-gold-700/60 hover:border-gold-500 shadow-xs flex flex-col items-center text-center transition group relative"
          >
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-950/60 text-gold-700 dark:text-gold-400 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy-950 dark:text-white">সার্মন বিল্ডার</span>
            <span className="text-[10px] text-gold-600 dark:text-gold-400 font-semibold">
              প্রচার প্রস্তুতি
            </span>
          </button>

          {/* 3. Study */}
          <button
            onClick={onNavigateToStudy}
            className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 shadow-xs flex flex-col items-center text-center transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-navy-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy-950 dark:text-white">অধ্যয়ন</span>
            <span className="text-[10px] text-slate-400">বিষয় ও চরিত্র</span>
          </button>

          {/* 4. My Study Workspace */}
          <button
            onClick={onNavigateToLibrary}
            className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 shadow-xs flex flex-col items-center text-center transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-navy-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy-950 dark:text-white">আমার স্টাডি</span>
            <span className="text-[10px] text-slate-400">বুকমার্ক, নোট ও প্রজেক্ট</span>
          </button>

          {/* 5. My Notes */}
          <button
            onClick={onOpenNotes}
            className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 shadow-xs flex flex-col items-center text-center transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-navy-800 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <Bookmark className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-navy-950 dark:text-white">আমার নোট</span>
            <span className="text-[10px] text-slate-400">ব্যক্তিগত টীকা</span>
          </button>
        </div>
      </div>

      {/* Academy & Daily Devotion Guide Banner */}
      <div
        id="tour-daily-devotion-btn"
        className="p-5 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 border border-gold-500/30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 flex items-center justify-center border border-gold-500/30 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-white">
                কীভাবে ব্যবহার করবেন — একাডেমি ও দৈনিক ভক্তি
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                টিউটোরিয়াল
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              ১০টি সহজ ব্যবহার নির্দেশিকা, ১৫-মিনিটের নীরব সময় চেকলিস্ট ও মণ্ডলী পরিচর্যা গাইড।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          {onOpenDevotionChecklist && (
            <button
              onClick={onOpenDevotionChecklist}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>১৫-মিনিট ভক্তি</span>
            </button>
          )}

          {onNavigateToAcademy && (
            <button
              onClick={onNavigateToAcademy}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>একাডেমি খুলুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* PWA Install Promotion Card if not installed */}
      {showInstallCard && onOpenInstall && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-gold-500/40 shadow-lg text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 flex items-center justify-center shadow-md shadow-gold-500/20 flex-shrink-0">
              <Download className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-gold-300">
                  📱 ফোনে অ্যাপ হিসেবে সংরক্ষণ করুন
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                  PWA
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                হোমস্ক্রিনে যুক্ত করে ইন্টারনেটের গতি বা জটিলতা ছাড়াই অফলাইনে সরাসরি ব্যবহার করুন।
              </p>
            </div>
          </div>
          <button
            onClick={onOpenInstall}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 text-xs font-bold shadow-md shadow-gold-500/20 transition flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>ইনস্টল নির্দেশিকা</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Today's Verse (আজকের পদ) */}
      <div className="rounded-3xl bg-white dark:bg-navy-900 p-6 border border-navy-200/80 dark:border-navy-800 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-500"></span>
            <h3 className="font-serif font-bold text-sm tracking-wide text-navy-950 dark:text-slate-100 uppercase">
              আজকের পদ (Daily Scripture)
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={handleCopyDailyVerse}
              title="পদটি কপি করুন"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleShareDailyVerse}
              title="শেয়ার করুন"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <blockquote className="font-serif text-lg sm:text-xl text-slate-900 dark:text-slate-100 leading-relaxed font-normal my-3">
          "{dailyVerse.textBn}"
        </blockquote>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
          <span className="text-xs font-bold text-gold-600 dark:text-gold-400 tracking-wide font-serif">
            — {dailyVerse.verseRef}
          </span>
          <button
            onClick={() => onNavigateToBible(dailyVerse.bookId, dailyVerse.chapter, dailyVerse.verse)}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-gold-300 flex items-center space-x-1 group transition"
          >
            <span>অধ্যায়ে পড়ুন</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Deep Daily Word (দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক) Hub Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-navy-950 to-stone-950 border border-amber-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center text-2xl shadow-lg shrink-0">
              🕊️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-amber-300">
                  দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  প্রতিদিনের বাক্য
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                “তোমার বাক্য আমার চরণের প্রদীপ, আমার পথের আলো।” (গীতসংহিতা ১১৯:১০৫)
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                প্রতিদিন সকাল ১০টার মধ্যে শাস্ত্রাংশ, প্রেক্ষাপট, দীপের আত্মিক ব্যাখ্যা, বাস্তব প্রয়োগ ও প্রার্থনা।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <button
              onClick={() => setIsSubscriberModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition"
            >
              🔔 বিজ্ঞপ্তি পছন্দ
            </button>
            {onNavigateToDailyWord && (
              <button
                onClick={onNavigateToDailyWord}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 text-xs font-bold transition shadow-md shadow-amber-500/20 flex items-center gap-1.5"
              >
                <span>আজকের বাক্য খুলুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Continue Reading (পঠন চালিয়ে যান) */}
      {lastRead && (
        <div className="rounded-2xl bg-amber-50/50 dark:bg-navy-900/60 p-4 border border-amber-200/60 dark:border-navy-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-navy-800 text-amber-700 dark:text-gold-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                সর্বশেষ পঠিত অংশ
              </span>
              <span className="font-bold text-sm text-navy-950 dark:text-white">
                {lastRead.bookNameBn} {toBengaliDigits(lastRead.chapter)} অধ্যায়
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateToBible(lastRead.bookId, lastRead.chapter, lastRead.verse)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-navy-950 dark:bg-white text-white dark:text-navy-950 hover:bg-navy-800 dark:hover:bg-slate-100 transition flex items-center gap-1"
          >
            পড়ুন
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Future Features (শীঘ্রই আসছে - Stage 2 & 3 Roadmap) */}
      <div className="pt-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-1">
          পরবর্তী পর্যায়ের সুবিধাসমূহ (Stage 2 & 3 Roadmap)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-navy-900/40 border border-slate-200/60 dark:border-navy-800/60 text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                ক্ষুদ্র দল ও সেল গাইড
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-navy-800 text-slate-500 dark:text-slate-400">
                শীঘ্রই আসছে
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              সাপ্তাহিক সেল গ্রুপ ও ক্ষুদ্র দলের জন্য মুক্ত আলোচনা এবং প্রার্থনামূলক উপকরণ।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-navy-900/40 border border-slate-200/60 dark:border-navy-800/60 text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                বাইবেল কুইজ জেনারেটর
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-navy-800 text-slate-500 dark:text-slate-400">
                শীঘ্রই আসছে
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              সানডে স্কুল ও যুবসমাজের জন্য শাস্ত্রভিত্তিক চার প্রকার প্রশ্ন ও উত্তরের কুইজ।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-navy-900/40 border border-slate-200/60 dark:border-navy-800/60 text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                চার্চ ম্যানেজমেন্ট টুলস
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-navy-800 text-slate-500 dark:text-slate-400">
                শীঘ্রই আসছে
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              মণ্ডলীর বাইবেল পাঠ পরিকল্পনা, সার্মন আর্কাইভ ও বাৎসরিক আত্মিক ক্যালেন্ডার।
            </p>
          </div>
        </div>
      </div>

      {/* Deep Non-Blocking Visitor Notification Invitation */}
      <DeepVisitorInvitation />

      {/* Deep Subscriber Preferences Modal */}
      <DeepSubscriberPreferencesModal
        isOpen={isSubscriberModalOpen}
        onClose={() => setIsSubscriberModalOpen(false)}
      />
    </div>
  );
};

