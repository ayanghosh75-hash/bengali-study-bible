// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার” (Deep Bengali Christian Knowledge Base)
// Subtitle: “যাচাইকৃত বাংলা খ্রিষ্টীয় গ্রন্থ, প্রবন্ধ, গবেষণা ও শিক্ষাসামগ্রীর মুক্ত সংগ্রহ”
// MASTER DATA TYPES, 28-FIELD SOURCE RECORD & GOVERNANCE MODELS
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

export type CopyrightStatus =
  | 'PUBLIC_DOMAIN'
  | 'CC0'
  | 'CREATIVE_COMMONS'
  | 'OPEN_EDUCATIONAL'
  | 'WRITTEN_PERMISSION'
  | 'EXTERNAL_LINK_ONLY'
  | 'UNCERTAIN';

export type KnowledgeCategory =
  | 'bible_intro'           // বাইবেল পরিচিতি
  | 'old_testament'         // পুরাতন নিয়ম
  | 'new_testament'         // নতুন নিয়ম
  | 'biblical_background'   // বাইবেলের পটভূমি
  | 'bible_dictionary'      // বাইবেল অভিধান
  | 'commentaries'          // ব্যাখ্যাগ্রন্থ
  | 'theology'              // ধর্মতত্ত্ব
  | 'church_history'        // মণ্ডলীর ইতিহাস
  | 'bengal_christian_history' // ভারত ও বাংলার খ্রিষ্টীয় ইতিহাস
  | 'missions_evangelism'   // মিশন ও সুসমাচার প্রচার
  | 'discipleship'          // শিষ্যত্ব
  | 'prayer'                // প্রার্থনা
  | 'praise_worship'        // প্রশংসা ও উপাসনা
  | 'pastoral_care'         // পালকীয় পরিচর্যা
  | 'youth_children'        // যুব ও শিশু পরিচর্যা
  | 'family'                // পরিবার
  | 'christian_ethics'      // খ্রিষ্টীয় নৈতিকতা
  | 'apologetics'           // আত্মপক্ষসমর্থন
  | 'biography'             // জীবনী
  | 'research_papers'       // গবেষণাপত্র
  | 'audio_video'           // অডিও ও ভিডিও
  | 'free_books'            // মুক্ত বই
  | 'external_links';       // বহিরাগত যাচাইকৃত লিংক

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  'bible_intro',
  'old_testament',
  'new_testament',
  'biblical_background',
  'bible_dictionary',
  'commentaries',
  'theology',
  'church_history',
  'bengal_christian_history',
  'missions_evangelism',
  'discipleship',
  'prayer',
  'praise_worship',
  'pastoral_care',
  'youth_children',
  'family',
  'christian_ethics',
  'apologetics',
  'biography',
  'research_papers',
  'audio_video',
  'free_books',
  'external_links',
];

export type TheologicalTradition =
  | 'Evangelical'
  | 'Pentecostal_Charismatic'
  | 'Protestant'
  | 'Anglican'
  | 'Baptist'
  | 'Lutheran'
  | 'Methodist'
  | 'Reformed'
  | 'Catholic'
  | 'Orthodox'
  | 'Ecumenical'
  | 'Academic'
  | 'Historical'
  | 'Devotional'
  | 'Denominational'
  | 'Multiple_perspectives'
  | 'Theological_position_unclear';

export const THEOLOGICAL_TRADITIONS: TheologicalTradition[] = [
  'Evangelical',
  'Pentecostal_Charismatic',
  'Protestant',
  'Anglican',
  'Baptist',
  'Lutheran',
  'Methodist',
  'Reformed',
  'Catholic',
  'Orthodox',
  'Ecumenical',
  'Academic',
  'Historical',
  'Devotional',
  'Denominational',
  'Multiple_perspectives',
  'Theological_position_unclear',
];

export const MANDATORY_28_SOURCE_FIELDS = [
  'bengaliTitle',
  'originalTitle',
  'author',
  'translator',
  'editor',
  'publisherOrOrg',
  'publicationDate',
  'resourceType',
  'originalUrl',
  'downloadUrl',
  'dateAccessed',
  'language',
  'licenceName',
  'licenceUrl',
  'copyrightStatus',
  'redistributionPermission',
  'editingPermission',
  'commercialUsePermission',
  'attributionRequirement',
  'requiredAttributionWording',
  'theologicalTradition',
  'relevantBiblePassages',
  'intendedAudience',
  'suitabilityDecision',
  'reviewDate',
  'reviewer',
  'knownLimitations',
  'archivedLicenceEvidence',
] as const;

export type ResourceDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'academic';

export type AudienceRole =
  | 'ordinary_readers'
  | 'pastors'
  | 'bible_teachers'
  | 'theology_students'
  | 'youth_leaders'
  | 'sunday_school'
  | 'small_groups'
  | 'researchers'
  | 'seekers'
  | 'youth_children'
  | 'family'
  | 'church_leaders';

export type ResourceApprovalLevel =
  | 'LEVEL_1_AUTO_LIST'
  | 'LEVEL_2_AUTO_IMPORT'
  | 'LEVEL_3_ADMIN_APPROVAL_REQUIRED';

export type SuitabilityDecision =
  | 'APPROVED'
  | 'EXTERNAL_LINK_ONLY'
  | 'PENDING_REVIEW'
  | 'REJECTED';

