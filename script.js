// ===================================
// Vianova - Script principal
// ===================================

alert("JavaScript funcionando");
console.log("Vianova cargada correctamente");

// Mensaje de bienvenida
window.addEventListener("load", function () {
    console.log("Sitio cargado correctamente");
});

// ===================================
// Carrito de compras
// ===================================

let carrito = [];
let total = 0;


function agregarProducto(nombre, precio) {

    let productoExistente =
        carrito.find(item => item.nombre === nombre);

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }

    actualizarCarrito();
}


function actualizarCarrito() {

    const lista = document.getElementById("listaCarrito");
    const totalVisual = document.getElementById("total");

    if (!lista || !totalVisual) return;

    lista.innerHTML = "";

    total = 0;

    carrito.forEach((item, indice) => {

        total += item.precio * item.cantidad;

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${item.nombre}</strong>

            <button
                onclick="disminuirCantidad(${indice})"
                class="btn btn-sm btn-secondary ms-2">
                -
            </button>

            <span class="mx-2">
                ${item.cantidad}
            </span>

            <button
                onclick="aumentarCantidad(${indice})"
                class="btn btn-sm btn-success">
                +
            </button>

            <span class="ms-3">
                $${(item.precio * item.cantidad).toFixed(2)}
            </span>
        `;

        lista.appendChild(li);

    });

    totalVisual.textContent = total.toFixed(2);
}


function eliminarProducto(indice) {
        
    total -= carrito[indice].precio;
        
    carrito.splice(indice, 1);
        
    actualizarCarrito();
}

function aumentarCantidad(indice){

    carrito[indice].cantidad++;

    actualizarCarrito();

}

function disminuirCantidad(indice){

    carrito[indice].cantidad--;

    if(carrito[indice].cantidad <= 0){

        carrito.splice(indice, 1);

    }

    actualizarCarrito();

}


// ===================================
// Mostrar u ocultar datos bancarios
// ===================================

document.addEventListener("change", function (e) {

    if (e.target.name === "pago") {

        const datos =
            document.getElementById("datosTransferencia");

        if (!datos) return;

        if (e.target.value === "Transferencia") {

            datos.style.display = "block";

        } else {

            datos.style.display = "none";
        }
    }
});

// ===================================
// Enviar pedido a WhatsApp
// ===================================

function enviarWhatsApp() {

    if (carrito.length === 0) {

        alert("Seleccione al menos un producto");
        return;
    }

    const nombre =
        document.getElementById("nombre").value;

    const telefono =
        document.getElementById("telefono").value;

    const direccion =
        document.getElementById("direccion").value;

if(nombre.trim() === ""){
    alert("Ingrese su nombre");
    return;
}

if(telefono.trim() === ""){
    alert("Ingrese su teléfono");
    return;
}
    
    const pago =
        document.querySelector(
            'input[name="pago"]:checked'
        ).value;

    let productos = "";

    carrito.forEach(item => {

        productos +=

    "• " +

    item.nombre +

    " x" +

    item.cantidad +

    " - $" +

    (item.precio * item.cantidad).toFixed(2) +

    "\n";
    });

    const mensaje =
`*PEDIDO VIANOVA*

Cliente: ${nombre}

Teléfono: ${telefono}

Dirección: ${direccion}

Productos:
${productos}

Total: $${total.toFixed(2)}

Método de pago:
${pago}`;

    const numero =
        "593991555421";
const url =
    `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    
   const confirmar = confirm(

    "Resumen del pedido\n\n" +

    "Total: $" +

    total.toFixed(2) +

    "\n\n¿Desea enviarlo por WhatsApp?"

);


if(confirmar){

    alert(
        "Pedido preparado correctamente. Se abrirá WhatsApp para finalizar el envío."
    );

    window.open(url, "_blank");

    carrito = [];

    total = 0;

    actualizarCarrito();

    document.getElementById("nombre").value = "";

    document.getElementById("telefono").value = "";

    document.getElementById("direccion").value = "";

}



}
window.addEventListener("load", function () {

    const opcion =
        document.querySelector(
            'input[name="pago"]:checked'
        );

    const datos =
        document.getElementById(
            "datosTransferencia"
        );

    if (opcion && opcion.value === "Transferencia") {

        datos.style.display = "block";

    }

});
