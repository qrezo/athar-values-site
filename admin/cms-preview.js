(function () {
  function getData(entry) {
    const data = entry && entry.getIn ? entry.getIn(["data"]) : null;
    return data && data.toJS ? data.toJS() : (data || {});
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
        h("article", { className: "preview-card" }, h("h3", null, "المدينة"), h("p", null, text(d.city, "لم تحدد"))),
        h("article", { className: "preview-card" }, h("h3", null, "نموذج قوقل"), h("p", null, text(d.feedback_form_url, "غير مضاف حاليًا")))
      )
    );
  });

  const DocumentsPreview = make(function () {
    const d = getData(this.props.entry);
    const docs = d.documents || [];
    const groups = ["شهادة الترخيص", "السياسات واللوائح", "أدلة ونماذج الحوكمة", "التقارير المالية السنوية", "القوائم المالية"];
    return h("div", { className: "athar-preview" },
      h("section", { className: "preview-cover" },
        h("small", null, "معاينة الوثائق والتقارير"),
        h("h1", null, "كل ملف في قسمه الصحيح"),
        h("p", null, "التصنيف المختار يحدد مكان ظهور الوثيقة في الموقع.")
      ),
      h("div", { className: "preview-grid" }, groups.map((group) => {
        const items = docs.filter((item) => item.category === group);
        return h("article", { className: "preview-card", key: group },
          h("h3", null, group),
          items.length ? h("div", { className: "preview-list" }, items.map((item, i) =>
            h("div", { className: "preview-list-item", key: i },
              h("strong", null, text(item.title, "ملف بدون عنوان")),
              h("span", null, [item.year, item.summary].filter(Boolean).join(" — ") || "ملف")
            )
          )) : h("p", null, "لا توجد ملفات في هذا التصنيف."),
          h("span", { className: "preview-badge" }, items.length + " ملف")
        );
      }))
    );
  });

  function register() {
    if (!window.CMS) return;
    try {
      CMS.registerPreviewStyle("/admin/cms-preview.css");
      [["site_settings", SitePreview], ["site", SitePreview], ["documents", DocumentsPreview], ["governance", DocumentsPreview]].forEach(([name, template]) => CMS.registerPreviewTemplate(name, template));
    } catch (error) {
      console.warn("Athar preview templates failed", error);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", register); else register();
})();
