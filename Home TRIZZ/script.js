document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.querySelector(".card-list");
    
    if (!carrossel) return; // Se não encontrar o carrossel, sai da função
  
    let isDragging = false, startX, startScrollLeft;
  
    const dragStart = (e) => {
      isDragging = true;
      carrossel.classList.add("dragging");
      startX = e.pageX || e.touches[0].pageX;
      startScrollLeft = carrossel.scrollLeft;
    }
  
    const dragging = (e) => {
      if(!isDragging) return;
      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX;
      const walk = (x - startX) * 2; // Multiplicador para velocidade do arraste
      carrossel.scrollLeft = startScrollLeft - walk;
    }
  
    const dragStop = () => {
      isDragging = false;
      carrossel.classList.remove("dragging");
    }
  
    // Eventos de mouse
    carrossel.addEventListener("mousedown", dragStart);
    carrossel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  
    // Eventos touch
    carrossel.addEventListener("touchstart", dragStart, { passive: false });
    carrossel.addEventListener("touchmove", dragging, { passive: false });
    carrossel.addEventListener("touchend", dragStop);
  
    // Impedir que a página role quando arrastar o carrossel
    carrossel.addEventListener('dragover', (e) => e.preventDefault());
  });