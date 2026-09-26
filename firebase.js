// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, isSupported } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyAyXH4R0qAcXScwcslRBLneGX3ibv5REEA",
  authDomain: "exam-rojgaar-e1b10.firebaseapp.com",
  projectId: "exam-rojgaar-e1b10",
  storageBucket: "exam-rojgaar-e1b10.appspot.com",
  messagingSenderId: "461311574928",
  appId: "1:461311574928:web:3d6251d3a94f52df26a915",
  measurementId: "G-9CKSKVDDSC",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Lazy singleton — resolved once, then cached.
// Do NOT call getMessaging() eagerly at module load; defer until the SW is
// active so getToken() can bind to the correct registration.
let _messagingPromise = null;
export function getMessagingInstance() {
  if (!_messagingPromise) {
    _messagingPromise = isSupported().then((supported) => {
      if (!supported) return null;
      return getMessaging(app);
    });
  }
  return _messagingPromise;
}