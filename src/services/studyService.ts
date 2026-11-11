import {
  StudyTopic,
  TopicCategory,
  BiblicalCharacter,
  CrossReference,
  ReadingPlan,
  UserPlanProgress,
} from '../types/study';
import { STUDY_TOPICS } from '../data/topicsData';
import { BIBLICAL_CHARACTERS } from '../data/charactersData';
import { getCrossReferences } from '../data/crossRefsData';
import { READING_PLANS_DB } from '../data/readingPlansData';

const PLAN_PROGRESS_STORAGE_KEY = 'bsb_plan_progress_v1';

export class StudyService {
  // ================= TOPICAL STUDIES =================
  public static getTopics(): StudyTopic[] {
    return STUDY_TOPICS;
  }

  public static getTopicById(id: string): StudyTopic | undefined {
    return STUDY_TOPICS.find((t) => t.id === id);
  }

  public static filterTopics(category?: TopicCategory, query?: string): StudyTopic[] {
    let topics = STUDY_TOPICS;
    if (category) {
      topics = topics.filter((t) => t.category === category);
    }
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      topics = topics.filter(
        (t) =>
          t.titleBn.toLowerCase().includes(q) ||
          t.titleEn.toLowerCase().includes(q) ||
          t.summaryBn.toLowerCase().includes(q)
      );
    }
    return topics;
  }

  // ================= BIBLICAL CHARACTERS =================
  public static getCharacters(): BiblicalCharacter[] {
    return BIBLICAL_CHARACTERS;
  }

  public static getCharacterById(id: string): BiblicalCharacter | undefined {
    return BIBLICAL_CHARACTERS.find((c) => c.id === id);
  }

  public static searchCharacters(query: string): BiblicalCharacter[] {
    const q = query.toLowerCase().trim();
    if (!q) return BIBLICAL_CHARACTERS;
    return BIBLICAL_CHARACTERS.filter(
      (c) =>
        c.nameBn.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.biographyBn.toLowerCase().includes(q)
    );
  }

  // ================= CROSS-REFERENCES =================
  public static getCrossReferencesForVerse(
    bookId: string,
    chapter: number,
    verse: number
  ): CrossReference[] {
    const key = `${bookId.toUpperCase()}.${chapter}.${verse}`;
    return getCrossReferences(key);
  }

  // ================= READING PLANS =================
  public static getReadingPlans(): ReadingPlan[] {
    return READING_PLANS_DB;
  }

  public static getReadingPlanById(id: string): ReadingPlan | undefined {
    return READING_PLANS_DB.find((p) => p.id === id);
  }

  public static getAllProgress(): Record<string, UserPlanProgress> {
    try {
      const data = localStorage.getItem(PLAN_PROGRESS_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  public static getPlanProgress(planId: string): UserPlanProgress {
    const all = this.getAllProgress();
    return all[planId] || { planId, completedDays: [], updatedAt: new Date().toISOString() };
  }

  public static togglePlanDayCompletion(planId: string, dayNumber: number): UserPlanProgress {
    const all = this.getAllProgress();
    const progress = all[planId] || {
      planId,
      completedDays: [],
      updatedAt: new Date().toISOString(),
    };

    const exists = progress.completedDays.includes(dayNumber);
    if (exists) {
      progress.completedDays = progress.completedDays.filter((d) => d !== dayNumber);
    } else {
      progress.completedDays.push(dayNumber);
      progress.completedDays.sort((a, b) => a - b);
    }
    progress.updatedAt = new Date().toISOString();
    all[planId] = progress;
    localStorage.setItem(PLAN_PROGRESS_STORAGE_KEY, JSON.stringify(all));
    return progress;
  }
}
