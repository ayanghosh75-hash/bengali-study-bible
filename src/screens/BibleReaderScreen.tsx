import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, FileText, BookOpen, Globe, ShieldCheck, ExternalLink, ChevronDown, ChevronUp, Sparkles, Library, Eye, EyeOff, Layers, Info, RotateCcw } from 'lucide-react';
import { BibleVerse, ReaderSettings, HighlightColor } from '../types/bible';
import { BibleService } from '../services/bibleService';
import { StorageService } from '../services/storageService';
import { StudyService } from '../services/studyService';
import { TranslationService } from '../services/translationService';
import { toBengaliDigits } from '../utils/bengaliNumerals';
import { VerseActionSheet } from '../components/VerseActionSheet';
import { NoteEditorModal } from '../components/NoteEditorModal';
import { CrossReferenceModal } from '../components/CrossReferenceModal';
import { BibleTranslation } from '../types/translations';
import { BibleTranslationAttribution } from '../components/rights/BibleTranslationAttribution';
import { ReportProblemModal } from '../components/feedback/ReportProblemModal';
import { FeedbackSuccessModal } from '../components/feedback/FeedbackSuccessModal';
import { FeedbackItem } from '../types/feedback';
import { AnalyticsService } from '../services/analyticsService';
import { deepKnowledgeBase } from '../services/deepKnowledgeBaseService';
import { DeepKnowledgeResource } from '../types/deepKnowledgeBase';
import { ResourceCard } from '../components/knowledgeBase/ResourceCard';
import { ResourceReaderModal } from '../components/knowledgeBase/ResourceReaderModal';
import { CANONICAL_BIBLE_INVENTORY } from '../data/canonicalBibleInventory';

interface BibleReaderScreenProps {
  bookId: string;
  chapter: number;
  initialVerse?: number;
  settings: ReaderSettings;
  onNavigateChapter: (bookId: string, chapter: number, verse?: number) => void;
  onOpenBookPicker: () => void;
}

