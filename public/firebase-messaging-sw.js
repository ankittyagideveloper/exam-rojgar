/* global firebase */
// Firebase Messaging Service Worker
// This file must be at the root of the public folder so it is served at /firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAyXH4R0qAcXScwcslRBLneGX3ibv5REEA",
  authDomain: "exam-rojgaar-e1b10.firebaseapp.com",
  projectId: "exam-rojgaar-e1b10",
  storageBucket: "exam-rojgaar-e1b10.appspot.com",
  messagingSenderId: "461311574928",
  appId: "1:461311574928:web:3d6251d3a94f52df26a915",
  measurementId: "G-9CKSKVDDSC",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
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

// Open the app / navigate to the link when the user clicks the notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? "/";
  event.waitUntil(clients.openWindow(url));
});
