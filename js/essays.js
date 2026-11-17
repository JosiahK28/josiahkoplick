/* Latest essays, served by the Worker at /api/essays (newest Substack posts).
   If it fails, the section stays hidden and the page is unchanged. */
(function () {
  var section = document.getElementById("latest");
  var list = document.getElementById("essays");
  if (!section || !list || !window.fetch) return;

  var fmt = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric" });

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  fetch("/api/essays", { headers: { accept: "application/json" } })
    .then(function (r) { return r.ok ? r.json() : { posts: [] }; })
    .then(function (data) {
      var posts = (data && data.posts) || [];
      if (!posts.length) return;
      posts.forEach(function (p, i) {
        if (!/^https:\/\//.test(p.url)) return;
        var li = el("li");
        var a = el("a", "essay");
        a.href = p.url;
        a.style.animationDelay = (0.08 * i) + "s";
        var d = new Date(p.date);
        var t = el("time", "e-date", isNaN(d) ? "" : fmt.format(d));
        if (!isNaN(d)) t.dateTime = p.date;
        a.appendChild(t);
        a.appendChild(el("span", "e-title", p.title));
        if (p.subtitle) a.appendChild(el("span", "e-sub", p.subtitle));
        li.appendChild(a);
        list.appendChild(li);
      });
      if (list.children.length) section.hidden = false;
    })
    .catch(function () {});
})();
