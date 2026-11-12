// Gratius Tours — home page interactions
(function () {
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 60 });

  // ---------- Rotating hero words ----------
  var words = ["mountain gorillas", "tree-climbing lions", "wild chimpanzees", "the mighty Nile", "herds of elephants"];
  var rot = document.getElementById("rotator");
  if (rot && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var wi = 0;
    setInterval(function () {
      rot.classList.add("out");
      setTimeout(function () {
        wi = (wi + 1) % words.length;
        rot.textContent = words[wi];
        rot.classList.remove("out");
      }, 350);
    }, 2600);
  }

  // ---------- Count-up stats ----------
  var counters = document.querySelectorAll(".count");
  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, to = +el.dataset.to, start = null, dur = 1600;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(function (c) { countObs.observe(c); });

  // ---------- Wildlife filter ----------
  var chips = document.querySelectorAll(".filter-chips button");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var f = chip.dataset.filter;
      document.querySelectorAll(".animal-col").forEach(function (col) {
        col.classList.toggle("hide", f !== "all" && col.dataset.cat !== f);
      });
    });
  });

  // ---------- Parks explorer ----------
  var parks = [
    {
      name: "Bwindi Impenetrable", short: "Gorilla trekking", img: "images/g1.png",
      tag: "UNESCO World Heritage Site",
      desc: "An ancient, mist-covered rainforest in Uganda's south-west and home to almost half of the world's mountain gorillas. Trails wind through steep valleys of ferns, vines and towering trees.",
      facts: [["Region", "South-west"], ["Size", "331 km²"], ["Best for", "Gorillas"]],
      wildlife: ["Mountain gorillas", "Forest elephants", "L'Hoest's monkeys", "350+ bird species"],
      link: "gorilla.html"
    },
    {
      name: "Queen Elizabeth", short: "Classic savannah safari", img: "images/Queen_Elizabeth_National_Park_012.jpg",
      tag: "Uganda's most visited park",
      desc: "Wide grasslands, crater lakes and the famous Kazinga Channel make this Uganda's most varied park. Look for the tree-climbing lions of Ishasha and enjoy a boat cruise among hippos and elephants.",
      facts: [["Region", "West"], ["Size", "1,978 km²"], ["Best for", "Game drives"]],
      wildlife: ["Tree-climbing lions", "Elephants", "Hippos", "Leopards", "Uganda kob", "600+ birds"],
      link: "elizabeth.html"
    },
    {
      name: "Murchison Falls", short: "Where the Nile explodes", img: "images/Murchison Falls,.jpg",
      tag: "Uganda's largest national park",
      desc: "Here the River Nile squeezes through a gorge just a few metres wide and plunges down in a thundering cascade. Game drives on the northern bank are excellent, and launch trips go right to the base of the falls.",
      facts: [["Region", "North-west"], ["Size", "3,840 km²"], ["Best for", "Big game & falls"]],
      wildlife: ["Rothschild's giraffes", "Elephants", "Lions", "Buffaloes", "Shoebill stork"],
      link: "tour5.html"
    },
    {
      name: "Kibale Forest", short: "Primate capital", img: "images/kibale1.png",
      tag: "13 primate species",
      desc: "A lush tropical forest with one of the highest densities of primates in Africa. Track habituated chimpanzee communities, then explore the nearby crater lakes and Bigodi wetland.",
      facts: [["Region", "West"], ["Size", "795 km²"], ["Best for", "Chimpanzees"]],
      wildlife: ["Chimpanzees", "Red colobus", "Black-and-white colobus", "Grey-cheeked mangabey"],
      link: "tour8.html"
    },
    {
      name: "Kidepo Valley", short: "Wild & remote", img: "images/Kidepo Valley.jpg",
      tag: "Africa's hidden gem",
      desc: "Tucked into Uganda's far north-east, Kidepo is wild, rugged and wonderfully uncrowded. Golden valleys ringed by mountains host species found nowhere else in the country.",
      facts: [["Region", "North-east"], ["Size", "1,442 km²"], ["Best for", "Remote safari"]],
      wildlife: ["Cheetahs", "Ostriches", "Lions", "Zebras", "Large buffalo herds"],
      link: "tour9.html"
    },
    {
      name: "Lake Mburo", short: "Zebras & walking safaris", img: "images/pic13.jpeg",
      tag: "Closest park to Kampala",
      desc: "A compact park of rolling hills, acacia woodland and lakes. It's perfect for a stopover on the way to Bwindi, with walking safaris, horseback rides and boat trips.",
      facts: [["Region", "South"], ["Size", "370 km²"], ["Best for", "Walking safaris"]],
      wildlife: ["Zebras", "Impalas", "Elands", "Hippos", "Buffaloes"],
      link: "tour7.html"
    },
    {
      name: "Rwenzori Mountains", short: "Mountains of the Moon", img: "images/rwenzori.jpg",
      tag: "Snow on the equator",
      desc: "Glacier-capped peaks rise above giant lobelias and moss-draped valleys. Margherita Peak, at 5,109 m, is the third-highest point in Africa, a dream for hikers and climbers.",
      facts: [["Region", "West"], ["Size", "996 km²"], ["Best for", "Hiking"]],
      wildlife: ["Rwenzori turaco", "Three-horned chameleon", "Blue monkeys", "Giant lobelias"],
      link: "booking.html?tour=" + encodeURIComponent("Custom safari (help me plan)")
    }
  ];

  var tabs = document.getElementById("parkTabs");
  var panel = document.getElementById("parkPanel");
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function showPark(i) {
    var p = parks[i];
    tabs.querySelectorAll("button").forEach(function (b, bi) {
      b.classList.toggle("active", bi === i);
      b.setAttribute("aria-selected", bi === i);
    });
    panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap");
    panel.innerHTML =
      '<div class="ph"><img src="' + encodeURI(p.img) + '" alt="' + esc(p.name) + ' National Park">' +
      '<span class="tag"><i class="fa-solid fa-star text-gold me-1"></i>' + esc(p.tag) + '</span></div>' +
      '<div class="pb"><h3>' + esc(p.name) + ' National Park</h3>' +
      '<p class="text-muted mb-0">' + esc(p.desc) + '</p>' +
      '<div class="park-facts">' + p.facts.map(function (f) {
        return '<div><small>' + esc(f[0]) + '</small><strong>' + esc(f[1]) + '</strong></div>';
      }).join("") + '</div>' +
      '<h6 class="fw-bold mb-2"><i class="fa-solid fa-paw text-gold me-1"></i> Wildlife you can see</h6>' +
      '<div class="chips">' + p.wildlife.map(function (w) { return '<span>' + esc(w) + '</span>'; }).join("") + '</div>' +
      '<div class="d-flex flex-wrap gap-2">' +
      '<a href="' + p.link + '" class="btn btn-safari">Explore this park <i class="fa-solid fa-arrow-right ms-1"></i></a>' +
      '<a href="booking.html" class="btn btn-warning">Plan a visit</a></div></div>';
  }
  if (tabs && panel) {
    parks.forEach(function (p, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.innerHTML = '<img src="' + encodeURI(p.img) + '" alt=""><span>' + esc(p.name) + '<small>' + esc(p.short) + '</small></span>';
      b.addEventListener("click", function () { showPark(i); });
      tabs.appendChild(b);
    });
    showPark(0);
  }

  // ---------- Quick planner ----------
  var monthSel = document.getElementById("qpMonth");
  if (monthSel) {
    var now = new Date();
    var names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var m = 0; m < 18; m++) {
      var d = new Date(now.getFullYear(), now.getMonth() + m, 1);
      var opt = document.createElement("option");
      opt.value = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
      opt.textContent = names[d.getMonth()] + " " + d.getFullYear();
      monthSel.appendChild(opt);
    }
    if (monthSel.options[2]) monthSel.selectedIndex = 2;
  }
  document.querySelectorAll(".js-planner").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = new URLSearchParams();
      var t = form.querySelector("[name=tour]").value;
      q.set("tour", t || "Custom safari (help me plan)");
      q.set("month", form.querySelector("[name=month]").value);
      q.set("adults", form.querySelector("[name=adults]").value || "2");
      location.href = "booking.html?" + q.toString();
    });
  });

  var GT = window.GT || { toast: function () { }, confetti: function () { } };

  // ---------- Safari wishlist (on the wildlife cards) ----------
  var wish = [];
  try { wish = JSON.parse(localStorage.getItem("gt-wish") || "[]"); } catch (e) { wish = []; }
  var wishBar = document.createElement("a");
  wishBar.className = "wish-bar";
  wishBar.href = "#";
  document.body.appendChild(wishBar);
  var cta = document.getElementById("wishlistCta");

  function wishUrl() {
    return "booking.html?tour=" + encodeURIComponent("Custom safari (help me plan)") +
      "&notes=" + encodeURIComponent("I'd love to see: " + wish.join(", "));
  }
  function paintWish() {
    document.querySelectorAll(".animal").forEach(function (card) {
      var name = card.querySelector("h4").textContent.trim();
      var b = card.querySelector(".wish-btn");
      var on = wish.indexOf(name) > -1;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
      b.innerHTML = on ? '<i class="fa-solid fa-check"></i> On my wishlist' : '<i class="fa-solid fa-plus"></i> Add to wishlist';
    });
    wishBar.classList.toggle("show", wish.length > 0);
    wishBar.innerHTML = '<i class="fa-solid fa-binoculars"></i> My Safari Wishlist <b>' + wish.length +
      '</b><span>Plan it <i class="fa-solid fa-arrow-right"></i></span>';
    wishBar.href = wishUrl();
    if (cta) cta.href = wish.length ? wishUrl() : "booking.html";
    try { localStorage.setItem("gt-wish", JSON.stringify(wish)); } catch (e) { }
  }
  document.querySelectorAll(".animal").forEach(function (card) {
    var name = card.querySelector("h4").textContent.trim();
    var b = document.createElement("button");
    b.type = "button";
    b.className = "wish-btn";
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var i = wish.indexOf(name);
      if (i > -1) { wish.splice(i, 1); GT.toast(name + " removed from your wishlist", "fa-minus"); }
      else {
        wish.push(name);
        GT.toast(name + " added! " + (wish.length === 1 ? "Keep going…" : wish.length + " animals on your list"), "fa-binoculars");
        if (wish.length === 5) setTimeout(function () { GT.toast("Wow, a true safari explorer! 🦁", "fa-trophy"); GT.confetti(); }, 500);
      }
      paintWish();
    });
    card.appendChild(b);
  });
  paintWish();

  // ---------- "Which Uganda safari are you?" quiz ----------
  var TOURS = [
    { t: "3-Day Gorilla Tracking & Lake Bunyonyi", p: "gorilla.html", img: "images/gorillas.jpeg", d: 3, tags: ["gorilla", "relaxed"], why: "Face-to-face with mountain gorillas, then unwind on beautiful Lake Bunyonyi." },
    { t: "4-Day Queen Elizabeth & Bwindi Gorilla Tracking", p: "tour3.html", img: "images/pic10.jpeg", d: 4, tags: ["gorilla", "wildlife", "action"], why: "Gorillas in Bwindi plus game drives and a hippo-filled boat cruise." },
    { t: "7-Day Gorilla, Chimps & Wildlife Tour", p: "tour4.html", img: "images/Bwindi_Impenetrable_National_Park_007.jpg", d: 7, tags: ["gorilla", "chimp", "wildlife", "everything"], why: "The complete Uganda experience: gorillas, chimps and big game in one trip." },
    { t: "3-Day Kibale Chimpanzee Tracking", p: "tour8.html", img: "images/kibale4.png", d: 3, tags: ["chimp", "relaxed"], why: "Follow noisy, playful chimpanzees through the primate capital of the world." },
    { t: "2-Day Queen Elizabeth Wildlife Safari", p: "elizabeth2.html", img: "images/Queen_Elizabeth_National_Park_043.jpg", d: 2, tags: ["wildlife"], why: "A quick, exciting taste of the savannah. Perfect when time is short." },
    { t: "3-Day Queen Elizabeth & Kazinga Channel", p: "elizabeth.html", img: "images/wildlife.jpg", d: 3, tags: ["wildlife", "relaxed"], why: "Game drives and a relaxing boat cruise past hippos, buffalo and elephants." },
    { t: "2-Day Murchison Falls & Wildlife Game Viewing", p: "tour6.html", img: "images/pic7.jpeg", d: 2, tags: ["wildlife", "action"], why: "See the Nile explode through a narrow gorge, plus game viewing, all in two days." },
    { t: "3-Day Murchison Falls National Park", p: "tour5.html", img: "images/Murchison Falls,.jpg", d: 3, tags: ["wildlife", "action"], why: "Giraffes, elephants and lions, plus a boat ride to the foot of mighty Murchison Falls." },
    { t: "6-Day Ultimate Wildlife Safari Experience", p: "tour7.html", img: "images/elephants.jpeg", d: 6, tags: ["wildlife", "chimp", "everything", "action"], why: "Four parks, two boat cruises and endless wildlife: the ultimate big-game adventure." },
    { t: "3-Day Kidepo Valley National Park", p: "tour9.html", img: "images/kidepo.jpg", d: 3, tags: ["wildlife", "remote"], why: "Wild, remote and uncrowded, Africa's hidden gem with stunning landscapes." },
    { t: "5-Day Kidepo Valley & Cultural Experience", p: "tour10.html", img: "images/Kidepo Valley.jpg", d: 5, tags: ["wildlife", "remote", "culture"], why: "Sipi Falls, remote Kidepo and time with the Karamojong people." }
  ];
  var QUESTIONS = [
    {
      q: "What would make your trip unforgettable?", key: "want", opts: [
        { v: "gorilla", icon: "fa-heart", label: "Meeting mountain gorillas" },
        { v: "wildlife", icon: "fa-paw", label: "Lions, elephants & big game" },
        { v: "chimp", icon: "fa-tree", label: "Swinging with chimpanzees" },
        { v: "everything", icon: "fa-earth-africa", label: "A bit of everything!" }]
    },
    {
      q: "How much time do you have?", key: "days", opts: [
        { v: "short", icon: "fa-bolt", label: "2–3 days" },
        { v: "mid", icon: "fa-calendar-week", label: "4–5 days" },
        { v: "long", icon: "fa-calendar-days", label: "6 days or more" }]
    },
    {
      q: "Pick your travel vibe", key: "vibe", opts: [
        { v: "relaxed", icon: "fa-water", label: "Relaxed & scenic" },
        { v: "action", icon: "fa-person-hiking", label: "Action-packed" },
        { v: "remote", icon: "fa-mountain-sun", label: "Wild & off the beaten track" },
        { v: "culture", icon: "fa-drum", label: "Culture & people" }]
    },
    {
      q: "Who's coming along?", key: "who", opts: [
        { v: "solo", icon: "fa-user", label: "Just me" },
        { v: "couple", icon: "fa-heart", label: "My partner & me" },
        { v: "friends", icon: "fa-user-group", label: "A group of friends" },
        { v: "kids", icon: "fa-children", label: "Family with kids under 15" }]
    }
  ];

  var body = document.getElementById("quizBody");
  var qbar = document.getElementById("quizBar");
  var answers = {}, step = 0;

  function renderQ() {
    var Q = QUESTIONS[step];
    qbar.style.width = (step / QUESTIONS.length * 100) + "%";
    body.innerHTML =
      '<div class="quiz-step"><div class="quiz-count">Question ' + (step + 1) + ' of ' + QUESTIONS.length + '</div>' +
      '<h3>' + Q.q + '</h3><div class="quiz-opts">' +
      Q.opts.map(function (o) {
        return '<button type="button" data-v="' + o.v + '"><i class="fa-solid ' + o.icon + '"></i><span>' + o.label + '</span></button>';
      }).join("") + '</div>' +
      (step > 0 ? '<button type="button" class="quiz-back"><i class="fa-solid fa-arrow-left me-1"></i>Back</button>' : '') +
      '</div>';
    body.querySelectorAll(".quiz-opts button").forEach(function (b) {
      b.addEventListener("click", function () {
        answers[Q.key] = b.dataset.v;
        b.classList.add("picked");
        setTimeout(function () { step++; step < QUESTIONS.length ? renderQ() : result(); }, 250);
      });
    });
    var back = body.querySelector(".quiz-back");
    if (back) back.addEventListener("click", function () { step--; renderQ(); });
  }

  function score(t) {
    var s = 0;
    if (answers.want === "everything") { if (t.tags.indexOf("everything") > -1) s += 4; }
    else if (t.tags.indexOf(answers.want) > -1) s += 4;
    var bucket = t.d <= 3 ? "short" : t.d <= 5 ? "mid" : "long";
    if (bucket === answers.days) s += 3;
    if (t.tags.indexOf(answers.vibe) > -1) s += 2;
    if (answers.who === "kids" && t.tags.indexOf("gorilla") > -1) s -= 6; // gorilla trekking minimum age is 15
    return s;
  }

  function result() {
    qbar.style.width = "100%";
    var ranked = TOURS.slice().sort(function (a, b) { return score(b) - score(a); });
    var best = ranked[0], alt = ranked[1];
    var kidsNote = answers.who === "kids" && answers.want === "gorilla"
      ? '<p class="quiz-note"><i class="fa-solid fa-circle-info me-1"></i>Gorilla trekking has a minimum age of 15, so we picked a family-friendly adventure. Ask us about gorilla options for older family members!</p>' : '';
    body.innerHTML =
      '<div class="quiz-result">' +
      '<div class="qr-img"><img src="' + encodeURI(best.img) + '" alt=""><span class="qr-badge"><i class="fa-solid fa-trophy"></i> Your perfect match</span></div>' +
      '<div class="qr-body"><div class="quiz-count">You are…</div><h3>' + best.t + '</h3><p>' + best.why + '</p>' + kidsNote +
      '<div class="d-flex flex-wrap gap-2 mt-3">' +
      '<a class="btn btn-warning" href="booking.html?tour=' + encodeURIComponent(best.t) + '"><i class="fa-solid fa-calendar-check me-1"></i>Book this safari</a>' +
      '<a class="btn btn-outline-navy" href="' + best.p + '">See itinerary</a></div>' +
      '<p class="small text-muted mt-3 mb-1">Also a great fit: <a href="' + alt.p + '" class="fw-semibold text-success">' + alt.t + '</a></p>' +
      '<button type="button" class="quiz-back mt-2"><i class="fa-solid fa-rotate-left me-1"></i>Take the quiz again</button></div></div>';
    body.querySelector(".quiz-back").addEventListener("click", function () { answers = {}; step = 0; renderQ(); });
    GT.confetti();
  }

  if (body) renderQ();
})();
