// Types for 👨‍牧 Pastor Tools (12-in-1 Ministry Suite)

export type PastorToolType =
  | 'sermon'
  | 'bible_study'
  | 'devotional'
  | 'small_group'
  | 'youth'
  | 'sunday_school'
  | 'quiz'
  | 'prayer_meeting'
  | 'funeral'
  | 'wedding'
  | 'teaching_outline'
  | 'reading_plan';

export interface PastorToolMeta {
  type: PastorToolType;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  defaultDurationBn: string;
  iconName: string;
}

export interface MinistryOutlineSection {
  id: string;
  sectionTitleBn: string;
  contentBn: string;
  verses?: string[];
  illustrationSuggestionBn?: string;
  practicalApplicationBn?: string;
}

export interface MinistryDocument {
  id: string;
  toolType: PastorToolType;
  titleBn: string;
  passageRef: string;
  centralTruthBn: string;
  targetAudienceBn: string;
  ageGroupBn?: string;
  durationMinutes: number;
  occasionBn?: string;
  toneBn?: string;
  theologicalTraditionBn?: string;
  sections: MinistryOutlineSection[];
  researchSourcesBn: string[];
  accuracyChecklist: {
    itemBn: string;
    isVerified: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
  version: number;
}
