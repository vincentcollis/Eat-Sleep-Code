// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrILxV_Pdswb5nZu7MC6lE4j1vrfv67E4",
  authDomain: "eatsleepcode-ftri49.firebaseapp.com",
  projectId: "eatsleepcode-ftri49",
  storageBucket: "eatsleepcode-ftri49.appspot.com",
  messagingSenderId: "576075766650",
  appId: "1:576075766650:web:7fe9660852bc660ec654c3",
  measurementId: "G-DWVBV40Q6R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
