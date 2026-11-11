// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// PUBLIC BETA OFFICIAL INVITATION SCREEN (/beta)
// Founder, Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Smartphone,
  MessageSquare,
  Users,
  GraduationCap,
  Church,
  ShieldCheck,
  Check,
  Copy,
  Share2,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { CampaignService } from '../services/campaignService';
import { LogoSymbol } from '../components/brand/LogoSymbol';

interface BetaInviteScreenProps {
  onNavigateToBible: () => void;
  onNavigateToInstall: () => void;
  onNavigateToFeedback: () => void;
  onNavigateToPartners: () => void;
}

export const BetaInviteScreen: React.FC<BetaInviteScreenProps> = ({
  onNavigateToBible,
  onNavigateToInstall,
  onNavigateToFeedback,
  onNavigateToPartners,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const baseUrl = CampaignService.getBaseUrl();

  const handleCopy = (id: string, text: string) => {
    CampaignService.copyToClipboard(text).then((success) => {
      if (success) {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2500);
      }
    });
  };

  const inviteWhatsApp = `🕊️ বাংলা স্টাডি বাইবেল — পাবলিক বিটায় আপনাকে স্বাগতম!

প্রিয় খ্রীষ্টবিশ্বাসী,
বাংলা ভাষায় পবিত্র বাইবেলের মূল অর্থ, ঐতিহাসিক পটভূমি এবং গভীর শাস্ত্রীয় পাঠকে প্রতিটি বিশ্বাসীর কাছে সহজলভ্য করতে প্রস্তুত হয়েছে "বাংলা স্টাডি বাইবেল" (Bengali Study Bible)।

আমরা আনন্দের সাথে আপনাকে এই পাবলিক বিটা সংস্করণে আমন্ত্রণ জানাচ্ছি। আপনি নিজে এটি ব্যবহার করুন, আপনার স্মার্টফোনে যুক্ত করুন এবং যেকোনো গঠনমূলক মতামত বা পরামর্শ সরাসরি আমাদের সাথে ভাগ করে নিন।

সরাসরি প্রবেশ করুন:
${baseUrl}/beta?utm_source=whatsapp&utm_medium=chat&utm_campaign=beta_invite

প্রতিষ্ঠাতা ও প্রস্তুতকারক: রেভা. অয়ন কুমার ঘোষ
পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন`;

  const inviteCollege = `শ্রদ্ধেয় শিক্ষক ও ধর্মতাত্ত্বিক শিক্ষার্থীবৃন্দ,
বাংলা বাইবেলের মূল অনুবাদ, স্ট্রংস রেফারেন্স ও বিষয়ভিত্তিক ধর্মতাত্ত্বিক অনুসন্ধানের জন্য "বাংলা স্টাডি বাইবেল পাবলিক বিটা" উন্মুক্ত করা হয়েছে। সেমিনারি ও বাইবেল কলেজের শিক্ষার্থীদের একাডেমিক ও ব্যক্তিগত গবেষণায় এটি একটি সম্পূর্ণ বিনামূল্যের সহায়ক সংস্থান।

অধ্যয়ন শুরু করতে ভিজিট করুন:
${baseUrl}/study?utm_source=seminary&utm_medium=ministry_outreach&utm_campaign=theology_invite`;

  const audiences = [
    {
      icon: BookOpen,
      titleBn: 'সাধারণ বাইবেল পাঠক',
      descBn: 'প্রতিদিনের ব্যক্তিগত ভক্তি, ধ্যান ও বিশুদ্ধ শাস্ত্রবাণী পাঠের জন্য সহজবোধ্য বাংলা ইন্টারফেস।',
      actionBn: 'বাইবেল পাঠ শুরু করুন',
      action: onNavigateToBible,
      badge: 'প্রতিদিনের পাঠ',
      color: 'border-amber-500/30 bg-amber-500/5',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      icon: Church,
      titleBn: 'পালক ও মণ্ডলী প্রচারক',
      descBn: 'সাপ্তাহিক উপাসনা প্রচারের রূপরেখা তৈরি, ঐতিহাসিক প্রেক্ষাপট ও মূল পদের নিগূঢ় সত্য উদঘাটনে সার্মন বিল্ডার।',
      actionBn: 'সার্মন বিল্ডারে যান',
      action: () => (window.location.href = '/sermon'),
      badge: 'প্রচার ও শিক্ষণ',
      color: 'border-gold-500/30 bg-gold-500/5',
      iconColor: 'text-gold-600 dark:text-gold-400',
    },
    {
      icon: GraduationCap,
      titleBn: 'থিওলজি ও বাইবেল শিক্ষার্থী',
      descBn: 'মূল ভাষা (ইব্রীয়/গ্রিক), ব্যাকরণ, স্ট্রংস নম্বর এবং ঐতিহাসিক বাইবেল মানচিত্র নিয়ে গভীর গবেষণা।',
      actionBn: 'স্টাডি ল্যাবে যান',
      action: () => (window.location.href = '/study'),
      badge: 'একাডেমিক গবেষণা',
      color: 'border-sky-500/30 bg-sky-500/5',
      iconColor: 'text-sky-600 dark:text-sky-400',
    },
    {
      icon: Users,
      titleBn: 'যুবসমাজ ও সানডে স্কুল নেতৃত্ব',
      descBn: 'আধুনিক তরুণ প্রজন্মের জন্য ইন্টারেক্টিভ কুইজ, ক্যারেক্টার স্টাডি ও মোবাইলে ব্যবহার উপযোগী রূপরেখা।',
      actionBn: 'ফোনে ইনস্টল করুন',
      action: onNavigateToInstall,
      badge: 'নতুন প্রজন্ম',
      color: 'border-emerald-500/30 bg-emerald-500/5',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-32 space-y-10 animate-fade-in font-sans">
      {/* Beta Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-10 border border-gold-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>অফিসিয়াল পাবলিক বিটা আমন্ত্রণ (Public Beta v1.0)</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-2xl bg-navy-900/90 border border-gold-500/30 shadow-lg shadow-gold-500/10 shrink-0">
              <LogoSymbol size={48} variant="default" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                বাংলা স্টাডি বাইবেল — পাবলিক বিটা
              </h1>
              <p className="text-xs sm:text-sm text-gold-200/90 mt-1 font-medium">
                পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
              </p>
            </div>
          </div>

          {/* Founder's Personal Message */}
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-2">
            <p className="font-serif text-base font-bold text-gold-300">
              প্রতিষ্ঠাতার ব্যক্তিগত বার্তা:
            </p>
            <p>
              "প্রিয় খ্রীষ্টবিশ্বাসীবৃন্দ, প্রভুর নামে আন্তরিক শুভেচ্ছা। বাংলা ভাষায় একটি সর্বাঙ্গীন, গভীর ও প্রামাণ্য ডিজিটাল স্টাডি বাইবেল গড়ে তোলার দীর্ঘদিনের প্রার্থনার ফলশ্রুতি এই প্রয়াস। আমরা আজ সমগ্র বাংলাভাষী মণ্ডলী ও গবেষক সমাজের সামনে এই পাবলিক বিটা সংস্করণ উন্মুক্ত করছি।"
            </p>
            <p className="text-slate-400 text-xs pt-1">
              — <strong>রেভা. অয়ন কুমার ঘোষ</strong> (Rev. Ayan Kumar Ghosh), প্রতিষ্ঠাতা ও প্রস্তুতকারক
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            <button
              onClick={onNavigateToBible}
              className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold flex items-center gap-2 shadow-md transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 বাইবেল পাঠ শুরু করুন</span>
            </button>
            <button
              onClick={onNavigateToInstall}
              className="px-5 py-2.5 rounded-xl bg-navy-800/90 hover:bg-navy-700 text-white font-semibold border border-navy-700 flex items-center gap-2 transition-colors"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>📱 ফোনে ইনস্টল করুন</span>
            </button>
            <button
              onClick={onNavigateToFeedback}
              className="px-5 py-2.5 rounded-xl bg-navy-800/90 hover:bg-navy-700 text-slate-300 hover:text-white font-medium border border-navy-700 flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>💬 মতামত ও সংশোধন জানান</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Audiences Grid */}
      <div className="space-y-4">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-gold-500" />
            <span>কাদের জন্য এই সংস্থান?</span>
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            বাংলাভাষী প্রতিটি শ্রেণীর বিশ্বাসী ও গবেষকের বিশেষ প্রয়োজন মাথায় রেখে প্রস্তুত করা হয়েছে:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audiences.map((aud, i) => {
            const Icon = aud.icon;
            return (
              <div
                key={i}
                className={`p-5 rounded-2xl border ${aud.color} dark:bg-stone-900 flex flex-col justify-between space-y-4 shadow-xs`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-white dark:bg-stone-800 shadow-xs">
                      <Icon className={`w-5 h-5 ${aud.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {aud.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    {aud.titleBn}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {aud.descBn}
                  </p>
                </div>

                <button
                  onClick={aud.action}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{aud.actionBn}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shareable Invitation Messages */}
      <div className="space-y-6">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-sky-500" />
            <span>অন্যদের আমন্ত্রণ জানানোর রেডিমেড বার্তা</span>
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
            আপনার পরিচিত বিশ্বাসী, চার্চ গ্রুপ বা সহপাঠীদের সাথে ১-ক্লিকে কপি করে শেয়ার করুন:
          </p>
        </div>

        {/* 1. WhatsApp Invitation */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              📱 সাধারণ বিশ্বাসী ও বন্ধুদের জন্য (হোয়াটসঅ্যাপ বার্তা)
            </span>
            <button
              onClick={() => handleCopy('wa', inviteWhatsApp)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              {copiedId === 'wa' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>কপি করুন</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-stone-50 dark:bg-stone-950/60 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans whitespace-pre-line">
            {inviteWhatsApp}
          </div>
        </div>

        {/* 2. Seminary & College Notice */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-sky-700 dark:text-sky-400">
              🎓 সেমিনারি ও ধর্মতাত্ত্বিক শিক্ষার্থীদের জন্য নোটিশ
            </span>
            <button
              onClick={() => handleCopy('col', inviteCollege)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 transition-colors"
            >
              {copiedId === 'col' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>কপি করুন</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-stone-50 dark:bg-stone-950/60 p-4 rounded-xl border border-stone-200/70 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans whitespace-pre-line">
            {inviteCollege}
          </div>
        </div>
      </div>

      {/* Quick Link to Church Partners */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-stone-900 dark:to-stone-950 border border-amber-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Church className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>আপনি কি কোনো মণ্ডলীর পালক বা দায়িত্বশীল?</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            মণ্ডলীর উপাসনায় পরিচয় করানোর জন্য প্রস্তুত প্রজেক্টর স্লাইড, এ৪ প্রিন্ট পোস্টার ও বুলেটিন স্ক্রিপ্ট পেতে পার্টনার কিট দেখুন।
          </p>
        </div>
        <button
          onClick={onNavigateToPartners}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 shadow-xs transition-colors"
        >
          মণ্ডলী পার্টনার কিট খুলুন →
        </button>
      </div>

      {/* Beta Feedback Notice */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-2">
        <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>পাবলিক বিটা প্রতিশ্রুতি:</span>
        </div>
        <p>
          যেহেতু এটি একটি পাবলিক বিটা সংস্করণ, কোনো পদ বিন্যাস, বানান বা কারিগরি অসঙ্গতি পরিলক্ষিত হলে অনুগ্রহ করে নিচের ফিডব্যাক পোর্টালে সরাসরি জানান। প্রতিটি প্রতিবেদন প্রতিষ্ঠাতা রেভা. অয়ন কুমার ঘোষ কর্তৃক ব্যক্তিগতভাবে নিরীক্ষিত হয়।
        </p>
      </div>
    </div>
  );
};
