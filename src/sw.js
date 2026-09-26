/* global clients */
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// ----------------------------------------------------
// 1. Firebase Cloud Messaging in Service Worker
// ----------------------------------------------------
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAyXH4R0qAcXScwcslRBLneGX3ibv5REEA",
  authDomain: "exam-rojgaar-e1b10.firebaseapp.com",
  projectId: "exam-rojgaar-e1b10",
  storageBucket: "exam-rojgaar-e1b10.appspot.com",
  messagingSenderId: "461311574928",
  appId: "1:461311574928:web:3d6251d3a94f52df26a915",
  measurementId: "G-9CKSKVDDSC",
});

const messaging = getMessaging(firebaseApp);

// Background message handler
onBackgroundMessage(messaging, (payload) => {
  const { title, body, icon, image, link } = payload.notification ?? {};
  const data = payload.data ?? {};
  const targetLink = data.link;
  const notificationTitle = title ?? data.title ?? "Exam Rojgaar";
  const notificationOptions = {
    body: body ?? data.body ?? "",
    icon: icon ?? data.icon ?? "/android-chrome-192x192.png",
    image: image ?? data.image,
    badge: "/android-chrome-192x192.png",
    data: { url: link ?? targetLink ?? "/" },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";
  event.waitUntil(clients.openWindow(url));
});

// ----------------------------------------------------
// 2. Workbox Precaching & Routing
// ----------------------------------------------------
// self.__WB_MANIFEST is the single injection point for workbox-build.
// Capture it once so we can inspect it without triggering the "more than
// one match" assertion from injectManifest.
const WB_MANIFEST = self.__WB_MANIFEST;
precacheAndRoute(WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

// Only register the navigation route when index.html is actually precached.
// In dev mode WB_MANIFEST is empty, so createHandlerBoundToURL would
// throw "non-precached-url" and prevent the SW from ever activating.
const isPrecached = (WB_MANIFEST ?? []).some(
  (e) => (typeof e === 'string' ? e : e.url) === 'index.html'
);

if (isPrecached) {
  let allowlist;
  if (self.location.hostname === 'localhost') {
    allowlist = [/^\/$/];
  }

  registerRoute(
    new NavigationRoute(createHandlerBoundToURL('index.html'), {
      allowlist,
      denylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/],
    })
  );
}

// Runtime caching for API calls
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/v1/data'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// When registerType is "prompt", the new SW waits in the "installed" state.
// UpdateToast calls updateServiceWorker(true) which posts SKIP_WAITING here,
// then the SW activates and clientsClaim() takes control of all open tabs.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

clientsClaim();


