// Automated Test Suite for 🤖 Ask Bible (Grounded AI Theological Research Assistant)
import assert from 'assert';

async function runTests() {
  console.log('🧪 Starting 🤖 Ask Bible Automated Test Suite...\n');

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

  async function testAsync(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
      failed++;
    }
  }

  // Import AskBibleService
  const { AskBibleService } = await import('../src/services/askBibleService.ts');
  const { ASK_BIBLE_CURATED_ENTRIES } = await import('../src/data/askBibleKnowledgeBase.ts');

  // --- TEST GROUP 1: Question Type Intent Classification ---
  console.log('--- TEST GROUP 1: Universal Question Intent Classification ---');

  test('Intent: Identifies Bible chapter query ("রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?") as "bible"', () => {
    assert.strictEqual(AskBibleService.detectQuestionType('রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?'), 'bible');
  });

  test('Intent: Identifies Character query ("পৌল কে ছিলেন?") as "character"', () => {
    assert.strictEqual(AskBibleService.detectQuestionType('পৌল কে ছিলেন?'), 'character');
  });

  test('Intent: Identifies Theology query ("পরিত্রাণ কী?") as "theology"', () => {
    assert.strictEqual(AskBibleService.detectQuestionType('পরিত্রাণ কী?'), 'theology');
  });

  test('Intent: Identifies Historical query ("ফরীশীরা কারা ছিলেন?") as "historical"', () => {
    assert.strictEqual(AskBibleService.detectQuestionType('ফরীশীরা কারা ছিলেন?'), 'historical');
  });

  test('Intent: Identifies Word study query ("আগাপে শব্দের অর্থ কী?") as "word_study"', () => {
    assert.strictEqual(AskBibleService.detectQuestionType('আগাপে শব্দের অর্থ কী?'), 'word_study');
  });

  test('Intent: Identifies Comparative query ("পৌল ও যাকোবের শিক্ষা কি বিরোধপূর্ণ?") as "comparative"', () => {
    assert.strictEqual(AskBibleService.detectQuestionType('পৌল ও যাকোবের শিক্ষা কি বিরোধপূর্ণ?'), 'comparative');
  });

  test('Intent: Identifies Practical query ("খ্রিস্টীয় ক্ষমা কীভাবে চর্চা করব?") as "practical"', () => {
    assert.strictEqual(AskBibleService.detectQuestionType('খ্রিস্টীয় ক্ষমা কীভাবে চর্চা করব?'), 'practical');
  });

  test('Intent: Identifies Research query ("পরিত্রাণ বিষয়ে সব গুরুত্বপূর্ণ পদ দেখাও") as "research"', () => {
    assert.strictEqual(AskBibleService.detectQuestionType('পরিত্রাণ বিষয়ে সব গুরুত্বপূর্ণ পদ দেখাও'), 'research');
  });

  // --- TEST GROUP 2: Curated Flagship Inquiry (Romans 8) ---
  console.log('\n--- TEST GROUP 2: Flagship Inquiry: Romans 8 ("রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?") ---');

  await testAsync('Romans 8: Retrieves complete 9-section response with high confidence', async () => {
    const res = await AskBibleService.ask('রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?');

    assert.ok(res, 'Response should exist');
    assert.strictEqual(res.targetPassage?.bookId, 'ROM');
    assert.strictEqual(res.targetPassage?.chapter, 8);
    assert.strictEqual(res.confidence.level, 'high');
    assert.ok(res.confidence.scorePercent >= 95, 'Score should be >= 95%');

    // Section 1: বাইবেল সরাসরি যা বলে
    assert.ok(res.directScripture.verses.length >= 5, 'Should have at least 5 anchor verses');
    assert.ok(res.directScripture.verses.some((v) => v.verse === 1), 'Should include Rom 8:1');
    assert.ok(res.directScripture.verses.some((v) => v.verse === 28), 'Should include Rom 8:28');
    assert.ok(res.directScripture.keyObservationsBn.length > 0, 'Key observations should be present');

    // Section 2: প্রেক্ষাপট
    assert.ok(res.context.authorDateBn.includes('পৌল'), 'Should identify Paul as author');
    assert.ok(res.context.geographicalSettingBn.includes('রোম'), 'Should identify Rome setting');
    assert.ok(res.context.socioPoliticalBackgroundBn.includes('দত্তক'), 'Should explain Roman adoption law');

    // Section 3: ব্যাখ্যা
    assert.ok(res.exposition.coreThesisBn.length > 20, 'Core thesis should be substantive');
    assert.ok(res.exposition.structuralOutline.length >= 4, 'Should contain 4 structural sections');
    assert.ok(res.exposition.pastoralApplicationBn.length > 20, 'Pastoral application should be substantive');

    // Section 4: মূল শব্দ
    assert.ok(res.originalWords.some((w) => w.strongs === 'G2631'), 'Should contain G2631 katakrima');
    assert.ok(res.originalWords.some((w) => w.strongs === 'G4151'), 'Should contain G4151 pneuma');
    assert.ok(res.originalWords.some((w) => w.strongs === 'G5206'), 'Should contain G5206 huiothesia');

    // Section 5: ক্রস রেফারেন্স
    assert.ok(res.crossReferences.length >= 3, 'Should have at least 3 cross references');

    // Section 6: সম্পর্কিত ব্যক্তি
    assert.ok(res.relatedCharacters.length > 0, 'Should have related biblical characters');

    // Section 7: বিভিন্ন মত
    assert.ok(res.theologicalPerspectives.perspectives.length >= 2, 'Should have at least 2 theological perspectives');
    assert.ok(res.theologicalPerspectives.unifyingConsensusBn.length > 20, 'Should have unifying consensus');

    // Section 8: গবেষণার সূত্র
    assert.ok(res.researchSources.primaryBibleEditions.length > 0, 'Should have primary Bible editions');
    assert.ok(res.researchSources.scholarlyCitations.length > 0, 'Should have scholarly citations');

    // Section 9: আরও অধ্যয়ন করুন
    assert.ok(res.furtherStudy.relatedTopics.length > 0, 'Should have further study topics');
  });

  // --- TEST GROUP 3: Additional Flagship Inquiries ---
  console.log('\n--- TEST GROUP 3: Additional Flagship Inquiries ---');

  await testAsync('John 1: "যোহন ১:১-এ ‘বাক্য’ (Logos) বলতে কী বোঝায়?"', async () => {
    const res = await AskBibleService.ask('যোহন ১:১-এ ‘বাক্য’ (Logos) বলতে কী বোঝায়?');
    assert.strictEqual(res.targetPassage?.bookId, 'JHN');
    assert.strictEqual(res.targetPassage?.chapter, 1);
    assert.ok(res.originalWords.some((w) => w.strongs === 'G3056'), 'Should contain G3056 Logos');
  });

  await testAsync('James 2 vs Romans 4: "যাকোব ২ ও রোমীয় ৪: বিশ্বাস ও কর্মের সম্পর্ক কী?"', async () => {
    const res = await AskBibleService.ask('যাকোব ২ ও রোমীয় ৪: বিশ্বাস ও কর্মের সম্পর্ক কী?');
    assert.ok(res.titleBn.includes('যাকোব') && res.titleBn.includes('রোমীয়'));
    assert.ok(res.originalWords.some((w) => w.strongs === 'G1344'), 'Should contain G1344 dikaioo');
  });

  await testAsync('Salvation Assurance: "পরিত্রাণ কি হারানো সম্ভব? অনন্ত জীবনের নিশ্চয়তা"', async () => {
    const res = await AskBibleService.ask('পরিত্রাণ কি হারানো সম্ভব? অনন্ত জীবনের নিশ্চয়তা');
    assert.ok(res.directScripture.verses.some((v) => v.bookId === 'JHN' && v.chapter === 10), 'Should cite John 10');
  });

  // --- TEST GROUP 4: Dynamic RAG Fallback for Arbitrary Chapters ---
  console.log('\n--- TEST GROUP 4: Dynamic RAG Fallback for Arbitrary Chapters ---');

  await testAsync('Dynamic RAG: Assembles response for non-curated chapter "মথি ৫ অধ্যায়ের সারাংশ"', async () => {
    const res = await AskBibleService.ask('মথি ৫ অধ্যায়ের সারাংশ');
    assert.ok(res, 'Should assemble response');
    assert.strictEqual(res.targetPassage?.bookId, 'MAT');
    assert.strictEqual(res.targetPassage?.chapter, 5);
    assert.ok(res.directScripture.verses.length > 0, 'Should fetch Matthew 5 verses');
    assert.ok(res.exposition.structuralOutline.length > 0, 'Should generate expository outline');
    assert.ok(res.theologicalPerspectives.perspectives.length > 0, 'Should generate theological perspectives');
  });

  // --- TEST GROUP 5: Advanced Deep Research Mode & Workspace Bridge ---
  console.log('\n--- TEST GROUP 5: Deep Research Mode & Workspace Bridge ---');

  await testAsync('Deep Research: Generates 7-day study plan and bibliography when requested', async () => {
    const res = await AskBibleService.ask('রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?', true);
    assert.ok(res.deepResearch?.isEnabled, 'Deep research should be enabled');
    assert.strictEqual(res.deepResearch?.sevenDayStudyPlan.length, 7, 'Should have 7-day plan');
    assert.ok(res.deepResearch?.biblicalBibliography.length >= 3, 'Should have bibliography');
  });

  test('Workspace Bridge: Exports complete research brief to markdown with citations', () => {
    const sampleEntry = ASK_BIBLE_CURATED_ENTRIES['romans-8'];
    const dummyRes = {
      ...sampleEntry,
      query: 'রোমীয় ৮ অধ্যায়ের মূল বক্তব্য কী?',
      questionType: 'bible',
      confidence: { level: 'high', scorePercent: 98, labelBn: 'উচ্চ আস্থা', explanationBn: 'সাক্ষ্য' },
      originalWords: sampleEntry.researchSources.lexicalTerms,
      crossReferences: sampleEntry.researchSources.crossReferences.map((cr) => ({ ...cr, typeBn: 'সরাসরি সমান্তরাল' })),
      relatedCharacters: [],
      furtherStudy: { relatedTopics: [], relatedChapters: [], relatedCharacters: [], relatedWordStudies: [], relatedArticles: [] },
      researchSources: { ...sampleEntry.researchSources, primaryBibleEditions: ['BSI'] },
      generatedAt: new Date().toISOString(),
      executionTimeMs: 12,
    };

    const markdown = AskBibleService.exportAsMarkdown(dummyRes);
    assert.ok(markdown.includes('🤖 Ask Bible'), 'Markdown should have Ask Bible header');
    assert.ok(markdown.includes('১. 📖 বাইবেল সরাসরি যা বলে'), 'Markdown should have Section 1');
    assert.ok(markdown.includes('২. 📜 প্রেক্ষাপট'), 'Markdown should have Section 2');
    assert.ok(markdown.includes('৩. 📚 ব্যাখ্যা'), 'Markdown should have Section 3');
    assert.ok(markdown.includes('৪. 🔍 মূল শব্দ'), 'Markdown should have Section 4');
    assert.ok(markdown.includes('৭. ⚖️ বিভিন্ন মত'), 'Markdown should have Section 7');
  });

  console.log(`\n========================================`);
  console.log(`Ask Bible Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
