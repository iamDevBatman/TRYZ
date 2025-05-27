const evento = {
  titulo: "Alok A live (IT feels like)",
  descricao: [
    "Description",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  ],
  fotos: [
    "img/icon-alok.png",
    "img/icon-alok.png",
    "img/icon-alok.png",
    "img/icon-alok.png",
    "img/icon-alok.png",
    "img/icon-alok.png",
    "img/icon-alok.png",
    "img/icon-alok.png",
  ],
  video: "https://www.youtube.com/embed/hKvm6K7rfM4?si=Lvql1p1Eu7FZt0cw",
  data: "27 Mar/2025",
  hora: "11:00pm",
  local: ["The Perl Terrace", "46th St, New York, NY"],
  mapa: "https://maps.google.com/maps?q=New York&t=&z=13&ie=UTF8&iwloc=&output=embed",
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

  const descricao = `
    <div class="card box mb-0 p-3">
      <h2 class="text-white font-weight-bold">${evento.titulo}</h2>
      ${evento.descricao
        .map((p) => `<p class="text-white-50">${p}</p>`)
        .join("")}
    </div>
  `;

  const galeria = `
  <div class="card box mb-0 p-3">
    <h5 class="text-white font-weight-bold mb-3">Fotos</h5>
    <div class="carousel-container">
      <div class="carousel-track hide-scrollbar" id="carousel-fotos">
        ${evento.fotos
          .map(
            (foto) => `
          <div class="carousel-item">
            <img src="${foto}" class="carousel-img" alt="Foto">
          </div>
        `
          )
          .join("")}
      </div>
      <div class="carousel-fade"></div>
      <button class="carousel-arrow" onclick="scrollCarousel()">
        <img src="img/seta-brilhante.png" alt="Seta" style="height: 50px;">
      </button>
    </div>
  </div>
`;

  const video = `
    <div class="card box mb-0 p-3">
      <h5 class="text-white">Vídeo</h5>
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="${evento.video}" allowfullscreen></iframe>
      </div>
    </div>
  `;

  const contato = `
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
  `;

  const categorias = `
    <div class="botoes card box mb-0 p-3">
      ${evento.categorias
        .map(
          (cat) =>
            `<button class="btn2 btn btn-outline-light btn-sm mr-2">${cat}</button>`
        )
        .join("")}
    </div>
  `;

  main.innerHTML = descricao + galeria + video + contato + categorias;
}

function enableCarouselDrag(carouselElement) {
  let isDown = false;
  let startX;
  let scrollLeft;

  carouselElement.addEventListener("mousedown", (e) => {
    isDown = true;
    carouselElement.classList.add("dragging");
    startX = e.pageX - carouselElement.offsetLeft;
    scrollLeft = carouselElement.scrollLeft;
  });

  carouselElement.addEventListener("mouseleave", () => {
    isDown = false;
    carouselElement.classList.remove("dragging");
  });

  carouselElement.addEventListener("mouseup", () => {
    isDown = false;
    carouselElement.classList.remove("dragging");
  });

  carouselElement.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselElement.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselElement.scrollLeft = scrollLeft - walk;
  });

  carouselElement.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carouselElement.offsetLeft;
    scrollLeft = carouselElement.scrollLeft;
  });

  carouselElement.addEventListener("touchend", () => {
    isDown = false;
  });

  carouselElement.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carouselElement.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselElement.scrollLeft = scrollLeft - walk;
  });
}

function scrollCarousel() {
  const container = document.getElementById("carousel-fotos");
  container.scrollBy({ left: 120, behavior: "smooth" });
}

function renderSidebar() {
  const side = document.getElementById("sidebar-content");

  const data = `
    <div class="btn0 card box mb-0 p-3 text-white">
      <div class="icon-calendario"><img src="./img/calendario.png" alt="icon-calendario" class="icon-calendario"></div>
      <h3>${evento.data}</h3>
      <h4>${evento.hora}</h4>
      <button class="btn1 btn btn-sm btn-purple">Adicione em seu calendário</button>
    </div>
  `;

  const local = `
    <div class="card box mb-0 p-3 text-white">
      <h5>Local</h5>
      ${evento.local.map((p) => `<p class="text-white-50">${p}</p>`).join("")}
      <div class="embed-responsive embed-responsive-4by3">
        <iframe class="maps embed-responsive-item" src="${
          evento.mapa
        }" allowfullscreen></iframe>
      </div>
    </div>
  `;

  const ingressos = `
  <div class="card box mb-0 p-3 text-white">
    <h5 class="font-weight-bold mb-3">Ingressos</h5>
    ${evento.ingressos
      .map(
        (i) => `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span>${i.tipo}</span>
        <span>
          <strong>${i.preco}</strong>
          <span class="text-muted ml-1" style="text-decoration: line-through;">${i.antigo}</span>
        </span>
      </div>
    `
      )
      .join("")}
    <button class="btn btn-purple btn-block d-flex justify-content-center align-items-center mt-3" style="border-radius: 50px;">
      <i class="fas fa-ticket-alt mr-2"></i> Comprar ingresso
    </button>
  </div>
`;

  const newsletter = `
    <div class="card box mb-0 py-0 p-3 text-white">
      <h6>Subscribe to our newsletter</h6>
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Preencha com seu e-mail">
      </div>
      <button class="btn btn-purple btn-block">Inscrever-se</button>
    </div>
  `;

  side.innerHTML = data + local + ingressos + newsletter;
}

renderMain();
renderSidebar();
enableCarouselDrag(document.getElementById("carousel-fotos"));
