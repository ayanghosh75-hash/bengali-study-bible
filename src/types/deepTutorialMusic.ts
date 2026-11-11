// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// TUTORIAL THEME MUSIC & LICENCE VERIFICATION MODELS
// ============================================================

export type TrackApprovalStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';

export interface TutorialTrackRecord {
  id: string;
  titleBn: string;
  titleEn: string;
  composerOrUploader: string;
  musicalStyleBn: string;
  musicalStyleEn: string;
  instruments: string[];
  originalSourceUrl: string;
  downloadUrl: string;
  licenseName: string;
  licensePageUrl: string;
  dateChecked: string;
  websiteUseAllowed: boolean;
  editingAllowed: boolean;
  attributionRequired: boolean;
  requiredAttributionWording: string;
  licenceTermsExcerpt: string;
  durationSeconds: number; // Strictly between 8.0 and 12.0 seconds
  audioFilePath: string; // e.g. '/audio/deep-theme-morning-grace-10s.wav'
  fileSizeBytes: number;
  approvalStatus: TrackApprovalStatus;
  approvedBy?: string;
  approvalDate?: string;
  adminNotes?: string;
  rejectionReason?: string;
  isCalmAndReflective: boolean;
  hasNoLyrics: boolean;
  hasNoCommercialWorshipMelodies: boolean;
  audioQualityScore: number; // 0 - 100
  fadeSettings: {
    fadeInSeconds: number;
    fadeOutSeconds: number;
    normalizedLufs: number; // e.g. -18 LUFS gentle background
  };
}

export interface TutorialAudioPreference {
  enabled: boolean;        // true = wants music, false = silent
  hasChosen: boolean;      // true if user explicitly clicked "সুরসহ শুনুন" or "নিঃশব্দে দেখুন"
  muted: boolean;
  volume: number;          // 0.0 to 1.0 (default 0.35)
  lastUpdated: string;
}

export interface DeepSpokenIntroDialogue {
  greetingBn: string;
  assistantNameBn: string;
  callToActionBn: string;
  fullCaptionBn: string;
  durationSeconds: number;
}
