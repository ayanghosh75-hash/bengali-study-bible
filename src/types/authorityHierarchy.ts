// ============================================================================
// BENGALI STUDY BIBLE — AUTHORITY HIERARCHY & PERMISSION MATRIX TYPES
// Controlled Level-4 Parity with Lexi (Logos Lexicon)
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

export type AuthorityLevel = 1 | 2 | 3 | 4 | 5;

export const AUTHORITY_ROLES = {
  LEVEL_5_OWNER: {
    level: 5 as AuthorityLevel,
    name: 'Owner (পরম মানবিক ও ধর্মতাত্ত্বিক কর্তৃপক্ষ)',
    identity: 'Rev. Ayan Kumar Ghosh',
    email: 'ayanghosh75@gmail.com',
    description: 'Final sovereign authority over Bible text, theological doctrine, finances, domains, copyright, legal, and AI authority expansion.',
    immutable: true,
  },
  LEVEL_4_CONTROLLED_STEWARD: {
    level: 4 as AuthorityLevel,
    name: 'Controlled Level 4 AI Steward (দীপ / Lexi)',
    deepIdentity: 'Deep — দীপ (Bengali Study Bible)',
    lexiIdentity: 'Lexi (Logos Lexicon)',
    description: 'Autonomous routine technical operations strictly bounded to assigned project. Zero AI scripture memory. Zero cross-project control.',
    immutable: false,
  },
  LEVEL_3_EXTERNAL_MONITORING: {
    level: 3 as AuthorityLevel,
    name: 'External Monitoring & Approved Recovery Services',
    roles: ['Watchdog Daemon', 'Disaster Recovery Runner', 'Automated Health Inspector'],
    description: 'Independent external watchdog and approved recovery services with narrowly scoped preapproved recovery authority.',
    immutable: false,
  },
  LEVEL_3_HUMAN_REVIEWER: {
    level: 3 as AuthorityLevel,
    name: 'Qualified Human Reviewers & Admins',
    roles: ['Language Reviewer', 'Theological Reviewer', 'Copyright Legal Reviewer', 'Technical Lead'],
    description: 'Reviews and approves language, theology, copyright, and technical modifications.',
    immutable: false,
  },
  LEVEL_2_CONTENT_EDITOR: {
    level: 2 as AuthorityLevel,
    name: 'Authorised Content Editors & Reviewers',
    roles: ['Biblical Content Editor', 'Study Notes Reviewer'],
    description: 'Authorised human editors for study notes, cross-references, and translations. Zero ability to manufacture Scripture.',
    immutable: false,
  },
  LEVEL_2_AUTOMATED_SERVICE: {
    level: 2 as AuthorityLevel,
    name: 'Automated Services & Daemons',
    roles: ['15-Minute Monitor', '6-Hour Route Auditor', '24-Hour Integrity Scanner', '7-Day Regression Runner', 'Backup Scheduler'],
    description: 'Scheduled background daemons operating strictly within predefined parameters.',
    immutable: false,
  },
  LEVEL_1_PUBLIC_USER: {
    level: 1 as AuthorityLevel,
    name: 'Public Users',
    roles: ['Bible Reader', 'Scripture Inquirer'],
    description: 'Public interactive reading, study tools, search, and Ask Bible inquiries. Read-only access to Scripture.',
    immutable: false,
  },
  LEVEL_1_DRAFTING_TOOL: {
    level: 1 as AuthorityLevel,
    name: 'AI Drafting Tools',
    roles: ['AI Draft Generator', 'Suggestion Engine'],
    description: 'Generates preliminary draft suggestions. Zero publishing or approval authority.',
    immutable: false,
  },
} as const;

// ----------------------------------------------------------------------------
// 7 SCOPED LEAST-PRIVILEGE SERVICE IDENTITIES
// ----------------------------------------------------------------------------
export type ScopedServiceRole =
  | 'SERVICE_ROLE_BIBLE_CONTENT'
  | 'SERVICE_ROLE_APP_MONITORING'
  | 'SERVICE_ROLE_DEPLOYMENT'
  | 'SERVICE_ROLE_BACKUP'
  | 'SERVICE_ROLE_NOTIFICATIONS'
  | 'SERVICE_ROLE_ANALYTICS'
  | 'SERVICE_ROLE_AI_RETRIEVAL';

