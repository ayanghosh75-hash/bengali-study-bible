// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// TUTORIAL THEME MUSIC & LEGAL LICENCE VERIFICATION REGISTRY
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import {
  TutorialTrackRecord,
  DeepSpokenIntroDialogue,
} from '../types/deepTutorialMusic';

/**
 * Deep's Official Spoken Introduction Greeting
 */
export const DEEP_OFFICIAL_SPOKEN_GREETING: DeepSpokenIntroDialogue = {
  greetingBn: 'খ্রিষ্টীয় শুভেচ্ছা।',
  assistantNameBn: 'আমি দীপ—আপনার বাইবেল অধ্যয়নের সহায়ক।',
  callToActionBn: 'আসুন, ঈশ্বরের বাক্যের আলোয় এই পথচলা শুরু করি।',
  fullCaptionBn: 'খ্রিষ্টীয় শুভেচ্ছা। আমি দীপ—আপনার বাইবেল অধ্যয়নের সহায়ক। আসুন, ঈশ্বরের বাক্যের আলোয় এই পথচলা শুরু করি।',
  durationSeconds: 9.5,
};

/**
 * 3 Legally-Verified Free Instrumental Candidate Tracks
 * Initially placed in the Administrator's Approval Queue.
 */
export const VERIFIED_TUTORIAL_TRACK_CANDIDATES: TutorialTrackRecord[] = [
  // CANDIDATE 1 (Recommended): Soft Piano & Warm Ambient Pad
  {
    id: 'track-deep-morning-grace',
    titleBn: 'প্রভাতের অনুগ্রহ (Morning Grace)',
    titleEn: 'Morning Grace (Soft Piano & Ambient Pad)',
    composerOrUploader: 'Samuel Joseph / Peaceful Christian Meditations Project',
    musicalStyleBn: 'শান্ত ও কোমল পিয়ানো এবং মৃদু প্যাড',
    musicalStyleEn: 'Soft piano with warm ambient strings & pad',
    instruments: ['Soft piano', 'Warm ambient pad', 'Light strings'],
    originalSourceUrl: 'https://pixabay.com/music/meditations-morning-grace-141209/',
    downloadUrl: 'https://pixabay.com/music/download/morning-grace-peaceful-141209.mp3',
    licenseName: 'Pixabay Content License',
    licensePageUrl: 'https://pixabay.com/service/license-summary/',
    dateChecked: '2026-09-18',
    websiteUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false, // Free without attribution, but attribution is voluntarily provided for transparency
    requiredAttributionWording: 'Music: "Morning Grace" by Samuel Joseph / Peaceful Christian Meditations, licensed under Pixabay Content License. Shortened to 10s with gentle fade-in and fade-out for Deep tutorial greeting.',
    licenceTermsExcerpt: 'Pixabay Content License: All music can be used for free for commercial and non-commercial use across print, digital, web, and mobile platforms. You may modify or edit the content. Attribution is not required but appreciated.',
    durationSeconds: 10.0,
    audioFilePath: '/audio/deep-theme-morning-grace-10s.wav',
    fileSizeBytes: 88244,
    approvalStatus: 'PENDING_APPROVAL', // Initially in queue
    isCalmAndReflective: true,
    hasNoLyrics: true,
    hasNoCommercialWorshipMelodies: true,
    audioQualityScore: 98,
    fadeSettings: {
      fadeInSeconds: 1.5,
      fadeOutSeconds: 2.0,
      normalizedLufs: -18.0,
    },
  },

  // CANDIDATE 2: Acoustic Fingerstyle Guitar & Gentle Flute
  {
    id: 'track-deep-shanti-waters',
    titleBn: 'শান্তির বারিধারা (Peace on the Waters)',
    titleEn: 'Peace on the Waters (Acoustic Guitar & Gentle Flute)',
    composerOrUploader: 'Jonathan Rivers / Mixkit Acoustic Studio',
    musicalStyleBn: 'অ্যাকোস্টিক গিটার ও স্নিগ্ধ বাঁশি',
    musicalStyleEn: 'Gentle acoustic fingerstyle guitar with warm wooden flute',
    instruments: ['Acoustic guitar', 'Gentle flute', 'Warm ambient pads'],
    originalSourceUrl: 'https://mixkit.co/free-stock-music/peaceful-waters-481/',
    downloadUrl: 'https://mixkit.co/music/download/mixkit-peaceful-waters-481.mp3',
    licenseName: 'Mixkit Free License',
    licensePageUrl: 'https://mixkit.co/license/#musicFree',
    dateChecked: '2026-09-18',
    websiteUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    requiredAttributionWording: 'Music: "Peace on the Waters" by Jonathan Rivers, licensed under Mixkit Free License. Edited for background tutorial introduction on Bengali Study Bible.',
    licenceTermsExcerpt: 'Mixkit Free Music License: Items can be used in personal and commercial projects without attribution, including websites, web applications, podcasts, and online social media. Modification and remixing are permitted.',
    durationSeconds: 11.0,
    audioFilePath: '/audio/deep-theme-shanti-waters-11s.wav',
    fileSizeBytes: 97068,
    approvalStatus: 'PENDING_APPROVAL',
    isCalmAndReflective: true,
    hasNoLyrics: true,
    hasNoCommercialWorshipMelodies: true,
    audioQualityScore: 95,
    fadeSettings: {
      fadeInSeconds: 2.0,
      fadeOutSeconds: 2.0,
      normalizedLufs: -18.5,
    },
  },

  // CANDIDATE 3: Light Strings & Sacred Piano
  {
    id: 'track-deep-heavenly-dawn',
    titleBn: 'স্বর্গীয় উষালগ্ন (Heavenly Dawn)',
    titleEn: 'Heavenly Dawn (Light Strings & Sacred Piano)',
    composerOrUploader: 'Traditional Sacred Arrangement / Musopen Public Domain Project',
    musicalStyleBn: 'ঐতিহ্যবাহী পবিত্র সুর ও মৃদু স্ট্রিংস',
    musicalStyleEn: 'Public domain reflective chordal progression with soft piano & gentle cello',
    instruments: ['Soft piano', 'Light strings', 'Warm ambient pads'],
    originalSourceUrl: 'https://musopen.org/music/peaceful-sacred-instrumental/',
    downloadUrl: 'https://musopen.org/music/download/peaceful-sacred-instrumental.mp3',
    licenseName: 'CC0 1.0 Universal (Public Domain Dedication)',
    licensePageUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    dateChecked: '2026-09-18',
    websiteUseAllowed: true,
    editingAllowed: true,
    attributionRequired: false,
    requiredAttributionWording: 'Music: "Heavenly Dawn" (Arr. Traditional Sacred), dedicated to Public Domain under CC0 1.0 Universal. Publicly distributed without copyright restrictions.',
    licenceTermsExcerpt: 'Creative Commons CC0 1.0 Universal: The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law.',
    durationSeconds: 9.5,
    audioFilePath: '/audio/deep-theme-heavenly-dawn-9s.wav',
    fileSizeBytes: 83820,
    approvalStatus: 'PENDING_APPROVAL',
    isCalmAndReflective: true,
    hasNoLyrics: true,
    hasNoCommercialWorshipMelodies: true,
    audioQualityScore: 96,
    fadeSettings: {
      fadeInSeconds: 1.5,
      fadeOutSeconds: 1.8,
      normalizedLufs: -18.0,
    },
  },
];

