// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// RIGHTS & PROVENANCE SERVICE
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import {
  RightsHolder,
  LicenseRecord,
  SourceRecord,
  ResourceRightsRecord,
  BibleTranslationRightsRecord,
  CopyrightConcernRecord,
  RightsClassification,
} from '../types/rights';
import {
  RIGHTS_HOLDERS,
  LICENSES,
  SOURCES,
  RESOURCE_RIGHTS,
  BIBLE_TRANSLATION_RIGHTS,
  getRightsHolderById,
  getLicenseById,
  getSourceById,
  getResourceRightsById,
  getBibleTranslationRightsById,
  getProjectOwner,
} from '../data/rights';

export interface ProvenanceSummary {
  resourceId: string;
  titleBn: string;
  titleEn: string;
  origin: {
    sourceTitleBn: string;
    sourceTitleEn: string;
    sourceType: string;
    publisher?: string;
    publicationDate?: string;
    edition?: string;
    sourceUrl?: string;
    verified: boolean;
  };
  owner: {
    nameBn: string;
    nameEn: string;
    rightsHolderType: string;
    isProjectOwner: boolean;
    contact?: string;
    copyrightNoticeBn: string;
    copyrightNoticeEn: string;
  };
  allowedUses: {
    canPublish: boolean;
    canDisplay: boolean;
    canDownload: boolean;
    canOfflineStore: boolean;
    canAIIngest: boolean;
    canRedistribute: boolean;
    commercialUseAllowed: boolean;
  };
  rightsStatus: RightsClassification;
  licenseNameBn: string;
  licenseCode: string;
  licenseUrl?: string;
  citation: string;
}

export interface RightsIntegrityAuditResult {
  totalAudited: number;
  passed: number;
  warnings: string[];
  errors: string[];
  status: 'PASSED' | 'FAILED';
  auditedAt: string;
}

const CONCERNS_STORAGE_KEY = 'bsb_copyright_concerns_v1';

export class RightsService {
  // ------------------------------------------------------------
  // 1. Basic Registry Getters
  // ------------------------------------------------------------
  public static getRightsHolders(): RightsHolder[] {
    return RIGHTS_HOLDERS;
  }

  public static getRightsHolder(id: string): RightsHolder | undefined {
    return getRightsHolderById(id);
  }

  public static getOwner(): RightsHolder {
    return getProjectOwner();
  }

  public static getLicenses(): LicenseRecord[] {
    return LICENSES;
  }

  public static getLicense(id: string): LicenseRecord | undefined {
    return getLicenseById(id);
  }

  public static getSources(): SourceRecord[] {
    return SOURCES;
  }

  public static getSource(id: string): SourceRecord | undefined {
    return getSourceById(id);
  }

  public static getResourceRightsList(): ResourceRightsRecord[] {
    return RESOURCE_RIGHTS;
  }

  public static getResourceRights(resourceId: string): ResourceRightsRecord | undefined {
    return getResourceRightsById(resourceId);
  }

  public static getBibleTranslationRightsList(): BibleTranslationRightsRecord[] {
    return BIBLE_TRANSLATION_RIGHTS;
  }

  public static getBibleTranslationRights(translationId: string): BibleTranslationRightsRecord | undefined {
    return getBibleTranslationRightsById(translationId);
  }

  // ------------------------------------------------------------
  // 2. Three Fundamental Questions Engine
  // "Where did this come from, who owns it, and what are we allowed to do with it?"
  // ------------------------------------------------------------
  public static getProvenanceSummary(resourceId: string): ProvenanceSummary | null {
    const resource = getResourceRightsById(resourceId);
    if (!resource) return null;

    const source = getSourceById(resource.sourceId);
    const rightsHolder = getRightsHolderById(resource.rightsHolderId);
    const license = getLicenseById(resource.licenseId);

    return {
      resourceId: resource.resourceId,
      titleBn: resource.resourceTitleBn,
      titleEn: resource.resourceTitleEn,
      origin: {
        sourceTitleBn: source?.titleBn || resource.resourceTitleBn,
        sourceTitleEn: source?.titleEn || resource.resourceTitleEn,
        sourceType: source?.sourceType || resource.resourceType,
        publisher: source?.publisherBn || source?.publisherEn,
        publicationDate: source?.publicationDate,
        edition: source?.edition,
        sourceUrl: source?.sourceUrl || source?.officialUrl,
        verified: resource.verificationStatus === 'VERIFIED',
      },
      owner: {
        nameBn: rightsHolder?.nameBn || 'অজ্ঞাত স্বত্বাধিকারী',
        nameEn: rightsHolder?.nameEn || 'Unknown Rights Holder',
        rightsHolderType: rightsHolder?.rightsHolderType || 'Unknown',
        isProjectOwner: !!rightsHolder?.isProjectOwner,
        contact: rightsHolder?.publicContact,
        copyrightNoticeBn: resource.copyrightNoticeBn,
        copyrightNoticeEn: resource.copyrightNoticeEn,
      },
      allowedUses: {
        canPublish: resource.publicationStatus === 'PUBLISHED',
        canDisplay: resource.publicDisplayAllowed,
        canDownload: resource.downloadAllowed,
        canOfflineStore: resource.offlineUseAllowed,
        canAIIngest: resource.aiProcessingAllowed,
        canRedistribute: resource.redistributionAllowed,
        commercialUseAllowed: resource.commercialUseAllowed,
      },
      rightsStatus: resource.copyrightStatus,
      licenseNameBn: license?.licenseNameBn || 'স্বত্বাধিকার নির্ধারিত নয়',
      licenseCode: license?.licenseCode || 'Unknown',
      licenseUrl: license?.officialLicenseUrl,
      citation: this.generateCitation(resource.sourceId, 'simple'),
    };
  }

