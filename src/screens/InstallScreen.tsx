// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// OFFICIAL PERMANENT BILINGUAL INSTALLATION & PWA ONBOARDING PORTAL
// Founder, Owner & Overseer: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Permanent Canonical URL: https://bengalistudybible.surge.sh/install
// Scripture Safeguard: Zero AI Manufactured Scripture Guaranteed
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  QrCode,
  Copy,
  MessageCircle,
  Mail,
  Info,
  Laptop,
  Smartphone,
  Apple,
  FileText,
  ExternalLink,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { BengaliStudyBibleLogo } from '../components/brand/BengaliStudyBibleLogo';
import { FullOfflineDownloadManager } from '../components/FullOfflineDownloadManager';
import { usePwa } from '../hooks/usePwa';
import { PwaService } from '../services/pwaService';
import { AnalyticsService } from '../services/analyticsService';

export const PERMANENT_INSTALL_URL = 'https://bengalistudybible.surge.sh/install';

interface InstallScreenProps {
  onNavigateToBible: () => void;
  onOpenShareModal?: () => void;
}

export const InstallScreen: React.FC<InstallScreenProps> = ({
  onNavigateToBible,
  onOpenShareModal,
}) => {
  const { isInstalled, isStandalone, installApp } = usePwa();
  const [deviceCategory, setDeviceCategory] = useState<'android' | 'ios' | 'windows' | 'mac' | 'unsupported'>('android');
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'windows' | 'mac' | 'unsupported'>('android');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installFeedback, setInstallFeedback] = useState<string | null>(null);
  const [installSuccessConfirmed, setInstallSuccessConfirmed] = useState(false);

  // Auto-detect client device on mount & record privacy-safe analytics
  useEffect(() => {
    AnalyticsService.trackInstallPageView();

    const dev = PwaService.getDeviceType();
    const isSupported = PwaService.isPwaInstallSupported();

    let detected: 'android' | 'ios' | 'windows' | 'mac' | 'unsupported' = 'android';
    if (dev === 'ios') {
      detected = 'ios';
      AnalyticsService.trackIosInstructionsViewed();
    } else if (dev === 'android') {
      detected = 'android';
    } else if (dev === 'windows') {
      detected = 'windows';
    } else if (dev === 'mac') {
      detected = 'mac';
    } else if (!isSupported) {
      detected = 'unsupported';
    }

    setDeviceCategory(detected);
    setActiveTab(detected);

    // Track QR originated visit
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('ref') === 'qr' || params.get('source') === 'qr') {
        AnalyticsService.trackEvent('QR_PAGE_VIEW', { route: '/install' });
      }
    }
  }, []);

  // Use the verified permanent HTTPS production URL
  const currentOrigin =
    typeof window !== 'undefined' &&
    window.location.origin.startsWith('https://') &&
    !window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://bengalistudybible.surge.sh';

  const installUrl = `${currentOrigin}/install`;

  const handleTriggerInstall = async () => {
    setIsInstalling(true);
    setInstallFeedback(null);
    AnalyticsService.trackInstallButtonClick('install_screen');

    try {
      const accepted = await installApp();
      if (accepted) {
        setInstallSuccessConfirmed(true);
        setInstallFeedback('✓ বাংলা স্টাডি বাইবেল সফলভাবে আপনার ডিভাইসে ইনস্টল হয়েছে!');
      } else {
        if (deviceCategory === 'ios') {
          setInstallFeedback('আইফোনে ইনস্টল করতে: Safari শেয়ার বাটন (⎋) স্পর্শ করে "Add to Home Screen" বেছে নিন।');
        } else if (deviceCategory === 'windows' || deviceCategory === 'mac') {
          setInstallFeedback('ব্রাউজারের অ্যাড্রেস বারে ইনস্টল আইকন (⊕) ক্লিক করুন অথবা ব্রাউজার মেনু থেকে Install বেছে নিন।');
        } else {
          setInstallFeedback('ব্রাউজারের মেনু (⋮ বা Share) থেকে "Install app" অথবা "Add to Home Screen" স্পর্শ করুন।');
        }
        const guideEl = document.getElementById('install-guide-section');
        if (guideEl) guideEl.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
      setInstallFeedback('অনুগ্রহ করে নিচের ধাপগুলো অনুসরণ করে ম্যানুয়ালি হোম স্ক্রিনে যুক্ত করুন।');
    } finally {
      setIsInstalling(false);
    }
  };

  const handleContinueInBrowser = () => {
    AnalyticsService.trackEvent('BIBLE_OPEN', { route: '/bible', metadata: { source: 'continue_in_browser' } });
    onNavigateToBible();
  };

  const handleCopyLink = () => {
    AnalyticsService.trackShareClick('copy_link');
    navigator.clipboard.writeText(PERMANENT_INSTALL_URL).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleShareWhatsApp = () => {
    AnalyticsService.trackShareClick('whatsapp');
    const waText = `✝️ বাংলা স্টাডি বাইবেল (Bengali Study Bible)\n“ঈশ্বরের বাক্য পড়ুন • বুঝুন • জীবনে প্রয়োগ করুন”\n\nসম্পূর্ণ প্রটেস্ট্যান্ট ক্যানন (৬৬টি পুস্তক), প্রামাণ্য IRV বাংলা পাঠ, দীপ AI সহায়ক, ও পালকীয় উপকরণ।\n\n📱 আপনার ডিভাইসে সরাসরি খুলুন ও ইনস্টল করুন:\n${PERMANENT_INSTALL_URL}\n\nWindows • macOS • Android • iPhone/iPad • Browser`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, '_blank');
  };

  const handleShareFacebook = () => {
    AnalyticsService.trackShareClick('facebook');
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PERMANENT_INSTALL_URL)}`;
    window.open(fbUrl, '_blank', 'width=600,height=500');
  };

  const handleShareEmail = () => {
    AnalyticsService.trackShareClick('email');
    const subject = encodeURIComponent('বাংলা স্টাডি বাইবেল — ইনস্টলেশন ও অধ্যয়ন আমন্ত্রণ');
    const body = encodeURIComponent(
      `প্রিয় সুহৃদ,\n\nবাংলা স্টাডি বাইবেলের সঙ্গে যুক্ত হওয়ার জন্য আমন্ত্রণ জানাচ্ছি। সম্পূর্ণ ৬৬টি পুস্তক, স্টাডি নোট, দীপ AI অধ্যয়ন সহায়ক, ও পালকীয় উপকরণ এখন এক জায়গায় পাওয়া যাচ্ছে।\n\nআপনার ফোন বা কম্পিউটারে ইনস্টল করতে এই স্থায়ী লিংকটিতে প্রবেশ করুন:\n${PERMANENT_INSTALL_URL}\n\nসবার জন্য সহজ ও বিশুদ্ধ বাংলা বাইবেল অধ্যয়ন।`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNativeShare = async () => {
    AnalyticsService.trackShareClick('native');
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'বাংলা স্টাডি বাইবেল (Bengali Study Bible)',
          text: 'বাংলা স্টাডি বাইবেল: ঈশ্বরের বাক্য পড়ুন, বুঝুন এবং জীবনে প্রয়োগ করুন। বিনামূল্যে ইনস্টল করুন।',
          url: PERMANENT_INSTALL_URL,
        });
      } catch {
        // User dismissed share sheet
      }
    } else if (onOpenShareModal) {
      onOpenShareModal();
    }
  };

  const handleDownloadAccessibleFeatures = () => {
    const content = `============================================================
