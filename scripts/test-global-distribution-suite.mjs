// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// GLOBAL DISTRIBUTION & ORGANIC GROWTH TEST SUITE
// Founder, Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ [FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
  }
}

console.log('============================================================');
console.log('বাংলা স্টাডি বাইবেল (Bengali Study Bible)');
console.log('GLOBAL DISTRIBUTION & ORGANIC GROWTH VERIFICATION SUITE');
console.log('Owner & Developer: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)');
console.log('============================================================\n');

// ------------------------------------------------------------
// TEST SUITE 1: Church & Ministry Partner Kit (/partners)
// ------------------------------------------------------------
console.log('--- TEST GROUP 1: Church & Ministry Partner Kit (/partners) ---');

const partnerKitPath = path.join(rootDir, 'src', 'screens', 'PartnerKitScreen.tsx');
assert(fs.existsSync(partnerKitPath), 'PartnerKitScreen.tsx file exists');

const partnerKitContent = fs.readFileSync(partnerKitPath, 'utf-8');

assert(
  partnerKitContent.includes('মণ্ডলী ও মিনিস্ট্রি পার্টনার কিট'),
  'PartnerKitScreen contains primary title in Bengali'
);

assert(
  partnerKitContent.includes('উপাসনা ঘোষণা স্ক্রিপ্ট') &&
  partnerKitContent.includes('মুদ্রিত বুলেটিন নোটিশ') &&
  partnerKitContent.includes('হোয়াটসঅ্যাপ সম্প্রচার বার্তা'),
  'PartnerKitScreen contains pulpit script, church bulletin, and WhatsApp broadcast templates'
);

assert(
  partnerKitContent.includes('Rev. Ayan Kumar Ghosh') &&
  partnerKitContent.includes('ayanghosh75@gmail.com'),
  'PartnerKitScreen attributes Founder Rev. Ayan Kumar Ghosh and contact email'
);

assert(
  partnerKitContent.includes('bengali-study-bible-poster-official.png') &&
  partnerKitContent.includes('bengali-study-bible-sermon-slide-16x9.png') &&
  partnerKitContent.includes('bengali-study-bible-social-square.png') &&
  partnerKitContent.includes('bengali-study-bible-visiting-card.png') &&
  partnerKitContent.includes('qr-bengalistudybible-3000px.png'),
  'PartnerKitScreen references all 5 official printable & digital media assets'
);

assert(
  partnerKitContent.includes('১০০% বিনামূল্যে ও বিজ্ঞাপনহীন') &&
  partnerKitContent.includes('বিশুদ্ধ ৬৬-পুস্তক ক্যানন'),
  'PartnerKitScreen emphasizes zero ads, 100% free, and 66-book canon'
);

// ------------------------------------------------------------
// TEST SUITE 2: Public Beta Invitation Screen (/beta)
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 2: Public Beta Invitation Screen (/beta) ---');

const betaInvitePath = path.join(rootDir, 'src', 'screens', 'BetaInviteScreen.tsx');
assert(fs.existsSync(betaInvitePath), 'BetaInviteScreen.tsx file exists');

const betaInviteContent = fs.readFileSync(betaInvitePath, 'utf-8');

assert(
  betaInviteContent.includes('বাংলা স্টাডি বাইবেল — পাবলিক বিটা'),
  'BetaInviteScreen contains official Public Beta title'
);

assert(
  betaInviteContent.includes('প্রতিষ্ঠাতার ব্যক্তিগত বার্তা') &&
  betaInviteContent.includes('রেভা. অয়ন কুমার ঘোষ'),
  'BetaInviteScreen contains personal Founder letter from Rev. Ayan Kumar Ghosh'
);

assert(
  betaInviteContent.includes('সাধারণ বাইবেল পাঠক') &&
  betaInviteContent.includes('পালক ও মণ্ডলী প্রচারক') &&
  betaInviteContent.includes('থিওলজি ও বাইবেল শিক্ষার্থী') &&
  betaInviteContent.includes('যুবসমাজ ও সানডে স্কুল নেতৃত্ব'),
  'BetaInviteScreen includes targeted callouts for all 4 key audience groups'
);

assert(
  betaInviteContent.includes('onNavigateToBible') &&
  betaInviteContent.includes('onNavigateToInstall') &&
  betaInviteContent.includes('onNavigateToFeedback') &&
  betaInviteContent.includes('onNavigateToPartners'),
  'BetaInviteScreen connects actions to Bible, Install, Feedback, and Partners'
);

// ------------------------------------------------------------
// TEST SUITE 3: Campaign & Attribution Service
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 3: Campaign & Attribution Service ---');

const campaignServicePath = path.join(rootDir, 'src', 'services', 'campaignService.ts');
assert(fs.existsSync(campaignServicePath), 'campaignService.ts file exists');

const campaignContent = fs.readFileSync(campaignServicePath, 'utf-8');

assert(
  campaignContent.includes('https://bengalistudybible.com'),
  'campaignService.ts defines canonical production URL https://bengalistudybible.com'
);

