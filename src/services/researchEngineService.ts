// World-Class Bengali Bible Research Engine & Information Retrieval Service
import {
  ResearchQueryResult,
  RankedVerseResult,
  ThematicScriptureCollection,
  TheologicalArticle,
  CharacterResearchProfile,
  HistoricalContextData,
  OriginalWordStudy,
  CrossRefEdge,
  LibraryResource,
  AiResearchBrief,
  AcademicDepthLevel,
} from '../types/researchEngine';
import { BENGALI_VERSES_DB } from '../data/verses';
import { getBookById } from '../data/books';
import {
  matchConceptCluster,
  normalizeBengaliWord,
  stripBengaliSuffix,
  SynonymCluster,
} from '../data/morphologySynonyms';
import { BIBLICAL_LEXICON_DB } from '../data/lexiconData';
import {
  THEOLOGICAL_ARTICLES_DB,
  TOPIC_CLUSTER_TREE,
  HOMILETICAL_THEMES_DB,
} from '../data/theologyArticlesData';
import { HISTORICAL_CONTEXT_DB } from '../data/historicalTimelineData';
import { THEOLOGICAL_LIBRARY_DB } from '../data/theologicalLibraryData';
import {
  RESEARCH_CHARACTERS_DB,
  BIBLE_KNOWLEDGE_GRAPH_DB,
  EXTENDED_CROSS_REFERENCES,
} from '../data/knowledgeGraphData';
import { WorkspaceService } from './workspaceService';

export class ResearchEngineService {
  /**
   * Main Research Engine Query Handler
   * Generates the complete multi-dimensional 8-Section Research Dashboard payload
   */
  public static executeResearch(rawQuery: string): ResearchQueryResult {
    const query = rawQuery.trim();
    const normalizedQuery = normalizeBengaliWord(query);
    const matchedClusters = matchConceptCluster(query);

    // 1. Gather matched concept keys & synonyms
    const matchedConcepts: string[] = [];
    const searchTerms = new Set<string>();

    searchTerms.add(query.toLowerCase());
    searchTerms.add(normalizedQuery);
    searchTerms.add(stripBengaliSuffix(query.toLowerCase()));

    for (const cluster of matchedClusters) {
      matchedConcepts.push(cluster.primaryBn);
      searchTerms.add(cluster.primaryBn.toLowerCase());
      searchTerms.add(cluster.primaryEn.toLowerCase());
      for (const syn of cluster.synonyms) {
        searchTerms.add(syn.toLowerCase());
      }
      for (const exp of cluster.semanticExpansions) {
        searchTerms.add(exp.toLowerCase());
      }
    }

    // SECTION 1: BIBLE
    const rankedVerses = this.rankVerses(Array.from(searchTerms), matchedClusters);
    const parallelReferences = this.getParallelReferences(rankedVerses);
    const thematicCollections = this.buildThematicCollections(rankedVerses, matchedClusters);

    // SECTION 2: STUDY
    const articles = this.filterTheologicalArticles(matchedClusters, query);
    const topicCluster = TOPIC_CLUSTER_TREE;
    const homileticalThemes = HOMILETICAL_THEMES_DB;

    // SECTION 3: PEOPLE
    const characters = this.filterCharacters(matchedClusters, query);
    const networkGraph = characters.flatMap((c) => c.relationalPath);

    // SECTION 4: HISTORY
    const historySection: HistoricalContextData = HISTORICAL_CONTEXT_DB;

    // SECTION 5: WORDS
    const originalWords = this.findOriginalWords(matchedClusters, query);
    const wordFamily = originalWords.flatMap((w) => w.wordFamily);

    // SECTION 6: CROSS REFERENCES
    const directReferences = EXTENDED_CROSS_REFERENCES.filter(
      (cr) => cr.relationType === 'direct'
    );
    const thematicReferences = EXTENDED_CROSS_REFERENCES.filter(
      (cr) => cr.relationType === 'thematic' || cr.relationType === 'parallel_doctrine'
    );
    const prophecyFulfillments = EXTENDED_CROSS_REFERENCES.filter(
      (cr) => cr.relationType === 'prophecy_fulfillment'
    );

    // SECTION 7: LIBRARY
    const libraryResources = this.filterLibraryResources(query);
    const byLevel: Record<AcademicDepthLevel, LibraryResource[]> = {
      beginner: libraryResources.filter((r) => r.academicLevel === 'beginner'),
      intermediate: libraryResources.filter((r) => r.academicLevel === 'intermediate'),
      advanced: libraryResources.filter((r) => r.academicLevel === 'advanced'),
      scholar: libraryResources.filter((r) => r.academicLevel === 'scholar'),
    };

    // SECTION 8: AI RESEARCH COPILOT
    const copilotBrief = this.generateAiCopilotBrief(query, rankedVerses, originalWords);
    const suggestedQueries = [
      'পরিত্রাণ সম্পর্কে বিস্তারিত শাস্ত্রীয় শিক্ষা কী?',
      'পৌল কীভাবে অনুগ্রহ ও বিশ্বাস দ্বারা পরিত্রাণ ব্যাখ্যা করেছেন?',
      'পুরাতন নিয়মে বলিদান কীভাবে খ্রীষ্টের প্রায়শ্চিত্তের পূর্বাভাস ছিল?',
      'পরিত্রাণের আত্মিক নিশ্চয়তা কীভাবে একজন বিশ্বাসীকে সান্ত্বনা দেয়?',
    ];

    return {
      query: query || 'পরিত্রাণ',
      normalizedQuery,
      matchedConcepts,
      bibleSection: {
        rankedVerses,
        parallelReferences,
        thematicCollections,
      },
      studySection: {
        articles,
        topicCluster,
        homileticalThemes,
      },
      peopleSection: {
        characters,
        networkGraph,
      },
      historySection,
      wordsSection: {
        originalWords,
        wordFamily,
      },
      crossRefSection: {
        directReferences,
        thematicReferences,
        prophecyFulfillments,
        knowledgeGraph: BIBLE_KNOWLEDGE_GRAPH_DB,
      },
      librarySection: {
        resources: libraryResources,
        byLevel,
      },
      copilotSection: {
        brief: copilotBrief,
        suggestedQueries,
      },
    };
  }

