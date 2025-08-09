/*
 * js/modules/theme.js
 * Handles light/dark theme toggling with local storage persistence.
 */

export const setupThemeToggle = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('svg');
        if (!icon) return;
        icon.innerHTML = theme === 'dark'
            ? `<path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zM12 22a9.999 9.999 0 009.9-10h-20A9.999 9.999 0 0012 22z" />`
            : `<circle cx="12" cy="12" r="5" fill="currentColor"/><g><circle cx="12" cy="3" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="18.36" cy="5.64" r="1.5"/><circle cx="5.64" cy="18.36" r="1.5"/><circle cx="18.36" cy="18.36" r="1.5"/><circle cx="5.64" cy="5.64" r="1.5"/></g>`;
    }
};
