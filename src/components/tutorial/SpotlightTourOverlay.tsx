import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TourStep } from '../../types/tutorial';
import { TOUR_STEPS } from '../../data/tutorial/tutorialData';
import { toBengaliDigits } from '../../utils/bengaliNumerals';
import { NavTab } from '../BottomNav';

interface SpotlightTourOverlayProps {
  isOpen: boolean;
  currentStepIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onFinish: () => void;
  onSwitchTab: (tab: NavTab) => void;
  activeTab: NavTab;
}

export const SpotlightTourOverlay: React.FC<SpotlightTourOverlayProps> = ({
  isOpen,
  currentStepIndex,
  onNext,
  onPrevious,
  onSkip,
  onFinish,
  onSwitchTab,
  activeTab,
}) => {
  const currentStep: TourStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Switch tab if step belongs to another tab
  useEffect(() => {
    if (isOpen && currentStep.actionTab && currentStep.actionTab !== activeTab) {
      onSwitchTab(currentStep.actionTab);
    }
  }, [isOpen, currentStepIndex, currentStep.actionTab, activeTab, onSwitchTab]);

  // Measure and track target DOM element position
  useEffect(() => {
    if (!isOpen) return;

    const updateRect = () => {
      const el = document.querySelector(currentStep.targetSelector);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
        // Gently scroll target into view
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setTargetRect(null);
      }
    };

    // Small delay to allow tab/view to render
    const timer = setTimeout(updateRect, 150);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isOpen, currentStepIndex, currentStep.targetSelector, activeTab]);

  if (!isOpen) return null;

  const progressPercent = Math.round(((currentStepIndex + 1) / TOUR_STEPS.length) * 100);

  // Card positioning logic
  const getCardStyle = (): React.CSSProperties => {
    if (!targetRect) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed',
      };
    }

    const margin = 16;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const cardWidth = Math.min(380, windowWidth - 32);

    // Desktop/Tablet positioning relative to target
    let top = targetRect.bottom + margin;
    let left = targetRect.left;

    // Boundary adjust horizontal
    if (left + cardWidth > windowWidth - 16) {
      left = windowWidth - cardWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    // Boundary adjust vertical: if overflow bottom, place above
    if (top + 280 > windowHeight) {
      top = Math.max(16, targetRect.top - 280 - margin);
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      width: `${cardWidth}px`,
      position: 'fixed',
    };
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none animate-fadeIn select-none">
      {/* Dark overlay with spotlight cutout or translucent tint */}
      <div className="absolute inset-0 bg-navy-950/75 pointer-events-auto backdrop-blur-xs transition-opacity duration-300" />

      {/* Spotlight cutout border over the active element */}
      {targetRect && (
        <div
          className="fixed pointer-events-none rounded-2xl ring-4 ring-gold-400/90 shadow-[0_0_0_9999px_rgba(11,19,43,0.78)] transition-all duration-300 z-50"
          style={{
            top: `${Math.max(0, targetRect.top - 6)}px`,
            left: `${Math.max(0, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`,
          }}
        />
      )}

      {/* Floating Tour Card */}
      <div
        ref={cardRef}
        style={getCardStyle()}
        className="pointer-events-auto z-50 bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-gold-500/40 p-5 sm:p-6 text-slate-800 dark:text-slate-100 flex flex-col space-y-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header & Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-700 dark:text-gold-300 text-xs font-bold font-mono">
              ধাপ {toBengaliDigits(currentStep.stepNumber)} / {toBengaliDigits(TOUR_STEPS.length)}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">({progressPercent}%)</span>
          </div>

          <button
            onClick={onSkip}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
            title="সফর বন্ধ করুন"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-navy-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-gold-400 to-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="space-y-2">
          <h3 className="font-serif text-base sm:text-lg font-bold text-navy-950 dark:text-white leading-snug">
            {currentStep.titleBn}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentStep.descriptionBn}
          </p>

          {currentStep.tipBn && (
            <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-navy-950/60 border border-amber-200/60 dark:border-navy-800 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
              <span>{currentStep.tipBn}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-navy-800">
          <button
            onClick={onPrevious}
            disabled={isFirstStep}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>পূর্ববর্তী</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onSkip}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 px-2 py-1"
            >
              বাদ দিন
            </button>

            {isLastStep ? (
              <button
                onClick={onFinish}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center gap-1.5 transform active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>সম্পন্ন করুন</span>
              </button>
            ) : (
              <button
                onClick={onNext}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-bold text-xs shadow-md shadow-gold-500/20 transition flex items-center gap-1.5 transform active:scale-98"
              >
                <span>পরবর্তী</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
