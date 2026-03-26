const menuBtn = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuBtn && menu) {
  const setExpanded = (isOpen) => {
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menu.classList.toggle("is-open", isOpen);
  };

  if (!menuBtn.hasAttribute("aria-expanded")) menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    setExpanded(!isOpen);
  });

  menu.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 860px)").matches) setExpanded(false);
    });
  });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// VDM contact widget (single image with two functional buttons)
(() => {
  if (document.querySelector(".vdm-widget")) return;

  const wrap = document.createElement("div");
  wrap.className = "vdm-widget";

  wrap.innerHTML = `
    <div class="vdm-widget__toolbar">
      <button
        type="button"
        class="vdm-widget__toggle"
        data-vdm-toggle
        aria-expanded="true"
        aria-controls="vdm-widget-panel"
        id="vdm-widget-toggle"
      >
        <span class="vdm-widget__toggle-icon" aria-hidden="true">−</span>
        <span class="sr-only">Collapse contact panel</span>
      </button>
    </div>
    <div class="vdm-widget__panel" id="vdm-widget-panel" role="group" aria-labelledby="vdm-widget-toggle">
      <img
        class="vdm-widget__img"
        src="assets/vdm-contact-widget.png"
        alt="Chat with VDM AI contact options"
        loading="lazy"
        decoding="async"
      />
      <button type="button" class="vdm-widget__hit vdm-widget__hit--chat" aria-label="Open live chat"></button>
      <a
        class="vdm-widget__hit vdm-widget__hit--wa"
        href="https://wa.me/13465466197"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp chat: +1 346 546 6197"
      ></a>
    </div>
  `;

  const openLiveChat = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
      wrap.classList.add("vdm-widget--chat-open");
      return;
    }
    window.location.href = "contact.html";
  };

  const chatHit = wrap.querySelector(".vdm-widget__hit--chat");
  if (chatHit) {
    chatHit.addEventListener("click", openLiveChat);
  }

  const toggleBtn = wrap.querySelector("[data-vdm-toggle]");
  const toggleIcon = toggleBtn && toggleBtn.querySelector(".vdm-widget__toggle-icon");
  const srOnly = toggleBtn && toggleBtn.querySelector(".sr-only");
  if (toggleBtn && toggleIcon && srOnly) {
    const setCollapsed = (collapsed) => {
      wrap.classList.toggle("vdm-widget--collapsed", collapsed);
      toggleBtn.setAttribute("aria-expanded", String(!collapsed));
      toggleIcon.textContent = collapsed ? "+" : "−";
      srOnly.textContent = collapsed ? "Expand contact panel" : "Collapse contact panel";
    };
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setCollapsed(!wrap.classList.contains("vdm-widget--collapsed"));
    });
  }

  const bumpAboveEmbeds = () => {
    if (wrap.parentNode) document.body.appendChild(wrap);
  };

  document.body.appendChild(wrap);
  bumpAboveEmbeds();
  window.addEventListener("load", bumpAboveEmbeds);
  [800, 2500, 6000].forEach((ms) => window.setTimeout(bumpAboveEmbeds, ms));
})();

// Hide the default Tawk launcher (prevents overlap)
(() => {
  const tryHide = () => {
    if (window.Tawk_API && typeof window.Tawk_API.hideWidget === "function") {
      window.Tawk_API.hideWidget();
      return true;
    }
    return false;
  };

  if (tryHide()) return;

  let attempts = 0;
  const id = window.setInterval(() => {
    attempts += 1;
    if (tryHide() || attempts > 40) window.clearInterval(id);
  }, 250);
})();

// Tawk: tuck PNG behind when chat opens; restore when minimized/ended (API names vary by embed version)
(() => {
  const wrap = document.querySelector(".vdm-widget");
  if (!wrap) return;

  const restoreLauncher = () => wrap.classList.remove("vdm-widget--chat-open");

  const chain = (key, fn) => {
    const api = window.Tawk_API;
    if (!api || typeof key !== "string") return;
    const prev = api[key];
    api[key] = function () {
      fn();
      if (typeof prev === "function") return prev.apply(this, arguments);
    };
  };

  const install = () => {
    if (!window.Tawk_API || wrap.dataset.tawkZHook) return;
    wrap.dataset.tawkZHook = "1";
    chain("onChatMaximized", () => wrap.classList.add("vdm-widget--chat-open"));
    chain("onChatStarted", () => wrap.classList.add("vdm-widget--chat-open"));
    chain("onChatMinimized", restoreLauncher);
    chain("onChatEnded", restoreLauncher);
  };

  let n = 0;
  const poll = window.setInterval(() => {
    n += 1;
    install();
    if (wrap.dataset.tawkZHook === "1" || n > 50) window.clearInterval(poll);
  }, 200);
})();

// Footer credit (site-wide)
(() => {
  const el = document.querySelector(".footer__bottom");
  if (!el) return;
  if (el.querySelector("[data-vdm-credit]")) return;

  const credit = document.createElement("span");
  credit.className = "muted";
  credit.setAttribute("data-vdm-credit", "1");
  credit.style.marginLeft = "12px";
  credit.textContent = "Chat and AI powered by VDM";

  el.appendChild(credit);
})();

