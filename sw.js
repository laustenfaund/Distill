// Minimal app-shell cache so the installed page has something to show
// offline and so browsers recognize this as a real installable PWA.
// This only caches the static shell -- never your API key or anything
// you type, which lives only in this browser's storage.
const CACHE = 'distill-shell-v2';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
self.skipWaiting();
});

self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k.startsWith('distill-shell-')).map((k) => caches.delete(k))))
);
self.clients.claim();
});

// Network first, so updates (including security fixes) reach installed
// copies on the next open; the cached copy is only used when offline.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});
