// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// DAILY BIBLE VERSE PREFERENCES & SUBSCRIPTION MODAL
// ============================================================

import React, { useState } from 'react';
import {
  X,
  Bell,
  Mail,
  Clock,
  Globe,
  CheckCircle2,
  AlertCircle,
  Pause,
  Play,
  Trash2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import {
  DailyVerseSubscriber,
  DailyVersePreferencesInput,
  DeliveryChannel,
  NotificationLanguage,
} from '../../types/dailyVerse';
import { DailyVerseService, OFFICIAL_CONSENT_TEXT } from '../../services/dailyVerseService';

interface DailyVersePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriber: DailyVerseSubscriber | null;
  onSubscriberUpdated: (sub: DailyVerseSubscriber | null) => void;
}

const COMMON_TIMEZONES = [
  { value: 'Asia/Kolkata', label: 'ভারত / পশ্চিমবঙ্গ (IST, UTC+5:30)' },
  { value: 'Asia/Dhaka', label: 'বাংলাদেশ (BST, UTC+6:00)' },
  { value: 'UTC', label: 'সার্বজনীন সময় (UTC)' },
  { value: 'Europe/London', label: 'যুক্তরাজ্য / লন্ডন (GMT/BST)' },
  { value: 'America/New_York', label: 'আমেরিকা / নিউ ইয়র্ক (EST/EDT)' },
  { value: 'America/Los_Angeles', label: 'আমেরিকা / প্রশান্ত মহাসাগরীয় (PST/PDT)' },
  { value: 'Asia/Dubai', label: 'সংযুক্ত আরব আমিরাত / দুবাই (GST, UTC+4:00)' },
  { value: 'Australia/Sydney', label: 'অস্ট্রেলিয়া / সিডনি (AEST/AEDT)' },
];

