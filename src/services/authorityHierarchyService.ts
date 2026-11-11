// ============================================================================
// BENGALI STUDY BIBLE — AUTHORITY & BOUNDARY ENFORCEMENT SERVICE
// Controlled Level-4 Parity with Lexi (Logos Lexicon)
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

import {
  AuthorityLevel,
  AUTHORITY_ROLES,
  SYSTEM_ACTION_RULES,
  AuthorityContext,
  PermissionCheckResult,
  AdminRbacRole,
  ADMIN_RBAC_PROFILES,
  ScopedServiceRole,
  ScopedServiceIdentity,
  SCOPED_SERVICE_IDENTITIES,
} from '../types/authorityHierarchy';

export const CURRENT_PROJECT_ID = 'bengali-study-bible';
export const SISTER_PROJECT_ID = 'logos-lexicon';

export class AuthorityViolationError extends Error {
  constructor(
    public readonly actionId: string,
    public readonly actor: string,
    public readonly reason: string,
    public readonly requiredLevel: AuthorityLevel
  ) {
    super(`[AUTHORITY_VIOLATION] Actor '${actor}' denied for action '${actionId}': ${reason}`);
    this.name = 'AuthorityViolationError';
  }
}

export class ProjectBoundaryViolationError extends Error {
  constructor(
    public readonly actor: string,
    public readonly targetProject: string,
    public readonly permittedProject: string
  ) {
    super(
      `[BOUNDARY_VIOLATION] Actor '${actor}' cannot access project '${targetProject}'. Actor is restricted strictly to '${permittedProject}'. Cross-project access is prohibited.`
    );
    this.name = 'ProjectBoundaryViolationError';
  }
}

/**
 * Service to strictly enforce permissions, prevent privilege escalation,
 * and enforce absolute boundary isolation between Deep (Bengali Study Bible)
 * and Lexi (Logos Lexicon).
 */
export class AuthorityHierarchyService {
  private static instance: AuthorityHierarchyService;

  private constructor() {}

  public static getInstance(): AuthorityHierarchyService {
    if (!AuthorityHierarchyService.instance) {
      AuthorityHierarchyService.instance = new AuthorityHierarchyService();
    }
    return AuthorityHierarchyService.instance;
  }

  /**
   * Verify if an actor is permitted to execute the given action on the target project.
   */
  public checkPermission(context: AuthorityContext): PermissionCheckResult {
    const { actor, actorLevel, targetProjectId, actionId } = context;

    // 1. Boundary enforcement
    if (actor === 'DEEP' && targetProjectId !== CURRENT_PROJECT_ID) {
      return {
        allowed: false,
        actor,
        actorLevel,
        actionId,
        targetProjectId,
        reason: `Deep is strictly confined to '${CURRENT_PROJECT_ID}'. Cannot execute actions on '${targetProjectId}'.`,
        requiresOwnerApproval: true,
        requiresHumanReviewer: false,
      };
    }

    if (actor === 'LEXI' && targetProjectId !== SISTER_PROJECT_ID) {
      return {
        allowed: false,
        actor,
        actorLevel,
        actionId,
        targetProjectId,
        reason: `Lexi is strictly confined to '${SISTER_PROJECT_ID}'. Cannot execute actions on '${targetProjectId}'.`,
        requiresOwnerApproval: true,
        requiresHumanReviewer: false,
      };
    }

    // 2. Privilege self-escalation protection
    if (actionId === 'EXPAND_AI_PERMISSIONS' && (actor === 'DEEP' || actor === 'LEXI')) {
      return {
        allowed: false,
        actor,
        actorLevel,
        actionId,
        targetProjectId,
        reason: 'AI Assistants cannot escalate their own authority. Only Level 5 Owner (Rev. Ayan Kumar Ghosh) may grant permissions.',
        requiresOwnerApproval: true,
        requiresHumanReviewer: false,
      };
    }

    // 3. Rule check against action matrix
    const rule = SYSTEM_ACTION_RULES[actionId];
    if (!rule) {
      return {
        allowed: false,
        actor,
        actorLevel,
        actionId,
        targetProjectId,
        reason: `Unrecognized action '${actionId}'. Unregistered actions are denied by default under zero-trust policy.`,
        requiresOwnerApproval: true,
        requiresHumanReviewer: true,
      };
    }

    // 4. Level requirement
    if (actorLevel < rule.minimumAuthorityRequired) {
      return {
        allowed: false,
        actor,
        actorLevel,
        actionId,
        targetProjectId,
        reason: `Insufficient authority. Action '${actionId}' requires Level ${rule.minimumAuthorityRequired}, but actor '${actor}' has Level ${actorLevel}.`,
        requiresOwnerApproval: rule.requiresOwnerApproval,
        requiresHumanReviewer: rule.requiresHumanReviewer,
      };
    }

    // 5. Explicit Level 5 Owner approvals for sensitive categories
    if (rule.requiresOwnerApproval && actorLevel < 5) {
      return {
        allowed: false,
        actor,
        actorLevel,
        actionId,
        targetProjectId,
        reason: `Action '${actionId}' (${rule.nameEn}) requires explicit Level 5 Owner approval by Rev. Ayan Kumar Ghosh.`,
        requiresOwnerApproval: true,
        requiresHumanReviewer: rule.requiresHumanReviewer,
      };
    }

    // Allowed
    return {
      allowed: true,
      actor,
      actorLevel,
      actionId,
      targetProjectId,
      reason: `Permitted: '${actor}' (Level ${actorLevel}) satisfies criteria for '${actionId}'.`,
      requiresOwnerApproval: false,
      requiresHumanReviewer: rule.requiresHumanReviewer,
    };
  }

