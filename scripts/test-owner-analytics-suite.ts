// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// OWNER-ONLY COMPLETE ANALYTICS CENTER TEST SUITE
// Owner & Founder: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

class LocalStorageMock {
  private store: Record<string, string> = {};
  clear() {
    this.store = {};
  }
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
}

// Setup browser globals before service imports
(globalThis as any).localStorage = new LocalStorageMock();
(globalThis as any).sessionStorage = new LocalStorageMock();
(globalThis as any).window = {
  location: { hostname: 'localhost', pathname: '/', search: '' },
  matchMedia: () => ({ matches: false }),
  crypto: {
    getRandomValues: (buf: any) => {
      for (let i = 0; i < buf.length; i++) buf[i] = Math.floor(Math.random() * 256);
      return buf;
    },
  },
  addEventListener: () => {},
  removeEventListener: () => {},
};
(globalThis as any).document = {
  visibilityState: 'visible',
  addEventListener: () => {},
  removeEventListener: () => {},
  referrer: '',
};

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AuthService } from '../src/services/authService';
import { AnalyticsService } from '../src/services/analyticsService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

console.log('='.repeat(75));
console.log('BENGALI STUDY BIBLE • OWNER ANALYTICS CENTER TEST SUITE');
console.log('Owner & Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)');
console.log('='.repeat(75));

