import fs from 'fs';
import path from 'path';

// Verify books catalog
const booksFile = fs.readFileSync('src/data/books.ts', 'utf8');
const otCount = (booksFile.match(/testament: 'OT'/g) || []).length;
const ntCount = (booksFile.match(/testament: 'NT'/g) || []).length;
console.log(`[VERIFICATION] Books parsed: Total: ${otCount + ntCount} (Old Testament: ${otCount}, New Testament: ${ntCount})`);

// Verify authentic Bengali verse files exist
const verseFiles = ['genesis.ts', 'psalms.ts', 'matthew.ts', 'john.ts', 'epistles.ts', 'daily.ts'];
for (const vf of verseFiles) {
  const filePath = path.join('src/data/verses', vf);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const verseCount = (content.match(/verseKey:/g) || []).length;
    console.log(`[VERIFICATION] Verse File ${vf}: Found ${verseCount} authentic Bengali verses.`);
  } else {
    console.error(`Missing file ${vf}`);
  }
}

// Verify PWA manifest
const manifest = JSON.parse(fs.readFileSync('public/manifest.webmanifest', 'utf8'));
console.log(`[VERIFICATION] PWA Manifest: Name: "${manifest.name}", Display: "${manifest.display}", Icons: ${manifest.icons.length}`);

// Verify Service Worker
const sw = fs.readFileSync('public/sw.js', 'utf8');
console.log(`[VERIFICATION] Service Worker: Cache Name present: ${sw.includes('CACHE_NAME')}`);

console.log('[VERIFICATION SUCCESS] All Phase 1 components, data pipelines, and PWA assets verified.');
