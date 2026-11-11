import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X, ExternalLink, GraduationCap } from 'lucide-react';

interface ContextualHelpIconProps {
  titleBn: string;
  contentBn: string;
  lessonId?: string;
  onOpenLesson?: (lessonId: string) => void;
  className?: string;
}

export const ContextualHelpIcon: React.FC<ContextualHelpIconProps> = ({
  titleBn,
  contentBn,
  lessonId,
  onOpenLesson,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-flex items-center ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full text-slate-400 hover:text-gold-500 hover:bg-gold-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/40"
        title={`${titleBn} সম্পর্কিত নির্দেশনা`}
        aria-label="Help info"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-navy-900 rounded-2xl shadow-xl border border-slate-200 dark:border-navy-700 p-4 text-left z-50 animate-fadeIn text-slate-800 dark:text-slate-100 select-none">
          <div className="flex items-start justify-between border-b border-slate-100 dark:border-navy-800 pb-2 mb-2">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-navy-950 dark:text-gold-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-gold-500" />
              <span>{titleBn}</span>
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 font-sans">
            {contentBn}
          </p>

          {lessonId && onOpenLesson && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenLesson(lessonId);
              }}
              className="w-full py-1.5 px-3 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 text-gold-700 dark:text-gold-400 border border-gold-500/30 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>সম্পূর্ণ একাডেমি পাঠ দেখুন</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
