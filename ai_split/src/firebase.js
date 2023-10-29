// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0deUhWhBKhYt7FGBgT3j7viQu84xktjk",
  authDomain: "ai-bill-split.firebaseapp.com",
  projectId: "ai-bill-split",
  storageBucket: "ai-bill-split.appspot.com",
  messagingSenderId: "685143531213",
  appId: "1:685143531213:web:9e8aed845ef1f94c4bd384",
  measurementId: "G-68ND6JKQFL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