/** Course cards shown on the homepage (links to full syllabi pages). */
const featured = [
  {
    title: "Cloud Computing",
    level: "10-week program",
    href: "cloud-computing.html",
    blurb:
      "Networking, IAM, compute, storage, observability, and a deployable capstone.",
  },
  {
    title: "DevOps Engineering",
    level: "10-week program",
    href: "devops-engineering.html",
    blurb:
      "CI/CD, containers, IaC, observability, secure pipelines, and reliable releases.",
  },
  {
    title: "AI for Engineers",
    level: "10-week program",
    href: "ai-for-engineers.html",
    blurb:
      "ML foundations, applied AI workflows, responsible AI, and a production-minded capstone.",
  },
];

const featuredGrid = document.getElementById("featuredCourses");
if (featuredGrid) {
  featuredGrid.innerHTML = featured
    .map(
      (c) => `
      <article class="card">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;">
          <h3 style="margin:0;">${c.title}</h3>
          <span style="color:var(--gold);font-weight:700;font-size:14px;">${c.level}</span>
        </div>
        <p style="margin-top:10px;">${c.blurb}</p>
        <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap; align-items:flex-end;">
          <a class="btn btn--ghost" href="${c.href}">View syllabus</a>
          <div class="enroll-cta enroll-cta--compact">
            <span class="enroll-cta__eyebrow">Get certified</span>
            <a class="btn btn--primary" href="contact.html">Enroll Now</a>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// Alumni carousel (homepage banner)
const alumniCard = document.querySelector("[data-alumni-carousel]");
const alumniImg = document.querySelector("[data-alumni-img]");
const alumniCaption = document.querySelector("[data-alumni-caption]");

if (alumniCard && alumniImg && alumniCaption) {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slides = [
    { src: "assets/alumni/alumni-1.jpg", caption: "Alumni spotlight" },
    { src: "assets/alumni/alumni-2.jpg", caption: "Career progress • real outcomes" },
    { src: "assets/alumni/alumni-3.jpg", caption: "Portfolio-ready projects" },
    { src: "assets/alumni/student-1.jpg", caption: "Student success story" },
  ];

  let idx = 0;
  let timer = null;
  let holding = false;

  const show = (nextIdx, { animate } = { animate: true }) => {
    idx = (nextIdx + slides.length) % slides.length;
    const s = slides[idx];

    if (animate && !prefersReducedMotion) alumniCard.classList.add("is-flipping");

    // Swap near the middle of the flip so it looks like a real "turn"
    window.setTimeout(() => {
      alumniImg.src = s.src;
      alumniCaption.textContent = s.caption;
    }, animate && !prefersReducedMotion ? 240 : 0);

    if (animate && !prefersReducedMotion) {
      window.setTimeout(() => alumniCard.classList.remove("is-flipping"), 560);
    }
  };

  const next = () => show(idx + 1);

  const start = () => {
    stop();
    if (prefersReducedMotion) return;
    timer = window.setInterval(() => {
      if (!holding) next();
    }, 3000);
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  // Click advances to next slide
  alumniCard.addEventListener("click", () => next());

  // Press + hold pauses until release (mouse/touch/pen)
  const holdOn = () => {
    holding = true;
  };
  const holdOff = () => {
    holding = false;
  };

  alumniCard.addEventListener("pointerdown", holdOn);
  alumniCard.addEventListener("pointerup", holdOff);
  alumniCard.addEventListener("pointercancel", holdOff);
  alumniCard.addEventListener("pointerleave", holdOff);

  // Start autoplay
  show(0, { animate: false });
  start();
}

const roboIntro = document.querySelector("[data-robo-intro]");
if (
  roboIntro &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  roboIntro.removeAttribute("autoplay");
  roboIntro.loop = false;
  roboIntro.pause();
}

// Alumni page: keep testimonial videos in their fixed frame (exit fullscreen if entered)
(() => {
  document.querySelectorAll("video.alumni-page-video").forEach((video) => {
    const leaveFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    };
    video.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement === video) leaveFullscreen();
    });
    video.addEventListener("webkitfullscreenchange", () => {
      if (document.webkitFullscreenElement === video) leaveFullscreen();
    });
  });
})();

// Alumni page: featured photo + thumbnail strip
(() => {
  const feat = document.querySelector("[data-alumni-feature-img]");
  const featCap = document.querySelector("[data-alumni-feature-caption]");
  const thumbs = document.querySelectorAll("[data-alumni-thumb]");
  if (!feat || thumbs.length === 0) return;

  const setActive = (activeBtn) => {
    thumbs.forEach((t) => {
      const on = Boolean(activeBtn && t === activeBtn);
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-pressed", String(on));
    });
  };

  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-full-src");
      const alt = btn.getAttribute("data-alt") || "";
      const cap = btn.getAttribute("data-caption") || "";
      if (src) feat.src = src;
      feat.alt = alt;
      if (featCap) featCap.textContent = cap;
      setActive(btn);
    });
  });
})();
