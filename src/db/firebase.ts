import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseConfig = {
    apiKey: "AIzaSyBFNQU343qf96_oWhAKMe92ltAnKdx6764",
  authDomain: "school-menegement-syestem.firebaseapp.com",
  projectId: "school-menegement-syestem",
  storageBucket: "school-menegement-syestem.appspot.com",
  messagingSenderId: "641374130837",
  appId: "1:641374130837:web:c7416284317528b1fe019c",
  measurementId: "G-WQYKEY9M9B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
