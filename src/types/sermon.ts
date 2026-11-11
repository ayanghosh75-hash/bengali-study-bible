export type SermonDuration = '10' | '20' | '30' | '45' | '60' | 'custom';

export type SermonAudience =
  | 'sunday_congregation'
  | 'youth'
  | 'children'
  | 'small_group'
  | 'pastors'
  | 'bible_study'
  | 'evangelistic'
  | 'memorial'
  | 'prayer_meeting'
  | 'special_service'
  | 'custom';

export interface SermonAudienceOption {
  id: SermonAudience;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  iconName: string;
}

export interface SermonDurationOption {
  id: SermonDuration;
  labelBn: string;
  minutes: number;
  wordCountEstimate: string;
  scopeBn: string;
}

export interface SermonPoint {
  id: string;
  pointNumber: number;
  titleBn: string;
  scriptureReference: string;
  explanationBn: string;
  supportingScriptureBn: string;
  practicalApplicationBn: string;
}

export interface SermonContent {
  titleBn: string;
  mainPassageBn: string;
  mainPassageEn: string;
  scriptureTextBn: string;
  bigIdeaBn: string; // The single core takeaway / central thesis
  introductionBn: string;
  biblicalContextBn: string;
  historicalLiteraryContextBn: string;
  points: SermonPoint[];
  illustrationSuggestionsBn: string[];
  practicalApplicationBn: string[];
  reflectionQuestionsBn: string[];
  conclusionBn: string;
  closingPrayerBn: string;
}

export interface SavedSermon {
  id: string;
  title: string;
  passage: string;
  audience: SermonAudience | string;
  audienceLabelBn: string;
  duration: SermonDuration | string;
  durationMinutes: number;
  content: SermonContent;
  fullMarkdownText: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SermonGenerationRequest {
  passage: string;
  duration: SermonDuration;
  customDurationMinutes?: number;
  audience: SermonAudience;
  customAudienceText?: string;
  specialEmphasis?: string;
}
