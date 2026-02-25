const URL_JSON = "https://raw.githubusercontent.com/DavVega/paraisodellibro/master/libros.json";
let librosGlobal = [];

async function cargarLibros() {
  const res = await fetch(URL_JSON);
  librosGlobal = await res.json();
  mostrarLibros(librosGlobal);
}

function mostrarLibros(lista) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";
  lista.forEach(libro => {
    catalogo.innerHTML += `
      <div class="libro">
        <h3>${libro.tituloLibro}</h3>
        <p>${libro.autorLibro}</p>
        <p><strong>₡${libro.precio}</strong></p>
        <p>${libro.categoria}</p>
      </div>
    `;
  });
}

function filtrar(cat) {
  if(cat === "todos") return mostrarLibros(librosGlobal);
  mostrarLibros(librosGlobal.filter(l => l.categoria === cat));
}

function buscar() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  mostrarLibros(librosGlobal.filter(l =>
    l.tituloLibro.toLowerCase().includes(texto)
  ));
}

cargarLibros();
