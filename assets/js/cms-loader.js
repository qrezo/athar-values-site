(function () {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  async function getJSON(path) {
    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) return null;
      return response.json();
    } catch (_) {
      return null;
    }
  }

  function escapeHTML(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function normalizeUrl(value) { return value || ''; }
  function phoneDigits(value) { return String(value || '').replace(/\D/g, ''); }
  function phoneHref(value) {
    const digits = phoneDigits(value);
    return digits ? `tel:+${digits.replace(/^00/, '')}` : '#';
  }
  function whatsappHref(value) {
    const digits = phoneDigits(value).replace(/^00/, '');
    return digits ? `https://wa.me/${digits}` : '#';
  }

  function renderSite(site) {
    if (!site) return;
    $$('[data-cms-phone]').forEach((el) => {
      if (!site.phone) return;
      el.textContent = site.phone;
      el.setAttribute('dir', 'ltr');
      if (el.tagName === 'A') el.href = phoneHref(site.phone);
    });
    setText('[data-cms-site-name]', site.name);
    setText('[data-cms-site-description]', site.description);
    setText('[data-cms-city]', site.city);
    $$('[data-cms-whatsapp]').forEach((el) => {
      const whatsapp = site.whatsapp || site.phone;
      if (!whatsapp) return;
      const strong = $('strong', el);
      if (strong) {
        strong.innerHTML = `<bdi>${escapeHTML(whatsapp)}</bdi>`;
        strong.setAttribute('dir', 'ltr');
      }
      el.href = whatsappHref(whatsapp);
      el.target = '_blank';
      el.rel = 'noopener';
    });
    $$('[data-cms-email]').forEach((el) => {
      if (!site.email) return;
      el.textContent = site.email;
      if (el.tagName === 'A') el.href = `mailto:${site.email}`;
    });
    $$('[data-google-form]').forEach((el) => {
      if (!site.feedback_form_url) return;
      el.href = site.feedback_form_url;
      el.textContent = 'فتح نموذج قوقل';
      el.target = '_blank';
      el.rel = 'noopener';
      el.classList.remove('disabled-link');
      el.removeAttribute('aria-disabled');
    });
  }

  function setText(selector, value) {
    if (!value) return;
    $$(selector).forEach((el) => { el.textContent = value; });
  }

  function memberRows(items, type) {
    return items.map((item, index) => {
      const secondary = type === 'assembly' ? item.membership_type : item.position;
      return `<article class="member-row"><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHTML(item.name)}</strong>${secondary ? `<small>${escapeHTML(secondary)}</small>` : ''}</div></article>`;
    }).join('');
  }

  function executiveCards(items) {
    return items.map((item, index) => {
      const email = item.email ? `<a href="mailto:${escapeHTML(item.email)}">${escapeHTML(item.email)}</a>` : '';
      const phone = item.phone ? `<a href="${phoneHref(item.phone)}" dir="ltr">${escapeHTML(item.phone)}</a>` : '';
      return `<article class="people-contact"><div class="avatar-placeholder">${String(index + 1).padStart(2, '0')}</div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.position || '')}</p>${email}${phone}</article>`;
    }).join('');
  }

  function renderAbout(data) {
    if (!data) return;
    setText('[data-cms-about-summary]', data.summary);
    setText('[data-cms-vision]', data.vision);
    setText('[data-cms-mission]', data.mission);
    setText('[data-cms-scope]', data.geographic_scope);

    const goals = $('#cms-strategic-goals');
    if (goals && Array.isArray(data.goals) && data.goals.length) {
      goals.innerHTML = `<ul class="strategy-goals">${data.goals.map((goal) => `<li>${escapeHTML(typeof goal === 'string' ? goal : goal.goal)}</li>`).join('')}</ul>`;
    }
    const assembly = $('#cms-assembly-members');
    if (assembly && Array.isArray(data.assembly_members) && data.assembly_members.length) {
      assembly.innerHTML = `<div class="member-rows">${memberRows(data.assembly_members, 'assembly')}</div>`;
    }
    const board = $('#cms-board-members');
    if (board && Array.isArray(data.board_members) && data.board_members.length) {
      board.innerHTML = `<div class="member-rows">${memberRows(data.board_members, 'board')}</div>`;
    }
    const executive = $('#cms-executive-members');
    if (executive && Array.isArray(data.executive_members) && data.executive_members.length) {
      executive.innerHTML = executiveCards(data.executive_members);
    }
  }

  function resourceItem(item) {
    const href = item.file ? ` href="${escapeHTML(normalizeUrl(item.file))}" target="_blank" rel="noopener"` : '';
    const tag = item.file ? 'a' : 'div';
    const meta = [item.year, item.summary].filter(Boolean).join(' — ') || item.category || 'وثيقة';
    return `<${tag} class="resource-card"${href}><div><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(meta)}</span></div><span class="badge">${item.file ? 'فتح' : 'قريبًا'}</span></${tag}>`;
  }

  function renderCategory(data, selector, categories, emptyText) {
    const container = $(selector);
    if (!container || !data || !Array.isArray(data.documents)) return;
    const names = Array.isArray(categories) ? categories : [categories];
    const items = data.documents.filter((item) => names.includes((item.category || '').trim()));
    container.innerHTML = items.length ? items.map(resourceItem).join('') : `<div class="empty-state">${escapeHTML(emptyText)}</div>`;
  }

  function renderDocuments(data) {
    renderCategory(data, '#cms-policies-documents', 'السياسات واللوائح', 'لا توجد سياسات أو لوائح منشورة بعد.');
    renderCategory(data, '#cms-general-governance-documents', ['أدلة ونماذج الحوكمة', 'نماذج عامة'], 'تُضاف الأدلة والنماذج عند اعتمادها.');
    renderCategory(data, '#cms-financial-documents', 'القوائم المالية', 'لا توجد قوائم مالية منشورة بعد.');
    renderCategory(data, '#cms-annual-documents', ['التقارير المالية السنوية', 'التقارير السنوية'], 'لا توجد تقارير مالية سنوية منشورة بعد.');
  }

  function programCards(items) {
    return items.map((item, index) => {
      const image = item.image ? `<img src="${escapeHTML(item.image)}" alt="">` : `<div class="program-no-image">${String(index + 1).padStart(2, '0')}</div>`;
      const body = `<div class="program-card-body">${item.category ? `<span>${escapeHTML(item.category)}</span>` : ''}<h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p>${item.meta ? `<small>${escapeHTML(item.meta)}</small>` : ''}</div>`;
      return item.url ? `<a class="program-card" href="${escapeHTML(item.url)}" target="_blank" rel="noopener">${image}${body}</a>` : `<article class="program-card">${image}${body}</article>`;
    }).join('');
  }

  function renderPrograms(data) {
    if (!data || !Array.isArray(data.programs) || !data.programs.length) return;
    const section = $('#cms-programs-content');
    if (section) {
      section.className = 'content-section programs-live-section';
      section.innerHTML = `<div class="container"><div class="section-heading"><span class="eyebrow">البرامج المنشورة</span><h2>برامج وأنشطة الجمعية</h2></div><div class="program-grid">${programCards(data.programs)}</div></div>`;
    }
    const home = $('#cms-home-programs');
    if (home) {
      home.hidden = false;
      home.innerHTML = `<div class="container"><div class="section-heading"><span class="eyebrow">آخر البرامج والأنشطة</span><h2>أحدث ما أضافته الجمعية</h2></div><div class="program-grid">${programCards(data.programs.slice().reverse().slice(0, 3))}</div><div style="margin-top:28px"><a class="button button--navy" href="programs.html">عرض جميع الأنشطة</a></div></div>`;
    }
  }

  function renderImpact(data) {
    const section = $('#cms-impact-content');
    if (!section || !data) return;
    const stats = Array.isArray(data.statistics) ? data.statistics : [];
    const reports = Array.isArray(data.reports) ? data.reports : [];
    if (!stats.length && !reports.length) return;
    section.className = 'content-section impact-live-section';
    const statsHTML = stats.length ? `<div class="impact-stat-grid">${stats.map((item) => `<article><strong>${escapeHTML(item.value)}</strong><h3>${escapeHTML(item.label)}</h3>${item.summary ? `<p>${escapeHTML(item.summary)}</p>` : ''}</article>`).join('')}</div>` : '';
    const reportsHTML = reports.length ? `<div class="impact-report-list"><h2>تقارير الأثر</h2>${reports.map((item) => resourceItem(item)).join('')}</div>` : '';
    section.innerHTML = `<div class="container"><div class="section-heading"><span class="eyebrow">نتائج قابلة للقياس</span><h2>الإحصاءات والأثر</h2></div>${statsHTML}${reportsHTML}</div>`;
  }

  async function initCMSContent() {
    const [site, documents, about, programs, impact] = await Promise.all([
      getJSON('data/site.json'),
      getJSON('data/governance.json'),
      getJSON('data/about.json'),
      getJSON('data/programs.json'),
      getJSON('data/impact.json')
    ]);
    renderSite(site);
    renderDocuments(documents);
    renderAbout(about);
    renderPrograms(programs);
    renderImpact(impact);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCMSContent);
  else initCMSContent();
})();
