import React from 'react';
import { ShieldCheck, Mail, AlertTriangle, ArrowRight } from 'lucide-react';
import { RightsBadge } from '../components/rights/RightsBadge';

interface CopyrightScreenProps {
  onNavigateToLicenses?: () => void;
  onNavigateToSources?: () => void;
  onNavigateToConcern?: () => void;
}

export const CopyrightScreen: React.FC<CopyrightScreenProps> = ({
  onNavigateToLicenses,
  onNavigateToSources,
  onNavigateToConcern,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 text-white shadow-xl mb-8 border border-navy-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold mb-4 border border-gold-400/30">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>আইনি স্বত্বাধিকার ও উৎস সততা সনদ (Official Rights & Provenance)</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
          বাংলা স্টাডি বাইবেল — কপিরাইট ও লাইসেন্সিং নীতি
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl font-sans">
          পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন — সম্পূর্ণ বৌদ্ধিক সততা, আইনানুগ স্বত্বাধিকার ও তৃতীয় পক্ষের পূর্ণ মর্যাদাসহকারে।
        </p>

        <div className="mt-6 pt-4 border-t border-navy-800 flex flex-wrap gap-4 text-xs text-slate-300">
          <div>
            <span className="text-slate-400 block">প্ল্যাটফর্ম প্রতিষ্ঠাতা ও প্রস্তুতকারক:</span>
            <strong className="text-gold-400">রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)</strong>
          </div>
          <div>
            <span className="text-slate-400 block">অফিসিয়াল যোগাযোগ:</span>
            <a href="mailto:ayanghosh75@gmail.com" className="text-sky-400 hover:underline">
              ayanghosh75@gmail.com
            </a>
          </div>
          <div>
            <span className="text-slate-400 block">কার্যকরী সংস্করণ:</span>
            <span className="text-slate-200">২০২৬ প্রাতিষ্ঠানিক সংস্করণ ১.০</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button
          onClick={onNavigateToLicenses}
          className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500 shadow-sm text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300">লাইসেন্স তালিকা</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500 transition-colors" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            CC BY-SA 4.0, পাবলিক ডোমেইন, এসআইএল ও আইএসসি লাইসেন্স ম্যাট্রিক্স।
          </p>
        </button>

        <button
          onClick={onNavigateToSources}
          className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500 shadow-sm text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300">উৎস নির্দেশিকা</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500 transition-colors" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            বাইবেল অনুবাদ, কমেন্টারি, লেক্সিকন ও মানচিত্রের বিস্তারিত সাইটেশন।
          </p>
        </button>

        <button
          onClick={onNavigateToConcern}
          className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500 shadow-sm text-left transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300">স্বত্বাধিকার আপত্তি</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-500 transition-colors" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            কপিরাইট লঙ্ঘন বিজ্ঞপ্তি বা অপসারণের আনুষ্ঠানিক আবেদন ফর্ম।
          </p>
        </button>
      </div>

      {/* 16 Detailed Sections */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">১</span>
            প্রকল্প প্রতিষ্ঠা, উদ্দেশ্য ও প্রস্তুতি
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-2">
            <strong>বাংলা স্টাডি বাইবেল (Bengali Study Bible)</strong> বাংলাভাষী মণ্ডলীর পালক, ধর্মতাত্ত্বিক শিক্ষার্থী, বাইবেল শিক্ষক এবং সাধারণ পাঠকদের গভীর ও প্রাতিষ্ঠানিক শাস্ত্র অধ্যয়নে সহায়তা করার উদ্দেশ্যে নির্মিত একটি প্রামাণ্য ডিজিটাল প্ল্যাটফর্ম।
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            এই প্ল্যাটফর্মের প্রতিষ্ঠাতা, সফটওয়্যার আর্কিটেক্ট ও প্রস্তুতকারক হলেন <strong>রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)</strong>।
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">২</span>
            মূল প্ল্যাটফর্ম সামগ্রীর স্বত্বাধিকার বিজ্ঞপ্তি
          </h2>
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 font-mono text-xs mb-3">
            © 2026 Rev. Ayan Kumar Ghosh. Bengali Study Bible. All rights reserved for original platform content except where otherwise indicated.
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            বাংলা স্টাডি বাইবেলের সফটওয়্যার আর্কিটেকচার, ইউজার ইন্টারফেস ডিজাইন, মৌলিক গবেষণা ড্যাশবোর্ড, সার্মন প্রিপারেশন ওয়ার্কফ্লো, বাংলা ধর্মতাত্ত্বিক বিষয়ভিত্তিক শ্রেণীবিভাগ এবং মৌলিক সম্পাদকীয় টীকা রেভা. অয়ন কুমার ঘোষের বৌদ্ধিক সম্পত্তি এবং কপিরাইট আইন দ্বারা সংরক্ষিত।
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">৩</span>
            তৃতীয় পক্ষের স্বত্বাধিকারের প্রতি স্পষ্ট ও দ্ব্যর্থহীন ঘোষণা
          </h2>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <p className="font-semibold text-rose-600 dark:text-rose-400">
              ⚠️ সতর্কবার্তা ও স্পষ্টীকরণ:
            </p>
            <p>
              রেভা. অয়ন কুমার ঘোষ বা বাংলা স্টাডি বাইবেল কোনো অবস্থাতেই তৃতীয় পক্ষের কোনো অনুবাদ বা বৌদ্ধিক সম্পদের মালিকানা দাবি করে না।
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>বাইবেল অনুবাদসমূহ (IRV, BSI, Carey, WEB, ESV) মূল অনুবাদক বা প্রকাশনা সংস্থার স্বত্ব।</li>
              <li>ঐতিহাসিক কমেন্টারি ও লেক্সিকনসমূহ (ম্যাথু হেনরি, স্ট্রংস) সর্বজনীন ঐতিহাসিক ঐতিহ্য (Public Domain)।</li>
              <li>টাইপফেস ও ফন্ট (Noto Sans Bengali) এসআইএল ওপেন ফন্ট লাইসেন্সের অধীনস্থ।</li>
              <li>সফটওয়্যার লাইব্রেরিসমূহ (React, Vite, Lucide) যথাক্রমে MIT ও ISC লাইসেন্সভুক্ত।</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">৪</span>
            বাইবেল অনুবাদসমূহের আইনি স্থিতি ও ব্যবহারের পরিধি
          </h2>
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/50 dark:border-teal-800/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-teal-950 dark:text-teal-200">ভারতীয় সংশোধিত সংস্করণ (IRV বাংলা)</span>
                <RightsBadge status="OPEN_LICENSE" size="sm" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                স্বত্বাধিকারী: ব্রিজ কানেক্টিভিটি সলিউশনস প্রা. লি. (Bridge Connectivity Solutions Pvt. Ltd.)। লাইসেন্স: Creative Commons CC BY-SA 4.0। এটি বাংলা স্টাডি বাইবেলের প্রাথমিক ডিফল্ট অনুবাদ এবং সম্পূর্ণ ৬৬ পুস্তকের পূর্ণ পাঠ আইনত লভ্য।
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-950 dark:text-amber-200">বাংলা পবিত্র বাইবেল (বিএসআই ও.ভি.)</span>
                <RightsBadge status="COPYRIGHTED" size="sm" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                স্বত্বাধিকারী: দ্য বাইবেল সোসাইটি অফ ইন্ডিয়া (BSI)। সর্বস্বত্ব সংরক্ষিত। অনুমতি ব্যতিরেকে ডিজিটাল সফটওয়্যারে পূর্ণ টেক্সট পুনঃবিতরণ নীতিবিরুদ্ধ হওয়ায় অ্যাপে বিএসআই পূর্ণ টেক্সট আমদানি স্থগিত রাখা হয়েছে।
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-blue-950 dark:text-blue-200">উইলিয়াম কেরি ঐতিহাসিক সংস্করণ (১৮০৯/১৮৩২) ও WEB</span>
                <RightsBadge status="PUBLIC_DOMAIN" size="sm" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                উইলিয়াম কেরি ১৮০৯ শ্রীরামপুর প্রেস সংস্করণ এবং ওয়ার্ল্ড ইংলিশ বাইবেল (WEB) ১০০% সর্বজনীন পাবলিক ডোমেইনে মুক্ত।
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">৫</span>
            বাংলা টাইপোগ্রাফি ও ফন্ট লাইসেন্স
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs">
            এই অ্যাপ্লিকেশনে ব্যবহৃত বাংলা ফন্ট <strong>Noto Sans Bengali</strong> গুগল ও এসআইএল ইন্টারন্যাশনাল কর্তৃক <strong>SIL Open Font License 1.1</strong> এর অধীনে প্রকাশিত। এটি উন্মুক্ত ব্যবহারের জন্য স্বীকৃত।
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">৬</span>
            ঐতিহাসিক কমেন্টারি ও ধর্মতাত্ত্বিক ব্যাখ্যা
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs">
            ম্যাথু হেনরি (Matthew Henry, 1706) এবং ক্লাসিক সংস্কারবাদী পণ্ডিতগণের ঐতিহাসিক কমেন্টারি সম্পূর্ণ পাবলিক ডোমেইন। তাদের সার্বজনীন ব্যাখ্যা ও ধর্মতাত্ত্বিক সম্পদ শিক্ষা ও প্রচার প্রস্তুতিতে কোনো প্রকার আইনি বাধা ছাড়াই ব্যবহৃত হচ্ছে।
          </p>
        </section>

        {/* Section 7 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">৭</span>
            ঐতিহাসিক মানচিত্র ও ভৌগোলিক তথ্য
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs">
            বাইবেলের প্রাচীন ভৌগোলিক অবস্থান, পথরেখা এবং ঐতিহাসিক মানচিত্রের ভিত্তি পাবলিক ডোমেইন ওপেন ডাটা থেকে সংগৃহীত। মানচিত্রের ওপর অঙ্কিত বাংলা স্থান-নাম এবং ভিজ্যুয়াল ইন্টারঅ্যাক্টিভ লেয়ার রেভা. অয়ন কুমার ঘোষ কর্তৃক প্রস্তুতকৃত।
          </p>
        </section>

        {/* Section 8 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">৮</span>
            হিব্রু ও গ্রিক শব্দার্থ এবং লেক্সিকন
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs">
            ড. জেমস স্ট্রং (James Strong, 1890) কর্তৃক সংকলিত স্ট্রংস হিব্রু ও গ্রিক লেক্সিকন আন্তর্জাতিকভাবে পাবলিক ডোমেইনে অন্তর্ভুক্ত। এর ওপর ভিত্তি করে প্রস্তুতকৃত বাংলা শব্দার্থ ও ব্যাকরণিক সহায়িকা গবেষণার উদ্দেশ্যে প্রদর্শিত।
          </p>
        </section>

        {/* Section 9 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">৯</span>
            ওপেন সোর্স সফটওয়্যার লাইব্রেরি ও ফ্রেমওয়ার্ক
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs">
            প্ল্যাটফর্মটি React (MIT License), Tailwind CSS (MIT License), Lucide Icons (ISC License), এবং Vite এর ওপর প্রতিষ্ঠিত। এই ওপেন সোর্স লাইব্রেরিগুলোর প্রস্তুতকারকদের প্রতি আমরা কৃতজ্ঞ।
          </p>
        </section>

        {/* Section 10 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">১০</span>
            অনুমোদিত ব্যবহার ও সীমাবদ্ধতা
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">✅ যা করার অনুমতি রয়েছে:</span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                <li>ব্যক্তিগত ও মণ্ডলীতে শাস্ত্র পাঠ ও ধ্যান।</li>
                <li>প্রচার প্রস্তুতি ও সার্মন পাণ্ডুলিপি রচনা ও প্রিন্ট।</li>
                <li>ধর্মতাত্ত্বিক ক্লাসরুমে শিক্ষা প্রদান ও উদ্ধৃতি।</li>
                <li>উন্মুক্ত আইআরভি বাইবেল অফলাইনে পাঠ।</li>
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30">
              <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">❌ যা কঠোরভাবে নিষিদ্ধ:</span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                <li>অনুমতি ব্যতিরেকে বাণিজ্যিক উদ্দেশ্যে ডাটাবেজ বিক্রি।</li>
                <li>বিএসআই কপিরাইটযুক্ত টেক্সট অবৈধ স্ক্র্যাপ বা বিতরণ।</li>
                <li>অ্যাট্রিবিউশন মুছে ফেলে অন্য প্ল্যাটফর্মে দাবি করা।</li>
                <li>কপিরাইটযুক্ত সামগ্রী এআই মডেলের ট্রেনিংয়ে প্রদান।</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 11 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">১১</span>
            ধর্মতাত্ত্বিক শিক্ষায় ফেয়ার ইউজ (Fair Dealing) নীতি
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs">
            ভারতীয় কপিরাইট আইন ১৯৫৭ (ধারা ৫২) এবং আন্তর্জাতিক ফেয়ার ইউজ নীতিমালা অনুসারে, শিক্ষামূলক আলোচনা, পর্যালোচনা এবং সমালোচনামূলক তুলনার উদ্দেশ্যে সীমিত শাস্ত্রাংশ উদ্ধৃত করা বৈধ। বাংলা স্টাডি বাইবেল এই আইনের পরিধিকে অক্ষরে অক্ষরে মান্য করে।
          </p>
        </section>

        {/* Section 12 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">১২</span>
            এআই গবেষণা ও আরএজি (RAG) নীতি
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs">
            প্ল্যাটফর্মের সহকারী <strong>🤖 Ask Bible</strong> কোনো জেনারেটিভ চ্যাটবট নয় যা শূন্য থেকে উত্তর বানায়। এটি একটি রিট্রিভাল-অগমেন্টেড জেনারেশন (RAG) সিস্টেম যা কেবল যাচাইকৃত উন্মুক্ত শাস্ত্রাংশ ও অনুমোদিত স্টাডি নোটের সরাসরি উদ্ধৃতি সাপেক্ষে কাজ করে। কোনো অবস্থাতেই এআই দিয়ে বাইবেলের অনুপুস্থিত পদ তৈরি করা হয় না।
          </p>
        </section>

        {/* Section 13 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">১৩</span>
            কপিরাইট লঙ্ঘন বিজ্ঞপ্তি ও উপাদান অপসারণ প্রক্রিয়া (Takedown Notice)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs mb-3">
            যদি কোনো স্বত্বাধিকারী মনে করেন যে প্ল্যাটফর্মের কোনো সামগ্রী অসাবধানতাবশত তার স্বত্বাধিকার লঙ্ঘন করেছে, তবে অনতিবিলম্বে আমাদের জানান। আমরা সর্বোচ্চ গুরুত্ব সহকারে ২৪ ঘণ্টার মধ্যে পর্যালোচনাপূর্বক প্রয়োজনীয় সংশোধনী বা অপসারণ নিশ্চিত করব।
          </p>
          <button
            onClick={onNavigateToConcern}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>স্বত্বাধিকার সংক্রান্ত আপত্তি দাখিল করুন</span>
          </button>
        </section>

        {/* Section 14 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">১৪</span>
            লাইসেন্স ও আইনি অনুসন্ধানের অফিশিয়াল ঠিকানা
          </h2>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs">
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
              রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)
            </p>
            <p className="text-slate-500 dark:text-slate-400 mb-2">
              প্রতিষ্ঠাতা ও প্রকল্প পরিচালক, বাংলা স্টাডি বাইবেল
            </p>
            <p className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-500" />
              <span>ইমেইল: </span>
              <a href="mailto:ayanghosh75@gmail.com" className="text-sky-500 font-mono hover:underline">
                ayanghosh75@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* Section 15 */}
        <section className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs">১৫</span>
            নথিকরণ ও নিরীক্ষা সময়কাল
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs">
            এই নীতিমালার সর্বশেষ সামগ্রিক আইনি নিরীক্ষা সম্পন্ন হয়েছে: <strong>১৭ সেপ্টেম্বর ২০২৬</strong>। পরবর্তী বাধ্যতামূলক বার্ষিক নিরীক্ষার তারিখ: <strong>১৭ সেপ্টেম্বর ২০২৭</strong>।
          </p>
        </section>

        {/* Section 16 */}
        <section className="p-6 rounded-3xl bg-gradient-to-br from-gold-50 to-amber-50 dark:from-navy-950 dark:to-navy-900 border border-gold-300/50 dark:border-gold-800/40 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-navy-950 dark:text-gold-300 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center text-xs font-bold">১৬</span>
            শাস্ত্রীয় ও নৈতিক অঙ্গীকারের দৃঢ় প্রত্যয়ন
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-xs italic leading-relaxed">
            "তোমরা সত্য জানিবে, এবং সত্য তোমাদিগকে স্বাধীন করিবে।" (যোহন ৮:৩২)<br />
            আমরা ঈশ্বরের বাক্য প্রচার ও শিক্ষার ক্ষেত্রে বৌদ্ধিক সততা, আইনসঙ্গত লাইসেন্সিং এবং প্রকাশকগণের ন্যায্য অধিকার সংরক্ষণকে আমাদের ঈশ-সেবার অবিচ্ছেদ্য অংশ হিসেবে বিশ্বাস করি।
          </p>
        </section>
      </div>
    </div>
  );
};
