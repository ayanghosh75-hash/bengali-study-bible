import {test} from 'node:test';
import assert from 'node:assert/strict';
import {classify} from './observation-rules.mjs';
const now=Date.parse('2026-09-27T10:00:00Z');
test('stale and future timestamps never pass',()=>{
 assert.equal(classify(200,{timestamp:'2026-09-27T09:44:59Z'},now),'STALE_SNAPSHOT');
 assert.equal(classify(200,{timestamp:'2026-09-27T10:06:00Z'},now),'UNKNOWN_FUTURE_TIMESTAMP');
});
test('static snapshots are not live monitoring',()=>{
 assert.equal(classify(200,{timestamp:'2026-09-27T09:59:00Z',status:'STATIC_SNAPSHOT_BUILD_TIME'},now),'STATIC_NOT_LIVE_MONITORING');
 assert.equal(classify(200,{timestamp:'2026-09-27T09:59:00Z'},now),'FRESH_UNAUTHENTICATED_SNAPSHOT');
});
test('malformed evidence and expired timestamps fail',()=>{
 assert.equal(classify(200,{},now),'UNKNOWN_MISSING_TIMESTAMP');
 assert.equal(classify(200,{timestamp:'bad'},now),'INVALID_TIMESTAMP');
 assert.equal(classify(200,{timestamp:'2026-09-27T09:59:00Z',expiresAt:'2026-09-27T09:59:30Z'},now),'EXPIRED_OR_INVALID_EXPIRY');
});
test('restricted access differs from outage and success',()=>{
 assert.equal(classify(451),'HTTP_451_RESTRICTED_ACCESS');
 assert.equal(classify(503),'HTTP_SERVER_ERROR');
 assert.equal(classify(200),'HTTP_OK_NOT_FUNCTIONALLY_VERIFIED');
});
