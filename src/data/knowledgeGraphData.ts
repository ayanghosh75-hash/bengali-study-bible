// Bible Knowledge Graph and Character Relational Networks
import {
  CharacterResearchProfile,
  CrossRefEdge,
  BibleKnowledgeGraph,
} from '../types/researchEngine';

export const RESEARCH_CHARACTERS_DB: CharacterResearchProfile[] = [
  {
    id: 'paul',
    nameBn: 'প্রেরিত পৌল (তার্ষের শৌল)',
    nameEn: 'Paul the Apostle',
    roleBn: 'নতুন নিয়মের প্রধান পত্রাবলীর লেখক ও পৌলীয় সোটিরিওলজির প্রবক্তা',
    eraBn: '১ম শতাব্দী (প্রায় ৫ – ৬৭ খ্রীষ্টাব্দ)',
    testament: 'NT',
    biographySummaryBn:
      'প্রাথমিক অবস্থায় মণ্ডলীর কট্টর নির্যাতনকারী ফরীশী, যিনি দম্মেশক যাত্রাপথে পুনরুত্থিত যীশুর স্বর্গীয় দর্শন পেয়ে রূপান্তরিত হন এবং একমাত্র বিশ্বাসের দ্বারা অনুগ্রহে ধার্মিক গণ্যকরণের সুসমাচার প্রচার করেন।',
    relationshipToTopicBn:
      'পরিত্রাণ যে মানুষের নিজস্ব কোনো সৎকাজের দ্বারা নয়, বরং একমাত্র খ্রীষ্টের ক্রুশে বিশ্বাস দ্বারা সম্পন্ন হয় — রোমীয়, গালাতীয় ও ইফিষীয় পত্রে পৌল এর গভীরতম তাত্ত্বিক ব্যাখ্যা দিয়েছেন।',
    keyPassages: [
      {
        referenceBn: 'ইফিষীয় ২:৮-৯',
        bookId: 'EPH',
        chapter: 2,
        verse: 8,
        summaryBn: 'অনুগ্রহেই বিশ্বাস দ্বারা পরিত্রাণ, ঈশ্বরের অযাচিত দান।',
      },
      {
        referenceBn: 'রোমীয় ৩:২১-২৬',
        bookId: 'ROM',
        chapter: 3,
        verse: 21,
        summaryBn: 'ব্যবস্থা ব্যতীত ঈশ্বরের ধার্মিকতা খ্রীষ্টের রক্তে প্রায়শ্চিত্তের মাধ্যমে প্রকাশিত।',
      },
      {
        referenceBn: 'রোমীয় ৮:২৮-৩৯',
        bookId: 'ROM',
        chapter: 8,
        verse: 28,
        summaryBn: 'ঈশ্বরের প্রেম ও পরিত্রাণের চিরন্তন নিরাপত্তা।',
      },
    ],
    spiritualLessons: [
      'ঈশ্বরের অনুগ্রহ যে কোনো চরম পাপী ও বিরোধীকেও খ্রীষ্টের মহান সেবকে রূপান্তরিত করতে পারে।',
      'আইনি ধার্মিকতা কখনো আত্মাকে শান্তি দিতে পারে না; কেবল ক্রুশের রক্তে সমর্পণই সত্য মুক্তি দেয়।',
    ],
    relationalPath: [
      {
        person: 'পৌল (শৌল)',
        event: 'দম্মেশকের পথে রূপান্তর ও অন্ধত্ব মুক্তি',
        doctrine: 'অপ্রতিরোধ্য অনুগ্রহ (Irresistible Grace) ও নতুন সৃষ্টি',
        passage: 'প্রেরিত ৯:১-২২',
      },
      {
        person: 'পৌল',
        event: 'রোম ও করিন্থে সুসমাচার প্রচার ও কারাবাস',
        doctrine: 'বিশ্বাসের দ্বারা ধার্মিক গণ্যকরণ (Justification by Faith)',
        passage: 'রোমীয় ৫:১-২',
      },
    ],
  },
  {
    id: 'peter',
    nameBn: 'প্রেরিত পিতর (শিমোন)',
    nameEn: 'Simon Peter',
    roleBn: 'প্রেরিতদলের অগ্রণী ও পঞ্চাশত্তমীর সুসমাচার প্রচারক',
    eraBn: '১ম শতাব্দী (প্রায় ১ খ্রীষ্টপূর্ব – ৬৮ খ্রীষ্টাব্দ)',
    testament: 'NT',
    biographySummaryBn:
      'গালীল সাগরের সাধারণ মৎস্যজীবী, যিনি যীশুকে "জীবন্ত ঈশ্বরের পুত্র খ্রীষ্ট" বলে স্বীকার করেছিলেন, তিনবার অস্বীকারের পর পুনরুত্থিত যীশুর প্রেমে পুনঃপ্রতিষ্ঠিত হন এবং পঞ্চাশত্তমীর দিনে নির্ভীকভাবে পরিত্রাণের আহ্বান জানান।',
    relationshipToTopicBn:
      'পিতর ঘোষণা করেছিলেন যে আকাশের নিচে এমন আর কোনো নাম নেই যার দ্বারা পরিত্রাণ পাওয়া যায় (প্রেরিত ৪:১২)। তিনি প্রমাণ করেছিলেন পরিত্রাণ যিহূদী ও অন্যজাতি সকলের জন্য।',
    keyPassages: [
      {
        referenceBn: 'প্রেরিত ৪:১২',
        bookId: 'ACT',
        chapter: 4,
        verse: 12,
        summaryBn: 'যীশু ব্যতীত আকাশের নিচে আর কোনো নামে পরিত্রাণ নাই।',
      },
      {
        referenceBn: '১ পিতর ১:১৮-১৯',
        bookId: '1PE',
        chapter: 1,
        verse: 18,
        summaryBn: 'রৌপ্য বা স্বর্ণ দ্বারা নয়, খ্রীষ্টের অমূল্য রক্ত দ্বারাই আমরা মুক্ত।',
      },
    ],
    spiritualLessons: [
      'ব্যক্তিগত ব্যর্থতা ও পতনের পরও খ্রীষ্টের প্রেম মানুষকে উদ্ধার করে মণ্ডলীর স্তম্ভ বানাতে পারে।',
      'মনোপরিবর্তন ও বাপ্তিস্মের মধ্য দিয়ে পাপের ক্ষমা এবং পবিত্র আত্মার দান লাভ হয়।',
    ],
    relationalPath: [
      {
        person: 'পিতর',
        event: 'পঞ্চাশত্তমীর দিনে প্রথম প্রচার',
        doctrine: 'অনুতাপ, পাপমোচন ও পবিত্র আত্মার বর',
        passage: 'প্রেরিত ২:৩৮-৪১',
      },
      {
        person: 'পিতর',
        event: 'রোমান শতপতি কর্নেলিয়র গৃহে দর্শন ও প্রচার',
        doctrine: 'জাতিভেদহীন সর্বজনীন পরিত্রাণ (Salvation for All Nations)',
        passage: 'প্রেরিত ১০:৩৪-৪৩',
      },
    ],
  },
  {
    id: 'jailer-philippi',
    nameBn: 'ফিলিপীর কারারক্ষক',
    nameEn: 'The Philippian Jailer',
    roleBn: 'রোমান কর্মকর্তা যিনি পরিত্রাণের সহজ ও মৌলিক পথ প্রকাশ করেছেন',
    eraBn: '১ম শতাব্দী (প্রায় ৫০ খ্রীষ্টাব্দ)',
    testament: 'NT',
    biographySummaryBn:
      'ফিলিপীর কঠোর রোমান কারাগারের প্রধান রক্ষক। মধ্যরাতে প্রবল ভূমিকম্পে কারাগারের দ্বার উন্মুক্ত হলে বন্দীরা পালিয়েছে ভেবে আত্মহত্যা করতে উদ্যত হয়েছিলেন, কিন্তু পৌলের আশ্বাসে রক্ষা পান এবং সপরিবারে বিশ্বাস করেন।',
    relationshipToTopicBn:
      'তিনি বাইবেলের সবচেয়ে সরাসরি ও ঐতিহাসিক প্রশ্নটি করেছিলেন: "মহাশয়গণ, পরিত্রাণ পাইবার জন্য আমাকে কি করিতে হইবে?" যার উত্তর ছিল: "প্রভু যীশুতে বিশ্বাস কর, তাহাতে তুমি ও তোমার পরিবার পরিত্রাণ পাইবে।" (প্রেরিত ১৬:৩০-৩১)।',
    keyPassages: [
      {
        referenceBn: 'প্রেরিত ১৬:৩০-৩১',
        bookId: 'ACT',
        chapter: 16,
        verse: 30,
        summaryBn: '"পরিত্রাণ পাইবার জন্য আমাকে কি করিতে হইবে?" — সুসমাচারের সহজতম উত্তর।',
      },
    ],
    spiritualLessons: [
      'চরম হতাশা ও আত্মহত্যার মুখেও ঈশ্বরের অনুগ্রহ মানুষের কাছে উপস্থিত হতে পারে।',
      'ব্যক্তিগত পরিত্রাণ পরিবারের ওপর আশীর্বাদ ও আনন্দের কারণ হয়।',
    ],
    relationalPath: [
      {
        person: 'ফিলিপীর কারারক্ষক',
        event: 'কারাগারে মধ্যরাতের প্রার্থনা ও ভূমিকম্প',
        doctrine: 'বিশ্বাসে তাৎক্ষণিক পরিত্রাণ (Immediate Salvation through Faith)',
        passage: 'প্রেরিত ১৬:২৫-৩৪',
      },
    ],
  },
  {
    id: 'nicodemus',
    nameBn: 'নিকোদেম (যিহূদীদের প্রধান)',
    nameEn: 'Nicodemus the Pharisee',
    roleBn: 'মহাসভার (Sanhedrin) সদস্য ও ধর্মীয় পণ্ডিত',
    eraBn: '১ম শতাব্দী (যীশুর সমসাময়িক)',
    testament: 'NT',
    biographySummaryBn:
      'ফরীশী ও সম্মানিত ধর্মীয় শিক্ষক, যিনি রাত্রিকালে গোপনে যীশুর কাছে এসেছিলেন সত্য অনুসন্ধানে। যীশু তাঁর সামনে স্পষ্ট প্রকাশ করলেন যে মানুষের ধর্মীয় পাণ্ডিত্য নয়, স্বর্গরাজ্যে প্রবেশ করতে হলে আত্মায় "নতুন জন্ম" (Born Again) লাভ আবশ্যক।',
    relationshipToTopicBn:
      'নিকোদেমের সাথে কথোপকথনের প্রেক্ষাপটেই যীশু বাইবেলের সবচেয়ে বিখ্যাত পদটি উচ্চারণ করেন: "কারণ ঈশ্বর জগৎকে এমন প্রেম করিলেন..." (যোহন ৩:১৬)। ক্রুশারোপণের পর তিনি প্রকাশ্যে সুগন্ধি এনে যীশুর সমাধি সম্পন্ন করেছিলেন।',
    keyPassages: [
      {
        referenceBn: 'যোহন ৩:৩-৭',
        bookId: 'JHN',
        chapter: 3,
        verse: 3,
        summaryBn: 'উপরে হইতে নূতন জন্ম না হইলে কেহ ঈশ্বরের রাজ্য দেখিতে পায় না।',
      },
      {
        referenceBn: 'যোহন ৩:১৬',
        bookId: 'JHN',
        chapter: 3,
        verse: 16,
        summaryBn: 'ঈশ্বরের অগাধ প্রেমের পরম প্রকাশ ও অনন্ত জীবন।',
      },
    ],
    spiritualLessons: [
      'ধর্মকর্ম, বংশমর্যাদা বা সামাজিক সম্মান কোনো মানুষকে পরিত্রাণ দিতে পারে না; আত্মার রূপান্তর আবশ্যক।',
      'গোপন অনুসন্ধানকারীও সত্যকে চিনে প্রকাশ্যে খ্রীষ্টের অনুসারী হতে পারে।',
    ],
    relationalPath: [
      {
        person: 'নিকোদেম',
        event: 'রাত্রিকালে যীশুর সহিত ধর্মতাত্ত্বিক কথোপকথন',
        doctrine: 'পুনর্জন্ম ও পবিত্র আত্মার কার্য (Regeneration / New Birth)',
        passage: 'যোহন ৩:১-২১',
      },
    ],
  },
  {
    id: 'zacchaeus',
    nameBn: 'যাক্কয় (প্রধান করগ্রাহী)',
    nameEn: 'Zacchaeus the Tax Collector',
    roleBn: 'যিরীহোর ধনী কিন্তু ঘৃণিত কর আদায়কারী',
    eraBn: '১ম শতাব্দী (যীশুর সমসাময়িক)',
    testament: 'NT',
    biographySummaryBn:
      'খর্বকায় প্রধান করগ্রাহী, যাঁকে সমাজ পাপী ও বিশ্বাসঘাতক হিসেবে ঘৃণা করত। যীশুকে দেখতে তিনি ডুমুর গাছে আরোহণ করেন। যীশু তাঁর গৃহে পদার্পণ করলে তিনি স্বেচ্ছায় পাপ ত্যাগ করে দরিদ্রদের অর্ধেক সম্পত্তি এবং অন্যায় আদায়ের চারগুণ ফেরত দেওয়ার অঙ্গীকার করেন।',
    relationshipToTopicBn:
      'যীশু ঘোষণা করেছিলেন: "অদ্য এই গৃহে পরিত্রাণ উপস্থিত হইল... কেননা যাহা হারাইয়া গিয়াছিল, তাহারই অন্বেষণ ও পরিত্রাণ করিতে মনুষ্যপুত্র আসিয়াছেন।" (লূক ১৯:৯-১০)।',
    keyPassages: [
      {
        referenceBn: 'লূক ১৯:৮-১০',
        bookId: 'LUK',
        chapter: 19,
        verse: 8,
        summaryBn: 'হারানোদের অন্বেষণ ও পরিত্রাণে যীশুর আগমনের উদ্দেশ্য।',
      },
    ],
    spiritualLessons: [
      'যীশুর স্পর্শে লোভী ও অনৈতিক হৃদয়ও উদার পরোপকারী হৃদয়ে রূপান্তরিত হয়।',
      'প্রকৃত অনুতাপের প্রকাশ ঘটে বাস্তব জীবনে অন্যায়ের ক্ষতিপূরণ ও সৎকর্মে।',
    ],
    relationalPath: [
      {
        person: 'যাক্কয়',
        event: 'ডুমুর গাছে যীশুর দর্শন ও মেহমানদারি',
        doctrine: 'অনুতাপের যোগ্য ফল ও হারানোদের উদ্ধার (Repentance and Restoration)',
        passage: 'লূক ১৯:১-১০',
      },
    ],
  },
];

