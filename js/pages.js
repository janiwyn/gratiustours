// Gratius Tours — shared behaviour for inner pages
(function () {
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 60 });

  // Count-up numbers (elements with class "count" and data-to)
  var counters = document.querySelectorAll(".count");
  if (!counters.length || !("IntersectionObserver" in window)) {
    counters.forEach(function (c) { c.textContent = (+c.dataset.to).toLocaleString(); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, to = +el.dataset.to, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1600, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(function (c) { obs.observe(c); });
})();
