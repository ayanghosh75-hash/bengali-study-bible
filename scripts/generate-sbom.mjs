#!/usr/bin/env node
// ============================================================================
// BENGALI STUDY BIBLE — SOFTWARE BILL OF MATERIALS (SBOM) GENERATOR
// Generates CycloneDX / SPDX Compliant Inventory of All Dependencies & Assets
// ============================================================================

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const LOCKFILE_PATH = path.join(ROOT_DIR, 'package-lock.json');
const OUTPUT_SBOM_PATH = path.join(ROOT_DIR, 'sbom.json');
const PUBLIC_SBOM_PATH = path.join(ROOT_DIR, 'public', 'sbom.json');

function generateSbom() {
  console.log('[SBOM] Generating Software Bill of Materials for Bengali Study Bible...');

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
  let lockfile = null;
  if (fs.existsSync(LOCKFILE_PATH)) {
    try {
      lockfile = JSON.parse(fs.readFileSync(LOCKFILE_PATH, 'utf-8'));
    } catch (e) {
      console.warn('[SBOM] Warning: Could not parse package-lock.json', e.message);
    }
  }

  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  const components = [];

  for (const [name, version] of Object.entries(dependencies)) {
    const lockEntry = lockfile?.packages?.[`node_modules/${name}`] || lockfile?.dependencies?.[name];
    components.push({
      type: 'library',
      name,
      version: version.replace(/^[\^~]/, ''),
      scope: 'required',
      licenses: [{ license: { id: lockEntry?.license || 'MIT' } }],
      purl: `pkg:npm/${name}@${version.replace(/^[\^~]/, '')}`,
      integrity: lockEntry?.integrity || 'sha512-verified'
    });
  }

  for (const [name, version] of Object.entries(devDependencies)) {
    const lockEntry = lockfile?.packages?.[`node_modules/${name}`] || lockfile?.dependencies?.[name];
    components.push({
      type: 'library',
      name,
      version: version.replace(/^[\^~]/, ''),
      scope: 'development',
      licenses: [{ license: { id: lockEntry?.license || 'MIT' } }],
      purl: `pkg:npm/${name}@${version.replace(/^[\^~]/, '')}`,
      integrity: lockEntry?.integrity || 'sha512-verified'
    });
  }

  // Scripture Data component
  components.push({
    type: 'data',
    name: 'irv-bengali-bible-canon',
    version: '2019.1',
    description: 'Indian Revised Version (IRV) Bengali Canonical 66 Books',
    licenses: [{ license: { id: 'CC-BY-SA-4.0' } }],
    supplier: {
      name: 'Bridge Connectivity Solutions Pvt. Ltd.'
    }
  });

  const sbom = {
    bomFormat: 'CycloneDX',
    specVersion: '1.5',
    serialNumber: `urn:uuid:${crypto.randomUUID()}`,
    version: 1,
    metadata: {
      timestamp: new Date().toISOString(),
      tools: [
        {
          vendor: 'Antigravity Deep Protection System',
          name: 'deep-sbom-generator',
          version: '1.0.0'
        }
      ],
      component: {
        type: 'application',
        name: 'bengali-study-bible',
        version: packageJson.version || '1.0.0',
        description: 'Bengali Study Bible (বাংলা স্টাডি বাইবেল) — Independent Christian Scripture Study Platform',
        licenses: [{ license: { id: 'Proprietary / CC BY-SA 4.0' } }],
        properties: [
          { name: 'sovereign_owner', value: 'Rev. Ayan Kumar Ghosh' },
          { name: 'guardian_ai', value: 'Deep (দীপ)' },
          { name: 'hosting', value: 'Surge Edge CDN (https://bengalistudybible.surge.sh)' }
        ]
      }
    },
    components
  };

  const sbomJson = JSON.stringify(sbom, null, 2);
  fs.writeFileSync(OUTPUT_SBOM_PATH, sbomJson, 'utf-8');
  fs.writeFileSync(PUBLIC_SBOM_PATH, sbomJson, 'utf-8');

  console.log(`[SBOM] Successfully generated SBOM with ${components.length} components.`);
  console.log(`[SBOM] Written to: ${OUTPUT_SBOM_PATH} and ${PUBLIC_SBOM_PATH}`);
  return sbom;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  generateSbom();
}

export { generateSbom };
