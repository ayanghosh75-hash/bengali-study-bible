// Bengali Morphological Normalizer, Spelling Variations & Semantic Synonyms

export interface SynonymCluster {
  conceptKey: string;
  primaryBn: string;
  primaryEn: string;
  synonyms: string[];
  semanticExpansions: string[];
  doctrinalTags: string[];
}

export const SYNONYM_CLUSTERS: SynonymCluster[] = [
  {
    conceptKey: 'salvation',
    primaryBn: 'পরিত্রাণ',
    primaryEn: 'Salvation',
    synonyms: [
      'পরিত্রাণ',
      'পরিত্রান',
      'পরিত্রাণের',
      'পরিত্রাণে',
      'পরিত্রাণকে',
      'উদ্ধার',
      'উদ্ধারকর্তা',
      'রক্ষা',
      'মুক্তি',
      'নিস্তার',
      'ত্রাণ',
      'পরিত্রাতা',
      'নাজাত',
    ],
    semanticExpansions: ['অনুগ্রহ', 'বিশ্বাস', 'অনুতাপ', 'ধার্মিকতা', 'অনন্ত জীবন', 'যীশু খ্রীষ্ট', 'ক্রুশ', 'পুনর্জন্ম'],
    doctrinalTags: ['Soteriology', 'পরিত্রাণবিদ্যা', 'সোটিরিওলজি', 'অনুগ্রহ', 'ধার্মিক গণ্যকরণ'],
  },
  {
    conceptKey: 'grace',
    primaryBn: 'অনুগ্রহ',
    primaryEn: 'Grace',
    synonyms: [
      'অনুগ্রহ',
      'অনুগ্রহের',
      'অনুগ্রহে',
      'কৃপা',
      'কৃপার',
      'দয়া',
      'দয়ার',
      'করুণা',
      'অযাচিত দান',
    ],
    semanticExpansions: ['পরিত্রাণ', 'প্রেম', 'ক্ষমা', 'বিশ্বাস', 'শান্তি', 'চিরন্তন জীবন'],
    doctrinalTags: ['Grace', 'ঈশ্বরের অনুগ্রহ', 'অপ্রাপ্য দান', 'কৃপা'],
  },
  {
    conceptKey: 'faith',
    primaryBn: 'বিশ্বাস',
    primaryEn: 'Faith',
    synonyms: [
      'বিশ্বাস',
      'বিশ্বাসের',
      'বিশ্বাসে',
      'আস্থা',
      'ভরসা',
      'প্রত্যাশা',
      'দৃঢ় আস্থা',
      'বিশ্বাসী',
      'বিশ্বাসীদের',
    ],
    semanticExpansions: ['পরিত্রাণ', 'প্রার্থনা', 'আজ্ঞাবহতা', 'আশা', 'ধার্মিকতা'],
    doctrinalTags: ['Faith', 'Pistis', 'বিশ্বাসের মাধ্যমে ধার্মিকতা'],
  },
  {
    conceptKey: 'repentance',
    primaryBn: 'অনুতাপ',
    primaryEn: 'Repentance',
    synonyms: [
      'অনুতাপ',
      'অনুতাপের',
      'মনোপরিবর্তন',
      'মনপরিবর্তন',
      'অনুতপ্ত',
      'পশ্চাত্তাপ',
      'পাপস্বীকার',
      'হৃদয় পরিবর্তন',
    ],
    semanticExpansions: ['ক্ষমা', 'পরিত্রাণ', 'পুনর্জন্ম', 'পবিত্র জীবন', 'বাপ্তিস্ম'],
    doctrinalTags: ['Repentance', 'Metanoia', 'মন পরিবর্তন', 'পাপ মোচন'],
  },
  {
    conceptKey: 'justification',
    primaryBn: 'ধার্মিক গণ্যকরণ',
    primaryEn: 'Justification',
    synonyms: [
      'ধার্মিক গণ্যকরণ',
      'ধার্মিকতা',
      'ধার্মিকতার',
      'ধার্মিক',
      'ন্যায়পরায়ণ',
      'ন্যায়পরায়ণ গণ্য হওয়া',
      'পুণ্যবান',
      'পাপহীন গণ্য',
    ],
    semanticExpansions: ['বিশ্বাস', 'অনুগ্রহ', 'খ্রীষ্টের ধার্মিকতা', 'পরিত্রাণ'],
    doctrinalTags: ['Justification', 'Dikaiosyne', 'আইনি নির্দোষ ঘোষণা'],
  },
  {
    conceptKey: 'love',
    primaryBn: 'প্রেম',
    primaryEn: 'Love',
    synonyms: ['প্রেম', 'প্রেমের', 'প্রেমে', 'ভালোবাসা', 'অগাধ প্রেম', 'স্নেহ', 'প্রীতি', 'আত্মত্যাগী প্রেম'],
    semanticExpansions: ['ঈশ্বরের চরিত্র', 'অনুগ্রহ', 'ক্রুশের বলিদান', 'ভ্রাতৃপ্রেম', 'ক্ষমা'],
    doctrinalTags: ['Agape', 'ঈশ্বরের প্রেম', 'সর্বোচ্চ বর'],
  },
  {
    conceptKey: 'christ',
    primaryBn: 'যীশু খ্রীষ্ট',
    primaryEn: 'Jesus Christ',
    synonyms: [
      'যীশু',
      'যীশুর',
      'খ্রীষ্ট',
      'খ্রীষ্টের',
      'খ্রিস্ট',
      'খ্রিস্টের',
      'মশীহ',
      'মশীহের',
      'প্রভু',
      'ঈশ্বরের পুত্র',
      'মেষশাবক',
      'সনাতন বাক্য',
    ],
    semanticExpansions: ['ঈশ্বরত্ব', 'মনুষ্যত্ব', 'পরিত্রাতা', 'ক্রুশ', 'পুনরুত্থান', 'অনন্ত জীবন', 'মধ্যস্থতাকারী'],
    doctrinalTags: ['Christology', 'খ্রীষ্টতত্ত্ব', 'মশীহ', 'ত্রিত্ব'],
  },
  {
    conceptKey: 'holy_spirit',
    primaryBn: 'পবিত্র আত্মা',
    primaryEn: 'Holy Spirit',
    synonyms: [
      'পবিত্র আত্মা',
      'পবিত্র আত্মার',
      'আত্মা',
      'ঈশ্বরের আত্মা',
      'সহায়ক',
      'সান্ত্বনাকারী',
      'পরাক্রম',
      'সত্যের আত্মা',
    ],
    semanticExpansions: ['পবিত্রীকরণ', 'নতুন জন্ম', 'আত্মার ফল', 'আত্মিক বর', 'শক্তি'],
    doctrinalTags: ['Pneumatology', 'পবিত্র আত্মাতত্ত্ব', 'প্যারাক্লেটოს'],
  },
  {
    conceptKey: 'eternal_life',
    primaryBn: 'অনন্ত জীবন',
    primaryEn: 'Eternal Life',
    synonyms: ['অনন্ত জীবন', 'অনন্ত জীবনের', 'অমরত্ব', 'চিরন্তন জীবন', 'স্বর্গরাজ্য', 'পরমদেশ'],
    semanticExpansions: ['পরিত্রাণ', 'পুনরুত্থান', 'ঈশ্বরের সান্নিধ্য', 'নতুন যিরূশালেম'],
    doctrinalTags: ['Eschatology', 'অনন্ত জীবন', 'পরিতৃপ্তি'],
  },
  {
    conceptKey: 'peace',
    primaryBn: 'শান্তি',
    primaryEn: 'Peace',
    synonyms: ['শান্তি', 'শান্তির', 'স্বস্তি', 'বিশ্রাম', 'নিরাপত্তা', 'পরম শান্তি'],
    semanticExpansions: ['ঈশ্বরের সাথে মিলন', 'প্রার্থনা', 'উদ্বেগহীনতা', 'শালোম'],
    doctrinalTags: ['Shalom', 'শান্তি', 'মেল-মিলাপ'],
  },
];

