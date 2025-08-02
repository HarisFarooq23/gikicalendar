
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "campus-events-calendar",
  "appId": "1:441240834651:web:036bb7b7cd97a98ea6e57e",
  "storageBucket": "campus-events-calendar.firebasestorage.app",
  "apiKey": "AIzaSyDJZ11U3hdzVqFfzti7Od1mwFo5PW6DJME",
  "authDomain": "campus-events-calendar.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "441240834651"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