assert(
  campaignContent.includes('buildCampaignUrl') &&
  campaignContent.includes('utm_source') &&
  campaignContent.includes('utm_medium') &&
  campaignContent.includes('utm_campaign') &&
  campaignContent.includes('ref'),
  'campaignService.ts implements buildCampaignUrl with standard UTMs and ref code'
);

assert(
  campaignContent.includes('detectClientRegion') &&
  campaignContent.includes('bangladesh') &&
  campaignContent.includes('india') &&
  campaignContent.includes('north_america') &&
  campaignContent.includes('uk_europe') &&
  campaignContent.includes('middle_east'),
  'campaignService.ts implements privacy-preserving regional detection across global diaspora'
);

assert(
  !campaignContent.includes('geolocation') &&
  !campaignContent.includes('getCurrentPosition'),
  'campaignService.ts strictly avoids GPS / geolocation tracking'
);

assert(
  campaignContent.includes('processInboundReferral'),
  'campaignService.ts captures and records inbound referrals safely'
);

// ------------------------------------------------------------
// TEST SUITE 4: Admin Global Reach & Distribution Console
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 4: Admin Global Reach & Distribution Console ---');

const adminDistPath = path.join(rootDir, 'src', 'screens', 'admin', 'AdminGlobalDistributionScreen.tsx');
assert(fs.existsSync(adminDistPath), 'AdminGlobalDistributionScreen.tsx file exists');

const adminDistContent = fs.readFileSync(adminDistPath, 'utf-8');

assert(
  adminDistContent.includes('AdminSecurityGate'),
  'AdminGlobalDistributionScreen is protected by AdminSecurityGate'
);

assert(
  adminDistContent.includes('ক্যাম্পেইন ও অ্যাম্বাসেডর লিংক জেনারেটর'),
  'AdminGlobalDistributionScreen contains interactive Campaign & Ambassador link generator'
);

assert(
  adminDistContent.includes('সাপ্তাহিক সামাজিক যোগাযোগ ও মণ্ডলী পোস্ট শিডিউল'),
  'AdminGlobalDistributionScreen contains 7-day social media publishing plan'
);

const adminDashboardPath = path.join(rootDir, 'src', 'screens', 'AdminDashboardScreen.tsx');
const adminDashboardContent = fs.readFileSync(adminDashboardPath, 'utf-8');

assert(
  adminDashboardContent.includes('AdminGlobalDistributionScreen') &&
  adminDashboardContent.includes('global_distribution'),
  'AdminDashboardScreen integrates AdminGlobalDistributionScreen tab'
);

// ------------------------------------------------------------
// TEST SUITE 5: Global Hero Banner on HomeScreen
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 5: Global Hero Banner & Easy Access Hub on HomeScreen ---');

const homeScreenPath = path.join(rootDir, 'src', 'screens', 'HomeScreen.tsx');
const homeScreenContent = fs.readFileSync(homeScreenPath, 'utf-8');

assert(
  homeScreenContent.includes('📖 বাইবেল পড়ুন') &&
  homeScreenContent.includes('🔎 বাইবেল অধ্যয়ন করুন') &&
  homeScreenContent.includes('🌱 বাইবেল প্রথমবার পড়ছেন?') &&
  homeScreenContent.includes('📱 ফোনে ইনস্টল করুন') &&
  homeScreenContent.includes('🎓 কীভাবে ব্যবহার করবেন'),
  'HomeScreen features all 5 CTAs (Primary, Secondary, and 3 Additional CTAs)'
);

assert(
  homeScreenContent.includes('EasyAccessHub') &&
  fs.existsSync(path.join(rootDir, 'src', 'components', 'home', 'EasyAccessHub.tsx')),
  'HomeScreen integrates EasyAccessHub component'
);

assert(
  homeScreenContent.includes('onNavigateToPartners') &&
  homeScreenContent.includes('onNavigateToBeta'),
  'HomeScreen supports navigation to /partners and /beta'
);

assert(
  homeScreenContent.includes('ভারত, বাংলাদেশ ও সারা বিশ্বের বাংলাভাষী খ্রীষ্টবিশ্বাসীদের জন্য'),
  'HomeScreen features global diaspora welcome statement'
);

// ------------------------------------------------------------
// TEST SUITE 6: Deep Link Routing & Footer Navigation
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 6: Deep Link Routing & Footer Navigation ---');

const appPath = path.join(rootDir, 'src', 'App.tsx');
const appContent = fs.readFileSync(appPath, 'utf-8');

assert(
  appContent.includes('PartnerKitScreen') &&
  appContent.includes('BetaInviteScreen') &&
  appContent.includes('NewcomerStartScreen'),
  'App.tsx imports PartnerKitScreen, BetaInviteScreen, and NewcomerStartScreen'
);

assert(
  appContent.includes("pathname.includes('/partners')") &&
  appContent.includes("pathname.includes('/beta')") &&
  appContent.includes("pathname.includes('/start')") &&
  appContent.includes("pathname.includes('/tutorial')"),
  'App.tsx handles /partners, /beta, /start, and /tutorial path routing'
);