বাংলা স্টাডি বাইবেল (BENGALI STUDY BIBLE) — অ্যাক্সেসিবল ফিচার তালিকা
স্থায়ী লিংক: ${PERMANENT_INSTALL_URL}
প্রতিষ্ঠাতা ও তত্ত্বাবধায়ক: রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)
============================================================

১. বাইবেল পাঠ | Bible Reading
- সম্পূর্ণ বাংলা বাইবেল পাঠ (৬৬টি পুস্তক, ১,১৮৯ অধ্যায়, ৩১,০৮৮ পদ)
- Book and chapter navigation
- Search (দ্রুত অনুসন্ধান ও ফিল্টার)
- Cross-references (শাস্ত্রীয় ক্রস-রেফারেন্স)
- Adjustable font size (হরফের আকার পরিবর্তন)
- Light and dark modes (দিন ও রাতের পাঠ মোড)
- Saved reading position (সর্বশেষ পঠিত স্থান স্বয়ংক্রিয় সংরক্ষণ)

২. অধ্যয়ন | Study
- অধ্যায়ের প্রেক্ষাপট (ঐতিহাসিক ও সামাজিক পটভূমি)
- Study notes (বিশদ পদভিত্তিক স্টাডি নোট)
- Key themes (ধর্মতাত্ত্বিক মূলভাব)
- Related passages (সম্পর্কিত শাস্ত্রীয় অংশ)
- Reflection questions (আত্মিক প্রতিফলন প্রশ্নমালা)
- Bengali Christian Knowledge Library (দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার)

৩. দীপ AI সহায়ক | Deep AI Assistant
- Ask Bible (শাস্ত্রীয় প্রশ্ন জিজ্ঞাসা)
- Context-based answers (ঐতিহাসিক ও শাস্ত্রীয় উত্তর)
- Source-supported explanations (প্রামাণ্য উৎস ভিত্তিক ব্যাখ্যা)
- Daily Word (প্রতিদিনের বাক্য ও অনুপ্রেরণা)
- Reading guidance (ব্যক্তিগত পাঠ নির্দেশনা)
- Tutorial assistance (ইন্টারেক্টিভ টিউটোরিয়াল সহায়তা)