// Strip typical Bengali noun/verb grammatical suffixes
const BENGALI_SUFFIXES = [
  'গুলোর', 'গুলির', 'গুলো', 'গুলি',
  'দের', 'দিগের', 'গণের',
  'ের', 'র', 'কে', 'তে', 'ে', 'য়ে',
  'দ্বারা', 'কর্তৃক', 'হতে', 'থেকে', 'চেয়ে',
  'হীন', 'ময়', 'যুক্ত', 'শীল', 'কারী', 'পূর্ণ',
];

export function normalizeBengaliWord(rawWord: string): string {
  if (!rawWord) return '';
  let word = rawWord.trim().toLowerCase();

  // Normalize common orthographic variations in Bengali
  // 1. Candrabindu / Hasanta cleanup
  word = word.replace(/[\u0981\u09cd]/g, '');

  // 2. Phonetic harmonization: ণ -> ন
  word = word.replace(/ণ/g, 'ন');

  // 3. Harmonize sibilants: ষ, শ -> স
  word = word.replace(/[ষশ]/g, 'স');

  // 4. Harmonize য় -> য, ড় -> র
  word = word.replace(/য়/g, 'য').replace(/ড়/g, 'র');

  return word;
}

export function stripBengaliSuffix(word: string): string {
  const normalized = word.trim();
  for (const suf of BENGALI_SUFFIXES) {
    if (normalized.endsWith(suf) && normalized.length - suf.length >= 3) {
      return normalized.slice(0, -suf.length);
    }
  }
  return normalized;
}

