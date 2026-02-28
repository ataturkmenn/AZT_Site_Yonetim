// Yıl otomatik
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobil menü aç/kapat
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.style.display === "flex";
    nav.style.display = isOpen ? "none" : "flex";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Menü linkine basınca menüyü kapat (mobil)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 920) {
        nav.style.display = "none";
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Ekran büyüyünce menü kaybolmasın (desktop'ta hep açık kalsın)
  const syncNav = () => {
    if (window.innerWidth > 920) {
      nav.style.display = "flex";
      navToggle.setAttribute("aria-expanded", "false");
    } else {
      nav.style.display = "none";
      navToggle.setAttribute("aria-expanded", "false");
    }
  };
  window.addEventListener("resize", syncNav);
  syncNav();
}

// Accordion
// Accordion (FAQ + Services) - sadece kendi grubunda diğerlerini kapatır
document.querySelectorAll(".accordion, .svcAccordion").forEach((wrap) => {
  wrap.querySelectorAll(".acc, .svcAcc").forEach((item) => {
    const btn = item.querySelector(".acc__btn, .svcAcc__btn");
    const panel = item.querySelector(".acc__panel, .svcAcc__panel");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
      const isOpen = panel.style.maxHeight && panel.style.maxHeight !== "0px";

      // aynı wrapper içindeki diğerlerini kapat
      wrap.querySelectorAll(".acc__panel, .svcAcc__panel").forEach(p => {
        p.style.maxHeight = null;
        const parent = p.closest(".acc, .svcAcc");
        if (parent) parent.classList.remove("is-open");
        const b = parent?.querySelector(".acc__btn, .svcAcc__btn");
        if (b) b.setAttribute("aria-expanded", "false");
      });

      // bunu aç/kapat
      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      } else {
        panel.style.maxHeight = null;
        item.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });
});


// Scroll reveal (IntersectionObserver) + delay
const revealEls = document.querySelectorAll("[data-reveal]");

if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.getAttribute("data-delay");
        if (delay) e.target.style.transitionDelay = delay + "ms";

        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
}

// Header scroll effect
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

/* ================= HERO SCROLL PARALLAX ================= */
(() => {
  const hero = document.querySelector(".hero--parallax");
  if (!hero) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        const ratio = Math.min(scrolled / window.innerHeight, 1);

        // YAVAŞ ve premium değerler
        const translateY = ratio * 40; // px
        const scale = 1.05 - ratio * 0.05; // zoom out

        hero.style.setProperty(
          "--hero-parallax",
          `translateY(${translateY}px) scale(${scale})`
        );

       
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
})();

// İlk açılış animasyonu (SaaS hissi)
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-loaded");
});

// Modallarda (Açılır pencerelerde) dışarıdaki siyah boşluğa tıklayınca kapatma özelliği
const modals = document.querySelectorAll('.saas-modal');
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
});
