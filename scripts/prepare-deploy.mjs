import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run npm run build first.');
  process.exit(1);
}

// 1. Copy index.html to 200.html and 404.html for Surge SPA routing and error suppression
const indexPath = path.join(DIST_DIR, 'index.html');
const fallbackPath = path.join(DIST_DIR, '200.html');
const notFoundPath = path.join(DIST_DIR, '404.html');
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, fallbackPath);
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('Created dist/200.html and dist/404.html for seamless SPA fallback routing.');
} else {
  console.error('Error: dist/index.html not found!');
  process.exit(1);
}

// 2. Write CNAME for Surge deployment
const cnamePath = path.join(DIST_DIR, 'CNAME');
fs.writeFileSync(cnamePath, 'bengalistudybible.surge.sh\n');
console.log('Created dist/CNAME with bengalistudybible.surge.sh');

// 3. Ensure _redirects and _headers exist in dist
const redirectsSrc = path.join(ROOT_DIR, 'public', '_redirects');
const redirectsDist = path.join(DIST_DIR, '_redirects');
if (fs.existsSync(redirectsSrc)) {
  fs.copyFileSync(redirectsSrc, redirectsDist);
  console.log('Copied _redirects to dist/');
}

const headersSrc = path.join(ROOT_DIR, 'public', '_headers');
const headersDist = path.join(DIST_DIR, '_headers');
if (fs.existsSync(headersSrc)) {
  fs.copyFileSync(headersSrc, headersDist);
  console.log('Copied _headers to dist/');
}

// 4. Ensure manifest.json and manifest.webmanifest exist
const manifestWeb = path.join(DIST_DIR, 'manifest.webmanifest');
const manifestJson = path.join(DIST_DIR, 'manifest.json');
if (fs.existsSync(manifestWeb) && !fs.existsSync(manifestJson)) {
  fs.copyFileSync(manifestWeb, manifestJson);
  console.log('Copied manifest.webmanifest to dist/manifest.json');
}

// 5. Ensure version.json exists in dist
const verSrc = path.join(ROOT_DIR, 'public', 'version.json');
const verDist = path.join(DIST_DIR, 'version.json');
if (fs.existsSync(verSrc) && !fs.existsSync(verDist)) {
  fs.copyFileSync(verSrc, verDist);
  console.log('Copied public/version.json to dist/version.json');
}

// 6. Generate physical directory and HTML files for critical public routes
// This guarantees Surge edge proxies serve 200 OK directly without relying solely on SPA fallbacks
const criticalRoutes = [
  'install',
  'daily-word',
  'partner-kit',
  'share',
  'start',
  'admin/deep-control-centre'
];

