// Service Worker for Solar Physics Journal Club
const CACHE_NAME = 'spjc-cache-v1';
const DYNAMIC_CACHE = 'spjc-dynamic-v1';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/participants.html',
    '/style.css',
    '/meetings.js',
    '/SSR_LOGO.png',
    // Fonts
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bad+Script&family=Roboto:wght@700&family=Josefin+Slab:ital,wght@0,100..700;1,100..700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin && !url.href.includes('fonts.googleapis.com')) {
        return;
    }

    event.respondWith(
        caches.match(request).then(cachedResponse => {
            // Return cached response if found
            if (cachedResponse) {
                return cachedResponse;
            }

            // Otherwise, fetch from network
            return fetch(request).then(networkResponse => {
                // Check if valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
                    return networkResponse;
                }

                // Clone the response for caching
                const responseToCache = networkResponse.clone();

                // Add to dynamic cache
                caches.open(DYNAMIC_CACHE).then(cache => {
                    // Don't cache POST requests or chrome-extension
                    if (request.method === 'GET' && !request.url.includes('chrome-extension')) {
                        cache.put(request, responseToCache);
                    }
                });

                return networkResponse;
            }).catch(() => {
                // Offline fallback for HTML pages
                if (request.headers.get('accept').includes('text/html')) {
                    return caches.match('/index.html');
                }
            });
        })
    );
});

// Background sync for future enhancement
self.addEventListener('sync', event => {
    if (event.tag === 'sync-meetings') {
        console.log('Service Worker: Syncing meetings data...');
        // Future: Sync meeting data when back online
    }
});

// Push notifications for future enhancement
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/SP_LOGO2.png',
            badge: '/SP_LOGO2.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };

        event.waitUntil(
            self.registration.showNotification('Solar Physics Journal Club', options)
        );
    }
});