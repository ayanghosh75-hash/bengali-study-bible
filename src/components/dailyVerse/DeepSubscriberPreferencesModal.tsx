// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// SUBSCRIBER PREFERENCES, THEMES & PRIVACY MODAL
// ============================================================

import React, { useState, useEffect } from 'react';
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
  Tag,
} from 'lucide-react';
import {
  DeepSubscriber,
  DeliveryChannel,
  NotificationLanguage,
} from '../../types/deepDailyWord';
import { DeepDailyWordService } from '../../services/deepDailyWordService';

interface DeepSubscriberPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const AVAILABLE_THEMES = [
  { id: 'Hope', labelBn: 'আশা ও অনুপ্রেরণা (Hope)' },
  { id: 'Prayer', labelBn: 'প্রার্থনা ও আধ্যাত্মিকতা (Prayer)' },
  { id: 'Family', labelBn: 'পারিবারিক জীবন (Family)' },
  { id: 'Discipleship', labelBn: 'শিষ্যত্ব ও আনুগত্য (Discipleship)' },
  { id: 'Comfort', labelBn: 'সান্ত্বনা ও শান্তি (Comfort)' },
  { id: 'Christian living', labelBn: 'দৈনন্দিন খ্রিষ্টীয় জীবন (Living)' },
  { id: 'Bible study', labelBn: 'গভীর শাস্ত্রাংশ অধ্যয়ন (Bible study)' },
  { id: 'Youth', labelBn: 'যুব সমাজ ও আত্মিক বিকাশ (Youth)' },
  { id: 'Leadership', labelBn: 'নেতৃত্ব ও বিশ্বস্ততা (Leadership)' },
];

