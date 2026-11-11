// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// DAILY BIBLE VERSE NOTIFICATION SYSTEM — TYPE DEFINITIONS
// Owner & Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

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

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface WebPushSubscriptionData {
  endpoint: string;
  keys: PushSubscriptionKeys;
  expirationTime?: number | null;
}

export interface VerseHistoryEntry {
  date: string; // YYYY-MM-DD
  verseRef: string;
  bookId: string;
  chapter: number;
  verse: number;
}

export interface DailyVerseSubscriber {
  id: string;
  userId?: string;
  name?: string;
  email?: string;
  pushSubscription?: WebPushSubscriptionData;
  channel: DeliveryChannel;
  language: NotificationLanguage;
  timeZone: string; // e.g. 'Asia/Kolkata', 'Asia/Dhaka', 'UTC'
  preferredTime: string; // HH:mm, default '10:00'
  status: SubscriptionStatus;
  hasExplicitConsent: boolean;
  consentTimestamp: string;
  consentText: string;
  createdAt: string;
  updatedAt: string;
  lastDeliveredDate?: string; // YYYY-MM-DD
  failureCount: number;
  verseHistory: VerseHistoryEntry[]; // Used for 90-day anti-repeat filter
}

export interface DailyVerseCalendarEntry {
  id: string;
  date: string; // YYYY-MM-DD
  bookId: string;
  chapter: number;
  verse: number;
  verseRefBn: string; // e.g. 'যোহন ৩:১৬'
  verseRefEn: string; // e.g. 'John 3:16'
  textBn: string;
  textEn: string;
  themeBn: string;
  themeEn: string;
  explanationBn?: string;
  versionBn: 'IRV-Bengali';
  versionEn: 'KJV' | 'BSB' | 'ESV';
  approvedBy: string; // 'Rev. Ayan Kumar Ghosh'
  isApproved: boolean;
  isFallback?: boolean;
}

export interface DailyVerseDeliveryLog {
  id: string;
  subscriberId: string;
  maskedRecipient: string; // e.g. 'a***5@gmail.com' or 'Browser-Push-9f***'
  channel: DeliveryChannel;
  language: NotificationLanguage;
  date: string; // YYYY-MM-DD
  scheduledTime: string; // ISO string
  deliveredAt?: string; // ISO string
  status: DeliveryStatus;
  retryCount: number;
  maxRetries: number;
  failureReason?: string;
  openedAt?: string;
  clickedAt?: string;
  verseRef: string;
  deepLinkUrl: string;
  messageContent: string;
  ipMasked?: string;
}

export interface DailyVerseMonitorMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  pausedSubscribers: number;
  unsubscribedCount: number;
  scheduledToday: number;
  deliveredToday: number;
  failedToday: number;
  openedToday: number;
  clickedToday: number;
  deliveryRate: number; // percentage, e.g. 98.5
  retryQueueCount: number;
  byLanguage: {
    bn: number;
    en: number;
  };
  byChannel: {
    push: number;
    email: number;
  };
  byTimeZone: Array<{ timeZone: string; count: number }>;
  failedReasons: Array<{ reason: string; count: number }>;
  tomorrowVerse: DailyVerseCalendarEntry | null;
  emergencyPaused: boolean;
  emergencyPausedReason?: string;
}

export interface DailyVerseHealthCheck {
  date: string;
  checkedAt: string;
  totalScheduled: number;
  totalDelivered: number;
  totalFailed: number;
  successRate: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  issues: string[];
  recommendationBn?: string;
}

export interface DailyVersePreferencesInput {
  channel: DeliveryChannel;
  language: NotificationLanguage;
  timeZone: string;
  preferredTime: string;
  email?: string;
  pushSubscription?: WebPushSubscriptionData;
}
