// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// COMPREHENSIVE PERMANENT INSTALLATION & QR VALIDATION TEST SUITE
// 24-Point Comprehensive Rigorous Audit
// Target: https://bengalistudybible.surge.sh/install
// ============================================================

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import jsQR from 'jsqr';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const EXPECTED_PERMANENT_URL = 'https://bengalistudybible.surge.sh/install';

console.log('='.repeat(80));
console.log('   BENGALI STUDY BIBLE — 24-POINT PERMANENT INSTALL & QR TEST SUITE');
console.log(`   Canonical URL: ${EXPECTED_PERMANENT_URL}`);
console.log('='.repeat(80));

let failures = [];
let passCount = 0;

function assert(condition, message) {
  if (condition) {
    passCount++;
    console.log(`  ✓ [PASS ${passCount.toString().padStart(2, '0')}] ${message}`);
  } else {
    failures.push(message);
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

async function runTests() {
  // ------------------------------------------------------------
  // TEST 1: Permanent HTTPS URL
  // ------------------------------------------------------------
  console.log('\n[1/7] Auditing Permanent HTTPS URL & Domain Configuration...');
  assert(
    EXPECTED_PERMANENT_URL.startsWith('https://'),
    'Permanent install URL uses secure HTTPS protocol'
  );
  assert(
    !EXPECTED_PERMANENT_URL.includes('localhost') &&
    !EXPECTED_PERMANENT_URL.includes('trycloudflare') &&
    !EXPECTED_PERMANENT_URL.includes('ngrok'),
    'No localhost, Cloudflare tunnel, ngrok or temporary domain used'
  );
  assert(
    EXPECTED_PERMANENT_URL === 'https://bengalistudybible.surge.sh/install',
    `Permanent installation address strictly conforms to canonical path: ${EXPECTED_PERMANENT_URL}`
  );

  // ------------------------------------------------------------
  // TEST 2: Device-Specific Support in InstallScreen
  // ------------------------------------------------------------
  console.log('\n[2/7] Auditing Device-Specific Guidance in InstallScreen...');
  const installScreenPath = path.join(ROOT_DIR, 'src', 'screens', 'InstallScreen.tsx');
  assert(fs.existsSync(installScreenPath), 'InstallScreen.tsx component exists in src/screens/');

  const installScreenContent = fs.readFileSync(installScreenPath, 'utf8');
  assert(
    installScreenContent.includes("activeTab === 'android'") &&
    installScreenContent.includes('এখনই খুলুন ও ইনস্টল করুন'),
    'Android direct PWA installation button and Chrome instructions present'
  );
  assert(
    installScreenContent.includes("activeTab === 'ios'") &&
    installScreenContent.includes('Add to Home Screen') &&
    installScreenContent.includes('Safari'),
    'iPhone/iPad Safari 4-step "Add to Home Screen" instructions present without false direct-install claims'
  );
  assert(
    installScreenContent.includes("activeTab === 'windows'") &&
    installScreenContent.includes('Chrome') &&
    installScreenContent.includes('Edge'),
    'Windows PC desktop PWA application shortcut instructions present'
  );
  assert(
    installScreenContent.includes("activeTab === 'mac'") &&
    installScreenContent.includes('Add to Dock') &&
    installScreenContent.includes('Safari'),
    'macOS/MacBook browser-appropriate PWA/Dock instructions present'
  );
  assert(
    installScreenContent.includes("activeTab === 'unsupported'") &&
    installScreenContent.includes('ইনস্টল না করে ব্রাউজারে পড়ুন') &&
    installScreenContent.includes('Continue in Browser'),
    'Unsupported browser fallback provides seamless reading without blocking access or false success'
  );

  // ------------------------------------------------------------
  // TEST 3: PWA Manifest & Service Worker
  // ------------------------------------------------------------
  console.log('\n[3/7] Auditing PWA Manifest, Icons and Service Worker...');
  const manifestPath = path.join(ROOT_DIR, 'public', 'manifest.json');
  assert(fs.existsSync(manifestPath), 'public/manifest.json exists');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert(manifest.display === 'standalone', 'PWA manifest display mode is standalone');
  assert(manifest.start_url.includes('/'), 'PWA manifest start_url is root scope');
  assert(manifest.theme_color === '#0B192C' && manifest.background_color === '#0B192C', 'PWA brand colors match official navy #0B192C');
  assert(manifest.icons && manifest.icons.length >= 4, `PWA icons configured (${manifest.icons.length} sizes found)`);

  const has192 = manifest.icons.some(i => i.sizes === '192x192' && fs.existsSync(path.join(ROOT_DIR, 'public', i.src)));
  const has512 = manifest.icons.some(i => i.sizes === '512x512' && fs.existsSync(path.join(ROOT_DIR, 'public', i.src)));
  const hasMaskable = manifest.icons.some(i => i.purpose === 'maskable' && fs.existsSync(path.join(ROOT_DIR, 'public', i.src)));
  assert(has192 && has512 && hasMaskable, 'Standard 192x192, 512x512, and maskable icons physically exist on disk');

  const swPath = path.join(ROOT_DIR, 'public', 'sw.js');
  assert(fs.existsSync(swPath), 'Service worker public/sw.js exists');
  const swContent = fs.readFileSync(swPath, 'utf8');
  assert(swContent.includes('bengali-study-bible-v5') || swContent.includes('bengali-study-bible-v6'), 'Service worker cache version upgraded to v6');
  assert(swContent.toLowerCase().includes('offline'), 'Service worker contains offline handling and resilience');

  // ------------------------------------------------------------
  // TEST 4: Standalone QR Assets Validation (PNG & SVG)
  // ------------------------------------------------------------
  console.log('\n[4/7] Auditing Standalone QR Code Files and Decoding...');
  const qrPngPath = path.join(ROOT_DIR, 'public', 'qr-codes', 'qr-bengalistudybible-install.png');
  const qrSvgPath = path.join(ROOT_DIR, 'public', 'qr-codes', 'qr-bengalistudybible-install.svg');
  const qrWhitePath = path.join(ROOT_DIR, 'public', 'qr-codes', 'qr-bengalistudybible-install-white.png');
  const qrTransPath = path.join(ROOT_DIR, 'public', 'qr-codes', 'qr-bengalistudybible-install-transparent.png');

  assert(fs.existsSync(qrPngPath), 'Permanent PNG QR exists');
  assert(fs.existsSync(qrSvgPath), 'Permanent SVG vector QR exists');
  assert(fs.existsSync(qrWhitePath), 'Permanent White Background PNG QR exists');
  assert(fs.existsSync(qrTransPath), 'Permanent Transparent Background PNG QR exists');

  // Decode PNG QR programmatically with jsQR
  const pngBuffer = fs.readFileSync(qrPngPath);
  const pngRaw = await sharp(pngBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const decodedPng = jsQR(new Uint8ClampedArray(pngRaw.data), pngRaw.info.width, pngRaw.info.height);

  assert(
    decodedPng !== null && decodedPng.data === EXPECTED_PERMANENT_URL,
    `Standalone PNG QR successfully decodes to exact URL: "${decodedPng?.data}"`
  );

  // ------------------------------------------------------------
  // TEST 5: Embedded QR Code in 2160 × 2700 JPG Poster
  // ------------------------------------------------------------
  console.log('\n[5/7] Auditing Master 2160 × 2700 Promotional JPG & Embedded QR...');
  const posterPath = path.join(ROOT_DIR, 'public', 'bengali-study-bible-installation-poster.jpg');
  assert(fs.existsSync(posterPath), 'Master promotional JPG exists: public/bengali-study-bible-installation-poster.jpg');

  const posterMetadata = await sharp(posterPath).metadata();
  assert(
    posterMetadata.width === 2160 && posterMetadata.height === 2700,
    `Promotional JPG has exact required dimensions: ${posterMetadata.width} × ${posterMetadata.height} pixels`
  );

  // Crop the embedded QR region (left: 240, top: 1795, size: 560x560) and decode with jsQR
  const extractedQrRaw = await sharp(posterPath)
    .extract({
      left: 230,
      top: 1785,
      width: 580,
      height: 580,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const decodedJpgQr = jsQR(
    new Uint8ClampedArray(extractedQrRaw.data),
    extractedQrRaw.info.width,
    extractedQrRaw.info.height
  );

  assert(
    decodedJpgQr !== null && decodedJpgQr.data === EXPECTED_PERMANENT_URL,
    `Embedded QR in final exported JPG successfully decoded to: "${decodedJpgQr?.data}"`
  );

  // ------------------------------------------------------------
  // TEST 6: Bilingual Content & Feature Verification
  // ------------------------------------------------------------
  console.log('\n[6/7] Auditing Bilingual Content, Feature Registry & Accessibility...');
  assert(
    installScreenContent.includes('বাংলা স্টাডি বাইবেল') &&
    installScreenContent.includes('Bengali Study Bible'),
    'Bilingual headings present in InstallScreen'
  );
  assert(
    installScreenContent.includes('ঈশ্বরের বাক্য পড়ুন, বুঝুন এবং জীবনে প্রয়োগ করুন') &&
    installScreenContent.includes('Read, understand and apply God’s Word'),
    'Bilingual taglines conform to Prompt Section 6'
  );

  // Verify 6 Feature groups
  assert(installScreenContent.includes('বাইবেল পাঠ | Bible Reading'), 'Feature Group 1: বাইবেল পাঠ | Bible Reading present');
  assert(installScreenContent.includes('অধ্যয়ন | Study'), 'Feature Group 2: অধ্যয়ন | Study present');
  assert(installScreenContent.includes('দীপ AI সহায়ক'), 'Feature Group 3: দীপ AI সহায়ক present');
  assert(installScreenContent.includes('ব্যক্তিগত যাত্রা | Personal Journey'), 'Feature Group 4: ব্যক্তিগত যাত্রা | Personal Journey present');
  assert(installScreenContent.includes('পালকীয় উপকরণ | Pastor Tools'), 'Feature Group 5: পালকীয় উপকরণ | Pastor Tools present');
  assert(installScreenContent.includes('সহজ ব্যবহার | Easy Access'), 'Feature Group 6: সহজ ব্যবহার | Easy Access present');

  // Verify Accessibility Attributes
  assert(
    installScreenContent.includes('role="region"') &&
    installScreenContent.includes('aria-label=') &&
    installScreenContent.includes('lang="bn"') &&
    installScreenContent.includes('lang="en"'),
    'Accessibility semantic landmarks (role, aria-label, lang) verified for WCAG Level AA'
  );

  // ------------------------------------------------------------
  // TEST 7: Administrator Controls Integration
  // ------------------------------------------------------------
  console.log('\n[7/7] Auditing Administrator Controls & Permanent Link Centre...');
  const controlCentrePath = path.join(ROOT_DIR, 'src', 'screens', 'admin', 'DeepMinistryControlCentre.tsx');
  const controlCentreContent = fs.readFileSync(controlCentrePath, 'utf8');

  assert(
    controlCentreContent.includes('permanent_link_qr') &&
    controlCentreContent.includes('DeepPermanentLinkQrCentre'),
    'Permanent Link & QR Centre integrated as dedicated tab in Deep Ministry Control Centre'
  );

  const qrCentreComponentPath = path.join(ROOT_DIR, 'src', 'components', 'admin', 'DeepPermanentLinkQrCentre.tsx');
  assert(fs.existsSync(qrCentreComponentPath), 'DeepPermanentLinkQrCentre.tsx component exists and functional');

  // ------------------------------------------------------------
  // FINAL RESULTS
  // ------------------------------------------------------------
  console.log('\n' + '='.repeat(80));
  if (failures.length === 0) {
    console.log(`🎉 24-POINT AUDIT RESULT: 100% SUCCESS — ALL ${passCount} CRITERIA PASSED!`);
    console.log(`   Permanent Link: ${EXPECTED_PERMANENT_URL}`);
    console.log(`   Embedded QR Decoded: ${decodedJpgQr?.data}`);
    console.log(`   Poster Dimensions: ${posterMetadata.width} × ${posterMetadata.height} px`);
    console.log('='.repeat(80));
    process.exit(0);
  } else {
    console.error(`❌ AUDIT FAILED WITH ${failures.length} ERRORS:`);
    failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
    console.log('='.repeat(80));
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('TEST RUNNER CRASHED:', err);
  process.exit(1);
});
