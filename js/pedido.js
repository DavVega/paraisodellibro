function enviarPedido() {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const distrito = document.getElementById("distrito").value;
  const detalle = document.getElementById("detalle").value;

  const mensaje = `Hola, quiero hacer un pedido.%0A
Nombre: ${nombre}%0A
Teléfono: ${telefono}%0A
Distrito: ${distrito}%0A
Detalle: ${detalle}`;

  const numero = "50600000000"; // CAMBIAR POR TU NÚMERO
  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}
