// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// FEEDBACK & SUPPORT SYSTEM AUTOMATED TEST SUITE
// Tests all 40 requirements & master prompt constraints
// ============================================================

import assert from 'assert';

// Mock browser environment for Node.js
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach((k) => delete storage[k]); },
};

global.window = {
  innerWidth: 1024,
  location: { pathname: '/feedback', search: '' },
  matchMedia: () => ({ matches: false }),
  navigator: {},
};

try {
  Object.defineProperty(global, 'navigator', {
    value: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      onLine: true,
    },
    configurable: true,
    writable: true,
  });
} catch {
  // Ignore
}

async function runTestSuite() {
  console.log('============================================================');
  console.log('BENGALI STUDY BIBLE • FEEDBACK & SUPPORT TEST SUITE');
  console.log('Project Owner & Developer: Rev. Ayan Kumar Ghosh');
  console.log('Official Support Email: ayanghosh75@gmail.com');
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;

  function it(desc, fn) {
    try {
      fn();
      console.log(`  ✓ ${desc}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${desc}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  async function itAsync(desc, fn) {
    try {
      await fn();
      console.log(`  ✓ ${desc}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${desc}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  // Import services dynamically after globals set
  const { FeedbackService } = await import('../src/services/feedbackService.ts');
  const { EmailNotificationService } = await import('../src/services/emailNotificationService.ts');
  const {
    PRIMARY_FEEDBACK_CARDS,
    SEED_FEEDBACK_ITEMS,
    STATUS_LABELS,
    PRIORITY_LABELS,
    EMAIL_STATUS_LABELS,
  } = await import('../src/data/feedback/feedbackCategoriesData.ts');

  // Test 1: Category Data & Structure
  it('Category Registry contains 9 primary cards', () => {
    assert.strictEqual(PRIMARY_FEEDBACK_CARDS.length, 9);
    const categories = PRIMARY_FEEDBACK_CARDS.map((c) => c.category);
    assert(categories.includes('TECHNICAL_PROBLEM'));
    assert(categories.includes('CONTENT_CORRECTION'));
    assert(categories.includes('FEATURE_REQUEST'));
    assert(categories.includes('BIBLE_TEXT_CONCERN'));
    assert(categories.includes('SOURCE_CORRECTION'));
    assert(categories.includes('MINISTRY_NEED'));
    assert(categories.includes('INSTALLATION_PROBLEM'));
    assert(categories.includes('GENERAL_FEEDBACK'));
    assert(categories.includes('USER_REVIEW'));
  });

  it('Seed items provide 5 realistic baseline records with diverse categories', () => {
    assert.strictEqual(SEED_FEEDBACK_ITEMS.length, 5);
    const item1 = SEED_FEEDBACK_ITEMS[0];
    assert.strictEqual(item1.referenceNumber, 'BSB-FB-2026-00001');
    assert.strictEqual(item1.category, 'BIBLE_TEXT_CONCERN');
    assert.strictEqual(item1.status, 'BIBLE_DATA_REVIEW_REQUIRED');
  });

  it('Official Recipient is strictly ayanghosh75@gmail.com', () => {
    assert.strictEqual(EmailNotificationService.OFFICIAL_RECIPIENT, 'ayanghosh75@gmail.com');
  });

  // Test 2: Database Initialization & Retrieval
  it('FeedbackService initializes database with seeds if storage is empty', () => {
    localStorage.clear();
    const all = FeedbackService.getAllFeedback();
    assert.strictEqual(all.length, 5);
    assert.strictEqual(all[0].referenceNumber, 'BSB-FB-2026-00001');
  });

  // Test 3: Reference Number Generation
  it('Generates formatted sequential reference numbers: BSB-FB-2026-XXXXX', () => {
    const ref = FeedbackService.generateReferenceNumber();
    assert.match(ref, /^BSB-FB-2026-\d{5}$/);
  });

  // Test 4: Diagnostics Capture
  it('Captures privacy-preserving technical diagnostics', () => {
    const diag = FeedbackService.captureTechnicalContext('/bible?book=JHN&chapter=3');
    assert.strictEqual(diag.osFamily, 'Windows');
    assert.strictEqual(diag.browserFamily, 'Chrome');
    assert.strictEqual(diag.isOnline, true);
    assert.strictEqual(diag.currentRoute, '/bible?book=JHN&chapter=3');
  });

  // Test 5: Bot Protection via Honeypot
  await itAsync('Rejects bot submissions that fill the hidden honeypot field', async () => {
    const res = await FeedbackService.submitFeedback({
      category: 'GENERAL_FEEDBACK',
      subject: 'Spam Subject Here',
      description: 'Buy cheap watches online now',
      honeypot: 'http://spambot.evil.com',
    });
    assert.strictEqual(res.success, false);
    assert.match(res.error, /Spam submission rejected/i);
  });

  // Test 6: Rate Limiting
  await itAsync('Enforces rate limiting cooldown between consecutive submissions', async () => {
    localStorage.clear();
    const res1 = await FeedbackService.submitFeedback({
      category: 'GENERAL_FEEDBACK',
      subject: 'Valid Feedback One',
      description: 'Detailed description for valid feedback one',
    });
    assert.strictEqual(res1.success, true);

    const res2 = await FeedbackService.submitFeedback({
      category: 'GENERAL_FEEDBACK',
      subject: 'Rapid Fire Submission Two',
      description: 'Another detailed description submitted too fast',
    });
    assert.strictEqual(res2.success, false);
    assert.match(res2.error, /অতিরিক্ত দ্রুত সাবমিশন/);
  });

  // Reset rate limit key for subsequent tests
  storage['bsb_feedback_last_submit_v1'] = '0';

  // Test 7: Bible Text Concern Safeguard
  await itAsync('Bible Text Concerns automatically receive BIBLE_DATA_REVIEW_REQUIRED and HIGH priority', async () => {
    storage['bsb_feedback_last_submit_v1'] = '0';
    const res = await FeedbackService.submitFeedback({
      category: 'BIBLE_TEXT_CONCERN',
      subject: 'রোমীয় ৮:২৮ পদের পাঠ পর্যালোচনা',
      description: 'রোমীয় ৮ অধ্যায়ের ২৮ পদে ঈশ্বরের প্রেমীদের সমস্ত বিষয় মঙ্গলের জন্য একসাথে কাজ করে বিষয়ে অনুবাদ স্পষ্টকরণ।',
      bibleContext: {
        translationId: 'irv-ben',
        bookId: 'ROM',
        bookNameBn: 'রোমীয়',
        chapter: 8,
        verse: 28,
        displayedText: 'আর আমরা জানি, যারা ঈশ্বরকে প্রেম করে তাদের পক্ষে সব কিছুই মঙ্গলের জন্য একসাথে ঘটছে...',
      },
    });

    assert.strictEqual(res.success, true);
    assert(res.feedback);
    assert.strictEqual(res.feedback.status, 'BIBLE_DATA_REVIEW_REQUIRED');
    assert.strictEqual(res.feedback.priority, 'HIGH');
    assert.strictEqual(res.feedback.consentForTestimonial, false); // Default false
  });

  // Test 8: Duplicate Detection
  await itAsync('Detects duplicate reports on the same Bible passage within 14 days', async () => {
    storage['bsb_feedback_last_submit_v1'] = '0';
    const all = FeedbackService.getAllFeedback();
    const dup = FeedbackService.detectDuplicate(all, {
      category: 'BIBLE_TEXT_CONCERN',
      subject: 'রোমীয় ৮:২৮ পুনরাবৃত্তি',
      description: 'অন্য একজন একই পদের অনুবাদ নিয়ে লিখলেন',
      bibleContext: {
        translationId: 'irv-ben',
        bookId: 'ROM',
        bookNameBn: 'রোমীয়',
        chapter: 8,
        verse: 28,
      },
    });

    assert(dup !== undefined);
    assert.strictEqual(dup.bibleContext?.bookId, 'ROM');
  });

  // Test 9: Email Template & Notification Pipeline
  it('Formats category-tailored email notification with theological caution for Scripture', () => {
    const mockItem = {
      id: 'test-1',
      referenceNumber: 'BSB-FB-2026-99999',
      category: 'BIBLE_TEXT_CONCERN',
      subcategory: 'পাঠে সমস্যা',
      subject: 'মথি ১:১ পদ যাচাই',
      description: 'যীশু খ্রীষ্টের বংশাবলী স্পষ্ট করা প্রয়োজন।',
      priority: 'HIGH',
      status: 'BIBLE_DATA_REVIEW_REQUIRED',
      bibleContext: {
        translationId: 'irv-ben',
        bookId: 'MAT',
        bookNameBn: 'মথি',
        chapter: 1,
        verse: 1,
      },
      createdAt: new Date().toISOString(),
    };

    const subject = EmailNotificationService.formatEmailSubject(mockItem);
    assert.match(subject, /\[Bengali Study Bible\] IMPORTANT — Bible Text Concern/);
    assert.match(subject, /BSB-FB-2026-99999/);

    const htmlBody = EmailNotificationService.buildHtmlEmailBody(mockItem);
    const textBody = EmailNotificationService.buildPlainTextEmailBody(mockItem);
    assert(htmlBody.includes('বাইবেল সংশোধন নির্দেশিকা (Theological Caution)'));
    assert(htmlBody.includes('Do not modify Scripture until the report has been verified'));
    assert(htmlBody.includes('ayanghosh75@gmail.com'));
    assert(textBody.includes('BSB-FB-2026-99999'));
    assert(textBody.includes('ayanghosh75@gmail.com'));
  });

  // Test 10: User Device History
  it('Tracks feedback items in user private device history', () => {
    const history = FeedbackService.getUserFeedbackHistory();
    assert(Array.isArray(history));
    assert(history.length >= 1);
  });

  // Test 11: Admin Filter & Status Transitions
  it('Filters feedback items accurately across status, category, and search terms', () => {
    const filtered = FeedbackService.filterFeedback({
      status: 'BIBLE_DATA_REVIEW_REQUIRED',
    });
    assert(filtered.length >= 1);
    filtered.forEach((item) => {
      assert.strictEqual(item.status, 'BIBLE_DATA_REVIEW_REQUIRED');
    });

    const searchFiltered = FeedbackService.filterFeedback({
      searchTerm: 'মথি',
    });
    assert(searchFiltered.length >= 1);
  });

  it('Allows Admin to update status, priority, resolution, and internal notes', () => {
    const all = FeedbackService.getAllFeedback();
    const target = all[0];

    const updated = FeedbackService.updateFeedbackStatus(
      target.id,
      'RESOLVED',
      'LOW',
      'পাণ্ডুলিপি ও সংস্করণ মিলিয়ে দেখা হয়েছে, কোনো পরিবর্তন প্রয়োজন নেই।',
      'আপনার আগ্রহ ও সতর্ক দৃষ্টির জন্য ধন্যবাদ। পদটির অনুবাদ মূল গ্রিক সংগতির সাথে সঠিক আছে।',
      'সম্পাদনা সভায় পুঙ্খানুপুঙ্খ যাচাই সম্পন্ন।'
    );

    assert(updated);
    assert.strictEqual(updated.status, 'RESOLVED');
    assert.strictEqual(updated.priority, 'LOW');
    assert.strictEqual(updated.resolutionSummary, 'পাণ্ডুলিপি ও সংস্করণ মিলিয়ে দেখা হয়েছে, কোনো পরিবর্তন প্রয়োজন নেই।');
    assert(updated.internalNotes.length >= 1);
    assert.strictEqual(updated.internalNotes[updated.internalNotes.length - 1].author, 'Rev. Ayan Kumar Ghosh');
  });

  // Test 12: Analytics Summary
  it('Calculates comprehensive product research and analytics summary', () => {
    const summary = FeedbackService.getAnalyticsSummary();
    assert(summary.totalCount >= 5);
    assert(summary.resolvedCount >= 1);
    assert(Array.isArray(summary.topReportedProblems));
    assert(Array.isArray(summary.whatUsersNeed));
    assert(Array.isArray(summary.ministryResearchBreakdown));
  });

  // Test 13: Export Utilities
  it('Exports entire feedback database to clean JSON and CSV', () => {
    const jsonStr = FeedbackService.exportFeedbackJson();
    assert(jsonStr.length > 50);
    const parsed = JSON.parse(jsonStr);
    assert(Array.isArray(parsed));

    const csvStr = FeedbackService.exportFeedbackCsv();
    assert(csvStr.includes('Reference Number'));
    assert(csvStr.includes('BSB-FB-2026-'));
  });

  console.log('\n============================================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((e) => {
  console.error('Fatal test suite error:', e);
  process.exit(1);
});
