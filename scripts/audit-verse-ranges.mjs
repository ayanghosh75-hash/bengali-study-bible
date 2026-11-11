import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Verse bridges are source references in their own right, never continuation
// text belonging to the preceding verse. This audit does not edit Scripture.
export function rangesInUsfm(text) {
  let bookId=null,chapter=null;
  const ranges=[];
  for(const line of text.split(/\r?\n/)) {
    let m=line.trim().match(/^\\id\s+(\S+)/);
    if(m){bookId=m[1];continue;}
    m=line.trim().match(/^\\c\s+(\d+)/);
    if(m){chapter=Number(m[1]);continue;}
    m=line.trim().match(/^\\v\s+(\d+)-(\d+)(?:\s|$)/);
    if(m){
      const first=Number(m[1]),last=Number(m[2]);
      if(!bookId || !chapter || last<first)throw Error('Invalid USFM verse range');
      ranges.push({bookId,chapter,first,last,label:`${first}-${last}`});
    }
  }
  return ranges;
}
export function auditRanges(usfmDir,dataDir) {
  const results=[];
  for(const file of fs.readdirSync(usfmDir).filter(f=>f.endsWith('.usfm'))) {
    for(const range of rangesInUsfm(fs.readFileSync(path.join(usfmDir,file),'utf8'))) {
      const data=JSON.parse(fs.readFileSync(path.join(dataDir,`${range.bookId}.json`),'utf8'));
      const chapter=data.chapters[String(range.chapter)]??[];
      const preceding=chapter.find(v=>v.verse===range.first-1);
      const bridge=chapter.find(v=>v.verse===range.first && v.verseEnd===range.last);
      results.push({...range,source:file,status:bridge?'EXPLICIT_BRIDGE_PRESENT_REQUIRES_TEXT_REVIEW':'UNRESOLVED_RANGE_MAPPING',attachedToPrevious:preceding?.textBn.includes(range.label)??false});
    }
  }
  return results;
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const ranges=auditRanges('data-raw/usfm','public/bible-data/irv');
  const report={checkedAt:new Date().toISOString(),status:ranges.length?'REVIEW_REQUIRED':'NO_VERSE_RANGES',ranges};
  fs.mkdirSync('.ops-reports',{recursive:true});
  fs.writeFileSync('.ops-reports/verse-range-audit.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  process.exitCode=ranges.length?1:0;
}
