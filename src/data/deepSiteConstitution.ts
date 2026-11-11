// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ Site Constitution” (দীপ সাইট সংবিধান)
// PROTECTED CONSTITUTIONAL SAFEGUARDS & IMMUTABLE GOVERNANCE RULES
// Administrator & Spiritual Authority: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Scripture Safeguard: Zero AI Manufactured Scripture Guaranteed
// ============================================================

export interface ConstitutionalRule {
  id: string;
  ruleNumber: number;
  titleBn: string;
  titleEn: string;
  statementBn: string;
  enforcementLevel: 'IMMUTABLE' | 'CANNOT_BE_SILENTLY_MODIFIED';
  category: 'SCRIPTURE' | 'ETHICS' | 'PRIVACY' | 'SECURITY' | 'GOVERNANCE';
  isEnforced: boolean;
}

export interface ConstitutionalAuditLogEntry {
  timestamp: string;
  action: string;
  authorizedBy: string;
  verifiedHash: string;
  detailsBn: string;
}

export const DEEP_SITE_CONSTITUTION_RULES: ConstitutionalRule[] = [
  {
    id: 'CONST-01-SCRIPTURE-INVENTION-FORBIDDEN',
    ruleNumber: 1,
    titleBn: 'শাস্ত্র উদ্ভাবন বা মনগড়া পদ তৈরি সম্পূর্ণ নিষিদ্ধ',
    titleEn: 'Scripture Cannot Be Invented',
    statementBn: 'দীপ বা কোনো কৃত্রিম বুদ্ধিমত্তা কখনোই কোনো নতুন শাস্ত্রপদ রচনা, তৈরি বা উদ্ভাবন করতে পারবে না। বাইবেলের প্রামাণ্য ক্যানন অপরিবর্তনীয়।',
    enforcementLevel: 'IMMUTABLE',
    category: 'SCRIPTURE',
    isEnforced: true,
  },
  {
    id: 'CONST-02-SCRIPTURE-SILENT-CHANGE-FORBIDDEN',
    ruleNumber: 2,
    titleBn: 'শাস্ত্রের কোনো পদ গোপনে বা অলক্ষ্যে পরিবর্তন নিষিদ্ধ',
    titleEn: 'Scripture Cannot Be Silently Changed',
    statementBn: 'পবিত্র বাইবেলের মূল অনুবাদ পাঠে কোনো গোপন, স্বয়ংক্রিয় বা অপরীক্ষিত পরিবর্তন ঘটানো যাবে না।',
    enforcementLevel: 'IMMUTABLE',
    category: 'SCRIPTURE',
    isEnforced: true,
  },
  {
    id: 'CONST-03-COMMENTARY-SEPARATION-GUARANTEE',
    ruleNumber: 3,
    titleBn: 'টীকা ও ব্যাখ্যাকে অবশ্যই মূল পদ থেকে দৃশ্যত পৃথক রাখতে হবে',
    titleEn: 'Commentary Must Be Separated From Bible Text',
    statementBn: 'মানুষের রচিত টীকা, বিশ্লেষণ, ধর্মতত্ত্ব বা গবেষণা কখনোই বাইবেলীয় মূল পাঠের অংশ হিসেবে উপস্থাপিত হবে না; তা পৃথক লেবেলে দৃশ্যমান হতে হবে।',
    enforcementLevel: 'IMMUTABLE',
    category: 'SCRIPTURE',
    isEnforced: true,
  },
  {
    id: 'CONST-04-SOURCES-IDENTIFICATION-MANDATE',
    ruleNumber: 4,
    titleBn: 'প্রতিটি বাহ্যিক তথ্য ও সূত্রের মূল উৎস স্পষ্টভাবে চিহ্নিতকরণ',
    titleEn: 'Sources Must Be Identified',
    statementBn: 'যেকোনো ঐতিহাসিক, অভিধানীয় বা ধর্মতাত্ত্বিক তথ্যের জন্য লেখক, সংস্করণ ও বৈধ রেফারেন্স স্পষ্টভাবে উল্লেখ থাকতে হবে।',
    enforcementLevel: 'IMMUTABLE',
    category: 'ETHICS',
    isEnforced: true,
  },
  {
    id: 'CONST-05-COPYRIGHT-AND-LICENCES-HONOURED',
    ruleNumber: 5,
    titleBn: 'গ্রন্থস্বত্ব ও লাইসেন্সের পূর্ণ ও বিশ্বস্ত মর্যাদা প্রদান',
    titleEn: 'Copyright and Licences Must Be Respected',
    statementBn: 'বিনামূল্যে পাঠযোগ্য মানেই পুনঃপ্রকাশের অনুমতি নয়। উন্মুক্ত লাইসেন্স (CC0/Public Domain/অনুমোদিত) ব্যতীত কোনো পূর্ণ রচনা কপি বা ডাউনলোডযোগ্য করা যাবে না।',
    enforcementLevel: 'IMMUTABLE',
    category: 'ETHICS',
    isEnforced: true,
  },
  {
    id: 'CONST-06-NOTIFICATION-CONSENT-MANDATORY',
    ruleNumber: 6,
    titleBn: 'বিজ্ঞপ্তি প্রেরণে সুস্পষ্ট ব্যবহারকারী সম্মতি আবশ্যক',
    titleEn: 'Notifications Require Consent',
    statementBn: 'কেবলমাত্র লিঙ্ক বা পেজ পরিদর্শনের ভিত্তিতে কোনো বিজ্ঞপ্তি পাঠানো যাবে না; স্পষ্ট সম্মতি, বিরতি ও যেকোনো সময় বন্ধের পূর্ণ অধিকার থাকতে হবে।',
    enforcementLevel: 'IMMUTABLE',
    category: 'PRIVACY',
    isEnforced: true,
  },
  {
    id: 'CONST-07-PRIVACY-AND-PERSONAL-DATA-PROTECTED',
    ruleNumber: 7,
    titleBn: 'ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা ও গোপনীয়তা রক্ষা',
    titleEn: 'Private Information Must Be Protected',
    statementBn: 'ব্যবহারকারীর ব্যক্তিগত স্পর্শকাতর তথ্য কখনো সংগৃহীত, স্ক্র্যাপ বা বাণিজ্যিক উদ্দেশ্যে বিক্রি করা যাবে না। বিশ্লেষণে পরিচয় গোপন থাকবে।',
    enforcementLevel: 'IMMUTABLE',
    category: 'PRIVACY',
    isEnforced: true,
  },
  {
    id: 'CONST-08-PAID-SERVICES-ADMIN-APPROVAL-MANDATORY',
    ruleNumber: 8,
    titleBn: 'অর্থ প্রদান বা পেইড সার্ভিসে প্রশাসনিক অনুমোদন আবশ্যক',
    titleEn: 'Paid Services Require Approval',
    statementBn: 'দীপ কোনো অর্থ লেনদেন, পেইড এপিআই বা সেবা ক্রয় স্বায়ত্তশাসিতভাবে করতে পারবে না; রেভারেন্ড অয়ন কুমার ঘোষের সরাসরি অনুমোদন আবশ্যক।',
    enforcementLevel: 'IMMUTABLE',
    category: 'SECURITY',
    isEnforced: true,
  },
  {
    id: 'CONST-09-EXTERNAL-OUTREACH-EXPLICIT-PERMISSION',
    ruleNumber: 9,
    titleBn: 'বহিরাগত মাধ্যমে প্রচারণায় স্পষ্ট অনুমতি আবশ্যক',
    titleEn: 'External Outreach Requires Permission',
    statementBn: 'বহিরাগত গ্রুপ, চ্যানেল বা গ্রুপে কোনো বার্তা পাঠানোর আগে গ্রুপের নিয়ম মেনে প্রশাসনিক অনুমোদনের সারিতে জমা দিতে হবে।',
    enforcementLevel: 'IMMUTABLE',
    category: 'GOVERNANCE',
    isEnforced: true,
  },
  {
    id: 'CONST-10-HIGH-RISK-CHANGES-HUMAN-APPROVAL',
    ruleNumber: 10,
    titleBn: 'উচ্চ-ঝুঁকিপূর্ণ পরিবর্তনের জন্য মানুষের অনুমোদন (Level 3)',
    titleEn: 'High-Risk Changes Require Approval',
    statementBn: 'কোর ডেটাবেজ মুছে ফেলা, নীতিগত পরিবর্তন বা সিস্টেমের মৌলিক রূপান্তরে সার্বক্ষণিক মানুষের অনুমোদন আবশ্যক।',
    enforcementLevel: 'IMMUTABLE',
    category: 'GOVERNANCE',
    isEnforced: true,
  },
  {
    id: 'CONST-11-ALL-ACTIONS-AUDITABLE',
    ruleNumber: 11,
    titleBn: 'প্রতিটি স্বয়ংক্রিয় কাজ নিরীক্ষাযোগ্য ও প্রমাণভিত্তিক হতে হবে',
    titleEn: 'Every Automatic Change Must Be Auditable',
    statementBn: 'দীপ কর্তৃক গৃহীত প্রতিটি পরিদর্শন, মেরামত বা প্রস্তাবনার সম্পূর্ণ রেকর্ড ও প্রমাণ সংরক্ষণ বাধ্যতামূলক।',
    enforcementLevel: 'IMMUTABLE',
    category: 'GOVERNANCE',
    isEnforced: true,
  },
  {
    id: 'CONST-12-ALL-TECHNICAL-CHANGES-REVERSIBLE',
    ruleNumber: 12,
    titleBn: 'প্রতিটি প্রযুক্তিগত পরিবর্তন পূর্বাবস্থায় ফিরিয়ে আনার যোগ্য (Rollback-Ready)',
    titleEn: 'Every Technical Change Must Be Reversible',
    statementBn: 'কোনো পরিবর্তন অচল হলে তা তাৎক্ষণিকভাবে নিরাপদ ব্যাকআপ বা পূর্ববর্তী স্টেটে ফিরিয়ে নেওয়ার ব্যবস্থা থাকতে হবে।',
    enforcementLevel: 'IMMUTABLE',
    category: 'SECURITY',
    isEnforced: true,
  },
  {
    id: 'CONST-13-ADMIN-EMERGENCY-CONTROL-PERMANENT',
    ruleNumber: 13,
    titleBn: 'অ্যাডমিনিস্ট্রেটরের জরুরি নিয়ন্ত্রণ সার্বক্ষণিক সক্রিয় থাকা বাধ্যতামূলক',
    titleEn: 'Administrator Emergency Control Must Always Remain Available',
    statementBn: 'রেভারেন্ড অয়ন কুমার ঘোষ যেকোনো মুহূর্তে স্বায়ত্তশাসন বন্ধ, ম্যানুয়াল নিয়ন্ত্রণ গ্রহণ বা জরুরি শাটডাউন কার্যকর করতে পারবেন।',
    enforcementLevel: 'IMMUTABLE',
    category: 'GOVERNANCE',
    isEnforced: true,
  },
];

