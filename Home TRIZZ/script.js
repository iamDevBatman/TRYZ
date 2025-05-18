document.addEventListener("DOMContentLoaded", () => {
  const initDraggableCarousel = (selector) => {
    const carrossel = document.querySelector(selector);
    if (!carrossel) return;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const dragStart = (e) => {
      isDragging = true;
      carrossel.classList.add("dragging");
      startX = e.pageX || e.touches[0].pageX;
      startScrollLeft = carrossel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX;
      const walk = (x - startX) * 2;
      carrossel.scrollLeft = startScrollLeft - walk;
    };

    const dragStop = () => {
      isDragging = false;
      carrossel.classList.remove("dragging");
    };

    carrossel.addEventListener("mousedown", dragStart);
    carrossel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    carrossel.addEventListener("touchstart", dragStart, { passive: false });
    carrossel.addEventListener("touchmove", dragging, { passive: false });
    carrossel.addEventListener("touchend", dragStop);

    carrossel.addEventListener("dragover", (e) => e.preventDefault());
  };

  initDraggableCarousel(".card-list");
  initDraggableCarousel(".card-list1");
  initDraggableCarousel(".card-list2");
  initDraggableCarousel(".card-list3");
  initDraggableCarousel(".card-list4");
  initDraggableCarousel(".card-list5");
});

const spotlight = document.querySelector(".spotlight");

let posX = 50;
let posY = 50;
let velX = (Math.random() - 0.6) * 0.6;
let velY = (Math.random() - 0.6) * 0.6;

function animateSpotlight() {
  posX += velX;
  posY += velY;

  if (posX < 0 || posX > 100) velX *= -1;
  if (posY < 0 || posY > 100) velY *= -1;

  spotlight.style.background = `
    radial-gradient(circle at ${posX}% ${posY}%,
      rgba(155, 17, 129, 0.5) 0%,
      rgba(65, 14, 99, 0.3) 50%,
      transparent 60%
    )
  `;

  requestAnimationFrame(animateSpotlight);
}

animateSpotlight();

const hamburgerBtn = document.getElementById("hamburger-btn");
const nav = document.getElementById("main-nav");
const overlay = document.getElementById("overlay-menu");

hamburgerBtn.addEventListener("click", function () {
  nav.classList.toggle("open");
  overlay.classList.toggle("active");
  // Bloqueia scroll do body quando menu aberto
  document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
});

// Fecha menu clicando fora
overlay.addEventListener("click", function () {
  nav.classList.remove("open");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Dropdown em mobile
document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      let li = btn.closest(".dropdown");
      li.classList.toggle("open");
    }
  });
});
