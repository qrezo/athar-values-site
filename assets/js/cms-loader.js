(function () {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function localData(path) {
    const value = window.ATHAR_LOCAL_DATA && window.ATHAR_LOCAL_DATA[path];
    return value ? JSON.parse(JSON.stringify(value)) : null;
  }

  async function getJSON(path) {
    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) return localData(path);
      return response.json();
    } catch (_) {
      return localData(path);
    }
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function phoneDigits(value) { return String(value || '').replace(/\D/g, ''); }
  function phoneHref(value) {
    const digits = phoneDigits(value).replace(/^00/, '');
    return digits ? `tel:+${digits}` : '#';
  }
  function whatsappHref(value) {
    const digits = phoneDigits(value).replace(/^00/, '');
    return digits ? `https://wa.me/${digits}` : '#';
  }
  function setText(selector, value) {
    if (!value) return;
    $$(selector).forEach((el) => { el.textContent = value; });
  }

  function renderSite(site) {
    if (!site) return;
    setText('[data-cms-site-name]', site.name);
    setText('[data-cms-site-description]', site.description);
    setText('[data-cms-city]', site.city);
    $$('[data-cms-phone]').forEach((el) => {
      if (!site.phone) return;
      el.textContent = site.phone;
      el.setAttribute('dir', 'ltr');
      if (el.tagName === 'A') el.href = phoneHref(site.phone);
    });
    $$('[data-cms-whatsapp]').forEach((el) => {
      const value = site.whatsapp || site.phone;
      if (!value) return;
      const strong = $('strong', el);
      if (strong) {
        strong.innerHTML = `<bdi>${escapeHTML(value)}</bdi>`;
        strong.setAttribute('dir', 'ltr');
      }
      el.href = whatsappHref(value);
      el.target = '_blank';
      el.rel = 'noopener';
    });
    $$('[data-cms-complaints-whatsapp]').forEach((el) => {
      const value = site.whatsapp || site.phone;
      if (!value || el.tagName !== 'A') return;
      const message = 'السلام عليكم، لدي شكوى أو مقترح وأرغب في مشاركته مع الجمعية.';
      el.href = `${whatsappHref(value)}?text=${encodeURIComponent(message)}`;
      el.target = '_blank';
      el.rel = 'noopener';
    });
    $$('[data-cms-email]').forEach((el) => {
      if (!site.email) return;
      el.textContent = site.email;
      if (el.tagName === 'A') el.href = `mailto:${site.email}`;
    });
    $$('[data-cms-email-action]').forEach((el) => {
      if (!site.email || el.tagName !== 'A') return;
      el.href = `mailto:${site.email}`;
    });
  }

  const personIcon = `<svg aria-hidden="true" class="profile-person-icon" viewBox="0 0 64 64"><circle cx="32" cy="21" r="10"></circle><path d="M15 53c1.8-11 8-17 17-17s15.2 6 17 17"></path></svg>`;

  function memberRoleClass(role) {
    if (/رئيس مجلس الإدارة/.test(role || '')) return ' is-president';
    if (/نائب رئيس مجلس الإدارة/.test(role || '')) return ' is-vice';
    if (/عضو مجلس الإدارة/.test(role || '')) return ' is-board-member';
    return ' is-assembly-member';
  }

  function assemblyCards(items) {
    return items.map((item, index) => {
      const role = item.membership_type || item.position || 'عضو الجمعية العمومية';
      return `<article class="assembly-member-card${memberRoleClass(role)}" data-reveal>
        <div class="profile-icon-wrap">${personIcon}</div>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(role)}</p>
      </article>`;
    }).join('');
  }

  function boardShowcase(items, termStart, termDuration) {
    const president = items[0];
    const others = items.slice(1);
    const presidentMarkup = president ? `<article class="board-president-card" data-reveal>
      <div class="profile-icon-wrap profile-icon-wrap--gold">${personIcon}</div>
      <h3>${escapeHTML(president.name)}</h3>
      <span>${escapeHTML(president.position || 'رئيس مجلس الإدارة')}</span>
    </article>` : '';
    const membersMarkup = others.map((item, index) => `<article class="board-member-card${index === 0 ? ' is-vice' : ''}" data-reveal>
      <div class="profile-icon-wrap${index === 0 ? ' profile-icon-wrap--solid' : ''}">${personIcon}</div>
      <h3>${escapeHTML(item.name)}</h3>
      <p>${escapeHTML(item.position || 'عضو مجلس الإدارة')}</p>
    </article>`).join('');
    const term = (termStart || termDuration) ? `<div class="board-term-showcase">
      ${termStart ? `<div><small>تاريخ بداية الدورة</small><strong>${escapeHTML(termStart)}</strong></div>` : ''}
      ${termDuration ? `<div><small>مدة الدورة</small><strong>${escapeHTML(termDuration)}</strong></div>` : ''}
    </div>` : '';
    return `<div class="board-showcase">${presidentMarkup}<div class="board-divider" aria-hidden="true"><span></span></div><div class="board-members-grid">${membersMarkup}</div>${term}</div>`;
  }

  function executiveCards(items) {
    return items.map((item) => {
      const email = item.email ? `<a class="executive-contact-item" href="mailto:${escapeHTML(item.email)}"><span class="executive-contact-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3.5 6.5h17v11h-17z"></path><path d="m4 7 8 6 8-6"></path></svg></span><span><small>البريد الإلكتروني</small><strong>${escapeHTML(item.email)}</strong></span></a>` : '';
      const phone = item.phone ? `<a class="executive-contact-item" href="${phoneHref(item.phone)}"><span class="executive-contact-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7.2 3.8 10 7.3 8.4 9.4c1.2 2.6 3.3 4.7 5.9 5.9l2.1-1.6 3.5 2.8c.4.3.5.8.3 1.2-.8 1.8-2.5 2.9-4.5 2.8C9.4 20.1 3.9 14.6 3.5 8.3c-.1-2 1-3.7 2.8-4.5.4-.2.9-.1 1.2.3Z"></path></svg></span><span><small>رقم التواصل</small><strong dir="ltr">${escapeHTML(item.phone)}</strong></span></a>` : '';
      return `<article class="executive-showcase" data-reveal>
        <div class="executive-side-panel"><div class="profile-icon-wrap profile-icon-wrap--gold">${personIcon}</div><span>${escapeHTML(item.position || 'المدير التنفيذي')}</span></div>
        <div class="executive-main-panel"><div class="executive-name-block"><h3>${escapeHTML(item.name)}</h3><span aria-hidden="true"></span></div><div class="executive-contact-card">${phone}${email}</div></div>
      </article>`;
    }).join('');
  }

  function renderAbout(data) {
    if (!data) return;
    setText('[data-cms-about-summary]', data.summary);
    setText('[data-cms-vision]', data.vision);
    setText('[data-cms-mission]', data.mission);
    setText('[data-cms-scope]', data.geographic_scope);
    if (data.organization_chart) {
      $$('[data-cms-organization-chart]').forEach((image) => { image.src = data.organization_chart; });
    }

    const goals = $('#cms-strategic-goals');
    if (goals && Array.isArray(data.goals) && data.goals.length) {
      goals.innerHTML = `<ul class="strategy-goals">${data.goals.map((goal) => `<li>${escapeHTML(typeof goal === 'string' ? goal : goal.goal)}</li>`).join('')}</ul>`;
    }

    const objectives = $('#cms-strategic-objectives');
    if (objectives && Array.isArray(data.strategic_objectives) && data.strategic_objectives.length) {
      objectives.innerHTML = data.strategic_objectives.map((group, index) => `<article class="objective-pillar" data-reveal><div class="objective-pillar-head"><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${escapeHTML(group.pillar || '')}</h3>${group.subtitle ? `<p>${escapeHTML(group.subtitle)}</p>` : ''}</div></div><div class="objective-items">${(group.items || []).map((item) => `<div>${escapeHTML(typeof item === 'string' ? item : (item.item || item.title || ''))}</div>`).join('')}</div></article>`).join('');
    }

    const assembly = $('#cms-assembly-members');
    if (assembly && Array.isArray(data.assembly_members) && data.assembly_members.length) {
      assembly.innerHTML = `<div class="assembly-members-grid">${assemblyCards(data.assembly_members)}</div>`;
    }
    const board = $('#cms-board-members');
    if (board && Array.isArray(data.board_members) && data.board_members.length) {
      board.innerHTML = boardShowcase(data.board_members, data.board_term_start, data.board_term_duration);
    }
    const executive = $('#cms-executive-members');
    if (executive && Array.isArray(data.executive_members) && data.executive_members.length) {
      executive.innerHTML = executiveCards(data.executive_members);
    }
  }

  function resourceItem(item) {
    const hasFile = Boolean(item.file);
    const tag = hasFile ? 'a' : 'div';
    const href = hasFile ? ` href="${escapeHTML(item.file)}" target="_blank" rel="noopener"` : '';
    const meta = [item.year, item.summary].filter(Boolean).join(' - ') || item.category || 'وثيقة';
    return `<${tag} class="resource-card"${href} data-reveal>
      <span class="resource-icon" aria-hidden="true"><b>PDF</b></span>
      <span class="resource-copy"><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(meta)}</span></span>
      <span class="badge">${hasFile ? 'فتح الملف' : 'معلومات'} <i aria-hidden="true">←</i></span>
    </${tag}>`;
  }

  function renderCategory(data, selector, categories, emptyText) {
    const container = $(selector);
    if (!container || !data || !Array.isArray(data.documents)) return;
    const names = Array.isArray(categories) ? categories : [categories];
    const items = data.documents.filter((item) => names.includes((item.category || '').trim()));
    container.innerHTML = items.length ? items.map(resourceItem).join('') : `<div class="empty-state"><strong>${escapeHTML(emptyText)}</strong></div>`;
  }

  function renderDocuments(data) {
    renderCategory(data, '#cms-policies-documents', 'السياسات', 'قريبًا');
    renderCategory(data, '#cms-regulations-documents', 'اللوائح والأنظمة', 'قريبًا');
    renderCategory(data, '#cms-guides-documents', 'الأدلة والآليات', 'قريبًا');
    renderCategory(data, '#cms-financial-documents', 'القوائم المالية', 'قريبًا');
    renderCategory(data, '#cms-annual-documents', ['التقارير المالية السنوية', 'التقارير السنوية'], 'قريبًا');
  }

  function programCards(items) {
    return items.map((item, index) => {
      const image = item.image ? `<span class="program-card-media"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title || 'صورة البرنامج')}" loading="lazy"><i>عرض التفاصيل</i></span>` : `<span class="program-no-image">${String(index + 1).padStart(2, '0')}</span>`;
      const id = item.id || `program-${index + 1}`;
      const body = `<div class="program-card-body">${item.category ? `<span>${escapeHTML(item.category)}</span>` : ''}<h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p><div class="program-card-foot">${item.meta ? `<small>${escapeHTML(item.meta)}</small>` : '<small>برنامج الجمعية</small>'}</div><b class="card-detail-link">اقرأ تفاصيل البرنامج <span>←</span></b></div>`;
      return `<a class="program-card" href="program-detail.html?id=${encodeURIComponent(id)}" data-reveal>${image}${body}</a>`;
    }).join('');
  }

  function renderPrograms(data) {
    if (!data || !Array.isArray(data.programs) || !data.programs.length) return;
    const section = $('#cms-programs-content');
    if (section) {
      section.className = 'content-section programs-live-section';
      section.innerHTML = `<div class="container"><div class="section-heading"><span class="eyebrow">البرامج والمبادرات</span><h2>ما تصنعه الجمعية على أرض الواقع.</h2><p>نماذج من البرامج والمبادرات المضافة من لوحة الإدارة.</p></div><div class="program-grid">${programCards(data.programs)}</div></div>`;
    }
    const home = $('#cms-home-programs');
    if (home) {
      home.hidden = false;
      home.innerHTML = `<div class="container"><div class="section-heading section-heading--split"><div><span class="eyebrow">آخر البرامج والمبادرات</span><h2>من الفكرة إلى أثر ملموس.</h2></div><p>تظهر هنا أحدث البرامج المضافة من لوحة الإدارة، مع الصورة والوصف والحالة.</p></div><div class="program-grid">${programCards(data.programs.slice().reverse().slice(0, 3))}</div><div class="section-action"><a class="button button--navy" href="programs.html">عرض جميع البرامج</a></div></div>`;
    }
  }

  function renderImpact(data) {
    const section = $('#cms-impact-content');
    if (!section || !data) return;
    const stats = Array.isArray(data.statistics) ? data.statistics : [];
    const reports = Array.isArray(data.reports) ? data.reports : [];
    if (!stats.length && !reports.length) return;
    section.className = 'content-section impact-live-section';
    const statsHTML = stats.length ? `<div class="impact-stat-grid">${stats.map((item) => `<article data-reveal><strong>${escapeHTML(item.value)}</strong><h3>${escapeHTML(item.label)}</h3>${item.summary ? `<p>${escapeHTML(item.summary)}</p>` : ''}</article>`).join('')}</div>` : '';
    const reportsHTML = reports.length ? `<div class="impact-report-list"><div class="section-heading"><span class="eyebrow">تقارير الأثر</span><h2>وثائق القياس والنتائج</h2></div>${reports.map(resourceItem).join('')}</div>` : '';
    section.innerHTML = `<div class="container"><div class="section-heading section-heading--split"><div><span class="eyebrow">بيانات الأثر</span><h2>أرقام توضّح ما تحقق.</h2></div><p>قريبًا.</p></div>${statsHTML}${reportsHTML}</div>`;
  }

  function newsCards(items) {
    return items.map((item, index) => {
      const id = item.id || `news-${index + 1}`;
      const content = `<span class="media-news-image"><img src="${escapeHTML(item.image || 'assets/images/content-placeholder.svg')}" alt="${escapeHTML(item.title)}" loading="lazy"><i>قراءة الخبر</i></span><div><span>${escapeHTML(item.date || 'خبر الجمعية')}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary || '')}</p><b class="card-detail-link">عرض التفاصيل <span>←</span></b></div>`;
      return `<a class="media-news-card" href="news-detail.html?id=${encodeURIComponent(id)}" data-reveal>${content}</a>`;
    }).join('');
  }

  function renderMedia(data) {
    if (!data) return;
    const news = Array.isArray(data.news) ? data.news : [];
    const gallery = Array.isArray(data.gallery) ? data.gallery : [];
    const documents = Array.isArray(data.documents) ? data.documents : [];
    if (!news.length && !gallery.length && !documents.length) return;
    const section = $('#cms-media-content');
    if (section) {
      const newsHTML = news.length ? `<div class="media-news-grid">${newsCards(news)}</div>` : '';
      const galleryHTML = gallery.length ? `<div class="media-subsection"><div class="section-heading"><span class="eyebrow">ألبوم الصور</span><h2>لقطات من مسيرة الجمعية</h2></div><div class="gallery-grid">${gallery.map((item) => `<button class="gallery-item" type="button" data-lightbox-image="${escapeHTML(item.image)}" data-lightbox-title="${escapeHTML(item.title || 'صورة')}" data-lightbox-caption="${escapeHTML(item.caption || '')}" data-reveal><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title || item.caption || 'صورة من الجمعية')}" loading="lazy"><span><strong>${escapeHTML(item.title || 'صورة')}</strong><small>${escapeHTML(item.caption || '')}</small></span></button>`).join('')}</div></div>` : '';
      const docsHTML = documents.length ? `<div class="media-subsection"><div class="section-heading"><span class="eyebrow">ملفات إعلامية</span><h2>مواد للتحميل والاطلاع</h2></div><div class="resource-list">${documents.map(resourceItem).join('')}</div></div>` : '';
      section.innerHTML = `<div class="container"><div class="section-heading section-heading--split"><div><span class="eyebrow">آخر الأخبار</span><h2>أخبار الجمعية وموادها الإعلامية.</h2></div><p>اضغط على الخبر أو الصورة لفتحها وعرض محتواها كاملًا.</p></div>${newsHTML}${galleryHTML}${docsHTML}</div>`;
    }
    const home = $('#cms-home-media');
    if (home && news.length) {
      home.hidden = false;
      home.innerHTML = `<div class="container"><div class="section-heading section-heading--split"><div><span class="eyebrow">المركز الإعلامي</span><h2>أحدث أخبار الجمعية.</h2></div><p>نافذة مختصرة على الأنشطة والمستجدات، مع صفحة مستقلة لكل خبر.</p></div><div class="media-news-grid">${newsCards(news.slice().reverse().slice(0, 3))}</div><div class="section-action"><a class="button button--navy" href="media.html">عرض المركز الإعلامي</a></div></div>`;
    }
  }

  function normalizeList(value) {
    if (Array.isArray(value)) return value.map((item) => typeof item === 'string' ? item : (item && (item.objective || item.goal || item.title))).filter(Boolean);
    return String(value || '').split(/\n|،/).map((item) => item.trim()).filter(Boolean);
  }

  function renderProgramDetail(data) {
    const container = $('#cms-program-detail');
    if (!container || !data || !Array.isArray(data.programs)) return;
    const id = new URLSearchParams(window.location.search).get('id');
    const item = data.programs.find((program, index) => String(program.id || `program-${index + 1}`) === id) || data.programs[0];
    if (!item) {
      container.innerHTML = `<div class="detail-empty"><h1>البرنامج غير موجود</h1><a class="button button--navy" href="programs.html">العودة إلى البرامج</a></div>`;
      return;
    }
    document.title = `${item.title} | جمعية أثر القيم`;
    const objectives = normalizeList(item.objectives);
    const facts = [
      ['الفئة المستهدفة', item.audience || item.target_audience],
      ['المدة', item.duration],
      ['الموقع', item.location],
      ['الحالة', item.status || item.meta]
    ].filter((pair) => pair[1]);
    container.innerHTML = `<article class="program-detail">
      <div class="detail-cover" data-reveal><img src="${escapeHTML(item.image || 'assets/images/content-placeholder.svg')}" alt="${escapeHTML(item.title)}"><span>${escapeHTML(item.category || 'برامج الجمعية')}</span></div>
      <div class="detail-content" data-reveal><span class="eyebrow">البرنامج والمبادرة</span><h1>${escapeHTML(item.title)}</h1><p class="detail-lead">${escapeHTML(item.summary || '')}</p>
      ${facts.length ? `<dl class="detail-facts">${facts.map(([label, value]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join('')}</dl>` : ''}
      <section class="detail-copy"><h2>عن البرنامج</h2><p>${escapeHTML(item.details || item.description || item.summary || '')}</p></section>
      ${objectives.length ? `<section class="detail-copy"><h2>أهداف البرنامج</h2><ul>${objectives.map((value) => `<li>${escapeHTML(value)}</li>`).join('')}</ul></section>` : ''}
      <div class="detail-actions">${item.url ? `<a class="button button--gold" href="${escapeHTML(item.url)}" target="_blank" rel="noopener">التسجيل أو معرفة المزيد</a>` : ''}<a class="button button--outline" data-cms-whatsapp href="https://wa.me/966557195594" target="_blank" rel="noopener">استفسر عبر واتساب</a></div>
      </div></article>`;
  }

  function renderNewsDetail(data) {
    const container = $('#cms-news-detail');
    if (!container || !data || !Array.isArray(data.news)) return;
    const id = new URLSearchParams(window.location.search).get('id');
    const item = data.news.find((news, index) => String(news.id || `news-${index + 1}`) === id) || data.news[0];
    if (!item) {
      container.innerHTML = `<div class="detail-empty"><h1>الخبر غير موجود</h1><a class="button button--navy" href="media.html">العودة إلى المركز الإعلامي</a></div>`;
      return;
    }
    document.title = `${item.title} | جمعية أثر القيم`;
    container.innerHTML = `<article class="news-detail">
      <div class="news-detail-heading" data-reveal><span class="eyebrow">المركز الإعلامي</span><time>${escapeHTML(item.date || 'خبر الجمعية')}</time><h1>${escapeHTML(item.title)}</h1><p class="detail-lead">${escapeHTML(item.summary || '')}</p></div>
      <button class="news-detail-image" type="button" data-lightbox-image="${escapeHTML(item.image || 'assets/images/content-placeholder.svg')}" data-lightbox-title="${escapeHTML(item.title)}" data-lightbox-caption="${escapeHTML(item.summary || '')}" data-reveal><img src="${escapeHTML(item.image || 'assets/images/content-placeholder.svg')}" alt="${escapeHTML(item.title)}"><span>تكبير الصورة</span></button>
      <div class="detail-copy news-detail-copy" data-reveal><p>${escapeHTML(item.content || item.details || item.summary || '')}</p>${item.link ? `<a class="button button--navy" href="${escapeHTML(item.link)}" target="_blank" rel="noopener">فتح المصدر الخارجي</a>` : ''}</div>
    </article>`;
  }

  function renderPartners(data) {
    const section = $('#cms-partners-content');
    if (!section || !data || !Array.isArray(data.partners)) return;
    const items = data.partners;
    if (!items.length) return;
    section.innerHTML = `<div class="container"><div class="section-heading section-heading--split"><div><span class="eyebrow">شركاء الأثر</span><h2>شراكات تعزّز الوصول والأثر.</h2></div><p>تظهر الجهات الشريكة والداعمة بعد إضافتها من لوحة الإدارة.</p></div><div class="partner-grid">${items.map((item) => {
      const content = `<span class="partner-logo"><img src="${escapeHTML(item.logo || 'assets/images/athar-logo-secondary-v2.png')}" alt="شعار ${escapeHTML(item.name)}" loading="lazy"></span><strong>${escapeHTML(item.name)}</strong><p>${escapeHTML(item.summary || '')}</p>`;
      return item.url ? `<a class="partner-card" href="${escapeHTML(item.url)}" target="_blank" rel="noopener" data-reveal>${content}</a>` : `<article class="partner-card" data-reveal>${content}</article>`;
    }).join('')}</div></div>`;
  }

  function activateReveals() {
    if (typeof window.atharRefreshReveal === 'function') window.atharRefreshReveal();
  }

  async function initCMSContent() {
    const [site, documents, about, programs, impact, media, partners] = await Promise.all([
      getJSON('data/site.json'),
      getJSON('data/governance.json'),
      getJSON('data/about.json'),
      getJSON('data/programs.json'),
      getJSON('data/impact.json'),
      getJSON('data/media.json'),
      getJSON('data/partners.json')
    ]);
    renderSite(site);
    renderDocuments(documents);
    renderAbout(about);
    renderPrograms(programs);
    renderProgramDetail(programs);
    renderImpact(impact);
    renderMedia(media);
    renderNewsDetail(media);
    renderPartners(partners);
    renderSite(site);
    activateReveals();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCMSContent);
  else initCMSContent();
})();