  /**
   * Asserts permission. Throws AuthorityViolationError or ProjectBoundaryViolationError if denied.
   */
  public assertPermission(context: AuthorityContext): void {
    const result = this.checkPermission(context);
    if (!result.allowed) {
      if (
        (context.actor === 'DEEP' && context.targetProjectId !== CURRENT_PROJECT_ID) ||
        (context.actor === 'LEXI' && context.targetProjectId !== SISTER_PROJECT_ID)
      ) {
        throw new ProjectBoundaryViolationError(
          context.actor,
          context.targetProjectId,
          context.actor === 'DEEP' ? CURRENT_PROJECT_ID : SISTER_PROJECT_ID
        );
      }
      const rule = SYSTEM_ACTION_RULES[context.actionId];
      throw new AuthorityViolationError(
        context.actionId,
        context.actor,
        result.reason,
        rule ? rule.minimumAuthorityRequired : 5
      );
    }
  }

  /**
   * Get the identity of the Level 5 Owner.
   */
  public getOwnerInfo() {
    return AUTHORITY_ROLES.LEVEL_5_OWNER;
  }

  /**
   * Check if an action is in the 13 authorized routine repairs for Level 4.
   */
  public isAuthorizedRoutineRepair(actionId: string): boolean {
    const rule = SYSTEM_ACTION_RULES[actionId];
    return !!rule && rule.minimumAuthorityRequired <= 4 && !rule.requiresOwnerApproval;
  }

  /**
   * Check if a specific RBAC role has permission to execute an action.
   */
  public checkRbacPermission(role: AdminRbacRole, actionId: string): { allowed: boolean; reason: string } {
    const profile = ADMIN_RBAC_PROFILES[role];
    if (!profile) {
      return { allowed: false, reason: `Unknown RBAC role: ${role}` };
    }

    const rule = SYSTEM_ACTION_RULES[actionId];
    if (!rule) {
      return { allowed: false, reason: `Unknown system action: ${actionId}` };
    }

    // Level 5 Owner exclusive actions can never be executed by non-owner roles
    if (rule.minimumAuthorityRequired === 5) {
      return {
        allowed: false,
        reason: `Action '${actionId}' requires Level 5 Sovereign Owner approval (Rev. Ayan Kumar Ghosh). Role '${role}' lacks authority.`,
      };
    }

    if (!profile.permittedCategories.includes(rule.category)) {
      return {
        allowed: false,
        reason: `Role '${profile.nameEn}' is restricted from category '${rule.category}'. Permitted: ${profile.permittedCategories.join(', ')}`,
      };
    }

    return { allowed: true, reason: `Action '${actionId}' is permitted under role '${profile.nameEn}'.` };
  }

  /**
   * Get metadata profile for an RBAC role.
   */
  public getRbacProfile(role: AdminRbacRole) {
    return ADMIN_RBAC_PROFILES[role];
  }

  /**
   * Validate if a scoped service identity has permission to perform an action.
   * Enforces least-privilege domain isolation.
   */
  public validateScopedServiceRole(
    role: ScopedServiceRole,
    actionId: string,
    domain?: string
  ): { allowed: boolean; reason: string } {
    const serviceIdentity = SCOPED_SERVICE_IDENTITIES[role];
    if (!serviceIdentity) {
      return { allowed: false, reason: `Unrecognized scoped service identity: ${role}` };
    }

    // Domain check
    if (domain && serviceIdentity.isolatedDomain !== domain) {
      return {
        allowed: false,
        reason: `Scoped service '${role}' is isolated to domain '${serviceIdentity.isolatedDomain}', but accessed domain '${domain}'.`,
      };
    }

    // Permitted actions list check
    if (!serviceIdentity.permittedActions.includes(actionId)) {
      return {
        allowed: false,
        reason: `Action '${actionId}' is not in the allowlist for scoped service '${serviceIdentity.nameEn}'. Permitted: [${serviceIdentity.permittedActions.join(', ')}]`,
      };
    }

    return {
      allowed: true,
      reason: `Action '${actionId}' permitted for scoped service '${serviceIdentity.nameEn}' in domain '${serviceIdentity.isolatedDomain}'.`,
    };
  }

  /**
   * Assert scoped service permission; throws AuthorityViolationError if not allowed.
   */
  public assertScopedServicePermission(role: ScopedServiceRole, actionId: string, domain?: string): void {
    const result = this.validateScopedServiceRole(role, actionId, domain);
    if (!result.allowed) {
      throw new AuthorityViolationError(
        actionId,
        role,
        result.reason,
        SCOPED_SERVICE_IDENTITIES[role]?.maxAuthorityLevel ?? 2
      );
    }
  }

  /**
   * Retrieve all 7 scoped service identities.
   */
  public getScopedServiceIdentities(): Record<ScopedServiceRole, ScopedServiceIdentity> {
    return SCOPED_SERVICE_IDENTITIES;
  }

  /**
   * Retrieve single scoped service identity metadata.
   */
  public getScopedServiceIdentity(role: ScopedServiceRole): ScopedServiceIdentity | undefined {
    return SCOPED_SERVICE_IDENTITIES[role];
  }
}

export const authorityService = AuthorityHierarchyService.getInstance();
