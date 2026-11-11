// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// SOCIAL COMMUNITY TAXONOMY & INSIGHTS DATA
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import { InsightCategory, CommunityQuestion, ProductInsight } from '../../types/social';

export interface CategoryMetadata {
  category: InsightCategory;
  nameBn: string;
  nameEn: string;
  badgeColor: string;
  descriptionBn: string;
}

export const INSIGHT_CATEGORIES: CategoryMetadata[] = [
  {
    category: 'BIBLE_QUESTION',
    nameBn: 'বাইবেল সম্পর্কিত প্রশ্ন',
    nameEn: 'Bible Question',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300',
    descriptionBn: 'শাস্ত্রের কঠিন পদ বা দ্ব্যর্থক অংশ সংক্রান্ত সাধারণ ও গভীর প্রশ্নাবলী।',
  },
  {
    category: 'THEOLOGY_QUESTION',
    nameBn: 'ধর্মতাত্ত্বিক জিজ্ঞাসা',
    nameEn: 'Theology Question',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
    descriptionBn: 'ত্রিত্ব, পরিত্রাণ, বা ঈশ্বরের রাজ্য বিষয়ক প্রাতিষ্ঠানিক প্রশ্ন।',
  },
  {
    category: 'VERSE_REQUEST',
    nameBn: 'পদ বিশ্লেষণ অনুরোধ',
    nameEn: 'Verse Analysis Request',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
    descriptionBn: 'নির্দিষ্ট কোনো পদের মূল গ্রিক/হিব্রু অর্থ বা প্রেক্ষাপটের অনুরোধ।',
  },
  {
    category: 'TOPIC_REQUEST',
    nameBn: 'বিষয়ভিত্তিক স্টাডি অনুরোধ',
    nameEn: 'Topic Study Request',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    descriptionBn: 'প্রার্থনা, রোজা, বিবাহ বা বিশ্বাস সংক্রান্ত থিম্যাটিক স্টাডি চাই।',
  },
  {
    category: 'CHARACTER_REQUEST',
    nameBn: 'চরিত্র অধ্যয়ন অনুরোধ',
    nameEn: 'Character Study Request',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
    descriptionBn: 'বাইবেলের বিশিষ্ট নারী ও পুরুষদের জীবনের শিক্ষা।',
  },
  {
    category: 'SERMON_REQUEST',
    nameBn: 'সার্মন রূপরেখা চাহিদা',
    nameEn: 'Sermon Outline Request',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    descriptionBn: 'পালকদের প্রচার প্রস্তুতিতে সহায়তা ও টেক্সচুয়াল রূপরেখার চাহিদা।',
  },
  {
    category: 'BIBLE_STUDY_REQUEST',
    nameBn: 'স্টাডি গাইড অনুরোধ',
    nameEn: 'Bible Study Guide Request',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    descriptionBn: 'ক্ষুদ্র দল বা ব্যক্তিগত বাইবেল অধ্যয়নের প্রশ্নমালা।',
  },
  {
    category: 'PASTOR_TOOL_REQUEST',
    nameBn: 'যাজকীয় টুলসের প্রস্তাবনা',
    nameEn: 'Pastor Tools Request',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
    descriptionBn: 'মণ্ডলী পরিচালনা, প্রার্থনা তালিকা, বা বাপ্তিস্ম ক্লাসের রিসোর্স।',
  },
  {
    category: 'FEATURE_REQUEST',
    nameBn: 'নতুন ফিচারের প্রস্তাবনা',
    nameEn: 'App Feature Request',
    badgeColor: 'bg-gold-100 text-gold-800 dark:bg-gold-950/60 dark:text-gold-300',
    descriptionBn: 'অফলাইন মোড, অডিও বাইবেল, বা ফন্ট সাইজ নিয়ন্ত্রণ সংক্রান্ত প্রস্তাব।',
  },
  {
    category: 'APP_PROBLEM',
    nameBn: 'অ্যাপ সমস্যা / ফিডব্যাক',
    nameEn: 'Bug Report / Issue',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    descriptionBn: 'ব্যবহারকারীর ডিভাইসে কোনো কিছু কাজ না করলে তার রিপোর্ট।',
  },
  {
    category: 'TRANSLATION_REQUEST',
    nameBn: 'অনুবাদ সংস্করণ অনুসন্ধান',
    nameEn: 'Translation Request',
    badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    descriptionBn: 'বিএসআই, কেরি বা অন্যান্য সংস্করণ সংক্রান্ত প্রশ্ন।',
  },
  {
    category: 'OTHER',
    nameBn: 'সাধারণ মন্তব্য',
    nameEn: 'General Feedback',
    badgeColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    descriptionBn: 'অন্যান্য সার্বিক মন্তব্য ও উৎসাহব্যঞ্জক বার্তা।',
  },
];

