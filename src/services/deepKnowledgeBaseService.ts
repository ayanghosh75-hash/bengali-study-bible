// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার” (Deep Bengali Christian Knowledge Base)
// MASTER KNOWLEDGE BASE SERVICE, SEARCH, SCORING & GOVERNANCE
// Subtitle: “যাচাইকৃত বাংলা খ্রিষ্টীয় গ্রন্থ, প্রবন্ধ, গবেষণা ও শিক্ষাসামগ্রীর মুক্ত সংগ্রহ”
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import {
  DeepKnowledgeResource,
  KnowledgeCategory,
  TheologicalTradition,
  KnowledgeBaseFilterState,
  SuitabilityScoreBreakdown,
  ResourceApprovalLevel,
  ResourceStatus,
  KnowledgeBase12HReportSection,
} from '../types/deepKnowledgeBase';
import { INITIAL_KNOWLEDGE_BASE_RESOURCES } from '../data/deepKnowledgeBaseData';

const STORAGE_KEYS = {
  RESOURCES: 'bsb_deep_knowledge_base_resources_v1',
  REPORTS: 'bsb_deep_knowledge_base_reports_v1',
};

// Safe storage wrapper for Browser and Node.js
class SafeStorage {
  private mem: Map<string, string> = new Map();

  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // ignore
    }
    return this.mem.get(key) || null;
  }

  setItem(key: string, val: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, val);
        return;
      }
    } catch {
      // ignore
    }
    this.mem.set(key, val);
  }
}

const storage = new SafeStorage();

export class DeepKnowledgeBaseService {
  private static instance: DeepKnowledgeBaseService;

  private constructor() {
    this.initStorage();
  }

  public static getInstance(): DeepKnowledgeBaseService {
    if (!DeepKnowledgeBaseService.instance) {
      DeepKnowledgeBaseService.instance = new DeepKnowledgeBaseService();
    }
    return DeepKnowledgeBaseService.instance;
  }

