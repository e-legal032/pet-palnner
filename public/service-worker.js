const CACHE_NAME = 'petplanner-cache-v1';

// Solo archivos reales en /public
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/preview.jpg',
  '/default-pet.png',
  '/logo-favionR.png',
  '/splash-logo.png'
];

// Instalación: cachea cada archivo de forma tolerante (no falla si falta alguno)
self.addEventListener('install', (event) => {
  console.log('📦 Instalando Service Worker y cacheando archivos');
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(
      FILES_TO_CACHE.map(async (url) => {
        try {
          const resp = await fetch(url, { cache: 'no-cache' });
          if (resp && resp.ok) {
            await cache.put(url, resp.clone());
          } else {
            console.warn('⚠️ No se pudo cachear (respuesta no OK):', url);
          }
        } catch (err) {
          console.warn('⚠️ No se pudo cachear (error de fetch):', url, err);
        }
      })
    );
  })());
  self.skipWaiting();
});

// Activación: limpia cachés antiguos
self.addEventListener('activate', (event) => {
  console.log('🚀 Activando Service Worker');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('🧹 Borrando caché antigua:', key);
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// Estrategia simple: Cache First con fallback a red
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
