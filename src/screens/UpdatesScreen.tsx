import React from 'react';
import { Sparkles, ShieldCheck, Smartphone, BookOpen, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';

interface UpdatesScreenProps {
  onNavigateToFeedback: () => void;
  onNavigateToBible: () => void;
  onNavigateToInstall: () => void;
}

export const UpdatesScreen: React.FC<UpdatesScreenProps> = ({
  onNavigateToFeedback,
  onNavigateToBible,
  onNavigateToInstall,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in font-sans">
      {/* Release Header */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-950 to-stone-900 text-white border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-semibold tracking-wider uppercase">
            পাবলিক বেটা ১.০ (Public Beta 1.0)
          </span>
          <span className="text-xs text-slate-400">সংস্করণ v1.0.0-beta.1 • সেপ্টেম্বর ২০২৬</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide mb-3">
          বাংলা স্টাডি বাইবেল — প্রাতিষ্ঠানিক মুক্তি
        </h1>
        <p className="text-amber-200/90 text-sm sm:text-base font-serif leading-relaxed max-w-2xl mb-6">
          পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন — বাংলাভাষী খ্রীষ্টীয় সমাজের জন্য গভীর শাস্ত্রীয় জ্ঞান ও প্রচার প্রস্তুতির পূর্ণাঙ্গ উন্মুক্ত প্ল্যাটফর্ম।
        </p>

        <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            <span className="text-slate-400">প্রতিষ্ঠাতা, স্বত্বাধিকারী ও প্রস্তুতকারক: </span>
            <strong className="text-white">রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)</strong>
          </div>
          <a
            href="mailto:ayanghosh75@gmail.com"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
          >
            ayanghosh75@gmail.com
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Beta Advisory Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-8 flex items-start gap-3.5">
        <div className="p-2 bg-amber-500/20 text-amber-500 rounded-xl shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm mb-1">
            সক্রিয় পরিমার্জন ও বেটা অবগতি (Active Development Notice)
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            বাংলা স্টাডি বাইবেল বর্তমানে পাবলিক বেটা ১.০ সংস্করণে উন্মুক্ত। সমস্ত ক্যানোনিকাল শাস্ত্রীয় পদ শতভাগ নির্ভুলভাবে উপস্থাপন নিশ্চিত করতে আমরা প্রতিনিয়ত ডাটাবেজ অডিট ও পরিমার্জন করছি। কোনো অনুবাদের পাঠ অনুপস্থিত থাকলে বা বানান ও তথ্য সংক্রান্ত কোনো পরামর্শ থাকলে অনুগ্রহ করে আমাদের মতামত ও সংশোধন ফর্মের মাধ্যমে জানান।
          </p>
          <button
            onClick={onNavigateToFeedback}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>মতামত বা সংশোধন পাঠান</span>
          </button>
        </div>
      </div>

      {/* Changelog Sections */}
      <div className="space-y-6 mb-10">
        <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-2">
          পাবলিক বেটা ১.০ রিলিজের প্রধান সুবিধাসমূহ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-serif font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>সম্পূর্ণ ৬৬ পুস্তক ক্যানন</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              ৩৯টি পুরাতন নিয়ম ও ২৭টি নূতন নিয়মের মোট ১,১৮৯টি অধ্যায় ও ৩১,০৮৮টি পদ ইন্ডিয়ান রিভাইজড ভার্সন (IRV CC BY-SA 4.0) অনুসারে সম্পূর্ণ সংযুক্ত ও পরীক্ষিত।
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-serif font-bold text-sm">
              <Smartphone className="w-4 h-4" />
              <span>অফলাইন PWA ও হোম স্ক্রিন ইনস্টল</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              সার্ভিস ওয়ার্কারের মাধ্যমে অফলাইনে দ্রুত লোডিং, অ্যান্ড্রয়েড ও আইওএস উভয় ডিভাইসে স্বতন্ত্র অ্যাপের মতো ইনস্টলযোগ্য।
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-serif font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>এক্সপোজিশনাল সার্মন বিল্ডার</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              ১০ থেকে ৬০ মিনিটের প্রচারের রূপরেখা, ৭টি শ্রোতাবর্গ কনটেক্সটুয়ালাইজার এবং সরাসরি মাইক্রোসফট ওয়ার্ড (.doc) ও পিডিএফ প্রিন্ট এক্সপোর্ট।
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-serif font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>স্বচ্ছ লাইসেন্স ও কপিরাইট রেজিস্ট্রি</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              আইআরভি ওপেন লাইসেন্স, বিএসআই স্বত্বাধিকার স্পষ্টীকরণ, তৃতীয় পক্ষের ঋণস্বীকার এবং তাৎক্ষণিক কপিরাইট আপত্তি পেশ করার প্রাতিষ্ঠানিক ব্যবস্থা।
            </p>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
        <button
          onClick={onNavigateToBible}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
        >
          <BookOpen className="w-4 h-4" />
          <span>বাইবেল পাঠ শুরু করুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onNavigateToInstall}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-semibold transition-colors"
        >
          <Smartphone className="w-4 h-4" />
          <span>অ্যাপ ইনস্টল পেজ দেখুন</span>
        </button>
      </div>
    </div>
  );
};
