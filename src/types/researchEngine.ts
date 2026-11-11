// Types for the World-Class Bengali Bible Research Engine & Knowledge Platform

export type ResearchSectionId =
  | 'bible'
  | 'study'
  | 'people'
  | 'history'
  | 'words'
  | 'cross_refs'
  | 'library'
  | 'copilot';

export interface RankedVerseResult {
  bookId: string;
  bookNameBn: string;
  bookNameEn: string;
  chapter: number;
  verse: number;
  textBn: string;
  relevanceScore: number; // 0 to 100
  testament: 'OT' | 'NT';
  contextPreviewBn: string;
  theologicalTag?: string;
  matchedTerms?: string[];
}

export interface ThematicScriptureCollection {
  id: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  verses: RankedVerseResult[];
}

export interface TheologicalArticle {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'salvation' | 'god' | 'christology' | 'pneumatology' | 'covenant' | 'christian_life';
  categoryNameBn: string;
  authorBn?: string;
  readingTimeMin: number;
  summaryBn: string;
  contentBn: string;
  keyTheses: string[];
  scriptureProofs: {
    referenceBn: string;
    textBn: string;
    theologicalNoteBn: string;
  }[];
  homileticalOutlines?: {
    titleBn: string;
    targetAudience: string;
    mainPoints: string[];
  }[];
}

export interface TopicClusterNode {
  id: string;
  labelBn: string;
  labelEn: string;
  descriptionBn?: string;
  strongsNumber?: string;
  children?: TopicClusterNode[];
}

export interface CharacterResearchProfile {
  id: string;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  eraBn: string;
  testament: 'OT' | 'NT';
  biographySummaryBn: string;
  relationshipToTopicBn: string;
  keyPassages: {
    referenceBn: string;
    bookId: string;
    chapter: number;
    verse: number;
    summaryBn: string;
  }[];
  spiritualLessons: string[];
  relationalPath: {
    person: string;
    event: string;
    doctrine: string;
    passage: string;
  }[];
}

export type BiblicalEra =
  | 'old_testament'
  | 'intertestamental'
  | 'jesus_ministry'
  | 'apostolic_acts'
  | 'early_church';

export interface BiblicalTimelineEvent {
  id: string;
  era: BiblicalEra;
  eraNameBn: string;
  approxDateBn: string;
  titleBn: string;
  descriptionBn: string;
  keyReferencesBn: string[];
  historicalImpactBn: string;
}

export interface ArchaeologicalNote {
  id: string;
  titleBn: string;
  locationBn: string;
  discoveryDateBn: string;
  significanceBn: string;
  biblicalCorrelationBn: string;
}

export interface HistoricalContextData {
  eraSummaryBn: string;
  jewishUnderstandingBn: string;
  secondTempleBeliefsBn: string;
  grecoRomanContextBn: string;
  messianicExpectationsBn: string;
  timeline: BiblicalTimelineEvent[];
  archaeologicalNotes: ArchaeologicalNote[];
}

export type BiblicalLanguage = 'Hebrew' | 'Greek' | 'Aramaic';

export interface OriginalWordStudy {
  strongNumber: string; // e.g. H3444, G4991
  language: BiblicalLanguage;
  originalLemma: string; // e.g. יְשׁוּעָה or σωτηρία
  transliteration: string; // e.g. yeshu'ah, soteria
  pronunciationBn: string; // e.g. ইয়েশুয়া, সোতেরিয়া
  partOfSpeechBn: string;
  rootWord: string;
  rootMeaningBn: string;
  meaningBn: string;
  semanticRange: string[]; // Nuanced shades of meaning
  usageCount: {
    total: number;
    oldTestament?: number;
    newTestament?: number;
  };
  firstOccurrence: {
    referenceBn: string;
    textBn: string;
  };
  wordFamily: {
    term: string;
    meaningBn: string;
    strongNumber?: string;
  }[];
  keyOccurrences: {
    referenceBn: string;
    bookId: string;
    chapter: number;
    verse: number;
    snippetBn: string;
  }[];
}

