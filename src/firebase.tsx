import "./semantic-ui-css/semantic.min.css";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjdihUlVyjK-ufua178sz1hQFkYO1cD7k",
  authDomain: "speed-friending.firebaseapp.com",
  projectId: "speed-friending",
  storageBucket: "speed-friending.appspot.com",
  messagingSenderId: "978700228245",
  appId: "1:978700228245:web:3a5d37c6a57e99e0cfad9c",
  measurementId: "G-9N2TFFNNEF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const analytics = getAnalytics(app);
