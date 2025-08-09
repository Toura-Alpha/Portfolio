/*
 * js/modules/utils.js
 * Utility functions like typewriter effect and preloader handling.
 */

export const setupTypewriter = (selector) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const lines = ["Developer", "Problem Solver", "Innovator"];
    let lineIndex = 0, charIndex = 0, isDeleting = false;

    const type = () => {
        const currentLine = lines[lineIndex];
        element.textContent = isDeleting
            ? currentLine.substring(0, charIndex--)
            : currentLine.substring(0, charIndex++);

        if (!isDeleting && charIndex === currentLine.length + 1) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % lines.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 150);
        }
    };
    type();
};

export const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);
};

export const createSkillBar = (skillName, level) => {
    const container = document.createElement('div');
    container.className = 'skill-progress-bar';
    container.title = `${skillName} - ${level}%`;

    const fill = document.createElement('div');
    fill.className = 'skill-progress-fill';
    fill.style.setProperty('--skill-level', `${level}%`);

    container.appendChild(fill);
    return container;
};
