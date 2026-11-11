// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — Autonomous Site Steward and Operations Assistant”
// MASTER STEWARD, AUDIT, REPAIR & 12-HOUR REPORTING MODELS
// Owner & Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import { KnowledgeBase12HReportSection } from './deepKnowledgeBase';

export type SiteFeatureStatus = 'OPERATIONAL' | 'DEGRADED' | 'FAILED' | 'MAINTENANCE';

export type ApprovalRequirement = 'AUTONOMOUS' | 'REVIEW_REQUIRED' | 'ADMIN_ONLY';

export type RepairLevel =
  | 'LEVEL_1_SAFE_AUTO'            // Broken internal links, missing labels, button descriptions, layout overflows
  | 'LEVEL_2_CONTROLLED_AUTO'       // Component fixes, query optimization, search index, service worker (backup, canary, rollback)
  | 'LEVEL_3_HUMAN_APPROVAL_REQUIRED'; // Scripture wording, data deletion, translation changes, finances, security policies

export type ProblemSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type UserProblemCategory =
  | 'BIBLE_TEXT'
  | 'MISSING_CHAPTER'
  | 'INCORRECT_REF'
  | 'LOGIN'
  | 'NOTIFICATION'
  | 'ACCESSIBILITY'
  | 'MOBILE_DISPLAY'
  | 'AI_ANSWER'
  | 'OTHER';

export type PerspectiveRole =
  | 'first_time_visitor'
  | 'returning_visitor'
  | 'guest_user'
  | 'registered_user'
  | 'pastor'
  | 'administrator'
  | 'mobile_user'
  | 'desktop_user'
  | 'slow_internet_user'
  | 'keyboard_only_user'
  | 'screen_reader_user'
  | 'visually_impaired_user'
  | 'elderly_user';

export interface SiteFeatureRecord {
  featureId: string;
  featureNameBn: string;
  featureNameEn: string;
  urlOrLocation: string;
  purposeBn: string;
  expectedBehaviorBn: string;
  dependencies: string[];
  lastSuccessfulTest: string;
  currentStatus: SiteFeatureStatus;
  knownProblems: string[];
  repairHistory: Array<{
    date: string;
    action: string;
    level: 1 | 2 | 3;
    result: string;
  }>;
  ownerOrApprovalRequirement: ApprovalRequirement;
}

export interface RepairActionRecord {
  id: string;
  timestamp: string;
  featureId?: string;
  problemDescriptionBn: string;
  likelyCauseBn: string;
  level: RepairLevel;
  filesOrSettingsChanged: string[];
  testsPerformed: string[];
  result: 'SUCCESS' | 'ROLLED_BACK' | 'PENDING_APPROVAL' | 'FAILED';
  deploymentTime?: string;
  rollbackAvailable: boolean;
  deepConfidenceScore: number; // 0 - 100
  adminAttentionRequired: boolean;
  adminApprovalNotes?: string;
  approvedBy?: string;
}

export interface UserProblemReport {
  id: string; // e.g. BSB-PR-2026-00001
  category: UserProblemCategory;
  categoryLabelBn: string;
  description: string;
  pageUrl: string;
  deviceInfo: string; // PII-stripped
  timestamp: string;
  severity: ProblemSeverity;
  status: 'RECEIVED' | 'DIAGNOSING' | 'REPAIR_IN_PROGRESS' | 'RESOLVED' | 'AWAITING_ADMIN_APPROVAL';
  repairActionTaken?: string;
  resolvedAt?: string;
  contactPermission: boolean;
  userContact?: string;
}

export interface InspectionScheduleItem {
  id: string;
  titleBn: string;
  intervalHours: number; // e.g. 0.083 for 5m, 1 for 1h, 12, 24, 168 for 7d, 720 for 30d
  intervalDescriptionBn: string;
  lastRunTimestamp: string;
  nextRunTimestamp: string;
  lastStatus: 'PASS' | 'WARN' | 'FAIL';
  summaryBn: string;
}

export interface ScriptureIntegrityAuditResult {
  timestamp: string;
  totalBooksAudited: number; // strictly 66
  totalChaptersAudited: number; // strictly 1,189
  totalVersesAudited: number; // strictly 31,102
  missingChapters: string[];
  emptyVerses: string[];
  duplicateVerses: string[];
  brokenBengaliCharacters: string[];
  placeholderSymbols: string[];
  rawMarkdownErrors: string[];
  translationUnavailableErrors: string[];
  johnVisibilityVerified: boolean;
  matthewVisibilityVerified: boolean;
  searchIndexingVerified: boolean;
  crossReferencesVerified: boolean;
  zeroManufacturedScriptureGuaranteed: boolean;
  status: 'PASS' | 'CORRECTED' | 'ESCALATED';
}

export interface AccessibilityAuditResult {
  timestamp: string;
  wcagLevel: 'AA';
  checksPerformedCount: number;
  keyboardNavigationPassed: boolean;
  visibleFocusPassed: boolean;
  screenReaderLabelsPassed: boolean;
  headingHierarchyPassed: boolean;
  formLabelsPassed: boolean;
  buttonNamesPassed: boolean;
  linkDescriptionsPassed: boolean;
  imageAltTextPassed: boolean;
  colorContrastPassed: boolean;
  textResizingPassed: boolean;
  touchTargetSizePassed: boolean;
  reducedMotionRespected: boolean;
  skipToContentWorking: boolean;
  pageTitlesCorrect: boolean;
  dialogFocusTrapPassed: boolean;
  problemsFound: string[];
  problemsRepaired: string[];
  remainingBarriers: string[];
  manualReviewRequired: boolean;
}

