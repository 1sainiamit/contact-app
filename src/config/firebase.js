// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOEONpVI1TIOZIkhSyztgm08cGXMVG2NU",
  authDomain: "contact-app-ba6cd.firebaseapp.com",
  projectId: "contact-app-ba6cd",
  storageBucket: "contact-app-ba6cd.appspot.com",
  messagingSenderId: "110813105355",
  appId: "1:110813105355:web:4fa7741a97688114085f4e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
