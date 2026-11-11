import {
  SermonAudience,
  SermonAudienceOption,
  SermonContent,
  SermonDurationOption,
  SermonGenerationRequest,
  SermonPoint,
} from '../types/sermon';
import { getBookByName } from '../data/books';
import { CANONICAL_BIBLE_INVENTORY } from '../data/canonicalBibleInventory';
import { BibleService } from './bibleService';
import { fromBengaliDigits, toBengaliDigits } from '../utils/bengaliNumerals';

export const SERMON_AUDIENCE_OPTIONS: SermonAudienceOption[] = [
  {
    id: 'sunday_congregation',
    labelBn: 'রবিবার মণ্ডলীর উপাসনা',
    labelEn: 'Sunday Congregation',
    descriptionBn: 'সকল বয়সী বিশ্বাসীদের সমন্বয়ে গঠিত রবিবাসরীয় সাধারণ উপাসনা সভা।',
    iconName: 'Church',
  },
  {
    id: 'youth',
    labelBn: 'যুবসমাজ ও ছাত্রসমাজ',
    labelEn: 'Youth & Students',
    descriptionBn: 'যৌবনের আত্মিক সংগ্রাম, পরিচয়, নৈতিক মূল্যবোধ ও খ্রীষ্টের আহ্বানে জীবন গঠন।',
    iconName: 'Flame',
  },
  {
    id: 'children',
    labelBn: 'শিশুসমাজ / সানডে স্কুল',
    labelEn: 'Children & Sunday School',
    descriptionBn: 'সহজ গল্প, রূপক ও স্পষ্ট খ্রীষ্টিয় শিক্ষার মাধ্যমে শিশুদের হৃদয় স্পর্শ করা।',
    iconName: 'Smile',
  },
  {
    id: 'small_group',
    labelBn: 'ক্ষুদ্র দল / সেল গ্রুপ',
    labelEn: 'Small Group / Cell',
    descriptionBn: 'আন্তরিক সহভাগিতা, পারস্পরিক প্রশ্ন ও উন্মুক্ত আলাপচারিতার উপযোগী রূপরেখা।',
    iconName: 'Users',
  },
  {
    id: 'pastors',
    labelBn: 'পালক ও খ্রীষ্টিয় নেতৃবৃন্দ',
    labelEn: 'Pastors & Ministry Leaders',
    descriptionBn: 'গভীর ধর্মতাত্ত্বিক অন্তর্দৃষ্টি, পালকীয় পরিচর্যা ও আত্মিক পুনরুজ্জীবনের বার্তা।',
    iconName: 'Award',
  },
  {
    id: 'bible_study',
    labelBn: 'বাইবেল অধ্যয়ন ও সেমিনার',
    labelEn: 'Bible Study & Seminar',
    descriptionBn: 'পদ্ধতিগত ব্যাখ্যা, পদানুপদ বিশ্লেষণ ও শাস্ত্রীয় পটভূমির ওপর বিশেষ গুরুত্ব।',
    iconName: 'BookOpen',
  },
  {
    id: 'evangelistic',
    labelBn: 'সুসমাচার প্রচার সভা',
    labelEn: 'Evangelistic Outreach',
    descriptionBn: 'পাপ থেকে মুক্তি, ক্রুশের রক্ত ও যীশু খ্রীষ্টে বিশ্বাসে পরিত্রাণের স্পষ্ট আহ্বান।',
    iconName: 'Compass',
  },
  {
    id: 'memorial',
    labelBn: 'শোকসভা ও স্মরণসভা',
    labelEn: 'Funeral / Memorial Service',
    descriptionBn: 'অনন্ত জীবনের নিশ্চয়তা, খ্রীষ্টের পুনরুত্থান ও শোকগ্রস্ত পরিবারকে সান্ত্বনা দান।',
    iconName: 'HeartHandshake',
  },
  {
    id: 'prayer_meeting',
    labelBn: 'প্রার্থনা সভা ও জাগরণ',
    labelEn: 'Prayer & Revival Meeting',
    descriptionBn: 'বিশ্বাসে প্রার্থনার পরাক্রম, আত্মিক শুদ্ধিকরণ ও ঈশ্বরের উপস্থিতির অন্বেষণ।',
    iconName: 'Sparkles',
  },
  {
    id: 'special_service',
    labelBn: 'বিশেষ পর্ব বা সম্মেলন',
    labelEn: 'Special Service / Conference',
    descriptionBn: 'খ্রীষ্টজন্ম, গুড ফ্রাইডে, পুনরুত্থান বা বিশেষ ধন্যবাদ ও অভিষেক পর্ব।',
    iconName: 'Calendar',
  },
  {
    id: 'custom',
    labelBn: 'কাস্টম শ্রোতামণ্ডলী',
    labelEn: 'Custom Audience',
    descriptionBn: 'আপনার নিজস্ব সুনির্দিষ্ট শ্রোতামণ্ডলী ও সভার প্রেক্ষাপট উল্লেখ করুন।',
    iconName: 'Sliders',
  },
];