// Initial seed community questions gathered from early pastoral interactions
export const SEED_COMMUNITY_QUESTIONS: CommunityQuestion[] = [
  {
    id: 'q-rev-1',
    questionTextBn: 'প্রকাশিত বাক্য (Revelation) পুস্তকে বর্ণিত প্রতীকগুলো কীভাবে সঠিক ঐতিহাসিক ও আত্মিক প্রেক্ষাপটে বুঝব?',
    category: 'BIBLE_STUDY_REQUEST',
    relatedBookId: 'REV',
    relatedTopic: 'প্রকাশিত বাক্য ও শেষকাল',
    votesOrCount: 31,
    status: 'PLANNED_STUDY',
    productInsightBn: 'প্রকাশিত বাক্যের ওপর একটি স্পষ্ট অধ্যায়ভিত্তিক স্টাডি গাইড প্রস্তুত করা প্রয়োজন।',
    receivedAt: '2026-09-10T10:00:00Z',
  },
  {
    id: 'q-prayer-1',
    questionTextBn: 'বাইবেলে প্রার্থনার উত্তর না পাওয়ার কারণ সম্পর্কে কী বলা হয়েছে?',
    category: 'TOPIC_REQUEST',
    relatedTopic: 'প্রার্থনা',
    votesOrCount: 38,
    status: 'REVIEWED',
    productInsightBn: 'প্রার্থনা সংক্রান্ত ৮-মাত্রিক গভীর বিষয়ভিত্তিক স্টাডি প্রস্তুত করা।',
    receivedAt: '2026-09-12T14:30:00Z',
  },
  {
    id: 'q-sermon-1',
    questionTextBn: 'প্রচারকদের জন্য কি বাংলায় এক ক্লিকে সার্মন রূপরেখা ও স্লাইড ডাউনলোড করার সুবিধা রাখা যায়?',
    category: 'SERMON_REQUEST',
    votesOrCount: 19,
    status: 'REVIEWED',
    productInsightBn: 'সার্মন বিল্ডারে সরাসরি প্রিন্ট ও প্রজেক্টর স্লাইড এক্সপোর্ট উন্নত করা।',
    receivedAt: '2026-09-13T09:15:00Z',
  },
  {
    id: 'q-rom-1',
    questionTextBn: 'রোমীয় ৮:২৮-এর মূল বক্তব্য কী এবং এটি দুঃখ-কষ্টের সময় কীভাবে সান্ত্বনা দেয়?',
    category: 'BIBLE_QUESTION',
    relatedBookId: 'ROM',
    relatedTopic: 'রোমীয় ৮ অধ্যায়',
    votesOrCount: 21,
    status: 'ADDRESSED',
    productInsightBn: 'রোমীয় ৮:২৮ পদটির পূর্ণ ঐতিহাসিক প্রেক্ষাপট ও ক্রস-রেফারেন্স সম্পন্ন।',
    receivedAt: '2026-09-14T16:00:00Z',
  },
  {
    id: 'q-greek-1',
    questionTextBn: 'বাংলায় মূল গ্রিক ও হিব্রু শব্দের ব্যাকরণিক অর্থ দেখা কি সহজ করা যায়?',
    category: 'FEATURE_REQUEST',
    relatedTopic: 'স্ট্রংস লেক্সিকন',
    votesOrCount: 15,
    status: 'REVIEWED',
    productInsightBn: 'রিসার্চ ডেস্কে স্ট্রংস গ্রিক/হিব্রু কার্ডে বাংলা সংজ্ঞা সরাসরি প্রদর্শন।',
    receivedAt: '2026-09-15T11:00:00Z',
  },
];

