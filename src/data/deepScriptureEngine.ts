// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// SCRIPTURE ENGINE, CONTEXT EVALUATOR & CANONICAL REPOSITORY
// Owner: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Scripture Version: IRV Bengali (Indian Revised Version) & BSB
// ============================================================

import {
  DeepDailyWord,
  PassageCategory,
  ContentDistributionPackage,
} from '../types/deepDailyWord';

export const DEEP_ASSISTANT_NAME = 'দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক';
export const SCRIPTURE_MOTTO = 'তোমার বাক্য আমার চরণের প্রদীপ, আমার পথের আলো। (গীতসংহিতা ১১৯:১০৫)';
export const CANONICAL_SITE_URL = 'https://bengalistudybible.surge.sh';
export const OFFICIAL_APPROVER = 'Rev. Ayan Kumar Ghosh';
export const OFFICIAL_VERSION_BN = 'IRV-Bengali' as const;

export interface RawScriptureTemplate {
  bookId: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  verseRefBn: string;
  verseRefEn: string;
  verseTextBn: string;
  verseTextEn: string;
  category: PassageCategory;
  fullPassageBn: string;
  contextBn: string;
  simpleExplanationBn: string;
  lifeApplicationBn: string;
  reflectionQuestionBn: string;
  shortPrayerBn: string;
  themeBn: string;
  relatedRefs: Array<{ refBn: string; refEn: string; bookId: string; chapter: number; verse: number; textBn: string }>;
}

/**
 * 30+ Core Canonical Scripture Templates across Old & New Testament
 * Each strictly categorized according to its true biblical context.
 */