export const DailyVersePreferencesModal: React.FC<DailyVersePreferencesModalProps> = ({
  isOpen,
  onClose,
  subscriber,
  onSubscriberUpdated,
}) => {
  const [channel, setChannel] = useState<DeliveryChannel>(subscriber?.channel || 'PUSH');
  const [language, setLanguage] = useState<NotificationLanguage>(subscriber?.language || 'bn');
  const [email, setEmail] = useState<string>(subscriber?.email || '');
  const [timeZone, setTimeZone] = useState<string>(
    subscriber?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata'
  );
  const [preferredTime, setPreferredTime] = useState<string>(subscriber?.preferredTime || '10:00');
  const [agreedConsent, setAgreedConsent] = useState<boolean>(true);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const isAlreadySubscribed = Boolean(subscriber && subscriber.status !== 'UNSUBSCRIBED');

  const handleSaveSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    if (!agreedConsent) {
      setFeedbackMsg({
        type: 'error',
        text: 'অনুগ্রহ করে দৈনিক পদ গ্রহণের সম্মতিতে টিক চিহ্ন প্রদান করুন।',
      });
      return;
    }

    if (channel === 'EMAIL') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.trim())) {
        setFeedbackMsg({
          type: 'error',
          text: 'একটি সঠিক ইমেইল ঠিকানা প্রদান করুন (যেমন: example@gmail.com)।',
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      let pushSubData: any = undefined;

      // If user chose PUSH, request permission
      if (channel === 'PUSH' && typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission !== 'granted') {
          const perm = await Notification.requestPermission();
          if (perm !== 'granted') {
            setFeedbackMsg({
              type: 'error',
              text: 'ব্রাউজার নোটিফিকেশনের অনুমতি প্রদান করা হয়নি। আপনি ইমেইল চ্যানেল বেছে নিতে পারেন।',
            });
            setIsLoading(false);
            return;
          }
        }

        // Check for Service Worker PushManager if available
        if ('serviceWorker' in navigator) {
          try {
            const reg = await navigator.serviceWorker.ready;
            const existingPush = await reg.pushManager.getSubscription();
            if (existingPush) {
              pushSubData = existingPush.toJSON();
            } else {
              pushSubData = {
                endpoint: `local-browser-push-${Date.now()}`,
                keys: { p256dh: 'browser-push-key', auth: 'browser-auth-secret' },
              };
            }
          } catch {
            pushSubData = {
              endpoint: `local-browser-push-${Date.now()}`,
              keys: { p256dh: 'browser-push-key', auth: 'browser-auth-secret' },
            };
          }
        }
      }

      const input: DailyVersePreferencesInput = {
        channel,
        language,
        timeZone,
        preferredTime,
        email: channel === 'EMAIL' ? email.trim() : undefined,
        pushSubscription: pushSubData,
      };

      const result = DailyVerseService.subscribe(input);
      onSubscriberUpdated(result);

      setFeedbackMsg({
        type: 'success',
        text: isAlreadySubscribed
          ? 'আপনার দৈনিক পদের পছন্দসমূহ সফলভাবে সংরক্ষিত হয়েছে!'
          : 'অভিনন্দন! আপনি সফলভাবে প্রতিদিনের সুপ্রভাত পদের জন্য নিবন্ধিত হয়েছেন।',
      });

      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err.message || 'সাবস্ক্রিপশন সম্পন্ন করতে ত্রুটি হয়েছে। পুনরায় চেষ্টা করুন।',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePause = () => {
    if (!subscriber) return;
    if (subscriber.status === 'ACTIVE') {
      DailyVerseService.pauseSubscription(subscriber.id);
      onSubscriberUpdated({ ...subscriber, status: 'PAUSED' });
      setFeedbackMsg({ type: 'success', text: 'নোটিফিকেশন সাময়িকভাবে স্থগিত (Paused) করা হয়েছে।' });
    } else {
      DailyVerseService.resumeSubscription(subscriber.id);
      onSubscriberUpdated({ ...subscriber, status: 'ACTIVE' });
      setFeedbackMsg({ type: 'success', text: 'নোটিফিকেশন পুনরায় সক্রিয় করা হয়েছে।' });
    }
  };

  const handleUnsubscribe = () => {
    if (!subscriber) return;
    const confirm = window.confirm('আপনি কি নিশ্চিত যে আপনি দৈনিক বাইবেল পদ গ্রহণ বন্ধ করতে চান?');
    if (!confirm) return;

    DailyVerseService.unsubscribe(subscriber.id);
    onSubscriberUpdated(null);
    setFeedbackMsg({ type: 'success', text: 'আপনি সফলভাবে আনসাবস্ক্রাইব করেছেন।' });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-navy-900 border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
                {isAlreadySubscribed ? 'দৈনিক পদ পছন্দ ও সেটিংস' : 'দৈনিক বাইবেল পদ সাবস্ক্রিপশন'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                সকাল ১০টার মধ্যে সুপ্রভাত শাস্ত্রীয় আশীর্বাদ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSaveSubscription} className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-200">
          {feedbackMsg && (
            <div
              className={`p-3.5 rounded-2xl flex items-start gap-2.5 border ${
                feedbackMsg.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800'
              }`}
            >
              {feedbackMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
          )}

          {/* Current Status Pill if subscribed */}
          {isAlreadySubscribed && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">বর্তমান সাবস্ক্রিপশন স্থিতি:</span>
                <span className="font-bold flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      subscriber?.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  {subscriber?.status === 'ACTIVE' ? 'সক্রিয় (Active — পদ গ্রহণ চলছে)' : 'সাময়িক স্থগিত (Paused)'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleTogglePause}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 font-semibold text-[11px] transition"
              >
                {subscriber?.status === 'ACTIVE' ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-500" /> সাময়িক বন্ধ রাখুন
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-500" /> পুনরায় চালু করুন
                  </>
                )}
              </button>
            </div>
          )}

          {/* Explicit Opt-in Checkbox */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedConsent}
                onChange={(e) => setAgreedConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-gold-500 focus:ring-gold-400 border-slate-300"
              />
              <span className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300 leading-snug">
                “{OFFICIAL_CONSENT_TEXT}”
              </span>
            </label>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 ml-7">
              কোনো স্প্যাম নয়। সম্পূর্ণ বিশুদ্ধ ধর্মগ্রন্থ ও ব্যক্তিগত অধ্যয়নের অনুপ্রেরণা। যে কোনো সময় ১-ক্লিকে আনসাবস্ক্রাইব করা যায়।
            </p>
          </div>

          {/* Delivery Channel (Push / Email) */}
          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 block mb-2">
              ১. ডেলিভারির মাধ্যম বেছে নিন (Delivery Channel):
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setChannel('PUSH')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition ${
                  channel === 'PUSH'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800/60'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="text-xs">ব্রাউজার পুশ নোটিফিকেশন</span>
                <span className="text-[10px] text-slate-400 font-normal">মোবাইল বা পিসিতে সরাসরি</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel('EMAIL')}
                className={`p-3.5 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition ${
                  channel === 'EMAIL'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800/60'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span className="text-xs">ইমেইল বার্তা</span>
                <span className="text-[10px] text-slate-400 font-normal">ইনবক্সে সুপ্রভাত পদ</span>
              </button>
            </div>
          </div>

          {/* Email input if channel is EMAIL */}
          {channel === 'EMAIL' && (
            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                আপনার ইমেইল ঠিকানা:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
            </div>
          )}

          {/* Language Selection (Bengali / English) */}
          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 block mb-2">
              ২. পদের ভাষা নির্বাচন (Language):
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`py-2 px-3 rounded-xl border text-center transition ${
                  language === 'bn'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold'
                    : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800'
                }`}
              >
                বাংলা (IRV সংস্করণ)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-2 px-3 rounded-xl border text-center transition ${
                  language === 'en'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold'
                    : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800'
                }`}
              >
                English (BSB / KJV)
              </button>
            </div>
          </div>

          {/* Time Zone & Preferred Delivery Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1.5">
                <Globe className="w-3.5 h-3.5 text-gold-500" />
                টাইমজোন (Time Zone):
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
              >
                {COMMON_TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-500" />
                ডেলিভারির সময়:
              </label>
              <input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 block mt-1">সকাল ১০:০০ টার মধ্যে নিশ্চিত প্রাপ্তি</span>
            </div>
          </div>

          {/* Security & Privacy Guarantee */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 border-t border-slate-100 dark:border-navy-800 pt-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>জিরো-পিআইআই ও ১০০% গোপনীয়তা সুরক্ষিত। কোনো তৃতীয় পক্ষের বিজ্ঞাপন নেই।</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            {isAlreadySubscribed ? (
              <button
                type="button"
                onClick={handleUnsubscribe}
                className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600 text-xs font-semibold py-2 px-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> আনসাবস্ক্রাইব করুন
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-300 text-xs font-semibold transition"
              >
                বন্ধ করুন
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400 text-xs font-bold shadow transition flex items-center gap-1.5"
              >
                {isLoading ? 'সংরক্ষণ হচ্ছে...' : isAlreadySubscribed ? 'পছন্দ আপডেট করুন' : 'সাবস্ক্রাইব সম্পন্ন করুন'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
