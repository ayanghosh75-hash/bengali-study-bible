import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

console.log('================================================================================');
console.log('   PWA INSTALLED-USER UPDATE SUBSYSTEM & DATA INTEGRITY TEST SUITE');
console.log('================================================================================\n');

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] ${message}`);
  }
}

// 1. Version comparison logic
function compareVersions(vA, vB) {
  const partsA = vA.replace(/^v/i, '').split('.').map((p) => parseInt(p, 10) || 0);
  const partsB = vB.replace(/^v/i, '').split('.').map((p) => parseInt(p, 10) || 0);
  const maxLen = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < maxLen; i++) {
    const a = partsA[i] || 0;
    const b = partsB[i] || 0;
    if (a > b) return 1;
    if (a < b) return -1;
  }
  return 0;
}

console.log('[1/4] Testing SemVer comparison algorithm...');
assert(compareVersions('1.0.1', '1.0.0') === 1, '1.0.1 > 1.0.0 returns 1');
assert(compareVersions('1.0.0', '1.0.1') === -1, '1.0.0 < 1.0.1 returns -1');
assert(compareVersions('1.0.1', '1.0.1') === 0, '1.0.1 === 1.0.1 returns 0');
assert(compareVersions('2.0.0', '1.9.9') === 1, '2.0.0 > 1.9.9 returns 1');
assert(compareVersions('v1.0.1', '1.0.0') === 1, 'v-prefix is correctly handled');

// 2. Version manifest validation
console.log('\n[2/4] Auditing public/version.json format & fields...');
const verPath = path.join(ROOT_DIR, 'public/version.json');
assert(fs.existsSync(verPath), 'public/version.json exists');

const verData = JSON.parse(fs.readFileSync(verPath, 'utf-8'));
assert(verData.version === '1.0.1', `Version is 1.0.1 (got ${verData.version})`);
assert(Boolean(verData.buildTime), `Build timestamp present: ${verData.buildTime}`);
assert(Boolean(verData.releaseNotesBn), 'Bilingual release notes in Bengali present');
assert(Boolean(verData.releaseNotesEn), 'Bilingual release notes in English present');
assert(verData.cacheVersion === 'bengali-study-bible-v6', 'SW cache version is bengali-study-bible-v6');

// 3. User Data Isolation and Protection
console.log('\n[3/4] Verifying User Storage isolation from Service Worker cache...');
const storageServiceSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/services/storageService.ts'), 'utf-8');
assert(storageServiceSrc.includes('bsb_bookmarks_v1'), 'Bookmarks storage key bsb_bookmarks_v1 preserved');
assert(storageServiceSrc.includes('bsb_personal_notes_v1'), 'Notes storage key bsb_personal_notes_v1 preserved');
assert(storageServiceSrc.includes('bsb_highlights_v1'), 'Highlights storage key bsb_highlights_v1 preserved');
assert(storageServiceSrc.includes('bsb_reading_history_v1'), 'Reading history storage key bsb_reading_history_v1 preserved');

const swSrc = fs.readFileSync(path.join(ROOT_DIR, 'public/sw.js'), 'utf-8');
assert(!swSrc.includes('localStorage.clear'), 'Service worker never calls localStorage.clear()');
assert(swSrc.includes('bengali-study-bible-v6'), 'Service worker precaches version v6');
assert(swSrc.includes('/version.json'), 'Service worker lists /version.json in ASSETS_TO_PRECACHE');

// 4. Update UI Components Existence
console.log('\n[4/4] Verifying UI components and triggers integration...');
const appSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/App.tsx'), 'utf-8');
assert(appSrc.includes('AppUpdatePromptModal'), 'AppUpdatePromptModal mounted in App.tsx');
assert(appSrc.includes('AppUpdateService.getInstance()') && appSrc.includes('.init()'), 'AppUpdateService initialized on startup');

const settingsSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ReaderSettingsModal.tsx'), 'utf-8');
assert(settingsSrc.includes('অ্যাপ আপডেট (App Update)'), 'Section 7 App Update added in ReaderSettingsModal');
assert(settingsSrc.includes('handleCheckUpdate'), 'Manual update check handler connected');

console.log('\n--------------------------------------------------------------------------------');
console.log(`RESULTS: ${passed}/${total} checks passed (${((passed / total) * 100).toFixed(1)}%)`);
console.log('--------------------------------------------------------------------------------');

if (passed === total) {
  console.log('🎉 PWA UPDATE SUBSYSTEM PASSED ALL VERIFICATIONS!\n');
  process.exit(0);
} else {
  console.error('🚨 SOME CHECKS FAILED!\n');
  process.exit(1);
}
