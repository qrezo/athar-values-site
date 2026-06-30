(function () {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  async function getJSON(path) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function normalizeUrl(value) {
    if (!value) return "";
    if (value.startsWith("/") || value.startsWith("http") || value.startsWith("mailto:") || value.startsWith("tel:")) return value;
    return value;
  }

  function makeCardImage(image, fallbackText) {
    if (image) {
      return `<div class="cms-thumb"><img src="${escapeHTML(normalizeUrl(image))}" alt="${escapeHTML(fallbackText || "")}" loading="lazy"></div>`;
    }
    return `<div class="gallery-placeholder">${escapeHTML(fallbackText || "ملف")}</div>`;
  }

  function renderNews(media) {
    const grid = $("#cms-news-grid") || $("#news .grid");
    if (!grid || !media || !Array.isArray(media.news) || !media.news.length) return;

    grid.innerHTML = media.news.map((item) => {
      const link = item.link ? `<a class="text-link" href="${escapeHTML(normalizeUrl(item.link))}">عرض التفاصيل</a>` : "";
      return `<article class="card">
        ${makeCardImage(item.image, "خبر")}
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.summary)}</p>
        ${link}
      </article>`;
    }).join("");
  }

  function renderArticles(media) {
    const section = $("#cms-articles-list");
    if (!section || !media || !Array.isArray(media.articles) || !media.articles.length) return;

    section.innerHTML = media.articles.map((item) => {
      const link = item.link ? `<a class="text-link" href="${escapeHTML(normalizeUrl(item.link))}">فتح</a>` : "";
      return `<article class="card">
        <div class="card-icon"></div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.summary)}</p>
        ${link}
      </article>`;
    }).join("");
  }

  function renderGallery(media) {
    const grid = $("#cms-gallery-grid") || $("#gallery .grid");
    if (!grid || !media || !Array.isArray(media.gallery)) return;

    if (!media.gallery.length) {
      grid.innerHTML = `<div class="gallery-placeholder">أضف الصور من لوحة الإدارة</div>`;
      return;
    }

    grid.innerHTML = media.gallery.map((item) => {
      return `<figure class="cms-gallery-item">
        <img src="${escapeHTML(normalizeUrl(item.image))}" alt="${escapeHTML(item.title || item.caption || "صورة")}" loading="lazy">
        <figcaption>${escapeHTML(item.title || item.caption || "")}</figcaption>
      </figure>`;
    }).join("");
  }

  function renderMediaDocuments(media) {
    const grid = $("#cms-media-documents");
    if (!grid || !media || !Array.isArray(media.documents)) return;

    if (!media.documents.length) {
      grid.innerHTML = `<div class="resource-card"><div><strong>لا توجد ملفات إعلامية بعد</strong><span>يمكن رفعها من لوحة الإدارة.</span></div><span class="badge">جاهز</span></div>`;
      return;
    }

    grid.innerHTML = media.documents.map((item) => `<a class="resource-card" href="${escapeHTML(normalizeUrl(item.file))}" target="_blank" rel="noopener">
      <div><strong>${escapeHTML(item.title)}</strong><span>${escapeHTML(item.summary || "تحميل الملف")}</span></div>
      <span class="badge">تحميل</span>
    </a>`).join("");
  }

  function renderGovernance(data) {
    const grid = $("#cms-governance-documents") || $("#reports .grid");
    if (!grid || !data || !Array.isArray(data.documents)) return;

    if (!data.documents.length) {
      grid.innerHTML = `<div class="resource-card"><div><strong>لا توجد ملفات بعد</strong><span>تضاف الملفات من لوحة الإدارة.</span></div><span class="badge">جاهز</span></div>`;
      return;
    }

    grid.innerHTML = data.documents.map((item) => {
      const hasFile = !!item.file;
      const tag = hasFile ? "a" : "div";
      const href = hasFile ? ` href="${escapeHTML(normalizeUrl(item.file))}" target="_blank" rel="noopener"` : "";
      const status = hasFile ? "تحميل" : "قريبًا";
      return `<${tag} class="resource-card"${href}>
        <div>
          <strong>${escapeHTML(item.title)}</strong>
          <span>${escapeHTML([item.category, item.year, item.summary].filter(Boolean).join(" — "))}</span>
        </div>
        <span class="badge">${status}</span>
      </${tag}>`;
    }).join("");
  }

  function renderPartners(data) {
    const grid = $("#cms-partners-grid") || $(".grid.grid-4", $("#partners-page") || document);
    if (!grid || !data || !Array.isArray(data.partners)) return;

    if (!data.partners.length) {
      grid.innerHTML = `<div class="gallery-placeholder">أضف الشركاء من لوحة الإدارة</div>`;
      return;
    }

    grid.innerHTML = data.partners.map((item) => {
      const inner = `${item.logo ? `<img src="${escapeHTML(normalizeUrl(item.logo))}" alt="${escapeHTML(item.name)}" loading="lazy">` : `<div class="gallery-placeholder">شريك</div>`}
        <h3>${escapeHTML(item.name)}</h3>
        ${item.summary ? `<p>${escapeHTML(item.summary)}</p>` : ""}`;
      return item.url
        ? `<a class="partner-card" href="${escapeHTML(normalizeUrl(item.url))}" target="_blank" rel="noopener">${inner}</a>`
        : `<article class="partner-card">${inner}</article>`;
    }).join("");
  }

  function renderContact(site) {
    if (!site) return;
    $$("[data-cms-phone]").forEach((el) => {
      el.textContent = site.phone || el.textContent;
      if (el.tagName === "A" && site.phone) el.href = "tel:" + site.phone.replace(/\s+/g, "");
    });
    $$("[data-cms-email]").forEach((el) => {
      el.textContent = site.email || el.textContent;
      if (el.tagName === "A" && site.email) el.href = "mailto:" + site.email;
    });
  }

  async function init() {
    const [site, media, governance, partners] = await Promise.all([
      getJSON("data/site.json"),
      getJSON("data/media.json"),
      getJSON("data/governance.json"),
      getJSON("data/partners.json")
    ]);

    renderContact(site);
    renderNews(media);
    renderArticles(media);
    renderGallery(media);
    renderMediaDocuments(media);
    renderGovernance(governance);
    renderPartners(partners);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
