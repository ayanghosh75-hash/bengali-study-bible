import { BibleVerse } from '../types/bible';
import { GENESIS_VERSES } from './verses/genesis';
import { PSALMS_VERSES } from './verses/psalms';
import { MATTHEW_VERSES } from './verses/matthew';
import { JOHN_VERSES } from './verses/john';
import { EPISTLES_VERSES } from './verses/epistles';
export { DAILY_VERSES } from './verses/daily';
export type { DailyVerseItem } from './verses/daily';

// Complete combined authentic Bengali Scripture Database
export const BENGALI_VERSES_DB: BibleVerse[] = [
  ...GENESIS_VERSES,
  ...PSALMS_VERSES,
  ...MATTHEW_VERSES,
  ...JOHN_VERSES,
  ...EPISTLES_VERSES,
];