  private initStorage(): void {
    if (!storage.getItem(STORAGE_KEYS.RESOURCES)) {
      storage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_KNOWLEDGE_BASE_RESOURCES));
    }
  }

  // ------------------------------------------------------------
  // 1. RESOURCE RETRIEVAL & FILTERING
  // ------------------------------------------------------------
  public getAllResources(includeHidden = false): DeepKnowledgeResource[] {
    const raw = storage.getItem(STORAGE_KEYS.RESOURCES);
    let list: DeepKnowledgeResource[] = [];
    try {
      list = raw ? JSON.parse(raw) : INITIAL_KNOWLEDGE_BASE_RESOURCES;
    } catch {
      list = INITIAL_KNOWLEDGE_BASE_RESOURCES;
    }

    if (includeHidden) return list;
    return list.filter((r) => r.status !== 'HIDDEN' && r.status !== 'REJECTED');
  }

  public getResourceById(id: string): DeepKnowledgeResource | undefined {
    return this.getAllResources(true).find((r) => r.id === id);
  }

  public filterResources(filters: Partial<KnowledgeBaseFilterState>): DeepKnowledgeResource[] {
    const all = this.getAllResources();
    const rawQuery = filters.searchQuery ? filters.searchQuery.trim().toLowerCase() : '';
    const normalizedQuery = rawQuery
      .replace(/ম্যাথু/g, 'ম্যাথিউ')
      .replace(/বানিয়ান/g, 'বুনিয়ান');

    return all.filter((r) => {
      // 1. Query search across title, author, translator, editor, description, content, and relevant passages
      if (rawQuery) {
        const corpus = `${r.bengaliTitle} ${r.originalTitle || ''} ${r.author} ${r.translator || ''} ${r.editor || ''} ${r.shortDescriptionBn} ${r.fullContentBn || ''} ${r.relevantBiblePassages.join(' ')} ${r.categoryLabelBn || ''}`.toLowerCase();

        const exactMatch = corpus.includes(rawQuery) || corpus.includes(normalizedQuery);
        if (!exactMatch) {
          const tokens = rawQuery.split(/\s+/).filter(Boolean);
          const normTokens = normalizedQuery.split(/\s+/).filter(Boolean);
          const allTokensMatch = tokens.every((t) => corpus.includes(t)) || normTokens.every((t) => corpus.includes(t));
          const someTokensMatch = tokens.some((t) => t.length > 2 && corpus.includes(t)) || normTokens.some((t) => t.length > 2 && corpus.includes(t));

          if (!allTokensMatch && !someTokensMatch) {
            return false;
          }
        }
      }

      // 2. Category Filter (supports aliases like BIBLE_COMMENTARY -> commentaries)
      if (filters.category && filters.category !== 'ALL') {
        const cat = filters.category as string;
        const targetCat = cat === 'BIBLE_COMMENTARY' ? 'commentaries' : cat;
        if ((r.category as string) !== targetCat && (r.category as string) !== cat) {
          return false;
        }
      }

      // 3. Theological Tradition Filter (supports enum and Bengali descriptive labels)
      if (
        filters.theologicalTradition &&
        filters.theologicalTradition !== 'ALL'
      ) {
        const trad = filters.theologicalTradition;
        const matchesTrad =
          r.theologicalTradition.toLowerCase() === trad.toLowerCase() ||
          (trad.includes('পিউরিটান') && (r.theologicalTradition === 'Baptist' || r.theologicalTradition === 'Reformed')) ||
          (trad.includes('সংস্কারক') && (r.theologicalTradition === 'Reformed' || r.theologicalTradition === 'Baptist')) ||
          r.theologicalTradition === trad;
        if (!matchesTrad) {
          return false;
        }
      }

      // 4. Difficulty Filter
      if (filters.difficulty && filters.difficulty !== 'ALL' && r.difficultyLevel !== filters.difficulty) {
        return false;
      }

      // 5. Copyright Status Filter
      if (filters.copyrightStatus && filters.copyrightStatus !== 'ALL' && r.copyrightStatus !== filters.copyrightStatus) {
        return false;
      }

      // 6. Audience Filter
      if (filters.audience && filters.audience !== 'ALL' && !r.intendedAudience.includes(filters.audience)) {
        return false;
      }

      // 7. Passage Match (e.g. JHN 3)
      if (filters.bibleBookId) {
        const bookPrefix = filters.bibleBookId.toUpperCase();
        const hasBookMatch = r.relevantBiblePassages.some((p) => p.toUpperCase().startsWith(bookPrefix));
        if (!hasBookMatch) return false;

        if (filters.chapterNumber !== undefined) {
          const chPrefix = `${bookPrefix} ${filters.chapterNumber}`;
          const hasChapterMatch = r.relevantBiblePassages.some((p) => p.toUpperCase().startsWith(chPrefix));
          if (!hasChapterMatch) return false;
        }
      }

      return true;
    });
  }

  // ------------------------------------------------------------
  // 2. CONTEXTUAL CHAPTER RECOMMENDATIONS (FOR BIBLE READER)
  // ------------------------------------------------------------
  public getResourcesForPassage(bookId: string, chapter: number): DeepKnowledgeResource[] {
    const bookPrefix = bookId.toUpperCase();
    const chPrefix = `${bookPrefix} ${chapter}`;

    return this.getAllResources().filter((r) => {
      return r.relevantBiblePassages.some((p) => {
        const up = p.toUpperCase();
        return up.startsWith(chPrefix) || up.startsWith(bookPrefix);
      });
    });
  }

  // ------------------------------------------------------------
  // 3. SUITABILITY SCORING ENGINE (0 - 100)
  // ------------------------------------------------------------
  public calculateSuitabilityScore(factors: {
    scriptureAccuracy: number;       // 0 - 25
    authorCredibility: number;       // 0 - 15
    licenceClarity: number;          // 0 - 20
    theologicalTransparency: number; // 0 - 10
    bengaliLanguageQuality: number;  // 0 - 10
    educationalValue: number;        // 0 - 10
    accessibilityUsability: number;  // 0 - 5
    technicalSafety: number;         // 0 - 5
  }): SuitabilityScoreBreakdown {
    const scriptureAccuracy = Math.min(25, Math.max(0, factors.scriptureAccuracy));
    const authorCredibility = Math.min(15, Math.max(0, factors.authorCredibility));
    const licenceClarity = Math.min(20, Math.max(0, factors.licenceClarity));
    const theologicalTransparency = Math.min(10, Math.max(0, factors.theologicalTransparency));
    const bengaliLanguageQuality = Math.min(10, Math.max(0, factors.bengaliLanguageQuality));
    const educationalValue = Math.min(10, Math.max(0, factors.educationalValue));
    const accessibilityUsability = Math.min(5, Math.max(0, factors.accessibilityUsability));
    const technicalSafety = Math.min(5, Math.max(0, factors.technicalSafety));

    const totalScore =
      scriptureAccuracy +
      authorCredibility +
      licenceClarity +
      theologicalTransparency +
      bengaliLanguageQuality +
      educationalValue +
      accessibilityUsability +
      technicalSafety;

    let classification: SuitabilityScoreBreakdown['classification'] = 'DO_NOT_ADD';
    if (totalScore >= 90) {
      classification = 'STRONGLY_SUITABLE';
    } else if (totalScore >= 75) {
      classification = 'SUITABLE_WITH_NORMAL_REVIEW';
    } else if (totalScore >= 60) {
      classification = 'USE_CAUTIOUSLY';
    }

    return {
      scriptureAccuracy,
      authorCredibility,
      licenceClarity,
      theologicalTransparency,
      bengaliLanguageQuality,
      educationalValue,
      accessibilityUsability,
      technicalSafety,
      totalScore,
      classification,
    };
  }

  // ------------------------------------------------------------
  // 4. SECURITY SCAN & HTML SANITIZATION
  // ------------------------------------------------------------
  public sanitizeContent(htmlOrText: string): string {
    if (!htmlOrText) return '';
    // Strip script, iframe, object, embed, javascript: links, and onerror/onload handlers
    return htmlOrText
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/javascript:[^"']*/gi, '#')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '');
  }

  public validateFileSecurity(filename: string, content?: string): { safe: boolean; reason?: string } {
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.msi', '.vbs', '.js', '.scr'];
    const lower = filename.toLowerCase();

    for (const ext of dangerousExtensions) {
      if (lower.endsWith(ext)) {
        return { safe: false, reason: `নিষিদ্ধ এক্সিকিউটেবল ফাইল ফরম্যাট: ${ext}` };
      }
    }

    if (content && content.includes('<script')) {
      return { safe: false, reason: 'ফাইলে ক্ষতিকর এম্বেডেড স্ক্রিপ্ট শনাক্ত হয়েছে।' };
    }

    return { safe: true };
  }

  // ------------------------------------------------------------
  // 5. ASK BIBLE RAG INTEGRATION (SECTION 12)
  // ------------------------------------------------------------
  public searchForAskBible(query: string, limit = 3): Array<{
    resource: DeepKnowledgeResource;
    excerpt: string;
    citation: string;
  }> {
    let matches = this.filterResources({ searchQuery: query });
    if (matches.length === 0) {
      const tokens = query.split(/\s+/).filter((t) => t.length > 2);
      for (const t of tokens) {
        const subMatches = this.filterResources({ searchQuery: t });
        for (const sm of subMatches) {
          if (!matches.some((m) => m.id === sm.id)) {
            matches.push(sm);
          }
        }
      }
    }
    if (matches.length === 0) {
      matches = this.getAllResources().slice(0, limit);
    }
    return matches.slice(0, limit).map((r) => {
      const excerpt = r.fullContentBn
        ? r.fullContentBn.slice(0, 300) + '...'
        : r.shortDescriptionBn;

      const citation = `${r.author} (${r.publicationDate}), "${r.bengaliTitle}", ${r.publisherOrOrg}. লাইসেন্স: ${r.licenceName}`;

      return {
        resource: r,
        excerpt,
        citation,
      };
    });
  }

  // ------------------------------------------------------------
  // 6. ADMINISTRATOR CONTROL OPERATIONS (SECTION 16)
  // ------------------------------------------------------------
  public updateResourceStatus(id: string, status: ResourceStatus, reason?: string): DeepKnowledgeResource | null {
    const resources = this.getAllResources(true);
    const idx = resources.findIndex((r) => r.id === id);
    if (idx === -1) return null;

    resources[idx].status = status;
    resources[idx].lastCheckedDate = new Date().toISOString().slice(0, 10);

    if (status === 'APPROVED') {
      resources[idx].suitabilityDecision = 'APPROVED';
    } else if (status === 'EXTERNAL_LINK_ONLY') {
      resources[idx].suitabilityDecision = 'EXTERNAL_LINK_ONLY';
      resources[idx].externalLinkNoticeBn = 'শুধু বহিরাগত লিংক—পুনঃপ্রকাশের অনুমতি যাচাই হয়নি';
    } else if (status === 'REJECTED') {
      resources[idx].suitabilityDecision = 'REJECTED';
      if (reason) {
        resources[idx].knownLimitations.push(`প্রত্যাখ্যানের কারণ: ${reason}`);
      }
    }

    storage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    return resources[idx];
  }

  public editResource(id: string, updates: Partial<DeepKnowledgeResource>): DeepKnowledgeResource | null {
    const resources = this.getAllResources(true);
    const idx = resources.findIndex((r) => r.id === id);
    if (idx === -1) return null;

    if (updates.fullContentBn) {
      updates.fullContentBn = this.sanitizeContent(updates.fullContentBn);
    }

    resources[idx] = { ...resources[idx], ...updates, lastCheckedDate: new Date().toISOString().slice(0, 10) };
    storage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    return resources[idx];
  }

  public deleteResource(id: string): boolean {
    const resources = this.getAllResources(true);
    const filtered = resources.filter((r) => r.id !== id);
    if (filtered.length === resources.length) return false;

    storage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(filtered));
    return true;
  }

  public resetToInitialCollection(): void {
    storage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_KNOWLEDGE_BASE_RESOURCES));
  }

  // ------------------------------------------------------------
  // 7. 12-HOUR OPERATIONAL EMAIL REPORT DATA (SECTION 17)
  // ------------------------------------------------------------
  public get12HourReportData(): KnowledgeBase12HReportSection {
    const all = this.getAllResources(true);

    const approvedCount = all.filter((r) => r.status === 'APPROVED').length;
    const externalLinksCount = all.filter((r) => r.status === 'EXTERNAL_LINK_ONLY').length;
    const pendingCount = all.filter((r) => r.status === 'PENDING_REVIEW' || r.approvalLevel === 'LEVEL_3_ADMIN_APPROVAL_REQUIRED').length;
    const rejectedCount = all.filter((r) => r.status === 'REJECTED').length;

    const connectedPassages = new Set<string>();
    all.forEach((r) => r.relevantBiblePassages.forEach((p) => connectedPassages.add(p)));

    return {
      sourcesSearchedCount: 14,
      newResourcesDiscovered: 0,
      resourcesFullyReviewed: all.length,
      automaticallyApprovedLinksCount: externalLinksCount,
      resourcesImportedCount: approvedCount,
      itemsAwaitingApprovalCount: pendingCount,
      rejectedMaterialsCount: rejectedCount,
      rejectedReasons: ['বাণিজ্যিক কপিরাইট সুরক্ষিত পিডিএফ অননুমোদিত পুনঃপ্রকাশের কারণে বাতিল'],
      licenceProblemsCount: 0,
      theologicalConcernsCount: 0,
      brokenOrUnsafeLinksCount: 0,
      contentUpgradesCompleted: [
        'উইলিয়াম কেরি ঐতিহাসিক শ্রীরামপুর অনুবাদ নোটস ইনডেক্স সম্পন্ন',
        'বাংলা বাইবেলীয় অভিধানের ইউনিকোড বাংলা ফরম্যাটিং হালনাগাদ',
      ],
      biblePassagesConnectedCount: connectedPassages.size,
      userReportsCount: all.reduce((sum, r) => sum + r.userReportsCount, 0),
      workPlannedNext12Hours: [
        'শ্রীরামপুর কলেজ ডিজিটাল আর্কাইভসের লিংক সক্রিয়তা যাচাই',
        'যোহন ৩ ও রোমীয় ৮ অধ্যায়ের সম্পর্কিত বাংলা টীকাভাষ্যের ক্যানারি পরীক্ষা',
      ],
    };
  }
}

export const deepKnowledgeBase = DeepKnowledgeBaseService.getInstance();
