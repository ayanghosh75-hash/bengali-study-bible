import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

// 1. Cloudflare Pages & Netlify _redirects
fs.writeFileSync(path.join(ROOT_DIR, 'public', '_redirects'), '/*    /index.html   200\n');

// 2. Cloudflare Pages _headers
fs.writeFileSync(path.join(ROOT_DIR, 'public', '_headers'), `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate

/manifest.json
  Cache-Control: public, max-age=86400
`);

// 3. Vercel rewrites
fs.writeFileSync(path.join(ROOT_DIR, 'vercel.json'), JSON.stringify({
  rewrites: [{ source: '/(.*)', destination: '/index.html' }]
}, null, 2) + '\n');

// 4. Netlify toml
fs.writeFileSync(path.join(ROOT_DIR, 'netlify.toml'), `[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\n`);

// 5. Firebase json
fs.writeFileSync(path.join(ROOT_DIR, 'firebase.json'), JSON.stringify({
  hosting: {
    public: 'dist',
    ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
    rewrites: [{ source: '**', destination: '/index.html' }]
  }
}, null, 2) + '\n');

console.log('All hosting configurations generated.');
