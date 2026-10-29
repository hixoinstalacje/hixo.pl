/* hixo.pl — lekkie, dostępne interakcje bez bibliotek. */
document.documentElement.classList.add('js');

// Nawigacja mobilna.
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
if (navToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  navToggle.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(opened));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
  });
}

// Animacje tylko, gdy nie ustawiono ograniczenia ruchu.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .08, rootMargin: '0px 0px 30px 0px'});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
}

// Formularze: przed uruchomieniem trzeba zamienić TWOJ_ENDPOINT w atrybucie action.
// Do czasu podmiany blokujemy wysłanie na nieistniejący adres.
document.querySelectorAll('form[data-contact-form]').forEach(form => {
  form.addEventListener('submit', event => {
    const status = form.querySelector('[data-form-status]');
    const action = form.getAttribute('action') || '';
    if (action.includes('TWOJ_ENDPOINT') || !action.startsWith('https://formspree.io/f/')) {
      event.preventDefault();
      if (status) {
        status.textContent = 'Formularz czeka na konfigurację. Do tego czasu skorzystaj z telefonu lub linku e-mail obok.';
        status.setAttribute('role', 'alert');
      }
    }
  });
});
