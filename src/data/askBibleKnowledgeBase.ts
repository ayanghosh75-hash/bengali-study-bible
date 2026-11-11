// Authoritative Theological Research Knowledge Base for 🤖 Ask Bible
// Grounded RAG Knowledge Base covering Hallmark Chapters & Core Doctrinal Queries

import { CuratedDossier } from '../types/askBible';

export const ASK_BIBLE_CURATED_ENTRIES: Record<string, CuratedDossier> = {
  'romans-8': {
    id: 'ask-romans-8',
    query: 'রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?',
    titleBn: 'রোমীয় ৮ অধ্যায়: খ্রীষ্টে জীবনের আত্মা, দত্তকপুত্রত্ব ও ঈশ্বরের শাশ্বত বিজয়',
    subtitleBn: 'The Law of the Spirit of Life, Sonship, and Everlasting Security in Christ',
    theologicalCategory: 'পৌলীয় ধর্মতত্ত্ব (Pauline Pneumatology & Soteriology)',
    targetPassage: {
      bookId: 'ROM',
      bookNameBn: 'রোমীয়',
      chapter: 8,
      versesLabel: '১-৩৯ পদ',
    },
    retrievalPipeline: [
      {
        stepNumber: 1,
        stepNameBn: 'শাস্ত্রাংশ ও বিষয় শনাক্তকরণ',
        stepNameEn: 'Passage & Topic Extraction',
        status: 'retrieved',
        summaryBn: 'রোমীয় ৮ অধ্যায় (Rom 8:1-39) সম্পূর্ণ সুসংহতভাবে নির্বাচিত ও ম্যাপিং সম্পন্ন।',
        itemsCount: 1,
      },
      {
        stepNumber: 2,
        stepNameBn: 'বিএসআই বাংলা প্রামাণ্য পদ আহরণ',
        stepNameEn: 'BSI Scripture Text Retrieval',
        status: 'retrieved',
        summaryBn: 'পবিত্র আত্মা, দত্তকপুত্রত্ব, পূর্বজ্ঞান ও ঈশ্বরের প্রেম সংক্রান্ত মূল ২০টি পদ আহরিত।',
        itemsCount: 20,
      },
      {
        stepNumber: 3,
        stepNameBn: 'অনুমোদিত ঐতিহাসিক প্রেক্ষাপট ও টীকা',
        stepNameEn: 'Approved Exegetical Notes & Context',
        status: 'analyzed',
        summaryBn: 'রোমীয় সাম্রাজ্যকালীন পরিস্থিতি, রোমান দত্তক আইন (adoptio) ও পৌলীয় যুক্তিকাঠামো সংযুক্ত।',
        itemsCount: 4,
      },
      {
        stepNumber: 4,
        stepNameBn: 'ক্রস-রেফারেন্স ও ভাববাদী সমান্তরাল যোগসূত্র',
        stepNameEn: 'Cross References & Parallel Synthesis',
        status: 'analyzed',
        summaryBn: 'গালাতীয় ৪, যিশাইয় ৫৩, আদিপুস্তক ১ ও গীতসংহিতা ৪৪-এর প্রামাণ্য যোগসূত্র সংগৃহীত।',
        itemsCount: 6,
      },
      {
        stepNumber: 5,
        stepNameBn: 'মূল গ্রীক শব্দার্থ ও স্ট্রংস কনকর্ডেন্স',
        stepNameEn: 'Original Greek Lexical Sources',
        status: 'analyzed',
        summaryBn: 'G2631 (Katakrima), G4151 (Pneuma), G5206 (Huiothesia), G5247 (Hypernikao) বিশ্লেষণ সম্পন্ন।',
        itemsCount: 5,
      },
      {
        stepNumber: 6,
        stepNameBn: 'ধর্মতাত্ত্বিক সংশ্লেষণ ও ৫-মাত্রিক গবেষণা উত্তর',
        stepNameEn: '5-Dimensional Theological Synthesis',
        status: 'synthesized',
        summaryBn: 'সরাসরি শাস্ত্র, প্রেক্ষাপট, ব্যাখ্যা, বিভিন্ন ঐতিহ্যিক মত ও গবেষণার সূত্র প্রস্তুত।',
      },
    ],

    // 1. বাইবেল সরাসরি যা বলে (What the Bible Directly Says)
    directScripture: {
      headingBn: 'বাইবেল সরাসরি যা বলে (প্রধান শাস্ত্রীয় মূল সাক্ষ্য)',
      summaryBn: 'রোমীয় ৮ অধ্যায় শুরু হয় ‘কোনো দণ্ডাজ্ঞা নাই’ (পদ ১) দিয়ে এবং সমাপ্ত হয় ‘ঈশ্বরের প্রেম হইতে কোনো কিছুই আমাদিগকে পৃথক করিতে পারিবে না’ (পদ ৩৯) দিয়ে।',
      verses: [
        {
          reference: 'রোমীয় ৮:১',
          bookId: 'ROM',
          chapter: 8,
          verse: 1,
          textBn: 'অতএব যাহারা খ্রীষ্ট যীশুতে আছে, তাহাদের এখন কোন দণ্ডাজ্ঞা নাই।',
          highlightText: 'কোন দণ্ডাজ্ঞা নাই',
          contextNoteBn: 'খ্রীষ্টে বিশ্বাসীদের জন্য আইনি ও চিরন্তন মুক্তির পরম আশ্বাস।',
        },
        {
          reference: 'রোমীয় ৮:২',
          bookId: 'ROM',
          chapter: 8,
          verse: 2,
          textBn: 'কারণ খ্রীষ্ট যীশুতে জীবনের আত্মার ব্যবস্থা আমাকে পাপের ও মৃত্যুর ব্যবস্থা হইতে মুক্ত করিয়াছে।',
          highlightText: 'জীবনের আত্মার ব্যবস্থা আমাকে মুক্ত করিয়াছে',
          contextNoteBn: 'পবিত্র আত্মার নতুন সঞ্জীবনী শক্তি বনাম মোশির ব্যবস্থার অক্ষমতা।',
        },
        {
          reference: 'রোমীয় ৮:১৪-১৫',
          bookId: 'ROM',
          chapter: 8,
          verse: 14,
          textBn: 'কেননা যত লোক ঈশ্বরের আত্মা দ্বারা পরিচালিত হয়, তাহারা সকলেই ঈশ্বরের সন্তান। কারণ তোমরা দাসত্বের আত্মা পাও নাই, যে পুনরায় ভয় করিবে, কিন্তু দত্তকপুত্রত্বের আত্মা পাইয়াছ, যদ্দ্বারা আমরা ডাকি, ‘আব্বা, পিতা!’',
          highlightText: 'দত্তকপুত্রত্বের আত্মা পাইয়াছ, যদ্দ্বারা আমরা ডাকি, ‘আব্বা, পিতা!’',
          contextNoteBn: 'ভয়ের দাসত্ব সমাপ্ত; ঈশ্বরের প্রত্যক্ষ পরিবারভুক্তির স্বর্গীয় মর্যাদা।',
        },
        {
          reference: 'রোমীয় ৮:২৮',
          bookId: 'ROM',
          chapter: 8,
          verse: 28,
          textBn: 'আর আমরা জানি, যাহারা ঈশ্বরকে প্রেম করে, যাহারা তাঁহার সংকল্প অনুসারে আহূত হইয়াছে, তাহাদের মঙ্গলের জন্য সমস্তই একত্রে সাধন পাইতেছে।',
          highlightText: 'তাহাদের মঙ্গলের জন্য সমস্তই একত্রে সাধন পাইতেছে',
          contextNoteBn: 'ঈশ্বরের সার্বভৌম পরিচালনায় বিশ্বাসীর জীবনের প্রতিটি অভিজ্ঞতার পরম উদ্দেশ্য।',
        },
        {
          reference: 'রোমীয় ৮:২৯-৩০',
          bookId: 'ROM',
          chapter: 8,
          verse: 29,
          textBn: 'কারণ তিনি যাহাদিগকে পূর্বে জানিয়াছিলেন, তাহাদিগকে আপনার পুত্রের প্রতিমূর্তির অনুরূপ হইবার জন্য পূর্বে নিরূপণও করিয়াছিলেন... এবং যাহাদিগকে ধার্মিক গণনা করিলেন, তাহাদিগকে মহিমান্বিতও করিলেন।',
          highlightText: 'পূর্বজ্ঞান → নিরূপণ → আহ্বান → ধার্মিক গণনা → মহিমান্বিতকরণ',
          contextNoteBn: 'পরিত্রাণের অভগ্ন শৃঙ্খল (Golden Chain of Redemption)।',
        },
        {
          reference: 'রোমীয় ৮:৩১',
          bookId: 'ROM',
          chapter: 8,
          verse: 31,
          textBn: 'তবে এই সকল বিষয়ে আমরা কি বলিব? ঈশ্বর যদি আমাদের পক্ষে থাকেন, তবে আমাদের বিপক্ষে কে থাকিতে পারে?',
          highlightText: 'ঈশ্বর যদি আমাদের পক্ষে থাকেন, তবে আমাদের বিপক্ষে কে থাকিতে পারে?',
          contextNoteBn: 'ঈশ্বরের সর্বশক্তিমান পৃষ্ঠপোষকতার সামনে কোনো বাধা টিকতে পারে না।',
        },
        {
          reference: 'রোমীয় ৮:৩৭-৩৯',
          bookId: 'ROM',
          chapter: 8,
          verse: 37,
          textBn: 'বরং এই সমস্ত বিষয়ে, যিনি আমাদিগকে প্রেম করিয়াছেন, তাঁহার দ্বারা আমরা বিজয়ী অপেক্ষা শ্রেষ্ঠ। কারণ আমি সুনিশ্চিত জানি যে, মৃত্যু কিম্বা জীবন... ঈশ্বরের যে প্রেম আমাদের প্রভু খ্রীষ্ট যীশুতে আছে, তাহা হইতে আমাদিগকে পৃথক করিতে সমর্থ হইবে না।',
          highlightText: 'বিজয়ী অপেক্ষা শ্রেষ্ঠ... পৃথক করিতে সমর্থ হইবে না',
          contextNoteBn: 'মহাবিশ্বের কোনো শক্তির পক্ষেই খ্রীষ্টের ভালোবাসা থেকে বিশ্বাসীকে বিচ্ছিন্ন করা অসম্ভব।',
        },
      ],
      keyObservationsBn: [
        'অধ্যায়টি শুরু হয় রোমীয় ৮:১ এর "কোন দণ্ডাজ্ঞা নাই" দিয়ে এবং শেষ হয় ৮:৩৯ এর "ঈশ্বরের প্রেম হইতে কোনো কিছুই পৃথক করিতে পারিবে না" দিয়ে।',
        'পবিত্র আত্মার সক্রিয়তা এই অধ্যায়ে প্রায় ২০ বার উল্লেখিত হয়েছে, যা বিশ্বাসীর জীবনে বিজয়ের মূল চালিকাশক্তি।',
        'পরিত্রাণের স্বর্ণশৃঙ্খল (৮:২৯-৩০): পূর্বজ্ঞান → নিরূপণ → আহ্বান → ধার্মিক গণনা → মহিমান্বিতকরণ।',
      ],
    },

    // 2. প্রেক্ষাপট (Historical, Cultural & Literary Context)
    context: {
      authorDateBn: 'প্রেরিত পৌল; আনুমানিক খ্রীষ্টাব্দ ৫৭ সালে করিন্থ নগরী হইতে গায়ির গৃহে অবস্থানকালে রচিত।',
      historicalAudienceBn: 'রোম নগরীর গৃহমণ্ডলীসমূহ — যেখানে উভয় যিহূদী খ্রীষ্টান ও অ-যিহূদী (গ্রীক-রোমান) বিশ্বাসী একত্রে বিশ্বাসে বৃদ্ধি পাচ্ছিল।',
      geographicalSettingBn: 'রোম সাম্রাজ্যের রাজধানী রোম — সম্রাট নিরোর প্রাক-শাসনকালীন রাজনৈতিক ও ধর্মীয় বাস্তবতার পটভূমি।',
      literaryGenreStructureBn: 'ধর্মতাত্ত্বিক পত্র (Epistle); রোমীয় ৭ অধ্যায়ের অন্তর্দ্বন্দ্বের সংকট (ব্যবস্থার অধীনে পরাভব) হইতে ৮ অধ্যায়ের জয়োল্লাসে (পবিত্র আত্মায় বিজয়) রূপান্তর।',
      socioPoliticalBackgroundBn: 'রোমান দত্তক আইন (Roman law of adoptio) অনুযায়ী একজন ক্রীতদাস দত্তকপুত্র হইলে তাহার পূর্বের সমস্ত ঋণ ও দাসত্ব আইনত চিরতরে মুছে যেত এবং সে পিতার সমস্ত সম্পত্তির সমান উত্তরাধিকারী হইত। পৌল এই সুপরিচিত আইনি ধারণাকে খ্রীষ্টীয় পরিত্রাণের ব্যাখ্যার জন্য অলঙ্কৃত করেছেন।',
    },

    // 3. ব্যাখ্যা (Exegesis & Theological Breakdown)
    exposition: {
      coreThesisBn: 'রোমীয় ৮ অধ্যায়ের কেন্দ্রীয় মূল বক্তব্য হলো: খ্রীষ্ট যীশুতে পাপ ও দণ্ডাজ্ঞার চূড়ান্ত অবসান ঘটেছে; বিশ্বাসী এখন পবিত্র আত্মার সঞ্জীবনী শক্তিতে নতুন জীবন লাভ করেছে, ঈশ্বরের দত্তকপুত্র ও উত্তরাধিকারীর মর্যাদা পেয়েছে, এবং পার্থিব সর্বপ্রকার দুঃখকষ্টের মধ্যেও ঈশ্বরের শাশ্বত প্রেম ও সার্বভৌম সংকল্পে অপরাজেয় জয়ী।',
      structuralOutline: [
        {
          verseRange: '১-১১ পদ',
          titleBn: 'পবিত্র আত্মার অধীনে নবজীবন ও দণ্ডাজ্ঞার অবসান',
          summaryBn: 'ব্যবস্থা যা মাংসের দুর্বলতার কারণে করতে পারেনি, ঈশ্বর খ্রীষ্টের ক্রুশারোপণের মাধ্যমে মাংসে পাপের দণ্ড দিয়ে তা সাধন করেছেন।',
          analysisBn: 'বিশ্বাসীরা এখন মাংসের অভিলাষ অনুসারে নয়, বরং আত্মার ইচ্ছায় চলে। খ্রীষ্টকে মৃতদের মধ্য থেকে যিনি জীবিত করেছেন, সেই পবিত্র আত্মা বিশ্বাসীর মরদেহেও আত্মিক জীবনের সামর্থ্য দান করেন।',
          keyDoctrinalTruths: ['দণ্ডাজ্ঞাহীনতা (No Condemnation)', 'ব্যবস্থার পূর্ণতাকরণ (Fulfillment of the Law)', 'পবিত্র আত্মার বাসগৃহ (Indwelling of the Spirit)'],
        },
        {
          verseRange: '১২-১৭ পদ',
          titleBn: 'দত্তকপুত্রত্ব, আব্বা পিতা ও খ্রীষ্টের সহ-উত্তরাধিকারী',
          summaryBn: 'ভয়ের দাসত্ব থেকে মুক্ত হয়ে বিশ্বাসী ঈশ্বরের নিজের পরিবারভুক্ত হয়েছে।',
          analysisBn: 'পবিত্র আত্মা আমাদের আত্মার সহিত সাক্ষ্য দেন যে আমরা ঈশ্বরের সন্তান। সন্তান হিসেবে আমরা শুধু মুক্তিই পাইনি, খ্রীষ্টের সাথে ভাবী মহিমার সহ-উত্তরাধিকারী (co-heirs with Christ) হয়েছি।',
          keyDoctrinalTruths: ['দত্তকপুত্রত্ব (Huiothesia / Adoption)', 'আত্মার সাক্ষ্য (Witness of the Spirit)', 'উত্তরাধিকার (Heirs of God)'],
        },
        {
          verseRange: '১৮-২৭ পদ',
          titleBn: 'সৃষ্টির দীর্ঘশ্বাস, বর্তমান দুঃখভোগ ও ভাবী মহিমা',
          summaryBn: 'পাপের ফলস্বরূপ সমগ্র সৃষ্টি বিনষ্টতার দাসত্বে দীর্ঘশ্বাস ফেলছে এবং ঈশ্বরের সন্তানদের প্রকাশের প্রত্যাশা করছে।',
          analysisBn: 'বিশ্বাসীরাও নিজেদের মরদেহের চূড়ান্ত মুক্তির অপেক্ষায় রয়েছে। আমাদের প্রার্থনার অক্ষমতায় পবিত্র আত্মা স্বয়ং বাক্যাতীত আর্তনাদে আমাদের পক্ষে ঈশ্বরের ইচ্ছা অনুসারে মধ্যস্থতা করেন।',
          keyDoctrinalTruths: ['দেহাবসানের মুক্তি (Redemption of the Body)', 'ধৈর্যশীল প্রত্যাশা (Eschatological Hope)', 'পবিত্র আত্মার মধ্যস্থতা (Intercession of the Spirit)'],
        },
        {
          verseRange: '২৮-৩৯ পদ',
          titleBn: 'পরিত্রাণের স্বর্ণশৃঙ্খল ও অপরাজেয় ঈশ্বরের প্রেম',
          summaryBn: 'ঈশ্বরের শাশ্বত উদ্দেশ্য কখনোই ব্যর্থ হয় না; ঈশ্বর যাহাদের মনোনীত করেছেন তাদের মহিমান্বিতকরণ নিশ্চিত।',
          analysisBn: 'পূর্বজ্ঞান (Foreknowledge) থেকে মহিমান্বিতকরণ (Glorification) পর্যন্ত পরিত্রাণের কোনো ফাঁক নেই। খ্রীষ্টের প্রেম থেকে দুর্ভিক্ষ, সংকট, অত্যাচার বা মৃত্যু — মহাবিশ্বের কোনো আত্মিক বা জাগতিক শক্তিই বিশ্বাসীকে ছিনিয়ে নিতে পারে না।',
          keyDoctrinalTruths: ['ঈশ্বরের সার্বভৌম পরিকল্পনা (Providence)', 'পরিত্রাণের নিশ্চিততা (Golden Chain of Salvation)', 'মহাবিজয়ী (More than Conquerors)'],
        },
      ],
      pastoralApplicationBn: 'দৈনন্দিন জীবনে যখন বিশ্বাসী পাপের অপরাধবোধ, অসুস্থতা বা কষ্টের মুখোমুখি হন, রোমীয় ৮ স্মরণ করিয়ে দেয় যে খ্রীষ্টে তার বিরুদ্ধে কোনো অভিযোগ টিকবে না। কষ্ট সাময়িক, কিন্তু পিতার প্রেম এবং আত্মার উপস্থিতি চিরন্তন।',
    },

    // 4. বিভিন্ন মত (Theological Perspectives & Historical Views)
    theologicalPerspectives: {
      dialogueTopicBn: 'রোমীয় ৮:২৮-৩০ পদের ‘পূর্বজ্ঞান ও পূর্বসংকল্প’ (Foreknowledge and Predestination) সংক্রান্ত ঐতিহাসিক দৃষ্টিভঙ্গি',
      perspectives: [
        {
          perspectiveNameBn: 'সংস্কারবাদী / ক্যালভিনিস্ট দৃষ্টিভঙ্গি (Reformed View)',
          traditionBn: 'জন ক্যালভিন, সেন্ট অগাস্টিন ও সংস্কারবাদী ঐতিহ্য',
          coreArgumentBn: 'ঈশ্বরের পূর্বজ্ঞান (Foreknowledge) কেবল পূর্বেই তথ্য জানা নয়, বরং শাশ্বত প্রেমপূর্ণ চুক্তিভিত্তিক সম্পর্ক। পূর্বসংকল্প (Predestination) নিঃশর্ত অনুগ্রহের ভিত্তিতে পরিচালিত; ঈশ্বর সার্বভৌমভাবে তাঁর সন্তানদের বেছে নেন যেন খ্রীষ্টের মহিমা প্রকাশিত হয়। পরিত্রাণের এই স্বর্ণশৃঙ্খল অপরাজিত।',
          scriptureBasis: ['রোমীয় ৮:২৯-৩০', 'ইফিষীয় ১:৪-৫', 'যোহন ৬:৩৭'],
        },
        {
          perspectiveNameBn: 'ওয়েসলিয়ান / আর্মিনিয়ান দৃষ্টিভঙ্গি (Arminian-Wesleyan View)',
          traditionBn: 'জ্যাকব আর্মিনিয়াস, জন ওয়েসলি ও মেথডিস্ট ঐতিহ্য',
          coreArgumentBn: 'ঈশ্বরের পূর্বজ্ঞান বলতে বোঝায় সর্বজ্ঞানী ঈশ্বর সর্বযুগের মানুষের বিশ্বাস ও খ্রীষ্টকে গ্রহণের সিদ্ধান্ত পূর্বেই অবলোকন করেছেন (Prevenient Grace)। ঈশ্বর চান সকলেই পরিত্রাণ পাক; তাঁর পূর্বনির্ধারণ হলো খ্রীষ্টে বিশ্বাসকারী মণ্ডলীকেন্দ্রিক ও চরিত্রগত (পুত্রের প্রতিমূর্তির অনুরূপ হওয়া)।',
          scriptureBasis: ['১ তীমথিয় ২:৪', '১ পিতর ১:১-২', 'যোহন ৩:১৬'],
        },
        {
          perspectiveNameBn: 'আদি চার্চ ফাদার্স / প্যাট্রিস্টিক দৃষ্টিভঙ্গি (Early Patristic View)',
          traditionBn: 'জন ক্রিসোস্টম ও অরিজেন',
          coreArgumentBn: 'রোমীয় ৮ অধ্যায়ের কেন্দ্রীয় সুর কেবল তত্ত্ব নয়, বরং খ্রীষ্টীয় বিজয় ও পবিত্র আত্মার পরিচালনায় পাপের উপর জয়লাভ। রোমীয় ৭-এর পরাভব কাটিয়ে আত্মিক বৃদ্ধির বাস্তব জীবনযাত্রাই পৌলের মূল আহ্বান।',
          scriptureBasis: ['রোমীয় ৮:১২-১৩', 'গালাতীয় ৫:১৬-১৮'],
        },
      ],
      unifyingConsensusBn: 'সমস্ত ঐতিহাসিক খ্রিস্টীয় ঐতিহ্যের মূল ঐকমত্য হলো: পরিত্রাণ সম্পূর্ণরূপে ঈশ্বরের অনুগ্রহে এবং খ্রীষ্টের বলিদানে প্রতিষ্ঠিত; মানুষ নিজ কর্মগুণে এটি অর্জন করতে পারে না। খ্রীষ্টের প্রেমে যে নিরাপত্তা রয়েছে (রোমীয় ৮:৩১-৩৯), তা সর্বকালের সকল বিশ্বাসীর জন্য পরম সান্ত্বনার উৎস।',
    },

    // 5. গবেষণার সূত্র (Research Sources, Lexicons & Citations)
    researchSources: {
      lexicalTerms: [
        {
          strongs: 'G2631',
          originalWord: 'κατάκριমা (katakrima)',
          language: 'Greek',
          transliteration: 'katakrima',
          pronunciationBn: 'কাটাক্রিমা',
          meaningBn: 'দণ্ডাজ্ঞা, বিচারালয়ের শাস্তির রায়, অপরাধমূলক শাস্তি।',
          contextUsageBn: 'রোমীয় ৮:১ পদে ব্যবহৃত; খ্রীষ্টের ক্রুশে পাপের সমস্ত আইনি দণ্ড পূরণ হওয়ায় বিশ্বাসীর উপর কোনো দণ্ডাজ্ঞা আর অবশিষ্ট নেই।',
        },
        {
          strongs: 'G4151',
          originalWord: 'πνεῦμα (pneuma)',
          language: 'Greek',
          transliteration: 'pneuma',
          pronunciationBn: 'নিউমা',
          meaningBn: 'আত্মা, শ্বাস, বায়ুর প্রবাহ, পরম পবিত্র আত্মা।',
          contextUsageBn: 'রোমীয় ৮ অধ্যায়ে এই শব্দটি প্রায় ২০ বার ব্যবহৃত হয়েছে — যা প্রমাণ করে এই অধ্যায়টি নবনিয়মের সর্বপ্রধান আত্মাতাত্ত্বিক অধ্যায়।',
        },
        {
          strongs: 'G5206',
          originalWord: 'υἱοθεσία (huiothesia)',
          language: 'Greek',
          transliteration: 'huiothesia',
          pronunciationBn: 'হুইওথেসিয়া',
          meaningBn: 'দত্তকপুত্রত্ব, আইনিভাবে সন্তানপদে বরণ, পারিবারিক পূর্ণ অধিকার প্রদান।',
          contextUsageBn: 'রোমীয় ৮:১৫ পদে ব্যবহৃত; ঈশ্বর বিশ্বাসীকে কেবল দাস বা অতিথি হিসেবে নয়, রক্তের সন্তানের ন্যায় পূর্ণ সম্পত্তিক উত্তরাধিকারীর সম্মান দিয়েছেন।',
        },
        {
          strongs: 'G5247',
          originalWord: 'ὑπερνικάω (hypernikao)',
          language: 'Greek',
          transliteration: 'hypernikao',
          pronunciationBn: 'হুপারনিকায়ো',
          meaningBn: 'বিজয়ী অপেক্ষা শ্রেষ্ঠ, মহাবিজয়ী, পরাজয়হীন জয়।',
          contextUsageBn: 'রোমীয় ৮:৩৭ পদে ব্যবহৃত; খ্রীষ্টের মাধ্যমে আমরা কেবল কোনোরকমে রক্ষা পাই না, বরং সর্বাবস্থায় পূর্ণ বিজয়ীর চেয়েও মহান।',
        },
      ],
      crossReferences: [
        {
          ref: 'গালাতীয় ৪:৪-৭',
          relevanceBn: 'দত্তকপুত্রত্ব ও ‘আব্বা, পিতা’ বলে ডাকার সমান্তরাল শিক্ষাদান।',
          testament: 'NT',
        },
        {
          ref: 'যিশাইয় ৫৩:৩-৫',
          relevanceBn: 'খ্রীষ্টের আত্মত্যাগের মাধ্যমে মাংসে পাপের দণ্ডবিধানের ভাববাণী।',
          testament: 'OT',
        },
        {
          ref: 'গীতসংহিতা ৪৪:২২',
          relevanceBn: 'রোমীয় ৮:৩৬ পদে উদ্ধৃত: ‘তোমার নিমিত্ত আমরা সমস্ত দিন হত হইতেছি’।',
          testament: 'OT',
        },
        {
          ref: '১ করিন্থীয় ১৫:৫৪-৫৭',
          relevanceBn: 'মৃত্যুর উপর চূড়ান্ত বিজয় এবং ঈশ্বরের অটল প্রতিজ্ঞা।',
          testament: 'NT',
        },
      ],
      scholarlyCitations: [
        {
          authorBn: 'সেন্ট জন ক্রিসোস্টম (St. John Chrysostom)',
          workBn: 'হোমিলিজ অন রোমান্স (Homilies on Romans, Homily XIII-XV)',
          eraOrYear: 'আনুমানিক ৩৯১ খ্রীষ্টাব্দ',
          theologicalContributionBn: 'রোমীয় ৮ অধ্যায়কে তিনি ‘আত্মিক জীবনের স্বর্ণমন্দির’ হিসেবে আখ্যায়িত করেন, যেখানে বিশ্বাসী দাসের ভয় ত্যাগ করে রাজার সন্তানের অধিকার লাভ করে।',
        },
        {
          authorBn: 'মার্টিন লুথার (Martin Luther)',
          workBn: 'রোমীয় পত্রের ভূমিকা (Preface to the Epistle to the Romans)',
          eraOrYear: '১৫২২ খ্রীষ্টাব্দ',
          theologicalContributionBn: 'লুথারের মতে, রোমীয় ৮ অধ্যায় নবনিয়মের সবচেয়ে দীপ্তিময় রত্ন, যা বিশ্বাসীকে শেখায় কীভাবে আত্মিক লড়াইয়ে ঈশ্বরের প্রেমে স্থির থাকতে হয়।',
        },
        {
          authorBn: 'জন ক্যালভিন (John Calvin)',
          workBn: 'কমেন্টারি অন রোমান্স (Commentary on Romans)',
          eraOrYear: '১৫৪০ খ্রীষ্টাব্দ',
          theologicalContributionBn: 'তিনি ৮:২৮-৩৯ পদের শাশ্বত নিরাপত্তার দিকটিকে বিশ্বাসীর আত্মার নোঙ্গর হিসেবে ব্যাখ্যা করেছেন।',
        },
        {
          authorBn: 'বাংলা বাইবেল সোসাইটি (Bible Society of India)',
          workBn: 'বিএসআই স্টাডি বাইবেল টীকা ও পাদটীকা',
          eraOrYear: 'প্রামাণ্য সংস্করণ',
          theologicalContributionBn: '‘দত্তকপুত্রত্ব’ ও ‘জীবনের আত্মার ব্যবস্থা’ সংক্রান্ত বাংলা পারিভাষিক ও ব্যুৎপত্তিগত বিশুদ্ধতা নিশ্চিতকরণ।',
        },
      ],
      primaryBibleEditions: [
        'The Bible Society of India (BSI) Bengali Bible (Free Bible / Re-edited Version)',
        'Nestle-Aland Novum Testamentum Graece (NA28 / UBS5 Greek New Testament)',
        'The Holy Bible: English Standard Version (ESV with Cross References)',
      ],
    },

    suggestedFollowUps: [
      'রোমীয় ৮:২৮-৩০ এর পরিত্রাণের স্বর্ণশৃঙ্খল বলতে কী বোঝায়?',
      'রোমীয় ৭ এর অন্তর্দ্বন্দ্ব বনাম রোমীয় ৮ এর আত্মিক বিজয়ের পার্থক্য কী?',
      'রোমীয় ৮:১৫ এর ‘আব্বা পিতা’ শব্দের আরামীয় তাৎপর্য কী?',
      'খ্রীষ্টের প্রেম থেকে কি কোনো পাপ বিশ্বাসীকে পৃথক করতে পারে?',
    ],
  },

  'john-1': {
    id: 'ask-john-1',
    query: 'যোহন ১:১-এ ‘বাক্য’ (Logos) বলতে কী বোঝায়?',
    titleBn: 'যোহন ১ অধ্যায়: অনন্ত বাক্য (Logos), খ্রীষ্টের ঈশ্বরত্ব ও অবতারতত্ত্ব',
    subtitleBn: 'The Word (Logos) in John 1:1-14: Eternal Deity, Incarnation, and Grace',
    theologicalCategory: 'খ্রীষ্টতত্ত্ব (Johannine Christology)',
    targetPassage: {
      bookId: 'JHN',
      bookNameBn: 'যোহন',
      chapter: 1,
      versesLabel: '১-১৮ পদ',
    },
    retrievalPipeline: [
      {
        stepNumber: 1,
        stepNameBn: 'শাস্ত্রাংশ ও বিষয় শনাক্তকরণ',
        stepNameEn: 'Passage & Topic Extraction',
        status: 'retrieved',
        summaryBn: 'যোহন ১:১-১৪ প্রস্তাবনা (Prologue of John) সুনির্দিষ্টভাবে প্রস্তুত।',
        itemsCount: 1,
      },
      {
        stepNumber: 2,
        stepNameBn: 'বিএসআই বাংলা পদ আহরণ',
        stepNameEn: 'BSI Scripture Text Retrieval',
        status: 'retrieved',
        summaryBn: 'বাক্যের ঈশ্বরত্ব, সৃষ্টি ও মাংস ধারণ সংক্রান্ত মূল পদসমূহ আহরিত।',
        itemsCount: 14,
      },
      {
        stepNumber: 3,
        stepNameBn: 'ঐতিহাসিক ও দার্শনিক প্রেক্ষাপট',
        stepNameEn: 'Approved Exegetical Notes & Context',
        status: 'analyzed',
        summaryBn: 'হিব্রু ‘দাভার’ (Dabar/Memra) ও গ্রীক দর্শনের ‘লগোস’ (Logos)-এর সেতুবন্ধন।',
        itemsCount: 3,
      },
      {
        stepNumber: 4,
        stepNameBn: 'ক্রস-রেফারেন্স ও পুরাতন নিয়মের প্রতিধ্বনি',
        stepNameEn: 'Cross References & Parallel Synthesis',
        status: 'analyzed',
        summaryBn: 'আদিপুস্তক ১:১, হিতোপদেশ ৮:২২-৩১ ও কলসীয় ১:১৫-১৭ সংযুক্ত।',
        itemsCount: 4,
      },
      {
        stepNumber: 5,
        stepNameBn: 'মূল গ্রীক স্ট্রংস কনকর্ডেন্স',
        stepNameEn: 'Original Greek Lexical Sources',
        status: 'analyzed',
        summaryBn: 'G3056 (Logos), G2316 (Theos), G4561 (Sarx) ব্যাকরণগত বিশ্লেষণ।',
        itemsCount: 4,
      },
      {
        stepNumber: 6,
        stepNameBn: '৫-মাত্রিক গবেষণা উত্তর সংশ্লেষণ',
        stepNameEn: '5-Dimensional Theological Synthesis',
        status: 'synthesized',
        summaryBn: 'সরাসরি শাস্ত্র, প্রেক্ষাপট, ব্যাখ্যা, বিভিন্ন মত ও গবেষণার সূত্র প্রস্তুত।',
      },
    ],

    directScripture: {
      headingBn: 'বাইবেল সরাসরি যা বলে (যোহন ১:১-১৪)',
      summaryBn: 'বাক্য অনন্তকালীন ঈশ্বর এবং সৃষ্টির পরম উৎস, যিনি ইতিহাসে মানুষ হয়ে আমাদের মাঝে বাস করলেন।',
      verses: [
        {
          reference: 'যোহন ১:১',
          bookId: 'JHN',
          chapter: 1,
          verse: 1,
          textBn: 'আদিতে বাক্য ছিলেন, এবং বাক্য ঈশ্বরের সহিত ছিলেন, এবং বাক্য ঈশ্বর ছিলেন।',
          highlightText: 'আদিতে বাক্য ছিলেন... বাক্য ঈশ্বর ছিলেন',
          contextNoteBn: 'খ্রীষ্টের অনাদি অস্তিত্ব, স্বতন্ত্র ব্যক্তিত্ব ও পূর্ণ ঈশ্বরত্বের অবিসংবাদিত ঘোষণা।',
        },
        {
          reference: 'যোহন ১:৩',
          bookId: 'JHN',
          chapter: 1,
          verse: 3,
          textBn: 'সকলই তাঁহার দ্বারা হইয়াছিল, এবং যাহা হইয়াছে, তাহার কিছুই তাঁহা ব্যতীত হয় নাই।',
          highlightText: 'সকলই তাঁহার দ্বারা হইয়াছিল',
          contextNoteBn: 'খ্রীষ্ট সৃষ্টির বাহক ও পরম স্রষ্টা।',
        },
        {
          reference: 'যোহন ১:১৪',
          bookId: 'JHN',
          chapter: 1,
          verse: 14,
          textBn: 'আর সেই বাক্য মাংস হইলেন, এবং অনুগ্রহে ও সত্যে পূর্ণ হইয়া আমাদের মধ্যে বাস করিলেন; এবং আমরা তাঁহার মহিমা দেখিলাম, যেমন পিতার একমাত্র জাত পুত্রের মহিমা।',
          highlightText: 'বাক্য মাংস হইলেন... আমাদের মধ্যে বাস করিলেন',
          contextNoteBn: 'ঐশ্বরিক অবতারতত্ত্ব (Incarnation); ঈশ্বরের মর্ত্যে মানুষের রূপে আগমন।',
        },
      ],
      keyObservationsBn: [
        'বাক্য (Logos) অনাদি ও অনন্তকালীন ঈশ্বর; তিনি সৃষ্ট কোনো অস্তিত্ব নন (যোহন ১:১-৩)।',
        'ঐশ্বরিক অবতারতত্ত্ব (Incarnation): সেই বাক্য মাংস হলেন এবং আমাদের মধ্যে বাস করলেন (যোহন ১:১৪)।',
        'যীশু খ্রীষ্ট কেবল বার্তা নিয়ে আসেননি, তিনি স্বয়ং ঈশ্বরের অনুগ্রহ ও সত্যের মূর্ত প্রকাশ (যোহন ১:১৪, ১৭)।',
      ],
    },

    context: {
      authorDateBn: 'প্রেরিত যোহন; আনুমানিক খ্রীষ্টাব্দ ৮৫-৯০ সালে ইফিষষ নগরী থেকে রচিত।',
      historicalAudienceBn: 'এশিয়া মাইনর ও গ্রীক-রোমান বিশ্বের বিস্তৃত যিহূদী ও হেলেনীয় মণ্ডলীসমূহ।',
      geographicalSettingBn: 'প্রাচীন ইফিষষ ও পূর্ব ভূমধ্যসাগরীয় হেলেনীয় সাংস্কৃতিক বলয়।',
      literaryGenreStructureBn: 'ঐতিহাসিক ও ধর্মতাত্ত্বিক সুসমাচার; ১:১-১৮ পদ সমগ্র পুস্তকের সুর নির্ধারণকারী ভূমিকা (Logos Hymn/Prologue)।',
      socioPoliticalBackgroundBn: 'গ্রীক দর্শনে লগোস ছিল মহাবিশ্বের শৃঙ্খলা রক্ষাকারী নিরাকার শক্তি। যোহন সেই শব্দ ব্যবহার করে ঘোষণা করলেন যে এই লগোস নিরাকার কোনো ধারণা নয়, বরং তিনি রক্ত-মাংসের বাস্তব মানুষ যীশু খ্রীষ্ট।',
    },

    exposition: {
      coreThesisBn: 'যোহন ১:১-এ ‘বাক্য’ (Logos) যীশু খ্রীষ্টের প্রাক-অস্তিত্বশীল পূর্ণ ঈশ্বরত্ব এবং দৃশ্যমান অবতাররূপকে প্রকাশ করে। তিনি ঈশ্বরের সাথে চিরন্তন সম্পর্কে যুক্ত ছিলেন এবং তিনি স্বয়ং ঈশ্বর।',
      structuralOutline: [
        {
          verseRange: '১-২ পদ',
          titleBn: 'বাক্যের চিরন্তন প্রাক-অস্তিত্ব ও ব্যক্তিত্ব',
          summaryBn: 'সৃষ্টির পূর্বেও বাক্য বিদ্যমান ছিলেন এবং তিনি পিতার সাথে ঘনিষ্ঠ সহভাগিতায় ছিলেন।',
          analysisBn: 'গ্রীক ‘এন আরখে এন হো লগোস’ স্পষ্ট করে যে সৃষ্টির সূচনার মুহূর্তেও লগোস ছিলেন। তিনি সৃষ্ট কোনো সত্তা নন।',
          keyDoctrinalTruths: ['খ্রীষ্টের অনাদিত্ব (Eternal Pre-existence)', 'ঈশ্বরত্ব (Deity of Christ)', 'ত্রিত্বীয় ব্যক্তিত্ব (Trinitarian Distinction)'],
        },
        {
          verseRange: '৩-৫ পদ',
          titleBn: 'সৃষ্টি ও জীবনের পরম উৎস',
          summaryBn: 'দৃশ্য ও অদৃশ্য সমস্ত সৃষ্টির একক মাধ্যম হলেন লগোস।',
          analysisBn: 'তাঁহাতেই জীবন ছিল এবং সেই জীবন মানুষের দীপ্তি। অন্ধকার সেই আলোকে নিভিয়ে দিতে পারেনি।',
          keyDoctrinalTruths: ['সৃষ্টিকর্তা খ্রীষ্ট (Creator)', 'জীবনের দীপ্তি (Light of Men)'],
        },
        {
          verseRange: '১৪-১৮ পদ',
          titleBn: 'মাংস ধারণ ও অনুগ্রহের প্রকাশ',
          summaryBn: 'অনন্ত বাক্য ইতিহাসে রক্ত-মাংস ধারণ করে আমাদের মাঝে তাম্বু স্থাপন (বাস) করলেন।',
          analysisBn: 'পুরাতন নিয়মে মোশির দ্বারা ব্যবস্থা দেওয়া হয়েছিল, কিন্তু যীশু খ্রীষ্টের মাধ্যমে অনুগ্রহ ও সত্য আবির্ভূত হলো। একমাত্র জাত পুত্রই অদৃশ্য ঈশ্বরকে প্রকাশ করেছেন।',
          keyDoctrinalTruths: ['অবতারতত্ত্ব (Incarnation)', 'ঈশ্বরের দৃশ্যমান প্রকাশ (Exegesis of the Father)'],
        },
      ],
      pastoralApplicationBn: 'যীশু কোনো সাধারণ শিক্ষক বা ভাববাদী নন; তিনি স্বয়ং মূর্ত ঈশ্বর। তাঁকে জানার মাধ্যমেই মানবজাতি ঈশ্বরের প্রকৃত হৃদয় ও অনুগ্রহের পরিচয় লাভ করে।',
    },

    theologicalPerspectives: {
      dialogueTopicBn: 'লগোসের পটভূমি: হিব্রু ‘দাভার/মেমরা’ বনাম গ্রীক ‘লগোস’ ধারণা',
      perspectives: [
        {
          perspectiveNameBn: 'যিহূদী ও পুরাতন নিয়ম কেন্দ্রিক দৃষ্টিভঙ্গি (Hebraic Memra View)',
          traditionBn: 'টারগুম, পুরাতন নিয়ম ও আদি প্যাট্রিস্টিক ঐতিহ্য',
          coreArgumentBn: 'যোহন মূলত পুরাতন নিয়মের ‘ঈশ্বরের বাক্য’ (Dabar Yahweh) এবং টারগুমের ‘মেমরা’ (Memra - ঈশ্বরের কার্যকারী উপস্থিতি) দ্বারা অনুপ্রাণিত। ঈশ্বর বাক্য দিয়েই বিশ্ব সৃষ্টি করেছিলেন (আদি ১:৩), সেই বাক্যই যীশু।',
          scriptureBasis: ['আদিপুস্তক ১:৩', 'গীতসংহিতা ৩৩:৬', 'যিশাইয় ৫৫:১১'],
        },
        {
          perspectiveNameBn: 'হেলেনীয় ও দার্শনিক সংযোগ দৃষ্টিভঙ্গি (Hellenistic Bridge View)',
          traditionBn: 'আলেকজান্দ্রিয়ার ফিলো ও আদি গ্রীক অপোলজিস্টগণ (জাস্টিন মার্টার)',
          coreArgumentBn: 'যোহন গ্রীক দার্শনিক ধারণাকে গ্রহণ করে তাকে পুনর্ব্যাখ্যা করেছেন। গ্রীকরা যাকে নির্ব্যক্তিক বিশ্বনিয়ন্তা মনে করতো, যোহন তাকে মূর্ত ব্যক্তি যীশু হিসেবে উপস্থাপন করে গ্রীক ও যিহূদী উভয় বিশ্বের মিলন ঘটান।',
          scriptureBasis: ['যোহন ১:১৪', '১ করিন্থীয় ১:২৪'],
        },
      ],
      unifyingConsensusBn: 'উভয় দৃষ্টিভঙ্গির চূড়ান্ত সত্য হলো: যীশু খ্রীষ্ট সৃষ্ট জগতের অংশ নন; তিনি স্বয়ং ঈশ্বর যিনি মানবজাতির পরিত্রাণের জন্য স্বেচ্ছায় রক্ত-মাংস গ্রহণ করেছেন।',
    },

    researchSources: {
      lexicalTerms: [
        {
          strongs: 'G3056',
          originalWord: 'λόγος (logos)',
          language: 'Greek',
          transliteration: 'logos',
          pronunciationBn: 'লগোস',
          meaningBn: 'বাক্য, দৈব বার্তা, স্বর্গীয় যুক্তি, পরম ভাবপ্রকাশ।',
          contextUsageBn: 'যোহন ১:১ ও ১৪ পদে ব্যবহৃত; ঈশ্বরের জীবন্ত, সক্রিয় ও ব্যক্তিগত আত্মপ্রকাশ।',
        },
        {
          strongs: 'G2316',
          originalWord: 'θεός (theos)',
          language: 'Greek',
          transliteration: 'theos',
          pronunciationBn: 'থিওস',
          meaningBn: 'ঈশ্বর, পরমেশ্বর।',
          contextUsageBn: '‘কাই থিওস এন হো লগোস’ বাক্যাংশে গুণবাচক প্রামাণিক ঈশ্বরত্ব ব্যক্ত করে।',
        },
        {
          strongs: 'G4561',
          originalWord: 'σάρξ (sarx)',
          language: 'Greek',
          transliteration: 'sarx',
          pronunciationBn: 'সার্ক্স',
          meaningBn: 'মাংস, মানবদেহ, নশ্বর মানবপ্রকৃতি।',
          contextUsageBn: 'যোহন ১:১৪ পদে ব্যবহৃত; খ্রীষ্ট কোনো ছায়ামূর্তি নন, বাস্তব রক্তমাংসের মানুষ হয়েছিলেন।',
        },
      ],
      crossReferences: [
        {
          ref: 'কলসীয় ১:১৫-১৭',
          relevanceBn: 'খ্রীষ্ট অদৃশ্য ঈশ্বরের প্রতিমূর্তি এবং সমস্ত সৃষ্টির আদি।',
          testament: 'NT',
        },
        {
          ref: 'ইব্রীয় ১:১-৩',
          relevanceBn: 'ঈশ্বর শেষকালে পুত্রের মাধ্যমে কথা বলিলেন, যিনি তাঁর তেজের প্রভা।',
          testament: 'NT',
        },
        {
          ref: 'হিতোপদেশ ৮:২২-৩১',
          relevanceBn: 'সৃষ্টির সূচনাকালে প্রজ্ঞার সহাবস্থান সংক্রান্ত কাব্যিক ভাববাণী।',
          testament: 'OT',
        },
      ],
      scholarlyCitations: [
        {
          authorBn: 'সেন্ট আথানাসিয়াস (St. Athanasius of Alexandria)',
          workBn: 'অন দি ইনকারনেশন (On the Incarnation of the Word)',
          eraOrYear: '৩১৮ খ্রীষ্টাব্দ',
          theologicalContributionBn: 'তিনি আরিয়ানদের বিরুদ্ধে প্রমাণ করেন যে লগোস যদি স্বয়ম্ভূ ঈশ্বর না হতেন, তবে মানুষের পরিত্রাণ সাধন কখনোই সম্ভব হতো না।',
        },
        {
          authorBn: 'এফ. এফ. ব্রুস (F.F. Bruce)',
          workBn: 'দ্য গসপেল অফ জন (The Gospel of John)',
          eraOrYear: '১৯৮৩ খ্রীষ্টাব্দ',
          theologicalContributionBn: 'যোহনের লগোসের যিহূদী ও গ্রীক ঐতিহাসিক গভীরতার প্রাতিষ্ঠানিক ব্যাখ্যা।',
        },
      ],
      primaryBibleEditions: [
        'The Bible Society of India (BSI) Bengali Bible (Free Bible / Re-edited Version)',
        'Nestle-Aland Novum Testamentum Graece (NA28 / UBS5 Greek New Testament)',
        'The Holy Bible: English Standard Version (ESV with Cross References)',
      ],
    },

    suggestedFollowUps: [
      'যোহন ১:১৪-এ ‘বাস করিলেন’ (skenoo) শব্দের প্রাচীন তাম্বুর সাথে সম্পর্ক কী?',
      'যোহন ১:১৮-এ ‘পিতার বক্ষে স্থিত একমাত্র জাত ঈশ্বর/পুত্র’ বলতে কী বোঝায়?',
      'আদিপুস্তক ১:১ এর সাথে যোহন ১:১ এর শাব্দিক সাদৃশ্য কী?',
    ],
  },

  'ephesians-2': {
    id: 'ask-ephesians-2',
    query: 'ইফিষীয় ২:৮-১০ — অনুগ্রহ ও সৎকর্মের সম্পর্ক কী?',
    titleBn: 'ইফিষীয় ২ অধ্যায়: কেবল অনুগ্রহেই বিশ্বাস দ্বারা পরিত্রাণ ও সৎকর্মের আহ্বান',
    subtitleBn: 'Salvation by Grace through Faith, and Good Works in Ephesians 2:8-10',
    theologicalCategory: 'পরিত্রাণবিদ্যা (Pauline Soteriology)',
    targetPassage: {
      bookId: 'EPH',
      bookNameBn: 'ইফিষীয়',
      chapter: 2,
      versesLabel: '১-১০ পদ',
    },
    retrievalPipeline: [
      {
        stepNumber: 1,
        stepNameBn: 'শাস্ত্রাংশ ও বিষয় শনাক্তকরণ',
        stepNameEn: 'Passage & Topic Extraction',
        status: 'retrieved',
        summaryBn: 'ইফিষীয় ২:১-১০ অনুচ্ছেদ চিহ্নিত ও নির্বাচিত।',
        itemsCount: 1,
      },
      {
        stepNumber: 2,
        stepNameBn: 'বিএসআই বাংলা পদ আহরণ',
        stepNameEn: 'BSI Scripture Text Retrieval',
        status: 'retrieved',
        summaryBn: 'পাপের মৃত্যু হইতে অনুগ্রহে নবজীবন এবং সৎকর্মের উদ্দেশ্যমূলক পদসমূহ আহরিত।',
        itemsCount: 10,
      },
      {
        stepNumber: 3,
        stepNameBn: 'ঐতিহাসিক ও পত্রীয় প্রেক্ষাপট',
        stepNameEn: 'Approved Exegetical Notes & Context',
        status: 'analyzed',
        summaryBn: 'ইফিষষের পাগান পরিবেশ ও পৌলের কারাবাসকালীন গভীর ধর্মতাত্ত্বিক নির্দেশনা।',
        itemsCount: 3,
      },
      {
        stepNumber: 4,
        stepNameBn: 'ক্রস-রেফারেন্স সমান্তরাল সূত্র',
        stepNameEn: 'Cross References & Parallel Synthesis',
        status: 'analyzed',
        summaryBn: 'তীত ৩:৫, গালাতীয় ২:১৬ ও যাকোব ২:১৭-এর তুলনামূলক পাঠ।',
        itemsCount: 4,
      },
      {
        stepNumber: 5,
        stepNameBn: 'মূল গ্রীক স্ট্রংস কনকর্ডেন্স',
        stepNameEn: 'Original Greek Lexical Sources',
        status: 'analyzed',
        summaryBn: 'G5485 (Charis), G4102 (Pistis), G4161 (Poiema) ব্যাকরণগত বিশ্লেষণ।',
        itemsCount: 3,
      },
      {
        stepNumber: 6,
        stepNameBn: '৫-মাত্রিক গবেষণা উত্তর সংশ্লেষণ',
        stepNameEn: '5-Dimensional Theological Synthesis',
        status: 'synthesized',
        summaryBn: 'সরাসরি শাস্ত্র, প্রেক্ষাপট, ব্যাখ্যা, বিভিন্ন মত ও গবেষণার সূত্র প্রস্তুত।',
      },
    ],

    directScripture: {
      headingBn: 'বাইবেল সরাসরি যা বলে (ইফিষীয় ২:৮-১০)',
      summaryBn: 'পরিত্রাণ সম্পূর্ণ ঈশ্বরের অযাচিত দান; সৎকর্ম পরিত্রাণের কারণ নয়, বরং পরিত্রাণের অবশ্যম্ভাবী ফল।',
      verses: [
        {
          reference: 'ইফিষীয় ২:৮',
          bookId: 'EPH',
          chapter: 2,
          verse: 8,
          textBn: 'কেননা অনুগ্রহেই বিশ্বাস দ্বারা তোমরা পরিত্রাণ পাইয়াছ; এবং ইহা তোমাদের হইতে হয় নাই, ঈশ্বরেরই দান;',
          highlightText: 'অনুগ্রহেই বিশ্বাস দ্বারা... ঈশ্বরেরই দান',
          contextNoteBn: 'পরিত্রাণ মানুষের অর্জন নয়, ঈশ্বরের শর্তহীন দান।',
        },
        {
          reference: 'ইফিষীয় ২:৯',
          bookId: 'EPH',
          chapter: 2,
          verse: 9,
          textBn: 'তাহা কর্মের ফল নয়, যেন কেহ শ্লাঘা না করে।',
          highlightText: 'তাহা কর্মের ফল নয়, যেন কেহ শ্লাঘা না করে',
          contextNoteBn: 'মানবসৃষ্ট কোনো ধার্মিকতা বা গর্বের স্থান এখানে নেই।',
        },
        {
          reference: 'ইফিষীয় ২:১০',
          bookId: 'EPH',
          chapter: 2,
          verse: 10,
          textBn: 'কারণ আমরা তাঁহারই রচিত, খ্রীষ্ট যীশুতে সৎকর্মের নিমিত্ত সৃষ্ট হইয়াছি, যে সৎকর্ম ঈশ্বর পূর্বে প্রস্তুত করিয়াছিলেন, যেন আমরা তাহাতে গমনাগমন করি।',
          highlightText: 'আমরা তাঁহারই রচিত, খ্রীষ্ট যীশুতে সৎকর্মের নিমিত্ত সৃষ্ট হইয়াছি',
          contextNoteBn: 'সৎকর্ম হলো নতুন সৃষ্টির উদ্দেশ্য ও স্বভাবজাত বহিঃপ্রকাশ।',
        },
      ],
      keyObservationsBn: [
        'পরিত্রাণের মূল ভিত্তি ঈশ্বরের নিঃশর্ত অনুগ্রহ, যা বিশ্বাসের মাধ্যমে গৃহীত হয় (ইফিষীয় ২:৮)।',
        'পরিত্রাণ মানুষের কোনো কর্মের ফল নয়, যেন কেহ গর্ব বা আত্মশ্লাঘা না করে (ইফিষীয় ২:৯)।',
        'আমরা খ্রীষ্টে সৎকর্মের নিমিত্ত সৃষ্ট হইয়াছি — সৎকর্ম পরিত্রাণের ভিত্তি নয়, বরং তার অনিবার্য ফল (ইফিষীয় ২:১০)।',
      ],
    },

    context: {
      authorDateBn: 'প্রেরিত পৌল; আনুমানিক খ্রীষ্টাব্দ ৬০-৬২ সালে রোমের কারাগারে বন্দিদশায় রচিত (Prison Epistle)।',
      historicalAudienceBn: 'ইফিষষ এবং এশিয়া মাইনরের খ্রীষ্টীয় মণ্ডলীসমূহ — অধিকাংশই পৌত্তলিক পটভূমি হইতে খ্রীষ্টে বিশ্বাসী।',
      geographicalSettingBn: 'ইফিষষ নগরী — আর্তিমিস দেবীর মন্দিরের জন্য বিখ্যাত ঐশ্বর্যময় ও জাদুটোনাপূর্ণ বাণিজ্যিক মহানগর।',
      literaryGenreStructureBn: 'সার্কুলার পত্র; ১-৩ অধ্যায়ে খ্রীষ্টে স্বর্গীয় আশীর্বাদ ও অনুগ্রহের ভিত্তি, ৪-৬ অধ্যায়ে বাস্তব জীবনে তার প্রয়োগ।',
      socioPoliticalBackgroundBn: 'পৌত্তলিক গ্রীক ধর্মে দেবতাদের কৃপা পেতে বলিদান ও আচার-অনুষ্ঠানের বিনিময় করতে হতো। পৌল এর সম্পূর্ণ বিপরীতে প্রচার করলেন যে সত্য ঈশ্বরের অনুগ্রহ কোনো উপহারের বিনিময়ে কেনা যায় না, তা খ্রীষ্টে সম্পূর্ণ মুক্তহস্তে প্রদত্ত।',
    },

    exposition: {
      coreThesisBn: 'ইফিষীয় ২:৮-১০ পরিষ্কারভাবে প্রতিষ্ঠিত করে যে: মানুষ সৎকর্ম করে পরিত্রাণ লাভ করে না, বরং পরিত্রাণ লাভ করেছে বলেই সে সৎকর্মের জীবনে প্রবেশ করে। অনুগ্রহ হলো মূলভিত্তি, বিশ্বাস হলো গ্রহণের মাধ্যম, এবং সৎকর্ম হলো নবজীবনের উদ্দেশ্য।',
      structuralOutline: [
        {
          verseRange: '১-৭ পদ',
          titleBn: 'মৃত্যু হইতে নবজীবনের রূপান্তর',
          summaryBn: 'পাপের মধ্যে আত্মিকভাবে মৃত মানুষকে ঈশ্বর অপার প্রেমে খ্রীষ্টের সহিত জীবিত করলেন।',
          analysisBn: 'মানুষ পাপের কারণে অসহায় ও ঈশ্বরের ক্রোধের পাত্র ছিল। কিন্তু দয়াতে ধনবান ঈশ্বর অনুগ্রহে নতুন জীবন দান করলেন।',
          keyDoctrinalTruths: ['পাপের আত্মিক মৃত্যু (Spiritual Deadness)', 'ঈশ্বরের অপার দয়া (Rich in Mercy)', 'খ্রীষ্টে পুনরুত্থান (Made Alive in Christ)'],
        },
        {
          verseRange: '৮-৯ পদ',
          titleBn: 'অনুগ্রহে পরিত্রাণ ও মানবীয় অহংকারের বিলোপ',
          summaryBn: 'পরিত্রাণ মানুষের কোনো কর্মের ফল নয়, বরং একমাত্র ঈশ্বরের দান।',
          analysisBn: 'গ্রীক ব্যাকরণে ‘ইহা তোমাদের হইতে হয় নাই’ সমগ্র প্রক্রিয়ার (অনুগ্রহ ও বিশ্বাস) ঐশ্বরিক উৎস নির্দেশ করে। তাই কোনো মানুষের অহংকার করার সুযোগ নেই।',
          keyDoctrinalTruths: ['একমাত্র অনুগ্রহে পরিত্রাণ (Sola Gratia)', 'একমাত্র বিশ্বাসে পরিত্রাণ (Sola Fide)', 'শ্লাঘাহীনতা (No Boasting)'],
        },
        {
          verseRange: '১০ পদ',
          titleBn: 'ঈশ্বরের অপূর্ব শিল্পকর্ম ও সৎকর্মের পথচলা',
          summaryBn: 'খ্রীষ্টে বিশ্বাসী ঈশ্বরের হস্তনির্মিত শ্রেষ্ঠ শিল্পকর্ম (Poiema)।',
          analysisBn: 'সৎকর্ম পরিত্রাণ পাওয়ার শর্ত নয়, বরং পরিত্রাণপ্রাপ্ত জীবনের স্বাভাবিক ফল। ঈশ্বর এই সৎকর্মের পথ পূর্বেই প্রস্তুত রেখেছেন।',
          keyDoctrinalTruths: ['ঈশ্বরের শিল্পকর্ম (Masterpiece / Poiema)', 'সৎকর্মের উদ্দেশ্য (Fruit of Faith)'],
        },
      ],
      pastoralApplicationBn: 'কোনো বিশ্বাসী যেন নিজেকে অযোগ্য ভেবে নিরাশ না হন, কারণ পরিত্রাণ তার যোগ্যতার উপর নির্ভর করে না। আবার অনুগ্রহের দোহাই দিয়ে কেউ যেন পাপে জীবনযাপন না করেন, কারণ খ্রীষ্টে নতুন সৃষ্টির উদ্দেশ্যই হলো সৎকর্মে চলা।',
    },

    theologicalPerspectives: {
      dialogueTopicBn: 'বিশ্বাস ও সৎকর্মের পারস্পরিক অবস্থান',
      perspectives: [
        {
          perspectiveNameBn: 'ঐতিহাসিক প্রটেস্ট্যান্ট সংস্কার দৃষ্টিভঙ্গি (Reformation Principle)',
          traditionBn: 'মার্টিন লুথার, ফিলিপ মেলান্থন ও সংস্কারকগণ',
          coreArgumentBn: 'আমরা একমাত্র বিশ্বাস দ্বারাই ধার্মিক গণ্য হই, কিন্তু সেই বিশ্বাস কখনোই একাকী থাকে না — তা প্রেমে সৎকর্মে ফলবান হয় (We are saved by faith alone, but the faith that saves is never alone)।',
          scriptureBasis: ['গালাতীয় ৫:৬', 'রোমীয় ৩:২৮', 'তীত ৩:৮'],
        },
        {
          perspectiveNameBn: 'ক্যাথলিক ও অর্থোডক্স ঐতিহ্যিক মূল্যায়ন (Historical Ecclesial View)',
          traditionBn: 'টমাস অ্যাকুইনাস ও প্রারম্ভিক ধর্মতাত্ত্বিকগণ',
          coreArgumentBn: 'অনুগ্রহ বিশ্বাসীকে কেবল আইনি ক্ষমা দেয় না, বরং তার ভেতর সৎকর্ম করার ঐশ্বরিক সামর্থ্য (Sanctifying Grace) সৃষ্টি করে। সৎকর্ম খ্রীষ্টের অনুগ্রহে সঞ্জীবিত প্রেমের অভিব্যক্তি।',
          scriptureBasis: ['মথি ২৫:৩১-৪৬', 'ফিলিপীয় ২:১২-১৩'],
        },
      ],
      unifyingConsensusBn: 'খ্রিস্টীয় সকল মূল ধারার ঐকমত্য হলো: কোনো মানুষ নিজ পুণ্য দিয়ে ঈশ্বরের অনুগ্রহ কিনতে পারে না; প্রকৃত পরিত্রাণকারী বিশ্বাস সবসময় খ্রীষ্টতুল্য সৎকর্মে ও প্রেমে নিজেকে প্রকাশ করে।',
    },

    researchSources: {
      lexicalTerms: [
        {
          strongs: 'G5485',
          originalWord: 'χάρις (charis)',
          language: 'Greek',
          transliteration: 'charis',
          pronunciationBn: 'খারিস',
          meaningBn: 'অনুগ্রহ, অযাচিত করুণা, অযোগ্যকে প্রদত্ত ঐশ্বরিক দান।',
          contextUsageBn: 'ইফিষীয় ২:৮ পদে ব্যবহৃত; ঈশ্বরের পরম দান যা কোনো মূল্য দিয়ে অর্জিত নয়।',
        },
        {
          strongs: 'G4102',
          originalWord: 'πίστις (pistis)',
          language: 'Greek',
          transliteration: 'pistis',
          pronunciationBn: 'পিস্টিস',
          meaningBn: 'বিশ্বাস, বিশ্বস্ততা, সম্পূর্ণ আত্মসমর্পণ ও নির্ভরতা।',
          contextUsageBn: 'ইফিষীয় ২:৮ পদে ব্যবহৃত; যে হাতের মাধ্যমে বিশ্বাসী ঈশ্বরের অনুগ্রহ গ্রহণ করে।',
        },
        {
          strongs: 'G4161',
          originalWord: 'ποίημα (poiema)',
          language: 'Greek',
          transliteration: 'poiema',
          pronunciationBn: 'পইয়েমা',
          meaningBn: 'শিল্পকর্ম, কবিতা, হস্তনির্মিত শ্রেষ্ঠ সৃষ্টি।',
          contextUsageBn: 'ইফিষীয় ২:১০ পদে ‘আমরা তাঁহারই রচিত’; খ্রীষ্টে বিশ্বাসী ঈশ্বরের মাস্টারপিস।',
        },
      ],
      crossReferences: [
        {
          ref: 'তীত ৩:৫',
          relevanceBn: 'ধার্মিকতার কর্মের কারণে নয়, কিন্তু তাঁর দয়া অনুসারে আমাদের রক্ষা করিলেন।',
          testament: 'NT',
        },
        {
          ref: 'যাকোব ২:১৪-২৬',
          relevanceBn: 'কর্মবিহীন বিশ্বাস মৃত — সত্য বিশ্বাসের ফল হিসেবে কর্মের প্রমাণ।',
          testament: 'NT',
        },
        {
          ref: '২ তীমথিয় ১:৯',
          relevanceBn: 'আমাদের কর্মানুসারে নয়, আপন সংকল্প ও অনুগ্রহানুসারেই আমাদিগকে আহ্বান করিলেন।',
          testament: 'NT',
        },
      ],
      scholarlyCitations: [
        {
          authorBn: 'জন স্টট (John Stott)',
          workBn: 'দ্য মেসেজ অফ ইফেসিয়ান্স (The Message of Ephesians)',
          eraOrYear: '১৯৭৯ খ্রীষ্টাব্দ',
          theologicalContributionBn: 'তিনি ইফিষীয় ২:৮-১০ কে সংজ্ঞায়িত করেন: ‘পরিত্রাণ অনুগ্রহের দ্বারা শুরু হয়, বিশ্বাসের দ্বারা গৃহীত হয় এবং সৎকর্মের মাধ্যমে প্রকাশ পায়।’',
        },
        {
          authorBn: 'মার্টিন লুথার (Martin Luther)',
          workBn: 'কমেন্টারি অন গালাশিয়ান্স ও রোমান্স',
          eraOrYear: '১৫৩৫ খ্রীষ্টাব্দ',
          theologicalContributionBn: '‘সৎকর্ম পরিত্রাণ দেয় না, কিন্তু পরিত্রাণপ্রাপ্ত মানুষ সৎকর্ম না করে থাকতে পারে না।’',
        },
      ],
      primaryBibleEditions: [
        'The Bible Society of India (BSI) Bengali Bible (Free Bible / Re-edited Version)',
        'Nestle-Aland Novum Testamentum Graece (NA28 / UBS5 Greek New Testament)',
        'The Holy Bible: English Standard Version (ESV with Cross References)',
      ],
    },

    suggestedFollowUps: [
      'ইফিষীয় ২:১০ এর ‘পইয়েমা’ (Poiema) শব্দের তাৎপর্য কী?',
      'ইফিষীয় ২ এবং যাকোব ২ এর বিশ্বাস ও কর্মের আপাত বৈপরীত্য কীভাবে সমন্বয় করা যায়?',
      'ইফিষীয় ২:১৪-১৬ এ ‘মধ্যবর্তী প্রাচীর ভাঙিয়া ফেলা’ বলতে কী বোঝায়?',
    ],
  },

  'james-2-romans-4': {
    id: 'ask-james-2-romans-4',
    query: 'যাকোব ২ ও রোমীয় ৪: বিশ্বাস ও কর্মের সম্পর্ক কী?',
    titleBn: 'যাকোব ২ ও রোমীয় ৪: বিশ্বাস ও কর্মের ঐশ্বরিক সমন্বয়',
    subtitleBn: 'Justification by Faith and Works: Harmonizing Paul (Romans 4) and James (James 2)',
    theologicalCategory: 'পরিত্রাণবিদ্যা ও তুলনামূলক ধর্মতত্ত্ব (Biblical Theology)',
    targetPassage: {
      bookId: 'JAS',
      bookNameBn: 'যাকোব ও রোমীয়',
      chapter: 2,
      versesLabel: 'যাকোব ২:১৪-২৬, রোমীয় ৪:১-৫',
    },
    retrievalPipeline: [
      {
        stepNumber: 1,
        stepNameBn: 'শাস্ত্রাংশ ও বিষয় শনাক্তকরণ',
        stepNameEn: 'Passage & Topic Extraction',
        status: 'retrieved',
        summaryBn: 'যাকোব ২:১৪-২৬ ও রোমীয় ৪:১-৫ পদের তুলনামূলক বিশ্লেষণ চিহ্নিত।',
        itemsCount: 2,
      },
      {
        stepNumber: 2,
        stepNameBn: 'বিএসআই বাংলা পদ আহরণ',
        stepNameEn: 'BSI Scripture Text Retrieval',
        status: 'retrieved',
        summaryBn: 'আব্রাহামের বিশ্বাস ও ইস্‌হাককে উৎসর্গের প্রাসঙ্গিক পদসমূহ আহরিত।',
        itemsCount: 12,
      },
      {
        stepNumber: 3,
        stepNameBn: 'ঐতিহাসিক ও পত্রীয় প্রেক্ষাপট',
        stepNameEn: 'Approved Exegetical Notes & Context',
        status: 'analyzed',
        summaryBn: 'পৌলীয় আইনি ধার্মিক গণ্যকরণ (Justification before God) বনাম যাকোবীয় জীবন্ত বিশ্বাসের প্রকাশ (Vindication before Men)।',
        itemsCount: 2,
      },
      {
        stepNumber: 4,
        stepNameBn: 'ক্রস-রেফারেন্স সমান্তরাল সূত্র',
        stepNameEn: 'Cross References & Parallel Synthesis',
        status: 'analyzed',
        summaryBn: 'আদিপুস্তক ১৫:৬, আদিপুস্তক ২২:৯-১২ ও গালাতীয় ৫:৬ সংযুক্ত।',
        itemsCount: 4,
      },
      {
        stepNumber: 5,
        stepNameBn: 'মূল গ্রীক স্ট্রংস কনকর্ডেন্স',
        stepNameEn: 'Original Greek Lexical Sources',
        status: 'analyzed',
        summaryBn: 'G1344 (Dikaioo), G4102 (Pistis), G2041 (Ergon) ব্যাকরণগত ভিন্নতা বিশ্লেষণ।',
        itemsCount: 3,
      },
      {
        stepNumber: 6,
        stepNameBn: '৫-মাত্রিক গবেষণা উত্তর সংশ্লেষণ',
        stepNameEn: '5-Dimensional Theological Synthesis',
        status: 'synthesized',
        summaryBn: 'সরাসরি শাস্ত্র, প্রেক্ষাপট, ব্যাখ্যা, বিভিন্ন মত ও গবেষণার সূত্র প্রস্তুত।',
      },
    ],

    directScripture: {
      headingBn: 'বাইবেল সরাসরি যা বলে (রোমীয় ৪ ও যাকোব ২)',
      summaryBn: 'পৌল শিক্ষা দেন যে ঈশ্বর একমাত্র বিশ্বাসের ভিত্তিতে পাপীকে ধার্মিক গণ্য করেন; যাকোব শিক্ষা দেন যে সেই সত্য বিশ্বাস কর্মের দ্বারাই প্রমাণিত ও জীবন্ত হয়।',
      verses: [
        {
          reference: 'রোমীয় ৪:২-৩',
          bookId: 'ROM',
          chapter: 4,
          verse: 2,
          textBn: 'আব্রাহাম যদি কর্মের দ্বারা ধার্মিক গণ্য হইয়া থাকেন, তবে তাঁহার শ্লাঘা করিবার বিষয় আছে, কিন্তু ঈশ্বরের সম্মুখে নাই। কারণ শাস্ত্রে কি বলে? ‘আব্রাহাম ঈশ্বরে বিশ্বাস করিলেন, এবং তাহা তাঁহার পক্ষে ধার্মিকতা বলিয়া গণিত হইল।’',
          highlightText: 'আব্রাহাম ঈশ্বরে বিশ্বাস করিলেন... ধার্মিকতা বলিয়া গণিত হইল',
          contextNoteBn: 'ঈশ্বরের দৃষ্টিতে ধার্মিক গণ্যকরণের একক শর্ত বিশ্বাস।',
        },
        {
          reference: 'যাকোব ২:১৭',
          bookId: 'JAS',
          chapter: 2,
          verse: 17,
          textBn: 'তদ্রূপ বিশ্বাসও, কর্ম যদি তাহার না থাকে, তবে তাহা আপনিই মৃত।',
          highlightText: 'কর্ম যদি তাহার না থাকে, তবে তাহা আপনিই মৃত',
          contextNoteBn: 'কর্মহীন বিশ্বাস কেবল মৌখিক দাবি, তা জীবন্ত বিশ্বাস নয়।',
        },
        {
          reference: 'যাকোব ২:২১-২২',
          bookId: 'JAS',
          chapter: 2,
          verse: 21,
          textBn: 'আমাদের পিতা আব্রাহাম কি কর্ম দ্বারাই ধার্মিক গণ্য হন নাই, যখন তিনি যজ্ঞবেদির উপরে নিজ পুত্র ইস্‌হাককে উৎসর্গ করিলেন? তুমি দেখিতেছ যে, বিশ্বাস তাঁহার কর্মের সহকারী হইয়াছিল, এবং কর্ম দ্বারা বিশ্বাস সিদ্ধ হইল।',
          highlightText: 'কর্ম দ্বারা বিশ্বাস সিদ্ধ হইল',
          contextNoteBn: 'বিশ্বাস তার ফল বা কর্মের মধ্য দিয়ে পূর্ণতা লাভ করে।',
        },
      ],
      keyObservationsBn: [
        'পৌল জোর দেন পরিত্রাণের ভিত্তির উপর: ঈশ্বরের দৃষ্টিতে ধার্মিক গণ্যকরণ কেবল বিশ্বাসের দ্বারাই হয় (রোমীয় ৪:২-৫)।',
        'যাকোব জোর দেন সত্য বিশ্বাসের প্রমাণের উপর: কর্মবিহীন মৌখিক দাবি মূলত আত্মিক অর্থে মৃত (যাকোব ২:১৭, ২৬)।',
        'উভয় প্রেরিত পিতা আব্রাহামের উদাহরণ ব্যবহার করেছেন: পৌল তাঁর বিশ্বাসের সূচনা এবং যাকোব তাঁর বিশ্বাসের পূর্ণতা নির্দেশ করেন।',
      ],
    },

    context: {
      authorDateBn: 'পৌল রোমীয় পত্র লেখেন আনুমানিক ৫৭ খ্রীষ্টাব্দে; যাকোব তাঁর পত্র লেখেন সম্ভবত আদি খ্রীষ্টীয় পর্বে (আনুমানিক ৪৪-৪৮ খ্রীষ্টাব্দে)।',
      historicalAudienceBn: 'পৌল কথা বলছেন এমন যিহূদীদের বিরুদ্ধে যারা ব্যবস্থার কর্মের (সুন্নতের নিয়ম ইত্যাদি) দ্বারা পরিত্রাণ অর্জন করতে চাইত। যাকোব কথা বলছেন এমন অকর্মণ্য বিশ্বাসীদের বিরুদ্ধে যারা মনে করত মুখে বিশ্বাস বললেই যথেষ্ট, জীবনে কোনো খ্রীষ্টীয় প্রেম বা দরিদ্রের সেবার প্রয়োজন নেই।',
      geographicalSettingBn: 'রোম বনাম জেরুজালেম ও প্যালেস্টাইনের ছড়িয়ে ছিটিয়ে থাকা দ্বাদশ বংশ।',
      literaryGenreStructureBn: 'পৌল আইনি/বিচারবিভাগীয় ভাষা ব্যবহার করেছেন; যাকোব প্রজ্ঞাসাহিত্যিক ও ব্যবহারিক নৈতিক ভাষা ব্যবহার করেছেন।',
      socioPoliticalBackgroundBn: 'উভয় প্রেরিত একই ব্যক্তি আব্রাহামের জীবনের দুটি ভিন্ন অধ্যায় উল্লেখ করেছেন: পৌল উদ্ধৃত করেছেন আদিপুস্তক ১৫:৬ (ঈশ্বরের প্রতিজ্ঞায় আব্রাহামের বিশ্বাস, যখন তাঁর কোনো সন্তান ছিল না), আর যাকোব উদ্ধৃত করেছেন আদিপুস্তক ২২ অধ্যায় (৩০ বছর পর মোশন পাহাড়ে ইস্‌হাককে উৎসর্গ করার বাস্তব পরীক্ষা)।',
    },

    exposition: {
      coreThesisBn: 'পৌল এবং যাকোব পরস্পরবিরোধী নন, বরং একই মুদ্রার দুটি পিঠ। পৌল ব্যাখ্যা করেন পরিত্রাণের ‘মূল’ (Root) যা একমাত্র বিশ্বাস; আর যাকোব ব্যাখ্যা করেন পরিত্রাণের ‘ফল’ (Fruit) যা সৎকর্ম।',
      structuralOutline: [
        {
          verseRange: 'রোমীয় ৪:১-৮',
          titleBn: 'ঈশ্বরের সম্মুখে আইনি ধার্মিক গণ্যকরণ',
          summaryBn: 'পাপী মানুষ নিজ পুণ্যে নয়, খ্রীষ্টের রক্তে বিশ্বাস করে ঈশ্বরের দ্বারা ধার্মিক ঘোষিত হয়।',
          analysisBn: 'গ্রীক শব্দ ‘লগিজোমাই’ (হিসাবভুক্ত করা); ঈশ্বর আব্রাহামের বিশ্বাসকেই ধার্মিকতার খাতায় জমা করেছিলেন। এটি মানুষের চেষ্টার বেতন নয়, ঈশ্বরের অনুগ্রহের উপহার।',
          keyDoctrinalTruths: ['নিঃশর্ত অনুগ্রহ (Justification Sola Fide)', 'আইনি খালাস (Imputed Righteousness)'],
        },
        {
          verseRange: 'যাকোব ২:১৪-২৬',
          titleBn: 'মানুষের সম্মুখে জীবন্ত বিশ্বাসের প্রমাণ ও কার্যকারিতা',
          summaryBn: 'যে বিশ্বাসে ক্ষুধার্তকে অন্ন দান বা শীতার্তকে বস্ত্র দানের ইচ্ছা নেই, সেই বিশ্বাস ভুয়া।',
          analysisBn: 'ভূতরাও বিশ্বাস করে ঈশ্বর এক, এবং ভয়ে কাঁপে (পদ ১৯)। তাই কেবল বুদ্ধিবৃত্তিক সম্মতি বিশ্বাস নয়; সত্য বিশ্বাস আত্মোৎসর্গকারী বাধ্যতায় নিজেকে প্রমাণ করে (পদ ২১-২৬)।',
          keyDoctrinalTruths: ['জীবন্ত বিশ্বাস বনাম মৃত বিশ্বাস (Living vs Dead Faith)', 'বিশ্বাসের যাথার্থ্য প্রমাণ (Vindication of Faith)'],
        },
      ],
      pastoralApplicationBn: 'আমরা পরিত্রাণের জন্য কর্মের উপর নির্ভর করি না (কারণ তা অহংকার আনে), কিন্তু পরিত্রাণ পেয়েছি বলেই আনন্দের সাথে অভাবগ্রস্তের সেবা ও সৎকর্ম করি। বিশ্বাস হলো অগ্নিকাণ্ড, আর কর্ম হলো তার উত্তাপ ও আলো।',
    },

    theologicalPerspectives: {
      dialogueTopicBn: 'পৌল ও যাকোবের ‘ধার্মিক গণ্যকরণ’ (Dikaioo) শব্দের প্রয়োগ',
      perspectives: [
        {
          perspectiveNameBn: 'সংস্কারবাদী ঐতিহাসিক দৃষ্টিভঙ্গি (Classical Protestant Synthesis)',
          traditionBn: 'মার্টিন লুথার, জন ক্যালভিন ও চার্লস স্পার Spurgeon',
          coreArgumentBn: 'লুথার বলেছিলেন: ‘বিশ্বাস একা পরিত্রাণ আনে, কিন্তু যে বিশ্বাস পরিত্রাণ আনে তা কখনোই একা থাকে না।’ পৌল যুদ্ধ করছেন আইনি অহংকারের বিরুদ্ধে (Legalism), আর যাকোব যুদ্ধ করছেন নীতিহীন অকর্মণ্যতার বিরুদ্ধে (Antinomianism)।',
          scriptureBasis: ['গালাতীয় ৫:৬', 'রোমীয় ৩:২৮', 'ইফিষীয় ২:৮-১০'],
        },
        {
          perspectiveNameBn: 'সমগ্র ক্যানন ভিত্তিক দৃষ্টিভঙ্গি (Canonical Wholeness View)',
          traditionBn: 'সেন্ট অগাস্টিন ও সি. এস. লিউইস',
          coreArgumentBn: 'খ্রীষ্টীয় ধর্মে বিশ্বাস ও কর্ম কাঁচির দুটি ফলার মতো। একটি ছাড়া অন্যটি অকার্যকর। ঈশ্বর বিশ্বাসীকে ধার্মিক ঘোষণা করে স্থির রাখেন না, পবিত্রকরণ প্রক্রিয়ায় তাকে সৎকর্মের প্রতিমূর্তিতে রূপান্তর করেন।',
          scriptureBasis: ['মথি ৭:২১-২৩', '১ যোহন ৩:১৭-১৮'],
        },
      ],
      unifyingConsensusBn: 'খ্রীষ্টের মণ্ডলী সর্বসম্মতভাবে বিশ্বাস করে: কেউই নিজের কর্ম দিয়ে পরিত্রাণ উপার্জন করতে পারে না; কিন্তু যার জীবনে কোনো সৎকর্ম ও রূপান্তর নেই, তার বিশ্বাস মেকি।',
    },

    researchSources: {
      lexicalTerms: [
        {
          strongs: 'G1344',
          originalWord: 'δικαιόω (dikaioo)',
          language: 'Greek',
          transliteration: 'dikaioo',
          pronunciationBn: 'দিকায়ো',
          meaningBn: 'ধার্মিক ঘোষণা করা, নির্দোষ সাব্যস্ত করা, যাথার্থ্য প্রমাণ করা।',
          contextUsageBn: 'পৌল এটি ব্যবহার করেছেন ঈশ্বরের আদালতে আইনি খালাস অর্থে; যাকোব ব্যবহার করেছেন মানুষের সাক্ষ্যে সত্যতার প্রমাণ অর্থে।',
        },
        {
          strongs: 'G2041',
          originalWord: 'ἔργον (ergon)',
          language: 'Greek',
          transliteration: 'ergon',
          pronunciationBn: 'এরগন',
          meaningBn: 'কর্ম, কার্য, আচরণ, ফল।',
          contextUsageBn: 'পৌলের কাছে এরগন হলো ‘ব্যবস্থার কর্ম’ (Works of Law); যাকোবের কাছে এরগন হলো ‘প্রেমের সেবা ও আনুগত্য’ (Works of Love).',
        },
      ],
      crossReferences: [
        {
          ref: 'আদিপুস্তক ১৫:৬',
          relevanceBn: 'আব্রাহামের বিশ্বাসের ধার্মিকতা হিসেবে গণ্য হওয়ার মূল শাস্ত্রাংশ।',
          testament: 'OT',
        },
        {
          ref: 'আদিপুস্তক ২২:৯-১২',
          relevanceBn: 'ইস্‌হাককে বেদির উপর উৎসর্গের মাধ্যমে আব্রাহামের বিশ্বাসের বাধ্যতা প্রমাণ।',
          testament: 'OT',
        },
        {
          ref: 'গালাতীয় ৫:৬',
          relevanceBn: '‘প্রেমের দ্বারা কার্যকারী বিশ্বাস’ — পৌলের নিজের লেখায় যাকোবীয় ধারণার চূড়ান্ত প্রতিফলন।',
          testament: 'NT',
        },
      ],
      scholarlyCitations: [
        {
          authorBn: 'জন ক্যালভিন (John Calvin)',
          workBn: 'ইনস্টিটিউটস অফ দ্য ক্রিশ্চিয়ান রিলিজিয়ন (Institutes, III.17.8)',
          eraOrYear: '১৫৫৯ খ্রীষ্টাব্দ',
          theologicalContributionBn: '‘পৌল আলোচনা করেছেন কীভাবে মানুষ ঈশ্বরের সম্মুখে ধার্মিকতা লাভ করে; আর যাকোব আলোচনা করেছেন কীভাবে মানুষ নিজ বিশ্বাসের সত্যতা প্রদর্শন করে।’',
        },
        {
          authorBn: 'ড্যানিয়েল বি. ওয়ালেস (Daniel B. Wallace)',
          workBn: 'নিউ টেস্টামেন্ট গ্রীক গ্রামার বিয়ন্ড দ্য বেসিকস',
          eraOrYear: '১৯৯৬ খ্রীষ্টাব্দ',
          theologicalContributionBn: '‘দিকায়ো’ ক্রিয়াপদের语义 ক্ষেত্র (Semantic Range) বিশ্লেষণ করে তিনি দেখান কীভাবে পৌল ও যাকোব শব্দটির দুটি ভিন্ন বৈধ অর্থ ব্যবহার করেছেন।',
        },
      ],
      primaryBibleEditions: [
        'The Bible Society of India (BSI) Bengali Bible (Free Bible / Re-edited Version)',
        'Nestle-Aland Novum Testamentum Graece (NA28 / UBS5 Greek New Testament)',
        'The Holy Bible: English Standard Version (ESV with Cross References)',
      ],
    },

    suggestedFollowUps: [
      'লুথার কেন একসময় যাকোবের পত্রকে ‘খড়ের পত্র’ বলেছিলেন এবং পরে তাঁর মতামত কী ছিল?',
      'গালাতীয় ৫:৬ এ ‘প্রেমের দ্বারা কার্যকারী বিশ্বাস’ বলতে পৌল কী বুঝিয়েছেন?',
      'আব্রাহামের জীবনে বিশ্বাস ও কর্মের কালানুক্রমিক ব্যবধান কত বছরের ছিল?',
    ],
  },

  'salvation-assurance': {
    id: 'ask-salvation-assurance',
    query: 'পরিত্রাণ কি হারানো সম্ভব? অনন্ত জীবনের নিশ্চয়তা',
    titleBn: 'পরিত্রাণের নিশ্চয়তা: অনন্ত জীবন, ঈশ্বরের বিশ্বস্ততা ও বিশ্বাসের স্থায়িত্ব',
    subtitleBn: 'Assurance of Salvation, Eternal Security, and the Perseverance of the Saints',
    theologicalCategory: 'পরিত্রাণবিদ্যা (Soteriology & Pastoral Care)',
    targetPassage: {
      bookId: 'JHN',
      bookNameBn: 'যোহন ও রোমীয়',
      chapter: 10,
      versesLabel: 'যোহন ১০:২৮-২৯, রোমীয় ৮:৩৮-৩৯, ১ যোহন ৫:১৩',
    },
    retrievalPipeline: [
      {
        stepNumber: 1,
        stepNameBn: 'শাস্ত্রাংশ ও বিষয় শনাক্তকরণ',
        stepNameEn: 'Passage & Topic Extraction',
        status: 'retrieved',
        summaryBn: 'অনন্ত জীবনের নিশ্চয়তা ও বিশ্বাসে টিকে থাকা সংক্রান্ত শাস্ত্রাংশ চিহ্নিত।',
        itemsCount: 3,
      },
      {
        stepNumber: 2,
        stepNameBn: 'বিএসআই বাংলা পদ আহরণ',
        stepNameEn: 'BSI Scripture Text Retrieval',
        status: 'retrieved',
        summaryBn: 'মেষপালকের হাত, ঈশ্বরের মোহর ও অনন্ত জীবনের প্রতিজ্ঞামূলক পদসমূহ আহরিত।',
        itemsCount: 15,
      },
      {
        stepNumber: 3,
        stepNameBn: 'ঐতিহাসিক ও যাজকীয় প্রেক্ষাপট',
        stepNameEn: 'Approved Exegetical Notes & Context',
        status: 'analyzed',
        summaryBn: 'আদি মণ্ডলীর তাড়নার মুখে বিশ্বাসীদের সান্ত্বনা ও বিশ্বস্ততার আহ্বান।',
        itemsCount: 2,
      },
      {
        stepNumber: 4,
        stepNameBn: 'ক্রস-রেফারেন্স সমান্তরাল সূত্র',
        stepNameEn: 'Cross References & Parallel Synthesis',
        status: 'analyzed',
        summaryBn: 'ইব্রীয় ৬:৪-৬, ফিলিপীয় ১:৬ ও ইফিষীয় ১:১৩-১৪ সংযুক্ত।',
        itemsCount: 4,
      },
      {
        stepNumber: 5,
        stepNameBn: 'মূল গ্রীক স্ট্রংস কনকর্ডেন্স',
        stepNameEn: 'Original Greek Lexical Sources',
        status: 'analyzed',
        summaryBn: 'G166 (Aionios), G4972 (Sphragizo), G726 (Harpazo) ব্যাকরণগত বিশ্লেষণ।',
        itemsCount: 3,
      },
      {
        stepNumber: 6,
        stepNameBn: '৫-মাত্রিক গবেষণা উত্তর সংশ্লেষণ',
        stepNameEn: '5-Dimensional Theological Synthesis',
        status: 'synthesized',
        summaryBn: 'সরাসরি শাস্ত্র, প্রেক্ষাপট, ব্যাখ্যা, বিভিন্ন মত ও গবেষণার সূত্র প্রস্তুত।',
      },
    ],

    directScripture: {
      headingBn: 'বাইবেল সরাসরি যা বলে (যোহন ১০, রোমীয় ৮, ১ যোহন ৫)',
      summaryBn: 'যীশু স্পষ্ট ঘোষণা করেছেন যে তাঁর মেষগণ কখনো বিনষ্ট হইবে না এবং পিতার হাত থেকে কেউ তাদের কাড়িয়া লইতে পারিবে না।',
      verses: [
        {
          reference: 'যোহন ১০:২৮-২৯',
          bookId: 'JHN',
          chapter: 10,
          verse: 28,
          textBn: 'আর আমি তাহাদিগকে অনন্ত জীবন দিই, এবং তাহারা কখনো বিনষ্ট হইবে না, এবং কেহ আমার হস্ত হইতে তাহাদিগকে কাড়িয়া লইবে না। আমার পিতা, যিনি আমাকে সেগুলি দিয়াছেন, তিনি সকলের চেয়ে মহান; এবং পিতার হস্ত হইতে কাড়িয়া লইতে কেহ সমর্থ নয়।',
          highlightText: 'কখনো বিনষ্ট হইবে না... কেহ কাড়িয়া লইবে না',
          contextNoteBn: 'উভয় পুত্র ও পিতার দ্বৈত সুরক্ষার পরম প্রতিজ্ঞা।',
        },
        {
          reference: '১ যোহন ৫:১৩',
          bookId: '1JN',
          chapter: 5,
          verse: 13,
          textBn: 'তোমরা যাহারা ঈশ্বরের পুত্রের নামে বিশ্বাস কর, তোমাদিগকে আমি এই সমস্ত লিখিলাম, যেন তোমরা জানিতে পার যে, তোমাদের অনন্ত জীবন আছে।',
          highlightText: 'যেন তোমরা জানিতে পার যে, তোমাদের অনন্ত জীবন আছে',
          contextNoteBn: 'পরিত্রাণ কোনো অনিশ্চিত আশা নয়, বর্তমানের নিশ্চিত অভিজ্ঞতা।',
        },
        {
          reference: 'ইফিষীয় ১:১৩-১৪',
          bookId: 'EPH',
          chapter: 1,
          verse: 13,
          textBn: 'তাঁহাতে তোমরাও... প্রতিশ্রুত পবিত্র আত্মা দ্বারা চিহ্নিত ও মোহরাঙ্কিত হইয়াছ, যিনি আমাদের অধিকারের বায়না স্বরূপ।',
          highlightText: 'পবিত্র আত্মা দ্বারা চিহ্নিত ও মোহরাঙ্কিত... অধিকারের বায়না স্বরূপ',
          contextNoteBn: 'পবিত্র আত্মা স্বর্গের অনন্ত উত্তরাধিকারের ঐশ্বরিক নিশ্চয়তা।',
        },
      ],
      keyObservationsBn: [
        'খ্রীষ্টের মেষগণ কখনোই বিনষ্ট হবে না এবং পিতার হাত থেকে কেউ তাদের কেড়ে নিতে পারবে না (যোহন ১০:২৮-২৯)।',
        'ঈশ্বরের প্রেম থেকে পার্থিব বা আত্মিক কোনো সৃষ্টিই বিশ্বাসীকে বিচ্ছিন্ন করতে পারে না (রোমীয় ৮:৩৮-৩৯)।',
        'পবিত্র আত্মা বিশ্বাসীর অন্তরে চূড়ান্ত মুক্তির দিন পর্যন্ত নিশ্চয়তার স্বর্গীয় বায়না ও মোহর (ইফিষীয় ১:১৩-১৪)।',
      ],
    },

    context: {
      authorDateBn: 'যোহন সুসমাচার ও ১ যোহন আনুমানিক খ্রীষ্টাব্দ ৮৫-৯০ সালে রচিত; পৌলীয় পত্রাবলী আনুমানিক খ্রীষ্টাব্দ ৫৫-৬২ সালে।',
      historicalAudienceBn: 'রোমীয় সাম্রাজ্যে রাজদ্রোহের অভিযোগ ও কঠোর সামাজিক নিপীড়নের শিকার আদি বিশ্বাসীগণ।',
      geographicalSettingBn: 'গ্রীক-রোমান এশিয়া মাইনর ও রোম।',
      literaryGenreStructureBn: 'সুসমাচারীয় যাজকীয় আশ্বাস ও ধর্মতাত্ত্বিক পত্রাবলী।',
      socioPoliticalBackgroundBn: 'প্রাচীন বিশ্বে রাজকীয় মোহর (Royal Seal) কোনো নথিতে লাগানো থাকলে তা ভাঙার অধিকার কেবল রাজারই ছিল। পৌল সেই উপমা ব্যবহার করে বলেন ঈশ্বর পবিত্র আত্মা দ্বারা বিশ্বাসীকে মোহরাঙ্কিত করেছেন, যা শয়তান বা জগতের কোনো শক্তি ভাঙতে পারে না।',
    },

    exposition: {
      coreThesisBn: 'পরিত্রাণের নিশ্চয়তা মানুষের আত্মিক শক্তির উপর নয়, বরং ঈশ্বরের সার্বভৌম বিশ্বস্ততা, খ্রীষ্টের রক্তের শাশ্বত কার্যকারিতা এবং পবিত্র আত্মার অন্তর্বাসের উপর প্রতিষ্ঠিত। সত্য বিশ্বাসী খ্রীষ্টের প্রেমে নিরাপদ।',
      structuralOutline: [
        {
          verseRange: 'যোহন ১০:২৭-৩০',
          titleBn: 'উত্তম পালকের দ্বৈত নিরাপত্তা',
          summaryBn: 'খ্রীষ্টের মেষগণ তাঁর রব শোনে এবং তাঁর হাত ও পিতার হাতের সুরক্ষিত বেষ্টনীতে থাকে।',
          analysisBn: 'গ্রীক দ্বৈত নেতিবাচক ‘উ মে’ (ou me) ব্যবহৃত হয়েছে — যার অর্থ ‘কখনোই না, অনন্তকালেও কখনো বিনষ্ট হবে না’। এটি পরম নিশ্চয়তার ব্যাকরণগত প্রকাশ।',
          keyDoctrinalTruths: ['শাশ্বত নিরাপত্তা (Eternal Security)', 'পিতার সার্বভৌম হাত (Father’s Protection)'],
        },
        {
          verseRange: 'ইব্রীয় ৬ ও ১০ এর সতর্কবার্তা',
          titleBn: 'বিশ্বাসভ্রষ্টতা বনাম সত্য বিশ্বাসের স্থায়িত্ব',
          summaryBn: 'ইব্রীয় পত্রের সতর্কবাণীগুলো মেকি বিশ্বাসীদের প্রতি যারা খ্রীষ্টের কাছে এসেও পুনরায় সত্য ত্যাগ করে চলে যায়।',
          analysisBn: '১ যোহন ২:১৯ এর আলোকপাত: ‘তাহারা আমাদের মধ্য হইতেই বাহির হইয়া গেল, কিন্তু আমাদের কেহ ছিল না; কারণ তাহারা যদি আমাদের হইত, তবে আমাদের সহিতই থাকিত।’ অর্থাৎ যারা খ্রীষ্টকে চিরতরে ত্যাগ করে, তাদের বিশ্বাস শুরু থেকেই প্রকৃত পুনর্জন্মপ্রাপ্ত ছিল না।',
          keyDoctrinalTruths: ['সাধুগণের সহিষ্ণুতা (Perseverance of the Saints)', 'সত্য পুনর্জন্মের লক্ষণ (Genuine Regeneration)'],
        },
      ],
      pastoralApplicationBn: 'বিশ্বাসীরা অপরাধবোধের ভয়ে ভীত হয়ে জীবনযাপন করবে না, বরং পুত্রের প্রেমের নিরাপত্তায় আনন্দিত হয়ে বাধ্যতার ফল ফলবে। এই নিশ্চয়তা পাপের লাইসেন্স নয়, বরং গভীর কৃতজ্ঞতাপূর্ণ পবিত্র জীবনের চালিকাশক্তি।',
    },

    theologicalPerspectives: {
      dialogueTopicBn: 'পরিত্রাণের নিরাপত্তা বনাম ইচ্ছাশক্তির স্বাধীনতা',
      perspectives: [
        {
          perspectiveNameBn: 'সংস্কারবাদী অনন্ত নিরাপত্তা মতবাদ (Eternal Security / Perseverance)',
          traditionBn: 'জন ক্যালভিন, ব্যাপটিস্ট ও প্রেসবিটেরিয়ান ঐতিহ্য',
          coreArgumentBn: 'একবার ঈশ্বর যাকে সত্যিকারের নতুন জন্ম দিয়েছেন, সে কখনোই সম্পূর্ণভাবে বিনষ্ট হতে পারে না (Once Saved, Always Kept)। কারণ পরিত্রাণ পুরোপুরি ঈশ্বরের কাজ। কোনো সত্য বিশ্বাসী খ্রীষ্টের হাত থেকে খসে পড়তে পারে না।',
          scriptureBasis: ['যোহন ১০:২৮', 'রোমীয় ৮:২৯-৩০', 'ফিলিপীয় ১:৬'],
        },
        {
          perspectiveNameBn: 'ওয়েসলিয়ান ও আর্মিনিয়ান দৃষ্টিভঙ্গি (Conditional Security / Warning of Apostasy)',
          traditionBn: 'জন ওয়েসলি, মেথডিস্ট ও পেন্টেকস্টাল ঐতিহ্য',
          coreArgumentBn: 'ঈশ্বর কাউকে জোর করে আটকে রাখেন না; যদি কোনো বিশ্বাসী সচেতনভাবে ও স্বেচ্ছায় খ্রীষ্টের বিরুদ্ধে বিদ্রোহ করে বিশ্বাস ত্যাগ করে (Apostasy), তবে সে পরিত্রাণের জাহাজ ত্যাগ করতে পারে। তাই সতর্ক থাকা ও শেষ পর্যন্ত বিশ্বাসে স্থির থাকা আবশ্যক।',
          scriptureBasis: ['ইব্রীয় ৬:৪-৬', '১ করিন্থীয় ১০:১২', 'প্রকাশিত বাক্য ৩:৫'],
        },
      ],
      unifyingConsensusBn: 'উভয় ঐতিহ্যের ঐক্য হলো: যিনি বর্তমানে খ্রীষ্টে বিশ্বাস করছেন ও তাঁর প্রেমে জীবনযাপন করছেন, তিনি এখনই সম্পূর্ণ নিরাপদ। কোনো অতীত পাপ বা বর্তমান সংকট তাকে ঈশ্বর থেকে ছিনিয়ে নিতে পারে না। খ্রীষ্টে স্থির থাকাই আমাদের পরম শান্তি।',
    },

    researchSources: {
      lexicalTerms: [
        {
          strongs: 'G166',
          originalWord: 'αἰώνιος (aionios)',
          language: 'Greek',
          transliteration: 'aionios',
          pronunciationBn: 'আইওনিওস',
          meaningBn: 'অনন্ত, অনন্তকালীন, অনাদ্যন্ত, চিরন্তন।',
          contextUsageBn: 'যোহন ১০:২৮ পদে ব্যবহৃত; যে জীবন সাময়িক নয়, যার কোনো শেষ নেই।',
        },
        {
          strongs: 'G4972',
          originalWord: 'σφραγίζω (sphragizo)',
          language: 'Greek',
          transliteration: 'sphragizo',
          pronunciationBn: 'স্ফ্রাগিজো',
          meaningBn: 'মোহরাঙ্কিত করা, রাজকীয় সিলমোহর দিয়ে নিশ্চিত করা ও মালিকানা স্থাপন করা।',
          contextUsageBn: 'ইফিষীয় ১:১৩ পদে ব্যবহৃত; পবিত্র আত্মা হলেন বিশ্বাসের উপর ঈশ্বরের শাশ্বত মালিকানার সীল।',
        },
        {
          strongs: 'G726',
          originalWord: 'ἁρπάζω (harpazo)',
          language: 'Greek',
          transliteration: 'harpazo',
          pronunciationBn: 'হারপাজো',
          meaningBn: 'ছিনিয়ে নেওয়া, বলপূর্বক কাড়িয়া লওয়া।',
          contextUsageBn: 'যোহন ১০:২৮-২৯ পদে ‘কেহ কাড়িয়া লইতে পারিবে না’।',
        },
      ],
      crossReferences: [
        {
          ref: 'ফিলিপীয় ১:৬',
          relevanceBn: 'যিনি তোমাদের মধ্যে উত্তম কর্ম আরম্ভ করিয়াছেন, তিনি খ্রীষ্ট যীশুর দিন পর্যন্ত তাহা সিদ্ধ করিবেন।',
          testament: 'NT',
        },
        {
          ref: 'রোমীয় ৮:৩৮-৩৯',
          relevanceBn: 'কোনো সৃষ্ট বস্তুই ঈশ্বরের প্রেম থেকে পৃথক করতে সমর্থ হবে না।',
          testament: 'NT',
        },
        {
          ref: 'ইব্রীয় ৭:২৫',
          relevanceBn: 'তিনি তাহাদের পক্ষে মধ্যস্থতা করিবার নিমিত্ত সর্বদা জীবিত আছেন, তাই সম্পূর্ণ পরিত্রাণ করিতে সমর্থ।',
          testament: 'NT',
        },
      ],
      scholarlyCitations: [
        {
          authorBn: 'চার্লস হেডন স্পার Spurgeon (C.H. Spurgeon)',
          workBn: 'অল অফ গ্রেস (All of Grace)',
          eraOrYear: '১৮৮৬ খ্রীষ্টাব্দ',
          theologicalContributionBn: '‘যদি আমার পরিত্রাণ আমার নিজের বিশ্বস্ততার উপর নির্ভর করত, তবে আমি প্রতিদিন এক হাজার বার বিনষ্ট হতাম; কিন্তু ধন্যবাদ ঈশ্বরকে, আমার পরিত্রাণ খ্রীষ্টের বিশ্বস্ততার উপর প্রতিষ্ঠিত!’',
        },
        {
          authorBn: 'জন ওয়েসলি (John Wesley)',
          workBn: 'অন ওয়ার্কিং আউট আওয়ার ওন স্যালভেশন',
          eraOrYear: '১৭৮১ খ্রীষ্টাব্দ',
          theologicalContributionBn: 'তিনি জোর দেন যে ঈশ্বরের অনুগ্রহ সর্বদা সক্রিয়, এবং বিশ্বাসীকে প্রতিদিন প্রেমের বাধ্যতায় অগ্রসর হওয়ার আহ্বান জানান।',
        },
      ],
      primaryBibleEditions: [
        'The Bible Society of India (BSI) Bengali Bible (Free Bible / Re-edited Version)',
        'Nestle-Aland Novum Testamentum Graece (NA28 / UBS5 Greek New Testament)',
        'The Holy Bible: English Standard Version (ESV with Cross References)',
      ],
    },

    suggestedFollowUps: [
      'ইব্রীয় ৬:৪-৬ পদের সঠিক প্রেক্ষাপট ও অর্থ কী?',
      'ইফিষীয় ১:১৩-১৪ এর ‘বায়না স্বরূপ’ (Arrabon) শব্দের প্রাচীন বাণিজ্যিক অর্থ কী?',
      '১ যোহন ২:১৯ এ ‘আমাদের কেহ ছিল না’ বলতে প্রেরিত যোহন কী বুঝিয়েছেন?',
    ],
  },
};
