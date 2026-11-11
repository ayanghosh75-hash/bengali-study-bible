// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// FEEDBACK, CORRECTION, SUGGESTION & SUPPORT SCREEN
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Support Email: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React, { useState } from 'react';
import {
  ShieldCheck,
  Send,
  Clock,
  CheckCircle2,
  Paperclip,
  X,
  ExternalLink,
  Laptop,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Smartphone,
  AlertTriangle,
} from 'lucide-react';
import { FeedbackCategory, FeedbackItem, FeedbackSubmissionPayload } from '../types/feedback';
import {
  PRIMARY_FEEDBACK_CARDS,
  PrimaryFeedbackCard,
  STATUS_LABELS,
  EMAIL_STATUS_LABELS,
} from '../data/feedback/feedbackCategoriesData';
import { FeedbackService } from '../services/feedbackService';
import FeedbackSuccessModal from '../components/feedback/FeedbackSuccessModal';
import { AnalyticsService } from '../services/analyticsService';

interface FeedbackScreenProps {
  initialCategory?: FeedbackCategory;
  onNavigate?: (tab: string, params?: Record<string, any>) => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  initialCategory,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');
  const [selectedCard, setSelectedCard] = useState<PrimaryFeedbackCard>(() => {
    if (initialCategory) {
      const found = PRIMARY_FEEDBACK_CARDS.find((c) => c.category === initialCategory);
      if (found) return found;
    }
    return PRIMARY_FEEDBACK_CARDS[0];
  });

  // Form State
  const [subcategory, setSubcategory] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [countryRegion, setCountryRegion] = useState<string>('');
  const [ministryType, setMinistryType] = useState<string>('');
  const [rating, setRating] = useState<number>(5);

  // Bible Context Form State
  const [bookNameBn, setBookNameBn] = useState<string>('');
  const [chapterNum, setChapterNum] = useState<string>('');
  const [verseNum, setVerseNum] = useState<string>('');
  const [translationId, setTranslationId] = useState<string>('irv-ben');
  const [currentText, setCurrentText] = useState<string>('');
  const [suggestedText, setSuggestedText] = useState<string>('');

  // Attachments & Consents
  const [screenshotBase64, setScreenshotBase64] = useState<string | undefined>(undefined);
  const [screenshotName, setScreenshotName] = useState<string | undefined>(undefined);
  const [consentForTestimonial, setConsentForTestimonial] = useState<boolean>(false);
  const [allowCorrectionCredit, setAllowCorrectionCredit] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<string>('');

