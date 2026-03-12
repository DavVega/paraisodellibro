const URL_JSON = "https://raw.githubusercontent.com/DavVega/paraisodellibro/master/libros.json";

let librosGlobal = [];

/* ===== CARGAR LIBROS ===== */
async function cargarLibros() {
  try {
    const res = await fetch(URL_JSON);
    librosGlobal = await res.json();
    mostrarLibros(librosGlobal);
  } catch (error) {
    console.error("Error cargando libros:", error);
  }
}


function clickFuera(event) {
  const modal = document.getElementById("modalLibro");
  const contenido = document.querySelector(".modal-contenido");

  // Si el click fue directamente en el fondo (no dentro del contenido)
  if (event.target === modal) {
    cerrarVistaPrevia();
  }
}
function mostrarLibros(lista) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  if (!lista || lista.length === 0) {
    catalogo.innerHTML = "<p>No se encontraron libros.</p>";
    return;
  }

  lista.forEach(libro => {
    if (!libro.tituloLibro) return;

    // 1. Determine the CSS class based on status
    const esAgotado = (libro.estatus || "").toLowerCase() === "agotado";
    const claseEstatus = esAgotado ? "estado-tag agotado" : "estado-tag disponible";

    catalogo.innerHTML += `
      <div class="libro" onclick="mostrarVistaPrevia('${libro.tituloLibro}', '${libro.autorLibro || ""}', '${libro.precio || ""}', '${libro.categoria || ""}', 'images/libros/${libro.imagen}', '${libro.uso || ""}')">
        
        <img 
          src="images/libros/${libro.imagen}"
          alt="${libro.tituloLibro}"
          onerror="this.src='images/libros/default.jpg'"
        >

        <h3>${libro.tituloLibro}</h3>
        <p>Autor: ${libro.autorLibro || ""}</p>
        <p><strong>Precio: ₡${libro.precio || ""}</strong></p>
        <p>${libro.categoria || ""}</p>
        
        <!-- 2. Apply the dynamic class here -->
        <div class="${claseEstatus}">${libro.estatus || ""}</div>
      </div>
    `;
  });
}


function mostrarVistaPrevia(titulo, autor, precio, categoria, imagen, uso) {

  // 1. Fill modal text and image
  document.getElementById("modalTitulo").innerText = titulo;
  document.getElementById("modalAutor").innerText = autor;
  document.getElementById("modalPrecio").innerText = "₡" + precio;
  document.getElementById("modalCategoria").innerText = categoria;
  document.getElementById("modalImagen").src = imagen;
  document.getElementById("modalUso").innerText = uso;

  // 2. Configure WhatsApp Button
  const telefono = "50672679082"; 
  // Use the function arguments (titulo and precio) here, NOT "libro.titulo"
  const mensaje = `Hola, me interesa comprar el libro: *${titulo}* que tiene un precio de ₡${precio}.`;
  
  // Corrected URL syntax
  const urlWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  
  // 3. Assign to the button
  const btnLink = document.getElementById("btnComprarWhatsapp");
  if (btnLink) {
    btnLink.href = urlWhatsapp;
  }

  // 4. Show the modal
  document.getElementById("modalLibro").style.display = "flex";
}



function cerrarVistaPrevia() {
  document.getElementById("modalLibro").style.display = "none";
}
function filtrar(cat) {

  const texto = document
    .getElementById("buscador")
    .value
    .toLowerCase()
    .trim();

  let resultados = librosGlobal;

  // Filtrar por categoría
  if (cat !== "todos") {
    resultados = resultados.filter(l =>
      (l.categoria || "").toLowerCase() === cat.toLowerCase()
    );
  }

  // Filtrar por búsqueda
  if (texto !== "") {
    resultados = resultados.filter(l =>
      (l.tituloLibro || "").toLowerCase().includes(texto)
    );
  }

  mostrarLibros(resultados);
}
/* ===== BUSCAR (MEJORADO) ===== */
function buscar() {
  const texto = document
    .getElementById("buscador")
    .value
    .toLowerCase()
    .trim();

  const resultados = librosGlobal.filter(l =>
    (l.tituloLibro || "").toLowerCase().includes(texto)
  );

  mostrarLibros(resultados);
}


function nextStep(stepNumber) {
  // 1. If moving to the final step (Pago), calculate everything first
  if (stepNumber === 3) {
    if (typeof calcularTotal === "function") {
      calcularTotal(); 
    } else {
      console.error("The function calcularTotal() is missing in app.js");
    }
  }

  // 2. Hide all steps
  document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
  document.querySelectorAll('.step').forEach(tab => tab.classList.remove('active'));

  // 3. Show requested step
  const nextStepEl = document.getElementById('step' + stepNumber);
  const nextTabEl = document.getElementById('step' + stepNumber + '-tab');

  if (nextStepEl && nextTabEl) {
    nextStepEl.classList.add('active');
    nextTabEl.classList.add('active');
  }
  
  // 4. Scroll to top of form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Get the button
const mybutton = document.getElementById("scrollTopBtn");

// Show the button when scrolling down 300px from the top
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};

// Smooth scroll to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function nextStep(stepNumber) {
  // 1. Seleccionamos el paso actual
  const pasoActual = document.querySelector('.form-step.active');
  const campos = pasoActual.querySelectorAll('input, textarea, select');
  
  // 2. Validamos cada campo del paso actual
  let esValido = true;
  campos.forEach(campo => {
    if (!campo.checkValidity()) {
      campo.reportValidity(); // Muestra el mensaje de error del navegador
      esValido = false;
    }
  });

  // 3. Solo si todo es válido, avanzamos al siguiente paso
  if (esValido) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step').forEach(t => t.classList.remove('active'));

    document.getElementById('step' + stepNumber).classList.add('active');
    document.getElementById('step' + stepNumber + '-tab').classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ===== INICIAR ===== */
cargarLibros();

document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");

  if (buscador) {
    buscador.addEventListener("input", buscar);
  }
});


