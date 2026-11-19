(function () {
  "use strict";

  // Menu mobile
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("nav--open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("nav--open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Ombre de l'en-tête au défilement
  var header = document.querySelector(".header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("header--scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Apparition progressive des éléments
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealables.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      observer.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("reveal--visible");
    });
  }
})();

// Lightbox de la galerie (navigation : flèches gauche/droite, Échap pour fermer)
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery__item img"));
  if (!items.length) return;

  var current = 0;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");

  var close = document.createElement("button");
  close.className = "lightbox__close";
  close.setAttribute("aria-label", "Fermer");
  close.innerHTML = "&#10005;";

  var prev = document.createElement("button");
  prev.className = "lightbox__nav lightbox__nav--prev";
  prev.setAttribute("aria-label", "Photo précédente");
  prev.innerHTML = "&#10094;";

  var next = document.createElement("button");
  next.className = "lightbox__nav lightbox__nav--next";
  next.setAttribute("aria-label", "Photo suivante");
  next.innerHTML = "&#10095;";

  var full = document.createElement("img");
  full.alt = "";

  var caption = document.createElement("div");
  caption.className = "lightbox__caption";

  var counter = document.createElement("div");
  counter.className = "lightbox__counter";

  box.appendChild(close);
  box.appendChild(prev);
  box.appendChild(full);
  box.appendChild(next);
  box.appendChild(caption);
  box.appendChild(counter);
  document.body.appendChild(box);

  function show(i) {
    current = (i + items.length) % items.length;
    var item = items[current];
    full.src = item.src;
    full.alt = item.alt || "";
    caption.textContent = item.closest("figure").querySelector("figcaption").textContent;
    counter.textContent = current + 1 + " / " + items.length;
  }

  function open(i) {
    show(i);
    box.classList.add("lightbox--open");
    document.body.style.overflow = "hidden";
  }

  function hide() {
    box.classList.remove("lightbox--open");
    document.body.style.overflow = "";
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () {
      open(i);
    });
  });

  prev.addEventListener("click", function (e) {
    e.stopPropagation();
    show(current - 1);
  });
  next.addEventListener("click", function (e) {
    e.stopPropagation();
    show(current + 1);
  });
  close.addEventListener("click", hide);

  box.addEventListener("click", function (e) {
    if (e.target === box || e.target === full) hide();
  });

  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("lightbox--open")) return;
    if (e.key === "Escape") hide();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
