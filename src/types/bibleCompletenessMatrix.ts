// ============================================================================
// BENGALI STUDY BIBLE — 66-BOOK BIBLE COMPLETENESS MATRIX TYPES
// Controlled Level-4 Parity with Lexi (Logos Lexicon)
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

export type BibleCompletenessStatus =
  | 'VERIFIED_COMPLETE'
  | 'DRAFT_COMPLETE'
  | 'SOURCE_PENDING'
  | 'STUDY_NOTES_IN_PROGRESS'
  | 'AUDIO_PENDING'
  | 'CROSS_REF_LINKED'
  | 'UNDER_REVIEW'
  | 'LOCKED_CANON'
  | 'QUARANTINED'
  | 'ORPHAN_DETECTED';

export type BibleStorageStatus = 'LOCAL_INDEXEDDB' | 'CACHED' | 'REMOTE_BUNDLED';
export type BibleAudioStatus = 'AVAILABLE' | 'PARTIAL' | 'AUDIO_PENDING' | 'NOT_RECORDED';
export type BibleCrossRefStatus = 'CROSS_REF_LINKED' | 'PARTIAL' | 'PENDING';
export type BibleStudyNotesStatus = 'VERIFIED_COMPLETE' | 'STUDY_NOTES_IN_PROGRESS' | 'PENDING';

export interface BibleCompletenessEntry {
  // 20 Required Specification Fields
  book_id: string;                                // 1. e.g. "GEN"
  canonical_order: number;                        // 2. 1 to 66
  testament: 'OLD' | 'NEW';                       // 3. Testament
  original_name_bn: string;                       // 4. e.g. "আদিপুস্তক"
  english_name: string;                           // 5. e.g. "Genesis"
  abbrev_bn: string;                              // 6. e.g. "আদি"
  total_chapters: number;                         // 7. e.g. 50
  total_verses: number;                           // 8. e.g. 1533
  verified_verse_count: number;                   // 9. Verified verse count
  translation_id: string;                         // 10. e.g. "IRV-BEN"
  source_edition: string;                         // 11. e.g. "Indian Revised Version (Bengali) 2019"
  licence_type: string;                           // 12. e.g. "CC BY-SA 4.0"
  checksum_sha256: string;                        // 13. SHA-256 hash of authentic content
  storage_status: BibleStorageStatus;             // 14. Storage backend status
  audio_status: BibleAudioStatus;                 // 15. Audio narration status
  cross_ref_status: BibleCrossRefStatus;          // 16. Cross-reference status
  study_notes_status: BibleStudyNotesStatus;      // 17. Study notes completeness
  full_text_present: boolean;                     // 18. True if 100% full text available
  last_verified_at: string;                       // 19. ISO 8601 verification timestamp
  verified_by: string;                            // 20. Auditor identifier / system agent

  // Status & Theological Metadata
  overall_status: BibleCompletenessStatus;
  is_quarantined: boolean;
  division_bn: string;
}

export interface BibleCompletenessSummary {
  totalCanonBooks: number;
  totalChapters: number;
  totalVerses: number;
  verifiedBooksCount: number;
  quarantinedCount: number;
  fullTextAvailableBooksCount: number;
  masterChecksum: string;
  auditTimestamp: string;
  auditor: string;
  canonStatus: 'CANON_100_PERCENT_INTACT' | 'CANON_DEGRADED' | 'DISCREPANCY_DETECTED';
}