export const BIBLE_KNOWLEDGE_GRAPH_DB: BibleKnowledgeGraph = {
  nodes: [
    { id: 'salvation', label: 'পরিত্রাণ (Salvation)', type: 'doctrine', descriptionBn: 'ঈশ্বরের অনুগ্রহে পাপের বিচার থেকে চিরন্তন উদ্ধার।' },
    { id: 'grace', label: 'অনুগ্রহ (Grace)', type: 'concept', descriptionBn: 'অযোগ্য মানুষের প্রতি ঈশ্বরের অযাচিত করুণা।' },
    { id: 'faith', label: 'বিশ্বাস (Faith)', type: 'concept', descriptionBn: 'ঈশ্বরের বাক্যে পূর্ণ আত্মসমর্পণ ও নির্ভরতা।' },
    { id: 'repentance', label: 'অনুতাপ (Repentance)', type: 'concept', descriptionBn: 'পাপের পথ ত্যাগ করে ঈশ্বরের দিকে আন্তরিক প্রত্যাবর্তন।' },
    { id: 'cross', label: 'কালভারীর ক্রুশ (The Cross)', type: 'event', descriptionBn: 'যীশু খ্রীষ্টের প্রায়শ্চিত্তমূলক আত্মবলিদান।' },
    { id: 'resurrection', label: 'পুনরুত্থান (Resurrection)', type: 'event', descriptionBn: 'মৃত্যুর ওপর খ্রীষ্টের চিরন্তন বিজয়।' },
    { id: 'justification', label: 'ধার্মিক গণ্যকরণ (Justification)', type: 'doctrine', descriptionBn: 'ঈশ্বরের আদালতে আইনিভাবে নির্দোষ স্বীকৃতি।' },
    { id: 'eternal_life', label: 'অনন্ত জীবন (Eternal Life)', type: 'concept', descriptionBn: 'ঈশ্বরের সাথে শাশ্বত সহভাগিতা।' },
    { id: 'paul', label: 'প্রেরিত পৌল', type: 'person', descriptionBn: 'অনুগ্রহের সুসমাচারের প্রধান প্রচারক।' },
    { id: 'peter', label: 'প্রেরিত পিতর', type: 'person', descriptionBn: 'পঞ্চাশত্তমীর দিনে পরিত্রাণের ঘোষণা।' },
    { id: 'jhn_3_16', label: 'যোহন ৩:১৬', type: 'verse', descriptionBn: 'ঈশ্বরের প্রেম ও অনন্ত জীবনের প্রতিশ্রুতি।' },
    { id: 'eph_2_8', label: 'ইফিষীয় ২:৮-৯', type: 'verse', descriptionBn: 'অনুগ্রহেই বিশ্বাস দ্বারা পরিত্রাণ।' },
    { id: 'rom_10_9', label: 'রোমীয় ১০:৯', type: 'verse', descriptionBn: 'মুখে স্বীকার ও হৃদয়ে বিশ্বাসে পরিত্রাণ।' },
    { id: 'act_4_12', label: 'প্রেরিত ৪:১২', type: 'verse', descriptionBn: 'অন্য কোনো নামে পরিত্রাণ নাই।' },
    { id: 'strong_g4991', label: 'σωτηρία (G4991)', type: 'original_word', descriptionBn: 'গ্রীক শব্দ সোতেরিয়া — পরিত্রাণ ও উদ্ধার।' },
    { id: 'strong_h3444', label: 'יְשׁוּעָה (H3444)', type: 'original_word', descriptionBn: 'হিব্রু শব্দ ইয়েশূয়া — সদাপ্রভুর কৃত নিস্তার।' },
  ],
  links: [
    { source: 'salvation', target: 'grace', labelBn: 'ভিত্তি', type: 'supports' },
    { source: 'salvation', target: 'faith', labelBn: 'মাধ্যম', type: 'connects' },
    { source: 'salvation', target: 'repentance', labelBn: 'প্রস্তুতি', type: 'supports' },
    { source: 'salvation', target: 'cross', labelBn: 'মূল্য পরিশোধ', type: 'fulfills' },
    { source: 'cross', target: 'resurrection', labelBn: 'বিজয় প্রকাশ', type: 'connects' },
    { source: 'salvation', target: 'justification', labelBn: 'আইনি স্বীকৃতি', type: 'explains' },
    { source: 'salvation', target: 'eternal_life', labelBn: 'চূড়ান্ত ফল', type: 'fulfills' },
    { source: 'paul', target: 'salvation', labelBn: 'ব্যাখ্যা করেন', type: 'explains' },
    { source: 'peter', target: 'salvation', labelBn: 'প্রচার করেন', type: 'explains' },
    { source: 'jhn_3_16', target: 'salvation', labelBn: 'ঘোষণা করে', type: 'explains' },
    { source: 'eph_2_8', target: 'grace', labelBn: 'প্রমাণ করে', type: 'supports' },
    { source: 'rom_10_9', target: 'faith', labelBn: 'শর্ত নির্দেশ করে', type: 'supports' },
    { source: 'act_4_12', target: 'salvation', labelBn: 'একমাত্র পথ', type: 'explains' },
    { source: 'salvation', target: 'strong_g4991', labelBn: 'মূল গ্রীক ধাতু', type: 'mentions' },
    { source: 'salvation', target: 'strong_h3444', labelBn: 'মূল হিব্রু ধাতু', type: 'mentions' },
  ],
};

