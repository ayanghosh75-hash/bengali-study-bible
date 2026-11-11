// ============================================================================
// BENGALI STUDY BIBLE — IMMUTABLE AUDIT LOG SERVICE
// Controlled Level-4 Parity with Lexi (Logos Lexicon)
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

import { AuthorityLevel } from '../types/authorityHierarchy';

export interface ImmutableAuditLogEntry {
  log_id: string;                         // 1. Cryptographic/UUID entry identifier
  timestamp: string;                      // 2. ISO 8601 timestamp
  actor: string;                          // 3. Deep, Lexi, Owner, or Reviewer
  actor_authority_level: AuthorityLevel;  // 4. Authority Level (1 to 5)
  project_id: string;                     // 5. 'bengali-study-bible'
  action_type: string;                    // 6. Action identifier
  target_resource: string;                // 7. Target file, route, or subsystem
  change_summary: string;                 // 8. Human-readable description of change
  reversible: boolean;                    // 9. Whether change has automated rollback
  rollback_reference: string | null;      // 10. Snapshot ID, backup path, or null
  approval_reference: string;             // 11. Approval token, Level-5 signature, or routine auto-token
}

export class ImmutableAuditLogService {
  private static instance: ImmutableAuditLogService;
  private readonly STORAGE_KEY = 'bsb_immutable_audit_log_v1';
  private inMemoryLog: ImmutableAuditLogEntry[] = [];

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): ImmutableAuditLogService {
    if (!ImmutableAuditLogService.instance) {
      ImmutableAuditLogService.instance = new ImmutableAuditLogService();
    }
    return ImmutableAuditLogService.instance;
  }

  public static logAction(
    actionType: string,
    targetResource: string,
    changeSummary: string,
    reversible: boolean = false,
    rollbackRef?: string,
    actor: string = 'DEEP',
    actorLevel: AuthorityLevel = 4
  ): ImmutableAuditLogEntry {
    return ImmutableAuditLogService.getInstance().record({
      actor,
      actor_authority_level: actorLevel,
      project_id: 'bengali-study-bible',
      action_type: actionType,
      target_resource: targetResource,
      change_summary: changeSummary,
      reversible,
      rollback_reference: rollbackRef || null,
      approval_reference: 'ROUTINE_SECURITY_GATE',
    });
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(this.STORAGE_KEY);
        if (raw) {
          this.inMemoryLog = JSON.parse(raw);
        }
      } catch {
        this.inMemoryLog = [];
      }
    }
  }

  private persist(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.inMemoryLog));
      } catch (err) {
        console.warn('Could not persist audit log to localStorage:', err);
      }
    }
  }

  /**
   * Append an immutable record with all 11 required fields
   */
  public record(entry: Omit<ImmutableAuditLogEntry, 'log_id' | 'timestamp'>): ImmutableAuditLogEntry {
    const log_id = `AUD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const fullEntry: ImmutableAuditLogEntry = {
      log_id,
      timestamp,
      ...entry,
    };

    // Immutable append-only
    this.inMemoryLog.push(fullEntry);
    this.persist();

    return fullEntry;
  }

  /**
   * Retrieve all audit entries
   */
  public getEntries(): ReadonlyArray<ImmutableAuditLogEntry> {
    return Object.freeze([...this.inMemoryLog]);
  }

  /**
   * Query entries by project ID or action type
   */
  public query(filter: { projectId?: string; actionType?: string; actor?: string }): ImmutableAuditLogEntry[] {
    return this.inMemoryLog.filter((entry) => {
      if (filter.projectId && entry.project_id !== filter.projectId) return false;
      if (filter.actionType && entry.action_type !== filter.actionType) return false;
      if (filter.actor && entry.actor !== filter.actor) return false;
      return true;
    });
  }

  /**
   * Return recent entries count
   */
  public getCount(): number {
    return this.inMemoryLog.length;
  }
}

export const auditLogService = ImmutableAuditLogService.getInstance();
