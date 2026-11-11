// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// FEEDBACK, CORRECTION, SUGGESTION & SUPPORT DOMAIN TYPES
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

export type FeedbackCategory =
  | 'GENERAL_FEEDBACK'
  | 'CONTENT_CORRECTION'
  | 'BIBLE_TEXT_CONCERN'
  | 'BIBLE_REFERENCE_ERROR'
  | 'THEOLOGICAL_CONCERN'
  | 'FACTUAL_ERROR'
  | 'SOURCE_CORRECTION'
  | 'TRANSLATION_CONCERN'
  | 'TYPOGRAPHICAL_ERROR'
  | 'BROKEN_LINK'
  | 'TECHNICAL_PROBLEM'
  | 'MOBILE_PROBLEM'
  | 'INSTALLATION_PROBLEM'
  | 'SEARCH_PROBLEM'
  | 'LOGIN_PROBLEM'
  | 'PERFORMANCE_PROBLEM'
  | 'ACCESSIBILITY_PROBLEM'
  | 'FEATURE_REQUEST'
  | 'STUDY_TOPIC_REQUEST'
  | 'SERMON_TOOL_REQUEST'
  | 'PASTOR_TOOL_REQUEST'
  | 'LIBRARY_REQUEST'
  | 'MAP_REQUEST'
  | 'WORD_STUDY_REQUEST'
  | 'TUTORIAL_REQUEST'
  | 'MINISTRY_NEED'
  | 'USER_REVIEW'
  | 'OTHER';

export type FeedbackStatus =
  | 'NEW'
  | 'ACKNOWLEDGED'
  | 'UNDER_REVIEW'
  | 'NEEDS_INFORMATION'
  | 'VERIFICATION_REQUIRED'
  | 'THEOLOGICAL_REVIEW_REQUIRED'
  | 'BIBLE_DATA_REVIEW_REQUIRED'
  | 'SOURCE_REVIEW_REQUIRED'
  | 'RIGHTS_REVIEW_REQUIRED'
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'FIXED'
  | 'RESOLVED'
  | 'DECLINED'
  | 'DUPLICATE'
  | 'CLOSED';

export type FeedbackPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type EmailDeliveryStatus = 'NOT_REQUIRED' | 'QUEUED' | 'SENT' | 'FAILED' | 'RETRYING';

export interface TechnicalContext {
  appVersion: string;
  currentRoute: string;
  browserFamily: string;
  osFamily: string;
  screenCategory: 'mobile' | 'tablet' | 'desktop';
  pwaMode: 'standalone' | 'browser';
  isOnline: boolean;
  timestamp: string;
}

export interface BibleContext {
  translationId: string;
  bookId: string;
  bookNameBn: string;
  chapter: number;
  verse?: number;
  displayedText?: string;
  sourceCitation?: string;
}

export interface StudyContext {
  resourceType: 'article' | 'commentary' | 'map' | 'timeline' | 'lexicon' | 'sermon_tool' | 'other';
  resourceId: string;
  resourceTitle?: string;
}

export interface FeedbackInternalNote {
  id: string;
  author: string;
  note: string;
  timestamp: string;
}

export interface EmailDeliveryRecord {
  status: EmailDeliveryStatus;
  recipient: string;
  subject: string;
  queuedAt: string;
  sentAt?: string;
  failedAt?: string;
  retryCount: number;
  lastError?: string;
  provider: string;
}

export interface FeedbackItem {
  id: string;
  referenceNumber: string; // e.g. BSB-FB-2026-00001
  category: FeedbackCategory;
  subcategory?: string;
  subject: string;
  description: string;
  userId?: string;
  name?: string;
  email?: string;
  module?: string;
  pageUrl: string;
  bibleContext?: BibleContext;
  studyContext?: StudyContext;
  technicalContext?: TechnicalContext;
  screenshotBase64?: string;
  screenshotName?: string;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  assignedTo?: string;
  rating?: number; // 1-5 for reviews
  ministryType?: string;
  countryRegion?: string; // Optional diaspora/location (zero GPS, user entered)
  studyDepth?: 'সংক্ষিপ্ত' | 'সাধারণ' | 'গভীর' | 'গবেষণামূলক';
  consentForTestimonial: boolean; // Default false
  allowCorrectionCredit: boolean; // Default false
  resolutionSummary?: string;
  userFacingResponse?: string;
  internalNotes: FeedbackInternalNote[];
  duplicateOf?: string;
  relatedFeedbackIds?: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  emailDelivery: EmailDeliveryRecord;
}

export interface FeedbackSubmissionPayload {
  category: FeedbackCategory;
  subcategory?: string;
  subject: string;
  description: string;
  name?: string;
  email?: string;
  module?: string;
  pageUrl?: string;
  bibleContext?: BibleContext;
  studyContext?: StudyContext;
  screenshotBase64?: string;
  screenshotName?: string;
  rating?: number;
  ministryType?: string;
  countryRegion?: string;
  studyDepth?: 'সংক্ষিপ্ত' | 'সাধারণ' | 'গভীর' | 'গবেষণামূলক';
  consentForTestimonial?: boolean;
  allowCorrectionCredit?: boolean;
  honeypot?: string; // For spam bot protection
}

export interface FeedbackFilterOptions {
  category?: FeedbackCategory | 'ALL';
  status?: FeedbackStatus | 'ALL';
  priority?: FeedbackPriority | 'ALL';
  searchTerm?: string;
  module?: string;
  emailStatus?: EmailDeliveryStatus | 'ALL';
}

export interface FeedbackAnalyticsSummary {
  totalCount: number;
  newCount: number;
  underReviewCount: number;
  bibleCorrectionsCount: number;
  contentCorrectionsCount: number;
  technicalProblemsCount: number;
  featureRequestsCount: number;
  ministryNeedsCount: number;
  resolvedCount: number;
  emailsSentCount: number;
  emailsPendingCount: number;
  emailsFailedCount: number;
  topReportedProblems: Array<{ label: string; count: number }>;
  whatUsersNeed: Array<{ label: string; count: number }>;
  ministryResearchBreakdown: Array<{ label: string; count: number }>;
}
