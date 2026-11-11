// TypeScript definitions for 🤖 Ask Bible (Grounded AI Theological Research Assistant)

export type RetrievalStepStatus = 'retrieved' | 'analyzed' | 'synthesized';

export interface RetrievalPipelineStep {
  stepNumber: number;
  stepNameBn: string;
  stepNameEn: string;
  status: RetrievalStepStatus;
  summaryBn: string;
  itemsCount?: number;
  durationMs?: number;
}

export interface ScriptureQuote {
  reference: string;
  bookId: string;
  chapter: number;
  verse: number;
  textBn: string;
  highlightText?: string;
  contextNoteBn?: string;
}

export interface HistoricalContext {
  authorDateBn: string;
  historicalAudienceBn: string;
  geographicalSettingBn: string;
  literaryGenreStructureBn: string;
  socioPoliticalBackgroundBn: string; // Roman imperial rule, Jewish Second Temple background
}

export interface ExpositionSection {
  verseRange: string;
  titleBn: string;
  summaryBn: string;
  analysisBn: string;
  keyDoctrinalTruths: string[];
}

export interface TheologicalPerspective {
  perspectiveNameBn: string;
  traditionBn: string; // e.g., 'রিফর্মড / ক্যালভিনিস্ট', 'আর্মিনিয়ান / ওয়েসলিয়ান', 'আদি প্যাট্রিস্টিক / চার্চ ফাদার্স'
  coreArgumentBn: string;
  scriptureBasis: string[];
}

export interface LexicalSource {
  strongs: string;
  originalWord: string;
  language: 'Greek' | 'Hebrew' | 'Aramaic';
  transliteration: string;
  pronunciationBn: string;
  meaningBn: string;
  contextUsageBn: string;
}

export interface ScholarlyCitation {
  authorBn: string;
  workBn: string;
  eraOrYear: string;
  theologicalContributionBn: string;
}

export interface RelatedCharacter {
  nameBn: string;
  nameEn: string;
  roleBn: string;
  connectionToTopicBn: string;
  keyPassages: string[];
  keySpiritualLessonsBn: string;
}

export interface CrossReferenceItem {
  ref: string;
  testament: 'OT' | 'NT';
  typeBn: 'সরাসরি সমান্তরাল' | 'ভাববাণী ও পূর্ণতা' | 'ধর্মতাত্ত্বিক যোগসূত্র' | 'বাস্তব দৃষ্টান্ত';
  textBn?: string;
  relevanceBn: string;
}

export interface FurtherStudyRecommendations {
  relatedTopics: { titleBn: string; query: string }[];
  relatedChapters: { ref: string; descriptionBn: string }[];
  relatedCharacters: { nameBn: string; roleBn: string }[];
  relatedWordStudies: { term: string; strongs: string }[];
  relatedArticles: { titleBn: string; readingTimeBn: string }[];
}

export interface ConfidenceRating {
  level: 'high' | 'medium' | 'low';
  scorePercent: number;
  labelBn: 'উচ্চ আস্থা' | 'মাঝারি আস্থা' | 'সীমিত সাক্ষ্য / বিতর্কিত';
  explanationBn: string;
}

export interface DeepResearchDossier {
  isEnabled: boolean;
  topicOverviewBn: string;
  historicalDevelopmentBn: string;
  scholarlyDiscussionBn: string;
  biblicalBibliography: string[];
  sevenDayStudyPlan: { day: string; passage: string; focusBn: string }[];
}

export interface AskBibleResponse {
  id: string;
  query: string;
  questionType: 'bible' | 'character' | 'theology' | 'historical' | 'word_study' | 'comparative' | 'practical' | 'research';
  titleBn: string;
  subtitleBn: string;
  targetPassage?: {
    bookId: string;
    bookNameBn: string;
    chapter: number;
    versesLabel?: string;
  };
  theologicalCategory: string;
  confidence: ConfidenceRating;
  retrievalPipeline: RetrievalPipelineStep[];
  
  // The Mandatory Response Sections
  directScripture: {
    headingBn: string;
    summaryBn: string;
    verses: ScriptureQuote[];
    keyObservationsBn: string[];
  };
  context: HistoricalContext;
  exposition: {
    coreThesisBn: string;
    structuralOutline: ExpositionSection[];
    pastoralApplicationBn: string;
  };
  originalWords: LexicalSource[];
  crossReferences: CrossReferenceItem[];
  relatedCharacters: RelatedCharacter[];
  theologicalPerspectives: {
    dialogueTopicBn: string;
    perspectives: TheologicalPerspective[];
    unifyingConsensusBn: string;
  };
  researchSources: {
    lexicalTerms: LexicalSource[];
    crossReferences: { ref: string; relevanceBn: string; testament: 'OT' | 'NT' }[];
    scholarlyCitations: ScholarlyCitation[];
    primaryBibleEditions: string[];
  };
  furtherStudy: FurtherStudyRecommendations;
  deepResearch?: DeepResearchDossier;

  suggestedFollowUps: string[];
  generatedAt: string;
  executionTimeMs: number;
}

export interface CuratedDossier {
  id: string;
  query: string;
  titleBn: string;
  subtitleBn: string;
  theologicalCategory: string;
  targetPassage?: {
    bookId: string;
    bookNameBn: string;
    chapter: number;
    versesLabel?: string;
  };
  retrievalPipeline: RetrievalPipelineStep[];
  directScripture: {
    headingBn: string;
    summaryBn: string;
    verses: ScriptureQuote[];
    keyObservationsBn: string[];
  };
  context: HistoricalContext;
  exposition: {
    coreThesisBn: string;
    structuralOutline: ExpositionSection[];
    pastoralApplicationBn: string;
  };
  theologicalPerspectives: {
    dialogueTopicBn: string;
    perspectives: TheologicalPerspective[];
    unifyingConsensusBn: string;
  };
  researchSources: {
    lexicalTerms: LexicalSource[];
    crossReferences: { ref: string; relevanceBn: string; testament: 'OT' | 'NT' }[];
    scholarlyCitations: ScholarlyCitation[];
    primaryBibleEditions: string[];
  };
  suggestedFollowUps: string[];
}
