// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //as we are using vite so we use meta.env
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mean-blog-c6173.firebaseapp.com",
  projectId: "mean-blog-c6173",
  storageBucket: "mean-blog-c6173.appspot.com",
  messagingSenderId: "167747145710",
  appId: "1:167747145710:web:74f65015669ae6b28e08ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

