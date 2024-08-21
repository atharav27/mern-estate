// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-85707.firebaseapp.com",
  projectId: "mern-estate-85707",
  storageBucket: "mern-estate-85707.appspot.com",
  messagingSenderId: "857587833795",
  appId: "1:857587833795:web:b149111ce0169dadf7bb76"
};

// Initialize Firebase
 export  const  app = initializeApp(firebaseConfig);