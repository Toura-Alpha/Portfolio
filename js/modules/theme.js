export const setupThemeToggle = () => {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;

  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  updateThemeIcon(document.documentElement.getAttribute('data-theme'));

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('svg');
    if (!icon) return;
    if (theme === 'dark') {
      icon.innerHTML = `<path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zM12 22a9.999 9.999 0 009.9-10h-20A9.999 9.999 0 0012 22z" />`;
    } else {
      icon.innerHTML = `<circle cx="12" cy="12" r="5" fill="currentColor"/><g><circle cx="12" cy="3" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="18.36" cy="5.64" r="1.5"/><circle cx="5.64" cy="18.36" r="1.5"/><circle cx="18.36" cy="18.36" r="1.5"/><circle cx="5.64" cy="5.64" r="1.5"/></g>`;
    }
  }
};