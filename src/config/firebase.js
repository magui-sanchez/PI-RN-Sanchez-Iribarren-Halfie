import app from "firebase/app";
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyD9UmPTzJkU48FkFfIfCTtUf81fkxu5-Qs",
  authDomain: "fir-pi-rn.firebaseapp.com",
  projectId: "fir-pi-rn",
  storageBucket: "fir-pi-rn.firebasestorage.app",
  messagingSenderId: "687250574444",
  appId: "1:687250574444:web:7929f3a7d1f3e297dd9c49"
};

app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.firestore();