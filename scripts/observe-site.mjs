import fs from 'node:fs';
import {classify} from './observation-rules.mjs';
const base='https://bengalistudybible.surge.sh/';
const endpoints=['','install','status/','recovery/','api/health.json','api/deep-heartbeat.json','api/observation.json','manifest.webmanifest','sw.js','bible-data/irv/manifest.json'];
async function probe(url){
 const start=Date.now();
 try{
  const response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});
  let state=classify(response.status);
  let timestamp=null;
  if(response.ok){
   const body=await response.text();
   if(url.includes('/api/')){
    try{const data=JSON.parse(body);state=classify(response.status,data);timestamp=data?.timestamp??null;}catch{state='INVALID_JSON';}
   }else if(url.endsWith('manifest.json')||url.endsWith('.webmanifest')){
    try{const data=JSON.parse(body);const valid=url.includes('bible-data')?Array.isArray(data.books)&&data.books.length===66:typeof data.name==='string'&&Array.isArray(data.icons);state=valid?'CONTENT_CHECK_PASSED':'INVALID_MANIFEST';}catch{state='INVALID_JSON';}
   }else if(url.endsWith('sw.js'))state=body.includes('addEventListener')&&body.includes('fetch')?'CONTENT_CHECK_PASSED':'UNEXPECTED_CONTENT';
   else state=/<html[\s>]/i.test(body)&&!/Page Not Found - surge|<title>project:/i.test(body)?'CONTENT_CHECK_PASSED':'UNEXPECTED_CONTENT';
  }else await response.body?.cancel();
  return {url,http:response.status,state,timestamp,elapsedMs:Date.now()-start,headers:Object.fromEntries(['content-security-policy','strict-transport-security','x-content-type-options'].map(k=>[k,response.headers.get(k)]))};
 }catch(e){return {url,state:'CHECK_FAILED',error:e.message,code:e.cause?.code??e.name};}
}
const observations=[];
for(const url of [...endpoints.map(p=>base+p),'https://deep-monitor-bsb.surge.sh/']){
 let r=await probe(url);
 if(r.state==='CHECK_FAILED'||r.http>=500){const first=r;r=await probe(url);r.previousAttempt=first;}
 observations.push(r);
}
const accepted=new Set(['CONTENT_CHECK_PASSED','FRESH_UNAUTHENTICATED_SNAPSHOT']);
const failures=observations.filter(r=>!accepted.has(r.state));
const report={checkedAt:new Date().toISOString(),status:failures.length?'ATTENTION_REQUIRED':'OBSERVATIONS_PASSED_NOT_FULL_SERVICE_VERIFICATION',observations,limitations:['No deployment or rollback is triggered.','Fresh public snapshots are not cryptographically authenticated.','These requests do not verify user interactions, authentication, or off-site backup.']};
fs.mkdirSync('.ops-reports',{recursive:true});
fs.writeFileSync('.ops-reports/site-observation.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({status:report.status,states:observations.map(r=>({url:r.url,state:r.state}))},null,2));
process.exitCode=failures.length?1:0;
