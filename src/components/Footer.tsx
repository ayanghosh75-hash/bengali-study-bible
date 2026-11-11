import React from 'react';
import { ShieldCheck, BookOpen, FileText, AlertTriangle } from 'lucide-react';
import { NavTab } from './BottomNav';
import { FacebookPageLink } from './social/FacebookLogo';
import { LogoSymbol } from './brand/LogoSymbol';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800/80 pt-10 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-navy-800/60">
          {/* Brand & Ownership Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <LogoSymbol size={34} variant="default" />
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-wide block">
                  বাংলা স্টাডি বাইবেল
                </span>
                <span className="text-[10px] text-slate-400 font-sans tracking-widest uppercase block">
                  BENGALI STUDY BIBLE
                </span>
              </div>
            </div>
            <p className="text-gold-400 text-xs font-serif font-medium">
              পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              বাংলাভাষী পালক, ধর্মতাত্ত্বিক ছাত্র, বাইবেল শিক্ষক ও পাঠকদের জন্য গভীর ও বিশ্বস্ত শাস্ত্রীয় গবেষণা ও প্রচার প্রস্তুতির প্ল্যাটফর্ম।
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <span className="text-slate-500">প্রকল্প প্রতিষ্ঠাতা ও প্রস্তুতকারক: </span>
                <strong className="text-slate-200">রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)</strong>
              </div>
              <div>
                <span className="text-slate-500">অফিসিয়াল যোগাযোগ: </span>
                <a href="mailto:ayanghosh75@gmail.com" className="text-gold-400 hover:underline">
                  ayanghosh75@gmail.com
                </a>
              </div>

              <div className="pt-2">
                <FacebookPageLink
                  variant="badge"
                  labelBn="আমাদের ফেসবুক পেজে যুক্ত হন"
                />
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-serif font-bold text-white text-xs uppercase tracking-wider mb-3">
              প্রধান বিভাগসমূহ
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('daily-word')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-amber-300"
                >
                  🌿 দৈনিক বাক্য (Daily Word — দীপ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('knowledge-base')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-gold-300"
                >
                  🏛️ দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('bible')}
                  className="hover:text-gold-400 transition-colors"
                >
                  📖 পবিত্র বাইবেল (IRV বাংলা)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('study')}
                  className="hover:text-gold-400 transition-colors"
                >
                  🔎 স্টাডি ও গবেষণা ডায়াগ্রাম
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ask-bible')}
                  className="hover:text-gold-400 transition-colors"
                >
                  🤖 Ask Bible (গবেষণা সহকারী)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('sermon')}
                  className="hover:text-gold-400 transition-colors"
                >
                  ✍️ সার্মন বিল্ডার ও নোটস
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('maps')}
                  className="hover:text-gold-400 transition-colors"
                >
                  🗺️ বাইবেল ঐতিহাসিক মানচিত্র
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('academy')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-gold-300"
                >
                  🎓 কীভাবে ব্যবহার করবেন (একাডেমি)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('install')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-emerald-300"
                >
                  📱 ফোনে অ্যাপ ইনস্টল করুন (PWA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('partners')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-purple-300"
                >
                  🏛️ মণ্ডলী পার্টনার কিট (Partners)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('beta')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-gold-300"
                >
                  🚀 পাবলিক বিটা আমন্ত্রণ (Beta)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('share')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-sky-300"
                >
                  📢 প্রচার ও শেয়ার কেন্দ্র (Share)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('feedback')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-amber-300"
                >
                  💬 মতামত, সংশোধন ও সহায়তা
                </button>
              </li>
            </ul>
          </div>

          {/* Copyright & Legal Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-serif font-bold text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>আইনি স্বত্বাধিকার ও লাইসেন্স</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-amber-400" />
                  <span>আমাদের পরিচিতি (About Us)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('updates')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-gold-400" />
                  <span>রিলিজ নোটস ও আপডেট (v1.0 Beta)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('copyright')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-gold-400" />
                  <span>কপিরাইট ও স্বত্বাধিকার নীতি</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('licenses')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  <span>লাইসেন্স রেজিস্ট্রি ও অনুমতি</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('sources')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3 h-3 text-sky-400" />
                  <span>উৎস নির্দেশিকা ও সাইটেশন</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('privacy')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>গোপনীয়তা নীতি (Privacy Policy)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('terms')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-purple-400" />
                  <span>ব্যবহারের শর্তাবলী (Terms)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('feedback')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5 text-amber-300"
                >
                  <FileText className="w-3 h-3 text-amber-400" />
                  <span>যোগাযোগ ও সহায়তা (Contact & Support)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('copyright-concern')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5 text-rose-400/90 hover:text-rose-300"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>স্বত্বাধিকার সংক্রান্ত আপত্তি / নোটিশ</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Third-Party Disclaimer & Copyright Statement */}
        <div className="text-[11px] text-slate-400 space-y-2 leading-relaxed">
          <p className="p-3 rounded-2xl bg-navy-900/60 border border-navy-800/80">
            <strong>স্বত্বাধিকার বিজ্ঞপ্তি ও ঋণস্বীকার:</strong> © 2026 Rev. Ayan Kumar Ghosh. Bengali Study Bible. All rights reserved for original platform content except where otherwise indicated. এই প্ল্যাটফর্মের তৃতীয় পক্ষের বাইবেল অনুবাদ (IRV CC BY-SA 4.0, BSI O.V., কেরি ১৮০৯, WEB, ESV), ঐতিহাসিক কমেন্টারি, স্ট্রংস লেক্সিকন, এসআইএল ফন্ট এবং লুসিড আইকনসমূহ তাদের স্ব-স্ব আইনানুগ স্বত্বাধিকারী ও লাইসেন্সের অধীনস্থ।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-slate-500">
            <div>
              বাংলা স্টাডি বাইবেল • সত্যের বাক্যের বিশ্বস্ত প্রচার ও গভীর অধ্যয়নে নিবেদিত
            </div>
            <div className="flex items-center gap-2">
              <span>প্রস্তুতকারক: </span>
              <strong className="text-slate-300">রেভা. অয়ন কুমার ঘোষ</strong>
              <button
                onClick={() => onSelectTab('deep-control-centre')}
                className="text-amber-400 hover:text-amber-300 ml-2 text-xs flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
                title="দীপ মিনিস্ট্রি কন্ট্রোল সেন্টার (Admin Gate)"
              >
                🔒 অ্যাডমিন
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
