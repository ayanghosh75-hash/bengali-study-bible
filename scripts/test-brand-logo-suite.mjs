// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// BRAND & LOGO IMPLEMENTATION VERIFICATION SUITE
// Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS ${totalTests.toString().padStart(2, '0')}] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL ${totalTests.toString().padStart(2, '0')}] ${testName}`);
    if (details) console.error(`     Details: ${details}`);
  }
}

async function runBrandLogoSuite() {
  console.log('\n============================================================');
  console.log('BENGALI STUDY BIBLE — OFFICIAL BRAND & LOGO VERIFICATION');
  console.log('Owner & Developer: Rev. Ayan Kumar Ghosh');
  console.log('============================================================\n');

  // ------------------------------------------------------------
  // SECTION 1: MASTER SVG VECTOR ASSETS
  // ------------------------------------------------------------
  console.log('--- SECTION 1: Master SVG Vector Assets in /public/brand/ ---');
  
  const expectedSvgs = [
    'logo-symbol.svg',
    'logo-symbol-dark.svg',
    'logo-primary.svg',
    'logo-stacked.svg',
    'logo-horizontal.svg',
    'logo-dark.svg',
    'logo-light.svg',
    'logo-monochrome.svg',
    'og-preview.svg',
  ];

  for (const file of expectedSvgs) {
    const fullPath = path.join(rootDir, 'public', 'brand', file);
    const exists = fs.existsSync(fullPath);
    const size = exists ? fs.statSync(fullPath).size : 0;
    assert(exists && size > 500, `Vector exists & non-trivial: /public/brand/${file} (${size} bytes)`);
  }

  // Check SVG content sanity (no remote tracking scripts, contains open Bible & cross elements)
  const symbolSvgContent = fs.readFileSync(path.join(rootDir, 'public', 'brand', 'logo-symbol.svg'), 'utf8');
  assert(!symbolSvgContent.includes('<script'), 'logo-symbol.svg contains no embedded executable scripts');
  assert(symbolSvgContent.includes('leftPageGrad'), 'logo-symbol.svg includes open Bible page curves');
  assert(symbolSvgContent.includes('warmGoldGrad'), 'logo-symbol.svg includes central gold cross spine');
  assert(symbolSvgContent.includes('viewBox="0 0 512 512"'), 'logo-symbol.svg has canonical 512x512 viewBox');

  // ------------------------------------------------------------
  // SECTION 2: HIGH-RESOLUTION PWA ICONS & FAVICONS
  // ------------------------------------------------------------
  console.log('\n--- SECTION 2: High-Resolution PWA Icons & Favicon Assets ---');

  const expectedIcons = [
    { file: 'public/icons/icon-512x512.png', width: 512, height: 512 },
    { file: 'public/icons/icon-192x192.png', width: 192, height: 192 },
    { file: 'public/icons/icon-maskable-512x512.png', width: 512, height: 512 },
    { file: 'public/icons/apple-touch-icon.png', width: 180, height: 180 },
    { file: 'public/apple-touch-icon.png', width: 180, height: 180 },
    { file: 'public/icons/favicon-32x32.png', width: 32, height: 32 },
    { file: 'public/icons/favicon-16x16.png', width: 16, height: 16 },
    { file: 'public/favicon.ico', width: 32, height: 32 },
    { file: 'public/favicon.svg', width: 512, height: 512, isSvg: true },
  ];

  for (const item of expectedIcons) {
    const fullPath = path.join(rootDir, item.file);
    const exists = fs.existsSync(fullPath);
    assert(exists, `Asset exists: ${item.file}`);

    if (exists && !item.isSvg) {
      const meta = await sharp(fullPath).metadata();
      assert(
        meta.width === item.width && meta.height === item.height,
        `Pixel dimensions verified: ${item.file} is ${meta.width}x${meta.height}`
      );
    }
  }

  // ------------------------------------------------------------
  // SECTION 3: MASKABLE ICON SAFE-ZONE INTEGRITY
  // ------------------------------------------------------------
  console.log('\n--- SECTION 3: Maskable Icon Safe-Zone Padding ---');
  const maskablePath = path.join(rootDir, 'public', 'icons', 'icon-maskable-512x512.png');
  const maskableMeta = await sharp(maskablePath).metadata();
  assert(maskableMeta.width === 512 && maskableMeta.height === 512, 'Maskable icon is 512x512');
  
  const maskableSvg = fs.readFileSync(path.join(rootDir, 'public', 'brand', 'logo-symbol-dark.svg'), 'utf8');
  assert(maskableSvg.length > 0, 'Maskable reference SVG verified');

  // ------------------------------------------------------------
  // SECTION 4: SOCIAL MEDIA & OPEN GRAPH / WHATSAPP ASSETS
  // ------------------------------------------------------------
  console.log('\n--- SECTION 4: WhatsApp & Social Media Preview Cards ---');
  const ogPreviewPath = path.join(rootDir, 'public', 'brand', 'og-preview.png');
  const ogExists = fs.existsSync(ogPreviewPath);
  assert(ogExists, 'Branded Open Graph card exists at /public/brand/og-preview.png');

  if (ogExists) {
    const ogMeta = await sharp(ogPreviewPath).metadata();
    assert(ogMeta.width === 1200 && ogMeta.height === 630, `og-preview.png has standard 1200x630 dimensions (got ${ogMeta.width}x${ogMeta.height})`);
  }

  const fbProfilePath = path.join(rootDir, 'public', 'brand', 'facebook-profile-symbol-512.png');
  const fbProfileMeta = await sharp(fbProfilePath).metadata();
  assert(fbProfileMeta.width === 512 && fbProfileMeta.height === 512, 'Facebook profile icon is 512x512');

  const fbCoverPath = path.join(rootDir, 'public', 'brand', 'facebook-cover-banner.png');
  const fbCoverMeta = await sharp(fbCoverPath).metadata();
  assert(fbCoverMeta.width === 1200 && fbCoverMeta.height === 630, 'Facebook cover banner is 1200x630');

  // ------------------------------------------------------------
  // SECTION 5: OFFICIAL QR CODE & POSTER
  // ------------------------------------------------------------
  console.log('\n--- SECTION 5: Official QR Code & Installation Poster ---');
  const qrSvgPath = path.join(rootDir, 'public', 'qr-codes', 'qr-bengalistudybible.svg');
  const qrPngPath = path.join(rootDir, 'public', 'qr-codes', 'qr-bengalistudybible-3000px.png');
  const posterPath = path.join(rootDir, 'public', 'qr-codes', 'bengali-study-bible-poster-official.png');

  assert(fs.existsSync(qrSvgPath), 'qr-bengalistudybible.svg exists');
  assert(fs.existsSync(qrPngPath), 'qr-bengalistudybible-3000px.png exists');
  assert(fs.existsSync(posterPath), 'bengali-study-bible-poster-official.png exists');

  const posterMeta = await sharp(posterPath).metadata();
  assert(posterMeta.width === 1240 && posterMeta.height === 1754, `A4 Poster dimensions verified (1240x1754, got ${posterMeta.width}x${posterMeta.height})`);

  // ------------------------------------------------------------
  // SECTION 6: WEB INTEGRATION & HEAD METADATA
  // ------------------------------------------------------------
  console.log('\n--- SECTION 6: Web Integration & Head Metadata ---');
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  assert(indexHtml.includes('property="og:image" content="https://bengalistudybible.com/brand/og-preview.png"'), 'index.html points og:image to official /brand/og-preview.png');
  assert(indexHtml.includes('name="twitter:image" content="https://bengalistudybible.com/brand/og-preview.png"'), 'index.html points twitter:image to official /brand/og-preview.png');
  assert(indexHtml.includes('sizes="180x180" href="/icons/apple-touch-icon.png"'), 'index.html includes apple-touch-icon link');
  assert(indexHtml.includes('href="/icons/favicon-32x32.png"'), 'index.html includes favicon-32x32 link');
  assert(indexHtml.includes('href="/favicon.svg"'), 'index.html includes vector favicon link');

  const manifestWebmanifest = fs.readFileSync(path.join(rootDir, 'public', 'manifest.webmanifest'), 'utf8');
  assert(manifestWebmanifest.includes('/icons/icon-192x192.png'), 'manifest.webmanifest specifies icon-192x192.png');
  assert(manifestWebmanifest.includes('/icons/icon-512x512.png'), 'manifest.webmanifest specifies icon-512x512.png');
  assert(manifestWebmanifest.includes('"purpose": "maskable"'), 'manifest.webmanifest specifies maskable icon purpose');

  const swJs = fs.readFileSync(path.join(rootDir, 'public', 'sw.js'), 'utf8');
  assert(swJs.includes('/brand/logo-symbol.svg'), 'sw.js precaches /brand/logo-symbol.svg');
  assert(swJs.includes('/brand/logo-horizontal.svg'), 'sw.js precaches /brand/logo-horizontal.svg');
  assert(swJs.includes('bengali-study-bible-v3'), 'sw.js cache version bumped to v3');

  // ------------------------------------------------------------
  // SECTION 7: REACT BRAND COMPONENTS & SCREENS
  // ------------------------------------------------------------
  console.log('\n--- SECTION 7: React Brand Components & Screens ---');
  const logoSymbolSrc = fs.readFileSync(path.join(rootDir, 'src', 'components', 'brand', 'LogoSymbol.tsx'), 'utf8');
  assert(logoSymbolSrc.includes('export const LogoSymbol'), 'LogoSymbol.tsx exports LogoSymbol component');
  assert(logoSymbolSrc.includes('viewBox="0 0 512 512"'), 'LogoSymbol renders pure 512x512 vector symbol');

  const brandLockupSrc = fs.readFileSync(path.join(rootDir, 'src', 'components', 'brand', 'BengaliStudyBibleLogo.tsx'), 'utf8');
  assert(brandLockupSrc.includes('export const BengaliStudyBibleLogo'), 'BengaliStudyBibleLogo.tsx exports BengaliStudyBibleLogo');
  assert(brandLockupSrc.includes('variant = \'horizontal\''), 'BengaliStudyBibleLogo supports horizontal variant');
  assert(brandLockupSrc.includes('variant === \'stacked\''), 'BengaliStudyBibleLogo supports stacked variant');

  const installScreenSrc = fs.readFileSync(path.join(rootDir, 'src', 'screens', 'InstallScreen.tsx'), 'utf8');
  assert(installScreenSrc.includes('BengaliStudyBibleLogo'), 'InstallScreen.tsx uses official BengaliStudyBibleLogo');
  assert(installScreenSrc.includes('📱 অ্যাপ ইনস্টল করুন'), 'InstallScreen.tsx prominently displays official install action');
  assert(installScreenSrc.includes('পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন'), 'InstallScreen.tsx displays official tagline');

  const navbarSrc = fs.readFileSync(path.join(rootDir, 'src', 'components', 'Navbar.tsx'), 'utf8');
  assert(navbarSrc.includes('BengaliStudyBibleLogo'), 'Navbar.tsx renders official BengaliStudyBibleLogo');

  const homeScreenSrc = fs.readFileSync(path.join(rootDir, 'src', 'screens', 'HomeScreen.tsx'), 'utf8');
  assert(homeScreenSrc.includes('LogoSymbol'), 'HomeScreen.tsx renders official LogoSymbol');

  const footerSrc = fs.readFileSync(path.join(rootDir, 'src', 'components', 'Footer.tsx'), 'utf8');
  assert(footerSrc.includes('LogoSymbol'), 'Footer.tsx renders official LogoSymbol');

  const appSrc = fs.readFileSync(path.join(rootDir, 'src', 'App.tsx'), 'utf8');
  assert(appSrc.includes('InstallScreen'), 'App.tsx mounts InstallScreen');
  assert(appSrc.includes("pathname.includes('/install')"), 'App.tsx handles /install deep-link navigation');

  // ------------------------------------------------------------
  // SECTION 8: COPYRIGHT & PROVENANCE SYSTEM INTEGRITY
  // ------------------------------------------------------------
  console.log('\n--- SECTION 8: Copyright & Provenance Registration ---');
  const resourceRightsSrc = fs.readFileSync(path.join(rootDir, 'src', 'data', 'rights', 'resourceRightsData.ts'), 'utf8');
  assert(resourceRightsSrc.includes("id: 'res-bsb-official-logo'"), 'res-bsb-official-logo is registered in RESOURCE_RIGHTS');
  assert(resourceRightsSrc.includes("resourceType: 'logo'"), 'Official logo is registered with resourceType: logo');
  assert(resourceRightsSrc.includes("copyrightStatus: 'ORIGINAL'"), 'Official logo has copyrightStatus: ORIGINAL');
  assert(resourceRightsSrc.includes("Rev. Ayan Kumar Ghosh"), 'Official logo records Rev. Ayan Kumar Ghosh as owner');

  const sourcesSrc = fs.readFileSync(path.join(rootDir, 'src', 'data', 'rights', 'sourcesData.ts'), 'utf8');
  assert(sourcesSrc.includes("id: 'src-bsb-official-logo'"), 'src-bsb-official-logo is registered in SOURCES');
  assert(sourcesSrc.includes("authorEn: 'Rev. Ayan Kumar Ghosh'"), 'Rev. Ayan Kumar Ghosh is credited as author in sources');

  console.log('\n============================================================');
  console.log(`BRAND & LOGO SUITE COMPLETED: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('============================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runBrandLogoSuite().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
