// Service to manage multiple Bible translations and parallel reading alignment
import { BibleTranslation } from '../types/translations';
import { BIBLE_TRANSLATIONS, getTranslationById, getDefaultTranslation } from '../data/translationsData';

const TRANSLATION_STORAGE_KEY = 'bsb_active_translation_id';
const PARALLEL_STORAGE_KEY = 'bsb_parallel_translation_id';
const PARALLEL_ENABLED_KEY = 'bsb_parallel_mode_enabled';

export class TranslationService {
  public static getAllTranslations(): BibleTranslation[] {
    return BIBLE_TRANSLATIONS;
  }

  public static getActiveTranslation(): BibleTranslation {
    try {
      const savedId = localStorage.getItem(TRANSLATION_STORAGE_KEY);
      if (savedId) {
        const found = getTranslationById(savedId);
        if (found) return found;
      }
    } catch {
      // Fallback on error
    }
    return getDefaultTranslation();
  }

  public static setActiveTranslation(id: string): void {
    try {
      localStorage.setItem(TRANSLATION_STORAGE_KEY, id);
    } catch (e) {
      console.error('Failed to save active translation:', e);
    }
  }

  public static isParallelEnabled(): boolean {
    try {
      return localStorage.getItem(PARALLEL_ENABLED_KEY) === 'true';
    } catch {
      return false;
    }
  }

  public static setParallelEnabled(enabled: boolean): void {
    try {
      localStorage.setItem(PARALLEL_ENABLED_KEY, enabled ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to save parallel mode state:', e);
    }
  }

  public static getParallelTranslation(): BibleTranslation {
    try {
      const savedId = localStorage.getItem(PARALLEL_STORAGE_KEY);
      if (savedId) {
        const found = getTranslationById(savedId);
        if (found) return found;
      }
    } catch {
      // Fallback on error
    }
    // Default parallel translation is World English Bible (WEB)
    return getTranslationById('web-eng');
  }

  public static setParallelTranslation(id: string): void {
    try {
      localStorage.setItem(PARALLEL_STORAGE_KEY, id);
    } catch (e) {
      console.error('Failed to save parallel translation:', e);
    }
  }
}
