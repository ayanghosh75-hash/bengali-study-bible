import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const standardIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F213A"/>
      <stop offset="60%" stop-color="#0B192C"/>
      <stop offset="100%" stop-color="#040912"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF7E2"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#946D21"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="108" fill="url(#bgGrad)"/>
  <rect x="18" y="18" width="476" height="476" rx="92" fill="none" stroke="url(#goldGrad)" stroke-width="4" opacity="0.45"/>
  <g transform="translate(0, 20)">
    <path d="M 256 360 C 210 330 140 330 80 345 L 80 170 C 140 155 210 155 256 185 Z" fill="#FAF6F0" opacity="0.96"/>
    <path d="M 256 360 C 302 330 372 330 432 345 L 432 170 C 372 155 302 155 256 185 Z" fill="#FDFBF7" opacity="0.96"/>
    <path d="M 254 185 L 254 360 L 258 360 L 258 185 Z" fill="#AA7C1D" opacity="0.45"/>
    <line x1="110" y1="210" x2="225" y2="210" stroke="#AA7C1D" stroke-width="3.5" stroke-linecap="round" opacity="0.32"/>
    <line x1="110" y1="235" x2="225" y2="235" stroke="#AA7C1D" stroke-width="3.5" stroke-linecap="round" opacity="0.32"/>
    <line x1="110" y1="260" x2="225" y2="260" stroke="#AA7C1D" stroke-width="3.5" stroke-linecap="round" opacity="0.32"/>
    <line x1="110" y1="285" x2="190" y2="285" stroke="#AA7C1D" stroke-width="3.5" stroke-linecap="round" opacity="0.32"/>
    <line x1="287" y1="210" x2="402" y2="210" stroke="#AA7C1D" stroke-width="3.5" stroke-linecap="round" opacity="0.32"/>
    <line x1="287" y1="235" x2="402" y2="235" stroke="#AA7C1D" stroke-width="3.5" stroke-linecap="round" opacity="0.32"/>
    <line x1="287" y1="260" x2="402" y2="260" stroke="#AA7C1D" stroke-width="3.5" stroke-linecap="round" opacity="0.32"/>
    <line x1="287" y1="285" x2="367" y2="285" stroke="#AA7C1D" stroke-width="3.5" stroke-linecap="round" opacity="0.32"/>
  </g>
  <g filter="url(#glow)">
    <rect x="245" y="75" width="22" height="155" rx="5" fill="url(#goldGrad)"/>
    <rect x="194" y="122" width="124" height="22" rx="5" fill="url(#goldGrad)"/>
    <circle cx="256" cy="133" r="9" fill="#FFF"/>
  </g>
  <text x="256" y="445" font-family="'Nirmala UI', 'Vrinda', 'Noto Serif Bengali', serif" font-size="34" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">বাংলা স্টাডি বাইবেল</text>
</svg>
`;

const maskableIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F213A"/>
      <stop offset="60%" stop-color="#0B192C"/>
      <stop offset="100%" stop-color="#040912"/>
    </linearGradient>
    <linearGradient id="goldGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF7E2"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#946D21"/>
    </linearGradient>
    <filter id="glowMask" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" fill="url(#bgGradMask)"/>
  <g transform="translate(256, 256) scale(0.78) translate(-256, -256)">
    <g transform="translate(0, 15)">
      <path d="M 256 360 C 210 330 140 330 80 345 L 80 170 C 140 155 210 155 256 185 Z" fill="#FAF6F0" opacity="0.96"/>
      <path d="M 256 360 C 302 330 372 330 432 345 L 432 170 C 372 155 302 155 256 185 Z" fill="#FDFBF7" opacity="0.96"/>
      <path d="M 254 185 L 254 360 L 258 360 L 258 185 Z" fill="#AA7C1D" opacity="0.45"/>
      <line x1="110" y1="210" x2="225" y2="210" stroke="#AA7C1D" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
      <line x1="110" y1="235" x2="225" y2="235" stroke="#AA7C1D" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
      <line x1="110" y1="260" x2="225" y2="260" stroke="#AA7C1D" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
      <line x1="110" y1="285" x2="190" y2="285" stroke="#AA7C1D" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
      <line x1="287" y1="210" x2="402" y2="210" stroke="#AA7C1D" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
      <line x1="287" y1="235" x2="402" y2="235" stroke="#AA7C1D" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
      <line x1="287" y1="260" x2="402" y2="260" stroke="#AA7C1D" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
      <line x1="287" y1="285" x2="367" y2="285" stroke="#AA7C1D" stroke-width="4" stroke-linecap="round" opacity="0.35"/>
    </g>
    <g filter="url(#glowMask)">
      <rect x="245" y="70" width="22" height="155" rx="5" fill="url(#goldGradMask)"/>
      <rect x="194" y="117" width="124" height="22" rx="5" fill="url(#goldGradMask)"/>
      <circle cx="256" cy="128" r="9" fill="#FFF"/>
    </g>
    <text x="256" y="445" font-family="'Nirmala UI', 'Vrinda', 'Noto Serif Bengali', serif" font-size="34" font-weight="bold" fill="url(#goldGradMask)" text-anchor="middle" letter-spacing="2">বাংলা স্টাডি বাইবেল</text>
  </g>
</svg>
`;

async function generateIcons() {
  const iconsDir = path.resolve('public/icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  console.log('Generating PWA icons...');

  await sharp(Buffer.from(standardIconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-512x512.png'));
  console.log('✓ public/icons/icon-512x512.png generated');

  await sharp(Buffer.from(standardIconSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-192x192.png'));
  console.log('✓ public/icons/icon-192x192.png generated');

  await sharp(Buffer.from(maskableIconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-512x512.png'));
  console.log('✓ public/icons/icon-maskable-512x512.png generated');

  await sharp(Buffer.from(maskableIconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  console.log('✓ public/icons/apple-touch-icon.png generated');

  fs.copyFileSync(
    path.join(iconsDir, 'apple-touch-icon.png'),
    path.resolve('public/apple-touch-icon.png')
  );

  await sharp(Buffer.from(standardIconSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(iconsDir, 'favicon-32x32.png'));
  console.log('✓ public/icons/favicon-32x32.png generated');

  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(console.error);
