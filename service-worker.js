// Service Worker for Solar Physics Journal Club
const CACHE_NAME = 'spjc-cache-v10';
const DYNAMIC_CACHE = 'spjc-dynamic-v10';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/meetings.js',
    '/manifest.json',
    '/meetings-data/index.js',
    '/meetings-data/2023-1st.js',
    '/meetings-data/2024-1st.js',
    '/meetings-data/2024-2nd.js',
    '/meetings-data/2024-3rd.js',
    '/meetings-data/2025-1st.js',
    '/meetings-data/2025-2nd.js',
    '/meetings-data/2026-1st.js',
    '/figs/SSR_LOGO.png',
    '/figs/SP_LOGO2.png',
    '/figs/SP_image.png',
    '/figs/KHAO.jpeg'
];

const FONT_ORIGINS = new Set([
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
]);

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

function isCacheableResponse(response) {
    return response && response.ok && (response.type === 'basic' || response.type === 'cors');
}

function isDocumentRequest(request) {
    return request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
}

function isCodeAsset(url) {
    return url.origin === location.origin && (
        url.pathname === '/style.css' ||
        url.pathname === '/meetings.js' ||
        url.pathname === '/manifest.json' ||
        (url.pathname.startsWith('/meetings-data/') && url.pathname.endsWith('.js'))
    );
}

function isImageRequest(request, url) {
    return request.destination === 'image' && url.origin === location.origin;
}

function isFontRequest(request, url) {
    return request.destination === 'font' || FONT_ORIGINS.has(url.origin);
}

async function updateDynamicCache(request, response) {
    if (!isCacheableResponse(response)) {
        return;
    }

    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, response.clone());
}

async function networkFirst(request, fallbackUrl) {
    try {
        const networkResponse = await fetch(request);
        await updateDynamicCache(request, networkResponse);
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        if (fallbackUrl) {
            return caches.match(fallbackUrl);
        }

        throw error;
    }
}

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    const networkResponse = await fetch(request);
    await updateDynamicCache(request, networkResponse);
    return networkResponse;
}

// Fetch event - use network-first for HTML/code and cache-first for images/fonts
self.addEventListener('fetch', event => {
    const { request } = event;

    if (request.method !== 'GET' || request.url.includes('chrome-extension')) {
        return;
    }

    const url = new URL(request.url);

    if (url.origin !== location.origin && !FONT_ORIGINS.has(url.origin)) {
        return;
    }

    if (isDocumentRequest(request)) {
        event.respondWith(networkFirst(request, '/index.html'));
        return;
    }

    if (isCodeAsset(url)) {
        event.respondWith(networkFirst(request));
        return;
    }

    if (isImageRequest(request, url) || isFontRequest(request, url)) {
        event.respondWith(cacheFirst(request));
    }
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
            icon: '/figs/SP_LOGO2.png',
            badge: '/figs/SP_LOGO2.png',
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
