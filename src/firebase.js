// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcWqp1-5ZjSnXeYwNvJMx-U0-ypWUSDak",
  authDomain: "project-jsmd.firebaseapp.com",
  projectId: "project-jsmd",
  storageBucket: "project-jsmd.firebasestorage.app",
  messagingSenderId: "1020094259810",
  appId: "1:1020094259810:web:3d2848658ad922c3e5e73b",
  measurementId: "G-HK4LZMJMB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, signOut};