export const SERMON_DURATION_OPTIONS: SermonDurationOption[] = [
  {
    id: '10',
    labelBn: '১০ মিনিট (সংক্ষিপ্ত উৎসাহবাণী)',
    minutes: 10,
    wordCountEstimate: 'প্রায় ৮০০-১,০০০ শব্দ',
    scopeBn: 'প্রার্থনা সভা, প্রাতঃকালীন উপাসনা বা সংক্ষিপ্ত উদ্দীপনামূলক বার্তা। ১টি কেন্দ্রীয় বিষয় ও প্রত্যক্ষ আহ্বান।',
  },
  {
    id: '20',
    labelBn: '২০ মিনিট (যুব বা সেল গ্রুপ)',
    minutes: 20,
    wordCountEstimate: 'প্রায় ১,৮০০-২,০০০ শব্দ',
    scopeBn: 'সংক্ষিপ্ত পটভূমি, ২টি মূল আলোচ্য বিষয়, বাস্তব দৃষ্টান্ত ও সক্রিয় খ্রীষ্টিয় প্রয়োগ।',
  },
  {
    id: '30',
    labelBn: '৩০ মিনিট (রবিবাসরীয় মূল উপাসনা)',
    minutes: 30,
    wordCountEstimate: 'প্রায় ২,৮০০-৩,২০০ শব্দ',
    scopeBn: 'পূর্ণাঙ্গ শাস্ত্রীয় ও ঐতিহাসিক পটভূমি, ৩টি ভারসাম্যপূর্ণ মূল বিষয়, দৃষ্টান্ত ও সমাপনী প্রার্থনা।',
  },
  {
    id: '45',
    labelBn: '৪৫ মিনিট (গভীর পদানুপদ শিক্ষাদান)',
    minutes: 45,
    wordCountEstimate: 'প্রায় ৪,০০০-৪,৫০০ শব্দ',
    scopeBn: 'সেমিনারি ও সম্মেলন উপযোগী—গভীর ধর্মতাত্ত্বিক বিশ্লেষণ, ৩-৪টি বিষয় ও মণ্ডলীয় নীতি প্রয়োগ।',
  },
  {
    id: '60',
    labelBn: '৬০ মিনিট (মাস্টার ক্লাস ও নিবিড় কোর্স)',
    minutes: 60,
    wordCountEstimate: 'প্রায় ৫,৫০০-৬,০০০ শব্দ',
    scopeBn: 'সমগ্র অধ্যায় বা বিষয়ের সামগ্রিক পদানুপদ উন্মোচন, বিস্তারিত আত্ম-অনুসন্ধানের প্রশ্ন ও মন্ত্রণাদায়িনী প্রয়োগ।',
  },
  {
    id: 'custom',
    labelBn: 'কাস্টম সময়কাল',
    minutes: 35,
    wordCountEstimate: 'ব্যবহারকারী নির্ধারিত সময়',
    scopeBn: 'আপনার প্রয়োজনীয় নির্ধারিত মিনিটের পরিমাপে সুষম সার্মন প্রস্তুত করা হবে।',
  },
];

export interface PassageValidationResult {
  isValid: boolean;
  errorMessageBn?: string;
  bookId?: string;
  bookNameBn?: string;
  bookNameEn?: string;
  chapter?: number;
  startVerse?: number;
  endVerse?: number;
  scriptureTextBn?: string;
  formattedRefBn?: string;
  formattedRefEn?: string;
}

