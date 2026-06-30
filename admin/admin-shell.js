(function () {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const authView = $("#authView");
  const dashboardView = $("#dashboardView");
  const overviewPanel = $("#overviewPanel");
  const cmsPanel = $("#cmsPanel");
  const cmsFrame = $("#cmsFrame");
  const workspaceTitle = $("#workspaceTitle");

  const titles = {
    "#/collections/site_settings/entries/site": "بيانات الجمعية والتواصل",
    "#/collections/media_center/entries/media": "المركز الإعلامي",
    "#/collections/governance/entries/governance": "الحوكمة والملفات",
    "#/collections/partners/entries/partners": "الشركاء"
  };

  function showDashboard() {
    authView.classList.add("is-hidden");
    dashboardView.classList.remove("is-hidden");
  }

  function showAuth() {
    dashboardView.classList.add("is-hidden");
    authView.classList.remove("is-hidden");
  }

  function setActive(button) {
    $$(".nav-item").forEach((item) => item.classList.remove("is-active"));
    if (button && button.classList.contains("nav-item")) button.classList.add("is-active");
  }

  function openCms(route, sourceButton) {
    overviewPanel.classList.add("is-hidden");
    cmsPanel.classList.remove("is-hidden");
    const targetRoute = route || "";
    cmsFrame.src = "cms.html" + targetRoute;
    workspaceTitle.textContent = titles[targetRoute] || "محرر المحتوى";
    setActive(sourceButton);
  }

  function showOverview() {
    cmsPanel.classList.add("is-hidden");
    overviewPanel.classList.remove("is-hidden");
    workspaceTitle.textContent = "نظرة عامة";
    cmsFrame.src = "cms.html";
    setActive($('[data-route="dashboard"]'));
  }

  document.addEventListener("click", (event) => {
    const cmsButton = event.target.closest("[data-cms-route]");
    if (cmsButton) {
      openCms(cmsButton.getAttribute("data-cms-route"), cmsButton);
      return;
    }

    const overviewButton = event.target.closest('[data-route="dashboard"]');
    if (overviewButton) {
      showOverview();
    }
  });

  $("#openCmsButton")?.addEventListener("click", () => openCms("", null));
  $("#loginButton")?.addEventListener("click", () => {
    if (window.netlifyIdentity) window.netlifyIdentity.open("login");
  });
  $("#logoutButton")?.addEventListener("click", () => {
    if (window.netlifyIdentity) window.netlifyIdentity.logout();
  });

  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
      if (user) showDashboard();
      else showAuth();
    });

    window.netlifyIdentity.on("login", () => {
      showDashboard();
      window.netlifyIdentity.close();
    });

    window.netlifyIdentity.on("logout", () => {
      showAuth();
    });
  } else {
    showAuth();
  }
})();
