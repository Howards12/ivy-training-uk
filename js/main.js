const menuBtn = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => menu.classList.toggle("is-open"));
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/** Course cards shown on the homepage (links to full syllabi pages). */
const featured = [
  {
    title: "Cloud Computing",
    level: "10-week program",
    href: "cloud-computing.html",
    blurb:
      "Networking, IAM, compute, storage, observability, and a deployable capstone.",
    tags: ["Cloud", "Labs", "Capstone"],
  },
  {
    title: "DevOps Engineering",
    level: "10-week program",
    href: "devops-engineering.html",
    blurb:
      "CI/CD, containers, IaC, observability, secure pipelines, and reliable releases.",
    tags: ["DevOps", "CI/CD", "IaC"],
  },
  {
    title: "AI for Engineers",
    level: "10-week program",
    href: "ai-for-engineers.html",
    blurb:
      "ML foundations, applied AI workflows, responsible AI, and a production-minded capstone.",
    tags: ["AI", "Applied", "Capstone"],
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
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;">
          ${c.tags.map((t) => `<span class="badge">${t}</span>`).join("")}
        </div>
        <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
          <a class="btn btn--ghost" href="${c.href}">View syllabus</a>
          <a class="btn btn--primary" href="contact.html">Enroll Now</a>
        </div>
      </article>
    `
    )
    .join("");
}
