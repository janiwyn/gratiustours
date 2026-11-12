// Gratius Tours — shared site behaviour
(function () {
  var WHATSAPP = "256742015425";

  // Highlight the current page in the navbar
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var tourPages = /^(tour|gorilla|elizabeth)/;
  document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
    var href = (link.getAttribute("href") || "").toLowerCase();
    var isActive = href === page || (href === "tours.html" && tourPages.test(page));
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
  });

  // Navbar shrinks / darkens on scroll
  var nav = document.querySelector(".navbar");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 60); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Savanna horizon above the footer on every page
  var footer = document.querySelector("footer");
  if (footer && !document.querySelector(".horizon")) {
    var wrap = document.createElement("div");
    wrap.innerHTML = "<div class=\"horizon\" aria-hidden=\"true\"> <div class=\"sun\"></div> <svg class=\"tree\" viewBox=\"0 0 200 140\" width=\"190\" height=\"133\" style=\"left:6%\"> <path d=\"M10 52 C30 30 70 22 100 24 C135 22 175 30 192 50 C170 58 130 60 100 58 C70 60 30 60 10 52Z M95 140 L98 90 L78 58 L84 57 L100 82 L117 56 L123 57 L104 92 L107 140Z\" /> </svg> <svg class=\"tree\" viewBox=\"0 0 200 140\" width=\"130\" height=\"91\" style=\"right:9%\"> <path d=\"M10 52 C30 30 70 22 100 24 C135 22 175 30 192 50 C170 58 130 60 100 58 C70 60 30 60 10 52Z M95 140 L98 90 L78 58 L84 57 L100 82 L117 56 L123 57 L104 92 L107 140Z\" /> </svg> <div class=\"herd\"> <img class=\"sil opt\" src=\"images/zebra.png\" alt=\"\" width=\"80\" height=\"54\"> <img class=\"sil\" src=\"images/girafu.png\" alt=\"\" width=\"78\" height=\"127\"> <img class=\"sil\" src=\"images/elephant.png\" alt=\"\" width=\"150\" height=\"97\"> <img class=\"sil opt\" src=\"images/rheno.png\" alt=\"\" width=\"96\" height=\"55\"> <img class=\"sil\" src=\"images/lion.png\" alt=\"\" width=\"84\" height=\"53\"> <img class=\"sil opt\" src=\"images/buffu.png\" alt=\"\" width=\"80\" height=\"66\"> <img class=\"sil\" src=\"images/goli.png\" alt=\"\" width=\"62\" height=\"60\"> </div> <div class=\"ground\"></div> </div>";
    footer.parentNode.insertBefore(wrap.firstChild, footer);
  }

  // Floating WhatsApp button
  if (!document.querySelector(".fab-whatsapp")) {
    var a = document.createElement("a");
    a.className = "fab-whatsapp";
    a.href = "https://wa.me/" + WHATSAPP + "?text=" +
      encodeURIComponent("Hello Gratius Tours, I'd like to plan a trip to Uganda.");
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Chat with us on WhatsApp");
    a.innerHTML = '<i class="fa-brands fa-whatsapp"></i><span>Chat with us</span>';
    document.body.appendChild(a);
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Shared helpers (used by other scripts as window.GT) ----------
  var GT = window.GT = window.GT || {};

  // Small pop-up message at the bottom of the screen
  GT.toast = function (msg, icon) {
    var box = document.getElementById("gtToasts");
    if (!box) {
      box = document.createElement("div");
      box.id = "gtToasts";
      box.className = "gt-toasts";
      box.setAttribute("role", "status");
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    var t = document.createElement("div");
    t.className = "gt-toast";
    t.innerHTML = '<i class="fa-solid ' + (icon || "fa-paw") + '"></i><span></span>';
    t.querySelector("span").textContent = msg;
    box.appendChild(t);
    setTimeout(function () { t.classList.add("out"); }, 2600);
    setTimeout(function () { t.remove(); }, 3100);
  };

  // Celebration confetti in the brand colours
  GT.confetti = function () {
    if (reduceMotion) return;
    var c = document.createElement("canvas");
    c.className = "gt-confetti";
    document.body.appendChild(c);
    var ctx = c.getContext("2d"), W = c.width = innerWidth, H = c.height = innerHeight;
    var colors = ["#f4c430", "#004d00", "#003366", "#e0a800", "#ffffff"];
    var parts = [];
    for (var i = 0; i < 160; i++) {
      parts.push({
        x: W / 2 + (Math.random() - .5) * 200, y: H * .55,
        vx: (Math.random() - .5) * 16, vy: -Math.random() * 18 - 6,
        s: Math.random() * 8 + 4, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
        c: colors[i % colors.length]
      });
    }
    var start = performance.now();
    (function frame(now) {
      ctx.clearRect(0, 0, W, H);
      parts.forEach(function (p) {
        p.vy += .45; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
      });
      if (now - start < 3200) requestAnimationFrame(frame); else c.remove();
    })(start);
  };

  // Saved ("hearted") tours, remembered in this browser
  GT.favs = {
    get: function () {
      try {
        var v = JSON.parse(localStorage.getItem("gt-favs") || localStorage.getItem("pq-favs") || "[]");
        return Array.isArray(v) ? v : [];
      } catch (e) { return []; }
    },
    has: function (page) { return GT.favs.get().indexOf(page) > -1; },
    toggle: function (page) {
      var list = GT.favs.get(), i = list.indexOf(page);
      if (i > -1) list.splice(i, 1); else list.push(page);
      try { localStorage.setItem("gt-favs", JSON.stringify(list)); } catch (e) { }
      return i === -1;
    }
  };

  // ---------- Scroll progress bar with a paw at its tip ----------
  if (nav) {
    var prog = document.createElement("div");
    prog.className = "gt-progress";
    prog.innerHTML = '<span class="bar"></span><i class="fa-solid fa-paw"></i>';
    nav.appendChild(prog);
    var bar = prog.querySelector(".bar"), paw = prog.querySelector("i");
    var updateProg = function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      var p = h > 0 ? Math.min(scrollY / h, 1) : 0;
      bar.style.width = (p * 100) + "%";
      paw.style.left = "calc(" + (p * 100) + "% - 8px)";
      paw.style.opacity = p > .01 ? 1 : 0;
      paw.style.transform = "rotate(" + (90 + Math.sin(scrollY / 40) * 18) + "deg)";
    };
    addEventListener("scroll", updateProg, { passive: true });
    addEventListener("resize", updateProg);
    updateProg();
  }

  // ---------- Back to top ----------
  if (!document.getElementById("gtTop")) {
    document.querySelectorAll("#backToTop").forEach(function (b) { b.remove(); });
    var top = document.createElement("button");
    top.id = "gtTop";
    top.className = "gt-top";
    top.type = "button";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    top.addEventListener("click", function () { scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
    document.body.appendChild(top);
    var toggleTop = function () { top.classList.toggle("show", scrollY > 600); };
    addEventListener("scroll", toggleTop, { passive: true });
    toggleTop();
  }

  // ---------- Newsletter forms: send a subscribe request by email ----------
  document.querySelectorAll("#newsletterForm").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var input = f.querySelector("input[type=email]");
      if (!input || !input.checkValidity() || !input.value) { GT.toast("Please enter a valid email address", "fa-circle-exclamation"); return; }
      location.href = "mailto:gratiustoursandtravel@gmail.com?subject=" + encodeURIComponent("Newsletter subscription") +
        "&body=" + encodeURIComponent("Hello Gratius Tours,\n\nPlease add me to your newsletter: " + input.value + "\n\nThank you!");
      GT.toast("Almost done! Press send in your email app to subscribe", "fa-envelope-open-text");
      input.value = "";
    }, true);
  });

  // ---------- Tour detail pages: Share · Print · Save ----------
  var book = document.querySelector(".book-card");
  if (book) {
    var titleEl = book.querySelector("p");
    var tourTitle = titleEl ? titleEl.textContent.trim() : document.title;
    var bar2 = document.createElement("div");
    bar2.className = "tour-actions";
    bar2.innerHTML =
      '<button type="button" data-act="save"><i class="fa-regular fa-heart"></i><span>Save</span></button>' +
      '<button type="button" data-act="share"><i class="fa-solid fa-share-nodes"></i><span>Share</span></button>' +
      '<button type="button" data-act="print"><i class="fa-solid fa-print"></i><span>Print</span></button>';
    book.appendChild(bar2);
    var saveBtn = bar2.querySelector('[data-act="save"]');
    var paintSave = function () {
      var on = GT.favs.has(page);
      saveBtn.classList.toggle("on", on);
      saveBtn.querySelector("i").className = (on ? "fa-solid" : "fa-regular") + " fa-heart";
      saveBtn.querySelector("span").textContent = on ? "Saved" : "Save";
    };
    paintSave();
    saveBtn.addEventListener("click", function () {
      var on = GT.favs.toggle(page);
      paintSave();
      GT.toast(on ? "Saved! Find it under “Saved” on the Tours page" : "Removed from your saved tours", on ? "fa-heart" : "fa-heart-crack");
    });
    bar2.querySelector('[data-act="share"]').addEventListener("click", function () {
      var data = { title: tourTitle + " | Gratius Tours", text: "Look at this Uganda safari: " + tourTitle, url: location.href };
      if (navigator.share) { navigator.share(data).catch(function () { }); return; }
      var done = function () { GT.toast("Link copied, paste it anywhere to share", "fa-link"); };
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, function () { prompt("Copy this link:", location.href); });
      else prompt("Copy this link:", location.href);
    });
    bar2.querySelector('[data-act="print"]').addEventListener("click", function () { print(); });
  }
})();
