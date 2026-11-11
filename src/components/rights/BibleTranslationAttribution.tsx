import React, { useState } from 'react';
import { ShieldCheck, Info, X, ExternalLink, Check, Copy } from 'lucide-react';
import { RightsService } from '../../services/rightsService';
import { RightsBadge } from './RightsBadge';

interface BibleTranslationAttributionProps {
  translationId: string;
  className?: string;
}

export const BibleTranslationAttribution: React.FC<BibleTranslationAttributionProps> = ({
  translationId,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const transRights = RightsService.getBibleTranslationRights(translationId);
  const license = transRights ? RightsService.getLicense(transRights.licenseId) : undefined;

  if (!transRights) return null;

  const handleCopyAttribution = async () => {
    try {
      await navigator.clipboard.writeText(transRights.requiredAttributionBn);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      {/* Trigger Button / Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors bg-white/80 dark:bg-navy-900/80 border border-slate-200 dark:border-navy-700 hover:border-gold-400 text-slate-700 dark:text-slate-200 shadow-sm ${className}`}
        title="এই বাইবেল অনুবাদের স্বত্বাধিকার ও লাইসেন্স তথ্য"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
        <span className="font-semibold">{transRights.shortCode} স্বত্বাধিকার:</span>
        <RightsBadge status={transRights.rightsStatus} size="sm" showIcon={false} />
        <Info className="w-3 h-3 text-slate-400" />
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-navy-900 w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-navy-700 p-5 text-slate-800 dark:text-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-navy-950 dark:text-gold-300 text-base">
                    {transRights.translationNameBn}
                  </h3>
                  <p className="text-xs text-slate-400">{transRights.translationNameEn}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & License Banner */}
            <div className="my-4 p-3 rounded-2xl bg-slate-50 dark:bg-navy-950/70 border border-slate-100 dark:border-navy-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">স্বত্বাধিকার স্থিতি:</span>
                <RightsBadge status={transRights.rightsStatus} size="md" />
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block mb-0.5">লাইসেন্স কোড:</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {license?.licenseCode || 'N/A'}
                </span>
              </div>
            </div>

            {/* Provenance Metadata */}
            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800">
                <span className="text-slate-400">প্রকাশক ও স্বত্বাধিকারী:</span>
                <span className="font-medium text-right text-slate-700 dark:text-slate-200">{transRights.publisherBn}</span>
              </div>
              {transRights.translatorBn && (
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800">
                  <span className="text-slate-400">অনুবাদক:</span>
                  <span className="font-medium text-right text-slate-700 dark:text-slate-200">{transRights.translatorBn}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800">
                <span className="text-slate-400">সংস্করণ ও বছর:</span>
                <span className="font-medium text-right text-slate-700 dark:text-slate-200">{transRights.edition || transRights.copyrightYear}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800">
                <span className="text-slate-400">অনুমতি ও প্রকাশনা অনুমোদন:</span>
                <span className="font-medium text-right text-slate-700 dark:text-slate-200">
                  {transRights.permissionStatus === 'GRANTED'
                    ? '✅ সম্পূর্ণ অনুমোদিত ও প্রতিপাদিত'
                    : transRights.permissionStatus === 'NOT_REQUIRED'
                    ? '✅ সর্বজনীন সম্পত্তি (Public Domain)'
                    : transRights.permissionStatus === 'PARTIALLY_GRANTED'
                    ? '⚠️ সীমিত উদ্ধৃতি অনুমোদিত'
                    : '⏳ অনুমোদন প্রক্রিয়াধীন (পূর্ণ টেক্সট স্থগিত)'}
                </span>
              </div>
            </div>

            {/* Required Attribution Notice */}
            <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">বাধ্যতামূলক ঋণস্বীকার ও কপিরাইট নোটিশ:</span>
                <button
                  onClick={handleCopyAttribution}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 hover:underline font-medium"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
              <p className="font-sans leading-relaxed">{transRights.requiredAttributionBn}</p>
            </div>

            {/* Platform Role Clarification */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-[11px] text-slate-500 dark:text-slate-400">
              <p>
                <strong>প্ল্যাটফর্মের অবস্থান:</strong> বাংলা স্টাডি বাইবেল তৃতীয় পক্ষের কোনো বাইবেল অনুবাদের মালিকানা দাবি করে না। সকল অনুবাদের স্বত্ব মূল অনুবাদক, বাইবেল সোসাইটি বা প্রকাশকের নিকট সংরক্ষিত। প্ল্যাটফর্মের প্রতিষ্ঠাতা ও প্রস্তুতকারক <strong>রেভা. অয়ন কুমার ঘোষ</strong> কেবল ডিজিটাল সফটওয়্যার প্ল্যাটফর্ম ও স্টাডি আর্কিটেকচারের স্বত্বাধিকারী।
              </p>
            </div>

            {/* Official Source Link & Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
              {transRights.officialSourceUrl && (
                <a
                  href={transRights.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 hover:underline"
                >
                  <span>প্রকাশকের অফিশিয়াল তথ্য</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-navy-700 hover:bg-slate-300 dark:hover:bg-navy-600 font-medium text-xs transition-colors ml-auto"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