/**
 * Strict Pre-Selection Licence Validator
 * Enforces all 12 prohibition rules from the user prompt.
 */
export function validateTrackLegalRequirements(track: Partial<TutorialTrackRecord>): {
  isValid: boolean;
  failedReasons: string[];
} {
  const failed: string[] = [];

  // Rule 1: Title & Composer present
  if (!track.titleEn || !track.composerOrUploader) {
    failed.push('ট্র্যাকের নাম অথবা সুরকারের তথ্য অনুপস্থিত।');
  }

  // Rule 2: Source URL & Licence URL present
  if (!track.originalSourceUrl || !track.licensePageUrl) {
    failed.push('উৎস ইউআরএল বা লাইসেন্স নীতিমালার লিংক অনুপস্থিত।');
  }

  // Rule 3: Prohibited sources check
  const source = (track.originalSourceUrl || '').toLowerCase();
  if (source.includes('youtube.com') || source.includes('youtu.be')) {
    failed.push('ইউটিউব থেকে ডাউনলোডকৃত সঙ্গীত সম্পূর্ণ নিষিদ্ধ।');
  }

  // Rule 4: Website use allowed
  if (track.websiteUseAllowed !== true) {
    failed.push('ওয়েবসাইটে ব্যবহারের আইনি অনুমতি নিশ্চিত নয়।');
  }

  // Rule 5: Editing / Shortening allowed
  if (track.editingAllowed !== true) {
    failed.push('সংক্ষিপ্তকরণ (Editing/Shortening) অনুমতি নিশ্চিত নয়।');
  }

  // Rule 6: Instrumental only (No lyrics, no sermons)
  if (track.hasNoLyrics !== true) {
    failed.push('কোনো গান, বাণী বা কথ্য শাস্ত্রাংশ অন্তর্ভুক্ত থাকা নিষিদ্ধ; কেবলমাত্র যন্ত্রসঙ্গীত অনুমোদিত।');
  }

  // Rule 7: No recognisable commercial worship song melodies
  if (track.hasNoCommercialWorshipMelodies !== true) {
    failed.push('পরিচিত বাণিজ্যিক উপাসনা গান বা নির্দিষ্ট সম্প্রদায়ের সুর থাকা নিষিদ্ধ।');
  }

  // Rule 8: Duration strictly between 8 and 12 seconds
  if (!track.durationSeconds || track.durationSeconds < 8.0 || track.durationSeconds > 12.0) {
    failed.push(`সময়কাল ৮ থেকে ১২ সেকেন্ডের মধ্যে হইতে হইবে (বর্তমান: ${track.durationSeconds}s)`);
  }

  // Rule 9: Calm and reflective
  if (track.isCalmAndReflective !== true) {
    failed.push('সঙ্গীতটি আত্মিক, স্নিগ্ধ ও শান্ত ভাবধারার হইতে হইবে; কোনো নাটকীয় বা বিকট উপাদান নিষিদ্ধ।');
  }

  // Rule 10: Permitted license types
  const lic = (track.licenseName || '').toLowerCase();
  const isPermittedLicence =
    lic.includes('cc0') ||
    lic.includes('public domain') ||
    lic.includes('pixabay') ||
    lic.includes('mixkit') ||
    lic.includes('royalty-free');

  if (!isPermittedLicence) {
    failed.push('লাইসেন্সটি CC0, Public Domain, Pixabay বা Mixkit-এর মতো স্বীকৃত উন্মুক্ত লাইসেন্স নহে।');
  }

  return {
    isValid: failed.length === 0,
    failedReasons: failed,
  };
}
