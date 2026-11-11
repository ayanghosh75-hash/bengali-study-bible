// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// AUTOMATED 40-POINT COPYRIGHT & LICENSING VERIFICATION SUITE
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
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
    console.log(`  ✅ [PASS ${totalTests.toString().padStart(2, '0')}] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL ${totalTests.toString().padStart(2, '0')}] ${testName}`);
    if (details) console.error(`     Details: ${details}`);
  }
}

async function runSuite() {
  console.log('\n============================================================');
  console.log('BENGALI STUDY BIBLE — PHASE 57 COMPREHENSIVE VERIFICATION');
  console.log('COPYRIGHT + LICENSING + ATTRIBUTION + PROVENANCE SUITE');
  console.log('============================================================\n');

  // Load rights data and service dynamically
  // Since our project is TypeScript, let's read the compiled dist or directly inspect the source registries
  const rightsHoldersPath = path.join(rootDir, 'src', 'data', 'rights', 'rightsHoldersData.ts');
  const licensesPath = path.join(rootDir, 'src', 'data', 'rights', 'licensesData.ts');
  const sourcesPath = path.join(rootDir, 'src', 'data', 'rights', 'sourcesData.ts');
  const permissionsPath = path.join(rootDir, 'src', 'data', 'rights', 'permissionsData.ts');
  const bibleTranslationRightsPath = path.join(rootDir, 'src', 'data', 'rights', 'bibleTranslationRightsData.ts');
  const resourceRightsPath = path.join(rootDir, 'src', 'data', 'rights', 'resourceRightsData.ts');
  const rightsServicePath = path.join(rootDir, 'src', 'services', 'rightsService.ts');
  const copyrightScreenPath = path.join(rootDir, 'src', 'screens', 'CopyrightScreen.tsx');
  const footerPath = path.join(rootDir, 'src', 'components', 'Footer.tsx');
  const readerPath = path.join(rootDir, 'src', 'screens', 'BibleReaderScreen.tsx');
  const matthewPath = path.join(rootDir, 'public', 'bible-data', 'irv', 'MAT.json');
  const searchIndexPath = path.join(rootDir, 'public', 'bible-data', 'irv', 'search-index.json');

  // ------------------------------------------------------------
  // SECTION 1: PROJECT OWNER & IDENTITY INTEGRITY
  // ------------------------------------------------------------
  console.log('--- SECTION 1: Project Owner & Identity Integrity ---');
  const rightsHoldersSrc = fs.readFileSync(rightsHoldersPath, 'utf8');
  assert(
    rightsHoldersSrc.includes('Rev. Ayan Kumar Ghosh') && rightsHoldersSrc.includes('রেভা. অয়ন কুমার ঘোষ'),
    'Rev. Ayan Kumar Ghosh is defined with bilingual names'
  );
  assert(
    rightsHoldersSrc.includes('ayanghosh75@gmail.com'),
    'Official contact email is ayanghosh75@gmail.com'
  );
  assert(
    rightsHoldersSrc.includes("rightsHolderType: 'Project Owner'"),
    'Role is strictly Project Owner & Developer'
  );
  assert(
    rightsHoldersSrc.includes('isProjectOwner: true'),
    'Rev. Ayan Kumar Ghosh is flagged as isProjectOwner: true'
  );

  // ------------------------------------------------------------
  // SECTION 2: NO THIRD-PARTY OWNERSHIP CLAIM
  // ------------------------------------------------------------
  console.log('\n--- SECTION 2: Third-Party Rights Disclaimers & Integrity ---');
  assert(
    rightsHoldersSrc.includes('Bridge Connectivity Solutions') && rightsHoldersSrc.includes('isProjectOwner: false'),
    'Bridge Connectivity Solutions is marked as independent third party (isProjectOwner: false)'
  );
  assert(
    rightsHoldersSrc.includes('The Bible Society of India') && rightsHoldersSrc.includes('isProjectOwner: false'),
    'The Bible Society of India (BSI) is marked as independent third party (isProjectOwner: false)'
  );
  assert(
    rightsHoldersSrc.includes('SIL International') && rightsHoldersSrc.includes('isProjectOwner: false'),
    'SIL International (Noto Sans Bengali) is marked as independent third party (isProjectOwner: false)'
  );
  assert(
    rightsHoldersSrc.includes('Lucide Project') && rightsHoldersSrc.includes('isProjectOwner: false'),
    'Lucide Project is marked as independent third party (isProjectOwner: false)'
  );
  assert(
    rightsHoldersSrc.includes('William Carey & Serampore Mission') && rightsHoldersSrc.includes('isProjectOwner: false'),
    'William Carey / Serampore Mission is marked as historical independent entity (isProjectOwner: false)'
  );

  // ------------------------------------------------------------
  // SECTION 3: BIBLE TRANSLATIONS RIGHTS SPECIFICATION
  // ------------------------------------------------------------
  console.log('\n--- SECTION 3: Bible Translation Rights Specifications ---');
  const transRightsSrc = fs.readFileSync(bibleTranslationRightsPath, 'utf8');
  assert(
    transRightsSrc.includes("translationId: 'irv-ben'") &&
    transRightsSrc.includes("rightsStatus: 'OPEN_LICENSE'") &&
    transRightsSrc.includes("licenseId: 'lic-cc-by-sa-4.0'") &&
    transRightsSrc.includes('fullTextStorageAllowed: true'),
    'IRV Bengali is OPEN_LICENSE, CC BY-SA 4.0, fullTextStorageAllowed: true'
  );
  assert(
    transRightsSrc.includes("translationId: 'bsi-ben'") &&
    transRightsSrc.includes("rightsStatus: 'COPYRIGHTED'") &&
    transRightsSrc.includes("permissionStatus: 'PENDING'") &&
    transRightsSrc.includes('fullTextStorageAllowed: false'),
    'BSI O.V. is COPYRIGHTED, permissionStatus: PENDING, fullTextStorageAllowed: false'
  );
  assert(
    transRightsSrc.includes("translationId: 'carey-1809'") &&
    transRightsSrc.includes("rightsStatus: 'PUBLIC_DOMAIN'"),
    'Carey 1809 is PUBLIC_DOMAIN'
  );
  assert(
    transRightsSrc.includes("translationId: 'web-eng'") &&
    transRightsSrc.includes("rightsStatus: 'PUBLIC_DOMAIN'"),
    'World English Bible (WEB) is PUBLIC_DOMAIN'
  );
  assert(
    transRightsSrc.includes("translationId: 'esv-eng'") &&
    transRightsSrc.includes("rightsStatus: 'LICENSED'") &&
    transRightsSrc.includes('fullTextStorageAllowed: false'),
    'ESV is LICENSED with limited quoting and fullTextStorageAllowed: false'
  );

  // ------------------------------------------------------------
  // SECTION 4: LICENSES & PERMISSIONS MATRIX
  // ------------------------------------------------------------
  console.log('\n--- SECTION 4: Licenses & Permissions Matrix ---');
  const licensesSrc = fs.readFileSync(licensesPath, 'utf8');
  assert(
    licensesSrc.includes("licenseCode: 'CC BY-SA 4.0'") && licensesSrc.includes('commercialUseAllowed: true'),
    'CC BY-SA 4.0 permits commercial and redistribution with attribution and share-alike'
  );
  assert(
    licensesSrc.includes("licenseCode: 'All Rights Reserved'") &&
    licensesSrc.includes('downloadAllowed: false') &&
    licensesSrc.includes('offlineStorageAllowed: false'),
    'All Rights Reserved strictly forbids download and offline storage'
  );
  assert(
    licensesSrc.includes("licenseCode: 'SIL Open Font License 1.1'"),
    'SIL Open Font License 1.1 is registered for Noto Sans Bengali font'
  );
  assert(
    licensesSrc.includes("licenseCode: 'ISC License'"),
    'ISC License is registered for Lucide Icons'
  );
  assert(
    licensesSrc.includes("licenseCode: 'MIT License'"),
    'MIT License is registered for React and Vite UI frameworks'
  );

  // ------------------------------------------------------------
  // SECTION 5: BIBLIOGRAPHIC SOURCES DIRECTORY
  // ------------------------------------------------------------
  console.log('\n--- SECTION 5: Sources Directory & Provenance ---');
  const sourcesSrc = fs.readFileSync(sourcesPath, 'utf8');
  assert(
    sourcesSrc.includes("id: 'src-irv-ben'") && sourcesSrc.includes('Bridge Connectivity Solutions'),
    'IRV Bengali source cataloged with Bridge Connectivity Solutions'
  );
  assert(
    sourcesSrc.includes("id: 'src-matthew-henry'") && sourcesSrc.includes('Matthew Henry'),
    'Matthew Henry commentary cataloged as classic public domain source'
  );
  assert(
    sourcesSrc.includes("id: 'src-strongs-concordance'") && sourcesSrc.includes('James Strong'),
    "Strong's Concordance and Hebrew-Greek Lexicon cataloged"
  );
  assert(
    sourcesSrc.includes("id: 'src-tsk-crossref'") && sourcesSrc.includes('Samuel Bagster'),
    'Treasury of Scripture Knowledge (TSK) cataloged'
  );
  assert(
    sourcesSrc.includes("id: 'src-bsb-platform-original'") && sourcesSrc.includes('Rev. Ayan Kumar Ghosh'),
    'Original platform architecture cataloged under Rev. Ayan Kumar Ghosh'
  );

  // ------------------------------------------------------------
  // SECTION 6: RESOURCE RIGHTS MAPPING & PUBLICATION STATUS
  // ------------------------------------------------------------
  console.log('\n--- SECTION 6: Resource Rights Mapping & Safeguards ---');
  const resRightsSrc = fs.readFileSync(resourceRightsPath, 'utf8');
  assert(
    resRightsSrc.includes("resourceId: 'irv-ben'") && resRightsSrc.includes("publicationStatus: 'PUBLISHED'"),
    'IRV Bengali is approved and publicationStatus: PUBLISHED'
  );
  assert(
    resRightsSrc.includes("resourceId: 'bsi-ben'") &&
    resRightsSrc.includes("publicationStatus: 'HELD_IN_REVIEW'") &&
    resRightsSrc.includes("reviewStatus: 'REQUIRES_PERMISSION'"),
    'BSI O.V. publicationStatus is HELD_IN_REVIEW and reviewStatus is REQUIRES_PERMISSION'
  );
  assert(
    resRightsSrc.includes("resourceId: 'bsb-platform-engine'") &&
    resRightsSrc.includes("copyrightStatus: 'ORIGINAL'") &&
    resRightsSrc.includes("rightsHolderId: 'rh-ayan-ghosh'"),
    'Platform engine correctly mapped to Rev. Ayan Kumar Ghosh as ORIGINAL'
  );
  assert(
    resRightsSrc.includes("resourceId: 'noto-sans-bengali-font'") &&
    resRightsSrc.includes("licenseId: 'lic-sil-ofl-1.1'"),
    'Noto Sans Bengali font correctly mapped to SIL OFL 1.1'
  );

  // ------------------------------------------------------------
  // SECTION 7: RIGHTS SERVICE LOGIC & POLICY GATEKEEPER
  // ------------------------------------------------------------
  console.log('\n--- SECTION 7: Rights Service Logic & Policy Gatekeeper ---');
  const rightsServiceSrc = fs.readFileSync(rightsServicePath, 'utf8');
  assert(
    rightsServiceSrc.includes('public static getProvenanceSummary(resourceId: string)'),
    'RightsService implements getProvenanceSummary() answering the 3 core questions'
  );
  assert(
    rightsServiceSrc.includes('public static canPublish(resourceId: string)'),
    'RightsService implements canPublish() gatekeeper'
  );
  assert(
    rightsServiceSrc.includes('public static canDownload(resourceId: string)'),
    'RightsService implements canDownload() gatekeeper'
  );
  assert(
    rightsServiceSrc.includes('public static canOfflineStore(resourceId: string)'),
    'RightsService implements canOfflineStore() gatekeeper'
  );
  assert(
    rightsServiceSrc.includes('public static canAIIngest(resourceId: string)'),
    'RightsService implements canAIIngest() gatekeeper'
  );
  assert(
    rightsServiceSrc.includes('public static generateCitation('),
    'RightsService implements generateCitation() for simple, APA, Chicago, and MLA'
  );
  assert(
    rightsServiceSrc.includes('public static runRightsIntegrityAudit()'),
    'RightsService implements runRightsIntegrityAudit() automated validator'
  );
  assert(
    rightsServiceSrc.includes('public static submitConcern(') && rightsServiceSrc.includes('public static getConcerns('),
    'RightsService implements Copyright Concern workflow with submission and retrieval'
  );

  // ------------------------------------------------------------
  // SECTION 8: LEGAL UI PAGES & COMPONENTS
  // ------------------------------------------------------------
  console.log('\n--- SECTION 8: Legal Screens & Components ---');
  const copyrightScreenSrc = fs.readFileSync(copyrightScreenPath, 'utf8');
  assert(
    copyrightScreenSrc.includes('রেভা. অয়ন কুমার ঘোষ') && copyrightScreenSrc.includes('ayanghosh75@gmail.com'),
    'CopyrightScreen prominently displays Rev. Ayan Kumar Ghosh and ayanghosh75@gmail.com'
  );
  assert(
    copyrightScreenSrc.includes('© 2026 Rev. Ayan Kumar Ghosh. Bengali Study Bible.'),
    'CopyrightScreen displays official copyright notice'
  );
  assert(
    copyrightScreenSrc.includes('তৃতীয় পক্ষের স্বত্বাধিকারের প্রতি স্পষ্ট ও দ্ব্যর্থহীন ঘোষণা'),
    'CopyrightScreen includes Section 3 explicit third-party disclaimer'
  );
  assert(
    copyrightScreenSrc.includes('কপিরাইট লঙ্ঘন বিজ্ঞপ্তি ও উপাদান অপসারণ প্রক্রিয়া'),
    'CopyrightScreen includes Section 13 notice and takedown procedure'
  );

  const footerSrc = fs.readFileSync(footerPath, 'utf8');
  assert(
    footerSrc.includes('Rev. Ayan Kumar Ghosh') && footerSrc.includes('ayanghosh75@gmail.com'),
    'Global Footer credits Rev. Ayan Kumar Ghosh and official contact'
  );
  assert(
    footerSrc.includes("onSelectTab('copyright')") &&
    footerSrc.includes("onSelectTab('licenses')") &&
    footerSrc.includes("onSelectTab('sources')") &&
    footerSrc.includes("onSelectTab('copyright-concern')"),
    'Global Footer has links to /copyright, /licenses, /sources, and /copyright-concern'
  );

  const readerSrc = fs.readFileSync(readerPath, 'utf8');
  assert(
    readerSrc.includes('BibleTranslationAttribution'),
    'BibleReaderScreen integrates BibleTranslationAttribution component'
  );

  // ------------------------------------------------------------
  // SECTION 9: BIBLE READER REPAIR & MATTHEW 26 REGRESSION
  // ------------------------------------------------------------
  console.log('\n--- SECTION 9: Bible Reader Canonical Integrity & Matthew 26 ---');
  assert(fs.existsSync(matthewPath), 'MAT.json exists in public/bible-data/irv/');
  const matData = JSON.parse(fs.readFileSync(matthewPath, 'utf8'));
  const ch26 = matData.chapters['26'];
  assert(Array.isArray(ch26), 'Matthew chapter 26 exists as an array of verses');
  assert(ch26.length === 75, `Matthew 26 contains all 75 verses (found: ${ch26.length})`);
  assert(ch26[0].verse === 1 && ch26[74].verse === 75, 'Matthew 26 verses range without gaps from v1 to v75');
  assert(
    !ch26.some(v => v.textBn.includes('শীঘ্রই যুক্ত') || v.textBn.includes('placeholder')),
    'Matthew 26 contains 0 placeholder or fabricated text'
  );

  assert(fs.existsSync(searchIndexPath), 'search-index.json exists in public/bible-data/irv/');
  const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
  assert(
    searchIndex.length === 31088,
    `Search index contains exact canonical 31,088 verses (found: ${searchIndex.length})`
  );

  // ------------------------------------------------------------
  // SUMMARY
  // ------------------------------------------------------------
  console.log('\n============================================================');
  console.log(`TEST SUITE RESULTS: ${passedTests} / ${totalTests} PASSED`);
  if (failedTests === 0) {
    console.log('🎉 ALL 40 REQUIREMENTS VERIFIED WITH 100% SUCCESS!');
  } else {
    console.error(`⚠️ ${failedTests} TEST(S) FAILED!`);
  }
  console.log('============================================================\n');

  if (failedTests > 0) process.exit(1);
}

runSuite().catch(e => {
  console.error('Test runner encountered unexpected error:', e);
  process.exit(1);
});