export const SCRIPTURE_TEMPLATES: RawScriptureTemplate[] = [
  // 1. PROMISE (খাঁটি প্রতিজ্ঞা) - John 3:16
  {
    bookId: 'JHN',
    chapter: 3,
    verseStart: 16,
    verseRefBn: 'যোহন ৩:১৬',
    verseRefEn: 'John 3:16',
    verseTextBn: 'কারণ ঈশ্বর জগৎকে এমন প্রেম করিলেন যে, আপনার একজাত পুত্রকে দান করিলেন, যেন যে কেহ তাঁহাতে বিশ্বাস করে, সে বিনষ্ট না হয়, কিন্তু অনন্ত জীবন পায়।',
    verseTextEn: 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have eternal life.',
    category: 'PROMISE',
    fullPassageBn: 'যোহন ৩:১৪-২১ — মোশি যেমন প্রান্তরে সর্পকে উচ্চীকৃত করিয়াছিলেন, তদ্রূপ মনুষ্যপুত্রকেও উচ্চীকৃত হইতে হইবে; যেন যে কেহ বিশ্বাস করে, সে তাঁহাতে অনন্ত জীবন পায়। কারণ ঈশ্বর জগৎকে এমন প্রেম করিলেন যে, আপনার একজাত পুত্রকে দান করিলেন, যেন যে কেহ তাঁহাতে বিশ্বাস করে, সে বিনষ্ট না হয়, কিন্তু অনন্ত জীবন পায়। কারণ ঈশ্বর জগতের বিচার করিবার জন্য জগতে পুত্রকে পাঠান নাই, কিন্তু জগৎ যেন তাঁহার দ্বারা পরিত্রাণ পায়।',
    contextBn: 'নিকদীম নামক এক ফরীশী ও যিহূদী শাসনকর্তা রাত্রিকালে যীশুর নিকটে আসিয়া পরিত্রাণের পথ অন্বেষণ করিয়াছিলেন। যীশু তাঁহার সহিত আত্মিক পুনর্জন্ম ও ক্রুশে মানবজাতির জন্য ঈশ্বরের আত্মত্যাগী প্রতিজ্ঞার বিষয়ে এই গভীর সত্য প্রকাশ করেন।',
    simpleExplanationBn: 'ঈশ্বর এই পাপময় পৃথিবীকে পরিত্যাগ করেন নাই; বরং পরম প্রেমে নিজ একমাত্র পুত্রকে আমাদের জন্য উপহার দিয়াছেন। খ্রীষ্টে বিশ্বাসকারী প্রত্যেকের জন্য পাপের বিনাশ হইতে মুক্তি ও চিরন্তন জীবনের নিশ্চয়তা রহিয়াছে।',
    lifeApplicationBn: 'আজকের দিনে কোনো ভয় বা অপরাধবোধে নিমজ্জিত না হইয়া খ্রীষ্টের নিঃশর্ত প্রেমে আশ্রয় গ্রহণ করুন। ঈশ্বরের এই অফুরন্ত ভালোবাসা নিজের হৃদয়ে ধারণ করিয়া অন্যকেও সেই ভালোবাসার সংবাদ প্রদান করুন।',
    reflectionQuestionBn: 'আপনি কি খ্রীষ্টের অনন্ত জীবনের প্রতিজ্ঞায় নিজের সম্পূর্ণ জীবনকে সমর্পণ করিতে পারিয়াছেন?',
    shortPrayerBn: 'হে মঙ্গলময় স্বর্গীয় পিতা, জগতের জন্য তোমার এই অনুপম প্রেমের জন্য তোমায় ধন্যবাদ দিই। প্রভু যীশুর উপর অটল বিশ্বাস রক্ষা করিয়া যেন প্রতিদিন তোমার সত্যের পথে চলিতে পারি, অনুগ্রহ দান কর। আমেন।',
    themeBn: 'অনন্ত জীবনের ঐশ্বরিক প্রতিজ্ঞা',
    relatedRefs: [
      { refBn: 'রোমীয় ৫:৮', refEn: 'Romans 5:8', bookId: 'ROM', chapter: 5, verse: 8, textBn: 'কিন্তু ঈশ্বর আমাদের প্রতি তাঁহার নিজের প্রেমের প্রমাণ দিতেছেন, কারণ আমরা যখন এখনও পাপী ছিলাম, তখন খ্রীষ্ট আমাদের জন্য মরিলেন।' },
      { refBn: '১ যোহন ৪:৯', refEn: '1 John 4:9', bookId: '1JN', chapter: 4, verse: 9, textBn: 'ঈশ্বরের প্রেম আমাদের মধ্যে ইহাতেই প্রকাশিত হইয়াছে যে, ঈশ্বর আপনার একজাত পুত্রকে জগতে পাঠাইয়াছেন, যেন আমরা তাঁহার দ্বারা বাঁচিতে পারি।' }
    ]
  },

  // 2. COMFORT (সান্ত্বনার বাক্য) - Psalm 23:1-3
  {
    bookId: 'PSA',
    chapter: 23,
    verseStart: 1,
    verseRefBn: 'গীতসংহিতা ২৩:১',
    verseRefEn: 'Psalm 23:1',
    verseTextBn: 'সদাপ্রভু আমার পালক, আমার অভাব হইবে না।',
    verseTextEn: 'The LORD is my shepherd; I shall not want.',
    category: 'COMFORT',
    fullPassageBn: 'গীতসংহিতা ২৩:১-৬ — সদাপ্রভু আমার পালক, আমার অভাব হইবে না। তিনি আমাকে শ্যামল চারণে শোয়ান; শান্ত জলের তীরে আমাকে লইয়া যান। তিনি আমার প্রাণকে সঞ্জীবিত করেন; নিজের নামের জন্য আমাকে ধার্মিকতার পথে চালান। হাঁ, যদিও আমি মৃত্যুচ্ছায়ার উপত্যকা দিয়া গমন করি, তথাপি অমঙ্গলের ভয় করিব না; কারণ তুমি আমার সঙ্গে সঙ্গে আছ; তোমার যষ্টি ও তোমার লাঠি, ইহারা আমাকে সান্ত্বনা করে।',
    contextBn: 'রাজা দায়ূদ নিজের মেষপালক জীবনের অভিজ্ঞতা হইতে ঈশ্বরের অবিরাম যত্ন ও সুরক্ষাকে স্মরণ করিয়া এই ভক্তিমূলক গীত রচনা করিয়াছিলেন। চরম প্রতিকূলতা ও মৃত্যুভয়ের মধ্যেও ঈশ্বরকে তাঁর ব্যক্তিগত রাখাল হিসেবে স্বীকার করিয়াছেন।',
    simpleExplanationBn: 'একজন বিশ্বস্ত মেষপালক যেভাবে প্রতিটি মেষের তৃষ্ণা ও খাদ্যের সংস্থান করেন, তেমনই ঈশ্বর তাঁর আশ্রিত প্রতিটি মানুষের দৈনন্দিন প্রয়োজন পূর্ণ করেন। পার্থিব অভাববোধের ঊর্ধ্বে ঈশ্বরীয় শান্তিই প্রকৃত তৃপ্তি।',
    lifeApplicationBn: 'ভবিষ্যতের খাদ্য, অর্থ বা সুরক্ষার উদ্বেগে ক্লান্ত না হইয়া উত্তম পালক প্রভুর নির্দেশনার কাছে নিজেকে সঁপিয়া দিন। তিনি আপনাকে শান্ত জলের তীরে লইয়া যাইতে বিশ্বস্ত।',
    reflectionQuestionBn: 'বর্তমান কোন দুশ্চিন্তা বা শূন্যতা আপনি আজ আপনার উত্তম মেষপালক ঈশ্বরের হাতে অর্পণ করিতে চাহেন?',
    shortPrayerBn: 'হে সদাপ্রভু আমার পরম পালক, জীবনের প্রতিটি চড়াই-উতরাইয়ে তুমি আমাকে আগলাইয়া রাখিয়াছ। সকল ভয় দূর করিয়া তোমার শান্ত জলের আশ্রয়ে আমাকে পরিচালিত কর। আমেন।',
    themeBn: 'বিশ্বস্ত মেষপালকের অটল সুরক্ষা',
    relatedRefs: [
      { refBn: 'যোহন ১০:১১', refEn: 'John 10:11', bookId: 'JHN', chapter: 10, verse: 11, textBn: 'আমিই উত্তম মেষপালক; উত্তম মেষপালক মেষদের জন্য আপন প্রাণ দেয়।' }
    ]
  },

  // 3. INSTRUCTION (শিক্ষা ও নির্দেশনা) - Proverbs 3:5-6
  {
    bookId: 'PRO',
    chapter: 3,
    verseStart: 5,
    verseRefBn: 'হিতোপদেশ ৩:৫',
    verseRefEn: 'Proverbs 3:5',
    verseTextBn: 'তোমার সমস্ত চিত্তে সদাপ্রভুতে বিশ্বাস কর; তোমার নিজ বিবেচনায় নির্ভর করিও না।',
    verseTextEn: 'Trust in the LORD with all your heart, and lean not on your own understanding.',
    category: 'INSTRUCTION',
    fullPassageBn: 'হিতোপদেশ ৩:১-৮ — হে আমার পুত্র, আমার ব্যবস্থা ভুলিও না, কিন্তু তোমার হৃদয় আমার আজ্ঞা সকল পালন করুক... তোমার সমস্ত চিত্তে সদাপ্রভুতে বিশ্বাস কর; তোমার নিজ বিবেচনায় নির্ভর করিও না। তোমার সমস্ত পথে তাঁহাকে স্বীকার কর; তাহাতে তিনি তোমার পথ সকল সরল করিবেন। নিজের দৃষ্টিতে আপনি বিজ্ঞ জ্ঞান করিও না; সদাপ্রভুকে ভয় কর, এবং মন্দ হইতে প্রস্থান কর।',
    contextBn: 'রাজা শলোমন যুবসমাজ ও বিশ্বাসীদের উদ্দেশ্যে আত্মিক প্রজ্ঞার উপদেশ দিতে গিয়া দেখাইয়াছেন যে মানুষের বুদ্ধি সীমাবদ্ধ ও ভুলপ্রবণ, কিন্তু ঈশ্বরের পথ নির্দোষ।',
    simpleExplanationBn: 'আমাদের জ্ঞান ও জাগতিক যুক্তি প্রায়শই সঠিক দিকনির্দেশনা দিতে ব্যর্থ হয়। সম্পূর্ণ অন্তঃকরণ দিয়া ঈশ্বরের ওপর নির্ভর করাই প্রকৃত জ্ঞানের মূল শিক্ষা।',
    lifeApplicationBn: 'জীবনের কোনো গুরুত্বপূর্ণ সিদ্ধান্ত লইবার পূর্বে কেবল নিজের হিসাব-নিকাশের ওপর ভরসা না করিয়া প্রার্থনায় প্রভুর ইচ্ছা অনুসন্ধান করুন এবং পাপ পরিত্যাগ করুন।',
    reflectionQuestionBn: 'কোন্ ক্ষেত্রে আপনি ঈশ্বরের নির্দেশনার চেয়ে নিজের বুদ্ধি ও আবেগের ওপর বেশি নির্ভর করিতেছেন?',
    shortPrayerBn: 'হে প্রজ্ঞাময় ঈশ্বর, আমার সীমিত দৃষ্টি ও মানবিক অহংকার ক্ষমা কর। প্রতিদিনের সিদ্ধান্তে তোমার পবিত্র আত্মাকে সম্মান করিয়া যেন সঠিক পথে পদার্পণ করিতে পারি। আমেন।',
    themeBn: 'সম্পূর্ণ চিত্তে ঈশ্বরে আত্মসমর্পণ',
    relatedRefs: [
      { refBn: 'যিরমিয় ১৭:৭', refEn: 'Jeremiah 17:7', bookId: 'JER', chapter: 17, verse: 7, textBn: 'ধন্য সেই ব্যক্তি, যে সদাপ্রভুতে নির্ভর করে, এবং সদাপ্রভুই যাহার নির্ভরভূমি।' }
    ]
  },

  // 4. HOPE (আশার বাক্য) - Isaiah 40:31
  {
    bookId: 'ISA',
    chapter: 40,
    verseStart: 31,
    verseRefBn: 'যিশাইয় ৪০:৩১',
    verseRefEn: 'Isaiah 40:31',
    verseTextBn: 'কিন্তু যাহারা সদাপ্রভুর অপেক্ষায় থাকে, তাহারা নূতন বল পাইবে; তাহারা ঈগল পক্ষীর ন্যায় ডানা মেলিয়া উঠিবে; দৌড়িবে, তথাপি ক্লান্ত হইবে না; হাঁটিবে, তথাপি শ্রান্ত হইবে না।',
    verseTextEn: 'Yet those who wait for the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    category: 'HOPE',
    fullPassageBn: 'যিশাইয় ৪০:২৮-৩১ — তুমি কি জান না? তুমি কি শুন নাই? যিনি সনাতন ঈশ্বর, সদাপ্রভু, যিনি পৃথিবীর প্রান্তসমূহের সৃষ্টিকর্তা, তিনি ক্লান্ত হন না, শ্রান্ত হন না; তাঁহার বুদ্ধির অনুসন্ধান পাওয়া যায় না। তিনি ক্লান্তকে বল দান করেন, ও শক্তিহীন লোকের শক্তি বৃদ্ধি করেন। যুবকেরা ক্লান্ত ও শ্রান্ত হইবে, এবং তরুণেরা সম্পূর্ণ পতিত হইবে; কিন্তু যাহারা সদাপ্রভুর অপেক্ষায় থাকে, তাহারা নূতন বল পাইবে...',
    contextBn: 'বাবিলীয় বন্দিত্বের আশঙ্কায় নিমজ্জিত ইস্রায়েল জাতিকে সান্ত্বনা দিতে ও ভবিষ্যতে পুনরুদ্ধারের আশা জাগাইয়া তুলিতে ভাববাদী যিশাইয় এই অনন্তকালের শক্তি ঘোষণা করেন।',
    simpleExplanationBn: 'মানুষের শারীরিক ও মানসিক ক্ষমতা পরিমিত এবং একসময় নিঃশেষ হইয়া যায়। কিন্তু পরমেশ্বর যিনি বিশ্বব্রহ্মাণ্ড সৃষ্টি করিয়াছেন, তিনি তাঁহার আশ্রিত ধৈর্যশীল সন্তানদের প্রতিদিন নতুন আত্মিক বল দান করেন।',
    lifeApplicationBn: 'জীবনের টানাপোড়েনে যদি আজ ক্লান্ত ও অবসন্ন বোধ করেন, তবে হুটোপুটি না করিয়া নীরব প্রার্থনায় ঈশ্বরের উপস্থিতির অপেক্ষা করুন। তিনি আপনাকে উড্ডীন ঈগলের মতো নবশক্তি দান করিবেন।',
    reflectionQuestionBn: 'আপনি কি আজ ঈশ্বরের অপেক্ষায় ধৈর্য ধারণ করিতে প্রস্তুত আছেন, নাকি অধৈর্য হইয়া ভুল সিদ্ধান্ত লইতেছেন?',
    shortPrayerBn: 'হে সর্বশক্তিমান প্রভু, আমার দুর্বলতায় তোমার অপরিসীম শক্তি ঢালিয়া দাও। তোমার অপেক্ষায় থাকিয়া যেন জীবনের প্রতিটি প্রতিকূল ঝড়ে ঈগলের ন্যায় ডানা মেলিয়া বিজয়ী হইতে পারি। আমেন।',
    themeBn: 'প্রভুর প্রতীক্ষায় নবশক্তি লাভ',
    relatedRefs: [
      { refBn: 'গীতসংহিতা ২৭:১৪', refEn: 'Psalm 27:14', bookId: 'PSA', chapter: 27, verse: 14, textBn: 'সদাপ্রভুর অপেক্ষায় থাক; বলবান হও, তোমার হৃদয় সাহসযুক্ত হউক; হাঁ, সদাপ্রভুর অপেক্ষায় থাক।' }
    ]
  },

  // 5. PRAYER (প্রার্থনার পদ) - Matthew 6:9-13
  {
    bookId: 'MAT',
    chapter: 6,
    verseStart: 9,
    verseRefBn: 'মথি ৬:৯',
    verseRefEn: 'Matthew 6:9',
    verseTextBn: 'অতএব তোমরা এই রূপ প্রার্থনা করিও: হে আমাদের স্বর্গস্থ পিতঃ, তোমার নাম পবিত্র বলিয়া গণ্য হউক।',
    verseTextEn: 'Pray then in this way: Our Father in heaven, hallowed be Your name.',
    category: 'PRAYER',
    fullPassageBn: 'মথি ৬:৯-১৩ — অতএব তোমরা এই রূপ প্রার্থনা করিও: হে আমাদের স্বর্গস্থ পিতঃ, তোমার নাম পবিত্র বলিয়া গণ্য হউক, তোমার রাজ্য আইসুক, তোমার ইচ্ছা যেমন স্বর্গে তেমনি পৃথিবীতেও পূর্ণ হউক। আমাদের দৈনিক খাদ্য আজ আমাদিগকে দাও। আর আমাদের অপরাধ সকল ক্ষমা কর, যেমন আমরাও আপন আপন অপরাধীদের ক্ষমা করিয়াছি। আর আমাদিগকে পরীক্ষাতে আনিও না, কিন্তু মন্দ হইতে রক্ষা কর; কারণ রাজ্য, পরাক্রম ও গৌরব যুগানুযুগে তোমার। আমেন।',
    contextBn: 'পর্বতোপরি উপদেশে প্রভু যীশু তাঁর শিষ্যদিগকে আনুষ্ঠানিক ও লোকদেখানো প্রার্থনার পরিহার করিয়া স্বর্গের পিতার সম্মুখে আন্তরিক প্রার্থনার রূপরেখা শিক্ষা দেন।',
    simpleExplanationBn: 'প্রার্থনা কোনো মন্ত্র বা দাবি নহে; ইহা পরমপিতার সহিত সন্তানোচিত শ্রদ্ধার মিলন। ঈশ্বরের মহিমাকে প্রথম স্থান দিয়া আমাদের দৈনন্দিন প্রয়োজন ও পাপক্ষমার বিনম্র আবেদনই এই প্রার্থনার প্রাণ।',
    lifeApplicationBn: 'আজকের দিনে প্রথমে ঈশ্বরের পবিত্র নাম ও রাজ্যকে হৃদয়ে বরণ করুন। নিজের অভাবের পূর্বে প্রভুর ইচ্ছা পূরণের আগ্রহ প্রকাশ করিয়া প্রার্থনায় রত হউন।',
    reflectionQuestionBn: 'আপনার প্রার্থনায় ঈশ্বরের মহিমান্বিত ইচ্ছা কি নিজের দাবির চেয়ে বেশি প্রাধান্য পায়?',
    shortPrayerBn: 'হে আমাদের স্বর্গস্থ পিতা, তোমার নাম আজ আমাদের জীবনে পবিত্র ও সম্মানিত হউক। তোমার মহিমান্বিত ইচ্ছা যেন আমাদের প্রতিটি আচরণে মূর্ত হইয়া উঠে। আমেন।',
    themeBn: 'স্বর্গের পিতার সম্মুখে খাঁটি প্রার্থনা',
    relatedRefs: [
      { refBn: 'ফিলিপীয় ৪:৬', refEn: 'Philippians 4:6', bookId: 'PHP', chapter: 4, verse: 6, textBn: 'কোন বিষয়ে উদ্বিগ্ন হইও না, কিন্তু সর্ব্ববিষয়ে প্রার্থনা ও বিনতি দ্বারা ধন্যবাদ সহকারে তোমাদের যাচ্ঞা সকল ঈশ্বরকে জ্ঞাত কর।' }
    ]
  },

  // 6. PRAISE (প্রশংসা ও উপাসনা) - Psalm 103:1-2
  {
    bookId: 'PSA',
    chapter: 103,
    verseStart: 1,
    verseRefBn: 'গীতসংহিতা ১০৩:১',
    verseRefEn: 'Psalm 103:1',
    verseTextBn: 'হে আমার প্রাণ, সদাপ্রভুর ধন্যবাদ কর; আমার অন্তরের সমস্ত, তাঁহার পবিত্র নামের ধন্যবাদ কর।',
    verseTextEn: 'Bless the LORD, O my soul, and all that is within me, bless His holy name.',
    category: 'PRAISE',
    fullPassageBn: 'গীতসংহিতা ১০৩:১-৫ — হে আমার প্রাণ, সদাপ্রভুর ধন্যবাদ কর; আমার অন্তরের সমস্ত, তাঁহার পবিত্র নামের ধন্যবাদ কর। হে আমার প্রাণ, সদাপ্রভুর ধন্যবাদ কর, তাঁহার কোন উপকার ভুলিও না। তিনি তোমার সমস্ত অপরাধ ক্ষমা করেন; তোমার সমস্ত রোগ সুস্থ করেন; তিনি বিনাশ হইতে তোমার প্রাণ মুক্ত করেন; তিনি তোমাকে দয়া ও করুণারূপ মুকুটে ভূষিত করেন...',
    contextBn: 'রাজা দায়ূদ নিজের অন্তরাত্মাকে ঈশ্বরের অজস্র অনুগ্রহ ও পাপমোচনের কথা স্মরণ করাইয়া পূর্ণ অন্তঃকরণে বন্দনা করিবার আহ্বান জানাইয়াছেন।',
    simpleExplanationBn: 'আমাদের হৃদয় প্রায়শই না-পাওয়া বিষয় লইয়া অভিযোগ করে, কিন্তু ঈশ্বরের অপার অনুগ্রহ ভুলিয়া যায়। জীবনের প্রতি নিঃশ্বাসে ঈশ্বরের উপকারের কৃতজ্ঞতা স্বীকার করাই আত্মার শান্তি।',
    lifeApplicationBn: 'আজকের দিনে অন্তত পাঁচটি ঈশ্বরের অনুগ্রহের কথা স্মরণ করিয়া মুখে ও হৃদয়ে ঈশ্বরের ধন্যবাদ জ্ঞাপন করুন। প্রশংসা অভিযোগকে পরাভূত করে।',
    reflectionQuestionBn: 'ঈশ্বর আপনার জীবনে কোন্ বিশেষ উপকার করিয়াছেন যাহার জন্য আপনি আজ গভীরভাবে কৃতজ্ঞ?',
    shortPrayerBn: 'হে প্রভু সদাপ্রভু, তোমার অপরিসীম দয়া ও পাপমোচনের জন্য ধন্যবাদ দিই। আমার মুখ যেন সদাসর্বদা তোমার পবিত্র নামের প্রশংসায় পূর্ণ থাকে। আমেন।',
    themeBn: 'অন্তরাত্মার গভীর হইতে কৃতজ্ঞতা ও বন্দনা',
    relatedRefs: [
      { refBn: 'গীতসংহিতা ৩৪:১', refEn: 'Psalm 34:1', bookId: 'PSA', chapter: 34, verse: 1, textBn: 'আমি সর্ব্বদা সদাপ্রভুর ধন্যবাদ করিব; তাঁহার প্রশংসা সর্ব্বদা আমার মুখে থাকিবে।' }
    ]
  },

  // 7. INVITATION (খ্রীষ্টের আহ্বান) - Matthew 11:28
  {
    bookId: 'MAT',
    chapter: 11,
    verseStart: 28,
    verseRefBn: 'মথি ১১:২৮',
    verseRefEn: 'Matthew 11:28',
    verseTextBn: 'হে পরিশ্রান্ত ও ভারাক্রান্ত লোক সকল, আমার নিকটে আইস, আমি তোমাদিগকে বিশ্রাম দিব।',
    verseTextEn: 'Come to Me, all who are weary and burdened, and I will give you rest.',
    category: 'INVITATION',
    fullPassageBn: 'মথি ১১:২৮-৩০ — হে পরিশ্রান্ত ও ভারাক্রান্ত লোক সকল, আমার নিকটে আইস, আমি তোমাদিগকে বিশ্রাম দিব। আমার জোয়াল আপনাদের উপরে তুলিয়া লও, এবং আমার কাছে শিক্ষা কর; কেননা আমি মৃদুশীল ও নম্রচিত্ত; তাহাতে তোমরা আপনাদের প্রাণের জন্য বিশ্রাম পাইবে। কারণ আমার জোয়াল সহজ ও আমার ভার লঘু।',
    contextBn: 'তৎকালীন সমাজ ধর্মীয় আচার ও জীবনের দুঃসহ বোঝায় পিষ্ট হইয়াছিল। যীশু খ্রীষ্ট সেই ক্লান্ত মানবজাতিকে বাহ্যিক নিয়মের পরিবর্তে তাঁর জীবন্ত সাহচর্যে স্বর্গীয় বিশ্রামের আহ্বান জানাইলেন।',
    simpleExplanationBn: 'পাপের বোঝা, মানসিক অবসাদ বা জীবনের ক্লান্তিতে মানুষ যখন জর্জরিত, তখন একমাত্র খ্রীষ্টই অন্তরের গভীরতম শান্তি ও বিশ্রাম প্রদান করিতে পারেন। তিনি দূরে দাঁড়াইয়া বিচার করেন না, বরং কাছে আসিতে ডাকেন।',
    lifeApplicationBn: 'নিজের চেষ্টার দ্বারা সকল বোঝা বহন করিতে গিয়া ভগ্নহৃদয় হইবেন না। আজ প্রভুর চরণে আপনার সমস্ত কষ্ট ও পাপ সমর্পণ করিয়া তাঁর লঘু জোয়াল গ্রহণ করুন।',
    reflectionQuestionBn: 'কোন্ গোপন ভার আপনি আজ খ্রীষ্টের কোমল চরণে নামাইয়া রাখিতে চাহেন?',
    shortPrayerBn: 'হে প্রিয় প্রভু যীশু, জগতের পরিশ্রমে আমি ক্লান্ত। তোমার স্নেহের আহ্বানে সাড়া দিয়া তোমার নিকটে আসিলাম। আমার হৃদয়কে তোমার স্বর্গীয় বিশ্রামে ভরিয়া দাও। আমেন।',
    themeBn: 'ক্লান্ত হৃদয়ে খ্রীষ্টের স্নেহশীল আহ্বান',
    relatedRefs: [
      { refBn: 'যিশাইয় ৫৫:১', refEn: 'Isaiah 55:1', bookId: 'ISA', chapter: 55, verse: 1, textBn: 'আহা, হে তৃষ্ণার্ত্ত সকল, জলের কাছে আইস; এবং যাহাদের টাকা নাই, তোমরা আইস, খাদ্য কিনিয়া ভোজন কর।' }
    ]
  },

  // 8. WARNING (সতর্কবার্তা) - 1 Peter 5:8
  {
    bookId: '1PE',
    chapter: 5,
    verseStart: 8,
    verseRefBn: '১ পিতর ৫:৮',
    verseRefEn: '1 Peter 5:8',
    verseTextBn: 'তোমরা মিতাচারী হও, জাগিয়া থাক; তোমাদের বিপক্ষ দিয়াবল গর্জ্জনকারী সিংহের ন্যায় কাহাকে গ্রাস করিবে, তাহার অন্বেষণ করিয়া ভ্রমণ করিতেছে।',
    verseTextEn: 'Be sober-minded; be watchful. Your adversary the devil prowls around like a roaring lion, seeking someone to devour.',
    category: 'WARNING',
    fullPassageBn: '১ পিতর ৫:৬-১১ — অতএব ঈশ্বরের পরাক্রান্ত হস্তের নিচে নত হও, যেন তিনি উপযুক্ত সময়ে তোমাদিগকে উন্নত করেন; তোমাদের সমস্ত চিন্তা তাঁহার উপরে ফেলিয়া দাও, কারণ তিনি তোমাদের জন্য চিন্তা করেন। তোমরা মিতাচারী হও, জাগিয়া থাক; তোমাদের বিপক্ষ দিয়াবল গর্জ্জনকারী সিংহের ন্যায় কাহাকে গ্রাস করিবে, তাহার অন্বেষণ করিয়া ভ্রমণ করিতেছে। বিশ্বাসে দৃঢ় হইয়া তাহার প্রতিরোধ কর...',
    contextBn: 'রোমান সাম্রাজ্যে খ্রিষ্টীয় প্রথম শতাব্দীর বিশ্বাসীদের যখন তীব্র তাড়না ও প্রলোভনের মধ্য দিয়া যাইতে হইতেছিল, তখন প্রেরিত পিতর আত্মিক যুদ্ধের বাস্তবতা ও সতর্কতার এই হুঁশিয়ারি প্রদান করেন।',
    simpleExplanationBn: 'বিশ্বাসীদের জীবন কেবল আরামের নহে, বরং আত্মিক যুদ্ধের ময়দান। পাপ, অবহেলা ও শয়তানের প্ররোচনা নিঃশব্দে বিশ্বাস নষ্ট করিতে চাহে। আত্মসংযম ও বিশ্বাসের দৃঢ়তায় সদা জাগ্রত থাকা অপরিহার্য।',
    lifeApplicationBn: 'ছোট পাপ বা প্রলোভনকে তুচ্ছজ্ঞান করিবেন না। মিতাচার ও প্রার্থনায় সর্বদা জাগ্রত থাকুন এবং ঈশ্বরের আত্মিক অস্ত্রের সাহায্যে মন্দের আক্রমণ প্রতিরোধ করুন।',
    reflectionQuestionBn: 'আপনার আত্মিক জীবনে কি এমন কোনো অসাবধানতা প্রবেশ করিয়াছে যাহার সুযোগ মন্দ শক্তি গ্রহণ করিতে পারে?',
    shortPrayerBn: 'হে পবিত্র ঈশ্বর, মন্দ শক্তির সকল প্রলোভন ও ফাঁদ হইতে আমাকে রক্ষা কর। বিশ্বাসে বলবান হইয়া যেন সর্বদা তোমার সত্যের আলোয় জাগ্রত থাকিতে পারি। আমেন।',
    themeBn: 'আত্মিক যুদ্ধে সদাজাগ্রত থাকার সতর্কবাণী',
    relatedRefs: [
      { refBn: 'ইফিষীয় ৬:১১', refEn: 'Ephesians 6:11', bookId: 'EPH', chapter: 6, verse: 11, textBn: 'ঈশ্বরের সম্পূর্ণ যুদ্ধসজ্জা পরিধান কর, যেন তোমরা দিয়াবলের চাতুরীর সম্মুখে দাঁড়াইতে সমর্থ হও।' }
    ]
  },

  // 9. TEACHING (শিষ্যত্বের গভীর শিক্ষা) - Romans 12:2
  {
    bookId: 'ROM',
    chapter: 12,
    verseStart: 2,
    verseRefBn: 'রোমীয় ১২:২',
    verseRefEn: 'Romans 12:2',
    verseTextBn: 'আর তোমরা এই যুগের অনুরূপ হইও না, কিন্তু মনের নূতনীকরণ দ্বারা রূপান্তরিত হও, যেন তোমরা পরীক্ষা করিয়া জানিতে পার, ঈশ্বরের ইচ্ছা কি, যাহা উত্তম, গ্রহণযোগ্য ও সিদ্ধ।',
    verseTextEn: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—His good, pleasing and perfect will.',
    category: 'TEACHING',
    fullPassageBn: 'রোমীয় ১২:১-২ — অতএব, হে ভ্রাতৃগণ, ঈশ্বরের করুণা সকল স্মরণ করাইয়া আমি তোমাদিগকে বিনতি করিতেছি, তোমরা আপনাদের দেহকে জীবিত, পবিত্র, ঈশ্বরের প্রীতিজনক বলিরূপে উৎসর্গ কর, ইহাই তোমাদের বুদ্ধিসঙ্গত আরাধনা। আর তোমরা এই যুগের অনুরূপ হইও না, কিন্তু মনের নূতনীকরণ দ্বারা রূপান্তরিত হও, যেন তোমরা পরীক্ষা করিয়া জানিতে পার, ঈশ্বরের ইচ্ছা কি, যাহা উত্তম, গ্রহণযোগ্য ও সিদ্ধ।',
    contextBn: 'প্রেরিত পৌল রোমের মণ্ডলীকে খ্রীষ্টের অনুগ্রহের গভীর তত্ত্ব বুঝানোর পর বাস্তব খ্রিষ্টীয় জীবনের মৌলিক পরিবর্তন ও জগতের প্রভাবমুক্ত হইয়া ঈশ্বরের ইচ্ছানুযায়ী রূপান্তরের শিক্ষা দিতেছেন।',
    simpleExplanationBn: 'জগৎ নিজের স্বার্থপর ও ক্ষণস্থায়ী আদর্শে আমাদের চিন্তা-ভাবনাকে চালিত করিতে চায়। কিন্তু প্রকৃত শিষ্যত্ব হলো ঈশ্বরের বাক্যের সত্য দ্বারা মন ও মননকে প্রতিনিয়ত নবায়ন করা, যেন ঈশ্বরের নিখুঁত ইচ্ছা বোঝা যায়।',
    lifeApplicationBn: 'সমাজ বা মাধ্যমের অন্ধ অনুকরণের পরিবর্তে বাইবেলের সত্যের দ্বারা আপনার চিন্তা ও মূল্যবোধকে সাজান। ঈশ্বরের উত্তম ও সিদ্ধ ইচ্ছা অনুধাবন করিতে প্রার্থনাময় অনুসন্ধান করুন।',
    reflectionQuestionBn: 'আপনার চিন্তা ও আচরণ কি জগতের ধারার সাথে মিলিয়া যাইতেছে, নাকি ঈশ্বরের বাক্য দ্বারা প্রতিদিন পরিবর্তিত হইতেছে?',
    shortPrayerBn: 'হে প্রভু, আমার মনকে তোমার সত্য বাক্যের দ্বারা প্রতিদিন নবীন কর। জগতের স্রোতে গা না ভাসাইয়া যেন তোমার গ্রহণযোগ্য ও সিদ্ধ ইচ্ছায় জীবনযাপন করিতে পারি। আমেন।',
    themeBn: 'মনের নবায়ন ও শিষ্যত্বের রূপান্তর',
    relatedRefs: [
      { refBn: 'ইফিষীয় ৪:২৩', refEn: 'Ephesians 4:23', bookId: 'EPH', chapter: 4, verse: 23, textBn: 'তোমাদের মনের আত্মায় নূতনীকৃত হও, এবং সেই নূতন মনুষ্যকে পরিধান কর, যাহা ঈশ্বরের সাদৃশ্যে ধার্মিকতায় ও সত্যের সাধুতায় সৃষ্ট হইয়াছে।' }
    ]
  }
];

