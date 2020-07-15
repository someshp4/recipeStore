var CACHE_NAME = 'pwa-qrs-task-manager';
var urlsToCache = ['offline.html'];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  console.log("install event called");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  console.log("req",event.request);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log("response",response);
        // Cache hit - return response
        if (response) {
          console.log("response",response);
          return response;
        }
        return fetch(event.request).catch(() => caches.match('offline.html'));
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-qrs-task-manager'];
  console.log("caches", caches.keys());
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});