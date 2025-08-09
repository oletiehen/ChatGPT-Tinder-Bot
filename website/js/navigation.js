export function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('mobile-toggle');
  const isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  menu.setAttribute('aria-hidden', !isOpen);
}

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('text-accent-gold', 'border-b-2', 'border-accent-gold');
    link.classList.add('text-apple-text-secondary');
  });
  const active = document.querySelector(`[href="#${id}"]`);
  if (active) {
    active.classList.add('text-accent-gold', 'border-b-2', 'border-accent-gold');
    active.classList.remove('text-apple-text-secondary');
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.toggleMobileMenu = toggleMobileMenu;
window.scrollToSection = scrollToSection;