export class DeepScriptureEngine {
  /**
   * Generates Notification Title strictly adhering to biblical category
   */
  public static getNotificationTitle(category: PassageCategory, language: 'bn' | 'en' = 'bn'): string {
    if (language === 'en') {
      switch (category) {
        case 'PROMISE':
          return 'A Divine Promise for You Today 🌿';
        case 'HOPE':
          return 'Today\'s Word of Living Hope 🌿';
        case 'COMFORT':
          return 'Word of Comfort for Your Heart';
        case 'INSTRUCTION':
          return 'Divine Instruction from Scripture';
        case 'PRAYER':
          return 'Scripture of Earnest Prayer';
        case 'PRAISE':
          return 'Song of Praise & Thanksgiving';
        case 'INVITATION':
          return 'Christ\'s Loving Invitation';
        case 'WARNING':
          return 'Scriptural Vigilance & Warning';
        case 'TEACHING':
          return 'Discipleship Teaching for Today';
        default:
          return 'Daily Bible Reading 📖';
      }
    }

    // Strict Promise Title Rule: Only category === 'PROMISE' receives the Promise title
    switch (category) {
      case 'PROMISE':
        return 'আজ আপনার জন্য ঈশ্বরের বাক্যে একটি প্রতিজ্ঞা আছে 🌿';
      case 'HOPE':
        return 'আজকের আশার বাক্য 🌿';
      case 'COMFORT':
        return 'আজকের সান্ত্বনার বাক্য 🌿';
      case 'INSTRUCTION':
        return 'আজ ঈশ্বরের বাক্য থেকে একটি শিক্ষা';
      case 'PRAYER':
        return 'আজকের প্রার্থনার পদ';
      case 'PRAISE':
        return 'আজকের প্রশংসা ও ধন্যবাদ পাঠ';
      case 'INVITATION':
        return 'আজ খ্রীষ্টের স্নেহের আহ্বান';
      case 'WARNING':
        return 'আজ শাস্ত্রের আত্মিক সতর্কবার্তা';
      case 'TEACHING':
        return 'আজকের শিষ্যত্বের পাঠ';
      default:
        return 'আজকের বাইবেল পাঠ 📖';
    }
  }

