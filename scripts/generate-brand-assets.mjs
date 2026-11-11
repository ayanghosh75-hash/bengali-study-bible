// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// OFFICIAL BRAND & LOGO ASSET GENERATOR
// Project Owner & Developer: Rev. Ayan Kumar Ghosh
// Official Contact: ayanghosh75@gmail.com
// Tagline: পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
// ============================================================

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import QRCode from 'qrcode';

const rootDir = process.cwd();
const brandDir = path.join(rootDir, 'public', 'brand');
const iconsDir = path.join(rootDir, 'public', 'icons');
const qrDir = path.join(rootDir, 'public', 'qr-codes');

// Ensure directories exist
[brandDir, iconsDir, qrDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ============================================================
// MASTER VECTOR DEFINITIONS
// ============================================================

// Common Gradients & Filters
const sharedDefs = `
  <defs>
    <!-- Deep Navy Background Gradient -->
    <linearGradient id="bgNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F213A"/>
      <stop offset="50%" stop-color="#0B192C"/>
      <stop offset="100%" stop-color="#040913"/>
    </linearGradient>

    <!-- Warm Gold Gradient for Cross and Light -->
    <linearGradient id="warmGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5D6"/>
      <stop offset="35%" stop-color="#E8C360"/>
      <stop offset="70%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#997321"/>
    </linearGradient>

    <!-- Warm Gold Accent Linear -->
    <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#AA7C1D"/>
      <stop offset="50%" stop-color="#F3E5AB"/>
      <stop offset="100%" stop-color="#AA7C1D"/>
    </linearGradient>

    <!-- Page White / Parchment Gradients -->
    <linearGradient id="leftPageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ECE5D8"/>
      <stop offset="20%" stop-color="#FAF7F0"/>
      <stop offset="85%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#DFD7C8"/>
    </linearGradient>

    <linearGradient id="rightPageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DFD7C8"/>
      <stop offset="15%" stop-color="#FFFFFF"/>
      <stop offset="80%" stop-color="#FAF7F0"/>
      <stop offset="100%" stop-color="#ECE5D8"/>
    </linearGradient>

    <!-- Page Cover Underneath -->
    <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#997321"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#6E5014"/>
    </linearGradient>

    <!-- Soft Golden Aura Glow -->
    <filter id="divineGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>
`;

// 1. MASTER SYMBOL GRAPHIC ONLY (Centered inside 512x512)
// Pure silhouette: Open Bible + Negative Space Cross + Radiating Light of Knowledge
const symbolArtwork = `
  <g filter="url(#softShadow)">
    <!-- Book Cover Base / Binding Accent Arc -->
    <path d="M 94 366 C 160 388 232 376 256 364 C 280 376 352 388 418 366 C 424 374 416 384 410 386 C 348 406 278 394 256 382 C 234 394 164 406 102 386 C 96 384 88 374 94 366 Z" 
          fill="url(#bookCoverGrad)" opacity="0.95"/>

    <!-- Left Open Bible Page -->
    <path d="M 244 204 C 182 178 116 182 82 202 C 78 204 76 208 76 214 L 76 348 C 76 354 80 358 86 356 C 122 342 186 338 244 358 Z" 
          fill="url(#leftPageGrad)"/>
    
    <!-- Left Page Subtle Reading Ribbon/Fold Arc -->
    <path d="M 96 220 C 138 206 196 208 240 226 L 240 354 C 188 338 132 340 96 352 Z" 
          fill="#FFFFFF" opacity="0.4"/>

    <!-- Right Open Bible Page -->
    <path d="M 268 204 C 330 178 396 182 430 202 C 434 204 436 208 436 214 L 436 348 C 436 354 432 358 426 356 C 390 342 326 338 268 358 Z" 
          fill="url(#rightPageGrad)"/>

    <!-- Right Page Subtle Reading Ribbon/Fold Arc -->
    <path d="M 416 220 C 374 206 316 208 272 226 L 272 354 C 324 338 380 340 416 352 Z" 
          fill="#FFFFFF" opacity="0.5"/>

    <!-- Central Vertical Spine Shadow / Golden Ridge -->
    <path d="M 252 204 L 252 366 L 260 366 L 260 204 Z" fill="url(#warmGoldGrad)" opacity="0.8"/>

    <!-- THE CHRISTIAN CROSS: Integrates organically at the book center -->
    <g filter="url(#divineGlow)">
      <!-- Vertical Beam (Extends through spine into divine light) -->
      <rect x="245" y="96" width="22" height="136" rx="5" fill="url(#warmGoldGrad)"/>
      
      <!-- Horizontal Cross Beam (Spans above open pages) -->
      <rect x="194" y="138" width="124" height="22" rx="5" fill="url(#warmGoldGrad)"/>

      <!-- Radiant Illumination / Knowledge Star (✦) atop the Cross -->
      <!-- Center Star Flare representing divine light, revelation and theological knowledge -->
      <path d="M 256 52 
               C 257 74 266 84 286 86 
               C 266 88 257 98 256 120 
               C 255 98 246 88 226 86 
               C 246 84 255 74 256 52 Z" 
            fill="url(#warmGoldGrad)"/>

      <!-- Inner Diamond Flare Core -->
      <circle cx="256" cy="86" r="4.5" fill="#FFFFFF"/>
      <circle cx="256" cy="149" r="4" fill="#FFFFFF" opacity="0.9"/>

      <!-- Subtle Diagonal Rays of Wisdom (light bursts) -->
      <path d="M 256 70 L 256 102 M 240 86 L 272 86" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" opacity="0.85"/>
    </g>
  </g>
`;

// ============================================================
// 1. SYMBOL ONLY (Dark Background)
// ============================================================
export const symbolDarkSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  ${sharedDefs}
  <!-- Navy Rounded Square Frame -->
  <rect width="512" height="512" rx="112" fill="url(#bgNavyGrad)"/>
  <rect x="16" y="16" width="480" height="480" rx="98" fill="none" stroke="url(#warmGoldGrad)" stroke-width="3.5" opacity="0.35"/>
  ${symbolArtwork}
</svg>
`;

// ============================================================
// 2. SYMBOL ONLY (Transparent / Scalable Master)
// ============================================================
export const symbolSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  ${sharedDefs}
  ${symbolArtwork}
</svg>
`;

// ============================================================
// 3. MASKABLE PWA ICON (Safe-Zone Padded)
// Inside safe-zone: scaled to ~70% and centered so Android circle/squircle crops never cut the artwork
// ============================================================
export const maskableIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  ${sharedDefs}
  <rect width="512" height="512" fill="url(#bgNavyGrad)"/>
  <!-- Circular Safe-Zone Watermark Ring (subtle) -->
  <circle cx="256" cy="256" r="230" fill="none" stroke="#E8C360" stroke-width="1.5" opacity="0.15"/>
  <g transform="translate(256, 256) scale(0.68) translate(-256, -248)">
    ${symbolArtwork}
  </g>
</svg>
`;

// ============================================================
// 4. CIRCLE PROFILE ICON (For Facebook, WhatsApp, YouTube)
// ============================================================
export const circleProfileSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  ${sharedDefs}
  <circle cx="256" cy="256" r="256" fill="url(#bgNavyGrad)"/>
  <circle cx="256" cy="256" r="244" fill="none" stroke="url(#warmGoldGrad)" stroke-width="4" opacity="0.45"/>
  <g transform="translate(256, 256) scale(0.86) translate(-256, -250)">
    ${symbolArtwork}
  </g>
</svg>
`;

// ============================================================
// 5. PRIMARY STACKED LOGO (Symbol + Bengali Wordmark + Tagline)
// ============================================================
export const primaryStackedSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 680" width="600" height="680">
  ${sharedDefs}
  <rect width="600" height="680" rx="32" fill="url(#bgNavyGrad)"/>
  
  <!-- Symbol scaled and placed in top portion -->
  <g transform="translate(300, 220) scale(0.92) translate(-256, -240)">
    ${symbolArtwork}
  </g>

  <!-- Bengali Wordmark -->
  <text x="300" y="475" 
        font-family="'Noto Serif Bengali', 'Vrinda', 'Nirmala UI', serif" 
        font-size="44" 
        font-weight="700" 
        fill="url(#warmGoldGrad)" 
        text-anchor="middle" 
        letter-spacing="1.5">
    বাংলা স্টাডি বাইবেল
  </text>

  <!-- Divider Line with Diamond -->
  <g transform="translate(300, 508)">
    <line x1="-140" y1="0" x2="-20" y2="0" stroke="url(#warmGoldGrad)" stroke-width="1.5" opacity="0.6"/>
    <polygon points="0,-4 4,0 0,4 -4,0" fill="#E8C360"/>
    <line x1="20" y1="0" x2="140" y2="0" stroke="url(#warmGoldGrad)" stroke-width="1.5" opacity="0.6"/>
  </g>

  <!-- Tagline -->
  <text x="300" y="545" 
        font-family="'Noto Sans Bengali', sans-serif" 
        font-size="19" 
        font-weight="500" 
        fill="#F3E5AB" 
        text-anchor="middle" 
        letter-spacing="2.5"
        opacity="0.95">
    পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
  </text>

  <!-- Bilingual English Subtitle -->
  <text x="300" y="585" 
        font-family="'Cinzel', 'Trajan Pro', 'Georgia', serif" 
        font-size="14" 
        font-weight="600" 
        fill="#FFFFFF" 
        text-anchor="middle" 
        letter-spacing="4"
        opacity="0.75">
    BENGALI STUDY BIBLE
  </text>

  <!-- Founder/Publisher Attribution Badge -->
  <text x="300" y="625" 
        font-family="'Noto Sans Bengali', sans-serif" 
        font-size="12" 
        fill="#94A3B8" 
        text-anchor="middle" 
        letter-spacing="1">
    প্রতিষ্ঠাতা ও সম্পাদক: রেভা. অয়ন কুমার ঘোষ
  </text>
</svg>
`;

// ============================================================
// 6. HORIZONTAL LOGO (For Website Header, Navbar, Document Letters)
// ============================================================
export const horizontalLogoDarkSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 160" width="720" height="160">
  ${sharedDefs}
  <!-- Transparent or Dark Header Variant -->
  <!-- Symbol at left -->
  <g transform="translate(80, 80) scale(0.35) translate(-256, -250)">
    ${symbolArtwork}
  </g>

  <!-- Vertical Golden Separator -->
  <line x1="165" y1="35" x2="165" y2="125" stroke="url(#warmGoldGrad)" stroke-width="2" opacity="0.45"/>

  <!-- Title & Subtitle -->
  <text x="190" y="75" 
        font-family="'Noto Serif Bengali', 'Vrinda', 'Nirmala UI', serif" 
        font-size="34" 
        font-weight="700" 
        fill="url(#warmGoldGrad)">
    বাংলা স্টাডি বাইবেল
  </text>

  <text x="192" y="106" 
        font-family="'Noto Sans Bengali', sans-serif" 
        font-size="14.5" 
        font-weight="500" 
        fill="#F3E5AB" 
        letter-spacing="1" 
        opacity="0.9">
    পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
  </text>

  <text x="192" y="128" 
        font-family="'Cinzel', 'Georgia', serif" 
        font-size="11" 
        font-weight="600" 
        fill="#94A3B8" 
        letter-spacing="2.5">
    BENGALI STUDY BIBLE PLATFORM
  </text>
</svg>
`;

// ============================================================
// 7. LIGHT BACKGROUND LOGO (Transparent / White / Print)
// ============================================================
export const horizontalLogoLightSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 160" width="720" height="160">
  <defs>
    <linearGradient id="navyTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0B192C"/>
      <stop offset="100%" stop-color="#1E3A5F"/>
    </linearGradient>
    <linearGradient id="goldLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B8860B"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#997321"/>
    </linearGradient>
    <linearGradient id="leftPageLight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
  </defs>

  <!-- Left Symbol Adapted for Light Background -->
  <g transform="translate(80, 80) scale(0.35) translate(-256, -250)">
    <!-- Base shadow -->
    <path d="M 94 366 C 160 388 232 376 256 364 C 280 376 352 388 418 366 C 424 374 416 384 410 386 C 348 406 278 394 256 382 C 234 394 164 406 102 386 Z" 
          fill="#B8860B"/>
    <!-- Left Page -->
    <path d="M 244 204 C 182 178 116 182 82 202 L 76 348 C 122 342 186 338 244 358 Z" 
          fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
    <!-- Right Page -->
    <path d="M 268 204 C 330 178 396 182 430 202 L 436 348 C 390 342 326 338 268 358 Z" 
          fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
    <!-- Central Cross -->
    <rect x="245" y="96" width="22" height="136" rx="5" fill="url(#goldLightGrad)"/>
    <rect x="194" y="138" width="124" height="22" rx="5" fill="url(#goldLightGrad)"/>
    <!-- Star Flare -->
    <path d="M 256 52 C 257 74 266 84 286 86 C 266 88 257 98 256 120 C 255 98 246 88 226 86 C 246 84 255 74 256 52 Z" 
          fill="url(#goldLightGrad)"/>
  </g>

  <!-- Separator -->
  <line x1="165" y1="35" x2="165" y2="125" stroke="#B8860B" stroke-width="2" opacity="0.5"/>

  <!-- Title & Subtitle -->
  <text x="190" y="75" 
        font-family="'Noto Serif Bengali', 'Vrinda', 'Nirmala UI', serif" 
        font-size="34" 
        font-weight="700" 
        fill="url(#navyTextGrad)">
    বাংলা স্টাডি বাইবেল
  </text>

  <text x="192" y="106" 
        font-family="'Noto Sans Bengali', sans-serif" 
        font-size="14.5" 
        font-weight="600" 
        fill="#B8860B" 
        letter-spacing="1">
    পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
  </text>

  <text x="192" y="128" 
        font-family="'Cinzel', 'Georgia', serif" 
        font-size="11" 
        font-weight="600" 
        fill="#475569" 
        letter-spacing="2.5">
    BENGALI STUDY BIBLE PLATFORM
  </text>
</svg>
`;

// ============================================================
// 8. MONOCHROME VERSION (Black & White for Document Printing)
// ============================================================
export const monochromeLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <g transform="translate(0, 0)">
    <!-- Book Cover Base -->
    <path d="M 94 366 C 160 388 232 376 256 364 C 280 376 352 388 418 366 C 424 374 416 384 410 386 C 348 406 278 394 256 382 C 234 394 164 406 102 386 Z" fill="#000000"/>
    <!-- Left Page -->
    <path d="M 244 204 C 182 178 116 182 82 202 L 76 348 C 122 342 186 338 244 358 Z" fill="#FFFFFF" stroke="#000000" stroke-width="8"/>
    <!-- Right Page -->
    <path d="M 268 204 C 330 178 396 182 430 202 L 436 348 C 390 342 326 338 268 358 Z" fill="#FFFFFF" stroke="#000000" stroke-width="8"/>
    <!-- Cross -->
    <rect x="245" y="96" width="22" height="136" rx="4" fill="#000000"/>
    <rect x="194" y="138" width="124" height="22" rx="4" fill="#000000"/>
    <!-- Star Flare -->
    <path d="M 256 52 C 257 74 266 84 286 86 C 266 88 257 98 256 120 C 255 98 246 88 226 86 C 246 84 255 74 256 52 Z" fill="#000000"/>
  </g>
</svg>
`;

// ============================================================
// 9. WHATSAPP & OPEN GRAPH SOCIAL PREVIEW (1200 x 630)
// ============================================================
export const ogPreviewSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  ${sharedDefs}
  <!-- Navy Background with decorative border -->
  <rect width="1200" height="630" fill="url(#bgNavyGrad)"/>
  
  <!-- Subtle Radial Highlights -->
  <circle cx="340" cy="315" r="320" fill="#D4AF37" opacity="0.08" filter="url(#divineGlow)"/>
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="url(#warmGoldGrad)" stroke-width="2" opacity="0.35"/>

  <!-- Official Symbol (Left Side) -->
  <g transform="translate(140, 75) scale(0.95)">
    ${symbolArtwork}
  </g>

  <!-- Right Side Typography & Branding -->
  <g transform="translate(620, 0)">
    <!-- Brand Pillar Pill -->
    <g transform="translate(0, 110)">
      <rect width="440" height="38" rx="19" fill="#1E293B" stroke="#D4AF37" stroke-width="1.2" opacity="0.9"/>
      <text x="220" y="24" 
            font-family="'Noto Sans Bengali', sans-serif" 
            font-size="14.5" 
            font-weight="600" 
            fill="#F3E5AB" 
            text-anchor="middle">
        ✨ সর্বাধুনিক ডিজিটাল বাংলা স্টাডি বাইবেল প্ল্যাটফর্ম
      </text>
    </g>

    <!-- Main Bengali Title -->
    <text x="0" y="215" 
          font-family="'Noto Serif Bengali', 'Vrinda', 'Nirmala UI', serif" 
          font-size="54" 
          font-weight="700" 
          fill="url(#warmGoldGrad)" 
          letter-spacing="1">
      বাংলা স্টাডি বাইবেল
    </text>

    <!-- English Subtitle -->
    <text x="0" y="260" 
          font-family="'Cinzel', 'Trajan Pro', 'Georgia', serif" 
          font-size="20" 
          font-weight="600" 
          fill="#FFFFFF" 
          letter-spacing="5"
          opacity="0.85">
      BENGALI STUDY BIBLE
    </text>

    <!-- Official Tagline -->
    <text x="0" y="320" 
          font-family="'Noto Sans Bengali', sans-serif" 
          font-size="24" 
          font-weight="600" 
          fill="#FDFBF7" 
          letter-spacing="1.5">
      পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
    </text>

    <!-- Feature Highlights -->
    <g transform="translate(0, 360)">
      <!-- Pill 1 -->
      <g transform="translate(0, 0)">
        <rect width="210" height="38" rx="10" fill="#0F213A" stroke="#D4AF37" stroke-width="1" opacity="0.7"/>
        <text x="105" y="24" font-family="'Noto Sans Bengali', sans-serif" font-size="14" fill="#E2E8F0" text-anchor="middle">📖 সম্পূর্ণ ৬৬টি ক্যানন পুস্তক</text>
      </g>
      <!-- Pill 2 -->
      <g transform="translate(225, 0)">
        <rect width="210" height="38" rx="10" fill="#0F213A" stroke="#D4AF37" stroke-width="1" opacity="0.7"/>
        <text x="105" y="24" font-family="'Noto Sans Bengali', sans-serif" font-size="14" fill="#E2E8F0" text-anchor="middle">🔍 পদভিত্তিক স্টাডি ও TSK</text>
      </g>
      <!-- Pill 3 -->
      <g transform="translate(0, 48)">
        <rect width="210" height="38" rx="10" fill="#0F213A" stroke="#D4AF37" stroke-width="1" opacity="0.7"/>
        <text x="105" y="24" font-family="'Noto Sans Bengali', sans-serif" font-size="14" fill="#E2E8F0" text-anchor="middle">🎙️ সার্মন ও প্রচার প্রস্তুতি</text>
      </g>
      <!-- Pill 4 -->
      <g transform="translate(225, 48)">
        <rect width="210" height="38" rx="10" fill="#0F213A" stroke="#D4AF37" stroke-width="1" opacity="0.7"/>
        <text x="105" y="24" font-family="'Noto Sans Bengali', sans-serif" font-size="14" fill="#E2E8F0" text-anchor="middle">📱 সম্পূর্ণ অফলাইন PWA</text>
      </g>
    </g>

    <!-- Footer Attribution Line -->
    <line x1="0" y1="480" x2="480" y2="480" stroke="url(#warmGoldGrad)" stroke-width="1" opacity="0.3"/>
    
    <text x="0" y="515" 
          font-family="'Noto Sans Bengali', sans-serif" 
          font-size="14" 
          fill="#94A3B8">
      প্রতিষ্ঠাতা ও ডেভেলপার: <tspan fill="#F3E5AB" font-weight="600">রেভা. অয়ন কুমার ঘোষ</tspan>
    </text>
    
    <text x="0" y="540" 
          font-family="'Noto Sans Bengali', sans-serif" 
          font-size="13" 
          fill="#64748B">
      🌐 bengalistudybible.com | ayanghosh75@gmail.com
    </text>
  </g>
</svg>
`;

// ============================================================
// ASSET BUILD & RASTER EXPORT RUNNER
// ============================================================

async function generateAllBrandAssets() {
  console.log('\n============================================================');
  console.log('BENGALI STUDY BIBLE — OFFICIAL BRAND & LOGO GENERATOR');
  console.log('Owner & Developer: Rev. Ayan Kumar Ghosh');
  console.log('============================================================\n');

  // 1. Write Master SVGs
  console.log('1. Exporting Master SVG Vectors to /public/brand/ ...');
  fs.writeFileSync(path.join(brandDir, 'logo-symbol.svg'), symbolSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'logo-symbol-dark.svg'), symbolDarkSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'logo-primary.svg'), primaryStackedSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'logo-stacked.svg'), primaryStackedSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'logo-horizontal.svg'), horizontalLogoDarkSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'logo-dark.svg'), horizontalLogoDarkSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'logo-light.svg'), horizontalLogoLightSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'logo-monochrome.svg'), monochromeLogoSvg.trim());
  fs.writeFileSync(path.join(brandDir, 'og-preview.svg'), ogPreviewSvg.trim());
  console.log('   ✓ SVGs successfully written to /public/brand/');

  // Also replace /public/favicon.svg and /public/icons/bible-icon.svg with clean master symbol
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.svg'), symbolDarkSvg.trim());
  fs.writeFileSync(path.join(iconsDir, 'bible-icon.svg'), symbolDarkSvg.trim());
  console.log('   ✓ Updated /public/favicon.svg and /public/icons/bible-icon.svg');

  // 2. Generate PWA and System Icons with Sharp
  console.log('\n2. Rasterizing high-performance PWA & System Icons with Sharp...');

  // 512x512 Master App Icon (Standard)
  await sharp(Buffer.from(symbolDarkSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(iconsDir, 'icon-512x512.png'));
  console.log('   ✓ public/icons/icon-512x512.png (512x512)');

  // 192x192 Standard Android Icon
  await sharp(Buffer.from(symbolDarkSvg))
    .resize(192, 192)
    .png({ quality: 100 })
    .toFile(path.join(iconsDir, 'icon-192x192.png'));
  console.log('   ✓ public/icons/icon-192x192.png (192x192)');

  // 512x512 Maskable Icon (Safe-Zone padding for circular/squircle Android cuts)
  await sharp(Buffer.from(maskableIconSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(iconsDir, 'icon-maskable-512x512.png'));
  console.log('   ✓ public/icons/icon-maskable-512x512.png (512x512 maskable)');

  // 180x180 Apple Touch Icon (iOS Home Screen)
  await sharp(Buffer.from(maskableIconSvg))
    .resize(180, 180)
    .png({ quality: 100 })
    .toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  // Mirror to public root for maximum crawler/device compatibility
  fs.copyFileSync(path.join(iconsDir, 'apple-touch-icon.png'), path.join(rootDir, 'public', 'apple-touch-icon.png'));
  console.log('   ✓ public/icons/apple-touch-icon.png & public/apple-touch-icon.png (180x180)');

  // Favicons: 32x32, 16x16, 48x48
  await sharp(Buffer.from(symbolDarkSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(iconsDir, 'favicon-32x32.png'));
  fs.copyFileSync(path.join(iconsDir, 'favicon-32x32.png'), path.join(rootDir, 'public', 'favicon.ico'));
  
  await sharp(Buffer.from(symbolDarkSvg))
    .resize(16, 16)
    .png()
    .toFile(path.join(iconsDir, 'favicon-16x16.png'));
  console.log('   ✓ Favicons: 32x32, 16x16, and favicon.ico generated');

  // 3. Social Media & Open Graph Assets
  console.log('\n3. Generating WhatsApp / Open Graph / Facebook branded assets...');
  
  // 1200x630 OG Preview Image
  await sharp(Buffer.from(ogPreviewSvg))
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile(path.join(brandDir, 'og-preview.png'));
  // Also copy to public root for standard /og-image.png fallback
  fs.copyFileSync(path.join(brandDir, 'og-preview.png'), path.join(rootDir, 'public', 'og-preview.png'));
  console.log('   ✓ public/brand/og-preview.png & public/og-preview.png (1200x630)');

  // 512x512 Circle-Friendly Facebook Profile Avatar
  await sharp(Buffer.from(circleProfileSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(brandDir, 'facebook-profile-symbol-512.png'));
  console.log('   ✓ public/brand/facebook-profile-symbol-512.png (512x512)');

  // 1200x630 Facebook Cover Banner
  await sharp(Buffer.from(ogPreviewSvg))
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile(path.join(brandDir, 'facebook-cover-banner.png'));
  console.log('   ✓ public/brand/facebook-cover-banner.png (1200x630)');

  // 4. Generate Official Branded QR Poster
  console.log('\n4. Generating Official Installation QR Code & Poster...');
  const installUrl = 'https://bengalistudybible.com/install';
  
  // Generate high-density QR code buffer
  const qrPngBuffer = await QRCode.toBuffer(installUrl, {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 2,
    width: 600,
    color: {
      dark: '#0B192C',
      light: '#FFFFFF',
    },
  });

  // Save pure QR SVG and PNG
  const qrSvgString = await QRCode.toString(installUrl, {
    type: 'svg',
    margin: 1,
    color: {
      dark: '#0B192C',
      light: '#FFFFFF',
    },
  });
  fs.writeFileSync(path.join(qrDir, 'qr-bengalistudybible.svg'), qrSvgString);
  fs.writeFileSync(path.join(qrDir, 'qr-bengalistudybible-3000px.png'), qrPngBuffer);
  console.log('   ✓ QR assets linking to:', installUrl);

  // Compose Full A4 Branded Poster (1240 x 1754 px)
  const qrPosterSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 1754" width="1240" height="1754">
    ${sharedDefs}
    <!-- Background -->
    <rect width="1240" height="1754" fill="url(#bgNavyGrad)"/>
    <rect x="36" y="36" width="1168" height="1682" rx="32" fill="none" stroke="url(#warmGoldGrad)" stroke-width="3" opacity="0.4"/>
    
    <!-- Top Header Ribbon -->
    <g transform="translate(620, 110)">
      <rect x="-260" y="0" width="520" height="42" rx="21" fill="#1E293B" stroke="#D4AF37" stroke-width="1.5"/>
      <text x="0" y="27" font-family="'Noto Sans Bengali', sans-serif" font-size="16" font-weight="600" fill="#F3E5AB" text-anchor="middle">
        ✨ সর্বাধুনিক ডিজিটাল বাংলা স্টাডি বাইবেল
      </text>
    </g>

    <!-- Top Official Symbol -->
    <g transform="translate(620, 310) scale(0.72) translate(-256, -240)">
      ${symbolArtwork}
    </g>

    <!-- Bengali Title -->
    <text x="620" y="470" 
          font-family="'Noto Serif Bengali', 'Vrinda', serif" 
          font-size="64" 
          font-weight="700" 
          fill="url(#warmGoldGrad)" 
          text-anchor="middle" 
          letter-spacing="2">
      বাংলা স্টাডি বাইবেল
    </text>

    <!-- Tagline -->
    <text x="620" y="525" 
          font-family="'Noto Sans Bengali', sans-serif" 
          font-size="26" 
          font-weight="600" 
          fill="#FDFBF7" 
          text-anchor="middle" 
          letter-spacing="2.5">
      পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
    </text>

    <!-- English Subtitle -->
    <text x="620" y="565" 
          font-family="'Cinzel', 'Georgia', serif" 
          font-size="18" 
          font-weight="600" 
          fill="#94A3B8" 
          text-anchor="middle" 
          letter-spacing="5">
      BENGALI STUDY BIBLE • OFFICIAL APP
    </text>

    <!-- QR Code Container Card -->
    <g transform="translate(320, 620)">
      <rect width="600" height="660" rx="36" fill="#FFFFFF" filter="url(#softShadow)"/>
      <rect x="12" y="12" width="576" height="636" rx="28" fill="none" stroke="#E2E8F0" stroke-width="2"/>
      
      <!-- Embedded QR Code will be composited via sharp -->
    </g>

    <!-- Scan Instruction Below QR Card -->
    <text x="620" y="1340" 
          font-family="'Noto Serif Bengali', serif" 
          font-size="36" 
          font-weight="700" 
          fill="url(#warmGoldGrad)" 
          text-anchor="middle">
      📷 আপনার ক্যামেরা দিয়ে স্ক্যান করুন
    </text>

    <text x="620" y="1390" 
          font-family="'Noto Sans Bengali', sans-serif" 
          font-size="24" 
          font-weight="500" 
          fill="#F3E5AB" 
          text-anchor="middle">
      আপনার ফোনে বাংলা স্টাডি বাইবেল ইনস্টল করুন
    </text>

    <!-- Compatibility Badges -->
    <g transform="translate(620, 1440)">
      <text x="0" y="0" font-family="'Noto Sans Bengali', sans-serif" font-size="20" font-weight="600" fill="#E2E8F0" text-anchor="middle">
        Android • iPhone • iPad • Computer Web
      </text>
    </g>

    <!-- URL Display Box -->
    <g transform="translate(620, 1500)">
      <rect x="-240" y="0" width="480" height="46" rx="23" fill="#0F213A" stroke="#D4AF37" stroke-width="1.2"/>
      <text x="0" y="29" font-family="'Courier New', monospace" font-size="17" font-weight="bold" fill="#FDE047" text-anchor="middle">
        bengalistudybible.com/install
      </text>
    </g>

    <!-- Bottom Pastoral Attribution & Copyright -->
    <g transform="translate(620, 1630)">
      <text x="0" y="0" font-family="'Noto Sans Bengali', sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle">
        প্রতিষ্ঠাতা ও ডেভেলপার: <tspan fill="#F3E5AB" font-weight="600">রেভা. অয়ন কুমার ঘোষ</tspan> | যোগাযোগ: ayanghosh75@gmail.com
      </text>
      <text x="0" y="30" font-family="'Noto Sans Bengali', sans-serif" font-size="14" fill="#64748B" text-anchor="middle">
        স্বত্বাধিকার © ২০২৬ বাংলা স্টাডি বাইবেল। সর্বস্বত্ব সংরক্ষিত।
      </text>
    </g>
  </svg>
  `;

  // Composite QR code inside poster frame
  const posterSvgBuffer = Buffer.from(qrPosterSvg);
  const qrInnerPng = await sharp(qrPngBuffer).resize(480, 480).toBuffer();

  const finalPoster = await sharp(posterSvgBuffer)
    .composite([
      {
        input: qrInnerPng,
        top: 670,
        left: 380,
      },
    ])
    .png({ quality: 95 })
    .toFile(path.join(qrDir, 'bengali-study-bible-poster-official.png'));

  console.log('   ✓ public/qr-codes/bengali-study-bible-poster-official.png (1240x1754 A4)');

  console.log('\n============================================================');
  console.log('ALL BRAND & LOGO ASSETS SUCCESSFULLY GENERATED AND VERIFIED!');
  console.log('============================================================\n');
}

generateAllBrandAssets().catch((err) => {
  console.error('Asset generation error:', err);
  process.exit(1);
});