৪. ব্যক্তিগত যাত্রা | Personal Journey
- দীপ ৩৬৫ (বার্ষিক পূর্ণাঙ্গ পাঠ পরিকল্পনা)
- Personal reading plans (কাস্টম পাঠ পরিকল্পনা)
- New believer’s 30-day journey (নতুন বিশ্বাসীর ৩০ দিনের যাত্রা)
- Weekly progress summary (সাপ্তাহিক অগ্রগতি সারসংক্ষেপ)
- Saved verses (পছন্দের পদ সংরক্ষণ)
- Optional notifications (ঐচ্ছিক নোটিফিকেশন সুবিধা)

৫. পালকীয় উপকরণ | Pastor Tools
- Sermon Builder (সার্মন বিল্ডার)
- Bible Study Builder (বাইবেল স্টাডি প্রস্তুতকারক)
- Devotional Builder (ভক্তিভাবনা প্রস্তুতি)
- Small Group Builder (ক্ষুদ্র দল অধ্যয়ন)
- Youth Study (যুব সমাজ বাইবেল শিক্ষা)
- Sunday School (সানডে স্কুল পাঠ পরিকল্পনা)
- Bible Quiz (শাস্ত্র কুইজ)
- Prayer Meeting (প্রার্থনা সভা সহায়িকা)
- Funeral Message (অন্ত্যেষ্টিক্রিয়া বার্তা)
- Wedding Message (বিবাহ বার্তা)
- Teaching Outline (শিক্ষাদানের রূপরেখা)
- Church Study Kit (মণ্ডলী স্টাডি কিট)

