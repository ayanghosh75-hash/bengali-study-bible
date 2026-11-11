import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Flame,
  Church,
  Smile,
  Award,
  Compass,
  HeartHandshake,
  Calendar,
  Sliders,
  FileText,
} from 'lucide-react';
import {
  SermonAudience,
  SermonDuration,
  SavedSermon,
  SermonGenerationRequest,
} from '../types/sermon';
import {
  SermonService,
  SERMON_AUDIENCE_OPTIONS,
  SERMON_DURATION_OPTIONS,
  PassageValidationResult,
} from '../services/sermonService';
import { SermonStorageService } from '../services/sermonStorageService';
import { SermonEditor } from '../components/SermonEditor';
import { toBengaliDigits } from '../utils/bengaliNumerals';
import { AnalyticsService } from '../services/analyticsService';

interface SermonBuilderScreenProps {
  onNavigateToBible?: (bookId: string, chapter: number, verse?: number) => void;
  onOpenSavedSermons?: () => void;
  initialPassage?: string;
}

export const SermonBuilderScreen: React.FC<SermonBuilderScreenProps> = ({
  onNavigateToBible: _onNavigateToBible,
  onOpenSavedSermons,
  initialPassage = '',
}) => {
  // Wizard steps: 1: Passage, 2: Duration, 3: Audience, 4: Generating, 5: Editor
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    AnalyticsService.trackSermonBuilderOpen();
  }, []);

  // Form states
  const [passageInput, setPassageInput] = useState<string>(initialPassage || 'যোহন ৩:১৬');
  const [validation, setValidation] = useState<PassageValidationResult | null>(() =>
    initialPassage ? SermonService.validatePassage(initialPassage) : SermonService.validatePassage('যোহন ৩:১৬')
  );

  const [duration, setDuration] = useState<SermonDuration>('30');
  const [customDurationMinutes, setCustomDurationMinutes] = useState<number>(35);

  const [audience, setAudience] = useState<SermonAudience>('sunday_congregation');
  const [customAudienceText, setCustomAudienceText] = useState<string>('');

  // Generated Sermon
  const [currentSermon, setCurrentSermon] = useState<SavedSermon | null>(null);
  const [generationProgress, setGenerationProgress] = useState<string>('');
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Quick passage shortcuts
  const popularPassages = [
    { label: 'যোহন ৩:১৬', ref: 'যোহন ৩:১৬', desc: 'ঈশ্বরের প্রেম' },
    { label: 'রোমীয় ৮:২৮', ref: 'রোমীয় ৮:২৮', desc: 'ঈশ্বরের সার্বভৌমত্ব' },
    { label: 'গীতসংহিতা ২৩', ref: 'গীতসংহিতা ২৩', desc: 'উত্তম পালক' },
    { label: 'মথি ৫:১-১২', ref: 'মথি ৫:১-১২', desc: 'পর্বতের উপদেশ' },
    { label: 'ইফিষীয় ২:৮-১০', ref: 'ইফিষীয় ২:৮-১০', desc: 'অনুগ্রহে পরিত্রাণ' },
    { label: 'ফিলিপীয় ৪:৬-৭', ref: 'ফিলিপীয় ৪:৬-৭', desc: 'শান্তি ও প্রার্থনা' },
  ];

  const handlePassageChange = (val: string) => {
    setPassageInput(val);
    if (val.trim()) {
      const res = SermonService.validatePassage(val);
      setValidation(res);
    } else {
      setValidation(null);
    }
  };

  const handleSelectShortcut = (ref: string) => {
    setPassageInput(ref);
    const res = SermonService.validatePassage(ref);
    setValidation(res);
  };

  const handleNextStepFromPassage = () => {
    const res = SermonService.validatePassage(passageInput);
    setValidation(res);
    if (!res.isValid) {
      return;
    }
    setStep(2);
  };

  const handleNextStepFromDuration = () => {
    setStep(3);
  };

  const handleGenerate = () => {
    setStep(4);
    setGenerationError(null);
    setGenerationProgress('১. বাইবেল শাস্ত্রপদ ও প্রামাণিক পটভূমি যাচাই করা হচ্ছে...');
    AnalyticsService.trackSermonGenerateStart(passageInput, duration, audience);

    setTimeout(() => {
      setGenerationProgress('২. মূল ভাব (Big Idea) ও পদানুপদ শিক্ষণ কাঠামো প্রস্তুত হচ্ছে...');
    }, 500);

    setTimeout(() => {
      setGenerationProgress('৩. শ্রোতামণ্ডলী ও সময়সীমা অনুযায়ী বাস্তব দৃষ্টান্ত ও প্রয়োগ সাজানো হচ্ছে...');
    }, 1100);

    setTimeout(() => {
      try {
        const req: SermonGenerationRequest = {
          passage: passageInput,
          duration,
          customDurationMinutes: duration === 'custom' ? customDurationMinutes : undefined,
          audience,
          customAudienceText: audience === 'custom' ? customAudienceText : undefined,
        };

        const content = SermonService.generateSermon(req);
        const audienceOpt = SERMON_AUDIENCE_OPTIONS.find((a) => a.id === audience);
        const audienceLabel =
          audience === 'custom' && customAudienceText
            ? customAudienceText
            : audienceOpt?.labelBn || 'রবিবার মণ্ডলীর উপাসনা';

        const durMins =
          duration === 'custom' ? customDurationMinutes : parseInt(duration, 10);

        const newSermon: SavedSermon = {
          id: 'sermon_' + Date.now(),
          title: content.titleBn,
          passage: content.mainPassageBn,
          audience,
          audienceLabelBn: audienceLabel,
          duration,
          durationMinutes: durMins,
          content,
          fullMarkdownText: SermonService.toMarkdown(content),
          wordCount: SermonService.toMarkdown(content).split(/\s+/).length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Auto-save to My Sermons
        SermonStorageService.saveSermon(newSermon);
        AnalyticsService.trackSermonGenerateComplete(passageInput, duration, audience, newSermon.wordCount);

        setCurrentSermon(newSermon);
        setStep(5);
      } catch (err: any) {
        console.error('Generation error', err);
        setGenerationError(err.message || 'সার্মন তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        setStep(3);
      }
    }, 1800);
  };

  const handleSaveUpdatedSermon = (updated: SavedSermon) => {
    SermonStorageService.saveSermon(updated);
    AnalyticsService.trackSermonSaved(updated.id);
    setCurrentSermon(updated);
  };

  const getAudienceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Church':
        return <Church className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Smile':
        return <Smile className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  // If currently in Editor view (Step 5)
  if (step === 5 && currentSermon) {
    return (
      <SermonEditor
        initialSermon={currentSermon}
        onSave={handleSaveUpdatedSermon}
        onBack={() => setStep(1)}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/60 border border-gold-300 dark:border-gold-700/50 text-gold-900 dark:text-gold-300 text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>বাংলা সার্মন বিল্ডার • Bengali Sermon Builder</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight">
          সার্মন প্রস্তুতকরণ রূপরেখা
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-lg mx-auto">
          আপনার পঠিত শাস্ত্রাংশ নির্বাচন করুন, সময় ও শ্রোতামণ্ডলী নির্ধারণ করুন এবং কয়েক সেকেন্ডে সম্পূর্ণ সুসংহত সার্মন কাঠামো প্রস্তুত করুন।
        </p>

        {onOpenSavedSermons && (
          <div className="mt-3">
            <button
              onClick={onOpenSavedSermons}
              className="text-xs font-semibold text-gold-600 dark:text-gold-400 hover:underline inline-flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              আমার পূর্বে সংরক্ষিত সার্মনসমূহ দেখুন →
            </button>
          </div>
        )}
      </div>

      {/* 4-Step Wizard Stepper */}
      <div className="flex items-center justify-between mb-8 max-w-md mx-auto px-2">
        <div className="flex flex-col items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
              step >= 1
                ? 'bg-gold-500 text-navy-950 shadow-md shadow-gold-500/30'
                : 'bg-navy-100 dark:bg-navy-800 text-slate-400'
            }`}
          >
            ১
          </div>
          <span className="text-[11px] font-semibold mt-1 text-slate-600 dark:text-slate-300">
            শাস্ত্রপদ
          </span>
        </div>
        <div
          className={`h-0.5 flex-1 mx-2 transition ${
            step >= 2 ? 'bg-gold-500' : 'bg-navy-200 dark:bg-navy-800'
          }`}
        />
        <div className="flex flex-col items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
              step >= 2
                ? 'bg-gold-500 text-navy-950 shadow-md shadow-gold-500/30'
                : 'bg-navy-100 dark:bg-navy-800 text-slate-400'
            }`}
          >
            ২
          </div>
          <span className="text-[11px] font-semibold mt-1 text-slate-600 dark:text-slate-300">
            সময়সীমা
          </span>
        </div>
        <div
          className={`h-0.5 flex-1 mx-2 transition ${
            step >= 3 ? 'bg-gold-500' : 'bg-navy-200 dark:bg-navy-800'
          }`}
        />
        <div className="flex flex-col items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
              step >= 3
                ? 'bg-gold-500 text-navy-950 shadow-md shadow-gold-500/30'
                : 'bg-navy-100 dark:bg-navy-800 text-slate-400'
            }`}
          >
            ৩
          </div>
          <span className="text-[11px] font-semibold mt-1 text-slate-600 dark:text-slate-300">
            শ্রোতা
          </span>
        </div>
      </div>

      {generationError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>{generationError}</div>
        </div>
      )}

      {/* ================= STEP 1: ENTER BIBLE PASSAGE ================= */}
      {step === 1 && (
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-200/80 dark:border-navy-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-navy-950 dark:text-white mb-2">
              বাইবেল পদ বা অধ্যায় লিখুন (Bible Passage):
            </label>
            <div className="relative">
              <input
                type="text"
                value={passageInput}
                onChange={(e) => handlePassageChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNextStepFromPassage();
                }}
                placeholder="যেমন: যোহন ৩:১৬ বা John 3:16 বা রোমীয় ৮:২৮ বা গীতসংহিতা ২৩"
                className="w-full px-4 py-3.5 rounded-2xl text-base bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500 text-navy-950 dark:text-white font-medium placeholder-slate-400 shadow-inner"
              />
              <BookOpen className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
            </div>

            {/* Validation Feedback */}
            {validation && (
              <div className="mt-3">
                {validation.isValid ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">
                        শনাক্তকৃত শাস্ত্রাংশ: {validation.formattedRefBn} ({validation.formattedRefEn})
                      </div>
                      {validation.scriptureTextBn && (
                        <div className="mt-1 font-serif italic text-slate-700 dark:text-slate-300 line-clamp-2">
                          "{validation.scriptureTextBn}"
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>{validation.errorMessageBn}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              জনপ্রিয় প্রচার শাস্ত্রাংশ থেকে বেছে নিন:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {popularPassages.map((item) => (
                <button
                  key={item.ref}
                  onClick={() => handleSelectShortcut(item.ref)}
                  className={`p-2.5 rounded-xl text-left border transition text-xs ${
                    passageInput === item.ref
                      ? 'border-gold-500 bg-gold-50/60 dark:bg-gold-950/30 text-gold-900 dark:text-gold-200 font-bold'
                      : 'border-navy-100 dark:border-navy-800/80 bg-slate-50/50 dark:bg-navy-950/40 text-slate-700 dark:text-slate-300 hover:border-gold-300'
                  }`}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-[10px] text-slate-400">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNextStepFromPassage}
              disabled={!validation?.isValid}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 flex items-center gap-2 shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-98"
            >
              পরবর্তী ধাপ: সময়কাল নির্বাচন
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: CHOOSE SERMON LENGTH ================= */}
      {step === 2 && (
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-200/80 dark:border-navy-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-navy-950 dark:text-white mb-1 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-500" />
              সার্মনের সময়কাল নির্বাচন করুন (Sermon Duration)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              নির্বাচিত সময় অনুযায়ী সার্মনের গভীরতা, পয়েন্টের সংখ্যা ও বিস্তৃতি সমন্বয় করা হবে।
            </p>
          </div>

          <div className="space-y-3">
            {SERMON_DURATION_OPTIONS.map((opt) => {
              const isSelected = duration === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setDuration(opt.id)}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-gold-500 bg-gold-50/50 dark:bg-gold-950/30'
                      : 'border-navy-100 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/40 hover:border-gold-300'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold ${
                          isSelected
                            ? 'text-gold-900 dark:text-gold-200'
                            : 'text-navy-950 dark:text-white'
                        }`}
                      >
                        {opt.labelBn}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-navy-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
                        {opt.wordCountEstimate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {opt.scopeBn}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-gold-500 bg-gold-500 text-navy-950'
                        : 'border-slate-300 dark:border-navy-700'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Duration Input if selected */}
          {duration === 'custom' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                কাস্টম সময়কাল (মিনিট):
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={customDurationMinutes}
                onChange={(e) => setCustomDurationMinutes(parseInt(e.target.value, 10) || 30)}
                className="w-32 px-3 py-2 rounded-lg text-sm bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 text-navy-950 dark:text-white"
              />
            </div>
          )}

          {/* Buttons: Back / Next */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              পূর্ববর্তী
            </button>
            <button
              onClick={handleNextStepFromDuration}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 flex items-center gap-2 shadow-lg shadow-gold-500/20 transition transform active:scale-98"
            >
              পরবর্তী ধাপ: শ্রোতামণ্ডলী নির্বাচন
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: CHOOSE AUDIENCE ================= */}
      {step === 3 && (
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-200/80 dark:border-navy-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-navy-950 dark:text-white mb-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-gold-500" />
              শ্রোতামণ্ডলী নির্বাচন করুন (Target Audience)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              শ্রোতামণ্ডলীর ধরণ অনুযায়ী সার্মনের ভাষা, রূপক, উপমা ও বাস্তব প্রয়োগ সুনির্দিষ্ট হবে।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERMON_AUDIENCE_OPTIONS.map((opt) => {
              const isSelected = audience === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setAudience(opt.id)}
                  className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-gold-500 bg-gold-50/50 dark:bg-gold-950/30 shadow-sm'
                      : 'border-navy-100 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/40 hover:border-gold-300'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isSelected
                        ? 'bg-gold-500 text-navy-950'
                        : 'bg-navy-100 dark:bg-navy-800 text-slate-500 dark:text-slate-300'
                    }`}
                  >
                    {getAudienceIcon(opt.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-navy-950 dark:text-white">
                      {opt.labelBn}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {opt.descriptionBn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Audience Input */}
          {audience === 'custom' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                আপনার শ্রোতামণ্ডলীর প্রেক্ষাপট লিখুন:
              </label>
              <input
                type="text"
                value={customAudienceText}
                onChange={(e) => setCustomAudienceText(e.target.value)}
                placeholder="যেমন: মেডিক্যাল ছাত্র ও চিকিৎসক সমিতি"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 text-navy-950 dark:text-white"
              />
            </div>
          )}

          {/* Buttons: Back / Generate */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              পূর্ববর্তী
            </button>
            <button
              onClick={handleGenerate}
              className="px-7 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 flex items-center gap-2 shadow-xl shadow-gold-500/25 transition transform active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              সার্মন তৈরি করুন (Generate)
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: GENERATION LOADING ================= */}
      {step === 4 && (
        <div className="bg-white dark:bg-navy-900 rounded-3xl border border-navy-200/80 dark:border-navy-800 p-8 md:p-12 shadow-md text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 rounded-full border-4 border-gold-200 dark:border-gold-900/40 border-t-gold-500 animate-spin" />
            <Sparkles className="w-8 h-8 text-gold-500 absolute inset-0 m-auto animate-pulse" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-navy-950 dark:text-white mb-2">
              সার্মন কাঠামো প্রস্তুত হচ্ছে...
            </h3>
            <p className="text-sm text-gold-600 dark:text-gold-400 font-medium animate-pulse">
              {generationProgress}
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-slate-600 dark:text-slate-300 text-left space-y-1.5">
            <div>
              <strong>শাস্ত্রপদ:</strong> {passageInput}
            </div>
            <div>
              <strong>সময়কাল:</strong>{' '}
              {toBengaliDigits(
                duration === 'custom' ? customDurationMinutes : parseInt(duration, 10)
              )}{' '}
              মিনিট
            </div>
            <div>
              <strong>শ্রোতামণ্ডলী:</strong>{' '}
              {SERMON_AUDIENCE_OPTIONS.find((a) => a.id === audience)?.labelBn || 'সাধারণ উপাসনা'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
