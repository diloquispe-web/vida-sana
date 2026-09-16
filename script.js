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

    carrito.push({
        nombre: nombre,
        precio: precio
    });

    total += precio;

    actualizarCarrito();
}

function actualizarCarrito() {

    const lista = document.getElementById("listaCarrito");
    const totalVisual = document.getElementById("total");

    if (!lista || !totalVisual) return;

    lista.innerHTML = "";

    carrito.forEach(item => {

        const li = document.createElement("li");

        li.textContent =
            item.nombre +
            " - $" +
            item.precio.toFixed(2);

        lista.appendChild(li);
    });

    totalVisual.textContent = total.toFixed(2);
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
            " - $" +
            item.precio.toFixed(2) +
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

    window.open(url, "_blank");
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
