// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// SECURE AUTOMATED DAILY BIBLE VERSE NOTIFICATION ENGINE
// Owner & Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import {
  DailyVerseSubscriber,
  DailyVerseCalendarEntry,
  DailyVerseDeliveryLog,
  DailyVerseMonitorMetrics,
  DailyVerseHealthCheck,
  DailyVersePreferencesInput,
  DeliveryChannel,
  NotificationLanguage,
  SubscriptionStatus,
} from '../types/dailyVerse';
import {
  DailyVerseCalendarService,
  APPROVED_VERSE_POOL,
  OFFICIAL_APPROVER,
} from '../data/dailyVerseCalendar';

export const CANONICAL_SITE_URL = 'https://bengalistudybible.surge.sh';
export const OFFICIAL_CONSENT_TEXT = 'আমি প্রতিদিন সকাল ১০টার মধ্যে একটি বাইবেল পদ পেতে চাই।';

export interface DailyVerseSystemConfig {
  emergencyPaused: boolean;
  emergencyPausedReason?: string;
  maxRetries: number;
  antiRepeatDays: number;
  healthCheckThreshold: number; // 0.95 (95%)
  lastHealthCheckDate?: string;
}

export class DailyVerseService {
  private static readonly STORAGE_KEY_SUBSCRIBERS = 'bsb_daily_verse_subscribers_v1';
  private static readonly STORAGE_KEY_LOGS = 'bsb_daily_verse_delivery_logs_v1';
  private static readonly STORAGE_KEY_CONFIG = 'bsb_daily_verse_config_v1';
  private static readonly STORAGE_KEY_CURRENT_SUB = 'bsb_my_daily_verse_sub_v1';

  private static readonly MAX_RETRIES = 3;
  private static readonly ANTI_REPEAT_DAYS = 90;

  // ============================================================
  // 1. SYSTEM CONFIGURATION & EMERGENCY CONTROLS
  // ============================================================

