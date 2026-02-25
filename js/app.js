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

/* ===== MOSTRAR LIBROS ===== */
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
      <div class="libro">
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

/* ===== FILTRAR ===== */
function filtrar(cat) {
  if (cat === "todos") {
    mostrarLibros(librosGlobal);
  } else {
    mostrarLibros(librosGlobal.filter(l => l.categoria === cat));
  }
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
/* ===== INICIAR ===== */
cargarLibros();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("buscador")
    .addEventListener("input", buscar);
});
