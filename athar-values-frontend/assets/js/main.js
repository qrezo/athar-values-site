const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const dropdowns = document.querySelectorAll('.dropdown');
const desktopQuery = window.matchMedia('(min-width: 1081px)');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = body.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector('.dropdown-toggle');
  if (!button) return;

  const open = () => {
    dropdown.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    dropdown.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  };

  dropdown.addEventListener('mouseenter', () => {
    if (desktopQuery.matches) open();
  });

  dropdown.addEventListener('mouseleave', () => {
    if (desktopQuery.matches) close();
  });

  button.addEventListener('focus', () => {
    if (desktopQuery.matches) open();
  });

  dropdown.addEventListener('focusout', (event) => {
    if (desktopQuery.matches && !dropdown.contains(event.relatedTarget)) close();
  });

  button.addEventListener('click', (event) => {
    if (!desktopQuery.matches) {
      event.preventDefault();
      dropdown.classList.toggle('open');
      button.setAttribute('aria-expanded', dropdown.classList.contains('open') ? 'true' : 'false');
    }
  });
});

document.querySelectorAll('.nav-list a').forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
