// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// COMMUNITY RESEARCH & PRODUCT INSIGHTS SERVICE
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import {
  CommunityQuestion,
  ProductInsight,
  InsightCategory,
} from '../../types/social';
import {
  SEED_COMMUNITY_QUESTIONS,
  SEED_PRODUCT_INSIGHTS,
  INSIGHT_CATEGORIES,
} from '../../data/social/socialCategoriesData';

const QUESTIONS_KEY = 'bsb_community_questions_v1';
const INSIGHTS_KEY = 'bsb_product_insights_v1';

export class CommunityResearchService {
  /**
   * Retrieves all community questions. Seeds with initial research questions if empty.
   */
  public static getAllQuestions(): CommunityQuestion[] {
    try {
      const stored = localStorage.getItem(QUESTIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fall back to seed
    }

    this.saveQuestions(SEED_COMMUNITY_QUESTIONS);
    return [...SEED_COMMUNITY_QUESTIONS];
  }

  /**
   * Saves questions to localStorage.
   */
  public static saveQuestions(questions: CommunityQuestion[]): void {
    try {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to save community questions:', e);
    }
  }

  /**
   * Adds a new question gathered from Facebook community comments or submissions.
   */
  public static addQuestion(
    data: Omit<CommunityQuestion, 'id' | 'receivedAt'>
  ): CommunityQuestion {
    const questions = this.getAllQuestions();
    const newQuestion: CommunityQuestion = {
      ...data,
      id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      receivedAt: new Date().toISOString(),
    };

    questions.unshift(newQuestion);
    this.saveQuestions(questions);
    return newQuestion;
  }

  /**
   * Increments the count/vote for an existing question (signal strength).
   */
  public static upvoteQuestion(id: string): CommunityQuestion | undefined {
    const questions = this.getAllQuestions();
    const target = questions.find((q) => q.id === id);
    if (!target) return undefined;

    target.votesOrCount = (target.votesOrCount || 0) + 1;
    this.saveQuestions(questions);
    return target;
  }

  /**
   * Updates the workflow status of a question.
   */
  public static updateQuestionStatus(
    id: string,
    status: CommunityQuestion['status'],
    productInsightBn?: string
  ): CommunityQuestion | undefined {
    const questions = this.getAllQuestions();
    const target = questions.find((q) => q.id === id);
    if (!target) return undefined;

    target.status = status;
    if (productInsightBn) {
      target.productInsightBn = productInsightBn;
    }
    this.saveQuestions(questions);
    return target;
  }

  /**
   * Retrieves all product insights. Seeds with defaults if empty.
   */
  public static getAllProductInsights(): ProductInsight[] {
    try {
      const stored = localStorage.getItem(INSIGHTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fall back to seed
    }

    this.saveProductInsights(SEED_PRODUCT_INSIGHTS);
    return [...SEED_PRODUCT_INSIGHTS];
  }

  /**
   * Saves product insights to localStorage.
   */
  public static saveProductInsights(insights: ProductInsight[]): void {
    try {
      localStorage.setItem(INSIGHTS_KEY, JSON.stringify(insights));
    } catch (e) {
      console.error('Failed to save product insights:', e);
    }
  }

  /**
   * Adds a new product insight synthesized from community feedback.
   */
  public static addProductInsight(
    data: Omit<ProductInsight, 'id' | 'identifiedAt'>
  ): ProductInsight {
    const insights = this.getAllProductInsights();
    const newInsight: ProductInsight = {
      ...data,
      id: `ins-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      identifiedAt: new Date().toISOString(),
    };

    insights.unshift(newInsight);
    this.saveProductInsights(insights);
    return newInsight;
  }

  /**
   * Updates the status of a product insight.
   */
  public static updateProductInsightStatus(
    id: string,
    status: ProductInsight['status']
  ): ProductInsight | undefined {
    const insights = this.getAllProductInsights();
    const target = insights.find((ins) => ins.id === id);
    if (!target) return undefined;

    target.status = status;
    this.saveProductInsights(insights);
    return target;
  }

  /**
   * Aggregates questions and demand across categories.
   */
  public static getInsightsByCategory(): Record<
    InsightCategory,
    { count: number; nameBn: string; questions: CommunityQuestion[] }
  > {
    const questions = this.getAllQuestions();
    const result: Record<
      InsightCategory,
      { count: number; nameBn: string; questions: CommunityQuestion[] }
    > = {} as any;

    INSIGHT_CATEGORIES.forEach((cat) => {
      const matched = questions.filter((q) => q.category === cat.category);
      result[cat.category] = {
        count: matched.reduce((sum, q) => sum + (q.votesOrCount || 1), 0),
        nameBn: cat.nameBn,
        questions: matched,
      };
    });

    return result;
  }

  /**
   * Returns a high-level overview of the community research and feedback loop.
   */
  public static getResearchSummary(): {
    totalQuestions: number;
    activeInsights: number;
    addressedQuestions: number;
    topRequestedTopics: { topic: string; count: number }[];
  } {
    const questions = this.getAllQuestions();
    const insights = this.getAllProductInsights();

    const addressedQuestions = questions.filter((q) => q.status === 'ADDRESSED').length;
    const activeInsights = insights.filter((i) => i.status !== 'IMPLEMENTED').length;

    // Aggregate topic mentions
    const topicMap: Record<string, number> = {};
    questions.forEach((q) => {
      const topic = q.relatedTopic || 'সাধারণ জিজ্ঞাসা';
      topicMap[topic] = (topicMap[topic] || 0) + (q.votesOrCount || 1);
    });

    const topRequestedTopics = Object.entries(topicMap)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalQuestions: questions.length,
      activeInsights,
      addressedQuestions,
      topRequestedTopics,
    };
  }

  /**
   * Resets community research data to defaults.
   */
  public static resetToDefaultData(): void {
    this.saveQuestions(SEED_COMMUNITY_QUESTIONS);
    this.saveProductInsights(SEED_PRODUCT_INSIGHTS);
  }
}
