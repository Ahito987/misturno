const CACHE_NAME = "turnosapp-v1";
const urlsToCache = [
  "/misturno/",
  "/misturno/index.html",
  "/misturno/assets/icono-app38x46.png",
  "/misturno/service-worker.js",
  // incluye aquí cualquier otro recurso adicional (CSS, imágenes, etc.)
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el cache o hace una nueva solicitud
        return response || fetch(event.request);
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});
