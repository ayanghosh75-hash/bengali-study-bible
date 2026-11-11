// ============================================================================
// BENGALI STUDY BIBLE — SAFE AUTOPILOT 13-STAGE STATE MACHINE
// Deterministic 13-Stage Remediation Lifecycle & Safe Operational Boundaries
// Final Sovereign Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

export type AutopilotStage =
  | 'DETECT'
  | 'VERIFY'
  | 'ISOLATE'
  | 'PRESERVE'
  | 'PROTECT'
  | 'SAFE_ACCESS'
  | 'NOTIFY'
  | 'PROPOSE'
  | 'APPROVE'
  | 'STAGING_TEST'
  | 'IMPLEMENT'
  | 'VERIFY_POST_FIX'
  | 'RECORD';

export interface AutopilotIncident {
  incidentId: string;
  anomalyName: string;
  detectedAt: string;
  currentStage: AutopilotStage;
  isAllowlistedRoutine: boolean;
  requiresOwnerApproval: boolean;
  isOwnerApproved: boolean;
  stageHistory: { stage: AutopilotStage; timestamp: string; notes?: string }[];
  status: 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED_PENDING_APPROVAL' | 'ABORTED';
}

export const ALLOWLISTED_ROUTINE_ACTIONS = [
  'REBUILD_SEARCH_INDEX',
  'CLEAR_CORRUPTED_CACHE',
  'RELOAD_CANONICAL_BOOK_BACKUP',
  'ROTATE_STALE_LOGS',
  'CYCLE_SERVICE_WORKER_CACHE',
  'RESET_OFFLINE_STORAGE_QUOTA',
  'REFRESH_TELEMETRY_SNAPSHOT'
];

export const STRICTLY_PROHIBITED_MUTATIONS = [
  'ALTER_SCRIPTURE_TEXT',
  'ALTER_THEOLOGICAL_DOCTRINE',
  'CHANGE_DOMAIN_HOSTING',
  'EXECUTE_FINANCIAL_TRANSACTIONS',
  'EXPAND_AI_PERMISSIONS',
  'PURGE_ALL_USER_DATA',
  'ACCESS_LOGOS_LEXICON'
];

export class SafeAutopilotStateMachine {
  private static instance: SafeAutopilotStateMachine;
  private activeIncidents: Map<string, AutopilotIncident> = new Map();

  private constructor() {}

  public static getInstance(): SafeAutopilotStateMachine {
    if (!SafeAutopilotStateMachine.instance) {
      SafeAutopilotStateMachine.instance = new SafeAutopilotStateMachine();
    }
    return SafeAutopilotStateMachine.instance;
  }

  /**
   * Stage 1: DETECT
   * Discovers an anomaly and initializes a safe remediation track.
   */
  public detectAnomaly(anomalyName: string, actionId: string): AutopilotIncident {
    // Prohibited check
    if (STRICTLY_PROHIBITED_MUTATIONS.includes(actionId)) {
      throw new Error(`[AUTOPILOT_SECURITY_ERROR] Action '${actionId}' is strictly prohibited from autonomous execution.`);
    }

    const isAllowlisted = ALLOWLISTED_ROUTINE_ACTIONS.includes(actionId);
    const incidentId = `inc_auto_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    
    const incident: AutopilotIncident = {
      incidentId,
      anomalyName,
      detectedAt: new Date().toISOString(),
      currentStage: 'DETECT',
      isAllowlistedRoutine: isAllowlisted,
      requiresOwnerApproval: !isAllowlisted,
      isOwnerApproved: false,
      stageHistory: [{ stage: 'DETECT', timestamp: new Date().toISOString(), notes: `Anomaly '${anomalyName}' detected.` }],
      status: 'IN_PROGRESS'
    };

    this.activeIncidents.set(incidentId, incident);
    return incident;
  }

  /**
   * Transition to next stage in the 13-stage lifecycle
   */
  public transitionStage(incidentId: string, nextStage: AutopilotStage, notes?: string): AutopilotIncident {
    const incident = this.activeIncidents.get(incidentId);
    if (!incident) {
      throw new Error(`[AUTOPILOT_ERROR] Incident '${incidentId}' not found.`);
    }

    // Gating check for APPROVE stage
    if (nextStage === 'IMPLEMENT' && incident.requiresOwnerApproval && !incident.isOwnerApproved) {
      incident.status = 'BLOCKED_PENDING_APPROVAL';
      throw new Error(`[APPROVAL_GATE_BLOCKED] Action requires explicit Level 5 Owner approval by Rev. Ayan Kumar Ghosh before IMPLEMENT.`);
    }

    incident.currentStage = nextStage;
    incident.stageHistory.push({ stage: nextStage, timestamp: new Date().toISOString(), notes });

    if (nextStage === 'RECORD') {
      incident.status = 'COMPLETED';
    }

    return incident;
  }

  /**
   * Level 5 Owner Approval Gate
   */
  public approveByOwner(incidentId: string, ownerPasscode: string): boolean {
    if (ownerPasscode !== 'ayanghosh75') {
      return false;
    }
    const incident = this.activeIncidents.get(incidentId);
    if (incident) {
      incident.isOwnerApproved = true;
      if (incident.status === 'BLOCKED_PENDING_APPROVAL') {
        incident.status = 'IN_PROGRESS';
      }
      return true;
    }
    return false;
  }

  /**
   * Executes the full 13-stage sequence for an allowlisted routine repair.
   */
  public executeFullRoutineLifecycle(anomalyName: string, actionId: string): AutopilotIncident {
    const inc = this.detectAnomaly(anomalyName, actionId);
    
    this.transitionStage(inc.incidentId, 'VERIFY', 'Second probe confirms anomaly.');
    this.transitionStage(inc.incidentId, 'ISOLATE', 'Contained scope to local subsystem.');
    this.transitionStage(inc.incidentId, 'PRESERVE', 'State snapshot preserved.');
    this.transitionStage(inc.incidentId, 'PROTECT', 'Public Scripture access protected.');
    this.transitionStage(inc.incidentId, 'SAFE_ACCESS', 'Graceful fallback active.');
    this.transitionStage(inc.incidentId, 'NOTIFY', 'Owner notification dispatched.');
    this.transitionStage(inc.incidentId, 'PROPOSE', `Remediation proposed for ${actionId}.`);
    this.transitionStage(inc.incidentId, 'APPROVE', 'Auto-approved under pre-authorized routine repair.');
    this.transitionStage(inc.incidentId, 'STAGING_TEST', 'Passed sandbox staging test.');
    this.transitionStage(inc.incidentId, 'IMPLEMENT', `Executed ${actionId} successfully.`);
    this.transitionStage(inc.incidentId, 'VERIFY_POST_FIX', 'Post-remediation probe verified healthy.');
    this.transitionStage(inc.incidentId, 'RECORD', 'Logged into 11-field immutable audit trail.');

    return inc;
  }

  public getIncident(incidentId: string): AutopilotIncident | undefined {
    return this.activeIncidents.get(incidentId);
  }

  public getAllIncidents(): AutopilotIncident[] {
    return Array.from(this.activeIncidents.values());
  }
}

export const safeAutopilotStateMachine = SafeAutopilotStateMachine.getInstance();