export const DeepSubscriberPreferencesModal: React.FC<DeepSubscriberPreferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [subscriber, setSubscriber] = useState<DeepSubscriber | null>(null);
  const [channel, setChannel] = useState<DeliveryChannel>('PUSH');
  const [language, setLanguage] = useState<NotificationLanguage>('bn');
  const [email, setEmail] = useState<string>('');
  const [timeZone, setTimeZone] = useState<string>(() => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata');
  const [preferredTime, setPreferredTime] = useState<string>('10:00');
  const [selectedThemes, setSelectedThemes] = useState<string[]>(['Hope', 'Comfort', 'Bible study']);
  const [optInConfirmed, setOptInConfirmed] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Method Aliases for test suite and compatibility
  const handlePause = () => handleTogglePause();
  const handleDeleteData = () => handleDeleteAllData();

  useEffect(() => {
    if (isOpen) {
      const current = DeepDailyWordService.getMySubscriber();
      if (current) {
        setSubscriber(current);
        setChannel(current.channel);
        setLanguage(current.language);
        setEmail(current.email || '');
        setTimeZone(current.timeZone);
        setPreferredTime(current.preferredTime);
        setSelectedThemes(current.preferredThemes || ['Hope', 'Comfort', 'Bible study']);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isSubscribed = Boolean(subscriber && subscriber.status !== 'UNSUBSCRIBED');

  const toggleTheme = (themeId: string) => {
    setSelectedThemes((prev) =>
      prev.includes(themeId) ? prev.filter((t) => t !== themeId) : [...prev, themeId]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (channel === 'EMAIL') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.trim())) {
        setFeedback({
          type: 'error',
          text: 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা প্রদান করুন (যেমন: example@gmail.com)।',
        });
        return;
      }
    }

    setIsSaving(true);
    try {
      let pushSubData: any = undefined;
      if (channel === 'PUSH' && typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission !== 'granted') {
          const perm = await Notification.requestPermission();
          if (perm !== 'granted') {
            setFeedback({
              type: 'error',
              text: 'ব্রাউজার নোটিফিকেশন অনুমোদন করা হয়নি। আপনি বিকল্প হিসেবে ইমেইল চ্যানেল বেছে নিতে পারেন।',
            });
            setIsSaving(false);
            return;
          }
        }

        if ('serviceWorker' in navigator) {
          try {
            const reg = await navigator.serviceWorker.ready;
            const sub = await reg.pushManager.getSubscription();
            pushSubData = sub ? sub.toJSON() : { endpoint: `local-push-${Date.now()}` };
          } catch {
            pushSubData = { endpoint: `local-push-${Date.now()}` };
          }
        }
      }

      const updated = DeepDailyWordService.subscribe({
        channel,
        language,
        timeZone,
        preferredTime,
        preferredThemes: selectedThemes,
        email: channel === 'EMAIL' ? email.trim() : undefined,
        pushSubscription: pushSubData,
      });

      setSubscriber(updated);
      setFeedback({
        type: 'success',
        text: 'আপনার নোটিফিকেশন পছন্দসমূহ সফলভাবে সংরক্ষিত হয়েছে।',
      });

      setTimeout(() => {
        onClose();
      }, 1300);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: err.message || 'সংরক্ষণ ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePause = () => {
    if (!subscriber) return;
    if (subscriber.status === 'ACTIVE') {
      DeepDailyWordService.pauseSubscription(subscriber.id);
      setSubscriber({ ...subscriber, status: 'PAUSED' });
      setFeedback({ type: 'success', text: 'নোটিফিকেশন সাময়িকভাবে স্থগিত (Paused) করা হয়েছে।' });
    } else {
      DeepDailyWordService.resumeSubscription(subscriber.id);
      setSubscriber({ ...subscriber, status: 'ACTIVE' });
      setFeedback({ type: 'success', text: 'নোটিফিকেশন পুনরায় সক্রিয় করা হয়েছে।' });
    }
  };

  const handleUnsubscribe = () => {
    if (!subscriber) return;
    const confirm = window.confirm('আপনি কি নিশ্চিত যে আপনি আর দৈনিক বাইবেল পদ পেতে চান না?');
    if (!confirm) return;

    DeepDailyWordService.unsubscribe(subscriber.id);
    setSubscriber(null);
    setFeedback({ type: 'success', text: 'আপনি সফলভাবে আনসাবস্ক্রাইব করেছেন।' });
    setTimeout(() => onClose(), 1200);
  };

  const handleDeleteAllData = () => {
    if (!subscriber) return;
    const confirm = window.confirm('সতর্কতা: আপনার সংরক্ষিত সকল নোটিফিকেশন ডেটা ও পদ ইতিহাস স্থায়ীভাবে মুছে ফেলা হবে। আপনি কি এগিয়ে যেতে চান?');
    if (!confirm) return;

    DeepDailyWordService.deleteSubscriberData(subscriber.id);
    setSubscriber(null);
    setFeedback({ type: 'success', text: 'আপনার সংরক্ষিত সমস্ত তথ্য স্থায়ীভাবে মুছে ফেলা হয়েছে।' });
    setTimeout(() => onClose(), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-navy-900 border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-navy-800 bg-slate-50/60 dark:bg-navy-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-gold-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-navy-950 dark:text-gold-300">
                {isSubscribed ? 'দীপের নোটিফিকেশন পছন্দসমূহ' : 'দীপের দৈনিক বাক্য সাবস্ক্রিপশন'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                অ্যাকাউন্ট তৈরি ছাড়াই সকাল ১০টার মধ্যে সুপ্রভাত শাস্ত্রীয় ভাবনা
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-200">
          {feedback && (
            <div
              className={`p-3.5 rounded-2xl flex items-start gap-2.5 border ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Active Status Pill if Subscribed */}
          {isSubscribed && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">বর্তমান স্থিতি:</span>
                <span className="font-bold flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      subscriber?.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  {subscriber?.status === 'ACTIVE' ? 'সক্রিয় (Active)' : 'সাময়িক স্থগিত (Paused)'}
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

          {/* User Consent Opt-In Box */}
          <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-start gap-3">
            <input
              type="checkbox"
              id="optInCheck"
              checked={optInConfirmed}
              onChange={(e) => setOptInConfirmed(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded text-gold-600 focus:ring-gold-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="optInCheck" className="text-xs font-semibold text-navy-950 dark:text-gold-200 cursor-pointer select-none">
              আমি প্রতিদিন সকাল ১০টার মধ্যে একটি বাইবেল পদ পেতে চাই।
            </label>
          </div>

          {/* 1. Delivery Channel */}
          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 block mb-2">
              ১. নোটিফিকেশনের মাধ্যম (Channel):
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setChannel('PUSH')}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1 transition ${
                  channel === 'PUSH'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold'
                    : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="text-xs">ব্রাউজার পুশ নোটিফিকেশন</span>
              </button>
              <button
                type="button"
                onClick={() => setChannel('EMAIL')}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1 transition ${
                  channel === 'EMAIL'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold'
                    : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span className="text-xs">ইমেইল বার্তা</span>
              </button>
            </div>
          </div>

          {channel === 'EMAIL' && (
            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                আপনার ইমেইল ঠিকানা:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
            </div>
          )}

          {/* 2. Language Selection */}
          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 block mb-2">
              ২. ভাষা নির্বাচন:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`py-2 px-3 rounded-xl border text-center transition ${
                  language === 'bn'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold'
                    : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50'
                }`}
              >
                বাংলা (Bengali)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-2 px-3 rounded-xl border text-center transition ${
                  language === 'en'
                    ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold'
                    : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50'
                }`}
              >
                English (বাইবেল পদ)
              </button>
            </div>
          </div>

          {/* 3. Preferred Themes */}
          <div>
            <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
              <Tag className="w-3.5 h-3.5 text-gold-500" />
              ৩. আপনার পছন্দের বিষয়শ্রেণী (Themes):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AVAILABLE_THEMES.map((theme) => {
                const isSelected = selectedThemes.includes(theme.id);
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => toggleTheme(theme.id)}
                    className={`p-2 rounded-xl border text-left text-[11px] transition ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 text-navy-950 dark:text-gold-300 font-bold'
                        : 'border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {theme.labelBn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Timezone & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1.5">
                <Globe className="w-3.5 h-3.5 text-gold-500" />
                টাইমজোন (Time Zone):
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
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
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 block mt-1">স্থানীয় সকাল ১০:০০ টার পূর্বে</span>
            </div>
          </div>

          {/* Privacy & Guarantee Notice */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-navy-800 pt-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>কোনো স্প্যাম নয়। যেকোনো সময় ১-ক্লিকে আনসাবস্ক্রাইব অথবা আপনার তথ্য স্থায়ীভাবে মুছে ফেলা যাবে।</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            {isSubscribed ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleUnsubscribe}
                  className="text-rose-500 hover:text-rose-600 text-xs font-semibold py-1.5 px-2.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                >
                  আনসাবস্ক্রাইব
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAllData}
                  className="text-slate-400 hover:text-rose-600 text-xs font-semibold py-1.5 px-2 rounded-lg transition"
                  title="আমার সমস্ত তথ্য মুছে ফেলুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
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
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400 text-xs font-bold shadow transition"
              >
                {isSaving ? 'সংরক্ষণ হচ্ছে...' : isSubscribed ? 'পছন্দ আপডেট করুন' : 'সাবস্ক্রিপশন সম্পন্ন করুন'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
