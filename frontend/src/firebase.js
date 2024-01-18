// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,    
  authDomain: "electromingle-49471.firebaseapp.com",
  projectId: "electromingle-49471",
  storageBucket: "electromingle-49471.appspot.com",
  messagingSenderId: "733649378378",
  appId: "1:733649378378:web:814aaeb179353b4ac59ab3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);