export interface ScopedServiceIdentity {
  role: ScopedServiceRole;
  nameBn: string;
  nameEn: string;
  maxAuthorityLevel: AuthorityLevel;
  permittedActions: string[];
  isolatedDomain: string;
}

export const SCOPED_SERVICE_IDENTITIES: Record<ScopedServiceRole, ScopedServiceIdentity> = {
  SERVICE_ROLE_BIBLE_CONTENT: {
    role: 'SERVICE_ROLE_BIBLE_CONTENT',
    nameBn: 'শাস্ত্রীয় বিষয়বস্তু পরিচয়',
    nameEn: 'Bible Content Service Identity',
    maxAuthorityLevel: 2,
    permittedActions: ['RESTORE_BIBLE_FROM_BACKUP', 'AUDIT_BIBLE_INTEGRITY'],
    isolatedDomain: 'canonical-scripture-store',
  },
  SERVICE_ROLE_APP_MONITORING: {
    role: 'SERVICE_ROLE_APP_MONITORING',
    nameBn: 'অ্যাপ্লিকেশন মনিটরিং পরিচয়',
    nameEn: 'App Monitoring Service Identity',
    maxAuthorityLevel: 3,
    permittedActions: ['EXECUTE_SCHEDULED_AUDIT', 'DISPATCH_INCIDENT_ALERT'],
    isolatedDomain: 'watchdog-monitoring',
  },
  SERVICE_ROLE_DEPLOYMENT: {
    role: 'SERVICE_ROLE_DEPLOYMENT',
    nameBn: 'ডেপ্লয়মেন্ট সার্ভিস পরিচয়',
    nameEn: 'Deployment Service Identity',
    maxAuthorityLevel: 4,
    permittedActions: ['REDEPLOY_VERIFIED_BUILD', 'ROLLBACK_TO_LKG'],
    isolatedDomain: 'deployment-distribution',
  },
  SERVICE_ROLE_BACKUP: {
    role: 'SERVICE_ROLE_BACKUP',
    nameBn: 'ব্যাকআপ ও পুনরুদ্ধার পরিচয়',
    nameEn: 'Backup & Recovery Service Identity',
    maxAuthorityLevel: 4,
    permittedActions: ['CREATE_IMMUTABLE_SNAPSHOT', 'RESTORE_ASSET_FROM_BACKUP'],
    isolatedDomain: 'backup-recovery-catalog',
  },
  SERVICE_ROLE_NOTIFICATIONS: {
    role: 'SERVICE_ROLE_NOTIFICATIONS',
    nameBn: 'বিজ্ঞপ্তি সার্ভিস পরিচয়',
    nameEn: 'Notification Service Identity',
    maxAuthorityLevel: 2,
    permittedActions: ['DISPATCH_VERIFIED_NOTIFICATION'],
    isolatedDomain: 'user-notifications',
  },
  SERVICE_ROLE_ANALYTICS: {
    role: 'SERVICE_ROLE_ANALYTICS',
    nameBn: 'অ্যানালিটিক্স সার্ভিস পরিচয়',
    nameEn: 'Analytics Service Identity',
    maxAuthorityLevel: 2,
    permittedActions: ['AGGREGATE_ANONYMOUS_METRICS'],
    isolatedDomain: 'privacy-analytics',
  },
  SERVICE_ROLE_AI_RETRIEVAL: {
    role: 'SERVICE_ROLE_AI_RETRIEVAL',
    nameBn: 'এআই রিট্রিভাল সার্ভিস পরিচয়',
    nameEn: 'AI Retrieval Service Identity',
    maxAuthorityLevel: 1,
    permittedActions: ['RETRIEVE_CANONICAL_PASSAGE', 'FORMAT_THEOLOGICAL_RESPONSE'],
    isolatedDomain: 'ask-bible-retrieval',
  },
};

