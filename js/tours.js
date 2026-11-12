// Gratius Tours — Tours & Packages listing
// To add or edit a tour, change this list. "cat" is "primates" or "wildlife".
(function () {
  var TOURS = [
    {
      title: "3-Day Gorilla Tracking & Lake Bunyonyi", page: "gorilla.html", days: 3, cat: "primates",
      img: "images/gorillas.jpeg", route: "Entebbe · Bwindi · Lake Bunyonyi",
      highlights: ["Gorilla trekking in Bwindi Impenetrable Forest", "Relaxing time at Lake Bunyonyi", "Airport pickup and return"]
    },
    {
      title: "4-Day Queen Elizabeth & Bwindi Gorilla Tracking", page: "tour3.html", days: 4, cat: "primates",
      img: "images/pic10.jpeg", route: "Entebbe · Bwindi · Queen Elizabeth",
      highlights: ["Gorilla trekking in Bwindi", "Game drives in Queen Elizabeth", "Kazinga Channel boat cruise"]
    },
    {
      title: "7-Day Gorilla, Chimps & Wildlife Tour", page: "tour4.html", days: 7, cat: "primates",
      img: "images/Bwindi_Impenetrable_National_Park_007.jpg", route: "Kibale · Queen Elizabeth · Bwindi · Lake Mburo",
      highlights: ["Chimpanzee tracking in Kibale", "Gorilla trekking in Bwindi", "Game drives in Queen Elizabeth & Lake Mburo"]
    },
    {
      title: "3-Day Kibale Chimpanzee Tracking", page: "tour8.html", days: 3, cat: "primates",
      img: "images/kibale4.png", route: "Entebbe · Kibale Forest",
      highlights: ["Chimpanzee tracking experience", "Africa's primate capital", "Scenic drive through western Uganda"]
    },
    {
      title: "2-Day Queen Elizabeth Wildlife Safari", page: "elizabeth2.html", days: 2, cat: "wildlife",
      img: "images/Queen_Elizabeth_National_Park_043.jpg", route: "Kampala · Queen Elizabeth",
      highlights: ["Game drive on the savannah", "Elephants, buffalo & Uganda kob", "Perfect short getaway"]
    },
    {
      title: "3-Day Queen Elizabeth & Kazinga Channel", page: "elizabeth.html", days: 3, cat: "wildlife",
      img: "images/wildlife.jpg", route: "Entebbe · Queen Elizabeth · Kazinga Channel",
      highlights: ["Game drives in Queen Elizabeth", "Boat cruise among hippos on the Kazinga Channel", "Chance to spot lions & leopards"]
    },
    {
      title: "2-Day Murchison Falls & Wildlife Game Viewing", page: "tour6.html", days: 2, cat: "wildlife",
      img: "images/pic7.jpeg", route: "Entebbe · Murchison Falls",
      highlights: ["See the mighty Murchison Falls", "Game viewing on the Nile's banks", "Great for a weekend"]
    },
    {
      title: "3-Day Murchison Falls National Park", page: "tour5.html", days: 3, cat: "wildlife",
      img: "images/Murchison Falls,.jpg", route: "Entebbe · Murchison Falls",
      highlights: ["Game drive on the northern plains", "Boat cruise to the base of the falls", "Giraffes, elephants & lions"]
    },
    {
      title: "6-Day Ultimate Wildlife Safari Experience", page: "tour7.html", days: 6, cat: "wildlife",
      img: "images/elephants.jpeg", route: "Murchison · Kibale · Queen Elizabeth · Lake Mburo",
      highlights: ["Boat cruises in Murchison & Queen Elizabeth", "Chimp country in Kibale", "Zebras & impala at Lake Mburo"]
    },
    {
      title: "3-Day Kidepo Valley National Park", page: "tour9.html", days: 3, cat: "wildlife",
      img: "images/kidepo.jpg", route: "Entebbe · Kidepo Valley",
      highlights: ["Wild, remote savannah landscapes", "Game drives in Kidepo", "Cultural experience with local communities"]
    },
    {
      title: "5-Day Kidepo Valley & Cultural Experience", page: "tour10.html", days: 5, cat: "wildlife",
      img: "images/Kidepo Valley.jpg", route: "Sipi Falls · Kidepo Valley",
      highlights: ["Sipi Falls on the slopes of Mt Elgon", "Game drives & nature walk in Kidepo", "Cultural visit with the Karamojong"]
    }
  ];

  var GT = window.GT || { toast: function () { }, favs: { get: function () { return []; }, has: function () { return false; }, toggle: function () { return true; } } };
  var grid = document.getElementById("tourGrid");
  var count = document.getElementById("tourCount");
  var empty = document.getElementById("noResults");
  var search = document.getElementById("tourSearch");
  var sortSel = document.getElementById("tourSort");
  var savedN = document.getElementById("savedCount");
  var chips = document.querySelectorAll(".t-chips button");
  var filter = "all";
  var compare = [];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }

  grid.innerHTML = TOURS.map(function (t, i) {
    var bookUrl = "booking.html?tour=" + encodeURIComponent(t.title);
    var on = GT.favs.has(t.page);
    return '<div class="col-md-6 col-lg-4 tour-col" data-i="' + i + '">' +
      '<article class="tcard">' +
      '<a class="img" href="' + t.page + '" aria-label="' + esc(t.title) + '">' +
      '<img src="' + encodeURI(t.img) + '" alt="' + esc(t.title) + '" loading="lazy">' +
      '<span class="days">' + t.days + '<small>DAYS</small></span>' +
      '<span class="type">' + (t.cat === "primates" ? '<i class="fa-solid fa-tree me-1"></i>Primates' : '<i class="fa-solid fa-paw me-1"></i>Wildlife') + '</span>' +
      '</a>' +
      '<button class="fav' + (on ? ' on' : '') + '" data-page="' + t.page + '" aria-pressed="' + on + '" aria-label="Save ' + esc(t.title) + '">' +
      '<i class="fa-' + (on ? 'solid' : 'regular') + ' fa-heart"></i></button>' +
      '<div class="body">' +
      '<h5><a href="' + t.page + '">' + esc(t.title) + '</a></h5>' +
      '<div class="route"><i class="fa-solid fa-route me-1"></i>' + esc(t.route) + '</div>' +
      '<ul>' + t.highlights.map(function (h) { return '<li><i class="fa-solid fa-check"></i><span>' + esc(h) + '</span></li>'; }).join("") + '</ul>' +
      '<label class="cmp-check"><input type="checkbox" data-i="' + i + '"> <span>Compare</span></label>' +
      '<div class="actions">' +
      '<a href="' + t.page + '" class="btn btn-outline-navy">View Itinerary</a>' +
      '<a href="' + bookUrl + '" class="btn btn-warning">Book</a>' +
      '</div></div></article></div>';
  }).join("");

  // ----- Saved (hearts) -----
  function paintSaved() { if (savedN) savedN.textContent = GT.favs.get().length; }
  grid.querySelectorAll(".fav").forEach(function (b) {
    b.addEventListener("click", function () {
      var on = GT.favs.toggle(b.dataset.page);
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
      b.querySelector("i").className = "fa-" + (on ? "solid" : "regular") + " fa-heart";
      b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
      GT.toast(on ? "Saved! Tap “Saved” above to see your favourites" : "Removed from saved tours", on ? "fa-heart" : "fa-heart-crack");
      paintSaved();
      if (filter === "saved") apply();
    });
  });

  // ----- Filtering & sorting -----
  function matches(t) {
    if (filter === "primates" && t.cat !== "primates") return false;
    if (filter === "wildlife" && t.cat !== "wildlife") return false;
    if (filter === "short" && t.days > 3) return false;
    if (filter === "long" && t.days < 4) return false;
    if (filter === "saved" && !GT.favs.has(t.page)) return false;
    var q = (search.value || "").trim().toLowerCase();
    if (!q) return true;
    return (t.title + " " + t.route + " " + t.highlights.join(" ")).toLowerCase().indexOf(q) > -1;
  }

  function apply() {
    var cols = Array.prototype.slice.call(grid.querySelectorAll(".tour-col"));
    var mode = sortSel ? sortSel.value : "rec";
    cols.sort(function (a, b) {
      var A = TOURS[+a.dataset.i], B = TOURS[+b.dataset.i];
      if (mode === "short") return A.days - B.days || +a.dataset.i - +b.dataset.i;
      if (mode === "long") return B.days - A.days || +a.dataset.i - +b.dataset.i;
      if (mode === "az") return A.title.replace(/^\d+-Day /, "").localeCompare(B.title.replace(/^\d+-Day /, ""));
      return +a.dataset.i - +b.dataset.i;
    }).forEach(function (c) { grid.appendChild(c); });

    var shown = 0;
    cols.forEach(function (col) {
      var ok = matches(TOURS[+col.dataset.i]);
      col.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    count.textContent = "Showing " + shown + " of " + TOURS.length + " tours";
    empty.style.display = shown ? "none" : "block";
    var h5 = empty.querySelector("h5"), p = empty.querySelector("p");
    if (filter === "saved" && !shown) { h5.textContent = "No saved tours yet"; p.textContent = "Tap the ♥ on any tour to save it here for later."; }
    else { h5.textContent = "No tours match your search"; p.textContent = "Try another word, or let us build a custom safari for you."; }
  }

  function setFilter(f) {
    filter = f;
    chips.forEach(function (c) { c.classList.toggle("active", c.dataset.f === f); });
    apply();
  }
  chips.forEach(function (c) { c.addEventListener("click", function () { setFilter(c.dataset.f); }); });
  search.addEventListener("input", apply);
  if (sortSel) sortSel.addEventListener("change", apply);
  document.querySelectorAll("[data-pick]").forEach(function (a) {
    a.addEventListener("click", function () { search.value = ""; setFilter(a.dataset.pick); });
  });

  // ----- Compare (up to 3 tours) -----
  var cbar = document.createElement("div");
  cbar.className = "cmp-bar";
  cbar.innerHTML = '<div class="cmp-thumbs"></div><span class="cmp-txt"></span>' +
    '<button type="button" class="btn btn-warning btn-sm cmp-go">Compare now</button>' +
    '<button type="button" class="cmp-clear" aria-label="Clear comparison"><i class="fa-solid fa-xmark"></i></button>';
  document.body.appendChild(cbar);

  var modal = document.createElement("div");
  modal.className = "cmp-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Compare tours");
  modal.innerHTML = '<div class="cmp-box"><button type="button" class="cmp-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
    '<h3><i class="fa-solid fa-scale-balanced text-gold me-2"></i>Compare Tours</h3><div class="cmp-table"></div></div>';
  document.body.appendChild(modal);

  function paintCompare() {
    grid.querySelectorAll(".cmp-check input").forEach(function (cb) {
      cb.checked = compare.indexOf(+cb.dataset.i) > -1;
      cb.closest(".cmp-check").classList.toggle("on", cb.checked);
    });
    cbar.classList.toggle("show", compare.length > 0);
    cbar.querySelector(".cmp-thumbs").innerHTML = compare.map(function (i) { return '<img src="' + encodeURI(TOURS[i].img) + '" alt="">'; }).join("");
    cbar.querySelector(".cmp-txt").textContent = compare.length < 2 ? "Pick " + (2 - compare.length) + " more to compare" : compare.length + " tours selected";
    cbar.querySelector(".cmp-go").disabled = compare.length < 2;
  }
  grid.querySelectorAll(".cmp-check input").forEach(function (cb) {
    cb.addEventListener("change", function () {
      var i = +cb.dataset.i, at = compare.indexOf(i);
      if (cb.checked && at < 0) {
        if (compare.length >= 3) { cb.checked = false; GT.toast("You can compare up to 3 tours", "fa-circle-info"); return; }
        compare.push(i);
      } else if (!cb.checked && at > -1) compare.splice(at, 1);
      paintCompare();
    });
  });
  cbar.querySelector(".cmp-clear").addEventListener("click", function () { compare = []; paintCompare(); });

  function openCompare() {
    var ts = compare.map(function (i) { return TOURS[i]; });
    var row = function (label, fn) { return '<tr><th>' + label + '</th>' + ts.map(function (t) { return '<td>' + fn(t) + '</td>'; }).join("") + '</tr>'; };
    modal.querySelector(".cmp-table").innerHTML = '<table><thead><tr><th></th>' + ts.map(function (t) {
      return '<th><img src="' + encodeURI(t.img) + '" alt=""><span>' + esc(t.title) + '</span></th>';
    }).join("") + '</tr></thead><tbody>' +
      row("Duration", function (t) { return '<b>' + t.days + ' days</b>'; }) +
      row("Type", function (t) { return t.cat === "primates" ? "🦍 Gorillas &amp; primates" : "🦁 Wildlife safari"; }) +
      row("Route", function (t) { return esc(t.route); }) +
      row("Highlights", function (t) { return '<ul>' + t.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join("") + '</ul>'; }) +
      row("", function (t) {
        return '<a class="btn btn-warning btn-sm w-100 mb-1" href="booking.html?tour=' + encodeURIComponent(t.title) + '">Book</a>' +
          '<a class="btn btn-outline-navy btn-sm w-100" href="' + t.page + '">Itinerary</a>';
      }) + '</tbody></table>';
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modal.querySelector(".cmp-close").focus();
  }
  function closeCompare() { modal.classList.remove("open"); document.body.style.overflow = ""; }
  cbar.querySelector(".cmp-go").addEventListener("click", openCompare);
  modal.querySelector(".cmp-close").addEventListener("click", closeCompare);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeCompare(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("open")) closeCompare(); });

  paintSaved();
  paintCompare();
  apply();
})();