  // ------------------------------------------------------------
  // 3. Gatekeeper Policy Checks
  // ------------------------------------------------------------
  public static canPublish(resourceId: string): { allowed: boolean; reason?: string } {
    const res = getResourceRightsById(resourceId);
    if (!res) {
      return { allowed: false, reason: 'সম্পদটি স্বত্বাধিকার ডাটাবেজে নথিবদ্ধ নয়।' };
    }
    if (res.publicationStatus === 'DO_NOT_PUBLISH') {
      return { allowed: false, reason: 'উৎসটি প্রকাশ নিষিদ্ধ (DO_NOT_PUBLISH) হিসেবে চিহ্নিত।' };
    }
    if (res.publicationStatus === 'HELD_IN_REVIEW') {
      return { allowed: false, reason: 'উৎসটির স্বত্ব ও লাইসেন্স বর্তমানে পর্যালোচনাধীন (HELD_IN_REVIEW)।' };
    }
    if (res.reviewStatus === 'REQUIRES_PERMISSION' && res.permissionStatus !== 'GRANTED') {
      return { allowed: false, reason: 'এই সামগ্রীটির জন্য প্রকাশকের আনুষ্ঠানিক অনুমতি অপরিহার্য।' };
    }
    return { allowed: true };
  }

  public static canDownload(resourceId: string): { allowed: boolean; reason?: string } {
    const res = getResourceRightsById(resourceId);
    if (!res) return { allowed: false, reason: 'সম্পদটি নথিবদ্ধ নয়।' };
    if (!res.downloadAllowed) {
      return { allowed: false, reason: 'স্বত্বাধিকার নীতিমালা অনুযায়ী এই সামগ্রীর স্থানীয় ডাউনলোড নিষিদ্ধ।' };
    }
    return { allowed: true };
  }

  public static canOfflineStore(resourceId: string): { allowed: boolean; reason?: string } {
    const res = getResourceRightsById(resourceId);
    if (!res) return { allowed: false, reason: 'সম্পদটি নথিবদ্ধ নয়।' };
    if (!res.offlineUseAllowed) {
      return { allowed: false, reason: 'অফলাইন ডিভাইসে সম্পূর্ণ টেক্সট স্থায়ী সংরক্ষণ নিষিদ্ধ।' };
    }
    return { allowed: true };
  }

  public static canAIIngest(resourceId: string): { allowed: boolean; reason?: string } {
    const res = getResourceRightsById(resourceId);
    if (!res) return { allowed: false, reason: 'সম্পদটি নথিবদ্ধ নয়।' };
    if (!res.aiProcessingAllowed) {
      return { allowed: false, reason: 'এই সামগ্রীটি এআই ট্রেনিং বা প্রসেসিংয়ে ব্যবহারের অনুমতি নেই।' };
    }
    return { allowed: true };
  }

  public static canRedistribute(resourceId: string): { allowed: boolean; reason?: string } {
    const res = getResourceRightsById(resourceId);
    if (!res) return { allowed: false, reason: 'সম্পদটি নথিবদ্ধ নয়।' };
    if (!res.redistributionAllowed) {
      return { allowed: false, reason: 'পুনঃবিতরণ লাইসেন্স দ্বারা নিষিদ্ধ।' };
    }
    return { allowed: true };
  }

  // ------------------------------------------------------------
  // 4. Bibliographic Citation Engine
  // Strict metadata output with zero fabrication
  // ------------------------------------------------------------
  public static generateCitation(
    sourceId: string,
    style: 'simple' | 'apa' | 'chicago' | 'mla' = 'simple'
  ): string {
    const source = getSourceById(sourceId);
    if (!source) return 'উৎস সংক্রান্ত গ্রন্থপঞ্জি তথ্য লভ্য নয়।';

    const authorOrPublisher =
      source.authorBn || source.authorEn || source.publisherBn || source.publisherEn || 'অজ্ঞাত';
    const authorEn = source.authorEn || source.publisherEn || 'Unknown';
    const title = source.titleBn;
    const titleEn = source.titleEn;
    const year = source.publicationDate || 'n.d.';
    const publisher = source.publisherBn || source.publisherEn || '';

    switch (style) {
      case 'apa':
        return `${authorEn} (${year}). ${titleEn}. ${publisher ? publisher + '.' : ''} Retrieved from ${source.sourceUrl || source.officialUrl || 'https://bengalistudybible.org'}`;
      case 'chicago':
        return `${authorEn}. ${titleEn}. ${publisher ? publisher + ', ' : ''}${year}. ${source.sourceUrl || source.officialUrl || ''}`;
      case 'mla':
        return `${authorEn}. "${titleEn}." ${publisher ? publisher + ', ' : ''}${year}. Web.`;
      case 'simple':
      default:
        return source.citationText || `${authorOrPublisher} (${year}). ${title}. ${publisher ? publisher : ''}`;
    }
  }