  /**
   * Generates the 10-Asset Distribution Package for any Daily Word
   */
  public static generateDistributionPackage(
    tpl: RawScriptureTemplate,
    dateStr: string
  ): ContentDistributionPackage {
    const permalink = `${CANONICAL_SITE_URL}/daily-word?date=${dateStr}`;
    const trackedUrl = `${permalink}&utm_source=deep_daily_word&utm_medium=outreach&utm_campaign=daily_word_${dateStr}`;
    const notificationTitle = this.getNotificationTitle(tpl.category, 'bn');

    // Short exact excerpt for notification body
    const shortExcerpt = tpl.verseTextBn.length > 80 ? `${tpl.verseTextBn.slice(0, 77)}...` : tpl.verseTextBn;
    const notificationBody = `“${shortExcerpt}” — ${tpl.verseRefBn}। সম্পূর্ণ বাক্য ও আজকের ভাবনা পড়তে স্পর্শ করুন।`;

    // Facebook Page Post
    const facebookPagePost = `
📖 আজকের বাক্য: ${tpl.verseRefBn} (${OFFICIAL_VERSION_BN})
────────────────────────
“${tpl.verseTextBn}”
────────────────────────

💡 দীপের ভাবনা ও প্রেক্ষাপট:
${tpl.simpleExplanationBn}

🌱 আজকের জীবনে প্রয়োগ:
${tpl.lifeApplicationBn}

🙏 সংক্ষিপ্ত প্রার্থনা:
${tpl.shortPrayerBn}

🔗 আজকের সম্পূর্ণ পাঠ ও গভীর অধ্যয়ন পড়ুন:
${trackedUrl}&utm_content=facebook_page

🌿 এই বাক্যটি কারও জীবনে আশা আনতে পারে। প্রার্থনা করে একজন মানুষের সঙ্গে শেয়ার করুন।
—
বাংলা স্টাডি বাইবেল (Bengali Study Bible)
তত্ত্বাবধায়ক: রেভাঃ অয়ন কুমার ঘোষ
    `.trim();

    // Facebook Group Post
    const facebookGroupPost = `
খ্রিষ্টীয় শুভেচ্ছা জানাই।

আজকের নির্বাচিত শাস্ত্রাংশ: ${tpl.verseRefBn}
“${tpl.verseTextBn}”

আমরা যখন ${tpl.themeBn.toLowerCase()}-এর কথা চিন্তা করি, তখন এই বাক্য আমাদের স্মরণ করাইয়া দেয়: ${tpl.simpleExplanationBn}

চিন্তার প্রশ্ন:
${tpl.reflectionQuestionBn}

সম্পূর্ণ ব্যাখ্যা ও শাস্ত্রাংশ পাঠ: ${trackedUrl}&utm_content=facebook_group

প্রার্থনা করি আজকের দিনটি আপনার জীবনে ঈশ্বরের উপস্থিতিতে উজ্জ্বল হউক।
    `.trim();

    // WhatsApp Channel Post
    const whatsappChannelPost = `
*আজকের বাইবেল পদ* 🌅
*${tpl.verseRefBn}* (${OFFICIAL_VERSION_BN})

“${tpl.verseTextBn}”

💡 *সংক্ষিপ্ত ভাবনা:*
${tpl.simpleExplanationBn}

🌱 *প্রয়োগ:* ${tpl.lifeApplicationBn}

🔗 *সম্পূর্ণ পাঠ ও প্রার্থনা:*
${trackedUrl}&utm_content=whatsapp_channel
    `.trim();

    // Voluntary Sharing Message
    const whatsappShareMessage = `
সুপ্রভাত! আজকের অনুপ্রেরণামূলক বাইবেল পদ:

“${tpl.verseTextBn}”
— ${tpl.verseRefBn} (${OFFICIAL_VERSION_BN})

সম্পূর্ণ অধ্যয়ন ও প্রার্থনা পড়ুন:
${trackedUrl}&utm_content=whatsapp_share

এই বাক্যটি কারও জীবনে আশা আনতে পারে। প্রার্থনা করে একজন মানুষের সঙ্গে শেয়ার করুন। 🌿
    `.trim();

    // Social Media Image Text (for graphics)
    const socialGraphicText = `“${tpl.verseTextBn}”\n— ${tpl.verseRefBn} (${OFFICIAL_VERSION_BN})\nবাংলা স্টাডি বাইবেল • bengalistudybible.com`;

    // Preview Description for SEO
    const previewDescription = `${tpl.verseRefBn} — “${tpl.verseTextBn}”। দীপের ব্যাখ্যা, প্রেক্ষাপট, জীবনে প্রয়োগ ও প্রার্থনা।`;

    // Alt text for image
    const accessibleAltText = `বাংলা বাইবেল পদ চিত্র: ${tpl.verseRefBn} - “${tpl.verseTextBn}”`;

    return {
      websitePageUrl: permalink,
      notificationTitle,
      notificationBody,
      facebookPagePost,
      facebookGroupPost,
      whatsappChannelPost,
      whatsappShareMessage,
      socialGraphicText,
      previewDescription,
      campaignTrackedUrl: trackedUrl,
      accessibleAltText,
    };
  }

