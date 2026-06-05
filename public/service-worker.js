const CACHE_NAME = "andrades-garden-guide-v3";

const PRE_CACHE = [
  "/",
  "/index.html",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRE_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only intercept GET requests
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Skip intercepting third-party API calls (like Gemini)
  if (url.origin !== self.location.origin) return;

  // Network-First strategy
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If we got a valid response, cache it dynamically
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network request fails
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          
          // If the resource is a navigation request, fall back to index.html
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
      })
  );
});
