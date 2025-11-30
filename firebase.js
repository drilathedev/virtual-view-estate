import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCJcbWJqAYDVhaKqOHDBOlCgDRPE8KGiqU",
  authDomain: "prona360-fdffd.firebaseapp.com",
  projectId: "prona360-fdffd",
  storageBucket: "prona360d.firebasestorage.app",
  messagingSenderId: "13070047414",
  appId: "1:13070047414:web:a5fc2afd1153800f1fae17",
  measurementId: "G-HDWE7Q1WJD"
};

const app = initializeApp(firebaseConfig);
const _analytics = getAnalytics(app);