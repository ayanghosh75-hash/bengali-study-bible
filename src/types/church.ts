// Types for ⛪ Church Tools (Multi-Tenant Church Workspace)

export type ChurchRole =
  | 'owner'
  | 'admin'
  | 'pastor'
  | 'leader'
  | 'teacher'
  | 'editor'
  | 'member'
  | 'viewer';

export interface ChurchMember {
  id: string;
  nameBn: string;
  role: ChurchRole;
  emailOrPhone: string;
  joinedAt: string;
}

export interface ChurchAnnouncement {
  id: string;
  titleBn: string;
  contentBn: string;
  priority: 'normal' | 'urgent';
  authorNameBn: string;
  createdAt: string;
}

export interface ChurchSermonArchiveItem {
  id: string;
  titleBn: string;
  preacherBn: string;
  passageRef: string;
  dateBn: string;
  summaryBn: string;
  isPublished: boolean;
}

export interface ChurchReadingPlanItem {
  id: string;
  titleBn: string;
  durationDays: number;
  activeMembersCount: number;
  descriptionBn: string;
}

export interface ChurchPrayerRequest {
  id: string;
  titleBn: string;
  detailsBn: string;
  requesterNameBn: string;
  isConfidential: boolean; // Confidential requests are restricted to Pastors/Elders only
  createdAt: string;
  isAnswered: boolean;
}

export interface ChurchAuditLog {
  id: string;
  actionBn: string;
  performedByBn: string;
  timestamp: string;
}

export interface ChurchTenant {
  id: string;
  nameBn: string;
  denominationBn: string;
  preferredTranslationId: string;
  isPrivate: boolean;
  contactEmail: string;
  members: ChurchMember[];
  announcements: ChurchAnnouncement[];
  sermons: ChurchSermonArchiveItem[];
  readingPlans: ChurchReadingPlanItem[];
  prayerRequests: ChurchPrayerRequest[];
  auditLogs: ChurchAuditLog[];
  createdAt: string;
}
