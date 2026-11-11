// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// SOCIAL POST CARD COMPONENT
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import React, { useState } from 'react';
import {
  BookOpen,
  Copy,
  Check,
  Eye,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { SocialPost, ContentType } from '../../types/social';
import { FacebookIntegrationService } from '../../services/social/facebookIntegrationService';
import { toBengaliDigits } from '../../utils/bengaliNumerals';

interface SocialPostCardProps {
  post: SocialPost;
  onOpenReview: (post: SocialPost) => void;
  onQuickApprove?: (post: SocialPost) => void;
}

export const SocialPostCard: React.FC<SocialPostCardProps> = ({
  post,
  onOpenReview,
  onQuickApprove,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const payload = FacebookIntegrationService.generateManualPublishPayload(post);
    try {
      await navigator.clipboard.writeText(payload.formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getContentTypeColor = (type: ContentType): string => {
    switch (type) {
      case 'CHARACTER':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';
      case 'QUIZ':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
      case 'VERSE_STUDY':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
      case 'DEEP_STUDY':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300';
      case 'QUESTION':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
      case 'DISCUSSION':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300';
      case 'SERMON':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300';
      default:
        return 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/20 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>অনুমোদিত</span>
          </span>
        );
      case 'PUBLISHED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-500/20 inline-flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            <span>প্রকাশিত</span>
          </span>
        );
      case 'SCHEDULED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-500/20 inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>শিডিউলড</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-500/20">
            অপেক্ষমান (Review)
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onOpenReview(post)}
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div className="space-y-3">
        {/* Badges Bar */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              দিন {toBengaliDigits(post.dayNumber)}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${getContentTypeColor(
                post.contentType
              )}`}
            >
              {post.dayOfWeek}
            </span>
          </div>

          {getStatusBadge(post.status)}
        </div>

        {/* Title & Topic */}
        <div>
          <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
            {post.titleBn}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{post.topicBn}</p>
        </div>

        {/* Scripture Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span>{post.scriptureReference}</span>
        </div>

        {/* Hook / Content Excerpt */}
        <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
          {post.hookBn || post.bodyBn}
        </p>

        {/* Verification & Tags */}
        <div className="flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800/80">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>IRV Bengali যাচাইকৃত</span>
          </span>

          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>{post.hashtags.length} টি ট্যাগ</span>
          </span>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="pt-4 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
          title="ম্যানুয়াল ফেসবুক পোস্টের জন্য সম্পূর্ণ টেক্সট কপি করুন"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">কপি হয়েছে</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>টেক্সট কপি</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5">
          {post.status !== 'APPROVED' && onQuickApprove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickApprove(post);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
              title="দ্রুত অনুমোদন"
            >
              অনুমোদন
            </button>
          )}

          <button
            onClick={() => onOpenReview(post)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>রিভিউ ও কার্ড</span>
          </button>
        </div>
      </div>
    </div>
  );
};
