import sharp from 'sharp';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

async function generateAdPoster() {
  const width = 1080;
  const targetUrl = process.env.PUBLIC_URL || 'https://bengalistudybible.com/install';

  // 1. Generate crisp QR code buffer (320x320)
  const qrBuffer = await QRCode.toBuffer(targetUrl, {
    width: 310,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#0B192C',
      light: '#FFFFFF'
    }
  });

  // 2. Create SVG overlay containing backgrounds, decorative vectors, badges, and typography
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050C17" />
        <stop offset="45%" stop-color="#0B192C" />
        <stop offset="100%" stop-color="#111E33" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCF8E3" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#997023" />
      </linearGradient>
      <linearGradient id="stepBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0E223D" />
        <stop offset="100%" stop-color="#071324" />
      </linearGradient>
      <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#FDFBF7" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.6" />
      </filter>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)" />

    <!-- Ornate Double Gold Border -->
    <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="28" fill="none" stroke="url(#gold)" stroke-width="2.5" opacity="0.6" />
    <rect x="30" y="30" width="${width - 60}" height="${height - 60}" rx="20" fill="none" stroke="url(#gold)" stroke-width="1" opacity="0.3" />

    <!-- Header Cross & Halo Emblem -->
    <g transform="translate(540, 80)" filter="url(#glow)">
      <rect x="-7" y="-38" width="14" height="74" rx="3" fill="url(#gold)" />
      <rect x="-26" y="-18" width="52" height="13" rx="2.5" fill="url(#gold)" />
      <circle cx="0" cy="-12" r="5" fill="#FFFFFF" />
    </g>

    <!-- App Title & Subtitle -->
    <text x="540" y="155" font-family="'Nirmala UI', 'Vrinda', 'Noto Serif Bengali', serif" font-size="46" font-weight="bold" fill="url(#gold)" text-anchor="middle" letter-spacing="1.5">বাংলা স্টাডি বাইবেল</text>
    <text x="540" y="190" font-family="'Segoe UI', 'Nirmala UI', sans-serif" font-size="16" font-weight="600" fill="#9FB3C8" text-anchor="middle" letter-spacing="4">BENGALI STUDY BIBLE • PWA MOBILE APP</text>
    <text x="540" y="222" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="18" fill="#E2E8F0" text-anchor="middle">পড়ুন • বুঝুন • অধ্যয়ন করুন • আত্মিক বৃদ্ধিতে সমৃদ্ধ হোন</text>

    <!-- White QR Container Card -->
    <rect x="330" y="250" width="420" height="435" rx="24" fill="url(#cardBg)" stroke="url(#gold)" stroke-width="2.5" filter="url(#shadow)" />

    <!-- QR Badge Tag -->
    <rect x="380" y="234" width="320" height="34" rx="17" fill="url(#gold)" />
    <text x="540" y="257" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="15" font-weight="bold" fill="#060E1A" text-anchor="middle">ক্যামেরা দিয়ে QR কোডটি স্ক্যান করুন</text>

    <!-- QR Bottom Call to action -->
    <text x="540" y="628" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="16" font-weight="bold" fill="#0B192C" text-anchor="middle">স্ক্যান করলেই সরাসরি অ্যাপটি খুলে যাবে</text>
    <text x="540" y="652" font-family="'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="#627D98" text-anchor="middle">${targetUrl}</text>

    <!-- ============================================== -->
    <!-- INSTRUCTION SECTION: HOW TO DOWNLOAD & USE IT  -->
    <!-- ============================================== -->
    <rect x="50" y="705" width="980" height="345" rx="22" fill="url(#stepBg)" stroke="url(#gold)" stroke-width="1.8" />

    <!-- Section Header Badge -->
    <rect x="290" y="688" width="500" height="36" rx="18" fill="url(#gold)" />
    <text x="540" y="712" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="17" font-weight="bold" fill="#060E1A" text-anchor="middle">ফোনে সহজে ডাউনলোড ও ব্যবহারের ৩টি সহজ ধাপ</text>

    <!-- Subtitle explaining PWA -->
    <text x="540" y="748" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="15" fill="#9FB3C8" text-anchor="middle">প্লে স্টোরে খুঁজতে হবে না—নিচের ৩টি সহজ ধাপে সরাসরি আপনার ফোনে ইনস্টল করে নিন:</text>

    <!-- Step 1 Card -->
    <rect x="75" y="770" width="290" height="255" rx="16" fill="#071324" stroke="url(#gold)" stroke-width="1" opacity="0.95" />
    <circle cx="220" cy="808" r="22" fill="url(#gold)" />
    <text x="220" y="816" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="bold" fill="#060E1A" text-anchor="middle">১</text>
    <text x="220" y="855" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="18" font-weight="bold" fill="url(#gold)" text-anchor="middle">QR কোড স্ক্যান করুন</text>
    <text x="220" y="888" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" fill="#CBD5E1" text-anchor="middle">মোবাইলের ক্যামেরা বা</text>
    <text x="220" y="910" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" fill="#CBD5E1" text-anchor="middle">Google Lens দিয়ে উপরের</text>
    <text x="220" y="932" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" fill="#CBD5E1" text-anchor="middle">QR কোডটি স্ক্যান করে</text>
    <text x="220" y="954" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" font-weight="bold" fill="#FDE047" text-anchor="middle">লিংকটি ওপেন করুন</text>
    <rect x="100" y="975" width="240" height="32" rx="8" fill="#0B192C" stroke="#334E68" stroke-width="1" />
    <text x="220" y="996" font-family="'Nirmala UI', sans-serif" font-size="12" fill="#94A3B8" text-anchor="middle">ক্যামেরা ধরিলেই লিংক আসবে</text>

    <!-- Step 2 Card -->
    <rect x="395" y="770" width="290" height="255" rx="16" fill="#071324" stroke="url(#gold)" stroke-width="1.2" opacity="0.95" />
    <circle cx="540" cy="808" r="22" fill="url(#gold)" />
    <text x="540" y="816" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="bold" fill="#060E1A" text-anchor="middle">২</text>
    <text x="540" y="855" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="18" font-weight="bold" fill="url(#gold)" text-anchor="middle">ইনস্টল বোতামে চাপুন</text>
    <text x="540" y="888" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" fill="#CBD5E1" text-anchor="middle">স্ক্রিনের উপরে থাকা</text>
    <text x="540" y="910" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" font-weight="bold" fill="#38BDF8" text-anchor="middle">"অ্যাপ ইনস্টল করুন"</text>
    <text x="540" y="932" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" fill="#CBD5E1" text-anchor="middle">বা Chrome মেনু (⋮) থেকে</text>
    <text x="540" y="954" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" font-weight="bold" fill="#FDE047" text-anchor="middle">"Install / Add to Home screen"</text>
    <rect x="415" y="975" width="250" height="32" rx="8" fill="#0B192C" stroke="#334E68" stroke-width="1" />
    <text x="540" y="996" font-family="'Nirmala UI', sans-serif" font-size="12" fill="#94A3B8" text-anchor="middle">iPhone: Share → Add to Home</text>

    <!-- Step 3 Card -->
    <rect x="715" y="770" width="290" height="255" rx="16" fill="#071324" stroke="url(#gold)" stroke-width="1" opacity="0.95" />
    <circle cx="860" cy="808" r="22" fill="url(#gold)" />
    <text x="860" y="816" font-family="'Segoe UI', sans-serif" font-size="20" font-weight="bold" fill="#060E1A" text-anchor="middle">৩</text>
    <text x="860" y="855" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="18" font-weight="bold" fill="url(#gold)" text-anchor="middle">আইকন চেপে ব্যবহার করুন</text>
    <text x="860" y="888" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" fill="#CBD5E1" text-anchor="middle">আপনার মোবাইলের স্ক্রিনে</text>
    <text x="860" y="910" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" font-weight="bold" fill="#4ADE80" text-anchor="middle">বাইবেল অ্যাপ আইকন</text>
    <text x="860" y="932" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" fill="#CBD5E1" text-anchor="middle">যুক্ত হবে। যেকোনো সময় ট্যাপ</text>
    <text x="860" y="954" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" font-weight="bold" fill="#FDE047" text-anchor="middle">করে নেট ছাড়াই পড়ুন!</text>
    <rect x="735" y="975" width="250" height="32" rx="8" fill="#0B192C" stroke="#334E68" stroke-width="1" />
    <text x="860" y="996" font-family="'Nirmala UI', sans-serif" font-size="12" fill="#94A3B8" text-anchor="middle">এরপর ইন্টারনেট ছাড়াই চলবে</text>

    <!-- ============================================== -->
    <!-- FEATURES HIGHLIGHTS SECTION                    -->
    <!-- ============================================== -->
    <rect x="50" y="1070" width="980" height="155" rx="18" fill="#081424" stroke="url(#gold)" stroke-width="1.2" opacity="0.9" />

    <!-- Feature items in 4 columns -->
    <g transform="translate(75, 1110)" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif">
      <!-- Col 1 -->
      <g transform="translate(0, 0)">
        <circle cx="12" cy="0" r="5" fill="#D4AF37" />
        <text x="28" y="5" font-size="16" font-weight="bold" fill="#F8FAFC">৬৬টি পবিত্র পুস্তক</text>
        <text x="28" y="27" font-size="13" fill="#94A3B8">বিশুদ্ধ ও প্রামাণ্য অনুবাদ</text>
      </g>

      <!-- Col 2 -->
      <g transform="translate(245, 0)">
        <circle cx="12" cy="0" r="5" fill="#D4AF37" />
        <text x="28" y="5" font-size="16" font-weight="bold" fill="#F8FAFC">সম্পূর্ণ অফলাইন পাঠ</text>
        <text x="28" y="27" font-size="13" fill="#94A3B8">ইন্টারনেট ছাড়াও চলবে</text>
      </g>

      <!-- Col 3 -->
      <g transform="translate(490, 0)">
        <circle cx="12" cy="0" r="5" fill="#D4AF37" />
        <text x="28" y="5" font-size="16" font-weight="bold" fill="#F8FAFC">নোট ও ৪ রঙের হাইলাইট</text>
        <text x="28" y="27" font-size="13" fill="#94A3B8">ব্যক্তিগত চিন্তা সংরক্ষণ</text>
      </g>

      <!-- Col 4 -->
      <g transform="translate(735, 0)">
        <circle cx="12" cy="0" r="5" fill="#D4AF37" />
        <text x="28" y="5" font-size="16" font-weight="bold" fill="#F8FAFC">গভীর বিষয়ভিত্তিক স্টাডি</text>
        <text x="28" y="27" font-size="13" fill="#94A3B8">চরিত্র ও পাঠ পরিকল্পনা</text>
      </g>
    </g>

    <!-- Tagline bar inside features -->
    <rect x="75" y="1165" width="930" height="38" rx="10" fill="#0B192C" />
    <text x="540" y="1190" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="14" font-weight="bold" fill="url(#gold)" text-anchor="middle">১০০% ফ্রি • কোনো বিজ্ঞাপন নেই • মোবাইল ফ্রেন্ডলি • অফলাইন ব্যাকআপ সম্বলিত</text>

    <!-- ============================================== -->
    <!-- FOOTER                                         -->
    <!-- ============================================== -->
    <text x="540" y="1262" font-family="'Nirmala UI', 'Vrinda', 'Noto Sans Bengali', sans-serif" font-size="16" font-weight="bold" fill="url(#gold)" text-anchor="middle">ঈশ্বরের পবিত্র বাক্যে সমৃদ্ধ হোন • চার্চের সদস্য ও বন্ধুদের সাথে শেয়ার করুন</text>
    <text x="540" y="1292" font-family="'Segoe UI', 'Nirmala UI', sans-serif" font-size="13" fill="#94A3B8" text-anchor="middle">ওয়েবসাইট: ${targetUrl}</text>
  </svg>
  `;

  // 3. Composite QR code onto the SVG poster
  const posterBuffer = await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: qrBuffer,
        top: 285,
        left: 385
      }
    ])
    .jpeg({ quality: 95 })
    .toBuffer();

  // 4. Save to multiple locations:
  fs.writeFileSync('public/bengali-study-bible-ad.jpg', posterBuffer);
  fs.writeFileSync('dist/bengali-study-bible-ad.jpg', posterBuffer);
  fs.writeFileSync('bengali-study-bible-ad.jpg', posterBuffer);

  const artifactDir = 'C:\\Users\\acer\\.gemini\\antigravity\\brain\\610aed17-26d5-4ff0-bedb-6c7dc4ed679b';
  fs.writeFileSync(path.join(artifactDir, 'bengali-study-bible-ad.jpg'), posterBuffer);

  console.log('[SUCCESS] Cleaned and polished high-res JPG advertisement poster generated successfully!');
}

generateAdPoster().catch(console.error);
