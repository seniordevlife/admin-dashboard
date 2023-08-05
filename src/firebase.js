// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD33XM_D1IJcWEgeXKRZ1i6gmqJf0Bf1O4",
  authDomain: "soundstore-cfa6e.firebaseapp.com",
  projectId: "soundstore-cfa6e",
  storageBucket: "soundstore-cfa6e.appspot.com",
  messagingSenderId: "161918788842",
  appId: "1:161918788842:web:d0a5e896d7f8a660556393",
  measurementId: "G-Z77Y4QLZHJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
