// Minimal app-shell cache so the installed page has something to show
// offline and so browsers recognize this as a real installable PWA.
// This only caches the static shell -- never your API key or anything
// you type, which lives only in this browser's storage.
const CACHE = 'distill-shell-v1';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
self.skipWaiting();
});

self.addEventListener('activate', (event) => {
event.waitUntil(
caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
);
self.clients.claim();
});

self.addEventListener('fetch', (event) => {
if (event.request.method !== 'GET') return;
event.respondWith(
caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => cached))
);
});
