export function classify(status, data, now=Date.now()) {
 if(status===451) return 'HTTP_451_RESTRICTED_ACCESS';
 if(status===401 || status===403) return 'HTTP_ACCESS_DENIED';
 if(status===429) return 'HTTP_RATE_LIMITED';
 if(status>=500) return 'HTTP_SERVER_ERROR';
 if(status<200 || status>=300) return 'HTTP_ERROR';
 if(data===undefined) return 'HTTP_OK_NOT_FUNCTIONALLY_VERIFIED';
 if(!data || typeof data!=='object' || Array.isArray(data)) return 'INVALID_JSON_STRUCTURE';
 if(!data.timestamp) return 'UNKNOWN_MISSING_TIMESTAMP';
 const age=now-Date.parse(data.timestamp);
 if(!Number.isFinite(age)) return 'INVALID_TIMESTAMP';
 if(age < -300000) return 'UNKNOWN_FUTURE_TIMESTAMP';
 if(age>900000) return 'STALE_SNAPSHOT';
 if(data.expiresAt && (!Number.isFinite(Date.parse(data.expiresAt)) || Date.parse(data.expiresAt)<now)) return 'EXPIRED_OR_INVALID_EXPIRY';
 if(data.status==='STATIC_SNAPSHOT_BUILD_TIME' || data.monitoring24x7Status==='NOT YET ACTIVE') return 'STATIC_NOT_LIVE_MONITORING';
 return 'FRESH_UNAUTHENTICATED_SNAPSHOT';
}