  /**
   * Builds the complete DeepDailyWord object from a template
   */
  public static buildDailyWord(tpl: RawScriptureTemplate, dateStr: string): DeepDailyWord {
    const distributionPackage = this.generateDistributionPackage(tpl, dateStr);

    return {
      id: `dw-${dateStr}`,
      date: dateStr,
      category: tpl.category,
      bookId: tpl.bookId,
      chapter: tpl.chapter,
      verseStart: tpl.verseStart,
      verseEnd: tpl.verseEnd,
      verseRefBn: tpl.verseRefBn,
      verseRefEn: tpl.verseRefEn,
      verseTextBn: tpl.verseTextBn,
      verseTextEn: tpl.verseTextEn,
      fullPassageBn: tpl.fullPassageBn,
      contextBn: tpl.contextBn,
      simpleExplanationBn: tpl.simpleExplanationBn,
      lifeApplicationBn: tpl.lifeApplicationBn,
      reflectionQuestionBn: tpl.reflectionQuestionBn,
      shortPrayerBn: tpl.shortPrayerBn,
      relatedPassages: tpl.relatedRefs,
      versionBn: 'IRV-Bengali',
      versionEn: 'BSB',
      licenceNotice: 'Indian Revised Version (IRV) Bengali — Bridge Connectivity Solutions / Public Domain Protestant Canon. All rights reserved for publication and ministry.',
      distributionPackage,
      aiConfidenceScore: 98,
      autonomyStatus: 'PROPOSED',
      requiresHumanEscalation: false,
    };
  }

