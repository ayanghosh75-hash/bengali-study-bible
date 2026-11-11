// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// OWNER APPROVAL & EDITORIAL REVIEW MODAL
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Calendar,
  Share2,
  ExternalLink,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { SocialPost } from '../../types/social';
import { FacebookIntegrationService } from '../../services/social/facebookIntegrationService';
import { SocialService } from '../../services/social/socialService';
import { SocialCardCanvas } from './SocialCardCanvas';
import { FacebookIcon } from './FacebookLogo';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

interface OwnerApprovalModalProps {
  post: SocialPost | null;
  isOpen: boolean;
  onClose: () => void;
  onPostUpdated: (updatedPost: SocialPost) => void;
}

export const OwnerApprovalModal: React.FC<OwnerApprovalModalProps> = ({
  post,
  isOpen,
  onClose,
  onPostUpdated,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  const [showScheduleInput, setShowScheduleInput] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  if (!isOpen || !post) return null;

  const payload = FacebookIntegrationService.generateManualPublishPayload(post);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(payload.formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(post.fullDeepLinkUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleApprove = () => {
    const updated = SocialService.approvePost(post.id, 'Rev. Ayan Kumar Ghosh');
    if (updated) {
      onPostUpdated(updated);
      setActionSuccessMessage('পোস্টটি সফলভাবে অনুমোদিত হয়েছে!');
      setTimeout(() => setActionSuccessMessage(null), 3000);
    }
  };

  const handleRequestRevision = () => {
    if (!revisionNotes.trim()) return;
    const updated = SocialService.requestRevision(post.id, revisionNotes);
    if (updated) {
      onPostUpdated(updated);
      setShowRevisionInput(false);
      setRevisionNotes('');
      setActionSuccessMessage('সংশোধন নোট সংরক্ষণ করা হয়েছে।');
      setTimeout(() => setActionSuccessMessage(null), 3000);
    }
  };

  const handleSchedule = () => {
    if (!scheduleDateTime) return;
    const updated = SocialService.schedulePost(post.id, scheduleDateTime);
    if (updated) {
      onPostUpdated(updated);
      setShowScheduleInput(false);
      setActionSuccessMessage(`পোস্টটি ${scheduleDateTime} তারিখের জন্য শিডিউল করা হয়েছে।`);
      setTimeout(() => setActionSuccessMessage(null), 3000);
    }
  };

  const handleMarkPublished = () => {
    const updated = SocialService.markAsPublished(post.id, undefined, true);
    if (updated) {
      onPostUpdated(updated);
      setActionSuccessMessage('পোস্টটি ফেসবুকে প্রকাশিত হিসেবে চিহ্নিত করা হয়েছে!');
      setTimeout(() => setActionSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              দিন {toBengaliDigits(post.dayNumber)} • {post.dayOfWeek}
            </span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 hidden sm:inline">
              রিভিউ ও অনুমোদন ডেস্কে স্বাগত
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Toast / Success notification */}
          {actionSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-sm font-semibold">{actionSuccessMessage}</span>
            </div>
          )}

          {/* Title & Scripture Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>{post.scriptureReference}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {post.titleBn}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">{post.topicBn}</p>
          </div>

          {/* Grid: Canvas Preview & Content Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Visual 1080x1080 Card */}
            <div className="md:col-span-5 flex flex-col items-center bg-stone-50 dark:bg-stone-950/50 p-4 rounded-2xl border border-stone-200/70 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-3">
                সামাজিক মাধ্যমের জন্য ব্র্যান্ডেড ইমেজ
              </span>
              <SocialCardCanvas post={post} showDownloadButton={true} />

              {/* Rights Verification Pill */}
              <div className="mt-4 w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>কপিরাইট ও উৎস সত্যতা নিশ্চিত</span>
                </div>
                <div className="text-stone-600 dark:text-stone-400">
                  অনুবাদ: {post.sourceTranslation}
                </div>
                <div className="text-stone-500 dark:text-stone-500 text-[11px]">
                  পরিচালক: Rev. Ayan Kumar Ghosh
                </div>
              </div>
            </div>

            {/* Right Column: Complete Post Text Breakdown */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">
                  ফেসবুক পোস্ট টেক্সট প্রিভিউ
                </h3>
                <button
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">কপি সম্পন্ন</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>সম্পূর্ণ টেক্সট কপি করুন</span>
                    </>
                  )}
                </button>
              </div>

              {/* Formatted Text Box */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 max-h-[380px] overflow-y-auto text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans leading-relaxed whitespace-pre-wrap selection:bg-amber-500/30">
                {payload.formattedText}
              </div>

              {/* Deep Link & Tracking Info */}
              <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-900/40 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>ইউজার রিসার্চ ট্র্যাকিং ডিপ লিঙ্ক (UTM)</span>
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    {copiedLink ? 'কপি হয়েছে' : 'লিঙ্ক কপি'}
                  </button>
                </div>
                <div className="text-stone-500 dark:text-stone-400 truncate font-mono text-[11px]">
                  {post.fullDeepLinkUrl}
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Input: Revision Notes */}
          {showRevisionInput && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">
                সংশোধন বা পরিবর্তনের নির্দেশাবলী লিখুন:
              </h4>
              <textarea
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                placeholder="যেমন: মূল গ্রিক শব্দের ব্যাখ্যাটি আরও প্রাঞ্জল করুন..."
                className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowRevisionInput(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleRequestRevision}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white"
                >
                  নোট সেভ করুন
                </button>
              </div>
            </div>
          )}

          {/* Conditional Input: Scheduling Date */}
          {showScheduleInput && (
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-3">
              <h4 className="text-sm font-bold text-purple-800 dark:text-purple-300">
                প্রকাশের নির্দিষ্ট তারিখ ও সময় নির্বাচন করুন:
              </h4>
              <input
                type="datetime-local"
                value={scheduleDateTime}
                onChange={(e) => setScheduleDateTime(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowScheduleInput(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                >
                  বাতিল
                </button>
                <button
                  onClick={handleSchedule}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                >
                  শিডিউল নিশ্চিত করুন
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar (Large, Mobile-Friendly Touch Targets) */}
        <div className="p-4 sm:p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">বর্তমান অবস্থা:</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {post.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Copy Button */}
            <button
              onClick={handleCopyText}
              className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold inline-flex items-center gap-2 transition-all active:scale-95"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'কপি হয়েছে!' : 'টেক্সট কপি'}</span>
            </button>

            {/* Open Facebook Page Link Button */}
            <a
              href="https://www.facebook.com/bengalistudybible"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="ফেসবুক পেজ খুলুন (Open Facebook Page)"
            >
              <FacebookIcon className="w-4 h-4 fill-white" />
              <span>ফেসবুক পেজ খুলুন</span>
            </a>

            {/* Request Revision Button */}
            <button
              onClick={() => setShowRevisionInput(!showRevisionInput)}
              className="px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold inline-flex items-center gap-2 transition-all active:scale-95"
            >
              <AlertCircle className="w-4 h-4" />
              <span>সংশোধন পাঠান</span>
            </button>

            {/* Schedule Button */}
            <button
              onClick={() => setShowScheduleInput(!showScheduleInput)}
              className="px-4 py-2.5 rounded-xl border border-purple-300 dark:border-purple-700/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold inline-flex items-center gap-2 transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>শিডিউল</span>
            </button>

            {/* Mark as Manually Published Button */}
            <button
              onClick={handleMarkPublished}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              <span>ফেসবুকে প্রকাশিত মার্ক করুন</span>
            </button>

            {/* Main Approval Button (Rev. Ayan Kumar Ghosh 1-Tap Approve) */}
            {post.status !== 'APPROVED' && (
              <button
                onClick={handleApprove}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>অনুমোদন করুন (Approve Post)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
