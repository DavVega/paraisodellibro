const URL_JSON = "https://raw.githubusercontent.com/DavVega/paraisodellibro/master/libros.json";

function enviarPedido() {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const provincia = document.getElementById("provincia").value;
  const canton = document.getElementById("canton").value;
  const detalle = document.getElementById("detalle").value;

  const mensaje = `Hola, quiero hacer un pedido.%0A
Nombre: ${nombre}%0A
Teléfono: ${telefono}%0A
provincia: ${provincia}%0A
canton: ${canton}%0A

Detalle: ${detalle}`;

  const numero = "50672679082"; // CAMBIAR POR TU NÚMERO
  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
}

var esGAM=-1;
var subtotal=0;
var total=0;
var costoEnvio=0;
var regionSeleccionada='';
var esFisico="no";
var igual = false;

// Clave para encriptar y desencriptar
const key = 'Ngsk1982';
var encryptado ='';
 
    function cargarCantones() {
        const provinciaSeleccionada = document.querySelector('#provincia').value;
        const cantones = cantonesPorProvincia.filter(function(elemento) {
	  return elemento.nombre === provinciaSeleccionada;
	})[0].cantones;
	var cantonx = document.getElementById("canton");

        // Limpiar el select de cantones
        canton.innerHTML = "";

        // Agregar las opciones de cantones
        if (cantones.length === 0) {
            canton.innerHTML = "<option value=''>No hay cantones disponibles</option>";
        } else {
            cantones.forEach(function(canton) {
                const option = document.createElement("option");
                option.value = canton;
                option.textContent = canton;
                cantonx.appendChild(option);
            });
        }
    }
function mostrarOpcionesEnvio() {
  var opcionEnvioFisico = document.querySelector('input[name="opcionFisico"]:checked').value;
  var dropdownContainer = document.getElementById("dropdownEnvioContainer");
  var dropdownNotaFisicoContainer = document.getElementById("dropdownNotaFisicoContainer");

  if (opcionEnvioFisico === "no") {

  var selectEnvio = document.getElementById("opcionesEnvio");
  
   // Crear un nuevo elemento de opci�n
   var nuevaOpcion = document.createElement("option");
  
   while (selectEnvio.options.length > 0) {
    	selectEnvio.remove(0);
     }

    // Establecer el valor y texto de la opci�n Correos
   nuevaOpcion.value = "Correos de Costa Rica";
   nuevaOpcion.textContent = "Correos de Costa Rica";
   selectEnvio.appendChild(nuevaOpcion);

    //*************************************
    // Establecer el valor y texto de la opci�n Motorista
    //*************************************
	
    dropdownEnvioContainer.style.display = "block"; // Muestra el dropdown si no se selecciona env�o f�sico
    dropdownNotaFisicoContainer.style.display = "none"; // muestra la nota de envio fisico
    esFisico="no";
  } else {
    dropdownEnvioContainer.style.display = "none"; // Oculta el dropdown si se selecciona env�o f�sico
    dropdownNotaFisicoContainer.style.display = "block"; // muestra la nota de envio fisico
    esFisico="si";
  }
   calcularTotal();
}

function ocultarOpcionesEnvio() {
  var opcionEnvioFisico = document.querySelector('input[name="opcionFisico"]:checked').value;
  var dropdownContainer = document.getElementById("dropdownEnvioContainer");
  var dropdownNotaFisicoContainer = document.getElementById("dropdownNotaFisicoContainer");

  if (opcionEnvioFisico === "si") {
    dropdownEnvioContainer.style.display = "none"; // Oculta la nota de envio fisico
    dropdownNotaFisicoContainer.style.display = "block"; // 
    esFisico="si";
  }else{
    dropdownEnvioContainer.style.display = "block"; 
    dropdownNotaFisicoContainer.style.display = "none"; // muestra la nota de envio fisico
    esFisico="no";
	}

   calcularTotal();
}

 function validarSeleccion(index) {
      var tituloLibroSel = document.querySelector('#tituloLibro'+index).value;
     var errorMsg = document.getElementById("error-msg");
          
	//limpiar mensage
	errorMsg.style.display = "none";

       for (var i = 1; i < 6; i++) {
      var Libros = document.querySelector("#tituloLibro"+i).value;

        if (Libros === tituloLibroSel && i!==index ) {
          igual = true;
        }
      }

      if (igual) {
          errorMsg.style.display = "block";
        
        //alert("Ya selecciono este libro. Por favor escoja otro libro :)");
        igual=false;
      }else{
	rellenarCamposFP(index);
          errorMsg.style.display = "none";
	} 
    }

