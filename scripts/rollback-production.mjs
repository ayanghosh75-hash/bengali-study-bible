import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const LKG_DIR = path.join(ROOT_DIR, '.last-known-good');
const LKG_BACKUP_DIR = path.join(LKG_DIR, 'dist-backup');
const LKG_MANIFEST_FILE = path.join(LKG_DIR, 'lkg-manifest.json');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const CANONICAL_DOMAIN = 'bengalistudybible.surge.sh';

console.log('================================================================================');
console.log('   BENGALI STUDY BIBLE — LAST-KNOWN-GOOD ROLLBACK RECOVERY');
console.log(`   Target Domain: ${CANONICAL_DOMAIN}`);
console.log('================================================================================\n');

if (!fs.existsSync(LKG_MANIFEST_FILE) || !fs.existsSync(LKG_BACKUP_DIR)) {
  console.error('✗ ERROR: No Last-Known-Good build archive found in .last-known-good/. Cannot rollback.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(LKG_MANIFEST_FILE, 'utf-8'));
console.log(`[1/3] Found Last-Known-Good Snapshot:`);
console.log(`  - Version:     ${manifest.version}`);
console.log(`  - Deployed At: ${manifest.deployedAt}`);
console.log(`  - Files:       ${manifest.fileCount}`);
console.log(`  - SW Cache:    ${manifest.swCache}`);

console.log('\n[2/3] Restoring dist/ from Last-Known-Good archive...');
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

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

copyRecursive(LKG_BACKUP_DIR, DIST_DIR);
console.log('  ✓ Dist directory restored to verified LKG state.');

console.log(`\n[3/3] Emergency publishing LKG to Surge (${CANONICAL_DOMAIN})...`);
try {
  execSync(`npx surge dist --domain ${CANONICAL_DOMAIN}`, { stdio: 'inherit', cwd: ROOT_DIR });
  console.log(`  ✓ Rollback deployment successful! Site restored to verified LKG version.`);
} catch (e) {
  console.error(`  ✗ ROLLBACK SURGE DEPLOYMENT FAILED:`, e.message);
  process.exit(1);
}

console.log('\n================================================================================');
console.log('🎉 ROLLBACK RECOVERY COMPLETE! Public access restored.');
console.log('================================================================================');
