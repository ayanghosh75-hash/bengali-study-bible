import { NavTab } from '../components/BottomNav';

export type UserPersonaId =
  | 'new_believer'
  | 'bible_reader'
  | 'sunday_school'
  | 'pastor'
  | 'theological_student';

export interface UserPersona {
  id: UserPersonaId;
  titleBn: string;
  titleEn: string;
  iconName: string;
  badgeBn: string;
  descriptionBn: string;
  focusAreaBn: string;
  recommendedStartingPassage: {
    bookId: string;
    chapter: number;
    verse?: number;
    labelBn: string;
  };
  recommendedLessonId: string;
}

export interface OnboardingState {
  completed: boolean;
  tourDismissed: boolean;
  selectedPersona?: UserPersonaId;
  completedTourSteps: number[];
  isTourActive: boolean;
  currentTourStepIndex: number;
  lastActiveTimestamp: string;
}

export interface TourStep {
  id: string;
  stepNumber: number;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  targetSelector: string;
  actionTab: NavTab;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  iconName: string;
  tipBn?: string;
}

export interface AcademyLessonStep {
  stepNumber: number;
  titleBn: string;
  detailBn: string;
  actionTipBn?: string;
}

export interface AcademyLesson {
  id: string;
  numberBn: string;
  titleBn: string;
  subtitleBn: string;
  category: 'basics' | 'study' | 'sermon' | 'tools' | 'devotion';
  durationMinutes: number;
  badgeBn: string;
  summaryBn: string;
  steps: AcademyLessonStep[];
  keyTakeawayBn: string;
  relatedTab?: NavTab;
  iconName: string;
}

export interface AcademyProgress {
  completedLessonIds: string[];
  lastVisitedLessonId?: string;
  bookmarkedLessonIds: string[];
}

export interface DevotionalStep {
  order: number;
  minuteLabel: string;
  titleBn: string;
  subtitleBn: string;
  instructionsBn: string;
  reflectionQuestionsBn: string[];
  sampleScriptureRefs: string[];
}

export interface DevotionalRoutine {
  id: 'quiet_time_15' | 'deep_study_30';
  titleBn: string;
  subtitleBn: string;
  totalMinutes: number;
  badgeBn: string;
  quoteBn: string;
  steps: DevotionalStep[];
}

export interface MinistryScenario {
  id: string;
  titleBn: string;
  roleBn: string;
  objectiveBn: string;
  iconName: string;
  practicalStepsBn: string[];
  recommendedTools: string[];
  suggestedScriptures: string[];
}

export interface HelpQuestion {
  id: string;
  category: 'general' | 'reading' | 'notes' | 'sermons' | 'offline' | 'copyright';
  categoryLabelBn: string;
  questionBn: string;
  answerBn: string;
  relatedLessonId?: string;
}

export interface TutorialRegistry {
  version: string;
  lastUpdated: string;
  personas: UserPersona[];
  tourSteps: TourStep[];
  lessons: AcademyLesson[];
  devotionRoutines: DevotionalRoutine[];
  scenarios: MinistryScenario[];
  faqs: HelpQuestion[];
}