export function matchConceptCluster(query: string): SynonymCluster[] {
  const cleanQ = query.trim().toLowerCase();
  const normalizedQ = normalizeBengaliWord(cleanQ);
  const strippedQ = stripBengaliSuffix(cleanQ);
  const strippedNormQ = normalizeBengaliWord(strippedQ);

  const matched: SynonymCluster[] = [];

  for (const cluster of SYNONYM_CLUSTERS) {
    let hasMatch = false;

    // Direct check
    if (
      cleanQ.includes(cluster.primaryBn.toLowerCase()) ||
      cleanQ.includes(cluster.primaryEn.toLowerCase()) ||
      normalizedQ.includes(normalizeBengaliWord(cluster.primaryBn))
    ) {
      hasMatch = true;
    }

    // Synonym check
    if (!hasMatch) {
      for (const syn of cluster.synonyms) {
        const synNorm = normalizeBengaliWord(syn);
        if (
          cleanQ.includes(syn.toLowerCase()) ||
          normalizedQ.includes(synNorm) ||
          strippedQ.includes(syn.toLowerCase()) ||
          strippedNormQ.includes(synNorm) ||
          syn.toLowerCase().includes(cleanQ) ||
          synNorm.includes(normalizedQ)
        ) {
          hasMatch = true;
          break;
        }
      }
    }

    if (hasMatch) {
      matched.push(cluster);
    }
  }

  // Fallback: If no direct match, check semantic expansions
  if (matched.length === 0) {
    for (const cluster of SYNONYM_CLUSTERS) {
      for (const exp of cluster.semanticExpansions) {
        if (cleanQ.includes(exp.toLowerCase()) || normalizedQ.includes(normalizeBengaliWord(exp))) {
          matched.push(cluster);
          break;
        }
      }
    }
  }

  // Default fallback to salvation if totally unmatched and query is generic/empty
  if (matched.length === 0) {
    const salvationCluster = SYNONYM_CLUSTERS.find((c) => c.conceptKey === 'salvation');
    if (salvationCluster) matched.push(salvationCluster);
  }

  return matched;
}