function isMobile() {
    if (sessionStorage.desktop)
        return false;
    else if (localStorage.mobile)
        return true;
    var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
    for (var i in mobile)
        if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;
    return false;
}

const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://web.whatsapp.com/';
const urlMobile = 'whatsapp://';
const destinatario = '+50672679082';

function actualizarMetodosPago() {
  regionSeleccionada = document.getElementById("provincia").value;
  var metodosPagoList = document.getElementById("metodo_pago");
  metodosPagoList.innerHTML = ""; // Limpiar la lista
 if (regionSeleccionada === "Cartago") {
  esGAM = 1 ;
    agregarMetodoPago("Efectivo");
 }
 if (regionSeleccionada === "Alajuela" || regionSeleccionada === "San Jose" || regionSeleccionada === "Heredia" ) {
  esGAM = 1 ;
 }
 if (regionSeleccionada === "Puntarenas" || regionSeleccionada === "Guanacaste" || regionSeleccionada === "Limon" ) {
  esGAM = 0 ;
}
    agregarMetodoPago("Sinpe Movil");
    agregarMetodoPago("Transferencia Bancaria");
    
    calcularTotal(); //recalcular costo
    cargarCantones();	
}

function agregarMetodoPago(metodoPago) {
var option = document.createElement("option");
  option.value = metodoPago;
  option.textContent = metodoPago;
  document.getElementById("metodo_pago").appendChild(option); 
 }
       // Funci�n para encriptar texto
        function encrypt(inputText) {
              const encryptedText = CryptoJS.AES.encrypt(JSON.stringify(inputText), key).toString();
             let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedText))
	    return encData;	
        }


/*function cargarLibros(index) {
    var categoriaSeleccionada = document.getElementById("categoria"+index).value;

var librosSeleccionados = libros.filter(function(elemento) {


  return elemento.categoria === categoriaSeleccionada;
});
    var libroDropdown = document.getElementById("tituloLibro"+index);

    // Limpiar el dropdown
    libroDropdown.innerHTML = "";

         var opcionLibro = document.createElement("option");
            opcionLibro.value = "Seleccione un libro";
            opcionLibro.text = "Seleccione un libro";
            libroDropdown.add(opcionLibro);

    if (librosSeleccionados) {
        // Crear opciones para cada libro en la categor�a seleccionada
        librosSeleccionados.forEach(function(libro) {

            var opcionLibro = document.createElement("option");
            opcionLibro.value = libro.tituloLibro + " - " + libro.autorLibro;
            opcionLibro.text = libro.tituloLibro + " - " + libro.autorLibro;
           if(libro.estatus==="Disponible"){
            libroDropdown.add(opcionLibro);
           }
        });
    } else {
        // Si no hay libros para la categor�a seleccionada, mostrar un mensaje
        var opcionVacia = document.createElement("option");
        opcionVacia.text = "No hay libros disponibles";
        libroDropdown.add(opcionVacia);
    }
}*/
function cargarLibros(index) {

  if (!librosGlobal.length) {
    console.warn("Libros aún no cargados");
    return;
  }

  var categoriaSeleccionada =
    document.getElementById("categoria" + index).value;

  var libroDropdown =
    document.getElementById("tituloLibro" + index);

  libroDropdown.innerHTML =
    "<option value=''>Seleccione un libro</option>";

  var librosFiltrados = librosGlobal.filter(function(libro) {
    return libro.categoria === categoriaSeleccionada;
  });

  librosFiltrados.forEach(function(libro) {

    if (libro.estatus === "Disponible") {

      var option = document.createElement("option");
      option.value = libro.tituloLibro + " - " + libro.autorLibro;
      option.textContent = libro.tituloLibro + " - " + libro.autorLibro;

      libroDropdown.appendChild(option);
    }
  });
}
function rellenarCamposFP(index) {
  var libroList= document.getElementById("tituloLibro"+index);
  var formatoSpan = document.getElementById("formato"+index);
  var precioSpan = document.getElementById("precio"+index);

  // Obteniendo el valor seleccionado del libro
  var libroSeleccionado = libroList.value.split("-")[0];

//buscamos el libro
libroB = librosGlobal.filter(function(elemento) {

  return elemento.tituloLibro.trim() === libroSeleccionado.trim();
});

// Rellenando los campos con los detalles del libro seleccionado
  formatoSpan.value = libroB[0].formato;

  precioSpan.value= libroB[0].precio;

calcularTotal();
}
function calcularTotal() {
  // Obtener los valores de los inputs
  var precio1 = parseFloat(document.getElementById("precio1").value) || 0;
  var precio2 = parseFloat(document.getElementById("precio2").value) || 0;
  var precio3 = parseFloat(document.getElementById("precio3").value) || 0;
  var precio4 = parseFloat(document.getElementById("precio4").value) || 0;
  var precio5 = parseFloat(document.getElementById("precio5").value) || 0;

  var metodoSeleccionado = document.getElementById("metodo_pago").value;


	  // Mostrar el total en el elemento <p>
	console.log(esGAM, regionSeleccionada)
	if(esGAM===1){
		costoEnvio = 2500;
	}
	if(regionSeleccionada === "Guanacaste" || regionSeleccionada === "Puntarenas" || regionSeleccionada === "Limon" ){
		costoEnvio = 3500;
	}
	console.log(esFisico)
	if(esFisico==='si'){
		costoEnvio = 0;
	}

	  // Sumar los precios
 	 subtotal = precio1 + precio2 + precio3 + precio4 +precio5;

	 // Sumar los precios
	total = subtotal + costoEnvio;

	document.getElementById("costoEnvio").textContent = "Envio: CRC" + costoEnvio.toFixed(2) + ' (max 1Kg incluido empaquetado)';
	document.getElementById("subtotal").textContent = "SubTotal:  CRC" + subtotal.toFixed(2);
	document.getElementById("total").textContent = "Total: CRC" + total.toFixed(2);
}

