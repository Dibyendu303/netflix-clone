import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "netflix-clone-dib.firebaseapp.com",
    projectId: "netflix-clone-dib",
    storageBucket: "netflix-clone-dib.appspot.com",
    messagingSenderId: "1033748809254",
    appId: "1:1033748809254:web:f1d4b01871e6a0a687c8e7",
    measurementId: "G-0PGKEXZ5V7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut }
export default db;