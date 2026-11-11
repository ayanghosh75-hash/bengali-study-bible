// ============================================================================
// BENGALI STUDY BIBLE — DEEP EMERGENCY RECOVERY CONSOLE & AUTOPILOT TYPES
// Controlled Level-4 Standard & Level 5 Owner Authority
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

import { AuthorityLevel } from './authorityHierarchy';

export type AutopilotMode =
  | 'OBSERVE'                 // Monitors and reports; zero mutations
  | 'ASSISTED'                // Diagnoses and prepares repair plans for human approval
  | 'SAFE_AUTOPILOT'          // Default: Automatically executes pre-approved reversible repairs
  | 'EMERGENCY_CONTAINMENT';  // Isolates component, triggers LKG rollback, or sets maintenance mode

export type FailureSeverity =
  | 'SEVERITY_1_MINOR'        // Broken link, non-critical image, minor UI formatting defect
  | 'SEVERITY_2_DEGRADED'     // Search down, some chapters slow/inaccessible, install failing
  | 'SEVERITY_3_MAJOR_OUTAGE' // Public site down, admin portal down, DB failure, bad release
  | 'SEVERITY_4_CRITICAL';    // Data breach risk, destructive activity, corrupted Bible dataset

export type AffectedService =
  | 'PUBLIC_STUDY_BIBLE'
  | 'INSTALL_ROUTE'
  | 'ADMIN_PORTAL'
  | 'SEARCH_ENGINE'
  | 'DATABASE_STORAGE'
  | 'SERVICE_WORKER_CACHE'
  | 'AUDIO_SUBSYSTEM'
  | 'FONT_TYPOGRAPHY'
  | 'CANON_DATASET'
  | 'DNS_AND_ROUTING';

export type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerStatus {
  state: CircuitBreakerState;
  consecutiveFailures: number;
  maxFailuresAllowed: number;       // Max 2 before tripping
  lastFailureTime: string | null;
  lastActionAttempted: string | null;
  tripReason: string | null;
  cooldownWindowMs: number;         // e.g. 15 minutes
  emergencyStopEngaged: boolean;
}

export interface EmergencyIncident {
  incidentId: string;
  timestamp: string;
  severity: FailureSeverity;
  affectedService: AffectedService;
  summary: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RECOVERING' | 'RESOLVED' | 'ESCALATED';
  diagnosticData: Record<string, unknown>;
  selectedRunbook: string;
  recoveryPointRef: string | null;
  recoveryActionsTaken: Array<{
    action: string;
    timestamp: string;
    success: boolean;
    rollbackReference: string | null;
    error?: string;
  }>;
  resolvedAt?: string;
  ownerNotified: boolean;
  ownerNotificationDetails?: {
    recipient: string;
    dispatchedAt: string;
    channel: string;
  };
}

export interface EmergencyCommandInput {
  description: string;
  affectedService: AffectedService;
  screenshotDataUri?: string;
  diagnosticOnly: boolean;
  actionRequested?:
    | 'DIAGNOSE_ONLY'
    | 'START_APPROVED_RECOVERY'
    | 'ROLLBACK_TO_LKG'
    | 'PAUSE_AUTOPILOT'
    | 'RESUME_AUTOPILOT'
    | 'ACTIVATE_MAINTENANCE_MODE'
    | 'DEACTIVATE_MAINTENANCE_MODE'
    | 'EMERGENCY_STOP';
}

export interface BreakGlassCredentials {
  passcode: string;
  secondarySecurityPin: string;
  offlineRecoveryCode?: string;
}

export interface RecoveryConsoleSession {
  sessionId: string;
  authenticatedAt: string;
  actor: string;
  actorLevel: AuthorityLevel;
  method: 'PRIMARY_OWNER' | 'BREAK_GLASS_RECOVERY_CODE';
  expiresAt: string;
  reauthenticatedForRecovery: boolean;
}

export interface RateLimitState {
  failedAttempts: number;
  lockedUntil: number | null;
  lastAttemptTime: number;
}