for (const route of criticalRoutes) {
  const routeDir = path.join(DIST_DIR, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'));

  if (!route.includes('/')) {
    fs.copyFileSync(indexPath, path.join(DIST_DIR, `${route}.html`));
  }
  console.log(`Generated static physical route files for /${route}`);
}

// 7. Standalone Control Plane & Status Page handling (DO NOT OVERWRITE WITH SPA INDEX)
const recoverySrc = path.join(ROOT_DIR, 'public', 'recovery', 'index.html');
const recoveryDistDir = path.join(DIST_DIR, 'recovery');
if (fs.existsSync(recoverySrc)) {
  if (!fs.existsSync(recoveryDistDir)) {
    fs.mkdirSync(recoveryDistDir, { recursive: true });
  }
  fs.copyFileSync(recoverySrc, path.join(recoveryDistDir, 'index.html'));
  fs.copyFileSync(recoverySrc, path.join(DIST_DIR, 'recovery.html'));
  console.log('Ensured standalone Deep Emergency Recovery Console in dist/recovery/index.html and dist/recovery.html');
}

const statusSrc = path.join(ROOT_DIR, 'public', 'status', 'index.html');
const statusDistDir = path.join(DIST_DIR, 'status');
if (fs.existsSync(statusSrc)) {
  if (!fs.existsSync(statusDistDir)) {
    fs.mkdirSync(statusDistDir, { recursive: true });
  }
  fs.copyFileSync(statusSrc, path.join(statusDistDir, 'index.html'));
  fs.copyFileSync(statusSrc, path.join(DIST_DIR, 'status.html'));
  console.log('Ensured standalone Status Page in dist/status/index.html and dist/status.html');
}

// Do NOT expose raw EMERGENCY_ACCESS_GUIDE.md in public dist/
const distGuide = path.join(DIST_DIR, 'EMERGENCY_ACCESS_GUIDE.md');
if (fs.existsSync(distGuide)) {
  fs.unlinkSync(distGuide);
  console.log('Removed EMERGENCY_ACCESS_GUIDE.md from public dist/ for security.');
}

const sbomSrc = path.join(ROOT_DIR, 'public', 'sbom.json');
if (fs.existsSync(sbomSrc)) {
  fs.copyFileSync(sbomSrc, path.join(DIST_DIR, 'sbom.json'));
  console.log('Copied public/sbom.json to dist/sbom.json');
}

// 8. Ensure Standalone User Guide HTML & Downloadable PDF are copied intact
const userGuideHtmlSrc = path.join(ROOT_DIR, 'public', 'guide', 'index.html');
const userGuideDistDir = path.join(DIST_DIR, 'guide');
if (fs.existsSync(userGuideHtmlSrc)) {
  if (!fs.existsSync(userGuideDistDir)) {
    fs.mkdirSync(userGuideDistDir, { recursive: true });
  }
  fs.copyFileSync(userGuideHtmlSrc, path.join(userGuideDistDir, 'index.html'));
  fs.copyFileSync(userGuideHtmlSrc, path.join(DIST_DIR, 'guide.html'));
  console.log('Ensured standalone Bengali User Guide in dist/guide/index.html and dist/guide.html');
}

const userGuidePdfSrc = path.join(ROOT_DIR, 'public', 'bengali-study-bible-guide.pdf');
if (fs.existsSync(userGuidePdfSrc)) {
  fs.copyFileSync(userGuidePdfSrc, path.join(DIST_DIR, 'bengali-study-bible-guide.pdf'));
  if (!fs.existsSync(userGuideDistDir)) {
    fs.mkdirSync(userGuideDistDir, { recursive: true });
  }
  fs.copyFileSync(userGuidePdfSrc, path.join(userGuideDistDir, 'bengali-study-bible-guide.bin'));
  console.log('Copied public/bengali-study-bible-guide.pdf and dist/guide/bengali-study-bible-guide.bin');
}

const tempGuideSrc = path.join(ROOT_DIR, 'public', 'temp-user-guide.html');
if (fs.existsSync(tempGuideSrc)) {
  fs.copyFileSync(tempGuideSrc, path.join(DIST_DIR, 'temp-user-guide.html'));
}

// 9. Ensure /api/health.json and /api/deep-heartbeat.json exist in dist/api/
const apiSrcDir = path.join(ROOT_DIR, 'public', 'api');
const apiDistDir = path.join(DIST_DIR, 'api');
if (fs.existsSync(apiSrcDir)) {
  if (!fs.existsSync(apiDistDir)) {
    fs.mkdirSync(apiDistDir, { recursive: true });
  }
  for (const file of fs.readdirSync(apiSrcDir)) {
    fs.copyFileSync(path.join(apiSrcDir, file), path.join(apiDistDir, file));
  }
  console.log('Copied public/api/* (health.json & deep-heartbeat.json) to dist/api/');
}

// 10. Ensure /verification download portal and BSB_FINAL_VERIFICATION_PACKAGE.bin exist in dist/verification/
const verPortalSrc = path.join(ROOT_DIR, 'public', 'verification', 'index.html');
const verPortalDistDir = path.join(DIST_DIR, 'verification');
if (fs.existsSync(verPortalSrc)) {
  if (!fs.existsSync(verPortalDistDir)) {
    fs.mkdirSync(verPortalDistDir, { recursive: true });
  }
  fs.copyFileSync(verPortalSrc, path.join(verPortalDistDir, 'index.html'));
  fs.copyFileSync(verPortalSrc, path.join(DIST_DIR, 'verification.html'));
  console.log('Ensured standalone Verification Package Download Portal in dist/verification/index.html');
}

const zipPkgSrc = path.join(ROOT_DIR, 'BSB_FINAL_VERIFICATION_PACKAGE.zip');
if (fs.existsSync(zipPkgSrc)) {
  if (!fs.existsSync(verPortalDistDir)) {
    fs.mkdirSync(verPortalDistDir, { recursive: true });
  }
  fs.copyFileSync(zipPkgSrc, path.join(verPortalDistDir, 'BSB_FINAL_VERIFICATION_PACKAGE.bin'));
  console.log('Copied BSB_FINAL_VERIFICATION_PACKAGE.zip to dist/verification/BSB_FINAL_VERIFICATION_PACKAGE.bin');
}

const remZipPkgSrc = path.join(ROOT_DIR, 'BSB_REMEDIATION_VERIFICATION_PACKAGE.zip');
if (fs.existsSync(remZipPkgSrc)) {
  if (!fs.existsSync(verPortalDistDir)) {
    fs.mkdirSync(verPortalDistDir, { recursive: true });
  }
  fs.copyFileSync(remZipPkgSrc, path.join(verPortalDistDir, 'BSB_REMEDIATION_VERIFICATION_PACKAGE.bin'));
  console.log('Copied BSB_REMEDIATION_VERIFICATION_PACKAGE.zip to dist/verification/BSB_REMEDIATION_VERIFICATION_PACKAGE.bin');
}

console.log('Deployment preparation complete! Assets ready in dist/.');

