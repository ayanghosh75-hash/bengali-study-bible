// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// OFFICIAL BRAND LOGO SYMBOL COMPONENT
// Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import React from 'react';

export interface LogoSymbolProps {
  size?: number | string;
  className?: string;
  variant?: 'default' | 'circle' | 'monochrome' | 'gold' | 'plain';
  showGlow?: boolean;
}

export const LogoSymbol: React.FC<LogoSymbolProps> = ({
  size = 36,
  className = '',
  variant = 'default',
  showGlow = true,
}) => {
  const isCircle = variant === 'circle';
  const isPlain = variant === 'plain';
  const isMonochrome = variant === 'monochrome';
  const isGold = variant === 'gold';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 select-none ${className}`}
      aria-label="বাংলা স্টাডি বাইবেল অফিশিয়াল প্রতীক (Bengali Study Bible Symbol)"
      role="img"
    >
      <defs>
        <linearGradient id="symNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F213A" />
          <stop offset="50%" stopColor="#0B192C" />
          <stop offset="100%" stopColor="#040913" />
        </linearGradient>

        <linearGradient id="symGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5D6" />
          <stop offset="35%" stopColor="#E8C360" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#997321" />
        </linearGradient>

        <linearGradient id="symLeftPage" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ECE5D8" />
          <stop offset="20%" stopColor="#FAF7F0" />
          <stop offset="85%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DFD7C8" />
        </linearGradient>

        <linearGradient id="symRightPage" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DFD7C8" />
          <stop offset="15%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#FAF7F0" />
          <stop offset="100%" stopColor="#ECE5D8" />
        </linearGradient>

        <linearGradient id="symCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#997321" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#6E5014" />
        </linearGradient>

        {showGlow && (
          <filter id="symDivineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Optional Background Tile */}
      {!isPlain && (
        <>
          {isCircle ? (
            <>
              <circle cx="256" cy="256" r="256" fill="url(#symNavyGrad)" />
              <circle
                cx="256"
                cy="256"
                r="244"
                fill="none"
                stroke="url(#symGoldGrad)"
                strokeWidth="4"
                opacity="0.45"
              />
            </>
          ) : (
            <>
              <rect width="512" height="512" rx="112" fill="url(#symNavyGrad)" />
              <rect
                x="16"
                y="16"
                width="480"
                height="480"
                rx="98"
                fill="none"
                stroke="url(#symGoldGrad)"
                strokeWidth="3.5"
                opacity="0.35"
              />
            </>
          )}
        </>
      )}

      {/* Main Artwork Group */}
      <g
        transform={
          isCircle
            ? 'translate(256, 256) scale(0.86) translate(-256, -250)'
            : isPlain
            ? 'translate(0, 0)'
            : 'translate(0, 0)'
        }
      >
        {/* Book Cover Base */}
        <path
          d="M 94 366 C 160 388 232 376 256 364 C 280 376 352 388 418 366 C 424 374 416 384 410 386 C 348 406 278 394 256 382 C 234 394 164 406 102 386 C 96 384 88 374 94 366 Z"
          fill={isMonochrome ? '#000000' : isGold ? 'url(#symGoldGrad)' : 'url(#symCoverGrad)'}
          opacity={isMonochrome ? 1 : 0.95}
        />

        {/* Left Open Bible Page */}
        <path
          d="M 244 204 C 182 178 116 182 82 202 C 78 204 76 208 76 214 L 76 348 C 76 354 80 358 86 356 C 122 342 186 338 244 358 Z"
          fill={isMonochrome ? '#FFFFFF' : isGold ? '#FEFCE8' : 'url(#symLeftPage)'}
          stroke={isMonochrome ? '#000000' : 'none'}
          strokeWidth={isMonochrome ? 6 : 0}
        />

        {/* Left Page Reading Highlight Curve */}
        {!isMonochrome && (
          <path
            d="M 96 220 C 138 206 196 208 240 226 L 240 354 C 188 338 132 340 96 352 Z"
            fill="#FFFFFF"
            opacity="0.4"
          />
        )}

        {/* Right Open Bible Page */}
        <path
          d="M 268 204 C 330 178 396 182 430 202 C 434 204 436 208 436 214 L 436 348 C 436 354 432 358 426 356 C 390 342 326 338 268 358 Z"
          fill={isMonochrome ? '#FFFFFF' : isGold ? '#FEFCE8' : 'url(#symRightPage)'}
          stroke={isMonochrome ? '#000000' : 'none'}
          strokeWidth={isMonochrome ? 6 : 0}
        />

        {/* Right Page Reading Highlight Curve */}
        {!isMonochrome && (
          <path
            d="M 416 220 C 374 206 316 208 272 226 L 272 354 C 324 338 380 340 416 352 Z"
            fill="#FFFFFF"
            opacity="0.5"
          />
        )}

        {/* Central Vertical Spine */}
        <path
          d="M 252 204 L 252 366 L 260 366 L 260 204 Z"
          fill={isMonochrome ? '#000000' : 'url(#symGoldGrad)'}
          opacity="0.8"
        />

        {/* THE CHRISTIAN CROSS & ILLUMINATION STAR */}
        <g filter={showGlow && !isMonochrome ? 'url(#symDivineGlow)' : undefined}>
          {/* Vertical Beam */}
          <rect
            x="245"
            y="96"
            width="22"
            height="136"
            rx="5"
            fill={isMonochrome ? '#000000' : 'url(#symGoldGrad)'}
          />

          {/* Horizontal Beam */}
          <rect
            x="194"
            y="138"
            width="124"
            height="22"
            rx="5"
            fill={isMonochrome ? '#000000' : 'url(#symGoldGrad)'}
          />

          {/* 4-Point Radiant Knowledge Flare (✦) */}
          <path
            d="M 256 52 C 257 74 266 84 286 86 C 266 88 257 98 256 120 C 255 98 246 88 226 86 C 246 84 255 74 256 52 Z"
            fill={isMonochrome ? '#000000' : 'url(#symGoldGrad)'}
          />

          {/* Inner Light Core */}
          {!isMonochrome && (
            <>
              <circle cx="256" cy="86" r="4.5" fill="#FFFFFF" />
              <circle cx="256" cy="149" r="4" fill="#FFFFFF" opacity="0.9" />
              <path
                d="M 256 70 L 256 102 M 240 86 L 272 86"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.85"
              />
            </>
          )}
        </g>
      </g>
    </svg>
  );
};
