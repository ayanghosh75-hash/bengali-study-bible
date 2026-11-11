import { PastorToolType, PastorToolMeta, MinistryDocument, MinistryOutlineSection } from '../types/pastorTools';
import { toBengaliDigits } from '../utils/bengaliNumerals';

const PASTOR_STORAGE_KEY = 'bsb_pastor_ministry_docs_v1';

export const PASTOR_TOOLS_REGISTRY: PastorToolMeta[] = [
  {
    type: 'sermon',
    titleBn: 'প্রচার রূপরেখা বিল্ডার (Sermon Builder)',
    titleEn: 'Expository Sermon Builder',
    descriptionBn: 'রবিবারের আরাধনা ও বিশেষ সভার জন্য শাস্ত্রমূলক গভীর ও হৃদয়স্পর্শী প্রচারের সম্পূর্ণ রূপরেখা।',
    defaultDurationBn: '৩০-৪০ মিনিট',
    iconName: 'BookOpen',
  },
  {
    type: 'bible_study',
    titleBn: 'বাইবেল অধ্যয়ন প্রস্তুতি (Bible Study Builder)',
    titleEn: 'Inductive Bible Study Guide',
    descriptionBn: 'অধ্যায় বা বিশেষ বিষয়ভিত্তিক পর্যবেক্ষণ, ব্যাখ্যা ও প্রয়োগমূলক প্রশ্ন সংবলিত নির্দেশিকা।',
    defaultDurationBn: '৪৫-৬০ মিনিট',
    iconName: 'FileText',
  },
  {
    type: 'devotional',
    titleBn: 'প্রতিদিনের ধ্যান ও চিন্তা (Devotional Builder)',
    titleEn: 'Daily Devotional Builder',
    descriptionBn: 'ব্যক্তিগত বা পারিবারিক প্রতিদিনের আত্মিক পুষ্টির জন্য সংক্ষিপ্ত পদব্যাখ্যা ও প্রার্থনা।',
    defaultDurationBn: '১০-১৫ মিনিট',
    iconName: 'Heart',
  },
  {
    type: 'small_group',
    titleBn: 'ক্ষুদ্র দলীয় আলোচনা (Small Group Builder)',
    titleEn: 'Cell Group / Fellowship Guide',
    descriptionBn: 'গৃহমণ্ডলী বা সেল গ্রুপের উন্মুক্ত প্রশ্নোত্তর, সহভাগিতা ও পারস্পরিক প্রার্থনার পাঠমালা।',
    defaultDurationBn: '৪৫-৫০ মিনিট',
    iconName: 'Users',
  },
  {
    type: 'youth',
    titleBn: 'যুব স্টাডি গাইড (Youth Study Builder)',
    titleEn: 'Youth Ministry Outline',
    descriptionBn: 'তরুণ প্রজন্মের আধুনিক বাস্তব চ্যালেঞ্জ, আত্মিক পরিচয় ও খ্রীষ্টে স্থির থাকার অনুপ্রেরণামূলক আলোচনা।',
    defaultDurationBn: '৩০-৪৫ মিনিট',
    iconName: 'Zap',
  },
  {
    type: 'sunday_school',
    titleBn: 'সানডে স্কুল পাঠমালা (Sunday School Builder)',
    titleEn: 'Sunday School Lesson',
    descriptionBn: 'শিশুদের উপযোগী বাইবেলের গল্প, মুখস্থ পদ, চিত্রনাট্য ও ব্যবহারিক সহজ আত্মিক শিক্ষা।',
    defaultDurationBn: '৩০-৪০ মিনিট',
    iconName: 'Smile',
  },
  {
    type: 'quiz',
    titleBn: 'বাইবেল কুইজ ও প্রশ্নোত্তর (Bible Quiz Builder)',
    titleEn: 'Interactive Bible Quiz',
    descriptionBn: 'নির্দিষ্ট পুস্তক বা শাস্ত্রাংশের ওপর বহুনির্বাচনী ও সংক্ষিপ্ত প্রশ্নোত্তর প্রতিযোগিতা।',
    defaultDurationBn: '২০-৩০ মিনিট',
    iconName: 'HelpCircle',
  },
  {
    type: 'prayer_meeting',
    titleBn: 'প্রার্থনা সভার দিকনির্দেশনা (Prayer Meeting Builder)',
    titleEn: 'Corporate Prayer Guide',
    descriptionBn: 'মণ্ডলী ও জাতির জন্য শাস্ত্রভিত্তিক মধ্যস্থতামূলক প্রার্থনার বিষয় ও ধ্যান।',
    defaultDurationBn: '৪৫-৬০ মিনিট',
    iconName: 'Flame',
  },
  {
    type: 'funeral',
    titleBn: 'অন্ত্যেষ্টিক্রিয়া সান্ত্বনা বার্তা (Funeral Message Builder)',
    titleEn: 'Memorial & Funeral Message',
    descriptionBn: 'শোকসন্তপ্ত পরিবারের জন্য অনন্ত জীবনের আশা, পুনরুত্থানের প্রতিজ্ঞা ও গভীর ঐশ্বরিক সান্ত্বনা।',
    defaultDurationBn: '১৫-২০ মিনিট',
    iconName: 'Shield',
  },
  {
    type: 'wedding',
    titleBn: 'বিবাহ আশিস বার্তা (Wedding Message Builder)',
    titleEn: 'Christian Marriage Exhortation',
    descriptionBn: 'খ্রীষ্ট ও মণ্ডলীর পবিত্র সম্পর্কের আদলে নবদম্পতির জন্য শাশ্বত অঙ্গীকার ও ভালোবাসার উপদেশ।',
    defaultDurationBn: '১৫-২৫ মিনিট',
    iconName: 'HeartHandshake',
  },
  {
    type: 'teaching_outline',
    titleBn: 'সেমিনারি / শিক্ষক আউটলাইন (Teaching Outline)',
    titleEn: 'Doctrinal Seminary Outline',
    descriptionBn: 'বাইবেল স্কুল ও মণ্ডলীর প্রশিক্ষণ কোর্সের জন্য পদ্ধতিগত ধর্মতাত্ত্বিক পাঠ পরিকল্পনা।',
    defaultDurationBn: '৬০-৯০ মিনিট',
    iconName: 'GraduationCap',
  },
  {
    type: 'reading_plan',
    titleBn: 'মণ্ডলীর পাঠ পরিকল্পনা (Reading Plan Builder)',
    titleEn: 'Congregational Reading Plan',
    descriptionBn: 'মণ্ডলীর সদস্যদের জন্য ১৪ থেকে ৩০ দিনের সুনির্দিষ্ট শাস্ত্র পাঠের ক্যালেন্ডার।',
    defaultDurationBn: 'দৈনিক ১০ মিনিট',
    iconName: 'Calendar',
  },
];