৬. সহজ ব্যবহার | Easy Access
- Windows PC
- MacBook/macOS
- Android
- iPhone/iPad
- Mobile and desktop browsers
- Installable web app (অফলাইন PWA)
- Accessibility controls (WCAG AA স্ক্রিন রিডার সমর্থন)
- Bengali and English guidance (দ্বিভাষিক দিকনির্দেশনা)
============================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bengali-study-bible-features.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[85vh] py-8 px-4 max-w-5xl mx-auto space-y-10 animate-fadeIn text-slate-800 dark:text-slate-100">
      
      {/* 1. HERO OFFICIAL BILINGUAL BRAND SHOWCASE */}
      <section
        role="region"
        aria-label="বাংলা স্টাডি বাইবেল ইনস্টলেশন পোর্টাল"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white p-8 sm:p-12 text-center border border-navy-800 shadow-2xl"
      >
        {/* Divine Ambient Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-6">
          {/* Top Pastoral Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>অফিসিয়াল ডিজিটাল বাংলা বাইবেল • Official PWA Portal</span>
          </div>

          {/* Official Stacked Brand Logo Lockup */}
          <BengaliStudyBibleLogo
            variant="stacked"
            theme="dark"
            size="xl"
            showTagline={false}
            showBadge={true}
            badgeText="স্থায়ী ইনস্টলেশন"
          />

          {/* Bilingual Main Headings (Prompt Section 6) */}
          <div className="space-y-2 max-w-3xl">
            <h1 lang="bn" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              বাংলা স্টাডি বাইবেল
            </h1>
            <h2 lang="bn" className="text-xl sm:text-2xl font-semibold text-gold-400">
              “ঈশ্বরের বাক্য পড়ুন, বুঝুন এবং জীবনে প্রয়োগ করুন”
            </h2>
            <div className="pt-1 text-sm sm:text-base text-slate-300 font-medium space-y-0.5">
              <p lang="en" className="text-slate-200 font-serif font-bold text-lg">Bengali Study Bible</p>
              <p lang="en" className="italic text-slate-400">“Read, understand and apply God’s Word”</p>
            </div>
          </div>

          {/* Bilingual Invitations (Prompt Section 6) */}
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-3xl p-5 rounded-2xl bg-navy-900/80 border border-navy-700/80 text-xs sm:text-sm leading-relaxed text-slate-300">
            <div lang="bn" className="space-y-1 border-b md:border-b-0 md:border-r border-navy-700 pb-3 md:pb-0 md:pr-4">
              <span className="font-bold text-gold-400">বাংলা আমন্ত্রণ:</span>
              <p>
                “আজই বাংলা স্টাডি বাইবেলের সঙ্গে যুক্ত হোন। বাইবেল পাঠ, অধ্যয়ন-সহায়িকা, দৈনিক বাক্য, ব্যক্তিগত পাঠ-পরিকল্পনা এবং পালকীয় প্রস্তুতির উপকরণ—সব এক জায়গায়।”
              </p>
            </div>
            <div lang="en" className="space-y-1 md:pl-2">
              <span className="font-bold text-gold-400">English Invitation:</span>
              <p>
                “Join the Bengali Study Bible today. Access Scripture, study resources, Daily Word, personalised reading plans and pastoral preparation tools in one place.”
              </p>
            </div>
          </div>

          {/* Primary Action Zone: Open and Install Now vs. Continue in Browser (Prompt Section 6) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-xl justify-center">
            {isStandalone || isInstalled || installSuccessConfirmed ? (
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center gap-2 py-3 px-5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>✓ আপনার ডিভাইসে অ্যাপ ইনস্টল রয়েছে</span>
                </div>
                <button
                  onClick={onNavigateToBible}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm shadow-lg shadow-gold-500/20 transition-all transform active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  <span>বাংলা স্টাডি বাইবেল খুলুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Primary CTA */}
                <button
                  onClick={handleTriggerInstall}
                  disabled={isInstalling}
                  aria-label="এখনই খুলুন ও ইনস্টল করুন — Open and Install Now"
                  className="w-full sm:flex-1 flex flex-col items-center justify-center py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold shadow-lg shadow-gold-500/25 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer text-center"
                >
                  <span className="text-base flex items-center gap-2">
                    <Download className="w-5 h-5 stroke-[2.5]" />
                    <span>এখনই খুলুন ও ইনস্টল করুন</span>
                  </span>
                  <span className="text-[11px] opacity-85 font-sans font-semibold">Open and Install Now</span>
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={handleContinueInBrowser}
                  aria-label="ইনস্টল না করে ব্রাউজারে পড়ুন — Continue in Browser"
                  className="w-full sm:w-auto flex flex-col items-center justify-center py-3.5 px-6 rounded-2xl bg-navy-800/90 hover:bg-navy-800 text-slate-200 hover:text-white border border-navy-700 font-semibold shadow-md transition-all cursor-pointer text-center"
                >
                  <span className="text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gold-400" />
                    <span>ইনস্টল না করে ব্রাউজারে পড়ুন</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans">Continue in Browser</span>
                </button>
              </>
            )}
          </div>

          {/* Dynamic Feedback Banner */}
          {installFeedback && (
            <div className="p-3.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2.5 max-w-lg animate-fadeIn text-left">
              <Info className="w-4 h-4 shrink-0 text-amber-300" />
              <span>{installFeedback}</span>
            </div>
          )}

          {/* Master Permanent Link Bar (Copy, Share, WhatsApp, FB, Email) */}
          <div className="w-full max-w-2xl pt-2 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-navy-950/80 border border-navy-800">
              <div className="flex-1 flex items-center gap-2 px-3 py-1.5 w-full overflow-hidden">
                <Compass className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-gold-300 truncate select-all">
                  {PERMANENT_INSTALL_URL}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs transition cursor-pointer"
                  title="লিংক কপি করুন"
                >
                  {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'কপি হয়েছে' : 'কপি'}</span>
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs transition cursor-pointer"
                  title="WhatsApp-এ শেয়ার করুন"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareFacebook}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs transition cursor-pointer"
                  title="Facebook-এ শেয়ার করুন"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareEmail}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs transition cursor-pointer"
                  title="ইমেইল করুন"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNativeShare}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-gold-400 border border-navy-700 text-xs transition cursor-pointer"
                  title="অন্যান্য মাধ্যমে শেয়ার"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              * এটি বাংলা স্টাডি বাইবেলের চিরস্থায়ী সর্বজনীন ইনস্টলেশন লিংক। কোনো মেয়াদোত্তীর্ণ বা পরিবর্তনযোগ্য রিডাইরেক্ট নয়।
            </p>
          </div>
        </div>
      </section>

      {/* PHASE 10: OPTIONAL FULL 66-BOOK OFFLINE DOWNLOAD MANAGER */}
      <FullOfflineDownloadManager />

      {/* 2. DEVICE-SPECIFIC INSTALLATION GUIDANCE (Prompt Section 2) */}
      <section
        id="install-guide-section"
        role="region"
        aria-label="ডিভাইসভিত্তিক ইনস্টলেশন নির্দেশিকা"
        className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-md space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-navy-800 pb-5">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 dark:text-gold-300">
              ডিভাইস অনুযায়ী সহজ ইনস্টলেশন পদ্ধতি
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              ডিভাইস স্বয়ংক্রিয়ভাবে চিহ্নিত: <span className="font-semibold text-gold-600 dark:text-gold-400 uppercase">{deviceCategory}</span>
            </p>
          </div>

          {/* Platform Tab Buttons */}
          <div className="flex flex-wrap bg-slate-100 dark:bg-navy-950 p-1.5 rounded-2xl border border-slate-200 dark:border-navy-800 gap-1">
            <button
              onClick={() => setActiveTab('android')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'android'
                  ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('ios');
                AnalyticsService.trackIosInstructionsViewed();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ios'
                  ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iPhone/iPad</span>
            </button>
            <button
              onClick={() => setActiveTab('windows')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'windows'
                  ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Windows PC</span>
            </button>
            <button
              onClick={() => setActiveTab('mac')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'mac'
                  ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>macOS/Mac</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Android Guidance */}
        {activeTab === 'android' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                  ১
                </div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">ইনস্টল প্রম্পট খুলুন</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  উপরের <span className="font-bold text-gold-600 dark:text-gold-400">“এখনই খুলুন ও ইনস্টল করুন”</span> বাটনে ট্যাপ করুন।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                  ২
                </div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">বিকল্প: Chrome মেনু</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  যদি প্রম্পট নিজে থেকে না আসে, Chrome-এর উপরের ডান কোণার ৩টি ডট (<span className="font-mono font-bold">⋮</span>) চেপে <span className="font-bold">"Install app"</span> অথবা <span className="font-bold">"Add to Home screen"</span> স্পর্শ করুন।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                  ৩
                </div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">হোম স্ক্রিন থেকে ওপেন</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  কয়েক সেকেন্ডে আপনার ফোনের হোম স্ক্রিনে বাংলা বাইবেল আইকন তৈরি হবে। সেখান থেকে সম্পূর্ণ ফুলস্ক্রিন ও অফলাইনে পাঠ উপভোগ করুন।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: iPhone / iPad Guidance (Prompt Section 2) */}
        {activeTab === 'ios' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-300 text-xs flex items-center gap-2.5">
              <Info className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <span>
                <strong>Apple Safari নির্দেশিকা:</strong> iOS সিস্টেমে সরাসরি কোনো থার্ড-পার্টি ইনস্টলেশন সম্ভব নয়; Safari ব্রাউজারের অফিসিয়াল <strong>"Add to Home Screen"</strong> ফিচার ব্যবহার করতে হবে।
              </span>
            </div>

            <div className="grid sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                  ১
                </div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">Safari-তে খুলুন</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  লিংকটি Apple Safari ব্রাউজারে চালু রাখুন। (Facebook বা WhatsApp ইন-অ্যাপ ব্রাউজারে থাকলে 'Open in Safari' দিন)।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                  ২
                </div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">Share বাটন স্পর্শ</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Safari ব্রাউজারের নিচের টুলবারে থাকা <span className="font-bold text-gold-600 dark:text-gold-400">Share বাটন</span> (একটি চারকোণা বাক্স ও ঊর্ধ্বমুখী তীর ⎋) চাপুন।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                  ৩
                </div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">Add to Home Screen</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  শেয়ার তালিকা সামান্য স্ক্রোল করে <span className="font-bold text-gold-600 dark:text-gold-400">"Add to Home Screen" (⊕)</span> অপশনটি বেছে নিন।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                  ৪
                </div>
                <h3 className="font-bold text-sm text-navy-950 dark:text-white">"Add" এ নিশ্চিত করুন</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  উপরের ডান কোণায় <span className="font-bold">"Add"</span> বাটনে চাপ দিন। আপনার আইফোন/আইপ্যাডের হোম স্ক্রিনে অ্যাপ আইকন যুক্ত হবে।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Windows PC Guidance (Prompt Section 2) */}
        {activeTab === 'windows' && (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                ১
              </div>
              <h3 className="font-bold text-sm text-navy-950 dark:text-white">অ্যাড্রেস বার আইকন</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Google Chrome বা Microsoft Edge ব্রাউজারের অ্যাড্রেস বারের ডান পাশে ছোট অ্যাপ/ডাউনলোড আইকন (<span className="font-mono">⊕</span> বা কম্পিউটার আইকন) লক্ষ্য করুন।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                ২
              </div>
              <h3 className="font-bold text-sm text-navy-950 dark:text-white">Install নিশ্চিত করুন</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                পপআপ ডায়ালগ বক্সে <span className="font-bold text-gold-600 dark:text-gold-400">"Install"</span> বাটনে ক্লিক করুন। উইন্ডোজ স্টার্ট মেনু ও টাস্কবারে শর্টকাট যুক্ত হবে।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                ৩
              </div>
              <h3 className="font-bold text-sm text-navy-950 dark:text-white">ডেস্কটপ উইন্ডো উপভোগ</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                ব্রাউজারের ট্যাব বার ছাড়াই একটি নেটিভ ডেস্কটপ উইন্ডোতে দ্রুত অনুসন্ধান ও সার্মন তৈরি করুন।
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: macOS Guidance (Prompt Section 2) */}
        {activeTab === 'mac' && (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                ১
              </div>
              <h3 className="font-bold text-sm text-navy-950 dark:text-white">Safari (Sonoma+) বা Chrome</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Safari ব্যবহার করলে মেনু বার থেকে <span className="font-bold">File → "Add to Dock..."</span> বেছে নিন। Chrome বা Edge হলে অ্যাড্রেস বারের Install বোতামে চাপুন।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                ২
              </div>
              <h3 className="font-bold text-sm text-navy-950 dark:text-white">Add নিশ্চিত করুন</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                নাম <span className="font-semibold">"বাংলা স্টাডি বাইবেল"</span> থাকবে। "Add" বোতামে ক্লিক করুন।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800/80 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-sm">
                ৩
              </div>
              <h3 className="font-bold text-sm text-navy-950 dark:text-white">MacBook Dock থেকে পাঠ</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                আপনার ম্যাকের ডকে অ্যাপ আইকন যুক্ত হবে। Spotlight সার্চ বা Launchpad থেকেও সরাসরি খুলতে পারবেন।
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Unsupported Browser Fallback (Prompt Section 2) */}
        {activeTab === 'unsupported' && (
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-3">
            <h3 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600" />
              <span>ব্রাউজার সরাসরি ইনস্টলেশন সমর্থন নাও করতে পারে</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              আপনার বর্তমান ব্রাউজারটিতে সরাসরি PWA হোম স্ক্রিন ইনস্টলেশন সীমিত হতে পারে (যেমন ইন-অ্যাপ ব্রাউজার বা অপ্রচলিত ব্রাউজার)। 
              <strong>তবে চিন্তার কোনো কারণ নেই — বাংলা স্টাডি বাইবেল এই ব্রাউজারেই ১০০% কার্যকর ও পাঠযোগ্য।</strong>
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleContinueInBrowser}
                className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs cursor-pointer"
              >
                ব্রাউজারেই বাইবেল খুলুন
              </button>
              <span className="text-xs text-slate-500 dark:text-slate-400 self-center">
                অথবা Google Chrome, Safari বা Edge ব্রাউজারে লিংকটি খুলুন।
              </span>
            </div>
          </div>
        )}
      </section>

      {/* 3. VERIFIED PRODUCTION FEATURE LIST (Prompt Section 7) */}
      <section
        role="region"
        aria-label="বাংলা স্টাডি বাইবেলের যাচাইকৃত বৈশিষ্ট্যসমূহ"
        className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-md space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-navy-800 pb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 dark:text-gold-300">
              যাচাইকৃত কার্যকারিতা ও সুবিধাসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              প্রোডাকশনে সক্রিয় ৬টি প্রধান শাখার প্রামাণ্য ফিচার তালিকা
            </p>
          </div>
          <button
            onClick={handleDownloadAccessibleFeatures}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-gold-500/10 hover:text-gold-600 transition cursor-pointer self-start sm:self-auto"
            title="অ্যাক্সেসিবল টেক্সট ফরম্যাটে ডাউনলোড করুন"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ফিচার তালিকা ডাউনলোড</span>
          </button>
        </div>

        {/* 6 Grid Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. বাইবেল পাঠ | Bible Reading */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-3">
            <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <h3>বাইবেল পাঠ | Bible Reading</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>সম্পূর্ণ বাংলা বাইবেল পাঠ (৬৬ পুস্তক)</li>
              <li>Book and chapter navigation</li>
              <li>Search (দ্রুত শব্দ সন্ধান)</li>
              <li>Cross-references (ক্রস-রেফারেন্স)</li>
              <li>Adjustable font size (হরফ নিয়ন্ত্রণ)</li>
              <li>Light and dark modes</li>
              <li>Saved reading position</li>
            </ul>
          </div>

          {/* 2. অধ্যয়ন | Study */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-3">
            <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-sm">
              <Compass className="w-4 h-4" />
              <h3>অধ্যয়ন | Study</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>অধ্যায়ের প্রেক্ষাপট (ঐতিহাসিক পটভূমি)</li>
              <li>Study notes (পদভিত্তিক টীকা)</li>
              <li>Key themes (মূল ধর্মতাত্ত্বিক ভাব)</li>
              <li>Related passages (সম্পর্কিত অংশ)</li>
              <li>Reflection questions (প্রতিফলন প্রশ্ন)</li>
              <li>Bengali Christian Knowledge Library</li>
            </ul>
          </div>

          {/* 3. দীপ AI সহায়ক | Deep AI Assistant */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-3">
            <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <h3>দীপ AI সহায়ক | Deep Assistant</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Ask Bible (শাস্ত্রীয় প্রশ্নোত্তর)</li>
              <li>Context-based answers</li>
              <li>Source-supported explanations</li>
              <li>Daily Word (প্রতিদিনের প্রেরণা)</li>
              <li>Reading guidance (পাঠ সহায়িকা)</li>
              <li>Tutorial assistance (টিউটোরিয়াল)</li>
            </ul>
          </div>

          {/* 4. ব্যক্তিগত যাত্রা | Personal Journey */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-3">
            <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <h3>ব্যক্তিগত যাত্রা | Personal Journey</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>দীপ ৩৬৫ (বার্ষিক পাঠ পরিকল্পনা)</li>
              <li>Personal reading plans</li>
              <li>New believer’s 30-day journey</li>
              <li>Weekly progress summary</li>
              <li>Saved verses (বুকমার্ক ও নোট)</li>
              <li>Optional notifications</li>
            </ul>
          </div>

          {/* 5. পালকীয় উপকরণ | Pastor Tools */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-3">
            <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-sm">
              <FileText className="w-4 h-4" />
              <h3>পালকীয় উপকরণ | Pastor Tools</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Sermon Builder (সার্মন তৈরি)</li>
              <li>Bible Study &amp; Devotional Builder</li>
              <li>Small Group &amp; Youth Study</li>
              <li>Sunday School &amp; Bible Quiz</li>
              <li>Prayer Meeting &amp; Funeral Message</li>
              <li>Wedding Message &amp; Teaching Outline</li>
            </ul>
          </div>

          {/* 6. সহজ ব্যবহার | Easy Access */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-3">
            <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <h3>সহজ ব্যবহার | Easy Access</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Windows &amp; MacBook/macOS</li>
              <li>Android &amp; iPhone/iPad</li>
              <li>Mobile &amp; desktop browsers</li>
              <li>Installable web app (PWA)</li>
              <li>Accessibility controls (WCAG AA)</li>
              <li>Bengali &amp; English guidance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. PERMANENT QR CODE & DOWNLOADABLE POSTER (Prompt Section 4, 8, 9) */}
      <section
        role="region"
        aria-label="স্থায়ী QR কোড ও প্রচারণামূলক পোস্টার"
        className="grid md:grid-cols-2 gap-6 items-stretch"
      >
        {/* Left: Official Permanent QR Code Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md flex flex-col items-center text-center space-y-4 justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-semibold">
              <QrCode className="w-4 h-4" />
              <span>চিরস্থায়ী যাচাইকৃত QR কোড</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white">
              “স্ক্যান করুন—বিনামূল্যে পড়ুন ও ইনস্টল করুন”
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              “Scan to read and install” • মোবাইল ক্যামেরা দিয়েই কাজ করবে
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-inner border border-slate-200 max-w-[240px]">
            <img
              src="/qr-codes/qr-bengalistudybible-install.png"
              alt="বাংলা স্টাডি বাইবেল স্থায়ী ইনস্টলেশন QR কোড"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="space-y-1 w-full">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-center">
              <span className="font-mono text-xs font-bold text-gold-600 dark:text-gold-400 select-all break-all">
                {PERMANENT_INSTALL_URL}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              উচ্চ রিডানড্যান্সি (Level H) • আজীবন মেয়াদ
            </p>
          </div>

          {/* Download Buttons for QR */}
          <div className="flex flex-wrap justify-center gap-2 w-full pt-1">
            <a
              href="/qr-codes/qr-bengalistudybible-install.png"
              download="qr-bengalistudybible-install.png"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950 font-bold text-xs hover:opacity-90 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PNG QR ডাউনলোড</span>
            </a>
            <a
              href="/qr-codes/qr-bengalistudybible-install.svg"
              download="qr-bengalistudybible-install.svg"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-navy-800 transition cursor-pointer border border-slate-200 dark:border-navy-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>SVG ভেক্টর QR</span>
            </a>
          </div>
        </div>

        {/* Right: Master 2160 × 2700 Bilingual Promotional Poster Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <FileText className="w-4 h-4" />
              <span>দ্বিভাষিক প্রচারণামূলক পোস্টার (JPG)</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white">
              হাই-রেজোলিউশন প্রচারপত্র (২১৬০ × ২৭০০ পিক্সেল)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              মণ্ডলী, হোয়াটসঅ্যাপ গ্রুপ, ফেসবুক ও প্রিন্টের জন্য উপযুক্ত। সঠিক বাংলা বানান, প্রামাণ্য ফিচার ও স্থায়ী QR সংযুক্ত।
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-800 bg-navy-950 max-h-[260px] flex items-center justify-center">
            <img
              src="/bengali-study-bible-installation-poster.jpg"
              alt="বাংলা স্টাডি বাইবেল দ্বিভাষিক প্রচারণামূলক পোস্টার ২১৬০ × ২৭০০"
              className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition duration-300"
            />
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                <p className="font-bold text-navy-950 dark:text-white">2160 × 2700 px</p>
                <p className="text-[10px] text-slate-400">আল্ট্রা হাই-কোয়ালিটি</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800">
                <p className="font-bold text-navy-950 dark:text-white">সরাসরি প্রিন্ট-রেডি</p>
                <p className="text-[10px] text-slate-400">A4 / সোশ্যাল শেয়ার</p>
              </div>
            </div>

            <a
              href="/bengali-study-bible-installation-poster.jpg"
              download="bengali-study-bible-poster-2160x2700.jpg"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>প্রচারণামূলক JPG পোস্টার ডাউনলোড করুন</span>
            </a>
          </div>
        </div>
      </section>

      {/* PHASE 8: LEGAL, SOURCES, LICENSING & ATTRIBUTION DISCLOSURE */}
      <section
        id="legal-sources-attribution"
        role="region"
        aria-label="আইনগত স্বীকৃতি, লাইসেন্স ও উৎসের বিবরণ"
        className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
      >
        <div className="flex items-center gap-2 text-navy-950 dark:text-gold-300 font-bold text-base sm:text-lg font-serif">
          <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0" />
          <h3>আইনগত স্বীকৃতি, লাইসেন্স ও উৎসের বিবরণ (Legal, Sources &amp; Attribution)</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-1.5">
            <div className="font-bold text-navy-950 dark:text-white">
              ১. মূল বাংলা বাইবেল পাঠ (Authoritative Bengali Scripture Source)
            </div>
            <p>
              <strong>উৎস:</strong> Indian Revised Version (IRV) Bengali — ইন্ডিয়ান রিভাইজড ভার্সন (বাংলা), ৬৬ পুস্তক, ১,১৮৯ অধ্যায়, ৩১,০৮৮ পদ।
            </p>
            <p>
              <strong>কপিরাইট ও প্রকাশক:</strong> © 2018, 2019 Bridge Connectivity Solutions Pvt. Ltd. (BCS) • eBible.org প্রত্যয়িত (USFM আইডি: <code>benirv</code>)।
            </p>
            <p>
              <strong>লাইসেন্স ও Share-Alike শর্ত:</strong> Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)। এই পাঠের যেকোনো অভিযোজন বা পুনঃবিতরণে মূল প্রকাশকের নামোল্লেখ এবং একই CC BY-SA 4.0 লাইসেন্স বজায় রাখা বাধ্যতামূলক।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-1.5">
            <div className="font-bold text-navy-950 dark:text-white">
              ২. ইংরেজি পাঠ, স্টাডি নোট ও এআই ব্যাখ্যার পৃথকীকরণ (Separation of Text &amp; Commentary)
            </div>
            <p>
              <strong>ইংরেজি তুলনামূলক পাঠ:</strong> King James Version (KJV, 1769 Oxford Edition) — Public Domain (পাবলিক ডোমেইন)।
            </p>
            <p>
              <strong>স্টাডি নোট, জ্ঞানভাণ্ডার ও এআই ব্যাখ্যা:</strong> বাংলা স্টাডি বাইবেলের ঐতিহাসিক প্রেক্ষাপট, স্টাডি নোট, পালকীয় উপকরণ এবং দীপ (Ask Bible) প্রদত্ত ৫-অংশের ব্যাখ্যা সম্পূর্ণরূপে <em>পাঠ-সহায়িকা ও ভাষ্য</em>; এগুলো কখনোই ক্যানোনিকাল বাইবেলের মূল পদের সমতুল্য বা বিকল্প নয় এবং মূল শাস্ত্রীয় পদ থেকে সর্বদা দৃশ্যমানভাবে পৃথক রাখা হয়।
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER ATTRIBUTION & REVEREND AYAN KUMAR GHOSH */}
      <footer
        role="contentinfo"
        className="text-center pt-4 pb-2 space-y-1.5 border-t border-slate-200 dark:border-navy-800 text-xs text-slate-500 dark:text-slate-400"
      >
        <p className="font-semibold text-navy-900 dark:text-gold-300">
          Windows • macOS • Android • iPhone/iPad • Browser
        </p>
        <p>
          “সবার জন্য সহজ বাংলা বাইবেল অধ্যয়ন” • “Accessible Bengali Bible study for everyone”
        </p>
        <p className="text-[11px] text-slate-400">
          প্রতিষ্ঠাতা, স্বত্বাধিকারী ও তত্ত্বাবধায়ক: <strong className="text-slate-600 dark:text-slate-300">রেভা. অয়ন কুমার ঘোষ</strong> (Rev. Ayan Kumar Ghosh) • ayanghosh75@gmail.com
        </p>
      </footer>
    </div>
  );
};
