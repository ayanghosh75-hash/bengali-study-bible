// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার” (Deep Bengali Christian Knowledge Base)
// RESOURCE READER & 28-FIELD METADATA MODAL
// Administrator: Rev. Ayan Kumar Ghosh (ayanghosh75@gmail.com)
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Info,
  ShieldCheck,
  Download,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  FileText,
  Calendar,
  User,
  Share2,
} from 'lucide-react';
import { DeepKnowledgeResource } from '../../types/deepKnowledgeBase';

interface ResourceReaderModalProps {
  resource: DeepKnowledgeResource | null;
  isOpen: boolean;
  onClose: () => void;
  onReportProblem?: (resource: DeepKnowledgeResource) => void;
}

export const ResourceReaderModal: React.FC<ResourceReaderModalProps> = ({
  resource,
  isOpen,
  onClose,
  onReportProblem,
}) => {
  const [showMetadata, setShowMetadata] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  const citationText = `${resource.author} (${resource.publicationDate}), "${resource.bengaliTitle}", ${resource.publisherOrOrg}. লাইসেন্স: ${resource.licenceName}. ${resource.originalUrl}`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {resource.categoryLabelBn} • {resource.theologicalTradition}
              </span>
              <h2 id="reader-modal-title" className="text-base sm:text-lg font-bold text-stone-900 dark:text-white line-clamp-1">
                {resource.bengaliTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMetadata(!showMetadata)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                showMetadata
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">২৮-দফা উৎস তথ্য</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Metadata Inspector Drawer if toggled */}
          {showMetadata && (
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>বাধ্যতামূলক ২৮-দফা উৎস ও লাইসেন্স রেকর্ড (Mandatory Source Record)</span>
                </h4>
                <button
                  onClick={handleCopyCitation}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 flex items-center gap-1"
                >
                  {copiedCitation ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCitation ? 'কপি হয়েছে!' : 'রেফারেন্স কপি'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-400">
                <div>১. বাংলা শিরোনাম: <strong className="text-stone-900 dark:text-white">{resource.bengaliTitle}</strong></div>
                <div>২. মূল শিরোনাম: <strong className="text-stone-900 dark:text-white">{resource.originalTitle || 'N/A'}</strong></div>
                <div>৩. লেখক: <strong className="text-stone-900 dark:text-white">{resource.author}</strong></div>
                <div>৪. অনুবাদক: <strong className="text-stone-900 dark:text-white">{resource.translator || 'N/A'}</strong></div>
                <div>৫. সম্পাদক: <strong className="text-stone-900 dark:text-white">{resource.editor || 'N/A'}</strong></div>
                <div>৬. প্রকাশক / সংস্থা: <strong className="text-stone-900 dark:text-white">{resource.publisherOrOrg}</strong></div>
                <div>৭. প্রকাশনার তারিখ: <strong className="text-stone-900 dark:text-white">{resource.publicationDate}</strong></div>
                <div>৮. উপাদানের ধরন: <strong className="text-stone-900 dark:text-white">{resource.resourceType}</strong></div>
                <div className="truncate">৯. মূল ইউআরএল: <a href={resource.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">{resource.originalUrl}</a></div>
                <div>১০. ডাউনলোড ইউআরএল: <strong className="text-stone-900 dark:text-white">{resource.downloadUrl ? 'উপলব্ধ' : 'অনুমোদিত নয়'}</strong></div>
                <div>১১. পরিদর্শনের তারিখ: <strong className="text-stone-900 dark:text-white">{resource.dateAccessed}</strong></div>
                <div>১২. ভাষা: <strong className="text-stone-900 dark:text-white">{resource.language}</strong></div>
                <div>১৩. লাইসেন্স: <strong className="text-emerald-600 dark:text-emerald-400">{resource.licenceName}</strong></div>
                <div>১৪. লাইসেন্স ইউআরএল: <a href={resource.licenceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">{resource.licenceUrl}</a></div>
                <div>১৫. কপিরাইট স্থিতি: <strong className="text-stone-900 dark:text-white">{resource.copyrightStatus}</strong></div>
                <div>১৬. পুনঃবিতরণ অনুমতি: <strong className={resource.redistributionPermission ? 'text-emerald-600' : 'text-rose-500'}>{resource.redistributionPermission ? 'অনুমোদিত' : 'নিষিদ্ধ'}</strong></div>
                <div>১৭. সম্পাদনা অনুমতি: <strong className="text-stone-900 dark:text-white">{resource.editingPermission ? 'অনুমোদিত' : 'সীমিত'}</strong></div>
                <div>১৮. বাণিজ্যিক ব্যবহার: <strong className="text-stone-900 dark:text-white">{resource.commercialUsePermission ? 'অনুমোদিত' : 'নিষিদ্ধ'}</strong></div>
                <div>১৯. কৃতজ্ঞতা স্বীকার আবশ্যক: <strong className="text-stone-900 dark:text-white">{resource.attributionRequirement ? 'হ্যাঁ' : 'না'}</strong></div>
                <div>২০. আবশ্যক কৃতজ্ঞতা বাক্য: <span className="italic text-stone-800 dark:text-stone-200">{resource.requiredAttributionWording}</span></div>
                <div>২১. ধর্মতাত্ত্বিক ধারা: <strong className="text-purple-600 dark:text-purple-400">{resource.theologicalTradition}</strong></div>
                <div>২২. সম্পর্কিত বাইবেল পদ: <strong className="text-stone-900 dark:text-white">{resource.relevantBiblePassages.join(', ') || 'সাধারণ'}</strong></div>
                <div>২৩. উদ্দেশ্যপ্রাপ্ত পাঠক: <strong className="text-stone-900 dark:text-white">{resource.intendedAudience.join(', ')}</strong></div>
                <div>২৪. উপযোগিতা সিদ্ধান্ত: <strong className="text-emerald-600">{resource.suitabilityDecision}</strong></div>
                <div>২৫. নিরীক্ষার তারিখ: <strong className="text-stone-900 dark:text-white">{resource.reviewDate}</strong></div>
                <div>২৬. নিরীক্ষক: <strong className="text-stone-900 dark:text-white">{resource.reviewer}</strong></div>
                <div className="col-span-1 sm:col-span-2">২৭. জানা সীমাবদ্ধতা: <span className="text-stone-800 dark:text-stone-200">{resource.knownLimitations.join('; ') || 'কোনো সীমাবদ্ধতা নেই'}</span></div>
                <div className="col-span-1 sm:col-span-2">২৮. লাইসেন্স প্রমাণ: <span className="text-stone-800 dark:text-stone-200">{resource.archivedLicenceEvidence}</span></div>
              </div>
            </div>
          )}

          {/* Disputed Interpretation Notice (Section 6 Requirement) */}
          {resource.isDisputedInterpretation && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-2xl space-y-2 text-xs text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4" />
                <span>ধর্মতাত্ত্বিক ব্যাখ্যার ভারসাম্য ও বিকল্প দৃষ্টিভঙ্গি (Theological Balance)</span>
              </div>
              <p>{resource.disputedDetailsBn}</p>
              {resource.alternativePerspectivesBn && resource.alternativePerspectivesBn.length > 0 && (
                <div className="mt-2 pt-2 border-t border-amber-200 dark:border-amber-900/60 space-y-1">
                  <strong className="block text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    স্বীকৃত বিকল্প দৃষ্টিভঙ্গিসমূহ:
                  </strong>
                  {resource.alternativePerspectivesBn.map((alt, i) => (
                    <div key={i} className="text-[11px] flex items-start gap-1.5">
                      <span>•</span>
                      <span>{alt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Full Text Content */}
          <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 leading-relaxed font-serif text-sm sm:text-base space-y-4 whitespace-pre-wrap">
            {resource.fullContentBn || resource.shortDescriptionBn}
          </div>

          {/* Attribution Box */}
          <div className="p-4 bg-stone-100 dark:bg-stone-950 rounded-2xl text-xs text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 space-y-1">
            <strong className="block text-stone-900 dark:text-white font-semibold">কৃতজ্ঞতা স্বীকার ও আইনি তথ্য:</strong>
            <p>{resource.requiredAttributionWording}</p>
            <p className="text-[11px]">লাইসেন্স: {resource.licenceName} • সংরক্ষিত উৎস: {resource.originalUrl}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleCopyCitation}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 flex items-center gap-1.5"
            >
              {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>উদ্ধৃতি কপি করুন</span>
            </button>
            {resource.downloadUrl && resource.redistributionPermission && (
              <a
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ডাউনলোড</span>
              </a>
            )}
            <a
              href={resource.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-300 flex items-center gap-1.5"
            >
              <span>মূল সাইটে দেখুন</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onReportProblem?.(resource)}
              className="px-3 py-1.5 text-xs text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>সমস্যা জানান</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-semibold"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
