import fs from 'fs';
import path from 'path';


const ROOT_DIR = process.cwd();
const INCIDENTS_DIR = path.join(ROOT_DIR, '.incidents');
const STATE_FILE = path.join(ROOT_DIR, '.incidents', 'monitor-state.json');

const PROBE_ENDPOINTS = [
  {
    name: 'Homepage Root',
    url: 'https://bengalistudybible.surge.sh/',
    type: 'html',
    requiredText: 'বাংলা স্টাডি বাইবেল',
  },
  {
    name: 'Permanent Install Portal',
    url: 'https://bengalistudybible.surge.sh/install',
    type: 'html',
    requiredText: 'বাংলা স্টাডি বাইবেল',
  },
  {
    name: 'Scripture Chapter (Mark 14 Data)',
    url: 'https://bengalistudybible.surge.sh/bible-data/irv/MRK.json',
    type: 'json',
    requiredText: 'উদ্ধারপর্ব',
  },
  {
    name: 'PWA Webmanifest',
    url: 'https://bengalistudybible.surge.sh/manifest.webmanifest',
    type: 'json',
    requiredText: 'বাংলা স্টাডি বাইবেল',
  },
  {
    name: 'Production Service Worker',
    url: 'https://bengalistudybible.surge.sh/sw.js',
    type: 'js',
    requiredText: 'bengali-study-bible-v6',
  }
];

const FORBIDDEN_ALL_STRINGS = [
  'trycloudflare.com',
  'localtunnel.me',
  'ngrok-free.app',
  'DNS_PROBE_FINISHED_NXDOMAIN'
];

const FORBIDDEN_HTML_STRINGS = [
  'Unavailable',
  'project: bengalistudybible.surge.sh',
  '<title>project:',
  'Page Not Found - surge'
];

if (!fs.existsSync(INCIDENTS_DIR)) {
  fs.mkdirSync(INCIDENTS_DIR, { recursive: true });
}

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    } catch {}
  }
  return {
    lastCheckTime: null,
    status: 'UNKNOWN',
    consecutiveFailures: 0,
    activeIncidentId: null,
    recoveryAttempts: 0,
    endpoints: {},
  };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function probeUrl(endpoint) {
  const start = Date.now();
  try {
    const res = await fetch(endpoint.url, {
      signal: AbortSignal.timeout(25000),
      headers: {
        'User-Agent': 'DeepUptimeMonitor/2.0 (BSB Production Steward; Rev. Ayan Kumar Ghosh)',
        'Cache-Control': 'no-cache',
      },
    });
    const latency = Date.now() - start;
    const text = await res.text();

    if (res.status < 200 || res.status >= 300) {
      return {
        ok: false,
        status: res.status,
        latency,
        error: `HTTP status ${res.status}`,
      };
    }

    // Check universal forbidden strings (temporary tunnel leakages)
    for (const forbidden of FORBIDDEN_ALL_STRINGS) {
      if (text.includes(forbidden)) {
        return {
          ok: false,
          status: res.status,
          latency,
          error: `Response contained forbidden tunnel/DNS signature: "${forbidden}"`,
        };
      }
    }

    // Check HTML error signatures for web page endpoints
    if (endpoint.type === 'html') {
      for (const forbidden of FORBIDDEN_HTML_STRINGS) {
        if (text.includes(forbidden)) {
          return {
            ok: false,
            status: res.status,
            latency,
            error: `HTML response contained forbidden error signature: "${forbidden}"`,
          };
        }
      }
    }

    if (endpoint.requiredText && !text.includes(endpoint.requiredText)) {
      return {
        ok: false,
        status: res.status,
        latency,
        error: `Missing required content string: "${endpoint.requiredText}"`,
      };
    }

    return {
      ok: true,
      status: res.status,
      latency,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      latency: Date.now() - start,
      error: `Network fetch failed: ${err.message}`,
    };
  }
}

export async function runUptimeAudit() {
  console.log('================================================================================');
  console.log('   দীপ EXTERNAL PRODUCTION UPTIME & HEALTH PROBE');
  console.log(`   Time: ${new Date().toISOString()}`);
  console.log('================================================================================\n');

  const state = loadState();
  let overallHealthy = true;
  const probeResults = [];

  for (const ep of PROBE_ENDPOINTS) {
    process.stdout.write(`[PROBE] Checking ${ep.name} (${ep.url})... `);
    let result = await probeUrl(ep);

    // If first check fails, retry once to prevent transient edge false alarms
    if (!result.ok) {
      process.stdout.write(`[RETRYING]... `);
      await new Promise((r) => setTimeout(r, 1500));
      result = await probeUrl(ep);
    }

    if (result.ok) {
      console.log(`✓ 200 OK (${result.latency}ms)`);
    } else {
      console.log(`✗ FAILED (${result.error})`);
      overallHealthy = false;
    }

    probeResults.push({ ...ep, result });
    state.endpoints[ep.name] = {
      url: ep.url,
      ok: result.ok,
      status: result.status,
      latency: result.latency,
      lastChecked: new Date().toISOString(),
      error: result.error || null,
    };
  }

  state.lastCheckTime = new Date().toISOString();

  if (overallHealthy) {
    console.log('\n🎉 ALL PRODUCTION PROBES HEALTHY! 0 Outages, 0 Error Pages Detected.');
    state.status = 'HEALTHY';
    state.consecutiveFailures = 0;
    if (state.activeIncidentId) {
      console.log(`Resolving prior incident: ${state.activeIncidentId}`);
      state.activeIncidentId = null;
      state.recoveryAttempts = 0;
    }
    saveState(state);
    return { healthy: true, probeResults };
  }

  // Handle Failure
  console.error('\n⚠️ CHECK FAILED FROM THIS VANTAGE POINT. Recording incident for review...');
  state.status = probeResults.some(p => p.result.status === 451) ? 'RESTRICTED_ACCESS' : 'CHECK_FAILED';
  state.consecutiveFailures += 1;

  if (!state.activeIncidentId) {
    state.activeIncidentId = `INC-${Date.now().toString(36).toUpperCase()}`;
    const incidentRecord = {
      id: state.activeIncidentId,
      startTime: new Date().toISOString(),
      status: 'OPEN',
      targetUrl: 'https://bengalistudybible.surge.sh/install',
      failures: probeResults.filter((p) => !p.result.ok),
      recoveryAttempts: [],
    };
    fs.writeFileSync(
      path.join(INCIDENTS_DIR, `${state.activeIncidentId}.json`),
      JSON.stringify(incidentRecord, null, 2)
    );
    console.log(`  ✓ Logged new P0 Incident Record: ${state.activeIncidentId}`);
  }

  // A failed probe cannot authorize deployment or validate a rollback image.
  state.recoveryRequired = true;
  saveState(state);
  console.error('No production mutation performed. Review the observed failure before recovery.');

  return { healthy: false, probeResults, state };
}

// Execute CLI
if (process.argv.includes('--once') || process.argv[1] === import.meta.filename) {
  runUptimeAudit()
    .then((res) => {
      process.exit(res.healthy ? 0 : 1);
    })
    .catch((err) => {
      console.error('Monitor runtime exception:', err);
      process.exit(1);
    });
}
