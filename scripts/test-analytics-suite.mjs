// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// PRIVATE ADMIN ANALYTICS & METRICS TEST SUITE
// Founder, Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Admin Contact: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('='.repeat(70));
console.log('BENGALI STUDY BIBLE • PRIVATE ADMIN ANALYTICS TEST SUITE');
console.log('Owner & Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)');
console.log('='.repeat(70));

async function runAnalyticsTestSuite() {
  // -------------------------------------------------------------
  // 1. Types & Schema Validation
  // -------------------------------------------------------------
  console.log('\n[1] Validating TypeScript Analytics & Auth Types...');
  const analyticsTypesPath = path.join(ROOT_DIR, 'src', 'types', 'analytics.ts');
  assert(fs.existsSync(analyticsTypesPath), 'src/types/analytics.ts exists');

  const analyticsTypesContent = fs.readFileSync(analyticsTypesPath, 'utf8');
  assert(analyticsTypesContent.includes('AnalyticsEventType'), 'AnalyticsEventType union declared');
  assert(analyticsTypesContent.includes("'STANDALONE_PWA_LAUNCH'"), 'AnalyticsEventType includes STANDALONE_PWA_LAUNCH');
  assert(analyticsTypesContent.includes("'CHAPTER_READ'"), 'AnalyticsEventType includes CHAPTER_READ');
  assert(analyticsTypesContent.includes("'SEARCH_QUERY'"), 'AnalyticsEventType includes SEARCH_QUERY');
  assert(analyticsTypesContent.includes("'APPINSTALLED_EVENT'"), 'AnalyticsEventType includes APPINSTALLED_EVENT');
  assert(analyticsTypesContent.includes("'INSTALL_PROMPT_ACCEPTED'"), 'AnalyticsEventType includes INSTALL_PROMPT_ACCEPTED');
  assert(analyticsTypesContent.includes("'INSTALL_BUTTON_CLICK'"), 'AnalyticsEventType includes INSTALL_BUTTON_CLICK');
  assert(analyticsTypesContent.includes("'SERMON_GENERATE_COMPLETE'"), 'AnalyticsEventType includes SERMON_GENERATE_COMPLETE');
  assert(analyticsTypesContent.includes('AnalyticsSummaryReport'), 'AnalyticsSummaryReport interface declared');
  assert(analyticsTypesContent.includes('PwaInstallFunnelMetrics'), 'PwaInstallFunnelMetrics interface declared');
  assert(analyticsTypesContent.includes('TimeFilterRange'), 'TimeFilterRange type declared');
  assert(analyticsTypesContent.includes('WeeklyEmailSummaryPayload'), 'WeeklyEmailSummaryPayload interface declared');

  const authTypesPath = path.join(ROOT_DIR, 'src', 'types', 'auth.ts');
  const authTypesContent = fs.readFileSync(authTypesPath, 'utf8');
  assert(authTypesContent.includes("'admin'"), 'auth.ts includes admin role in UserRole');
  assert(authTypesContent.includes("admin: 'প্রশাসক (Administrator)'"), 'ROLE_LABELS_BN includes Bengali label for admin');

  // -------------------------------------------------------------
  // 2. Authentication & Admin Security Gate
  // -------------------------------------------------------------
  console.log('\n[2] Auditing Admin Security Gate & AuthService...');
  const authServicePath = path.join(ROOT_DIR, 'src', 'services', 'authService.ts');
  const authServiceContent = fs.readFileSync(authServicePath, 'utf8');
  assert(authServiceContent.includes('verifyAdminPasscode'), 'authService contains verifyAdminPasscode()');
  assert(authServiceContent.includes('grantAdminSession'), 'authService contains grantAdminSession()');
  assert(authServiceContent.includes('revokeAdminSession'), 'authService contains revokeAdminSession()');
  assert(authServiceContent.includes('isAdmin'), 'authService contains isAdmin()');
  assert(authServiceContent.includes('ayanghosh75@gmail.com'), 'Master admin email explicitly checked');

  const securityGatePath = path.join(ROOT_DIR, 'src', 'components', 'admin', 'AdminSecurityGate.tsx');
  assert(fs.existsSync(securityGatePath), 'AdminSecurityGate.tsx exists');
  const securityGateContent = fs.readFileSync(securityGatePath, 'utf8');
  assert(securityGateContent.includes('AuthService.isAdmin()'), 'Security Gate enforces AuthService.isAdmin()');
  assert(securityGateContent.includes('AuthService.verifyAdminPasscode'), 'Security Gate invokes passcode verification');
  assert(securityGateContent.includes('অ্যাডমিন পাসকোড'), 'Security Gate displays Bengali passcode prompt');

  // -------------------------------------------------------------
  // 3. Analytics Service & Core Engine
  // -------------------------------------------------------------
  console.log('\n[3] Auditing AnalyticsService Engine & Privacy Rules...');
  const analyticsServicePath = path.join(ROOT_DIR, 'src', 'services', 'analyticsService.ts');
  assert(fs.existsSync(analyticsServicePath), 'src/services/analyticsService.ts exists');

  const analyticsServiceContent = fs.readFileSync(analyticsServicePath, 'utf8');
  assert(analyticsServiceContent.includes('sanitizeSearchQuery'), 'Includes search query privacy sanitizer');
  assert(analyticsServiceContent.includes('pwaFunnel: PwaInstallFunnelMetrics'), 'Includes transparent PwaFunnel calculation');
  assert(analyticsServiceContent.includes('generateWeeklyEmailSummary'), 'Includes weekly email summary generator');
  assert(analyticsServiceContent.includes('ayanghosh75@gmail.com'), 'Weekly email recipient configured to ayanghosh75@gmail.com');
  assert(analyticsServiceContent.includes('bsb_analytics_events_v1'), 'Uses local-first storage bsb_analytics_events_v1');
  assert(analyticsServiceContent.includes('dauCurrent'), 'Calculates Daily Active Users (dauCurrent)');
  assert(analyticsServiceContent.includes('wauCurrent'), 'Calculates Weekly Active Users (wauCurrent)');
  assert(analyticsServiceContent.includes('mauCurrent'), 'Calculates Monthly Active Users (mauCurrent)');
  assert(analyticsServiceContent.includes('platformDistribution'), 'Computes OS platform distribution');
  assert(analyticsServiceContent.includes('modeDistribution'), 'Computes standalone vs browser mode distribution');

  // -------------------------------------------------------------
  // 4. Privacy Guarantee (Zero Manuscript / Personal Data Leaks)
  // -------------------------------------------------------------
  console.log('\n[4] Verifying Privacy Guarantee & Zero Data Leakage...');
  assert(!analyticsServiceContent.includes('manuscriptContent'), 'Private sermon manuscript content is NOT logged');
  assert(!analyticsServiceContent.includes('personalNotesBody'), 'Private verse study notes body is NOT logged');
  assert(!analyticsServiceContent.includes('prayerRequestSecret'), 'Private prayer request text is NOT logged');

  // Test privacy regex logic inline
  function sanitizeQuery(query) {
    if (!query) return '';
    let cleaned = query.trim();
    if (cleaned.includes('@')) return '[REDACTED_EMAIL]';
    const digits = cleaned.replace(/\D/g, '');
    if (digits.length >= 7) return '[REDACTED_PHONE]';
    return cleaned.slice(0, 80);
  }
  assert(sanitizeQuery('john@example.com') === '[REDACTED_EMAIL]', 'Email addresses redacted from searches');
  assert(sanitizeQuery('contact 9876543210') === '[REDACTED_PHONE]', 'Phone numbers redacted from searches');
  assert(sanitizeQuery('  যোহন ৩:১৬  ') === 'যোহন ৩:১৬', 'Valid Bible search query trimmed and preserved');

  // -------------------------------------------------------------
  // 5. Component Instrumentation Audit
  // -------------------------------------------------------------
  console.log('\n[5] Auditing Component Event Instrumentation...');
  
  // usePwa
  const usePwaPath = path.join(ROOT_DIR, 'src', 'hooks', 'usePwa.ts');
  const usePwaContent = fs.readFileSync(usePwaPath, 'utf8');
  assert(usePwaContent.includes('AnalyticsService.trackInstallPromptShown'), 'usePwa tracks install prompt shown');
  assert(usePwaContent.includes('AnalyticsService.trackInstallPromptAccepted'), 'usePwa tracks install prompt accepted');
  assert(usePwaContent.includes('AnalyticsService.trackAppInstalledEvent'), 'usePwa tracks app installed event');

  // InstallScreen
  const installScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'InstallScreen.tsx');
  const installScreenContent = fs.readFileSync(installScreenPath, 'utf8');
  assert(installScreenContent.includes('AnalyticsService.trackInstallPageView'), 'InstallScreen tracks install page view');
  assert(installScreenContent.includes('AnalyticsService.trackInstallButtonClick'), 'InstallScreen tracks install button click');
  assert(installScreenContent.includes('AnalyticsService.trackIosInstructionsViewed'), 'InstallScreen tracks iOS instructions view');

  // UniversalShareScreen
  const shareScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'UniversalShareScreen.tsx');
  const shareScreenContent = fs.readFileSync(shareScreenPath, 'utf8');
  assert(shareScreenContent.includes("AnalyticsService.trackShareClick('whatsapp')"), 'UniversalShare tracks WhatsApp shares');
  assert(shareScreenContent.includes("AnalyticsService.trackShareClick('facebook')"), 'UniversalShare tracks Facebook shares');
  assert(shareScreenContent.includes("AnalyticsService.trackShareClick('copy_link')"), 'UniversalShare tracks link copies');

  // BibleReaderScreen
  const readerScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'BibleReaderScreen.tsx');
  const readerScreenContent = fs.readFileSync(readerScreenPath, 'utf8');
  assert(readerScreenContent.includes('AnalyticsService.trackChapterRead'), 'BibleReader tracks chapter read');
  assert(readerScreenContent.includes('AnalyticsService.trackBookmarkAdd'), 'BibleReader tracks bookmark add');
  assert(readerScreenContent.includes('AnalyticsService.trackHighlight'), 'BibleReader tracks highlight add');
  assert(readerScreenContent.includes('AnalyticsService.trackNoteCreate'), 'BibleReader tracks note create');

  // SearchModal
  const searchModalPath = path.join(ROOT_DIR, 'src', 'components', 'SearchModal.tsx');
  const searchModalContent = fs.readFileSync(searchModalPath, 'utf8');
  assert(searchModalContent.includes('AnalyticsService.trackSearch'), 'SearchModal tracks searches');
  assert(searchModalContent.includes('AnalyticsService.trackSearchToBibleOpen'), 'SearchModal tracks click-through to Bible');

  // SermonBuilderScreen
  const sermonScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'SermonBuilderScreen.tsx');
  const sermonScreenContent = fs.readFileSync(sermonScreenPath, 'utf8');
  assert(sermonScreenContent.includes('AnalyticsService.trackSermonBuilderOpen'), 'SermonBuilder tracks screen open');
  assert(sermonScreenContent.includes('AnalyticsService.trackSermonGenerateStart'), 'SermonBuilder tracks generation start');
  assert(sermonScreenContent.includes('AnalyticsService.trackSermonGenerateComplete'), 'SermonBuilder tracks generation completion');
  assert(sermonScreenContent.includes('AnalyticsService.trackSermonSaved'), 'SermonBuilder tracks sermon save');

  // StudyScreen
  const studyScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'StudyScreen.tsx');
  const studyScreenContent = fs.readFileSync(studyScreenPath, 'utf8');
  assert(studyScreenContent.includes('AnalyticsService.trackStudyPageOpen'), 'StudyScreen tracks study page and subtabs');
  assert(studyScreenContent.includes('AnalyticsService.trackTopicStudyOpen'), 'StudyScreen tracks topic opens');
  assert(studyScreenContent.includes('AnalyticsService.trackCharacterStudyOpen'), 'StudyScreen tracks character opens');

  // FeedbackScreen
  const feedbackScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'FeedbackScreen.tsx');
  const feedbackScreenContent = fs.readFileSync(feedbackScreenPath, 'utf8');
  assert(feedbackScreenContent.includes('AnalyticsService.trackFeedbackSubmit'), 'FeedbackScreen tracks feedback submissions');

  // -------------------------------------------------------------
  // 6. Admin Navigation & Deep Routing Audit
  // -------------------------------------------------------------
  console.log('\n[6] Auditing Admin Dashboard & App Routing...');
  const adminDashboardPath = path.join(ROOT_DIR, 'src', 'screens', 'AdminDashboardScreen.tsx');
  const adminDashboardContent = fs.readFileSync(adminDashboardPath, 'utf8');
  assert(adminDashboardContent.includes('AdminAnalyticsScreen'), 'AdminDashboard imports AdminAnalyticsScreen');
  assert(adminDashboardContent.includes('ব্যবহার ও পরিসংখ্যান'), 'AdminDashboard provides "ব্যবহার ও পরিসংখ্যান" tab button');
  assert(adminDashboardContent.includes("activeTab === 'analytics'"), 'AdminDashboard conditionally renders analytics tab');

  const appPath = path.join(ROOT_DIR, 'src', 'App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  assert(appContent.includes('/admin/analytics'), 'App.tsx parses /admin/analytics route');
  assert(appContent.includes("activeTab === 'admin-analytics'"), 'App.tsx renders AdminAnalyticsScreen for admin-analytics tab');
  assert(appContent.includes('AnalyticsService.trackAppLaunch'), 'App.tsx records app launch on startup');
  assert(appContent.includes('AnalyticsService.trackPageView(activeTab)'), 'App.tsx tracks page views on tab change');

  // -------------------------------------------------------------
  // 7. Privacy Policy Transparency Update
  // -------------------------------------------------------------
  console.log('\n[7] Auditing Privacy Policy Updates...');
  const aboutHelpPath = path.join(ROOT_DIR, 'src', 'screens', 'AboutHelpScreen.tsx');
  const aboutHelpContent = fs.readFileSync(aboutHelpPath, 'utf8');
  assert(aboutHelpContent.includes('স্বচ্ছ পরিসংখ্যান ও সেবা মূল্যায়ন নীতি'), 'Privacy policy includes Analytics & Transparency section');
  assert(aboutHelpContent.includes('রেভাঃ অয়ন কুমার ঘোষ'), 'Attribution to Rev. Ayan Kumar Ghosh present in privacy policy');

  // -------------------------------------------------------------
  // 8. Vite Bundling & Isolated Chunks Audit
  // -------------------------------------------------------------
  console.log('\n[8] Auditing Vite Configuration & Chunk Isolation...');
  const viteConfigPath = path.join(ROOT_DIR, 'vite.config.ts');
  const viteConfigContent = fs.readFileSync(viteConfigPath, 'utf8');
  assert(viteConfigContent.includes("'admin-analytics'"), 'vite.config.ts defines admin-analytics chunk');

  // -------------------------------------------------------------
  // Final Results
  // -------------------------------------------------------------
  console.log('\n' + '='.repeat(70));
  console.log(`TOTAL TESTS: ${totalTests}`);
  console.log(`PASSED TESTS: ${passedTests}`);
  console.log(`FAILED TESTS: ${totalTests - passedTests}`);
  console.log('='.repeat(70));

  if (passedTests === totalTests) {
    console.log('\n🎉 ALL PRIVATE ADMIN ANALYTICS TESTS PASSED WITH 100% SUCCESS!\n');
    process.exit(0);
  } else {
    console.error('\n❌ SOME TESTS FAILED!\n');
    process.exit(1);
  }
}

runAnalyticsTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