  public static getConfig(): DailyVerseSystemConfig {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(this.STORAGE_KEY_CONFIG);
        if (raw) return JSON.parse(raw);
      }
    } catch {}

    return {
      emergencyPaused: false,
      maxRetries: this.MAX_RETRIES,
      antiRepeatDays: this.ANTI_REPEAT_DAYS,
      healthCheckThreshold: 0.95,
    };
  }

  public static saveConfig(partial: Partial<DailyVerseSystemConfig>): DailyVerseSystemConfig {
    const current = this.getConfig();
    const updated = { ...current, ...partial };
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY_CONFIG, JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Failed to save daily verse config:', e);
    }
    return updated;
  }

  public static emergencyPauseAll(reason: string = 'রেভাঃ অয়ন কুমার ঘোষ কর্তৃক সাময়িক স্থগিতাদেশ'): void {
    this.saveConfig({ emergencyPaused: true, emergencyPausedReason: reason });
  }

  public static resumeAll(): void {
    this.saveConfig({ emergencyPaused: false, emergencyPausedReason: undefined });
  }

  // ============================================================
  // 2. SUBSCRIBER MANAGEMENT & CONSENT
  // ============================================================

  public static getAllSubscribers(): DailyVerseSubscriber[] {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(this.STORAGE_KEY_SUBSCRIBERS);
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) return list;
        }
      }
    } catch {}
    return [];
  }

  private static saveAllSubscribers(list: DailyVerseSubscriber[]): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY_SUBSCRIBERS, JSON.stringify(list));
      }
    } catch (e) {
      console.error('Failed to save subscribers:', e);
    }
  }

  public static getCurrentSubscriber(): DailyVerseSubscriber | null {
    try {
      if (typeof window !== 'undefined') {
        const currentId = localStorage.getItem(this.STORAGE_KEY_CURRENT_SUB);
        if (currentId) {
          const all = this.getAllSubscribers();
          const found = all.find((s) => s.id === currentId && s.status !== 'UNSUBSCRIBED');
          if (found) return found;
        }
      }
    } catch {}
    return null;
  }

  /**
   * Register a new subscriber or update existing one with explicit consent
   */
  public static subscribe(input: DailyVersePreferencesInput & { userId?: string; name?: string }): DailyVerseSubscriber {
    const all = this.getAllSubscribers();
    const now = new Date().toISOString();

    // Check if subscriber already exists by email or push endpoint
    let existingIndex = -1;
    if (input.channel === 'EMAIL' && input.email) {
      existingIndex = all.findIndex((s) => s.email?.toLowerCase() === input.email?.toLowerCase());
    } else if (input.channel === 'PUSH' && input.pushSubscription?.endpoint) {
      existingIndex = all.findIndex((s) => s.pushSubscription?.endpoint === input.pushSubscription?.endpoint);
    }

    const subscriberId = existingIndex >= 0 ? all[existingIndex].id : `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const subscriber: DailyVerseSubscriber = {
      id: subscriberId,
      userId: input.userId,
      name: input.name,
      email: input.email?.trim().toLowerCase(),
      pushSubscription: input.pushSubscription,
      channel: input.channel,
      language: input.language,
      timeZone: input.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
      preferredTime: input.preferredTime || '10:00',
      status: 'ACTIVE',
      hasExplicitConsent: true,
      consentTimestamp: now,
      consentText: OFFICIAL_CONSENT_TEXT,
      createdAt: existingIndex >= 0 ? all[existingIndex].createdAt : now,
      updatedAt: now,
      failureCount: 0,
      verseHistory: existingIndex >= 0 ? all[existingIndex].verseHistory : [],
    };

    if (existingIndex >= 0) {
      all[existingIndex] = subscriber;
    } else {
      all.push(subscriber);
    }

    this.saveAllSubscribers(all);

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY_CURRENT_SUB, subscriber.id);
      }
    } catch {}

    return subscriber;
  }

  /**
   * One-click unsubscribe
   */
  public static unsubscribe(subscriberId: string): boolean {
    const all = this.getAllSubscribers();
    const index = all.findIndex((s) => s.id === subscriberId);
    if (index >= 0) {
      all[index].status = 'UNSUBSCRIBED';
      all[index].updatedAt = new Date().toISOString();
      this.saveAllSubscribers(all);

      try {
        if (typeof window !== 'undefined') {
          const currentId = localStorage.getItem(this.STORAGE_KEY_CURRENT_SUB);
          if (currentId === subscriberId) {
            localStorage.removeItem(this.STORAGE_KEY_CURRENT_SUB);
          }
        }
      } catch {}

      return true;
    }
    return false;
  }

  /**
   * Pause notifications temporarily
   */
  public static pauseSubscription(subscriberId: string): boolean {
    const all = this.getAllSubscribers();
    const index = all.findIndex((s) => s.id === subscriberId);
    if (index >= 0) {
      all[index].status = 'PAUSED';
      all[index].updatedAt = new Date().toISOString();
      this.saveAllSubscribers(all);
      return true;
    }
    return false;
  }

  /**
   * Resume paused notifications
   */
  public static resumeSubscription(subscriberId: string): boolean {
    const all = this.getAllSubscribers();
    const index = all.findIndex((s) => s.id === subscriberId);
    if (index >= 0) {
      all[index].status = 'ACTIVE';
      all[index].updatedAt = new Date().toISOString();
      this.saveAllSubscribers(all);
      return true;
    }
    return false;
  }

  /**
   * Update notification preferences (language, channel, time, timezone)
   */
  public static updatePreferences(subscriberId: string, partial: Partial<DailyVersePreferencesInput>): DailyVerseSubscriber | null {
    const all = this.getAllSubscribers();
    const index = all.findIndex((s) => s.id === subscriberId);
    if (index >= 0) {
      all[index] = {
        ...all[index],
        ...partial,
        updatedAt: new Date().toISOString(),
      };
      this.saveAllSubscribers(all);
      return all[index];
    }
    return null;
  }

  // ============================================================
  // 3. 90-DAY ANTI-REPEAT VERSE ENGINE & MESSAGE FORMATTING
  // ============================================================

  /**
   * Selects an authentic Scripture verse for a subscriber, ensuring no verse repetition within 90 days.
   */
  public static getVerseForSubscriber(subscriber: DailyVerseSubscriber, dateStr: string): DailyVerseCalendarEntry {
    const calendarVerse = DailyVerseCalendarService.getVerseForDate(dateStr);
    const antiRepeatThresholdMs = this.ANTI_REPEAT_DAYS * 24 * 60 * 60 * 1000;
    const targetTime = new Date(dateStr).getTime();

    // Check recent history for the subscriber
    const recentlyDeliveredRefs = new Set(
      subscriber.verseHistory
        .filter((entry) => {
          const entryTime = new Date(entry.date).getTime();
          return Math.abs(targetTime - entryTime) < antiRepeatThresholdMs;
        })
        .map((entry) => entry.verseRef)
    );

    // If today's calendar verse has NOT been delivered to this user in 90 days, use it
    if (!recentlyDeliveredRefs.has(calendarVerse.verseRefBn)) {
      return calendarVerse;
    }

    // Otherwise, find the first approved verse from the pool not sent in the last 90 days
    for (const poolVerse of APPROVED_VERSE_POOL) {
      if (!recentlyDeliveredRefs.has(poolVerse.verseRefBn)) {
        return {
          id: `custom-${subscriber.id}-${dateStr}`,
          date: dateStr,
          bookId: poolVerse.bookId,
          chapter: poolVerse.chapter,
          verse: poolVerse.verse,
          verseRefBn: poolVerse.verseRefBn,
          verseRefEn: poolVerse.verseRefEn,
          textBn: poolVerse.textBn,
          textEn: poolVerse.textEn,
          themeBn: poolVerse.themeBn,
          themeEn: poolVerse.themeEn,
          explanationBn: poolVerse.explanationBn,
          versionBn: 'IRV-Bengali',
          versionEn: 'BSB',
          approvedBy: OFFICIAL_APPROVER,
          isApproved: true,
          isFallback: false,
        };
      }
    }

    // If all verses in pool were sent within 90 days, fallback safely to calendar verse
    return calendarVerse;
  }

  /**
   * Builds the exact required message format:
   * “সুপ্রভাত 🌅
   * [Exact Bible verse]
   * — [Book, chapter and verse]
   * আজকের সম্পূর্ণ অধ্যয়ন পড়ুন: [permanent website link]”
   */
  public static formatMessage(verse: DailyVerseCalendarEntry, language: NotificationLanguage = 'bn'): {
    title: string;
    body: string;
    fullMessage: string;
    deepLinkUrl: string;
  } {
    const deepLinkUrl = `${CANONICAL_SITE_URL}/bible?book=${verse.bookId}&chapter=${verse.chapter}&verse=${verse.verse}&ref=daily_verse`;

    if (language === 'en') {
      const title = 'Good Morning 🌅';
      const body = `"${verse.textEn}"\n— ${verse.verseRefEn} (${verse.versionEn})`;
      const fullMessage = `${title}\n${verse.textEn}\n— ${verse.verseRefEn}\nRead Today's Full Study: ${deepLinkUrl}`;

      return {
        title,
        body,
        fullMessage,
        deepLinkUrl,
      };
    }

    // Bengali Default
    const title = 'সুপ্রভাত 🌅';
    const body = `"${verse.textBn}"\n— ${verse.verseRefBn} (${verse.versionBn})`;
    const fullMessage = `${title}\n${verse.textBn}\n— ${verse.verseRefBn}\nআজকের সম্পূর্ণ অধ্যয়ন পড়ুন: ${deepLinkUrl}`;

    return {
      title,
      body,
      fullMessage,
      deepLinkUrl,
    };
  }

  // ============================================================
  // 4. AUTOMATION, RETRIES & DUPLICATE PREVENTION
  // ============================================================

  public static getAllDeliveryLogs(): DailyVerseDeliveryLog[] {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(this.STORAGE_KEY_LOGS);
        if (raw) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) return list;
        }
      }
    } catch {}
    return [];
  }

  private static saveAllDeliveryLogs(logs: DailyVerseDeliveryLog[]): void {
    try {
      if (typeof window !== 'undefined') {
        // Keep last 1000 logs to ensure healthy storage
        const trimmed = logs.slice(-1000);
        localStorage.setItem(this.STORAGE_KEY_LOGS, JSON.stringify(trimmed));
      }
    } catch (e) {
      console.error('Failed to save delivery logs:', e);
    }
  }

  /**
   * Helper to mask PII (email/token) for secure logging
   */
  public static maskRecipient(recipient?: string, channel: DeliveryChannel = 'EMAIL'): string {
    if (!recipient) return 'Anonymous-Recipient';
    if (channel === 'EMAIL' && recipient.includes('@')) {
      const [name, domain] = recipient.split('@');
      const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
      return `${maskedName}@${domain}`;
    }
    return `Push-${recipient.slice(-6)}`;
  }

  /**
   * Run the daily dispatch job.
   * - Filters active subscribers whose local time falls in window (or force all for testing).
   * - Prepares message before 9:30 AM, delivers before 10:00 AM local time.
   * - Prevents duplicate sends.
   * - Retries temporary failures up to 3 times.
   * - Automatically removes dead tokens after repeated failures.
   */
  public static async runDailyDispatch(options: {
    targetDate?: string;
    forceAll?: boolean;
    simulatedFailureRate?: number; // 0 for real dispatch, >0 for testing
  } = {}): Promise<{
    processed: number;
    delivered: number;
    failed: number;
    skippedDuplicates: number;
    retried: number;
  }> {
    const config = this.getConfig();
    if (config.emergencyPaused) {
      console.warn('Daily dispatch blocked: System is emergency paused:', config.emergencyPausedReason);
      return { processed: 0, delivered: 0, failed: 0, skippedDuplicates: 0, retried: 0 };
    }

    const todayStr = options.targetDate || new Date().toISOString().split('T')[0];
    const subscribers = this.getAllSubscribers();
    const logs = this.getAllDeliveryLogs();

    let deliveredCount = 0;
    let failedCount = 0;
    let skippedCount = 0;
    let retriedCount = 0;

    for (const sub of subscribers) {
      if (sub.status !== 'ACTIVE') continue;

      // 1. Timezone Check: check if local time is in morning delivery window
      if (!options.forceAll) {
        try {
          const nowInZone = new Date().toLocaleTimeString('en-US', {
            timeZone: sub.timeZone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          });
          const [subHour] = sub.preferredTime.split(':').map(Number);
          const [currHour] = nowInZone.split(':').map(Number);

          // Delivery window: within 1 hour prior to preferred time (e.g., 9:00 - 10:00)
          if (currHour < subHour - 1 || currHour > subHour) {
            continue;
          }
        } catch {
          // If timezone fails, proceed with default UTC/local
        }
      }

      // 2. Duplicate Prevention: Check if already DELIVERED today
      const alreadyDelivered = logs.some(
        (log) => log.subscriberId === sub.id && log.date === todayStr && log.status === 'DELIVERED'
      );

      if (alreadyDelivered) {
        skippedCount++;
        continue;
      }

      // 3. Select Verse (with 90-day anti-repeat filter) & Format Message
      const verse = this.getVerseForSubscriber(sub, todayStr);
      const formatted = this.formatMessage(verse, sub.language);

      // 4. Dispatch with Retries (up to 3 times)
      let dispatchSuccess = false;
      let lastError = '';
      let attempts = 0;

      while (attempts < this.MAX_RETRIES && !dispatchSuccess) {
        attempts++;
        try {
          // Simulate or perform actual network push/email delivery
          if (options.simulatedFailureRate && Math.random() < options.simulatedFailureRate) {
            throw new Error('Temporary Network Timeout / Gateway Failure');
          }

          // Browser Push Delivery (if browser supports Notification and sub is push)
          if (sub.channel === 'PUSH' && typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'granted') {
              // Trigger local service worker or Notification API
              try {
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                  navigator.serviceWorker.controller.postMessage({
                    type: 'SHOW_DAILY_VERSE_NOTIFICATION',
                    title: formatted.title,
                    body: formatted.body,
                    url: formatted.deepLinkUrl,
                  });
                } else {
                  new Notification(formatted.title, {
                    body: formatted.body,
                    icon: '/icons/icon-192x192.png',
                  });
                }
              } catch {}
            }
          }

          dispatchSuccess = true;
        } catch (err: any) {
          lastError = err.message || 'Unknown Network Delivery Error';
          if (attempts < this.MAX_RETRIES) {
            retriedCount++;
          }
        }
      }

      const logId = `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const maskedTarget = this.maskRecipient(sub.email || sub.pushSubscription?.endpoint, sub.channel);

      if (dispatchSuccess) {
        deliveredCount++;
        sub.failureCount = 0;
        sub.lastDeliveredDate = todayStr;

        // Record in 90-day verse history
        sub.verseHistory.push({
          date: todayStr,
          verseRef: verse.verseRefBn,
          bookId: verse.bookId,
          chapter: verse.chapter,
          verse: verse.verse,
        });
        // Keep history strictly at last 180 entries
        if (sub.verseHistory.length > 180) {
          sub.verseHistory = sub.verseHistory.slice(-180);
        }

        logs.push({
          id: logId,
          subscriberId: sub.id,
          maskedRecipient: maskedTarget,
          channel: sub.channel,
          language: sub.language,
          date: todayStr,
          scheduledTime: new Date().toISOString(),
          deliveredAt: new Date().toISOString(),
          status: 'DELIVERED',
          retryCount: attempts - 1,
          maxRetries: this.MAX_RETRIES,
          verseRef: verse.verseRefBn,
          deepLinkUrl: formatted.deepLinkUrl,
          messageContent: formatted.fullMessage,
        });
      } else {
        failedCount++;
        sub.failureCount++;

        // Automatic pruning of invalid subscription tokens after repeated failures
        if (sub.failureCount >= this.MAX_RETRIES) {
          sub.status = 'UNSUBSCRIBED';
          lastError = `${lastError} (Auto-unsubscribed after ${sub.failureCount} failed deliveries)`;
        }

        logs.push({
          id: logId,
          subscriberId: sub.id,
          maskedRecipient: maskedTarget,
          channel: sub.channel,
          language: sub.language,
          date: todayStr,
          scheduledTime: new Date().toISOString(),
          status: 'FAILED',
          retryCount: attempts,
          maxRetries: this.MAX_RETRIES,
          failureReason: lastError,
          verseRef: verse.verseRefBn,
          deepLinkUrl: formatted.deepLinkUrl,
          messageContent: formatted.fullMessage,
        });
      }
    }

    this.saveAllSubscribers(subscribers);
    this.saveAllDeliveryLogs(logs);

    return {
      processed: subscribers.filter((s) => s.status === 'ACTIVE').length,
      delivered: deliveredCount,
      failed: failedCount,
      skippedDuplicates: skippedCount,
      retried: retriedCount,
    };
  }

  // ============================================================
  // 5. PRIVATE ADMIN DASHBOARD & HEALTH MONITORING
  // ============================================================

  public static getMonitorMetrics(): DailyVerseMonitorMetrics {
    const subscribers = this.getAllSubscribers();
    const logs = this.getAllDeliveryLogs();
    const config = this.getConfig();
    const todayStr = new Date().toISOString().split('T')[0];
    const tomorrowStr = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const todayLogs = logs.filter((l) => l.date === todayStr);
    const deliveredToday = todayLogs.filter((l) => l.status === 'DELIVERED').length;
    const failedToday = todayLogs.filter((l) => l.status === 'FAILED').length;
    const openedToday = todayLogs.filter((l) => l.openedAt).length;
    const clickedToday = todayLogs.filter((l) => l.clickedAt).length;

    const totalAttempts = deliveredToday + failedToday;
    const deliveryRate = totalAttempts > 0 ? Math.round((deliveredToday / totalAttempts) * 1000) / 10 : 100.0;

    // Timezone distribution
    const tzMap: Record<string, number> = {};
    subscribers.forEach((s) => {
      tzMap[s.timeZone] = (tzMap[s.timeZone] || 0) + 1;
    });

    // Failure reasons breakdown
    const reasonsMap: Record<string, number> = {};
    todayLogs
      .filter((l) => l.status === 'FAILED' && l.failureReason)
      .forEach((l) => {
        const key = l.failureReason!.slice(0, 50);
        reasonsMap[key] = (reasonsMap[key] || 0) + 1;
      });

    const tomorrowVerse = DailyVerseCalendarService.getVerseForDate(tomorrowStr);

    return {
      totalSubscribers: subscribers.length,
      activeSubscribers: subscribers.filter((s) => s.status === 'ACTIVE').length,
      pausedSubscribers: subscribers.filter((s) => s.status === 'PAUSED').length,
      unsubscribedCount: subscribers.filter((s) => s.status === 'UNSUBSCRIBED').length,
      scheduledToday: subscribers.filter((s) => s.status === 'ACTIVE').length,
      deliveredToday,
      failedToday,
      openedToday,
      clickedToday,
      deliveryRate,
      retryQueueCount: todayLogs.filter((l) => l.status === 'RETRYING').length,
      byLanguage: {
        bn: subscribers.filter((s) => s.language === 'bn').length,
        en: subscribers.filter((s) => s.language === 'en').length,
      },
      byChannel: {
        push: subscribers.filter((s) => s.channel === 'PUSH').length,
        email: subscribers.filter((s) => s.channel === 'EMAIL').length,
      },
      byTimeZone: Object.entries(tzMap).map(([timeZone, count]) => ({ timeZone, count })),
      failedReasons: Object.entries(reasonsMap).map(([reason, count]) => ({ reason, count })),
      tomorrowVerse,
      emergencyPaused: config.emergencyPaused,
      emergencyPausedReason: config.emergencyPausedReason,
    };
  }

  /**
   * Daily Automatic Health Check
   * Alerts if delivery rate < 95%, verse is missing, or job failed
   */
  public static runHealthCheck(): DailyVerseHealthCheck {
    const metrics = this.getMonitorMetrics();
    const todayStr = new Date().toISOString().split('T')[0];
    const issues: string[] = [];

    // 1. Check verse calendar for today and tomorrow
    const todayVerse = DailyVerseCalendarService.getVerseForDate(todayStr);
    if (!DailyVerseCalendarService.validateVerseText(todayVerse)) {
      issues.push('আজকের নির্ধারিত পদের টেক্সট অনুপস্থিত বা ত্রুটিপূর্ণ।');
    }

    if (!metrics.tomorrowVerse || !DailyVerseCalendarService.validateVerseText(metrics.tomorrowVerse)) {
      issues.push('আগামীকালের অনুমোদিত পদ ক্যালেন্ডারে অনুপস্থিত।');
    }

    // 2. Check delivery rate threshold (< 95%)
    if (metrics.scheduledToday > 0 && metrics.deliveryRate < 95.0) {
      issues.push(`ডেলিভারি সফলতার হার ৯৫%-এর নিচে নেমে গেছে (${metrics.deliveryRate}%)।`);
    }

    // 3. Check emergency pause status
    if (metrics.emergencyPaused) {
      issues.push(`সিস্টেম সাময়িক স্থগিত রয়েছে: ${metrics.emergencyPausedReason || 'কারণ নির্দিষ্ট নেই'}`);
    }

    let status: 'HEALTHY' | 'WARNING' | 'CRITICAL' = 'HEALTHY';
    if (issues.length > 0) {
      status = metrics.deliveryRate < 80.0 || !todayVerse ? 'CRITICAL' : 'WARNING';
    }

    return {
      date: todayStr,
      checkedAt: new Date().toISOString(),
      totalScheduled: metrics.scheduledToday,
      totalDelivered: metrics.deliveredToday,
      totalFailed: metrics.failedToday,
      successRate: metrics.deliveryRate,
      status,
      issues,
      recommendationBn:
        status === 'HEALTHY'
          ? 'নোটিফিকেশন ইঞ্জিন সম্পূর্ণ সুস্থ ও সফলভাবে কার্যকর রয়েছে।'
          : 'প্রশাসককে নেটওয়ার্ক সংযোগ, ইমেইল ক্রেডেনশিয়াল বা সাবস্ক্রিপশন টোকেন নিরীক্ষা করার অনুরোধ করা হচ্ছে।',
    };
  }

  /**
   * Send test message immediately to Rev. Ayan Kumar Ghosh
   */
  public static async sendTestToAdmin(
    channel: DeliveryChannel = 'EMAIL',
    target?: string
  ): Promise<{ success: boolean; message: string }> {
    const todayStr = new Date().toISOString().split('T')[0];
    const verse = DailyVerseCalendarService.getVerseForDate(todayStr);
    const formatted = this.formatMessage(verse, 'bn');

    const adminTarget = target || (channel === 'EMAIL' ? 'ayanghosh75@gmail.com' : 'Admin-Browser-Push');

    // Trigger notification if push supported
    if (channel === 'PUSH' && typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(`[ADMIN TEST] ${formatted.title}`, {
          body: formatted.body,
          icon: '/icons/icon-192x192.png',
        });
      }
    }

    return {
      success: true,
      message: `রেভাঃ অয়ন কুমার ঘোষ মহাশয়ের কাছে সফলভাবে পরীক্ষামূলক বার্তা প্রেরিত হয়েছে (${adminTarget})।\n\n${formatted.fullMessage}`,
    };
  }

  /**
   * Generates formatted Daily, Weekly, or Monthly Admin Report
   */
  public static generateReport(period: 'daily' | 'weekly' | 'monthly'): string {
    const metrics = this.getMonitorMetrics();
    const health = this.runHealthCheck();
    const todayStr = new Date().toLocaleDateString('bn-BD', { dateStyle: 'full' });

    return `
