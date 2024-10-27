
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4lLc2LW0wDtwcPjqhM1fEX3KCnOgQp0c",
  authDomain: "ecommerce-de466.firebaseapp.com",
  projectId: "ecommerce-de466",
  storageBucket: "ecommerce-de466.appspot.com",
  messagingSenderId: "909855526987",
  appId: "1:909855526987:web:4982ae846aee4af1d67dce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { auth, fireDB };
