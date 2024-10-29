// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOyehn97ErfI2Wntgtv9BV5kOwL1Oq0pM",
  authDomain: "gjermundkvardalportfolio.firebaseapp.com",
  projectId: "gjermundkvardalportfolio",
  storageBucket: "gjermundkvardalportfolio.appspot.com",
  messagingSenderId: "934912245207",
  appId: "1:934912245207:web:0e5ab25235d8c86dc69f92",
  measurementId: "G-LHFJ058VCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage };