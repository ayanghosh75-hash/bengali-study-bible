import sharp from 'sharp';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Public endpoints
const LIVE_INSTALL_URL = process.env.PUBLIC_INSTALL_URL || 'https://bengalistudybible.surge.sh/install';
const OFFICIAL_DOMAIN = 'bengalistudybible.com';
const OFFICIAL_INSTALL_URL = 'https://bengalistudybible.com/install';

console.log('='.repeat(80));
console.log('   BENGALI STUDY BIBLE — CIRCULATION FLYER & POSTER GENERATOR (JPG)');
console.log(`   Live QR Target URL:    ${LIVE_INSTALL_URL}`);
console.log(`   Permanent Domain:      ${OFFICIAL_DOMAIN}`);
console.log('='.repeat(80));

async function generateCirculationFlyer() {
  const width = 1200;
  const height = 1750;

  // 1. Generate High-Res, High-Contrast QR code (320x320)
  // Deep navy on crisp white background with Level H error correction
  const qrBuffer = await QRCode.toBuffer(LIVE_INSTALL_URL, {
    width: 320,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#071324',
      light: '#FFFFFF'
    }
  });

  // 2. Build Master SVG Canvas with Bengali & English Typography, Badges, and Guides
  const svgContent = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Regal Navy Gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#030811" />
        <stop offset="35%" stop-color="#071324" />
        <stop offset="70%" stop-color="#0B1C33" />
        <stop offset="100%" stop-color="#040913" />
      </linearGradient>

      <!-- Radiant Gold Gradient -->
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF8E7" />
        <stop offset="30%" stop-color="#F3E5AB" />
        <stop offset="60%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#997023" />
      </linearGradient>

      <!-- Step Container Gradient -->
      <linearGradient id="stepBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0D2038" />
        <stop offset="100%" stop-color="#061221" />
      </linearGradient>

      <!-- Feature Card Gradient -->
      <linearGradient id="featureCardBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0E233E" />
        <stop offset="100%" stop-color="#071425" />
      </linearGradient>

      <!-- Shadow Filters -->
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.65" />
      </filter>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Base Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Ornate Double Gold Borders -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="30" fill="none" stroke="url(#goldGrad)" stroke-width="2.8" opacity="0.75" />
    <rect x="36" y="36" width="${width - 72}" height="${height - 72}" rx="22" fill="none" stroke="url(#goldGrad)" stroke-width="1.2" opacity="0.35" />

    <!-- ============================================== -->
    <!-- SECTION 1: HEADER & OFFICIAL LOGO EMBLEM       -->
    <!-- ============================================== -->
    <g transform="translate(600, 70)" filter="url(#softGlow)">
      <!-- Open Bible Pages -->
      <path d="M -8 -12 C -28 -24 -60 -22 -78 -12 L -78 38 C -60 28 -28 28 -8 38 Z" fill="#E2E8F0" opacity="0.95" />
      <path d="M 8 -12 C 28 -24 60 -22 78 -12 L 78 38 C 60 28 28 28 8 38 Z" fill="#F8FAFC" opacity="0.95" />
      <!-- Book Binding Base -->
      <path d="M -76 42 C -48 32 -16 32 0 44 C 16 32 48 32 76 42 L 78 47 C 48 37 16 37 0 49 C -16 37 -48 37 -78 47 Z" fill="url(#goldGrad)" />
      <!-- Central Golden Cross -->
      <rect x="-4.5" y="-40" width="9" height="78" rx="2.5" fill="url(#goldGrad)" />
      <rect x="-24" y="-24" width="48" height="9" rx="2.5" fill="url(#goldGrad)" />
      <!-- Radiant Knowledge Center -->
      <circle cx="0" cy="-24" r="3.5" fill="#FFFFFF" />
    </g>

    <!-- Platform Title -->
    <text x="600" y="156" font-family="'Nirmala UI', 'Vrinda', 'Noto Serif Bengali', serif" font-size="48" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="1.5">বাংলা স্টাডি বাইবেল</text>
    <text x="600" y="190" font-family="'Segoe UI', 'Nirmala UI', sans-serif" font-size="15" font-weight="700" fill="#9FB3C8" text-anchor="middle" letter-spacing="5">BENGALI STUDY BIBLE • OFFICIAL MOBILE PWA APP</text>
    
    <!-- Tagline & Core Philosophy -->
    <text x="600" y="222" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="20" font-weight="600" fill="#FFFFFF" text-anchor="middle">পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন</text>
    <text x="600" y="248" font-family="'Nirmala UI', sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">মণ্ডলীর উপাসনা, প্রচার প্রস্তুতি ও ব্যক্তিগত বাইবেল পাঠের প্রামাণ্য ডিজিটাল পরিবেশ</text>

    <!-- ============================================== -->
    <!-- SECTION 2: HERO QR CODE & FAST INSTALL CARD    -->
    <!-- ============================================== -->
    <rect x="90" y="272" width="1020" height="428" rx="26" fill="#FFFFFF" stroke="url(#goldGrad)" stroke-width="3" filter="url(#cardShadow)" />

    <!-- Pill on Top Edge of White Card -->
    <rect x="330" y="254" width="540" height="38" rx="19" fill="url(#goldGrad)" />
    <text x="600" y="279" font-family="'Nirmala UI', sans-serif" font-size="16.5" font-weight="bold" fill="#071324" text-anchor="middle">মোবাইল ক্যামেরা দিয়ে সরাসরি স্ক্যান করে ইনস্টল করুন</text>

    <!-- Under QR Code (Left Column: 320x320 QR placed at left: 140, top: 312) -->
    <text x="300" y="654" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#071324" text-anchor="middle">মোবাইলের ক্যামেরা তাক করলেই লিংক আসবে</text>
    <text x="300" y="676" font-family="'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#64748B" text-anchor="middle">Google Lens বা যেকোনো QR স্ক্যানারে সরাসরি সমর্থিত</text>

    <!-- Right Column Inside Hero Card: Direct Value & Highlights -->
    <g transform="translate(500, 312)">
      <!-- Feature Header Pill -->
      <rect x="0" y="0" width="570" height="44" rx="12" fill="#071324" />
      <text x="285" y="28" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#FDE047" text-anchor="middle">কোনো প্লে স্টোর অ্যাকাউন্ট বা ডাউনলোডের ঝামেলা নেই</text>

      <!-- Key Benefits List -->
      <g transform="translate(10, 65)">
        <!-- Item 1 -->
        <circle cx="10" cy="12" r="8" fill="#0284C7" />
        <path d="M 6 12 L 9 15 L 15 9" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" />
        <text x="30" y="16" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#0F172A">১ সেকেন্ডে আপনার মোবাইলে যুক্ত হবে</text>
        <text x="30" y="38" font-family="'Nirmala UI', sans-serif" font-size="13.5" fill="#475569">ব্রাউজার থেকে এক ক্লিকে সরাসরি ফোনের হোম স্ক্রিনে ইনস্টল করা যায়।</text>

        <!-- Item 2 -->
        <circle cx="10" cy="62" r="8" fill="#16A34A" />
        <path d="M 6 62 L 9 65 L 15 59" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" />
        <text x="30" y="66" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#0F172A">একবার ইনস্টলে আজীবন অফলাইন পাঠ</text>
        <text x="30" y="88" font-family="'Nirmala UI', sans-serif" font-size="13.5" fill="#475569">ইন্টারনেট সংযোগ ছাড়াই ৬৬টি পুস্তক ও নিজস্ব নোট পড়া যায়।</text>

        <!-- Item 3 -->
        <circle cx="10" cy="112" r="8" fill="#D97706" />
        <path d="M 6 112 L 9 115 L 15 109" stroke="#FFF" stroke-width="2" fill="none" stroke-linecap="round" />
        <text x="30" y="116" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#0F172A">১০০% বিজ্ঞাপনহীন, নিরাপদ ও মেমরি সাশ্রয়ী</text>
        <text x="30" y="138" font-family="'Nirmala UI', sans-serif" font-size="13.5" fill="#475569">কোনো বিজ্ঞাপন নেই, ফোন স্লো করে না এবং কোনো তথ্য সংগ্রহ করে না।</text>
      </g>

      <!-- Direct Link Box -->
      <rect x="0" y="235" width="570" height="78" rx="14" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5" />
      <text x="285" y="264" font-family="'Segoe UI', sans-serif" font-size="14.5" font-weight="bold" fill="#0284C7" text-anchor="middle">${LIVE_INSTALL_URL}</text>
      <text x="285" y="292" font-family="'Nirmala UI', sans-serif" font-size="13" fill="#64748B" text-anchor="middle">অফিসিয়াল পোর্টাল: <tspan font-weight="bold" fill="#0F172A">${OFFICIAL_INSTALL_URL}</tspan></text>
      
      <text x="285" y="336" font-family="'Nirmala UI', sans-serif" font-size="12.5" font-weight="600" fill="#0F172A" text-anchor="middle">সাপোর্টেড ডিভাইস: Android • iPhone • iPad • ট্যাবলেট • কম্পিউটার</text>
    </g>

    <!-- ============================================== -->
    <!-- SECTION 3: 3-STEP INSTALLATION FLOW            -->
    <!-- ============================================== -->
    <rect x="60" y="725" width="1080" height="295" rx="22" fill="url(#stepBg)" stroke="url(#goldGrad)" stroke-width="1.8" />

    <!-- Step Badge Header -->
    <rect x="330" y="708" width="540" height="36" rx="18" fill="url(#goldGrad)" />
    <text x="600" y="732" font-family="'Nirmala UI', sans-serif" font-size="16.5" font-weight="bold" fill="#071324" text-anchor="middle">মোবাইলে ইনস্টল ও ব্যবহারের ৩টি সহজ ধাপ</text>

    <!-- Subtitle -->
    <text x="600" y="768" font-family="'Nirmala UI', sans-serif" font-size="14" fill="#9FB3C8" text-anchor="middle">প্লে স্টোরে খুঁজতে হবে না — নিচের ৩টি ধাপে সরাসরি আপনার ফোনে যুক্ত করে নিন:</text>

    <!-- Step 1 Card -->
    <g transform="translate(85, 785)">
      <rect x="0" y="0" width="315" height="215" rx="16" fill="#06101D" stroke="url(#goldGrad)" stroke-width="1" opacity="0.95" />
      <circle cx="157" cy="36" r="22" fill="url(#goldGrad)" />
      <text x="157" y="44" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="bold" fill="#071324" text-anchor="middle">১</text>
      <text x="157" y="84" font-family="'Nirmala UI', sans-serif" font-size="17" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">QR কোড স্ক্যান করুন</text>
      <text x="157" y="112" font-family="'Nirmala UI', sans-serif" font-size="13" fill="#CBD5E1" text-anchor="middle">ফোনের ক্যামেরা বা Google Lens</text>
      <text x="157" y="132" font-family="'Nirmala UI', sans-serif" font-size="13" fill="#CBD5E1" text-anchor="middle">দিয়ে উপরের QR কোডটি স্ক্যান</text>
      <text x="157" y="152" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#FDE047" text-anchor="middle">করে লিংকটি ওপেন করুন</text>
      <rect x="25" y="170" width="265" height="30" rx="8" fill="#0C1B2E" stroke="#334E68" stroke-width="1" />
      <text x="157" y="190" font-family="'Nirmala UI', sans-serif" font-size="11.5" fill="#94A3B8" text-anchor="middle">ক্যামেরা ধরিলেই লিংক আসবে</text>
    </g>

    <!-- Step 2 Card -->
    <g transform="translate(442, 785)">
      <rect x="0" y="0" width="315" height="215" rx="16" fill="#06101D" stroke="url(#goldGrad)" stroke-width="1.2" opacity="0.95" />
      <circle cx="157" cy="36" r="22" fill="url(#goldGrad)" />
      <text x="157" y="44" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="bold" fill="#071324" text-anchor="middle">২</text>
      <text x="157" y="84" font-family="'Nirmala UI', sans-serif" font-size="17" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">ইনস্টল বোতামে চাপুন</text>
      <text x="157" y="112" font-family="'Nirmala UI', sans-serif" font-size="13" fill="#CBD5E1" text-anchor="middle">Android: "অ্যাপ ইনস্টল করুন" বা</text>
      <text x="157" y="132" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#38BDF8" text-anchor="middle">Chrome মেনু (⋮) → Add to Home</text>
      <text x="157" y="152" font-family="'Nirmala UI', sans-serif" font-size="13" fill="#CBD5E1" text-anchor="middle">iPhone: Safari শেয়ার (Share) → Home</text>
      <rect x="25" y="170" width="265" height="30" rx="8" fill="#0C1B2E" stroke="#334E68" stroke-width="1" />
      <text x="157" y="190" font-family="'Nirmala UI', sans-serif" font-size="11.5" fill="#94A3B8" text-anchor="middle">Android &amp; iPhone উভয়েই সহজ</text>
    </g>

    <!-- Step 3 Card -->
    <g transform="translate(800, 785)">
      <rect x="0" y="0" width="315" height="215" rx="16" fill="#06101D" stroke="url(#goldGrad)" stroke-width="1" opacity="0.95" />
      <circle cx="157" cy="36" r="22" fill="url(#goldGrad)" />
      <text x="157" y="44" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="bold" fill="#071324" text-anchor="middle">৩</text>
      <text x="157" y="84" font-family="'Nirmala UI', sans-serif" font-size="17" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">অফলাইনে অধ্যয়ন করুন</text>
      <text x="157" y="112" font-family="'Nirmala UI', sans-serif" font-size="13" fill="#CBD5E1" text-anchor="middle">মোবাইলের হোমস্ক্রিনে বাইবেল আইকন</text>
      <text x="157" y="132" font-family="'Nirmala UI', sans-serif" font-size="13" fill="#CBD5E1" text-anchor="middle">যুক্ত হবে। যেকোনো সময় ট্যাপ</text>
      <text x="157" y="152" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#4ADE80" text-anchor="middle">করে নেট ছাড়াই শাস্ত্র পড়ুন!</text>
      <rect x="25" y="170" width="265" height="30" rx="8" fill="#0C1B2E" stroke="#334E68" stroke-width="1" />
      <text x="157" y="190" font-family="'Nirmala UI', sans-serif" font-size="11.5" fill="#94A3B8" text-anchor="middle">এরপর ইন্টারনেট ছাড়াই চলবে</text>
    </g>

    <!-- ============================================== -->
    <!-- SECTION 4: 6 CORE PLATFORM PILLARS             -->
    <!-- ============================================== -->
    <text x="600" y="1055" font-family="'Nirmala UI', sans-serif" font-size="20" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">পবিত্র শাস্ত্র অধ্যয়নের ৬টি অনন্য বৈশিষ্ট্য</text>
    <text x="600" y="1080" font-family="'Nirmala UI', sans-serif" font-size="13.5" fill="#94A3B8" text-anchor="middle">মণ্ডলীর উপাসনা, প্রচার প্রস্তুতি ও ব্যক্তিগত আত্মিক বৃদ্ধির সম্পূর্ণ ডিজিটাল পরিবেশ</text>

    <!-- Row 1 of Features -->
    <!-- Feature 1 -->
    <g transform="translate(60, 1100)">
      <rect x="0" y="0" width="345" height="130" rx="16" fill="url(#featureCardBg)" stroke="#334E68" stroke-width="1.2" />
      <rect x="18" y="16" width="36" height="24" rx="6" fill="#FDE047" opacity="0.2" />
      <text x="36" y="33" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="bold" fill="#FDE047" text-anchor="middle">৬৬</text>
      <text x="64" y="34" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#FDE047">ক্যানোনিকাল পুস্তক</text>
      <text x="20" y="64" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">পুরাতন ও নতুন নিয়মের সম্পূর্ণ পাঠ্য,</text>
      <text x="20" y="84" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">বিএসআই (BSI) বিশুদ্ধ বাংলা অনুবাদ ও</text>
      <text x="20" y="104" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#94A3B8">দ্রুত পদ অনুসন্ধান সুবিধা।</text>
    </g>

    <!-- Feature 2 -->
    <g transform="translate(427, 1100)">
      <rect x="0" y="0" width="345" height="130" rx="16" fill="url(#featureCardBg)" stroke="#334E68" stroke-width="1.2" />
      <rect x="18" y="16" width="46" height="24" rx="6" fill="#38BDF8" opacity="0.2" />
      <text x="41" y="33" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#38BDF8" text-anchor="middle">সার্মন</text>
      <text x="74" y="34" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#38BDF8">আধুনিক প্রচার বিল্ডার</text>
      <text x="20" y="64" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">রবিবার উপাসনা ও প্রচারের জন্য</text>
      <text x="20" y="84" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">১০-৬০ মিনিটের রূপরেখা, মূলভাব ও</text>
      <text x="20" y="104" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#94A3B8">স্লাইড তৈরির স্বয়ংক্রিয় ব্যবস্থা।</text>
    </g>

    <!-- Feature 3 -->
    <g transform="translate(795, 1100)">
      <rect x="0" y="0" width="345" height="130" rx="16" fill="url(#featureCardBg)" stroke="#334E68" stroke-width="1.2" />
      <!-- 4 color highlight dots badge -->
      <g transform="translate(18, 20)">
        <circle cx="6" cy="6" r="5" fill="#FACC15" />
        <circle cx="16" cy="6" r="5" fill="#4ADE80" />
        <circle cx="26" cy="6" r="5" fill="#60A5FA" />
        <circle cx="36" cy="6" r="5" fill="#F472B6" />
      </g>
      <text x="68" y="34" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#4ADE80">৪ রঙে হাইলাইট ও নোট</text>
      <text x="20" y="64" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">হলুদ, সবুজ, নীল ও গোলাপি রঙের</text>
      <text x="20" y="84" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">প্যাস্টেল মার্কার এবং যেকোনো পদে</text>
      <text x="20" y="104" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#94A3B8">নিজস্ব স্টাডি ডায়েরি সংরক্ষণ।</text>
    </g>

    <!-- Row 2 of Features -->
    <!-- Feature 4 -->
    <g transform="translate(60, 1245)">
      <rect x="0" y="0" width="345" height="130" rx="16" fill="url(#featureCardBg)" stroke="#334E68" stroke-width="1.2" />
      <rect x="18" y="16" width="46" height="24" rx="6" fill="#C084FC" opacity="0.2" />
      <text x="41" y="33" font-family="'Segoe UI', sans-serif" font-size="12" font-weight="bold" fill="#C084FC" text-anchor="middle">Α - Ω</text>
      <text x="74" y="34" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#C084FC">মূল ভাষা ও পদ গবেষণা</text>
      <text x="20" y="64" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">মূল হিব্রু ও গ্রিক ভাষার গভীর অর্থ,</text>
      <text x="20" y="84" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">স্ট্রংস রেফারেন্স, ক্রস-রেফারেন্স এবং</text>
      <text x="20" y="104" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#94A3B8">ঐতিহাসিক পটভূমি বিশ্লেষণ।</text>
    </g>

    <!-- Feature 5 -->
    <g transform="translate(427, 1245)">
      <rect x="0" y="0" width="345" height="130" rx="16" fill="url(#featureCardBg)" stroke="#334E68" stroke-width="1.2" />
      <rect x="18" y="16" width="50" height="24" rx="6" fill="#F472B6" opacity="0.2" />
      <text x="43" y="33" font-family="'Nirmala UI', sans-serif" font-size="11" font-weight="bold" fill="#F472B6" text-anchor="middle">অফলাইন</text>
      <text x="78" y="34" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#F472B6">১০০% বিজ্ঞাপনহীন PWA</text>
      <text x="20" y="64" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">কোনো বাণিজ্যিক বিজ্ঞাপন নেই,</text>
      <text x="20" y="84" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">কোনো ট্র্যাকিং নেই, পবিত্র শাস্ত্রপাঠে</text>
      <text x="20" y="104" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#94A3B8">শতভাগ মনোযোগ ও পূর্ণ একাগ্রতা।</text>
    </g>

    <!-- Feature 6 -->
    <g transform="translate(795, 1245)">
      <rect x="0" y="0" width="345" height="130" rx="16" fill="url(#featureCardBg)" stroke="#334E68" stroke-width="1.2" />
      <rect x="18" y="16" width="46" height="24" rx="6" fill="#FBBF24" opacity="0.2" />
      <text x="41" y="33" font-family="'Nirmala UI', sans-serif" font-size="11.5" font-weight="bold" fill="#FBBF24" text-anchor="middle">ইনস্টল</text>
      <text x="74" y="34" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#FBBF24">প্লে স্টোর ছাড়াই দ্রুত ইনস্টল</text>
      <text x="20" y="64" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">ফোনের মেমরি সাশ্রয়ী হালকা অ্যাপ,</text>
      <text x="20" y="84" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#CBD5E1">এক ক্লিকেই ইনস্টল হয় এবং আজীবন</text>
      <text x="20" y="104" font-family="'Nirmala UI', sans-serif" font-size="12.5" fill="#94A3B8">ফ্রি সক্রিয় থাকে।</text>
    </g>

    <!-- Golden Commitment Strip -->
    <rect x="60" y="1395" width="1080" height="34" rx="10" fill="#071324" stroke="url(#goldGrad)" stroke-width="1" />
    <text x="600" y="1418" font-family="'Nirmala UI', sans-serif" font-size="13.5" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">★ সম্পূর্ণ বিনামূল্যে • কোনো বিজ্ঞাপন নেই • খ্রিস্টীয় আত্মিক পরিচর্যায় চিরকাল নিবেদিত ★</text>

    <!-- ============================================== -->
    <!-- SECTION 5: SCRIPTURE VERSE & FOUNDER FOOTER    -->
    <!-- ============================================== -->
    <!-- Scripture Verse Ribbon -->
    <text x="600" y="1465" font-family="'Nirmala UI', 'Vrinda', serif" font-size="17" font-weight="bold" fill="#FFFFFF" text-anchor="middle">"তোমার বাক্য আমার চরণের প্রদীপ ও আমার পথের আলোক।"</text>
    <text x="600" y="1488" font-family="'Nirmala UI', 'Vrinda', sans-serif" font-size="13" fill="#D4AF37" text-anchor="middle">— গীতসংহিতা ১১৯:১০৫ (Psalms 119:105)</text>

    <!-- Official Ministry & Developer Identity Card -->
    <rect x="60" y="1510" width="1080" height="180" rx="20" fill="#040B15" stroke="url(#goldGrad)" stroke-width="2" />

    <!-- Founder & Developer Lockup -->
    <text x="600" y="1548" font-family="'Nirmala UI', sans-serif" font-size="18" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">প্রতিষ্ঠাতা, স্বত্বাধিকারী ও ডেভেলপার: রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)</text>
    <text x="600" y="1578" font-family="'Segoe UI', 'Nirmala UI', sans-serif" font-size="14.5" fill="#9FB3C8" text-anchor="middle">অফিসিয়াল যোগাযোগ ও আত্মিক সহায়তা: <tspan fill="#FDE047" font-weight="bold">ayanghosh75@gmail.com</tspan> • ওয়েবসাইট: <tspan fill="#38BDF8" font-weight="bold">bengalistudybible.com</tspan></text>
    
    <!-- Divider -->
    <line x1="120" y1="1602" x2="1080" y2="1602" stroke="url(#goldGrad)" stroke-width="1" opacity="0.4" />

    <!-- Sharing Call to Action -->
    <text x="600" y="1635" font-family="'Nirmala UI', sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ঈশ্বরের পবিত্র বাক্য প্রচার ও আত্মিক বৃদ্ধিতে চার্চের সদস্য, পরিবার ও বন্ধুদের মাঝে এই পোস্টারটি শেয়ার করুন</text>
    <text x="600" y="1662" font-family="'Segoe UI', sans-serif" font-size="12" fill="#64748B" text-anchor="middle">Bengali Study Bible Universal PWA • Authorized Gospel Ministry Distribution • 2026</text>

  </svg>
  `;

  // 3. Composite QR code onto the master SVG layout
  console.log('Compositing QR Code into master flyer canvas...');
  const flyerBuffer = await sharp(Buffer.from(svgContent))
    .composite([
      {
        input: qrBuffer,
        top: 310,
        left: 140
      }
    ])
    .jpeg({
      quality: 95,
      mozjpeg: true
    })
    .toBuffer();

  // 4. Write to targets
  const destinations = [
    path.join(ROOT_DIR, 'public', 'bengali-study-bible-circulation-flyer.jpg'),
    path.join(ROOT_DIR, 'dist', 'bengali-study-bible-circulation-flyer.jpg'),
    path.join(ROOT_DIR, 'bengali-study-bible-circulation-flyer.jpg'),
    path.join(ROOT_DIR, 'bengali-study-bible-ad.jpg'),
    path.join(ROOT_DIR, 'public', 'bengali-study-bible-ad.jpg'),
    path.join(ROOT_DIR, 'dist', 'bengali-study-bible-ad.jpg'),
  ];

  for (const dest of destinations) {
    try {
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(dest, flyerBuffer);
      console.log(`   ✓ Saved: ${dest}`);
    } catch (e) {
      console.warn(`   ! Could not save to ${dest}: ${e.message}`);
    }
  }

  // Also write to conversation artifact directory
  const artifactDir = 'C:\\Users\\acer\\.gemini\\antigravity\\brain\\610aed17-26d5-4ff0-bedb-6c7dc4ed679b';
  if (fs.existsSync(artifactDir)) {
    const artifactPath = path.join(artifactDir, 'bengali-study-bible-circulation-flyer.jpg');
    fs.writeFileSync(artifactPath, flyerBuffer);
    console.log(`   ✓ Saved Artifact: ${artifactPath}`);

    const artifactAdPath = path.join(artifactDir, 'bengali-study-bible-ad.jpg');
    fs.writeFileSync(artifactAdPath, flyerBuffer);
    console.log(`   ✓ Updated Artifact: ${artifactAdPath}`);
  }

  console.log('='.repeat(80));
  console.log(`[SUCCESS] Master Circulation JPG Flyer generated (${flyerBuffer.length} bytes)!`);
  console.log('='.repeat(80));
}

generateCirculationFlyer().catch(err => {
  console.error('Fatal generation error:', err);
  process.exit(1);
});
