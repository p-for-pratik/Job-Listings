// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import app from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7SkL8e8Yyws6fiikNSLsPkWBVlpXOQcY",
  authDomain: "job-listing-11a87.firebaseapp.com",
  projectId: "job-listing-11a87",
  storageBucket: "job-listing-11a87.appspot.com",
  messagingSenderId: "464882071551",
  appId: "1:464882071551:web:48fdf7591a6634fc1659ca",
  measurementId: "G-RF0C2N0LRG"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
// const analytics = getAnalytics(app);

export {firebase,firestore,app};