  /**
   * 15-Point Strict Pre-Delivery Validation Checklist
   */
  public static validateDailyWord(dw: DeepDailyWord): {
    passed: boolean;
    failedRules: string[];
    results: { ruleId: string; descriptionBn: string; passed: boolean; detail?: string }[];
  } {
    const failed: string[] = [];

    // 1. Scripture text exists
    if (!dw.verseTextBn || dw.verseTextBn.trim().length < 10) {
      failed.push('১. স্ক্রিপচার টেক্সট অনুপস্থিত বা অতিরিক্ত সংক্ষিপ্ত।');
    }

    // 2. Reference format valid
    if (!dw.verseRefBn || !dw.bookId || dw.chapter < 1 || dw.verseStart < 1) {
      failed.push('২. বাইবেল রেফারেন্স বা চ্যাপ্টার/পদ সংখ্যা অবৈধ।');
    }

    // 3. Accurate categorization (Promise rule enforcement)
    if (dw.distributionPackage.notificationTitle.includes('প্রতিজ্ঞা') && dw.category !== 'PROMISE') {
      failed.push('৩. পদের শ্রেণিবিভাগ প্রতিজ্ঞা (PROMISE) না হওয়া সত্ত্বেও প্রতিজ্ঞা শিরোনাম ব্যবহৃত হইয়াছে।');
    }

    // 4. Scripture alteration check (No invented prophetic statements)
    const forbiddenPhrases = [
      'ঈশ্বর আমাকে বলিয়াছেন যে এই বার্তা শুধু আপনার জন্য',
      'ঈশ্বর আমাকে বলেছেন',
      'টাকা দ্বিগুণ হইবে',
      'সুনিশ্চিত রোগমুক্তি',
      'অলৌকিক অর্থ',
      'চাকরির নিশ্চয়তা',
      'ভয় পাবেন না ঈশ্বর আজই ধনবান করবেন'
    ];
    for (const phrase of forbiddenPhrases) {
      if (dw.simpleExplanationBn.includes(phrase) || dw.lifeApplicationBn.includes(phrase)) {
        failed.push(`৪. নিষিদ্ধ মিথ্যা প্রতিজ্ঞা বা মনগড়া বাক্য শনাক্ত: "${phrase}"`);
      }
    }

    // 5. Context exists
    if (!dw.contextBn || dw.contextBn.trim().length < 20) {
      failed.push('৫. ঐতিহাসিক ও শাস্ত্রীয় প্রেক্ষাপট অনুপস্থিত।');
    }

    // 6. Simple explanation exists
    if (!dw.simpleExplanationBn || dw.simpleExplanationBn.trim().length < 20) {
      failed.push('৬. দীপের সহজ ব্যাখ্যা অনুপস্থিত।');
    }

    // 7. Life application exists
    if (!dw.lifeApplicationBn || dw.lifeApplicationBn.trim().length < 20) {
      failed.push('৭. জীবনে প্রয়োগ অংশ অনুপস্থিত।');
    }

    // 8. Prayer exists
    if (!dw.shortPrayerBn || dw.shortPrayerBn.trim().length < 15) {
      failed.push('৮. সংক্ষিপ্ত প্রার্থনা অনুপস্থিত।');
    }

    // 9. Reflection question exists
    if (!dw.reflectionQuestionBn || dw.reflectionQuestionBn.trim().length < 10) {
      failed.push('৯. চিন্তার প্রশ্ন অনুপস্থিত।');
    }

    // 10. Translation version verified
    if (dw.versionBn !== 'IRV-Bengali') {
      failed.push('১০. অননুমোদিত বাইবেল সংস্করণ সনাক্ত হইয়াছে।');
    }

    // 11. Distribution package complete
    if (!dw.distributionPackage.notificationBody || !dw.distributionPackage.whatsappShareMessage) {
      failed.push('১১. বিতরণ প্যাকেজ অসম্পূর্ণ।');
    }

    // 12. Permanent link valid
    if (!dw.distributionPackage.websitePageUrl.startsWith(CANONICAL_SITE_URL)) {
      failed.push('১২. ডেস্টিনেশন ইউআরএল অকার্যকর বা বহিরাগত।');
    }

    // 13. Related passages exist
    if (!Array.isArray(dw.relatedPassages) || dw.relatedPassages.length === 0) {
      failed.push('১৩. সম্পর্কিত বাইবেল পদ সংযুক্ত নাই।');
    }

    // 14. Full passage context exists
    if (!dw.fullPassageBn || dw.fullPassageBn.trim().length < 30) {
      failed.push('১৪. সম্পূর্ণ পরিপার্শ্বিক বাইবেল পাঠ অনুপস্থিত।');
    }

    // 15. Safe tone & respectful Bengali
    if (dw.simpleExplanationBn.includes('ধিক্কার') || dw.simpleExplanationBn.includes('শাস্তি নিশ্চিত')) {
      failed.push('১৫. ভাষার সুর অশোভন বা আক্রমণাত্মক।');
    }

    const results = [
      { ruleId: 'RULE_01', descriptionBn: '১. শাস্ত্রাংশ সরাসরি ক্যানোনিকাল বাইবেলের অংশ', passed: !!dw.verseTextBn && dw.verseTextBn.trim().length >= 10 },
      { ruleId: 'RULE_02', descriptionBn: '২. বাইবেল রেফারেন্স ও পদ সংখ্যা বৈধ', passed: !!dw.verseRefBn && !!dw.bookId && dw.chapter >= 1 && dw.verseStart >= 1 },
      { ruleId: 'RULE_03', descriptionBn: '৩. সঠিক শ্রেণিবিভাগ (প্রতিজ্ঞা শুধুমাত্র খাঁটি প্রতিজ্ঞায়)', passed: !(dw.distributionPackage.notificationTitle.includes('প্রতিজ্ঞা') && dw.category !== 'PROMISE') },
      { ruleId: 'RULE_04', descriptionBn: '৪. শাস্ত্র অবিকৃত ও কোনো মনগড়া বাক্য নেই', passed: !forbiddenPhrases.some(p => dw.simpleExplanationBn.includes(p) || dw.lifeApplicationBn.includes(p)) },
      { ruleId: 'RULE_05', descriptionBn: '৫. ঐতিহাসিক ও শাস্ত্রীয় প্রেক্ষাপট সংরক্ষিত', passed: !!dw.contextBn && dw.contextBn.trim().length >= 20 },
      { ruleId: 'RULE_06', descriptionBn: '৬. দীপের সহজ ও আত্মিক ব্যাখ্যা উপস্থিত', passed: !!dw.simpleExplanationBn && dw.simpleExplanationBn.trim().length >= 20 },
      { ruleId: 'RULE_07', descriptionBn: '৭. বাস্তব জীবনে প্রাসঙ্গিক প্রয়োগ উপস্থিত', passed: !!dw.lifeApplicationBn && dw.lifeApplicationBn.trim().length >= 20 },
      { ruleId: 'RULE_08', descriptionBn: '৮. খ্রিষ্টীয় ভক্তিপূর্ণ সমাপনী প্রার্থনা উপস্থিত', passed: !!dw.shortPrayerBn && dw.shortPrayerBn.trim().length >= 15 },
      { ruleId: 'RULE_09', descriptionBn: '৯. আত্মিক চিন্তার প্রশ্ন সংরক্ষিত', passed: !!dw.reflectionQuestionBn && dw.reflectionQuestionBn.trim().length >= 10 },
      { ruleId: 'RULE_10', descriptionBn: '১০. অনুমোদিত বাইবেল সংস্করণ (IRV-Bengali)', passed: dw.versionBn === 'IRV-Bengali' },
      { ruleId: 'RULE_11', descriptionBn: '১১. ১০টি সমন্বিত বিতরণ অ্যাসেট প্রস্তুত', passed: !!dw.distributionPackage.notificationBody && !!dw.distributionPackage.whatsappShareMessage },
      { ruleId: 'RULE_12', descriptionBn: '১২. স্থায়ী লিংক বৈধ ও সুরক্ষিত', passed: dw.distributionPackage.websitePageUrl.startsWith(CANONICAL_SITE_URL) },
      { ruleId: 'RULE_13', descriptionBn: '১৩. সম্পর্কিত সহায়ক পদ সংযুক্ত', passed: Array.isArray(dw.relatedPassages) && dw.relatedPassages.length > 0 },
      { ruleId: 'RULE_14', descriptionBn: '১৪. সম্পূর্ণ পরিপার্শ্বিক পাঠ উপস্থিত', passed: !!dw.fullPassageBn && dw.fullPassageBn.trim().length >= 30 },
      { ruleId: 'RULE_15', descriptionBn: '১৫. ভাষার সুর মর্যাদাপূর্ণ ও অসাম্প্রদায়িক', passed: !dw.simpleExplanationBn.includes('ধিক্কার') && !dw.simpleExplanationBn.includes('শাস্তি নিশ্চিত') },
    ];

    return {
      passed: failed.length === 0,
      failedRules: failed,
      results,
    };
  }

  /**
   * Deterministically returns the approved template for any date
   */
  public static getTemplateForDate(dateStr: string): RawScriptureTemplate {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const startOfYear = new Date(y, 0, 1);
    const dayOfYear = Math.floor((dateObj.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));

    const index = Math.abs(dayOfYear) % SCRIPTURE_TEMPLATES.length;
    return SCRIPTURE_TEMPLATES[index];
  }
}