export const EXTENDED_CROSS_REFERENCES: CrossRefEdge[] = [
  {
    id: 'cr-salv-1',
    sourceReferenceBn: 'যোহন ৩:১৬',
    targetReferenceBn: 'রোমীয় ৫:৮',
    targetBookId: 'ROM',
    targetChapter: 5,
    targetVerse: 8,
    targetTextBn: 'কিন্তু ঈশ্বর আমাদের প্রতি তাঁহার নিজের প্রেমের প্রমাণ দিতেছেন, কেননা আমরা যখন এখনও পাপী ছিলাম, তখন খ্রীষ্ট আমাদের জন্য প্রাণ দিলেন।',
    relationType: 'thematic',
    relationTypeNameBn: 'ঈশ্বরের আত্মত্যাগী প্রেমের প্রমাণ',
    explanationBn: 'যোহন ৩:১৬ পদে যে ঈশ্বর পুত্রের দানের কথা বলেন, রোমীয় ৫:৮ দেখায় যে আমরা অযোগ্য ও পাপী থাকা অবস্থাতেই সেই বলিদান সম্পন্ন হয়েছে।',
  },
  {
    id: 'cr-salv-2',
    sourceReferenceBn: 'যোহন ৩:১৬',
    targetReferenceBn: '১ যোহন ৪:৯-১০',
    targetBookId: '1JN',
    targetChapter: 4,
    targetVerse: 9,
    targetTextBn: 'আমাদের প্রতি ঈশ্বরের প্রেম ইহাতেই প্রকাশিত হইয়াছে যে, ঈশ্বর আপনার একজাত পুত্রকে জগতে প্রেরণ করিয়াছেন, যেন আমরা তাঁহা দ্বারা জীবন পাই।',
    relationType: 'parallel_doctrine',
    relationTypeNameBn: 'সনাতন বাক্যের প্রেরিতীয় সাক্ষ্য',
    explanationBn: 'যোহন তাঁর প্রথম পত্রে সুসমাচারের ৩:১৬ পদের সত্যকে বিশ্বাসীদের আত্মিক জীবনের চূড়ান্ত প্রমাণ হিসেবে পুনর্ব্যক্ত করেছেন।',
  },
  {
    id: 'cr-salv-3',
    sourceReferenceBn: 'প্রেরিত ৪:১২',
    targetReferenceBn: '১ তীমথিয় ২:৫',
    targetBookId: '1TI',
    targetChapter: 2,
    targetVerse: 5,
    targetTextBn: 'কেননা এক ঈশ্বর আছেন, এবং ঈশ্বর ও মনুষ্যদের মধ্যে এক মধ্যস্থও আছেন; তিনি মানব খ্রীষ্ট যীশু।',
    relationType: 'direct',
    relationTypeNameBn: 'একমাত্র মধ্যস্থতাকারী',
    explanationBn: 'পিতর প্রেরিত ৪:১২ পদে যে এক নামের অনন্যতার কথা বলেছেন, পৌল ১ তীমথিয় ২:৫ পদে তাকে একমাত্র মধ্যস্থতাকারী হিসেবে সংজ্ঞায়িত করেছেন।',
  },
  {
    id: 'cr-salv-4',
    sourceReferenceBn: 'ইফিষীয় ২:৮-৯',
    targetReferenceBn: 'তীত ৩:৫',
    targetBookId: 'TIT',
    targetChapter: 3,
    targetVerse: 5,
    targetTextBn: 'আমরা যে ধার্মিকতার কর্ম করিয়াছি, তৎপ্রযুক্ত নয়, কিন্তু তিনি আপন দয়া অনুসারেই পুনর্জন্মের স্নান ও পবিত্র আত্মার নবীকরণ দ্বারা আমাদিগকে রক্ষা করিলেন।',
    relationType: 'parallel_doctrine',
    relationTypeNameBn: 'কর্মহীন অনুগ্রহ ও পবিত্র আত্মার পুনর্জন্ম',
    explanationBn: 'উভয় পদই নিশ্চিত করে যে মানবীয় নিজস্ব কোনো ভালো কাজ পরিত্রাণের ভিত্তি নয়, বরং ঈশ্বরের একমাত্র দয়া ও আত্মার নতুন জন্মই মূল।',
  },
  {
    id: 'cr-salv-5',
    sourceReferenceBn: 'রোমীয় ১০:৯-১০',
    targetReferenceBn: 'যোয়েল ২:৩২',
    targetBookId: 'JOL',
    targetChapter: 2,
    targetVerse: 32,
    targetTextBn: 'আর যে কেহ সদাপ্রভুর নামে ডাকিবে, সে রক্ষা পাইবে।',
    relationType: 'prophecy_fulfillment',
    relationTypeNameBn: 'পুরাতন নিয়মের ভবিষ্যদ্বাণী ও পূর্ণতা',
    explanationBn: 'যোয়েলের এই ঐতিহাসিক ভবিষ্যদ্বাণী যীশু খ্রীষ্টে বিশ্বাসীদের জন্য পূর্ণতা পেয়েছে — যে কেহ প্রভুর নামে ডাকিবে সে পরিত্রাণ পাইবে।',
  },
];