  // UI States
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedItem, setSubmittedItem] = useState<FeedbackItem | null>(null);

  // History State
  const [historyItems, setHistoryItems] = useState<FeedbackItem[]>([]);
  const [historySearchQuery, setHistorySearchQuery] = useState<string>('');

  // Technical diagnostics
  const techContext = FeedbackService.captureTechnicalContext('/feedback');

  const handleCardSelect = (card: PrimaryFeedbackCard) => {
    setSelectedCard(card);
    setSubcategory(card.subcategories[0] || '');
    setErrorMessage(null);
  };

  const handleTabSwitch = (tab: 'submit' | 'history') => {
    setActiveTab(tab);
    if (tab === 'history') {
      setHistoryItems(FeedbackService.getUserFeedbackHistory());
    }
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setErrorMessage('ফাইলের আকার সর্বোচ্চ ৩ মেগাবাইট (3MB) হতে পারে।');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotBase64(reader.result as string);
      setScreenshotName(file.name);
      setErrorMessage(null);
    };
    reader.onerror = () => {
      setErrorMessage('ছবি আপলোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    };
    reader.readAsDataURL(file);
  };

  const handleClearScreenshot = () => {
    setScreenshotBase64(undefined);
    setScreenshotName(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!subject.trim() || subject.trim().length < 3) {
      setErrorMessage('অনুগ্রহ করে একটি স্পষ্ট বিষয় (Subject) উল্লেখ করুন (কমপক্ষে ৩ হরফ)।');
      return;
    }

    if (!description.trim() || description.trim().length < 5) {
      setErrorMessage('অনুগ্রহ করে বিস্তারিত বিবরণ লিখুন (কমপক্ষে ৫ হরফ)।');
      return;
    }

    setSubmitting(true);

    try {
      const payload: FeedbackSubmissionPayload = {
        category: selectedCard.category,
        subcategory: subcategory || undefined,
        subject: subject.trim(),
        description: description.trim(),
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        module: 'Feedback Portal',
        pageUrl: '/feedback',
        screenshotBase64,
        screenshotName,
        rating: selectedCard.category === 'USER_REVIEW' ? rating : undefined,
        ministryType: ministryType || undefined,
        countryRegion: countryRegion.trim() || undefined,
        consentForTestimonial,
        allowCorrectionCredit,
        honeypot,
      };

      // If Bible context exists
      if (bookNameBn.trim() || chapterNum) {
        payload.bibleContext = {
          translationId,
          bookId: bookNameBn.trim(),
          bookNameBn: bookNameBn.trim(),
          chapter: parseInt(chapterNum, 10) || 1,
          verse: verseNum ? parseInt(verseNum, 10) : undefined,
          displayedText: currentText.trim()
            ? `বর্তমান: ${currentText.trim()}${suggestedText.trim() ? ` | প্রস্তাবিত: ${suggestedText.trim()}` : ''}`
            : undefined,
        };
      }

      const res = await FeedbackService.submitFeedback(payload);

      if (res.success && res.feedback) {
        setSubmittedItem(res.feedback);
        AnalyticsService.trackFeedbackSubmit(selectedCard.category, rating);
        // Reset inputs
        setSubject('');
        setDescription('');
        setCountryRegion('');
        setScreenshotBase64(undefined);
        setScreenshotName(undefined);
        setCurrentText('');
        setSuggestedText('');
        setBookNameBn('');
        setChapterNum('');
        setVerseNum('');
        setConsentForTestimonial(false);
        setAllowCorrectionCredit(false);
      } else {
        setErrorMessage(res.error || 'আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err: any) {
      setErrorMessage('কারিগরি ত্রুটির কারণে জমা দেওয়া যায়নি: ' + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  const filteredHistory = historyItems.filter((item) => {
    if (!historySearchQuery.trim()) return true;
    const query = historySearchQuery.toLowerCase();
    return (
      item.referenceNumber.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-stone-50 to-amber-50/20 text-stone-800 pb-20">
      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 border-b border-amber-900/40 px-4 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                অফিসিয়াল ফিডব্যাক ও সহায়তা পোর্টাল
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
                বাংলা স্টাডি বাইবেল • মতামত ও সংশোধন
              </h1>
              <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                পবিত্র শাস্ত্রের বিশুদ্ধতা রক্ষা, অধ্যয়নকে আরও সমৃদ্ধ করা এবং কারিগরি ত্রুটি নিরসনে আপনার যেকোনো গঠনমূলক মতামত বা সংশোধন আমাদের কাছে অমূল্য।
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-stone-800/80 border border-stone-700 text-xs text-stone-300 space-y-1">
              <div className="font-semibold text-amber-400 flex items-center gap-1">
                <span>প্রতিষ্ঠাতা ও ডেভেলপার:</span>
              </div>
              <p className="text-white font-medium">Rev. Ayan Kumar Ghosh</p>
              <div className="text-stone-400 text-[11px] pt-1 border-t border-stone-700">
                ইমেইল: <a href="mailto:ayanghosh75@gmail.com" className="text-amber-300 underline">ayanghosh75@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 mt-6 border-b border-stone-700/60 pb-1">
            <button
              onClick={() => handleTabSwitch('submit')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'submit'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Send className="w-4 h-4" />
              নতুন আবেদন / মতামত জানান
            </button>
            <button
              onClick={() => handleTabSwitch('history')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Clock className="w-4 h-4" />
              আমার প্রেরিত আবেদনসমূহ
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'submit' ? (
          <div>
            {/* Step 1: Select Category */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                    ১. কী বিষয়ে জানাতে চান? (ক্যাটাগরি নির্বাচন করুন)
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600">
                    নিচের উপযুক্ত কার্ডটি নির্বাচন করলে নিচের ফরমটি সেই অনুযায়ী প্রস্তুত হবে
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {PRIMARY_FEEDBACK_CARDS.map((card) => {
                  const isSelected = selectedCard.id === card.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleCardSelect(card)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-400/40 transform -translate-y-0.5'
                          : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/80 shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{card.icon}</span>
                          {isSelected && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                              নির্বাচিত
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-sm text-stone-900 mb-1">{card.titleBn}</h3>
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {card.descriptionBn}
                        </p>
                      </div>
                      <div className="text-[10px] text-stone-400 mt-2 font-mono">{card.titleEn}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Smart Context Banners */}
            {selectedCard.category === 'INSTALLATION_PROBLEM' && (
              <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold mb-1">আইফোন (iOS Safari) বা অ্যান্ড্রয়েডে ইনস্টলেশন দরকার?</p>
                  <p className="text-blue-800">
                    আইফোনে সাফারির নিচের শেয়ার বোতাম (Share Sheet) চেপে <strong className="font-medium">"Add to Home Screen"</strong> নির্বাচন করুন। অ্যান্ড্রয়েডে ক্রোম ব্রাউজারের ৩-ডট মেনু থেকে <strong className="font-medium">"Install App"</strong> চাপুন। বিস্তারিত দেখতে আমাদের{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('install')}
                      className="underline font-semibold hover:text-blue-950 inline-flex items-center gap-1"
                    >
                      ইনস্টলেশন গাইড দেখুন <ExternalLink className="w-3 h-3" />
                    </button>
                  </p>
                </div>
              </div>
            )}

            {selectedCard.category === 'SOURCE_CORRECTION' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold mb-1">কপিরাইট ও লাইসেন্স সংক্রান্ত বিশেষ অনুসন্ধান?</p>
                  <p className="text-emerald-800">
                    আমাদের ওপেন-লাইসেন্স পলিসি ও ডিজিটাল লাইসেন্স সংক্রান্ত নির্দিষ্ট প্রশ্ন বা দাবির জন্য আপনি সরাসরি আমাদের{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('copyright_concern')}
                      className="underline font-semibold hover:text-emerald-950 inline-flex items-center gap-1"
                    >
                      কপিরাইট অনুসন্ধান ও কনসার্ন পেজ <ExternalLink className="w-3 h-3" />
                    </button>{' '}
                    ব্যবহার করতে পারেন।
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Adaptive Form */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-100">
                <span className="text-2xl">{selectedCard.icon}</span>
                <div>
                  <h2 className="text-lg font-bold text-stone-900 font-serif">
                    ২. বিবরণের ফরম: {selectedCard.titleBn}
                  </h2>
                  <p className="text-xs text-stone-500">
                    অনুগ্রহ করে নিচের তথ্যগুলো পূরণ করুন। রেফারেন্স নম্বরটি সংরক্ষণ করবেন।
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-3 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot for spam bots */}
                <input
                  type="text"
                  name="website_url_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Subcategory */}
                {selectedCard.subcategories.length > 0 && (
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                      নির্দিষ্ট বিষয় / উপ-বিভাগ
                    </label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      {selectedCard.subcategories.map((sub, idx) => (
                        <option key={idx} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Subject */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                    আবেদনের বিষয় <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="উদা: মথি ২৬:১৪ পদের অনুবাদের একটি শব্দের বিষয়ে স্পষ্টীকরণ"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                {/* Bible Specific Context Fields */}
                {(selectedCard.category === 'BIBLE_TEXT_CONCERN' ||
                  selectedCard.category === 'CONTENT_CORRECTION') && (
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      বাইবেলের নির্দিষ্ট পদ / তথ্য নির্দেশিকা (ঐচ্ছিক কিন্তু সহায়ক)
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-stone-600 mb-1">বাইবেলের বই</label>
                        <input
                          type="text"
                          value={bookNameBn}
                          onChange={(e) => setBookNameBn(e.target.value)}
                          placeholder="উদা: মথি, আদিপুস্তক"
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-600 mb-1">অধ্যায় নম্বর</label>
                        <input
                          type="number"
                          value={chapterNum}
                          onChange={(e) => setChapterNum(e.target.value)}
                          placeholder="উদা: ২৬"
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-600 mb-1">পদ / শ্লোক নম্বর</label>
                        <input
                          type="number"
                          value={verseNum}
                          onChange={(e) => setVerseNum(e.target.value)}
                          placeholder="উদা: ১৪"
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-600 mb-1">অনুবাদ সংস্করণ</label>
                        <select
                          value={translationId}
                          onChange={(e) => setTranslationId(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs"
                        >
                          <option value="irv-ben">IRV বাংলা (CC BY-SA 4.0)</option>
                          <option value="bsi-ov">BSI ওল্ড ভার্সন</option>
                          <option value="carey-1809">কেরী ১৮০৯</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs text-stone-600 mb-1">বর্তমানে যা দেখাচ্ছে</label>
                        <textarea
                          rows={2}
                          value={currentText}
                          onChange={(e) => setCurrentText(e.target.value)}
                          placeholder="বর্তমানে অ্যাপে যে বাক্যটি দেখতে পাচ্ছেন..."
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-stone-600 mb-1">আপনার প্রস্তাবিত সঠিক পাঠ</label>
                        <textarea
                          rows={2}
                          value={suggestedText}
                          onChange={(e) => setSuggestedText(e.target.value)}
                          placeholder="আপনার মতে সঠিক বা স্পষ্ট রূপটি কী হওয়া উচিত..."
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-amber-800/80 italic">
                      ⚠️ নীতিগত সতর্কতা: কোনো ব্যবহারকারীর রিপোর্টের ভিত্তিতে পবিত্র শাস্ত্রের পদ স্বয়ংক্রিয়ভাবে পরিবর্তন করা হয় না। মূল পাঠ যাচাইয়ের পর সম্পাদকীয় দল অনুমোদন দিলে তবেই তা সংকলিত হয়।
                    </p>
                  </div>
                )}

                {/* Rating (for User Reviews) */}
                {selectedCard.category === 'USER_REVIEW' && (
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                      আপনার সামগ্রিক রেটিং (১ থেকে ৫ স্টার)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-2xl transition-transform hover:scale-110 ${
                            star <= rating ? 'text-amber-500' : 'text-stone-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="text-xs text-stone-500 ml-2">({rating} / ৫ স্টার)</span>
                    </div>
                  </div>
                )}

                {/* Ministry Type */}
                {selectedCard.category === 'MINISTRY_NEED' && (
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                      আপনার পরিচর্যার ক্ষেত্র
                    </label>
                    <select
                      value={ministryType}
                      onChange={(e) => setMinistryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">নির্বাচন করুন...</option>
                      <option value="Pastor / Church Leader">যাজক / মণ্ডলীয় পালক</option>
                      <option value="Sunday School Teacher">রবিবার স্কুলের শিক্ষক/শিক্ষিকা</option>
                      <option value="Youth Leader">যুব পরিচর্যাকারী</option>
                      <option value="Worship Leader">উপাসনা দল</option>
                      <option value="Theological Student">থিওলজি শিক্ষার্থী</option>
                      <option value="Personal Bible Study">ব্যক্তিগত গৃহ উপাসক</option>
                    </select>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                    বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="আপনার অভিজ্ঞতা, ত্রুটি বা গঠনমূলক পরামর্শের বিস্তারিত লিখুন যাতে আমাদের দল সহজে বুঝতে পারে..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <span className="text-[11px] text-stone-500">কমপক্ষে ৫টি হরফ প্রয়োজন।</span>
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                    স্ক্রিনশট বা ছবি সংযুক্ত করুন (ঐচ্ছিক, সর্বোচ্চ ৩ মেগাবাইট)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 transition-colors">
                      <Paperclip className="w-3.5 h-3.5 text-stone-500" />
                      ছবি নির্বাচন করুন
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotChange}
                        className="hidden"
                      />
                    </label>
                    {screenshotName && (
                      <div className="flex items-center gap-2 text-xs text-stone-700 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                        <span className="truncate max-w-[200px]">{screenshotName}</span>
                        <button
                          type="button"
                          onClick={handleClearScreenshot}
                          className="text-stone-400 hover:text-rose-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  {screenshotBase64 && (
                    <div className="mt-3">
                      <img
                        src={screenshotBase64}
                        alt="Screenshot Preview"
                        className="max-h-40 rounded-lg border border-stone-300 shadow-sm"
                      />
                    </div>
                  )}
                </div>

                {/* User Info (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                      আপনার নাম (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="উদা: পা. অসীম রায়"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                      ইমেইল ঠিকানা (স্ট্যাটাস আপডেট পেতে)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="youremail@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-stone-700 mb-1.5">
                      দেশ / অঞ্চল (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={countryRegion}
                      onChange={(e) => setCountryRegion(e.target.value)}
                      placeholder="উদা: ভারত, বাংলাদেশ, UK, USA"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Consents (Both Default to False) */}
                <div className="pt-2 space-y-2 text-xs text-stone-700">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consentForTestimonial}
                      onChange={(e) => setConsentForTestimonial(e.target.checked)}
                      className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 mt-0.5"
                    />
                    <span>
                      আমার মন্তব্যটি বাংলা স্টাডি বাইবেলের টেস্টমোনিয়াল/সাক্ষ্য হিসেবে ব্যবহার করার সম্মতি দিচ্ছি (নাম প্রকাশে আপত্তি নেই)।
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={allowCorrectionCredit}
                      onChange={(e) => setAllowCorrectionCredit(e.target.checked)}
                      className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 mt-0.5"
                    />
                    <span>
                      সংশোধন গৃহীত হলে ভবিষ্যতের কৃতজ্ঞতা তালিকায় আমার নাম অন্তর্ভুক্ত করার অনুমতি দিচ্ছি।
                    </span>
                  </label>
                </div>

                {/* Technical Context Accordion */}
                <div className="pt-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setShowDiagnostics(!showDiagnostics)}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>কারিগরি তথ্য স্বয়ংক্রিয়ভাবে যুক্ত হবে (গোপনীয়তা সুরক্ষিত)</span>
                    {showDiagnostics ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {showDiagnostics && (
                    <div className="mt-2 p-3 rounded-xl bg-stone-100 border border-stone-200 text-[11px] font-mono text-stone-600 space-y-1">
                      <div>ওএস: {techContext.osFamily}</div>
                      <div>ব্রাউজার: {techContext.browserFamily}</div>
                      <div>ডিভাইস ধরন: {techContext.screenCategory}</div>
                      <div>অ্যাপ সংস্করণ: {techContext.appVersion} ({techContext.pwaMode})</div>
                      <div>ইন্টারনেট সংযোগ: {techContext.isOnline ? 'সক্রিয় (Online)' : 'অফলাইন'}</div>
                      <div className="text-[10px] text-stone-400 pt-1 border-t border-stone-200">
                        * কোনো ব্যক্তিগত পাসওয়ার্ড বা সংবেদনশীল ফাইল সংগৃহীত হয় না।
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>জমা হচ্ছে এবং ইমেইল প্রস্তুত হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>জমা দিন ও রেফারেন্স পান</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-stone-500 mt-2">
                    প্রতিটি আবেদন সরাসরি আমাদের সুরক্ষিত ডেটাবেসে জমা হবে এবং প্রাতিষ্ঠানিক নোটিফিকেশন <span className="font-mono text-stone-700">ayanghosh75@gmail.com</span>-এ প্রেরিত হবে।
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Tab 2: User Submission History */
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-serif">
                  আমার প্রেরিত আবেদনসমূহ
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  আপনার এই ডিভাইসে জমা দেওয়া বিগত আবেদনসমূহের অগ্রগতি ও প্রতিক্রিয়া
                </p>
              </div>

              {historyItems.length > 0 && (
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={historySearchQuery}
                    onChange={(e) => setHistorySearchQuery(e.target.value)}
                    placeholder="রেফারেন্স বা বিষয় খুঁজুন..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {filteredHistory.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 text-center">
                <Clock className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-800 mb-1">
                  কোনো পূর্ববর্তী আবেদন পাওয়া যায়নি
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-6">
                  আপনি যদি সম্প্রতি কোনো আবেদন বা সংশোধন পাঠিয়ে থাকেন, তবে তা এখানে প্রদর্শিত হবে।
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('submit')}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
                >
                  একটি নতুন আবেদন জমা দিন
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((item) => {
                  const statusInfo = STATUS_LABELS[item.status] || {
                    bn: item.status,
                    badgeBg: 'bg-stone-100 border-stone-200',
                    color: 'text-stone-800',
                  };
                  const emailInfo = EMAIL_STATUS_LABELS[item.emailDelivery?.status || 'QUEUED'];

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-5"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {item.referenceNumber}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${statusInfo.badgeBg} ${statusInfo.color}`}
                          >
                            {statusInfo.bn}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400">
                          {new Date(item.createdAt).toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-1">
                        {item.subject}
                      </h3>
                      <p className="text-xs text-stone-600 mb-3 whitespace-pre-wrap leading-relaxed">
                        {item.description}
                      </p>

                      {/* Bible Context if available */}
                      {item.bibleContext && (
                        <div className="mb-3 p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950">
                          <span className="font-semibold">বাইবেল প্রসঙ্গ: </span>
                          <span>
                            {item.bibleContext.bookNameBn} {item.bibleContext.chapter}:
                            {item.bibleContext.verse || '১'} ({item.bibleContext.translationId})
                          </span>
                        </div>
                      )}

                      {/* Official Resolution or Feedback Response */}
                      {(item.resolutionSummary || item.userFacingResponse) && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 mb-3">
                          <div className="font-semibold text-emerald-800 flex items-center gap-1 mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>অফিসিয়াল উত্তর / মীমাংসা:</span>
                          </div>
                          {item.resolutionSummary && (
                            <p className="mb-1 font-medium">{item.resolutionSummary}</p>
                          )}
                          {item.userFacingResponse && (
                            <p className="italic text-emerald-900">{item.userFacingResponse}</p>
                          )}
                        </div>
                      )}

                      {/* Delivery Status Indicator */}
                      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                        <div className="flex items-center gap-1.5">
                          <span>ইমেইল ডিসপ্যাচ:</span>
                          <span className={`font-semibold ${emailInfo.color}`}>{emailInfo.bn}</span>
                        </div>
                        <div className="text-stone-400">
                          মডিউল: {item.module || 'Web'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Success Modal */}
      {submittedItem && (
        <FeedbackSuccessModal
          feedback={submittedItem}
          onClose={() => setSubmittedItem(null)}
          onViewHistory={() => {
            setSubmittedItem(null);
            setActiveTab('history');
          }}
        />
      )}
    </div>
  );
};

export default FeedbackScreen;
