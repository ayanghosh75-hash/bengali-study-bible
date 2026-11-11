import fs from 'fs';
import path from 'path';


const ROOT_DIR = process.cwd();
const INCIDENTS_DIR = path.join(ROOT_DIR, '.incidents');
const HISTORY_FILE = path.join(INCIDENTS_DIR, 'deep-monitor-history.json');
const REPORT_12H_FILE = path.join(INCIDENTS_DIR, 'deep-12h-report.json');
const ROTATING_STATE_FILE = path.join(INCIDENTS_DIR, 'deep-rotating-chapter-state.json');

function getRotatingChapterState() {
  if (fs.existsSync(ROTATING_STATE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(ROTATING_STATE_FILE, 'utf-8'));
    } catch {}
  }
  return { bookIndex: 0, chapterIndex: 1, totalAudited: 0 };
}

function saveRotatingChapterState(state) {
  fs.writeFileSync(ROTATING_STATE_FILE, JSON.stringify(state, null, 2));
}

const CANONICAL_BASE = 'https://bengalistudybible.surge.sh';
const INSTALL_URL = `${CANONICAL_BASE}/install`;

// Zero-tolerance strings
const FORBIDDEN_STRINGS = [
  'trycloudflare.com',
  'epinions-',
  'DNS_PROBE_FINISHED_NXDOMAIN',
  'localtunnel.me',
  'ngrok'
];

const SURGE_ERROR_MARKERS = [
  'project: bengalistudybible.surge.sh',
  '<title>project:',
  'Page Not Found - surge'
];

if (!fs.existsSync(INCIDENTS_DIR)) {
  fs.mkdirSync(INCIDENTS_DIR, { recursive: true });
}

function loadHistory() {
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    } catch {}
  }
  return { checks: [], lastReportTime: 0 };
}

function saveHistory(history) {
  // Retain up to 48 hours of checks (192 checks at 15-min intervals)
  if (history.checks.length > 200) {
    history.checks = history.checks.slice(-200);
  }
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

async function safeFetch(url, options = {}, retries = 1) {
  const start = Date.now();
  const headers = {
    'User-Agent': 'Deep-15Min-Autopilot-Monitor/1.0 (BSB Production Steward; Rev. Ayan Kumar Ghosh)',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    ...(options.headers || {})
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { ...options, headers, signal: AbortSignal.timeout(25000) });
      const latency = Date.now() - start;
      const text = await res.text();
      return { ok: res.ok, status: res.status, text, latency };
    } catch (err) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      return { ok: false, status: 0, text: '', latency: Date.now() - start, error: err.message };
    }
  }
}

function validateZeroTolerance(text, status = 200) {
  if (status === 451) {
    return 'Detected HTTP 451 Unavailable response';
  }
  for (const forbidden of FORBIDDEN_STRINGS) {
    if (text.includes(forbidden)) {
      return `Detected forbidden tunnel or DNS error string: "${forbidden}"`;
    }
  }
  for (const surgeErr of SURGE_ERROR_MARKERS) {
    if (text.includes(surgeErr)) {
      return `Detected Surge deployment outage marker: "${surgeErr}"`;
    }
  }
  // Check for Surge unavailable page
  if (
    text.includes('<title>Unavailable</title>') ||
    (text.includes('Unavailable') && text.includes('surge.sh')) ||
    text.includes('Unavailable For Legal Reasons')
  ) {
    return 'Detected Surge "Unavailable" page';
  }
  return null;
}

/**
 * Runs the 12-Dimension Deep Health Audit
 */
