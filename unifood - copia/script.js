document.addEventListener("DOMContentLoaded", function () {
    mostrarPantalla("splash-screen");

    setTimeout(() => {
        mostrarPantalla("register-screen");
    }, 3000);

    document.querySelector("#register-screen form").addEventListener("submit", function (e) {
        e.preventDefault();
        mostrarPantalla("menu-screen");
    });

    document.querySelector("#menu-screen button[onclick='mostrarBusqueda()']").addEventListener("click", function () {
        mostrarPantalla("search-screen");
        cargarPlatillos();
    });

    document.querySelector("#menu-screen button[onclick='mostrarPerfil()']").addEventListener("click", function () {
        mostrarPantalla("profile-screen");
        cargarPerfil();
    });

    document.querySelector("#menu-screen button[onclick='mostrarHistorial()']").addEventListener("click", function () {
        mostrarPantalla("history-screen");
        mostrarHistorial();
    });

    document.querySelector("#menu-screen button[onclick='mostrarCarrito()']").addEventListener("click", function () {
        mostrarPantalla("cart-screen");
        mostrarCarrito();
    });

    document.querySelector("#menu-screen button[onclick='mostrarConsulta()']").addEventListener("click", function () {
        mostrarPantalla("consulta-screen");
        mostrarMensajeConsulta();
    });

    function mostrarPantalla(id) {
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("visible");
        });
        document.getElementById(id).classList.add("visible");
    }

    function cargarPlatillos() {
        const platillos = [
            { nombre: "Ensalada César", precio: 12000 },
            { nombre: "Batido de Fresas", precio: 8000 },
            { nombre: "Sandwich de Pollo", precio: 15000 },
            { nombre: "Agua de Coco", precio: 5000 },
            { nombre: "Fruta Mixta", precio: 7000 }
        ];
        const menu = document.getElementById("platillos");
        menu.innerHTML = "";
        platillos.forEach(plato => {
            let item = `<div>
                <h3>${plato.nombre}</h3>
                <p>$${plato.precio}</p>
                <button onclick="agregarAlCarrito('${plato.nombre}', ${plato.precio})">Agregar</button>
            </div>`;
            menu.innerHTML += item;
        });
    }

    let carrito = [];
    let historial = [];
    let perfil = { tipoAlimentacion: "", altura: "", peso: "" };

    window.agregarAlCarrito = function (nombre, precio) {
        carrito.push({ nombre, precio });
        alert(`${nombre} agregado al carrito`);
        console.log(carrito);
    }

    window.mostrarCarrito = function () {
        const carritoDiv = document.getElementById("carrito");
        carritoDiv.innerHTML = "";
        let total = 0;
        carrito.forEach((item, index) => {
            carritoDiv.innerHTML += `<div>
                <h4>${item.nombre}</h4>
                <p>$${item.precio}</p>
                <button class='eliminar' onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>`;
            total += item.precio;
        });
        carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
    }

    window.eliminarDelCarrito = function (index) {
        carrito.splice(index, 1);
        mostrarCarrito();
    }

    window.realizarPago = function () {
        const metodoPago = prompt("Seleccione su método de pago: Tarjeta de Crédito, Transferencia, Efectivo");
        if (metodoPago) {
            alert(`Pago realizado con ${metodoPago}`);
            historial.push(...carrito);
            carrito = [];
            mostrarPantalla("history-screen");
            mostrarHistorial();
        }
    }

    window.mostrarHistorial = function () {
        const historialDiv = document.getElementById("historial");
        historialDiv.innerHTML = "";
        historial.forEach(item => {
            historialDiv.innerHTML += `<div>
                <h4>${item.nombre}</h4>
                <p>$${item.precio}</p>
            </div>`;
        });
    }

    window.cargarPerfil = function () {
        const perfilDiv = document.getElementById("profile-screen");
        perfilDiv.innerHTML = `
            <h2>Perfil de Usuario</h2>
            <label for='tipoAlimentacion'>Tipo de Alimentación:</label>
            <select id='tipoAlimentacion'>
                <option value='Omnívoro'>Omnívoro</option>
                <option value='Vegetariano'>Vegetariano</option>
                <option value='Vegano'>Vegano</option>
            </select>
            <label for='altura'>Altura (cm):</label>
            <input type='number' id='altura' placeholder='Ingrese su altura'>
            <label for='peso'>Peso (kg):</label>
            <input type='number' id='peso' placeholder='Ingrese su peso'>
            <button onclick='guardarPerfil()'>Guardar</button>
            <button onclick='regresar()'>Regresar</button>
        `;
    }

    window.guardarPerfil = function () {
        perfil.tipoAlimentacion = document.getElementById("tipoAlimentacion").value;
        perfil.altura = document.getElementById("altura").value;
        perfil.peso = document.getElementById("peso").value;
        alert("Perfil guardado con éxito");
        console.log(perfil);
        regresar();
    }

    window.mostrarMensajeConsulta = function () {
        const consultaDiv = document.getElementById("consulta");
        consultaDiv.innerHTML = `<p>Próximamente disponible</p>
                                <button onclick='regresar()'>Regresar</button>`;
    }

    window.regresar = function () {
        mostrarPantalla("menu-screen");
    }
});
