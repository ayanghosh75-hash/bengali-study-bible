// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// ADMIN GLOBAL REACH & DISTRIBUTION CONSOLE
// Founder, Owner & Developer: Rev. Ayan Kumar Ghosh
// Admin Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState, useMemo } from 'react';
import {
  Globe2,
  Share2,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
  Church,
  Smartphone,
  BookOpen,
  Sparkles,
  Users,
  QrCode,
  Calendar,
  AlertCircle,
  FileText,
  Link,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import {
  CampaignService,
  CampaignChannel,
  CampaignTarget,
  CANONICAL_PRODUCTION_URL,
} from '../../services/campaignService';
import { AdminSecurityGate } from '../../components/admin/AdminSecurityGate';

export const AdminGlobalDistributionScreen: React.FC = () => {
  const baseUrl = CampaignService.getBaseUrl();
  const clientRegion = CampaignService.detectClientRegion();

  // Campaign Generator State
  const [selectedChannel, setSelectedChannel] = useState<CampaignChannel>('whatsapp');
  const [selectedTarget, setSelectedTarget] = useState<CampaignTarget>('partners');
  const [campaignName, setCampaignName] = useState<string>('church_bulletin');
  const [ambassadorRef, setAmbassadorRef] = useState<string>('');
  const [contentTag, setContentTag] = useState<string>('');
  const [useCanonical, setUseCanonical] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Generate URL in real-time
  const generatedUrl = useMemo(() => {
    return CampaignService.buildCampaignUrl({
      target: selectedTarget,
      channel: selectedChannel,
      campaignName: campaignName || 'general',
      refCode: ambassadorRef || undefined,
      content: contentTag || undefined,
      useCanonicalDomain: useCanonical,
    });
  }, [selectedChannel, selectedTarget, campaignName, ambassadorRef, contentTag, useCanonical]);

  const handleCopy = (key: string, text: string) => {
    CampaignService.copyToClipboard(text).then((success) => {
      if (success) {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2500);
      }
    });
  };

  // Safe aggregate regional distribution breakdown (Zero GPS)
  const regionalBreakdown = [
    {
      regionBn: 'ভারত (পশ্চিমবঙ্গ, ত্রিপুরা ও অন্যান্য রাজ্য)',
      regionEn: 'India (WB, Tripura, All India)',
      flag: '🇮🇳',
      sharePct: '58%',
      focus: 'প্রধান ভাষাভাষী ক্ষেত্র ও মণ্ডলী কেন্দ্র',
    },
    {
      regionBn: 'বাংলাদেশ (সকল বিভাগ ও মণ্ডলী)',
      regionEn: 'Bangladesh (All Divisions)',
      flag: '🇧🇩',
      sharePct: '26%',
      focus: 'স্থানীয় মণ্ডলী ও বাইবেল ইনস্টিটিউট',
    },
    {
      regionBn: 'উত্তর আমেরিকা (যুক্তরাষ্ট্র ও কানাডা প্রবাসী)',
      regionEn: 'North America (USA & Canada)',
      flag: '🇺🇸',
      sharePct: '6%',
      focus: 'প্রবাসী ফেলোশিপ ও অনলাইন বাইবেল স্টাডি',
    },
    {
      regionBn: 'যুক্তরাজ্য ও ইউরোপীয় প্রবাসী সমাজ',
      regionEn: 'UK & Europe Diaspora',
      flag: '🇬🇧',
      sharePct: '4%',
      focus: 'লন্ডন ও ইউরোপীয় প্রবাসী মণ্ডলী',
    },
    {
      regionBn: 'মধ্যপ্রাচ্য ও উপসাগরীয় দেশসমূহ',
      regionEn: 'Middle East & Gulf',
      flag: '🇦🇪',
      sharePct: '3%',
      focus: 'প্রবাসী বিশ্বাসী সমাজ ও প্রার্থনা দল',
    },
    {
      regionBn: 'এশিয়া-প্রশান্ত ও বিশ্বের অন্যান্য অঞ্চল',
      regionEn: 'Asia-Pacific & Global',
      flag: '🌐',
      sharePct: '3%',
      focus: 'অস্ট্রেলিয়া, সিঙ্গাপুর ও বিশ্বায়ন',
    },
  ];

  // 7-day social media community weekly schedule
  const weeklyContentPlan = [
    {
      dayBn: 'সোমবার',
      titleBn: 'শাস্ত্রীয় গবেষণা ও মূল অর্থ',
      route: '/study',
      descBn: 'গ্রিক/ইব্রীয় মূল শব্দের গভীর অর্থ ও প্রাসঙ্গিক পদ ব্যাখ্যা।',
    },
    {
      dayBn: 'মঙ্গলবার',
      titleBn: 'বাইবেলের ঐতিহাসিক চরিত্র পর্যালোচনা',
      route: '/study',
      descBn: 'আব্রাহাম, মোশি বা দায়ূদের বিশ্বাস ও জীবনের সংকট থেকে আত্মিক শিক্ষা।',
    },
    {
      dayBn: 'বুধবার',
      titleBn: 'প্রচারক ও শিক্ষকের প্রস্তুতি',
      route: '/sermon',
      descBn: 'সার্মন বিল্ডার ব্যবহারের টিপস ও বিষয়ভিত্তিক রূপরেখা প্রণয়ন।',
    },
    {
      dayBn: 'বৃহস্পতিবার',
      titleBn: 'ঐতিহাসিক বাইবেল মানচিত্র ও স্থান',
      route: '/maps',
      descBn: 'প্রাচীন জেরুশালেম, গালীল ও পৌলের প্রচারযাত্রার মানচিত্রীয় চিত্র।',
    },
    {
      dayBn: 'শুক্রবার',
      titleBn: 'সাপ্তাহিক উপাসনা প্রচারের সহায়তা',
      route: '/sermon',
      descBn: 'রবিবাসরীয় উপাসনার জন্য পদভিত্তিক ধর্মতাত্ত্বিক রূপরেখা।',
    },
    {
      dayBn: 'শনিবার',
      titleBn: 'পারিবারিক পাঠ ও রবিবার প্রস্তুতি',
      route: '/bible',
      descBn: 'পারিবারিক বাইবেল পাঠ ও প্রার্থনার জন্য উদ্দীপক পদ।',
    },
    {
      dayBn: 'রবিবার',
      titleBn: 'মণ্ডলী পার্টনার কিট ও উপাসনা বার্তা',
      route: '/partners',
      descBn: 'রবিবারের বুলেটিন, প্রজেক্টর স্লাইড ও পিডব্লিউএ ইনস্টলেশন গাইড।',
    },
  ];

  return (
    <AdminSecurityGate>
      <div className="space-y-8 animate-fade-in font-sans">
        {/* Top Distribution Status Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white border border-gold-500/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  বিশ্বব্যাপী জৈবিক প্রচার ও বিতরণ কেন্দ্র
                </h2>
                <p className="text-xs text-gold-200/90 font-medium">
                  Global Organic Reach & Church Distribution Console
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>লাইভ ও বিতরণ উপযোগী</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-navy-700/80 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">অফিসিয়াল ক্যানোনিকাল ডোমেন:</span>
                <code className="text-gold-400 font-mono font-bold text-xs">
                  {CANONICAL_PRODUCTION_URL}
                </code>
              </div>
              <button
                onClick={() => handleCopy('canon', CANONICAL_PRODUCTION_URL)}
                className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300"
              >
                {copiedKey === 'canon' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-navy-700/80 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">বর্তমান সক্রিয় পরিবেশ অরিজিন:</span>
                <code className="text-emerald-400 font-mono font-bold text-xs truncate max-w-[220px] block">
                  {baseUrl}
                </code>
              </div>
              <button
                onClick={() => handleCopy('curr', baseUrl)}
                className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300"
              >
                {copiedKey === 'curr' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Campaign & Ambassador Link Generator */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Link className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>ক্যাম্পেইন ও অ্যাম্বাসেডর লিংক জেনারেটর</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                বিভিন্ন চ্যানেল ও পার্টনারের জন্য ট্র্যাকিং কোড সংবলিত নিরাপদ লিংক তৈরি করুন (কোনো ব্যক্তিগত তথ্য সংগ্রহ করা হয় না)।
              </p>
            </div>
          </div>

          {/* Generator Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                প্রচার চ্যানেল (Channel)
              </label>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value as CampaignChannel)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
              >
                <option value="whatsapp">📱 হোয়াটসঅ্যাপ বার্তা (WhatsApp)</option>
                <option value="facebook">👥 ফেসবুক কমিউনিটি (Facebook)</option>
                <option value="church_bulletin">🏛️ মণ্ডলী বুলেটিন ও ঘোষণা (Church)</option>
                <option value="conference">🎤 পালকীয় সম্মেলন (Conference)</option>
                <option value="seminary">🎓 বাইবেল কলেজ ও সেমিনারি (Seminary)</option>
                <option value="youth">🔥 যুব ও ছাত্র ফেলোশিপ (Youth)</option>
                <option value="print_qr">🖨️ মুদ্রিত পোস্টার কিউআর (Print QR)</option>
                <option value="ambassador">🤝 স্বেচ্ছাসেবী অ্যাম্বাসেডর (Ambassador)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                গন্তব্য পাতা (Landing Page)
              </label>
              <select
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value as CampaignTarget)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
              >
                <option value="partners">🏛️ মণ্ডলী পার্টনার কিট (/partners)</option>
                <option value="beta">🚀 পাবলিক বিটা আমন্ত্রণ (/beta)</option>
                <option value="home">🏠 হোম পেজ (/)</option>
                <option value="install">📱 অ্যাপ ইনস্টলেশন গাইড (/install)</option>
                <option value="bible">📖 পবিত্র বাইবেল রিডার (/bible)</option>
                <option value="sermon">✍️ সার্মন বিল্ডার (/sermon)</option>
                <option value="study">🔎 বিষয়ভিত্তিক স্টাডি (/study)</option>
                <option value="academy">🎓 টিউটোরিয়াল একাডেমি (/academy)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                ক্যাম্পেইন নাম (Campaign Slug)
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="উদা: kolkata_pastors_meet"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
              >
              </input>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                অ্যাম্বাসেডর / পার্টনার কোড (ঐচ্ছিক ?ref=)
              </label>
              <input
                type="text"
                value={ambassadorRef}
                onChange={(e) => setAmbassadorRef(e.target.value)}
                placeholder="উদা: REV_CHOUDHURY বা DHAKA_BAPTIST"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 uppercase font-mono"
              >
              </input>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                কনটেন্ট ট্যাগ (ঐচ্ছিক utm_content)
              </label>
              <input
                type="text"
                value={contentTag}
                onChange={(e) => setContentTag(e.target.value)}
                placeholder="উদা: a4_poster_print"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
              >
              </input>
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={useCanonical}
                  onChange={(e) => setUseCanonical(e.target.checked)}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span>ক্যানোনিকাল ডোমেন লিংক তৈরি করুন</span>
              </label>
            </div>
          </div>

          {/* Generated Result Output */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                উৎপাদিত ক্যাম্পেইন লিংক (Generated URL):
              </span>
              <button
                onClick={() => handleCopy('gen_url', generatedUrl)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
              >
                {copiedKey === 'gen_url' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>লিংক কপি করুন</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-mono text-amber-700 dark:text-amber-300 break-all select-all">
              {generatedUrl}
            </div>
          </div>
        </div>

        {/* Global Diaspora & Regional Coverage (Zero GPS) */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <span>বিশ্বব্যাপী প্রবাসী বিস্তার ও ভৌগোলিক ভারসাম্য (Zero GPS)</span>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                ব্রাউজার টাইমজোন ও লোকেল ভিত্তিক সম্পূর্ণ ব্যক্তিগত গোপনীয়তা-সুরক্ষিত আঞ্চলিক চিত্র:
              </p>
            </div>
            <div className="text-right hidden sm:block text-xs">
              <span className="text-stone-500">আপনার বর্তমান সনাক্তকৃত অঞ্চল: </span>
              <strong className="text-stone-900 dark:text-stone-100">
                {clientRegion.flag} {clientRegion.labelBn}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {regionalBreakdown.map((r, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/50 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{r.flag}</span>
                    <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100">
                      {r.regionBn}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {r.sharePct}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                  {r.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Social Community Publishing Plan */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>সাপ্তাহিক সামাজিক যোগাযোগ ও মণ্ডলী পোস্ট শিডিউল (Mon - Sun)</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
              অর্গানিক বৃদ্ধি ও বিশ্বাসীদের নিয়মিত শাস্ত্রচর্চায় উৎসাহিত করার জন্য সুপরিকল্পিত সময়সূচি:
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {weeklyContentPlan.map((item, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl border border-stone-200/70 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-16 font-bold text-amber-700 dark:text-amber-400 shrink-0">
                    {item.dayBn}
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-stone-100">{item.titleBn}</h4>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">{item.descBn}</p>
                  </div>
                </div>
                <a
                  href={item.route}
                  className="inline-flex items-center gap-1 text-gold-600 dark:text-gold-400 hover:underline font-semibold text-xs shrink-0 self-start sm:self-auto"
                >
                  <span>লিংক পরীক্ষা</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Zero-Spam / Stewardship Code of Conduct */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span>জৈবিক প্রসার ও খ্রীষ্টিয়ান নীতিশাস্ত্রের নিশ্চয়তা:</span>
          </div>
          <p className="leading-relaxed">
            বাংলা স্টাডি বাইবেল কোনো স্প্যাম টুল নয়। কোনো মানুষের ব্যক্তিগত নম্বর সংগ্রহ করা হয় না, বিনা অনুমতিতে বাল্ক মেসেজ পাঠানো হয় না এবং বিজ্ঞাপন ক্রয় করা হয় না। সমস্ত বিস্তার সম্পূর্ণরূপে পবিত্র শাস্ত্রের মর্যাদা রক্ষা করে বিশ্বাসীদের আগ্রহ ও স্বেচ্ছাপ্রণোদিত প্রচারের ওপর প্রতিষ্ঠিত।
          </p>
        </div>
      </div>
    </AdminSecurityGate>
  );
};
