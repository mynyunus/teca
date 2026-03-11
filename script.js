document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"], .site-footer a[href^="#"]');
const backToTop = document.getElementById("backToTop");
const yearNode = document.getElementById("currentYear");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const closeMobileMenu = () => {
  if (!siteNav || !navToggle) return;
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.innerHTML = '<svg class="icon"><use href="#icon-menu"></use></svg>';
};

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("is-open");
    navToggle.innerHTML = isExpanded
      ? '<svg class="icon"><use href="#icon-menu"></use></svg>'
      : '<svg class="icon"><use href="#icon-close"></use></svg>';
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const offset = (header?.offsetHeight || 84) + 18;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    closeMobileMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!siteNav || !navToggle) return;
  if (window.innerWidth >= 720) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (!siteNav.contains(target) && !navToggle.contains(target)) {
    closeMobileMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 720) {
    closeMobileMenu();
  }
});

const onScroll = () => {
  if (header) {
    header.classList.toggle("is-shrunk", window.scrollY > 30);
  }

  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 520);
  }
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}

const galleryFilterButtons = Array.from(document.querySelectorAll("[data-gallery-filter]"));
const galleryPanels = Array.from(document.querySelectorAll("[data-gallery-panel]"));

const setActiveGalleryPanel = (key) => {
  galleryFilterButtons.forEach((button) => {
    const isActive = button.getAttribute("data-gallery-filter") === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  galleryPanels.forEach((panel) => {
    const isTarget = panel.getAttribute("data-gallery-panel") === key;
    panel.classList.toggle("is-filtered-hidden", !isTarget);
  });
};

if (galleryFilterButtons.length > 0 && galleryPanels.length > 0) {
  galleryFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-gallery-filter");
      if (!key) return;
      setActiveGalleryPanel(key);
    });
  });

  const defaultKey = galleryFilterButtons[0].getAttribute("data-gallery-filter");
  if (defaultKey) setActiveGalleryPanel(defaultKey);
}

const academyGrid = document.querySelector(".gallery-group-academy [data-collapsible-grid]");
const academyGalleryToggle = document.getElementById("academyGalleryToggle");
const academyGalleryCount = document.getElementById("academyGalleryCount");
const teamGrid = document.querySelector(".gallery-group-team [data-collapsible-grid]");
const teamGalleryToggle = document.getElementById("teamGalleryToggle");
const teamGalleryCount = document.getElementById("teamGalleryCount");
const eventsGrid = document.querySelector(".gallery-group-events [data-collapsible-grid]");
const eventsGalleryToggle = document.getElementById("eventsGalleryToggle");
const eventsGalleryCount = document.getElementById("eventsGalleryCount");

const initCollapsibleGallery = (grid, toggle, count) => {
  if (!grid || !toggle || !count) return;
  const totalItems = grid.querySelectorAll(".gallery-item").length;
  const initialVisible = Number.parseInt(grid.getAttribute("data-initial-visible") || "4", 10);
  let expanded = false;

  const updateGalleryView = () => {
    grid.classList.toggle("is-collapsed", !expanded);
    toggle.setAttribute("aria-expanded", String(expanded));

    if (expanded) {
      toggle.textContent = "Show Less";
      count.textContent = `Showing all ${totalItems} photos`;
      return;
    }

    const visibleCount = Math.min(initialVisible, totalItems);
    toggle.textContent = "Show All";
    count.textContent = `Showing ${visibleCount} of ${totalItems} photos`;
  };

  if (totalItems <= initialVisible) {
    grid.classList.remove("is-collapsed");
    toggle.hidden = true;
    count.textContent = `Showing all ${totalItems} photos`;
  } else {
    toggle.addEventListener("click", () => {
      expanded = !expanded;
      updateGalleryView();
      if (!expanded) {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    updateGalleryView();
  }
};

initCollapsibleGallery(academyGrid, academyGalleryToggle, academyGalleryCount);
initCollapsibleGallery(teamGrid, teamGalleryToggle, teamGalleryCount);
initCollapsibleGallery(eventsGrid, eventsGalleryToggle, eventsGalleryCount);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const allTriggers = Array.from(document.querySelectorAll("[data-lightbox-trigger]"));

let activeTriggers = allTriggers;
let activeIndex = 0;

const isElementVisible = (element) =>
  !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);

const getScopedTriggers = (trigger) => {
  const grid = trigger.closest(".gallery-grid");
  const scoped = grid ? Array.from(grid.querySelectorAll("[data-lightbox-trigger]")) : allTriggers;
  const visibleScoped = scoped.filter(isElementVisible);
  return visibleScoped.length > 0 ? visibleScoped : scoped;
};

const setLightboxContent = (index) => {
  const trigger = activeTriggers[index];
  if (!trigger || !lightboxImage || !lightboxCaption) return;
  const src = trigger.getAttribute("data-src") || "";
  const caption = trigger.getAttribute("data-caption") || "Gallery image";
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
};

const openLightbox = (index) => {
  if (!lightbox) return;
  activeIndex = index;
  setLightboxContent(activeIndex);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const nextLightbox = () => {
  if (activeTriggers.length === 0) return;
  activeIndex = (activeIndex + 1) % activeTriggers.length;
  setLightboxContent(activeIndex);
};

const prevLightbox = () => {
  if (activeTriggers.length === 0) return;
  activeIndex = (activeIndex - 1 + activeTriggers.length) % activeTriggers.length;
  setLightboxContent(activeIndex);
};

allTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    activeTriggers = getScopedTriggers(trigger);
    const index = activeTriggers.indexOf(trigger);
    openLightbox(index >= 0 ? index : 0);
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxNext) lightboxNext.addEventListener("click", nextLightbox);
if (lightboxPrev) lightboxPrev.addEventListener("click", prevLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") nextLightbox();
  if (event.key === "ArrowLeft") prevLightbox();
});