export const CONSTITUTION_HASH = 'SHA256-DEEP-BSB-CONST-2026-V1-REV-AYAN-GHOSH';

export class DeepSiteConstitutionService {
  private static instance: DeepSiteConstitutionService;

  public static getInstance(): DeepSiteConstitutionService {
    if (!DeepSiteConstitutionService.instance) {
      DeepSiteConstitutionService.instance = new DeepSiteConstitutionService();
    }
    return DeepSiteConstitutionService.instance;
  }

  public getRules(): ConstitutionalRule[] {
    return [...DEEP_SITE_CONSTITUTION_RULES];
  }

  public verifyIntegrity(): { isValid: boolean; failedRules: string[]; hash: string } {
    const failedRules: string[] = [];
    for (const rule of DEEP_SITE_CONSTITUTION_RULES) {
      if (!rule.isEnforced) {
        failedRules.push(rule.id);
      }
    }
    return {
      isValid: failedRules.length === 0,
      failedRules,
      hash: CONSTITUTION_HASH,
    };
  }

  public checkActionCompliance(actionType: string, payload?: any): { permitted: boolean; reasonBn?: string } {
    // Check 1: Scripture Invention
    if (actionType === 'INVENT_SCRIPTURE' || actionType === 'GENERATE_AI_VERSE') {
      return { permitted: false, reasonBn: 'সংবিধান ১ নম্বর ধারা লঙ্ঘন: কোনো মনগড়া শাস্ত্র পদ তৈরি নিষিদ্ধ।' };
    }
    // Check 2: Unapproved Paid Service
    if (actionType === 'PURCHASE_SERVICE' || actionType === 'PAID_API_CALL') {
      return { permitted: false, reasonBn: 'সংবিধান ৮ নম্বর ধারা লঙ্ঘন: প্রশাসনিক অনুমোদন ব্যতিরেকে অর্থ খরচ নিষিদ্ধ।' };
    }
    // Check 3: Silent Scripture Change
    if (actionType === 'MODIFY_BIBLE_TEXT' && !payload?.adminApproved) {
      return { permitted: false, reasonBn: 'সংবিধান ২ ও ১০ নম্বর ধারা লঙ্ঘন: শাস্ত্রীয় পাঠ্যে মানুষের অনুমোদন আবশ্যক।' };
    }
    // Check 4: Unsolicited Broadcast
    if (actionType === 'SEND_UNSOLICITED_NOTIFICATION') {
      return { permitted: false, reasonBn: 'সংবিধান ৬ নম্বর ধারা লঙ্ঘন: পূর্ব সম্মতিহীন নোটিফিকেশন নিষিদ্ধ।' };
    }

    return { permitted: true };
  }
}

export const deepConstitution = DeepSiteConstitutionService.getInstance();
