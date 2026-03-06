// បង្កើត Service Worker ដើម្បីអោយវាដឹងថា ពេលមិនមាន Internet ឬ Server មិនឆ្លើយតប ក៏អាចបង្ហាញ UI ដែលបាន Cache រួចហើយបាន
const CACHE_NAME = 'survey-cache-v1';
const urlsToCache = [
  './',
  './index.html'
  // បើបងមានរូបភាព icon.png ដាក់ចូលដែរ
  // './icon.png'
];

// ដំឡើង Service Worker និងរក្សាទុកកូដក្នុង Cache
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

// បើកកូដពី Cache នៅពេលអត់ Internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
