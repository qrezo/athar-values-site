(function () {
  const body = document.body;
  const toggle = document.querySelector('.nav-toggle');
  const dropdowns = Array.from(document.querySelectorAll('.dropdown'));

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

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

  document.addEventListener('click', () => {
    dropdowns.forEach((item) => {
      item.classList.remove('open');
      const button = item.querySelector('.dropdown-toggle');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  });

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

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMobileMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180 && body.classList.contains('menu-open')) {
      closeMobileMenu();
    }
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  const feedbackForm = document.querySelector('form[name="feedback"]');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', () => {
      const now = new Date();
      const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('');
      const random = Math.random().toString(36).slice(2, 7).toUpperCase();
      const reference = `ATH-${date}-${random}`;
      const field = document.getElementById('reference-number');
      if (field) field.value = reference;
      feedbackForm.action = `thanks.html?ref=${encodeURIComponent(reference)}`;
      sessionStorage.setItem('athar-feedback-reference', reference);
    });
  }

  const submittedReference = document.getElementById('submitted-reference');
  if (submittedReference) {
    const params = new URLSearchParams(window.location.search);
    submittedReference.textContent = params.get('ref') || sessionStorage.getItem('athar-feedback-reference') || 'تم تسجيل الرسالة';
  }
})();
