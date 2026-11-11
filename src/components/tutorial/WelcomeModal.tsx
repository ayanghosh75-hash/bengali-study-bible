import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Check,
  X,
  Compass,
} from 'lucide-react';
import { UserPersonaId } from '../../types/tutorial';
import { USER_PERSONAS } from '../../data/tutorial/tutorialData';
import { TutorialService } from '../../services/tutorialService';

import { LogoSymbol } from '../brand/LogoSymbol';
import { DeepTutorialIntroduction } from './DeepTutorialIntroduction';
import { DeepTutorialAudioService } from '../../services/deepTutorialAudioService';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
  onOpenBible: (bookId: string, chapter: number, verse?: number) => void;
  onOpenAcademy: () => void;
  onOpenLicenses?: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onStartTour,
  onOpenBible,
  onOpenAcademy,
  onOpenLicenses,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<UserPersonaId>('bible_reader');

  if (!isOpen) return null;

  const currentPersona = USER_PERSONAS.find((p) => p.id === selectedPersona) || USER_PERSONAS[1];

  const handleStartTourClick = () => {
    DeepTutorialAudioService.stop();
    TutorialService.selectPersona(selectedPersona);
    onStartTour();
  };

  const handleStartReadingClick = () => {
    DeepTutorialAudioService.stop();
    TutorialService.selectPersona(selectedPersona);
    TutorialService.dismissTour();
    const target = currentPersona.recommendedStartingPassage;
    onOpenBible(target.bookId, target.chapter, target.verse);
    onClose();
  };

  const handleOpenAcademyClick = () => {
    DeepTutorialAudioService.stop();
    TutorialService.selectPersona(selectedPersona);
    TutorialService.dismissTour();
    onOpenAcademy();
    onClose();
  };

  const handleSkip = () => {
    DeepTutorialAudioService.stop();
    TutorialService.dismissTour();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Decorative Top Accent */}
        <div className="h-2 bg-gradient-to-r from-gold-400 via-amber-500 to-gold-600" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 dark:border-navy-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <LogoSymbol size={48} variant="default" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-700 dark:text-gold-400 border border-gold-500/20 text-[11px] font-semibold mb-1">
                <Sparkles className="w-3 h-3" />
                <span>পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                স্বাগতম বাংলা স্টাডি বাইবেলে!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                বাংলাভাষী বিশ্বাসী, গবেষক ও প্রচারকদের জন্য প্রস্তুতকৃত সম্পূর্ণ প্ল্যাটফর্ম
              </p>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
            title="বাদ দিন"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Deep's Spoken Greeting & Persona Selection */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Deep's Introduction Component */}
          <DeepTutorialIntroduction onOpenLicenses={onOpenLicenses} />

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              আপনার প্রধান অধ্যয়নের উদ্দেশ্য কোনটি?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              আপনার প্রয়োজন অনুযায়ী সবচেয়ে প্রাসঙ্গিক ফিচারগুলো তুলে ধরা হবে:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {USER_PERSONAS.map((persona) => {
                const isSelected = selectedPersona === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-gold-500 bg-gold-50/70 dark:bg-gold-950/20 text-navy-950 dark:text-white shadow-sm ring-2 ring-gold-500/20'
                        : 'border-slate-200 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-navy-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-navy-950 dark:text-white flex items-center gap-1.5">
                          {persona.titleBn}
                        </span>
                        {isSelected ? (
                          <span className="w-5 h-5 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-navy-800 text-slate-600 dark:text-slate-400">
                            {persona.badgeBn}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {persona.descriptionBn}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200/50 dark:border-navy-800/60 text-[11px] text-gold-700 dark:text-gold-400 font-medium">
                      প্রস্তাবিত পাঠ: {persona.recommendedStartingPassage.labelBn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Persona Highlight Card */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-navy-950/60 border border-amber-200/60 dark:border-navy-800 flex items-start gap-3">
            <Compass className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-navy-950 dark:text-white">আপনার জন্য বিশেষ কেন্দ্রবিন্দু: </strong>
              <span>{currentPersona.focusAreaBn}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer: Action Routes */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-navy-950/80 border-t border-slate-100 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleSkip}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-2 order-2 sm:order-1"
          >
            এখনই নয়, পরে দেখব
          </button>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end order-1 sm:order-2">
            <button
              onClick={handleOpenAcademyClick}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 hover:border-gold-500 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-navy-900 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <GraduationCap className="w-4 h-4 text-gold-500" />
              <span>একাডেমি টিউটোরিয়াল</span>
            </button>

            <button
              onClick={handleStartReadingClick}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-navy-700 hover:border-gold-500 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-navy-900 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-gold-500" />
              <span>সরাসরি বাইবেল পড়ুন</span>
            </button>

            <button
              onClick={handleStartTourClick}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-extrabold text-xs shadow-md shadow-gold-500/20 transition flex items-center justify-center gap-2 transform active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-navy-950 stroke-[2.5]" />
              <span>দ্রুত সফর শুরু করুন (২ মিনিট)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
