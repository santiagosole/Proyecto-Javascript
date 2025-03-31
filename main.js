let baseDeDatosProductos = JSON.parse(localStorage.getItem("productos")) || [
    { nombre: "Mouse", stock: 15 },
    { nombre: "Teclado", stock: 10 },
    { nombre: "Monitor", stock: 8 },
    { nombre: "Parlante", stock: 20 },
    { nombre: "Celular", stock: 30 }
];

function mostrarProductos() {
    const listaProductos = document.getElementById("productoLista");
    listaProductos.innerHTML = ''; 

    baseDeDatosProductos.forEach((producto) => {
        let nombreProducto = producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1);

        const productoDiv = document.createElement("div");
        productoDiv.textContent = `${nombreProducto} - Stock: ${producto.stock}`;
        listaProductos.appendChild(productoDiv);
    });
}

function agregarProducto(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let precioCompra = parseFloat(document.getElementById("precioCompra").value);
    let precioVenta = parseFloat(document.getElementById("precioVenta").value);
    let cantidadStock = parseInt(document.getElementById("cantidadStock").value);

    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alert("Error: El nombre del producto solo debe contener letras.");
        return;
    }

    if (isNaN(precioCompra) || precioCompra <= 0 || isNaN(precioVenta) || precioVenta <= 0 || isNaN(cantidadStock) || cantidadStock <= 0) {
        alert("Error: Los valores deben ser números válidos mayores a 0.");
        return;
    }

    let margen = ((precioVenta - precioCompra) / precioCompra) * 100;

    let productoExistente = baseDeDatosProductos.find((producto) => producto.nombre.toLowerCase() === nombre.toLowerCase());

    if (productoExistente) {
        if (margen >= 25) {
            productoExistente.stock += cantidadStock;
            alert("El producto ya existe y se ha actualizado su cantidad en la base de datos.");
        } else {
            alert("El producto existe pero no cumple con el margen de ganancia del 25%.");
        }
    } else {
        if (margen >= 25) {
            baseDeDatosProductos.push({ nombre, stock: cantidadStock }); 
            alert("Nuevo producto agregado a la base de datos.");
        } else {
            alert("El producto no cumple con el margen de ganancia del 25%.");
        }
    }

    localStorage.setItem("productos", JSON.stringify(baseDeDatosProductos));

    mostrarProductos(); 
}

function eliminarProducto(e) {
    e.preventDefault();

    let nombreEliminar = document.getElementById("nombreEliminar").value.trim();
    nombreEliminar = nombreEliminar.charAt(0).toUpperCase() + nombreEliminar.slice(1);

    let index = baseDeDatosProductos.findIndex((producto) => producto.nombre === nombreEliminar);

    if (index !== -1) {
        baseDeDatosProductos.splice(index, 1);
        alert(`El producto "${nombreEliminar}" ha sido eliminado de la base de datos.`);

        localStorage.setItem("productos", JSON.stringify(baseDeDatosProductos));

        mostrarProductos();
    } else {
        alert("El producto no se encontró en la base de datos.");
    }
}

document.getElementById("formAgregarProducto").addEventListener("submit", agregarProducto);
document.getElementById("formEliminarProducto").addEventListener("submit", eliminarProducto);

mostrarProductos();
