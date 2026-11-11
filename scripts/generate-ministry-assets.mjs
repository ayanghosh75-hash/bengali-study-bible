import sharp from 'sharp';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'qr-codes');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Target domain for permanent print and digital distribution
const DOMAIN_PERMANENT = process.env.PUBLIC_DOMAIN || 'https://bengalistudybible.com';
const DOMAIN_LIVE_DEMO = process.env.LIVE_DEMO_URL || 'https://bengalistudybible.com';

console.log('='.repeat(80));
console.log('   BENGALI STUDY BIBLE — MULTI-FORMAT MINISTRY & MEDIA ASSET GENERATOR');
console.log(`   Permanent Domain: ${DOMAIN_PERMANENT}`);
console.log(`   Live Demo URL:    ${DOMAIN_LIVE_DEMO}`);
console.log('='.repeat(80));

async function runGenerator() {
  // -------------------------------------------------------------
  // 1. Ultra High-Res Print QR Code (3000 x 3000 px, 300 DPI)
  // Suitable for church flex banners, wall posters, book covers
  // -------------------------------------------------------------
  console.log('[1/5] Generating 3000px Ultra HD Print QR Code...');
  const qr3000Buffer = await QRCode.toBuffer(DOMAIN_PERMANENT, {
    width: 3000,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#0B192C',
      light: '#FFFFFF',
    },
  });
  fs.writeFileSync(path.join(OUTPUT_DIR, 'qr-bengalistudybible-3000px.png'), qr3000Buffer);
  console.log('      ✓ Saved to public/qr-codes/qr-bengalistudybible-3000px.png');

  // -------------------------------------------------------------
  // 2. Vector SVG QR Code (Infinite Scalability for Designers)
  // -------------------------------------------------------------
  console.log('[2/5] Generating Scalable Vector SVG QR Code...');
  const qrSvgString = await QRCode.toString(DOMAIN_PERMANENT, {
    type: 'svg',
    margin: 1,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#0B192C',
      light: '#FFFFFF',
    },
  });
  fs.writeFileSync(path.join(OUTPUT_DIR, 'qr-bengalistudybible.svg'), qrSvgString);
  console.log('      ✓ Saved to public/qr-codes/qr-bengalistudybible.svg');

  // -------------------------------------------------------------
  // 3. 16:9 Widescreen Sermon Presentation Slide (1920 x 1080 px)
  // For church projectors, PowerPoint / Keynote, YouTube video announcements
  // -------------------------------------------------------------
  console.log('[3/5] Generating 16:9 Full HD Sermon & Projector Slide...');
  const qrSlideBuffer = await QRCode.toBuffer(DOMAIN_PERMANENT, {
    width: 440,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#0B192C',
      light: '#FFFFFF',
    },
  });

  const slideSvg = `
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="slideBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050C17" />
        <stop offset="50%" stop-color="#0B192C" />
        <stop offset="100%" stop-color="#13233B" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCF8E3" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#997023" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1920" height="1080" fill="url(#slideBg)" />

    <!-- Ornate Frame -->
    <rect x="40" y="40" width="1840" height="1000" rx="32" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.6" />
    <rect x="55" y="55" width="1810" height="970" rx="24" fill="none" stroke="url(#gold)" stroke-width="1.2" opacity="0.3" />

    <!-- Left Column: Information and Features -->
    <g transform="translate(140, 160)">
      <!-- Golden Cross Emblem -->
      <rect x="0" y="0" width="16" height="64" rx="4" fill="url(#gold)" />
      <rect x="-18" y="16" width="52" height="15" rx="3" fill="url(#gold)" />

      <!-- Title & Branding -->
      <text x="70" y="32" font-family="'Nirmala UI', 'Vrinda', 'Noto Serif Bengali', serif" font-size="56" font-weight="bold" fill="url(#gold)">বাংলা স্টাডি বাইবেল</text>
      <text x="70" y="66" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="600" fill="#9FB3C8" letter-spacing="4">BENGALI STUDY BIBLE &amp; MINISTRY PLATFORM</text>

      <!-- Tagline -->
      <text x="0" y="140" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="28" font-weight="600" fill="#F8FAFC">পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন</text>
      <text x="0" y="180" font-family="'Nirmala UI', sans-serif" font-size="20" fill="#94A3B8">মণ্ডলীর উপাসনা, প্রচার প্রস্তুতি ও ব্যক্তিগত বাইবেল পাঠের আধুনিক ডিজিটাল পরিবেশ</text>

      <!-- Feature Badges Grid -->
      <g transform="translate(0, 240)">
        <rect x="0" y="0" width="460" height="90" rx="16" fill="#0E223D" stroke="#334E68" stroke-width="1.5" />
        <text x="24" y="38" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#FDE047">📖 সম্পূর্ণ ৬৬টি ক্যানোনিকাল পুস্তক</text>
        <text x="24" y="68" font-family="'Nirmala UI', sans-serif" font-size="16" fill="#CBD5E1">বিএসআই (BSI) বিশুদ্ধ পাঠ্য • পদভিত্তিক বিশ্লেষণ ও অনুধ্যান</text>

        <rect x="490" y="0" width="460" height="90" rx="16" fill="#0E223D" stroke="#334E68" stroke-width="1.5" />
        <text x="514" y="38" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#38BDF8">✍️ ১০-৬০ মিনিট সার্মন বিল্ডার</text>
        <text x="514" y="68" font-family="'Nirmala UI', sans-serif" font-size="16" fill="#CBD5E1">রবিবার উপাসনা, যুবসমাজ ও প্রচার রূপরেখা জেনারেটর</text>

        <rect x="0" y="110" width="460" height="90" rx="16" fill="#0E223D" stroke="#334E68" stroke-width="1.5" />
        <text x="24" y="148" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#4ADE80">📱 ১০০% অফলাইন মোবাইল PWA</text>
        <text x="24" y="178" font-family="'Nirmala UI', sans-serif" font-size="16" fill="#CBD5E1">প্লে স্টোরে খুঁজতে হবে না—ফোন হোমস্ক্রিনে সরাসরি অ্যাপ</text>

        <rect x="490" y="110" width="460" height="90" rx="16" fill="#0E223D" stroke="#334E68" stroke-width="1.5" />
        <text x="514" y="148" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="bold" fill="#C084FC">🔍 বিষয়ভিত্তিক গবেষণা ও চারিত্রিক অধ্যয়ন</text>
        <text x="514" y="178" font-family="'Nirmala UI', sans-serif" font-size="16" fill="#CBD5E1">ধর্মতত্ত্ব, বাইবেলের ঐতিহাসিক মানচিত্র ও ব্যক্তিগত নোট</text>
      </g>

      <!-- Bottom Step instruction -->
      <g transform="translate(0, 490)">
        <rect x="0" y="0" width="950" height="60" rx="14" fill="#071324" stroke="url(#gold)" stroke-width="1.2" />
        <text x="475" y="38" font-family="'Nirmala UI', sans-serif" font-size="20" font-weight="bold" fill="#FCF8E3" text-anchor="middle">📲 মোবাইলের ক্যামেরা দিয়ে ডানদিকের QR কোডটি স্ক্যান করে এখনই অ্যাপটি ব্যবহার করুন</text>
      </g>
    </g>

    <!-- Right Column: White Card with Big QR Code -->
    <g transform="translate(1220, 200)">
      <rect x="0" y="0" width="560" height="660" rx="28" fill="#FFFFFF" stroke="url(#gold)" stroke-width="3" filter="url(#shadow)" />
      
      <!-- Card Header Tag -->
      <rect x="70" y="-18" width="420" height="42" rx="21" fill="url(#gold)" />
      <text x="280" y="10" font-family="'Nirmala UI', sans-serif" font-size="18" font-weight="bold" fill="#071324" text-anchor="middle">ক্যামেরা দিয়ে স্ক্যান করে অ্যাপটি নিন</text>

      <!-- Web Address text -->
      <text x="280" y="555" font-family="'Segoe UI', sans-serif" font-size="22" font-weight="bold" fill="#0B192C" text-anchor="middle">${DOMAIN_PERMANENT}</text>
      <text x="280" y="590" font-family="'Nirmala UI', sans-serif" font-size="16" fill="#64748B" text-anchor="middle">অ্যান্ড্রয়েড ও আইফোন উভয় ডিভাইসে সহজে ইনস্টলেবল</text>
      <text x="280" y="625" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="600" fill="#D97706" text-anchor="middle">★ সম্পূর্ণ ফ্রি ও খ্রীষ্টিয় আত্মিক সেবায় নিবেদিত ★</text>
    </g>
  </svg>
  `;

  // Composite slide background + QR code
  await sharp(Buffer.from(slideSvg))
    .composite([
      {
        input: qrSlideBuffer,
        top: 285,
        left: 1280,
      },
    ])
    .png()
    .toFile(path.join(OUTPUT_DIR, 'bengali-study-bible-sermon-slide-16x9.png'));
  console.log('      ✓ Saved to public/qr-codes/bengali-study-bible-sermon-slide-16x9.png');

  // -------------------------------------------------------------
  // 4. Social Square 1:1 Image (1080 x 1080 px)
  // For WhatsApp DP / Status, Facebook Feed, Instagram
  // -------------------------------------------------------------
  console.log('[4/5] Generating 1:1 Social Square Card (1080x1080)...');
  const qrSquareBuffer = await QRCode.toBuffer(DOMAIN_PERMANENT, {
    width: 360,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#0B192C',
      light: '#FFFFFF',
    },
  });

  const squareSvg = `
  <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sqBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050C17" />
        <stop offset="50%" stop-color="#0B192C" />
        <stop offset="100%" stop-color="#111E33" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCF8E3" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#997023" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1080" height="1080" fill="url(#sqBg)" />
    <rect x="25" y="25" width="1030" height="1030" rx="28" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.6" />

    <!-- Top Header -->
    <g transform="translate(540, 80)">
      <rect x="-6" y="-24" width="12" height="48" rx="3" fill="url(#gold)" />
      <rect x="-18" y="-12" width="36" height="10" rx="2" fill="url(#gold)" />
    </g>

    <text x="540" y="145" font-family="'Nirmala UI', 'Vrinda', serif" font-size="44" font-weight="bold" fill="url(#gold)" text-anchor="middle">বাংলা স্টাডি বাইবেল</text>
    <text x="540" y="180" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="600" fill="#9FB3C8" text-anchor="middle" letter-spacing="4">BENGALI STUDY BIBLE &amp; MINISTRY APP</text>
    <text x="540" y="215" font-family="'Nirmala UI', sans-serif" font-size="18" fill="#F8FAFC" text-anchor="middle">পড়ুন • বুঝুন • প্রচার প্রস্তুত করুন • অফলাইনে ব্যবহার করুন</text>

    <!-- Center White QR Card -->
    <rect x="310" y="255" width="460" height="520" rx="24" fill="#FFFFFF" stroke="url(#gold)" stroke-width="2.5" filter="url(#shadow)" />
    <rect x="360" y="238" width="360" height="36" rx="18" fill="url(#gold)" />
    <text x="540" y="262" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#071324" text-anchor="middle">ক্যামেরা দিয়ে স্ক্যান করে ফ্রি ডাউনলোড করুন</text>

    <text x="540" y="700" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="bold" fill="#0B192C" text-anchor="middle">${DOMAIN_PERMANENT}</text>
    <text x="540" y="735" font-family="'Nirmala UI', sans-serif" font-size="14" fill="#64748B" text-anchor="middle">মোবাইলের হোমস্ক্রিনে যুক্ত করে আজীবনের জন্য ফ্রি ব্যবহার করুন</text>

    <!-- Bottom Feature Pills -->
    <g transform="translate(100, 815)">
      <rect x="0" y="0" width="270" height="60" rx="14" fill="#0E223D" stroke="#334E68" stroke-width="1" />
      <text x="135" y="36" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#FDE047" text-anchor="middle">📖 ৬৬টি বাইবেল পুস্তক</text>

      <rect x="305" y="0" width="270" height="60" rx="14" fill="#0E223D" stroke="#334E68" stroke-width="1" />
      <text x="440" y="36" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#38BDF8" text-anchor="middle">✍️ প্রচার রূপরেখা বিল্ডার</text>

      <rect x="610" y="0" width="270" height="60" rx="14" fill="#0E223D" stroke="#334E68" stroke-width="1" />
      <text x="745" y="36" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#4ADE80" text-anchor="middle">📱 ১০০% অফলাইন সুবিধা</text>
    </g>

    <!-- Footer callout -->
    <text x="540" y="930" font-family="'Nirmala UI', sans-serif" font-size="16" fill="#CBD5E1" text-anchor="middle">হোয়াটসঅ্যাপ গ্রুপ ও মণ্ডলীর সহভাগিতায় এই ছবি ও লিংক শেয়ার করুন</text>
    <text x="540" y="960" font-family="'Nirmala UI', sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">"তোমার বাক্য আমার চরণের প্রদীপ ও আমার পথের আলোক।" (গীতসংহিতা ১১৯:১০৫)</text>
  </svg>
  `;

  await sharp(Buffer.from(squareSvg))
    .composite([
      {
        input: qrSquareBuffer,
        top: 295,
        left: 360,
      },
    ])
    .png()
    .toFile(path.join(OUTPUT_DIR, 'bengali-study-bible-social-square.png'));
  console.log('      ✓ Saved to public/qr-codes/bengali-study-bible-social-square.png');

  // -------------------------------------------------------------
  // 5. Pocket Ministry / Visiting Card (1050 x 600 px, 3.5" x 2" 300 DPI)
  // For church hand-outs, evangelism distribution, bulletin inserts
  // -------------------------------------------------------------
  console.log('[5/5] Generating 3.5" x 2" Pocket Ministry & Visiting Card...');
  const qrCardBuffer = await QRCode.toBuffer(DOMAIN_PERMANENT, {
    width: 320,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#0B192C',
      light: '#FFFFFF',
    },
  });

  const cardSvg = `
  <svg width="1050" height="600" viewBox="0 0 1050 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#071324" />
        <stop offset="100%" stop-color="#0F243E" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCF8E3" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#997023" />
      </linearGradient>
    </defs>

    <rect width="1050" height="600" fill="url(#cardBg)" />
    <rect x="20" y="20" width="1010" height="560" rx="20" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.7" />

    <!-- Left Content -->
    <g transform="translate(60, 80)">
      <!-- Cross -->
      <rect x="0" y="0" width="10" height="40" rx="2" fill="url(#gold)" />
      <rect x="-12" y="10" width="34" height="9" rx="2" fill="url(#gold)" />

      <text x="40" y="22" font-family="'Nirmala UI', serif" font-size="34" font-weight="bold" fill="url(#gold)">বাংলা স্টাডি বাইবেল</text>
      <text x="40" y="44" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="#9FB3C8" letter-spacing="2">BENGALI STUDY BIBLE • PWA APP</text>

      <text x="0" y="100" font-family="'Nirmala UI', sans-serif" font-size="18" font-weight="600" fill="#F8FAFC">স্মার্টফোনে সরাসরি ব্যবহারযোগ্য বাংলা বাইবেল</text>
      
      <text x="0" y="140" font-family="'Nirmala UI', sans-serif" font-size="15" fill="#CBD5E1">✓ ৬৬টি পুস্তক ও পদভিত্তিক গভীর অধ্যয়ন</text>
      <text x="0" y="170" font-family="'Nirmala UI', sans-serif" font-size="15" fill="#CBD5E1">✓ প্রচার ও শিক্ষাদানের জন্য সার্মন নির্মাতা</text>
      <text x="0" y="200" font-family="'Nirmala UI', sans-serif" font-size="15" fill="#CBD5E1">✓ সম্পূর্ণ ফ্রি ও অফলাইন সংরক্ষণ সুবিধা</text>

      <!-- Web box -->
      <rect x="0" y="250" width="540" height="60" rx="12" fill="#050C17" stroke="url(#gold)" stroke-width="1.2" />
      <text x="270" y="286" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="bold" fill="#FCF8E3" text-anchor="middle">${DOMAIN_PERMANENT}</text>
      <text x="270" y="335" font-family="'Nirmala UI', sans-serif" font-size="13" fill="#94A3B8" text-anchor="middle">ক্যামেরা দিয়ে ডানদিকের কোডটি স্ক্যান করলেই অ্যাপ্লিকেশন চালু হবে</text>
    </g>

    <!-- Right Side: White QR container -->
    <g transform="translate(660, 90)">
      <rect x="0" y="0" width="330" height="420" rx="20" fill="#FFFFFF" stroke="url(#gold)" stroke-width="2" />
      <text x="165" y="380" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#0B192C" text-anchor="middle">ক্যামেরা দিয়ে স্ক্যান করুন</text>
      <text x="165" y="402" font-family="'Nirmala UI', sans-serif" font-size="11" fill="#64748B" text-anchor="middle">ফোনে ইনস্টল করে নিন</text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(cardSvg))
    .composite([
      {
        input: qrCardBuffer,
        top: 120,
        left: 665,
      },
    ])
    .png()
    .toFile(path.join(OUTPUT_DIR, 'bengali-study-bible-visiting-card.png'));
  console.log('      ✓ Saved to public/qr-codes/bengali-study-bible-visiting-card.png');

  console.log('='.repeat(80));
  console.log('   ALL 5 MINISTRY & MEDIA ASSETS GENERATED SUCCESSFULLY IN public/qr-codes/');
  console.log('='.repeat(80));
}

runGenerator().catch((err) => {
  console.error('Failed to generate ministry assets:', err);
  process.exit(1);
});