export type SystemActionCategory =
  | 'SCRIPTURE_TEXT'
  | 'THEOLOGICAL_CONTENT'
  | 'FINANCE_DONATION'
  | 'DOMAIN_INFRASTRUCTURE'
  | 'USER_DATA'
  | 'SECURITY_PERMISSION'
  | 'TECHNICAL_REPAIR'
  | 'MONITORING_AUDIT'
  | 'DRAFTING';

export interface ActionPermissionRule {
  actionId: string;
  nameBn: string;
  nameEn: string;
  category: SystemActionCategory;
  minimumAuthorityRequired: AuthorityLevel;
  requiresOwnerApproval: boolean;
  requiresHumanReviewer: boolean;
  reversible: boolean;
  description: string;
}

export const SYSTEM_ACTION_RULES: Record<string, ActionPermissionRule> = {
  // Level 5 Owner Exclusive Actions
  MODIFY_BIBLE_TEXT: {
    actionId: 'MODIFY_BIBLE_TEXT',
    nameBn: 'বাইবেল শাস্ত্রের শব্দ পরিবর্তন',
    nameEn: 'Modify Bible Scripture Text',
    category: 'SCRIPTURE_TEXT',
    minimumAuthorityRequired: 5,
    requiresOwnerApproval: true,
    requiresHumanReviewer: true,
    reversible: false,
    description: 'Altering any word, verse, translation, or canonical text of the 66 Bible books.',
  },
  APPROVE_THEOLOGY: {
    actionId: 'APPROVE_THEOLOGY',
    nameBn: 'ধর্মতাত্ত্বিক ব্যাখ্যা অনুমোদন',
    nameEn: 'Approve Theological Commentary',
    category: 'THEOLOGICAL_CONTENT',
    minimumAuthorityRequired: 5,
    requiresOwnerApproval: true,
    requiresHumanReviewer: true,
    reversible: false,
    description: 'Approving official doctrinal commentary or study notes.',
  },
  CHANGE_DOMAIN_HOSTING: {
    actionId: 'CHANGE_DOMAIN_HOSTING',
    nameBn: 'ডোমেন বা হোস্টিং স্থানান্তর',
    nameEn: 'Change Domain or Migrate Hosting',
    category: 'DOMAIN_INFRASTRUCTURE',
    minimumAuthorityRequired: 5,
    requiresOwnerApproval: true,
    requiresHumanReviewer: false,
    reversible: false,
    description: 'Modifying DNS, Surge project, custom domains, or server architecture.',
  },
  FINANCIAL_TRANSACTIONS: {
    actionId: 'FINANCIAL_TRANSACTIONS',
    nameBn: 'আর্থিক লেনদেন ও মূল্য নির্ধারণ',
    nameEn: 'Financial Operations & Donations',
    category: 'FINANCE_DONATION',
    minimumAuthorityRequired: 5,
    requiresOwnerApproval: true,
    requiresHumanReviewer: false,
    reversible: false,
    description: 'Processing payments, modifying pricing, or handling ministry donations.',
  },
  EXPAND_AI_PERMISSIONS: {
    actionId: 'EXPAND_AI_PERMISSIONS',
    nameBn: 'এআই ক্ষমতা ও অনুমতি বৃদ্ধি',
    nameEn: 'Expand AI Authority / Self-Escalation',
    category: 'SECURITY_PERMISSION',
    minimumAuthorityRequired: 5,
    requiresOwnerApproval: true,
    requiresHumanReviewer: false,
    reversible: false,
    description: 'Granting higher permissions or modifying AI operational boundaries.',
  },
  DELETE_USER_DATA: {
    actionId: 'DELETE_USER_DATA',
    nameBn: 'ব্যবহারকারীর তথ্য মোছা',
    nameEn: 'Delete User Stored Data',
    category: 'USER_DATA',
    minimumAuthorityRequired: 5,
    requiresOwnerApproval: true,
    requiresHumanReviewer: false,
    reversible: false,
    description: 'Purging user bookmarks, notes, reading history, or profile databases.',
  },
  LEGAL_COPYRIGHT_POLICY: {
    actionId: 'LEGAL_COPYRIGHT_POLICY',
    nameBn: 'কপিরাইট ও আইনি নীতি পরিবর্তন',
    nameEn: 'Modify Legal & Copyright Policy',
    category: 'SECURITY_PERMISSION',
    minimumAuthorityRequired: 5,
    requiresOwnerApproval: true,
    requiresHumanReviewer: true,
    reversible: false,
    description: 'Altering copyright statements, terms of use, or licensing agreements.',
  },

  // Level 4 Controlled Routine Actions (Deep / Lexi)
  REBUILD_SEARCH_INDEX: {
    actionId: 'REBUILD_SEARCH_INDEX',
    nameBn: 'অনুসন্ধান সূচক পুনর্গঠন',
    nameEn: 'Rebuild Search Index',
    category: 'TECHNICAL_REPAIR',
    minimumAuthorityRequired: 4,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Regenerating search indexes from approved canonical scriptures.',
  },
  REPAIR_INTERNAL_ROUTE: {
    actionId: 'REPAIR_INTERNAL_ROUTE',
    nameBn: 'অভ্যন্তরীণ রুট মেরামত',
    nameEn: 'Repair Internal Routing & Fallbacks',
    category: 'TECHNICAL_REPAIR',
    minimumAuthorityRequired: 4,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Restoring 200.html, static routes, or fixing unambiguous internal links.',
  },
  REPAIR_ACCESSIBILITY_METADATA: {
    actionId: 'REPAIR_ACCESSIBILITY_METADATA',
    nameBn: 'অ্যাক্সেসিবিলিটি লেবেল মেরামত',
    nameEn: 'Repair Accessibility Labels & ARIA',
    category: 'TECHNICAL_REPAIR',
    minimumAuthorityRequired: 4,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Adding missing aria-label, role, alt, or focus-visible indicators.',
  },
  PURGE_OBSOLETE_CACHE: {
    actionId: 'PURGE_OBSOLETE_CACHE',
    nameBn: 'পুরনো ক্যাশ সংস্করণ পরিচ্ছন্নকরণ',
    nameEn: 'Purge Deprecated Versioned Caches',
    category: 'TECHNICAL_REPAIR',
    minimumAuthorityRequired: 4,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Purging obsolete Service Worker cache blocks while preserving user data.',
  },
  ROLLBACK_TO_LKG: {
    actionId: 'ROLLBACK_TO_LKG',
    nameBn: 'যাচাইকৃত এলকেজি সংস্করণে রোলব্যাক',
    nameEn: 'Roll Back to Last Known Good Snapshot',
    category: 'TECHNICAL_REPAIR',
    minimumAuthorityRequired: 4,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Restoring the verified production snapshot when a deployment fails.',
  },
  REDEPLOY_VERIFIED_BUILD: {
    actionId: 'REDEPLOY_VERIFIED_BUILD',
    nameBn: 'যাচাইকৃত বিল্ড পুনঃডেপ্লয়',
    nameEn: 'Redeploy Verified Production Build',
    category: 'TECHNICAL_REPAIR',
    minimumAuthorityRequired: 4,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Publishing tested, authentic production files to Surge CDN.',
  },
  RESTORE_BIBLE_FROM_BACKUP: {
    actionId: 'RESTORE_BIBLE_FROM_BACKUP',
    nameBn: 'অনুমোদিত ব্যাকআপ থেকে শাস্ত্র পুনরুদ্ধার',
    nameEn: 'Restore Scripture from Authorized Offline Backup',
    category: 'TECHNICAL_REPAIR',
    minimumAuthorityRequired: 4,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Restoring authentic IRV Bengali scripture data from verified local backup.',
  },
  REMOVE_TEMPORARY_URL: {
    actionId: 'REMOVE_TEMPORARY_URL',
    nameBn: 'সাময়িক টানেল ইউআরএল অপসারণ',
    nameEn: 'Purge Ephemeral Tunnels from Production',
    category: 'TECHNICAL_REPAIR',
    minimumAuthorityRequired: 4,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Stripping any trycloudflare, ngrok, or temporary domains from production configs.',
  },

  // Level 3 Reviewer Actions
  REVIEW_THEOLOGY_NOTE: {
    actionId: 'REVIEW_THEOLOGY_NOTE',
    nameBn: 'ধর্মতাত্ত্বিক টীকা নিরীক্ষা',
    nameEn: 'Review Theological Study Notes',
    category: 'THEOLOGICAL_CONTENT',
    minimumAuthorityRequired: 3,
    requiresOwnerApproval: false,
    requiresHumanReviewer: true,
    reversible: true,
    description: 'Qualified human reviewer validating theological orthodoxy.',
  },
  REVIEW_COPYRIGHT_STATUS: {
    actionId: 'REVIEW_COPYRIGHT_STATUS',
    nameBn: 'কপিরাইট ও লাইসেন্স নিরীক্ষা',
    nameEn: 'Review Copyright & Licence Status',
    category: 'SECURITY_PERMISSION',
    minimumAuthorityRequired: 3,
    requiresOwnerApproval: false,
    requiresHumanReviewer: true,
    reversible: true,
    description: 'Reviewing resource permissions and lifting quarantine on verified assets.',
  },

  // Level 2 Automated Services
  EXECUTE_SCHEDULED_AUDIT: {
    actionId: 'EXECUTE_SCHEDULED_AUDIT',
    nameBn: 'নির্ধারিত স্বাস্থ্য নিরীক্ষা পরিচালনা',
    nameEn: 'Execute Scheduled Health Audit',
    category: 'MONITORING_AUDIT',
    minimumAuthorityRequired: 2,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Running 15-minute, 6-hour, 24-hour, and 7-day health checks.',
  },
  DISPATCH_INCIDENT_ALERT: {
    actionId: 'DISPATCH_INCIDENT_ALERT',
    nameBn: 'জরুরি সতর্কতা সংকেত প্রেরণ',
    nameEn: 'Dispatch Incident Alert to Owner',
    category: 'MONITORING_AUDIT',
    minimumAuthorityRequired: 2,
    requiresOwnerApproval: false,
    requiresHumanReviewer: false,
    reversible: true,
    description: 'Sending immediate notifications to Rev. Ayan Kumar Ghosh during outages.',
  },

  // Level 1 Drafting Tools
  DRAFT_CONTENT_SUGGESTION: {
    actionId: 'DRAFT_CONTENT_SUGGESTION',
    nameBn: 'বিষয়বস্তুর প্রাথমিক খসড়া প্রস্তুত',
    nameEn: 'Draft Content Suggestion (Unpublished)',
    category: 'DRAFTING',
    minimumAuthorityRequired: 1,
    requiresOwnerApproval: false,
    requiresHumanReviewer: true,
    reversible: true,
    description: 'Proposing text, summaries, or suggestions for human review.',
  },
};

