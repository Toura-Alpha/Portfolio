/*
 * js/app.js
 * Main application initialization and UI interactions.
 */

import { setupThemeToggle } from './modules/theme.js';
import { setupTypewriter, hidePreloader } from './modules/utils.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth } from './modules/firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    window.onload = hidePreloader;

    // Theme toggle
    setupThemeToggle();

    // Navigation auth buttons
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    if (loginBtn) loginBtn.addEventListener('click', () => window.location.href = './auth/signin.html?redirect=false');
    if (signupBtn) signupBtn.addEventListener('click', () => window.location.href = './auth/signup.html?redirect=false');

    // Auth state handling
    onAuthStateChanged(auth, (user) => {
        const isAuthPage = window.location.pathname.includes('auth');
        if (user && isAuthPage) {
            window.location.href = '../pages/hero.html';
        } else if (!user && !isAuthPage && !['/', '/index.html'].includes(window.location.pathname)) {
            window.location.href = '../auth/signin.html';
        }
    });

    // Typewriter effect
    setupTypewriter('.typewriter-text');

    // Logout modal
    const signOutBtn = document.querySelector('.signout-button');
    const logoutOverlay = document.querySelector('.logout-modal-overlay');
    const cancelLogout = document.querySelector('.logout-cancel');
    const confirmLogout = document.querySelector('.logout-confirm');

    if (signOutBtn && logoutOverlay) {
        signOutBtn.addEventListener('click', () => logoutOverlay.style.display = 'flex');
        cancelLogout?.addEventListener('click', () => logoutOverlay.style.display = 'none');
        confirmLogout?.addEventListener('click', () => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = './auth/signin.html';
        });
        logoutOverlay.addEventListener('click', (e) => {
            if (e.target === logoutOverlay) logoutOverlay.style.display = 'none';
        });
    }

    // Project modal
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        const projectCards = document.querySelectorAll('.project-card');
        const modalContent = document.querySelector('.modal-content');
        const modalCloseButton = document.querySelector('.modal-close');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3')?.textContent || "Project";
                const description = card.querySelector('p')?.textContent || "No description available.";
                modalContent.innerHTML = `
                    <div class="modal-body">
                        <img src="${card.querySelector('img')?.src || ''}" alt="${title}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                        <h4>Project Details</h4>
                        <p>${description}</p>
                        <p>Detailed description of the ${title} project, including technologies used, challenges, and solutions.</p>
                        <a href="#" class="cta-button" style="display: inline-block; margin-top: 1rem;">Visit Website</a>
                    </div>
                `;
                document.querySelector('.modal-header h3').textContent = title;
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        modalCloseButton?.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Skills filter
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            skillCards.forEach(card => {
                const tags = card.dataset.tags.split(' ');
                card.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
            });
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Contact form (mock)
    const contactForm = document.querySelector('.contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you shortly.');
        contactForm.reset();
    });

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
});