function nextStep(stepNumber) {
  // 1. Validar campos del paso actual antes de avanzar
  const pasoActual = document.querySelector('.form-step.active');
  const camposRequeridos = pasoActual.querySelectorAll('[required]');
  
  let valido = true;
  camposRequeridos.forEach(campo => {
    if (!campo.value || !campo.checkValidity()) {
      campo.reportValidity();
      valido = false;
    }
  });

  if (!valido) return; // Detener si hay campos vacíos

  // 2. Lógica para mostrar los costos en el último paso
  if (stepNumber === 3) {
    if (typeof calcularTotal === "function") {
      calcularTotal(); 
      generarResumenLibros(); // Función para llenar la lista visual
    }
  }

  // 3. Cambiar de paso visualmente
  document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
  document.querySelectorAll('.step').forEach(tab => tab.classList.remove('active'));

  document.getElementById('step' + stepNumber).classList.add('active');
  document.getElementById('step' + stepNumber + '-tab').classList.add('active');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generarResumenLibros() {
    const listaResumen = document.getElementById("listaLibrosResumen");
    listaResumen.innerHTML = ""; // Limpiar antes de llenar

    let hayLibros = false;

    for (let i = 1; i <= 5; i++) {
        const titulo = document.getElementById("tituloLibro" + i).value;
        const precio = document.getElementById("precio" + i).value;

        if (titulo && titulo !== "" && titulo !== "Seleccione un libro") {
            const li = document.createElement("li");
            li.innerHTML = `<span>${titulo}</span> <strong>${precio}</strong>`;
            listaResumen.appendChild(li);
            hayLibros = true;
        }
    }

    if (!hayLibros) {
        listaResumen.innerHTML = "<li>No has seleccionado ningún libro.</li>";
    }
}

/************************************
LIBROS LIBROS
************************************/
var librosGlobal =  []

_cargarLibros();

async function _cargarLibros() {
  try {
    const res = await fetch(URL_JSON);
    librosGlobal = await res.json();
  } catch (error) {
    console.error("Error cargando libros:", error);
  }
}

if (formulario) {
    document.addEventListener('submit', (event) => {
        event.preventDefault();
        // ... rest of your code
    });
} else {

  document.addEventListener('submit', (event) => {
    event.preventDefault()
      // At the top of your script
      const buttonSubmit = document.getElementById('submit');

      // Inside your event listener
      if (buttonSubmit) {
          buttonSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Procesando...';
          buttonSubmit.disabled = true;
      } else {
          console.error("No se encontró el botón con ID 'submit' en el HTML.");
      }

    setTimeout(() => {
        let nombre = document.querySelector('#nombre').value
        //let apellidos = document.querySelector('#apellidos').value
        let email = document.querySelector('#email').value
        let telefono = document.querySelector('#telefono').value

        let provincia= document.querySelector('#provincia').value
	let canton = document.querySelector('#canton').value

        let direccion = document.querySelector('#direccion').value

        let codigoPostal= document.querySelector('#codigo_postal').value

        let metodoPago= document.querySelector('#metodo_pago').value

        let libro1= document.querySelector('#tituloLibro1').value

        let libro2= document.querySelector('#tituloLibro2').value

        let libro3= document.querySelector('#tituloLibro3').value

        let libro4= document.querySelector('#tituloLibro4').value

        let libro5= document.querySelector('#tituloLibro5').value 

        let subtotal= document.querySelector('#subtotal').textContent

        let costoEnvio= document.querySelector('#costoEnvio').textContent

        let total= document.querySelector('#total').textContent

    esFisico = document.querySelector('input[name="opcionFisico"]:checked').value;

	let opcionEnvio = document.getElementById("opcionesEnvio").value;
let tipoEnvioText = '';

    if(esFisico==='no'){
	tipoEnvioText = '%0A' + opcionEnvio ;
}else{
	tipoEnvioText =  '%0A'+ 'Entrega fisica Cartago Centro los Sabados / Domingo de 1:00pm - 5:00pm'+'%0A';
}

var numeroOrden = '' + new Date().getFullYear() + ('0' + (new Date().getMonth() + 1)).slice(-2) + ('0' + new Date().getDate()).slice(-2) + Math.floor(Math.random() * 900) + 100;

var libro1text = (libro1!=='')?'%0A  -> ' + libro1 + ' - precio:  �' + document.querySelector('#precio1').value:'';
var libro2text = (libro2!=='')?'%0A  -> ' + libro2 + ' - precio:  �' + document.querySelector('#precio2').value:'';
var libro3text = (libro3!=='')?'%0A  -> ' + libro3 + ' - precio:  �' + document.querySelector('#precio3').value:'';
var libro4text = (libro4!=='')?'%0A  -> ' + libro4 + ' - precio:  �' + document.querySelector('#precio4').value:'';
var libro5text = (libro5!=='')?'%0A  -> ' + libro5 + ' - precio:  �' + document.querySelector('#precio5').value:'';

/* let mensaje = 'send?phone=' + destinatario+ '&text=%0A***************************************************%0A_Formulario Compra PDL_%0A ************************************************%0A *numeroOrden*: '+numeroOrden +'%0A%0A*�Cual es tu nombre?*%0A' + nombre + '%0A*�Cu�l es tu correo electr�nico?*%0A' + email.replace(/(?<=\b)[\w\.-]+(?=@)/g, 'XXXX')+ '%0A*Telefono:*%0A' + telefono.replace(/(?<=^\d{4})\d+/g, 'XXXX') + '%0A*�De donde eres?*%0A' + canton +' - '+ provincia + '%0A*�Tu direccion exacta?*%0A' + direccion.substring(0, 10)+'...' + '%0A*Codigo Postal:*%0A' + codigoPostal + '%0A*Tu pedido en Libros son los siguientes:*%0A' + libro1text + libro2text + libro3text + libro4text + libro5text +'%0A%0A*El pago de tu pedido se realizara en:*%0A' +
 metodoPago + '%0A*Deseas retirar en Fisico?*%0A' + esFisico +'%0A*Tu pedido se enviara por:*%0A' + tipoEnvioText +'%0A***************************************************%0A*Detalle del pago pendiente:*%0A***************************************************%0A' + '%0A*' + subtotal + '*%0A%0A*' + costoEnvio + '*%0A%0A*' + total + '*%0A';
*/
// Construccion del mensaje en formato ASCII Limpio
let mensaje = `------------------------------------
--- PARAISO DEL LIBRO - PEDIDO ---
------------------------------------

ORDEN NUMERO: #${numeroOrden}

DATOS DEL CLIENTE
- Nombre: ${nombre}
- Telefono: ${telefono.replace(/(?<=^\d{4})\d+/g, 'XXXX')}
- Email: ${email.replace(/(?<= \b)[\w\.-]+(?=@)/g, 'XXXX')}

ENTREGA Y UBICACION
- Provincia: ${provincia}
- Canton: ${canton}
- Direccion: ${direccion.substring(0, 30)}...
- Codigo Postal: ${codigoPostal}
- Retiro Fisico: ${esFisico.toUpperCase()}
- Metodo Envio: ${tipoEnvioText.replace('%0A', '').trim()}

DETALLE DEL PEDIDO
${libro1text}${libro2text}${libro3text}${libro4text}${libro5text}

PAGO Y TOTALES
- Metodo: ${metodoPago}

------------------------------------
RESUMEN DE CUENTA
------------------------------------
- ${subtotal}
- ${costoEnvio}
- TOTAL: ${total}

------------------------------------
Solicitud generada en paraisodellibro.net`;


// Abrir WhatsApp en pestaña nueva
//window.open(urlFinal, "_blank");

 var mensajeencrypt = numeroOrden;
     mensajeencrypt += '_' + nombre
     mensajeencrypt += '_' + telefono
     mensajeencrypt += '_' + email
     mensajeencrypt += '_' + provincia
     mensajeencrypt += '_' + canton
     mensajeencrypt += '_' + codigoPostal
     mensajeencrypt += '_' + direccion
     mensajeencrypt += '_' + metodoPago
     mensajeencrypt += '_' + esFisico
     mensajeencrypt += '_' + tipoEnvioText
     mensajeencrypt += '_' + libro1text
     mensajeencrypt += '_' + libro2text
     mensajeencrypt += '_' + libro3text
     mensajeencrypt += '_' + libro4text
     mensajeencrypt += '_' + libro5text
     mensajeencrypt += '_' + subtotal
     mensajeencrypt += '_' + costoEnvio
     mensajeencrypt += '_' + total

     // Usamos encodeURIComponent para que el simbolo de Colon y espacios funcionen
  let urlFinal = "https://wa.me/" + destinatario.replace('+', '') + "?text=" + encodeURIComponent(mensaje);

        if(isMobile()) {
            window.open(urlFinal + '%0A *REQUEST TOKEN*:%0A' + encrypt(mensajeencrypt), '_blank')
        }else{
            window.open(urlFinal + '%0A *REQUEST TOKEN*:%0A' + encrypt(mensajeencrypt), '_blank')
        }
        buttonSubmit.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar WhatsApp'
        buttonSubmit.disabled = false
    }, 3000);
});
}

// Get the button
const mybutton = document.getElementById("scrollTopBtn");

// Only run the logic if the button exists on the current page
if (mybutton) {
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            mybutton.style.opacity = "1";
            mybutton.style.pointerEvents = "auto";
            mybutton.style.display = "block"; // Required if you don't use opacity-only
        } else {
            mybutton.style.opacity = "0";
            mybutton.style.pointerEvents = "none";
        }
    };
}

