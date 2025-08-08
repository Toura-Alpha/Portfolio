/*
 * js/modules/auth.js
 * Handles all authentication logic for the app.
 */

import { auth, googleProvider } from "./firebase.js";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

/**
 * Sign in using Google account
 */
export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("✅ Logged in with Google:", result.user.displayName);
        return result.user;
    } catch (error) {
        console.error("❌ Google Sign-in error:", error.message);
        throw error;
    }
}

/**
 * Login using email & password
 */
export async function loginWithEmail(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ Logged in:", userCredential.user.email);
        return userCredential.user;
    } catch (error) {
        console.error("❌ Email login error:", error.message);
        throw error;
    }
}

/**
 * Register a new user with email & password
 */
export async function registerWithEmail(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ User registered:", userCredential.user.email);
        return userCredential.user;
    } catch (error) {
        console.error("❌ Registration error:", error.message);
        throw error;
    }
}

/**
 * Logout the current user
 */
export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("✅ User signed out");
    } catch (error) {
        console.error("❌ Sign-out error:", error.message);
        throw error;
    }
}

/**
 * Listen for authentication state changes
 */
export function authStateListener(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("👤 User is signed in:", user.email);
            callback(user);
        } else {
            console.log("🚪 User is signed out");
            callback(null);
        }
    });
}
