// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTPG6YLftJORRud4UVHNDrQHeN0_fEHHw",
  authDomain: "foodgenix-ecaef.firebaseapp.com",
  projectId: "foodgenix-ecaef",
  storageBucket: "foodgenix-ecaef.appspot.com",
  messagingSenderId: "38257988210",
  appId: "1:38257988210:web:ce46523922f8bb67b128eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;