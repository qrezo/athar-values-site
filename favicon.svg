(function () {
  'use strict';

  const body = document.body;
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const dropdowns = Array.from(document.querySelectorAll('.dropdown'));

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const closeMobileMenu = () => {
    body.classList.remove('menu-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'فتح القائمة');
    }
    dropdowns.forEach((item) => {
      item.classList.remove('open');
      const button = item.querySelector('.dropdown-toggle');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  };

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    });
  }

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector('.dropdown-toggle');
    if (!button) return;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains('open');
      dropdowns.forEach((item) => {
        item.classList.remove('open');
        const itemButton = item.querySelector('.dropdown-toggle');
        if (itemButton) itemButton.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        dropdown.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      dropdowns.forEach((item) => {
        item.classList.remove('open');
        const button = item.querySelector('.dropdown-toggle');
        if (button) button.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180 && body.classList.contains('menu-open')) closeMobileMenu();
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px' })
    : null;

  function refreshReveal() {
    document.querySelectorAll('[data-reveal]:not([data-reveal-ready])').forEach((element, index) => {
      element.dataset.revealReady = 'true';
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('is-visible');
    });
  }
  window.atharRefreshReveal = refreshReveal;
  refreshReveal();

  document.querySelectorAll('.certificate-card, .feature-card, .quick-grid a, .impact-flow article, .strategy-grid article, .people-grid article').forEach((element) => {
    element.setAttribute('data-reveal', '');
  });
  refreshReveal();

})();

(function () {
  'use strict';

  let lastFocused = null;

  function closeLightbox() {
    const lightbox = document.querySelector('.site-lightbox');
    if (!lightbox) return;
    lightbox.remove();
    document.body.classList.remove('lightbox-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function openLightbox(trigger) {
    const src = trigger.getAttribute('data-lightbox-image');
    if (!src) return;
    lastFocused = trigger;
    const title = trigger.getAttribute('data-lightbox-title') || 'صورة';
    const caption = trigger.getAttribute('data-lightbox-caption') || '';
    const lightbox = document.createElement('div');
    lightbox.className = 'site-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', title);

    const backdrop = document.createElement('button');
    backdrop.className = 'site-lightbox-backdrop';
    backdrop.type = 'button';
    backdrop.setAttribute('aria-label', 'إغلاق الصورة');

    const panel = document.createElement('div');
    panel.className = 'site-lightbox-panel';
    const close = document.createElement('button');
    close.className = 'site-lightbox-close';
    close.type = 'button';
    close.setAttribute('aria-label', 'إغلاق');
    close.textContent = '×';
    const image = document.createElement('img');
    image.src = src;
    image.alt = title;
    const copy = document.createElement('div');
    const heading = document.createElement('strong');
    heading.textContent = title;
    copy.appendChild(heading);
    if (caption) {
      const paragraph = document.createElement('p');
      paragraph.textContent = caption;
      copy.appendChild(paragraph);
    }
    panel.append(close, image, copy);
    lightbox.append(backdrop, panel);
    document.body.appendChild(lightbox);
    document.body.classList.add('lightbox-open');
    close.focus();
  }

  document.addEventListener('click' , (event) => {
    const trigger = event.target.closest('[data-lightbox-image]');
    if (trigger) {
      event.preventDefault();
      openLightbox(trigger);
      return;
    }
    if (event.target.closest('.site-lightbox-close, .site-lightbox-backdrop')) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.querySelector('.site-lightbox')) closeLightbox();
  });
})();
