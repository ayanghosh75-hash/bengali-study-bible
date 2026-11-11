import { CrossReference } from '../types/study';

export const CROSS_REFERENCES_DB: CrossReference[] = [
  // John 1:1 Cross references
  {
    id: 'cr_jhn_1_1_gen_1_1',
    sourceVerseKey: 'JHN.1.1',
    sourceReferenceBn: 'যোহন ১:১',
    targetBookId: 'GEN',
    targetBookNameBn: 'আদিপুস্তক',
    targetChapter: 1,
    targetVerse: 1,
    relationship: 'parallel',
    relationshipNameBn: 'সমান্তরাল ভাবধারা',
    explanationBn: 'আদিপুস্তক ১:১ পদে যেখানে সৃষ্টির প্রারম্ভ বর্ণনা করে, যোহন ১:১ সেখানে সৃষ্টির পূর্বেই সনাতন বাক্যের শাশ্বত অস্তিত্বের কথা ঘোষণা করে।'
  },
  {
    id: 'cr_jhn_1_1_1jn_1_1',
    sourceVerseKey: 'JHN.1.1',
    sourceReferenceBn: 'যোহন ১:১',
    targetBookId: '1JN',
    targetBookNameBn: '১ যোহন',
    targetChapter: 1,
    targetVerse: 1,
    relationship: 'parallel',
    relationshipNameBn: 'সমান্তরাল পদ',
    explanationBn: '"যাহা আদিতঃ ছিল, যাহা আমরা শুনিয়াছি, যাহা স্বচক্ষে দেখিয়াছি..." — জীবনের বাক্যের প্রত্যক্ষ সাক্ষ্য।'
  },

  // Genesis 1:1 Cross references
  {
    id: 'cr_gen_1_1_jhn_1_3',
    sourceVerseKey: 'GEN.1.1',
    sourceReferenceBn: 'আদিপুস্তক ১:১',
    targetBookId: 'JHN',
    targetBookNameBn: 'যোহন',
    targetChapter: 1,
    targetVerse: 3,
    relationship: 'thematic',
    relationshipNameBn: 'সৃষ্টিতাত্ত্বিক পূর্ণতা',
    explanationBn: 'আদিপুস্তকে বর্ণিত সমস্ত সৃষ্টি ঈশ্বরের পুত্র যীশু খ্রীষ্টের (সনাতন বাক্য) মাধ্যমেই অস্তিত্ব লাভ করিয়াছে।'
  },

  // John 3:16 Cross references
  {
    id: 'cr_jhn_3_16_rom_8_32',
    sourceVerseKey: 'JHN.3.16',
    sourceReferenceBn: 'যোহন ৩:১৬',
    targetBookId: 'ROM',
    targetBookNameBn: 'রোমীয়',
    targetChapter: 8,
    targetVerse: 31,
    relationship: 'thematic',
    relationshipNameBn: 'ধর্মতাত্ত্বিক সংযোগ',
    explanationBn: 'ঈশ্বর যিনি আপনার নিজের পুত্রকে ছাড়িয়া দিলেন না, কিন্তু আমাদের সকলের নিমিত্ত তাঁহাকে সমর্পণ করিলেন, তিনি আর কি না আমাদিগকে দান করিবেন?'
  },
  {
    id: 'cr_jhn_3_16_1co_13',
    sourceVerseKey: 'JHN.3.16',
    sourceReferenceBn: 'যোহন ৩:১৬',
    targetBookId: '1CO',
    targetBookNameBn: '১ করিন্থীয়',
    targetChapter: 13,
    targetVerse: 4,
    relationship: 'thematic',
    relationshipNameBn: 'প্রেমের সর্বোচ্চ মানদণ্ড',
    explanationBn: 'ঈশ্বরের প্রেম যে দীর্ঘসহিষ্ণু ও আত্মত্যাগী, যোহন ৩:১৬ হলো তার চরম ঐতিহাসিক বাস্তবায়ন।'
  },

  // Psalm 23:1 Cross references
  {
    id: 'cr_psa_23_1_jhn_10_11',
    sourceVerseKey: 'PSA.23.1',
    sourceReferenceBn: 'গীতসংহিতা ২৩:১',
    targetBookId: 'JHN',
    targetBookNameBn: 'যোহন',
    targetChapter: 14,
    targetVerse: 27,
    relationship: 'fulfillment',
    relationshipNameBn: 'ভবিষ্যদ্বাণীর পরিপূর্ণতা',
    explanationBn: 'পুরাতন নিয়মে সদাপ্রভুর যে মেষপালকত্ব দায়ূদ প্রত্যক্ষ করেছিলেন, যীশু খ্রীষ্ট "উত্তম মেষপালক" রূপে আপনার প্রাণ দান করে এবং আত্মিক শান্তি রেখে গিয়ে তা পূর্ণ করেছেন।'
  },

  // Matthew 6:9 (The Lord's prayer) Cross references
  {
    id: 'cr_mat_6_9_pro_3_5',
    sourceVerseKey: 'MAT.6.9',
    sourceReferenceBn: 'মথি ৬:৯',
    targetBookId: 'PRO',
    targetBookNameBn: 'হিতোপদেশ',
    targetChapter: 3,
    targetVerse: 5,
    relationship: 'thematic',
    relationshipNameBn: 'সমর্পণ ও নির্ভরতা',
    explanationBn: 'ঈশ্বরের রাজ্য ও ইচ্ছার কাছে নিজেকে সঁপে দেওয়া হলো সমস্ত চিত্তে সদাপ্রভুতে নির্ভর করার বাস্তব প্রকাশ।'
  },

  // Romans 8:28 Cross references
  {
    id: 'cr_rom_8_28_pro_3_6',
    sourceVerseKey: 'ROM.8.28',
    sourceReferenceBn: 'রোমীয় ৮:২৮',
    targetBookId: 'PRO',
    targetBookNameBn: 'হিতোপদেশ',
    targetChapter: 3,
    targetVerse: 6,
    relationship: 'parallel',
    relationshipNameBn: 'সমান্তরাল সান্ত্বনা',
    explanationBn: 'ঈশ্বরের সার্বভৌম পথনির্দেশ বিশ্বাসীদের প্রতি পদে সৎ ও মঙ্গলময় ফল প্রদান করে।'
  },

  // John 14:6 Cross references
  {
    id: 'cr_jhn_14_6_mat_6_33',
    sourceVerseKey: 'JHN.14.6',
    sourceReferenceBn: 'যোহন ১৪:৬',
    targetBookId: 'MAT',
    targetBookNameBn: 'মথি',
    targetChapter: 6,
    targetVerse: 33,
    relationship: 'thematic',
    relationshipNameBn: 'পরিত্রাণের অগ্রাধিকার',
    explanationBn: 'প্রথমে ঈশ্বরের রাজ্য ও তাঁর একমাত্র ধার্মিকতার পথ যীশু খ্রীষ্টের অন্বেষণ করাই জীবনের আসল উদ্দেশ্য।'
  }
];

export function getCrossReferences(sourceVerseKey: string): CrossReference[] {
  return CROSS_REFERENCES_DB.filter((cr) => cr.sourceVerseKey === sourceVerseKey);
}
