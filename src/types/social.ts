// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// FACEBOOK COMMUNITY & USER-RESEARCH ENGINE TYPES
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type ContentType =
  | 'CHARACTER'      // Monday: Biblical Character (বাইবেলের চরিত্র)
  | 'QUIZ'           // Tuesday: Bible Quiz (বাইবেল কুইজ)
  | 'VERSE_STUDY'    // Wednesday: Verse Study (পদ অধ্যয়ন)
  | 'DEEP_STUDY'     // Thursday: Deep Bible Study (গভীর বাইবেল অধ্যয়ন)
  | 'QUESTION'       // Friday: Biblical Question (বাইবেল প্রশ্ন)
  | 'DISCUSSION'     // Saturday: Community Discussion (সম্প্রদায় আলোচনা)
  | 'SERMON';        // Sunday: Sermon / Bible Study (সার্মন / শাস্ত্র পাঠ)

export type PostStatus =
  | 'IDEA'
  | 'DRAFT'
  | 'SOURCE_CHECK'
  | 'THEOLOGICAL_REVIEW'
  | 'READY_FOR_APPROVAL'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'FAILED'
  | 'ARCHIVED';

export type InsightCategory =
  | 'BIBLE_QUESTION'
  | 'THEOLOGY_QUESTION'
  | 'VERSE_REQUEST'
  | 'TOPIC_REQUEST'
  | 'CHARACTER_REQUEST'
  | 'SERMON_REQUEST'
  | 'BIBLE_STUDY_REQUEST'
  | 'PASTOR_TOOL_REQUEST'
  | 'APP_PROBLEM'
  | 'FEATURE_REQUEST'
  | 'TRANSLATION_REQUEST'
  | 'OTHER';

export interface SocialPost {
  id: string;
  dayNumber: number; // 1 to 30
  dayOfWeek: DayOfWeek;
  contentType: ContentType;
  titleBn: string;
  titleEn: string;
  topicBn: string;
  scriptureReference: string;
  bookId?: string;
  chapter?: number;
  verse?: number;
  
  // Post content sections
  hookBn: string;
  bodyBn: string;
  keyObservationBn?: string;
  applicationBn?: string;
  reflectionQuestionBn?: string;
  quizAnswerBn?: string; // For Tuesday quiz reveal
  ctaBn: string;
  hashtags: string[];
  
  // Deep link & analytics
  deepLinkPath: string;
  fullDeepLinkUrl: string;
  utmCampaign: string;
  
  // Rights & source metadata
  sourceTranslation: string;
  sourceAttributionBn: string;
  rightsVerified: boolean;
  
  // Workflow & approval status
  status: PostStatus;
  reviewNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
  scheduledFor?: string;
  
  // Publication metadata
  publishedAt?: string;
  fbPostId?: string;
  fbPostUrl?: string;
  isManuallyPublished?: boolean;
  errorMessage?: string;
  
  // Visual template
  cardTemplateId: string;
  cardHeadlineBn: string;
  cardSubtextBn?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface PostTemplate {
  id: string;
  dayOfWeek: DayOfWeek;
  contentType: ContentType;
  nameBn: string;
  nameEn: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  defaultCtaBn: string;
  guidelinesBn: string;
}

export interface FacebookPageConfig {
  appId?: string;
  pageId?: string;
  pageName?: string;
  pageUrl?: string;
  isConnected: boolean;
  tokenStatus: 'VALID' | 'EXPIRED' | 'MISSING' | 'NOT_CONFIGURED';
  tokenExpiresAt?: string;
  permissionsGranted: string[];
  lastHealthCheck?: string;
}

export interface CommunityQuestion {
  id: string;
  questionTextBn: string;
  sourcePostId?: string;
  category: InsightCategory;
  relatedBookId?: string;
  relatedTopic?: string;
  votesOrCount: number;
  status: 'NEW' | 'REVIEWED' | 'PLANNED_STUDY' | 'ADDRESSED';
  productInsightBn?: string;
  receivedAt: string;
}

export interface ProductInsight {
  id: string;
  titleBn: string;
  category: InsightCategory;
  signalDescriptionBn: string;
  requestCount: number;
  recommendedFeatureOrContentBn: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING_REVIEW' | 'ACCEPTED' | 'IN_DEVELOPMENT' | 'IMPLEMENTED';
  identifiedAt: string;
}

export interface SocialMetricsSummary {
  totalReach: number;
  totalEngagement: number;
  reactions: number;
  comments: number;
  shares: number;
  linkClicks: number;
  period: string;
}
