// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a2a06.firebaseapp.com",
  projectId: "mern-blog-a2a06",
  storageBucket: "mern-blog-a2a06.appspot.com",
  messagingSenderId: "953832310278",
  appId: "1:953832310278:web:e2b3e3997d308da8cbe587"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;