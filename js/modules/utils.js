/*
 * js/modules/utils.js
 * This file contains utility functions like the typewriter effect and preloader management.
 */

export const setupTypewriter = (selector) => {
  const typewriterText = document.querySelector(selector);
  if (!typewriterText) return;

  const lines = [
    "Developer",
    "Problem Solver",
    "Innovator"
  ];
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  let pauseTime = 1500;

  function type() {
    const currentLine = lines[lineIndex];
    if (isDeleting) {
      typewriterText.textContent = currentLine.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterText.textContent = currentLine.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentLine.length + 1) {
      isDeleting = true;
      typingSpeed = 50;
      setTimeout(type, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      typingSpeed = 150;
      setTimeout(type, 500);
    } else {
      setTimeout(type, typingSpeed);
    }
  }
  type();
};

export const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }
};

export const createSkillBar = (skillName, level) => {
  const container = document.createElement('div');
  container.classList.add('skill-progress-bar');
  const fill = document.createElement('div');
  fill.classList.add('skill-progress-fill');
  fill.style.setProperty('--skill-level', `${level}%`);
  container.appendChild(fill);
  return container;
};