export class SermonService {
  /**
   * Validate user input passage (e.g. "John 3:16", "যোহন ৩:১৬", "Romans 8:28", "গীতসংহিতা ২৩", "Rom 8:28-30")
   */
  public static validatePassage(rawInput: string): PassageValidationResult {
    const input = rawInput.trim();
    if (!input) {
      return {
        isValid: false,
        errorMessageBn: 'অনুগ্রহ করে একটি সঠিক বাইবেল পদ বা অধ্যায় লিখুন।',
      };
    }

    const normalizedDigits = fromBengaliDigits(input);

    // Regex to capture:
    // Group 1: Book title (words, Bengali or English characters, space-separated, with optional leading numeral like 1 John)
    // Group 2: Chapter number
    // Group 3: Optional verse / verse range (e.g. :16 or :1-6 or :16-18 or 16)
    const pattern = /^([1-3]?\s*[\u0980-\u09FFa-zA-Z\s]+?)\s*(\d+)(?:\s*[:।.]\s*(\d+)(?:\s*[-–—]\s*(\d+))?)?$/i;
    const match = normalizedDigits.match(pattern);

    if (!match) {
      // Try single book name with no chapter
      const bookDirect = getBookByName(input);
      if (bookDirect) {
        return {
          isValid: true,
          bookId: bookDirect.id,
          bookNameBn: bookDirect.nameBn,
          bookNameEn: bookDirect.nameEn,
          chapter: 1,
          startVerse: 1,
          formattedRefBn: `${bookDirect.nameBn} ১ অধ্যায়`,
          formattedRefEn: `${bookDirect.nameEn} 1`,
          scriptureTextBn: `[${bookDirect.nameBn} ১ অধ্যায়] — এই সম্পূর্ণ অধ্যায়টিকে ভিত্তি করে সার্মন তৈরি করা হবে।`,
        };
      }

      return {
        isValid: false,
        errorMessageBn: 'অনুগ্রহ করে একটি সঠিক বাইবেল পদ বা অধ্যায় লিখুন। (উদাহরণ: যোহন ৩:১৬, রোমীয় ৮:২৮, গীতসংহিতা ২৩)',
      };
    }

    const bookQuery = match[1].trim();
    const chapterNum = parseInt(match[2], 10);
    const startVerseNum = match[3] ? parseInt(match[3], 10) : undefined;
    const endVerseNum = match[4] ? parseInt(match[4], 10) : undefined;

    // Resolve book from Canonical Inventory or BIBLE_BOOKS
    const book =
      CANONICAL_BIBLE_INVENTORY.find(
        (b) =>
          b.nameBn.toLowerCase() === bookQuery.toLowerCase() ||
          b.nameEn.toLowerCase() === bookQuery.toLowerCase() ||
          b.shortNameBn.toLowerCase() === bookQuery.toLowerCase() ||
          b.abbreviation.toLowerCase() === bookQuery.toLowerCase() ||
          b.id.toLowerCase() === bookQuery.toLowerCase()
      ) || getBookByName(bookQuery);

    if (!book) {
      return {
        isValid: false,
        errorMessageBn: `দুঃখিত, "${bookQuery}" নামের কোনো বাইবেল পুস্তক পাওয়া যায়নি। অনুগ্রহ করে সঠিক পুস্তকের নাম লিখুন।`,
      };
    }

    // Validate chapter boundary
    if (chapterNum < 1 || chapterNum > book.chaptersCount) {
      return {
        isValid: false,
        errorMessageBn: `${book.nameBn} পুস্তকে মোট ${toBengaliDigits(book.chaptersCount)}টি অধ্যায় রয়েছে। ${toBengaliDigits(chapterNum)} কোনো সঠিক অধ্যায় নয়।`,
      };
    }

    // Validate verse boundary if provided
    const chapterVerses =
      'chapterVersesCount' in book && Array.isArray((book as any).chapterVersesCount)
        ? (book as any).chapterVersesCount[chapterNum - 1]
        : undefined;

    if (startVerseNum !== undefined && chapterVerses !== undefined) {
      if (startVerseNum < 1 || startVerseNum > chapterVerses) {
        return {
          isValid: false,
          errorMessageBn: `${book.nameBn} ${toBengaliDigits(chapterNum)} অধ্যায়ে মোট ${toBengaliDigits(chapterVerses)}টি পদ রয়েছে। ${toBengaliDigits(startVerseNum)} কোনো বৈধ পদ নয়।`,
        };
      }
    }

    if (endVerseNum !== undefined && chapterVerses !== undefined) {
      if (endVerseNum < (startVerseNum || 1) || endVerseNum > chapterVerses) {
        return {
          isValid: false,
          errorMessageBn: `${book.nameBn} ${toBengaliDigits(chapterNum)} অধ্যায়ের পদের সীমা ১ থেকে ${toBengaliDigits(chapterVerses)} এর মধ্যে হতে হবে।`,
        };
      }
    }

    // Retrieve authentic Bengali Scripture text
    let scriptureTextBn = '';
    let formattedRefBn = '';
    let formattedRefEn = '';

    if (startVerseNum !== undefined) {
      if (endVerseNum !== undefined) {
        formattedRefBn = `${book.nameBn} ${toBengaliDigits(chapterNum)}:${toBengaliDigits(startVerseNum)}-${toBengaliDigits(endVerseNum)}`;
        formattedRefEn = `${book.nameEn} ${chapterNum}:${startVerseNum}-${endVerseNum}`;

        const chapterList = BibleService.getChapterVerses(book.id, chapterNum);
        const versesRange = chapterList.filter(
          (v) => v.verse >= startVerseNum && v.verse <= endVerseNum
        );
        if (versesRange.length > 0) {
          scriptureTextBn = versesRange
            .map((v) => `[${toBengaliDigits(v.verse)}] ${v.textBn}`)
            .join(' ');
        } else {
          scriptureTextBn = `[${formattedRefBn}] — এই শাস্ত্রাংশের ভিত্তিতে সার্মন তৈরি করা হবে।`;
        }
      } else {
        formattedRefBn = `${book.nameBn} ${toBengaliDigits(chapterNum)}:${toBengaliDigits(startVerseNum)}`;
        formattedRefEn = `${book.nameEn} ${chapterNum}:${startVerseNum}`;

        const v = BibleService.getVerse(book.id, chapterNum, startVerseNum);
        if (v) {
          scriptureTextBn = v.textBn;
        } else {
          scriptureTextBn = `[${formattedRefBn}] — এই পদের ভিত্তিতে সার্মন তৈরি করা হবে।`;
        }
      }
    } else {
      formattedRefBn = `${book.nameBn} ${toBengaliDigits(chapterNum)} অধ্যায়`;
      formattedRefEn = `${book.nameEn} ${chapterNum}`;

      const chapterList = BibleService.getChapterVerses(book.id, chapterNum);
      if (chapterList.length > 0 && !chapterList[0].textBn.includes('ফেজ ২/৩')) {
        scriptureTextBn = chapterList
          .slice(0, 5)
          .map((v) => `[${toBengaliDigits(v.verse)}] ${v.textBn}`)
          .join(' ');
        if (chapterList.length > 5) {
          scriptureTextBn += ` ... (মোট ${toBengaliDigits(chapterList.length)}টি পদ)`;
        }
      } else {
        scriptureTextBn = `[${formattedRefBn}] — সমগ্র অধ্যায়কে ভিত্তি করে সার্মন তৈরি করা হবে।`;
      }
    }

    return {
      isValid: true,
      bookId: book.id,
      bookNameBn: book.nameBn,
      bookNameEn: book.nameEn,
      chapter: chapterNum,
      startVerse: startVerseNum,
      endVerse: endVerseNum,
      formattedRefBn,
      formattedRefEn,
      scriptureTextBn,
    };
  }

