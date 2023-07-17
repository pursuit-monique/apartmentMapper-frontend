// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const KEY = process.env.REACT_APP_FIREBASE_KEY;
const AUTHDOMAIN = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const PROJECTID = process.env.REACT_APP_FIREBASE_PROJECTID;
const STORAGEBUCKET = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;
const MESSAGINGSENDERID = process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID;
const APPID = process.env.REACT_APP_FIREBASE_APPID;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: KEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
