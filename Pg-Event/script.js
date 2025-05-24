const evento = {
    titulo: "Alok A live (IT feels like)",
    descricao: [
        "Description",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    ],
    fotos: [
        "img/icon-alok.png",
        "img/icon-alok.png",
        "img/icon-alok.png",
        "img/icon-alok.png",
    ],
    video: "https://www.youtube.com/embed/fO0uwKqxtBg?si=w_6IiJESXs7iUkoV",
    data: "27 Mar/2025 — 11:00pm",
    local: "The Perl Terrace, 46th St, New York, NY",
    mapa: "https://maps.google.com/maps?q=New York&t=&z=13&ie=UTF8&iwloc=&output=embed",
    ingressos: [
        { tipo: "Ticket", preco: "R$ 20" },
        { tipo: "VIP", preco: "R$ 20" }
    ],
    contato: {
        site: "www.alok.com.br",
        email: "contato@alok.com.br",
        telefone: "+55 11 999999999",
        redes: [
            { nome: '<i class="fab fa-twitter"></i>', url: "https://twitter.com/alok" },
            { nome: '<i class="fab fa-instagram"></i>', url: "https://instagram.com/alok" },
            { nome: '<i class="fab fa-facebook"></i>', url: "https://facebook.com/alok" }
        ]
    },
    categorias: ["Festa eletrônica", "Show"]
};

function renderMain() {
    const main = document.getElementById("main-content");

    const descricao = `
    <div class="card-custom">
      <h2>${evento.titulo}</h2>
      ${evento.descricao.map(p => `<p>${p}</p>`).join("")}
    </div>
  `;

    const galeria = `
    <div class="card-custom">
      <h5>Fotos</h5>
      <div class="d-flex flex-wrap">
        ${evento.fotos.map(f => `<img src="${f}" class="gallery-thumb mb-2">`).join("")}
      </div>
    </div>
  `;

    const video = `
    <div class="card-custom">
      <h5>Vídeo</h5>
      <div class="video-container">
        <iframe src="${evento.video}" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;

    const contato = `
    <div class="card-custom">
      <h5>Contato & Mídias sociais</h5>
      <p>🌐 ${evento.contato.site}</p>
      <p>📧 ${evento.contato.email}</p>
      <p>📞 ${evento.contato.telefone}</p>
      <div>
        ${evento.contato.redes.map(r => `<a href="${r.url}" class="text-white mr-2" target="_blank">${r.nome}</a>`).join("")}
      </div>
    </div>
  `;

    const categorias = `
    <div class="card-custom">
      ${evento.categorias.map(cat => `<button class="btn btn-outline-light btn-sm mr-2 mb-1">${cat}</button>`).join("")}
    </div>
  `;

    main.innerHTML = descricao + galeria + video + contato + categorias;
}

function renderSidebar() {
    const side = document.getElementById("sidebar-content");

    const data = `
    <div class="card-custom">
      <h6>📅 Data</h6>
      <p>${evento.data}</p>
      <button class="btn btn-primary btn-sm">Adicionar ao calendário</button>
    </div>
  `;

    const local = `
    <div class="card-custom">
      <h6>📍 Local</h6>
      <p>${evento.local}</p>
      <iframe src="${evento.mapa}" width="100%" height="200" frameborder="0"></iframe>
    </div>
  `;

    const ingressos = `
    <div class="card-custom">
      <h6>🎟️ Ingressos</h6>
      ${evento.ingressos.map(i => `<p>${i.tipo}: <strong>${i.preco}</strong></p>`).join("")}
      <button class="btn btn-purple btn-block">Comprar ingresso</button>
    </div>
  `;

    const newsletter = `
    <div class="card-custom">
      <h6>📬 Newsletter</h6>
      <input type="email" class="form-control mb-2" placeholder="Digite seu e-mail">
      <button class="btn btn-primary btn-block">Inscrever-se</button>
    </div>
  `;

    side.innerHTML = data + local + ingressos + newsletter;
}

renderMain();
renderSidebar();