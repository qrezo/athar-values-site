(function () {
  function getData(entry) {
    const data = entry && entry.getIn ? entry.getIn(["data"]) : null;
    return data && data.toJS ? data.toJS() : (data || {});
  }
  function asset(getAsset, path) {
    if (!path) return "";
    try {
      const value = getAsset(path);
      return value && value.toString ? value.toString() : path;
    } catch (e) { return path; }
  }
  function text(value, fallback) { return value || fallback || ""; }
  function h(tag, props, children) {
    const React = window.React;
    if (!React) return null;
    if (!Array.isArray(children)) children = Array.prototype.slice.call(arguments, 2);
    return React.createElement(tag, props || {}, ...children);
  }
  function make(renderFn) {
    if (typeof window.createClass === "function") return window.createClass({ render: renderFn });
    return function (props) { return renderFn.call({ props: props }); };
  }

  const SitePreview = make(function () {
    const d = getData(this.props.entry);
    return h("div", { className: "athar-preview" },
      h("section", { className: "preview-cover" },
        h("small", null, "معاينة بيانات الجمعية"),
        h("h1", null, text(d.name, "جمعية أثر القيم")),
        h("p", null, text(d.description, "وصف الجمعية سيظهر هنا."))
      ),
      h("div", { className: "preview-grid" },
        h("article", { className: "preview-card" }, h("h3", null, "الجوال"), h("p", null, text(d.phone, "لم يحدد"))),
        h("article", { className: "preview-card" }, h("h3", null, "البريد"), h("p", null, text(d.email, "لم يحدد"))),
        h("article", { className: "preview-card" }, h("h3", null, "المدينة"), h("p", null, text(d.city, "لم تحدد")))
      )
    );
  });

  const MediaPreview = make(function () {
    const d = getData(this.props.entry);
    const news = d.news || [];
    const gallery = d.gallery || [];
    return h("div", { className: "athar-preview" },
      h("section", { className: "preview-cover" }, h("small", null, "معاينة المركز الإعلامي"), h("h1", null, "الأخبار والصور والإصدارات"), h("p", null, "هذه معاينة مختصرة لطريقة ظهور المحتوى الإعلامي.")),
      h("div", { className: "preview-grid" },
        ...(news.length ? news.map((item, i) => h("article", { className: "preview-card", key: "n"+i },
          item.image ? h("img", { className: "preview-image", src: asset(this.props.getAsset, item.image), alt: item.title || "" }) : null,
          h("h3", null, text(item.title, "خبر بدون عنوان")), h("p", null, text(item.summary, "")), h("span", { className: "preview-badge" }, "خبر")
        )) : [h("article", { className: "preview-card", key: "empty" }, h("h3", null, "لا توجد أخبار بعد"), h("p", null, "أضف خبرًا من القائمة."))])
      ),
      gallery.length ? h("div", { className: "preview-grid", style: { marginTop: "14px" } }, gallery.slice(0,4).map((item, i) => h("article", { className: "preview-card", key: "g"+i }, item.image ? h("img", { className: "preview-image", src: asset(this.props.getAsset, item.image), alt: item.title || "" }) : null, h("h3", null, text(item.title, "صورة"))))) : null
    );
  });

  const GovernancePreview = make(function () {
    const d = getData(this.props.entry);
    const docs = d.documents || [];
    const groups = ["مجلس الإدارة", "الجمعية العمومية", "السياسات واللوائح", "التقارير السنوية", "القوائم المالية", "نماذج عامة"];
    return h("div", { className: "athar-preview" },
      h("section", { className: "preview-cover" }, h("small", null, "معاينة الحوكمة"), h("h1", null, "ملفات الحوكمة حسب التصنيف"), h("p", null, "كل ملف سيظهر في قسمه بناءً على خانة التصنيف.")),
      h("div", { className: "preview-grid" }, groups.map((group) => {
        const items = docs.filter((item) => item.category === group);
        return h("article", { className: "preview-card", key: group }, h("h3", null, group),
          items.length ? h("div", { className: "preview-list" }, items.map((item, i) => h("div", { className: "preview-list-item", key: i }, h("strong", null, text(item.title, "ملف بدون عنوان")), h("span", null, [item.year, item.summary].filter(Boolean).join(" — ") || "ملف")))) : h("p", null, "لا توجد ملفات في هذا التصنيف."),
          h("span", { className: "preview-badge" }, items.length + " ملف")
        );
      }))
    );
  });

  const PartnersPreview = make(function () {
    const d = getData(this.props.entry);
    const partners = d.partners || [];
    return h("div", { className: "athar-preview" },
      h("section", { className: "preview-cover" }, h("small", null, "معاينة الشركاء"), h("h1", null, "شركاء النجاح"), h("p", null, "معاينة مختصرة لقائمة الشركاء.")),
      h("div", { className: "preview-grid" }, partners.length ? partners.map((item, i) => h("article", { className: "preview-card", key: i }, item.logo ? h("img", { className: "preview-image", src: asset(this.props.getAsset, item.logo), alt: item.name || "" }) : null, h("h3", null, text(item.name, "شريك")), h("p", null, text(item.summary, "")))) : [h("article", { className: "preview-card", key: "empty" }, h("h3", null, "لا يوجد شركاء بعد"), h("p", null, "أضف شريكًا من القائمة."))])
    );
  });

  function register() {
    if (!window.CMS) return;
    try {
      CMS.registerPreviewStyle("/admin/cms-preview.css");
      [["site_settings", SitePreview], ["site", SitePreview], ["media_center", MediaPreview], ["media", MediaPreview], ["governance", GovernancePreview], ["partners", PartnersPreview]].forEach(([name, template]) => CMS.registerPreviewTemplate(name, template));
    } catch (e) {
      console.warn("Athar preview templates failed", e);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", register); else register();
})();
