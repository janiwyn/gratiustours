// Gratius Tours — Photo Album
// Add a photo: put the file in /images and add a line below: ["file name", "category", "caption"]
// Categories: wildlife, primates, landscapes, culture, adventure, lodges
(function () {
  var PHOTOS = [
    // Primates
    ["gorillas.jpeg", "primates", "Mother and baby gorilla, Bwindi"],
    ["g3.png", "primates", "Silverback mountain gorilla"],
    ["g1.png", "primates", "A gorilla family in the forest"],
    ["pic10.jpeg", "primates", "Gorilla family moment"],
    ["Bwindi_Impenetrable_National_Park_038.jpg", "primates", "Gorillas resting together"],
    ["Bwindi_Impenetrable_National_Park_068.jpg", "primates", "Young gorilla in the trees"],
    ["g2.png", "primates", "Gorilla relaxing on the forest floor"],
    ["0f.jpg", "primates", "Gorilla in the bamboo forest"],
    ["0e.jpg", "primates", "Gorilla troop on the move"],
    ["monkeys.jpeg", "primates", "Silverback in the greenery"],
    ["pic9.jpeg", "primates", "Gorilla in the misty forest"],
    ["pic11.jpeg", "primates", "Curious young gorilla"],
    ["pic2.jpeg", "primates", "Primates in the forest"],
    ["Chimpanzee (Pan troglodytes) _ Chimpanzé _ Image….jpg", "primates", "Chimpanzee in Kibale"],
    ["kibale4.png", "primates", "Chimpanzees in Kibale Forest"],
    ["momoz.png", "primates", "Chimpanzee portrait"],
    ["kibale1.png", "primates", "Black-and-white colobus monkey"],

    // Wildlife
    ["Murchison_Falls_National_Park_010 (1).jpg", "wildlife", "Lion, Murchison Falls"],
    ["Queen_Elizabeth_National_Park_046.jpg", "wildlife", "Leopard on the prowl"],
    ["pic14.jpeg", "wildlife", "Leopard resting in a tree"],
    ["elephants.jpeg", "wildlife", "Elephant family in the grass"],
    ["Murchison_Falls_National_Park_024.jpg", "wildlife", "African elephant by the water"],
    ["Queen_Elizabeth_National_Park_012.jpg", "wildlife", "Elephant among the trees"],
    ["kidepo6.png", "wildlife", "Lone elephant in Kidepo"],
    ["pic15.jpeg", "wildlife", "Elephant at sunset"],
    ["Hippopotamus, Kazinga Channel, Uganda.jpg", "wildlife", "Hippo, Kazinga Channel"],
    ["© DPNP _ Marie-Laure PIROT.jpg", "wildlife", "Hippos sparring"],
    ["hippopotamus, african wildlife.jpg", "wildlife", "Hippos grazing"],
    ["q2.png", "wildlife", "Hippos in the water"],
    ["Ziwa_Rhino_and_Wildlife_Ranch_004.jpg", "wildlife", "White rhino at Ziwa"],
    ["pic1.jpeg", "wildlife", "Rhinos at Ziwa Rhino Sanctuary"],
    ["Giraffes in Kidepo valley national park.jpg", "wildlife", "Giraffes in Kidepo Valley"],
    ["kidepo.jpg", "wildlife", "Giraffes browsing"],
    ["kidepo1.png", "wildlife", "Rothschild's giraffes"],
    ["kiba.png", "wildlife", "Giraffe family"],
    ["rafu.png", "wildlife", "Giraffes on the savannah"],
    ["pic13.jpeg", "wildlife", "Zebras at Lake Mburo"],
    ["kipedo2.png", "wildlife", "Zebras grazing"],
    ["Queen_Elizabeth_National_Park_026.jpg", "wildlife", "Buffalo herd cooling off"],
    ["buffalos.jpeg", "wildlife", "Buffalo on the plains"],
    ["buffz.png", "wildlife", "Buffaloes in the water"],
    ["q5.png", "wildlife", "Buffalo herd, Queen Elizabeth"],
    ["Queen_Elizabeth_National_Park_008.jpg", "wildlife", "Uganda kob"],
    ["q3.png", "wildlife", "Kob on the golden plains"],
    ["Queen_Elizabeth_National_Park_005.jpg", "wildlife", "Antelope on the savannah"],
    ["crane.jpg", "wildlife", "Grey crowned crane, Uganda's national bird"],
    ["Queen_Elizabeth_National_Park_031.jpg", "wildlife", "Pelicans and storks"],
    ["Queen_Elizabeth_National_Park_042.jpg", "wildlife", "Pelicans by the shore"],
    ["q1.png", "wildlife", "Birds taking flight"],

    // Landscapes
    ["Murchison Falls,.jpg", "landscapes", "Murchison Falls"],
    ["kidepo2.png", "landscapes", "Murchison Falls from above"],
    ["pic6.jpeg", "landscapes", "The Nile forcing through the gorge"],
    ["pic5.jpeg", "landscapes", "Waterfall in the forest"],
    ["pic8.jpeg", "landscapes", "The River Nile"],
    ["niles.jpg", "landscapes", "Nile rapids"],
    ["sipi.png", "landscapes", "Sipi Falls"],
    ["discover.jpg", "landscapes", "Waterfalls in lush hills"],
    ["lake bunyonyi.jpg", "landscapes", "Lake Bunyonyi"],
    ["explore.jpg", "landscapes", "Islands of Lake Bunyonyi"],
    ["kibale3.png", "landscapes", "Crater lake near Kibale"],
    ["Kidepo Valley.jpg", "landscapes", "Kidepo Valley"],
    ["Kidepo Valley´s National Park _ Paisaje típico del….jpg", "landscapes", "Kidepo's open plains"],
    ["rwenzori.jpg", "landscapes", "Rwenzori Mountains"],
    ["snow1.png", "landscapes", "Snow on the equator, Rwenzori"],
    ["snow2.png", "landscapes", "Rwenzori valleys"],
    ["snow3.png", "landscapes", "Giant plants of the Rwenzori"],
    ["on-the-way-to-mgahinga.jpg", "landscapes", "On the way to Mgahinga"],
    ["ddi.png", "landscapes", "Misty hills of the south-west"],
    ["vana.png", "landscapes", "African sunset"],
    ["Queen_Elizabeth_National_Park_018.jpg", "landscapes", "Savannah of Queen Elizabeth"],
    ["semiliki.jpg", "landscapes", "Hot springs, Semuliki"],
    ["Unveil Uganda’s Hidden Gem_ Semuliki National….jpg", "landscapes", "Steaming springs of Semuliki"],
    ["The path to the Hot Springs of #Semuliki NP Uganda.jpg", "landscapes", "Path to the hot springs"],

    // Culture & cities
    ["Buganda dancer.jpg", "culture", "Traditional Buganda dance"],
    ["Uganda the magunju dance.jpg", "culture", "Traditional dancers"],
    ["culture.jpg", "culture", "Drumming and dance"],
    ["15 photos of Uganda's diverse wildlife and culture.jpg", "culture", "Community elders"],
    ["Uganda - Baganda.jpg", "culture", "Baganda celebration"],
    ["Uganda - 1 March - Independence from the United….jpg", "culture", "Cultural performance"],
    ["luwo.png", "culture", "Local craftsmanship"],
    ["Kampala City.jpg", "culture", "Kampala city"],
    ["town.png", "culture", "Kampala skyline"],
    ["Night view of the nile bridge in jinja.jpg", "culture", "New Nile Bridge, Jinja, by night"],

    // Adventure
    ["trekking.jpg", "adventure", "Gorilla trekking"],
    ["kidepo3.png", "adventure", "Forest hike with guides"],
    ["falls.jpg", "adventure", "Viewpoint at the falls"],
    ["r1.png", "adventure", "White water rafting on the Nile"],
    ["r2.png", "adventure", "Taking on the rapids"],
    ["r3.png", "adventure", "Rafting team in action"],
    ["r4.png", "adventure", "Paddling hard"],
    ["r5.png", "adventure", "Riding the waves"],
    ["Bujagali falls, Uganda_ Going to raft on the Nile….jpg", "adventure", "Rapids at Bujagali"],
    ["cruise.jpg", "adventure", "Boat cruise"],
    ["kazi.png", "adventure", "Kazinga Channel cruise"],
    ["kazi2.png", "adventure", "Elephants from the boat"],
    ["pic7.jpeg", "adventure", "Launch trip to Murchison Falls"],
    ["pic12.jpeg", "adventure", "On the water"],
    ["wildlife.jpg", "adventure", "Game drive among elephants"],
    ["camping.jpg", "adventure", "Lakeside camping"],
    ["queen Elizabeth.jpeg", "adventure", "Entering Queen Elizabeth National Park"],
    ["WhatsApp Image 2025-10-29 at 20.09.08.jpeg", "adventure", "Welcome to Bwindi"],

    // Lodges & stays
    ["0_16826047483832_hyena-hill-lodge__2_.jpg", "lodges", "Cosy lodge room"],
    ["pic16.jpeg", "lodges", "Pool with a view"],
    ["pic17.jpeg", "lodges", "Clifftop lodge pool"],
    ["pic18.jpeg", "lodges", "Forest lodge lounge"],
    ["pic19.jpeg", "lodges", "Lodge veranda"],
    ["cc1.png", "lodges", "Safari lodge"],
    ["cc2.png", "lodges", "Lodge at dusk"],
    ["hoz.png", "lodges", "Lodge under the stars"],
    ["ddd1.png", "lodges", "Room with a view"],
    ["ddd2.png", "lodges", "Forest cottage"],
    ["logi1.png", "lodges", "Cottage in the hills"],
    ["logi2.png", "lodges", "Bright lodge bedroom"],
    ["bb.png", "lodges", "Canopy bed"],
    ["hoz2.png", "lodges", "Breakfast is served"],
    ["dd4.png", "lodges", "Lodge dining"]
  ];

  var LABELS = { all: "All photos", wildlife: "Wildlife", primates: "Gorillas & Primates", landscapes: "Landscapes", culture: "Culture & Cities", adventure: "Adventure", lodges: "Lodges & Stays" };
  var ICONS = { all: "fa-images", wildlife: "fa-paw", primates: "fa-tree", landscapes: "fa-mountain-sun", culture: "fa-drum", adventure: "fa-person-hiking", lodges: "fa-hotel" };

  var grid = document.getElementById("albumGrid");
  var filters = document.getElementById("albumFilters");
  var current = "all";
  var visible = [];

  function src(f) { return "images/" + encodeURIComponent(f); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }

  // Filter buttons with counts
  Object.keys(LABELS).forEach(function (k) {
    var n = k === "all" ? PHOTOS.length : PHOTOS.filter(function (p) { return p[1] === k; }).length;
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.cat = k;
    b.innerHTML = '<i class="fa-solid ' + ICONS[k] + ' me-1"></i>' + LABELS[k] + '<small>' + n + '</small>';
    if (k === "all") b.classList.add("active");
    b.addEventListener("click", function () { render(k); });
    filters.appendChild(b);
  });

  function render(cat) {
    current = cat;
    filters.querySelectorAll("button").forEach(function (b) { b.classList.toggle("active", b.dataset.cat === cat); });
    if (cat === "all") {
      // Mix categories so the "All" view isn't grouped by column
      var groups = {}, order = [];
      PHOTOS.forEach(function (p) { (groups[p[1]] = groups[p[1]] || []).push(p); if (order.indexOf(p[1]) < 0) order.push(p[1]); });
      visible = [];
      for (var r = 0; visible.length < PHOTOS.length; r++) {
        order.forEach(function (k) { if (groups[k][r]) visible.push(groups[k][r]); });
      }
    } else {
      visible = PHOTOS.filter(function (p) { return p[1] === cat; });
    }
    grid.innerHTML = visible.map(function (p, i) {
      return '<button class="m-item" type="button" data-i="' + i + '" style="animation-delay:' + Math.min(i * 30, 600) + 'ms">' +
        '<img src="' + src(p[0]) + '" alt="' + esc(p[2]) + '" loading="lazy">' +
        '<span class="cap"><small>' + LABELS[p[1]] + '</small><strong>' + esc(p[2]) + '</strong></span></button>';
    }).join("");
    grid.querySelectorAll(".m-item").forEach(function (b) {
      b.addEventListener("click", function () { open(+b.dataset.i); });
    });
  }

  // Lightbox
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbTitle = document.getElementById("lbTitle");
  var lbCat = document.getElementById("lbCat");
  var lbCount = document.getElementById("lbCount");
  var idx = 0, lastFocus = null;

  function show(i) {
    idx = (i + visible.length) % visible.length;
    var p = visible[idx];
    lbImg.src = src(p[0]);
    lbImg.alt = p[2];
    lbTitle.textContent = p[2];
    lbCat.textContent = LABELS[p[1]];
    lbCount.textContent = (idx + 1) + " / " + visible.length;
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    document.getElementById("lbClose").focus();
  }
  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.getElementById("lbPrev").addEventListener("click", function () { show(idx - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { show(idx + 1); });
  document.getElementById("lbClose").addEventListener("click", function () { close(); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
  // Swipe on phones
  var sx = null;
  lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    sx = null;
  });

  // ----- Slideshow -----
  var playBtn = document.getElementById("lbPlay");
  var timerBar = document.getElementById("lbTimer");
  var playing = null;
  function setPlay(on) {
    clearInterval(playing); playing = null;
    timerBar.classList.remove("run"); void timerBar.offsetWidth;
    if (on) {
      playing = setInterval(function () { show(idx + 1); timerBar.classList.remove("run"); void timerBar.offsetWidth; timerBar.classList.add("run"); }, 3500);
      timerBar.classList.add("run");
    }
    playBtn.innerHTML = on ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    playBtn.setAttribute("aria-label", on ? "Pause slideshow" : "Play slideshow");
  }
  playBtn.addEventListener("click", function () { setPlay(!playing); });
  document.getElementById("albumShow").addEventListener("click", function () { if (visible.length) { open(0); setPlay(true); } });
  document.addEventListener("keydown", function (e) {
    if (lb.classList.contains("open") && e.key === " ") { e.preventDefault(); setPlay(!playing); }
  });
  var origClose = close;
  close = function () { setPlay(false); origClose(); };

  // ----- Shuffle -----
  document.getElementById("albumShuffle").addEventListener("click", function () {
    for (var i = PHOTOS.length - 1; i > 0; i--) { var r = Math.floor(Math.random() * (i + 1)); var tmp = PHOTOS[i]; PHOTOS[i] = PHOTOS[r]; PHOTOS[r] = tmp; }
    render(current);
    if (window.GT) GT.toast("Shuffled! Fresh view of Uganda", "fa-shuffle");
  });

  render("all");
  var total = document.getElementById("photoTotal");
  if (total) total.textContent = PHOTOS.length;
})();
