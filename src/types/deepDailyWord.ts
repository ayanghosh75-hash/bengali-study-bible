// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// MASTER TYPE DEFINITIONS — DAILY WORD & OUTREACH SYSTEM
// Owner & Approver: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Scripture Basis: Psalm 119:105
// ============================================================

export type PassageCategory =
  | 'PROMISE'      // প্রতিজ্ঞা (Only genuine biblical promises)
  | 'HOPE'         // আশার বাক্য
  | 'COMFORT'      // সান্ত্বনার বাক্য
  | 'INSTRUCTION'  // নির্দেশনা / শিক্ষা
  | 'WARNING'      // সতর্কবার্তা
  | 'PRAYER'       // প্রার্থনার পদ
  | 'PRAISE'       // প্রশংসার পদ
  | 'INVITATION'   // খ্রীষ্টের আহ্বান
  | 'TEACHING';    // শিষ্যত্বের পাঠ

export type AutonomyMode =
  | 'REVIEW_REQUIRED'        // Mode 1: Admin reviews everything before dispatch (Default)
  | 'TRUSTED_AUTOPILOT'      // Mode 2: Auto-dispatch if all rules pass; sensitive items escalate
  | 'APPROVED_CALENDAR_ONLY'; // Mode 3: Dispatches strictly from pre-approved content calendar

export type DeliveryChannel = 'PUSH' | 'EMAIL';
export type NotificationLanguage = 'bn' | 'en';
export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'UNSUBSCRIBED';
export type DeliveryStatus =
  | 'SCHEDULED'
  | 'DELIVERED'
  | 'FAILED'
  | 'RETRYING'
  | 'DUPLICATE_SKIPPED'
  | 'BOUNCED';

export type OutreachPlatform =
  | 'FACEBOOK_PAGE'
  | 'FACEBOOK_GROUP'
  | 'WHATSAPP_CHANNEL'
  | 'MINISTRY_WEBSITE'
  | 'CHURCH_DIRECTORY';

export type OutreachPermissionStatus =
  | 'UNCHECKED'
  | 'REQUEST_PENDING'
  | 'PERMISSION_GRANTED'
  | 'PERMISSION_DENIED'
  | 'EXCLUDED';

export interface RelatedPassage {
  refBn: string;
  refEn: string;
  bookId: string;
  chapter: number;
  verse: number;
  textBn: string;
}

export interface ContentDistributionPackage {
  websitePageUrl: string;
  notificationTitle: string;
  notificationBody: string;
  facebookPagePost: string;
  facebookGroupPost: string;
  whatsappChannelPost: string;
  whatsappShareMessage: string;
  socialGraphicText: string;
  previewDescription: string;
  campaignTrackedUrl: string;
  accessibleAltText: string;
}

export interface DeepDailyWord {
  id: string;
  date: string; // YYYY-MM-DD
  category: PassageCategory;
  bookId: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  verseRefBn: string; // e.g. 'যোহন ৩:১৬'
  verseRefEn: string; // e.g. 'John 3:16'
  verseTextBn: string; // Exact wording from IRV Bengali
  verseTextEn: string; // Exact wording from BSB / KJV
  fullPassageBn: string; // Complete surrounding context passage
  contextBn: string; // Biblical and historical background
  simpleExplanationBn: string; // Clear, warm exposition by দীপ
  lifeApplicationBn: string; // Practical daily application
  reflectionQuestionBn: string; // Thoughtful introspection question
  shortPrayerBn: string; // Earnest, Christ-centered prayer
  relatedPassages: RelatedPassage[];
  versionBn: 'IRV-Bengali';
  versionEn: 'BSB' | 'KJV';
  licenceNotice: string;
  distributionPackage: ContentDistributionPackage;
  aiConfidenceScore: number; // 0 - 100
  autonomyStatus: 'PROPOSED' | 'APPROVED' | 'PUBLISHED' | 'REJECTED';
  approvedBy?: string;
  approvedAt?: string;
  requiresHumanEscalation: boolean;
  escalationReason?: string;
  isFallback?: boolean;
}

export interface DeepSubscriber {
  id: string;
  userId?: string;
  channel: DeliveryChannel;
  language: NotificationLanguage;
  timeZone: string; // e.g. 'Asia/Kolkata', 'Asia/Dhaka'
  preferredTime: string; // HH:mm, default '10:00'
  status: SubscriptionStatus;
  preferredThemes: string[]; // Hope, Prayer, Family, Discipleship, etc.
  email?: string;
  pushSubscription?: any;
  hasExplicitConsent: boolean;
  consentTimestamp: string;
  consentMethod: string;
  failureCount: number;
  lastDeliveredDate?: string;
  verseHistory: Array<{ date: string; verseRef: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface OutreachCommunity {
  id: string;
  name: string;
  url: string;
  platform: OutreachPlatform;
  language: string;
  region: string;
  purpose: string;
  publicContactMethod: string;
  postingRules: string;
  permissionStatus: OutreachPermissionStatus;
  permissionRequestedAt?: string;
  permissionGrantedAt?: string;
  notes?: string;
  proposedMessage?: string;
  isExcluded?: boolean;
}

export interface DeepDeliveryLog {
  id: string;
  subscriberId: string;
  maskedRecipient: string;
  channel: DeliveryChannel;
  language: NotificationLanguage;
  date: string;
  scheduledTime: string;
  deliveredAt?: string;
  status: DeliveryStatus;
  retryCount: number;
  failureReason?: string;
  openedAt?: string;
  clickedAt?: string;
  sharedAt?: string;
  verseRef: string;
  deepLinkUrl: string;
}

export interface DeepAuditLog {
  id: string;
  timestamp: string;
  action: string;
  reason: string;
  sourceUsed: string;
  validationResult: 'PASSED' | 'FAILED' | 'ESCALATED';
  approvedBy: string;
  deliveryResult?: string;
  recoveryAction?: string;
}

export interface DeepSystemHealth {
  websiteStatus: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  databaseStatus: 'AVAILABLE' | 'UNAVAILABLE';
  schedulerStatus: 'OPERATIONAL' | 'STALLED';
  pushServiceStatus: 'CONNECTED' | 'DISCONNECTED';
  metaFacebookStatus: 'CONNECTED' | 'NOT_CONFIGURED';
  whatsappStatus: 'CONNECTED' | 'CHANNEL_READY';
  lastBackupTimestamp: string;
  currentAutonomyMode: AutonomyMode;
  emergencyPaused: boolean;
  emergencyPausedReason?: string;
  deliveryRate24h: number; // percentage e.g. 98.6
  overallStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  issues: string[];
}
