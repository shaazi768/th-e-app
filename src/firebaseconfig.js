// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBifB7pARiZwfjp7V2uKiOKEb0r48Uq6r8",
  authDomain: "my-notes-e.firebaseapp.com",
  projectId: "my-notes-e",
  storageBucket: "my-notes-e.firebasestorage.app",
  messagingSenderId: "480900038758",
  appId: "1:480900038758:web:c1c62176f4119ff474ada7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);

export { auth }; // Ensure this line is present