  // ------------------------------------------------------------
  // 5. Automated Rights Integrity Audit
  // ------------------------------------------------------------
  public static runRightsIntegrityAudit(): RightsIntegrityAuditResult {
    const warnings: string[] = [];
    const errors: string[] = [];
    let passed = 0;

    for (const res of RESOURCE_RIGHTS) {
      let hasError = false;

      // Check source existence
      const src = getSourceById(res.sourceId);
      if (!src) {
        errors.push(`[${res.resourceId}] অনুপস্থিত সোর্স আইডি: '${res.sourceId}'`);
        hasError = true;
      }

      // Check rights holder existence
      const rh = getRightsHolderById(res.rightsHolderId);
      if (!rh) {
        errors.push(`[${res.resourceId}] অনুপস্থিত স্বত্বাধিকারী আইডি: '${res.rightsHolderId}'`);
        hasError = true;
      }

      // Check license existence
      const lic = getLicenseById(res.licenseId);
      if (!lic) {
        errors.push(`[${res.resourceId}] অনুপস্থিত লাইসেন্স আইডি: '${res.licenseId}'`);
        hasError = true;
      }

      // Check publication status sanity
      if (res.publicationStatus === 'PUBLISHED' && res.reviewStatus === 'REQUIRES_PERMISSION') {
        errors.push(`[${res.resourceId}] অনুমোদনহীন সামগ্রী প্রকাশিত হিসেবে চিহ্নিত: '${res.resourceTitleBn}'`);
        hasError = true;
      }

      // Check download consistency
      if (res.downloadAllowed && lic && !lic.downloadAllowed) {
        errors.push(`[${res.resourceId}] লাইসেন্স ডাউনলোড অনুমোদন করে না অথচ সম্পদে downloadAllowed=true`);
        hasError = true;
      }

      // Check AI consistency
      if (res.aiProcessingAllowed && lic && !lic.aiProcessingAllowed) {
        errors.push(`[${res.resourceId}] লাইসেন্স এআই অনুমোদন করে না অথচ সম্পদে aiProcessingAllowed=true`);
        hasError = true;
      }

      // Check Project Owner integrity
      if (res.copyrightStatus === 'ORIGINAL' && rh && !rh.isProjectOwner) {
        warnings.push(`[${res.resourceId}] মূল (ORIGINAL) সামগ্রী অথচ স্বত্বাধিকারী প্রজেক্ট ওনার নয়।`);
      }

      if (!hasError) {
        passed++;
      }
    }

    // Bible translation checks
    for (const trans of BIBLE_TRANSLATION_RIGHTS) {
      if (trans.rightsStatus === 'COPYRIGHTED' && trans.permissionStatus !== 'GRANTED' && trans.fullTextStorageAllowed) {
        errors.push(`[বাইবেল অনুবাদ ${trans.translationId}] লাইসেন্স স্থগিত অথচ fullTextStorageAllowed সক্রিয়!`);
      }
    }

    return {
      totalAudited: RESOURCE_RIGHTS.length + BIBLE_TRANSLATION_RIGHTS.length,
      passed,
      warnings,
      errors,
      status: errors.length === 0 ? 'PASSED' : 'FAILED',
      auditedAt: new Date().toISOString(),
    };
  }

  // ------------------------------------------------------------
  // 6. Copyright Concern Workflow
  // ------------------------------------------------------------
  public static getConcerns(): CopyrightConcernRecord[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(CONCERNS_STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch {
      // Ignore localStorage error
    }
    return [];
  }

  public static submitConcern(
    concern: Omit<CopyrightConcernRecord, 'id' | 'status' | 'submittedAt'>
  ): CopyrightConcernRecord {
    const record: CopyrightConcernRecord = {
      ...concern,
      id: `concern-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'NEW',
      submittedAt: new Date().toISOString(),
    };

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const list = this.getConcerns();
        list.unshift(record);
        localStorage.setItem(CONCERNS_STORAGE_KEY, JSON.stringify(list));
      }
    } catch {
      // Ignore localStorage error
    }

    return record;
  }

  public static updateConcernStatus(
    id: string,
    status: CopyrightConcernRecord['status'],
    adminNotes?: string
  ): boolean {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const list = this.getConcerns();
        const item = list.find((c) => c.id === id);
        if (item) {
          item.status = status;
          if (adminNotes) item.adminNotes = adminNotes;
          if (status === 'RESOLVED') {
            item.resolvedAt = new Date().toISOString();
            item.resolvedBy = 'Rev. Ayan Kumar Ghosh';
          }
          localStorage.setItem(CONCERNS_STORAGE_KEY, JSON.stringify(list));
          return true;
        }
      }
    } catch {
      // Ignore error
    }
    return false;
  }
}
