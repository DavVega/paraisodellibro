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
/* ===== INICIAR ===== */
cargarLibros();

document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");

  if (buscador) {
    buscador.addEventListener("input", buscar);
  }
});
