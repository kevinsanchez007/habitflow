// Firebase para HabitFlow (se empaqueta en www/firebase.js con `npm run build:firebase`)
import { initializeApp } from "firebase/app";
import {
  initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,
  sendPasswordResetEmail, deleteUser
} from "firebase/auth";
import { initializeFirestore, doc, getDoc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcxALQQJiaj_XNUZPgb6qL6aY1dwmMNjA",
  authDomain: "habitflow-f169e.firebaseapp.com",
  projectId: "habitflow-f169e",
  storageBucket: "habitflow-f169e.firebasestorage.app",
  messagingSenderId: "832765603440",
  appId: "1:832765603440:web:0326fee18b53930306ceb5"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: [indexedDBLocalPersistence, browserLocalPersistence] });
auth.languageCode = "es";
const db = initializeFirestore(app, {});

window.HF_FB = {
  auth, db, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  updateProfile, sendPasswordResetEmail, deleteUser, doc, getDoc, setDoc, deleteDoc, onSnapshot
};