export const BibleReaderScreen: React.FC<BibleReaderScreenProps> = ({
  bookId,
  chapter,
  initialVerse,
  settings,
  onNavigateChapter,
  onOpenBookPicker,
}) => {
  const book = BibleService.getBook(bookId);

  // Active translation state
  const [activeTranslation, setActiveTranslation] = useState<BibleTranslation>(() =>
    TranslationService.getActiveTranslation()
  );
  const [isTranslationMenuOpen, setIsTranslationMenuOpen] = useState(false);

  // Chapter verses & loading state
  const [verses, setVerses] = useState<BibleVerse[]>(() =>
    BibleService.getChapterVerses(bookId, chapter)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Annotations & modal state
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isCrossRefModalOpen, setIsCrossRefModalOpen] = useState(false);
  const [verseForNote, setVerseForNote] = useState<BibleVerse | null>(null);
  const [reportingVerse, setReportingVerse] = useState<BibleVerse | null>(null);
  const [feedbackSuccessItem, setFeedbackSuccessItem] = useState<FeedbackItem | null>(null);
  const [, setHighlightRefreshKey] = useState(0);
  const [showStudyNotes, setShowStudyNotes] = useState<boolean>(true);

  const canonicalMeta = useMemo(() => {
    return CANONICAL_BIBLE_INVENTORY.find((b) => b.id.toUpperCase() === bookId.toUpperCase());
  }, [bookId]);

  // “দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার” Passage Connections
  const [isRelatedResourcesExpanded, setIsRelatedResourcesExpanded] = useState<boolean>(true);
  const [readingKnowledgeResource, setReadingKnowledgeResource] = useState<DeepKnowledgeResource | null>(null);

  const passageKnowledgeResources = useMemo(() => {
    return deepKnowledgeBase.getResourcesForPassage(bookId, chapter);
  }, [bookId, chapter]);

  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Auto-record reading history
  useEffect(() => {
    if (book) {
      StorageService.recordReadingHistory(bookId, book.nameBn, chapter, initialVerse);
    }
  }, [bookId, chapter, initialVerse, book]);

  // Load verses whenever book, chapter, or active translation changes
  useEffect(() => {
    let isMounted = true;
    const cached = BibleService.getChapterVerses(bookId, chapter);
    if (cached && cached.length > 0) {
      setVerses(cached);
      setIsLoading(false);
      setLoadError(null);
    } else {
      setIsLoading(true);
      setLoadError(null);
    }

    BibleService.loadChapterVerses(bookId, chapter, activeTranslation.id)
      .then((res) => {
        if (!isMounted) return;
        setIsLoading(false);
        if (res.status === 'SUCCESS') {
          setVerses(res.verses);
          setLoadError(null);
          AnalyticsService.trackChapterRead(bookId, book?.nameBn || bookId, chapter, activeTranslation.id);
        } else if (res.status === 'LICENSE_RESTRICTED') {
          setVerses([]);
          setLoadError(
            res.message ||
              'এই অনুবাদের পাঠ বর্তমানে উপলব্ধ নয়। বাইবেল সোসাইটি অফ ইন্ডিয়ার (BSI) অনুমোদিত লাইসেন্স যাচাইকরণ প্রক্রিয়াধীন।'
          );
        } else if (res.status === 'ERROR') {
          // Automatic background retry after brief backoff
          console.warn('[BibleReaderScreen] Transient load error, auto-retrying in background...');
          setTimeout(() => {
            if (!isMounted) return;
            BibleService.loadChapterVerses(bookId, chapter, activeTranslation.id, true)
              .then((retryRes) => {
                if (!isMounted) return;
                if (retryRes.status === 'SUCCESS') {
                  setVerses(retryRes.verses);
                  setLoadError(null);
                } else {
                  setVerses([]);
                  setLoadError(retryRes.message || 'অধ্যায়টি লোড হতে সাময়িক সমস্যা হচ্ছে। দীপ পুনরায় চেষ্টা করছে...');
                }
              })
              .catch(() => {
                if (!isMounted) return;
                setVerses([]);
                setLoadError('অধ্যায় লোড করতে সাময়িক সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।');
              });
          }, 800);
        } else {
          setVerses([]);
          setLoadError(res.message || 'এই অধ্যায়ের অনুমোদিত পাঠ এখনো যুক্ত করা যায়নি। দীপ বিষয়টি প্রশাসকের কাছে পাঠিয়েছে।');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setIsLoading(false);
        setVerses([]);
        setLoadError('অধ্যায় লোড করতে সাময়িক সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।');
        console.error('[BibleReaderScreen] loadChapterVerses error:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [bookId, chapter, activeTranslation.id]);

  // Scroll to initial verse if specified
  useEffect(() => {
    if (!isLoading && initialVerse && verseRefs.current[initialVerse]) {
      setTimeout(() => {
        verseRefs.current[initialVerse]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    } else if (!isLoading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [bookId, chapter, initialVerse, isLoading]);

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-500">
        পুস্তক পাওয়া যায়নি। অনুগ্রহ করে পুনরায় নির্বাচন করুন।
      </div>
    );
  }

  const bookNameBn = book.nameBn;
  const totalChapters = book.chaptersCount;
  const allBooks = BibleService.getBooks();
  const currentBookIndex = allBooks.findIndex((b) => b.id === bookId);
  const isFirstBookAndChapter = currentBookIndex === 0 && chapter === 1;
  const isLastBookAndChapter =
    currentBookIndex === allBooks.length - 1 && chapter === totalChapters;

  // Chapter navigation handlers with strict boundary guards
  const handlePrevChapter = () => {
    if (chapter > 1) {
      onNavigateChapter(bookId, chapter - 1);
    } else if (currentBookIndex > 0) {
      const prevBook = allBooks[currentBookIndex - 1];
      onNavigateChapter(prevBook.id, prevBook.chaptersCount);
    }
  };

  const handleNextChapter = () => {
    if (chapter < totalChapters) {
      onNavigateChapter(bookId, chapter + 1);
    } else if (currentBookIndex < allBooks.length - 1) {
      const nextBook = allBooks[currentBookIndex + 1];
      onNavigateChapter(nextBook.id, 1);
    }
  };

  const handleSelectTranslation = (translation: BibleTranslation) => {
    TranslationService.setActiveTranslation(translation.id);
    setActiveTranslation(translation);
    setIsTranslationMenuOpen(false);
  };

  const handleVerseClick = (verse: BibleVerse) => {
    setSelectedVerse(verse);
  };

  const handleToggleBookmark = (verse: BibleVerse) => {
    StorageService.toggleBookmark(
      bookId,
      bookNameBn,
      verse.chapter,
      verse.verse,
      verse.textBn
    );
    AnalyticsService.trackBookmarkAdd(bookId, bookNameBn, verse.chapter, verse.verse);
    setHighlightRefreshKey((k) => k + 1);
  };

  const handleSetHighlight = (verse: BibleVerse, color: HighlightColor | null) => {
    StorageService.setHighlight(bookId, bookNameBn, verse.chapter, verse.verse, color);
    AnalyticsService.trackHighlight(bookId, bookNameBn, verse.chapter, verse.verse, color || 'clear');
    setHighlightRefreshKey((k) => k + 1);
  };

  const handleSaveNote = (title: string, content: string) => {
    if (!verseForNote) return;
    StorageService.saveNote({
      bookId,
      bookNameBn,
      chapter: verseForNote.chapter,
      verse: verseForNote.verse,
      verseText: verseForNote.textBn,
      title,
      content,
    });
    AnalyticsService.trackNoteCreate(bookId, bookNameBn, verseForNote.chapter, verseForNote.verse);
    setHighlightRefreshKey((k) => k + 1);
  };

  const handleDeleteNote = (noteId: string) => {
    StorageService.deleteNote(noteId);
    setHighlightRefreshKey((k) => k + 1);
  };

  const fontClass = settings.fontFamily === 'serif' ? 'font-serif' : 'font-sans';

  // Highlight style mapping
  const getHighlightClass = (color?: HighlightColor) => {
    switch (color) {
      case 'gold':
        return 'bg-amber-200/60 dark:bg-amber-900/40 rounded px-1 -mx-1 border-b border-amber-400/50';
      case 'green':
        return 'bg-emerald-200/50 dark:bg-emerald-900/40 rounded px-1 -mx-1 border-b border-emerald-400/50';
      case 'blue':
        return 'bg-sky-200/50 dark:bg-sky-900/40 rounded px-1 -mx-1 border-b border-sky-400/50';
      case 'rose':
        return 'bg-rose-200/50 dark:bg-rose-900/40 rounded px-1 -mx-1 border-b border-rose-400/50';
      default:
        return '';
    }
  };

  const selectedVerseCrossRefs = selectedVerse
    ? StudyService.getCrossReferencesForVerse(bookId, chapter, selectedVerse.verse)
    : [];

  const availableTranslations = TranslationService.getAllTranslations();

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 pb-28 animate-in fade-in duration-150">
      {/* Top Sticky Header for Reader Navigation */}
      <div className="sticky top-16 z-20 bg-parchment-100/95 dark:bg-navy-950/95 backdrop-blur-md py-3 mb-4 border-b border-slate-200/80 dark:border-navy-800 flex items-center justify-between transition-colors">
        {/* Previous chapter button */}
        <button
          onClick={handlePrevChapter}
          disabled={isFirstBookAndChapter}
          className={`p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold ${
            isFirstBookAndChapter
              ? 'opacity-30 cursor-not-allowed text-slate-400'
              : 'text-slate-600 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-slate-200/50 dark:hover:bg-navy-800'
          }`}
          title="পূর্ববর্তী অধ্যায়"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">পূর্ববর্তী</span>
        </button>

        {/* Book & Chapter Selector Trigger */}
        <div className="flex items-center gap-2">
          <button
            id="tour-book-picker-btn"
            onClick={onOpenBookPicker}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 hover:border-gold-400 text-navy-950 dark:text-gold-300 shadow-sm hover:shadow transition-all flex items-center gap-2 group"
          >
            <BookOpen className="w-4 h-4 text-gold-500" />
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide group-hover:text-gold-600 dark:group-hover:text-gold-300">
              {bookNameBn} {settings.bengaliNumerals ? toBengaliDigits(chapter) : chapter} অধ্যায়
            </span>
            <span className="text-xs text-slate-400">▾</span>
          </button>

          {/* Translation Selection Dropdown */}
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <button
                onClick={() => setIsTranslationMenuOpen(!isTranslationMenuOpen)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-navy-800/80 border border-slate-200 dark:border-navy-700 text-xs font-bold text-gold-600 dark:text-gold-400 hover:border-gold-400 flex items-center gap-1 transition-all"
                title="অনুবাদ সংস্করণ পরিবর্তন"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{activeTranslation.shortCode}</span>
              </button>

              {isTranslationMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-navy-900 rounded-2xl shadow-xl border border-slate-200 dark:border-navy-700 p-2 z-30 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 py-1 tracking-wider border-b border-slate-100 dark:border-navy-800 mb-1">
                    অনুবাদ সংস্করণ নির্বাচন
                  </div>
                  {availableTranslations.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTranslation(t)}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-start justify-between gap-2 transition-colors ${
                        t.id === activeTranslation.id
                          ? 'bg-gold-50 dark:bg-gold-500/10 text-gold-700 dark:text-gold-300 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div>
                        <div className="font-semibold flex items-center gap-1.5">
                          {t.nameBn}
                          {t.hasFullText && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full font-sans">
                              সম্পূর্ণ
                            </span>
                          )}
                          {!t.hasFullText && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full font-sans">
                              লাইসেন্স অপেক্ষমাণ
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{t.publisherBn}</div>
                      </div>
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
                        {t.shortCode}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <BibleTranslationAttribution translationId={activeTranslation.id} />
          </div>
        </div>

        {/* Next chapter button */}
        <button
          onClick={handleNextChapter}
          disabled={isLastBookAndChapter}
          className={`p-2 rounded-xl transition-colors flex items-center gap-1 text-xs font-semibold ${
            isLastBookAndChapter
              ? 'opacity-30 cursor-not-allowed text-slate-400'
              : 'text-slate-600 dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-slate-200/50 dark:hover:bg-navy-800'
          }`}
          title="পরবর্তী অধ্যায়"
        >
          <span className="hidden sm:inline">পরবর্তী</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/* ক. অধ্যায়ের পরিচিতি (Chapter Introduction & Overview) */}
      {/* ============================================================ */}
      <div className="my-6 rounded-2xl bg-white/70 dark:bg-navy-900/60 border border-slate-200/80 dark:border-navy-800 p-5 sm:p-6 shadow-sm text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-400 uppercase tracking-wide">
            ক. অধ্যায়ের পরিচিতি
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {book.testament === 'OT' ? 'পুরাতন নিয়ম' : 'নতুন নিয়ম'} ({book.division})
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 dark:text-slate-100 tracking-tight">
          {bookNameBn} {settings.bengaliNumerals ? toBengaliDigits(chapter) : chapter}
        </h1>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="font-medium">{activeTranslation.nameBn}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 font-mono font-bold">
            {activeTranslation.shortCode}
          </span>
        </div>

        {canonicalMeta && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-navy-800/80 text-left max-w-xl mx-auto space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-200">মূল বার্তা:</span>
              <span className="italic">{canonicalMeta.themeBn}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span>লেখক: <strong>{canonicalMeta.authorBn}</strong></span>
              <span>রচনাকাল: <strong>{canonicalMeta.dateBn}</strong></span>
              <span>মোট অধ্যায়: <strong>{settings.bengaliNumerals ? toBengaliDigits(book.chaptersCount) : book.chaptersCount}টি</strong></span>
            </div>
          </div>
        )}
        <div className="w-12 h-1 bg-gold-500 mx-auto rounded-full mt-2 opacity-80" />
      </div>

      {/* ============================================================ */}
      {/* খ. সম্পূর্ণ বাইবেল পাঠ (Complete Scripture Reading) */}
      {/* ============================================================ */}
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200/80 dark:border-navy-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-navy-950 text-gold-400 dark:bg-navy-800">
            খ. সম্পূর্ণ বাইবেল পাঠ
          </span>
          {verses.length > 0 && (
            <span className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              (মোট {settings.bengaliNumerals ? toBengaliDigits(verses.length) : verses.length}টি পদ)
            </span>
          )}
        </div>

        {/* Reading Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStudyNotes(!showStudyNotes)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
              showStudyNotes
                ? 'bg-gold-500/10 border-gold-400/50 text-gold-700 dark:text-gold-300'
                : 'bg-slate-100 dark:bg-navy-800 border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
            }`}
            title={showStudyNotes ? 'অধ্যয়ন সহায়িকা লুকান' : 'অধ্যয়ন সহায়িকা প্রদর্শন করুন'}
          >
            {showStudyNotes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">অধ্যয়ন সহায়িকা {showStudyNotes ? 'চালু' : 'লুকানো'}</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-20 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-slate-600 dark:text-slate-300">
            অধ্যায় লোড হচ্ছে...
          </p>
          <p className="text-xs text-slate-400 font-sans">
            {bookNameBn} {settings.bengaliNumerals ? toBengaliDigits(chapter) : chapter} অধ্যায়
          </p>
        </div>
      )}

      {/* Error / License State */}
      {!isLoading && loadError && (
        <div className="my-10 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-xl">
            !
          </div>
          <h3 className="font-serif font-bold text-lg text-amber-900 dark:text-amber-200">
            {loadError}
          </h3>
          {activeTranslation.id === 'bsi-ben' ? (
            <div className="pt-2">
              <button
                onClick={() => {
                  TranslationService.setActiveTranslation('irv-ben');
                  setActiveTranslation(TranslationService.getActiveTranslation());
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-navy-950 font-bold text-xs shadow-md transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>IRV বাংলা সংস্করণে পড়ুন (সম্পূর্ণ অনুমোদিত উন্মুক্ত পাঠ্য)</span>
              </button>
            </div>
          ) : (
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setIsLoading(true);
                  setLoadError(null);
                  BibleService.loadChapterVerses(bookId, chapter, activeTranslation.id, true)
                    .then((res) => {
                      setIsLoading(false);
                      if (res.status === 'SUCCESS') {
                        setVerses(res.verses);
                        setLoadError(null);
                      } else {
                        setLoadError(res.message || 'অধ্যায় পাঠ লোড করা যায়নি।');
                      }
                    })
                    .catch(() => {
                      setIsLoading(false);
                      setLoadError('অধ্যায় লোড করতে ত্রুটি হয়েছে। পুনরায় চেষ্টা করুন।');
                    });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>পুনরায় চেষ্টা করুন (Retry)</span>
              </button>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                দীপ স্বয়ংক্রিয়ভাবে লোকাল ডাটাবেজ ও সার্ভার থেকে পাঠ্য পুনরুদ্ধারের চেষ্টা করবে।
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State Fallback */}
      {!isLoading && !loadError && verses.length === 0 && (
        <div className="my-10 p-6 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-center space-y-3">
          <p className="text-slate-600 dark:text-slate-300 font-serif">
            অধ্যায়টি প্রদর্শন করা যাচ্ছে না।
          </p>
          <button
            onClick={() => {
              setIsLoading(true);
              BibleService.loadChapterVerses(bookId, chapter, activeTranslation.id, true)
                .then((res) => {
                  setIsLoading(false);
                  if (res.status === 'SUCCESS') {
                    setVerses(res.verses);
                  }
                })
                .catch(() => {
                  setIsLoading(false);
                });
            }}
            className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs"
          >
            পুনরায় লোড করুন
          </button>
        </div>
      )}

      {/* Scripture Text Body — Complete Chapter Rendering */}
      {!isLoading && verses.length > 0 && (
        <div
          className={`space-y-4 text-slate-800 dark:text-slate-100 ${fontClass} leading-relaxed select-text transition-all py-2`}
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
          }}
        >
          {verses.map((verse) => {
            const isBookmarked = StorageService.isBookmarked(bookId, chapter, verse.verse);
            const highlight = StorageService.getHighlightForVerse(bookId, chapter, verse.verse);
            const note = StorageService.getNoteForVerse(bookId, chapter, verse.verse);
            const crossRefsCount = StudyService.getCrossReferencesForVerse(
              bookId,
              chapter,
              verse.verse
            ).length;
            const isTargeted = initialVerse === verse.verse;

            const verseNumStr = settings.bengaliNumerals
              ? toBengaliDigits(verse.verse)
              : verse.verse.toString();

            return (
              <div
                key={verse.verseKey}
                ref={(el) => {
                  verseRefs.current[verse.verse] = el;
                }}
                onClick={() => handleVerseClick(verse)}
                className={`relative group p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  isTargeted
                    ? 'ring-2 ring-gold-400 bg-gold-50/70 dark:bg-gold-500/15'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {/* Verse Text Line */}
                <div className="flex items-baseline gap-2.5">
                  {/* Verse Number & Badges */}
                  <div className="flex items-center gap-1 select-none flex-shrink-0 pt-0.5">
                    <span className="font-sans font-bold text-xs sm:text-sm text-gold-600 dark:text-gold-400 opacity-90 min-w-[1.5rem] text-right">
                      {verseNumStr}
                    </span>
                    {isBookmarked && (
                      <Bookmark className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                    )}
                    {note && (
                      <FileText className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
                    )}
                    {crossRefsCount > 0 && (
                      <span className="text-[10px] px-1 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 font-bold">
                        {crossRefsCount}
                      </span>
                    )}
                  </div>

                  {/* Verse Scripture Text with highlight */}
                  <p className={`flex-1 ${getHighlightClass(highlight?.color)}`}>
                    {verse.textBn}
                  </p>
                </div>

                {/* Note preview snippet inline if exists */}
                {note && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setVerseForNote(verse);
                      setIsNoteModalOpen(true);
                    }}
                    className="mt-1 ml-8 p-2 rounded-lg bg-blue-50/80 dark:bg-navy-800/80 border border-blue-200/50 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 font-sans flex items-start gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 mt-0.5 text-blue-500 flex-shrink-0" />
                    <div>
                      {note.title && <strong className="block font-semibold">{note.title}</strong>}
                      <span className="line-clamp-2 italic">{note.content}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* গ. অধ্যয়ন সহায়িকা (Study Guide & Context — Separated from Text) */}
      {/* ============================================================ */}
      {showStudyNotes && (
        <div className="mt-12 pt-8 border-t-2 border-dashed border-amber-300/80 dark:border-amber-900/60 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-amber-600 text-white dark:bg-amber-700">
                গ. অধ্যয়ন সহায়িকা ও ঐতিহাসিক পটভূমি
              </span>
              <span className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                (পবিত্র বাইবেলের মূল পাঠ্য থেকে সম্পূর্ণ পৃথক)
              </span>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span>সহায়ক ব্যাখ্যা ও গবেষণা</span>
            </span>
          </div>

          {/* Historical & Theological Context Box */}
          {canonicalMeta && (
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-navy-900/50 border border-amber-200 dark:border-navy-700 space-y-3">
              <h4 className="font-bold text-sm text-navy-950 dark:text-gold-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gold-600" />
                <span>পুস্তক ও অধ্যায় প্রেক্ষাপট: {bookNameBn}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {canonicalMeta.descriptionBn}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-navy-950/60 border border-amber-100 dark:border-navy-800">
                  <div className="font-bold text-gold-700 dark:text-gold-400 mb-1">কেন্দ্রীয় বার্তা</div>
                  <div className="text-slate-600 dark:text-slate-300">{canonicalMeta.themeBn}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-navy-950/60 border border-amber-100 dark:border-navy-800">
                  <div className="font-bold text-gold-700 dark:text-gold-400 mb-1">ঐতিহাসিক লেখক ও সময়</div>
                  <div className="text-slate-600 dark:text-slate-300">{canonicalMeta.authorBn} • {canonicalMeta.dateBn}</div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: DEEP BENGALI CHRISTIAN KNOWLEDGE BASE PASSAGE CONNECTIONS */}
          {passageKnowledgeResources.length > 0 && (
            <div className="rounded-2xl border border-amber-300/70 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/70 via-amber-100/30 to-amber-50/50 dark:from-amber-950/30 dark:via-navy-900 dark:to-amber-950/20 p-5 shadow-sm transition-all">
              <div
                onClick={() => setIsRelatedResourcesExpanded(!isRelatedResourcesExpanded)}
                className="flex items-center justify-between cursor-pointer select-none group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsRelatedResourcesExpanded(!isRelatedResourcesExpanded);
                  }
                }}
                aria-expanded={isRelatedResourcesExpanded}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-gold-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                    <Library className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                        এই অংশের সঙ্গে সম্পর্কিত যাচাইকৃত বাংলা উপকরণ
                      </h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold">
                        {toBengaliDigits(passageKnowledgeResources.length)}টি
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-gold-600 dark:text-gold-400" />
                      <span>দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার — সহায়ক গবেষণা ও বিশ্লেষণ (পবিত্র বাইবেল মূল পাঠের অংশ নয়)</span>
                    </p>
                  </div>
                </div>

                <button
                  className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-amber-200/40 dark:hover:bg-amber-900/40 transition"
                  aria-label={isRelatedResourcesExpanded ? 'সংকোচন করুন' : 'সম্প্রসারণ করুন'}
                >
                  {isRelatedResourcesExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {isRelatedResourcesExpanded && (
                <div className="mt-4 pt-4 border-t border-amber-200/60 dark:border-amber-900/40 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {passageKnowledgeResources.map((res) => (
                    <ResourceCard
                      key={res.id}
                      resource={res}
                      onRead={(r) => setReadingKnowledgeResource(r)}
                      onReportProblem={(r) => {
                        alert(`জ্ঞানভাণ্ডার উপকরণ #${r.id} বিষয়ে মতামত নথিভুক্ত করা হয়েছে।`);
                      }}
                      onSelectPassage={(pRef) => {
                        const parts = pRef.split(' ');
                        if (parts.length >= 2) {
                          const bId = parts[0];
                          const ch = parseInt(parts[1], 10);
                          if (!isNaN(ch)) {
                            onNavigateChapter(bId, ch);
                          }
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 italic">
            * অধ্যয়ন সহায়িকার সমস্ত টীকা ও উপকরণ মূল শাস্ত্রাংশের ব্যাখ্যামূলক সহায়ক মাত্র, যা ঈশ্বরের অনুপ্রাণিত মূল বাক্যের বিকল্প নয়।
          </p>
        </div>
      )}

      {/* Chapter Bottom Navigation Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 dark:border-navy-800 flex items-center justify-between">
        <button
          onClick={handlePrevChapter}
          disabled={isFirstBookAndChapter}
          className={`px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
            isFirstBookAndChapter
              ? 'opacity-30 cursor-not-allowed text-slate-400'
              : 'text-slate-700 dark:text-slate-200 hover:text-gold-600 hover:border-gold-400'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>পূর্ববর্তী অধ্যায়</span>
        </button>

        <span className="text-xs text-slate-400 font-sans">
          অধ্যায় {settings.bengaliNumerals ? toBengaliDigits(chapter) : chapter} /{' '}
          {settings.bengaliNumerals ? toBengaliDigits(totalChapters) : totalChapters}
        </span>

        <button
          onClick={handleNextChapter}
          disabled={isLastBookAndChapter}
          className={`px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
            isLastBookAndChapter
              ? 'opacity-30 cursor-not-allowed text-slate-400'
              : 'text-slate-700 dark:text-slate-200 hover:text-gold-600 hover:border-gold-400'
          }`}
        >
          <span>পরবর্তী অধ্যায়</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Step 21: Copyright & Translation Attribution Section */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-100/70 dark:bg-navy-900/60 border border-slate-200/80 dark:border-navy-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>অনুবাদ ও গ্রন্থস্বত্ব তথ্য: {activeTranslation.nameBn}</span>
          </div>
          <BibleTranslationAttribution translationId={activeTranslation.id} />
        </div>
        <p className="leading-relaxed">{activeTranslation.attributionBn}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] pt-1.5 border-t border-slate-200/50 dark:border-navy-800">
          <span>প্রকাশক: {activeTranslation.publisherBn}</span>
          <span>লাইসেন্স: {activeTranslation.licenseType}</span>
          {activeTranslation.licenseTermsUrl && (
            <a
              href={activeTranslation.licenseTermsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gold-600 dark:text-gold-400 hover:underline"
            >
              <span>লাইসেন্স বিবরণ</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Selected Verse Action Sheet */}
      {selectedVerse && (
        <VerseActionSheet
          verse={selectedVerse}
          bookNameBn={bookNameBn}
          isBookmarked={StorageService.isBookmarked(bookId, chapter, selectedVerse.verse)}
          activeHighlightColor={
            StorageService.getHighlightForVerse(bookId, chapter, selectedVerse.verse)?.color
          }
          hasNote={Boolean(StorageService.getNoteForVerse(bookId, chapter, selectedVerse.verse))}
          crossReferencesCount={selectedVerseCrossRefs.length}
          onToggleBookmark={() => handleToggleBookmark(selectedVerse)}
          onSetHighlight={(color) => handleSetHighlight(selectedVerse, color)}
          onOpenNoteModal={() => {
            setVerseForNote(selectedVerse);
            setIsNoteModalOpen(true);
          }}
          onOpenCrossReferences={() => {
            setIsCrossRefModalOpen(true);
          }}
          onReportConcern={() => {
            setReportingVerse(selectedVerse);
          }}
          onClose={() => {
            setSelectedVerse(null);
          }}
          useBengaliDigits={settings.bengaliNumerals}
        />
      )}

      {/* Personal Note Editor Modal */}
      {verseForNote && (
        <NoteEditorModal
          isOpen={isNoteModalOpen}
          onClose={() => {
            setIsNoteModalOpen(false);
            setVerseForNote(null);
          }}
          verse={verseForNote}
          bookNameBn={bookNameBn}
          existingNote={StorageService.getNoteForVerse(bookId, chapter, verseForNote.verse)}
          onSaveNote={handleSaveNote}
          onDeleteNote={handleDeleteNote}
          useBengaliDigits={settings.bengaliNumerals}
        />
      )}

      {/* Cross Reference Modal */}
      {selectedVerse && (
        <CrossReferenceModal
          isOpen={isCrossRefModalOpen}
          onClose={() => setIsCrossRefModalOpen(false)}
          sourceVerse={selectedVerse}
          bookNameBn={bookNameBn}
          crossReferences={selectedVerseCrossRefs}
          onNavigateToTarget={(tBook, tChap, tV) => {
            onNavigateChapter(tBook, tChap, tV);
            setSelectedVerse(null);
          }}
          useBengaliDigits={settings.bengaliNumerals}
        />
      )}

      {/* Context-Aware Problem & Correction Report Modal */}
      {reportingVerse && (
        <ReportProblemModal
          isOpen={true}
          onClose={() => setReportingVerse(null)}
          onSuccess={(feedback) => {
            setReportingVerse(null);
            setSelectedVerse(null);
            setFeedbackSuccessItem(feedback);
          }}
          bibleContext={{
            translationId: activeTranslation.id,
            bookId,
            bookNameBn: bookNameBn,
            chapter,
            verse: reportingVerse.verse,
            displayedText: reportingVerse.textBn,
            sourceCitation: `${activeTranslation.nameBn} (${activeTranslation.licenseType})`,
          }}
          module="Bible Reader"
          defaultCategory="BIBLE_TEXT_CONCERN"
        />
      )}

      {/* Feedback Submission Success Notification Modal */}
      {feedbackSuccessItem && (
        <FeedbackSuccessModal
          feedback={feedbackSuccessItem}
          onClose={() => setFeedbackSuccessItem(null)}
        />
      )}

      {/* Reader Modal for Knowledge Base Item */}
      <ResourceReaderModal
        resource={readingKnowledgeResource}
        isOpen={!!readingKnowledgeResource}
        onClose={() => setReadingKnowledgeResource(null)}
      />
    </div>
  );
};
