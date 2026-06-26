import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4BJ4-ai0JuFcmJiWqLAcPPy5jHFA7BhQ",
  authDomain: "react-clases-1c2026.firebaseapp.com",
  projectId: "react-clases-1c2026",
  storageBucket: "react-clases-1c2026.firebasestorage.app",
  messagingSenderId: "69367940843",
  appId: "1:69367940843:web:1d4a0b5ad5f3a1eef1a0ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)