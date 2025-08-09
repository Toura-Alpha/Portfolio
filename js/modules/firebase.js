/*
 * js/modules/firebase.js
 * Initializes Firebase and exports authentication & database services.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";

// ====== Firebase Config ======
const firebaseConfig = {
    apiKey: "AIzaSyBkUiDAj77rb_f8DK-0h3avlNuihWcaf_g",
    authDomain: "portfolio-4c97c.firebaseapp.com",
    projectId: "portfolio-4c97c",
    storageBucket: "portfolio-4c97c.firebasestorage.app",
    messagingSenderId: "971073373419",
    appId: "1:971073373419:web:4c0b95858472f9659a6aae",
    measurementId: "G-505R5JKZRL"
};

// ====== Initialize Firebase ======
const app = initializeApp(firebaseConfig);

// Optional: Analytics
let analytics = null;
try {
    analytics = getAnalytics(app);
} catch (err) {
    console.warn("📉 Analytics not initialized:", err.message);
}

// ====== Initialize Services ======
const auth = getAuth(app);
const db = getFirestore(app);

// ====== Auth Providers ======
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// ====== Exports ======
export { app, auth, db, googleProvider, analytics };