async function runTestSuite() {
  // -------------------------------------------------------------
  // SECTION 1: CODEBASE & ARCHITECTURE AUDIT
  // -------------------------------------------------------------
  console.log('\n[1] Auditing Protected Routes, Navigation & Security Gate...');
  
  const appTsx = fs.readFileSync(path.join(ROOT_DIR, 'src', 'App.tsx'), 'utf8');
  assert(
    appTsx.includes("pathname.includes('/owner/analytics')") || appTsx.includes("'/owner/analytics'"),
    "App.tsx routes '/owner/analytics' to AdminAnalyticsScreen"
  );
  assert(
    appTsx.includes("pathname.includes('/admin/analytics')") || appTsx.includes("'/admin/analytics'"),
    "App.tsx routes '/admin/analytics' to AdminAnalyticsScreen"
  );
  assert(
    appTsx.includes("pathname.includes('/owner')"),
    "App.tsx routes '/owner' to AdminAnalyticsScreen"
  );
  assert(
    appTsx.includes("<AdminAnalyticsScreen onBackToApp="),
    "App.tsx renders AdminAnalyticsScreen for activeTab === 'admin-analytics'"
  );

  const adminGate = fs.readFileSync(path.join(ROOT_DIR, 'src', 'components', 'admin', 'AdminSecurityGate.tsx'), 'utf8');
  assert(adminGate.includes('403 / ACCESS DENIED'), "AdminSecurityGate explicitly renders '403 / ACCESS DENIED'");
  assert(adminGate.includes('ayanghosh75@gmail.com'), "AdminSecurityGate displays Rev. Ayan Kumar Ghosh contact");
  assert(adminGate.includes('AuthService.isAdmin'), "AdminSecurityGate validates role via AuthService.isAdmin");

  const navBar = fs.readFileSync(path.join(ROOT_DIR, 'src', 'components', 'Navbar.tsx'), 'utf8');
  assert(navBar.includes("AuthService.isAdmin(currentUser) && ("), "Navbar hides Analytics Center menu button from normal users");

  // -------------------------------------------------------------
  // SECTION 2: HARD ACCESS CONTROL (403 CHECK IN BACKEND)
  // -------------------------------------------------------------
  console.log('\n[2] Testing Backend Data Layer Authorization...');
  
  // Ensure session is cleared first
  AuthService.revokeAdminSession();
  
  let unauthorizedBlocked = false;
  try {
    AnalyticsService.getAnalyticsReport();
  } catch (err: any) {
    if (err && err.status === 403) {
      unauthorizedBlocked = true;
    }
  }
  assert(unauthorizedBlocked, "AnalyticsService.getAnalyticsReport() throws 403 Forbidden for unauthorized/guest users");

  // Verify admin passcode validation for Rev. Ayan Kumar Ghosh
  const validPass = AuthService.verifyAdminPasscode('ayanghosh75');
  assert(validPass, "AuthService.verifyAdminPasscode('ayanghosh75') returns true for official admin passcode");

  // Grant admin session
  AuthService.grantAdminSession();
  assert(AuthService.isAdmin(), "AuthService.isAdmin() returns true after grantAdminSession()");

  let authorizedAllowed = false;
  try {
    const r = AnalyticsService.getAnalyticsReport('7days');
    if (r && r.filterRange === '7days') {
      authorizedAllowed = true;
    }
  } catch (err) {
    authorizedAllowed = false;
  }
  assert(authorizedAllowed, "AnalyticsService.getAnalyticsReport() succeeds when authorized admin session is active");

  // -------------------------------------------------------------
  // SECTION 3: REAL ENGAGEMENT TIME TRACKING & HEARTBEAT
  // -------------------------------------------------------------
  console.log('\n[3] Auditing Engagement Time Engine & Inactivity Detection...');
  const analyticsServiceCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'services', 'analyticsService.ts'), 'utf8');
  assert(analyticsServiceCode.includes('initEngagementTracker'), "AnalyticsService provides initEngagementTracker()");
  assert(analyticsServiceCode.includes('visibilitychange'), "Engagement tracker monitors document visibility changes");
  assert(analyticsServiceCode.includes('120000'), "Engagement tracker pauses timer after 120s of inactivity");
  assert(analyticsServiceCode.includes('recordEngagedTime'), "Engagement tracker updates engaged time");
  assert(analyticsServiceCode.includes('bsb_analytics_session_engagement_v1'), "Engagement tracker stores session seconds in local storage");

  // -------------------------------------------------------------
  // SECTION 4: 66-BOOK POPULARITY INDEX
  // -------------------------------------------------------------
  console.log('\n[4] Auditing 66-Book Canonical Popularity Calculation...');
  const report = AnalyticsService.getAnalyticsReport('all');
  assert(Array.isArray(report.bookPopularity), "report.bookPopularity is an array");
  assert(report.bookPopularity.length === 66, `report.bookPopularity covers exactly 66 canonical books (found: ${report.bookPopularity.length})`);
  
  const otBooks = report.bookPopularity.filter(b => b.testament === 'OT');
  const ntBooks = report.bookPopularity.filter(b => b.testament === 'NT');
  assert(otBooks.length === 39, `39 Old Testament books included (found: ${otBooks.length})`);
  assert(ntBooks.length === 27, `27 New Testament books included (found: ${ntBooks.length})`);

  const ranks = report.bookPopularity.map(b => b.rank);
  const minRank = Math.min(...ranks);
  const maxRank = Math.max(...ranks);
  assert(minRank === 1 && maxRank === 66, `Books are ranked 1 to 66 (min: ${minRank}, max: ${maxRank})`);

  // -------------------------------------------------------------
  // SECTION 5: PRIVACY & NO SURVEILLANCE RULES
  // -------------------------------------------------------------
  console.log('\n[5] Auditing Privacy Rules & Zero-Surveillance Compliance...');
  assert(AnalyticsService.sanitizeSearchQuery('   যোহন ৩:১৬   ') === 'যোহন ৩:১৬', "sanitizeSearchQuery retains valid scripture searches");
  assert(AnalyticsService.sanitizeSearchQuery('user@example.com') === null, "sanitizeSearchQuery rejects email addresses (zero PII stored)");
  assert(AnalyticsService.sanitizeSearchQuery('call 9876543210') === null, "sanitizeSearchQuery rejects phone numbers (zero PII stored)");
  assert(!analyticsServiceCode.includes('navigator.geolocation'), "Zero geolocation/GPS APIs used anywhere in AnalyticsService");
  assert(analyticsServiceCode.includes('Intl.DateTimeFormat'), "Uses coarse timezone heuristics for global reach (privacy-safe)");

  // -------------------------------------------------------------
  // SECTION 6: PWA INSTALL SIGNALS VS CONFIRMED INSTALLS
  // -------------------------------------------------------------
  console.log('\n[6] Auditing PWA Funnel Distinction (Intent vs Confirmed)...');
  assert(report.pwaFunnel !== undefined, "AnalyticsSummaryReport exposes pwaFunnel object");
  assert(typeof report.pwaFunnel.installPromptsShown === 'number', "pwaFunnel tracks installPromptsShown (Intent signal)");
  assert(typeof report.pwaFunnel.installButtonClicks === 'number', "pwaFunnel tracks installButtonClicks (Intent signal)");
  assert(typeof report.pwaFunnel.installPromptsAccepted === 'number', "pwaFunnel tracks installPromptsAccepted");
  assert(typeof report.pwaFunnel.appinstalledEvents === 'number', "pwaFunnel tracks appinstalledEvents (Confirmed browser event)");
  assert(typeof report.pwaFunnel.standalonePwaLaunches === 'number', "pwaFunnel tracks standalonePwaLaunches (Confirmed actual standalone use)");

  // -------------------------------------------------------------
  // SECTION 7: REPORTS, CSV EXPORT & EXECUTIVE EMAIL
  // -------------------------------------------------------------
  console.log('\n[7] Auditing CSV Export & Executive Email Summary...');
  const csvData = AnalyticsService.exportAnalyticsCsv(report);
  assert(csvData.includes('Bengali Study Bible - Owner Analytics Export'), "CSV export contains 'Bengali Study Bible - Owner Analytics Export' header");
  assert(csvData.includes('Key Metrics,Value'), "CSV export contains Key Metrics,Value format");
  assert(csvData.includes('Total Users (Sessions)'), "CSV export contains session metrics");

  const emailText = AnalyticsService.generateWeeklyEmailSummaryText(report);
  assert(emailText.includes('রেভা. অয়ন কুমার ঘোষ') || emailText.includes('Rev. Ayan Kumar Ghosh'), "Weekly email personalized for Rev. Ayan Kumar Ghosh");
  assert(emailText.includes('ayanghosh75@gmail.com'), "Weekly email contains official recipient ayanghosh75@gmail.com");

  const monthlyReport = AnalyticsService.generateMonthlyGrowthReport(report);
  assert(monthlyReport.includes('মাসিক প্রবৃদ্ধি ও প্রসার প্রতিবেদন'), "Monthly growth report generated with Bengali title");
  assert(monthlyReport.includes('ayanghosh75@gmail.com'), "Monthly growth report contains owner contact ayanghosh75@gmail.com");

  // -------------------------------------------------------------
  // SECTION 8: 14 SUMMARY KPI CARDS & 10 DASHBOARD TABS
  // -------------------------------------------------------------
  console.log('\n[8] Auditing Admin Analytics Screen Components & KPIs...');
  const screenCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'screens', 'admin', 'AdminAnalyticsScreen.tsx'), 'utf8');
  assert(screenCode.includes('রেভাঃ অয়ন কুমার ঘোষ'), "Header displays Rev. Ayan Kumar Ghosh as official owner");
  assert(screenCode.includes('ayanghosh75@gmail.com'), "Header displays official owner email ayanghosh75@gmail.com");
  assert(screenCode.includes('TODAY AT A GLANCE') || screenCode.includes('আজ এক নজরে'), "Screen includes 'Today at a Glance' section");
  
  // 14 KPI Cards
  assert(screenCode.includes('আজকের পাঠক'), "KPI 1: Today's Users card exists");
  assert(screenCode.includes('বর্তমানে সক্রিয়'), "KPI 2: Currently Active card exists");
  assert(screenCode.includes('নতুন ব্যবহারকারী'), "KPI 3: New Users card exists");
  assert(screenCode.includes('ফিরে আসা পাঠক'), "KPI 4: Returning Users card exists");
  assert(screenCode.includes('৭ দিনের সক্রিয়'), "KPI 5: 7-Day Active (WAU) card exists");
  assert(screenCode.includes('৩০ দিনের সক্রিয়'), "KPI 6: 30-Day Active (MAU) card exists");
  assert(screenCode.includes('নিশ্চিত PWA ইনস্টল'), "KPI 7: Observed Installs card exists");
  assert(screenCode.includes('গড় এনগেজড সময়'), "KPI 8: Avg Engaged Time card exists");
  assert(screenCode.includes('আজকের সেশন'), "KPI 9: Sessions Today card exists");
  assert(screenCode.includes('বাইবেল পাঠ'), "KPI 10: Chapters Read card exists");
  assert(screenCode.includes('মোট অনুসন্ধান'), "KPI 11: Searches card exists");
  assert(screenCode.includes('স্টাডি টুলস'), "KPI 12: Study Sessions card exists");
  assert(screenCode.includes('সার্মন তৈরি'), "KPI 13: Sermons Built card exists");
  assert(screenCode.includes('প্রাপ্ত মতামত'), "KPI 14: Feedback Reports card exists");

  // Filter verification
  assert(screenCode.includes("'production'"), "Includes Production Only filter (default)");
  assert(screenCode.includes("'7days'"), "Includes 7 days filter");
  assert(screenCode.includes("'30days'"), "Includes 30 days filter");

  // Tab navigation verification
  assert(screenCode.includes("'overview'"), "Subtab 1: Overview tab exists");
  assert(screenCode.includes("'users'"), "Subtab 2: Users & Engaged Time tab exists");
  assert(screenCode.includes("'bible'"), "Subtab 3: 66 Books tab exists");
  assert(screenCode.includes("'search_study'"), "Subtab 4: Search & Study tab exists");
  assert(screenCode.includes("'sermon_ask'"), "Subtab 5: Sermon Builder & Ask Bible tab exists");
  assert(screenCode.includes("'install_device'"), "Subtab 6: Installation & Devices tab exists");
  assert(screenCode.includes("'traffic_global'"), "Subtab 7: Traffic & Global Reach tab exists");
  assert(screenCode.includes("'funnel_retention'"), "Subtab 8: Funnel & Retention tab exists");
  assert(screenCode.includes("'feedback_health'"), "Subtab 9: Feedback & System Health tab exists");
  assert(screenCode.includes("'reports_export'"), "Subtab 10: Reports & CSV Export tab exists");

  // Clean up
  AuthService.revokeAdminSession();

  console.log('\n' + '='.repeat(75));
  console.log(`OWNER ANALYTICS AUDIT COMPLETE: ${passedTests} / ${totalTests} CHECKS PASSED`);
  console.log('='.repeat(75));

  if (passedTests === totalTests) {
    console.log('🎉 ALL OWNER ANALYTICS SYSTEM CHECKS PASSED 100%!');
  } else {
    throw new Error(`Failed ${totalTests - passedTests} checks!`);
  }
}

runTestSuite().catch(err => {
  console.error(err);
  process.exit(1);
});
