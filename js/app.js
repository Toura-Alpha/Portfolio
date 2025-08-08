/*
 * js/app.js
 * This is the main application file that imports all modules and runs the core logic.
 */

import { setupThemeToggle } from './modules/theme.js';
import { setupTypewriter, hidePreloader } from './modules/utils.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth } from './modules/firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    // Hide the preloader once the page content is loaded
    window.onload = hidePreloader;

    // Initialize theme toggling
    setupThemeToggle();

    // Check for authentication status and handle navigation
    onAuthStateChanged(auth, (user) => {
        const isAuthPage = window.location.pathname.includes('auth');
        if (user && isAuthPage) {
            // User is signed in, redirect to the hero page
            window.location.href = '../pages/hero.html';
        } else if (!user && !isAuthPage) {
            // User is not signed in and not on an auth page, redirect to signin
            if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
                window.location.href = '../auth/signin.html';
            }
        }
    });

    // Initialize typewriter effect on the landing page
    setupTypewriter('.typewriter-text');
    
    // Logout confirmation handling
    const signOutBtn = document.querySelector('.signout-button');
    const logoutOverlay = document.querySelector('.logout-modal-overlay');
    const cancelLogout = document.querySelector('.logout-cancel');
    const confirmLogout = document.querySelector('.logout-confirm');

    if (signOutBtn && logoutOverlay && cancelLogout && confirmLogout) {
        // Show modal
        signOutBtn.addEventListener('click', () => {
            logoutOverlay.style.display = 'flex';
        });

        // Cancel
        cancelLogout.addEventListener('click', () => {
            logoutOverlay.style.display = 'none';
        });

        // Confirm
        confirmLogout.addEventListener('click', () => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = './auth/signin.html';
        });

        // Close modal when clicking outside
        logoutOverlay.addEventListener('click', (e) => {
            if (e.target === logoutOverlay) {
                logoutOverlay.style.display = 'none';
            }
        });
    }


    // Project details modal setup
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        const projectCards = document.querySelectorAll('.project-card');
        const modalContent = document.querySelector('.modal-content');
        const modalCloseButton = document.querySelector('.modal-close');
    
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                const bodyContent = `
                <div class="modal-body">
                    <img src="${card.querySelector('img').src}" alt="${title}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                    <h4>Project Details</h4>
                    <p>${description}</p>
                    <p>This is a detailed description of the ${title} project. It would include information about the technologies used, challenges faced, and the solution implemented.</p>
                    <a href="#" class="cta-button" style="display: inline-block; margin-top: 1rem;">Visit Website</a>
                </div>
                `;
                document.querySelector('.modal-header h3').textContent = title;
                modalContent.innerHTML = bodyContent;
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    
        modalCloseButton.addEventListener('click', () => {
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

    // Skills page filter logic
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                skillCards.forEach(card => {
                    const tags = card.dataset.tags.split(' ');
                    if (filter === 'all' || tags.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Contact form submission (mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you shortly.');
            contactForm.reset();
        });
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
     if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
});
