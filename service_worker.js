importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
const cacheName = "pwa-1";
const cacheList = [
    '/',
    'index.html',
    'main.css',
    'WechatIMG3.jpeg'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(cacheList))
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch', function(e) {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheNames => {
                    return cacheNames !== cacheName
                }).map(cacheNames => {
                    return caches.delete(cacheNames)
                })
            )
        }).then(() => {
            return self.ClientRectList.claim()
        })
    )
})