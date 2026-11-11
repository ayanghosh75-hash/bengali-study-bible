// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// AUTOPILOT HEALTH STANDARD & MONITORING TYPE DEFINITIONS
// Official Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// Scripture Safeguard: Zero AI Manufactured Scripture Guaranteed
// ============================================================

export type AutopilotHealthStatus =
  | 'GREEN'    // সব ব্যবস্থা স্বাভাবিক — All Systems Operational (All critical checks pass)
  | 'YELLOW'   // Degraded (Usable, but one or more non-critical features impaired)
  | 'ORANGE'   // Major problem (Major function unavailable, but Bible reading remains possible)
  | 'RED'      // Critical outage (Website, Bible text, database, auth or Scripture integrity affected)
  | 'UNKNOWN'; // Status Unknown (Monitor cannot verify or evidence is stale >30 min)

export type IncidentSeverity = 'P0_CRITICAL' | 'P1_MAJOR' | 'P2_DEGRADED' | 'P3_MINOR';

export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RECOVERING' | 'RESOLVED';

export type AutopilotCheckCategory =
  | 'AVAILABILITY'
  | 'BIBLE_INTEGRITY'
  | 'VISIBILITY'
  | 'ACCESSIBILITY'
  | 'CORE_FUNCTIONS'
  | 'SECURITY_PRIVACY';

export interface AutopilotCheckResult {
  id: string;
  name: string;
  nameBn: string;
  category: AutopilotCheckCategory;
  critical: boolean;
  passed: boolean;
  status: AutopilotHealthStatus;
  latencyMs?: number;
  lastChecked: string;
  evidence: string;
  error?: string | null;
  remedyAction?: string;
}

export interface DeviceViewportProfile {
  id: string;
  name: string;
  nameBn: string;
  width: number;
  height: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  passed: boolean;
  horizontalOverflow: boolean;
  textContrastRatio: number; // e.g. 4.8 >= 4.5:1
  scriptureVisible: boolean;
  zoom200Usable: boolean;
  bengaliUtf8Intact: boolean;
  checkedAt: string;
}

export interface AutopilotIncident {
  id: string; // e.g. INC-2026-AUTOPILOT-001
  titleBn: string;
  titleEn: string;
  severity: IncidentSeverity;
  category: AutopilotCheckCategory;
  status: IncidentStatus;
  affectedUrl: string;
  affectedFeature: string;
  affectedPlatforms: string[]; // e.g. ['Desktop', 'Android', 'iOS']
  openedAt: string;
  resolvedAt?: string;
  consecutiveFailures: number;
  rootCauseAnalysis: string;
  safeRecoveryState: 'IDLE' | 'ATTEMPT_1_REDEPLOY' | 'ATTEMPT_2_ROLLBACK' | 'SAFE_MODE_ENTERED';
  recoveryAttemptsCount: number;
  technicalEvidence: string;
  requiresAdminApproval: boolean;
}

export interface AutopilotSLAs {
  publicWebsiteAvailabilityMonthly: number; // Target: 99.9%
  installPageAvailabilityMonthly: number;    // Target: 99.9%
  criticalPageSuccessRate: number;           // Target: >= 99%
  expectedBibleChapterAvailability: number;  // Target: 100%
  knownMissingScriptureCount: number;        // Target: 0
  brokenCriticalLinksCount: number;          // Target: 0
  unresolvedA11yBlockersCount: number;       // Target: 0
  duplicateDailyWordNotifications: number;   // Target: 0
  confirmedDataExposuresCount: number;       // Target: 0
  successfulDailyBackupRate: number;         // Target: 100%
}

export interface AutopilotScheduleStatus {
  publicUrlCheck5m: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  homepageContent5m: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  installPage5m: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  coreApiDb5m: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  knownBibleChapter15m: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  coreUserJourney1h: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  all66Books24h: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  integrityAudit7d: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  accessibilityAudit7d: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  securityAudit24h: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  backup24h: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
  restoreTest30d: { lastRun: string; nextRun: string; status: AutopilotHealthStatus };
}

export interface Level3PendingApproval {
  id: string;
  timestamp: string;
  actionTitleBn: string;
  actionTitleEn: string;
  reason: string;
  proposedChanges: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  restrictedCategory:
    | 'BIBLE_WORDING'
    | 'NEW_TRANSLATION'
    | 'UNVERIFIED_SOURCE'
    | 'REMOVE_BIBLE_DATA'
    | 'THEOLOGICAL_POLICY'
    | 'DELETE_USER_DATA'
    | 'ADMIN_ACCESS'
    | 'IRREVERSIBLE_MIGRATION'
    | 'PURCHASE_SERVICES'
    | 'PUBLIC_URL_CHANGE'
    | 'CONTACT_OUTSIDE'
    | 'SECURITY_OVERRIDE';
}

export interface HealthAutopilotDashboardState {
  overallStatus: AutopilotHealthStatus;
  statusLabelBn: string;
  statusLabelEn: string;
  canonicalUrl: string;
  installUrl: string;
  uptimePercentage: number;
  lastCompleteCheckTime: string;
  nextScheduledCheckTime: string;
  isStale: boolean;
  bible66BookSummary: {
    totalBooks: number;
    totalChapters: number;
    passingChapters: number;
    failingChapters: number;
    totalVerses: number;
    masterChecksum: string;
    checksumsVerified: boolean;
  };
  accessibilitySummary: {
    scorePercentage: number;
    wcagLevel: 'AA' | 'A' | 'NON_COMPLIANT';
    focusIndicatorsPass: boolean;
    contrastPass: boolean;
    screenReaderNavPass: boolean;
    reducedMotionRespected: boolean;
    text200ZoomPass: boolean;
  };
  securitySummary: {
    noPublicCredentials: boolean;
    adminPasscodeGated: boolean;
    rateLimitingActive: boolean;
    privateJournalsIsolated: boolean;
    activeMonitoring: boolean;
    rollbackAvailable: boolean;
    lastKnownGoodBuild: {
      version: string;
      deployedAt: string;
      fileCount: number;
      sha256?: string;
    };
  };
  checks: AutopilotCheckResult[];
  viewports: DeviceViewportProfile[];
  openIncidents: AutopilotIncident[];
  recentRollbacks: Array<{
    timestamp: string;
    fromVersion: string;
    toVersion: string;
    reason: string;
    success: boolean;
  }>;
  pendingApprovals: Level3PendingApproval[];
  slas: AutopilotSLAs;
  emergencyControls: {
    automaticRepairsPaused: boolean;
    manualControlActive: boolean;
    safeModeActive: boolean;
  };
}