  /**
   * Generate complete structured sermon faithfully
   */
  public static generateSermon(request: SermonGenerationRequest): SermonContent {
    const val = this.validatePassage(request.passage);
    if (!val.isValid || !val.bookId) {
      throw new Error(val.errorMessageBn || 'অনুগ্রহ করে একটি সঠিক বাইবেল পদ বা অধ্যায় লিখুন।');
    }

    const durationMinutes =
      request.duration === 'custom'
        ? request.customDurationMinutes || 30
        : parseInt(request.duration, 10);

    const audienceOption = SERMON_AUDIENCE_OPTIONS.find((a) => a.id === request.audience);
    const audienceLabelBn =
      request.audience === 'custom' && request.customAudienceText
        ? request.customAudienceText
        : audienceOption?.labelBn || 'রবিবার মণ্ডলীর উপাসনা';

    const bookBn = val.bookNameBn || 'শাস্ত্র';
    const bookEn = val.bookNameEn || 'Scripture';
    const refBn = val.formattedRefBn || request.passage;
    const refEn = val.formattedRefEn || request.passage;
    const scriptureText = val.scriptureTextBn || '';

    // Title generation based on passage context
    const sermonTitle = this.generateTitle(bookBn, val.chapter || 1, val.startVerse, audienceLabelBn);

    // Big Idea formulation
    const bigIdea = this.generateBigIdea(bookBn, val.chapter || 1, val.startVerse);

    // Introduction tailored to audience & duration
    const introduction = this.generateIntroduction(
      refBn,
      bigIdea,
      audienceLabelBn,
      durationMinutes,
      request.audience
    );

    // Biblical & Historical context
    const biblicalContext = this.generateBiblicalContext(bookBn, bookEn, val.chapter || 1);
    const historicalContext = this.generateHistoricalContext(bookBn, val.chapter || 1);

    // Main Points scaled to duration
    const pointsCount = durationMinutes <= 15 ? 2 : durationMinutes >= 45 ? 4 : 3;
    const points = this.generatePoints(
      bookBn,
      val.chapter || 1,
      val.startVerse,
      pointsCount,
      audienceLabelBn,
      durationMinutes
    );

    // Illustrations tailored to audience
    const illustrations = this.generateIllustrations(bookBn, audienceLabelBn, request.audience);

    // Practical applications
    const applications = this.generateApplications(bookBn, audienceLabelBn, request.audience);

    // Reflection questions
    const reflectionQuestions = this.generateReflectionQuestions(bookBn, refBn, audienceLabelBn);

    // Conclusion & Prayer
    const conclusion = this.generateConclusion(bigIdea, audienceLabelBn, durationMinutes);
    const closingPrayer = this.generateClosingPrayer(bigIdea, refBn, audienceLabelBn);

    return {
      titleBn: sermonTitle,
      mainPassageBn: refBn,
      mainPassageEn: refEn,
      scriptureTextBn: scriptureText,
      bigIdeaBn: bigIdea,
      introductionBn: introduction,
      biblicalContextBn: biblicalContext,
      historicalLiteraryContextBn: historicalContext,
      points,
      illustrationSuggestionsBn: illustrations,
      practicalApplicationBn: applications,
      reflectionQuestionsBn: reflectionQuestions,
      conclusionBn: conclusion,
      closingPrayerBn: closingPrayer,
    };
  }

  private static generateTitle(
    bookBn: string,
    chapter: number,
    verse: number | undefined,
    _audienceBn: string
  ): string {
    if (bookBn.includes('যোহন') && chapter === 3) {
      return 'ঈশ্বরের অসীম প্রেম ও অনন্ত জীবনের আহ্বান';
    }
    if (bookBn.includes('রোমীয়') && chapter === 8) {
      return 'ঈশ্বরের সার্বভৌম অনুগ্রহ ও বিশ্বাসীর অবিচল নিরাপত্তা';
    }
    if (bookBn.includes('গীতসংহিতা') && chapter === 23) {
      return 'উত্তম পালকের তত্ত্বাবধানে জীবনের পরম তৃপ্তি';
    }
    if (bookBn.includes('মথি') && chapter >= 5 && chapter <= 7) {
      return 'স্বর্গরাজ্যের পবিত্র নীতি ও পর্বতের মহান উপদেশ';
    }
    if (bookBn.includes('আদিপুস্তক') && chapter === 1) {
      return 'ঈশ্বরের সার্বভৌম সৃষ্টি ও মানুষের ঐশ্বরিক উদ্দেশ্য';
    }
    if (verse) {
      return `${bookBn} ${toBengaliDigits(chapter)}:${toBengaliDigits(verse)} থেকে ঈশ্বরের জীবন্ত বাক্য ও আত্মিক নির্দেশনা`;
    }
    return `${bookBn} ${toBengaliDigits(chapter)} অধ্যায়: বিশ্বাস ও খ্রীষ্টিয় জীবনের দিকদর্শন`;
  }

  private static generateBigIdea(bookBn: string, chapter: number, verse: number | undefined): string {
    if (bookBn.includes('যোহন') && chapter === 3) {
      return 'ঈশ্বরের প্রেম কেবল একটি অনুভূতি নয়, এটি আত্মত্যাগী ক্রুশের চরম দানের মাধ্যমে বিশ্বাসীকে অনন্ত জীবন উপহার দেওয়ার ঈশ্বরীয় অঙ্গীকার।';
    }
    if (bookBn.includes('রোমীয়') && chapter === 8) {
      return 'যারা ঈশ্বরকে প্রেম করে এবং তাঁর সংকল্পানুসারে আহূত, তাদের জীবনের প্রতিটি ঘটনাকে ঈশ্বর চূড়ান্ত মঙ্গলের জন্য যৌথভাবে পরিচালিত করেন।';
    }
    if (bookBn.includes('গীতসংহিতা') && chapter === 23) {
      return 'সদাপ্রভু স্বয়ং যখন আমাদের পালক, তখন অন্ধকারময় মৃত্যুচ্ছায়ার উপত্যকাতেও আমাদের কোনো অভাব বা ভয়ের কারণ নেই।';
    }
    if (verse) {
      return `এই শাস্ত্রাংশের মূল সত্য হলো—ঈশ্বরের সার্বভৌম উদ্দেশ্য বিশ্বাসীদের জীবনে তাঁর ইচ্ছা প্রকাশ করা এবং অনুগ্রহের মাধ্যমে তাদের আনুগত্যের পথে চালিত করা।`;
    }
    return `ঈশ্বরের বাক্য মানবজীবনের অন্ধকারের মাঝে পরম আলো এবং তাঁর অনন্ত চুক্তির অটল বিশ্বস্ততার জীবন্ত প্রমাণ।`;
  }

