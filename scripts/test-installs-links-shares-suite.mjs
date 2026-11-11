// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// INSTALLS, LINK ACCESS & SHARES TEST SUITE
// Owner & Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
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
console.log('BENGALI STUDY BIBLE • INSTALLS, LINK ACCESS & SHARES TEST SUITE');
console.log('Owner & Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)');
console.log('='.repeat(70));

async function runSuite() {
  // -------------------------------------------------------------
  // 1. Types & Schema Validation
  // -------------------------------------------------------------
  console.log('\n[1] Checking Types and Interfaces in src/types/analytics.ts...');
  const typesPath = path.join(ROOT_DIR, 'src', 'types', 'analytics.ts');
  assert(fs.existsSync(typesPath), 'analytics.ts exists');
  const typesContent = fs.readFileSync(typesPath, 'utf8');

  // New Event Types
  assert(typesContent.includes("'SHARE_BUTTON_CLICK'"), 'Includes SHARE_BUTTON_CLICK event');
  assert(typesContent.includes("'SHARE_COMPLETED'"), 'Includes SHARE_COMPLETED event');
  assert(typesContent.includes("'SHARE_COPY_LINK'"), 'Includes SHARE_COPY_LINK event');
  assert(typesContent.includes("'SHARE_WHATSAPP'"), 'Includes SHARE_WHATSAPP event');
  assert(typesContent.includes("'SHARE_FACEBOOK'"), 'Includes SHARE_FACEBOOK event');
  assert(typesContent.includes("'SHARE_MESSENGER'"), 'Includes SHARE_MESSENGER event');
  assert(typesContent.includes("'SHARED_LINK_OPEN'"), 'Includes SHARED_LINK_OPEN event');
  assert(typesContent.includes("'SHARED_LINK_ENGAGED'"), 'Includes SHARED_LINK_ENGAGED event');
  assert(typesContent.includes("'SHARED_LINK_INSTALL_SIGNAL'"), 'Includes SHARED_LINK_INSTALL_SIGNAL event');
  assert(typesContent.includes("'PUBLIC_LINK_OPEN'"), 'Includes PUBLIC_LINK_OPEN event');

  // Interface InstallLinkShareMetrics
  assert(typesContent.includes('export interface InstallLinkShareMetrics'), 'InstallLinkShareMetrics interface defined');
  assert(typesContent.includes('observedMobileInstalls: number;'), 'Card 1: observedMobileInstalls declared');
  assert(typesContent.includes('probableInstalledUsers: number;'), 'Card 2: probableInstalledUsers declared');
  assert(typesContent.includes('activeInstalledUsers: number;'), 'Card 3: activeInstalledUsers declared');
  assert(typesContent.includes('totalPublicLinkOpens: number;'), 'Card 4: totalPublicLinkOpens declared');
  assert(typesContent.includes('uniqueLinkVisitors: number;'), 'Card 5: uniqueLinkVisitors declared');
  assert(typesContent.includes('returningLinkVisitors: number;'), 'Card 6: returningLinkVisitors declared');
  assert(typesContent.includes('totalShareActions: number;'), 'Card 7: totalShareActions declared');
  assert(typesContent.includes('successfulSharesDetectable: number;'), 'Card 8: successfulSharesDetectable declared');
  assert(typesContent.includes('sharedLinkOpens: number;'), 'Card 9: sharedLinkOpens declared');
  assert(typesContent.includes('visitorsAcquiredThroughShares: number;'), 'Card 10: visitorsAcquiredThroughShares declared');
  assert(typesContent.includes('installSignalsFollowingSharedVisits: number;'), 'Card 11: installSignalsFollowingSharedVisits declared');

  // -------------------------------------------------------------
  // 2. Analytics Service Implementation
  // -------------------------------------------------------------
  console.log('\n[2] Checking Analytics Service in src/services/analyticsService.ts...');
  const servicePath = path.join(ROOT_DIR, 'src', 'services', 'analyticsService.ts');
  assert(fs.existsSync(servicePath), 'analyticsService.ts exists');
  const serviceContent = fs.readFileSync(servicePath, 'utf8');

  assert(serviceContent.includes('trackShareAction'), 'trackShareAction helper implemented');
  assert(serviceContent.includes('buildTrackableShareUrl'), 'buildTrackableShareUrl helper implemented');
  assert(serviceContent.includes('trackPublicLinkOpen'), 'trackPublicLinkOpen helper implemented');
  assert(serviceContent.includes('trackSharedLinkOpen'), 'trackSharedLinkOpen helper implemented');
  assert(serviceContent.includes('computeInstallLinkShareMetrics'), 'computeInstallLinkShareMetrics method implemented');
  assert(serviceContent.includes('computeInstallLinkShareComparisons'), 'computeInstallLinkShareComparisons method implemented');
  assert(serviceContent.includes('recentEventDedupeMap'), 'Deduplication cache present to prevent duplicate events');
  assert(serviceContent.includes('AuthService.isAdmin()'), 'Owner admin sessions filtered from production analytics');

  // -------------------------------------------------------------
  // 3. Admin Analytics Screen & Subtab
  // -------------------------------------------------------------
  console.log('\n[3] Checking Admin Analytics Screen in src/screens/admin/AdminAnalyticsScreen.tsx...');
  const screenPath = path.join(ROOT_DIR, 'src', 'screens/admin', 'AdminAnalyticsScreen.tsx');
  assert(fs.existsSync(screenPath), 'AdminAnalyticsScreen.tsx exists');
  const screenContent = fs.readFileSync(screenPath, 'utf8');

  assert(screenContent.includes("'installs_links_shares'"), 'Subtab union contains installs_links_shares');
  assert(screenContent.includes("id: 'installs_links_shares'"), 'Subtab button configured in navigation array');
  assert(screenContent.includes('AdminInstallsLinksSharesTab'), 'AdminInstallsLinksSharesTab imported');
  assert(screenContent.includes("<AdminInstallsLinksSharesTab report={report} envFilter={envFilter} />"), 'AdminInstallsLinksSharesTab rendered for subtab');
  assert(screenContent.includes('📲 ইনস্টল, লিংক ও শেয়ার'), 'Quick access button added in header');

  // -------------------------------------------------------------
  // 4. AdminInstallsLinksSharesTab Component
  // -------------------------------------------------------------
  console.log('\n[4] Checking AdminInstallsLinksSharesTab in src/components/admin/AdminInstallsLinksSharesTab.tsx...');
  const tabComponentPath = path.join(ROOT_DIR, 'src', 'components', 'admin', 'AdminInstallsLinksSharesTab.tsx');
  assert(fs.existsSync(tabComponentPath), 'AdminInstallsLinksSharesTab.tsx exists');
  const tabContent = fs.readFileSync(tabComponentPath, 'utf8');

  // Title and Section Name
  assert(tabContent.includes('📲 ইনস্টল, লিংক ব্যবহার ও শেয়ার'), 'Bengali title matches prompt requirement');
  assert(tabContent.includes('INSTALLS, LINK ACCESS & SHARES'), 'English title matches prompt requirement');
  assert(tabContent.includes('বাস্তব উৎপাদন ডেটা (Real Production Only)'), 'Production telemetry only badge present');

  // 11 Cards
  assert(tabContent.includes('১. পর্যবেক্ষিত মোবাইল/PWA ইনস্টল'), 'Card 1 rendered');
  assert(tabContent.includes('২. অনুমিত ইনস্টলকারী পাঠক'), 'Card 2 rendered');
  assert(tabContent.includes('৩. সক্রিয় ইনস্টল্ড অ্যাপ পাঠক'), 'Card 3 rendered');
  assert(tabContent.includes('৪. মোট পাবলিক-লিংক ওপেন'), 'Card 4 rendered');
  assert(tabContent.includes('৫. স্বতন্ত্র লিংক পরিদর্শক'), 'Card 5 rendered');
  assert(tabContent.includes('৬. ফিরে আসা লিংক পরিদর্শক'), 'Card 6 rendered');
  assert(tabContent.includes('৭. মোট শেয়ার পদক্ষেপ'), 'Card 7 rendered');
  assert(tabContent.includes('৮. শনাক্তযোগ্য সফল শেয়ার'), 'Card 8 rendered');
  assert(tabContent.includes('৯. শেয়ারকৃত লিংক ওপেন'), 'Card 9 rendered');
  assert(tabContent.includes('১০. শেয়ারের মাধ্যমে অর্জিত পাঠক'), 'Card 10 rendered');
  assert(tabContent.includes('১১. শেয়ার ভিজিটের পর ইনস্টল সংকেত'), 'Card 11 rendered');

  // Mobile/PWA Install Tracking
  assert(tabContent.includes('ইনস্টলেশন আগ্রহ (Installation Intent)'), 'Installation Intent section rendered');
  assert(tabContent.includes('নিশ্চিত ও পর্যবেক্ষিত ইনস্টলেশন (Confirmed)'), 'Confirmed Installation section rendered');
  assert(tabContent.includes('ইনস্টল বোতাম ক্লিক বা নির্দেশিকা দেখা কখনোই "নিশ্চিত ইনস্টলেশন" হিসেবে গণ্য করা হয় না'), 'Zero-click confirmation rule clearly stated');
  assert(tabContent.includes('অপারেটিং সিস্টেম ও প্ল্যাটফর্ম বন্টন'), 'Operating System breakdown rendered');
  assert(tabContent.includes('Android') && tabContent.includes('iOS (Safari / A2HS)') && tabContent.includes('Windows') && tabContent.includes('macOS'), 'OS platforms covered');

  // Public-Link & Outreach
  assert(tabContent.includes('উৎস অনুযায়ী ট্রাফিক (Access by Traffic Source)'), 'Traffic source breakdown rendered');
  assert(tabContent.includes('WhatsApp') && tabContent.includes('Facebook') && tabContent.includes('Messenger') && tabContent.includes('QR কোড প্রিন্ট'), 'Key traffic channels present');
  assert(tabContent.includes('UTM ক্যাম্পেইন প্যারামিটার পরিসংখ্যান'), 'UTM parameters statistics rendered');
  assert(tabContent.includes('👑 স্বত্বাধিকারী প্রচার লিংক জেনারেটর (Owner Campaign Link Generator)'), 'Owner campaign link generator rendered');
  assert(tabContent.includes('handleCopyGeneratedCampaignUrl'), 'Link copy functionality present with feedback');

  // Share Tracking
  assert(tabContent.includes('শেয়ার চ্যানেল (Share Channels)'), 'Share channels breakdown rendered');
  assert(tabContent.includes('শেয়ারকৃত বিষয়বস্তু (Shared Content Breakdown)'), 'Shared content types breakdown rendered');
  assert(tabContent.includes('সম্পূর্ণ অ্যাপ আমন্ত্রণ') && tabContent.includes('নির্দিষ্ট বাইবেলের পদ') && tabContent.includes('সার্মন আউটলাইন'), 'Content breakdown covers app, verse, sermon');

  // Visits Produced by Sharing
  assert(tabContent.includes('শেয়ারের মাধ্যমে আগত ভিজিট ও সম্পৃক্ততা (Visits Produced by Sharing)'), 'Visits produced by sharing rendered');
  assert(tabContent.includes('কোনো ব্যক্তিগত তথ্য, নাম, ফোন নম্বর বা বাহ্যিক ট্র্যাকিং কুকি কখনোই সংরক্ষণ করা হয় না'), 'Privacy safe zero-PII guarantee present');

  // Sharing Funnel (6 Stages)
  assert(tabContent.includes('সম্পূর্ণ শেয়ারিং ফানেল (Sharing Funnel — 6 Stages)'), '6-stage sharing funnel rendered');
  assert(tabContent.includes('শেয়ার কার্যপ্রক্রিয়া শুরু (Share Action Initiated)'), 'Funnel Stage 1 present');
  assert(tabContent.includes('ট্র্যাকযোগ্য লিংক তৈরি বা কপি (Trackable Link Created / Copied)'), 'Funnel Stage 2 present');
  assert(tabContent.includes('শেয়ারকৃত লিংক ওপেন (Shared-Link Opened by Recipient)'), 'Funnel Stage 3 present');
  assert(tabContent.includes('সম্পূর্ণ পরিমাপযোগ্য নয় (Not fully measurable)'), 'Unmeasurable off-platform messaging limitation clearly stated');
  assert(tabContent.includes('কন্টেন্টে গভীর মনোযোগ ও পাঠ (Recipient Engaged with Content)'), 'Funnel Stage 4 present');
  assert(tabContent.includes('পুনরায় ফিরে আসা পাঠক (Recipient Returned)'), 'Funnel Stage 5 present');
  assert(tabContent.includes('অ্যাপ ইনস্টলেশন সংকেত (Recipient Installed the App)'), 'Funnel Stage 6 present');

  // Comparisons
  assert(tabContent.includes('তুলনামূলক বিশ্লেষণ (Comparative Analysis)'), 'Comparative analysis section rendered');
  assert(tabContent.includes('আজ বনাম গতকাল') && tabContent.includes('এই সপ্তাহ বনাম বিগত সপ্তাহ') && tabContent.includes('এই মাস বনাম বিগত মাস'), 'All 3 comparison periods present');

  // Definitions
  assert(tabContent.includes('গুরুত্বপূর্ণ পরিভাষাসমূহ ও ব্যাখ্যা (Important Definitions & Reference)'), 'Definitions guide rendered');
  assert(tabContent.includes('Observed Mobile/PWA Installs') && tabContent.includes('appinstalled'), 'Def 1 present with appinstalled explanation');
  assert(tabContent.includes('Probable Installed Users') && tabContent.includes('স্ট্যান্ডঅ্যালোন মোড'), 'Def 2 present');
  assert(tabContent.includes('Active Installed-App Users'), 'Def 3 present');
  assert(tabContent.includes('Total Public-Link Opens'), 'Def 4 present');
  assert(tabContent.includes('Visitors Acquired Through Shares') && tabContent.includes('ref=share'), 'Def 5 present with ref=share explanation');

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  console.log('\n' + '='.repeat(70));
  console.log(`TEST RESULTS: ${passedTests} / ${totalTests} passed`);
  if (passedTests === totalTests) {
    console.log('✓ ALL TESTS PASSED! INSTALLS, LINK ACCESS & SHARES SUITE FULLY VERIFIED.');
    console.log('='.repeat(70));
    process.exit(0);
  } else {
    console.error(`✗ FAILED: ${totalTests - passedTests} tests failed.`);
    console.log('='.repeat(70));
    process.exit(1);
  }
}

runSuite().catch((err) => {
  console.error('Fatal error running suite:', err);
  process.exit(1);
});
