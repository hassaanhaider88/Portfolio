// Custom cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + "px";
  cursor.style.top = my - 6 + "px";
});

function animateRing() {
  rx += (mx - rx - 20) * 0.12;
  ry += (my - ry - 20) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2.5)";
    ring.style.transform = "scale(1.5)";
    ring.style.opacity = "0.2";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    ring.style.transform = "scale(1)";
    ring.style.opacity = "0.5";
  });
});

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.05}s`;
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
  });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});



const btn = document.getElementById("themeToggle");

btn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

import ProjectsData from "./ProjectsData.js";

// this is for Projects page 
// Generate project cards
const Projects = ProjectsData.map((product) => {
  return `<div class="project-card">
      <div class="project-num">${product.number}</div>
      <div class="project-title">${product.title}</div>
      <div class="project-date">${product.date}</div>
      <p class="project-desc">${product.description}</p>
      <div class="project-tech">
        ${product.technologies.map((tech) => `<span class="tech-pill">${tech}</span>`).join("")}
      </div>
      <div class="project-links">
        <a href="${product.links.github}" target="_blank" class="proj-link">GitHub</a>
        <a href="${product.links.live}" target="_blank" class="proj-link">Live Demo</a>
      </div>
    </div>`;
});

// The special "Have a project?" card
const endCard = `
<div
  class="project-card"
  style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: linear-gradient(135deg, #0f1a02 0%, #0a0a0a 100%);
    border-color: rgba(200, 241, 53, 0.15);
  "
>
  <div
    style="
      font-family: 'Syne', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 20px;
       color : white;
    "
  >
    Have a project <br /><span
      style="
        color: var(--accent);
        font-family: 'Instrument Serif', serif;
        font-style: italic;
        font-weight: 400;
      "
      >in mind?</span
    >
  </div>
  <p
    style="
      font-size: 0.72rem;
      color: #888;
      line-height: 1.8;
      margin-bottom: 32px;
      
    "
  >
    Let's collaborate and build something exceptional together.
  </p>
  <a href="https://wa.me/923437117831" target="_blank"  class="btn-primary">Start a Conversation →</a>
</div>
`;

// Append all project cards and then the end card
document.getElementById("ProjectsGridForProjectPage").innerHTML = Projects.join("") + endCard;