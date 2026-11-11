import React, { useState } from 'react';
import {
  Clock,
  X,
  CheckCircle2,
  Printer,
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { DEVOTIONAL_ROUTINES } from '../../data/tutorial/tutorialData';
import { DevotionalRoutine } from '../../types/tutorial';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

interface DevotionChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBible: (bookId: string, chapter: number, verse?: number) => void;
}

export const DevotionChecklistModal: React.FC<DevotionChecklistModalProps> = ({
  isOpen,
  onClose,
  onOpenBible,
}) => {
  const [activeRoutineId, setActiveRoutineId] = useState<'quiet_time_15' | 'deep_study_30'>(
    'quiet_time_15'
  );
  const [completedStepOrders, setCompletedStepOrders] = useState<number[]>([]);

  if (!isOpen) return null;

  const currentRoutine: DevotionalRoutine =
    DEVOTIONAL_ROUTINES.find((r) => r.id === activeRoutineId) || DEVOTIONAL_ROUTINES[0];

  const handleToggleStep = (order: number) => {
    if (completedStepOrders.includes(order)) {
      setCompletedStepOrders(completedStepOrders.filter((o) => o !== order));
    } else {
      setCompletedStepOrders([...completedStepOrders, order]);
    }
  };

  const handleResetChecklist = () => {
    setCompletedStepOrders([]);
  };

  const handlePrint = () => {
    window.print();
  };

  const isAllComplete = completedStepOrders.length === currentRoutine.steps.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Accent */}
        <div className="h-2 bg-gradient-to-r from-gold-400 via-amber-500 to-gold-600" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gold-500/15 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-950 dark:text-white">
                দৈনিক আত্মিক খাদ্য ও স্টাডি চেকলিস্ট
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                সুসংগত আধ্যাত্মিক শৃঙ্খলা ও ফলপ্রসূ বাইবেল অধ্যয়নের গাইড
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
              title="চেকলিস্ট প্রিন্ট করুন"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Routine Selector Tabs */}
        <div className="px-5 sm:px-6 pt-4 flex gap-2 border-b border-slate-100 dark:border-navy-800 pb-3">
          <button
            onClick={() => {
              setActiveRoutineId('quiet_time_15');
              setCompletedStepOrders([]);
            }}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeRoutineId === 'quiet_time_15'
                ? 'bg-navy-950 text-white dark:bg-gold-500 dark:text-navy-950 shadow-sm'
                : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-navy-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>১৫ মিনিটের নীরব সময় (Quiet Time)</span>
          </button>

          <button
            onClick={() => {
              setActiveRoutineId('deep_study_30');
              setCompletedStepOrders([]);
            }}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeRoutineId === 'deep_study_30'
                ? 'bg-navy-950 text-white dark:bg-gold-500 dark:text-navy-950 shadow-sm'
                : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-navy-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>৩০ মিনিটের গভীর শাস্ত্রানুশীলন</span>
          </button>
        </div>

        {/* Modal Body: Steps & Checklist */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Quote Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-navy-950/60 border border-amber-200/60 dark:border-navy-800 text-xs font-serif italic text-slate-700 dark:text-gold-300/90 text-center">
            {currentRoutine.quoteBn}
          </div>

          {/* Progress Summary */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-600 dark:text-slate-300">
              অগ্রগতি: {toBengaliDigits(completedStepOrders.length)} /{' '}
              {toBengaliDigits(currentRoutine.steps.length)} ধাপ সম্পন্ন
            </span>
            {completedStepOrders.length > 0 && (
              <button
                onClick={handleResetChecklist}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 text-[11px]"
              >
                <RotateCcw className="w-3 h-3" />
                <span>রিসেট করুন</span>
              </button>
            )}
          </div>

          {/* Step Cards with interactive check */}
          <div className="space-y-3">
            {currentRoutine.steps.map((step) => {
              const isChecked = completedStepOrders.includes(step.order);
              return (
                <div
                  key={step.order}
                  onClick={() => handleToggleStep(step.order)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                      : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-800 hover:border-slate-300 dark:hover:border-navy-700 shadow-xs'
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition ${
                        isChecked
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'border-2 border-slate-300 dark:border-navy-600 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`font-serif font-bold text-sm ${
                          isChecked
                            ? 'text-emerald-900 dark:text-emerald-300 line-through opacity-80'
                            : 'text-navy-950 dark:text-white'
                        }`}
                      >
                        {step.titleBn}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 text-[11px] font-mono shrink-0">
                        {step.minuteLabel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {step.instructionsBn}
                    </p>

                    {step.sampleScriptureRefs && step.sampleScriptureRefs.length > 0 && (
                      <div className="pt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="text-slate-400">প্রস্তাবিত পাঠ:</span>
                        {step.sampleScriptureRefs.map((ref, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                              // Parse sample book (default JHN 15 or PSA 23)
                              onOpenBible('JHN', 15, 1);
                            }}
                            className="px-2 py-0.5 rounded-md bg-gold-50 dark:bg-navy-800 text-gold-700 dark:text-gold-400 border border-gold-200 dark:border-navy-700 hover:underline"
                          >
                            {ref}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Celebration banner */}
          {isAllComplete && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 text-center space-y-1 animate-fadeIn">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                🎉 প্রশংসা ঈশ্বরের! আপনি আজকের আধ্যাত্মিক পাঠ সম্পন্ন করেছেন।
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                এই সত্যটি সারা দিন আপনার অন্তরে রাখুন এবং অন্যের জীবনে ঈশ্বরের অনুগ্রহের আলো ছড়িয়ে দিন।
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-navy-950/80 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            প্রস্তুতকারক: রেভা. অয়ন কুমার ঘোষ
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
            >
              বন্ধ করুন
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBible('JHN', 1, 1);
              }}
              className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>বাইবেল রিডারে যান</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
