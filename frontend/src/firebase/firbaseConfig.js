// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDchq8gqcMGW-E6_QpIc6DLT-eHNVOotT0",
  authDomain: "user-management-mern.firebaseapp.com",
  projectId: "user-management-mern",
  storageBucket: "user-management-mern.appspot.com",
  messagingSenderId: "700473960783",
  appId: "1:700473960783:web:a27b245674c0384dc4fd3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app