// Smooth scroll function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/************************************
FIN LIBROS
************************************/
var cantonesPorProvincia =  [
        {
            "nombre": "San Jose",
            "cantones": [
   		"San Jos� central",
        	"Escaz�",
        	"Desamparados",
        	"Puriscal",
        	"Tarraz�",
        	"Aserr�",
        	"Mora",
        	"Goicoechea",
        	"Santa Ana",
        	"Alajuelita",
        	"V�zquez de Coronado",
        	"Acosta",
        	"Tib�s",
        	"Moravia",
        	"Montes de Oca",
        	"Turrubares",
        	"Dota",
        	"Curridabat",
        	"P�rez Zeled�n"  
          ]
        },
        {
            "nombre": "Alajuela",
            "cantones": [
		"Alajuela central",
        	"San Ram�n",
	        "Grecia",
        	"Atenas",
        	"Naranjo",
        	"Palmares",
        	"Po�s",
        	"Orotina",
        	"San Carlos",
        	"Zarcero",
        	"Valverde Vega",
        	"Upala",
        	"Los Chiles",
        	"Guatuso",
        	"R�o Cuarto"          
	  ]
        },
        {
            "nombre": "Cartago",
            "cantones": [
                "Cartago central",
                "Paraiso",
                "La Union",
                "Jimenez",
                "Turrialba",
                "Alvarado",
                "Oreamuno",
                "El Guarco"
            ]
        },
        {
            "nombre": "Heredia",
            "cantones": [
                "Heredia central",
                "Barva",
                "Santo Domingo",
                "Santa Barbara",
                "San Rafael",
                "San Isidro",
                "Belen",
                "Flores",
                "San Pablo",
                "Sarapiqui"
            ]
        },
        {
            "nombre": "Guanacaste",
            "cantones": [
                "Liberia",
                "Nicoya",
                "Santa Cruz",
                "Bagaces",
                "Carrillo",
                "Canas",
                "Abangares",
                "Tilaran",
                "Nandayure",
                "La Cruz",
                "Hojancha"
            ]
        },
        {
            "nombre": "Puntarenas",
            "cantones": [
                "Puntarenas Central",
		"Quepos",
                "Esparza",
                "Buenos Aires",
                "Montes de Oro",
                "Osa",
                "Golfito",
                "Coto Brus",
                "Parrita",
                "Corredores",
                "Garabito"
            ]
        },
        {
            "nombre": "Limon",
            "cantones": [
                "Limon central",
	        "Pococi",
                "Siquirres",
                "Talamanca",
                "Matina",
                "Guacimo"
            ]
        }
    ]