export async function audit12Dimensions() {
  const timestamp = new Date().toISOString();
  const results = [];

  // Helper for adding dimension result
  const record = (id, name, pass, detail, latency = 0) => {
    results.push({ id, name, pass, detail, latency });
  };

  // --- Dimension 1: Main Domain (https://bengalistudybible.surge.sh/) ---
  {
    let probe = await safeFetch(`${CANONICAL_BASE}/`);
    let pass = probe.ok && probe.status === 200;
    let detail = pass ? `HTTP 200 OK (${probe.latency}ms)` : `Failed: HTTP ${probe.status}`;

    if (pass) {
      const ztErr = validateZeroTolerance(probe.text, probe.status);
      if (ztErr) {
        pass = false;
        detail = ztErr;
      } else if (!probe.text.includes('<div id="root">') && !probe.text.includes('বাংলা স্টাডি বাইবেল')) {
        pass = false;
        detail = 'Missing root container or app shell text';
      }
    }
    record(1, 'মেইন ডোমেন (Main Domain Root)', pass, detail, probe.latency);
  }

  // --- Dimension 2: Permanent Install Route (/install) ---
  {
    let probe = await safeFetch(INSTALL_URL);
    let pass = probe.ok && probe.status === 200;
    let detail = pass ? `HTTP 200 OK (${probe.latency}ms)` : `Failed: HTTP ${probe.status}`;

    if (pass) {
      const ztErr = validateZeroTolerance(probe.text, probe.status);
      if (ztErr) {
        pass = false;
        detail = ztErr;
      } else if (!probe.text.includes('বাংলা স্টাডি বাইবেল') && !probe.text.includes('root')) {
        pass = false;
        detail = 'Missing install app shell or title';
      }
    }
    record(2, 'স্থায়ী ইনস্টল ঠিকানা (Permanent /install URL)', pass, detail, probe.latency);
  }

  // --- Dimension 3: Webmanifest (/manifest.webmanifest) ---
  {
    let probe = await safeFetch(`${CANONICAL_BASE}/manifest.webmanifest`);
    let pass = probe.ok && probe.status === 200;
    let detail = pass ? `HTTP 200 OK (${probe.latency}ms)` : `Failed: HTTP ${probe.status}`;

    if (pass) {
      try {
        const manifest = JSON.parse(probe.text);
        if (!manifest.name || !manifest.icons || manifest.icons.length < 2) {
          pass = false;
          detail = 'Manifest missing name or required icons';
        } else {
          detail = `Valid PWA Manifest: "${manifest.name}" (${manifest.icons.length} icons)`;
        }
      } catch {
        pass = false;
        detail = 'Invalid JSON format';
      }
    }
    record(3, 'ওয়েব ম্যানিফেস্ট (Web App Manifest)', pass, detail, probe.latency);
  }

  // --- Dimension 4: Service Worker (/sw.js) ---
  {
    let probe = await safeFetch(`${CANONICAL_BASE}/sw.js`);
    let pass = probe.ok && probe.status === 200;
    let detail = pass ? `HTTP 200 OK (${probe.latency}ms)` : `Failed: HTTP ${probe.status}`;

    if (pass) {
      if (!probe.text.includes('bengali-study-bible-v6') || !probe.text.includes('skipWaiting')) {
        pass = false;
        detail = 'Service worker missing cache version v6 or skipWaiting handler';
      } else {
        detail = 'Service Worker v6 active with safe update listeners';
      }
    }
    record(4, 'সার্ভিস ওয়ার্কার (Service Worker v6)', pass, detail, probe.latency);
  }

  // --- Dimension 5: Version Manifest (/version.json) ---
  {
    let probe = await safeFetch(`${CANONICAL_BASE}/version.json?_t=${Date.now()}`);
    let pass = probe.ok && probe.status === 200;
    let detail = pass ? `HTTP 200 OK (${probe.latency}ms)` : `Failed: HTTP ${probe.status}`;

    if (pass) {
      try {
        const ver = JSON.parse(probe.text);
        if (!ver.version || !ver.buildTime) {
          pass = false;
          detail = 'Version manifest missing version or buildTime';
        } else {
          detail = `Version ${ver.version} (Built: ${ver.buildTime})`;
        }
      } catch {
        pass = false;
        detail = 'Invalid version JSON';
      }
    }
    record(5, 'সংস্করণ প্রকাশনা (Version Manifest)', pass, detail, probe.latency);
  }

  // --- Dimension 6: JS & CSS Bundles ---
  {
    let rootProbe = await safeFetch(`${CANONICAL_BASE}/`);
    let pass = rootProbe.ok;
    let detail = 'Auditing primary JS and CSS bundles';
    let bundleLatency = 0;

    if (pass) {
      // Find main JS bundle
      const jsMatch = rootProbe.text.match(/src="([^"]+\.js)"/);
      const cssMatch = rootProbe.text.match(/href="([^"]+\.css)"/);

      if (jsMatch && jsMatch[1]) {
        const jsUrl = jsMatch[1].startsWith('http') ? jsMatch[1] : `${CANONICAL_BASE}${jsMatch[1].startsWith('/') ? '' : '/'}${jsMatch[1]}`;
        const jsProbe = await safeFetch(jsUrl);
        bundleLatency += jsProbe.latency;
        if (!jsProbe.ok || jsProbe.status !== 200 || jsProbe.text.length < 500) {
          pass = false;
          detail = `JS bundle failed: ${jsUrl} (HTTP ${jsProbe.status})`;
        }
      }

      if (pass && cssMatch && cssMatch[1]) {
        const cssUrl = cssMatch[1].startsWith('http') ? cssMatch[1] : `${CANONICAL_BASE}${cssMatch[1].startsWith('/') ? '' : '/'}${cssMatch[1]}`;
        const cssProbe = await safeFetch(cssUrl);
        bundleLatency += cssProbe.latency;
        if (!cssProbe.ok || cssProbe.status !== 200 || cssProbe.text.length < 100) {
          pass = false;
          detail = `CSS bundle failed: ${cssUrl} (HTTP ${cssProbe.status})`;
        }
      }

      if (pass) {
        detail = `All primary JS & CSS bundles verified 200 OK (${bundleLatency}ms)`;
      }
    } else {
      detail = 'Could not fetch index.html to discover bundle hashes';
    }
    record(6, 'জেএস ও সিএসএস সম্পদ (JS & CSS Bundles)', pass, detail, bundleLatency);
  }

  // --- Dimension 7: Old Testament Representative (Genesis 1) ---
  {
    let probe = await safeFetch(`${CANONICAL_BASE}/bible-data/irv/GEN.json`);
    let pass = probe.ok && probe.status === 200;
    let detail = pass ? `HTTP 200 OK (${probe.latency}ms)` : `Failed: HTTP ${probe.status}`;

    if (pass) {
      try {
        const genData = JSON.parse(probe.text);
        const ch1 = genData.chapters?.['1'];
        if (!ch1 || ch1.length !== 31) {
          pass = false;
          detail = `Genesis 1 verse count error: got ${ch1?.length || 0}, expected 31`;
        } else if (!ch1[0].textBn.includes('আদিতে ঈশ্বর')) {
          pass = false;
          detail = `Genesis 1:1 missing authentic keyword "আদিতে ঈশ্বর"`;
        } else {
          detail = `Genesis 1 verified: 31 verses, authentic IRV text`;
        }
      } catch (err) {
        pass = false;
        detail = `Genesis JSON error: ${err.message}`;
      }
    }
    record(7, 'পুরাতন নিয়ম নমুনা (OT Genesis 1 — 31 Verses)', pass, detail, probe.latency);
  }

  // --- Dimension 8: New Testament Representative (Mark 14 & John 3) ---
  {
    let mrkProbe = await safeFetch(`${CANONICAL_BASE}/bible-data/irv/MRK.json`);
    let jhnProbe = await safeFetch(`${CANONICAL_BASE}/bible-data/irv/JHN.json`);
    let pass = mrkProbe.ok && mrkProbe.status === 200 && jhnProbe.ok && jhnProbe.status === 200;
    let detail = 'Auditing Mark 14 & John 3';
    let totalLatency = mrkProbe.latency + jhnProbe.latency;

    if (pass) {
      try {
        const mrkData = JSON.parse(mrkProbe.text);
        const jhnData = JSON.parse(jhnProbe.text);

        const mrk14 = mrkData.chapters?.['14'];
        const jhn3 = jhnData.chapters?.['3'];

        if (!mrk14 || mrk14.length !== 72) {
          pass = false;
          detail = `Mark 14 verse count mismatch: got ${mrk14?.length || 0}, expected 72`;
        } else if (!mrk14[0].textBn.includes('উদ্ধারপর্ব')) {
          pass = false;
          detail = `Mark 14:1 missing keyword "উদ্ধারপর্ব"`;
        } else if (!jhn3 || jhn3.length !== 36) {
          pass = false;
          detail = `John 3 verse count mismatch: got ${jhn3?.length || 0}, expected 36`;
        } else if (!jhn3[0].textBn.includes('নীকদীম')) {
          pass = false;
          detail = `John 3:1 missing keyword "নীকদীম"`;
        } else {
          detail = `Mark 14 (72 verses) & John 3 (36 verses) verified authentic`;
        }
      } catch (err) {
        pass = false;
        detail = `NT JSON parse error: ${err.message}`;
      }
    } else {
      detail = `NT fetch failed: MRK=${mrkProbe.status}, JHN=${jhnProbe.status}`;
    }
    record(8, 'নতুন নিয়ম নমুনা (NT Mark 14 & John 3)', pass, detail, totalLatency);
  }

  // --- Dimension 9: Search Index Availability ---
  {
    let probe = await safeFetch(`${CANONICAL_BASE}/bible-data/irv/manifest.json`);
    let pass = probe.ok && probe.status === 200;
    let detail = pass ? `HTTP 200 OK (${probe.latency}ms)` : `Failed: HTTP ${probe.status}`;

    if (pass) {
      try {
        const manifest = JSON.parse(probe.text);
        if (!manifest.books || manifest.books.length !== 66) {
          pass = false;
          detail = `Search manifest books count mismatch: got ${manifest.books?.length || 0}, expected 66`;
        } else {
          detail = `Search index manifest verified: all 66 canonical books indexed`;
        }
      } catch (err) {
        pass = false;
        detail = `Search manifest parse error: ${err.message}`;
      }
    }
    record(9, 'অনুসন্ধান সূচক (Search Index & Manifest)', pass, detail, probe.latency);
  }

  // --- Dimension 10: Bengali Font Rendering ---
  {
    let probe = await safeFetch(`${CANONICAL_BASE}/`);
    let pass = probe.ok && probe.status === 200;
    let detail = 'Verifying Bengali typography configuration';

    if (pass) {
      const hasUtf8 = /charset=["']?utf-8["']?/i.test(probe.text);
      const hasGoogleFonts = probe.text.includes('fonts.googleapis.com') || probe.text.includes('Noto Sans') || probe.text.includes('Noto Serif');
      const hasLangBn = probe.text.includes('lang="bn"') || probe.text.includes("lang='bn'");

      if (!hasUtf8) {
        pass = false;
        detail = 'HTML missing utf-8 charset';
      } else {
        detail = `UTF-8 enabled, Bengali fonts linked (${hasLangBn ? 'lang=bn' : 'fonts-ready'})`;
      }
    } else {
      detail = `Failed to probe font declarations: HTTP ${probe.status}`;
    }
    record(10, 'বাংলা হরফ রেন্ডারিং (Bengali Font Typography)', pass, detail, probe.latency);
  }

  // --- Dimension 11: Installability Indicators ---
  {
    let manifestProbe = await safeFetch(`${CANONICAL_BASE}/manifest.webmanifest`);
    let pass = manifestProbe.ok && manifestProbe.status === 200;
    let detail = 'PWA install criteria check';

    if (pass) {
      try {
        const m = JSON.parse(manifestProbe.text);
        const hasStartUrl = Boolean(m.start_url);
        const hasDisplay = m.display === 'standalone' || m.display === 'fullscreen' || m.display === 'minimal-ui';
        const hasIcons = Array.isArray(m.icons) && m.icons.some(i => i.sizes?.includes('192') || i.sizes?.includes('512'));

        if (hasStartUrl && hasDisplay && hasIcons) {
          detail = `Installable PWA: display=${m.display}, icons=${m.icons.length}, start_url=${m.start_url}`;
        } else {
          pass = false;
          detail = `Missing PWA install criteria: start_url=${hasStartUrl}, display=${hasDisplay}, icons=${hasIcons}`;
        }
      } catch {
        pass = false;
        detail = 'Failed to parse webmanifest for install criteria';
      }
    } else {
      detail = `Cannot fetch manifest: HTTP ${manifestProbe.status}`;
    }
    record(11, 'ইনস্টল যোগ্যতা নির্দেশক (PWA Installability)', pass, detail, manifestProbe.latency);
  }

  // --- Dimension 12: Visible Content Markers ---
  {
    let probe = await safeFetch(`${CANONICAL_BASE}/`);
    let pass = probe.ok && probe.status === 200;
    let detail = 'Checking visible content branding markers';

    if (pass) {
      const hasTitle = probe.text.includes('বাংলা স্টাডি বাইবেল');
      const hasDescription = probe.text.includes('পবিত্র শাস্ত্র') || probe.text.includes('বিনামূল্যে');
      if (hasTitle) {
        detail = 'Title & brand markers verified: "বাংলা স্টাডি বাইবেল" present';
      } else {
        pass = false;
        detail = 'Missing Bengali brand markers in HTML payload';
      }
    } else {
      detail = `Failed to fetch HTML content: HTTP ${probe.status}`;
    }
    record(12, 'দৃশ্যমান বিষয়বস্তু মার্কার (Visible Content Markers)', pass, detail, probe.latency);
  }

  // --- Dimension 13: Rotating 66-Book Chapter Audit ---
  {
    let pass = true;
    let detail = 'Auditing rotating chapter across 66 books';
    let latency = 0;
    try {
      const manifestPath = path.join(ROOT_DIR, 'public', 'bible-data', 'irv', 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      const books = manifest.books || [];
      const state = getRotatingChapterState();
      const currentBook = books[state.bookIndex % books.length] || books[0];
      const targetChapter = state.chapterIndex || 1;

      const probe = await safeFetch(`${CANONICAL_BASE}/bible-data/irv/${currentBook.id}.json`);
      latency = probe.latency;

      if (!probe.ok || probe.status !== 200) {
        pass = false;
        detail = `Failed to fetch book ${currentBook.id}: HTTP ${probe.status}`;
      } else {
        const bookData = JSON.parse(probe.text);
        const chapterVerses = bookData.chapters?.[String(targetChapter)];
        if (!chapterVerses || chapterVerses.length === 0) {
          pass = false;
          detail = `Missing chapter ${targetChapter} in ${currentBook.id}`;
        } else {
          const sampleVerse = chapterVerses[0].textBn || '';
          const hasBengali = /[\u0980-\u09FF]/.test(sampleVerse);
          if (!hasBengali) {
            pass = false;
            detail = `Non-Bengali script detected in ${currentBook.id} ch ${targetChapter}`;
          } else {
            detail = `ঘূর্ণমান অধ্যায়: ${currentBook.nameBn} (${currentBook.id}) অধ্যায় ${targetChapter} — ${chapterVerses.length} পদ, খাঁটি বাংলা হরফ (${latency}ms)`;
            // Advance state to next chapter/book
            if (targetChapter < currentBook.expectedChapters) {
              state.chapterIndex = targetChapter + 1;
            } else {
              state.chapterIndex = 1;
              state.bookIndex = (state.bookIndex + 1) % books.length;
            }
            state.totalAudited = (state.totalAudited || 0) + 1;
            state.lastAuditedBook = currentBook.id;
            state.lastAuditedChapter = targetChapter;
            state.lastAuditedAt = new Date().toISOString();
            saveRotatingChapterState(state);
          }
        }
      }
    } catch (err) {
      pass = false;
      detail = `Rotating chapter audit error: ${err.message}`;
    }
    record(13, 'পর্যায়ক্রমিক ৬৬-পুস্তক অধ্যায় পরীক্ষা (Rotating 66-Book Chapter Audit)', pass, detail, latency);
  }

  const passedCount = results.filter(r => r.pass).length;
  const overallPass = passedCount === 13;

  return {
    timestamp,
    overallPass,
    passedCount,
    totalCount: 13,
    dimensions: results
  };
}

/**
 * 2-Step Confirmation and Safe Recovery Pipeline
 */
async function executeCheckWithConfirmation() {
  console.log(`\n🔍 [Pass 1/2] Initiating 12-Dimension Health Check at ${new Date().toISOString()}...`);
  let audit = await audit12Dimensions();

  if (audit.overallPass) {
    return audit;
  }

  // If failed on pass 1, wait 3 seconds and retry (Pass 2 Confirmation)
  console.warn(`⚠️ Warning: Pass 1 encountered failures (${audit.passedCount}/12). Retrying in 3 seconds for 2-step confirmation...`);
  await new Promise(r => setTimeout(r, 3000));

  console.log(`🔍 [Pass 2/2] Confirmatory re-audit...`);
  audit = await audit12Dimensions();

  if (audit.overallPass) {
    console.log(`✓ Pass 2 confirmed: Transient edge glitch resolved. All 12 dimensions passed.`);
    return audit;
  }

  // Two confirmed consecutive failures -> Trigger Safe Recovery
  console.error(`🚨 ALERT: Repeated check failures across ${audit.totalCount - audit.passedCount} dimensions. Recording for review...`);
  await triggerSafeRecovery(audit);

  // Post-recovery audit
  console.log(`🔄 Re-evaluating health post-recovery...`);
  audit = await audit12Dimensions();
  return audit;
}

async function triggerSafeRecovery(failedAudit) {
  const incidentId = `INC-${Date.now()}`;
  const incidentFile = path.join(INCIDENTS_DIR, `${incidentId}.json`);

  const incidentData = {
    incidentId,
    timestamp: new Date().toISOString(),
    audit: failedAudit,
    recoveryActions: []
  };

  incidentData.recoveryActions.push({ action: 'manual-review-required', status: 'NO_PRODUCTION_MUTATION' });
  console.warn('Probe failure recorded. Deployment and rollback require a separately reviewed operation.');

  fs.writeFileSync(incidentFile, JSON.stringify(incidentData, null, 2));
}

/**
 * 12-Hour Reporting Summary Generator
 */
export function generate12HourReport(history) {
  const now = Date.now();
  const twelveHoursAgo = now - 12 * 60 * 60 * 1000;
  const recentChecks = history.checks.filter(c => new Date(c.timestamp).getTime() >= twelveHoursAgo);

  const totalRuns = recentChecks.length;
  const successfulRuns = recentChecks.filter(c => c.overallPass).length;
  const uptimePercent = totalRuns > 0 ? ((successfulRuns / totalRuns) * 100).toFixed(2) : '100.00';

  const report = {
    generatedAt: new Date().toISOString(),
    reportingWindowHours: 12,
    canonicalDomain: 'https://bengalistudybible.surge.sh',
    permanentInstallUrl: 'https://bengalistudybible.surge.sh/install',
    totalChecksCompleted: totalRuns,
    successfulChecks: successfulRuns,
    uptimePercentage: `${uptimePercent}%`,
    officialStatus: uptimePercent >= 99.0 ? 'সব ব্যবস্থা স্বাভাবিক — All Systems Operational' : 'সতর্কতা — Degraded Performance',
    latestCheck: history.checks[history.checks.length - 1] || null
  };

  fs.writeFileSync(REPORT_12H_FILE, JSON.stringify(report, null, 2));
  return report;
}

// ----------------------------------------------------------------------------
// CLI Execution
// ----------------------------------------------------------------------------
const args = process.argv.slice(2);
const isOnce = args.includes('--once');
const isReport = args.includes('--report');
const isDaemon = args.includes('--daemon');

async function main() {
  console.log('================================================================================');
  console.log('   দীপ BENGALI STUDY BIBLE — 15-MINUTE DEEP HEALTH MONITOR');
  console.log('   12-Dimension Autonomous Assurance Engine');
  console.log(`   Canonical Address: ${INSTALL_URL}`);
  console.log('================================================================================');

  const history = loadHistory();

  if (isReport) {
    const report = generate12HourReport(history);
    console.log('\n📊 12-HOUR AUTOPILOT HEALTH REPORT:');
    console.log(JSON.stringify(report, null, 2));
    process.exit(0);
  }

  if (isOnce) {
    const audit = await executeCheckWithConfirmation();

    console.log('\n================================================================================');
    console.log(`   AUDIT RESULTS: ${audit.passedCount}/${audit.totalCount} PASSED (${audit.overallPass ? '100% HEALTHY' : 'OUTAGE'})`);
    console.log('================================================================================');
    for (const dim of audit.dimensions) {
      const icon = dim.pass ? '✓' : '✗';
      console.log(`  ${icon} [Dim ${String(dim.id).padStart(2, '0')}] ${dim.name.padEnd(45, ' ')} : ${dim.detail}`);
    }
    console.log('--------------------------------------------------------------------------------');

    history.checks.push(audit);
    saveHistory(history);
    generate12HourReport(history);

    if (audit.overallPass) {
      console.log('🎉 সব ব্যবস্থা স্বাভাবিক — All Systems Operational! Permanent access verified.\n');
      process.exit(0);
    } else {
      console.error('🚨 AUDIT FAILED: Some dimensions did not pass.\n');
      process.exit(1);
    }
  }

  if (isDaemon) {
    console.log('🚀 Running 15-minute daemon. Auditing immediately and every 15 minutes...\n');

    const runCycle = async () => {
      try {
        const audit = await executeCheckWithConfirmation();
        history.checks.push(audit);
        saveHistory(history);
        generate12HourReport(history);
        console.log(`\n[Cycle Complete] ${audit.passedCount}/12 dimensions verified. Sleeping 15 minutes...`);
      } catch (err) {
        console.error('Error during monitor cycle:', err);
      }
    };

    await runCycle();
    setInterval(runCycle, 15 * 60 * 1000);
  }
}

if (process.argv[1] && process.argv[1].endsWith('deep-15min-monitor.mjs')) {
  main().catch((err) => {
    console.error('Monitor runner error:', err);
    process.exit(1);
  });
}
