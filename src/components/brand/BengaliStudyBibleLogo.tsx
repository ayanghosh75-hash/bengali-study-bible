// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// OFFICIAL BRAND LOGO LOCKUP COMPONENT
// Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React from 'react';
import { LogoSymbol } from './LogoSymbol';

export interface BengaliStudyBibleLogoProps {
  variant?: 'horizontal' | 'stacked' | 'symbol' | 'bilingual';
  theme?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showTagline?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  onClick?: () => void;
}

export const BengaliStudyBibleLogo: React.FC<BengaliStudyBibleLogoProps> = ({
  variant = 'horizontal',
  theme = 'auto',
  size = 'md',
  className = '',
  showTagline = true,
  showBadge = false,
  badgeText = 'PWA v1.0',
  onClick,
}) => {
  // Determine pixel sizes based on prop
  const getSymbolSize = (): number => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm':
        return variant === 'stacked' ? 44 : 32;
      case 'lg':
        return variant === 'stacked' ? 84 : 44;
      case 'xl':
        return variant === 'stacked' ? 112 : 56;
      case 'md':
      default:
        return variant === 'stacked' ? 64 : 38;
    }
  };

  const symbolSize = getSymbolSize();

  // Color styling according to theme
  const isLight = theme === 'light';
  const isDark = theme === 'dark';

  const titleClass = isLight
    ? 'text-navy-950 font-bold'
    : isDark
    ? 'text-gold-300 font-bold'
    : 'text-slate-900 dark:text-gold-300 font-bold';

  const taglineClass = isLight
    ? 'text-gold-700 font-medium'
    : isDark
    ? 'text-gold-400/90 font-medium'
    : 'text-gold-600 dark:text-gold-400/90 font-medium';

  const englishClass = isLight
    ? 'text-slate-500 font-semibold'
    : isDark
    ? 'text-slate-400 font-semibold'
    : 'text-slate-500 dark:text-slate-400 font-semibold';

  // 1. SYMBOL ONLY
  if (variant === 'symbol') {
    return (
      <div
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
      >
        <LogoSymbol size={symbolSize} variant="default" />
      </div>
    );
  }

  // 2. STACKED LOGO (For Landing pages, Splash, Poster view)
  if (variant === 'stacked') {
    return (
      <div
        className={`flex flex-col items-center text-center space-y-3 select-none ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
        onClick={onClick}
      >
        <div className="relative group transition-transform duration-300 hover:scale-105">
          <LogoSymbol size={symbolSize} variant="default" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h1 className={`font-serif text-2xl sm:text-3xl tracking-tight ${titleClass}`}>
              বাংলা স্টাডি বাইবেল
            </h1>
            {showBadge && (
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                {badgeText}
              </span>
            )}
          </div>

          {showTagline && (
            <p className={`font-sans text-xs sm:text-sm tracking-wide ${taglineClass}`}>
              পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
            </p>
          )}

          <p className={`font-serif text-[11px] sm:text-xs tracking-widest uppercase ${englishClass}`}>
            BENGALI STUDY BIBLE
          </p>
        </div>
      </div>
    );
  }

  // 3. BILINGUAL LOGO
  if (variant === 'bilingual') {
    return (
      <div
        className={`flex items-center space-x-3.5 select-none ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
        onClick={onClick}
      >
        <LogoSymbol size={symbolSize} variant="default" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`font-serif text-lg md:text-xl leading-tight ${titleClass}`}>
              বাংলা স্টাডি বাইবেল
            </h1>
            {showBadge && (
              <span className="text-[10px] uppercase font-sans font-semibold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                {badgeText}
              </span>
            )}
          </div>
          <p className={`font-serif text-[11px] tracking-widest uppercase font-semibold ${englishClass}`}>
            BENGALI STUDY BIBLE
          </p>
          {showTagline && (
            <p className={`font-sans text-[11px] ${taglineClass}`}>
              পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
            </p>
          )}
        </div>
      </div>
    );
  }

  // 4. HORIZONTAL LOGO (Default: Ideal for Header / Navbar)
  return (
    <div
      className={`flex items-center space-x-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="relative group transition-transform duration-200 hover:scale-105">
        <LogoSymbol size={symbolSize} variant="default" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h1 className={`font-serif text-base sm:text-lg md:text-xl leading-tight ${titleClass}`}>
            বাংলা স্টাডি বাইবেল
          </h1>
          {showBadge && (
            <span className="hidden sm:inline-block text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
              {badgeText}
            </span>
          )}
        </div>
        {showTagline ? (
          <p className={`font-sans text-[11px] sm:text-xs truncate max-w-[220px] sm:max-w-xs ${taglineClass}`}>
            পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
          </p>
        ) : (
          <p className={`font-sans text-xs ${englishClass}`}>
            BENGALI STUDY BIBLE
          </p>
        )}
      </div>
    </div>
  );
};
