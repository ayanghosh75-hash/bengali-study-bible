// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// COPYRIGHT + LICENSING + SOURCE ATTRIBUTION + PROVENANCE TYPES
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

export type RightsClassification =
  | 'ORIGINAL'
  | 'COPYRIGHTED'
  | 'LICENSED'
  | 'PUBLIC_DOMAIN'
  | 'CREATIVE_COMMONS'
  | 'OPEN_LICENSE'
  | 'PERMISSION_GRANTED'
  | 'EXTERNAL_LINK_ONLY'
  | 'USER_GENERATED'
  | 'AI_GENERATED'
  | 'UNKNOWN'
  | 'PENDING_REVIEW'
  | 'RESTRICTED'
  | 'DO_NOT_PUBLISH';

export type RightsHolderType =
  | 'Project Owner'
  | 'Author'
  | 'Translator'
  | 'Publisher'
  | 'Bible Society'
  | 'Organization'
  | 'Institution'
  | 'Photographer'
  | 'Artist'
  | 'Cartographer'
  | 'Editor'
  | 'Developer'
  | 'User'
  | 'Unknown';

export interface RightsHolder {
  id: string;
  nameBn: string;
  nameEn: string;
  organizationName?: string;
  rightsHolderType: RightsHolderType;
  officialWebsite?: string;
  publicContact?: string;
  isProjectOwner?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type StandardLicenseCode =
  | 'All Rights Reserved'
  | 'Public Domain'
  | 'CC0 1.0'
  | 'CC BY 4.0'
  | 'CC BY-SA 4.0'
  | 'CC BY-NC 4.0'
  | 'CC BY-NC-SA 4.0'
  | 'CC BY-ND 4.0'
  | 'CC BY-NC-ND 4.0'
  | 'Custom Publisher Permission'
  | 'Direct Written Permission'
  | 'Restricted Editorial Quoting'
  | 'SIL Open Font License 1.1'
  | 'MIT License'
  | 'ISC License'
  | 'External Link Only'
  | 'Unknown / Under Review';

export interface LicenseRecord {
  id: string;
  licenseNameBn: string;
  licenseNameEn: string;
  licenseCode: StandardLicenseCode;
  licenseType: string;
  licenseVersion?: string;
  officialLicenseUrl?: string;
  licenseTextUrl?: string;
  commercialUseAllowed: boolean;
  redistributionAllowed: boolean;
  modificationAllowed: boolean;
  attributionRequired: boolean;
  shareAlikeRequired: boolean;
  downloadAllowed: boolean;
  offlineStorageAllowed: boolean;
  publicDisplayAllowed: boolean;
  aiProcessingAllowed: boolean;
  aiEmbeddingAllowed: boolean;
  notes?: string;
  verified: boolean;
  verificationSource?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  nextReviewDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type SourceType =
  | 'Bible Translation'
  | 'Bible Edition'
  | 'Book'
  | 'Commentary'
  | 'Journal Article'
  | 'Dictionary'
  | 'Lexicon'
  | 'Website'
  | 'Archive'
  | 'Map'
  | 'Image'
  | 'Photograph'
  | 'Audio'
  | 'Video'
  | 'Dataset'
  | 'API'
  | 'Historical Source'
  | 'Primary Source'
  | 'Secondary Source'
  | 'Manuscript'
  | 'AI Generated'
  | 'User Generated'
  | 'Software'
  | 'Font'
  | 'Other';

export interface SourceRecord {
  id: string;
  titleBn: string;
  titleEn: string;
  authorBn?: string;
  authorEn?: string;
  editor?: string;
  translator?: string;
  publisherBn?: string;
  publisherEn?: string;
  publicationDate?: string;
  edition?: string;
  version?: string;
  language: 'bn' | 'en' | 'he' | 'el' | 'arc' | 'mul';
  isbn?: string;
  doi?: string;
  officialUrl?: string;
  sourceUrl?: string;
  archiveUrl?: string;
  accessedAt?: string;
  sourceType: SourceType;
  rightsHolderId: string;
  licenseId: string;
  citationText?: string;
  bibliographicInformation?: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'UNKNOWN' | 'REJECTED';
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type PermissionStatus =
  | 'NOT_REQUIRED'
  | 'REQUESTED'
  | 'PENDING'
  | 'GRANTED'
  | 'PARTIALLY_GRANTED'
  | 'DENIED'
  | 'EXPIRED'
  | 'UNKNOWN';

export interface PermissionRecord {
  id: string;
  rightsHolderId: string;
  resourceType: string;
  resourceId: string;
  permissionType: string;
  permissionStatus: PermissionStatus;
  requestDate?: string;
  grantedDate?: string;
  expirationDate?: string;
  territory?: string;
  digitalPermission: boolean;
  publicDisplayPermission: boolean;
  commercialPermission: boolean;
  downloadPermission: boolean;
  offlinePermission: boolean;
  modificationPermission: boolean;
  redistributionPermission: boolean;
  aiProcessingPermission: boolean;
  conditions?: string;
  contactPerson?: string;
  evidenceReference?: string; // Private reference identifier (NOT exposed publicly)
  privateNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceRightsRecord {
  id: string;
  resourceType:
    | 'translation'
    | 'article'
    | 'book'
    | 'commentary'
    | 'map'
    | 'image'
    | 'lexicon'
    | 'crossref'
    | 'timeline'
    | 'study_note'
    | 'logo'
    | 'font'
    | 'icon'
    | 'software'
    | 'user_content';
  resourceId: string;
  resourceTitleBn: string;
  resourceTitleEn: string;
  sourceId: string;
  rightsHolderId: string;
  licenseId: string;
  copyrightStatus: RightsClassification;
  copyrightNoticeBn: string;
  copyrightNoticeEn: string;
  permissionStatus: PermissionStatus;
  attributionRequired: boolean;
  attributionTextBn: string;
  attributionTextEn: string;
  commercialUseAllowed: boolean;
  redistributionAllowed: boolean;
  modificationAllowed: boolean;
  downloadAllowed: boolean;
  offlineUseAllowed: boolean;
  publicDisplayAllowed: boolean;
  aiProcessingAllowed: boolean;
  aiEmbeddingAllowed: boolean;
  retrievalAllowed: boolean;
  territoryRestrictions?: string;
  expirationDate?: string;
  evidenceUrl?: string;
  evidenceFileReference?: string;
  evidenceNotes?: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'UNKNOWN' | 'REJECTED';
  verifiedBy?: string;
  verifiedAt?: string;
  reviewStatus: 'APPROVED' | 'PENDING_REVIEW' | 'REQUIRES_PERMISSION' | 'FLAGGED';
  reviewNotes?: string;
  publicationStatus: 'PUBLISHED' | 'EXTERNAL_LINK_ONLY' | 'HELD_IN_REVIEW' | 'DO_NOT_PUBLISH';
  createdAt: string;
  updatedAt: string;
}

export interface BibleTranslationRightsRecord {
  translationId: string;
  translationNameBn: string;
  translationNameEn: string;
  shortCode: string;
  publisherBn: string;
  translatorBn?: string;
  copyrightHolderBn: string;
  copyrightYear: string;
  edition?: string;
  version: string;
  officialSourceUrl: string;
  rightsStatus: RightsClassification;
  licenseId: string;
  permissionStatus: PermissionStatus;
  digitalDisplayAllowed: boolean;
  quotationAllowed: boolean;
  fullTextStorageAllowed: boolean;
  offlineStorageAllowed: boolean;
  redistributionAllowed: boolean;
  commercialUseAllowed: boolean;
  downloadAllowed: boolean;
  aiProcessingAllowed: boolean;
  requiredAttributionBn: string;
  copyrightNoticeBn: string;
  permissionEvidenceReference?: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'UNKNOWN';
  verifiedAt: string;
  notesBn?: string;
}

export interface CopyrightConcernRecord {
  id: string;
  complainantName: string;
  complainantEmail: string;
  complainantOrg?: string;
  rightsHolderOrRepresentative: string;
  resourceUrl: string;
  copyrightedWorkDescription: string;
  concernDescription: string;
  supportingInformation?: string;
  status: 'NEW' | 'UNDER_REVIEW' | 'INFORMATION_REQUESTED' | 'TEMPORARILY_RESTRICTED' | 'RESOLVED' | 'NO_ACTION';
  adminNotes?: string;
  assignedTo?: string;
  submittedAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface RightsAuditLog {
  id: string;
  resourceId: string;
  resourceType: string;
  previousStatus: RightsClassification;
  newStatus: RightsClassification;
  previousLicense?: string;
  newLicense?: string;
  changedBy: string;
  reason: string;
  timestamp: string;
}

export interface VerificationHistoryRecord {
  id: string;
  resourceId: string;
  verifiedAt: string;
  verifiedBy: string;
  verificationSource: string;
  verificationNotes: string;
  nextReviewDate?: string;
}
