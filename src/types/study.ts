export type TopicCategory =
  | 'salvation'
  | 'god'
  | 'christian_life'
  | 'church'
  | 'eternity';

export interface TopicVerseReference {
  bookId: string;
  bookNameBn: string;
  chapter: number;
  verse: number;
  textBn: string;
  insightBn: string;
}

export interface StudyTopic {
  id: string;
  titleBn: string;
  titleEn: string;
  category: TopicCategory;
  categoryNameBn: string;
  summaryBn: string;
  historicalContextBn: string;
  scriptureChain: TopicVerseReference[];
  theologicalPoints: string[];
  practicalApplicationBn: string;
}

export interface CharacterEvent {
  titleBn: string;
  reference: string;
  bookId: string;
  chapter: number;
  verse?: number;
  descriptionBn: string;
}

export interface BiblicalCharacter {
  id: string;
  nameBn: string;
  nameEn: string;
  nameMeaningBn: string;
  eraBn: string;
  testament: 'OT' | 'NT';
  biographyBn: string;
  timeline: CharacterEvent[];
  spiritualLessons: string[];
  keyVerses: TopicVerseReference[];
}

export type CrossRefRelationship = 'parallel' | 'fulfillment' | 'prophecy' | 'thematic';

export interface CrossReference {
  id: string;
  sourceVerseKey: string; // e.g. 'JHN.1.1'
  sourceReferenceBn: string;
  targetBookId: string;
  targetBookNameBn: string;
  targetChapter: number;
  targetVerse: number;
  relationship: CrossRefRelationship;
  relationshipNameBn: string;
  explanationBn: string;
}

export interface ReadingPlanDay {
  dayNumber: number;
  titleBn: string;
  passages: {
    bookId: string;
    bookNameBn: string;
    chapter: number;
    verses?: string;
  }[];
  devotionalThoughtBn: string;
}

export interface ReadingPlan {
  id: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  categoryBn: string;
  totalDays: number;
  days: ReadingPlanDay[];
}

export interface UserPlanProgress {
  planId: string;
  completedDays: number[];
  updatedAt: string;
}