export interface AuthorityContext {
  actor: 'DEEP' | 'LEXI' | 'OWNER' | 'REVIEWER' | 'SERVICE' | 'DRAFTER';
  actorLevel: AuthorityLevel;
  targetProjectId: 'bengali-study-bible' | 'logos-lexicon' | string;
  actionId: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface PermissionCheckResult {
  allowed: boolean;
  actor: string;
  actorLevel: AuthorityLevel;
  actionId: string;
  targetProjectId: string;
  reason: string;
  requiresOwnerApproval: boolean;
  requiresHumanReviewer: boolean;
}

// ----------------------------------------------------------------------------
// 5-ROLE GRANULAR ROLE-BASED ACCESS CONTROL (RBAC) PROFILES
// Specified in Deep Master Protection Directive
// ----------------------------------------------------------------------------
export type AdminRbacRole =
  | 'SYSTEM_ADMINISTRATOR'
  | 'BIBLICAL_CONTENT_EDITOR'
  | 'THEOLOGICAL_REVIEWER'
  | 'ANALYTICS_VIEWER'
  | 'SUPPORT_OPERATOR';

export interface AdminRbacProfile {
  role: AdminRbacRole;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  permittedCategories: SystemActionCategory[];
  canExecuteReversibleRepairs: boolean;
  requiresMfa: boolean;
  maxSessionDurationMinutes: number;
}

export const ADMIN_RBAC_PROFILES: Record<AdminRbacRole, AdminRbacProfile> = {
  SYSTEM_ADMINISTRATOR: {
    role: 'SYSTEM_ADMINISTRATOR',
    nameBn: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
    nameEn: 'System Administrator',
    descriptionBn: 'প্রযুক্তিগত অবকাঠামো, ক্যাশ, রাউটিং, ব্যাকআপ ও ইমার্জেন্সি কনসোল পরিচালনা।',
    permittedCategories: ['TECHNICAL_REPAIR', 'MONITORING_AUDIT', 'DOMAIN_INFRASTRUCTURE'],
    canExecuteReversibleRepairs: true,
    requiresMfa: true,
    maxSessionDurationMinutes: 60,
  },
  BIBLICAL_CONTENT_EDITOR: {
    role: 'BIBLICAL_CONTENT_EDITOR',
    nameBn: 'শাস্ত্রীয় বিষয়বস্তু সম্পাদক',
    nameEn: 'Biblical-Content Editor',
    descriptionBn: 'স্টাডি নোট, টীকা, ক্রস-রেফারেন্স ও লেক্সিকন ফরম্যাটিং পর্যালোচনা (মূল পদ অপরিবর্তনীয়)।',
    permittedCategories: ['DRAFTING', 'THEOLOGICAL_CONTENT'],
    canExecuteReversibleRepairs: false,
    requiresMfa: true,
    maxSessionDurationMinutes: 120,
  },
  THEOLOGICAL_REVIEWER: {
    role: 'THEOLOGICAL_REVIEWER',
    nameBn: 'ধর্মতাত্ত্বিক পর্যালোচক',
    nameEn: 'Theological Reviewer',
    descriptionBn: 'ঐতিহাসিক প্রটেস্ট্যান্ট মতবাদ ও খ্রিষ্টীয় জ্ঞানভাণ্ডার নির্ভুলতা মূল্যায়ন।',
    permittedCategories: ['THEOLOGICAL_CONTENT', 'DRAFTING'],
    canExecuteReversibleRepairs: false,
    requiresMfa: true,
    maxSessionDurationMinutes: 120,
  },
  ANALYTICS_VIEWER: {
    role: 'ANALYTICS_VIEWER',
    nameBn: 'অ্যানালিটিক্স দর্শক',
    nameEn: 'Analytics Viewer',
    descriptionBn: 'সর্বজনীন পরিসংখ্যান, পাঠক প্রবণতা ও বিতরণ ডেটা নিরীক্ষণ (ব্যক্তিগত তথ্য সম্পূর্ণ গোপন)।',
    permittedCategories: ['MONITORING_AUDIT'],
    canExecuteReversibleRepairs: false,
    requiresMfa: false,
    maxSessionDurationMinutes: 240,
  },
  SUPPORT_OPERATOR: {
    role: 'SUPPORT_OPERATOR',
    nameBn: 'সহায়তা অপারেটর',
    nameEn: 'Support Operator',
    descriptionBn: 'পাঠকদের প্রতিক্রিয়া, ত্রুটির প্রতিবেদন ও সাধারণ সাহায্য পরিচালনা।',
    permittedCategories: ['MONITORING_AUDIT', 'DRAFTING'],
    canExecuteReversibleRepairs: false,
    requiresMfa: false,
    maxSessionDurationMinutes: 180,
  },
};
