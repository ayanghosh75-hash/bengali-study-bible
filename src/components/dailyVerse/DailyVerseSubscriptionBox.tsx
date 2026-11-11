// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// DAILY BIBLE VERSE OPT-IN SUBSCRIPTION BOX
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Sparkles,
  CheckCircle2,
  Sliders,
  Calendar,
  ChevronRight,
  Sun,
} from 'lucide-react';
import { DailyVerseSubscriber } from '../../types/dailyVerse';
import { DailyVerseService, OFFICIAL_CONSENT_TEXT } from '../../services/dailyVerseService';
import { DailyVerseCalendarService } from '../../data/dailyVerseCalendar';
import { DailyVersePreferencesModal } from './DailyVersePreferencesModal';

interface DailyVerseSubscriptionBoxProps {
  variant?: 'card' | 'banner' | 'compact';
  onNavigateToStudy?: (bookId: string, chapter: number, verse: number) => void;
}

export const DailyVerseSubscriptionBox: React.FC<DailyVerseSubscriptionBoxProps> = ({
  variant = 'card',
  onNavigateToStudy,
}) => {
  const [subscriber, setSubscriber] = useState<DailyVerseSubscriber | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [todayVerse, setTodayVerse] = useState(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return DailyVerseCalendarService.getVerseForDate(todayStr);
  });

  useEffect(() => {
    const sub = DailyVerseService.getCurrentSubscriber();
    setSubscriber(sub);
  }, []);

  const isSubscribed = Boolean(subscriber && subscriber.status === 'ACTIVE');
  const isPaused = Boolean(subscriber && subscriber.status === 'PAUSED');

  if (variant === 'compact') {
    return (
      <>
        <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-800 dark:text-slate-100">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            <span className="font-serif font-bold text-navy-950 dark:text-gold-300">
              দৈনিক সুপ্রভাত পদ
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-600 dark:text-gold-400 hover:underline"
          >
            {isSubscribed ? 'সেটিংস' : 'সাবস্ক্রাইব'} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <DailyVersePreferencesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          subscriber={subscriber}
          onSubscriberUpdated={(s) => setSubscriber(s)}
        />
      </>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-white via-amber-50/40 to-white dark:from-navy-900 dark:via-navy-950 dark:to-navy-900 p-5 sm:p-6 shadow-md transition hover:shadow-lg">
        {/* Decorative Sun Glow in Corner */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300">
                  দৈনিক বাইবেল পদ নোটিফিকেশন
                </h3>
                {isSubscribed && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" /> সক্রিয়
                  </span>
                )}
                {isPaused && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    সাময়িক বন্ধ
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                প্রতিদিন সকাল ১০টার মধ্যে আপনার ডিভাইসে সুপ্রভাত শাস্ত্রাংশ
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-navy-800 transition shrink-0"
            title="নোটিফিকেশন পছন্দসমূহ পরিবর্তন করুন"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Today's Featured Good Morning Scripture Preview */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-navy-950/60 border border-amber-500/20 mb-4 backdrop-blur-sm">
          <div className="flex items-center justify-between text-[11px] text-amber-700 dark:text-gold-400 font-semibold mb-1.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> আজকের সুপ্রভাত পদ: {todayVerse.verseRefBn}
            </span>
            <span className="opacity-75">{todayVerse.versionBn}</span>
          </div>
          <p className="font-serif text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed italic mb-2">
            “{todayVerse.textBn}”
          </p>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-navy-900">
            <span className="text-[11px] text-slate-400">থিম: {todayVerse.themeBn}</span>
            {onNavigateToStudy && (
              <button
                onClick={() => onNavigateToStudy(todayVerse.bookId, todayVerse.chapter, todayVerse.verse)}
                className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                সম্পূর্ণ অধ্যায় পড়ুন <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Main Prompt Box & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-gold-500 animate-ping shrink-0" />
            <span className="font-serif font-bold text-xs sm:text-sm text-navy-950 dark:text-gold-300">
              “{OFFICIAL_CONSENT_TEXT}”
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {isSubscribed ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 font-semibold text-xs text-slate-700 dark:text-slate-200 transition"
              >
                <Sliders className="w-3.5 h-3.5" /> পছন্দসমূহ
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400 font-bold text-xs shadow-md transition hover:scale-105"
              >
                <Bell className="w-3.5 h-3.5" /> এখনই সাবস্ক্রাইব করুন
              </button>
            )}
          </div>
        </div>
      </div>

      <DailyVersePreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subscriber={subscriber}
        onSubscriberUpdated={(s) => setSubscriber(s)}
      />
    </>
  );
};
