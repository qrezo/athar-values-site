(function () {
  function injectHelper() {
    if (document.querySelector(".athar-cms-helper")) return;
    const helper = document.createElement("div");
    helper.className = "athar-cms-helper";
    helper.innerHTML = "<strong>أثر القيم</strong><span>حرّر المحتوى، راجع Preview، ثم اضغط Save / Publish. التحديث يظهر بعد إعادة نشر Netlify.</span>";
    Object.assign(helper.style, {
      position: "fixed",
      bottom: "16px",
      left: "16px",
      zIndex: "999999",
      maxWidth: "360px",
      padding: "12px 14px",
      borderRadius: "16px",
      background: "rgba(25,49,89,.94)",
      color: "#fff",
      boxShadow: "0 18px 40px rgba(16,33,61,.22)",
      fontFamily: "Tahoma, Arial, sans-serif",
      direction: "rtl"
    });
    helper.querySelector("strong").style.display = "block";
    helper.querySelector("strong").style.color = "#ead9b1";
    helper.querySelector("span").style.display = "block";
    helper.querySelector("span").style.fontSize = "12px";
    helper.querySelector("span").style.lineHeight = "1.7";
    document.body.appendChild(helper);
  }

  window.addEventListener("load", function () {
    setTimeout(injectHelper, 1800);
  });
})();
