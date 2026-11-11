// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// FEEDBACK, CORRECTION, SUPPORT & PRODUCT RESEARCH SERVICE
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import {
  FeedbackItem,
  FeedbackSubmissionPayload,
  FeedbackFilterOptions,
  FeedbackAnalyticsSummary,
  FeedbackStatus,
  FeedbackPriority,
  TechnicalContext,
} from '../types/feedback';
import { SEED_FEEDBACK_ITEMS } from '../data/feedback/feedbackCategoriesData';
import { EmailNotificationService } from './emailNotificationService';

export class FeedbackService {
  private static readonly STORAGE_KEY = 'bsb_feedback_items_v1';
  private static readonly COUNTER_KEY = 'bsb_feedback_counter_v1';
  private static readonly USER_HISTORY_KEY = 'bsb_user_feedback_history_v1';
  private static readonly LAST_SUBMIT_KEY = 'bsb_feedback_last_submit_v1';
  private static readonly RATE_LIMIT_SECONDS = 10;

  /**
   * Initializes feedback database with seed items if empty
   */
  public static getAllFeedback(): FeedbackItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(SEED_FEEDBACK_ITEMS));
        return [...SEED_FEEDBACK_ITEMS];
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[FeedbackService] Error reading feedback items:', e);
      return [...SEED_FEEDBACK_ITEMS];
    }
  }

  /**
   * Saves updated feedback list
   */
  private static saveAllFeedback(items: FeedbackItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('[FeedbackService] Error saving feedback items:', e);
    }
  }

  /**
   * Generates a sequential, human-readable reference number: BSB-FB-2026-XXXXX
   */
  public static generateReferenceNumber(): string {
    const year = new Date().getFullYear();
    let currentCounter = 5; // Start after 5 seed items

    try {
      const raw = localStorage.getItem(this.COUNTER_KEY);
      if (raw) {
        currentCounter = parseInt(raw, 10) || 5;
      }
    } catch {
      // Ignore
    }

    const nextCounter = currentCounter + 1;
    try {
      localStorage.setItem(this.COUNTER_KEY, nextCounter.toString());
    } catch {
      // Ignore
    }

    return `BSB-FB-${year}-${nextCounter.toString().padStart(5, '0')}`;
  }

  /**
   * Captures safe, privacy-preserving technical diagnostics
   */
  public static captureTechnicalContext(route?: string): TechnicalContext {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    let browserFamily = 'Web Browser';
    let osFamily = 'Unknown OS';

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      osFamily = 'iOS';
      browserFamily = /CriOS/i.test(userAgent) ? 'Chrome iOS' : 'Safari Mobile';
    } else if (/Android/i.test(userAgent)) {
      osFamily = 'Android';
      browserFamily = /Chrome/i.test(userAgent) ? 'Chrome Mobile' : 'Android Browser';
    } else if (/Windows/i.test(userAgent)) {
      osFamily = 'Windows';
      browserFamily = /Edg/i.test(userAgent) ? 'Edge' : /Chrome/i.test(userAgent) ? 'Chrome' : 'Firefox';
    } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
      osFamily = 'macOS';
      browserFamily = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent) ? 'Safari' : 'Chrome';
    } else if (/Linux/i.test(userAgent)) {
      osFamily = 'Linux';
    }

    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const screenCategory: 'mobile' | 'tablet' | 'desktop' =
      width < 640 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';

    const isStandalone =
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true);

    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    return {
      appVersion: 'PWA v1.0',
      currentRoute: route || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      browserFamily,
      osFamily,
      screenCategory,
      pwaMode: isStandalone ? 'standalone' : 'browser',
      isOnline,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Rate limiting and anti-spam verification
   */
  private static checkRateLimit(): { allowed: boolean; waitSeconds?: number } {
    try {
      const raw = localStorage.getItem(this.LAST_SUBMIT_KEY);
      if (!raw) return { allowed: true };

      const lastTime = parseInt(raw, 10);
      const elapsedSeconds = (Date.now() - lastTime) / 1000;
      if (elapsedSeconds < this.RATE_LIMIT_SECONDS) {
        return {
          allowed: false,
          waitSeconds: Math.ceil(this.RATE_LIMIT_SECONDS - elapsedSeconds),
        };
      }
    } catch {
      // Ignore
    }
    return { allowed: true };
  }

  /**
   * Detects potential duplicate reports (same passage or identical subject within 14 days)
   */
  public static detectDuplicate(
    items: FeedbackItem[],
    payload: FeedbackSubmissionPayload
  ): FeedbackItem | undefined {
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;

    return items.find((item) => {
      const itemTime = new Date(item.createdAt).getTime();
      if (itemTime < fourteenDaysAgo) return false;

      // Match Bible verse
      if (
        payload.bibleContext &&
        item.bibleContext &&
        item.bibleContext.bookId === payload.bibleContext.bookId &&
        item.bibleContext.chapter === payload.bibleContext.chapter &&
        item.bibleContext.verse === payload.bibleContext.verse
      ) {
        return true;
      }

      // Match very similar subject
      if (
        item.subject.trim().toLowerCase() === payload.subject.trim().toLowerCase() &&
        item.category === payload.category
      ) {
        return true;
      }

      return false;
    });
  }

  /**
   * Submits a new feedback item
   * CRITICAL WORKFLOW:
   * 1. Validate submission & spam check
   * 2. Save securely in Database
   * 3. Generate reference number
   * 4. Queue and send Email to ayanghosh75@gmail.com
   * 5. Record delivery status
   */
  public static async submitFeedback(
    payload: FeedbackSubmissionPayload
  ): Promise<{ success: boolean; feedback?: FeedbackItem; error?: string }> {
    // 1. Spam check: Honeypot field
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      console.warn('[FeedbackService] Bot detected via honeypot');
      return { success: false, error: 'Spam submission rejected.' };
    }

    // 2. Rate limit check
    const rateCheck = this.checkRateLimit();
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `অতিরিক্ত দ্রুত সাবমিশন। দয়া করে ${rateCheck.waitSeconds} সেকেন্ড অপেক্ষা করুন।`,
      };
    }

    // 3. Input Validations
    if (!payload.subject || payload.subject.trim().length < 3) {
      return { success: false, error: 'দয়া করে একটি স্পষ্ট বিষয় (Subject) উল্লেখ করুন।' };
    }
    if (!payload.description || payload.description.trim().length < 5) {
      return { success: false, error: 'দয়া করে বিস্তারিত বিবরণ লিখুন (কমপক্ষে ৫টি হরফ)।' };
    }

    // 4. Initial Status & Priority Determination
    let initialStatus: FeedbackStatus = 'NEW';
    let initialPriority: FeedbackPriority = 'NORMAL';

    if (payload.category === 'BIBLE_TEXT_CONCERN' || payload.category === 'BIBLE_REFERENCE_ERROR') {
      initialStatus = 'BIBLE_DATA_REVIEW_REQUIRED';
      initialPriority = 'HIGH';
    } else if (payload.category === 'THEOLOGICAL_CONCERN') {
      initialStatus = 'THEOLOGICAL_REVIEW_REQUIRED';
      initialPriority = 'NORMAL';
    } else if (payload.category === 'SOURCE_CORRECTION') {
      initialStatus = 'SOURCE_REVIEW_REQUIRED';
      initialPriority = 'NORMAL';
    } else if (payload.category === 'USER_REVIEW') {
      initialPriority = 'LOW';
    }

    const referenceNumber = this.generateReferenceNumber();
    const now = new Date().toISOString();
    const technicalContext = this.captureTechnicalContext(payload.pageUrl);

    // 5. Build Initial Feedback Item
    const newItem: FeedbackItem = {
      id: 'fb-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      referenceNumber,
      category: payload.category,
      subcategory: payload.subcategory,
      subject: payload.subject.trim(),
      description: payload.description.trim(),
      name: payload.name ? payload.name.trim() : undefined,
      email: payload.email ? payload.email.trim() : undefined,
      module: payload.module || 'Web',
      pageUrl: payload.pageUrl || technicalContext.currentRoute,
      bibleContext: payload.bibleContext,
      studyContext: payload.studyContext,
      technicalContext,
      screenshotBase64: payload.screenshotBase64,
      screenshotName: payload.screenshotName,
      priority: initialPriority,
      status: initialStatus,
      assignedTo: 'Rev. Ayan Kumar Ghosh',
      rating: payload.rating,
      ministryType: payload.ministryType,
      countryRegion: payload.countryRegion ? payload.countryRegion.trim() : undefined,
      studyDepth: payload.studyDepth,
      consentForTestimonial: payload.consentForTestimonial || false,
      allowCorrectionCredit: payload.allowCorrectionCredit || false,
      internalNotes: [],
      createdAt: now,
      updatedAt: now,
      emailDelivery: {
        status: 'QUEUED',
        recipient: EmailNotificationService.OFFICIAL_RECIPIENT,
        subject: '',
        queuedAt: now,
        retryCount: 0,
        provider: 'BSB Transactional Mail Dispatcher',
      },
    };

    // 6. Duplicate Detection Link
    const existingFeedback = this.getAllFeedback();
    const duplicate = this.detectDuplicate(existingFeedback, payload);
    if (duplicate) {
      newItem.duplicateOf = duplicate.referenceNumber;
      if (!duplicate.relatedFeedbackIds) duplicate.relatedFeedbackIds = [];
      duplicate.relatedFeedbackIds.push(newItem.referenceNumber);
    }

    // 7. CRITICAL: SAVE IN DATABASE FIRST
    existingFeedback.unshift(newItem);
    this.saveAllFeedback(existingFeedback);

    // Record submission time for rate limit
    try {
      localStorage.setItem(this.LAST_SUBMIT_KEY, Date.now().toString());
    } catch {
      // Ignore
    }

    // Save to user's local device history
    this.recordInUserHistory(newItem.referenceNumber);

    // 8. CRITICAL: EMAIL NOTIFICATION SECOND
    // Trigger notification to ayanghosh75@gmail.com
    EmailNotificationService.dispatchFeedbackNotification(newItem)
      .then((res) => {
        newItem.emailDelivery = res.deliveryRecord;
        // Update database with delivery result
        const currentList = this.getAllFeedback();
        const idx = currentList.findIndex((i) => i.id === newItem.id);
        if (idx !== -1) {
          currentList[idx].emailDelivery = res.deliveryRecord;
          this.saveAllFeedback(currentList);
        }
      })
      .catch((err) => {
        console.warn('[FeedbackService] Email notification background error:', err);
      });

    return { success: true, feedback: newItem };
  }

  /**
   * Records reference number into user's private device history
   */
  private static recordInUserHistory(referenceNumber: string): void {
    try {
      const raw = localStorage.getItem(this.USER_HISTORY_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(referenceNumber)) {
        list.unshift(referenceNumber);
        localStorage.setItem(this.USER_HISTORY_KEY, JSON.stringify(list.slice(0, 50)));
      }
    } catch {
      // Ignore
    }
  }

  /**
   * Retrieves user's own feedback items submitted on this device
   */
  public static getUserFeedbackHistory(): FeedbackItem[] {
    try {
      const raw = localStorage.getItem(this.USER_HISTORY_KEY);
      if (!raw) return [];
      const refNumbers: string[] = JSON.parse(raw);
      const all = this.getAllFeedback();
      return all.filter((item) => refNumbers.includes(item.referenceNumber));
    } catch {
      return [];
    }
  }

  /**
   * Filters feedback items for Admin dashboard
   */
  public static filterFeedback(
    options: FeedbackFilterOptions,
    items?: FeedbackItem[]
  ): FeedbackItem[] {
    const all = items || this.getAllFeedback();

    return all.filter((item) => {
      // Category filter
      if (options.category && options.category !== 'ALL' && item.category !== options.category) {
        return false;
      }

      // Status filter
      if (options.status && options.status !== 'ALL' && item.status !== options.status) {
        return false;
      }

      // Priority filter
      if (options.priority && options.priority !== 'ALL' && item.priority !== options.priority) {
        return false;
      }

      // Email status filter
      if (
        options.emailStatus &&
        options.emailStatus !== 'ALL' &&
        item.emailDelivery?.status !== options.emailStatus
      ) {
        return false;
      }

      // Module filter
      if (options.module && options.module !== 'ALL' && item.module !== options.module) {
        return false;
      }

      // Search term (searches reference, subject, description, name, email)
      if (options.searchTerm && options.searchTerm.trim().length > 0) {
        const query = options.searchTerm.toLowerCase().trim();
        const matchesRef = item.referenceNumber.toLowerCase().includes(query);
        const matchesSubject = item.subject.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesName = item.name ? item.name.toLowerCase().includes(query) : false;
        const matchesEmail = item.email ? item.email.toLowerCase().includes(query) : false;

        if (!matchesRef && !matchesSubject && !matchesDesc && !matchesName && !matchesEmail) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Updates feedback status, priority, resolution summary, and optional internal note
   */
  public static updateFeedbackStatus(
    id: string,
    newStatus: FeedbackStatus,
    newPriority?: FeedbackPriority,
    resolutionSummary?: string,
    userFacingResponse?: string,
    internalNote?: string
  ): FeedbackItem | undefined {
    const all = this.getAllFeedback();
    const index = all.findIndex((item) => item.id === id || item.referenceNumber === id);
    if (index === -1) return undefined;

    const item = all[index];
    item.status = newStatus;
    if (newPriority) {
      item.priority = newPriority;
    }
    item.updatedAt = new Date().toISOString();

    if (newStatus === 'RESOLVED' || newStatus === 'FIXED' || newStatus === 'CLOSED') {
      item.resolvedAt = new Date().toISOString();
    }

    if (resolutionSummary) {
      item.resolutionSummary = resolutionSummary;
    }

    if (userFacingResponse) {
      item.userFacingResponse = userFacingResponse;
    }

    if (internalNote && internalNote.trim().length > 0) {
      item.internalNotes.push({
        id: 'note-' + Date.now(),
        author: 'Rev. Ayan Kumar Ghosh',
        note: internalNote.trim(),
        timestamp: new Date().toISOString(),
      });
    }

    this.saveAllFeedback(all);
    return item;
  }

  /**
   * Updates priority
   */
  public static updateFeedbackPriority(
    id: string,
    priority: FeedbackPriority
  ): FeedbackItem | undefined {
    const all = this.getAllFeedback();
    const index = all.findIndex((item) => item.id === id || item.referenceNumber === id);
    if (index === -1) return undefined;

    all[index].priority = priority;
    all[index].updatedAt = new Date().toISOString();
    this.saveAllFeedback(all);
    return all[index];
  }

  /**
   * Adds an internal note to feedback item
   */
  public static addInternalNote(
    id: string,
    author: string,
    note: string
  ): FeedbackItem | undefined {
    const all = this.getAllFeedback();
    const index = all.findIndex((item) => item.id === id || item.referenceNumber === id);
    if (index === -1) return undefined;

    all[index].internalNotes.push({
      id: 'note-' + Date.now(),
      author,
      note,
      timestamp: new Date().toISOString(),
    });
    all[index].updatedAt = new Date().toISOString();
    this.saveAllFeedback(all);
    return all[index];
  }

  /**
   * Manually retries failed email notification for an item
   */
  public static async retryEmailNotification(id: string): Promise<boolean> {
    const all = this.getAllFeedback();
    const index = all.findIndex((item) => item.id === id || item.referenceNumber === id);
    if (index === -1) return false;

    const res = await EmailNotificationService.retryFailedNotification(all[index]);
    all[index].emailDelivery = res.deliveryRecord;
    this.saveAllFeedback(all);
    return res.success;
  }

  /**
   * Calculates comprehensive analytics & product research metrics
   */
  public static getAnalyticsSummary(items?: FeedbackItem[]): FeedbackAnalyticsSummary {
    const all = items || this.getAllFeedback();

    let newCount = 0;
    let underReviewCount = 0;
    let bibleCorrectionsCount = 0;
    let contentCorrectionsCount = 0;
    let technicalProblemsCount = 0;
    let featureRequestsCount = 0;
    let ministryNeedsCount = 0;
    let resolvedCount = 0;
    let emailsSentCount = 0;
    let emailsPendingCount = 0;
    let emailsFailedCount = 0;

    const problemsMap: Record<string, number> = {};
    const featuresMap: Record<string, number> = {};
    const ministryMap: Record<string, number> = {};

    for (const item of all) {
      if (item.status === 'NEW') newCount++;
      if (
        item.status === 'UNDER_REVIEW' ||
        item.status === 'THEOLOGICAL_REVIEW_REQUIRED' ||
        item.status === 'BIBLE_DATA_REVIEW_REQUIRED' ||
        item.status === 'SOURCE_REVIEW_REQUIRED'
      ) {
        underReviewCount++;
      }
      if (item.status === 'RESOLVED' || item.status === 'FIXED') resolvedCount++;

      // Categories
      if (item.category === 'BIBLE_TEXT_CONCERN' || item.category === 'BIBLE_REFERENCE_ERROR') {
        bibleCorrectionsCount++;
      } else if (item.category === 'CONTENT_CORRECTION' || item.category === 'THEOLOGICAL_CONCERN') {
        contentCorrectionsCount++;
      } else if (
        item.category === 'TECHNICAL_PROBLEM' ||
        item.category === 'MOBILE_PROBLEM' ||
        item.category === 'INSTALLATION_PROBLEM'
      ) {
        technicalProblemsCount++;
      } else if (item.category === 'FEATURE_REQUEST' || item.category === 'STUDY_TOPIC_REQUEST') {
        featureRequestsCount++;
      } else if (item.category === 'MINISTRY_NEED' || item.category === 'PASTOR_TOOL_REQUEST') {
        ministryNeedsCount++;
      }

      // Email delivery counts
      if (item.emailDelivery?.status === 'SENT') emailsSentCount++;
      else if (item.emailDelivery?.status === 'QUEUED' || item.emailDelivery?.status === 'RETRYING') {
        emailsPendingCount++;
      } else if (item.emailDelivery?.status === 'FAILED') {
        emailsFailedCount++;
      }

      // Problem aggregation
      if (
        item.category === 'TECHNICAL_PROBLEM' ||
        item.category === 'MOBILE_PROBLEM' ||
        item.category === 'INSTALLATION_PROBLEM'
      ) {
        const key = item.subcategory || item.subject.slice(0, 30);
        problemsMap[key] = (problemsMap[key] || 0) + 1;
      }

      // Feature requests aggregation
      if (item.category === 'FEATURE_REQUEST' || item.category === 'STUDY_TOPIC_REQUEST') {
        const key = item.subcategory || item.subject.slice(0, 30);
        featuresMap[key] = (featuresMap[key] || 0) + 1;
      }

      // Ministry needs aggregation
      if (item.category === 'MINISTRY_NEED' || item.ministryType) {
        const key = item.ministryType || item.subcategory || 'General Ministry';
        ministryMap[key] = (ministryMap[key] || 0) + 1;
      }
    }

    const topReportedProblems = Object.entries(problemsMap)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const whatUsersNeed = Object.entries(featuresMap)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const ministryResearchBreakdown = Object.entries(ministryMap)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return {
      totalCount: all.length,
      newCount,
      underReviewCount,
      bibleCorrectionsCount,
      contentCorrectionsCount,
      technicalProblemsCount,
      featureRequestsCount,
      ministryNeedsCount,
      resolvedCount,
      emailsSentCount,
      emailsPendingCount,
      emailsFailedCount,
      topReportedProblems,
      whatUsersNeed,
      ministryResearchBreakdown,
    };
  }

  /**
   * Retries email delivery for all failed or queued feedback items
   */
  public static async retryFailedEmails(): Promise<{ retried: number; succeeded: number }> {
    const all = this.getAllFeedback();
    let retried = 0;
    let succeeded = 0;

    for (let i = 0; i < all.length; i++) {
      const item = all[i];
      if (item.emailDelivery?.status === 'FAILED' || item.emailDelivery?.status === 'QUEUED') {
        retried++;
        try {
          const res = await EmailNotificationService.dispatchFeedbackNotification(item);
          item.emailDelivery = res.deliveryRecord;
          if (res.deliveryRecord.status === 'SENT') {
            succeeded++;
          }
        } catch {
          // Keep item updated
        }
      }
    }

    this.saveAllFeedback(all);
    return { retried, succeeded };
  }

  /**
   * Exports entire feedback dataset to JSON string
   */
  public static exportFeedbackJson(): string {
    return JSON.stringify(this.getAllFeedback(), null, 2);
  }

  /**
   * Exports feedback items to formatted CSV
   */
  public static exportFeedbackCsv(): string {
    const all = this.getAllFeedback();
    const headers = [
      'Reference Number',
      'Category',
      'Subcategory',
      'Subject',
      'Status',
      'Priority',
      'Name',
      'Email',
      'Created At',
      'Email Status',
      'Resolution',
    ];

    const escapeCsv = (str?: string) => {
      if (!str) return '""';
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = all.map((item) => [
      escapeCsv(item.referenceNumber),
      escapeCsv(item.category),
      escapeCsv(item.subcategory),
      escapeCsv(item.subject),
      escapeCsv(item.status),
      escapeCsv(item.priority),
      escapeCsv(item.name),
      escapeCsv(item.email),
      escapeCsv(item.createdAt),
      escapeCsv(item.emailDelivery?.status),
      escapeCsv(item.resolutionSummary),
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
}
