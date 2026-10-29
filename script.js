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

// Dostępny filtr realizacji: przyciski utrzymują aria-pressed.
const filterButtons = document.querySelectorAll('[data-filter]');
const filterCards = document.querySelectorAll('[data-category]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    filterCards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
});

// Lightbox HTML <dialog>: domyślna obsługa Escape, focus i powrotu do wyzwalacza.
const lightbox = document.getElementById('lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const image = lightbox.querySelector('[data-lightbox-image]');
  const caption = lightbox.querySelector('[data-lightbox-caption]');
  const close = lightbox.querySelector('[data-lightbox-close]');
  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const original = trigger.querySelector('img');
      if (!original) return;
      image.src = original.currentSrc || original.src;
      image.alt = original.alt;
      caption.textContent = trigger.getAttribute('data-caption') || original.alt;
      lightbox.showModal();
      close.focus();
    });
  });
  close.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    image.removeAttribute('src');
  });
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
