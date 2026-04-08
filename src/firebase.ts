// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCg_8eKtPeFFc9JxYuPb5TJN8aKNYBeyn0",
  authDomain: "unmatched-e-group.firebaseapp.com",
  projectId: "unmatched-e-group",
  storageBucket: "unmatched-e-group.firebasestorage.app",
  messagingSenderId: "660133899722",
  appId: "1:660133899722:web:05b8748b4eceaa5a9c3333",
  measurementId: "G-S56XZ5N3NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
