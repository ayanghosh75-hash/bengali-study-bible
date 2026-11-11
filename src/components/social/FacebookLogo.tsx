// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// OFFICIAL FACEBOOK LOGO & PAGE LINK COMPONENT
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// ============================================================

import React from 'react';
import { ExternalLink } from 'lucide-react';

export const OFFICIAL_FB_PAGE_URL = 'https://www.facebook.com/bengalistudybible';

interface FacebookIconProps {
  className?: string;
  size?: number;
}

/**
 * Official vector Facebook "f" icon.
 */
export const FacebookIcon: React.FC<FacebookIconProps> = ({
  className = 'w-5 h-5',
  size = 20,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface FacebookPageLinkProps {
  pageUrl?: string;
  className?: string;
  variant?: 'button' | 'icon-only' | 'badge';
  labelBn?: string;
}

/**
 * Interactive link component that opens the Bengali Study Bible Facebook Page.
 */
export const FacebookPageLink: React.FC<FacebookPageLinkProps> = ({
  pageUrl = OFFICIAL_FB_PAGE_URL,
  className = '',
  variant = 'button',
  labelBn = 'অফিসিয়াল ফেসবুক পেজ',
}) => {
  if (variant === 'icon-only') {
    return (
      <a
        href={pageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center p-2 rounded-xl text-white bg-[#1877F2] hover:bg-[#166fe5] shadow-sm hover:shadow-md transition-all active:scale-95 ${className}`}
        title="আমাদের ফেসবুক পেজ খুলুন (Open Facebook Page)"
        aria-label="Bengali Study Bible Facebook Page"
      >
        <FacebookIcon className="w-4 h-4 fill-white" />
      </a>
    );
  }

  if (variant === 'badge') {
    return (
      <a
        href={pageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] dark:text-[#4599ff] text-xs font-bold transition-all active:scale-95 ${className}`}
        title="ফেসবুক পেজে যুক্ত হন"
      >
        <FacebookIcon className="w-4 h-4" />
        <span>{labelBn}</span>
        <ExternalLink className="w-3 h-3 opacity-70" />
      </a>
    );
  }

  return (
    <a
      href={pageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 group ${className}`}
      title="বাংলা স্টাডি বাইবেলের অফিসিয়াল ফেসবুক পেজ ভিজিট করুন"
    >
      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <FacebookIcon className="w-3.5 h-3.5 fill-white" />
      </span>
      <span>{labelBn}</span>
      <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
};
