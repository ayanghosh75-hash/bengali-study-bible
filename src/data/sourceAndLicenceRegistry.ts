// ============================================================================
// BENGALI STUDY BIBLE — SOURCE AND LICENCE REGISTRY
// Controlled Level-4 Parity with Lexi (Logos Lexicon)
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

export type LicenceClassification =
  | 'Public Domain'
  | 'CC BY-SA'
  | 'Permission Granted'
  | 'In Review'
  | 'All Rights Reserved'
  | 'Fair Dealing / Fair Use'
  | 'Unknown licence';

export type ResourceCategory =
  | 'BIBLE_TRANSLATION'
  | 'COMMENTARY'
  | 'LEXICON'
  | 'AUDIO'
  | 'FONT'
  | 'MAP';

export interface SourceRegistryEntry {
  resourceId: string;
  category: ResourceCategory;
  nameBn: string;
  nameEn: string;
  sourceEdition: string;
  publisher: string;
  copyrightHolder: string;
  licenceClassification: LicenceClassification;
  licenceDetails: string;
  isQuarantined: boolean;
  quarantineReason?: string;
  offlineStorageAllowed: boolean;
  publicDisplayAllowed: boolean;
  lastAuditedAt: string;
  auditedBy: string;
}

export const SOURCE_AND_LICENCE_REGISTRY: SourceRegistryEntry[] = [
  // 1. Bible Translations
  {
    resourceId: 'IRV-BEN',
    category: 'BIBLE_TRANSLATION',
    nameBn: 'ভারতীয় সংশোধিত সংস্করণ (IRV বাংলা)',
    nameEn: 'Indian Revised Version (Bengali)',
    sourceEdition: '2019 Revised Edition (eBible.org)',
    publisher: 'Bridge Connectivity Solutions Pvt. Ltd.',
    copyrightHolder: 'Bridge Connectivity Solutions Pvt. Ltd.',
    licenceClassification: 'CC BY-SA',
    licenceDetails: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
    isQuarantined: false,
    offlineStorageAllowed: true,
    publicDisplayAllowed: true,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'DEEP_L4_AUTOPILOT',
  },
  {
    resourceId: 'CAREY-1809',
    category: 'BIBLE_TRANSLATION',
    nameBn: 'উইলিয়াম কেরি ঐতিহাসিক বাংলা বাইবেল (১৮০৯)',
    nameEn: 'William Carey Historic Bengali Bible (1809)',
    sourceEdition: '1809 Serampore Press Historic Edition',
    publisher: 'Serampore Mission Press',
    copyrightHolder: 'Historical Public Domain',
    licenceClassification: 'Public Domain',
    licenceDetails: 'Public Domain worldwide (Published before 1928)',
    isQuarantined: false,
    offlineStorageAllowed: true,
    publicDisplayAllowed: true,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'DEEP_L4_AUTOPILOT',
  },
  {
    resourceId: 'BSI-BEN',
    category: 'BIBLE_TRANSLATION',
    nameBn: 'বাংলা ওল্ড ভার্সন (বিএসআই ও.ভি.)',
    nameEn: 'Bible Society of India Bengali Old Version',
    sourceEdition: '2006 Print Edition',
    publisher: 'The Bible Society of India (BSI)',
    copyrightHolder: 'The Bible Society of India',
    licenceClassification: 'All Rights Reserved',
    licenceDetails: 'Copyrighted by BSI. No open redistribution without explicit written contract.',
    isQuarantined: true,
    quarantineReason: 'Quarantined under Level-4 copyright compliance: All Rights Reserved without verified API token.',
    offlineStorageAllowed: false,
    publicDisplayAllowed: false,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'DEEP_L4_AUTOPILOT',
  },

  // 2. Commentaries
  {
    resourceId: 'MHC-BENGALI-NOTES',
    category: 'COMMENTARY',
    nameBn: 'ম্যাথু হেনরি সংক্ষিপ্ত বাংলা ব্যাখ্যাসার',
    nameEn: 'Matthew Henry Commentary Excerpts (Bengali Translation)',
    sourceEdition: 'Original 1706 Public Domain; Bengali Translation curated for BSB',
    publisher: 'Public Domain Theology / Rev. Ayan Kumar Ghosh Editorial',
    copyrightHolder: 'Public Domain (Original); Editorial Notes Rev. Ayan Kumar Ghosh',
    licenceClassification: 'Permission Granted',
    licenceDetails: 'Theological editorial permission granted by Rev. Ayan Kumar Ghosh',
    isQuarantined: false,
    offlineStorageAllowed: true,
    publicDisplayAllowed: true,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'REV_AYAN_KUMAR_GHOSH',
  },

  // 3. Lexicons
  {
    resourceId: 'STRONGS-GREEK-HEBREW',
    category: 'LEXICON',
    nameBn: 'স্ট্রংস গ্রীক ও হিব্রু শব্দকোষ',
    nameEn: "Strong's Exhaustive Hebrew and Greek Dictionary",
    sourceEdition: 'Public Domain 1890 Edition',
    publisher: 'James Strong',
    copyrightHolder: 'Public Domain',
    licenceClassification: 'Public Domain',
    licenceDetails: 'Public Domain worldwide',
    isQuarantined: false,
    offlineStorageAllowed: true,
    publicDisplayAllowed: true,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'DEEP_L4_AUTOPILOT',
  },

  // 4. Audio
  {
    resourceId: 'AUDIO-BEN-DRAMATIZED',
    category: 'AUDIO',
    nameBn: 'বাংলা অডিও বাইবেল (নাট্যরূপ)',
    nameEn: 'Bengali Audio Bible Dramatized',
    sourceEdition: 'Third-party recordings currently in licensing review',
    publisher: 'Pending Verification',
    copyrightHolder: 'Unknown',
    licenceClassification: 'Unknown licence',
    licenceDetails: 'Licence verification pending. Must remain strictly quarantined.',
    isQuarantined: true,
    quarantineReason: 'Automatic Quarantine: Classified as Unknown licence. Audio files blocked until Level-3 Reviewer clears rights.',
    offlineStorageAllowed: false,
    publicDisplayAllowed: false,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'DEEP_L4_AUTOPILOT',
  },

  // 5. Fonts
  {
    resourceId: 'FONT-KALPURUSH',
    category: 'FONT',
    nameBn: 'কালপুরুষ বাংলা ফন্ট',
    nameEn: 'Kalpurush Bengali Unicode Font',
    sourceEdition: 'Avrodhac / Ekushey Release',
    publisher: 'Ekushey Free Project',
    copyrightHolder: 'OmicronLab',
    licenceClassification: 'CC BY-SA',
    licenceDetails: 'GNU General Public License with font exception / Open source',
    isQuarantined: false,
    offlineStorageAllowed: true,
    publicDisplayAllowed: true,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'DEEP_L4_AUTOPILOT',
  },
  {
    resourceId: 'FONT-NOTO-SERIF-BENGALI',
    category: 'FONT',
    nameBn: 'নতো সেরিফ বেঙ্গলী',
    nameEn: 'Noto Serif Bengali Font',
    sourceEdition: 'Google Fonts Release 2024',
    publisher: 'Google LLC',
    copyrightHolder: 'Google LLC',
    licenceClassification: 'CC BY-SA',
    licenceDetails: 'SIL Open Font License 1.1',
    isQuarantined: false,
    offlineStorageAllowed: true,
    publicDisplayAllowed: true,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'DEEP_L4_AUTOPILOT',
  },

  // 6. Maps
  {
    resourceId: 'MAP-ANCIENT-ISRAEL',
    category: 'MAP',
    nameBn: 'প্রাচীন ইস্রায়েল ও নিকট প্রাচ্যের ঐতিহাসিক মানচিত্র',
    nameEn: 'Historic Maps of Ancient Israel & Near East',
    sourceEdition: 'Historical Bible Atlas (Public Domain Cartography)',
    publisher: 'Bible Atlas Cartography',
    copyrightHolder: 'Public Domain Cartography',
    licenceClassification: 'Public Domain',
    licenceDetails: 'Historic cartographic plates in public domain',
    isQuarantined: false,
    offlineStorageAllowed: true,
    publicDisplayAllowed: true,
    lastAuditedAt: '2026-09-18T12:00:00Z',
    auditedBy: 'DEEP_L4_AUTOPILOT',
  },
];

