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

catalogo.innerHTML += `
  <div class="libro" onclick="mostrarVistaPrevia('${libro.tituloLibro}', '${libro.autorLibro || ""}', '${libro.precio || ""}', '${libro.categoria || ""}', 'images/libros/${libro.imagen}')">
    
    <img 
      src="images/libros/${libro.imagen}"
      alt="${libro.tituloLibro}"
      onerror="this.src='images/libros/default.jpg'"
    >

    <h3>${libro.tituloLibro}</h3>
    <p>${libro.autorLibro || ""}</p>
    <p><strong>₡${libro.precio || ""}</strong></p>
    <p>${libro.categoria || ""}</p>
  </div>
`;
  });
}
/*function mostrarVistaPrevia(titulo, autor, precio, categoria, imagen) {
  document.getElementById("modalTitulo").innerText = titulo;
  document.getElementById("modalAutor").innerText = autor;
  document.getElementById("modalPrecio").innerText = "₡" + precio;
  document.getElementById("modalCategoria").innerText = categoria;
  document.getElementById("modalImagen").src = imagen;

      // 1. Llenas los datos actuales
    document.getElementById("modalTitulo").innerText = libro.titulo;
    document.getElementById("modalPrecio").innerText = libro.precio;
    // ... resto de tus asignaciones ...

    // 2. Configuras el botón de WhatsApp
    const telefono = "50672679082"; // Sustituye por tu número con código de país, sin el + ni espacios
    const mensaje = `Hola, me interesa comprar el libro: *${libro.titulo}* que tiene un precio de ${libro.precio}.`;
    
    // El mensaje debe estar codificado para URLs
    const urlWhatsapp = `https://wa.me{telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // 3. Asignas el enlace al botón
    document.getElementById("btnComprarWhatsapp").href = urlWhatsapp;
    
    // Finalmente muestras el modal
    document.getElementById("modalLibro").style.display = "block";
  document.getElementById("modalLibro").style.display = "flex";
}*/

function mostrarVistaPrevia(titulo, autor, precio, categoria, imagen) {
  // 1. Fill modal text and image
  document.getElementById("modalTitulo").innerText = titulo;
  document.getElementById("modalAutor").innerText = autor;
  document.getElementById("modalPrecio").innerText = "₡" + precio;
  document.getElementById("modalCategoria").innerText = categoria;
  document.getElementById("modalImagen").src = imagen;

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
  // 1. Hide all steps
  document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
  document.querySelectorAll('.step').forEach(tab => tab.classList.remove('active'));

  // 2. Show requested step
  document.getElementById('step' + stepNumber).classList.add('active');
  document.getElementById('step' + stepNumber + '-tab').classList.add('active');
  
  // 3. Scroll to top of form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== INICIAR ===== */
cargarLibros();

document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");

  if (buscador) {
    buscador.addEventListener("input", buscar);
  }
});


