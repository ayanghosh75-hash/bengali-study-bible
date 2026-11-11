import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, FileText, Copy, Share2, X, Check, GitFork, FolderGit2, Flag } from 'lucide-react';
import { BibleVerse, HighlightColor } from '../types/bible';
import { formatVerseRef } from '../utils/bengaliNumerals';
import { WorkspaceService } from '../services/workspaceService';
import { AnalyticsService } from '../services/analyticsService';

interface VerseActionSheetProps {
  verse: BibleVerse | null;
  bookNameBn: string;
  isBookmarked: boolean;
  activeHighlightColor?: HighlightColor;
  hasNote: boolean;
  crossReferencesCount?: number;
  onToggleBookmark: () => void;
  onSetHighlight: (color: HighlightColor | null) => void;
  onOpenNoteModal: () => void;
  onOpenCrossReferences?: () => void;
  onReportConcern?: () => void;
  onClose: () => void;
  useBengaliDigits?: boolean;
}

export const VerseActionSheet: React.FC<VerseActionSheetProps> = ({
  verse,
  bookNameBn,
  isBookmarked,
  activeHighlightColor,
  hasNote,
  crossReferencesCount = 0,
  onToggleBookmark,
  onSetHighlight,
  onOpenNoteModal,
  onOpenCrossReferences,
  onReportConcern,
  onClose,
  useBengaliDigits = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [addedToProject, setAddedToProject] = useState(false);

  if (!verse) return null;

  const verseRefStr = formatVerseRef(bookNameBn, verse.chapter, verse.verse, useBengaliDigits);

  const handleAddToProject = () => {
    const projects = WorkspaceService.getProjects();
    let targetProj = projects[0];
    if (!targetProj) {
      targetProj = WorkspaceService.createProject({
        titleBn: 'সাধারণ বাইবেল গবেষণা',
        descriptionBn: 'ব্যক্তিগত শাস্ত্রাংশ ও ধর্মতাত্ত্বিক নোটের সংগ্রহশালা',
        category: 'theology',
        categoryNameBn: 'মৌলিক ধর্মতত্ত্ব',
      });
    }

    WorkspaceService.addVerseToProject(targetProj.id, {
      bookId: verse.bookId,
      bookNameBn,
      chapter: verse.chapter,
      verse: verse.verse,
      verseText: verse.textBn,
    });

    setAddedToProject(true);
    setTimeout(() => setAddedToProject(false), 2000);
  };

  const handleCopy = () => {
    const textToCopy = `${verseRefStr} — "${verse.textBn}"`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (!verse) return;
    const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
    const trackableUrl = AnalyticsService.buildTrackableShareUrl({
      targetRoute: `/bible?book=${verse.bookId}&chapter=${verse.chapter}&verse=${verse.verse}`,
      channel: hasNativeShare ? 'native' : 'copy_link',
      contentType: 'bible_verse',
      contentId: `${verse.bookId}.${verse.chapter}.${verse.verse}`,
    });
    const textToShare = `${verseRefStr} — "${verse.textBn}" (বাংলা স্টাডি বাইবেল)\n${trackableUrl}`;
    AnalyticsService.trackShareAction({
      channel: hasNativeShare ? 'native' : 'copy_link',
      contentType: 'bible_verse',
      contentTitle: verseRefStr,
      contentId: `${verse.bookId}.${verse.chapter}.${verse.verse}`,
      isCompleted: true,
    });
    if (hasNativeShare) {
      navigator.share({
        title: verseRefStr,
        text: textToShare,
        url: trackableUrl,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const highlightColors: { id: HighlightColor; name: string; bgClass: string }[] = [
    { id: 'gold', name: 'স্বর্ণালী', bgClass: 'bg-amber-400' },
    { id: 'green', name: 'সবুজ', bgClass: 'bg-emerald-400' },
    { id: 'blue', name: 'আকাশি', bgClass: 'bg-sky-400' },
    { id: 'rose', name: 'গোলাপী', bgClass: 'bg-rose-400' },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4 bg-navy-950/80 backdrop-blur-md animate-in slide-in-from-bottom duration-200">
      <div
        id="tour-verse-study-panel"
        className="max-w-xl mx-auto bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-700 overflow-hidden text-slate-800 dark:text-slate-100"
      >
        {/* Top bar with reference and close */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-navy-950/60 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between">
          <span className="font-serif font-bold text-navy-900 dark:text-gold-400 text-sm">
            {verseRefStr}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verse Preview Snippet */}
        <div className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2 border-b border-slate-100/80 dark:border-navy-800/80">
          "{verse.textBn}"
        </div>

        {/* Action Controls */}
        <div className="p-4 space-y-3.5">
          {/* 1. Highlights Bar */}
          <div id="tour-highlight-actions" className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              হাইলাইট:
            </span>
            <div className="flex items-center space-x-2">
              {highlightColors.map((c) => {
                const isActive = activeHighlightColor === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSetHighlight(isActive ? null : c.id)}
                    className={`w-7 h-7 rounded-full ${c.bgClass} flex items-center justify-center transition-transform ${
                      isActive
                        ? 'ring-2 ring-offset-2 ring-slate-700 dark:ring-white scale-110'
                        : 'hover:scale-105 opacity-85 hover:opacity-100'
                    }`}
                    title={c.name}
                  >
                    {isActive && <Check className="w-3.5 h-3.5 text-navy-950 stroke-[3]" />}
                  </button>
                );
              })}
              {activeHighlightColor && (
                <button
                  onClick={() => onSetHighlight(null)}
                  className="text-[11px] text-rose-500 hover:underline px-1.5 py-0.5"
                >
                  মুছুন
                </button>
              )}
            </div>
          </div>

          {/* 2. Action Buttons Grid (5 options) */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {/* Bookmark */}
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                isBookmarked
                  ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold'
                  : 'border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-gold-500" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span className="text-[10px] truncate">{isBookmarked ? 'বুকমার্কড' : 'বুকমার্ক'}</span>
            </button>

            {/* Note */}
            <button
              id="tour-note-editor"
              onClick={onOpenNoteModal}
              className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all relative ${
                hasNote
                  ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10 text-gold-600 dark:text-gold-300 font-bold'
                  : 'border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {hasNote && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gold-500" />
              )}
              <FileText className="w-4 h-4" />
              <span className="text-[10px] truncate">{hasNote ? 'নোট দেখুন' : 'নোট যোগ'}</span>
            </button>

            {/* Cross References */}
            {onOpenCrossReferences && (
              <button
                id="tour-cross-ref-tool"
                onClick={onOpenCrossReferences}
                className="p-2 rounded-xl border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 flex flex-col items-center justify-center gap-1 text-slate-700 dark:text-slate-300 transition-all relative group"
              >
                {crossReferencesCount > 0 && (
                  <span className="absolute top-1 right-1 px-1 rounded-full bg-gold-500 text-navy-950 font-bold text-[9px]">
                    {crossReferencesCount}
                  </span>
                )}
                <GitFork className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                <span className="text-[10px] truncate">সমান্তরাল</span>
              </button>
            )}

            {/* Add to Research Project */}
            <button
              onClick={handleAddToProject}
              className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                addedToProject
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300'
              }`}
              title="আমার স্টাডির রিসার্চ প্রজেক্টে যুক্ত করুন"
            >
              {addedToProject ? (
                <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
              ) : (
                <FolderGit2 className="w-4 h-4 text-purple-500" />
              )}
              <span className="text-[10px] truncate">{addedToProject ? 'যুক্ত হলো' : 'রিসার্চে যোগ'}</span>
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 flex flex-col items-center justify-center gap-1 text-slate-700 dark:text-slate-300 transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="text-[10px] truncate">{copied ? 'কপি!' : 'কপি পদ'}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 flex flex-col items-center justify-center gap-1 text-slate-700 dark:text-slate-300 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-[10px] truncate">শেয়ার</span>
            </button>
          </div>

          {/* Report Problem on Verse */}
          {onReportConcern && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onReportConcern}
                className="w-full py-1.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100/60 dark:hover:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs flex items-center justify-center gap-1.5 transition-colors"
                title="এই পদে কোনো ভুল বা অনুবাদ সমস্যা থাকলে জানান"
              >
                <Flag className="w-3.5 h-3.5 text-rose-500" />
                <span>⚑ এই পদে কোনো ভুল বা অনুবাদ অসঙ্গতি থাকলে জানান (রিপোর্ট)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