export interface CrossRefEdge {
  id: string;
  sourceReferenceBn: string;
  targetReferenceBn: string;
  targetBookId: string;
  targetChapter: number;
  targetVerse: number;
  targetTextBn: string;
  relationType: 'direct' | 'thematic' | 'prophecy_fulfillment' | 'narrative' | 'parallel_doctrine';
  relationTypeNameBn: string;
  explanationBn: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'concept' | 'verse' | 'person' | 'doctrine' | 'original_word' | 'event';
  descriptionBn?: string;
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  labelBn: string;
  type: 'explains' | 'fulfills' | 'mentions' | 'supports' | 'contrasts' | 'connects';
}

export interface BibleKnowledgeGraph {
  nodes: KnowledgeGraphNode[];
  links: KnowledgeGraphLink[];
}

export type AcademicDepthLevel = 'beginner' | 'intermediate' | 'advanced' | 'scholar';

export interface LibraryResource {
  id: string;
  titleBn: string;
  titleEn: string;
  authorBn: string;
  academicLevel: AcademicDepthLevel;
  academicLevelNameBn: string;
  resourceType: 'dictionary' | 'encyclopedia' | 'commentary' | 'handbook' | 'academic_paper';
  resourceTypeNameBn: string;
  readingTimeMin: number;
  historicalEraBn?: string;
  summaryBn: string;
  excerptBn: string;
  keyCitations: string[];
}

export interface AiResearchBrief {
  query: string;
  executiveSummaryBn: string;
  keyVersesAnalysis: {
    referenceBn: string;
    textBn: string;
    exegesisBn: string;
  }[];
  systematicTheologyBn: {
    locus: string;
    expositionBn: string;
  }[];
  historicalContextBn: string;
  originalLanguageExegesisBn: {
    word: string;
    language: string;
    meaningBn: string;
    insightBn: string;
  }[];
  homileticalAndPastoralApplicationBn: {
    preachingAngleBn: string;
    counselingGuidanceBn: string;
    personalLifeApplicationBn: string;
  };
}

export interface ResearchQueryResult {
  query: string;
  normalizedQuery: string;
  matchedConcepts: string[];
  
  // Section 1: BIBLE
  bibleSection: {
    rankedVerses: RankedVerseResult[];
    parallelReferences: CrossRefEdge[];
    thematicCollections: ThematicScriptureCollection[];
  };

  // Section 2: STUDY
  studySection: {
    articles: TheologicalArticle[];
    topicCluster: TopicClusterNode;
    homileticalThemes: {
      sermonOutlines: { titleBn: string; points: string[]; passages: string[] }[];
      smallGroupGuides: { topicBn: string; questions: string[] }[];
      counselingTopics: { situationBn: string; biblicalCureBn: string; passages: string[] }[];
    };
  };

  // Section 3: PEOPLE
  peopleSection: {
    characters: CharacterResearchProfile[];
    networkGraph: {
      person: string;
      event: string;
      doctrine: string;
      passage: string;
    }[];
  };

  // Section 4: HISTORY
  historySection: HistoricalContextData;

  // Section 5: WORDS
  wordsSection: {
    originalWords: OriginalWordStudy[];
    wordFamily: { term: string; meaningBn: string; strongNumber?: string }[];
  };

  // Section 6: CROSS REFERENCES
  crossRefSection: {
    directReferences: CrossRefEdge[];
    thematicReferences: CrossRefEdge[];
    prophecyFulfillments: CrossRefEdge[];
    knowledgeGraph: BibleKnowledgeGraph;
  };

  // Section 7: LIBRARY
  librarySection: {
    resources: LibraryResource[];
    byLevel: Record<AcademicDepthLevel, LibraryResource[]>;
  };

  // Section 8: AI RESEARCH COPILOT
  copilotSection: {
    brief: AiResearchBrief;
    suggestedQueries: string[];
  };
}
