// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// CHURCH & MINISTRY PARTNER KIT SCREEN (/partners)
// Founder, Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState } from 'react';
import {
  Church,
  Copy,
  Check,
  Download,
  Share2,
  BookOpen,
  Smartphone,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  FileText,
  Monitor,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import { CampaignService } from '../services/campaignService';
import { LogoSymbol } from '../components/brand/LogoSymbol';

interface PartnerKitScreenProps {
  onNavigateToBible: () => void;
  onNavigateToInstall: () => void;
  onNavigateToFeedback: () => void;
}

export const PartnerKitScreen: React.FC<PartnerKitScreenProps> = ({
  onNavigateToBible,
  onNavigateToInstall,
  onNavigateToFeedback,
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const baseUrl = CampaignService.getBaseUrl();

  const handleCopy = (id: string, text: string) => {
    CampaignService.copyToClipboard(text).then((success) => {
      if (success) {
        setCopiedItem(id);
        setTimeout(() => setCopiedItem(null), 2500);
      }
    });
  };

  const bulletinText = `বাংলা স্টাডি বাইবেল (BENGALI STUDY BIBLE):
বাংলাভাষী প্রতিটি খ্রীষ্টবিশ্বাসী, পালক ও শিক্ষকের জন্য তৈরি ১০০% বিনামূল্যের ও বিজ্ঞাপনহীন ডিজিটাল স্টাডি প্ল্যাটফর্ম। ৬৬ পুস্তকের বিশুদ্ধ শাস্ত্রাংশ, মূল শব্দের অর্থ, বিষয়ভিত্তিক গবেষণা ও সার্মন নোটস।
আপনার স্মার্টফোনে বা কম্পিউটারে ব্যবহার ও ইনস্টল করতে প্রবেশ করুন: ${baseUrl}`;

  const pulpitScript = `প্রিয় মণ্ডলী, জয়যীশু! 
আজ আপনাদের সাথে একটি মূল্যবান আত্মিক সংস্থান ভাগ করে নিতে চাই। বাংলা ভাষায় শাস্ত্রের গভীর বোঝাপড়া ও ব্যক্তিগত অধ্যয়নের জন্য প্রস্তুত করা হয়েছে "বাংলা স্টাডি বাইবেল" (Bengali Study Bible)।

এটি কোনো বাণিজ্যিক প্রকল্প নয়—সম্পূর্ণ বিনামূল্যে এবং কোনো বিজ্ঞাপন ছাড়া তৈরি করা হয়েছে। এতে রয়েছে সমগ্র বাইবেলের বিশুদ্ধ পাঠ, ঐতিহাসিক পটভূমি, এবং বিষয়ভিত্তিক স্টাডি সহায়িকা। আপনারা আপনাদের সাধারণ স্মার্টফোনের ব্রাউজার থেকে সরাসরি এটি একটি অ্যাপ হিসেবে ফোনে যুক্ত করে নিতে পারেন।

উপাসনা শেষে আপনারা গির্জার নোটিশ বোর্ডের কিউআর কোড স্ক্যান করতে পারেন অথবা ${baseUrl.replace(/^https?:\/\//, '')} ঠিকানায় প্রবেশ করে এটি এখনই ব্যবহার শুরু করতে পারেন। ঈশ্বর আপনাদের সহায় হোন। আমেন।`;

  const whatsappText = `🕊️ প্রিয় মণ্ডলীর ভাই ও বোনেরা, জয়যীশু!

বাংলা ভাষায় পবিত্র বাইবেলের গভীর পাঠ, পদভিত্তিক অর্থ ও ব্যক্তিগত আত্মিক বৃদ্ধির জন্য একটি চমৎকার উপহার: "বাংলা স্টাডি বাইবেল"।

✨ প্রধান সুবিধাসমূহ:
• ৬৬টি পুস্তকের বিশুদ্ধ ক্যানোনিকাল বাইবেল (IRV)
• গভীর বিষয়ভিত্তিক গবেষণা ও ঐতিহাসিক চরিত্র পাঠ
• পালক ও শিক্ষকের জন্য সার্মন ও প্রচার সহায়ক নোটস
• কোনো বিজ্ঞাপন নেই, সম্পূর্ণ বিনামূল্যে আজীবন ব্যবহারযোগ্য
• ফোনে অ্যাপ হিসেবে সরাসরি ইনস্টল সুবিধা (অফলাইনেও কার্যকর)

📲 এখনই আপনার ফোনে যুক্ত করে নিন:
${baseUrl}/install?utm_source=church_bulletin&utm_medium=ministry_outreach&utm_campaign=congregation_kit

প্রতিষ্ঠাতা ও প্রস্তুতকারক: রেভা. অয়ন কুমার ঘোষ
পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন`;

  const mediaAssets = [
    {
      id: 'poster',
      titleBn: 'এ৪ চার্চ নোটিশ বোর্ড পোস্টার (A4 Poster)',
      descBn: 'গির্জার নোটিশ বোর্ড, সেমিনার বা যুব সভায় টানানোর জন্য প্রিন্টযোগ্য হাই-রেজোলিউশন পোস্টার।',
      dimensions: 'A4 / Printable HD',
      path: '/qr-codes/bengali-study-bible-poster-official.png',
      icon: Printer,
      color: 'from-amber-600 to-amber-700',
    },
    {
      id: 'slide',
      titleBn: '১৬:৯ উপাসনা প্রজেক্টর স্লাইড (16:9 Slide)',
      descBn: 'রবিবাসরীয় উপাসনায় প্রজেক্টরে বা টিভি স্ক্রিনে ঘোষণার সময় প্রদর্শনের জন্য প্রস্তুত স্লাইড।',
      dimensions: '1920 × 1080 Full HD',
      path: '/qr-codes/bengali-study-bible-sermon-slide-16x9.png',
      icon: Monitor,
      color: 'from-sky-600 to-sky-700',
    },
    {
      id: 'social',
      titleBn: 'সোশ্যাল মিডিয়া স্কয়ার গ্রাফিক্স (Social Media)',
      descBn: 'ফেসবুক পেজ, ইনস্টাগ্রাম বা হোয়াটসঅ্যাপ স্ট্যাটাসে প্রকাশের উপযোগী বর্গাকার ইমেজ।',
      dimensions: '1080 × 1080 Square',
      path: '/qr-codes/bengali-study-bible-social-square.png',
      icon: Share2,
      color: 'from-emerald-600 to-emerald-700',
    },
    {
      id: 'card',
      titleBn: 'পকেট ভিজিটিং কার্ড ফরম্যাট (Visiting Card)',
      descBn: 'ব্যক্তিগতভাবে বিশ্বাসীদের হাতে তুলে দেওয়ার জন্য দ্বিপাক্ষিক ভিজিটিং কার্ড।',
      dimensions: '3.5 × 2.0 Inch Card',
      path: '/qr-codes/bengali-study-bible-visiting-card.png',
      icon: FileText,
      color: 'from-indigo-600 to-indigo-700',
    },
    {
      id: 'qr',
      titleBn: '৩০০০ পিক্সেল আল্ট্রা এইচডি কিউআর কোড (Ultra HD QR)',
      descBn: 'যেকোনো প্রকাশনা বা নিজস্ব মণ্ডলী লিফলেটে মুদ্রণের উপযোগী ক্রিস্টাল ক্লিয়ার কিউআর কোড।',
      dimensions: '3000 × 3000 Px Vector/PNG',
      path: '/qr-codes/qr-bengalistudybible-3000px.png',
      icon: Download,
      color: 'from-purple-600 to-purple-700',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32 space-y-10 animate-fade-in font-sans">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-10 border border-gold-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-semibold">
            <Church className="w-4 h-4 text-gold-400" />
            <span>মণ্ডলী ও খ্রীষ্টিয়ান মিনিস্ট্রি রিসোর্স কিট</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-2xl bg-navy-900/90 border border-gold-500/30 shadow-lg shadow-gold-500/10 shrink-0">
              <LogoSymbol size={48} variant="default" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                “বাক্যের আলো ভাগ করুন” — স্বেচ্ছাসেবী অ্যাম্বাসেডর ও মিনিস্ট্রি পার্টনার কিট
              </h1>
              <p className="text-xs sm:text-sm text-gold-200/90 mt-1 font-medium">
                বাংলা স্টাডি বাইবেল • সম্পূর্ণ বিনামূল্যে • গোপনীয়তা সুরক্ষিত • শূন্য বাণিজ্যিক স্বার্থ
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl pt-2">
            শ্রদ্ধেয় পালক, শিক্ষক, সুসমাচার প্রচারক ও মণ্ডলী নেতৃত্ববৃন্দের প্রতি আন্তরিক আহ্বান। আপনার স্থানীয় মণ্ডলী, বাইবেল ক্লাস, যুব ফেলোশিপ বা প্রবাসী বিশ্বাসী সমাজে মাতৃভাষায় শাস্ত্র চর্চাকে সমৃদ্ধ করতে এই কিটটি নির্দ্বিধায় ব্যবহার করুন।
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            <button
              onClick={onNavigateToBible}
              className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold flex items-center gap-2 shadow-md transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 বাইবেল অধ্যয়ন করুন</span>
            </button>
            <button
              onClick={onNavigateToInstall}
              className="px-4 py-2.5 rounded-xl bg-navy-800/90 hover:bg-navy-700 text-white font-semibold border border-navy-700 flex items-center gap-2 transition-colors"
            >
              <Smartphone className="w-4 h-4 text-gold-400" />
              <span>📱 সরাসরি অ্যাপ ইনস্টল</span>
            </button>
            <button
              onClick={onNavigateToFeedback}
              className="px-4 py-2.5 rounded-xl bg-navy-800/90 hover:bg-navy-700 text-slate-300 hover:text-white font-medium border border-navy-700 flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-sky-400" />
              <span>💬 পালকীয় মতামত জানান</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ministry Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
            ১০০% বিনামূল্যে ও বিজ্ঞাপনহীন
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            কোনো ধরনের সাবস্ক্রিপশন ফি নেই এবং কোনো বাণিজ্যিক বিজ্ঞাপন বা ট্র্যাকিং নেই। সম্পূর্ণ ঈশ্বরের বাক্যের মহিমায় উৎসর্গীকৃত।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
            বিশুদ্ধ ৬৬-পুস্তক ক্যানন
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            প্রোটেস্ট্যান্ট ঐতিহ্য ও ঐতিহাসিক সত্যতা অনুসারে ৩৯ পুরাতন ও ২৭ নূতন নিয়মের বিশুদ্ধ পাঠ সংবলিত।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-1">
            বিশ্বব্যাপী প্রবাসী উপযোগিতা
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            ভারত, বাংলাদেশ ও সারা বিশ্বের বাংলাভাষী খ্রীষ্টভক্তদের জন্য মোবাইল ও কম্পিউটার ফ্রেন্ডলি পিডব্লিউএ (PWA) আর্কিটেকচার।
          </p>
        </div>
      </div>

      {/* Ready-to-use Scripts & Bulletins */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>মণ্ডলী ঘোষণা ও বুলেটিন টেমপ্লেটসমূহ</span>
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            ১-ক্লিকে কপি করে আপনার মণ্ডলীর নোটিশ বোর্ড, প্রিন্টেড বুলেটিন বা হোয়াটসঅ্যাপ গ্রুপে যুক্ত করুন:
          </p>
        </div>

        {/* 1. Sunday Pulpit Announcement Script */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                উপাসনা ঘোষণা স্ক্রিপ্ট (১ মিনিট)
              </span>
              <span className="text-xs text-stone-500 hidden sm:inline">পালক ও প্রচারকদের জন্য</span>
            </div>
            <button
              onClick={() => handleCopy('pulpit', pulpitScript)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 transition-colors"
            >
              {copiedItem === 'pulpit' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>স্ক্রিপ্ট কপি করুন</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-stone-50 dark:bg-stone-950/60 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans whitespace-pre-line">
            {pulpitScript}
          </div>
        </div>

        {/* 2. Church Bulletin 1-Paragraph Text */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                মুদ্রিত বুলেটিন নোটিশ (সংক্ষিপ্ত)
              </span>
              <span className="text-xs text-stone-500 hidden sm:inline">সাপ্তাহিক চার্চ পেপারে প্রকাশের জন্য</span>
            </div>
            <button
              onClick={() => handleCopy('bulletin', bulletinText)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 transition-colors"
            >
              {copiedItem === 'bulletin' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>টেক্সট কপি করুন</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-stone-50 dark:bg-stone-950/60 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans whitespace-pre-line">
            {bulletinText}
          </div>
        </div>

        {/* 3. WhatsApp Announcement Template */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                হোয়াটসঅ্যাপ সম্প্রচার বার্তা
              </span>
              <span className="text-xs text-stone-500 hidden sm:inline">মণ্ডলী গ্রুপে ফরোয়ার্ডের জন্য</span>
            </div>
            <button
              onClick={() => handleCopy('whatsapp', whatsappText)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              {copiedItem === 'whatsapp' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>হোয়াটসঅ্যাপ মেসেজ কপি</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-stone-50 dark:bg-stone-950/60 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans whitespace-pre-line">
            {whatsappText}
          </div>
        </div>
      </div>

      {/* Media Kit & Official Downloads */}
      <div className="space-y-4">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Download className="w-5 h-5 text-gold-500" />
            <span>অফিসিয়াল মিডিয়া কিট ও ডাউনলোড প্যাকেজ</span>
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            মুদ্রণ এবং ডিজিটাল স্ক্রিন ব্যবহারের জন্য প্রস্তুত উচ্চমানের গ্রাফিক্স ও কিউআর সম্পদ:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mediaAssets.map((asset) => {
            const Icon = asset.icon;
            return (
              <div
                key={asset.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-gold-500/40 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      <Icon className="w-5 h-5 text-gold-500" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                      {asset.dimensions}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      {asset.titleBn}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      {asset.descBn}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                  <a
                    href={asset.path}
                    download
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ডাউনলোড করুন</span>
                  </a>
                  <a
                    href={asset.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    title="প্রিভিউ দেখুন"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step-by-step Installation for Congregations */}
      <div className="bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-950 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>মণ্ডলীর সদস্যদের ফোনে অ্যাপ ইনস্টল করানোর ৩টি সহজ ধাপ:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-950 font-bold text-xs flex items-center justify-center">
              ১
            </span>
            <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">ওয়েবসাইটে প্রবেশ</h4>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">
              ফোনের ক্রোম (Chrome) বা সাফারি (Safari) ব্রাউজারে গিয়ে <code className="text-gold-600 dark:text-gold-400">{baseUrl}</code> লিখুন অথবা কিউআর কোড স্ক্যান করুন।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-950 font-bold text-xs flex items-center justify-center">
              ২
            </span>
            <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">ইনস্টল বাটনে চাপ</h4>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">
              পর্দার নিচের "ফোনে ইনস্টল করুন" বাটনে ট্যাপ করুন অথবা ব্রাউজার মেনুর "Add to Home screen" চাপুন।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-950 font-bold text-xs flex items-center justify-center">
              ৩
            </span>
            <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">অফলাইনে ব্যবহার</h4>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">
              ফোনের হোমস্ক্রিনে বাংলা স্টাডি বাইবেলের গোল্ডেন আইকন তৈরি হবে। ইন্টারনেট ছাড়াই পাঠ ও গবেষণা চালানো যাবে।
            </p>
          </div>
        </div>
      </div>

      {/* Founder & Stewardship Notice */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-2">
        <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-bold">
          <Sparkles className="w-4 h-4 text-gold-500" />
          <span>প্রকল্পের আত্মিক দায়বদ্ধতা ও যোগাযোগ:</span>
        </div>
        <p>
          "বাংলা স্টাডি বাইবেল" কোনো ব্যবসা নয়, বরং বিশ্বব্যাপী বাংলাভাষী মণ্ডলীদের আত্মিক বৃদ্ধি ও শাস্ত্রীয় ভিত্তিকে শক্তিশালী করার এক অকৃত্রিম সেবা প্রয়াস। কোনো ব্যক্তি বা সংস্থা এই অ্যাপ বিক্রি বা বাণিজ্যিক উদ্দেশ্যে বিতরণ করতে পারবে না।
        </p>
        <p className="pt-1">
          <strong>প্রতিষ্ঠাতা, স্বত্বাধিকারী ও প্রস্তুতকারক:</strong> রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh) • অফিসিয়াল ইমেইল:{' '}
          <a href="mailto:ayanghosh75@gmail.com" className="text-gold-600 dark:text-gold-400 hover:underline">
            ayanghosh75@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};
