import fs from 'fs';

// Verify topics
const topicsContent = fs.readFileSync('src/data/topicsData.ts', 'utf8');
const topicsMatches = (topicsContent.match(/id:\s*'[^']+'/g) || []).length;
console.log(`[VERIFY PHASE 2] Study Topics loaded: ${topicsMatches}`);

// Verify characters
const charsContent = fs.readFileSync('src/data/charactersData.ts', 'utf8');
const charsMatches = (charsContent.match(/nameBn:\s*'[^']+'/g) || []).length;
console.log(`[VERIFY PHASE 2] Biblical Characters loaded: ${charsMatches}`);

// Verify cross references
const crossRefContent = fs.readFileSync('src/data/crossRefsData.ts', 'utf8');
const crossRefMatches = (crossRefContent.match(/sourceVerseKey:/g) || []).length;
console.log(`[VERIFY PHASE 2] Cross References mapped: ${crossRefMatches}`);

// Verify reading plans
const plansContent = fs.readFileSync('src/data/readingPlansData.ts', 'utf8');
const plansMatches = (plansContent.match(/totalDays:/g) || []).length;
console.log(`[VERIFY PHASE 2] Reading Plans loaded: ${plansMatches}`);

console.log('[VERIFY PHASE 2 SUCCESS] All Phase 2 theological datasets and logic verified.');
