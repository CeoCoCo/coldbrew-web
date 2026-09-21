const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const moodButtons = document.querySelectorAll("[data-set-mood]");
const revealItems = document.querySelectorAll(".reveal");
const surveyButton = document.getElementById("surveyButton");
const toast = document.getElementById("toast");

function closeMenu() {
  mainNav?.classList.remove("open");
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const open = mainNav?.classList.toggle("open");
  body.classList.toggle("menu-open", Boolean(open));
  menuToggle.setAttribute("aria-expanded", String(Boolean(open)));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mood = button.dataset.setMood;
    if (!mood) return;

    body.dataset.mood = mood;

    moodButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

let toastTimer;

function showToast(message) {
  if (!toast) return;
  if (message) toast.firstChild.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

surveyButton?.addEventListener("click", () => {
  const url = surveyButton.dataset.surveyUrl?.trim();

  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  showToast("Chưa có link khảo sát. ");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
