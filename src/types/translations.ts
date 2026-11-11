// TypeScript definitions for Bible Translations and Licensing Engine

export type LicenseType =
  | 'Public Domain'
  | 'Creative Commons CC-BY-SA 4.0'
  | 'All Rights Reserved (BSI Licensed / Authorized API)'
  | 'Restricted Editorial Quoting'
  | 'Rights Under Review';

export interface BibleTranslation {
  id: string;
  nameBn: string;
  nameEn: string;
  shortCode: string;
  language: 'bn' | 'en';
  year: number | string;
  publisherBn: string;
  copyrightHolderBn: string;
  licenseType: LicenseType;
  attributionBn: string;
  descriptionBn: string;
  isDefault?: boolean;
  isPublicDomain: boolean;
  hasFullText: boolean;
  rightsStatus?: 'COPYRIGHTED' | 'PUBLIC_DOMAIN' | 'OPEN_LICENSE';
  permissionStatus?: 'AUTHORIZED' | 'PENDING / NOT VERIFIED FOR FULL APP REDISTRIBUTION' | 'PUBLIC_DOMAIN';
  fullTextImport?: 'ENABLED' | 'DISABLED';
  canExport: boolean;
  canAIProcess: boolean;
  licenseTermsUrl?: string;
}

export interface TranslationVerseAlignment {
  bookId: string;
  chapter: number;
  verse: number;
  primaryTranslationId: string;
  primaryTextBn: string;
  parallelTranslationId?: string;
  parallelText?: string;
}
