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

// Lightbox de la galerie
(function () {
  var items = document.querySelectorAll(".gallery__item img");
  if (!items.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");

  var close = document.createElement("button");
  close.className = "lightbox__close";
  close.setAttribute("aria-label", "Fermer");
  close.innerHTML = "&#10005;";

  var full = document.createElement("img");
  full.alt = "";

  var caption = document.createElement("div");
  caption.className = "lightbox__caption";

  box.appendChild(close);
  box.appendChild(full);
  box.appendChild(caption);
  document.body.appendChild(box);

  function open(item) {
    full.src = item.src;
    full.alt = item.alt || "";
    caption.textContent = item.closest("figure").querySelector("figcaption").textContent;
    box.classList.add("lightbox--open");
    document.body.style.overflow = "hidden";
  }

  function hide() {
    box.classList.remove("lightbox--open");
    document.body.style.overflow = "";
  }

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      open(item);
    });
  });

  box.addEventListener("click", function (e) {
    if (e.target === box || e.target === full || e.target === caption) hide();
  });
  close.addEventListener("click", hide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hide();
  });
})();
