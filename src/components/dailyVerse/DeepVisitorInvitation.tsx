// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// VISITOR NOTIFICATION INVITATION COMPONENT
// ============================================================

import React, { useState, useEffect } from 'react';
import { Sparkles, X, Bell, ShieldCheck, Sun } from 'lucide-react';
import { DeepDailyWordService } from '../../services/deepDailyWordService';
import { DeepSubscriberPreferencesModal } from './DeepSubscriberPreferencesModal';

interface DeepVisitorInvitationProps {
  passageOpenedCount?: number;
}

export const DeepVisitorInvitation: React.FC<DeepVisitorInvitationProps> = ({
  passageOpenedCount = 0,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check permanent refusal
    const permanentRefusal = localStorage.getItem('bsb_deep_invitation_never');
    if (permanentRefusal === 'true') return;

    // Check 7-day snooze ("এখন নয়")
    const snoozeUntil = localStorage.getItem('bsb_deep_invitation_snooze_until');
    if (snoozeUntil && Date.now() < parseInt(snoozeUntil, 10)) {
      return;
    }

    // Check if user is already an active subscriber
    const currentSub = DeepDailyWordService.getMySubscriber();
    if (currentSub && currentSub.status === 'ACTIVE') {
      return;
    }

    // Qualification State Trackers:
    // Criteria: 20 seconds elapsed OR 1 passage opened OR 40% scroll depth
    let timeQualified = false;
    let scrollQualified = false;

    const checkAndShow = () => {
      if (timeQualified || scrollQualified || passageOpenedCount >= 1) {
        setIsVisible(true);
      }
    };

    // 1. Time check: 20 seconds
    const timer = setTimeout(() => {
      timeQualified = true;
      checkAndShow();
    }, 20000);

    // 2. Scroll check: 40%
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const scrolled = (window.scrollY / scrollTotal) * 100;
        if (scrolled >= 40) {
          scrollQualified = true;
          checkAndShow();
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Passage check
    if (passageOpenedCount >= 1) {
      checkAndShow();
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [passageOpenedCount]);

  const handleAccept = async () => {
    setIsVisible(false);

    // Request browser notification permission if available
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        await Notification.requestPermission();
      } catch {}
    }

    // Open preferences modal so subscriber can fine-tune time/themes/language
    setIsPreferencesOpen(true);
  };

  const handleSnooze = () => {
    setIsVisible(false);
    // Suppress for 7 days
    const sevenDaysLater = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('bsb_deep_invitation_snooze_until', sevenDaysLater.toString());
  };

  const handleNeverAsk = () => {
    setIsVisible(false);
    // Permanent refusal
    localStorage.setItem('bsb_deep_invitation_never', 'true');
  };

  if (!isVisible && !isPreferencesOpen) return null;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 animate-slideUp">
          <div className="relative overflow-hidden rounded-3xl border border-gold-500/40 bg-white dark:bg-navy-900 shadow-2xl p-5 text-slate-800 dark:text-slate-100 backdrop-blur-md">
            {/* Top Close Button */}
            <button
              onClick={handleSnooze}
              className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
              title="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Title */}
            <div className="flex items-start gap-3 mb-2.5 pr-6">
              <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-gold-400 shrink-0 mt-0.5">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-700 dark:text-gold-400 flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" /> দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক
                </span>
                <h3 className="font-serif font-bold text-base text-navy-950 dark:text-gold-300 leading-snug">
                  “ঈশ্বরের বাক্যে আজ আপনার জন্য একটি আশার বার্তা আছে”
                </h3>
              </div>
            </div>

            {/* Message Body */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              আমি দীপ—আপনার বাইবেল অধ্যয়ন সহায়ক। প্রতিদিন সকাল ১০টার মধ্যে পবিত্র বাইবেল থেকে একটি নির্বাচিত পদ, সংক্ষিপ্ত ভাবনা এবং অধ্যয়নের লিংক পেতে চান?
            </p>

            {/* Privacy Statement */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-navy-950/60 p-2.5 rounded-xl border border-slate-100 dark:border-navy-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>আপনার অনুমতি ছাড়া কোনো বিজ্ঞপ্তি পাঠানো হবে না। আপনি যেকোনো সময় এটি বন্ধ করতে পারবেন।</span>
            </div>

            {/* Actions Toolbar */}
            <div className="space-y-2">
              <button
                onClick={handleAccept}
                className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950 dark:hover:bg-gold-400 font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" /> হ্যাঁ, প্রতিদিনের বাক্য পেতে চাই
              </button>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <button
                  onClick={handleSnooze}
                  className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 py-1 px-2 rounded-lg transition"
                >
                  এখন নয়
                </button>
                <button
                  onClick={handleNeverAsk}
                  className="text-slate-400 hover:text-rose-500 py-1 px-2 rounded-lg transition"
                >
                  আর জিজ্ঞাসা করবেন না
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <DeepSubscriberPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </>
  );
};
