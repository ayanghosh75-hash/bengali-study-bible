// ============================================================
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
  masterChecksum: '7a7525c13533403781512894ae3da7e4741d3ae60b3774db4a178ca244ee77d7',
};

export const CANONICAL_66_BOOKS_MANIFEST: CanonicalBookChecksumEntry[] = [
  {
    "canonicalOrder": 1,
    "id": "GEN",
    "nameBn": "আদিপুস্তক",
    "nameEn": "Genesis",
    "expectedChapters": 50,
    "actualChapters": 50,
    "totalVerses": 1533,
    "status": "COMPLETE",
    "fileName": "GEN.json",
    "sha256": "1160d63839cb2c094114b52f1ae6ae056d8ec04b8bf176bac3fc2ebabab32a4f"
  },
  {
    "canonicalOrder": 2,
    "id": "EXO",
    "nameBn": "যাত্রাপুস্তক",
    "nameEn": "Exodus",
    "expectedChapters": 40,
    "actualChapters": 40,
    "totalVerses": 1213,
    "status": "COMPLETE",
    "fileName": "EXO.json",
    "sha256": "2bda511017dd568591d6204525070946ef64715d5c8a2e0113f3367f746b6217"
  },
  {
    "canonicalOrder": 3,
    "id": "LEV",
    "nameBn": "লেবীয় পুস্তক",
    "nameEn": "Leviticus",
    "expectedChapters": 27,
    "actualChapters": 27,
    "totalVerses": 859,
    "status": "COMPLETE",
    "fileName": "LEV.json",
    "sha256": "8b22724a03e150360eea152321b0198154bb7ecda4d65a1a6be36e0f3dd41fad"
  },
  {
    "canonicalOrder": 4,
    "id": "NUM",
    "nameBn": "গণনা পুস্তক",
    "nameEn": "Numbers",
    "expectedChapters": 36,
    "actualChapters": 36,
    "totalVerses": 1288,
    "status": "COMPLETE",
    "fileName": "NUM.json",
    "sha256": "15e24ec8bf0cdcd10b9be54aef844915b6640d9f7c4e3ec9c580a9adb8300a46"
  },
  {
    "canonicalOrder": 5,
    "id": "DEU",
    "nameBn": "দ্বিতীয় বিবরণ",
    "nameEn": "Deuteronomy",
    "expectedChapters": 34,
    "actualChapters": 34,
    "totalVerses": 959,
    "status": "COMPLETE",
    "fileName": "DEU.json",
    "sha256": "b56470539e89fa2a18a0ddca8221ba7ca947407107b491b8e8ef71db663afa06"
  },
  {
    "canonicalOrder": 6,
    "id": "JOS",
    "nameBn": "যিহোশূয়",
    "nameEn": "Joshua",
    "expectedChapters": 24,
    "actualChapters": 24,
    "totalVerses": 658,
    "status": "COMPLETE",
    "fileName": "JOS.json",
    "sha256": "29254b9c376470cecccee70ec48e6a75a47f4ae85958ee80d80438474e628448"
  },
  {
    "canonicalOrder": 7,
    "id": "JDG",
    "nameBn": "বিচারকর্তৃগণ",
    "nameEn": "Judges",
    "expectedChapters": 21,
    "actualChapters": 21,
    "totalVerses": 618,
    "status": "COMPLETE",
    "fileName": "JDG.json",
    "sha256": "c04c70d60fb9c873134a63d63a4ee90d2221163196d8906a13bb1c8eeb27e134"
  },
  {
    "canonicalOrder": 8,
    "id": "RUT",
    "nameBn": "রূথ",
    "nameEn": "Ruth",
    "expectedChapters": 4,
    "actualChapters": 4,
    "totalVerses": 85,
    "status": "COMPLETE",
    "fileName": "RUT.json",
    "sha256": "cdfe7948947d35098f7b0e4a10550e6efe93c391d4503ddf2ba223e6343d005a"
  },
  {
    "canonicalOrder": 9,
    "id": "1SA",
    "nameBn": "১ শমূয়েল",
    "nameEn": "1 Samuel",
    "expectedChapters": 31,
    "actualChapters": 31,
    "totalVerses": 810,
    "status": "COMPLETE",
    "fileName": "1SA.json",
    "sha256": "e98ce4a65177a3528a8f0f2f5dff210b69f67a72a00e0bba04400993ab48bfdc"
  },
  {
    "canonicalOrder": 10,
    "id": "2SA",
    "nameBn": "২ শমূয়েল",
    "nameEn": "2 Samuel",
    "expectedChapters": 24,
    "actualChapters": 24,
    "totalVerses": 695,
    "status": "COMPLETE",
    "fileName": "2SA.json",
    "sha256": "2f6fe41ee842b27df55de19926011ea95c7a790718a15e3526b277a3c658c129"
  },
  {
    "canonicalOrder": 11,
    "id": "1KI",
    "nameBn": "১ রাজাবলি",
    "nameEn": "1 Kings",
    "expectedChapters": 22,
    "actualChapters": 22,
    "totalVerses": 816,
    "status": "COMPLETE",
    "fileName": "1KI.json",
    "sha256": "e5e9952403d67ebab0e2473c6419e858ed5cefa4a850be24601d225df6b4fd35"
  },
  {
    "canonicalOrder": 12,
    "id": "2KI",
    "nameBn": "২ রাজাবলি",
    "nameEn": "2 Kings",
    "expectedChapters": 25,
    "actualChapters": 25,
    "totalVerses": 719,
    "status": "COMPLETE",
    "fileName": "2KI.json",
    "sha256": "e5d5439a9402553c28ff3ae8b05477c32e3aa379624134c202e173015b66575d"
  },
  {
    "canonicalOrder": 13,
    "id": "1CH",
    "nameBn": "১ বংশাবলি",
    "nameEn": "1 Chronicles",
    "expectedChapters": 29,
    "actualChapters": 29,
    "totalVerses": 942,
    "status": "COMPLETE",
    "fileName": "1CH.json",
    "sha256": "a2caa32a4004f0181621b03bec91e7810b0b48ca98ff4193631ca94aecc5d767"
  },
  {
    "canonicalOrder": 14,
    "id": "2CH",
    "nameBn": "২ বংশাবলি",
    "nameEn": "2 Chronicles",
    "expectedChapters": 36,
    "actualChapters": 36,
    "totalVerses": 822,
    "status": "COMPLETE",
    "fileName": "2CH.json",
    "sha256": "4747dfae38e302a86c927687919f7cf4fa965bebabd2c38a772f9cc3baf1e3bf"
  },
  {
    "canonicalOrder": 15,
    "id": "EZR",
    "nameBn": "ইষ্রা",
    "nameEn": "Ezra",
    "expectedChapters": 10,
    "actualChapters": 10,
    "totalVerses": 280,
    "status": "COMPLETE",
    "fileName": "EZR.json",
    "sha256": "c48b301d4f404c1649ae5b0f64645bb17a7232e7629777b524bfb20245e163c0"
  },
  {
    "canonicalOrder": 16,
    "id": "NEH",
    "nameBn": "নহিমিয়",
    "nameEn": "Nehemiah",
    "expectedChapters": 13,
    "actualChapters": 13,
    "totalVerses": 406,
    "status": "COMPLETE",
    "fileName": "NEH.json",
    "sha256": "8ad39a4284b41cc7ca6090096365d6e4514db5ce53275865e22bee8d0543c3cb"
  },
  {
    "canonicalOrder": 17,
    "id": "EST",
    "nameBn": "ইষ্টের",
    "nameEn": "Esther",
    "expectedChapters": 10,
    "actualChapters": 10,
    "totalVerses": 167,
    "status": "COMPLETE",
    "fileName": "EST.json",
    "sha256": "10a87ce6d802fc7cb8e64711b7b69b0ec1a4cdae308c5f182472738c0028f241"
  },
  {
    "canonicalOrder": 18,
    "id": "JOB",
    "nameBn": "ইয়োব",
    "nameEn": "Job",
    "expectedChapters": 42,
    "actualChapters": 42,
    "totalVerses": 1070,
    "status": "COMPLETE",
    "fileName": "JOB.json",
    "sha256": "84dcdfe883e16b5db0fa246049cb41cac92f3a7822145afd3bbba3143735be08"
  },
  {
    "canonicalOrder": 19,
    "id": "PSA",
    "nameBn": "গীতসংহিতা",
    "nameEn": "Psalms",
    "expectedChapters": 150,
    "actualChapters": 150,
    "totalVerses": 2461,
    "status": "COMPLETE",
    "fileName": "PSA.json",
    "sha256": "f4b216f636651cc9f617261d40bd3884a7a54359d071cf9a87930246a7aedcf2"
  },
  {
    "canonicalOrder": 20,
    "id": "PRO",
    "nameBn": "হিতোপদেশ",
    "nameEn": "Proverbs",
    "expectedChapters": 31,
    "actualChapters": 31,
    "totalVerses": 915,
    "status": "COMPLETE",
    "fileName": "PRO.json",
    "sha256": "3e85b14d98512018208a296f2a92e84bca361fe0f9f11c36a765f76f46f269c5"
  },
  {
    "canonicalOrder": 21,
    "id": "ECC",
    "nameBn": "উপদেশক",
    "nameEn": "Ecclesiastes",
    "expectedChapters": 12,
    "actualChapters": 12,
    "totalVerses": 222,
    "status": "COMPLETE",
    "fileName": "ECC.json",
    "sha256": "3f8974184457412bd3e51bf4e07908b1c9923cf902e0db0b3b6bef4c901b03f9"
  },
  {
    "canonicalOrder": 22,
    "id": "SNG",
    "nameBn": "পরমগীত",
    "nameEn": "Song of Solomon",
    "expectedChapters": 8,
    "actualChapters": 8,
    "totalVerses": 117,
    "status": "COMPLETE",
    "fileName": "SNG.json",
    "sha256": "33fa56d063f279ed673062d7e54bd1f41b78fb896b7b8c5478648e96a9d500f5"
  },
  {
    "canonicalOrder": 23,
    "id": "ISA",
    "nameBn": "যিশাইয়",
    "nameEn": "Isaiah",
    "expectedChapters": 66,
    "actualChapters": 66,
    "totalVerses": 1292,
    "status": "COMPLETE",
    "fileName": "ISA.json",
    "sha256": "09c3e558376122f2d0770ce1f590a40eeaf79f2af2416cf32efd2db4efab0392"
  },
  {
    "canonicalOrder": 24,
    "id": "JER",
    "nameBn": "যিরমিয়",
    "nameEn": "Jeremiah",
    "expectedChapters": 52,
    "actualChapters": 52,
    "totalVerses": 1364,
    "status": "COMPLETE",
    "fileName": "JER.json",
    "sha256": "677b04839982fe8d22d21935207fc25335334bfe7b9db99abfe24e7320d4c031"
  },
  {
    "canonicalOrder": 25,
    "id": "LAM",
    "nameBn": "বিলাপ",
    "nameEn": "Lamentations",
    "expectedChapters": 5,
    "actualChapters": 5,
    "totalVerses": 154,
    "status": "COMPLETE",
    "fileName": "LAM.json",
    "sha256": "cb4b401b018b23dfda70d81dbb91c20e46607d554ef4dcd1295af7aefbbe72bd"
  },
  {
    "canonicalOrder": 26,
    "id": "EZK",
    "nameBn": "যিহিষ্কেল",
    "nameEn": "Ezekiel",
    "expectedChapters": 48,
    "actualChapters": 48,
    "totalVerses": 1273,
    "status": "COMPLETE",
    "fileName": "EZK.json",
    "sha256": "147981395363450d8b69e83a369873e1a03c3172a25447c30a5b8f10da84df83"
  },
  {
    "canonicalOrder": 27,
    "id": "DAN",
    "nameBn": "দানিয়েল",
    "nameEn": "Daniel",
    "expectedChapters": 12,
    "actualChapters": 12,
    "totalVerses": 357,
    "status": "COMPLETE",
    "fileName": "DAN.json",
    "sha256": "80057c84802ed76e0ba5669a4dc8fdd8e774d25492e45e0e66e4d30e0a9b31a0"
  },
  {
    "canonicalOrder": 28,
    "id": "HOS",
    "nameBn": "হোশেয়",
    "nameEn": "Hosea",
    "expectedChapters": 14,
    "actualChapters": 14,
    "totalVerses": 197,
    "status": "COMPLETE",
    "fileName": "HOS.json",
    "sha256": "32cdb413d7ac86c77b0bb82f9949c04a50a0845a7e953e055cfd2481cd363801"
  },
  {
    "canonicalOrder": 29,
    "id": "JOL",
    "nameBn": "যোয়েল",
    "nameEn": "Joel",
    "expectedChapters": 3,
    "actualChapters": 3,
    "totalVerses": 73,
    "status": "COMPLETE",
    "fileName": "JOL.json",
    "sha256": "4c24f68020f7180833251bbe78e863c88e0d3685e4d296625fccbe3ad037bcb4"
  },
  {
    "canonicalOrder": 30,
    "id": "AMO",
    "nameBn": "আমোষ",
    "nameEn": "Amos",
    "expectedChapters": 9,
    "actualChapters": 9,
    "totalVerses": 146,
    "status": "COMPLETE",
    "fileName": "AMO.json",
    "sha256": "0de141fb74ed9741b9ae5ecdabf3e1abb2be98d5fe4c2a920f2907fd6fd96e2e"
  },
  {
    "canonicalOrder": 31,
    "id": "OBA",
    "nameBn": "ওবদিয়",
    "nameEn": "Obadiah",
    "expectedChapters": 1,
    "actualChapters": 1,
    "totalVerses": 21,
    "status": "COMPLETE",
    "fileName": "OBA.json",
    "sha256": "69423bbba11faa7cd9da69d016c562c0283b155f2f2d4f34a3a23b729172f1d3"
  },
  {
    "canonicalOrder": 32,
    "id": "JON",
    "nameBn": "যোনা",
    "nameEn": "Jonah",
    "expectedChapters": 4,
    "actualChapters": 4,
    "totalVerses": 48,
    "status": "COMPLETE",
    "fileName": "JON.json",
    "sha256": "53a4a9ff92402b459c9b9e7b7662cebcf06fd7f15c3f896f2605d8cde42fb58d"
  },
  {
    "canonicalOrder": 33,
    "id": "MIC",
    "nameBn": "মীখা",
    "nameEn": "Micah",
    "expectedChapters": 7,
    "actualChapters": 7,
    "totalVerses": 105,
    "status": "COMPLETE",
    "fileName": "MIC.json",
    "sha256": "b5b7eadedb067347fa72d5abbc20c99d2b4bdfcdbcf3fe9678c2667950e8f026"
  },
  {
    "canonicalOrder": 34,
    "id": "NAM",
    "nameBn": "নহূম",
    "nameEn": "Nahum",
    "expectedChapters": 3,
    "actualChapters": 3,
    "totalVerses": 47,
    "status": "COMPLETE",
    "fileName": "NAM.json",
    "sha256": "296f063b6b865e427a2a41cdb3f29d8d4ec191804ceb5bfe64241580c9dfcab4"
  },
  {
    "canonicalOrder": 35,
    "id": "HAB",
    "nameBn": "হবক্কূক",
    "nameEn": "Habakkuk",
    "expectedChapters": 3,
    "actualChapters": 3,
    "totalVerses": 56,
    "status": "COMPLETE",
    "fileName": "HAB.json",
    "sha256": "a7fdefeb141be3638e8abfc577b282af07d8c4cc5911edbb73922c8b5e8698a9"
  },
  {
    "canonicalOrder": 36,
    "id": "ZEP",
    "nameBn": "সফনিয়",
    "nameEn": "Zephaniah",
    "expectedChapters": 3,
    "actualChapters": 3,
    "totalVerses": 53,
    "status": "COMPLETE",
    "fileName": "ZEP.json",
    "sha256": "5330d34937a15889b4d4781914a636fa9934bd9f28641faa9e553617c1d55e9e"
  },
  {
    "canonicalOrder": 37,
    "id": "HAG",
    "nameBn": "হগয়",
    "nameEn": "Haggai",
    "expectedChapters": 2,
    "actualChapters": 2,
    "totalVerses": 38,
    "status": "COMPLETE",
    "fileName": "HAG.json",
    "sha256": "34d155c6679028dbc3d20b56e8e17a362ed506673d80b5d26e8fa417a634375f"
  },
  {
    "canonicalOrder": 38,
    "id": "ZEC",
    "nameBn": "সখরিয়",
    "nameEn": "Zechariah",
    "expectedChapters": 14,
    "actualChapters": 14,
    "totalVerses": 211,
    "status": "COMPLETE",
    "fileName": "ZEC.json",
    "sha256": "10a369a9d7a4d77304561e8a6ffe30d344e3ec3b4c5173576db5d98729cf3a5b"
  },
  {
    "canonicalOrder": 39,
    "id": "MAL",
    "nameBn": "মালাখি",
    "nameEn": "Malachi",
    "expectedChapters": 4,
    "actualChapters": 4,
    "totalVerses": 55,
    "status": "COMPLETE",
    "fileName": "MAL.json",
    "sha256": "279ba54e747d1c31d310de4e5ddfc65725790a8587fca01ec780df20e199001b"
  },
  {
    "canonicalOrder": 40,
    "id": "MAT",
    "nameBn": "মথি",
    "nameEn": "Matthew",
    "expectedChapters": 28,
    "actualChapters": 28,
    "totalVerses": 1069,
    "status": "COMPLETE",
    "fileName": "MAT.json",
    "sha256": "b94067f1756ad6940c32d0f835e1a1a26c48333682be189543d6bf1d8425d85b"
  },
  {
    "canonicalOrder": 41,
    "id": "MRK",
    "nameBn": "মার্ক",
    "nameEn": "Mark",
    "expectedChapters": 16,
    "actualChapters": 16,
    "totalVerses": 674,
    "status": "COMPLETE",
    "fileName": "MRK.json",
    "sha256": "6992514fb208d8900e41aceba512f0ec95562d3a9afca5db1a2c1f292251f7a0"
  },
  {
    "canonicalOrder": 42,
    "id": "LUK",
    "nameBn": "লূক",
    "nameEn": "Luke",
    "expectedChapters": 24,
    "actualChapters": 24,
    "totalVerses": 1151,
    "status": "COMPLETE",
    "fileName": "LUK.json",
    "sha256": "cbd3c9c86d75d7bddefab50552242f11b0c50be35f9e5e038bf69b129a6389a2"
  },
  {
    "canonicalOrder": 43,
    "id": "JHN",
    "nameBn": "যোহন",
    "nameEn": "John",
    "expectedChapters": 21,
    "actualChapters": 21,
    "totalVerses": 879,
    "status": "COMPLETE",
    "fileName": "JHN.json",
    "sha256": "8f4ff4ba2b9cd8160d7c50a6f28af2b9e08cf3b5474b0c379cbafb1847f0e693"
  },
  {
    "canonicalOrder": 44,
    "id": "ACT",
    "nameBn": "প্রেরিতদের কার্য",
    "nameEn": "Acts",
    "expectedChapters": 28,
    "actualChapters": 28,
    "totalVerses": 1003,
    "status": "COMPLETE",
    "fileName": "ACT.json",
    "sha256": "ab0a9ae1855571897d4e05a77c370ae8ae7103ff2fef1d584f7e574963ae109c"
  },
  {
    "canonicalOrder": 45,
    "id": "ROM",
    "nameBn": "রোমীয়",
    "nameEn": "Romans",
    "expectedChapters": 16,
    "actualChapters": 16,
    "totalVerses": 431,
    "status": "COMPLETE",
    "fileName": "ROM.json",
    "sha256": "d0350d90d43377dc1327edaac2d50f71ab41b14175d5e549b0f738a12e8dbc0b"
  },
  {
    "canonicalOrder": 46,
    "id": "1CO",
    "nameBn": "১ করিন্থীয়",
    "nameEn": "1 Corinthians",
    "expectedChapters": 16,
    "actualChapters": 16,
    "totalVerses": 437,
    "status": "COMPLETE",
    "fileName": "1CO.json",
    "sha256": "c9c99b92c062d7b0aa132f45b5b1009fde747e6f89b5a42edbbc71223625d791"
  },
  {
    "canonicalOrder": 47,
    "id": "2CO",
    "nameBn": "২ করিন্থীয়",
    "nameEn": "2 Corinthians",
    "expectedChapters": 13,
    "actualChapters": 13,
    "totalVerses": 257,
    "status": "COMPLETE",
    "fileName": "2CO.json",
    "sha256": "44283a1366868e5f0c6bbfd1f6004d8ae32c71c5a41e70cf2eb096aa6e17d717"
  },
  {
    "canonicalOrder": 48,
    "id": "GAL",
    "nameBn": "গালাতীয়",
    "nameEn": "Galatians",
    "expectedChapters": 6,
    "actualChapters": 6,
    "totalVerses": 149,
    "status": "COMPLETE",
    "fileName": "GAL.json",
    "sha256": "42dbce208eebdf8e8939ddc91f16523386ef382ed4902907385f7075ff4e8a67"
  },
  {
    "canonicalOrder": 49,
    "id": "EPH",
    "nameBn": "ইফিষীয়",
    "nameEn": "Ephesians",
    "expectedChapters": 6,
    "actualChapters": 6,
    "totalVerses": 155,
    "status": "COMPLETE",
    "fileName": "EPH.json",
    "sha256": "b64b55160c19cb09ef7aa0b37d950efc9752f0e5c54bbae7bf69043bc215d7e4"
  },
  {
    "canonicalOrder": 50,
    "id": "PHP",
    "nameBn": "ফিলিপীয়",
    "nameEn": "Philippians",
    "expectedChapters": 4,
    "actualChapters": 4,
    "totalVerses": 104,
    "status": "COMPLETE",
    "fileName": "PHP.json",
    "sha256": "7980d2a25db2ef21ad2caf31cbc942968776424c8b028a46e50538723b80f614"
  },
  {
    "canonicalOrder": 51,
    "id": "COL",
    "nameBn": "কলসীয়",
    "nameEn": "Colossians",
    "expectedChapters": 4,
    "actualChapters": 4,
    "totalVerses": 95,
    "status": "COMPLETE",
    "fileName": "COL.json",
    "sha256": "33acf957e3896693fe6e247843bb917b5ce9e6613d19fb943927158e44677bcc"
  },
  {
    "canonicalOrder": 52,
    "id": "1TH",
    "nameBn": "১ থিষলনীকীয়",
    "nameEn": "1 Thessalonians",
    "expectedChapters": 5,
    "actualChapters": 5,
    "totalVerses": 85,
    "status": "COMPLETE",
    "fileName": "1TH.json",
    "sha256": "d9e480d39c76ec171688acd050e7dc3282139d92ec78b46088837881c9632df9"
  },
  {
    "canonicalOrder": 53,
    "id": "2TH",
    "nameBn": "২ থিষলনীকীয়",
    "nameEn": "2 Thessalonians",
    "expectedChapters": 3,
    "actualChapters": 3,
    "totalVerses": 47,
    "status": "COMPLETE",
    "fileName": "2TH.json",
    "sha256": "4968cee127525b2a1a6b87aab7d8bc3d50516312839df3e988ab438e1f0a838b"
  },
  {
    "canonicalOrder": 54,
    "id": "1TI",
    "nameBn": "১ তীমথিয়",
    "nameEn": "1 Timothy",
    "expectedChapters": 6,
    "actualChapters": 6,
    "totalVerses": 113,
    "status": "COMPLETE",
    "fileName": "1TI.json",
    "sha256": "d51c523a42110ad8737502ab713ea58077c6b391f59125808910801bc09afdcc"
  },
  {
    "canonicalOrder": 55,
    "id": "2TI",
    "nameBn": "২ তীমথিয়",
    "nameEn": "2 Timothy",
    "expectedChapters": 4,
    "actualChapters": 4,
    "totalVerses": 83,
    "status": "COMPLETE",
    "fileName": "2TI.json",
    "sha256": "e43208f91a458ef72c3b216caff6ac7467195810a3b057c6cb8a93dc87e4d647"
  },
  {
    "canonicalOrder": 56,
    "id": "TIT",
    "nameBn": "তীত",
    "nameEn": "Titus",
    "expectedChapters": 3,
    "actualChapters": 3,
    "totalVerses": 46,
    "status": "COMPLETE",
    "fileName": "TIT.json",
    "sha256": "abd677a39c32fdad97b95f2455470a9683d9fc0b76faa2d2f5722e36866ea4b7"
  },
  {
    "canonicalOrder": 57,
    "id": "PHM",
    "nameBn": "ফিলীমন",
    "nameEn": "Philemon",
    "expectedChapters": 1,
    "actualChapters": 1,
    "totalVerses": 25,
    "status": "COMPLETE",
    "fileName": "PHM.json",
    "sha256": "8069210326286177ff541ca0c14a71c98b23bb4a8843d0013b280f2118622437"
  },
  {
    "canonicalOrder": 58,
    "id": "HEB",
    "nameBn": "ইব্রীয়",
    "nameEn": "Hebrews",
    "expectedChapters": 13,
    "actualChapters": 13,
    "totalVerses": 303,
    "status": "COMPLETE",
    "fileName": "HEB.json",
    "sha256": "cf9397bc22479afb56a30a323a63d7e7c1b2c199405c15e383187e5350f5fd66"
  },
  {
    "canonicalOrder": 59,
    "id": "JAS",
    "nameBn": "যাকোব",
    "nameEn": "James",
    "expectedChapters": 5,
    "actualChapters": 5,
    "totalVerses": 108,
    "status": "COMPLETE",
    "fileName": "JAS.json",
    "sha256": "4d884ddfe921a7c70f3a8bb5275c62a858fd544ed470b2fa4bd55a6a79935376"
  },
  {
    "canonicalOrder": 60,
    "id": "1PE",
    "nameBn": "১ পিতর",
    "nameEn": "1 Peter",
    "expectedChapters": 5,
    "actualChapters": 5,
    "totalVerses": 105,
    "status": "COMPLETE",
    "fileName": "1PE.json",
    "sha256": "ebb98ade77d41d93d65edae8d53a9e3dd860601d07cdbd14537e0436f12efdca"
  },
  {
    "canonicalOrder": 61,
    "id": "2PE",
    "nameBn": "২ পিতর",
    "nameEn": "2 Peter",
    "expectedChapters": 3,
    "actualChapters": 3,
    "totalVerses": 61,
    "status": "COMPLETE",
    "fileName": "2PE.json",
    "sha256": "8c1fa7bdac0789b9961f5366c8182a941541fb7a4969a1d68c7a568cf69f6de0"
  },
  {
    "canonicalOrder": 62,
    "id": "1JN",
    "nameBn": "১ যোহন",
    "nameEn": "1 John",
    "expectedChapters": 5,
    "actualChapters": 5,
    "totalVerses": 105,
    "status": "COMPLETE",
    "fileName": "1JN.json",
    "sha256": "af324017468abfd706adb0d89337d15677ab0d0e5adf642fc780d2aee1de0b08"
  },
  {
    "canonicalOrder": 63,
    "id": "2JN",
    "nameBn": "২ যোহন",
    "nameEn": "2 John",
    "expectedChapters": 1,
    "actualChapters": 1,
    "totalVerses": 13,
    "status": "COMPLETE",
    "fileName": "2JN.json",
    "sha256": "0ba89e30b8e58792eb97375d1080c5250c72cd9c5eb658bb9299eddd833eb0a0"
  },
  {
    "canonicalOrder": 64,
    "id": "3JN",
    "nameBn": "৩ যোহন",
    "nameEn": "3 John",
    "expectedChapters": 1,
    "actualChapters": 1,
    "totalVerses": 15,
    "status": "COMPLETE",
    "fileName": "3JN.json",
    "sha256": "58246bb45054fb46b5cb9883a091770fe2ed206e29fe57b1741bec6b2533df8d"
  },
  {
    "canonicalOrder": 65,
    "id": "JUD",
    "nameBn": "যিহূদা",
    "nameEn": "Jude",
    "expectedChapters": 1,
    "actualChapters": 1,
    "totalVerses": 25,
    "status": "COMPLETE",
    "fileName": "JUD.json",
    "sha256": "9077585891c1873638e4c54f86dd5f2667546a0d3106d544221944dc26a3aeb4"
  },
  {
    "canonicalOrder": 66,
    "id": "REV",
    "nameBn": "প্রকাশিত বাক্য",
    "nameEn": "Revelation",
    "expectedChapters": 22,
    "actualChapters": 22,
    "totalVerses": 405,
    "status": "COMPLETE",
    "fileName": "REV.json",
    "sha256": "1a035401af1a2865abcf9f8c4819fd13c767da105c3b2504ee2905b6144a284a"
  }
];

export function verifyBookChecksum(bookId: string, computedHash: string): boolean {
  const entry = CANONICAL_66_BOOKS_MANIFEST.find((b) => b.id === bookId);
  if (!entry) return false;
  return entry.sha256 === computedHash;
}

export function getCanonicalBookById(bookId: string): CanonicalBookChecksumEntry | undefined {
  return CANONICAL_66_BOOKS_MANIFEST.find((b) => b.id === bookId);
}
