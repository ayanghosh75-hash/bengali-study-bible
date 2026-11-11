import { ReadingPlan } from '../types/study';

export const READING_PLANS_DB: ReadingPlan[] = [
  {
    id: 'gospels-30-days',
    titleBn: '৩০ দিনের সুসমাচার ও খ্রীষ্টের জীবন',
    titleEn: '30-Day Gospel Journey with Christ',
    descriptionBn: 'যীশু খ্রীষ্টের জন্ম, পরিচর্যা, পাহাড়ী উপদেশ, আশ্চর্য কাজ এবং অনন্ত পরিত্রাণের গভীর আত্মিক পাঠ।',
    categoryBn: 'সুসমাচার ও খ্রীষ্টের জীবন',
    totalDays: 30,
    days: [
      {
        dayNumber: 1,
        titleBn: 'সনাতন বাক্য ও দেহধারণ',
        passages: [{ bookId: 'JHN', bookNameBn: 'যোহন', chapter: 1, verses: '১-১৮' }],
        devotionalThoughtBn: 'খ্রীষ্ট সনাতন ঈশ্বর যিনি অনুগ্রহ ও সত্যে পূর্ণ হইয়া আমাদের মধ্যে নেমে এসেছেন।'
      },
      {
        dayNumber: 2,
        titleBn: 'ঈশ্বরের মেষশাবক ও প্রথম শিষ্য আহ্বান',
        passages: [{ bookId: 'JHN', bookNameBn: 'যোহন', chapter: 1, verses: '১৯-৫১' }],
        devotionalThoughtBn: 'যোহন বাপ্তাইজকের মতো নম্র সাক্ষ্য: "ঐ দেখ, ঈশ্বরের মেষশাবক!"'
      },
      {
        dayNumber: 3,
        titleBn: 'নতুন জন্ম ও ঈশ্বরের পরম প্রেম',
        passages: [{ bookId: 'JHN', bookNameBn: 'যোহন', chapter: 3, verses: '১-২১' }],
        devotionalThoughtBn: 'আত্মা ও বিশ্বাসে নতুন জন্ম — কারণ ঈশ্বর জগৎকে এমন প্রেম করিলেন।'
      },
      {
        dayNumber: 4,
        titleBn: 'পাহাড়ী উপদেশ: ধন্য বাণী',
        passages: [{ bookId: 'MAT', bookNameBn: 'মথি', chapter: 5, verses: '১-১৬' }],
        devotionalThoughtBn: 'জগতে লবণ ও জ্যোতির ন্যায় জীবনযাপন করে পিতার গৌরব প্রকাশ করা।'
      },
      {
        dayNumber: 5,
        titleBn: 'প্রার্থনা, ক্ষমা ও ঈশ্বরের রাজ্যের সন্ধান',
        passages: [{ bookId: 'MAT', bookNameBn: 'মথি', chapter: 6, verses: '৫-৩৪' }],
        devotionalThoughtBn: 'স্বর্গস্থ পিতার কাছে প্রভুর প্রার্থনা এবং ভবিষ্যতের জন্য দুশ্চিন্তা মুক্ত আস্থা।'
      },
      {
        dayNumber: 6,
        titleBn: 'শান্তি, সত্যের পথ ও পবিত্র আত্মার প্রতিশ্রুতি',
        passages: [{ bookId: 'JHN', bookNameBn: 'যোহন', chapter: 14, verses: '১-৩১' }],
        devotionalThoughtBn: '"তোমাদের হৃদয় উদ্বিগ্ন না হউক; আমিই পথ, সত্য ও জীবন।"'
      },
      {
        dayNumber: 7,
        titleBn: 'খ্রীষ্টে বিজয়ী জীবন ও অনন্ত প্রেম',
        passages: [{ bookId: 'ROM', bookNameBn: 'রোমীয়', chapter: 8, verses: '১-৩৯' }],
        devotionalThoughtBn: 'ঈশ্বরের আত্মা দ্বারা পরিচালিত হয়ে সমস্ত পরীক্ষায় বিজয়ী অপেক্ষা শ্রেষ্ঠ হওয়া।'
      }
    ]
  },
  {
    id: 'psalms-comfort-14-days',
    titleBn: 'গীতসংহিতা ও সান্ত্বনার বাণী (১৪ দিন)',
    titleEn: '14 Days of Comfort in the Psalms',
    descriptionBn: 'জীবনের ঝড়ঝঞ্ঝা, ক্লান্তি ও উদ্বেগের মাঝে ঈশ্বরের অটল সুরক্ষায় শান্তি খুঁজে নেওয়ার ভক্তিমূলক পাঠ।',
    categoryBn: 'ভক্তিমূলক প্রার্থনা ও সান্ত্বনা',
    totalDays: 14,
    days: [
      {
        dayNumber: 1,
        titleBn: 'ধার্মিকের পথ ও আনন্দ',
        passages: [{ bookId: 'PSA', bookNameBn: 'গীতসংহিতা', chapter: 1 }],
        devotionalThoughtBn: 'সদাপ্রভুর ব্যবস্থায় দিবারাত্র ধ্যানকারী ব্যক্তি জলের তীরের ফলবান বৃক্ষের ন্যায়।'
      },
      {
        dayNumber: 2,
        titleBn: 'সদাপ্রভু আমার পালক',
        passages: [{ bookId: 'PSA', bookNameBn: 'গীতসংহিতা', chapter: 23 }],
        devotionalThoughtBn: 'মৃত্যুচ্ছায়ার উপত্যকায়ও কোনো ভয় নেই, কারণ জীবন্ত পালক স্বয়ং সাথে আছেন।'
      },
      {
        dayNumber: 3,
        titleBn: 'পর্বতের চেয়েও মহান সৃষ্টিকর্তার সাহায্য',
        passages: [{ bookId: 'PSA', bookNameBn: 'গীতসংহিতা', chapter: 121 }],
        devotionalThoughtBn: 'যিনি ইস্রায়েলকে রক্ষা করেন, তিনি কখনো তন্দ্রা যান না, নিদ্রাও যান না।'
      },
      {
        dayNumber: 4,
        titleBn: 'ঈশ্বরে সমস্ত চিত্তে পূর্ণ বিশ্বাস',
        passages: [{ bookId: 'PRO', bookNameBn: 'হিতোপদেশ', chapter: 3, verses: '১-১২' }],
        devotionalThoughtBn: 'নিজের বিচার-বিবেচনায় নির্ভর না করে সমস্ত পথে সদাপ্রভুকে স্বীকার করা।'
      }
    ]
  }
];