  private static generateIntroduction(
    passageBn: string,
    bigIdea: string,
    audienceLabelBn: string,
    durationMinutes: number,
    audienceType: SermonAudience
  ): string {
    let hook = '';
    if (audienceType === 'youth') {
      hook =
        'আজকের দ্রুত পরিবর্তনশীল ও বিভ্রান্তিকর জগতে যুবসমাজের সবচেয়ে বড় অনুসন্ধান হলো—আমার জীবনের প্রকৃত অর্থ ও পরিচয় কী? সামাজিক যোগাযোগ মাধ্যম বা জগতের ক্ষণস্থায়ী মোহের মাঝে আমরা প্রায়ই বিভ্রান্ত হয়ে পড়ি। কিন্তু আজ শাস্ত্র আমাদের এমন এক অটল ভিত্তির মুখোমুখি দাঁড় করায় যা কখনো নড়বড়ে হয় না।';
    } else if (audienceType === 'children') {
      hook =
        'ছোট্ট সোনামণিরা, তোমরা কি কখনো অন্ধকারে পথ হারিয়েছ? যখন পথ হারিয়ে যায় তখন মা কিংবা বাবার হাতটি শক্ত করে ধরলে কেমন সাহস লাগে? ঠিক তেমনি আমাদের স্বর্গের ঈশ্বর আমাদের হাত ধরে রেখেছেন। আজকের শাস্ত্রে আমরা দেখব কীভাবে ঈশ্বর আমাদের সবচেয়ে বেশি ভালোবাসেন।';
    } else if (audienceType === 'memorial') {
      hook =
        'আজ অত্যন্ত ভারাক্রান্ত অথচ অনন্ত আশায় উদ্দীপিত হৃদয়ে আমরা একত্রিত হয়েছি। বিচ্ছেদ ও অশ্রুজলের এই মুহূর্তে আমাদের পার্থিব কোনো সান্ত্বনা পর্যাপ্ত নয়। কিন্তু ঈশ্বরের বাক্য মৃত্যুর সীমানার ওপারে প্রসারিত খ্রীষ্টের পুনরুত্থানের মহাবিজয় ঘোষণা করে।';
    } else if (audienceType === 'pastors') {
      hook =
        'সম্মানিত পালক ও পরিচর্যার সহযোদ্ধাবৃন্দ, পরিচর্যার এই কঠিন যুগে যখন ক্লান্তিবোধ, আত্মিক যুদ্ধ ও দায়িত্বের চাপ আমাদের গ্রাস করতে চায়, তখন আমাদের পুনরায় শাস্ত্রের সেই আদি উৎসের কাছে ফিরে যেতে হয় যা আমাদের প্রথম ডেকেছিল এবং আজও সবল করে।';
    } else {
      hook =
        'প্রিয় খ্রীষ্টভক্ত মণ্ডলী, মানবজীবনের প্রতিটি সংকটে ও আনন্দে ঈশ্বরের জীবন্ত বাক্যই আমাদের পথপ্রদর্শক। আজ আমরা যে শাস্ত্রাংশ অধ্যয়ন করতে যাচ্ছি, তা কেবল অতীতের কোনো ইতিহাস নয়, বরং আজকের প্রভাতে আমাদের প্রত্যেকের হৃদয়ে সরাসরি ঈশ্বরের কণ্ঠস্বর।';
    }

    const durationContext =
      durationMinutes <= 15
        ? `আজকের এই সংক্ষিপ্ত ${toBengaliDigits(durationMinutes)} মিনিটে আমরা এই শাস্ত্রের মূল সুরটি আমাদের হৃদয়ে গেঁথে নেব।`
        : `আজকের এই ${toBengaliDigits(durationMinutes)} মিনিটের প্রার্থনাময় পাঠে আমরা গভীরভাবে নিরীক্ষণ করব কীভাবে এই সত্য আমাদের ব্যক্তিজীবন, পরিবার ও মণ্ডলীকে পুনরুজ্জীবিত করতে পারে।`;

    return `${hook}\n\nআজকের মূল পাঠ: ${passageBn}। এই শাস্ত্রাংশের কেন্দ্রীয় ভাব (Big Idea) হলো: "${bigIdea}"\n\n${durationContext}`;
  }

  private static generateBiblicalContext(bookBn: string, bookEn: string, chapter: number): string {
    return `${bookBn} (${bookEn}) পুস্তকটি পবিত্র বাইবেলের সামগ্রিক পরিত্রাণ পরিকল্পনার এক অপরিহার্য অংশ। এই পুস্তকের ${toBengaliDigits(chapter)} অধ্যায়টি আকস্মিকভাবে আসেনি; এর পূর্ববর্তী অধ্যায়গুলোতে মানবজাতির দুর্বলতা, আত্মিক সংকট ও ঐশ্বরিক অঙ্গীকারের যে পটভূমি রচিত হয়েছে, তারই ধারাবাহিকতায় এই অধ্যায়টি প্রকাশিত হয়েছে। শাস্ত্রের ব্যাখ্যায় এর সামগ্রিক প্রামাণিক ধারা (Canonical flow) অনুধাবন করা অপরিহার্য।`;
  }