export interface InspectionReport12H {
  reportId: string;
  reportingPeriodStart: string;
  reportingPeriodEnd: string;
  generatedAt: string;
  emailRecipient: string;
  emailDeliveryStatus: 'DELIVERED' | 'QUEUED' | 'RETRYING' | 'FAILED' | 'LOCAL_ARCHIVE_ONLY';

  // Section A: Executive Summary
  executiveSummary: {
    overallSiteStatus: 'EXCELLENT' | 'GOOD' | 'ATTENTION_REQUIRED' | 'CRITICAL';
    deepStatus: 'AUTONOMOUS_OPERATIONAL' | 'SAFE_MODE' | 'PAUSED';
    currentAutonomyMode: 'REVIEW_REQUIRED' | 'TRUSTED_AUTOPILOT' | 'APPROVED_CALENDAR_ONLY';
    adminAttentionRequired: boolean;
    headlineBn: string;
  };

  // Section B: Availability
  availability: {
    uptimePercentage: number;
    outageMinutes: number;
    slowPeriodCount: number;
    failedServices: string[];
    recoveryActionsTaken: string[];
  };

  // Section C: Bible-Data Review
  bibleDataReview: {
    booksChecked: number;
    chaptersChecked: number;
    chaptersPassing: number;
    chaptersFailing: number;
    missingOrIncorrectContent: string[];
    encodingProblems: string[];
    repairsCompleted: string[];
    itemsAwaitingApproval: string[];
    mark14Status: string;
    nextScheduledAudit: string;
    translationIntegrityStatus: string;
  };

  // Section D: User Experience
  userExperience: {
    brokenLinksFixed: number;
    failedButtonsResolved: number;
    searchLatencyMs: number;
    mobileDisplayIssues: string[];
    loginIssuesCount: number;
    notificationIssuesCount: number;
    tutorialIssuesCount: number;
  };

  // Section E: Accessibility
  accessibility: {
    checksPerformed: number;
    problemsFound: number;
    problemsRepaired: number;
    remainingBarriers: string[];
    manualReviewRequired: boolean;
  };

  // Section F: Deep's Work (Repairs Completed)
  deepsWork: Array<{
    problemBn: string;
    likelyCauseBn: string;
    whatDeepChangedBn: string;
    testPerformedBn: string;
    result: string;
    level: RepairLevel;
    rollbackAvailable: boolean;
  }>;

  // Section G: Security
  security: {
    securityStatus: 'SECURE' | 'SUSPICIOUS_ACTIVITY' | 'THREAT_CONTAINED';
    failedAdminLoginsBlocked: number;
    xssOrInjectionAttemptsDeflected: number;
    secretExposureRisk: 'ZERO' | 'LOW' | 'DETECTED';
    vulnerabilitiesFound: string[];
    patchesApplied: string[];
    urgentRecommendations: string[];
  };

  // Section H: Performance
  performance: {
    pageSpeedScore: number;
    apiAverageResponseMs: number;
    databaseQueryAverageMs: number;
    searchSpeedMs: number;
    errorsLoggedCount: number;
    improvementsMade: string[];
  };

  // Section I: Daily Word and Notifications
  dailyWordAndNotifications: {
    verseSelected: string;
    category: string;
    validationStatus: 'PASSED' | 'FAILED' | 'PENDING';
    scheduledCount: number;
    deliveredCount: number;
    failedCount: number;
    openedCount: number;
    retriedCount: number;
    unsubscribedCount: number;
  };

  // Section J: Outreach
  outreach: {
    facebookStatus: string;
    whatsappChannelStatus: string;
    approvedPostsCount: number;
    engagementSummaryBn: string;
    permissionRequestsPending: number;
    complaintsOrRestrictionsCount: number;
  };

  // Section K: Bengali Christian Knowledge Base
  knowledgeBase?: KnowledgeBase12HReportSection;

  // Section L: Self-Improvements
  selfImprovements: Array<{
    ruleOrTestChangedBn: string;
    reasonBn: string;
    beforeAndAfterResultBn: string;
    versionRef: string;
    rollbackReady: boolean;
  }>;

  // Section L: Next 12-Hour Plan & Action Required
  next12HourPlan: {
    plannedInspections: string[];
    safeRepairsScheduled: string[];
    contentPreparation: string[];
    itemsRequiringApproval: string[];
    actionRequiredStatementBn: string; // “আপনার করণীয়: কিছু নেই” or details
  };
}

export interface StewardEmergencyControls {
  automaticRepairsPaused: boolean;
  notificationsPaused: boolean;
  socialPublishingPaused: boolean;
  outreachPaused: boolean;
  safeModeActive: boolean;
  tutorialMusicDisabled: boolean;
  deepPaused: boolean;
  manualControlActive: boolean;
  lastRollbackTimestamp?: string;
  lastBackupRestoreTimestamp?: string;
}
