#!/usr/bin/env node
// ============================================================================
// BENGALI STUDY BIBLE — USER GUIDE & INSTALLATION MANUAL PDF GENERATOR
// Generates a colorful, attractive, spirit-filled, comprehensive PDF guide
// Final Authority: Rev. Ayan Kumar Ghosh (Level 5 Owner)
// ============================================================================

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const ARTIFACT_DIR = 'C:\\Users\\acer\\.gemini\\antigravity\\brain\\610aed17-26d5-4ff0-bedb-6c7dc4ed679b';
const PUBLIC_PDF_PATH = path.join(ROOT_DIR, 'public', 'bengali-study-bible-guide.pdf');
const DIST_PDF_PATH = path.join(ROOT_DIR, 'dist', 'bengali-study-bible-guide.pdf');
const ARTIFACT_PDF_PATH = path.join(ARTIFACT_DIR, 'bengali-study-bible-user-guide.pdf');

const ICON_PATH = path.join(ROOT_DIR, 'public', 'icons', 'icon-512x512.png');
const QR_PATH = path.join(ROOT_DIR, 'public', 'qr-codes', 'qr-bengalistudybible-install.png');

// Convert images to base64 for offline headless printing
const iconBase64 = fs.existsSync(ICON_PATH)
  ? `data:image/png;base64,${fs.readFileSync(ICON_PATH).toString('base64')}`
  : '';
const qrBase64 = fs.existsSync(QR_PATH)
  ? `data:image/png;base64,${fs.readFileSync(QR_PATH).toString('base64')}`
  : '';

