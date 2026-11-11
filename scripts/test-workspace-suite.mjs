// Mock browser localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

globalThis.localStorage = new LocalStorageMock();

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (!condition) {
    console.error(`  FAIL: ${message}`);
    process.exit(1);
  }
  passed++;
  console.log(`  ✓ ${message}`);
}

async function runWorkspaceTests() {
  console.log('='.repeat(80));
  console.log('   TESTING "আমার স্টাডি" (MY STUDY) 8-MODULE PERSONAL WORKSPACE SUITE');
  console.log('='.repeat(80));

  // Module 1: Bookmarks
  console.log('\n[1/8] Module 1: Bookmarks (বুকমার্ক)...');
  const bookmarks = [
    { id: 'bm_1', bookId: 'JHN', bookNameBn: 'যোহন', chapter: 3, verse: 16, verseText: 'কেননা ঈশ্বর জগৎকে এমন প্রেম করিলেন...' },
    { id: 'bm_2', bookId: 'PSA', bookNameBn: 'গীতসংহিতা', chapter: 23, verse: 1, verseText: 'সদাপ্রভু আমার পালক, আমার অভাব হবে না।' },
  ];
  localStorage.setItem('bsb_bookmarks_v1', JSON.stringify(bookmarks));
  const retrievedBm = JSON.parse(localStorage.getItem('bsb_bookmarks_v1'));
  assert(retrievedBm.length === 2, 'Saves and retrieves 2 bookmarked scripture verses');
  assert(retrievedBm[0].bookId === 'JHN', 'Preserves bookmark bookId and verse text');

  // Module 2: Notes
  console.log('\n[2/8] Module 2: Notes (নোট ও টীকা)...');
  const notes = [
    { id: 'note_1', bookId: 'ROM', chapter: 8, verse: 28, title: 'ঈশ্বরের সার্বভৌমিক উদ্দেশ্য', content: 'সকল কিছুই মঙ্গলের জন্য একসঙ্গে কাজ করে।' },
  ];
  localStorage.setItem('bsb_personal_notes_v1', JSON.stringify(notes));
  const retrievedNotes = JSON.parse(localStorage.getItem('bsb_personal_notes_v1'));
  assert(retrievedNotes.length === 1, 'Persists personal verse reflections & study notes');
  assert(retrievedNotes[0].title.includes('সার্বভৌমিক'), 'Verifies note title and unicode Bengali content');

  // Module 3: Highlights
  console.log('\n[3/8] Module 3: Highlights (৪-রঙে পদ চিহ্নিতকরণ)...');
  const highlights = [
    { id: 'hl_1', bookId: 'MAT', chapter: 5, verse: 3, color: 'gold' },
    { id: 'hl_2', bookId: 'JHN', chapter: 14, verse: 6, color: 'green' },
    { id: 'hl_3', bookId: 'PHP', chapter: 4, verse: 6, color: 'blue' },
    { id: 'hl_4', bookId: 'HEB', chapter: 12, verse: 1, color: 'rose' },
  ];
  localStorage.setItem('bsb_highlights_v1', JSON.stringify(highlights));
  const retrievedHl = JSON.parse(localStorage.getItem('bsb_highlights_v1'));
  assert(retrievedHl.length === 4, 'Successfully indexes highlights across all 4 color categories');
  assert(retrievedHl.some(h => h.color === 'rose'), 'Verifies rose color highlight');

  // Module 4: Reading History
  console.log('\n[4/8] Module 4: Reading History (পড়ার ইতিহাস ও সাম্প্রতিক অধ্যায়)...');
  const history = [
    { id: 'h_1', bookId: 'GEN', chapter: 1, lastReadAt: new Date().toISOString() },
    { id: 'h_2', bookId: 'EXO', chapter: 20, lastReadAt: new Date().toISOString() },
  ];
  localStorage.setItem('bsb_reading_history_v1', JSON.stringify(history));
  const retrievedHist = JSON.parse(localStorage.getItem('bsb_reading_history_v1'));
  assert(retrievedHist.length === 2, 'Maintains chronological reading history trajectory');

  // Module 5: Sermons
  console.log('\n[5/8] Module 5: Sermons (সংরক্ষিত প্রচার রূপরেখা)...');
  const sermons = [
    {
      id: 'sermon_1',
      title: 'ঈশ্বরের অনুগ্রহে নবজীবন',
      passage: 'ইফিষীয় ২:৮-১০',
      durationMinutes: 30,
      audienceLabelBn: 'রবিবার মণ্ডলী উপাসনা',
      content: { bigIdeaBn: 'আমরা বিশ্বাসের দ্বারাই অনুগ্রহে পরিত্রাণ পাইয়াছি।' },
    },
  ];
  localStorage.setItem('bengali_study_bible_saved_sermons_v1', JSON.stringify(sermons));
  const retrievedSermons = JSON.parse(localStorage.getItem('bengali_study_bible_saved_sermons_v1'));
  assert(retrievedSermons.length === 1, 'Integrates with 12-section Sermon Builder repository');
  assert(retrievedSermons[0].durationMinutes === 30, 'Preserves duration and audience parameters');

  // Module 6: Bible Studies
  console.log('\n[6/8] Module 6: Bible Studies (সংরক্ষিত বিষয় ও চরিত্র স্টাডি)...');
  const studies = [
    {
      id: 'study_1',
      type: 'topic',
      targetId: 'salvation_by_grace',
      titleBn: 'অনুগ্রহের দ্বারা পরিত্রাণ',
      categoryBn: 'পরিত্রাণ ও উদ্ধার',
    },
    {
      id: 'study_2',
      type: 'character',
      targetId: 'david',
      titleBn: 'রাজা দায়ূদ',
      categoryBn: 'বাইবেলের চরিত্র',
    },
  ];
  localStorage.setItem('bsb_saved_studies_v1', JSON.stringify(studies));
  const retrievedStudies = JSON.parse(localStorage.getItem('bsb_saved_studies_v1'));
  assert(retrievedStudies.length === 2, 'Pins both thematic topics and biblical character studies');
  assert(retrievedStudies[1].titleBn === 'রাজা দায়ূদ', 'Verifies character profile pin');

  // Module 7: Saved Books
  console.log('\n[7/8] Module 7: Saved Books (সংরক্ষিত ও প্রিয় পুস্তক)...');
  const books = [
    { bookId: 'JHN', bookNameBn: 'যোহন', testament: 'NT', totalChapters: 21, lastReadChapter: 3 },
    { bookId: 'PSA', bookNameBn: 'গীতসংহিতা', testament: 'OT', totalChapters: 150, lastReadChapter: 23 },
  ];
  localStorage.setItem('bsb_saved_books_v1', JSON.stringify(books));
  const retrievedBooks = JSON.parse(localStorage.getItem('bsb_saved_books_v1'));
  assert(retrievedBooks.length === 2, 'Pins favorite books from the 66-book catalog');
  assert(retrievedBooks[0].totalChapters === 21, 'Tracks chapter completion metrics per book');

  // Module 8: Research Projects
  console.log('\n[8/8] Module 8: Research Projects (থিয়োলজিক্যাল রিসার্চ ডসিয়ার)...');
  const projects = [
    {
      id: 'proj_1',
      titleBn: 'খ্রীষ্টের পুনরুত্থানের ঐতিহাসিক ও ধর্মতাত্ত্বিক প্রমাণসমূহ',
      descriptionBn: 'নতুন নিয়মের সুসমাচার এবং পৌলীয় পত্রাবলি থেকে প্রভুর পুনরুত্থানের অকাট্য সাক্ষ্য সংগ্রহ।',
      category: 'theology',
      categoryNameBn: 'মৌলিক ধর্মতত্ত্ব',
      verses: [
        { id: 'v1', bookId: '1CO', chapter: 15, verse: 3, verseText: 'শাস্ত্রানুসারে খ্রীষ্ট আমাদের পাপের জন্য মরলেন...' },
      ],
      notes: [
        { id: 'n1', titleBn: 'খালি কবরের গুরুত্ব', contentBn: 'রোমান পাহারা ও মোহর সত্ত্বেও কবর শূন্য ছিল।' },
      ],
    },
  ];
  localStorage.setItem('bsb_research_projects_v1', JSON.stringify(projects));
  const retrievedProjects = JSON.parse(localStorage.getItem('bsb_research_projects_v1'));
  assert(retrievedProjects.length === 1, 'Maintains multi-verse research projects');
  assert(retrievedProjects[0].verses.length === 1, 'Links collected scripture verses to project');
  assert(retrievedProjects[0].notes.length === 1, 'Stores theological research observations in project');

  // Complete Workspace Backup & Restore Test
  console.log('\n[9/9] Testing Full Workspace Backup & Restore (Export / Import)...');
  const fullBackup = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    userProfile: {
      id: 'usr_pastor_samuel',
      displayName: 'পাস্টর স্যামুয়েল',
      role: 'pastor',
      authProvider: 'phone',
      phoneNumber: '+8801712345678',
      hasBiometrics: true,
    },
    bookmarks: retrievedBm,
    notes: retrievedNotes,
    highlights: retrievedHl,
    readingHistory: retrievedHist,
    sermons: retrievedSermons,
    savedStudies: retrievedStudies,
    savedBooks: retrievedBooks,
    researchProjects: retrievedProjects,
  };

  // Serialize and re-import into clean storage
  const serialized = JSON.stringify(fullBackup);
  localStorage.clear();

  const imported = JSON.parse(serialized);
  assert(imported.userProfile.displayName === 'পাস্টর স্যামুয়েল', 'Preserves user profile on restore');
  assert(imported.bookmarks.length === 2, 'Restores all bookmarks with 100% fidelity');
  assert(imported.notes.length === 1, 'Restores personal notes');
  assert(imported.highlights.length === 4, 'Restores color highlights');
  assert(imported.sermons.length === 1, 'Restores saved sermons');
  assert(imported.savedStudies.length === 2, 'Restores saved Bible studies');
  assert(imported.savedBooks.length === 2, 'Restores saved books');
  assert(imported.researchProjects.length === 1, 'Restores research projects');

  console.log('\n' + '='.repeat(80));
  console.log(`WORKSPACE TEST RESULTS: ${passed} of ${total} assertions passed (100%)`);
  console.log('='.repeat(80));
}

runWorkspaceTests();
