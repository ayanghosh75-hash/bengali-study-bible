// Automated Test Suite for Bengali Bible Research Engine & Knowledge Platform
import assert from 'assert';

// Dynamic import from compiled or source via tsx or node
async function runTests() {
  console.log('🧪 Starting Bengali Bible Research Engine Automated Test Suite...\n');

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
      failed++;
    }
  }

  // Import services & data
  const {
    normalizeBengaliWord,
    stripBengaliSuffix,
    matchConceptCluster,
  } = await import('../src/data/morphologySynonyms.ts');

  const { getLexiconByStrongs, searchLexicon } = await import(
    '../src/data/lexiconData.ts'
  );

  const { ResearchEngineService } = await import('../src/services/researchEngineService.ts');

  // --- TEST GROUP 1: Morphological Normalization & Inflection Stripping ---
  console.log('--- TEST GROUP 1: Morphological Normalization & Inflections ---');

  test('Morphology: Normalizes Bengali orthographical variations (ণ -> ন, য় -> য, ষ/শ -> স)', () => {
    assert.strictEqual(normalizeBengaliWord('পরিত্রাণ'), normalizeBengaliWord('পরিত্রান'));
    assert.strictEqual(normalizeBengaliWord('মহিষ'), normalizeBengaliWord('মহিশ'));
  });

  test('Morphology: Suffix stripping correctly isolates root noun/verb', () => {
    assert.strictEqual(stripBengaliSuffix('পরিত্রাণের'), 'পরিত্রাণ');
    assert.strictEqual(stripBengaliSuffix('বিশ্বাসের'), 'বিশ্বাস');
    assert.strictEqual(stripBengaliSuffix('অনুগ্রহে'), 'অনুগ্রহ');
  });

  test('Morphology: Matches concept cluster for spelling variation "পরিত্রান"', () => {
    const clusters = matchConceptCluster('পরিত্রান');
    assert(clusters.length > 0, 'Must match salvation cluster');
    assert.strictEqual(clusters[0].conceptKey, 'salvation');
  });

  test('Morphology: Matches concept cluster for inflected form "পরিত্রাণের"', () => {
    const clusters = matchConceptCluster('পরিত্রাণের');
    assert(clusters.length > 0, 'Must match salvation cluster');
    assert.strictEqual(clusters[0].conceptKey, 'salvation');
  });

  test('Morphology: Matches concept cluster for synonyms "উদ্ধার" and "রক্ষা"', () => {
    const clustersUddhar = matchConceptCluster('উদ্ধার');
    assert(clustersUddhar.some((c) => c.conceptKey === 'salvation'));

    const clustersRokkha = matchConceptCluster('রক্ষা');
    assert(clustersRokkha.some((c) => c.conceptKey === 'salvation'));
  });

  // --- TEST GROUP 2: Semantic Concept Expansions ---
  console.log('\n--- TEST GROUP 2: Semantic Expansions ---');

  test('Semantic: Query "ঈশ্বরের কৃপা" expands to grace, salvation, and faith', () => {
    const clusters = matchConceptCluster('ঈশ্বরের কৃপা');
    assert(clusters.length > 0, 'Should match grace cluster');
    const grace = clusters.find((c) => c.conceptKey === 'grace');
    assert(grace, 'Grace cluster must be present');
    assert(grace.semanticExpansions.includes('পরিত্রাণ'));
    assert(grace.semanticExpansions.includes('বিশ্বাস'));
  });

  // --- TEST GROUP 3: Original Language Lexicon & Strong\'s Numbers ---
  console.log('\n--- TEST GROUP 3: Original Language Lexicon ---');

  test('Lexicon: Hebrew Strong\'s H3444 (yeshu\'ah) details are complete', () => {
    const word = getLexiconByStrongs('H3444');
    assert(word, 'H3444 must exist');
    assert.strictEqual(word.language, 'Hebrew');
    assert.strictEqual(word.originalLemma, 'יְשׁוּעָה');
    assert(word.pronunciationBn.includes('ইয়েশূয়া'));
    assert(word.semanticRange.length >= 3);
    assert(word.usageCount.total > 50);
  });

  test('Lexicon: Greek Strong\'s G4991 (soteria) details are complete', () => {
    const word = getLexiconByStrongs('G4991');
    assert(word, 'G4991 must exist');
    assert.strictEqual(word.language, 'Greek');
    assert.strictEqual(word.originalLemma, 'σωτηρία');
    assert(word.pronunciationBn.includes('সোতেরিয়া'));
    assert(word.semanticRange.length >= 3);
  });

  test('Lexicon: Search returns relevant Greek & Hebrew roots for "পরিত্রাণ"', () => {
    const results = searchLexicon('পরিত্রাণ');
    assert(results.length >= 3, 'Must return multiple salvation roots');
    const strongs = results.map((r) => r.strongNumber);
    assert(strongs.includes('H3444') || strongs.includes('G4991'));
  });

  // --- TEST GROUP 4: 8-Section Master Research Payload ---
  console.log('\n--- TEST GROUP 4: 8-Section Master Research Payload ---');

  const startTime = Date.now();
  const payload = ResearchEngineService.executeResearch('পরিত্রাণ');
  const executionDuration = Date.now() - startTime;

  test('Performance: Sub-second response time for 8-section research assembly', () => {
    assert(executionDuration < 500, `Execution took ${executionDuration}ms, must be < 500ms`);
    console.log(`     (Execution time: ${executionDuration}ms)`);
  });

  test('Section 1 (BIBLE): Top verses are ranked with relevance scores and proof-texts', () => {
    const verses = payload.bibleSection.rankedVerses;
    assert(verses.length > 0, 'Ranked verses must not be empty');
    assert(verses[0].relevanceScore >= 90, 'Top verse must have high relevance score');
    const references = verses.map((v) => `${v.bookId}.${v.chapter}.${v.verse}`);
    assert(references.includes('JHN.3.16'), 'Must contain John 3:16');
    assert(references.includes('EPH.2.8'), 'Must contain Ephesians 2:8');
    assert(references.includes('ACT.4.12'), 'Must contain Acts 4:12');
  });

  test('Section 1 (THEMES): Thematic scripture collections are generated with non-empty verses', () => {
    const themes = payload.bibleSection.thematicCollections;
    assert.strictEqual(themes.length, 5, 'Must generate 5 thematic collections');
    for (const t of themes) {
      assert(t.verses.length > 0, `Theme ${t.titleBn} must have verses`);
    }
  });

  test('Section 2 (STUDY): Curated articles, topic clusters, and sermon outlines are loaded', () => {
    assert(payload.studySection.articles.length >= 3, 'Must have at least 3 articles');
    assert(payload.studySection.topicCluster.children.length >= 5, 'Topic cluster must have children');
    assert(payload.studySection.homileticalThemes.sermonOutlines.length >= 2, 'Must have sermon outlines');
  });

  test('Section 3 (PEOPLE): Major biblical characters with relational paths (Paul, Peter, Nicodemus, etc.)', () => {
    const chars = payload.peopleSection.characters;
    assert(chars.length >= 4, 'Must have key biblical characters');
    const names = chars.map((c) => c.nameBn);
    assert(names.some((n) => n.includes('পৌল')));
    assert(names.some((n) => n.includes('পিতর')));
    assert(payload.peopleSection.networkGraph.length >= 4, 'Relational network graph must be mapped');
  });

  test('Section 4 (HISTORY): Contextual background and 5-era timeline with archaeology notes', () => {
    assert(payload.historySection.jewishUnderstandingBn.length > 50);
    assert(payload.historySection.grecoRomanContextBn.length > 50);
    assert.strictEqual(payload.historySection.timeline.length, 5, 'Must have 5 timeline eras');
    assert(payload.historySection.archaeologicalNotes.length >= 3, 'Must have archaeological notes');
  });

  test('Section 5 (WORDS): Hebrew & Greek original word studies with semantic ranges', () => {
    const words = payload.wordsSection.originalWords;
    assert(words.length >= 2, 'Must have Hebrew and Greek words');
    for (const w of words) {
      assert(w.strongNumber, 'Must have Strong number');
      assert(w.pronunciationBn, 'Must have Bengali pronunciation');
      assert(w.semanticRange.length > 0, 'Must have semantic ranges');
    }
  });

  test('Section 6 (CROSS REFS): Direct, thematic, prophecy-fulfillment links and Knowledge Graph', () => {
    assert(payload.crossRefSection.directReferences.length > 0);
    assert(payload.crossRefSection.thematicReferences.length > 0);
    assert(payload.crossRefSection.knowledgeGraph.nodes.length >= 10);
    assert(payload.crossRefSection.knowledgeGraph.links.length >= 10);
  });

  test('Section 7 (LIBRARY): Resources categorized into 4 academic levels (Beginner to Scholar)', () => {
    const lib = payload.librarySection;
    assert(lib.byLevel.beginner.length > 0, 'Beginner resources must exist');
    assert(lib.byLevel.intermediate.length > 0, 'Intermediate resources must exist');
    assert(lib.byLevel.advanced.length > 0, 'Advanced resources must exist');
    assert(lib.byLevel.scholar.length > 0, 'Scholar resources must exist');
  });

  test('Section 8 (AI COPILOT): Structured brief generated with executive summary, proofs, and application', () => {
    const brief = payload.copilotSection.brief;
    assert(brief.executiveSummaryBn.length > 100);
    assert(brief.keyVersesAnalysis.length >= 3);
    assert(brief.systematicTheologyBn.length >= 2);
    assert(brief.homileticalAndPastoralApplicationBn.preachingAngleBn.length > 20);
    assert(brief.homileticalAndPastoralApplicationBn.counselingGuidanceBn.length > 20);
  });

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
