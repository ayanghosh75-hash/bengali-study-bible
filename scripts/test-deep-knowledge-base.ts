// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার” — COMPREHENSIVE AUTOMATED AUDIT SUITE
// Tests 50+ Assertions across Data Models, Scoring, RAG, Licensing & Governance
// ============================================================

import assert from 'node:assert';
import { INITIAL_KNOWLEDGE_BASE_RESOURCES } from '../src/data/deepKnowledgeBaseData';
import { DeepKnowledgeBaseService } from '../src/services/deepKnowledgeBaseService';
import {
  KNOWLEDGE_CATEGORIES,
  THEOLOGICAL_TRADITIONS,
  MANDATORY_28_SOURCE_FIELDS,
} from '../src/types/deepKnowledgeBase';

console.log('🏛️ STARTING COMPREHENSIVE AUDIT: “দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার”...\n');

let passedTests = 0;
let totalTests = 0;

function it(description: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${description}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ✗ [FAIL] ${description}`);
    console.error(`    -> ${err.message}`);
  }
}

const service = DeepKnowledgeBaseService.getInstance();
service.resetToInitialCollection();

// SECTION 1: Master Taxonomy & Classifications
console.log('\n--- SECTION 1: Master Taxonomy & Categories ---');

it('Must define exactly 23 distinct knowledge categories', () => {
  assert.strictEqual(KNOWLEDGE_CATEGORIES.length, 23, 'Categories count should be 23');
});

it('Must define exactly 17 theological traditions', () => {
  assert.strictEqual(THEOLOGICAL_TRADITIONS.length, 17, 'Traditions count should be 17');
});

it('Must define all 28 mandatory source fields', () => {
  assert.strictEqual(MANDATORY_28_SOURCE_FIELDS.length, 28, 'Fields count should be 28');
});

// SECTION 2: Initial Curated Collection Integrity & 28-Field Compliance
console.log('\n--- SECTION 2: Curated Collection & 28-Field Source Record Verification ---');

it('Initial collection must contain at least 8 verified resources', () => {
  assert.ok(INITIAL_KNOWLEDGE_BASE_RESOURCES.length >= 8, 'At least 8 verified resources');
});

it('Every resource in the database must possess all 28 mandatory fields', () => {
  for (const r of INITIAL_KNOWLEDGE_BASE_RESOURCES) {
    for (const field of MANDATORY_28_SOURCE_FIELDS) {
      assert.ok((r as any)[field] !== undefined, `Resource ${r.id} missing field: ${field}`);
    }
  }
});

it('Every resource suitability score must be within 0 - 100 range', () => {
  for (const r of INITIAL_KNOWLEDGE_BASE_RESOURCES) {
    assert.ok(r.suitabilityScore.totalScore >= 0 && r.suitabilityScore.totalScore <= 100, `Invalid score for ${r.id}: ${r.suitabilityScore.totalScore}`);
    const sum =
      r.suitabilityScore.scriptureAccuracy +
      r.suitabilityScore.authorCredibility +
      r.suitabilityScore.licenceClarity +
      r.suitabilityScore.theologicalTransparency +
      r.suitabilityScore.bengaliLanguageQuality +
      r.suitabilityScore.educationalValue +
      r.suitabilityScore.accessibilityUsability +
      r.suitabilityScore.technicalSafety;
    assert.strictEqual(sum, r.suitabilityScore.totalScore, `Breakdown sum mismatch in ${r.id}`);
  }
});

// SECTION 3: Licensing & "Strict Meaning of Free" Governance
console.log('\n--- SECTION 3: Licensing & Meaning of Free ---');

it('Only resources with explicit redistribution rights may allow download', () => {
  for (const r of INITIAL_KNOWLEDGE_BASE_RESOURCES) {
    if (r.redistributionPermission) {
      assert.ok(
        r.copyrightStatus === 'PUBLIC_DOMAIN' ||
        r.copyrightStatus === 'CC0' ||
        r.copyrightStatus === 'CREATIVE_COMMONS',
        `Unqualified redistribution license for ${r.id}`
      );
    }
  }
});

it('External-link-only items must bear the mandatory Bengali notice', () => {
  const externalOnly = INITIAL_KNOWLEDGE_BASE_RESOURCES.filter((r) => r.status === 'EXTERNAL_LINK_ONLY');
  assert.ok(externalOnly.length > 0, 'Should have external-link-only resources');
  for (const r of externalOnly) {
    assert.strictEqual(
      r.externalLinkNoticeBn,
      'শুধু বহিরাগত লিংক—পুনঃপ্রকাশের অনুমতি যাচাই হয়নি',
      `Notice missing or wrong on ${r.id}`
    );
    assert.strictEqual(r.redistributionPermission, false, `Must not allow redistribution for external-only ${r.id}`);
    assert.strictEqual(r.fullContentBn, undefined, `Must not store full content for external-only ${r.id}`);
  }
});

// SECTION 4: Suitability Scoring Engine (0 - 100)
console.log('\n--- SECTION 4: Suitability Scoring Engine ---');

it('Suitability scoring engine computes exact breakdown and classification', () => {
  const scoreHigh = service.calculateSuitabilityScore({
    scriptureAccuracy: 25,
    authorCredibility: 15,
    licenceClarity: 20,
    theologicalTransparency: 10,
    bengaliLanguageQuality: 10,
    educationalValue: 10,
    accessibilityUsability: 5,
    technicalSafety: 5,
  });
  assert.strictEqual(scoreHigh.totalScore, 100);
  assert.strictEqual(scoreHigh.classification, 'STRONGLY_SUITABLE');

  const scoreMedium = service.calculateSuitabilityScore({
    scriptureAccuracy: 20,
    authorCredibility: 12,
    licenceClarity: 15,
    theologicalTransparency: 8,
    bengaliLanguageQuality: 8,
    educationalValue: 8,
    accessibilityUsability: 4,
    technicalSafety: 4,
  });
  assert.strictEqual(scoreMedium.totalScore, 79);
  assert.strictEqual(scoreMedium.classification, 'SUITABLE_WITH_NORMAL_REVIEW');

  const scoreLow = service.calculateSuitabilityScore({
    scriptureAccuracy: 10,
    authorCredibility: 8,
    licenceClarity: 10,
    theologicalTransparency: 5,
    bengaliLanguageQuality: 5,
    educationalValue: 5,
    accessibilityUsability: 3,
    technicalSafety: 3,
  });
  assert.strictEqual(scoreLow.totalScore, 49);
  assert.strictEqual(scoreLow.classification, 'DO_NOT_ADD');
});

// SECTION 5: Multi-Facet Search & Filter
console.log('\n--- SECTION 5: Multi-Facet Search & Filtering ---');

it('Search query matches across Bengali title and author', () => {
  const matches1 = service.filterResources({ searchQuery: 'ম্যাথু হেনরি' });
  assert.ok(matches1.length > 0, 'Should find Matthew Henry');
  assert.ok(matches1.some((r) => r.id === 'kb-matthew-henry-gospels'));

  const matches2 = service.filterResources({ searchQuery: 'শ্রীরামপুর' });
  assert.ok(matches2.length > 0, 'Should find Serampore mission records');
});

it('Filter by category isolates specific category resources', () => {
  const commentaries = service.filterResources({ category: 'commentaries' });
  assert.ok(commentaries.length > 0);
  assert.ok(commentaries.every((r) => r.category === 'commentaries'));
});

it('Filter by theological tradition isolates historical traditions', () => {
  const puritanTradition = service.filterResources({ theologicalTradition: 'Baptist' });
  assert.ok(puritanTradition.length > 0);
  assert.ok(puritanTradition.some((r) => r.author.includes('জন বুনিয়ান')));
});

// SECTION 6: Contextual Chapter Passage Matching (For Bible Reader)
console.log('\n--- SECTION 6: Passage Connections for Bible Reader ---');

it('Matches resources for John 3 passage', () => {
  const john3Resources = service.getResourcesForPassage('JHN', 3);
  assert.ok(john3Resources.length > 0, 'Should have resources for John 3');
  assert.ok(john3Resources.some((r) => r.id === 'kb-matthew-henry-gospels'));
});

it('Matches resources for Romans 8 passage', () => {
  const rom8Resources = service.getResourcesForPassage('ROM', 8);
  assert.ok(rom8Resources.length > 0, 'Should have resources for Romans 8');
});

// SECTION 7: Ask Bible RAG Integration
console.log('\n--- SECTION 7: Ask Bible RAG Integration ---');

it('searchForAskBible returns excerpts with full citations', () => {
  const ragResults = service.searchForAskBible('যোহন সুসমাচার', 2);
  assert.ok(ragResults.length > 0, 'Should return RAG items');
  for (const item of ragResults) {
    assert.ok(item.resource, 'Resource reference present');
    assert.ok(item.excerpt.length > 0, 'Excerpt generated');
    assert.ok(item.citation.includes('লাইসেন্স:'), 'Citation includes license');
  }
});

// SECTION 8: Security & Content Sanitization
console.log('\n--- SECTION 8: Security & Sanitization ---');

it('sanitizeContent strips dangerous tags and javascript protocols', () => {
  const dangerousHtml = '<p>ভাল শিক্ষা</p><script>alert("hack")</script><iframe src="evil.com"></iframe><a href="javascript:steal()">লিংক</a>';
  const clean = service.sanitizeContent(dangerousHtml);
  assert.strictEqual(clean.includes('<script'), false, 'Should strip script tags');
  assert.strictEqual(clean.includes('<iframe'), false, 'Should strip iframe tags');
  assert.strictEqual(clean.includes('javascript:'), false, 'Should strip javascript links');
  assert.ok(clean.includes('<p>ভাল শিক্ষা</p>'), 'Should preserve safe text');
});

it('validateFileSecurity rejects executable files', () => {
  const res1 = service.validateFileSecurity('sermon.exe');
  assert.strictEqual(res1.safe, false);

  const res2 = service.validateFileSecurity('theology.bat');
  assert.strictEqual(res2.safe, false);

  const res3 = service.validateFileSecurity('bible-dictionary.pdf');
  assert.strictEqual(res3.safe, true);
});

// SECTION 9: 12-Hour Operational Email Report Data
console.log('\n--- SECTION 9: 12-Hour Operational Report Data ---');

it('Generates complete 12-hour report section for knowledge base', () => {
  const rep = service.get12HourReportData();
  assert.ok(rep.sourcesSearchedCount > 0, 'Sources searched count');
  assert.ok(rep.resourcesFullyReviewed >= 8, 'Resources reviewed count');
  assert.ok(rep.resourcesImportedCount >= 5, 'Imported approved resources count');
  assert.ok(rep.automaticallyApprovedLinksCount >= 2, 'External link count');
  assert.strictEqual(rep.licenceProblemsCount, 0, 'Zero license problems');
  assert.strictEqual(rep.brokenOrUnsafeLinksCount, 0, 'Zero broken links');
});

// SECTION 10: Admin Status Transitions & Scripture Separation
console.log('\n--- SECTION 10: Admin Governance & Scripture Separation ---');

it('Admin can approve or mark external link only', () => {
  const updated = service.updateResourceStatus('kb-bengal-pastoral-ministry-handbook', 'APPROVED');
  assert.strictEqual(updated?.status, 'APPROVED');

  const updatedExternal = service.updateResourceStatus('kb-carey-serampore-history', 'EXTERNAL_LINK_ONLY');
  assert.strictEqual(updatedExternal?.status, 'EXTERNAL_LINK_ONLY');
  assert.strictEqual(updatedExternal?.externalLinkNoticeBn, 'শুধু বহিরাগত লিংক—পুনঃপ্রকাশের অনুমতি যাচাই হয়নি');
});

// Summary
console.log('\n============================================================');
console.log(`AUDIT RESULTS: ${passedTests}/${totalTests} Tests Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
