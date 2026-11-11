// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// SOCIAL MEDIA EDITORIAL & VISUAL TEMPLATES
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import { PostTemplate } from '../../types/social';

export const SOCIAL_TEMPLATES: PostTemplate[] = [
  {
    id: 'tmpl-mon-character',
    dayOfWeek: 'MONDAY',
    contentType: 'CHARACTER',
    nameBn: 'সোমবার — বাইবেলের চরিত্র (Character Study)',
    nameEn: 'Monday — Biblical Character',
    primaryColor: '#0b132b',    // Deep Navy
    accentColor: '#d97706',     // Warm Gold
    backgroundColor: '#f8fafc', // Warm Slate White
    textColor: '#0f172a',
    defaultCtaBn: 'এই চরিত্রের জীবন, সংশ্লিষ্ট পদ ও ঐতিহাসিক প্রেক্ষাপট আরও গভীরভাবে অধ্যয়নের জন্য বাংলা স্টাডি বাইবেল ব্যবহার করুন।',
    guidelinesBn: 'চরিত্রের মূল শাস্ত্রাংশ, জীবনের সংকট, ঈশ্বরের বিশ্বস্ততা, চারিত্রিক শক্তি-দুর্বলতা এবং আমাদের জীবনের শিক্ষা সহজ ও হৃদয়স্পর্শীভাবে উপস্থাপন করুন।',
  },
  {
    id: 'tmpl-tue-quiz',
    dayOfWeek: 'TUESDAY',
    contentType: 'QUIZ',
    nameBn: 'মঙ্গলবার — বাইবেল কুইজ (Interactive Quiz)',
    nameEn: 'Tuesday — Bible Quiz',
    primaryColor: '#1e1b4b',    // Deep Indigo
    accentColor: '#f59e0b',     // Amber Gold
    backgroundColor: '#fdfbf7', // Warm Off-White
    textColor: '#1e293b',
    defaultCtaBn: 'সঠিক উত্তর ও সংশ্লিষ্ট শাস্ত্রাংশের পূর্ণ প্রেক্ষাপট বাংলা স্টাডি বাইবেলে অনুসন্ধান করুন।',
    guidelinesBn: 'সরাসরি শাস্ত্রসম্মত সহজ বা চিন্তাশীল প্রশ্ন। কমেন্টে উত্তর জানাতে উৎসাহিত করুন; সঠিক রেফারেন্স যাচাই ব্যতিরেকে কোনো তথ্য লিখবেন না।',
  },
  {
    id: 'tmpl-wed-verse',
    dayOfWeek: 'WEDNESDAY',
    contentType: 'VERSE_STUDY',
    nameBn: 'বুধবার — পদ অধ্যয়ন (Verse Study)',
    nameEn: 'Wednesday — Verse Study',
    primaryColor: '#064e3b',    // Deep Emerald
    accentColor: '#fbbf24',     // Warm Gold
    backgroundColor: '#f0fdf4', // Mint Tint
    textColor: '#064e3b',
    defaultCtaBn: 'পদটির মূল গ্রিক/হিব্রু অর্থ, প্রেক্ষাপট ও Cross Reference দেখতে বাংলা স্টাডি বাইবেলে অধ্যয়ন করুন।',
    guidelinesBn: 'আইআরভি বাংলা থেকে অনুমোদিত পদ উদ্ধৃতি, ঐতিহাসিক প্রেক্ষাপট, মূল আত্মিক ভাবার্থ ও বাস্তব জীবনের প্রয়োগ।',
  },
  {
    id: 'tmpl-thu-deep-study',
    dayOfWeek: 'THURSDAY',
    contentType: 'DEEP_STUDY',
    nameBn: 'বৃহস্পতিবার — গভীর বাইবেল অধ্যয়ন (Theological Study)',
    nameEn: 'Thursday — Deep Bible Study',
    primaryColor: '#0f172a',    // Dark Navy
    accentColor: '#eab308',     // Rich Gold
    backgroundColor: '#fafaf9', // Stone Parchment
    textColor: '#1c1917',
    defaultCtaBn: 'এই শাস্ত্রীয় বিষয়ে বিস্তারিত ধর্মতাত্ত্বিক নোট ও রেফারেন্স পড়তে বাংলা স্টাডি বাইবেল খুলুন।',
    guidelinesBn: 'শাস্ত্র কী বলে -> শাস্ত্রের ব্যাখ্যা -> জীবনের প্রয়োগ স্পষ্টভাবে পৃথক রাখুন। কোনো মনগড়া মতবাদ নয়, বিশুদ্ধ শাস্ত্রীয় ভিত্তি।',
  },
  {
    id: 'tmpl-fri-question',
    dayOfWeek: 'FRIDAY',
    contentType: 'QUESTION',
    nameBn: 'শুক্রবার — বাইবেল প্রশ্ন (Biblical Question)',
    nameEn: 'Friday — Biblical Question',
    primaryColor: '#312e81',    // Deep Midnight
    accentColor: '#f59e0b',     // Gold
    backgroundColor: '#f5f3ff', // Soft Indigo
    textColor: '#1e1b4b',
    defaultCtaBn: 'কঠিন শাস্ত্রীয় প্রশ্নের সন্তোষজনক ও দায়িত্বশীল উত্তর জানতে বাংলা স্টাডি বাইবেলে অনুসন্ধান করুন।',
    guidelinesBn: 'বিশ্বাসীদের বাস্তব মনের প্রশ্ন নিয়ে আলোচনা। কোনো প্রকার সস্তা ধর্মতাত্ত্বিক বিতর্ক না উস্কে গঠনমূলক শাস্ত্রীয় অন্তর্দৃষ্টি প্রদান।',
  },
  {
    id: 'tmpl-sat-discussion',
    dayOfWeek: 'SATURDAY',
    contentType: 'DISCUSSION',
    nameBn: 'শনিবার — সম্প্রদায় আলোচনা ও মতামত (Community Research)',
    nameEn: 'Saturday — Community Discussion',
    primaryColor: '#0c4a6e',    // Deep Ocean
    accentColor: '#38bdf8',     // Sky Blue / Gold
    backgroundColor: '#f0f9ff', // Soft Sky
    textColor: '#082f49',
    defaultCtaBn: 'আপনার অধ্যয়নের প্রয়োজনীয় টুলস ও বাংলা রেফারেন্স সাজাতে বাংলা স্টাডি বাইবেলকে সমৃদ্ধ করুন।',
    guidelinesBn: 'ব্যবহারকারীদের প্রকৃত বাইবেল পড়ার বাধা, কঠিন পুস্তক বা চাহিদার ওপর প্রশ্ন। এটি প্রডাক্ট উন্নয়নের মূল উৎস।',
  },
  {
    id: 'tmpl-sun-sermon',
    dayOfWeek: 'SUNDAY',
    contentType: 'SERMON',
    nameBn: 'রবিবার — সার্মন ভাবনা ও প্রার্থনা (Sunday Sermon & Reflection)',
    nameEn: 'Sunday — Sermon / Bible Study',
    primaryColor: '#451a03',    // Warm Saddle Navy / Amber
    accentColor: '#f59e0b',     // Gold
    backgroundColor: '#fffbeb', // Warm Gold Tint
    textColor: '#78350f',
    defaultCtaBn: 'প্রচার প্রস্তুতি ও সার্মন রূপরেখা তৈরি করতে বাংলা স্টাডি বাইবেলের সার্মন বিল্ডার ব্যবহার করুন।',
    guidelinesBn: 'রবিবাসরীয় প্রার্থনাময় ভাবার্থ, মূল বার্তা (Big Idea), ৩টি প্রয়োগমূলক পয়েন্ট এবং সমাপনী প্রার্থনা।',
  },
];

export const WEEKLY_TEMPLATES: PostTemplate[] = SOCIAL_TEMPLATES;

export function getTemplateByDay(day: string): PostTemplate {
  return (
    SOCIAL_TEMPLATES.find((t) => t.dayOfWeek === day.toUpperCase()) ||
    SOCIAL_TEMPLATES[0]
  );
}

export function getTemplateByContentType(type: string): PostTemplate {
  return (
    SOCIAL_TEMPLATES.find((t) => t.contentType === type.toUpperCase()) ||
    SOCIAL_TEMPLATES[0]
  );
}
