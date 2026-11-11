import React, { useState } from 'react';
import {
  HelpCircle,
  Shield,
  AlertTriangle,
  Send,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export interface AboutHelpScreenProps {
  initialSubTab?: 'about' | 'privacy' | 'terms' | 'copyright' | 'ai_notice' | 'takedown';
  onNavigateToFeedback?: () => void;
}

export const AboutHelpScreen: React.FC<AboutHelpScreenProps> = ({
  initialSubTab = 'about',
  onNavigateToFeedback,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'privacy' | 'terms' | 'copyright' | 'ai_notice' | 'takedown'>(initialSubTab);

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab);
    }
  }, [initialSubTab]);
  const [reportType, setReportType] = useState('correction');
  const [reportUrl, setReportUrl] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportContact, setReportContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDetails.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setReportUrl('');
      setReportDetails('');
      setReportContact('');
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
              বাংলা স্টাডি বাইবেল পরিচিতি ও আইনি নীতিমালা
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              প্ল্যাটফর্মের দর্শন, ক্যানোনিকাল সততা, গোপনীয়তা সুরক্ষা ও দায়িত্বশীল সেবা নীতি
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-stone-200 dark:border-stone-800 mt-8 space-x-2 sm:space-x-4 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
              activeTab === 'about'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            আমাদের পরিচিতি
          </button>
          <button
            onClick={() => setActiveTab('ai_notice')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
              activeTab === 'ai_notice'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🤖 AI গবেষণা নীতিমালা
          </button>
          <button
            onClick={() => setActiveTab('copyright')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
              activeTab === 'copyright'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            কপিরাইট ও লাইসেন্স
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
              activeTab === 'privacy'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            গোপনীয়তা নীতি
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
              activeTab === 'terms'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            ব্যবহারের শর্তাবলী
          </button>
          <button
            onClick={() => setActiveTab('takedown')}
            className={`pb-3 px-3 font-medium transition-colors border-b-2 ${
              activeTab === 'takedown'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            সংশোধন ও আপত্তি ফর্ম
          </button>
        </div>
      </div>

      {/* TAB: ABOUT */}
      {activeTab === 'about' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6 text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            বাংলা স্টাডি বাইবেল প্ল্যাটফর্মের মূল লক্ষ্য ও পরিচয়
          </h2>
          <p>
            <strong>বাংলা স্টাডি বাইবেল</strong> হলো বাংলাভাষী খ্রীষ্টীয় সমাজের পালক, ধর্মতত্ত্বের শিক্ষক, সেমিনারি শিক্ষার্থী, প্রচারক এবং সত্যসন্ধানী প্রতিটি বিশ্বাসীর জন্য নিবেদিত একটি পূর্ণাঙ্গ, প্রামাণ্য ও উচ্চ প্রযুক্তিসম্পন্ন সেবা প্ল্যাটফর্ম।
          </p>
          <p>
            আমাদের লক্ষ্য কেবল পদ খোঁজা নয়, বরং <strong>“পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন”</strong> — এই চার মূলস্তম্ভের ওপর ভিত্তি করে একটি পদ বা বিষয়ের ওপর সম্পূর্ণ শাস্ত্রীয়, ঐতিহাসিক, সাহিত্যিক, মূল শব্দগত ও ব্যবহারিক সত্যকে উন্মোচন করা।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">ক্যানোনিকাল বিশুদ্ধতা</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                ঐতিহাসিক ৬৬-পুস্তক প্রোটেস্ট্যান্ট ক্যানন অনুসরণ; কোনো কৃত্রিম বা বানোয়াট পদ এখানে স্থান পায় না।
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">দায়িত্বশীল প্রযুক্তি</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                AI কখনোই শূন্য থেকে উত্তর উদ্ভাবন করে না; সকল ব্যাখ্যা স্বীকৃত শাস্ত্রীয় ও ঐতিহাসিক সূত্রের ওপর প্রতিষ্ঠিত।
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">মণ্ডলী সেবা ও ঐক্য</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                সকল সনাতন মূলধারা খ্রিস্টীয় ঐতিহ্যের প্রতি পারস্পরিক শ্রদ্ধা এবং মণ্ডলী পরিচালনার কার্যকর টুলস।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: AI NOTICE */}
      {activeTab === 'ai_notice' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-serif leading-relaxed">
              <strong>বিশেষ নীতিগত ঘোষণা:</strong> “Ask Bible একটি গবেষণা ও অধ্যয়ন সহায়ক মাধ্যম। এর প্রদত্ত উত্তর সর্বদা সরাসরি পবিত্র শাস্ত্র ও নির্ভরযোগ্য প্রামাণ্য সূত্রের সাথে মিলিয়ে যাচাই করা কর্তব্য। এটি কখনোই পবিত্র আত্মার অনুপ্রেরণা, সতর্ক দায়িত্বশীল শাস্ত্রব্যাখ্যা, যোগ্য মণ্ডলী শিক্ষক কিংবা যাজকীয় পরামর্শের বিকল্প নয়।”
            </div>
          </div>

          <div className="space-y-4 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 font-serif">
              আমাদের কঠোর কৃত্রিম বুদ্ধিমত্তা (RAG) নিরাপত্তা ফ্রেমওয়ার্ক
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>জিরো-হ্যালুসিনেশন গ্যারান্টি:</strong> সিস্টেমে কোনো অলীক বা কাল্পনিক পদ, লেখক কিংবা উদ্ধৃতি তৈরি করার অনুমতি নেই। তথ্য না থাকলে AI স্পষ্টভাবে ‘তথ্য অপ্রতুল’ বলে অবহিত করবে।</li>
              <li><strong>সূত্র-নির্ভরতা:</strong> প্রতিটি ধর্মতাত্ত্বিক দাবির সাথে মূল গ্রীক/হিব্রু স্ট্রংস নম্বর, অধ্যায়-পদ এবং স্বীকৃত পণ্ডিতের সূত্র সংযুক্ত থাকে।</li>
              <li><strong>ঐতিহাসিক দৃষ্টিভঙ্গির ন্যায্যতা:</strong> বিভিন্ন মণ্ডলী ঐতিহ্যের (রিফর্মড, আর্নিনিয়ান, ব্যাপটিস্ট, পেন্টেকস্টাল, চার্চ ফাদার্স) ব্যাখ্যাকে কোনো পক্ষপাত ব্যতিরেকে শ্রদ্ধার সাথে উপস্থাপন করা হয়।</li>
              <li><strong>ব্যক্তিগত ঐশ্বরিক কর্তৃত্ব বর্জন:</strong> AI কখনোই “ঈশ্বর আমাকে বলেছেন” বা কোনো ব্যক্তিগত প্রত্যাদেশের ভান করে না।</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB: COPYRIGHT */}
      {activeTab === 'copyright' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            কপিরাইট ও মেধা-সম্পত্তি নীতি (Copyright & Licensing Policy)
          </h2>
          <p>
            আমরা অন্যের কপিরাইট ও বৌদ্ধিক অধিকারের প্রতি গভীরভাবে শ্রদ্ধাশীল।
          </p>
          <ul className="space-y-3">
            <li className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40">
              <strong>বাংলাদেশ ও ভারত বাইবেল সোসাইটি (BSI):</strong> মূল বাংলা বাইবেল পাঠ্যাংশসমূহ বাইবেল সোসাইটি অফ ইন্ডিয়ার প্রামাণ্য পাঠের সাথে তুলনামূলক বিশুদ্ধতায় পরিবেশিত। বিএসআই পাঠ্যের ওপর সমস্ত সত্ত্ব স্বত্বাধিকারী সংস্থার সংরক্ষিত।
            </li>
            <li className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40">
              <strong>উন্মুক্ত ও পাবলিক ডোমেইন উপাদান:</strong> ১৮০৯ সালের কেরি বাংলা অনুবাদ, ওয়ার্ল্ড ইংলিশ বাইবেল (WEB), ক্লাসিক্যাল চার্চ ফাদার্স ও ১৮ শতকের মেথিউ হেনরি কমেন্টারি সম্পূর্ণ উন্মুক্ত ও শিক্ষামূলক ব্যবহারের জন্য ব্যবহৃত।
            </li>
            <li className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40">
              <strong>অনুমোদনহীন ডিজিটাল কপি নিষিদ্ধ:</strong> কোনো কপিরাইটযুক্ত আধুনিক বই বা অনুবাদের অননুমোদিত পূর্ণাঙ্গ পিডিএফ বা ফাইল আপলোড করা সম্পূর্ণ নিষিদ্ধ।
            </li>
          </ul>
        </div>
      )}

      {/* TAB: PRIVACY */}
      {activeTab === 'privacy' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <div className="flex items-center gap-2 text-emerald-600 font-bold">
            <Lock className="w-5 h-5" />
            <span>১০০% ক্লায়েন্ট-সাইড প্রাইভেসি ও গোপনীয়তা নিশ্চয়তা</span>
          </div>
          <p>
            আপনার ব্যক্তিগত বাইবেল পাঠের ইতিহাস, গোপন নোট, ব্যক্তিগত প্রার্থনার তালিকা এবং ব্যক্তিগত পাণ্ডুলিপি সম্পূর্ণ আপনার নিজস্ব ডিভাইসে সংরক্ষিত থাকে।
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>কোনো বাণিজ্যিক বিজ্ঞাপন বা ট্র্যাকার নেই:</strong> আমরা কোনো বাণিজ্যিক বিজ্ঞাপনী সংস্থা বা থার্ড-পার্টি ডাটা ব্রোকারের সাথে যুক্ত নই।</li>
            <li><strong>গেস্ট মোড:</strong> কোনো অ্যাকাউন্ট বা ব্যক্তিগত ফোন নম্বর ছাড়াই সম্পূর্ণ বাইবেল পড়া ও অধ্যয়ন করা যায়।</li>
            <li><strong>মণ্ডলী ডাটার নিরাপত্তা:</strong> চার্চ পরিচালনা ও অভ্যন্তরীণ সদস্য তালিকা শুধুমাত্র সংশ্লিষ্ট অনুমোদিত ব্যক্তির জন্যই উন্মুক্ত।</li>
          </ul>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>স্বচ্ছ পরিসংখ্যান ও সেবা মূল্যায়ন নীতি (Analytics & Transparency)</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              অ্যাপ্লিকেশনের কোন কোন শাস্ত্রীয় বই ও গবেষণা ফিচার বিশ্বাসীদের উপকারে আসছে তা বোঝার জন্য আমরা সম্পূর্ণ নামহীন ও সামগ্রিক (Aggregate) পরিসংখ্যান রেকর্ড করি।
            </p>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc pl-4">
              <li><strong>ব্যক্তিগত তথ্যমুক্ত:</strong> কোনো ইমেইল, ফোন নম্বর বা ডিভাইসের স্থায়ী হার্ডওয়্যার আইডি রেকর্ড করা হয় না।</li>
              <li><strong>পাণ্ডুলিপি ও নোট সম্পূর্ণ গোপন:</strong> আপনার ব্যক্তিগত নোটের ভেতরের লেখা বা সার্মন খসড়ার বিষয়বস্তু কখনো বিশ্লেষণ করা হয় না।</li>
              <li><strong>সার্চ ফিল্টারিং:</strong> অনুসন্ধানের শব্দাবলি থেকে সংবেদনশীল ব্যক্তিগত তথ্য বা ফোন নম্বর স্বয়ংক্রিয়ভাবে ফিল্টার হয়ে যায়।</li>
              <li><strong>শুধুমাত্র খ্রিস্টীয় পরিচর্যার উন্নতিতে:</strong> এই সামগ্রিক পরিসংখ্যান শুধুমাত্র প্ল্যাটফর্মের কর্ণধার ও ডেভেলপার রেভাঃ অয়ন কুমার ঘোষ-এর কাছে সুরক্ষিত থাকে।</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB: TERMS */}
      {activeTab === 'terms' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-4 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            ব্যবহারের শর্তাবলী (Terms of Use)
          </h2>
          <p>
            এই প্ল্যাটফর্মটি সম্পূর্ণ খ্রিস্টীয় মণ্ডলী পরিচর্যা, ব্যক্তিগত বাইবেল পাঠ ও পরম সত্য অনুসন্ধানের জন্য উন্মুক্ত।
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>প্ল্যাটফর্মের কোনো টুল বা ডেটাবেস শাস্ত্র বিকৃতি কিংবা বিদ্বেষ ছড়ানোর উদ্দেশ্যে ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।</li>
            <li>যাজকীয় প্রচার বিল্ডারের উপাদান প্রচারক বা শিক্ষকের নিজের প্রার্থনা ও ব্যক্তিগত অধ্যয়নের পরিপূরক হিসেবে বিবেচ্য।</li>
          </ul>
        </div>
      )}

      {/* TAB: TAKEDOWN / CORRECTION */}
      {activeTab === 'takedown' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-100 dark:border-stone-800 pb-4">
            <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600" />
              <span>বিষয়বস্তু সংশোধন বা কপিরাইট আপত্তি ফর্ম</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              কোনো বানানে ত্রুটি, ঐতিহাসিক তথ্যের অমিল বা কপিরাইট সংক্রান্ত অনুরোধ থাকলে অনুগ্রহ করে জানান।
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-stone-900 dark:text-stone-100">আপনার বার্তা গৃহীত হয়েছে</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                আমাদের সম্পাদকীয় দল গুরুত্বের সাথে বিষয়টি পর্যালোচনা করে দ্রুত সংশোধন করবেন। ধন্যবাদ।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">আপত্তি বা অনুরোধের ধরন *</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                >
                  <option value="correction">বানান বা শাস্ত্রীয় রেফারেন্স সংশোধন</option>
                  <option value="theological">ঐতিহাসিক বা ধর্মতাত্ত্বিক তথ্যের স্পষ্টীকরণ</option>
                  <option value="copyright">কপিরাইট স্বত্বাধিকার সংক্রান্ত আপত্তি / টেকডাউন</option>
                  <option value="technical">কারিগরি ত্রুটি বা সাইট সমস্যা</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">পৃষ্ঠা বা উপাদানের লিংক / শিরোনাম</label>
                <input
                  type="text"
                  value={reportUrl}
                  onChange={(e) => setReportUrl(e.target.value)}
                  placeholder="উদা: রোমীয় ৮ অধ্যায় বা লাইব্রেরি বইয়ের নাম"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">বিস্তারিত বিবরণ *</label>
                <textarea
                  required
                  rows={4}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="সুনির্দিষ্ট রেফারেন্স, সঠিক প্রস্তাবিত পাঠ্য বা স্বত্বাধিকারের প্রমাণ উল্লেখ করুন..."
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">আপনার নাম ও যোগাযোগের ইমেইল / ফোন</label>
                <input
                  type="text"
                  value={reportContact}
                  onChange={(e) => setReportContact(e.target.value)}
                  placeholder="উদা: আপনার ইমেইল বা ফোন নম্বর"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>অনুরোধ জমা দিন</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