  private static generateHistoricalContext(_bookBn: string, _chapter: number): string {
    return `ঐতিহাসিক ও সাহিত্যিক প্রেক্ষাপট থেকে দেখতে গেলে, আদি পাঠকদের তৎকালীন সংস্কৃতি, সমাজব্যবস্থা এবং ভাষার স্বাভাবিক ব্যাকরণ বিবেচনা করা জরুরি। ঈশ্বর তাঁর প্রত্যাদেশ কোনো শূন্যগর্ভে দেননি; সুনির্দিষ্ট কাল, স্থান ও মানুষের বাস্তব অভিজ্ঞতার মাঝে তাঁর অপরিবর্তনীয় সত্য উন্মোচিত হয়েছে। এই সত্য আমাদের মনে করিয়ে দেয় যে বাইবেল শুধু তৎকালীন সময়ের জন্য নয়, সকল যুগের বিশ্বাসীদের জন্য পরম দিশারী।`;
  }

  private static generatePoints(
    bookBn: string,
    chapter: number,
    verse: number | undefined,
    count: number,
    audienceLabelBn: string,
    _durationMinutes: number
  ): SermonPoint[] {
    const points: SermonPoint[] = [];

    // Point 1
    points.push({
      id: 'pt_1',
      pointNumber: 1,
      titleBn: 'ঐশ্বরিক সত্যের প্রকাশ ও মানবজাতির বাস্তব অবস্থা',
      scriptureReference: `${bookBn} ${toBengaliDigits(chapter)}:${verse ? toBengaliDigits(verse) : '১'}`,
      explanationBn: `শাস্ত্রের প্রথম আহ্বান হলো নিজেদের আত্মিক অবস্থান নিরপেক্ষভাবে দেখা। ঈশ্বর যখন তাঁর বাক্য প্রকাশ করেন, তখন আমাদের পার্থিব অহংকার ও স্বনির্ভরতার মিথ্যা আবরণ ভেঙে পড়ে। তাঁর বাক্যের আলোতে আমরা বুঝতে পারি ঈশ্বরের পবিত্রতা এবং তাঁর অনুগ্রহের প্রতি আমাদের পরম প্রয়োজন।`,
      supportingScriptureBn: 'গীতসংহিতা ১১৯:১০৫ — "তোমার বাক্য আমার চরণের প্রদীপ, ও আমার পথের আলোক।"',
      practicalApplicationBn: `${audienceLabelBn}-এর প্রত্যেকের উচিত প্রতিদিন ঈশ্বরের বাক্যের সম্মুখে নিজেকে সমর্পণ করা এবং অন্তরের সমস্ত দুর্বলতা অকপটে তাঁর কাছে স্বীকার করা।`,
    });

    // Point 2
    points.push({
      id: 'pt_2',
      pointNumber: 2,
      titleBn: 'খ্রীষ্টে প্রকাশিত ঈশ্বরের অসীম অনুগ্রহ ও মুক্তি',
      scriptureReference: `${bookBn} ${toBengaliDigits(chapter)} অধ্যায়`,
      explanationBn: `পরিত্রাণ কোনো মানুষের নিজস্ব সাধনা বা ধর্মীয় আচার পালনের মাধ্যমে উপার্জিত হতে পারে না। এই শাস্ত্রাংশ আমাদের নির্দেশ করে কালভারীর ক্রুশের দিকে—যেখানে প্রভু যীশু তাঁর নিজের প্রাণ দিয়ে আমাদের অপরাধের শাস্তি বহন করেছেন এবং অনন্ত আশার দ্বার উন্মুক্ত করেছেন।`,
      supportingScriptureBn: 'ইফিষীয় ২:৮ — "কেননা অনুগ্রহেই বিশ্বাস দ্বারা তোমরা পরিত্রাণ পাইয়াছ; এবং ইহা তো তোমাদের হইতে হয় নাই, ঈশ্বরেরই দান।"',
      practicalApplicationBn: 'পার্থিব দুশ্চিন্তা ও অপরাধবোধে নিমজ্জিত না থেকে খ্রীষ্টের ক্রুশে সম্পন্ন হওয়া নিখুঁত প্রায়শ্চিত্তে পূর্ণ আস্থা রাখুন।',
    });

    if (count >= 3) {
      points.push({
        id: 'pt_3',
        pointNumber: 3,
        titleBn: 'দৈনন্দিন জীবনে জীবন্ত বিশ্বাসের ফল ও আনুগত্য',
        scriptureReference: `${bookBn} ${toBengaliDigits(chapter)} অধ্যায়`,
        explanationBn: 'প্রকৃত বিশ্বাস কেবল তাত্ত্বিক সম্মতিতে সীমাবদ্ধ থাকে না; তা বাস্তব জীবনে আনুগত্য, পবিত্রতা ও ভ্রাতৃপ্রেমের মাধ্যমে দৃশ্যমান হয়। খ্রীষ্টের শিষ্য হিসেবে আমাদের জীবন যেন জগতের মাঝে লবণ ও আলোর সাক্ষ্য বহন করে।',
        supportingScriptureBn: 'যাকোব ২:১৭ — "তেমনি বিশ্বাসও যদি কার্য্যযুক্ত না হয়, তবে তাহা আপনিই মৃত।"',
        practicalApplicationBn: 'পারিবারিক সম্পর্ক, কর্মক্ষেত্র এবং মণ্ডলীতে খ্রীষ্টের নম্রতা ও ক্ষমার মনোভাব বাস্তবায়িত করার মাধ্যমে আপনার বিশ্বাস প্রমাণ করুন।',
      });
    }

    if (count >= 4) {
      points.push({
        id: 'pt_4',
        pointNumber: 4,
        titleBn: 'চিরন্তন প্রত্যাশা ও খ্রীষ্টের দ্বিতীয় আগমনের প্রস্তুতি',
        scriptureReference: `${bookBn} ${toBengaliDigits(chapter)} অধ্যায়`,
        explanationBn: 'বর্তমান জগতের দুঃখকষ্ট ও অস্থিরতার মাঝেই আমাদের দৃষ্টি নিবদ্ধ রাখতে হবে অনন্ত স্বদেশের দিকে। প্রভু যীশুর প্রতিশ্রুতি সত্য—তিনি পুনরায় আসবেন এবং তাঁর বিশ্বাসী অবশিষ্টাংশকে মহিমায় গ্রহণ করবেন।',
        supportingScriptureBn: 'তীত ২:১৩ — "সেই ধন্য আশার, অর্থাৎ আমাদের মহান ঈশ্বর ও ত্রাণকর্তা যীশু খ্রীষ্টের মহিমার প্রকাশের অপেক্ষায় থাকি।"',
        practicalApplicationBn: 'প্রতিটি দিনকে খ্রীষ্টের আসন্ন প্রত্যাবর্তনের আলোতে মূল্যায়ন করুন এবং অলসতা পরিহার করে সুসমাচার প্রচারে বিশ্বস্ত থাকুন।',
      });
    }

    return points;
  }

