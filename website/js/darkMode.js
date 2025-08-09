export function initDarkMode() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
}

export function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}

window.toggleDarkMode = toggleDarkMode;
