// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার” (Deep Bengali Christian Knowledge Base)
// RESOURCE CARD COMPONENT (SECTION 10 COMPLIANT)
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import React from 'react';
import {
  BookOpen,
  Download,
  ExternalLink,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Tag,
  Clock,
  User,
  Info,
} from 'lucide-react';
import { DeepKnowledgeResource } from '../../types/deepKnowledgeBase';

interface ResourceCardProps {
  resource: DeepKnowledgeResource;
  onRead?: (resource: DeepKnowledgeResource) => void;
  onReportProblem?: (resource: DeepKnowledgeResource) => void;
  onSelectPassage?: (passageRef: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onRead,
  onReportProblem,
  onSelectPassage,
}) => {
  const canDownload = !!resource.downloadUrl && resource.redistributionPermission;
  const canRead = !!resource.fullContentBn && resource.status === 'APPROVED';

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Top Badges: Category, Tradition & Difficulty */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-900">
            {resource.categoryLabelBn}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-medium border border-purple-200 dark:border-purple-900">
            {resource.theologicalTradition}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px]">
            {resource.difficultyLabelBn}
          </span>
          {resource.isDisputedInterpretation && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-[10px] flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>বিকল্প মত বিদ্যমান</span>
            </span>
          )}
        </div>

        {/* Title & Author */}
        <div>
          <h3 className="text-base font-bold text-stone-900 dark:text-white leading-snug">
            {resource.bengaliTitle}
          </h3>
          {resource.originalTitle && (
            <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-0.5">
              {resource.originalTitle}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400 mt-1.5">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <strong className="text-stone-800 dark:text-stone-200">{resource.author}</strong>
            </span>
            <span>• {resource.publisherOrOrg} ({resource.publicationDate})</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-3 leading-relaxed">
          {resource.shortDescriptionBn}
        </p>

        {/* External Link Notice if applicable */}
        {resource.externalLinkNoticeBn && (
          <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{resource.externalLinkNoticeBn}</span>
          </div>
        )}

        {/* Relevant Bible Passages */}
        {resource.relevantBiblePassages.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-1">
            <span className="text-[10px] text-stone-400 font-semibold mr-1">সম্পর্কিত পদ:</span>
            {resource.relevantBiblePassages.slice(0, 4).map((p) => (
              <button
                key={p}
                onClick={() => onSelectPassage?.(p)}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
                title={`${p} অধ্যায়ে যান`}
              >
                {p}
              </button>
            ))}
            {resource.relevantBiblePassages.length > 4 && (
              <span className="text-[10px] text-stone-400 font-mono">
                +{resource.relevantBiblePassages.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer & Action Buttons */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3">
        {/* Licence & Review Date */}
        <div className="flex items-center justify-between text-[10px] text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1 truncate max-w-[220px]" title={resource.licenceName}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">{resource.licenceName}</span>
          </span>
          <span>যাচাই: {resource.reviewDate}</span>
        </div>

        {/* Button Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            {canRead && (
              <button
                onClick={() => onRead?.(resource)}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>পড়ুন</span>
              </button>
            )}

            {canDownload && (
              <a
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                title="আইনসম্মত উন্মুক্ত সংস্করণ ডাউনলোড করুন"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ডাউনলোড</span>
              </a>
            )}

            <a
              href={resource.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center gap-1 transition-all"
              title="মূল ওয়েবসাইটে যান"
            >
              <span>মূল সাইট</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>

          {/* Report Problem Button */}
          <button
            onClick={() => onReportProblem?.(resource)}
            className="p-1.5 text-stone-400 hover:text-amber-500 dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="এই উপাদান বা লাইসেন্স সংক্রান্ত সমস্যা জানান"
            aria-label="সমস্যা জানান"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
