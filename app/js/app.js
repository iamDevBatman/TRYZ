async function loadHTML(id, url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Erro ao carregar ${url}: ${resp.status}`);
  document.getElementById(id).innerHTML = await resp.text();
}

function loadCSS(href) {
  document.getElementById("page-style").href = href;
}

function initDraggableCarousel(selector, multiplier = 2) {
  const carousel = document.querySelector(selector);
  if (!carousel) return;
  let isDragging = false,
    startX = 0,
    scrollLeft = 0;

  function dragStart(e) {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX || e.touches[0].pageX;
    scrollLeft = carousel.scrollLeft;
  }
  function dragging(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    carousel.scrollLeft = scrollLeft - (x - startX) * multiplier;
  }
  function dragStop() {
    isDragging = false;
    carousel.classList.remove("dragging");
  }

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchstart", dragStart, { passive: false });
  carousel.addEventListener("touchmove", dragging, { passive: false });
  carousel.addEventListener("touchend", dragStop);
  carousel.addEventListener("dragover", (e) => e.preventDefault());
}

function initSpotlight() {
  const spotlight = document.querySelector(".spotlight");
  if (!spotlight) return;
  let posX = 50,
    posY = 50;
  let velX = (Math.random() - 0.6) * 0.6;
  let velY = (Math.random() - 0.6) * 0.6;

  (function animate() {
    posX += velX;
    posY += velY;
    if (posX < 0 || posX > 100) velX *= -1;
    if (posY < 0 || posY > 100) velY *= -1;
    spotlight.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(155,17,129,0.5) 0%, rgba(65,14,99,0.3) 50%, transparent 60%)`;
    requestAnimationFrame(animate);
  })();
}

function initMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  if (!menuToggle) return;
  const body = document.body;
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    body.classList.toggle("menu-open");
    menuToggle.textContent = body.classList.contains("menu-open") ? "✕" : "☰";
  });
  document.querySelectorAll(".dropdown > a").forEach((toggle) => {
    toggle.addEventListener(
      "mouseenter",
      () =>
        window.innerWidth > 992 && toggle.parentElement.classList.add("active")
    );
    toggle.parentElement.addEventListener(
      "mouseleave",
      () => window.innerWidth > 992 && toggle.classList.remove("active")
    );
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parent = toggle.parentElement;
        const wasActive = parent.classList.contains("active");
        document
          .querySelectorAll(".dropdown")
          .forEach((d) => d.classList.remove("active"));
        if (!wasActive) parent.classList.add("active");
      }
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      body.classList.remove("menu-open");
      menuToggle.textContent = "☰";
      window.innerWidth <= 992 &&
        document
          .querySelectorAll(".dropdown")
          .forEach((d) => d.classList.remove("active"));
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      body.classList.remove("menu-open");
      menuToggle.textContent = "☰";
      document
        .querySelectorAll(".dropdown")
        .forEach((d) => d.classList.remove("active"));
    }
  });
}

const evento = {
  titulo: "Alok A live (IT feels like)",
  descricao: [
    "Description",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    "It is a long established fact that a reader will be distracted by the readable content...",
  ],
  fotos: Array(8).fill("img/icon-alok.png"),
  video: "https://www.youtube.com/embed/hKvm6K7rfM4?si=Lvql1p1Eu7FZt0cw",
  data: "27 Mar/2025",
  hora: "11:00pm",
  local: ["The Perl Terrace", "46th St, New York, NY"],
  mapa: "https://maps.google.com/maps?q=New York&output=embed",
  ingressos: [
    { tipo: "Ticket", preco: "R$ 20", antigo: "R$ 30" },
    { tipo: "VIP", preco: "R$ 20", antigo: "R$ 30" },
  ],
  contato: {
    site: "www.alok.com.br",
    email: "contato@alok.com.br",
    telefone: "+55 11 999999999",
    redes: [
      {
        nome: "twitter/alok",
        icone: "fab fa-twitter",
        url: "https://twitter.com/alok",
      },
      {
        nome: "instagram/alok",
        icone: "fab fa-instagram",
        url: "https://instagram.com/alok",
      },
      {
        nome: "facebook/alok",
        icone: "fab fa-facebook",
        url: "https://facebook.com/alok",
      },
    ],
  },
  categorias: ["Festa eletrônica", "Show"],
};

