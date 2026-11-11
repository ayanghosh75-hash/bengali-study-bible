// Authoritative Biblical Hebrew & Greek Lexicon (Strong's Concordance & Word Study)
import { OriginalWordStudy } from '../types/researchEngine';

export const BIBLICAL_LEXICON_DB: OriginalWordStudy[] = [
  // --- SALVATION (HEBREW) ---
  {
    strongNumber: 'H3444',
    language: 'Hebrew',
    originalLemma: 'יְשׁוּעָה',
    transliteration: 'yeshuʿah',
    pronunciationBn: 'ইয়েশূয়া (Yeshu-ah)',
    partOfSpeechBn: 'স্ত্রীলিঙ্গ বিশেষ্য (Feminine Noun)',
    rootWord: 'יָשַׁע (H3467 - yasha)',
    rootMeaningBn: 'প্রশস্ত করা, মুক্ত করা, সংকট থেকে উদ্ধার করা',
    meaningBn: 'পরিত্রাণ, উদ্ধার, মুক্তি, নিস্তার, বিজয় এবং ঈশ্বরের সার্বভৌম হস্তক্ষেপে আত্মিক ও দৈহিক মুক্তি।',
    semanticRange: [
      'বিপদ ও শত্রুহস্ত হইতে বাস্তবিক মুক্তি ও নিস্তার',
      'পাপ ও বিচার হইতে ঈশ্বরের করুণাপূর্ণ আত্মিক পরিত্রাণ',
      'মশীহের আগমন ও শাশ্বত শান্তির শুভবার্তা',
      'জাতীয় সংকটকালে সদাপ্রভুর সার্বভৌম বিজয়',
    ],
    usageCount: {
      total: 78,
      oldTestament: 78,
    },
    firstOccurrence: {
      referenceBn: 'আদিপুস্তক ৪৯:১৮',
      textBn: 'হে সদাপ্রভু, আমি তোমার পরিত্রাণের অপেক্ষা করিয়াছি।',
    },
    wordFamily: [
      { term: 'יָשַׁע (yasha)', meaningBn: 'উদ্ধার করা / রক্ষা করা', strongNumber: 'H3467' },
      { term: 'יֵשׁוּעַ (Yeshua)', meaningBn: 'যীশু / সদাপ্রভুই পরিত্রাণ', strongNumber: 'H3442' },
      { term: 'תְּשׁוּעָה (teshuah)', meaningBn: 'নিস্তার / চিরস্থায়ী বিজয়', strongNumber: 'H8668' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'যাত্রাপুস্তক ১৪:১৩',
        bookId: 'EXO',
        chapter: 14,
        verse: 13,
        snippetBn: 'তোমরা স্থির হইয়া সদাপ্রভুর কৃত পরিত্রাণ দেখ, যাহা তিনি অদ্য তোমাদের জন্য সাধন করিবেন।',
      },
      {
        referenceBn: 'গীতসংহিতা ২৭:১',
        bookId: 'PSA',
        chapter: 27,
        verse: 1,
        snippetBn: 'সদাপ্রভু আমার দীপ্তি ও আমার পরিত্রাণ; আমি কাহাকে ভয় করিব?',
      },
      {
        referenceBn: 'যিশাইয় ১২:২',
        bookId: 'ISA',
        chapter: 12,
        verse: 2,
        snippetBn: 'দেখ, ঈশ্বরই আমার পরিত্রাণ; আমি নির্ভর করিব, ভীত হইব না।',
      },
    ],
  },
  {
    strongNumber: 'H3467',
    language: 'Hebrew',
    originalLemma: 'יָשַׁע',
    transliteration: 'yashaʿ',
    pronunciationBn: 'ইয়াশা (Yasha)',
    partOfSpeechBn: 'ধাতু / ক্রিয়া (Verb)',
    rootWord: 'יָשַׁע',
    rootMeaningBn: 'বিপদমুক্ত উন্মুক্ত স্থানে আনা, রক্ষা করা',
    meaningBn: 'রক্ষা করা, সাহায্য করা, বন্দীত্ব বা দমন থেকে বিজয়ী করা।',
    semanticRange: [
      'সংকটময় পরিস্থিতি থেকে রক্ষা করা',
      'যুদ্ধক্ষেত্রে ঐশ্বরিক বিজয় এনে দেওয়া',
      'অন্যায় থেকে দুর্বলকে বিচারিকভাবে রক্ষা করা',
    ],
    usageCount: {
      total: 205,
      oldTestament: 205,
    },
    firstOccurrence: {
      referenceBn: 'যাত্রাপুস্তক ২:১৭',
      textBn: 'কিন্তু মোশি উঠিয়া তাহাদিগকে রক্ষা করিলেন ও তাহাদের পশুপালকে জল পান করাইলেন।',
    },
    wordFamily: [
      { term: 'מוֹשִׁיעַ (moshia)', meaningBn: 'ত্রাণকর্তা / উদ্ধারকারী', strongNumber: 'H3467' },
      { term: 'יְשׁוּעָה (yeshuah)', meaningBn: 'পরিত্রাণ', strongNumber: 'H3444' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'গীতসংহিতা ২০:৬',
        bookId: 'PSA',
        chapter: 20,
        verse: 6,
        snippetBn: 'এখন আমি জানিলাম, সদাপ্রভু স্বকীয় অভিষিক্ত ব্যক্তিকে রক্ষা করেন।',
      },
    ],
  },
  {
    strongNumber: 'H1350',
    language: 'Hebrew',
    originalLemma: 'גָּאַל',
    transliteration: 'gaʾal',
    pronunciationBn: 'গাআল (Ga-al)',
    partOfSpeechBn: 'ক্রিয়া (Verb) / গোয়েল (Goel)',
    rootWord: 'גָּאַל',
    rootMeaningBn: 'মূল্য পরিশোধ করিয়া রক্তসম্পর্কীয় আত্মীয়কে খালাস করা',
    meaningBn: 'মুক্ত করা, পুনরুদ্ধার করা, রক্তসম্পর্কীয় নিস্তারকারী (Kinsman Redeemer) হিসেবে ঋণ বা দাসত্ব থেকে ক্রয় করা।',
    semanticRange: [
      'দাসত্ব বা দারিদ্র্য থেকে ক্রয়মূল্য দিয়ে মুক্ত করা',
      'পরিবারের উত্তরাধিকার রক্ষা করা',
      'ঈশ্বরের পক্ষ থেকে ইস্রায়েলকে মিসরের দাসত্ব থেকে উদ্ধার',
    ],
    usageCount: {
      total: 104,
      oldTestament: 104,
    },
    firstOccurrence: {
      referenceBn: 'আদিপুস্তক ৪৮:১৬',
      textBn: 'যে দূত সমস্ত অমঙ্গল হইতে আমাকে নিস্তার করিয়াছেন, তিনি এই বালকদিগকে আশীর্বাদ করুন।',
    },
    wordFamily: [
      { term: 'גֹּאֵל (goel)', meaningBn: 'আত্মীয় নিস্তারকারী (বোয়সের মতো)', strongNumber: 'H1350' },
      { term: 'גְּאֻלָּה (geullah)', meaningBn: 'মুক্তির অধিকার', strongNumber: 'H1353' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'ইয়োব ১৯:২৫',
        bookId: 'JOB',
        chapter: 19,
        verse: 25,
        snippetBn: 'কিন্তু আমি জানি, আমার মুক্তিদাতা জীবন্ত, এবং অবশেষে তিনি ভূমির উপরে দাঁড়াইবেন।',
      },
    ],
  },

  // --- SALVATION (GREEK) ---
  {
    strongNumber: 'G4991',
    language: 'Greek',
    originalLemma: 'σωτηρία',
    transliteration: 'sōtēria',
    pronunciationBn: 'সোতেরিয়া (So-tay-ree-ah)',
    partOfSpeechBn: 'স্ত্রীলিঙ্গ বিশেষ্য (Feminine Noun)',
    rootWord: 'σῴζω (G4982 - sōzō)',
    rootMeaningBn: 'নিরাপদ রাখা, ক্ষতি হতে রক্ষা করা, সুস্থ করা',
    meaningBn: 'পরিত্রাণ, অনন্ত উদ্ধার, পাপের শাস্তি ও ক্ষমতা হইতে নিস্তার এবং খ্রীষ্টে চিরন্তন জীবনের পূর্ণতা।',
    semanticRange: [
      'পাপের অপরাধবোধ ও বিচার হইতে আইনি মুক্তি (Justification)',
      'পাপের দাসত্ব ও স্বভাব হইতে আত্মিক মুক্তি (Sanctification)',
      'পাপের উপস্থিতি হইতে ভবিষ্যতে মহিমান্বিত মুক্তি (Glorification)',
      'রোগ ও পার্থিব ধ্বংস হইতে পূর্ণ নিরাময় ও নিরাপত্তা',
    ],
    usageCount: {
      total: 46,
      newTestament: 46,
    },
    firstOccurrence: {
      referenceBn: 'লূক ১:৬৯',
      textBn: 'এবং আপনার দাস দায়ূদের বংশে আমাদের জন্য পরিত্রাণের এক শৃঙ্গ উৎপন্ন করিয়াছেন।',
    },
    wordFamily: [
      { term: 'σῴζω (sōzō)', meaningBn: 'রক্ষা করা / উদ্ধার করা / সুস্থ করা', strongNumber: 'G4982' },
      { term: 'σωτήρ (sōtēr)', meaningBn: 'পরিত্রাতা / ত্রাণকর্তা (যীশু)', strongNumber: 'G4990' },
      { term: 'σωτήριος (sōtērios)', meaningBn: 'পরিত্রাণদায়ক অনুগ্রহ', strongNumber: 'G4992' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'প্রেরিত ৪:১২',
        bookId: 'ACT',
        chapter: 4,
        verse: 12,
        snippetBn: 'আর অন্য কাহারো দ্বারা পরিত্রাণ নাই; কেননা আকাশের নীচে মনুষ্যদের মধ্যে প্রদত্ত এমন আর কোনো নাম নাই, যাহার দ্বারা আমাদিগকে পরিত্রাণ পাইতে হইবে।',
      },
      {
        referenceBn: 'রোমীয় ১:১৬',
        bookId: 'ROM',
        chapter: 1,
        verse: 16,
        snippetBn: 'কারণ সুসমাচার প্রত্যেক বিশ্বাসীর পরিত্রাণের নিমিত্ত ঈশ্বরের মহাশক্তি।',
      },
      {
        referenceBn: 'ইফিষীয় ২:৮',
        bookId: 'EPH',
        chapter: 2,
        verse: 8,
        snippetBn: 'কেননা অনুগ্রহেই বিশ্বাস দ্বারা তোমরা পরিত্রাণ পাইয়াছ; এবং ইহা তোমাদের হইতে হয় নাই, ঈশ্বরেরই দান।',
      },
    ],
  },
  {
    strongNumber: 'G4982',
    language: 'Greek',
    originalLemma: 'σῴζω',
    transliteration: 'sōzō',
    pronunciationBn: 'সোজো (Sode-zo)',
    partOfSpeechBn: 'ক্রিয়া (Verb)',
    rootWord: 'σῶς (sōs - অক্ষত, সুস্থ)',
    rootMeaningBn: 'বিপদ হতে রক্ষা করা, সুস্থ বা অক্ষত করা',
    meaningBn: 'রক্ষা করা, উদ্ধার করা, পাপ হতে পরিত্রাণ দেওয়া, সুস্থ বা পূর্ণাঙ্গ করা।',
    semanticRange: [
      'অনন্ত ধ্বংস থেকে আত্মিক পরিত্রাণ প্রদান করা',
      'মারাত্মক অসুস্থতা থেকে সুস্থ করা ও প্রাণ বাঁচানো',
      'প্রাকৃতিক দুর্যোগ (যেমন ঝড়ে নিমজ্জন) থেকে উদ্ধার করা',
    ],
    usageCount: {
      total: 106,
      newTestament: 106,
    },
    firstOccurrence: {
      referenceBn: 'মথি ১:২১',
      textBn: 'তিনি স্বীয় প্রজাদিগকে তাহাদের পাপ হইতে পরিত্রাণ করিবেন।',
    },
    wordFamily: [
      { term: 'σωτηρία (sōtēria)', meaningBn: 'পরিত্রাণ', strongNumber: 'G4991' },
      { term: 'σωτήρ (sōtēr)', meaningBn: 'পরিত্রাতা', strongNumber: 'G4990' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'লূক ১৯:১০',
        bookId: 'LUK',
        chapter: 19,
        verse: 10,
        snippetBn: 'কেননা যাহা হারাইয়া গিয়াছিল, তাহারই অন্বেষণ ও পরিত্রাণ করিতে মনুষ্যপুত্র আসিয়াছেন।',
      },
      {
        referenceBn: 'রোমীয় ১০:৯',
        bookId: 'ROM',
        chapter: 10,
        verse: 9,
        snippetBn: 'যদি তুমি মুখে যীশুকে প্রভু বলিয়া স্বীকার কর এবং হৃদয়ে বিশ্বাস কর... তবে পরিত্রাণ পাইবে।',
      },
    ],
  },
  {
    strongNumber: 'G4990',
    language: 'Greek',
    originalLemma: 'σωτήρ',
    transliteration: 'sōtēr',
    pronunciationBn: 'সোতের (So-tare)',
    partOfSpeechBn: 'পুংলিঙ্গ বিশেষ্য (Masculine Noun)',
    rootWord: 'σῴζω (G4982)',
    rootMeaningBn: 'রক্ষা বা উদ্ধারকারী',
    meaningBn: 'পরিত্রাতা, উদ্ধারকর্তা, রক্ষাকর্তা; নতুন নিয়মে যীশু খ্রীষ্ট এবং পিতার জন্য ব্যবহৃত প্রধান রাজকীয় উপাধি।',
    semanticRange: [
      'জগতের পাপভার বহনকারী ত্রাণকর্তা যীশু খ্রীষ্ট',
      'পরিত্রাণের পরিকল্পনা প্রণয়নকারী সার্বভৌম ঈশ্বর পিতা',
    ],
    usageCount: {
      total: 24,
      newTestament: 24,
    },
    firstOccurrence: {
      referenceBn: 'লূক ১:৪৭',
      textBn: 'এবং আমার আত্মা আমার ত্রাণকর্তা ঈশ্বরে উল্লাসিত হইয়াছে।',
    },
    wordFamily: [
      { term: 'σωτηρία (sōtēria)', meaningBn: 'পরিত্রাণ', strongNumber: 'G4991' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'লূক ২:১১',
        bookId: 'LUK',
        chapter: 2,
        verse: 11,
        snippetBn: 'দায়ূদের নগরে তোমাদের জন্য এক ত্রাণকর্তা জন্মিয়াছেন; তিনি খ্রীষ্ট প্রভু।',
      },
      {
        referenceBn: 'তিতাস ২:১৩',
        bookId: 'TIT',
        chapter: 2,
        verse: 13,
        snippetBn: 'আমাদের মহান ঈশ্বর ও ত্রাণকর্তা যীশু খ্রীষ্টের মহিমার প্রকাশ।',
      },
    ],
  },

  // --- GRACE (HEBREW & GREEK) ---
  {
    strongNumber: 'H2580',
    language: 'Hebrew',
    originalLemma: 'חֵן',
    transliteration: 'chên',
    pronunciationBn: 'খেন (Khane)',
    partOfSpeechBn: 'পুংলিঙ্গ বিশেষ্য (Noun)',
    rootWord: 'חָנַן (H2603 - chanan)',
    rootMeaningBn: 'নম্র হয়ে দয়া প্রদর্শন করা, অনুগ্রহ করা',
    meaningBn: 'অনুগ্রহ, কৃপা, সুপ্রসন্নতা, অপ্রাপ্য দয়া যা উচ্চতর ব্যক্তি নিম্নতরকে প্রদান করে।',
    semanticRange: [
      'ঈশ্বরের অহেতুক দয়া ও করুণা',
      'মানুষের চোখে প্রিয় বা গ্রহণযোগ্য হওয়া',
      'মনোমুগ্ধকর চরিত্র বা সৌন্দর্য',
    ],
    usageCount: {
      total: 69,
      oldTestament: 69,
    },
    firstOccurrence: {
      referenceBn: 'আদিপুস্তক ৬:৮',
      textBn: 'কিন্তু নোহ সদাপ্রভুর দৃষ্টিতে অনুগ্রহ প্রাপ্ত হইলেন।',
    },
    wordFamily: [
      { term: 'חָנַן (chanan)', meaningBn: 'কৃপা করা', strongNumber: 'H2603' },
      { term: 'חַנּוּן (channun)', meaningBn: 'কৃপাময়', strongNumber: 'H2587' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'যাত্রাপুস্তক ৩৩:১৭',
        bookId: 'EXO',
        chapter: 33,
        verse: 17,
        snippetBn: 'সদাপ্রভু মোশিকে কহিলেন, তুমি আমার দৃষ্টিতে অনুগ্রহ পাইয়াছ।',
      },
    ],
  },
  {
    strongNumber: 'G5485',
    language: 'Greek',
    originalLemma: 'χάρις',
    transliteration: 'charis',
    pronunciationBn: 'খারিস (Khar-ece)',
    partOfSpeechBn: 'স্ত্রীলিঙ্গ বিশেষ্য (Noun)',
    rootWord: 'χαίρω (G5463 - আনন্দ করা)',
    rootMeaningBn: 'আনন্দের উৎস, অযোগ্যকে প্রদত্ত উপহার',
    meaningBn: 'অনুগ্রহ, অপ্রাপ্য প্রেম, বিনামূল্যের ঐশ্বরিক দান যা মানুষকে ক্ষমা, সামর্থ্য ও পরিত্রাণ দান করে।',
    semanticRange: [
      'পাপী মানুষের প্রতি ঈশ্বরের নিঃশর্ত ও অপ্রাপ্য করুণা',
      'খ্রীষ্টিয়ান জীবনে পবিত্র চলার জন্য পবিত্র আত্মার প্রদত্ত দৈব শক্তি',
      'উপহার গ্রহণের প্রতিক্রিয়া হিসেবে কৃতজ্ঞতা ও ধন্যবাদ',
    ],
    usageCount: {
      total: 155,
      newTestament: 155,
    },
    firstOccurrence: {
      referenceBn: 'লূক ১:৩০',
      textBn: 'দূত তাঁহাকে কহিলেন, মরিয়ম, ভয় করিও না, কেননা তুমি ঈশ্বরের নিকটে অনুগ্রহ পাইয়াছ।',
    },
    wordFamily: [
      { term: 'χάρισμα (charisma)', meaningBn: 'অনুগ্রহের বর / আত্মিক বর', strongNumber: 'G5486' },
      { term: 'χαρίζομαι (charizomai)', meaningBn: 'বিনামূল্যে ক্ষমা করা / দান করা', strongNumber: 'G5483' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'যোহন ১:১৪',
        bookId: 'JHN',
        chapter: 1,
        verse: 14,
        snippetBn: 'আর সেই বাক্য রক্তমাংস হইলেন, এবং অনুগ্রহ ও সত্যে পূর্ণ হইয়া আমাদের মধ্যে বাস করিলেন।',
      },
      {
        referenceBn: 'ইফিষীয় ২:৮',
        bookId: 'EPH',
        chapter: 2,
        verse: 8,
        snippetBn: 'কেননা অনুগ্রহেই বিশ্বাস দ্বারা তোমরা পরিত্রাণ পাইয়াছ।',
      },
      {
        referenceBn: '২ করিন্থীয় ১২:৯',
        bookId: '2CO',
        chapter: 12,
        verse: 9,
        snippetBn: 'তিনি আমাকে কহিলেন, আমার অনুগ্রহই তোমার পক্ষে যথেষ্ট।',
      },
    ],
  },

  // --- FAITH (HEBREW & GREEK) ---
  {
    strongNumber: 'H530',
    language: 'Hebrew',
    originalLemma: 'אֱמוּנָה',
    transliteration: 'ʾemunah',
    pronunciationBn: 'এমূনা (Em-oo-naw)',
    partOfSpeechBn: 'স্ত্রীলিঙ্গ বিশেষ্য (Noun)',
    rootWord: 'אָמַן (H539 - আমেন / অটল থাকা)',
    rootMeaningBn: 'দৃঢ় হওয়া, নির্ভরসাধ্য হওয়া, সত্যে প্রতিষ্ঠিত থাকা',
    meaningBn: 'বিশ্বস্ততা, অবিচল আনুগত্য, সত্যনিষ্ঠা, ঈশ্বরের বাক্যে অটল আস্থা।',
    semanticRange: [
      'ঈশ্বরের অপরিবর্তনীয় বিশ্বস্ততা ও অঙ্গীকার রক্ষা',
      'মানুষের পক্ষ থেকে অটল নির্ভরতা ও আনুগত্য',
      'নৈতিক সততা ও অঙ্গীকারে স্থির থাকা',
    ],
    usageCount: {
      total: 49,
      oldTestament: 49,
    },
    firstOccurrence: {
      referenceBn: 'যাত্রাপুস্তক ১৭:১২',
      textBn: 'সূর্যাস্ত পর্যন্ত মোশির হস্ত অবিচল (এমূনা) থাকিল।',
    },
    wordFamily: [
      { term: 'אָמֵן (amen)', meaningBn: 'সত্যই তাই হউক / আমেন', strongNumber: 'H543' },
      { term: 'אֱמֶת (emet)', meaningBn: 'সত্য / বিশ্বস্ততা', strongNumber: 'H571' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'হবক্‌কূক ২:৪',
        bookId: 'HAB',
        chapter: 2,
        verse: 4,
        snippetBn: 'কিন্তু ধার্মিক স্বকীয় বিশ্বাসেই (বিশ্বস্ততায়) জীবিত থাকিবে।',
      },
    ],
  },
  {
    strongNumber: 'G4102',
    language: 'Greek',
    originalLemma: 'πίστις',
    transliteration: 'pistis',
    pronunciationBn: 'পিস্টিস (Pee-stis)',
    partOfSpeechBn: 'স্ত্রীলিঙ্গ বিশেষ্য (Noun)',
    rootWord: 'πείθω (G3982 - সম্মত করা / বিশ্বাস জন্মানো)',
    rootMeaningBn: 'সুনিশ্চিত ধারণা, প্রত্যয়',
    meaningBn: 'বিশ্বাস, গভীর প্রত্যয়, ঈশ্বরের চরিত্র ও যীশু খ্রীষ্টের আত্মত্যাগে সম্পূর্ণ আত্মসমর্পণ ও নির্ভরতা।',
    semanticRange: [
      'যীশু খ্রীষ্টে ব্যক্তিগত আস্থা ও পরিত্রাণের সমর্পণ',
      'অদৃশ্য আত্মিক সত্যের বাস্তব নিশ্চয়তা ও আশার মূলভিত্তি',
      'মণ্ডলীর খ্রীষ্টিয়ান ধর্মীয় শিক্ষা বা বিশ্বাসমালা ("একই বিশ্বাস")',
    ],
    usageCount: {
      total: 243,
      newTestament: 243,
    },
    firstOccurrence: {
      referenceBn: 'মথি ৮:১০',
      textBn: 'আমি ইস্রায়েলের মধ্যেও কাহারো এমন মহৎ বিশ্বাস পাই নাই।',
    },
    wordFamily: [
      { term: 'πιστεύω (pisteuō)', meaningBn: 'বিশ্বাস করা', strongNumber: 'G4100' },
      { term: 'πιστός (pistos)', meaningBn: 'বিশ্বস্ত / বিশ্বাসযোগ্য', strongNumber: 'G4103' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'রোমীয় ১:১৭',
        bookId: 'ROM',
        chapter: 1,
        verse: 17,
        snippetBn: 'কেননা তাহাতে ঈশ্বরের ধার্মিকতা বিশ্বাস হইতেই বিশ্বাসার্থে প্রকাশিত হয়; ধার্মিক বিশ্বাসেই জীবিত থাকিবে।',
      },
      {
        referenceBn: 'ইব্রীয় ১১:১',
        bookId: 'HEB',
        chapter: 11,
        verse: 1,
        snippetBn: 'বিশ্বাস প্রত্যাশিত বিষয়ের নিশ্চয়তা এবং অদৃশ্য বিষয়ের প্রমাণ।',
      },
    ],
  },

  // --- REPENTANCE (GREEK) ---
  {
    strongNumber: 'G3341',
    language: 'Greek',
    originalLemma: 'μετάνοια',
    transliteration: 'metanoia',
    pronunciationBn: 'মেতানোইয়া (Met-an-oy-ah)',
    partOfSpeechBn: 'স্ত্রীলিঙ্গ বিশেষ্য (Noun)',
    rootWord: 'μετανοέω (G3340 - meta = রূপান্তর + nous = মন)',
    rootMeaningBn: 'মনের মৌলিক পরিবর্তন, দৃষ্টিভঙ্গির ১৮০ ডিগ্রি রূপান্তর',
    meaningBn: 'অনুতাপ, মনের রূপান্তর, পাপের পথ পরিহার করে ঈশ্বরের দিকে সম্পূর্ণ ফিরে আসা।',
    semanticRange: [
      'পাপের বিরুদ্ধে অন্তরের গভীর অনুশোচনা',
      'ঈশ্বর ও ধার্মিকতার প্রতি নতুন সিদ্ধান্ত ও জীবনযাপন',
      'খ্রীষ্টের সুসমাচার গ্রহণের জন্য পূর্ববর্তী আত্মতুষ্টি ত্যাগ',
    ],
    usageCount: {
      total: 22,
      newTestament: 22,
    },
    firstOccurrence: {
      referenceBn: 'মথি ৩:৮',
      textBn: 'অতএব তোমরা অনুতাপের যোগ্য ফল উৎপন্ন কর।',
    },
    wordFamily: [
      { term: 'μετανοέω (metanoeō)', meaningBn: 'অনুতাপ করা / মন পরিবর্তন করা', strongNumber: 'G3340' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'লূক ১৫:৭',
        bookId: 'LUK',
        chapter: 15,
        verse: 7,
        snippetBn: 'একজন মনপরিবর্তনকারী পাপীর জন্য স্বর্গে আনন্দ হয়।',
      },
      {
        referenceBn: 'প্রেরিত ২:৩৮',
        bookId: 'ACT',
        chapter: 2,
        verse: 38,
        snippetBn: 'পিতর তাহাদিগকে বলিলেন, তোমরা মন পরিবর্তন কর, এবং পাপমোচনের নিমিত্ত বাপ্তাইজিত হও।',
      },
    ],
  },

  // --- JUSTIFICATION (GREEK) ---
  {
    strongNumber: 'G1343',
    language: 'Greek',
    originalLemma: 'δικαιοσύνη',
    transliteration: 'dikaiosynē',
    pronunciationBn: 'দিকাইয়োসূনে (Dik-ah-yos-oo-nay)',
    partOfSpeechBn: 'স্ত্রীলিঙ্গ বিশেষ্য (Noun)',
    rootWord: 'δίκαιος (G1342 - ন্যায়বান / নির্দোষ)',
    rootMeaningBn: 'আইনসঙ্গতভাবে সঠিক, নিখুঁত মানসম্পন্ন',
    meaningBn: 'ধার্মিকতা, ন্যায়পরায়ণতা, ঈশ্বরের বিচারালয়ে খ্রীষ্টের কারণে নির্দোষ ও ধার্মিক হিসেবে গ্রাহ্য হওয়া।',
    semanticRange: [
      'ঈশ্বরের পবিত্র স্বভাবের নিরপেক্ষ মানদণ্ড',
      'বিশ্বাসের মাধ্যমে বিশ্বাসীর অ্যাকাউন্টে খ্রীষ্টের ধার্মিকতা আরোপ (Imputation)',
      'খ্রীষ্টিয়ানের প্রাত্যহিক ন্যায়নিষ্ঠ চরিত্র ও কর্ম',
    ],
    usageCount: {
      total: 92,
      newTestament: 92,
    },
    firstOccurrence: {
      referenceBn: 'মথি ৩:১৫',
      textBn: 'কেননা এইরূপে সমস্ত ধার্মিকতা পূর্ণ করাই আমাদের উপযুক্ত।',
    },
    wordFamily: [
      { term: 'δικαιόω (dikaioō)', meaningBn: 'ধার্মিক গণ্য করা', strongNumber: 'G1344' },
      { term: 'δικαίωμα (dikaiōma)', meaningBn: 'ন্যায্য বিধান / ধার্মিক কাজ', strongNumber: 'G1345' },
    ],
    keyOccurrences: [
      {
        referenceBn: 'রোমীয় ৩:২১-২২',
        bookId: 'ROM',
        chapter: 3,
        verse: 21,
        snippetBn: 'কিন্তু এখন ব্যবস্থা ছাড়া ঈশ্বরের ধার্মিকতা প্রকাশিত হইয়াছে... যীশু খ্রীষ্টে বিশ্বাসের দ্বারা।',
      },
      {
        referenceBn: '২ করিন্থীয় ৫:২১',
        bookId: '2CO',
        chapter: 5,
        verse: 21,
        snippetBn: 'যাঁহার পাপের সহিত কোনো পরিচয় ছিল না, তাঁহাকে তিনি আমাদের নিমিত্ত পাপ করিলেন, যেন আমরা তাঁহাতে ঈশ্বরের ধার্মিকতা হইতে পারি।',
      },
    ],
  },
];

export function getLexiconByStrongs(strongNumber: string): OriginalWordStudy | undefined {
  return BIBLICAL_LEXICON_DB.find(
    (item) => item.strongNumber.toUpperCase() === strongNumber.toUpperCase()
  );
}

export function searchLexicon(query: string): OriginalWordStudy[] {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return BIBLICAL_LEXICON_DB;

  return BIBLICAL_LEXICON_DB.filter((item) => {
    return (
      item.strongNumber.toLowerCase().includes(cleanQ) ||
      item.transliteration.toLowerCase().includes(cleanQ) ||
      item.originalLemma.includes(cleanQ) ||
      item.pronunciationBn.toLowerCase().includes(cleanQ) ||
      item.meaningBn.toLowerCase().includes(cleanQ) ||
      item.semanticRange.some((s) => s.toLowerCase().includes(cleanQ))
    );
  });
}
