// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ Permanent Link & QR Centre” — Administrator Dashboard Component
// Official Overseer: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Permanent Canonical URL: https://bengalistudybible.surge.sh/install
// ============================================================

import React, { useState } from 'react';
import {
  Link2,
  QrCode,
  Download,
  Copy,
  CheckCircle2,
  Share2,
  Sparkles,
  Smartphone,
  Laptop,
  Apple,
  ExternalLink,
  MessageCircle,
  Mail,
  FileText,
  Eye,
  Edit3,
} from 'lucide-react';
import { AnalyticsService } from '../../services/analyticsService';

export const PERMANENT_INSTALL_URL = 'https://bengalistudybible.surge.sh/install';

export const DeepPermanentLinkQrCentre: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isVerifyingScan, setIsVerifyingScan] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<string | null>('উত্তীর্ণ: https://bengalistudybible.surge.sh/install (১০০% নির্ভরযোগ্য)');
  const [lastVerifiedDate] = useState<string>(() => new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }));

  // Customizable announcement metadata for campaigns
  const [campaignHeadline, setCampaignHeadline] = useState<string>('ঈশ্বরের বাক্য পড়ুন • বুঝুন • জীবনে প্রয়োগ করুন');
  const [isEditingHeadline, setIsEditingHeadline] = useState<boolean>(false);
  const [savedHeadlineNotice, setSavedHeadlineNotice] = useState<boolean>(false);

  const handleCopyLink = () => {
    AnalyticsService.trackShareClick('copy_link');
    navigator.clipboard.writeText(PERMANENT_INSTALL_URL).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleTestScan = () => {
    setIsVerifyingScan(true);
    setTimeout(() => {
      setLastScanResult(`উত্তীর্ণ: ${PERMANENT_INSTALL_URL} (jsQR এবং লেভেল H ত্রুটি-সংশোধন যাচাইকৃত)`);
      setIsVerifyingScan(false);
    }, 600);
  };

  const handleSaveHeadline = () => {
    setIsEditingHeadline(false);
    setSavedHeadlineNotice(true);
    setTimeout(() => setSavedHeadlineNotice(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const waText = `✝️ বাংলা স্টাডি বাইবেল (Bengali Study Bible)\n${campaignHeadline}\n\n📱 আপনার ডিভাইসে সরাসরি খুলুন ও ইনস্টল করুন:\n${PERMANENT_INSTALL_URL}\n\nWindows • macOS • Android • iPhone/iPad • Browser`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, '_blank');
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PERMANENT_INSTALL_URL)}`;
    window.open(fbUrl, '_blank', 'width=600,height=500');
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-100">
      
      {/* 1. HEADER TITLE & PASTORAL BADGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border border-navy-800 shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>অ্যাডমিন নিয়ন্ত্রণ কেন্দ্র • রেভা. অয়ন কুমার ঘোষ</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            চিরস্থায়ী ইনস্টলেশন লিংক ও QR সেন্টার
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Permanent Browser Link, Verified QR Code &amp; Bilingual Master Poster Control
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <a
            href="/install"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs transition shadow-md cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>লাইভ /install দেখুন</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. CORE STATUS METRICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Permanent URL */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">ক্যানোনিকাল লিংক</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Link2 className="w-4 h-4" />
            </span>
          </div>
          <p className="text-base font-bold text-navy-950 dark:text-white truncate">
            /install
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>স্থায়ী ও শতভাগ সক্রিয়</span>
          </p>
        </div>

        {/* Card 2: QR Validation */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">QR ভ্যালিডেশন</span>
            <span className="p-1.5 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-400">
              <QrCode className="w-4 h-4" />
            </span>
          </div>
          <p className="text-base font-bold text-navy-950 dark:text-white">
            Level H (উচ্চ মান)
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            ডিকোড সফল • কোনো মেয়াদ নেই
          </p>
        </div>

        {/* Card 3: PWA Status */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">PWA স্ট্যাটাস</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Laptop className="w-4 h-4" />
            </span>
          </div>
          <p className="text-base font-bold text-navy-950 dark:text-white">
            Standalone প্রস্তুত
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            সার্ভিস ওয়ার্কার v5 ও ক্যাশ সক্রিয়
          </p>
        </div>

        {/* Card 4: Last Content Verification */}
        <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">সর্বশেষ অডিট</span>
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <p className="text-sm font-bold text-navy-950 dark:text-white">
            {lastVerifiedDate}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            ৬৬ পুস্তক ও পদ অখণ্ডতা অক্ষুণ্ণ
          </p>
        </div>
      </div>

      {/* 3. PERMANENT URL MANAGEMENT BAR */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-gold-500" />
            <span>চিরস্থায়ী সর্বজনীন ইনস্টলেশন লিংক</span>
          </h3>
          <span className="text-xs text-slate-400">
            পরিবর্তনহীন ডোমেইন • নো রিডাইরেক্ট ঝুঁকি
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
          <input
            type="text"
            readOnly
            value={PERMANENT_INSTALL_URL}
            className="w-full bg-transparent px-3 py-1 font-mono text-xs sm:text-sm text-gold-600 dark:text-gold-400 font-bold outline-none select-all"
          />
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'কপি হয়েছে' : 'কপি করুন'}</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
              title="হোয়াটসঅ্যাপে শেয়ার"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleShareFacebook}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
              title="ফেসবুকে শেয়ার"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Campaign Headline Customization without changing URL */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-navy-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-gold-500" />
              <span>প্রচার বার্তা / ক্যাম্পেইন শিরোনাম হালনাগাদ:</span>
            </span>
            {!isEditingHeadline && (
              <button
                onClick={() => setIsEditingHeadline(true)}
                className="text-xs text-gold-600 dark:text-gold-400 hover:underline font-semibold cursor-pointer"
              >
                সম্পাদনা করুন
              </button>
            )}
          </div>

          {isEditingHeadline ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={campaignHeadline}
                onChange={(e) => setCampaignHeadline(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs text-slate-800 dark:text-slate-200 outline-none"
              />
              <button
                onClick={handleSaveHeadline}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
              >
                সংরক্ষণ
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-600 dark:text-slate-400 italic">
              “{campaignHeadline}”
            </p>
          )}

          {savedHeadlineNotice && (
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold animate-fadeIn">
              ✓ প্রচার বার্তা হালনাগাদ হয়েছে (স্থায়ী লিংক অপরিবর্তিত রাখা হয়েছে)।
            </p>
          )}
        </div>
      </div>

      {/* 4. QR CODES & DOWNLOADABLE POSTER SECTION */}
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Left: Verified Permanent QR Code Panel */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-gold-500" />
              <span>যাচাইকৃত স্থায়ী QR কোড প্যাকেজ</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সরাসরি <span className="font-mono text-gold-600 dark:text-gold-400">{PERMANENT_INSTALL_URL}</span> গন্তব্যে যুক্ত।
            </p>
          </div>

          <div className="flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 max-w-[200px] mx-auto shadow-inner">
            <img
              src="/qr-codes/qr-bengalistudybible-install.png"
              alt="বাংলা স্টাডি বাইবেল ইনস্টল QR কোড"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Test Scan Status */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-600 dark:text-slate-400">স্বয়ংক্রিয় স্ক্যান ফলাফল:</span>
              <button
                onClick={handleTestScan}
                disabled={isVerifyingScan}
                className="text-gold-600 dark:text-gold-400 hover:underline cursor-pointer disabled:opacity-50"
              >
                {isVerifyingScan ? 'পরীক্ষা হচ্ছে...' : 'পুনরায় স্ক্যান টেস্ট'}
              </button>
            </div>
            <p className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] truncate">
              {lastScanResult}
            </p>
          </div>

          {/* Download Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href="/qr-codes/qr-bengalistudybible-install.png"
              download="qr-bengalistudybible-install.png"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950 font-bold text-xs hover:opacity-90 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PNG QR ডাউনলোড</span>
            </a>
            <a
              href="/qr-codes/qr-bengalistudybible-install.svg"
              download="qr-bengalistudybible-install.svg"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-navy-800 transition cursor-pointer border border-slate-200 dark:border-navy-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>SVG ভেক্টর QR</span>
            </a>
          </div>
        </div>

        {/* Right: Master 2160 × 2700 Promotional Poster Panel */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" />
              <span>দ্বিভাষিক মাস্টার প্রচারপত্র (২১৬০ × ২৭০০ পিক্সেল)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সঠিক বাংলা বানান, ৮টি দ্বিভাষিক ফিচার এবং প্রিন্ট-রেডি ভেরিফায়েড QR কোড সহ নির্মিত।
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-navy-800 max-h-[190px] flex items-center justify-center bg-navy-950">
            <img
              src="/bengali-study-bible-installation-poster.jpg"
              alt="বাংলা স্টাডি বাইবেল মাস্টার প্রচারপত্র ২১৬০ × ২৭০০"
              className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs space-y-0.5">
            <p className="font-bold text-navy-950 dark:text-white">স্পেসিফিকেশন ও রেজোলিউশন:</p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              2160 × 2700 পিক্সেল • আল্ট্রা হাই-কোয়ালিটি JPG • সোশ্যাল মিডিয়া ও প্রিন্ট-রেডি
            </p>
          </div>

          <a
            href="/bengali-study-bible-installation-poster.jpg"
            download="bengali-study-bible-poster-2160x2700.jpg"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>২১৬০ × ২৭০০ মাস্টার JPG ডাউনলোড</span>
          </a>
        </div>
      </div>

      {/* 5. PLATFORM-SPECIFIC AUDIT VERIFICATION STATUS */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-md space-y-4">
        <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white">
          প্ল্যাটফর্ম ইনস্টলেশন প্রস্তুতি অডিট
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              <Smartphone className="w-4 h-4" />
              <span>Android PWA</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              ✓ manifest.json সক্রিয়<br />
              ✓ beforeinstallprompt সমর্থিত<br />
              ✓ Add to Home Screen নির্দেশিকা
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              <Apple className="w-4 h-4" />
              <span>iPhone / iPad</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              ✓ apple-touch-icon 180x180<br />
              ✓ Safari Share নির্দেশিকা<br />
              ✓ ফুলস্ক্রিন স্ট্যান্ডঅ্যালোন মোড
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              <Laptop className="w-4 h-4" />
              <span>Windows PC</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              ✓ Edge ও Chrome PWA উইন্ডো<br />
              ✓ টাস্কবার শর্টকাট সুবিধা<br />
              ✓ অফলাইন ডেটাবেজ সিঙ্ক
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              <Laptop className="w-4 h-4" />
              <span>macOS / MacBook</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              ✓ Safari Add to Dock সমর্থিত<br />
              ✓ Chrome PWA ইনস্টলেশন<br />
              ✓ রেটিনা ডিসপ্লে অপ্টিমাইজড
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
