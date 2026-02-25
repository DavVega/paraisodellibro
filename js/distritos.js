const distritos = [
  "San José Centro",
  "Escazú",
  "Desamparados",
  "Alajuela Centro",
  "Heredia Centro",
  "Cartago Centro",
  "Liberia",
  "Puntarenas",
  "Limón"
];

window.onload = function() {
  const select = document.getElementById("distrito");
  if(select){
    distritos.forEach(d => {
      select.innerHTML += `<option value="${d}">${d}</option>`;
    });
  }
};