assert(
  appContent.includes('CampaignService.processInboundReferral()'),
  'App.tsx invokes CampaignService.processInboundReferral() on startup'
);

const footerPath = path.join(rootDir, 'src', 'components', 'Footer.tsx');
const footerContent = fs.readFileSync(footerPath, 'utf-8');

assert(
  footerContent.includes("onSelectTab('partners')") &&
  footerContent.includes("onSelectTab('beta')"),
  'Footer.tsx contains direct links to /partners and /beta'
);

// ------------------------------------------------------------
// TEST SUITE 7: Resource 1-Click Sharing in Study Screen
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 7: Resource 1-Click Sharing in Study Screen ---');

const studyScreenPath = path.join(rootDir, 'src', 'screens', 'StudyScreen.tsx');
const studyScreenContent = fs.readFileSync(studyScreenPath, 'utf-8');

assert(
  studyScreenContent.includes('handleShareTopic') &&
  studyScreenContent.includes('handleShareCharacter'),
  'StudyScreen provides 1-click share handlers for Topics and Characters'
);

assert(
  studyScreenContent.includes('params.get(\'topic\')') &&
  studyScreenContent.includes('params.get(\'char\')'),
  'StudyScreen parses ?topic= and ?char= query parameters for direct modal deep linking'
);

// ------------------------------------------------------------
// TEST SUITE 8: Voluntary Diaspora Country Selector in Feedback
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 8: Voluntary Diaspora Country Selector in Feedback ---');

const feedbackScreenPath = path.join(rootDir, 'src', 'screens', 'FeedbackScreen.tsx');
const feedbackScreenContent = fs.readFileSync(feedbackScreenPath, 'utf-8');

assert(
  feedbackScreenContent.includes('countryRegion') &&
  feedbackScreenContent.includes('দেশ / অঞ্চল (ঐচ্ছিক)'),
  'FeedbackScreen contains optional voluntary country/region input field'
);

const feedbackTypesPath = path.join(rootDir, 'src', 'types', 'feedback.ts');
const feedbackTypesContent = fs.readFileSync(feedbackTypesPath, 'utf-8');

assert(
  feedbackTypesContent.includes('countryRegion?: string;'),
  'Feedback types include optional countryRegion field'
);

// ------------------------------------------------------------
// TEST SUITE 9: Production SEO (Sitemap & Robots.txt)
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 9: Production SEO (Sitemap & Robots.txt) ---');

const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml exists');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

assert(
  sitemapContent.includes('<loc>https://bengalistudybible.com/partners</loc>') &&
  sitemapContent.includes('<loc>https://bengalistudybible.com/start</loc>') &&
  sitemapContent.includes('<loc>https://bengalistudybible.com/beta</loc>') &&
  sitemapContent.includes('<loc>https://bengalistudybible.com/install</loc>') &&
  sitemapContent.includes('<loc>https://bengalistudybible.com/share</loc>'),
  'sitemap.xml contains /partners, /start, /beta, /install, and /share URLs'
);

const robotsPath = path.join(rootDir, 'public', 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt exists');
const robotsContent = fs.readFileSync(robotsPath, 'utf-8');

assert(
  robotsContent.includes('Disallow: /admin') &&
  robotsContent.includes('Sitemap: https://bengalistudybible.com/sitemap.xml'),
  'robots.txt excludes /admin and references sitemap.xml'
);

// ------------------------------------------------------------
// TEST SUITE 10: Strict Ethical Growth / Zero Spam Verification
// ------------------------------------------------------------
console.log('\n--- TEST GROUP 10: Strict Ethical Growth / Zero Spam Verification ---');

const allSrcFiles = [
  campaignContent,
  partnerKitContent,
  betaInviteContent,
  adminDistContent,
];

let hasScraper = false;
let hasAutoPoster = false;
let hasPaidAdTracker = false;

for (const fileContent of allSrcFiles) {
  if (fileContent.includes('scrape') || fileContent.includes('bot_post') || fileContent.includes('facebook_graph_post')) {
    hasScraper = true;
  }
  if (fileContent.includes('autoJoin') || fileContent.includes('bulk_email')) {
    hasAutoPoster = true;
  }
  if (fileContent.includes('google_ads') || fileContent.includes('facebook_pixel') || fileContent.includes('adsense')) {
    hasPaidAdTracker = true;
  }
}

assert(!hasScraper, 'Codebase contains zero scraping mechanisms');
assert(!hasAutoPoster, 'Codebase contains zero automatic group posting or bulk spam tools');
assert(!hasPaidAdTracker, 'Codebase contains zero commercial ad trackers or pixels');

// ------------------------------------------------------------
// SUMMARY
// ------------------------------------------------------------
console.log('\n============================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED:      ${passedTests}`);
console.log(`FAILED:      ${failedTests}`);
console.log(`SUCCESS RATE: ${Math.round((passedTests / totalTests) * 100)}%`);
console.log('============================================================');

if (failedTests > 0) {
  console.error(`\n❌ ${failedTests} test(s) failed!`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL GLOBAL DISTRIBUTION & ORGANIC GROWTH TESTS PASSED 100%!');
  process.exit(0);
}