  private static generateIllustrations(
    bookBn: string,
    audienceLabelBn: string,
    audienceType: SermonAudience
  ): string[] {
    if (audienceType === 'children') {
      return [
        '১. অন্ধকারের মাঝে টর্চলাইটের আলো: যেমন রাতের বেলা গভীর অন্ধকারে একটি ছোট টর্চের আলো পুরো ঘরকে আলোকিত করে দেয়, তেমনি ঈশ্বরের একটি বাক্য আমাদের সারা জীবনের পথ দেখায়।',
        '২. বন্ধুর প্রতিশ্রুতি: একজন বিশ্বস্ত বন্ধু যেমন কখনো হাত ছেড়ে দেয় না, প্রভু যীশু আমাদের হাত ধরে চিরকাল সঙ্গে থাকেন।',
      ];
    }
    if (audienceType === 'youth') {
      return [
        '১. জিপিএস নেভিগেশন (GPS) এর উপমা: আধুনিক গাড়িতে জিপিএস যেমন বিভ্রান্তিকর রাস্তার মোড়ে সঠিক দিকনির্দেশ করে, ঈশ্বরের বাক্য তেমনি বিভ্রান্ত যুবসমাজের জন্য নির্ভুল আধ্যাত্মিক দিকদর্শন।',
        '২. খাঁটি সোনার অগ্নিপরীক্ষা: স্বর্ণ যেমন তীব্র আগুনে পুড়ে খাঁটি হয়, তেমনি জীবনের কঠিন সংগ্রামগুলো আমাদের বিশ্বাসকে খাঁটি ও মহিমান্বিত করতে ঈশ্বরেরই এক আত্মিক বিদ্যালয়।',
      ];
    }
    return [
      '১. ঝড়ের রাতের বাতিঘর (Lighthouse): উত্তাল সমুদ্রে দিকভ্রান্ত জাহাজের নাবিক যেমন অন্ধকার ভেদ করা বাতিঘরের আলো দেখে নিরাপদে বন্দরে পৌঁছায়, ঈশ্বরের জীবন্ত বাক্য জীবনের প্রতিটি ঝড়ের মাঝে বিশ্বাসীকে তেমনি অটল পথ প্রদর্শন করে।',
      '২. পিতা ও বিপথগামী পুত্রের ক্ষমার আলিঙ্গন: মানবীয় বিচার যেখানে শাস্তি দাবি করে, সেখানে ঈশ্বরের পিতা-সুলভ প্রেম অনুতপ্ত পাপীকে নতুন জীবনের আশীর্বাদে গ্রহণ করে।',
    ];
  }

  private static generateApplications(
    _bookBn: string,
    _audienceLabelBn: string,
    _audienceType: SermonAudience
  ): string[] {
    return [
      `১. ব্যক্তিগত ধ্যান ও প্রার্থনা: এই সপ্তাহে প্রতিদিন অন্তত ১৫ মিনিট সময় এই শাস্ত্রাংশ পাঠ ও ব্যক্তিগত আত্ম-অনুসন্ধানে ব্যয় করুন।`,
      `২. ক্ষমার বাস্তবায়ন: যে ব্যক্তির প্রতি আপনার মনে তিক্ততা রয়েছে, খ্রীষ্টের ক্ষমার স্মৃতি মনে রেখে আজই তার প্রতি প্রেমের হাত বাড়িয়ে দিন।`,
      `৩. সেবামূলক পদক্ষেপ: মণ্ডলীতে বা আপনার পাড়ায় কোনো অসহায় বা অসুস্থ ভাইবোনের পাশে দাঁড়িয়ে খ্রীষ্টের প্রেমের দৃশ্যমান প্রমাণ দিন।`,
    ];
  }

  private static generateReflectionQuestions(
    _bookBn: string,
    passageBn: string,
    _audienceLabelBn: string
  ): string[] {
    return [
      `১. ${passageBn}-এর এই সত্যটি আমার বর্তমান জীবনের কোন সুনির্দিষ্ট ভয় বা উদ্বেগকে দূর করতে সাহায্য করে?`,
      `২. ঈশ্বরের বাক্য আজ আমাকে আমার অভ্যাসের কোন দিকটি সংশোধন বা ত্যাগ করার আহ্বান জানাচ্ছে?`,
      `৩. এই সার্মন শোনার পর, আগামী ৪৮ ঘণ্টার মধ্যে আমি ঈশ্বরের প্রতি ভালোবাসার কী বাস্তব পদক্ষেপ গ্রহণ করব?`,
    ];
  }