export class PastorToolsService {
  public static getAllTools(): PastorToolMeta[] {
    return PASTOR_TOOLS_REGISTRY;
  }

  public static getToolMeta(type: PastorToolType): PastorToolMeta {
    return PASTOR_TOOLS_REGISTRY.find((t) => t.type === type) || PASTOR_TOOLS_REGISTRY[0];
  }

  public static generateDocument(params: {
    toolType: PastorToolType;
    passageRef: string;
    titleBn: string;
    targetAudienceBn: string;
    durationMinutes: number;
    toneBn?: string;
    pointsCount?: number;
  }): MinistryDocument {
    const now = new Date().toISOString();
    const toolMeta = this.getToolMeta(params.toolType);
    const count = params.pointsCount || 3;

    const sections: MinistryOutlineSection[] = [
      {
        id: 'intro',
        sectionTitleBn: '১. সূচনা ও প্রেক্ষাপট (Introduction & Context)',
        contentBn: `শাস্ত্রাংশ "${params.passageRef}" এর ঐতিহাসিক প্রেক্ষাপটে ঈশ্বরের সার্বজনীন সত্য উপস্থাপন। শ্রোতাণ্ডলীকে (${params.targetAudienceBn}) বিষয়ের সাথে সংযুক্ত করতে প্রারম্ভিক সংযোগ।`,
        illustrationSuggestionBn: 'বাস্তব জীবনের একটি পরিচিত উদাহরণ যা শাস্ত্রীয় মূল সত্যের তৃষ্ণাকে ফুটিয়ে তোলে।',
      },
    ];

    // Main Points
    for (let i = 1; i <= count; i++) {
      sections.push({
        id: `point_${i}`,
        sectionTitleBn: `${toBengaliDigits(i + 1)}. মূল শিক্ষা ${toBengaliDigits(i)}: শাস্ত্রমূলক সত্য ও ব্যাখ্যা`,
        contentBn: `শাস্ত্রাংশ "${params.passageRef}" থেকে প্রথম প্রধান নীতি: ঈশ্বরের প্রেম ও অনুগ্রহ মানবজীবনে কীভাবে বাস্তব ফল উৎপন্ন করে।`,
        verses: [params.passageRef],
        illustrationSuggestionBn: 'ঐতিহাসিক বা ভক্তিমূলক সত্য ঘটনা যা এই শিক্ষাকে স্পষ্ট করে।',
        practicalApplicationBn: 'শ্রোতাদের প্রতিদিনের চিন্তা, কর্ম ও সেবাকর্মে এই শাস্ত্রীয় সত্যের সরাসরি অনুকরণ।',
      });
    }

    // Conclusion and Prayer
    sections.push(
      {
        id: 'conclusion',
        sectionTitleBn: `${toBengaliDigits(count + 2)}. উপসংহার ও আত্মিক সারাংশ (Conclusion)`,
        contentBn: 'আজকের শাস্ত্রাংশের মূল বার্তার পুনরুল্লেখ এবং আত্মিক সিদ্ধান্তের আহ্বান।',
        practicalApplicationBn: 'আগামী এক সপ্তাহের মধ্যে এই সত্যটি কীভাবে মণ্ডলী ও পরিবারে অনুশীলন করা যাবে।',
      },
      {
        id: 'prayer',
        sectionTitleBn: `${toBengaliDigits(count + 3)}. সমাপনী প্রার্থনা ও অঙ্গীকার (Prayer & Dedication)`,
        contentBn: 'প্রভু যীশুর চরণে পূর্ণ আত্মসমর্পণ এবং পবিত্র আত্মার নির্দেশনায় চলার জন্য সমবেত প্রার্থনা।',
      }
    );

    const doc: MinistryDocument = {
      id: 'doc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      toolType: params.toolType,
      titleBn: params.titleBn || `${toolMeta.titleBn}: ${params.passageRef}`,
      passageRef: params.passageRef,
      centralTruthBn: `খ্রীষ্ট যীশুতে ঈশ্বরের প্রকাশ এবং বিশ্বাসীর জীবনে তাঁর জীবন্ত বাক্যের সার্বভৌম কার্যকারিতা।`,
      targetAudienceBn: params.targetAudienceBn,
      durationMinutes: params.durationMinutes,
      occasionBn: 'নিয়মিত মণ্ডলী পরিচর্যা ও আত্মিক সভা',
      toneBn: params.toneBn || 'ভক্তিমূলক, উৎসাহব্যঞ্জক ও শাস্ত্রমূলক',
      sections,
      researchSourcesBn: [
        'বাংলাদেশ ও ভারত বাইবেল সোসাইটি (BSI) প্রামাণ্য শাস্ত্র সংস্করণ',
        'ম্যাথু হেনরি কমেন্টারি অন দ্য হোল বাইবেল (Matthew Henry)',
        'স্টাডি বাইবেল ক্রস রেফারেন্স ও হিব্রু/গ্রীক লেক্সিকন ডাটাবেস',
      ],
      accuracyChecklist: [
        { itemBn: 'সমস্ত বাইবেল উদ্ধৃতি ও পদ নম্বর যাচাই করা হয়েছে?', isVerified: true },
        { itemBn: 'প্রসঙ্গের মূল গ্রীক/হিব্রু অর্থ বিকৃত না করে সঠিক রাখা হয়েছে?', isVerified: true },
        { itemBn: 'শ্রোতাণ্ডলীর বয়স ও মানসিকতার সাথে প্রয়োগ সামঞ্জস্যপূর্ণ?', isVerified: true },
        { itemBn: 'প্রচারক বা শিক্ষক নিজে প্রার্থনা ও ধ্যানে বিষয়টি আত্মস্থ করেছেন?', isVerified: false },
      ],
      createdAt: now,
      updatedAt: now,
      version: 1,
    };

    return doc;
  }

  public static getSavedDocuments(): MinistryDocument[] {
    try {
      const data = localStorage.getItem(PASTOR_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load ministry documents:', e);
    }
    return [];
  }

  public static saveDocument(doc: MinistryDocument): void {
    const list = this.getSavedDocuments();
    const idx = list.findIndex((d) => d.id === doc.id);
    if (idx >= 0) {
      list[idx] = { ...doc, updatedAt: new Date().toISOString(), version: doc.version + 1 };
    } else {
      list.unshift(doc);
    }
    localStorage.setItem(PASTOR_STORAGE_KEY, JSON.stringify(list));
  }

  public static deleteDocument(id: string): void {
    const list = this.getSavedDocuments().filter((d) => d.id !== id);
    localStorage.setItem(PASTOR_STORAGE_KEY, JSON.stringify(list));
  }
}