// Initial seed product insights generated from community signals
export const SEED_PRODUCT_INSIGHTS: ProductInsight[] = [
  {
    id: 'ins-prayer-study',
    titleBn: 'প্রার্থনা বিষয়ভিত্তিক স্টাডি গাইড (Prayer Study Guide)',
    category: 'TOPIC_REQUEST',
    signalDescriptionBn: 'ফেসবুক আলোচনা ও মন্তব্যে ৩৮ জন পাঠক প্রার্থনার গভীর শাস্ত্রীয় ব্যাখ্যা চেয়েছেন।',
    requestCount: 38,
    recommendedFeatureOrContentBn: 'স্টাডি মডিউলে "প্রার্থনা ও মধ্যস্থতা" বিষয়ে সম্পূর্ণ ক্রস-রেফারেন্স ও চার্ট যোগ করা।',
    priority: 'HIGH',
    status: 'ACCEPTED',
    identifiedAt: '2026-09-12T15:00:00Z',
  },
  {
    id: 'ins-revelation-guide',
    titleBn: 'প্রকাশিত বাক্য ব্যাখ্যা ও ঐতিহাসিক পটভূমি (Revelation Study)',
    category: 'BIBLE_STUDY_REQUEST',
    signalDescriptionBn: '৩১ জন শিক্ষার্থী জানিয়েছেন প্রকাশিত বাক্য বুঝতে তাদের সবচেয়ে বেশি অসুবিধা হয়।',
    requestCount: 31,
    recommendedFeatureOrContentBn: 'প্রকাশিত বাক্য পুস্তকের প্রতিটি অধ্যায়ের প্রতীক ও প্রেক্ষাপটের কাঠামোগত গাইড তৈরি।',
    priority: 'HIGH',
    status: 'PENDING_REVIEW',
    identifiedAt: '2026-09-10T11:00:00Z',
  },
  {
    id: 'ins-sermon-exporter',
    titleBn: 'সার্মন বিল্ডার প্রিন্ট ও প্রেজেন্টেশন স্লাইড (Sermon Outliner)',
    category: 'PASTOR_TOOL_REQUEST',
    signalDescriptionBn: '১৯ জন পালক মোবাইল থেকে সরাসরি সার্মন নোটস প্রিন্ট ও প্রজেকশন উপযোগী করার অনুরোধ করেছেন।',
    requestCount: 19,
    recommendedFeatureOrContentBn: 'সার্মন বিল্ডারে ১-ক্লিকে ১৬:৯ স্লাইড ও প্রিন্টেবল এ৪ পিডিএফ জেনারেটর সংযোজন।',
    priority: 'MEDIUM',
    status: 'ACCEPTED',
    identifiedAt: '2026-09-13T10:00:00Z',
  },
  {
    id: 'ins-greek-hebrew-quickview',
    titleBn: 'পদের সাথে মূল গ্রিক/হিব্রু শব্দের দ্রুত দর্শন (Original Language Popover)',
    category: 'FEATURE_REQUEST',
    signalDescriptionBn: '১৫ জন শিক্ষক ও ছাত্র পদ অধ্যয়নে স্ট্রংস শব্দের সহজ বাংলা দর্শন চেয়েছেন।',
    requestCount: 15,
    recommendedFeatureOrContentBn: 'বাইবেল রিডারে যে কোনো পদে ট্যাপ করলে মূল গ্রিক/হিব্রু পপওভার সক্রিয় করা।',
    priority: 'MEDIUM',
    status: 'IN_DEVELOPMENT',
    identifiedAt: '2026-09-15T12:00:00Z',
  },
];
