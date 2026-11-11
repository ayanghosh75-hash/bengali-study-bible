// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// UNIVERSAL MOBILE INSTALL & SHARE LINK TEST SUITE
// Founder, Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
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
console.log('BENGALI STUDY BIBLE • UNIVERSAL MOBILE INSTALL & SHARE TEST SUITE');
console.log('Founder, Owner & Developer: Rev. Ayan Kumar Ghosh');
console.log('Contact: ayanghosh75@gmail.com');
console.log('='.repeat(70));

async function runTestSuite() {
  // -------------------------------------------------------------
  // 1. PWA Web App Manifest Audit
  // -------------------------------------------------------------
  console.log('\n[1] Auditing PWA Web App Manifest & App Identity...');
  const manifestPath = path.join(ROOT_DIR, 'public', 'manifest.webmanifest');
  assert(fs.existsSync(manifestPath), 'manifest.webmanifest exists in public directory');

  const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(manifestContent.name === 'বাংলা স্টাডি বাইবেল', 'Manifest name is "বাংলা স্টাডি বাইবেল"');
  assert(manifestContent.short_name === 'বাংলা বাইবেল', 'Manifest short_name is "বাংলা বাইবেল"');
  assert(manifestContent.start_url === '/', 'Manifest start_url is "/"');
  assert(manifestContent.display === 'standalone', 'Manifest display mode is "standalone"');
  assert(manifestContent.theme_color === '#0B192C', 'Manifest theme_color is Navy (#0B192C)');
  assert(manifestContent.background_color === '#0B192C', 'Manifest background_color is Navy (#0B192C)');

  // Verify all declared icons exist on disk
  assert(Array.isArray(manifestContent.icons) && manifestContent.icons.length >= 4, 'Manifest has at least 4 icon declarations');
  let allIconsExist = true;
  for (const icon of manifestContent.icons) {
    const iconRelativePath = icon.src.startsWith('/') ? icon.src.slice(1) : icon.src;
    const fullIconPath = path.join(ROOT_DIR, 'public', iconRelativePath);
    if (!fs.existsSync(fullIconPath) || fs.statSync(fullIconPath).size === 0) {
      allIconsExist = false;
      console.error(`Missing or empty icon: ${fullIconPath}`);
    }
  }
  assert(allIconsExist, 'All manifest icons (192px, 512px, maskable, apple-touch) exist on disk with valid size');

  // -------------------------------------------------------------
  // 2. Service Worker Infrastructure Audit
  // -------------------------------------------------------------
  console.log('\n[2] Auditing Service Worker (sw.js) & Precache Assets...');
  const swPath = path.join(ROOT_DIR, 'public', 'sw.js');
  assert(fs.existsSync(swPath), 'public/sw.js exists');

  const swContent = fs.readFileSync(swPath, 'utf8');
  assert(swContent.includes('STATIC_CACHE'), 'Service worker defines STATIC_CACHE');
  assert(swContent.includes('skipWaiting'), 'Service worker supports skipWaiting');
  assert(swContent.includes("request.mode === 'navigate'"), 'Service worker handles navigate requests with offline fallback');
  assert(swContent.includes('FONT_CACHE'), 'Service worker caches Google Fonts (Noto Sans & Noto Serif Bengali)');

  // -------------------------------------------------------------
  // 3. Mobile Install Landing Page (/install) Audit
  // -------------------------------------------------------------
  console.log('\n[3] Auditing Mobile Install Landing Page (/install)...');
  const installScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'InstallScreen.tsx');
  assert(fs.existsSync(installScreenPath), 'src/screens/InstallScreen.tsx exists');

  const installScreenContent = fs.readFileSync(installScreenPath, 'utf8');
  assert(installScreenContent.includes('usePwa'), 'InstallScreen utilizes usePwa hook');
  assert(installScreenContent.includes('isStandalone') && installScreenContent.includes('isInstalled'), 'InstallScreen detects standalone and installed states');
  assert(installScreenContent.includes('✓ আপনি অ্যাপ সংস্করণ ব্যবহার করছেন'), 'Displays installed confirmation in standalone mode');
  assert(installScreenContent.includes('বাংলা স্টাডি বাইবেল খুলুন'), 'Provides prominent "বাংলা স্টাডি বাইবেল খুলুন" button for installed users');
  assert(installScreenContent.includes('activeTab === \'android\''), 'Provides Android Chrome installation instructions');
  assert(installScreenContent.includes('activeTab === \'ios\''), 'Provides iOS Safari Share Sheet instructions');
  assert(installScreenContent.includes('activeTab === \'desktop\''), 'Provides Desktop Chrome/Edge installation instructions');
  assert(installScreenContent.includes('Safari'), 'Includes explicit guidance for Apple Safari on iOS');
  assert(installScreenContent.includes('handleShareWhatsApp'), 'Includes direct WhatsApp sharing trigger');
  assert(installScreenContent.includes('navigator.clipboard.writeText'), 'Includes 1-click install link copying');

  // -------------------------------------------------------------
  // 4. Dedicated Universal Share Center (/share) Audit
  // -------------------------------------------------------------
  console.log('\n[4] Auditing Dedicated Universal Share Center (/share)...');
  const shareScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'UniversalShareScreen.tsx');
  assert(fs.existsSync(shareScreenPath), 'src/screens/UniversalShareScreen.tsx exists');

  const shareScreenContent = fs.readFileSync(shareScreenPath, 'utf8');
  assert(shareScreenContent.includes('shareMessage'), 'UniversalShareScreen defines formatted Bengali share message');
  assert(shareScreenContent.includes('handleWhatsAppShare'), 'Provides 1-click WhatsApp share with URL encoding');
  assert(shareScreenContent.includes('handleFacebookShare'), 'Provides 1-click Facebook share dialogue integration');
  assert(shareScreenContent.includes('handleNativeShare'), 'Supports native Web Share API (navigator.share)');
  assert(shareScreenContent.includes('handleCopyLink') && shareScreenContent.includes('handleCopyMessage'), 'Supports copying both install link and full message');
  assert(shareScreenContent.includes('/brand/og-preview.png'), 'Displays interactive Social Card preview simulating WhatsApp/FB card');

  // -------------------------------------------------------------
  // 5. Multi-Format Ministry Media Assets Verification
  // -------------------------------------------------------------
  console.log('\n[5] Verifying Multi-Format Ministry Media Kit Files...');
  const mediaAssets = [
    { name: 'A4 Church Poster (JPG)', path: path.join(ROOT_DIR, 'public', 'bengali-study-bible-ad.jpg') },
    { name: 'Official A4 Poster (PNG)', path: path.join(ROOT_DIR, 'public', 'qr-codes', 'bengali-study-bible-poster-official.png') },
    { name: '16:9 Sermon Projector Slide (PNG)', path: path.join(ROOT_DIR, 'public', 'qr-codes', 'bengali-study-bible-sermon-slide-16x9.png') },
    { name: '1:1 Social Media Square (PNG)', path: path.join(ROOT_DIR, 'public', 'qr-codes', 'bengali-study-bible-social-square.png') },
    { name: 'Pocket Visiting Card (PNG)', path: path.join(ROOT_DIR, 'public', 'qr-codes', 'bengali-study-bible-visiting-card.png') },
    { name: '3000px 300 DPI Ultra HD Print QR (PNG)', path: path.join(ROOT_DIR, 'public', 'qr-codes', 'qr-bengalistudybible-3000px.png') },
  ];

  for (const asset of mediaAssets) {
    const exists = fs.existsSync(asset.path);
    const size = exists ? fs.statSync(asset.path).size : 0;
    assert(exists && size > 1000, `${asset.name} exists and is valid (${(size / 1024).toFixed(1)} KB)`);
  }

  // -------------------------------------------------------------
  // 6. Router & App Navigation Integration Audit
  // -------------------------------------------------------------
  console.log('\n[6] Auditing Router & App Navigation (/install & /share)...');
  const appPath = path.join(ROOT_DIR, 'src', 'App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  assert(appContent.includes("pathname.includes('/install')"), 'App.tsx recognizes /install route');
  assert(appContent.includes("pathname.includes('/share')"), 'App.tsx recognizes /share route');
  assert(appContent.includes("activeTab === 'install'"), 'App.tsx mounts InstallScreen for activeTab === "install"');
  assert(appContent.includes("activeTab === 'share'"), 'App.tsx mounts UniversalShareScreen for activeTab === "share"');

  const bottomNavPath = path.join(ROOT_DIR, 'src', 'components', 'BottomNav.tsx');
  const bottomNavContent = fs.readFileSync(bottomNavPath, 'utf8');
  assert(bottomNavContent.includes("'install'") && bottomNavContent.includes("'share'"), 'BottomNav.tsx types recognize "install" and "share"');

  const footerPath = path.join(ROOT_DIR, 'src', 'components', 'Footer.tsx');
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  assert(footerContent.includes("onSelectTab('install')") && footerContent.includes("onSelectTab('share')"), 'Footer.tsx provides direct navigation buttons to install and share');

  // -------------------------------------------------------------
  // 7. Admin App Distribution Center Audit
  // -------------------------------------------------------------
  console.log('\n[7] Auditing Admin App Distribution Center (AdminDashboardScreen.tsx)...');
  const adminScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'AdminDashboardScreen.tsx');
  const adminContent = fs.readFileSync(adminScreenPath, 'utf8');
  assert(adminContent.includes("'app_distribution'"), 'AdminDashboardScreen defines "app_distribution" tab');
  assert(adminContent.includes('অ্যাপ বিতরণ ও প্রচার কেন্দ্র'), 'AdminDashboardScreen has "অ্যাপ বিতরণ ও প্রচার কেন্দ্র" tab button');
  assert(adminContent.includes('মণ্ডলী হোয়াটসঅ্যাপ ব্রডকাস্ট'), 'AdminDashboardScreen has Church WhatsApp Broadcast trigger');
  assert(adminContent.includes('PWA আর্কিটেকচার ও লাইভ হেলথ'), 'AdminDashboardScreen provides PWA Health & Telemetry card');
  assert(adminContent.includes('A4 চার্চ পোস্টার'), 'AdminDashboardScreen provides direct media kit downloads');

  // -------------------------------------------------------------
  // 8. Zero-Localhost & Authentic HTTPS URLs Audit
  // -------------------------------------------------------------
  console.log('\n[8] Auditing Zero-Localhost Compliance in Public Assets & Metadata...');
  const sitemapPath = path.join(ROOT_DIR, 'public', 'sitemap.xml');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  assert(!sitemapContent.includes('localhost') && !sitemapContent.includes('127.0.0.1') && !sitemapContent.includes('opponents-exercise'), 'sitemap.xml is free of localhost and stale tunnels');
  assert(sitemapContent.includes('https://bengalistudybible.com/install'), 'sitemap.xml includes canonical /install route');
  assert(sitemapContent.includes('https://bengalistudybible.com/share'), 'sitemap.xml includes canonical /share route');

  const robotsPath = path.join(ROOT_DIR, 'public', 'robots.txt');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  assert(robotsContent.includes('https://bengalistudybible.com/sitemap.xml'), 'robots.txt references canonical sitemap');

  const indexPath = path.join(ROOT_DIR, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  assert(indexContent.includes('https://bengalistudybible.com/brand/og-preview.png'), 'index.html uses canonical og:image URL');
  assert(!indexContent.includes('localhost') && !indexContent.includes('127.0.0.1'), 'index.html has zero localhost references');

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  console.log('\n' + '='.repeat(70));
  console.log(`TOTAL TESTS:  ${totalTests}`);
  console.log(`PASSED TESTS: ${passedTests}`);
  console.log(`FAILED TESTS: ${totalTests - passedTests}`);
  console.log('='.repeat(70));

  if (passedTests === totalTests) {
    console.log('🎉 ALL INSTALL & SHARE SYSTEM TESTS PASSED SUCCESSFULLY (100%)!\n');
    process.exit(0);
  } else {
    console.error('❌ SOME TESTS FAILED. PLEASE REVIEW.\n');
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Test runner exception:', err);
  process.exit(1);
});
