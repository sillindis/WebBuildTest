const cacheName = "DefaultCompany-숏폼형 퀴즈 솔루션 왓퀴즈!-25.02.14.001";
const contentToCache = [
    "Build/WebBuildTest.loader.js",
    "Build/WebBuildTest.framework.js.unityweb",
    "Build/WebBuildTest.data.unityweb",
    "Build/WebBuildTest.wasm.unityweb",
    "TemplateData/style.css"
];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    console.log('[Service Worker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                return caches.delete(key);
            }));
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        fetch(e.request, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        }).catch(function() {
            return caches.match(e.request);
        })
    );
});