/**
 * Service to validate and enforce license compliance.
 * Automatically quarantines any asset with "Unknown licence" or unverified rights.
 */
export class SourceLicenceRegistryService {
  private static instance: SourceLicenceRegistryService;

  private constructor() {}

  public static getInstance(): SourceLicenceRegistryService {
    if (!SourceLicenceRegistryService.instance) {
      SourceLicenceRegistryService.instance = new SourceLicenceRegistryService();
    }
    return SourceLicenceRegistryService.instance;
  }

  public getResource(resourceId: string): SourceRegistryEntry | undefined {
    return SOURCE_AND_LICENCE_REGISTRY.find((r) => r.resourceId === resourceId);
  }

  public isResourceUsable(resourceId: string): boolean {
    const res = this.getResource(resourceId);
    if (!res) return false;
    if (res.licenceClassification === 'Unknown licence') return false;
    if (res.isQuarantined) return false;
    return res.publicDisplayAllowed;
  }

  public assertUsable(resourceId: string): void {
    const res = this.getResource(resourceId);
    if (!res) {
      throw new Error(`[LICENCE_DENIED] Resource '${resourceId}' is not registered in SourceLicenceRegistry.`);
    }
    if (res.licenceClassification === 'Unknown licence') {
      throw new Error(`[LICENCE_QUARANTINE] Resource '${resourceId}' has Unknown licence and is quarantined.`);
    }
    if (res.isQuarantined) {
      throw new Error(
        `[LICENCE_QUARANTINE] Resource '${resourceId}' is currently quarantined: ${res.quarantineReason || 'Unapproved licence status'}`
      );
    }
    if (!res.publicDisplayAllowed) {
      throw new Error(`[LICENCE_DENIED] Resource '${resourceId}' does not have public display permission.`);
    }
  }

  public getAllQuarantined(): SourceRegistryEntry[] {
    return SOURCE_AND_LICENCE_REGISTRY.filter((r) => r.isQuarantined || r.licenceClassification === 'Unknown licence');
  }
}

export const sourceLicenceService = SourceLicenceRegistryService.getInstance();
