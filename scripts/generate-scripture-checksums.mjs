import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const dir = path.resolve('public/bible-data/irv');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'checksums.json');

console.log('Generating SHA-256 checksums for', files.length, 'Bible dataset files...');

const checksums = {};
let masterHash = crypto.createHash('sha256');

for (const f of files.sort()) {
  const content = fs.readFileSync(path.join(dir, f));
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  checksums[f] = hash;
  masterHash.update(f + ':' + hash + '\n');
}

const masterChecksum = masterHash.digest('hex');

const output = {
  translationId: 'irv-ben',
  translationName: 'Indian Revised Version (IRV) Bengali',
  generatedAt: new Date().toISOString(),
  canonicalBooksCount: 66,
  totalFilesHashed: files.length,
  masterChecksum: masterChecksum,
  fileChecksums: checksums
};

fs.writeFileSync(path.join(dir, 'checksums.json'), JSON.stringify(output, null, 2), 'utf8');
console.log('Successfully generated public/bible-data/irv/checksums.json');
console.log('Master Dataset SHA-256 Checksum:', masterChecksum);
