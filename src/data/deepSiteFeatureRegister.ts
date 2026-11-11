// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — Autonomous Site Steward and Operations Assistant”
// MASTER SITE FEATURE REGISTER (42 CORE MONITORED AREAS)
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import { SiteFeatureRecord } from '../types/deepSteward';

export const MASTER_SITE_FEATURE_REGISTER: SiteFeatureRecord[] = [
  // 1. Homepage
  {
    featureId: 'FEAT_01_HOMEPAGE',
    featureNameBn: 'হোমপেজ ও মূল পোর্টাল',
    featureNameEn: 'Homepage & Core Portal',
    urlOrLocation: '/',
    purposeBn: 'পাঠক ও গবেষকদের জন্য সম্পূর্ণ বাংলা স্টাডি বাইবেলের প্রধান প্রবেশদ্বার।',
    expectedBehaviorBn: 'দ্রুত লোডিং (<1.5s), অ্যাক্সেসিবল নেভিগেশন এবং কোনো লেআউট শিফট ব্যতিরেকে রেন্ডারিং।',
    dependencies: ['React Router', 'Tailwind CSS', 'Hero Components'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 2. Bible reader
  {
    featureId: 'FEAT_02_BIBLE_READER',
    featureNameBn: 'বাইবেল পাঠক কনসোল',
    featureNameEn: 'Interactive Bible Reader Console',
    urlOrLocation: '/bible',
    purposeBn: 'অধ্যায়ভিত্তিক বাইবেল পঠন, পদ নির্বাচন, ফন্ট নিয়ন্ত্রণ ও অধ্যয়ন টুলস।',
    expectedBehaviorBn: 'মসৃণ স্ক্রলিং, পদ নির্বাচন এবং দ্রুত বুকমার্কিং ও হাইলাইটিং।',
    dependencies: ['BibleService', 'PRELOADED_BIBLE_BOOKS', 'Font Controls'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 3. All 66 Bible books
  {
    featureId: 'FEAT_03_ALL_66_BOOKS',
    featureNameBn: 'সম্পূর্ণ ৬৬টি বাইবেল পুস্তক',
    featureNameEn: 'All 66 Protestant Canonical Books',
    urlOrLocation: '/bible (All Books)',
    purposeBn: 'আদিপুস্তক থেকে প্রকাশিত বাক্য পর্যন্ত ৬৬টি ঐতিহাসিক ক্যানোনিকাল গ্রন্থের অখণ্ড সংকলন।',
    expectedBehaviorBn: 'প্রতিটি বইয়ের সঠিক নাম, পুরাতন নিয়ম (৩৯) ও নতুন নিয়ম (২৭) বিন্যাস অক্ষুণ্ণ থাকা।',
    dependencies: ['src/data/books.ts', 'public/bible-data/irv/'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 4. Every available chapter and verse
  {
    featureId: 'FEAT_04_CHAPTERS_VERSES',
    featureNameBn: 'প্রতিটি অধ্যায় ও পদ (১,১৮৯ অধ্যায় ও ৩১,১০২ পদ)',
    featureNameEn: 'Every Chapter & Verse (1,189 Chapters, 31,102 Verses)',
    urlOrLocation: 'public/bible-data/irv/*.json',
    purposeBn: 'সম্পূর্ণ বাইবেলের মূলপাঠের প্রতিটি অধ্যায় ও পদের ডিজিটাল সংরক্ষণ ও প্রদর্শন।',
    expectedBehaviorBn: 'কোনো ফাঁকা পদ বা মিসিং চ্যাপ্টার থাকবে না; ইউনিকোড অক্ষর অবিকৃত থাকবে।',
    dependencies: ['BibleService.fetchBook', 'IRV JSON files'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'ADMIN_ONLY',
  },

  // 5. Bible versions
  {
    featureId: 'FEAT_05_BIBLE_VERSIONS',
    featureNameBn: 'বাইবেল সংস্করণসমূহ (IRV, কেরী ও BSB)',
    featureNameEn: 'Bible Versions (IRV-Bengali, Carey, BSB)',
    urlOrLocation: '/bible?version=irv',
    purposeBn: 'বিভিন্ন অনুমোদিত শাস্ত্রীয় সংস্করণের মধ্যে সমান্তরাল পাঠ ও তুলনামূলক অধ্যয়ন।',
    expectedBehaviorBn: 'অনুমোদিত সংস্করণগুলোর স্পষ্ট লেবেল ও কপিরাইট তথ্যাবলী সঠিক থাকা।',
    dependencies: ['RightsService', 'Version Selectors'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'ADMIN_ONLY',
  },

  // 6. Search
  {
    featureId: 'FEAT_06_SEARCH',
    featureNameBn: 'বাংলা বাইবেল অনুসন্ধান ইঞ্জিন',
    featureNameEn: 'Bengali Scripture Search Engine',
    urlOrLocation: '/bible?search=true',
    purposeBn: 'শব্দ, বাক্য ও ভাবভিত্তিক দ্রুত শাস্ত্রীয় অনুসন্ধান (<50ms)।',
    expectedBehaviorBn: 'বাংলা যুক্তাক্ষর ও ডায়াক্রিটিক্স সহ সঠিক পদ ফিল্টারিং।',
    dependencies: ['BibleService.searchIndex', 'searchWorker'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 7. Cross-references
  {
    featureId: 'FEAT_07_CROSS_REFERENCES',
    featureNameBn: 'সমান্তরাল পদ ও রেফারেন্স',
    featureNameEn: 'Scripture Cross-References',
    urlOrLocation: '/bible (Cross-ref drawer)',
    purposeBn: 'একটি পদের সঙ্গে অন্যান্য শাস্ত্রাংশের আন্তঃসম্পর্ক প্রদর্শন।',
    expectedBehaviorBn: 'ক্লিক করলে তাত্ক্ষণিক সংশ্লিষ্ট পদে স্থানান্তর বা প্রিভিউ প্রদর্শন।',
    dependencies: ['crossReferenceData.ts', 'BibleService'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 8. Study notes
  {
    featureId: 'FEAT_08_STUDY_NOTES',
    featureNameBn: 'ব্যক্তিগত স্টাডি নোটস',
    featureNameEn: 'Study Notes & Annotations',
    urlOrLocation: '/my-study/notes',
    purposeBn: 'পদভিত্তিক ব্যক্তিগত আত্মিক ভাবনা ও বিশ্লেষণ সংরক্ষণ।',
    expectedBehaviorBn: 'ডিভাইসে নিরাপদ সংরক্ষণ ও ক্লাউড সিঙ্ক ব্যাকআপ প্রস্তুতি।',
    dependencies: ['localStorage', 'StudyScreen'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 9. Ask Bible
  {
    featureId: 'FEAT_09_ASK_BIBLE',
    featureNameBn: 'বাইবেল জিজ্ঞাসা (Ask Bible)',
    featureNameEn: 'Ask Bible AI Thematic Companion',
    urlOrLocation: '/ask',
    purposeBn: 'ধর্মতাত্ত্বিক ও আত্মিক প্রশ্নের শাস্ত্রমূলক উত্তর অন্বেষণ।',
    expectedBehaviorBn: 'কখনো মনগড়া উত্তর নয়; সরাসরি শাস্ত্রীয় রেফারেন্স সহ দায়িত্বশীল ব্যাখ্যা।',
    dependencies: ['AskBibleScreen', 'TheologicalSafeguards'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 10. Sermon Builder
  {
    featureId: 'FEAT_10_SERMON_BUILDER',
    featureNameBn: 'সার্মন বিল্ডার (Sermon Builder)',
    featureNameEn: 'Pastor Sermon Builder',
    urlOrLocation: '/sermons',
    purposeBn: 'যাজক ও প্রচারকদের জন্য বাংলা খুতবা ও উপদেশমালা প্রস্তুতকরণ।',
    expectedBehaviorBn: 'পয়েন্ট বিন্যাস, আউটলাইন, প্রিন্ট ও স্লাইড এক্সপোর্ট সমর্থন।',
    dependencies: ['SermonBuilderScreen', 'SermonEditor'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 11. Bible Study Builder
  {
    featureId: 'FEAT_11_STUDY_BUILDER',
    featureNameBn: 'বাইবেল স্টাডি গাইড বিল্ডার',
    featureNameEn: 'Bible Study Outline Builder',
    urlOrLocation: '/study-builder',
    purposeBn: 'পারিবারিক ও দলগত বাইবেল অধ্যয়নের পাঠপরিকল্পনা তৈরি।',
    expectedBehaviorBn: 'প্রশ্নমালা ও প্রয়োগমূলক নির্দেশনাসমূহ সুষ্ঠুভাবে সংগঠিত করা।',
    dependencies: ['StudyTools', 'SermonExport'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 12. Pastor Tools
  {
    featureId: 'FEAT_12_PASTOR_TOOLS',
    featureNameBn: 'যাজক ও পালকীয় টুলস',
    featureNameEn: 'Pastoral Ministry & Care Tools',
    urlOrLocation: '/pastor-tools',
    purposeBn: 'মন্ডলী পরিচালনা, প্রার্থনা তালিকা ও খ্রিষ্টীয় সেবাকাজের সহায়ক টুলস।',
    expectedBehaviorBn: 'যাজকীয় নিরাপত্তা ও গোপনীয়তা রক্ষা করে সেবা প্রদান।',
    dependencies: ['PastorToolsScreen', 'ChurchToolsScreen'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 13. Daily Word
  {
    featureId: 'FEAT_13_DAILY_WORD',
    featureNameBn: 'দীপের দৈনিক বাক্য ও ব্যাখ্যা',
    featureNameEn: 'Deep Daily Word & Exposition',
    urlOrLocation: '/daily-word',
    purposeBn: 'প্রতিদিন সকাল ১০টার পূর্বে প্রেরিত সুপ্রভাত আত্মিক পাঠ ও প্রার্থনা।',
    expectedBehaviorBn: '১৫-দফা চেকলিস্টে উত্তীর্ণ, ১০টি অ্যাসেট প্রস্তুত এবং ৯টি সুনির্দিষ্ট ক্যাটাগরি রক্ষা।',
    dependencies: ['DeepDailyWordService', 'DeepScriptureEngine'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 14. Devotional tools
  {
    featureId: 'FEAT_14_DEVOTIONAL_TOOLS',
    featureNameBn: 'দৈনিক ভক্তিমূলক পাঠ ও মনন',
    featureNameEn: 'Daily Devotional Reading Tools',
    urlOrLocation: '/my-study/devotions',
    purposeBn: 'ধারাবাহিক পাঠপরিকল্পনা ও আত্মিক মনন ট্র্যাকিং।',
    expectedBehaviorBn: 'পাঠের অগ্রগতি সংরক্ষণ এবং স্মারক প্রদান।',
    dependencies: ['MyStudyScreen', 'DevotionChecklistModal'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 15. Bible quiz
  {
    featureId: 'FEAT_15_BIBLE_QUIZ',
    featureNameBn: 'বাইবেল কুইজ ও একাডেমি',
    featureNameEn: 'Bible Academy & Scripture Quiz',
    urlOrLocation: '/academy',
    purposeBn: 'শাস্ত্রীয় জ্ঞান যাচাই ও শিক্ষামূলক ইন্টারেক্টিভ কুইজ।',
    expectedBehaviorBn: 'সঠিক উত্তর যাচাই, ব্যাখ্যা ও ফলাফল মূল্যায়ন।',
    dependencies: ['AcademyScreen', 'tutorialData'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 16. Prayer tools
  {
    featureId: 'FEAT_16_PRAYER_TOOLS',
    featureNameBn: 'প্রার্থনা তালিকা ও স্মারক',
    featureNameEn: 'Prayer List & Reminder Tools',
    urlOrLocation: '/my-study/prayers',
    purposeBn: 'ব্যক্তিগত ও মন্ডলীর প্রার্থনার বিষয়সমূহ তালিকাভুক্তকরণ।',
    expectedBehaviorBn: 'গোপনীয়তা রক্ষা করে স্থানীয় ডিভাইসে সংরক্ষণ।',
    dependencies: ['MyStudyScreen', 'LocalStorage'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 17. User accounts
  {
    featureId: 'FEAT_17_USER_ACCOUNTS',
    featureNameBn: 'ব্যবহারকারী অ্যাকাউন্ট ও সিঙ্ক',
    featureNameEn: 'User Profile & Preferences',
    urlOrLocation: '/profile',
    purposeBn: 'ব্যবহারকারীর ব্যক্তিগত পছন্দসমূহ পরিচালনা।',
    expectedBehaviorBn: 'কোনো বাধ্যতামূলক পাসওয়ার্ড চাপিয়ে না দিয়ে সহজ ও নিরাপদ ব্যবহার।',
    dependencies: ['AuthService', 'LocalStoreWrapper'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 18. Guest access
  {
    featureId: 'FEAT_18_GUEST_ACCESS',
    featureNameBn: 'অতিথি পাঠক অ্যাক্সেস (Guest Access)',
    featureNameEn: 'Guest Unrestricted Access',
    urlOrLocation: 'Global',
    purposeBn: 'অ্যাকাউন্ট বা রেজিস্ট্রেশন ছাড়াই ১০০% বাইবেল পঠন ও ব্যবহারের স্বাধীনতা।',
    expectedBehaviorBn: 'কোনো পেওয়াল বা বাধ্যতামূলক লগইন পপআপ না দেখানো।',
    dependencies: ['AppRouter', 'SessionManager'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 19. Notifications
  {
    featureId: 'FEAT_19_NOTIFICATIONS',
    featureNameBn: 'ওয়েব পুশ ও ইমেইল নোটিফিকেশন',
    featureNameEn: 'Web Push & Email Notifications',
    urlOrLocation: 'sw.js / PushManager',
    purposeBn: 'সকাল ১০টার মধ্যে নির্বাচিত শাস্ত্রীয় পদ ও ভাবনা প্রেরণ।',
    expectedBehaviorBn: 'টাইমজোন অনুযায়ী সঠিক সময় বিতরণ, মৃত টোকেন ছাঁটাই ও রিট্রাই কিউ।',
    dependencies: ['sw.js', 'DeepDailyWordService', 'EmailNotificationService'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 20. PWA installation
  {
    featureId: 'FEAT_20_PWA_INSTALL',
    featureNameBn: 'পিডব্লিউএ অফলাইন ইনস্টলেশন',
    featureNameEn: 'PWA Mobile / Desktop Installation',
    urlOrLocation: '/install',
    purposeBn: 'অ্যাপ স্টোর ছাড়াই মোবাইল বা পিসিতে নেটিভ অ্যাপের মতো ইনস্টল ও অফলাইন পঠন।',
    expectedBehaviorBn: 'beforeinstallprompt হ্যান্ডলিং, ম্যানিফেস্ট বৈধতা ও সার্ভিস ওয়ার্কার ক্যাশিং।',
    dependencies: ['manifest.json', 'sw.js', 'InstallScreen'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 21. Tutorial
  {
    featureId: 'FEAT_21_TUTORIAL',
    featureNameBn: 'স্বাগতম টিউটোরিয়াল ও স্পটলাইট ট্যুর',
    featureNameEn: 'Welcome Onboarding & Spotlight Tour',
    urlOrLocation: 'WelcomeModal.tsx / SpotlightTourOverlay.tsx',
    purposeBn: 'নতুন পাঠকদের জন্য ইন্টারঅ্যাক্টিভ পরিচিতি ও গাইড।',
    expectedBehaviorBn: 'অ্যাক্সেসিবল কীবোর্ড ট্র্যাপ, বাদ দেওয়ার স্বাধীনতা ও অগ্রগতি ট্র্যাকিং।',
    dependencies: ['TutorialService', 'tutorialData'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 22. Tutorial music
  {
    featureId: 'FEAT_22_TUTORIAL_MUSIC',
    featureNameBn: 'টিউটোরিয়াল পরিচিতির থিম মিউজিক',
    featureNameEn: 'Deep Tutorial Theme Music Engine',
    urlOrLocation: 'DeepTutorialIntroduction.tsx / public/audio/',
    purposeBn: 'দীপের পরিচিতি অংশে স্নিগ্ধ, শান্ত ও খ্রিষ্টীয় আবহ যন্ত্রসঙ্গীত প্রদান।',
    expectedBehaviorBn: 'প্রথম ভিজিটে অটোপ্লে নিষিদ্ধ, সম্পূর্ণ ইউজার প্লেব্যাক কন্ট্রোল ও ১০০% উন্মুক্ত লাইসেন্স।',
    dependencies: ['DeepTutorialAudioService', 'Web Audio API', 'LicensesScreen'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 23. Bengali interface
  {
    featureId: 'FEAT_23_BENGALI_UI',
    featureNameBn: 'বাংলা ইউজার ইন্টারফেস ও ফন্ট রেন্ডারিং',
    featureNameEn: 'Bengali UI & Typographic Engine',
    urlOrLocation: 'Global (bn)',
    purposeBn: 'পরিশীলিত, মার্জিত ও বিশুদ্ধ বাংলা ভাষায় প্রতিটি মেনু ও লেবেল উপস্থাপন।',
    expectedBehaviorBn: 'যুক্তাক্ষর যেন কখনো ভেঙ্গে না যায়; সঠিক লাইন হাইট ও স্পষ্ট পাঠযোগ্যতা।',
    dependencies: ['Google Fonts (Hind Siliguri / Tiro Bangla)', 'Tailwind CSS'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 24. English interface
  {
    featureId: 'FEAT_24_ENGLISH_UI',
    featureNameBn: 'ইংরেজি ইন্টারফেস বিকল্প',
    featureNameEn: 'English Language Interface Toggle',
    urlOrLocation: 'Global (en)',
    purposeBn: 'দ্বিভাষিক পাঠকদের জন্য ইংরেজি লেবেল ও বিএসবি পাঠের সমন্বয়।',
    expectedBehaviorBn: 'ভাষা পরিবর্তনের সাথে সাথে ইন্টারফেসের মসৃণ রূপান্তর।',
    dependencies: ['LanguageContext', 'BSB Scripture Database'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 25. Font-size controls
  {
    featureId: 'FEAT_25_FONT_SIZE',
    featureNameBn: 'ফন্ট সাইজ ও পাঠযোগ্যতা নিয়ন্ত্রণ',
    featureNameEn: 'Dynamic Font Size Controls',
    urlOrLocation: 'Bible Reader Header',
    purposeBn: 'বয়োজ্যেষ্ঠ বা দৃষ্টিপ্রতিবন্ধী পাঠকদের জন্য টেক্সট বড় বা ছোট করার সুবিধা।',
    expectedBehaviorBn: 'স্ক্রিন ব্রেক না করে মসৃণভাবে ফন্ট স্কেলিং ও পছন্দ সংরক্ষণ।',
    dependencies: ['AppearanceContext', 'LocalStorage'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 26. Dark and light modes
  {
    featureId: 'FEAT_26_THEME_MODES',
    featureNameBn: 'ডার্ক ও লাইট থিম মোড',
    featureNameEn: 'Dark, Light & Sepia Color Schemes',
    urlOrLocation: 'Theme Toggle',
    purposeBn: 'রাত্রিকালীন পাঠে চোখের সুরক্ষা এবং উচ্চ কনট্রাস্ট সমন্বয়।',
    expectedBehaviorBn: 'ফ্লিকারিং ছাড়া থিম পরিবর্তন ও WCAG AA কনট্রাস্ট অনুপাত বজায় রাখা।',
    dependencies: ['Tailwind dark class', 'ThemeService'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 27. Sharing tools
  {
    featureId: 'FEAT_27_SHARING_TOOLS',
    featureNameBn: 'সার্বজনীন পদ শেয়ারিং টুলস',
    featureNameEn: 'Universal Scripture Sharing Console',
    urlOrLocation: '/share',
    purposeBn: 'সোশ্যাল কার্ড, ইমেজ কোট ও টেক্সট আকারে পদ বিতরণের ব্যবস্থা।',
    expectedBehaviorBn: 'সঠিক ইউটিএম প্যারামিটার সহ স্থায়ী ডেস্টিনেশন লিংক তৈরি।',
    dependencies: ['UniversalShareScreen', 'Html2Canvas / SVG'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 28. Facebook integration
  {
    featureId: 'FEAT_28_FACEBOOK_INTEGRATION',
    featureNameBn: 'ফেসবুক পেজ ও গ্রুপ ফরম্যাট পোস্ট',
    featureNameEn: 'Facebook Ministry Post Formatter',
    urlOrLocation: 'DeepScriptureEngine / DeepDailyWordService',
    purposeBn: 'ফেসবুক পেজ ও খ্রিষ্টীয় আলোচনা গ্রুপের জন্য অনুমোদিত পোস্ট বিন্যাস।',
    expectedBehaviorBn: 'অনুমতিহীন কোনো স্বয়ংক্রিয় স্প্যামিং নয়; কেবল অনুমোদিত কনটেন্ট তৈরি।',
    dependencies: ['DeepOutreachService', 'ContentDistributionPackage'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 29. WhatsApp integration
  {
    featureId: 'FEAT_29_WHATSAPP_INTEGRATION',
    featureNameBn: 'হোয়াটসঅ্যাপ চ্যানেল ও পার্সোনাল শেয়ার',
    featureNameEn: 'WhatsApp Channel & 1-to-1 Sharing',
    urlOrLocation: 'whatsappShareMessage',
    purposeBn: 'হোয়াটসঅ্যাপ চ্যানেল বুলেটিন এবং স্বেচ্ছাসেবী এক-থেকে-এক শেয়ার।',
    expectedBehaviorBn: 'ক্লিন টেক্সট ফরম্যাট ও গভীর পাঠের লিংক সম্বলিত বার্তা।',
    dependencies: ['DeepScriptureEngine', 'ShareService'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 30. Admin dashboard
  {
    featureId: 'FEAT_30_ADMIN_DASHBOARD',
    featureNameBn: 'অ্যাডমিন ড্যাশবোর্ড ও কন্ট্রোল সেন্টার',
    featureNameEn: 'Deep Ministry Control Centre',
    urlOrLocation: '/admin/deep-control-centre',
    purposeBn: 'রেভাঃ অয়ন কুমার ঘোষের জন্য কেন্দ্রীয় প্রশাসনিক ও ধর্মতাত্ত্বিক নিয়ন্ত্রণ।',
    expectedBehaviorBn: 'মাস্টার পাসকোড সুরক্ষা, সার্বিক সিস্টেম পর্যবেক্ষণ ও জরুরি নিয়ন্ত্রণ।',
    dependencies: ['AdminSecurityGate', 'DeepDailyWordService', 'DeepTutorialAudioService'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'ADMIN_ONLY',
  },

  // 31. Analytics
  {
    featureId: 'FEAT_31_ANALYTICS',
    featureNameBn: 'জিরো-পিআইআই লোকাল অ্যানালিটিক্স',
    featureNameEn: 'Privacy-First Anonymous Analytics',
    urlOrLocation: '/admin/analytics',
    purposeBn: 'কোনো ব্যক্তিগত ডেটা বা ট্র্যাকার ছাড়া প্ল্যাটফর্ম ব্যবহারের প্রবণতা বিশ্লেষণ।',
    expectedBehaviorBn: '১০০% কুকিমুক্ত ও জিডিপিআর-সম্মতিপূর্ণ অ্যানালিটিক্স পরিসংখ্যান।',
    dependencies: ['AnalyticsEngine', 'LocalStorage'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 32. Privacy controls
  {
    featureId: 'FEAT_32_PRIVACY_CONTROLS',
    featureNameBn: 'গোপনীয়তা নীতি ও ডেটা মুছে ফেলার অধিকার',
    featureNameEn: 'Privacy Policy & GDPR Right to Erasure',
    urlOrLocation: '/privacy-policy',
    purposeBn: 'পাঠকদের গোপনীয়তা সংরক্ষণ এবং ১-ক্লিকে ডেটা স্থায়ীভাবে মুছে ফেলা।',
    expectedBehaviorBn: 'স্বচ্ছ নীতিমালা ও তাৎক্ষণিক সাবস্ক্রিপশন প্রত্যাহারের নিশ্চয়তা।',
    dependencies: ['DeepDailyWordService.deleteSubscriberData'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'ADMIN_ONLY',
  },

  // 33. Contact and feedback forms
  {
    featureId: 'FEAT_33_FEEDBACK_FORMS',
    featureNameBn: 'ফিডব্যাক ও সমস্যা জানানোর ফর্ম (“সমস্যা জানাবেন”)',
    featureNameEn: 'Feedback & Problem Reporting Desk',
    urlOrLocation: '/feedback / ReportProblemModal',
    purposeBn: 'পাঠকদের মূল্যবান মতামত ও প্রযুক্তিগত সমস্যার বিবরণ গ্রহণ।',
    expectedBehaviorBn: 'রেফারেন্স আইডি জেনারেশন (BSB-PR-XXXXX), পিআইআই স্ক্রাবিং ও রিসিট প্রদান।',
    dependencies: ['FeedbackService', 'EmailNotificationService'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 34. Mobile interface
  {
    featureId: 'FEAT_34_MOBILE_UI',
    featureNameBn: 'মোবাইল অপ্টিমাইজড ইউজার ইন্টারফেস',
    featureNameEn: 'Mobile Responsive Layout Engine',
    urlOrLocation: 'Global (viewport <= 768px)',
    purposeBn: 'স্মার্টফোনে আঙুলের স্পর্শ উপযোগী সহজ বোতাম ও দ্রুত স্ক্রলিং।',
    expectedBehaviorBn: 'কোনো হরাইজন্টাল ওভারফ্লো বা ছোট অপাঠ্য বাটন না থাকা।',
    dependencies: ['Tailwind responsive classes', 'BottomNav'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 35. Desktop interface
  {
    featureId: 'FEAT_35_DESKTOP_UI',
    featureNameBn: 'ডেস্কটপ ও ট্যাবলেট ইন্টারফেস',
    featureNameEn: 'Desktop & Large Screen Experience',
    urlOrLocation: 'Global (viewport > 768px)',
    purposeBn: 'বড় পর্দায় মাল্টি-পেন স্টাডি, সাইডবার ও উন্নত শর্টকাট।',
    expectedBehaviorBn: 'সুসংহত গ্রিড ও বিস্তৃত অধ্যয়নের প্যানেল প্রদর্শন।',
    dependencies: ['Navbar', 'Layout wrappers'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'AUTONOMOUS',
  },

  // 36. Database
  {
    featureId: 'FEAT_36_DATABASE',
    featureNameBn: 'লোকাল-ফার্স্ট স্ক্রিপচার ও স্টেট ডাটাবেস',
    featureNameEn: 'Local-First Scripture & State Engine',
    urlOrLocation: 'IndexedDB / LocalStorage / JSON',
    purposeBn: 'অফলাইন ও অনলাইন উভয় অবস্থায় নিরবচ্ছিন্ন শাস্ত্রীয় ডেটা পরিচালনা।',
    expectedBehaviorBn: 'দ্রুত কোয়েরি ও ডেটা করাপশন মুক্ত লেনদেন।',
    dependencies: ['LocalStoreWrapper', 'JSON static bundles'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'ADMIN_ONLY',
  },

  // 37. APIs
  {
    featureId: 'FEAT_37_APIS',
    featureNameBn: 'অভ্যন্তরীণ ও এক্সটার্নাল এপিআইসমূহ',
    featureNameEn: 'Internal Service & Cloud Endpoints',
    urlOrLocation: '/api / static data endpoints',
    purposeBn: 'বাইবেল ডেটা ফেচিং, পুশ ট্রিগার ও অ্যানালিটিক্স প্রেরণের চ্যানেল।',
    expectedBehaviorBn: 'সর্বনিম্ন ল্যাটেন্সি ও ত্রুটিহীন নেটওয়ার্ক রেসপন্স।',
    dependencies: ['Fetch API', 'Edge CDN routes'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 38. Authentication
  {
    featureId: 'FEAT_38_AUTHENTICATION',
    featureNameBn: 'প্রশাসনিক সুরক্ষা গেটওয়ে ও রোল এক্সেস',
    featureNameEn: 'Admin Gate & Role-Based Access',
    urlOrLocation: 'AdminSecurityGate.tsx',
    purposeBn: 'অননুমোদিত অনুপ্রবেশ রোধ এবং রেভাঃ অয়ন কুমার ঘোষের নিরাপত্তা নিশ্চিতকরণ।',
    expectedBehaviorBn: 'পাসকোড সুরক্ষা (`ayanghosh75`), ব্রুট-ফোর্স প্রতিরোধ ও সেশন এনক্রিপশন।',
    dependencies: ['AdminSecurityGate', 'Crypto helpers'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'ADMIN_ONLY',
  },

  // 39. Cloud scheduler
  {
    featureId: 'FEAT_39_CLOUD_SCHEDULER',
    featureNameBn: '২৪/৭ ক্লাউড শিডিউলার (গিটহাব অ্যাকশনস)',
    featureNameEn: '24/7 Cloud Scheduled Workflow',
    urlOrLocation: '.github/workflows/deep-daily-word-scheduler.yml',
    purposeBn: 'ল্যাপটপ বন্ধ থাকা অবস্থাতেও ক্লাউডে প্রতি ঘণ্টায় স্বয়ংক্রিয় কার্য পরিচালনা।',
    expectedBehaviorBn: 'ঘণ্টায় ঘণ্টায় নির্ভুল ট্রিগার ও ব্যর্থ হলে ক্লাউডফ্লেয়ার এজ ব্যাকআপ।',
    dependencies: ['GitHub Actions Runner', 'Node.js runtime'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 40. Background workers
  {
    featureId: 'FEAT_40_BACKGROUND_WORKERS',
    featureNameBn: 'স্ট্যান্ডঅ্যালন ক্লাউড ও এজ ক্রন ওয়ার্কার',
    featureNameEn: 'Standalone Cloud Worker Dispatcher',
    urlOrLocation: 'scripts/cloud-worker/deep-daily-word-cron.mjs',
    purposeBn: '৯-স্তরের দৈনিক ওয়ার্ড বিতরণ, অডিট ও ১২-ঘণ্টার রিপোর্ট তৈরি।',
    expectedBehaviorBn: 'জিরো-ক্র্যাশ, ডুপ্লিকেট প্রতিরোধ ও টাইমজোন ম্যাপিং।',
    dependencies: ['Node.js 22', 'DeepDailyWordService'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'REVIEW_REQUIRED',
  },

  // 41. Backups
  {
    featureId: 'FEAT_41_BACKUPS',
    featureNameBn: 'স্বয়ংক্রিয় ডাটাবেস ব্যাকআপ ও রিস্টোর টেস্ট',
    featureNameEn: 'Automated Backup & Restore Verification',
    urlOrLocation: 'scripts/backup/',
    purposeBn: 'প্রতিটি পরিবর্তনের পূর্বে ব্যাকআপ ও মাসিক রিস্টোরেশন পরীক্ষা সম্পন্ন করা।',
    expectedBehaviorBn: 'ডেটা লস শূন্যে নামিয়ে আনা এবং দ্রুত রিকভারি সমর্থন।',
    dependencies: ['File system', 'Git commit history'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'ADMIN_ONLY',
  },

  // 42. Error logs & security configuration
  {
    featureId: 'FEAT_42_SECURITY_CONFIG',
    featureNameBn: 'নিরাপত্তা কনফিগারেশন ও এরর লগিং',
    featureNameEn: 'Security Configuration & Audit Logs',
    urlOrLocation: 'Audit Trail / deepDailyWordService.auditLogs',
    purposeBn: 'প্রতিটি স্বয়ংক্রিয় মেরামত, পরিদর্শন ও ডেলিভারির অপরিবর্তনীয় লগ রাখা।',
    expectedBehaviorBn: 'গোপন তথ্য মুক্ত রাখা এবং অডিট ট্রেইলে তাৎক্ষণিক সংরক্ষণ।',
    dependencies: ['DeepDailyWordService.logAudit', 'StewardLogStore'],
    lastSuccessfulTest: '2026-09-18T10:28:00Z',
    currentStatus: 'OPERATIONAL',
    knownProblems: [],
    repairHistory: [],
    ownerOrApprovalRequirement: 'ADMIN_ONLY',
  },
];
