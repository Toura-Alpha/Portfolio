/*
 * js/modules/auth-manager.js
 * Centralized authentication management with robust flow control
 */

import { auth, googleProvider } from "./firebase.js";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.authChecked = false;
        this.init();
    }

    init() {
        // Listen for auth state changes
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            this.authChecked = true;
            
            if (user) {
                console.log("✅ User authenticated:", user.email);
                this.handleAuthenticatedUser();
            } else {
                console.log("🚪 User not authenticated");
                this.handleUnauthenticatedUser();
            }
        });
    }

    handleAuthenticatedUser() {
        // Only redirect if explicitly requested (e.g., after login)
        const urlParams = new URLSearchParams(window.location.search);
        const shouldRedirect = urlParams.get('redirect') !== 'false';
        
        if (shouldRedirect && this.isAuthPage()) {
            // Redirect to intended page or hero
            const redirectUrl = sessionStorage.getItem('redirectAfterAuth') || '../pages/hero.html';
            sessionStorage.removeItem('redirectAfterAuth');
            window.location.href = redirectUrl;
        }
    }

    handleUnauthenticatedUser() {
        // Only redirect to signin if accessing protected pages
        if (this.isProtectedPage() && !this.isAuthPage()) {
            const currentPath = window.location.pathname;
            sessionStorage.setItem('redirectAfterAuth', currentPath);
            window.location.href = '../auth/signin.html?redirect=false';
        }
    }

    isAuthPage() {
        return window.location.pathname.includes('/auth/');
    }

    isProtectedPage() {
        return window.location.pathname.includes('/pages/');
    }

    async loginWithEmail(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            this.setRedirectAfterAuth();
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async registerWithEmail(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            this.setRedirectAfterAuth();
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async loginWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            this.setRedirectAfterAuth();
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        try {
            await signOut(auth);
            sessionStorage.clear();
            window.location.href = '../index.html';
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    setRedirectAfterAuth() {
        const redirectUrl = sessionStorage.getItem('redirectAfterAuth') || '../pages/hero.html';
        sessionStorage.setItem('redirectAfterAuth', redirectUrl);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    waitForAuthCheck() {
        return new Promise((resolve) => {
            if (this.authChecked) {
                resolve(this.currentUser);
            } else {
                const checkAuth = () => {
                    if (this.authChecked) {
                        resolve(this.currentUser);
                    } else {
                        setTimeout(checkAuth, 100);
                    }
                };
                checkAuth();
            }
        });
    }
}

// Create global instance
const authManager = new AuthManager();
export default authManager;
