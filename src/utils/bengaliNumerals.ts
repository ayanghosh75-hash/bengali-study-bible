const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliDigits(input: number | string): string {
  const str = input.toString();
  return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

export function fromBengaliDigits(input: string): string {
  const bengaliMap: Record<string, string> = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
  };
  return input.replace(/[০-৯]/g, (digit) => bengaliMap[digit] || digit);
}

export function formatVerseRef(
  bookNameBn: string,
  chapter: number,
  verse?: number,
  useBengaliDigits = true
): string {
  const chapStr = useBengaliDigits ? toBengaliDigits(chapter) : chapter.toString();
  if (verse !== undefined && verse !== null) {
    const verseStr = useBengaliDigits ? toBengaliDigits(verse) : verse.toString();
    return `${bookNameBn} ${chapStr}:${verseStr}`;
  }
  return `${bookNameBn} অধ্যায় ${chapStr}`;
}
