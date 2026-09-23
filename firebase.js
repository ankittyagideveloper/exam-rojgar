import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAyXH4R0qAcXScwcslRBLneGX3ibv5REEA",
  authDomain: "exam-rojgaar-e1b10.firebaseapp.com",
  projectId: "exam-rojgaar-e1b10",
  storageBucket: "exam-rojgaar-e1b10.appspot.com",
  messagingSenderId: "461311574928",
  appId: "1:461311574928:web:3d6251d3a94f52df26a915",
  measurementId: "G-9CKSKVDDSC",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Lazy singleton — getMessaging() throws outside a browser context,
// so we only create it on first use after confirming support.
let _messaging = null;
export async function getMessagingInstance() {
  if (_messaging) return _messaging;
  const supported = await isSupported();
  if (!supported) return null;
  _messaging = getMessaging(app);
  return _messaging;
}