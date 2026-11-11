// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// UNIVERSAL SHARE CENTER & MINISTRY MEDIA HUB
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState } from 'react';
import {
  Share2,
  Copy,
  CheckCircle2,
  Download,
  MessageCircle,
  Smartphone,
  BookOpen,
  ArrowRight,
  QrCode,
  Sparkles,
  Monitor,
  CreditCard,
  Image as ImageIcon,
} from 'lucide-react';
import { BengaliStudyBibleLogo } from '../components/brand/BengaliStudyBibleLogo';
import { FacebookIcon } from '../components/social/FacebookLogo';
import { AnalyticsService } from '../services/analyticsService';

interface UniversalShareScreenProps {
  onNavigateToInstall: () => void;
  onNavigateToBible: () => void;
}

type MediaFormat = 'poster' | 'slide' | 'social' | 'card' | 'print_qr';

interface MediaOption {
  id: MediaFormat;
  labelBn: string;
  subBn: string;
  filePath: string;
  downloadName: string;
  dimensions: string;
  icon: React.ElementType;
}

export const UniversalShareScreen: React.FC<UniversalShareScreenProps> = ({
  onNavigateToInstall,
  onNavigateToBible,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<MediaFormat>('poster');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Dynamic authentic HTTPS URLs
  const currentOrigin =
    typeof window !== 'undefined' &&
    window.location.origin.startsWith('https://') &&
    !window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://bengalistudybible.com';

  const shareUrl = `${currentOrigin}/share`;
  const installUrl = `${currentOrigin}/install`;
  const permanentDomain = 'https://bengalistudybible.com';

  const shareMessage = `✝️ বাংলা স্টাডি বাইবেল (Bengali Study Bible)\n\nশান্তিপূর্ণ, বিশুদ্ধ ও সম্পূর্ণ বিনামূল্যে বাংলা খ্রীষ্টিয়ান বাইবেল স্টাডি প্ল্যাটফর্ম!\n\n✨ ৬৬টি ক্যানোনিকাল পুস্তক ও খাঁটি পাঠ্য\n✨ ১০-৬০ মিনিট প্রচারের রূপরেখা ও আধুনিক সার্মন বিল্ডার\n✨ ৪টি রঙে পদ হাইলাইট ও ব্যক্তিগত স্টাডি নোট\n✨ শক্তিশালী বিষয়ভিত্তিক অনুসন্ধান ও গ্রিক/হিব্রু বিশ্লেষণ\n✨ ১০০% বিজ্ঞাপনহীন ও অফলাইন সুবিধা (PWA)\n\n📱 আপনার ফোনে সরাসরি অ্যাপ ইনস্টল করুন:\n${installUrl}\n\nপড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন`;

  const mediaOptions: MediaOption[] = [
    {
      id: 'poster',
      labelBn: 'চার্চ ও WhatsApp পোস্টার',
      subBn: 'A3/A4 দেয়াল পোস্টার ও নোটিশ বোর্ড (JPG)',
      filePath: '/bengali-study-bible-ad.jpg',
      downloadName: 'bengali-study-bible-poster.jpg',
      dimensions: '১০৮০ × ১৩৫০ px (A4 অনুপাত)',
      icon: ImageIcon,
    },
    {
      id: 'slide',
      labelBn: 'সার্মন প্রজেক্টর স্লাইড',
      subBn: 'উপাসনা ও ঘোষণার 16:9 Full HD স্লাইড (PNG)',
      filePath: '/qr-codes/bengali-study-bible-sermon-slide-16x9.png',
      downloadName: 'bengali-study-bible-sermon-slide-16x9.png',
      dimensions: '১৯২০ × ১০৮০ px (16:9)',
      icon: Monitor,
    },
    {
      id: 'social',
      labelBn: 'সোশ্যাল মিডিয়া স্কয়ার',
      subBn: 'WhatsApp DP, Facebook ও ইনস্টাগ্রাম (PNG)',
      filePath: '/qr-codes/bengali-study-bible-social-square.png',
      downloadName: 'bengali-study-bible-social-square.png',
      dimensions: '১০৮০ × ১০৮০ px (1:1 Square)',
      icon: QrCode,
    },
    {
      id: 'card',
      labelBn: 'পকেট প্রচার কার্ড',
      subBn: '৩.৫" × ২" বিলি করার প্রচার কার্ড (PNG)',
      filePath: '/qr-codes/bengali-study-bible-visiting-card.png',
      downloadName: 'bengali-study-bible-visiting-card.png',
      dimensions: '১০৫০ × ৬০০ px (বিজনেস কার্ড)',
      icon: CreditCard,
    },
    {
      id: 'print_qr',
      labelBn: 'আল্ট্রা HD প্রেস QR কোড',
      subBn: '৩০০০px ৩০০ DPI প্রেস ও প্রকাশনা (PNG)',
      filePath: '/qr-codes/qr-bengalistudybible-3000px.png',
      downloadName: 'bengali-study-bible-qr-3000px.png',
      dimensions: '৩০০০ × ৩০০০ px (300 DPI)',
      icon: QrCode,
    },
  ];

  const currentMedia = mediaOptions.find((m) => m.id === selectedFormat) || mediaOptions[0];

  const handleCopyLink = () => {
    AnalyticsService.trackShareAction({
      channel: 'copy_link',
      contentType: 'entire_app',
      isCompleted: true,
    });
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    });
  };

  const handleCopyMessage = () => {
    AnalyticsService.trackShareAction({
      channel: 'copy_link',
      contentType: 'entire_app',
      isCompleted: true,
    });
    navigator.clipboard.writeText(shareMessage).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    });
  };

  const handleWhatsAppShare = () => {
    AnalyticsService.trackShareAction({
      channel: 'whatsapp',
      contentType: 'entire_app',
    });
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, '_blank');
  };

  const handleFacebookShare = () => {
    AnalyticsService.trackShareAction({
      channel: 'facebook',
      contentType: 'entire_app',
    });
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(installUrl)}`;
    window.open(fbUrl, '_blank');
  };

  const handleNativeShare = async () => {
    AnalyticsService.trackShareAction({
      channel: 'native',
      contentType: 'entire_app',
      isCompleted: true,
    });
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'বাংলা স্টাডি বাইবেল',
          text: shareMessage,
          url: installUrl,
        });
      } catch {
        // Dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-[85vh] py-8 px-4 max-w-5xl mx-auto space-y-8 animate-fadeIn text-slate-800 dark:text-slate-100">
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white p-8 sm:p-12 text-center border border-navy-800 shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>মণ্ডলী ও বিশ্বাসীদের জন্য ইউনিভার্সাল প্রচার ও শেয়ার কেন্দ্র</span>
          </div>

          <BengaliStudyBibleLogo
            variant="horizontal"
            theme="dark"
            size="lg"
            showTagline={true}
            showBadge={true}
            badgeText="শেয়ার কেন্দ্র"
          />

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            ঈশ্বরের বাক্য সবার কাছে পৌঁছে দিন। আপনার মণ্ডলী, বাইবেল স্টাডি গ্রুপ, যুব সমাজ ও পারিবারিক সদস্যদের সাথে এই সার্বজনীন লিংকটি শেয়ার করুন।
          </p>

          {/* Direct Action Hub */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3 w-full max-w-2xl">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp-এ পাঠান</span>
            </button>

            <button
              onClick={handleFacebookShare}
              className="flex items-center gap-2 py-3.5 px-6 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <FacebookIcon className="w-4 h-4 fill-white" />
              <span>Facebook-এ শেয়ার</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="flex items-center gap-2 py-3.5 px-6 rounded-2xl bg-navy-800 hover:bg-navy-700 text-slate-200 hover:text-white border border-navy-700 font-semibold text-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-gold-400" />
              <span>ডিভাইস শেয়ার</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 py-3.5 px-5 rounded-2xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-sm shadow-lg shadow-gold-500/20 transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>লিংক কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>ইনস্টল লিংক কপি</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. LIVE OPEN GRAPH & PREVIEW SECTION */}
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Left: Message Preview Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                💬 শেয়ার মেসেজ প্রিভিউ (WhatsApp / SMS)
              </span>
              <button
                onClick={handleCopyMessage}
                className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>মেসেজ কপি করুন</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line border border-slate-200/80 dark:border-navy-800">
              {shareMessage}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-navy-950 dark:text-gold-300">
                ক্লিন ও পার্মানেন্ট ইনস্টল লিংক:
              </p>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 break-all">
                {installUrl}
              </p>
              <p className="text-[10px] text-slate-400">
                স্থায়ী ডোমেইন: <span className="font-mono text-gold-600 dark:text-gold-400">{permanentDomain}</span> | শেয়ার লিংক: <span className="font-mono">{shareUrl}</span>
              </p>
            </div>
            <button
              onClick={handleCopyLink}
              className="shrink-0 p-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 cursor-pointer"
              title="কপি করুন"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Social Media Card Preview (Simulating WhatsApp / FB Card) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              🌐 সোশ্যাল মিডিয়া কার্ড প্রিভিউ (Open Graph)
            </span>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 shadow-sm">
              <img
                src="/brand/og-preview.png"
                alt="বাংলা স্টাডি বাইবেল প্রাকদর্শন"
                className="w-full h-44 sm:h-48 object-cover border-b border-slate-200 dark:border-navy-800"
              />
              <div className="p-4 space-y-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  bengalistudybible.com
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-navy-950 dark:text-white leading-snug">
                  বাংলা স্টাডি বাইবেল — সম্পূর্ণ ৬৬টি পুস্তক ও সার্মন প্ল্যাটফর্ম
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  বাংলায় বাইবেল পড়ুন, বুঝুন ও গভীরভাবে অধ্যয়ন করুন। সম্পূর্ণ বিনামূল্যে ও অফলাইন পিডব্লিউএ।
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-navy-800">
            <span>লিংক পাঠালে প্রিভিউ কার্ডটি স্বয়ংক্রিয়ভাবে দেখা যাবে</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ সক্রিয় OG মেটা</span>
          </div>
        </div>
      </div>

      {/* 3. MULTI-FORMAT MINISTRY MEDIA KIT (POSTERS & QR CODES) */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-navy-800 pb-5">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 dark:text-gold-300 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-gold-500" />
              <span>মণ্ডলী ও পরিচর্যার প্রচার সামগ্রী (Media Kit)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              উপাসনা প্রজেক্টর, চার্চ নোটিশ বোর্ড, প্রিন্ট ও সোশ্যাল মিডিয়ার জন্য তৈরি অফিসিয়াল ফাইল
            </p>
          </div>

          {/* Media Format Switcher */}
          <div className="flex flex-wrap bg-slate-100 dark:bg-navy-950 p-1 rounded-2xl border border-slate-200/80 dark:border-navy-800 gap-1">
            {mediaOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFormat(opt.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedFormat === opt.id
                      ? 'bg-white dark:bg-navy-800 text-gold-600 dark:text-gold-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.labelBn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Media Showcase */}
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Preview Image */}
          <div className="md:col-span-5 flex justify-center bg-slate-50 dark:bg-navy-950 p-4 rounded-2xl border border-slate-200/80 dark:border-navy-800">
            <img
              src={currentMedia.filePath}
              alt={currentMedia.labelBn}
              className="max-h-72 w-auto rounded-xl shadow-md object-contain border border-slate-200 dark:border-navy-700"
            />
          </div>

          {/* Details & Download Button */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 font-semibold text-xs mb-2">
                {currentMedia.dimensions}
              </span>
              <h3 className="font-serif text-xl font-bold text-navy-950 dark:text-white">
                {currentMedia.labelBn}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {currentMedia.subBn}
              </p>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              এই ফাইলটি সরাসরি ডাউনলোড করে আপনার চার্চের নোটিশ বোর্ড, সোশ্যাল মিডিয়া পেজ, কিংবা প্রজেক্টরে প্রদর্শন করতে পারেন। এতে অন্তর্ভুক্ত কিউআর কোড স্ক্যান করলে সরাসরি বাংলা স্টাডি বাইবেল অ্যাপটি ওপেন হবে।
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={currentMedia.filePath}
                download={currentMedia.downloadName}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>ফাইলটি ডাউনলোড করুন</span>
              </a>

              <button
                onClick={onNavigateToInstall}
                className="inline-flex items-center gap-2 py-3 px-5 rounded-2xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-navy-950 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-gold-500" />
                <span>ইনস্টলেশন পৃষ্ঠা দেখুন</span>
              </button>

              <button
                onClick={onNavigateToBible}
                className="inline-flex items-center gap-2 py-3 px-5 rounded-2xl bg-navy-900/60 hover:bg-navy-800 text-slate-200 hover:text-white border border-navy-700 font-semibold text-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-gold-400" />
                <span>সরাসরি পাঠ শুরু করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER ATTRIBUTION */}
      <div className="text-center pt-4 pb-2 space-y-1">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          প্রতিষ্ঠাতা, স্বত্বাধিকারী ও ডেভেলপার: <span className="font-semibold text-navy-900 dark:text-gold-300">রেভা. অয়ন কুমার ঘোষ</span> (Rev. Ayan Kumar Ghosh)
        </p>
        <p className="text-[11px] text-slate-400">
          অফিসিয়াল যোগাযোগ: ayanghosh75@gmail.com | কপিরাইট © ২০২৬ বাংলা স্টাডি বাইবেল
        </p>
      </div>
    </div>
  );
};