  /**
   * Multi-factor Verse Relevance Ranking Algorithm
   */
  private static rankVerses(
    searchTerms: string[],
    clusters: SynonymCluster[]
  ): RankedVerseResult[] {
    const results: RankedVerseResult[] = [];

    // Milestone theological key passages that carry high doctrinal weight
    const doctrinalMilestones: Record<string, { weight: number; tag: string; context: string }> = {
      'JHN.3.16': {
        weight: 98,
        tag: 'ঈশ্বরের প্রেম ও অনন্ত জীবন',
        context: 'নিকোদেমের সাথে রাত্রিকালীন কথোপকথনে নতুন জন্ম ও শাশ্বত পরিত্রাণের প্রকাশ।',
      },
      'EPH.2.8': {
        weight: 96,
        tag: 'অনুগ্রহেই বিশ্বাস দ্বারা পরিত্রাণ',
        context: 'পাপে মৃত মানুষকে খ্রীষ্টে জীবন্ত করা এবং কর্মহীন অপ্রাপ্য অনুগ্রহের উপহার।',
      },
      'EPH.2.9': {
        weight: 94,
        tag: 'কর্মহীন পরিত্রাণের প্রমাণ',
        context: 'মানুষের কোনো নিজস্ব অহংকার যেন না থাকে, ঈশ্বরের একমাত্র দান।',
      },
      'ACT.4.12': {
        weight: 95,
        tag: 'পরিত্রাণের একমাত্র অনন্য নাম',
        context: 'মহাসভার সম্মুখে পিতরের নির্ভীক ঘোষণা — যীশু ছাড়া আকাশে আর কোনো নামে পরিত্রাণ নাই।',
      },
      'ROM.10.9': {
        weight: 93,
        tag: 'মুখে স্বীকার ও হৃদয়ে বিশ্বাস',
        context: 'ব্যবস্থার ধার্মিকতার বিপরীতে বিশ্বাসের সুসমাচার — যীশু প্রভু এবং পুনরুত্থিত।',
      },
      'ROM.10.10': {
        weight: 91,
        tag: 'পরিত্রাণের দ্বিবিধ সমর্পণ',
        context: 'ধার্মিকতার জন্য হৃদয়ের বিশ্বাস এবং পরিত্রাণের জন্য মুখের প্রকাশ্য স্বীকারোক্তি।',
      },
      'TIT.3.5': {
        weight: 90,
        tag: 'পবিত্র আত্মার পুনর্জন্ম ও দয়া',
        context: 'ধার্মিকতার কাজের কারণে নয়, বরং ঈশ্বরের অসীম করুণা ও আত্মার নতুন জন্ম।',
      },
      'ROM.5.1': {
        weight: 89,
        tag: 'বিশ্বাসে ধার্মিক গণ্য ও শান্তি',
        context: 'খ্রীষ্টে পাপী নির্দোষ ঘোষিত হওয়ায় ঈশ্বরের সহিত শাশ্বত মেল-মিলাপ।',
      },
      'ROM.5.8': {
        weight: 88,
        tag: 'পাপী অবস্থায় ক্রুশের আত্মবলিদান',
        context: 'মানুষের কোনো যোগ্যতা থাকার পূর্বে খ্রীষ্টের নিঃশর্ত প্রায়শ্চিত্তমূলক প্রেম।',
      },
      'ROM.6.23': {
        weight: 87,
        tag: 'পাপের বেতন বনাম অনুগ্রহ-দান',
        context: 'পাপের অবশ্যম্ভাবী পরিণতি মৃত্যু, কিন্তু খ্রীষ্ট যীশুতে ঈশ্বরের অনন্ত জীবনের দান।',
      },
      'ACT.16.31': {
        weight: 88,
        tag: 'পরিবারের পরিত্রাণের আহ্বান',
        context: 'ফিলিপীর কারাগারে হতাশ কারারক্ষকের প্রতি সহজতম আত্মিক পথনির্দেশ।',
      },
      'PSA.23.1': {
        weight: 85,
        tag: 'উত্তম পালকের সার্বিক যত্ন',
        context: 'দায়ূদের আত্মিক নির্ভরতার পরম প্রকাশ — অভাবহীন শান্তিময় বিশ্রাম।',
      },
      'PRO.3.5': {
        weight: 84,
        tag: 'সমস্ত চিত্তে সদাপ্রভুতে বিশ্বাস',
        context: 'সীমিত মানবীয় বুদ্ধির আত্মতুষ্টি ত্যাগ করে ঈশ্বরের ওপর অটল আস্থা।',
      },
      '1JN.5.13': {
        weight: 86,
        tag: 'পরিত্রাণের নিশ্চিত জ্ঞান',
        context: 'পুত্রতে বিশ্বাসীদের জন্য অনন্ত জীবন বর্তমান সময়ের নিশ্চিত অধিকার।',
      },
    };

    for (const v of BENGALI_VERSES_DB) {
      const book = getBookById(v.bookId);
      if (!book) continue;

      const verseKey = `${v.bookId}.${v.chapter}.${v.verse}`;
      const textLower = v.textBn.toLowerCase();
      const textNorm = normalizeBengaliWord(v.textBn);

      let score = 0;
      const matchedTerms: string[] = [];

      // Check doctrinal milestone boost
      const milestone = doctrinalMilestones[verseKey];
      if (milestone) {
        score = milestone.weight;
        matchedTerms.push(milestone.tag);
      }

      // Check search terms
      for (const term of searchTerms) {
        const termNorm = normalizeBengaliWord(term);
        if (textLower.includes(term) || textNorm.includes(termNorm)) {
          score += 15;
          matchedTerms.push(term);
        }
      }

      if (score > 0) {
        // Cap score at 99 unless absolute 100
        const finalScore = Math.min(score, 99);
        results.push({
          bookId: v.bookId,
          bookNameBn: book.nameBn,
          bookNameEn: book.nameEn,
          chapter: v.chapter,
          verse: v.verse,
          textBn: v.textBn,
          relevanceScore: finalScore,
          testament: book.testament,
          contextPreviewBn:
            milestone?.context ||
            `${book.nameBn} ${v.chapter} অধ্যায়ে বর্ণিত ঈশ্বরের সার্বভৌম প্রকাশ ও সত্য।`,
          theologicalTag: milestone?.tag || clusters[0]?.primaryBn || 'বাইবেলীয় সত্য',
          matchedTerms: Array.from(new Set(matchedTerms)),
        });
      }
    }

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 30);
  }

  /**
   * Generates Thematic Scripture Collections
   */
  private static buildThematicCollections(
    rankedVerses: RankedVerseResult[],
    _clusters: SynonymCluster[]
  ): ThematicScriptureCollection[] {
    const collections: ThematicScriptureCollection[] = [
      {
        id: 'theme-grace',
        titleBn: 'অনুগ্রহ দ্বারা পরিত্রাণ (Salvation by Grace)',
        titleEn: 'Salvation by Grace',
        descriptionBn: 'মানুষের কোনো নিজস্ব ভালো কাজ নয়, একমাত্র ঈশ্বরের অযাচিত কৃপা ও রক্তদানের ভিত্তিতে পরিত্রাণ।',
        verses: rankedVerses.filter(
          (v) =>
            v.textBn.includes('অনুগ্রহ') ||
            v.textBn.includes('দান') ||
            (v.bookId === 'EPH' && v.chapter === 2) ||
            (v.bookId === 'TIT' && v.chapter === 3)
        ),
      },
      {
        id: 'theme-faith',
        titleBn: 'বিশ্বাস ও পরিত্রাণ (Salvation and Faith)',
        titleEn: 'Salvation and Faith',
        descriptionBn: 'যীশু খ্রীষ্টে ব্যক্তিগত আস্থা ও হৃদয়ের সমর্পণের মাধ্যমে ধার্মিক গণ্য হওয়া।',
        verses: rankedVerses.filter(
          (v) =>
            v.textBn.includes('বিশ্বাস') ||
            (v.bookId === 'ROM' && v.chapter === 10) ||
            (v.bookId === 'ACT' && v.chapter === 16)
        ),
      },
      {
        id: 'theme-repentance',
        titleBn: 'অনুতাপ ও ক্ষমা (Salvation & Repentance)',
        titleEn: 'Salvation & Repentance',
        descriptionBn: 'পাপ স্বীকার, মনের আমূল পরিবর্তন এবং পবিত্র ঈশ্বরের সান্নিধ্যে প্রত্যাবর্তন।',
        verses: rankedVerses.filter(
          (v) =>
            v.textBn.includes('পাপ') ||
            v.textBn.includes('ক্ষমা') ||
            (v.bookId === '1JN' && v.chapter === 1) ||
            (v.bookId === 'ROM' && v.chapter === 3)
        ),
      },
      {
        id: 'theme-christ',
        titleBn: 'খ্রীষ্টে পরিত্রাণের পূর্ণতা (Salvation in Christ)',
        titleEn: 'Salvation in Christ Alone',
        descriptionBn: 'যীশু খ্রীষ্ট ব্যতীত আকাশের নিচে আর কোনো পরিত্রাতা বা মধ্যস্থতাকারী নেই।',
        verses: rankedVerses.filter(
          (v) =>
            (v.bookId === 'ACT' && v.chapter === 4) ||
            (v.bookId === 'JHN' && v.chapter === 3) ||
            (v.bookId === 'ROM' && v.chapter === 5)
        ),
      },
      {
        id: 'theme-assurance',
        titleBn: 'পরিত্রাণের আত্মিক নিশ্চয়তা (Assurance of Salvation)',
        titleEn: 'Assurance of Salvation',
        descriptionBn: 'ঈশ্বরের অপরিবর্তনীয় প্রতিজ্ঞা যা বিশ্বাসীকে কোনো ভয় বা অনিশ্চয়তা ছাড়া শান্তি দান করে।',
        verses: rankedVerses.filter(
          (v) =>
            (v.bookId === '1JN' && v.chapter === 5) ||
            (v.bookId === 'ROM' && v.chapter === 8) ||
            v.textBn.includes('অনন্ত জীবন')
        ),
      },
    ];

    // Fallback: If a collection is empty, populate with top ranked verses
    for (const col of collections) {
      if (col.verses.length === 0) {
        col.verses = rankedVerses.slice(0, 3);
      }
    }

    return collections;
  }

  private static getParallelReferences(rankedVerses: RankedVerseResult[]): CrossRefEdge[] {
    const topKeys = new Set(rankedVerses.slice(0, 5).map((v) => `${v.bookNameBn} ${v.chapter}:${v.verse}`));
    return EXTENDED_CROSS_REFERENCES.filter((cr) => topKeys.has(cr.sourceReferenceBn)).slice(0, 6);
  }

  private static filterTheologicalArticles(
    clusters: SynonymCluster[],
    query: string
  ): TheologicalArticle[] {
    const q = query.toLowerCase();
    const filtered = THEOLOGICAL_ARTICLES_DB.filter((art) => {
      return (
        art.titleBn.toLowerCase().includes(q) ||
        art.summaryBn.toLowerCase().includes(q) ||
        clusters.some((c) => art.category === c.conceptKey || art.titleBn.includes(c.primaryBn))
      );
    });

    return filtered.length > 0 ? filtered : THEOLOGICAL_ARTICLES_DB;
  }

  private static filterCharacters(
    clusters: SynonymCluster[],
    query: string
  ): CharacterResearchProfile[] {
    const q = query.toLowerCase();
    const matched = RESEARCH_CHARACTERS_DB.filter((char) => {
      return (
        char.nameBn.toLowerCase().includes(q) ||
        char.nameEn.toLowerCase().includes(q) ||
        char.biographySummaryBn.toLowerCase().includes(q) ||
        char.relationshipToTopicBn.toLowerCase().includes(q) ||
        clusters.some((c) => char.relationshipToTopicBn.includes(c.primaryBn))
      );
    });

    return matched.length > 0 ? matched : RESEARCH_CHARACTERS_DB;
  }

  private static findOriginalWords(
    clusters: SynonymCluster[],
    query: string
  ): OriginalWordStudy[] {
    const q = query.toLowerCase();
    const words = BIBLICAL_LEXICON_DB.filter((word) => {
      return (
        word.meaningBn.toLowerCase().includes(q) ||
        word.transliteration.toLowerCase().includes(q) ||
        word.pronunciationBn.toLowerCase().includes(q) ||
        clusters.some((c) => word.meaningBn.includes(c.primaryBn) || word.rootMeaningBn.includes(c.primaryBn))
      );
    });

    return words.length > 0 ? words : BIBLICAL_LEXICON_DB.slice(0, 4);
  }

  private static filterLibraryResources(query: string): LibraryResource[] {
    const q = query.toLowerCase();
    const matched = THEOLOGICAL_LIBRARY_DB.filter((r) => {
      return (
        r.titleBn.toLowerCase().includes(q) ||
        r.summaryBn.toLowerCase().includes(q) ||
        r.excerptBn.toLowerCase().includes(q) ||
        r.authorBn.toLowerCase().includes(q) ||
        r.keyCitations.some((c) => c.toLowerCase().includes(q))
      );
    });

    // Ensure all 4 levels have resources available
    const levelsPresent = new Set(matched.map((m) => m.academicLevel));
    if (levelsPresent.size < 4) {
      return THEOLOGICAL_LIBRARY_DB;
    }

    return matched;
  }

  /**
   * Synthesizes Structured AI Copilot Research Dossier
   */
  public static generateAiCopilotBrief(
    query: string,
    topVerses: RankedVerseResult[],
    words: OriginalWordStudy[]
  ): AiResearchBrief {
    const displayQuery = query.trim() || 'পরিত্রাণ';

    return {
      query: displayQuery,
      executiveSummaryBn: `শাস্ত্রীয় সাক্ষ্য অনুসারে "${displayQuery}" মানবীয় প্রচেষ্টার কোনো ফল নয়, বরং একমাত্র ঈশ্বরের শাশ্বত সার্বভৌম প্রেম ও অনুগ্রহের প্রকাশ। আদিপুস্তক থেকে প্রকাশিত বাক্য পর্যন্ত ঈশ্বর মানুষকে পাপের বিচার থেকে উদ্ধার করে আপনার সঙ্গে শাশ্বত মিলনে আবদ্ধ করার এক ধারাবাহিক পরিত্রাণ-পরিকল্পনা (Heilsgeschichte) বাস্তবায়ন করেছেন যা যীশু খ্রীষ্টের ক্রুশের আত্মত্যাগে চূড়ান্ত রূপ লাভ করিয়াছে।`,
      keyVersesAnalysis: topVerses.slice(0, 4).map((v) => ({
        referenceBn: `${v.bookNameBn} ${v.chapter}:${v.verse}`,
        textBn: v.textBn,
        exegesisBn: `এই পদে স্পষ্টভাবে দেখা যায় যে ঈশ্বরের অনুগ্রহ এবং বিশ্বাসের মাধ্যমেই ব্যক্তি পাপের অপরাধবোধ ও চিরন্তন ধ্বংস থেকে মুক্ত হয়। কোনো মানবীয় শ্লাঘা বা যোগ্যতা এখানে স্থান পায় না।`,
      })),
      systematicTheologyBn: [
        {
          locus: 'সোটিরিওলজি (Soteriology - পরিত্রাণবিদ্যা)',
          expositionBn:
            'পরিত্রাণ একাধারে অতীত (ধার্মিক গণ্যকরণ বা Justification), বর্তমান (পবিত্র আত্মার কার্য বা Sanctification) এবং ভবিষ্যৎ (পুনরুত্থান ও মহিমাকরণ বা Glorification)।',
        },
        {
          locus: 'খ্রীষ্টতত্ত্ব (Christology - খ্রীষ্টের অনন্য কাজ)',
          expositionBn:
            'যীশু খ্রীষ্ট পূর্ণ ঈশ্বর এবং পূর্ণ মানব হিসেবে আমাদের পাপের জন্য নিখুঁত প্রায়শ্চিত্ত (Substitutionary Atonement) সম্পন্ন করেছেন; তিনি ব্যতীত দ্বিতীয় কোনো পরিত্রাতা নেই।',
        },
        {
          locus: 'পবিত্র আত্মাতত্ত্ব (Pneumatology - পুনর্জন্ম)',
          expositionBn:
            'পবিত্র আত্মা ব্যক্তির অন্তরে পাপের চেতনা দেন, যীশুর ক্রুশের সত্য উন্মোচন করেন এবং হৃদয়ে নতুন জীবনের জন্ম দেন।',
        },
      ],
      historicalContextBn:
        'প্রথম শতাব্দীতে রোমান সাম্রাজ্যের অহংকার এবং তৎকালীন কঠোর যিহূদী রীতিনীতির প্রেক্ষাপটে পৌল ও প্রেরিতগণ নির্ভীকভাবে প্রচার করেছিলেন যে পরিত্রাণ কোনো বিশেষ রক্তের সম্পর্ক বা রোমান নাগরিকত্বের ওপর নয়, বরং খ্রীষ্টে বিশ্বাসের দ্বারা সর্বজাতির জন্য উন্মুক্ত।',
      originalLanguageExegesisBn: words.slice(0, 3).map((w) => ({
        word: `${w.originalLemma} (${w.strongNumber})`,
        language: w.language,
        meaningBn: w.meaningBn,
        insightBn: `শব্দটির মূল ধাতু নির্দেশ করে যে এটি কেবল মানসিক কোনো সান্ত্বনা নয়, বরং বিপদ ও ধ্বংসের কারাগার থেকে উন্মুক্ত প্রশস্ত স্থানে এনে চিরন্তন নিরাপত্তা দান।`,
      })),
      homileticalAndPastoralApplicationBn: {
        preachingAngleBn:
          'মণ্ডলীর প্রচারকদের উচিত মানুষকে নিজস্ব আত্মধার্মিকতার ভ্রান্তি থেকে মুক্ত করে কালভারীর ক্রুশের সম্পূর্ণ কাজের ওপর নির্ভর করতে আহ্বান জানানো।',
        counselingGuidanceBn:
          'যাঁরা অপরাধবোধ, অতীত ভুলের অনুশোচনা বা ভবিষ্যৎ অনিশ্চয়তায় ভুগছেন, তাঁদের রোমীয় ৮:১ এবং যোহন ১০:২৮ পদের আলোকে প্রভুর হাতের চিরন্তন নিরাপত্তার সান্ত্বনা দিন।',
        personalLifeApplicationBn:
          'দৈনন্দিন জীবনে ঈশ্বরের অনুগ্রহের মূল্য হৃদয়ে ধারণ করে পাপের প্রতি ঘৃণা এবং কৃতজ্ঞচিত্তে পরোপকার ও ভালোবাসার জীবনযাপন করুন।',
      },
    };
  }

  /**
   * 1-Click Save to "আমার স্টাডি" (My Study) Workspace
   */
  public static saveResearchDossierToWorkspace(
    brief: AiResearchBrief,
    projectName?: string
  ): string {
    const title = projectName || `${brief.query} — বাইবেলীয় গবেষণা ডসিয়ার`;
    const description = brief.executiveSummaryBn.slice(0, 160) + '...';

    const newProject = WorkspaceService.createProject({
      titleBn: title,
      descriptionBn: description,
      category: 'theology',
      categoryNameBn: 'পদ্ধতিগত ধর্মতত্ত্ব',
      tags: ['গবেষণা', 'ধর্মতত্ত্ব', brief.query],
    });

    // Attach scripture proofs into project
    for (const v of brief.keyVersesAnalysis) {
      WorkspaceService.addVerseToProject(newProject.id, {
        bookId: 'REF',
        bookNameBn: v.referenceBn,
        chapter: 1,
        verse: 1,
        verseText: v.textBn,
        reflectionBn: v.exegesisBn,
      });
    }

    // Attach theological note
    const fullContent = `
# ${brief.query} — এআই বাইবেল গবেষণা ডসিয়ার

## কার্যনির্বাহী সারসংক্ষেপ
${brief.executiveSummaryBn}

## পদ্ধতিগত ধর্মতত্ত্ব
${brief.systematicTheologyBn.map((s) => `### ${s.locus}\n${s.expositionBn}`).join('\n\n')}

## মূল ভাষার বিশ্লেষণ
${brief.originalLanguageExegesisBn.map((o) => `* **${o.word}** (${o.language}): ${o.meaningBn}\n  _${o.insightBn}_`).join('\n')}

## পালকীয় ও ব্যবহারিক প্রয়োগ
* **প্রচার রূপরেখা:** ${brief.homileticalAndPastoralApplicationBn.preachingAngleBn}
* **কাউন্সেলিং নির্দেশনা:** ${brief.homileticalAndPastoralApplicationBn.counselingGuidanceBn}
* **ব্যক্তিগত জীবন:** ${brief.homileticalAndPastoralApplicationBn.personalLifeApplicationBn}
`;

    WorkspaceService.addNoteToProject(newProject.id, 'গবেষণা সারসংক্ষেপ ও ডকট্রিন নোট', fullContent);

    return newProject.id;
  }
}
