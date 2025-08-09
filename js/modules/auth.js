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
 * Show user-friendly auth error messages
 */
function getFriendlyAuthError(errorCode) {
    const messages = {
        "auth/user-not-found": "No account found with that email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/email-already-in-use": "Email is already registered.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/popup-closed-by-user": "Sign-in popup closed before completion.",
        "auth/network-request-failed": "Network error. Please try again."
    };
    return messages[errorCode] || "Authentication error occurred.";
}

/**
 * Sign in using Google account
 */
export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("✅ Logged in with Google:", result.user.displayName);
        return result.user;
    } catch (error) {
        console.error("❌ Google Sign-in error:", error.code, error.message);
        throw new Error(getFriendlyAuthError(error.code));
    }
}

/**
 * Login using email & password
 */
export async function loginWithEmail(email, password) {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ Logged in:", user.email);
        return user;
    } catch (error) {
        console.error("❌ Email login error:", error.code, error.message);
        throw new Error(getFriendlyAuthError(error.code));
    }
}

/**
 * Register a new user with email & password
 */
export async function registerWithEmail(email, password) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ User registered:", user.email);
        return user;
    } catch (error) {
        console.error("❌ Registration error:", error.code, error.message);
        throw new Error(getFriendlyAuthError(error.code));
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
        console.error("❌ Sign-out error:", error.code, error.message);
        throw new Error("Could not sign out. Please try again.");
    }
}

/**
 * Listen for authentication state changes
 */
export function authStateListener(callback) {
    onAuthStateChanged(auth, (user) => {
        console.log(user ? `👤 Signed in: ${user.email}` : "🚪 Signed out");
        callback(user || null);
    });
}