const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>বাংলা স্টাডি বাইবেল — পূর্ণাঙ্গ ব্যবহার ও ইনস্টলেশন নির্দেশিকা</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Hind Siliguri', 'Nirmala UI', 'Vrinda', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      line-height: 1.45;
      font-size: 13px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      page-break-after: always;
      height: 100%;
      min-height: 275mm;
      position: relative;
      padding-bottom: 12mm;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Header styling */
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0369a1 100%);
      color: #ffffff;
      padding: 16px 20px;
      border-radius: 12px;
      margin-bottom: 14px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
      position: relative;
    }

    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .logo-img {
      width: 54px;
      height: 54px;
      border-radius: 12px;
      background: #ffffff;
      padding: 2px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }

    .header-titles h1 {
      font-size: 22px;
      font-weight: 700;
      color: #f8fafc;
      letter-spacing: 0.3px;
      line-height: 1.2;
    }

    .header-titles p {
      font-size: 12px;
      color: #cbd5e1;
      font-weight: 400;
      margin-top: 3px;
    }

    .motto-tag {
      background: rgba(217, 119, 6, 0.25);
      border: 1px solid #f59e0b;
      color: #fef3c7;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      text-align: right;
    }

    /* Badges Ribbon */
    .ribbon {
      display: flex;
      gap: 8px;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .ribbon-badge {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }

    .ribbon-badge.gold {
      background: #d97706;
      border-color: #f59e0b;
      color: #ffffff;
    }

    .ribbon-badge.emerald {
      background: #059669;
      border-color: #34d399;
      color: #ffffff;
    }

    /* Intro Spiritual Note */
    .spiritual-intro {
      background: #f8fafc;
      border-left: 4px solid #d97706;
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 14px;
      font-size: 12.5px;
      color: #334155;
    }

    .spiritual-intro strong {
      color: #0f172a;
    }

    /* Section Headings */
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 4px;
    }

    .section-title .icon {
      font-size: 16px;
    }

    /* Facilities Grid */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 14px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 14px;
    }

    .feature-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 10px 12px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .feature-card.highlight {
      border-color: #cbd5e1;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    }

    .feature-card-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .feature-icon-box {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      flex-shrink: 0;
    }

    .bg-blue { background: #dbeafe; color: #1d4ed8; }
    .bg-amber { background: #fef3c7; color: #b45309; }
    .bg-emerald { background: #d1fae5; color: #047857; }
    .bg-purple { background: #f3e8ff; color: #7e22ce; }
    .bg-rose { background: #ffe4e6; color: #be123c; }
    .bg-cyan { background: #cffafe; color: #0e7490; }

    .feature-card h3 {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
    }

    .feature-card p {
      font-size: 11.5px;
      color: #475569;
      line-height: 1.4;
    }

    /* Device Installation Guides */
    .device-card {
      background: #ffffff;
      border: 1.5px solid #cbd5e1;
      border-radius: 10px;
      padding: 12px;
      position: relative;
    }

    .device-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px dashed #cbd5e1;
    }

    .device-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .step-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .step-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 11.5px;
      color: #334155;
    }

    .step-num {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* QR Code Callout Box */
    .qr-callout {
      background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
      color: #ffffff;
      border-radius: 12px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-top: 10px;
    }

    .qr-callout-text h2 {
      font-size: 16px;
      font-weight: 700;
      color: #fbbf24;
      margin-bottom: 4px;
    }

    .qr-callout-text p {
      font-size: 11.5px;
      color: #e2e8f0;
      line-height: 1.45;
    }

    .qr-callout-url {
      display: inline-block;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-family: monospace;
      font-weight: 700;
      color: #ffffff;
      margin-top: 6px;
    }

    .qr-img-box {
      background: #ffffff;
      padding: 6px;
      border-radius: 10px;
      flex-shrink: 0;
      text-align: center;
    }

    .qr-img {
      width: 90px;
      height: 90px;
      display: block;
    }

    .qr-img-label {
      color: #0f172a;
      font-size: 9px;
      font-weight: 700;
      margin-top: 3px;
    }

    /* Footer on each page */
    .page-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      font-size: 10px;
      color: #64748b;
    }

    .footer-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Callout alert box */
    .alert-box {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .alert-box.gold {
      background: #fffbeb;
      border-color: #fde68a;
    }

    .alert-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .alert-text {
      font-size: 11.5px;
      color: #065f46;
      line-height: 1.4;
    }

    .alert-text.gold {
      color: #92400e;
    }

    .highlight-span {
      font-weight: 700;
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <!-- ===================================================================== -->
  <!-- PAGE 1: WELCOME & EXTRAORDINARY SPIRITUAL FACILITIES                  -->
  <!-- ===================================================================== -->
  <div class="page">
    <div class="header">
      <div class="header-top">
        <div class="header-brand">
          <img class="logo-img" src="${iconBase64}" alt="Logo">
          <div class="header-titles">
            <h1>বাংলা স্টাডি বাইবেল</h1>
            <p>আপনার জীবনের পরম নির্ভরযোগ্য, প্রজ্ঞাময় ও মধুর শাস্ত্রীয় অধ্যয়ন সঙ্গী</p>
          </div>
        </div>
        <div class="motto-tag">
          পবিত্র শাস্ত্রীয় নীতিবাক্য:<br>
          <strong>“তোমার বাক্য আমার চরণের প্রদীপ”</strong><br>
          <span style="font-size: 9px; opacity: 0.9;">গীতসংহিতা ১১৯:১০৫</span>
        </div>
      </div>
      <div class="ribbon">
        <span class="ribbon-badge gold">✨ সম্পূর্ণ ১০০% বিনামূল্যে</span>
        <span class="ribbon-badge emerald">⚡ আজীবন অফলাইন সচল (PWA)</span>
        <span class="ribbon-badge">🛡️ বিজ্ঞাপনমুক্ত ও সম্পূর্ণ ব্যক্তিগত</span>
        <span class="ribbon-badge">📖 ৬৬টি কিতাব (IRV বাংলা)</span>
        <span class="ribbon-badge">🤖 আস্ক বাইবেল এআই সহায়ক</span>
      </div>
    </div>

    <div class="spiritual-intro">
      <strong>প্রিয় খ্রীষ্টিয়ান ভাই ও বোনেরা এবং শাস্ত্রপ্রেমী পাঠকবৃন্দ,</strong><br>
      জয়যীশু। ঈশ্বরের অপার অনুগ্রহে বাংলাভাষী প্রতিটি বিশ্বাসী, যাজক, প্রচারক এবং পরিবারের জন্য তৈরি করা হয়েছে এই আধুনিক <strong>বাংলা স্টাডি বাইবেল</strong>। এটি কেবল একটি সাধারণ অ্যাপ নয়; এটি আপনার আত্মিক বৃদ্ধির এক অপূর্ব আশীর্বাদ। কোনো রকম নিবন্ধন ঝামেলা বা খরচ ছাড়াই চোখের পলকে আপনার মোবাইলে এটি সক্রিয় হয়।
    </div>

    <div class="section-title">
      <span class="icon">🌟</span> এই প্ল্যাটফর্মের অনন্য আত্মিক ও ব্যবহারিক সু্যোগ-সুবিধাসমূহ
    </div>

    <div class="grid-2">
      <!-- Feature 1 -->
      <div class="feature-card highlight">
        <div class="feature-card-header">
          <div class="feature-icon-box bg-blue">📖</div>
          <h3>সম্পূর্ণ ৬৬টি কিতাব (নির্ভুল ও অবিকৃত)</h3>
        </div>
        <p>ভারতীয় সংশোধিত সংস্করণ (IRV বাংলা) থেকে সংগৃহীত সম্পূর্ণ ৩৯টি পুরাতন নিয়ম এবং ২৭টি নতুন নিয়মের ১,১৮৯টি অধ্যায় ও ৩১,০৮৮টি পদ। কোনো কৃত্রিম সংযোজন বা পরিবর্তন নেই।</p>
      </div>

      <!-- Feature 2 -->
      <div class="feature-card highlight">
        <div class="feature-card-header">
          <div class="feature-icon-box bg-emerald">⚡</div>
          <h3>আজীবন ১০০% অফলাইনে সচল (PWA)</h3>
        </div>
        <p>একবার আপনার ফোনে ইনস্টল করলে বা ব্রাউজারে খুললে আজীবন ইন্টারনেট সংযোগ ছাড়াই বন-জঙ্গলে, প্রত্যন্ত গ্রামে বা বিমানে বসেও নিশ্চিন্তে শাস্ত্র পাঠ ও গবেষণা করা যায়।</p>
      </div>

      <!-- Feature 3 -->
      <div class="feature-card highlight">
        <div class="feature-card-header">
          <div class="feature-icon-box bg-amber">🤖</div>
          <h3>‘আস্ক বাইবেল’ প্রজ্ঞাময় গবেষণা সহায়ক</h3>
        </div>
        <p>যেকোনো আধ্যাত্মিক বা শাস্ত্রীয় প্রশ্ন করুন—তাৎক্ষণিক ঐতিহাসিক প্রেক্ষাপট, সুনির্দিষ্ট পদ, গ্রিক/হিব্রু মূল শব্দের অর্থ ও খ্রিস্টীয় গবেষণার তথ্যসূত্র সহ ৫টি অংশে উত্তর লাভ করুন।</p>
      </div>

      <!-- Feature 4 -->
      <div class="feature-card highlight">
        <div class="feature-card-header">
          <div class="feature-icon-box bg-purple">🔍</div>
          <h3>দ্রুততম অনুসন্ধান ও স্ট্রং লেক্সিকন</h3>
        </div>
        <p>বাংলা শব্দের মূল ধাতু ও প্রতিশব্দ দিয়ে অনুসন্ধান করুন। যেমন "পরিত্রাণ" লিখলেই সেকেন্ডের মধ্যে প্রাসঙ্গিক সমস্ত আয়াত এবং মূল গ্রিক-হিব্রু স্ট্রং অভিধানের ব্যাখ্যা দৃশ্যমান হয়।</p>
      </div>

      <!-- Feature 5 -->
      <div class="feature-card highlight">
        <div class="feature-card-header">
          <div class="feature-icon-box bg-rose">🎙️</div>
          <h3>যাজক ও শিক্ষকের টুলস (Pastor Tools)</h3>
        </div>
        <p>রবিবাসরীয় ধর্মোপদেশ, যুবসভা বা বাইবেল স্টাডির রূপরেখা তৈরি করুন। চমৎকার প্রেজেন্টেশন স্লাইড ও হ্যান্ডআউট নিমেষেই প্রস্তুত করে প্রচারকার্যকে ফলপ্রসূ করুন।</p>
      </div>

      <!-- Feature 6 -->
      <div class="feature-card highlight">
        <div class="feature-card-header">
          <div class="feature-icon-box bg-cyan">🎵</div>
          <h3>দৈনিক বাক্য, মিষ্টি সুর ও ব্যক্তিগত নোট</h3>
        </div>
        <p>প্রতিদিন সকালে নতুন অনুপ্রেরণাদায়ী পদ, কোমল শান্ত পিয়ানো সুর, লাল হরফে যীশুর বাণী, নাইট মোড, আয়াত হাইলাইট এবং সম্পূর্ণ ব্যক্তিগত প্রার্থনার নোট সংরক্ষণের সুবিধা।</p>
      </div>
    </div>

    <div class="alert-box gold">
      <div class="alert-icon">🎁</div>
      <div class="alert-text gold">
        <strong>সম্পূর্ণ বিনামূল্যে ও চিরতরে উন্মুক্ত:</strong> বাংলা স্টাডি বাইবেলে কোনো বাণিজ্যিক বিজ্ঞাপন নেই, কোনো প্রিমিয়াম চার্জ নেই এবং কোনো ডোনেশন দাবি করা হয় না। খ্রীষ্টের বাক্য যেন প্রতিটি বাঙালির হৃদয়ে পৌঁছায়—এটিই আমাদের একমাত্র লক্ষ্য ও প্রার্থনা।
      </div>
    </div>

    <div class="page-footer">
      <div class="footer-left">
        <span>✝️ বাংলা স্টাডি বাইবেল — প্রতিষ্ঠা ও তত্ত্বাবধান: রেভা. অয়ন কুমার ঘোষ</span>
      </div>
      <div>পৃষ্ঠা ১ / ৩</div>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- PAGE 2: DEVICE-SPECIFIC INSTALLATION & QR CODE                        -->
  <!-- ===================================================================== -->
  <div class="page">
    <div class="header" style="padding: 12px 18px; margin-bottom: 12px;">
      <div class="header-top">
        <div class="header-brand">
          <div class="header-titles">
            <h1 style="font-size: 19px;">বিভিন্ন ডিভাইসে ইনস্টল ও ব্যবহারের সহজ নির্দেশিকা</h1>
            <p>আপনার হাতের মোবাইল, ট্যাবলেট বা কম্পিউটারে মাত্র ৩০ সেকেন্ডে যুক্ত করুন</p>
          </div>
        </div>
        <div class="motto-tag" style="padding: 3px 8px; font-size: 10px;">
          সহজ • হালকা • দ্রুতগতির
        </div>
      </div>
    </div>

    <div class="section-title">
      <span class="icon">📱</span> আপনার ডিভাইসের জন্য নির্দিষ্ট ধাপসমূহ অনুসরণ করুন
    </div>

    <div class="grid-3">
      <!-- Android Guide -->
      <div class="device-card">
        <div class="device-header">
          <div class="device-title">
            <span>🤖</span> অ্যান্ড্রয়েড ফোন
          </div>
          <span style="font-size: 10px; color: #16a34a; font-weight: 700;">Samsung / Xiaomi / Vivo</span>
        </div>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">১</span>
            <span><strong>Google Chrome</strong> ব্রাউজারে সাইটটি খুলুন: <code style="color:#1d4ed8;">bengalistudybible.surge.sh</code></span>
          </li>
          <li class="step-item">
            <span class="step-num">২</span>
            <span>স্ক্রিনের নিচে সরাসরি <strong>"অ্যাপ ইনস্টল করুন"</strong> বোতাম দেখতে পাবেন; সেখানে স্পর্শ করুন।</span>
          </li>
          <li class="step-item">
            <span class="step-num">৩</span>
            <span>না আসলে উপরে ডানে ৩টি ডটে (⋮) চাপ দিয়ে <strong>"Install app"</strong> বা <strong>"Add to Home screen"</strong> বেছে নিন।</span>
          </li>
          <li class="step-item">
            <span class="step-num">৪</span>
            <span>কয়েক সেকেন্ডে আপনার ফোনের হোমস্ক্রিনে সুন্দর অ্যাপ আইকন যুক্ত হবে!</span>
          </li>
        </ul>
      </div>

      <!-- iPhone / iPad Guide -->
      <div class="device-card">
        <div class="device-header">
          <div class="device-title">
            <span>🍏</span> আইফোন ও আইপ্যাড
          </div>
          <span style="font-size: 10px; color: #0284c7; font-weight: 700;">Apple iOS Safari</span>
        </div>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">১</span>
            <span>আইফোনে <strong>Safari</strong> ব্রাউজার দিয়ে লিঙ্কটি ওপেন করুন।</span>
          </li>
          <li class="step-item">
            <span class="step-num">২</span>
            <span>সাফারি ব্রাউজারের নিচে থাকা <strong>Share বোতাম</strong> (বাক্স থেকে ওপরের দিকে তির চিহ্ন ⎋) চাপুন।</span>
          </li>
          <li class="step-item">
            <span class="step-num">৩</span>
            <span>মেনুটি সামান্য নিচে নামিয়ে <strong>"Add to Home Screen"</strong> (হোম স্ক্রিনে যোগ করুন) চাপুন।</span>
          </li>
          <li class="step-item">
            <span class="step-num">৪</span>
            <span>উপরে ডানে <strong>"Add"</strong> চাপলেই হোমস্ক্রিনে ফুল-স্ক্রিন অ্যাপ তৈরি হবে!</span>
          </li>
        </ul>
      </div>

      <!-- PC / Laptop Guide -->
      <div class="device-card">
        <div class="device-header">
          <div class="device-title">
            <span>💻</span> কম্পিউটার ও ল্যাপটপ
          </div>
          <span style="font-size: 10px; color: #475569; font-weight: 700;">Windows / Mac / Linux</span>
        </div>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">১</span>
            <span>কম্পিউটারে <strong>Chrome</strong> বা <strong>Edge</strong> ব্রাউজারে লিংকটি খুলুন।</span>
          </li>
          <li class="step-item">
            <span class="step-num">২</span>
            <span>অ্যাড্রেস বারের একেবারে ডানপাশে থাকা ছোট <strong>ইনস্টল আইকন</strong> (মনিটর বা ⊞ চিহ্ন) ক্লিক করুন।</span>
          </li>
          <li class="step-item">
            <span class="step-num">৩</span>
            <span><strong>"Install"</strong> বাটনে ক্লিক করলেই এটি স্বতন্ত্র উইন্ডোজে পূর্ণাঙ্গ সফটওয়্যার হিসেবে চালু হবে।</span>
          </li>
          <li class="step-item">
            <span class="step-num">৪</span>
            <span>স্টার্ট মেনু ও ডেস্কটপ শর্টকাট থেকে এক ক্লিকেই চালু করতে পারবেন!</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- QR Code Installation Banner -->
    <div class="qr-callout">
      <div class="qr-callout-text">
        <h2>📷 ক্যামেরা দিয়ে কিউআর কোড স্ক্যান করুন</h2>
        <p>আপনার ফোনের সাধারণ ক্যামেরা বা গুগল লেন্স দিয়ে পাশের কিউআর কোডটি স্ক্যান করলেই সরাসরি স্থায়ী ইনস্টলেশন ও স্টাডি পেজ খুলে যাবে। কোনো প্লে-স্টোর অ্যাকাউন্ট বা পাসওয়ার্ড লাগবে না!</p>
        <div class="qr-callout-url">https://bengalistudybible.surge.sh/install</div>
        <p style="font-size: 10.5px; margin-top: 6px; color: #93c5fd;">
          💡 <strong>পরামর্শ:</strong> এই নির্দেশিকাটি প্রিন্ট করে গির্জার নোটিশ বোর্ডে বা খ্রীষ্টিয় বন্ধুদের সাথে শেয়ার করতে পারেন।
        </p>
      </div>
      <div class="qr-img-box">
        <img class="qr-img" src="${qrBase64}" alt="QR Code">
        <div class="qr-img-label">স্ক্যান করে ইনস্টল করুন</div>
      </div>
    </div>

    <div class="alert-box" style="margin-top: 14px;">
      <div class="alert-icon">🛡️</div>
      <div class="alert-text">
        <strong>১০০% নিরাপদ ও গোপনীয়:</strong> কোনো ব্যক্তিগত ইমেইল, ফোন নম্বর বা অবস্থান (GPS) চাওয়া হয় না। অ্যাপটি কেবল কয়েক মেগাবাইট জায়গা নেয় এবং ফোনের ব্যাটারি নষ্ট করে না।
      </div>
    </div>

    <div class="page-footer">
      <div class="footer-left">
        <span>📲 স্থায়ী ক্যানোনিকাল ঠিকানা: bengalistudybible.surge.sh/install</span>
      </div>
      <div>পৃষ্ঠা ২ / ৩</div>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- PAGE 3: OPERATING TIPS & SPIRITUAL INVITATION                         -->
  <!-- ===================================================================== -->
  <div class="page">
    <div class="header" style="padding: 12px 18px; margin-bottom: 12px;">
      <div class="header-top">
        <div class="header-brand">
          <div class="header-titles">
            <h1 style="font-size: 19px;">সহজ পরিচালনা কৌশল ও আত্মিক আশীর্বাদের ডাক</h1>
            <p>দৈনন্দিন জীবনে কীভাবে সর্বোচ্চ আত্মিক ফল লাভ করবেন</p>
          </div>
        </div>
        <div class="motto-tag" style="padding: 3px 8px; font-size: 10px;">
          পড়ুন • বুঝুন • অধ্যয়ন করুন • প্রয়োগ করুন
        </div>
      </div>
    </div>

    <div class="section-title">
      <span class="icon">🧭</span> দ্রুত ও আনন্দময় পরিচালনার ৪টি ব্যবহারিক কৌশল
    </div>

    <div class="grid-2" style="margin-bottom: 12px;">
      <div class="feature-card">
        <h3 style="color: #1e3a8a;">১. সহজে বই ও অধ্যায় নির্বাচন</h3>
        <p>স্ক্রিনের শীর্ষে থাকা কিতাবের নামে চাপ দিলেই সুন্দর গ্রিডে পুরাতন ও নতুন নিয়মের ৬৬টি কিতাব দেখতে পাবেন। যে কোনো কিতাব স্পর্শ করলেই তৎক্ষণাৎ অধ্যায়ের তালিকা চলে আসে।</p>
      </div>

      <div class="feature-card">
        <h3 style="color: #047857;">২. আয়াত হাইলাইট ও ব্যক্তিগত নোট</h3>
        <p>যেকোনো পদের ওপর আলতো স্পর্শ করুন। সাথে সাথে পদটি কপি করার, ফেসবুক/হোয়াটসঅ্যাপে শেয়ার করার, ৪টি মনোরম রঙে হাইলাইট করার এবং আত্মিক অনুভূতি লিখে রাখার নোটপ্যাড খুলে যাবে।</p>
      </div>

      <div class="feature-card">
        <h3 style="color: #b45309;">৩. আস্ক বাইবেলে প্রশ্ন জিজ্ঞাসা</h3>
        <p>নিচের মেনু থেকে <strong>"আস্ক বাইবেল"</strong> বোতামে চাপুন। যেকোনো প্রশ্ন লিখুন—যেমন <em>"যোহন ৩:১৬ পদের মূল শিক্ষা কী?"</em> বা <em>"ঈশ্বরের অনুগ্রহ কীভাবে পাই?"</em>—গভীর ও ভারসাম্যপূর্ণ ব্যাখ্যা পাবেন।</p>
      </div>

      <div class="feature-card">
        <h3 style="color: #7e22ce;">৪. চোখের আরাম ও ফন্ট কাস্টমাইজেশন</h3>
        <p>সেটিংস আইকনে গিয়ে আপনি ফন্ট সাইজ নিজের সুবিধামতো বড় বা ছোট করতে পারেন। রাতে পড়ার জন্য মৃদু ডার্ক মোড এবং আরামদায়ক সেপিয়া রিডিং মোড রয়েছে।</p>
      </div>
    </div>

    <div class="section-title">
      <span class="icon">🤝</span> মণ্ডলী ও পরিবারে এই আশীর্বাদ ছড়িয়ে দিন
    </div>

    <div style="background: #f1f5f9; border-radius: 10px; padding: 12px 14px; margin-bottom: 14px; font-size: 12px; color: #334155; line-height: 1.5;">
      ঈশ্বরের বাক্য বিনামূল্যে পেয়েছি, আমরা যেন বিনামূল্যে সকলের মাঝে পৌঁছে দিই। আপনার মণ্ডলীতে রবিবাসরীয় আরাধনায়, যুব সমিতিতে, পারিবারিক প্রার্থনা সভায় বা সোশ্যাল মিডিয়ায় ভাইবোনদের এই সহজ অফলাইন বাইবেলটি ইনস্টল করতে উৎসাহিত করুন। একজন সাধারণ বিশ্বাসী যখন খাঁটি শাস্ত্র নিজ মাতৃভাষায় হৃদয়ঙ্গম করতে পারেন, তখন সারা সমাজ আত্মিকভাবে জেগে ওঠে।
    </div>

    <div class="section-title">
      <span class="icon">✍️</span> প্রতিষ্ঠাতা ও তত্ত্বাবধায়কের বার্তা
    </div>

    <div style="border: 1.5px solid #d97706; background: #fffdfa; border-radius: 10px; padding: 12px 16px; margin-bottom: 12px;">
      <p style="font-size: 12px; color: #451a03; line-height: 1.5; font-style: italic;">
        “আমাদের উদ্দেশ্য কোনো খ্যাতি বা ব্যবসায়িক লাভ নয়; বরং প্রতিটি বাংলাভাষী খ্রিস্টবিশ্বাসীর হাতে ঈশ্বরের জীবন্ত বাক্য একটি শক্তিশালী, নির্ভরযোগ্য ও সহজ গবেষণামূলক কাঠামোর মাধ্যমে উপহার দেওয়া। প্রভু যীশু খ্রীষ্ট আপনাদের শাস্ত্রপাঠে প্রজ্ঞা ও অনন্ত শান্তি দান করুন।”
      </p>
      <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <strong style="color: #0f172a; font-size: 13px;">রেভা. অয়ন কুমার ঘোষ (Rev. Ayan Kumar Ghosh)</strong><br>
          <span style="font-size: 11px; color: #64748b;">প্রতিষ্ঠাতা, সফটওয়্যার আর্কিটেক্ট ও তত্ত্বাবধায়ক — বাংলা স্টাডি বাইবেল</span><br>
          <span style="font-size: 11px; color: #1d4ed8;">যোগাযোগ: ayanghosh75@gmail.com</span>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 10px; color: #059669; font-weight: 700; background: #d1fae5; padding: 3px 8px; border-radius: 12px;">অফিসিয়াল সংস্করণ ২০২৬</span>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <div class="footer-left">
        <span>🌐 অনলাইন পোর্টাল: https://bengalistudybible.surge.sh | সম্পূর্ণ সর্বস্বত্ব স্বত্বাধিকারী কর্তৃক সংরক্ষিত</span>
      </div>
      <div>পৃষ্ঠা ৩ / ৩</div>
    </div>
  </div>

</body>
</html>
`;

export async function generateUserGuidePdf() {
  console.log('\n================================================================');
  console.log('  BENGALI STUDY BIBLE — COLORFUL USER GUIDE PDF GENERATOR');
  console.log('================================================================');

  const tempHtmlPath = path.join(ROOT_DIR, 'temp-user-guide.html');
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

  // Also create a standalone web guide in public/guide/index.html
  const guideDir = path.join(ROOT_DIR, 'public', 'guide');
  if (!fs.existsSync(guideDir)) {
    fs.mkdirSync(guideDir, { recursive: true });
  }

  // Interactive HTML preview with direct download button
  const webGuideHtml = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>বাংলা স্টাডি বাইবেল — ব্যবহার ও ইনস্টলেশন নির্দেশিকা</title>
  <meta name="description" content="বাংলা স্টাডি বাইবেল ব্যবহারের বিস্তারিত সুবিধা এবং বিভিন্ন ডিভাইসে ইনস্টল করার সহজ সচিত্র নির্দেশিকা। সম্পূর্ণ বিনামূল্যে ডাউনলোড করুন।">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0b1324;
      color: #f8fafc;
      margin: 0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      max-width: 850px;
      width: 100%;
      background: #152238;
      border: 1px solid #2d3f5d;
      border-radius: 16px;
      padding: 28px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .header {
      text-align: center;
      margin-bottom: 24px;
    }
    .header h1 {
      font-size: 26px;
      color: #fbbf24;
      margin-bottom: 8px;
    }
    .header p {
      font-size: 14px;
      color: #94a3b8;
      line-height: 1.5;
    }
    .btn-download {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      color: #ffffff;
      padding: 14px 28px;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(217, 119, 6, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      margin: 12px auto;
    }
    .btn-download:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(217, 119, 6, 0.6);
    }
    .preview-box {
      border: 1px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      margin-top: 24px;
      background: #ffffff;
      height: 700px;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .back-link {
      display: inline-block;
      margin-top: 16px;
      color: #60a5fa;
      text-decoration: none;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📖 বাংলা স্টাডি বাইবেল — পূর্ণাঙ্গ ব্যবহার নির্দেশিকা</h1>
      <p>সকল ডিভাইসে ইনস্টল করার সহজ সচিত্র গাইড, অফলাইন সুবিধা ও ধর্মতাত্ত্বিক বৈশিষ্ট্যাবলী।<br>সম্পূর্ণ বিনামূল্যে আপনার ডিভাইসে সংরক্ষণ করুন।</p>
      <a href="/guide/bengali-study-bible-guide.bin" id="downloadPdfBtn" download="Bengali-Study-Bible-User-Guide.pdf" class="btn-download" onclick="downloadPdfFile(event)">
        📥 সরাসরি কালারফুল PDF ডাউনলোড করুন (Download PDF — 1.7 MB)
      </a>
      <br>
      <a href="/" class="back-link">← প্রধান স্টাডি বাইবেল পোর্টালে ফিরে যান</a>
    </div>

    <div class="preview-box">
      <iframe src="/temp-user-guide.html" title="User Guide Preview"></iframe>
    </div>
  </div>
  <script>
    async function downloadPdfFile(e) {
      e.preventDefault();
      const btn = document.getElementById('downloadPdfBtn');
      const origText = btn.innerHTML;
      try {
        btn.innerHTML = '⏳ ডাউনলোড প্রস্তুত হচ্ছে... (Preparing PDF...)';
        const res = await fetch('/guide/bengali-study-bible-guide.bin');
        if (!res.ok) throw new Error('Network error');
        const buf = await res.arrayBuffer();
        const blob = new Blob([buf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Bengali-Study-Bible-User-Guide.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        btn.innerHTML = '✅ ডাউনলোড সম্পন্ন হয়েছে! (Downloaded!)';
        setTimeout(() => { btn.innerHTML = origText; }, 3000);
      } catch (err) {
        window.open('/temp-user-guide.html', '_blank');
        btn.innerHTML = origText;
      }
    }
  </script>
</body>
</html>
`;
  fs.writeFileSync(path.join(guideDir, 'index.html'), webGuideHtml, 'utf-8');
  fs.copyFileSync(tempHtmlPath, path.join(ROOT_DIR, 'public', 'temp-user-guide.html'));

  // Use Chrome / Edge headless to print to PDF
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browserBin = fs.existsSync(chromePath) ? chromePath : (fs.existsSync(edgePath) ? edgePath : null);

  if (!browserBin) {
    throw new Error('Neither Chrome nor Edge browser found for PDF compilation.');
  }

  console.log(`[PDF] Using browser engine: ${browserBin}`);
  console.log('[PDF] Rendering vector PDF with Bengali typography and color gradients...');

  const fullHtmlUrl = `file:///${tempHtmlPath.replace(/\\/g, '/')}`;
  const cmd = `"${browserBin}" --headless=new --disable-gpu --no-pdf-header-footer "--print-to-pdf=${PUBLIC_PDF_PATH}" "${fullHtmlUrl}"`;

  execSync(cmd, { stdio: 'inherit' });

  if (!fs.existsSync(PUBLIC_PDF_PATH)) {
    throw new Error(`PDF generation failed; ${PUBLIC_PDF_PATH} was not created.`);
  }

  // Also copy as .bin in public/guide/ so Surge CDN never blocks .pdf extension
  fs.copyFileSync(PUBLIC_PDF_PATH, path.join(guideDir, 'bengali-study-bible-guide.bin'));

  // Copy to dist and artifact directory
  const distDir = path.join(ROOT_DIR, 'dist');
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(PUBLIC_PDF_PATH, DIST_PDF_PATH);
    const distGuideDir = path.join(distDir, 'guide');
    if (!fs.existsSync(distGuideDir)) fs.mkdirSync(distGuideDir, { recursive: true });
    fs.copyFileSync(path.join(guideDir, 'index.html'), path.join(distGuideDir, 'index.html'));
    fs.copyFileSync(PUBLIC_PDF_PATH, path.join(distGuideDir, 'bengali-study-bible-guide.bin'));
    fs.copyFileSync(tempHtmlPath, path.join(distDir, 'temp-user-guide.html'));
  }

  if (fs.existsSync(ARTIFACT_DIR)) {
    fs.copyFileSync(PUBLIC_PDF_PATH, ARTIFACT_PDF_PATH);
  }

  const pdfStats = fs.statSync(PUBLIC_PDF_PATH);
  const pdfSizeKb = Math.round(pdfStats.size / 1024);

  console.log('\n================================================================');
  console.log('✅ PDF GENERATION SUCCESSFUL!');
  console.log(`Size:           ${pdfSizeKb} KB`);
  console.log(`Public Target:  ${PUBLIC_PDF_PATH}`);
  console.log(`Dist Target:    ${DIST_PDF_PATH}`);
  console.log(`Artifact Target:${ARTIFACT_PDF_PATH}`);
  console.log(`Web Download:   https://bengalistudybible.surge.sh/guide`);
  console.log(`Direct PDF:     https://bengalistudybible.surge.sh/bengali-study-bible-guide.pdf`);
  console.log('================================================================\n');

  return {
    success: true,
    sizeKb: pdfSizeKb,
    publicPdfPath: PUBLIC_PDF_PATH,
    artifactPdfPath: ARTIFACT_PDF_PATH
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  generateUserGuidePdf().catch(err => {
    console.error('PDF generation error:', err);
    process.exit(1);
  });
}
