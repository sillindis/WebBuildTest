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
    self.skipWaiting(); // 즉시 활성화
});

self.addEventListener('activate', function(e) {
    console.log('[Service Worker] Activate');
    // 기존 캐시 삭제
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
                'Cache-Control': 'no-cache'
            }
        }).catch(function() {
            // 네트워크 요청이 실패한 경우에만 캐시 사용
            return caches.match(e.request);
        })
    );
});