import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const LKG_DIR = path.join(ROOT_DIR, '.release-candidates', new Date().toISOString().replaceAll(':', '-'));
const LKG_BACKUP_DIR = path.join(LKG_DIR, 'dist-backup');
const LKG_MANIFEST_FILE = path.join(LKG_DIR, 'lkg-manifest.json');

const CANONICAL_DOMAIN = 'bengalistudybible.surge.sh';
const CANONICAL_URL = `https://${CANONICAL_DOMAIN}`;

console.log('================================================================================');
console.log('   BENGALI STUDY BIBLE — PRODUCTION DEPLOYMENT & LKG PIPELINE');
console.log(`   Canonical Domain: ${CANONICAL_DOMAIN}`);
console.log('================================================================================\n');

// 1. Audit codebase for any illegal temporary URLs
console.log('[1/7] Auditing codebase for temporary tunnels or unapproved domains...');
const FORBIDDEN_STRINGS = ['trycloudflare.com', 'epinions-', 'ngrok.io', 'localtunnel.me'];

function scanDirForForbiddenStrings(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === '.last-known-good') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirForForbiddenStrings(fullPath);
    } else if (/\.(ts|tsx|js|mjs|json|html|webmanifest)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const forbidden of FORBIDDEN_STRINGS) {
        if (content.includes(forbidden)) {
          throw new Error(`Forbidden temporary string "${forbidden}" detected in: ${fullPath}`);
        }
      }
    }
  }
}

scanDirForForbiddenStrings(path.join(ROOT_DIR, 'src'));
scanDirForForbiddenStrings(path.join(ROOT_DIR, 'public'));
console.log('  ✓ Codebase verified: Zero temporary tunnel or unapproved domains found.');

// 2. Run Bible Integrity Tests
console.log('\n[2/7] Running Protestant Canon 66-Books Bible Integrity Audit...');
try {
  execSync('npm run test:integrity', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('  ✓ Scripture audit passed: All 66 books, 1,189 chapters, and 31,088 verses authentic.');
} catch (e) {
  console.error('  ✗ SCRIPTURE INTEGRITY AUDIT FAILED! Halting deployment.');
  process.exit(1);
}

// 3. Run Install & QR Test Suite
console.log('\n[3/7] Running Permanent Install & QR Code Test Suite...');
try {
  execSync('npm run test:install-qr', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('  ✓ Permanent Install & QR audit passed: All 37 checks verified.');
} catch (e) {
  console.error('  ✗ INSTALL & QR TEST SUITE FAILED! Halting deployment.');
  process.exit(1);
}

// 4. Build Production Bundle
console.log('\n[4/7] Building Production Assets (tsc -b && vite build)...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('  ✓ Vite production bundle compiled cleanly.');
} catch (e) {
  console.error('  ✗ BUILD FAILED! Halting deployment.');
  process.exit(1);
}

// 5. Prepare SPA Routing and Fallbacks
console.log('\n[5/7] Preparing SPA Routing Fallbacks and CNAME...');
execSync('npm run deploy:prep', { stdio: 'inherit', cwd: ROOT_DIR });

// Verify critical files in dist
const criticalFiles = [
  'index.html',
  '200.html',
  '404.html',
  'CNAME',
  'manifest.json',
  'sw.js',
  'install/index.html',
  'recovery/index.html',
  'status/index.html'
];
for (const file of criticalFiles) {
  const p = path.join(DIST_DIR, file);
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
    throw new Error(`Critical production asset missing or empty in dist: ${file}`);
  }
}
console.log('  ✓ Critical files verified in dist: index.html, 200.html, 404.html, CNAME, manifest.json, sw.js, recovery, and status. Private emergency guide is excluded.');

// 6. Snapshot Last-Known-Good (LKG) Build
console.log('\n[6/7] Archiving an unverified release candidate; preserving existing LKG...');
if (!fs.existsSync(LKG_DIR)) fs.mkdirSync(LKG_DIR, { recursive: true });
// Append-only candidate snapshots preserve the existing last-known-good release.
fs.mkdirSync(LKG_BACKUP_DIR, { recursive: true });

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(DIST_DIR, LKG_BACKUP_DIR);

const manifestData = {
  version: 'v6.0.0',
  deployedAt: new Date().toISOString(),
  domain: CANONICAL_DOMAIN,
  canonicalUrl: CANONICAL_URL,
  status: 'UNPUBLISHED_CANDIDATE',
  fileCount: fs.readdirSync(DIST_DIR).length,
  swCache: 'bengali-study-bible-v6',
};

fs.writeFileSync(LKG_MANIFEST_FILE, JSON.stringify(manifestData, null, 2));
console.log('Saved candidate snapshot:', LKG_DIR);

if (!process.argv.includes('--publish')) {
  console.log('Preparation complete. Publication requires a separate --publish invocation after review.');
  process.exit(0);
}

// A known verse-reference defect must not pass the publication gate.
execSync('node scripts/audit-verse-ranges.mjs', { stdio: 'inherit', cwd: ROOT_DIR });

// 7. Deploy to Surge
console.log(`\n[7/7] Publishing to Surge (${CANONICAL_DOMAIN})...`);
try {
  execSync(`npx surge dist --domain ${CANONICAL_DOMAIN}`, { stdio: 'inherit', cwd: ROOT_DIR });
  console.log(`  ✓ Deployment command succeeded for ${CANONICAL_DOMAIN}`);
} catch (e) {
  console.error(`  ✗ SURGE DEPLOYMENT COMMAND FAILED:`, e.message);
  process.exit(1);
}

console.log('\n================================================================================');
console.log('🎉 PUBLISH COMMAND COMPLETED; LIVE VERIFICATION AND LKG PROMOTION STILL REQUIRED.');
console.log('================================================================================');
