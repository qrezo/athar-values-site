(function () {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const authView = $("#authView");
  const dashboardView = $("#dashboardView");
  const overviewPanel = $("#overviewPanel");
  const cmsPanel = $("#cmsPanel");
  const previewPanel = $("#previewPanel");
  const cmsFrame = $("#cmsFrame");
  const previewFrame = $("#previewFrame");
  const previewUrlLabel = $("#previewUrlLabel");
  const workspaceTitle = $("#workspaceTitle");

  const titles = {
    "#/collections/site_settings/entries/site": "بيانات الجمعية والتواصل",
    "#/collections/media_center/entries/media": "المركز الإعلامي",
    "#/collections/governance/entries/governance": "الحوكمة والملفات",
    "#/collections/partners/entries/partners": "الشركاء"
  };

  function showDashboard() { authView.classList.add("is-hidden"); dashboardView.classList.remove("is-hidden"); }
  function showAuth() { dashboardView.classList.add("is-hidden"); authView.classList.remove("is-hidden"); }

  function setActive(button) {
    $$(".nav-item").forEach((item) => item.classList.remove("is-active"));
    if (button && button.classList.contains("nav-item")) button.classList.add("is-active");
  }

  function hidePanels() {
    overviewPanel.classList.add("is-hidden");
    cmsPanel.classList.add("is-hidden");
    previewPanel.classList.add("is-hidden");
  }

  function openCms(route, sourceButton) {
    hidePanels();
    cmsPanel.classList.remove("is-hidden");
    const targetRoute = route || "";
    cmsFrame.src = "cms.html" + targetRoute;
    workspaceTitle.textContent = titles[targetRoute] || "محرر المحتوى";
    setActive(sourceButton);
  }

  function showPreview(url, sourceButton, label) {
    hidePanels();
    previewPanel.classList.remove("is-hidden");
    const target = url || "../index.html";
    previewFrame.src = target;
    workspaceTitle.textContent = "معاينة الموقع";
    if (previewUrlLabel) previewUrlLabel.textContent = label || target.replace("../", "");
    setActive(sourceButton || $('[data-preview-url="../index.html"]'));
  }

  function showOverview() {
    hidePanels();
    overviewPanel.classList.remove("is-hidden");
    workspaceTitle.textContent = "النظرة العامة";
    setActive($('[data-route="dashboard"]'));
  }

  document.addEventListener("click", (event) => {
    const cmsButton = event.target.closest("[data-cms-route]");
    if (cmsButton) { openCms(cmsButton.getAttribute("data-cms-route"), cmsButton); return; }

    const previewButton = event.target.closest("[data-preview-url]");
    if (previewButton) {
      const label = previewButton.textContent.trim() || "معاينة";
      showPreview(previewButton.getAttribute("data-preview-url"), previewButton, label);
      return;
    }

    const overviewButton = event.target.closest('[data-route="dashboard"]');
    if (overviewButton) showOverview();
  });

  $("#openCmsButton")?.addEventListener("click", () => openCms("", null));
  $("#previewSiteButton")?.addEventListener("click", () => showPreview("../index.html", $('[data-preview-url="../index.html"]'), "الرئيسية"));
  $("#loginButton")?.addEventListener("click", () => { if (window.netlifyIdentity) window.netlifyIdentity.open("login"); });
  $("#logoutButton")?.addEventListener("click", () => { if (window.netlifyIdentity) window.netlifyIdentity.logout(); });

  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => { if (user) showDashboard(); else showAuth(); });
    window.netlifyIdentity.on("login", () => { showDashboard(); window.netlifyIdentity.close(); });
    window.netlifyIdentity.on("logout", () => { showAuth(); });
  } else showAuth();
})();