  private static generateConclusion(
    bigIdea: string,
    _audienceLabelBn: string,
    durationMinutes: number
  ): string {
    return `প্রিয় ভাই ও বোনেরা, শাস্ত্রের কথা কখনো মিথ্যা হয় না। আজকের এই ${toBengaliDigits(durationMinutes)} মিনিটের আলোচনায় আমরা দেখেছি: "${bigIdea}"।\n\nজগত অনেক কিছু প্রতিশ্রুতি দেয় যা রক্ষা করতে পারে না, কিন্তু ঈশ্বরের অঙ্গীকার চিরন্তন। আসুন আমরা কেবল বাক্যের শ্রোতা না হয়ে, বাক্যের পালনকর্তা হয়ে আমাদের জীবন গড়ে তুলি। প্রভু যীশুর হাত আমাদের দিকে প্রসারিত; আজই আসুন পূর্ণ সমর্পণে তাঁর চরণে নিজেদের নিবেদন করি।`;
  }

  private static generateClosingPrayer(
    _bigIdea: string,
    passageBn: string,
    _audienceLabelBn: string
  ): string {
    return `হে আমাদের অনন্ত স্বর্গীয় পিতা, জগতের সমস্ত প্রশংসা, গৌরব ও মহিমা তোমারই প্রাপ্য। আজকের এই সুন্দর মুহূর্তে তোমার জীবন্ত ও কার্যসাধক বাক্য ${passageBn}-এর মধ্য দিয়ে আমাদের সাথে কথা বলার জন্য আমরা তোমাকে ধন্যবাদ জানাই।\n\nপ্রভু, আমরা স্বীকার করি আমাদের নিজস্ব জ্ঞানে তোমার গভীর সত্য উপলব্ধি করা অসম্ভব। তোমার পবিত্র আত্মাকে আমাদের অন্তরে প্রেরণ কর, যেন তোমার এই বাক্য আমাদের হৃদয়ে গভীর শিকড় বিস্তার করে এবং শতগুণ ফল উৎপন্ন করে।\n\nআমাদের সমস্ত সংশয়, অলসতা ও দুর্বলতা দূর কর। আমরা যেন কেবল মন্দিরে নয়, ঘরে, কর্মক্ষেত্রে ও সমাজে খ্রীষ্টের অনুসারী হিসেবে জীবনযাপন করতে পারি।\n\nআমাদের পালক, মণ্ডলীর পরিবার ও সমস্ত অসুস্থ ভাইবোনদের তোমার চরণে সমর্পণ করি। আমাদের পরিত্রাতা ও মুক্তিদাতা প্রভু যীশু খ্রীষ্টের পবিত্র নামে এই বিনতি যাচ্ঞা করি।\n\nআমেন।`;
  }

  /**
   * Convert SermonContent into clean Markdown document
   */
  public static toMarkdown(content: SermonContent): string {
    let md = `# ${content.titleBn}\n\n`;
    md += `**মূল শাস্ত্রাংশ**: ${content.mainPassageBn} (${content.mainPassageEn})\n\n`;
    md += `> **শাস্ত্রপদ**: "${content.scriptureTextBn}"\n\n`;
    md += `### 💡 কেন্দ্রীয় ভাব (Big Idea)\n${content.bigIdeaBn}\n\n---\n\n`;

    md += `### 📖 ভূমিকা (Introduction)\n${content.introductionBn}\n\n`;
    md += `### 🏛️ শাস্ত্রীয় ও ঐতিহাসিক পটভূমি\n**শাস্ত্রীয় পটভূমি**: ${content.biblicalContextBn}\n\n**ঐতিহাসিক ও সাহিত্যিক প্রেক্ষাপট**: ${content.historicalLiteraryContextBn}\n\n---\n\n`;

    md += `### 🎯 মূল শিক্ষণীয় বিষয়সমূহ (Main Points)\n\n`;
    for (const p of content.points) {
      md += `#### মূল বিষয় ${toBengaliDigits(p.pointNumber)}: ${p.titleBn}\n`;
      md += `- **রেফারেন্স**: ${p.scriptureReference}\n`;
      md += `- **ব্যাখ্যা**: ${p.explanationBn}\n`;
      md += `- **সহায়ক শাস্ত্র**: ${p.supportingScriptureBn}\n`;
      md += `- **প্রয়োগ**: ${p.practicalApplicationBn}\n\n`;
    }

    md += `---\n\n### 🌟 বাস্তব দৃষ্টান্ত ও রূপক (Illustrations)\n`;
    for (const ill of content.illustrationSuggestionsBn) {
      md += `${ill}\n\n`;
    }

    md += `### 🛠️ ব্যবহারিক খ্রীষ্টিয় প্রয়োগ (Practical Application)\n`;
    for (const app of content.practicalApplicationBn) {
      md += `${app}\n`;
    }
    md += `\n`;

    md += `### ❓ আত্ম-অনুসন্ধানের প্রশ্নমালা (Reflection Questions)\n`;
    for (const q of content.reflectionQuestionsBn) {
      md += `${q}\n`;
    }
    md += `\n---\n\n`;

    md += `### 🏁 উপসংহার (Conclusion)\n${content.conclusionBn}\n\n`;
    md += `### 🙏 সমাপনী প্রার্থনা (Closing Prayer)\n${content.closingPrayerBn}\n\n---\n`;
    md += `*বাংলা স্টাডি বাইবেল — সার্মন বিল্ডার (সহায়ক গবেষণামূলক টুল)*\n`;

    return md;
  }
}
