import {
  OnboardingState,
  UserPersonaId,
  AcademyProgress,
  TutorialRegistry,
} from '../types/tutorial';
import {
  DEFAULT_TUTORIAL_REGISTRY,
  TOUR_STEPS,
} from '../data/tutorial/tutorialData';

const ONBOARDING_KEY = 'bsb_onboarding_state_v1';
const ACADEMY_PROGRESS_KEY = 'bsb_academy_progress_v1';
const TUTORIAL_REGISTRY_KEY = 'bsb_tutorial_registry_v1';

export class TutorialService {
  /**
   * Get current onboarding state from localStorage with safe defaults
   */
  public static getOnboardingState(): OnboardingState {
    try {
      const data = localStorage.getItem(ONBOARDING_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load onboarding state:', e);
    }

    return {
      completed: false,
      tourDismissed: false,
      completedTourSteps: [],
      isTourActive: false,
      currentTourStepIndex: 0,
      lastActiveTimestamp: new Date().toISOString(),
    };
  }

  /**
   * Save partial onboarding state
   */
  public static saveOnboardingState(partial: Partial<OnboardingState>): OnboardingState {
    const current = this.getOnboardingState();
    const updated: OnboardingState = {
      ...current,
      ...partial,
      lastActiveTimestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save onboarding state:', e);
    }

    return updated;
  }

  /**
   * Set user persona choice and record completion
   */
  public static selectPersona(personaId: UserPersonaId): OnboardingState {
    return this.saveOnboardingState({
      selectedPersona: personaId,
      completed: true,
    });
  }

  /**
   * Start or restart the spotlight tour
   */
  public static startTour(): OnboardingState {
    return this.saveOnboardingState({
      isTourActive: true,
      currentTourStepIndex: 0,
      tourDismissed: false,
    });
  }

  /**
   * Move to next tour step
   */
  public static nextTourStep(): OnboardingState {
    const current = this.getOnboardingState();
    const nextIndex = current.currentTourStepIndex + 1;
    const completedSteps = Array.from(
      new Set([...current.completedTourSteps, current.currentTourStepIndex])
    );

    if (nextIndex >= TOUR_STEPS.length) {
      return this.completeTour();
    }

    return this.saveOnboardingState({
      currentTourStepIndex: nextIndex,
      completedTourSteps: completedSteps,
      isTourActive: true,
    });
  }

  /**
   * Move to previous tour step
   */
  public static previousTourStep(): OnboardingState {
    const current = this.getOnboardingState();
    const prevIndex = Math.max(0, current.currentTourStepIndex - 1);
    return this.saveOnboardingState({
      currentTourStepIndex: prevIndex,
      isTourActive: true,
    });
  }

  /**
   * Dismiss or skip the tour
   */
  public static dismissTour(): OnboardingState {
    return this.saveOnboardingState({
      isTourActive: false,
      tourDismissed: true,
      completed: true,
    });
  }

  /**
   * Finish the tour completely
   */
  public static completeTour(): OnboardingState {
    return this.saveOnboardingState({
      isTourActive: false,
      completed: true,
      tourDismissed: true,
      completedTourSteps: TOUR_STEPS.map((_, i) => i),
      currentTourStepIndex: 0,
    });
  }

  /**
   * Reset the tour to initial state so user can view it again
   */
  public static resetTour(): OnboardingState {
    return this.saveOnboardingState({
      isTourActive: true,
      completed: false,
      tourDismissed: false,
      currentTourStepIndex: 0,
      completedTourSteps: [],
    });
  }

  /**
   * Get academy progress
   */
  public static getAcademyProgress(): AcademyProgress {
    try {
      const data = localStorage.getItem(ACADEMY_PROGRESS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load academy progress:', e);
    }

    return {
      completedLessonIds: [],
      bookmarkedLessonIds: [],
    };
  }

  /**
   * Save academy progress
   */
  public static saveAcademyProgress(progress: AcademyProgress): AcademyProgress {
    try {
      localStorage.setItem(ACADEMY_PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save academy progress:', e);
    }
    return progress;
  }

  /**
   * Toggle completion status of an academy lesson
   */
  public static toggleLessonComplete(lessonId: string): AcademyProgress {
    const progress = this.getAcademyProgress();
    const isCompleted = progress.completedLessonIds.includes(lessonId);

    const updatedCompleted = isCompleted
      ? progress.completedLessonIds.filter((id) => id !== lessonId)
      : [...progress.completedLessonIds, lessonId];

    const updated: AcademyProgress = {
      ...progress,
      completedLessonIds: updatedCompleted,
      lastVisitedLessonId: lessonId,
    };

    return this.saveAcademyProgress(updated);
  }

  /**
   * Check if a lesson is marked completed
   */
  public static isLessonComplete(lessonId: string): boolean {
    const progress = this.getAcademyProgress();
    return progress.completedLessonIds.includes(lessonId);
  }

  /**
   * Retrieve tutorial registry (with fallback to DEFAULT_TUTORIAL_REGISTRY)
   */
  public static getTutorialRegistry(): TutorialRegistry {
    try {
      const data = localStorage.getItem(TUTORIAL_REGISTRY_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load tutorial registry:', e);
    }

    return DEFAULT_TUTORIAL_REGISTRY;
  }

  /**
   * Save tutorial registry for admin customization
   */
  public static saveTutorialRegistry(registry: TutorialRegistry): TutorialRegistry {
    const updated: TutorialRegistry = {
      ...registry,
      lastUpdated: new Date().toISOString(),
    };
    try {
      localStorage.setItem(TUTORIAL_REGISTRY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save tutorial registry:', e);
    }
    return updated;
  }

  /**
   * Reset tutorial registry back to system defaults
   */
  public static resetTutorialRegistryToDefault(): TutorialRegistry {
    try {
      localStorage.removeItem(TUTORIAL_REGISTRY_KEY);
    } catch (e) {
      console.error('Failed to reset tutorial registry:', e);
    }
    return DEFAULT_TUTORIAL_REGISTRY;
  }
}
