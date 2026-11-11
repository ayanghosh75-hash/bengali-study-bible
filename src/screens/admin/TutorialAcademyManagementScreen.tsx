import React, { useState } from 'react';
import {
  GraduationCap,
  RotateCcw,
  Copy,
} from 'lucide-react';
import { TutorialService } from '../../services/tutorialService';
import { TutorialRegistry } from '../../types/tutorial';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

export const TutorialAcademyManagementScreen: React.FC = () => {
  const [registry, setRegistry] = useState<TutorialRegistry>(() =>
    TutorialService.getTutorialRegistry()
  );
  const [activeSubTab, setActiveSubTab] = useState<'lessons' | 'faqs' | 'tour' | 'scenarios'>(
    'lessons'
  );
  const [copied, setCopied] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleResetToDefault = () => {
    if (
      confirm(
        'আপনি কি টিউটোরিয়াল ও একাডেমি ডেটাবেস সিস্টেম ডিফল্টে ফিরিয়ে নিতে চান? এতে সব সংরক্ষিত কাস্টমাইজেশন রিসেট হবে।'
      )
    ) {
      const reset = TutorialService.resetTutorialRegistryToDefault();
      setRegistry(reset);
      setSaveMessage('ডিফল্ট টিউটোরিয়াল রেজিস্ট্রি সফলভাবে রিস্টোর করা হয়েছে।');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(registry, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </span>
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              একাডেমি ও টিউটোরিয়াল কন্টেন্ট রেজিস্ট্রি
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              v{registry.version}
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            নবীন ব্যবহারকারী অনবোর্ডিং, ১২-ধাপের ট্যুর, ১০টি একাডেমি পাঠ এবং সহায়িকা FAQ নিয়ন্ত্রণ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyJson}
            className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'কপি হয়েছে!' : 'JSON কপি'}</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ডিফল্টে রিস্টোর</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 animate-fadeIn">
          {saveMessage}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500">একাডেমি পাঠ</span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            {toBengaliDigits(registry.lessons.length)} টি
          </div>
          <span className="text-[11px] text-emerald-600">১০০% প্রস্তুত</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500">ট্যুর ধাপ</span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            {toBengaliDigits(registry.tourSteps.length)} টি
          </div>
          <span className="text-[11px] text-gold-600">লাইভ স্পটলাইট</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500">সহায়িকা FAQ</span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            {toBengaliDigits(registry.faqs.length)} টি
          </div>
          <span className="text-[11px] text-sky-600">অনুসন্ধানযোগ্য</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs text-stone-500">পরিচর্যা দৃশ্যপট</span>
          <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            {toBengaliDigits(registry.scenarios.length)} টি
          </div>
          <span className="text-[11px] text-amber-600">মণ্ডলী কেন্দ্রিক</span>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-2 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('lessons')}
          className={`pb-2.5 px-3 border-b-2 transition ${
            activeSubTab === 'lessons'
              ? 'border-gold-500 text-gold-600 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          একাডেমি পাঠসমূহ ({registry.lessons.length})
        </button>
        <button
          onClick={() => setActiveSubTab('tour')}
          className={`pb-2.5 px-3 border-b-2 transition ${
            activeSubTab === 'tour'
              ? 'border-gold-500 text-gold-600 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          ট্যুর ধাপসমূহ ({registry.tourSteps.length})
        </button>
        <button
          onClick={() => setActiveSubTab('faqs')}
          className={`pb-2.5 px-3 border-b-2 transition ${
            activeSubTab === 'faqs'
              ? 'border-gold-500 text-gold-600 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          সহায়িকা প্রশ্নাবলী ({registry.faqs.length})
        </button>
      </div>

      {/* Content for Lessons */}
      {activeSubTab === 'lessons' && (
        <div className="space-y-3">
          {registry.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  পাঠ {lesson.numberBn}: {lesson.titleBn}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {toBengaliDigits(lesson.durationMinutes)} মিনিট
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">{lesson.subtitleBn}</p>
              <div className="text-[11px] text-stone-400 pt-1">
                ধাপ সংখ্যা: {toBengaliDigits(lesson.steps.length)} টি | ক্যাটাগরি: {lesson.category}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content for Tour Steps */}
      {activeSubTab === 'tour' && (
        <div className="space-y-3">
          {registry.tourSteps.map((step) => (
            <div
              key={step.id}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  ধাপ {toBengaliDigits(step.stepNumber)}: {step.titleBn}
                </span>
                <span className="text-xs text-gold-600 font-mono">{step.targetSelector}</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">{step.descriptionBn}</p>
            </div>
          ))}
        </div>
      )}

      {/* Content for FAQs */}
      {activeSubTab === 'faqs' && (
        <div className="space-y-3">
          {registry.faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {faq.questionBn}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  {faq.categoryLabelBn}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 pl-2 leading-relaxed">
                {faq.answerBn}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
