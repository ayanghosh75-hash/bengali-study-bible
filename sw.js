const CACHE_NAME = 'bengali-study-bible-v6';
const STATIC_CACHE = 'bengali-study-bible-static-v6';
const FONT_CACHE = 'bengali-study-bible-fonts-v6';
const SCRIPTURE_CACHE = 'bengali-study-bible-scripture-v6';

const ASSETS_TO_PRECACHE = [
  '/',
  '/index.html',
  '/install',
  '/manifest.webmanifest',
  '/version.json',
  '/favicon.svg',
  '/favicon.ico',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png',
  '/icons/bible-icon.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-maskable-512x512.png',
  '/icons/apple-touch-icon.png',
  '/brand/logo-symbol.svg',
  '/brand/logo-horizontal.svg',
  '/bible-data/irv/manifest.json',
  '/bible-data/irv/GEN.json',
  '/bible-data/irv/MAT.json',
  '/bible-data/irv/MRK.json',
  '/bible-data/irv/LUK.json',
  '/bible-data/irv/JHN.json'
];

// Install Event: pre-cache critical app shell and core Gospels
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(ASSETS_TO_PRECACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event: clear obsolete caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, FONT_CACHE, SCRIPTURE_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Message Event: support manual SKIP_WAITING and CLEAR_OBSOLETE_CACHES
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_OBSOLETE_CACHES') {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(keys.map((k) => caches.delete(k)));
      }).then(() => {
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      })
    );
  }

  if (event.data && event.data.type === 'SHOW_DAILY_VERSE_NOTIFICATION') {
    const title = event.data.title || 'আজকের বাইবেল পদ 🌿';
    const options = {
      body: event.data.body || 'বাংলা স্টাডি বাইবেল — আজকের শাস্ত্রাংশ পাঠ করুন।',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/favicon-32x32.png',
      tag: 'deep-daily-word-notification',
      renotify: true,
      data: {
        url: event.data.url || '/daily-word',
      },
    };
    self.registration.showNotification(title, options);
  }
});

// Push Event: Handle incoming Web Push notifications from cloud scheduler
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'আজকের বাইবেল পদ 🌿', body: event.data.text() };
    }
  }

  const title = data.title || 'আজ আপনার জন্য ঈশ্বরের বাক্যে একটি প্রতিজ্ঞা আছে 🌿';
  const options = {
    body: data.body || 'বাংলা স্টাডি বাইবেল: আজকের শাস্ত্রীয় বাক্য ও আত্মিক চিন্তা পাঠ করুন।',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/favicon-32x32.png',
    tag: 'deep-daily-word-notification',
    renotify: true,
    data: {
      url: data.url || '/daily-word',
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification Click Event: Deep Link to /daily-word or target URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = (event.notification.data && event.notification.data.url) || '/daily-word';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url && 'focus' in client) {
          client.focus();
          if ('navigate' in client) {
            return client.navigate(targetUrl);
          }
          return client;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Fetch Event: intelligently serve and cache
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Google Fonts caching (Stale-While-Revalidate)
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // 1.5 Version manifest: Network-first without caching stale versions
  if (url.pathname === '/version.json') {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match('/version.json');
          return cached || new Response(JSON.stringify({ version: '1.0.1' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // 2. Navigation requests: Network-first with Cache fallback and Surge error rejection
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.status >= 200 && networkResponse.status < 300) {
            // Clone to verify it is NOT Surge Unavailable error HTML
            const clone = networkResponse.clone();
            try {
              const text = await clone.text();
              if (
                (text.includes('project:') && text.includes('Unavailable')) ||
                text.includes('DNS_PROBE') ||
                text.includes(['try', 'cloudflare'].join('')) ||
                text.includes('404 Not Found')
              ) {
                console.warn('[SW] Intercepted Surge Unavailable/Error page; serving cached valid app shell.');
                const cached = (await caches.match('/index.html')) || (await caches.match('/')) || (await caches.match('/install'));
                if (cached) return cached;
              }
            } catch (e) {
              // Ignore text parse error
            }
            return networkResponse;
          }

          // Non-200 status returned by network
          console.warn('[SW] Non-OK navigation status (' + networkResponse.status + '); serving cached app shell.');
          const cached = (await caches.match('/index.html')) || (await caches.match('/')) || (await caches.match('/install'));
          if (cached) return cached;
          return networkResponse;
        })
        .catch(async () => {
          const cached = (await caches.match('/index.html')) || (await caches.match('/')) || (await caches.match('/install'));
          if (cached) return cached;
          return new Response('<!doctype html><html lang="bn"><head><meta charset="utf-8"/><title>বাংলা স্টাডি বাইবেল</title></head><body style="background:#0B192C;color:#FFFFFF;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center;"><div><h2>বাংলা স্টাডি বাইবেল</h2><p>অফলাইন মোডে লোড হচ্ছে... অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন।</p><button onclick="window.location.reload()" style="padding:10px 20px;border-radius:12px;background:#D4AF37;color:#0B192C;font-weight:bold;border:none;cursor:pointer;">পুনরায় লোড করুন</button></div></body></html>', {
            headers: { 'Content-Type': 'text/html; charset=UTF-8' },
          });
        })
    );
    return;
  }

  // 3. Bible Scripture Data (/bible-data/irv/*.json): Network-first with resilient Cache fallback
  if (url.pathname.startsWith('/bible-data/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(SCRIPTURE_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return new Response(
            JSON.stringify({ error: 'OFFLINE_SCRIPTURE_UNAVAILABLE' }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        })
    );
    return;
  }

  // 4. Static assets (/assets/, /icons/, etc.): Stale-While-Revalidate / Cache-first
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (networkResponse.type === 'basic' || networkResponse.type === 'cors')
          ) {
            // Guard against caching HTML when a JS chunk 404s and SPA fallback returns 200.html
            const contentType = networkResponse.headers.get('content-type') || '';
            if (request.url.endsWith('.js') && !contentType.includes('javascript')) {
              console.warn('[SW] Ignored non-JS response for JS chunk:', request.url);
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (request.destination === 'image') {
            return caches.match('/icons/bible-icon.svg');
          }
          return null;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