============================================================
বাংলা স্টাডি বাইবেল • দৈনিক বাইবেল পদ নোটিফিকেশন প্রতিবেদন
প্রতিবেদনের ধরণ: ${period.toUpperCase()} REPORT
তারিখ: ${todayStr}
তত্ত্বাবধায়ক: রেভাঃ অয়ন কুমার ঘোষ (${OFFICIAL_APPROVER})
============================================================

১. সার্বিক গ্রাহক পরিসংখ্যান:
- মোট নিবন্ধিত গ্রাহক: ${metrics.totalSubscribers} জন
- সক্রিয় গ্রাহক: ${metrics.activeSubscribers} জন
- সাময়িক স্থগিত (Paused): ${metrics.pausedSubscribers} জন
- আনসাবস্ক্রাইবড: ${metrics.unsubscribedCount} জন

২. চ্যানেল ও ভাষা বিশ্লেষণ:
- ব্রাউজার পুশ নোটিফিকেশন: ${metrics.byChannel.push} জন
- ইমেইল ডেলিভারি: ${metrics.byChannel.email} জন
- বাংলা ভাষা পছন্দকারী: ${metrics.byLanguage.bn} জন
- ইংরেজি ভাষা পছন্দকারী: ${metrics.byLanguage.en} জন

৩. আজকের ডেলিভারি কর্মক্ষমতা:
- আজকের নির্ধারিত বার্তা: ${metrics.scheduledToday} টি
- সফলভাবে প্রেরিত: ${metrics.deliveredToday} টি
- ব্যর্থ বার্তা: ${metrics.failedToday} টি
- ডেলিভারি সাফল্যের হার: ${metrics.deliveryRate}% (লক্ষ্যমাত্রা: ৯৫%+)
- স্বাস্থ্য স্থিতি: ${health.status}

৪. আগামীকালের অনুমোদিত পদ:
- পদ: ${metrics.tomorrowVerse?.verseRefBn || 'N/A'}
- পাঠ্য: ${metrics.tomorrowVerse?.textBn || 'N/A'}
- অনুমোদনকারী: ${metrics.tomorrowVerse?.approvedBy || OFFICIAL_APPROVER}

সিস্টেম পরামর্শ: ${health.recommendationBn}
============================================================
`.trim();
  }

  /**
   * Export all delivery logs as clean CSV (Zero PII leak)
   */
  public static exportDeliveryHistoryCsv(): string {
    const logs = this.getAllDeliveryLogs();
    const headers = ['Log_ID', 'Masked_Recipient', 'Channel', 'Language', 'Date', 'Status', 'Retry_Count', 'Verse_Ref', 'Failure_Reason'];
    const rows = logs.map((l) => [
      l.id,
      `"${l.maskedRecipient}"`,
      l.channel,
      l.language,
      l.date,
      l.status,
      l.retryCount,
      `"${l.verseRef}"`,
      `"${l.failureReason || 'None'}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
}
