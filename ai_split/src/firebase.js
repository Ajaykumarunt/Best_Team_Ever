// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFireStore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0deUhWhBKhYt7FGBgT3j7viQu84xktjk",
  authDomain: "ai-bill-split.firebaseapp.com",
  projectId: "ai-bill-split",
  storageBucket: "ai-bill-split.appspot.com",
  messagingSenderId: "685143531213",
  appId: "1:685143531213:web:9e8aed845ef1f94c4bd384",
  measurementId: "G-68ND6JKQFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//const db = getFireStore(app)

export default getFireStore()