function renderMain() {
  const main = document.getElementById("main-content");
  const html = `
    <div class="card box mb-0 p-3">
      <h2 class="text-white font-weight-bold">${evento.titulo}</h2>
      ${evento.descricao
        .map((p) => `<p class="text-white-50">${p}</p>`)
        .join("")}
    </div>
    <div class="card box mb-0 p-3">
      <h5 class="text-white font-weight-bold mb-3">Fotos</h5>
      <div class="carousel-container">
        <div class="carousel-track hide-scrollbar" id="carousel-fotos">
          ${evento.fotos
            .map(
              (src) =>
                `<div class="carousel-item"><img src="${src}" class="carousel-img" alt=""></div>`
            )
            .join("")}
        </div>
        <div class="carousel-fade"></div>
        <button class="carousel-arrow" onclick="scrollCarousel()"><img src="img/seta-brilhante.png" alt="" style="height:50px;"></button>
      </div>
    </div>
    <div class="card box mb-0 p-3">
      <h5 class="text-white">Vídeo</h5>
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="${
          evento.video
        }" allowfullscreen></iframe>
      </div>
    </div>
    <div class="card box mb-0 p-3 text-white">
      <h5>Contato & Mídias sociais</h5>
      <div class="row">
        <div class="col-md-6">
          <p><i class="fas fa-globe mr-2"></i>${evento.contato.site}</p>
          <p><i class="fab fa-whatsapp mr-2"></i>${evento.contato.telefone}</p>
          ${evento.contato.redes
            .slice(0, 2)
            .map((r) => `<p><i class="${r.icone} mr-2"></i>${r.nome}</p>`)
            .join("")}
        </div>
        <div class="col-md-6">
          <p><i class="fas fa-envelope mr-2"></i>${evento.contato.email}</p>
          <p><i class="fab fa-whatsapp mr-2"></i>${evento.contato.telefone}</p>
          <p><i class="${evento.contato.redes[2].icone} mr-2"></i>${
    evento.contato.redes[2].nome
  }</p>
        </div>
      </div>
    </div>
    <div class="botoes card box mb-0 p-3">
      ${evento.categorias
        .map(
          (cat) =>
            `<button class="btn2 btn btn-outline-light btn-sm mr-2">${cat}</button>`
        )
        .join("")}
    </div>
  `;
  main.innerHTML = html;
}

function renderSidebar() {
  const side = document.getElementById("sidebar-content");
  side.innerHTML = `
    <div class="btn0 card box mb-0 p-3 text-white">
      <div class="icon-calendario"><img src="./img/calendario.png" alt=""></div>
      <h3>${evento.data}</h3>
      <h4>${evento.hora}</h4>
      <button class="btn1 btn btn-sm btn-purple">Adicione em seu calendário</button>
    </div>
    <div class="card box mb-0 p-3 text-white">
      <h5>Local</h5>
      ${evento.local.map((l) => `<p class="text-white-50">${l}</p>`).join("")}
      <div class="embed-responsive embed-responsive-4by3">
        <iframe class="maps embed-responsive-item" src="${
          evento.mapa
        }" allowfullscreen></iframe>
      </div>
    </div>
    <div class="card box mb-0 p-3 text-white">
      <h5 class="font-weight-bold mb-3">Ingressos</h5>
      ${evento.ingressos
        .map(
          (i) =>
            `<div class="d-flex justify-content-between align-items-center mb-2"><span>${i.tipo}</span><span><strong>${i.preco}</strong><span class="text-muted ml-1" style="text-decoration:line-through;">${i.antigo}</span></span></div>`
        )
        .join("")}
      <button class="btn btn-purple btn-block d-flex justify-content-center align-items-center mt-3" style="border-radius:50px;"><i class="fas fa-ticket-alt mr-2"></i> Comprar ingresso</button>
    </div>
    <div class="card box mb-0 py-0 p-3 text-white">
      <h6>Subscribe to our newsletter</h6>
      <div class="form-group"><input type="email" class="form-control" placeholder="Preencha com seu e-mail"></div>
      <button class="btn btn-purple btn-block">Inscrever-se</button>
    </div>
  `;
}

function scrollCarousel() {
  document
    .getElementById("carousel-fotos")
    .scrollBy({ left: 120, behavior: "smooth" });
}

const routes = {
  home: {
    html: "pages/home.html",
    css: "css/home.css",
    onLoad: () => {
      initSpotlight();
      [
        ".card-list",
        ".card-list1",
        ".card-list2",
        ".card-list3",
        ".card-list4",
        ".card-list5",
      ].forEach((sel) => initDraggableCarousel(sel));
    },
  },
  event: {
    html: "pages/event.html",
    css: "css/event.css",
    onLoad: () => {
      renderMain();
      renderSidebar();
      initSpotlight();
      initDraggableCarousel("#carousel-fotos", 1.5);
    },
  },
};

async function navigate(page) {
  if (!routes[page]) return;
  const { html, css, onLoad } = routes[page];
  loadCSS(css);
  await loadHTML("content", html);
  onLoad && onLoad();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadHTML("header", "components/header.html");
  await loadHTML("footer", "components/footer.html");

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-page]");
    if (!link) return;
    e.preventDefault();
    navigate(link.dataset.page);
  });

  initMenu();

  navigate("home");
});
