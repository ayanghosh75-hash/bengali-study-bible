import fs from 'fs';
import path from 'path';

const checksumsData = JSON.parse(fs.readFileSync('public/bible-data/irv/checksums.json', 'utf-8'));
const manifestData = JSON.parse(fs.readFileSync('public/bible-data/irv/manifest.json', 'utf-8'));

const books = manifestData.books.map((b, idx) => {
  const fileName = b.id + '.json';
  const fileHash = checksumsData.fileChecksums[fileName] || '';
  return {
    canonicalOrder: idx + 1,
    id: b.id,
    nameBn: b.nameBn,
    nameEn: b.nameEn,
    expectedChapters: b.expectedChapters,
    actualChapters: b.actualChapters,
    totalVerses: b.totalVerses,
    status: b.status,
    fileName,
    sha256: fileHash
  };
});

const tsCode = `// ============================================================
// BENGALI STUDY BIBLE (বাংলা স্টাডি বাইবেল)
// “দীপ — আপনার বাইবেল অধ্যয়ন সহায়ক”
// AUTHORITATIVE 66-BOOK CANONICAL MANIFEST WITH SHA-256 CHECKSUMS
// All 66 Books | 1,189 Chapters | 31,088 Verses
// Translation: IRV Bengali (Indian Revised Version)
// Source: Bridge Connectivity Solutions / ebible.org
// Licence: Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
// Safeguard: Zero AI Manufactured Scripture Guaranteed
// ============================================================

export interface CanonicalBookChecksumEntry {
  canonicalOrder: number;
  id: string;
  nameBn: string;
  nameEn: string;
  expectedChapters: number;
  actualChapters: number;
  totalVerses: number;
  status: string;
  fileName: string;
  sha256: string;
}

export const CANONICAL_TRANSLATION_METADATA = {
  id: 'irv-ben',
  nameBn: 'ভারতীয় সংশোধিত সংস্করণ (IRV বাংলা)',
  nameEn: 'Indian Revised Version (IRV) Bengali',
  publisher: 'Bridge Connectivity Solutions Pvt. Ltd.',
  sourceUrl: 'https://ebible.org/find/details.php?id=benirv',
  license: 'Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  attribution: 'Indian Revised Version (IRV) Bengali, copyright © 2018, 2019 Bridge Connectivity Solutions Pvt. Ltd.',
  canonicalBooksCount: 66,
  canonicalChaptersCount: 1189,
  canonicalVersesCount: 31088,
  masterChecksum: '${checksumsData.masterChecksum}',
};

export const CANONICAL_66_BOOKS_MANIFEST: CanonicalBookChecksumEntry[] = ${JSON.stringify(books, null, 2)};

export function verifyBookChecksum(bookId: string, computedHash: string): boolean {
  const entry = CANONICAL_66_BOOKS_MANIFEST.find((b) => b.id === bookId);
  if (!entry) return false;
  return entry.sha256 === computedHash;
}

export function getCanonicalBookById(bookId: string): CanonicalBookChecksumEntry | undefined {
  return CANONICAL_66_BOOKS_MANIFEST.find((b) => b.id === bookId);
}
`;

fs.writeFileSync('src/data/canonicalBibleManifestWithChecksums.ts', tsCode, 'utf-8');
console.log('src/data/canonicalBibleManifestWithChecksums.ts generated successfully with ' + books.length + ' books.');