export type ResourceStatus =
  | 'APPROVED'
  | 'PENDING_REVIEW'
  | 'EXTERNAL_LINK_ONLY'
  | 'REJECTED'
  | 'HIDDEN';

export interface SuitabilityScoreBreakdown {
  scriptureAccuracy: number;        // max 25
  authorCredibility: number;        // max 15
  licenceClarity: number;           // max 20
  theologicalTransparency: number;  // max 10
  bengaliLanguageQuality: number;   // max 10
  educationalValue: number;         // max 10
  accessibilityUsability: number;   // max 5
  technicalSafety: number;          // max 5
  totalScore: number;               // 0 - 100
  classification:
    | 'STRONGLY_SUITABLE'           // 90 - 100
    | 'SUITABLE_WITH_NORMAL_REVIEW' // 75 - 89
    | 'USE_CAUTIOUSLY'              // 60 - 74
    | 'DO_NOT_ADD';                 // < 60
}

/**
 * MANDATORY 28-FIELD SOURCE RECORD
 * Implements Section 4 of the Master Specification
 */
export interface DeepKnowledgeResource {
  // --- Mandatory 28 Fields ---
  bengaliTitle: string;                   // 1. Bengali title
  originalTitle?: string;                 // 2. Original title, if different
  author: string;                         // 3. Author
  translator?: string;                    // 4. Translator
  editor?: string;                        // 5. Editor
  publisherOrOrg: string;                 // 6. Publisher or organisation
  publicationDate: string;                // 7. Publication date
  resourceType: string;                   // 8. Resource type (বই, প্রবন্ধ, অভিধান, ভাষ্য ইত্যাদি)
  originalUrl: string;                    // 9. Original URL
  downloadUrl?: string;                   // 10. Download URL, if legally permitted
  dateAccessed: string;                   // 11. Date accessed
  language: 'bn' | 'bn-en' | 'en';        // 12. Language
  licenceName: string;                    // 13. Licence name
  licenceUrl: string;                     // 14. Licence URL
  copyrightStatus: CopyrightStatus;       // 15. Copyright status
  redistributionPermission: boolean;      // 16. Redistribution permission
  editingPermission: boolean;             // 17. Editing permission
  commercialUsePermission: boolean;       // 18. Commercial-use permission
  attributionRequirement: boolean;        // 19. Attribution requirement
  requiredAttributionWording: string;     // 20. Required attribution wording
  theologicalTradition: TheologicalTradition; // 21. Theological tradition or perspective
  relevantBiblePassages: string[];        // 22. Relevant biblical passages (e.g. ['JHN 3:16', 'ROM 8:1-39'])
  intendedAudience: AudienceRole[];       // 23. Intended audience
  suitabilityDecision: SuitabilityDecision; // 24. Suitability decision
  reviewDate: string;                     // 25. Review date
  reviewer: string;                       // 26. Reviewer (দীপ বা রেভাঃ অয়ন কুমার ঘোষ)
  knownLimitations: string[];             // 27. Known limitations
  archivedLicenceEvidence: string;        // 28. Archived licence evidence, where permitted

  // --- Platform & Engine Extensions ---
  id: string;
  category: KnowledgeCategory;
  categoryLabelBn: string;
  shortDescriptionBn: string;
  fullContentBn?: string;                 // Stored only when redistribution is legally permitted
  readingTimeMinutes?: number;
  difficultyLevel: ResourceDifficulty;
  difficultyLabelBn: string;
  suitabilityScore: SuitabilityScoreBreakdown;
  approvalLevel: ResourceApprovalLevel;
  status: ResourceStatus;
  isDisputedInterpretation: boolean;
  disputedDetailsBn?: string;
  alternativePerspectivesBn?: string[];
  externalLinkNoticeBn?: string;          // “শুধু বহিরাগত লিংক—পুনঃপ্রকাশের অনুমতি যাচাই হয়নি”
  userReportsCount: number;
  lastCheckedDate: string;
  fileSizeBytes?: number;
  fileFormat?: 'HTML' | 'PDF' | 'EPUB' | 'AUDIO_MP3' | 'EXTERNAL_PAGE';
}

export interface KnowledgeBaseFilterState {
  searchQuery: string;
  category: KnowledgeCategory | 'ALL';
  theologicalTradition: TheologicalTradition | 'ALL';
  resourceType: string | 'ALL';
  difficulty: ResourceDifficulty | 'ALL';
  copyrightStatus: CopyrightStatus | 'ALL';
  audience: AudienceRole | 'ALL';
  bibleBookId?: string;
  chapterNumber?: number;
}

export interface KnowledgeBase12HReportSection {
  sourcesSearchedCount: number;
  newResourcesDiscovered: number;
  resourcesFullyReviewed: number;
  automaticallyApprovedLinksCount: number;
  resourcesImportedCount: number;
  itemsAwaitingApprovalCount: number;
  rejectedMaterialsCount: number;
  rejectedReasons: string[];
  licenceProblemsCount: number;
  theologicalConcernsCount: number;
  brokenOrUnsafeLinksCount: number;
  contentUpgradesCompleted: string[];
  biblePassagesConnectedCount: number;
  userReportsCount: number;
  workPlannedNext12Hours: string[];
}
