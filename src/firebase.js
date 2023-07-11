// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK02cXPX14_b2LfM-gPXYPtPJfFsiw4Nw",
  authDomain: "memling-react.firebaseapp.com",
  projectId: "memling-react",
  storageBucket: "memling-react.appspot.com",
  messagingSenderId: "259107486247",
  appId: "1:259107486247:web:114f5ccd87b046d899ac02"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()