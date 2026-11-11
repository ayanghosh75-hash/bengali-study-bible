import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, ExternalLink, BookOpen, User, FileText } from 'lucide-react';
import { RightsService } from '../../services/rightsService';
import { RightsBadge } from './RightsBadge';

interface SourceAttributionProps {
  resourceId: string;
  compact?: boolean;
  className?: string;
}

export const SourceAttribution: React.FC<SourceAttributionProps> = ({
  resourceId,
  compact = false,
  className = '',
}) => {
  const [citationStyle, setCitationStyle] = useState<'simple' | 'apa' | 'chicago' | 'mla'>('simple');
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!compact);

  const summary = RightsService.getProvenanceSummary(resourceId);

  if (!summary) return null;

  const citation = RightsService.generateCitation(resourceId.replace('res-', 'src-'), citationStyle);

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (compact && !isExpanded) {
    return (
      <div className={`flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-xs ${className}`}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            উৎস: {summary.titleBn}
          </span>
          <RightsBadge status={summary.rightsStatus} size="sm" />
        </div>
        <button
          onClick={() => setIsExpanded(true)}
          className="text-gold-600 dark:text-gold-400 hover:underline text-[11px] font-medium"
        >
          স্বত্বাধিকার ও সাইটেশন দেখুন
        </button>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 shadow-sm text-slate-800 dark:text-slate-200 text-xs ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-serif font-bold text-sm text-navy-950 dark:text-gold-300">
              {summary.titleBn}
            </h4>
            <RightsBadge status={summary.rightsStatus} size="sm" />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {summary.titleEn}
          </p>
        </div>
        {compact && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
          >
            সংক্ষেপ করুন
          </button>
        )}
      </div>

      {/* 3 Core Questions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
        {/* Question 1: Where did this come from? */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-100 dark:border-navy-800">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5 text-sky-500" />
            <span>উৎপত্তি ও উৎস</span>
          </div>
          <p className="font-medium text-slate-700 dark:text-slate-200 leading-snug">
            {summary.origin.publisher || summary.origin.sourceTitleBn}
          </p>
          {summary.origin.edition && (
            <p className="text-[10px] text-slate-400 mt-0.5">{summary.origin.edition}</p>
          )}
          {summary.origin.sourceUrl && (
            <a
              href={summary.origin.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-sky-600 dark:text-sky-400 hover:underline mt-1"
            >
              মূল উৎস লিঙ্ক <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>

        {/* Question 2: Who owns it? */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-100 dark:border-navy-800">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold mb-1">
            <User className="w-3.5 h-3.5 text-amber-500" />
            <span>স্বত্বাধিকারী</span>
          </div>
          <p className="font-medium text-slate-700 dark:text-slate-200 leading-snug">
            {summary.owner.nameBn}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {summary.owner.nameEn} ({summary.owner.rightsHolderType})
          </p>
          {summary.owner.contact && (
            <p className="text-[10px] text-slate-500 mt-0.5">যোগাযোগ: {summary.owner.contact}</p>
          )}
        </div>

        {/* Question 3: What are we allowed to do with it? */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-100 dark:border-navy-800">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold mb-1">
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>অনুমোদিত ব্যবহার</span>
          </div>
          <p className="font-medium text-slate-700 dark:text-slate-200 text-[11px]">
            {summary.licenseCode}
          </p>
          <div className="mt-1 space-y-0.5 text-[10px] text-slate-600 dark:text-slate-400">
            <div>পঠন ও প্রদর্শন: {summary.allowedUses.canDisplay ? '✅ অনুমোদিত' : '❌ সীমাবদ্ধ'}</div>
            <div>অফলাইন সংরক্ষণ: {summary.allowedUses.canOfflineStore ? '✅ অনুমোদিত' : '❌ নিষিদ্ধ'}</div>
            <div>এআই গবেষণা: {summary.allowedUses.canAIIngest ? '✅ অনুমোদিত' : '❌ নিষিদ্ধ'}</div>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 text-amber-900 dark:text-amber-200 mb-3">
        <span className="font-semibold">স্বত্বাধিকার বিজ্ঞপ্তি: </span>
        <span>{summary.owner.copyrightNoticeBn}</span>
      </div>

      {/* Academic Citation Generator */}
      <div className="pt-2 border-t border-slate-100 dark:border-navy-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px]">সাইটেশন শৈলী:</span>
            {(['simple', 'apa', 'chicago', 'mla'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setCitationStyle(style)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  citationStyle === style
                    ? 'bg-gold-500 text-navy-950 font-bold'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {style.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyCitation}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>কপি সম্পন্ন!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>সাইটেশন কপি করুন</span>
              </>
            )}
          </button>
        </div>

        <div className="p-2 rounded-lg bg-slate-100 dark:bg-navy-950 text-[11px] font-mono text-slate-700 dark:text-slate-300 select-all break-words">
          {citation}
        </div>
      </div>
    </div>
  );
};
