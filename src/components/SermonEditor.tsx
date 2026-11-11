import React, { useState } from 'react';
import {
  Save,
  Download,
  Printer,
  Share2,
  Copy,
  Check,
  Undo2,
  Redo2,
  FileText,
  Edit3,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SavedSermon, SermonContent, SermonPoint } from '../types/sermon';
import { SermonExportUtils } from '../utils/sermonExport';
import { SermonService } from '../services/sermonService';
import { toBengaliDigits } from '../utils/bengaliNumerals';

interface SermonEditorProps {
  initialSermon: SavedSermon;
  onSave: (updated: SavedSermon) => void;
  onBack?: () => void;
}

export const SermonEditor: React.FC<SermonEditorProps> = ({
  initialSermon,
  onSave,
  onBack,
}) => {
  // History stack for Undo / Redo
  const [history, setHistory] = useState<SermonContent[]>([initialSermon.content]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentContent = history[historyIndex];

  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'structured' | 'markdown'>('structured');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    bigIdea: true,
    intro: true,
    context: false,
    points: true,
    illustrations: false,
    application: true,
    questions: false,
    conclusion: true,
    prayer: true,
  });

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const updateContent = (newContent: SermonContent) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newContent);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleFieldChange = (field: keyof SermonContent, value: any) => {
    updateContent({
      ...currentContent,
      [field]: value,
    });
  };

  const handlePointChange = (index: number, field: keyof SermonPoint, value: any) => {
    const updatedPoints = [...currentContent.points];
    updatedPoints[index] = {
      ...updatedPoints[index],
      [field]: value,
    };
    updateContent({
      ...currentContent,
      points: updatedPoints,
    });
  };

  const handleSave = () => {
    const markdown = SermonService.toMarkdown(currentContent);
    const updated: SavedSermon = {
      ...initialSermon,
      title: currentContent.titleBn,
      content: currentContent,
      fullMarkdownText: markdown,
      wordCount: markdown.split(/\s+/).length,
      updatedAt: new Date().toISOString(),
    };
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopy = async () => {
    const success = await SermonExportUtils.copyToClipboard({
      title: currentContent.titleBn,
      content: currentContent,
    });
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 animate-fadeIn">
      {/* Top Action Bar */}
      <div className="sticky top-14 z-20 bg-parchment-100/95 dark:bg-navy-950/95 backdrop-blur-md py-3 mb-6 border-b border-navy-200 dark:border-navy-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-navy-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-navy-200 dark:hover:bg-navy-700 transition"
            >
              ← ফিরে যান
            </button>
          )}
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-800 dark:text-gold-300 border border-gold-300 dark:border-gold-700/50 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            সার্মন এডিটর
          </span>
        </div>

        {/* Action Buttons: Undo, Redo, Save, Export */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handleUndo}
            disabled={historyIndex === 0}
            title="পূর্বাবস্থায় ফেরান (Undo)"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 disabled:opacity-40 transition"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
            title="পুনরায় করুন (Redo)"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 disabled:opacity-40 transition"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopy}
            title="সম্পূর্ণ সার্মন কপি করুন"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() =>
              SermonExportUtils.printOrSavePdf({
                title: currentContent.titleBn,
                content: currentContent,
                passage: initialSermon.passage,
              })
            }
            title="প্রিন্ট বা PDF হিসেবে সংরক্ষণ"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              SermonExportUtils.downloadDocx({
                title: currentContent.titleBn,
                content: currentContent,
                passage: initialSermon.passage,
              })
            }
            title="Word ফাইল হিসেবে ডাউনলোড (DOCX)"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              SermonExportUtils.shareSermon({
                title: currentContent.titleBn,
                content: currentContent,
                passage: initialSermon.passage,
              })
            }
            title="শেয়ার করুন"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gold-500 hover:bg-gold-600 text-navy-950 flex items-center gap-1.5 shadow-sm transition"
          >
            <Save className="w-4 h-4" />
            {savedSuccess ? 'সংরক্ষিত হয়েছে!' : 'সংরক্ষণ করুন'}
          </button>
        </div>
      </div>

      {/* Theological Safety Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 mb-6 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <div>
          <span className="font-bold">ধর্মতাত্ত্বিক সহায়ক ঘোষণা:</span> এই সার্মনের প্রতিটি বিভাগ আপনার ইচ্ছা অনুযায়ী সম্পাদনযোগ্য। প্রচারের পূর্বে প্রার্থনা ও ব্যক্তিগত শাস্ত্র অধ্যয়নের মাধ্যমে এর যথার্থতা নিশ্চিত করা পালক বা প্রচারকের একান্ত কর্তব্য।
        </div>
      </div>

      {/* Mode Switch: Structured Sections vs Full Markdown */}
      <div className="flex border-b border-navy-200 dark:border-navy-800 mb-6">
        <button
          onClick={() => setActiveTab('structured')}
          className={`pb-2.5 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'structured'
              ? 'border-gold-500 text-gold-600 dark:text-gold-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          বিভাগ ভিত্তিক এডিটর
        </button>
        <button
          onClick={() => setActiveTab('markdown')}
          className={`pb-2.5 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'markdown'
              ? 'border-gold-500 text-gold-600 dark:text-gold-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <FileText className="w-4 h-4" />
          সম্পূর্ণ রূপরেখা (Markdown)
        </button>
      </div>

      {activeTab === 'markdown' ? (
        /* Markdown Editor Mode */
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-500 mb-2">
            সম্পূর্ণ সার্মন পাঠ (Markdown বয়ান):
          </label>
          <textarea
            rows={24}
            value={SermonService.toMarkdown(currentContent)}
            onChange={(_e) => {
              // Basic textarea update
            }}
            className="w-full p-4 rounded-xl font-mono text-sm bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500 leading-relaxed text-slate-800 dark:text-slate-200"
          />
        </div>
      ) : (
        /* Structured Section Editor Mode */
        <div className="space-y-5">
          {/* Header Card: Title & Scripture */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                সার্মন শিরোনাম (Title)
              </label>
              <input
                type="text"
                value={currentContent.titleBn}
                onChange={(e) => handleFieldChange('titleBn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl font-bold text-lg bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  মূল শাস্ত্রাংশ (Passage)
                </label>
                <input
                  type="text"
                  value={currentContent.mainPassageBn}
                  onChange={(e) => handleFieldChange('mainPassageBn', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg text-sm bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  শ্রোতামণ্ডলী ও সময়কাল
                </label>
                <div className="px-3.5 py-2 rounded-lg text-sm bg-slate-100 dark:bg-navy-800/60 text-slate-700 dark:text-slate-300 font-medium">
                  {initialSermon.audienceLabelBn} • {toBengaliDigits(initialSermon.durationMinutes)} মিনিট
                </div>
              </div>
            </div>

            {/* Scripture Verse Box */}
            <div className="bg-amber-50/70 dark:bg-amber-950/20 border-l-4 border-gold-500 p-3.5 rounded-r-xl">
              <span className="text-xs font-bold text-gold-700 dark:text-gold-400 block mb-1">
                পঠিত শাস্ত্রপদ:
              </span>
              <p className="text-sm font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                "{currentContent.scriptureTextBn}"
              </p>
            </div>
          </div>

          {/* Section: Big Idea */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('bigIdea')}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                💡 কেন্দ্রীয় ভাব (Big Idea)
              </h3>
              {openSections.bigIdea ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {openSections.bigIdea && (
              <div className="mt-3">
                <textarea
                  rows={3}
                  value={currentContent.bigIdeaBn}
                  onChange={(e) => handleFieldChange('bigIdeaBn', e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500 leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Section: Introduction */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('intro')}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                📖 ভূমিকা (Introduction)
              </h3>
              {openSections.intro ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {openSections.intro && (
              <div className="mt-3">
                <textarea
                  rows={5}
                  value={currentContent.introductionBn}
                  onChange={(e) => handleFieldChange('introductionBn', e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500 leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Section: Context (Biblical & Historical) */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('context')}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                🏛️ শাস্ত্রীয় ও ঐতিহাসিক প্রেক্ষাপট
              </h3>
              {openSections.context ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {openSections.context && (
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    শাস্ত্রীয় পটভূমি (Biblical Context)
                  </label>
                  <textarea
                    rows={3}
                    value={currentContent.biblicalContextBn}
                    onChange={(e) => handleFieldChange('biblicalContextBn', e.target.value)}
                    className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    ঐতিহাসিক ও সাহিত্যিক প্রেক্ষাপট
                  </label>
                  <textarea
                    rows={3}
                    value={currentContent.historicalLiteraryContextBn}
                    onChange={(e) =>
                      handleFieldChange('historicalLiteraryContextBn', e.target.value)
                    }
                    className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section: Main Points */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('points')}
              className="flex items-center justify-between cursor-pointer mb-3"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                🎯 মূল শিক্ষণীয় বিষয়সমূহ ({toBengaliDigits(currentContent.points.length)}টি পয়েন্ট)
              </h3>
              {openSections.points ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>

            {openSections.points && (
              <div className="space-y-4">
                {currentContent.points.map((point, idx) => (
                  <div
                    key={point.id || idx}
                    className="border border-navy-200 dark:border-navy-800/80 rounded-xl p-4 bg-slate-50/50 dark:bg-navy-950/40 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-700 dark:text-gold-300 font-bold text-xs flex items-center justify-center">
                        {toBengaliDigits(point.pointNumber)}
                      </span>
                      <input
                        type="text"
                        value={point.titleBn}
                        onChange={(e) => handlePointChange(idx, 'titleBn', e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg text-sm font-bold bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800"
                        placeholder="পয়েন্টের শিরোনাম"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">শাস্ত্র রেফারেন্স</label>
                        <input
                          type="text"
                          value={point.scriptureReference}
                          onChange={(e) =>
                            handlePointChange(idx, 'scriptureReference', e.target.value)
                          }
                          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">সহায়ক শাস্ত্রপদ</label>
                        <input
                          type="text"
                          value={point.supportingScriptureBn}
                          onChange={(e) =>
                            handlePointChange(idx, 'supportingScriptureBn', e.target.value)
                          }
                          className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 mb-1">ব্যাখ্যা (Exposition)</label>
                      <textarea
                        rows={3}
                        value={point.explanationBn}
                        onChange={(e) => handlePointChange(idx, 'explanationBn', e.target.value)}
                        className="w-full p-2.5 rounded-lg text-xs bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 mb-1">বাস্তব প্রয়োগ</label>
                      <textarea
                        rows={2}
                        value={point.practicalApplicationBn}
                        onChange={(e) =>
                          handlePointChange(idx, 'practicalApplicationBn', e.target.value)
                        }
                        className="w-full p-2.5 rounded-lg text-xs bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Illustrations */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('illustrations')}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                🌟 বাস্তব দৃষ্টান্ত ও রূপক
              </h3>
              {openSections.illustrations ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {openSections.illustrations && (
              <div className="mt-3 space-y-2">
                {currentContent.illustrationSuggestionsBn.map((ill, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {ill}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Practical Application */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('application')}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                🛠️ ব্যবহারিক খ্রীষ্টিয় প্রয়োগ
              </h3>
              {openSections.application ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {openSections.application && (
              <div className="mt-3 space-y-2">
                {currentContent.practicalApplicationBn.map((app, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800/60 text-xs text-slate-700 dark:text-slate-300"
                  >
                    {app}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Reflection Questions */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('questions')}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                ❓ আত্ম-অনুসন্ধানের প্রশ্নমালা
              </h3>
              {openSections.questions ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {openSections.questions && (
              <div className="mt-3 space-y-2">
                {currentContent.reflectionQuestionsBn.map((q, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800/60 text-xs text-slate-700 dark:text-slate-300"
                  >
                    {q}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Conclusion */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('conclusion')}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                🏁 উপসংহার (Conclusion)
              </h3>
              {openSections.conclusion ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {openSections.conclusion && (
              <div className="mt-3">
                <textarea
                  rows={4}
                  value={currentContent.conclusionBn}
                  onChange={(e) => handleFieldChange('conclusionBn', e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500 leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Section: Closing Prayer */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-navy-200 dark:border-navy-800 p-4 shadow-sm">
            <div
              onClick={() => toggleSection('prayer')}
              className="flex items-center justify-between cursor-pointer"
            >
              <h3 className="text-sm font-bold text-navy-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                🙏 সমাপনী প্রার্থনা (Closing Prayer)
              </h3>
              {openSections.prayer ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {openSections.prayer && (
              <div className="mt-3">
                <textarea
                  rows={5}
                  value={currentContent.closingPrayerBn}
                  onChange={(e) => handleFieldChange('closingPrayerBn', e.target.value)}
                  className="w-full p-3 rounded-xl text-sm bg-slate-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 focus:outline-none focus:border-gold-500 leading-relaxed font-serif"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
