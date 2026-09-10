/* North Haven Ragdoll Cattery — interactions */

(function () {
  "use strict";

  // Mobile navigation
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  function setNavOpen(open) {
    if (!navToggle || !mainNav) return;
    mainNav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!mainNav.classList.contains("open"));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNavOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (!mainNav.classList.contains("open")) return;
      if (mainNav.contains(event.target) || navToggle.contains(event.target)) return;
      setNavOpen(false);
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth > 1100) setNavOpen(false);
      },
      { passive: true }
    );
  }

  // Active nav on scroll — homepage only (inner pages use data-page active class)
  const isHome = (document.body.getAttribute("data-page") || "") === "home";
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (isHome && sections.length && navLinks.length) {
    function updateActiveNav() {
      const scrollY = window.scrollY + 100;
      let current = "home";

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollY) {
          current = section.getAttribute("id");
        }
      });

      const map = {
        home: "index.html",
        "available-kittens": "available-kittens.html",
        about: "about.html",
        health: "health-care.html",
        blog: "blog.html",
        reviews: "reviews.html",
        waitlist: "waitlist.html",
        adoption: "adoption-process.html",
        contact: "contact.html",
      };

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        current = "contact";
      }

      const activeHref = map[current] || "index.html";
      navLinks.forEach(function (link) {
        const href = link.getAttribute("href") || "";
        link.classList.toggle("active", href === activeHref || (current === "home" && href === "index.html"));
      });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // Testimonial slider
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  let currentSlide = 0;
  let autoTimer;

  function goToSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === currentSlide);
    });
    if (dotsContainer) {
      dotsContainer.querySelectorAll("button").forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentSlide);
        dot.setAttribute("aria-selected", i === currentSlide ? "true" : "false");
      });
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, 6000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (slides.length && dotsContainer) {
    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Go to review " + (i + 1));
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", function () {
        goToSlide(i);
        startAuto();
      });
      dotsContainer.appendChild(dot);
    });

    if (nextBtn) nextBtn.addEventListener("click", function () { nextSlide(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prevSlide(); startAuto(); });

    const slider = document.querySelector(".testimonial-slider");
    if (slider) {
      slider.addEventListener("mouseenter", stopAuto);
      slider.addEventListener("mouseleave", startAuto);
    }

    startAuto();
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
