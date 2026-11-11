import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    testsPassed++;
    console.log(`  ✓ ${message}`);
  } else {
    testsFailed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('============================================================');
console.log('BENGALI STUDY BIBLE');
console.log('ONBOARDING, SPOTLIGHT TOUR & ACADEMY VERIFICATION SUITE');
console.log('============================================================\n');

// 1. Types & Schema
console.log('1. Checking Domain Types & Contracts...');
const tutorialTypesPath = resolve('src/types/tutorial.ts');
assert(existsSync(tutorialTypesPath), 'src/types/tutorial.ts exists');
const tutorialTypesContent = readFileSync(tutorialTypesPath, 'utf8');
assert(tutorialTypesContent.includes('export type UserPersonaId'), 'UserPersonaId union is declared');
assert(tutorialTypesContent.includes('export interface OnboardingState'), 'OnboardingState contract is declared');
assert(tutorialTypesContent.includes('export interface TourStep'), 'TourStep contract is declared');
assert(tutorialTypesContent.includes('export interface AcademyLesson'), 'AcademyLesson contract is declared');
assert(tutorialTypesContent.includes('export interface DevotionalRoutine'), 'DevotionalRoutine contract is declared');
assert(tutorialTypesContent.includes('export interface MinistryScenario'), 'MinistryScenario contract is declared');
assert(tutorialTypesContent.includes('export interface HelpQuestion'), 'HelpQuestion contract is declared');

// 2. Tutorial Static Data
console.log('\n2. Checking Static Registries & Data Content...');
const tutorialDataPath = resolve('src/data/tutorial/tutorialData.ts');
assert(existsSync(tutorialDataPath), 'src/data/tutorial/tutorialData.ts exists');
const tutorialDataContent = readFileSync(tutorialDataPath, 'utf8');

// 5 Personas
assert(tutorialDataContent.includes("'new_believer'"), 'Persona: new_believer declared');
assert(tutorialDataContent.includes("'bible_reader'"), 'Persona: bible_reader declared');
assert(tutorialDataContent.includes("'sunday_school'"), 'Persona: sunday_school declared');
assert(tutorialDataContent.includes("'pastor'"), 'Persona: pastor declared');
assert(tutorialDataContent.includes("'theological_student'"), 'Persona: theological_student declared');

// 12 Tour Steps
assert(tutorialDataContent.includes("'tour-home-hero'"), 'Tour Step 1: tour-home-hero declared');
assert(tutorialDataContent.includes("'tour-book-picker'"), 'Tour Step 2: tour-book-picker declared');
assert(tutorialDataContent.includes("'tour-quick-search'"), 'Tour Step 3: tour-quick-search declared');
assert(tutorialDataContent.includes("'tour-verse-study'"), 'Tour Step 4: tour-verse-study declared');
assert(tutorialDataContent.includes("'tour-cross-ref'"), 'Tour Step 5: tour-cross-ref declared');
assert(tutorialDataContent.includes("'tour-personal-notes'"), 'Tour Step 6: tour-personal-notes declared');
assert(tutorialDataContent.includes("'tour-highlight-actions'"), 'Tour Step 7: tour-highlight-actions declared');
assert(tutorialDataContent.includes("'tour-library-tab'"), 'Tour Step 8: tour-library-tab declared');
assert(tutorialDataContent.includes("'tour-ask-bible-tab'"), 'Tour Step 9: tour-ask-bible-tab declared');
assert(tutorialDataContent.includes("'tour-sermon-builder-btn'"), 'Tour Step 10: tour-sermon-builder-btn declared');
assert(tutorialDataContent.includes("'tour-daily-devotion-btn'"), 'Tour Step 11: tour-daily-devotion-btn declared');
assert(tutorialDataContent.includes("'tour-my-study-tab'"), 'Tour Step 12: tour-my-study-tab declared');

// 10 Academy Lessons
for (let i = 1; i <= 10; i++) {
  assert(
    tutorialDataContent.includes(`id: 'lesson-${i}'`),
    `Academy Lesson ${i} (lesson-${i}) is declared`
  );
}

// Devotional Routines
assert(tutorialDataContent.includes("'quiet_time_15'"), '15-minute quiet time routine is declared');
assert(tutorialDataContent.includes("'deep_study_30'"), '30-minute in-depth study routine is declared');

// Ministry Scenarios
assert(tutorialDataContent.includes("'personal_devotion'"), 'Ministry scenario: personal_devotion declared');
assert(tutorialDataContent.includes("'family_worship'"), 'Ministry scenario: family_worship declared');
assert(tutorialDataContent.includes("'cell_group'"), 'Ministry scenario: cell_group declared');
assert(tutorialDataContent.includes("'sunday_school'"), 'Ministry scenario: sunday_school declared');
assert(tutorialDataContent.includes("'sermon_preaching'"), 'Ministry scenario: sermon_preaching declared');
assert(tutorialDataContent.includes("'theological_research'"), 'Ministry scenario: theological_research declared');

// 3. Service Layer
console.log('\n3. Checking TutorialService Implementation...');
const tutorialServicePath = resolve('src/services/tutorialService.ts');
assert(existsSync(tutorialServicePath), 'src/services/tutorialService.ts exists');
const tutorialServiceContent = readFileSync(tutorialServicePath, 'utf8');
assert(tutorialServiceContent.includes('bsb_onboarding_state_v1'), 'Uses bsb_onboarding_state_v1 storage key');
assert(tutorialServiceContent.includes('bsb_academy_progress_v1'), 'Uses bsb_academy_progress_v1 storage key');
assert(tutorialServiceContent.includes('bsb_tutorial_registry_v1'), 'Uses bsb_tutorial_registry_v1 storage key');
assert(tutorialServiceContent.includes('startTour('), 'Implements startTour()');
assert(tutorialServiceContent.includes('nextTourStep('), 'Implements nextTourStep()');
assert(tutorialServiceContent.includes('previousTourStep('), 'Implements previousTourStep()');
assert(tutorialServiceContent.includes('dismissTour('), 'Implements dismissTour()');
assert(tutorialServiceContent.includes('completeTour('), 'Implements completeTour()');
assert(tutorialServiceContent.includes('resetTour('), 'Implements resetTour()');
assert(tutorialServiceContent.includes('toggleLessonComplete('), 'Implements toggleLessonComplete()');
assert(tutorialServiceContent.includes('resetTutorialRegistryToDefault('), 'Implements resetTutorialRegistryToDefault()');

// 4. UI Components
console.log('\n4. Checking UI Components...');
const welcomeModalPath = resolve('src/components/tutorial/WelcomeModal.tsx');
assert(existsSync(welcomeModalPath), 'WelcomeModal.tsx exists');
const welcomeContent = readFileSync(welcomeModalPath, 'utf8');
assert(welcomeContent.includes('স্বাগতম বাংলা স্টাডি বাইবেলে'), 'WelcomeModal renders warm Bengali greeting');
assert(welcomeContent.includes('দ্রুত সফর শুরু করুন'), 'WelcomeModal provides 2-minute tour CTA');
assert(welcomeContent.includes('সরাসরি বাইবেল পড়ুন'), 'WelcomeModal provides direct Bible reading CTA');
assert(welcomeContent.includes('একাডেমি টিউটোরিয়াল'), 'WelcomeModal provides Academy CTA');

const spotlightOverlayPath = resolve('src/components/tutorial/SpotlightTourOverlay.tsx');
assert(existsSync(spotlightOverlayPath), 'SpotlightTourOverlay.tsx exists');
const spotlightContent = readFileSync(spotlightOverlayPath, 'utf8');
assert(spotlightContent.includes('targetRect'), 'SpotlightTourOverlay measures DOM target element');
assert(spotlightContent.includes('onNext'), 'SpotlightTourOverlay supports Next navigation');
assert(spotlightContent.includes('onPrevious'), 'SpotlightTourOverlay supports Back navigation');
assert(spotlightContent.includes('onSkip'), 'SpotlightTourOverlay supports Skip action');

const contextualHelpPath = resolve('src/components/tutorial/ContextualHelpIcon.tsx');
assert(existsSync(contextualHelpPath), 'ContextualHelpIcon.tsx exists');

const devotionChecklistPath = resolve('src/components/tutorial/DevotionChecklistModal.tsx');
assert(existsSync(devotionChecklistPath), 'DevotionChecklistModal.tsx exists');
const devotionContent = readFileSync(devotionChecklistPath, 'utf8');
assert(devotionContent.includes('window.print()'), 'DevotionChecklistModal supports printing');
assert(devotionContent.includes('quiet_time_15'), 'DevotionChecklistModal supports 15-min quiet time');
assert(devotionContent.includes('deep_study_30'), 'DevotionChecklistModal supports 30-min deep study');

// 5. Screen Integrations
console.log('\n5. Checking Screen & App Integrations...');
const academyScreenPath = resolve('src/screens/AcademyScreen.tsx');
assert(existsSync(academyScreenPath), 'AcademyScreen.tsx exists');
const academyScreenContent = readFileSync(academyScreenPath, 'utf8');
assert(academyScreenContent.includes('কীভাবে ব্যবহার করবেন — একাডেমি'), 'AcademyScreen renders Bengali headline');
assert(academyScreenContent.includes('১০টি ব্যবহার পাঠ'), 'AcademyScreen renders 10 lessons subtab');
assert(academyScreenContent.includes('পরিচর্যা প্রশিক্ষণ দৃশ্যপট'), 'AcademyScreen renders 6 ministry scenarios subtab');
assert(academyScreenContent.includes('দৈনিক ভক্তি ও স্টাডি রুটিন'), 'AcademyScreen renders devotion routines subtab');
assert(academyScreenContent.includes('সহায়িকা ও সচরাচর প্রশ্ন'), 'AcademyScreen renders searchable FAQs subtab');

const adminTutorialPath = resolve('src/screens/admin/TutorialAcademyManagementScreen.tsx');
assert(existsSync(adminTutorialPath), 'TutorialAcademyManagementScreen.tsx exists');

const appPath = resolve('src/App.tsx');
const appContent = readFileSync(appPath, 'utf8');
assert(appContent.includes("activeTab === 'academy'"), 'App.tsx renders AcademyScreen on academy tab');
assert(appContent.includes('<WelcomeModal'), 'App.tsx mounts WelcomeModal');
assert(appContent.includes('<SpotlightTourOverlay'), 'App.tsx mounts SpotlightTourOverlay');
assert(appContent.includes('<DevotionChecklistModal'), 'App.tsx mounts DevotionChecklistModal');

// 6. Ownership & Tagline Integrity
console.log('\n6. Checking Ownership & Theological Integrity...');
assert(
  academyScreenContent.includes('রেভা. অয়ন কুমার ঘোষ') &&
  academyScreenContent.includes('ayanghosh75@gmail.com'),
  'AcademyScreen attributes Rev. Ayan Kumar Ghosh and contact email'
);
assert(
  tutorialDataContent.includes('পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন'),
  'Official tagline preserved in tutorial registry'
);

// 7. No Placeholder Text Check
console.log('\n7. Checking for Placeholder / Hallucination Text...');
const bannedPhrases = ['placeholder', 'lorem ipsum', 'coming soon dummy', 'todo add later'];
let hasBanned = false;
for (const phrase of bannedPhrases) {
  if (tutorialDataContent.toLowerCase().includes(phrase)) {
    hasBanned = true;
    console.error(`Found banned placeholder: "${phrase}"`);
  }
}
assert(!hasBanned, 'Zero placeholder text found in tutorial datasets');

console.log('\n============================================================');
console.log(`TOTAL TESTS: ${testsPassed + testsFailed}`);
console.log(`PASSED: ${testsPassed}`);
console.log(`FAILED: ${testsFailed}`);
console.log('============================================================');

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL ONBOARDING, TOUR & ACADEMY TESTS PASSED PERFECTLY!\n');
  process.exit(0);
}
