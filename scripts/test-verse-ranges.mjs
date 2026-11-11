import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {rangesInUsfm,auditRanges} from './audit-verse-ranges.mjs';
test('a bridge is a separate reference, not part of its preceding verse',()=>{
 const rows=rangesInUsfm('\\id MAT\n\\c 18\n\\v 9 Previous.\n\\v 10-11 Joined source text.\n\\v 12 Next.');
 assert.deepEqual(rows,[{bookId:'MAT',chapter:18,first:10,last:11,label:'10-11'}]);
});
test('backwards bridges fail instead of being silently accepted',()=>{
 assert.throws(()=>rangesInUsfm('\\id MAT\n\\c 18\n\\v 11-10 Invalid.'),/Invalid/);
});
test('old merged data is flagged, never reported as verified',()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'bsb-range-test-'));
 const usfm=path.join(temp,'usfm'),data=path.join(temp,'data');fs.mkdirSync(usfm);fs.mkdirSync(data);
 fs.writeFileSync(path.join(usfm,'MAT.usfm'),'\\id MAT\n\\c 18\n\\v 9 Previous.\n\\v 10-11 Joined.');
 fs.writeFileSync(path.join(data,'MAT.json'),JSON.stringify({chapters:{18:[{verse:9,textBn:'Previous. 10-11 Joined.'}]}}));
 const [result]=auditRanges(usfm,data);
 assert.equal(result.status,'UNRESOLVED_RANGE_MAPPING');assert.equal(result.attachedToPrevious,true);
});
