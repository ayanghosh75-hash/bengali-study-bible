// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// MASTER ASSET GENERATOR:
// 1. Permanent High-Resolution QR Code (PNG, SVG, Transparent & White)
// 2. High-Resolution Bilingual Promotional Poster (2160 × 2700 pixels JPG)
// Target Permanent URL: https://bengalistudybible.surge.sh/install
// ============================================================

import sharp from 'sharp';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import jsQR from 'jsqr';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PERMANENT_INSTALL_URL = 'https://bengalistudybible.surge.sh/install';
const ARTIFACT_DIR = 'C:\\Users\\acer\\.gemini\\antigravity\\brain\\610aed17-26d5-4ff0-bedb-6c7dc4ed679b';

console.log('='.repeat(80));
console.log('   BENGALI STUDY BIBLE — PERMANENT QR & BILINGUAL PROMOTIONAL JPG GENERATOR');
console.log(`   Destination URL: ${PERMANENT_INSTALL_URL}`);
console.log('='.repeat(80));

async function generateAssets() {
  const qrDir = path.join(ROOT_DIR, 'public', 'qr-codes');
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
  }

  // ------------------------------------------------------------
  // 1. GENERATE PERMANENT QR CODES (PNG, SVG, WHITE, TRANSPARENT)
  // ------------------------------------------------------------
  console.log('\n[1/4] Generating standalone permanent QR codes...');

  // A. High-Res PNG with white background (1024x1024, Level H, margin 2)
  const qrPngBuffer = await QRCode.toBuffer(PERMANENT_INSTALL_URL, {
    width: 1024,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#071324',
      light: '#FFFFFF',
    },
  });

  const qrInstallPngPath = path.join(qrDir, 'qr-bengalistudybible-install.png');
  const qrWhitePngPath = path.join(qrDir, 'qr-bengalistudybible-install-white.png');
  const qr3000PngPath = path.join(qrDir, 'qr-bengalistudybible-3000px.png');
  fs.writeFileSync(qrInstallPngPath, qrPngBuffer);
  fs.writeFileSync(qrWhitePngPath, qrPngBuffer);
  fs.writeFileSync(qr3000PngPath, qrPngBuffer);
  console.log(`✓ Generated PNG QR: ${qrInstallPngPath}`);

  // B. Transparent Background PNG
  const qrTransparentBuffer = await QRCode.toBuffer(PERMANENT_INSTALL_URL, {
    width: 1024,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#071324',
      light: '#00000000',
    },
  });
  const qrTransparentPngPath = path.join(qrDir, 'qr-bengalistudybible-install-transparent.png');
  fs.writeFileSync(qrTransparentPngPath, qrTransparentBuffer);
  console.log(`✓ Generated Transparent QR: ${qrTransparentPngPath}`);

  // C. Vector SVG
  const qrSvgString = await QRCode.toString(PERMANENT_INSTALL_URL, {
    type: 'svg',
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#071324',
      light: '#FFFFFF',
    },
  });
  const qrSvgPath = path.join(qrDir, 'qr-bengalistudybible-install.svg');
  fs.writeFileSync(qrSvgPath, qrSvgString);
  console.log(`✓ Generated SVG QR: ${qrSvgPath}`);

  // ------------------------------------------------------------
  // 2. GENERATE 2160 × 2700 BILINGUAL MASTER PROMOTIONAL JPG
  // ------------------------------------------------------------
  console.log('\n[2/4] Constructing 2160 × 2700 master bilingual promotional poster...');

  const width = 2160;
  const height = 2700;

  // Generate QR buffer specifically sized for the poster: 560x560 px
  const qrForPosterBuffer = await QRCode.toBuffer(PERMANENT_INSTALL_URL, {
    width: 560,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#071324',
      light: '#FFFFFF',
    },
  });

  // Base SVG Canvas Layout
  const posterSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Regal Navy Gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#020610" />
        <stop offset="25%" stop-color="#071324" />
        <stop offset="65%" stop-color="#0B1C33" />
        <stop offset="100%" stop-color="#030813" />
      </linearGradient>

      <!-- Radiant Gold Gradient -->
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF8E7" />
        <stop offset="25%" stop-color="#F3E5AB" />
        <stop offset="60%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#A27827" />
      </linearGradient>

      <!-- Card Gradient Navy -->
      <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0D213B" />
        <stop offset="100%" stop-color="#061220" />
      </linearGradient>

      <!-- Panel Gradient -->
      <linearGradient id="panelBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0F2644" />
        <stop offset="100%" stop-color="#081628" />
      </linearGradient>

      <!-- Drop Shadows -->
      <filter id="shadowHeavy" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.75" />
      </filter>
      <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Ornate Double Gold Borders -->
    <rect x="40" y="40" width="${width - 80}" height="${height - 80}" rx="48" fill="none" stroke="url(#goldGrad)" stroke-width="4.5" opacity="0.8" />
    <rect x="58" y="58" width="${width - 116}" height="${height - 116}" rx="36" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.4" />

    <!-- Corner Decorative Accents -->
    <circle cx="85" cy="85" r="12" fill="url(#goldGrad)" opacity="0.85" />
    <circle cx="${width - 85}" cy="85" r="12" fill="url(#goldGrad)" opacity="0.85" />
    <circle cx="85" cy="${height - 85}" r="12" fill="url(#goldGrad)" opacity="0.85" />
    <circle cx="${width - 85}" cy="${height - 85}" r="12" fill="url(#goldGrad)" opacity="0.85" />

    <!-- ============================================== -->
    <!-- TOP SECTION: IDENTITY & HEADINGS               -->
    <!-- ============================================== -->
    <!-- Holy Cross & Open Bible Emblem -->
    <g transform="translate(1080, 150)" filter="url(#shadowGlow)">
      <!-- Bible Pages -->
      <path d="M -16 -24 C -56 -48 -120 -44 -156 -24 L -156 76 C -120 56 -56 56 -16 76 Z" fill="#E2E8F0" opacity="0.95" />
      <path d="M 16 -24 C 56 -48 120 -44 156 -24 L 156 76 C 120 56 56 56 16 76 Z" fill="#F8FAFC" opacity="0.95" />
      <!-- Bible Binding -->
      <path d="M -152 84 C -96 64 -32 64 0 88 C 32 64 96 64 152 84 L 156 94 C 96 74 32 74 0 98 C -32 74 -96 74 -156 94 Z" fill="url(#goldGrad)" />
      <!-- Central Cross -->
      <rect x="-9" y="-80" width="18" height="156" rx="5" fill="url(#goldGrad)" />
      <rect x="-48" y="-48" width="96" height="18" rx="5" fill="url(#goldGrad)" />
      <circle cx="0" cy="-48" r="7" fill="#FFFFFF" />
    </g>

    <!-- Top Pastoral Badge -->
    <g transform="translate(1080, 290)">
      <rect x="-320" y="-24" width="640" height="48" rx="24" fill="#0E243F" stroke="url(#goldGrad)" stroke-width="2" />
      <text x="0" y="8" font-family="'Nirmala UI', 'Vrinda', sans-serif" font-size="22" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">
        ✝ অফিসিয়াল ডিজিটাল বাংলা বাইবেল ও অধ্যয়ন প্ল্যাটফর্ম
      </text>
    </g>

    <!-- Main Titles -->
    <text x="1080" y="420" font-family="'Nirmala UI', 'Vrinda', 'Noto Serif Bengali', serif" font-size="96" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">
      বাংলা স্টাডি বাইবেল
    </text>
    <text x="1080" y="490" font-family="'Segoe UI', 'Nirmala UI', sans-serif" font-size="34" font-weight="800" fill="#94A3B8" text-anchor="middle" letter-spacing="10">
      BENGALI STUDY BIBLE
    </text>

    <!-- Invitations -->
    <text x="1080" y="560" font-family="'Nirmala UI', 'Vrinda', sans-serif" font-size="38" font-weight="700" fill="#FFFFFF" text-anchor="middle">
      “ঈশ্বরের বাক্য পড়ুন • বুঝুন • জীবনে প্রয়োগ করুন”
    </text>
    <text x="1080" y="615" font-family="'Segoe UI', sans-serif" font-size="28" font-weight="600" fill="#CBD5E1" text-anchor="middle">
      “Read • Understand • Apply God’s Word”
    </text>

    <!-- ============================================== -->
    <!-- MIDDLE SECTION: FEATURES & DEVICE REPRESENTATION -->
    <!-- ============================================== -->

    <!-- Device & AI Assistant Hero Showcase Box -->
    <g transform="translate(1080, 715)">
      <rect x="-960" y="0" width="1920" height="190" rx="32" fill="url(#cardBg)" stroke="url(#goldGrad)" stroke-width="2.5" filter="url(#shadowHeavy)" />
      
      <!-- Left: Device Support Badges -->
      <g transform="translate(-900, 45)">
        <rect x="0" y="0" width="480" height="100" rx="20" fill="#08182B" stroke="#1E3A5F" stroke-width="1.5" />
        <text x="240" y="42" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#F8FAFC" text-anchor="middle">📱 ফোন ও 💻 কম্পিউটার</text>
        <text x="240" y="76" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8" text-anchor="middle">Android • iOS • Windows • Mac</text>
      </g>

      <!-- Center: Deep AI Spotlight -->
      <g transform="translate(-360, 30)">
        <rect x="0" y="0" width="720" height="130" rx="24" fill="#0A1E35" stroke="url(#goldGrad)" stroke-width="2" />
        <circle cx="65" cy="65" r="36" fill="url(#goldGrad)" />
        <text x="65" y="76" font-family="'Nirmala UI', sans-serif" font-size="36" font-weight="bold" fill="#071324" text-anchor="middle">দীপ</text>
        <text x="125" y="52" font-family="'Nirmala UI', sans-serif" font-size="26" font-weight="bold" fill="#FFFFFF">দীপ — আপনার AI বাইবেল অধ্যয়ন সহায়ক</text>
        <text x="125" y="86" font-family="'Nirmala UI', sans-serif" font-size="19" fill="#FDE047">প্রামাণ্য শাস্ত্রীয় রেফারেন্স • ঐতিহাসিক প্রেক্ষাপট • প্রতিদিনের বাক্য</text>
        <text x="125" y="112" font-family="'Segoe UI', sans-serif" font-size="16" fill="#94A3B8">Deep AI: Authentic Bible Answers &amp; Zero AI Manufactured Scripture</text>
      </g>

      <!-- Right: Offline Badge -->
      <g transform="translate(420, 45)">
        <rect x="0" y="0" width="480" height="100" rx="20" fill="#08182B" stroke="#1E3A5F" stroke-width="1.5" />
        <text x="240" y="42" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#34D399" text-anchor="middle">✓ ১০০% বিশুদ্ধ ও অফলাইন</text>
        <text x="240" y="76" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8" text-anchor="middle">সম্পূর্ণ বিজ্ঞাপনহীন • বিনামূল্যে পাঠ্য</text>
      </g>
    </g>

    <!-- Side-by-Side Bilingual Feature Summary Panels -->
    <!-- Bengali Features Column (Left) -->
    <g transform="translate(120, 940)">
      <rect x="0" y="0" width="930" height="740" rx="30" fill="url(#panelBg)" stroke="url(#goldGrad)" stroke-width="2.5" filter="url(#shadowHeavy)" />
      
      <!-- Panel Header -->
      <rect x="40" y="36" width="850" height="66" rx="18" fill="#08182C" stroke="url(#goldGrad)" stroke-width="1.5" />
      <text x="465" y="80" font-family="'Nirmala UI', 'Vrinda', sans-serif" font-size="30" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">
        📖 প্রধান বৈশিষ্ট্যসমূহ (বাংলা)
      </text>

      <!-- 8 Bengali Features from Prompt Section 9 -->
      <g transform="translate(55, 150)">
        <!-- 1 -->
        <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
        <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">১</text>
        <text x="50" y="29" font-family="'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">সম্পূর্ণ বাইবেল পাঠ ও অনুসন্ধান</text>
        <text x="50" y="55" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8">প্রটেস্ট্যান্ট ক্যাননের ৬৬টি পুস্তক, ১,১৮৯ অধ্যায় ও দ্রুত সার্চ</text>

        <!-- 2 -->
        <g transform="translate(0, 68)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">২</text>
          <text x="50" y="29" font-family="'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">অধ্যায়ের প্রেক্ষাপট ও স্টাডি নোট</text>
          <text x="50" y="55" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8">ঐতিহাসিক পটভূমি, মূল ধর্মতাত্ত্বিক বার্তা ও গভীর পদ বিশ্লেষণ</text>
        </g>

        <!-- 3 -->
        <g transform="translate(0, 136)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">৩</text>
          <text x="50" y="29" font-family="'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">দীপ—আপনার AI বাইবেল অধ্যয়ন সহায়ক</text>
          <text x="50" y="55" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#FDE047">প্রামাণ্য শাস্ত্রীয় উত্তর, প্রেক্ষাপট ভিত্তিক তথ্য ও শূন্য মনগড়া পদ</text>
        </g>

        <!-- 4 -->
        <g transform="translate(0, 204)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">৪</text>
          <text x="50" y="29" font-family="'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">দৈনিক বাক্য ও ব্যক্তিগত পাঠ-পরিকল্পনা</text>
          <text x="50" y="55" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8">দীপ ৩৬৫ পরিকল্পনা, সকালের আধ্যাত্মিক প্রেরণা ও প্রগ্রেস ট্র্যাকিং</text>
        </g>

        <!-- 5 -->
        <g transform="translate(0, 272)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">৫</text>
          <text x="50" y="29" font-family="'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">Sermon Builder ও Pastor Tools</text>
          <text x="50" y="55" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8">উপদেশ রূপরেখা, স্টাডি গাইড, প্রার্থনা ও মণ্ডলী পরিচর্যার উপকরণ</text>
        </g>

        <!-- 6 -->
        <g transform="translate(0, 340)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">৬</text>
          <text x="50" y="29" font-family="'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">নতুন বিশ্বাসীর ৩০ দিনের যাত্রা</text>
          <text x="50" y="55" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8">খ্রিষ্টীয় বিশ্বাসের প্রাথমিক বুনিয়াদ ও সহজ আত্মিক বৃদ্ধির পথপ্রদর্শক</text>
        </g>

        <!-- 7 -->
        <g transform="translate(0, 408)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">৭</text>
          <text x="50" y="29" font-family="'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">বাংলা খ্রিষ্টীয় জ্ঞানভাণ্ডার</text>
          <text x="50" y="55" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8">ঐতিহাসিক বাংলা সাহিত্য, ধর্মতত্ত্ব ও অনুমোদিত গবেষণামূলক সংগ্রহ</text>
        </g>

        <!-- 8 -->
        <g transform="translate(0, 476)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">৮</text>
          <text x="50" y="29" font-family="'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">মোবাইল ও কম্পিউটারে সহজ ব্যবহার</text>
          <text x="50" y="55" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#94A3B8">এক ক্লিকে ইনস্টলেশন, অফলাইন ক্যাশিং ও স্ক্রিন রিডার সুবিধা</text>
        </g>
      </g>
    </g>

    <!-- English Features Column (Right) -->
    <g transform="translate(1110, 940)">
      <rect x="0" y="0" width="930" height="740" rx="30" fill="url(#panelBg)" stroke="url(#goldGrad)" stroke-width="2.5" filter="url(#shadowHeavy)" />
      
      <!-- Panel Header -->
      <rect x="40" y="36" width="850" height="66" rx="18" fill="#08182C" stroke="url(#goldGrad)" stroke-width="1.5" />
      <text x="465" y="80" font-family="'Segoe UI', sans-serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">
        📖 KEY FEATURES (ENGLISH)
      </text>

      <!-- 8 English Features from Prompt Section 9 -->
      <g transform="translate(55, 150)">
        <!-- 1 -->
        <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
        <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">1</text>
        <text x="50" y="29" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">Bible reading and search</text>
        <text x="50" y="55" font-family="'Segoe UI', sans-serif" font-size="17" fill="#94A3B8">Complete 66 Protestant Canonical books, 1,189 chapters &amp; fast search</text>

        <!-- 2 -->
        <g transform="translate(0, 68)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">2</text>
          <text x="50" y="29" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">Context and study notes</text>
          <text x="50" y="55" font-family="'Segoe UI', sans-serif" font-size="17" fill="#94A3B8">Historical background, theological outlines &amp; verse commentaries</text>
        </g>

        <!-- 3 -->
        <g transform="translate(0, 136)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">3</text>
          <text x="50" y="29" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">Deep—your AI Bible Study Assistant</text>
          <text x="50" y="55" font-family="'Segoe UI', sans-serif" font-size="17" fill="#FDE047">Scriptural answers, contextual insights &amp; zero manufactured text</text>
        </g>

        <!-- 4 -->
        <g transform="translate(0, 204)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">4</text>
          <text x="50" y="29" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">Daily Word &amp; personalised plans</text>
          <text x="50" y="55" font-family="'Segoe UI', sans-serif" font-size="17" fill="#94A3B8">Deep 365 reading plan, daily promises &amp; spiritual progress tracking</text>
        </g>

        <!-- 5 -->
        <g transform="translate(0, 272)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">5</text>
          <text x="50" y="29" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">Sermon Builder and Pastor Tools</text>
          <text x="50" y="55" font-family="'Segoe UI', sans-serif" font-size="17" fill="#94A3B8">Sermon outlines, group study kits, teaching guides &amp; prayer guides</text>
        </g>

        <!-- 6 -->
        <g transform="translate(0, 340)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">6</text>
          <text x="50" y="29" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">30-day journey for new believers</text>
          <text x="50" y="55" font-family="'Segoe UI', sans-serif" font-size="17" fill="#94A3B8">Foundations of Christian faith, prayer guide &amp; spiritual growth</text>
        </g>

        <!-- 7 -->
        <g transform="translate(0, 408)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">7</text>
          <text x="50" y="29" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">Bengali Christian Knowledge Library</text>
          <text x="50" y="55" font-family="'Segoe UI', sans-serif" font-size="17" fill="#94A3B8">Historical Bengali theological writings &amp; open Christian archives</text>
        </g>

        <!-- 8 -->
        <g transform="translate(0, 476)">
          <circle cx="20" cy="22" r="14" fill="url(#goldGrad)" />
          <text x="20" y="28" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">8</text>
          <text x="50" y="29" font-family="'Segoe UI', sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">Easy access on mobile and computer</text>
          <text x="50" y="55" font-family="'Segoe UI', sans-serif" font-size="17" fill="#94A3B8">PWA 1-click install, offline persistence &amp; WCAG AA accessibility</text>
        </g>
      </g>
    </g>

    <!-- ============================================== -->
    <!-- BOTTOM SECTION: QR INVITATION & PERMANENT LINK -->
    <!-- ============================================== -->
    <!-- Master QR Container Card -->
    <g transform="translate(1080, 1720)">
      <rect x="-960" y="0" width="1920" height="740" rx="36" fill="#FFFFFF" stroke="url(#goldGrad)" stroke-width="4" filter="url(#shadowHeavy)" />
      
      <!-- Top Ribbon on White Card -->
      <rect x="-420" y="-24" width="840" height="52" rx="26" fill="url(#goldGrad)" />
      <text x="0" y="11" font-family="'Nirmala UI', 'Vrinda', sans-serif" font-size="24" font-weight="bold" fill="#071324" text-anchor="middle">
        সরাসরি ক্যামেরা দিয়ে স্ক্যান করুন • কোনো ফি বা বিজ্ঞাপন নেই
      </text>

      <!-- QR Left Column (QR Image will be composited at x=200, y=1790, size 560x560) -->
      <!-- We leave a clean white 600x600 square on the left side of the card -->
      <rect x="-860" y="55" width="600" height="600" rx="24" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
      
      <!-- Right Side Content of QR Card -->
      <g transform="translate(-200, 80)">
        <!-- QR Invitations -->
        <text x="0" y="45" font-family="'Nirmala UI', 'Vrinda', sans-serif" font-size="36" font-weight="bold" fill="#071324">
          “স্ক্যান করুন—বিনামূল্যে পড়ুন ও ইনস্টল করুন”
        </text>
        <text x="0" y="90" font-family="'Segoe UI', sans-serif" font-size="26" font-weight="700" fill="#0284C7">
          “Scan to read and install”
        </text>

        <!-- Bullet Highlights -->
        <g transform="translate(0, 140)">
          <circle cx="16" cy="14" r="10" fill="#16A34A" />
          <text x="16" y="20" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✓</text>
          <text x="38" y="22" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#0F172A">প্লে স্টোর অ্যাকাউন্ট ছাড়াই সেকেন্ডে ফোনে ইনস্টল</text>
          <text x="38" y="48" font-family="'Nirmala UI', sans-serif" font-size="17" fill="#64748B">ব্রাউজার মেনু থেকে এক ক্লিকে সরাসরি আপনার হোম স্ক্রিনে যুক্ত করুন</text>

          <circle cx="16" cy="94" r="10" fill="#0284C7" />
          <text x="16" y="100" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✓</text>
          <text x="38" y="102" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#0F172A">একবার যুক্ত করলেই আজীবন অফলাইনে সম্পূর্ণ বাইবেল পাঠ</text>
          <text x="38" y="128" font-family="'Nirmala UI', sans-serif" font-size="17" fill="#64748B">কোনো নেটওয়ার্ক ড্রপে পাঠ বিঘ্নিত হবে না, মেমোরি সাশ্রয়ী ও দ্রুত</text>

          <circle cx="16" cy="174" r="10" fill="#D97706" />
          <text x="16" y="180" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✓</text>
          <text x="38" y="182" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#0F172A">পবিত্র বাক্যের বিশুদ্ধতা ও শূন্য মনগড়া শাস্ত্র নীতি</text>
          <text x="38" y="208" font-family="'Nirmala UI', sans-serif" font-size="17" fill="#64748B">প্রামাণ্য IRV বাংলা ও কেরি অনুবাদ, টীকা ও শাস্ত্র সম্পূর্ণ পৃথক</text>
        </g>

        <!-- Permanent Typed Link Box Directly Below Text / Next to QR -->
        <g transform="translate(0, 410)">
          <rect x="0" y="0" width="1050" height="96" rx="20" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2" />
          <text x="30" y="40" font-family="'Segoe UI', sans-serif" font-size="15" font-weight="bold" fill="#64748B" letter-spacing="1">PERMANENT BROWSER &amp; INSTALL LINK:</text>
          <text x="30" y="74" font-family="'Segoe UI', 'Courier New', monospace" font-size="26" font-weight="bold" fill="#0369A1">
            ${PERMANENT_INSTALL_URL}
          </text>
        </g>

        <!-- Device Icons line inside card -->
        <g transform="translate(0, 545)">
          <text x="0" y="20" font-family="'Nirmala UI', sans-serif" font-size="18" font-weight="bold" fill="#334155">
            সমর্থিত ডিভাইস: <tspan fill="#0284C7">Android • iPhone • iPad • Windows PC • MacBook • ওয়েব ব্রাউজার</tspan>
          </text>
          <text x="0" y="48" font-family="'Nirmala UI', sans-serif" font-size="15" fill="#64748B">
            Google Chrome, Safari, Edge, Firefox বা যেকোনো আধুনিক ব্রাউজারে সরাসরি চলে।
          </text>
        </g>
      </g>
    </g>

    <!-- ============================================== -->
    <!-- FOOTER SECTION                                 -->
    <!-- ============================================== -->
    <g transform="translate(1080, 2520)">
      <text x="0" y="28" font-family="'Segoe UI', 'Nirmala UI', sans-serif" font-size="24" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">
        Windows • macOS • Android • iPhone/iPad • Browser
      </text>
      <text x="0" y="66" font-family="'Nirmala UI', 'Vrinda', sans-serif" font-size="26" font-weight="bold" fill="#FFFFFF" text-anchor="middle">
        “সবার জন্য সহজ বাংলা বাইবেল অধ্যয়ন”
      </text>
      <text x="0" y="98" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="600" fill="#94A3B8" text-anchor="middle">
        “Accessible Bengali Bible study for everyone”
      </text>
      <text x="0" y="126" font-family="'Nirmala UI', sans-serif" font-size="16" fill="#64748B" text-anchor="middle">
        প্রতিষ্ঠাতা ও তত্ত্বাবধায়ক: রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh) • ayanghosh75@gmail.com • কপিরাইট © ২০২৬
      </text>
    </g>
  </svg>
  `;

  // Composite the base poster SVG with the QR Code buffer
  // Note: Inside the 2160x2700 poster, QR container is at translate(1080, 1720) with left box at (-860, 55).
  // In absolute coordinates: left = 1080 - 860 + 20 = 240, top = 1720 + 55 + 20 = 1795.
  const qrLeft = 240;
  const qrTop = 1795;

  const posterBaseBuffer = await sharp(Buffer.from(posterSvg))
    .png()
    .toBuffer();

  const finalJpgBuffer = await sharp(posterBaseBuffer)
    .composite([
      {
        input: qrForPosterBuffer,
        top: qrTop,
        left: qrLeft,
      },
    ])
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toBuffer();

  // Save poster to public and artifact directories
  const posterPublicPath = path.join(ROOT_DIR, 'public', 'bengali-study-bible-installation-poster.jpg');
  const flyerPublicPath = path.join(ROOT_DIR, 'public', 'bengali-study-bible-circulation-flyer.jpg');
  fs.writeFileSync(posterPublicPath, finalJpgBuffer);
  fs.writeFileSync(flyerPublicPath, finalJpgBuffer);
  console.log(`✓ Saved Master Poster JPG (2160x2700): ${posterPublicPath}`);

  // Copy to Artifact Directory if accessible
  try {
    if (fs.existsSync(ARTIFACT_DIR)) {
      const artifactPosterPath = path.join(ARTIFACT_DIR, 'bengali-study-bible-installation-poster.jpg');
      const artifactQrPngPath = path.join(ARTIFACT_DIR, 'qr-bengalistudybible-install.png');
      const artifactQrSvgPath = path.join(ARTIFACT_DIR, 'qr-bengalistudybible-install.svg');
      fs.writeFileSync(artifactPosterPath, finalJpgBuffer);
      fs.writeFileSync(artifactQrPngPath, qrPngBuffer);
      fs.writeFileSync(artifactQrSvgPath, qrSvgString);
      console.log(`✓ Copied Poster & QR assets to brain artifacts directory: ${ARTIFACT_DIR}`);
    }
  } catch (err) {
    console.warn('Could not copy to brain artifacts directory:', err.message);
  }

  // ------------------------------------------------------------
  // 3. PROGRAMMATIC QR VALIDATION (VERIFY EMBEDDED QR IN JPG)
  // ------------------------------------------------------------
  console.log('\n[3/4] Validating embedded QR code inside exported JPG...');

  // Extract the exact region where the QR code was embedded in the exported JPG (with some margin)
  const extractedQrBuffer = await sharp(finalJpgBuffer)
    .extract({
      left: qrLeft - 10,
      top: qrTop - 10,
      width: 580,
      height: 580,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const decodedResult = jsQR(
    new Uint8ClampedArray(extractedQrBuffer.data),
    extractedQrBuffer.info.width,
    extractedQrBuffer.info.height
  );

  console.log('Decoded URL from final JPG:', decodedResult?.data);
  if (!decodedResult || decodedResult.data !== PERMANENT_INSTALL_URL) {
    throw new Error(`CRITICAL: QR validation failed! Decoded: "${decodedResult?.data}", Expected: "${PERMANENT_INSTALL_URL}"`);
  }
  console.log(`✓ QR CODE VALIDATION PASSED: Exactly matches "${PERMANENT_INSTALL_URL}".`);

  // Also validate standalone PNG QR
  const standaloneRaw = await sharp(qrPngBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const standaloneDecoded = jsQR(new Uint8ClampedArray(standaloneRaw.data), standaloneRaw.info.width, standaloneRaw.info.height);
  console.log('Decoded URL from standalone PNG QR:', standaloneDecoded?.data);
  if (!standaloneDecoded || standaloneDecoded.data !== PERMANENT_INSTALL_URL) {
    throw new Error(`CRITICAL: Standalone PNG QR failed! Decoded: "${standaloneDecoded?.data}"`);
  }
  console.log(`✓ STANDALONE PNG QR VALIDATION PASSED: Matches "${PERMANENT_INSTALL_URL}".`);

  // ------------------------------------------------------------
  // 4. SUMMARY
  // ------------------------------------------------------------
  console.log('\n[4/4] Asset generation and verification complete:');
  console.log(`  1. Permanent Link: ${PERMANENT_INSTALL_URL}`);
  console.log(`  2. PNG QR:         ${qrInstallPngPath}`);
  console.log(`  3. SVG QR:         ${qrSvgPath}`);
  console.log(`  4. Poster JPG:     ${posterPublicPath} (2160 × 2700 px)`);
  console.log('='.repeat(80));
}

generateAssets().catch((err) => {
  console.error('FAILED TO GENERATE ASSETS:', err);
  process.exit(1);
});
