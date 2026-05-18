// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAyXH4R0qAcXScwcslRBLneGX3ibv5REEA",
//   authDomain: "exam-rojgaar-e1b10.firebaseapp.com",
//   projectId: "exam-rojgaar-e1b10",
//   storageBucket: "exam-rojgaar-e1b10.firebasestorage.app",
//   messagingSenderId: "461311574928",
//   appId: "1:461311574928:web:3d6251d3a94f52df26a915",
//   measurementId: "G-9CKSKVDDSC",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAyXH4R0qAcXScwcslRBLneGX3ibv5REEA",
  authDomain: "exam-rojgaar-e1b10.firebaseapp.com",
  projectId: "exam-rojgaar-e1b10",
  storageBucket: "exam-rojgaar-e1b10.appspot.com", // ✅ Changed
  messagingSenderId: "461311574928",
  appId: "1:461311574928:web:3d6251d3a94f52df26a915",
  measurementId: "G-9CKSKVDDSC",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Storage
export const storage = getStorage(app);
