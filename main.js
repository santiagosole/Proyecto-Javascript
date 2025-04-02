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

    baseDeDatosProductos.forEach((producto, index) => {
        let nombreProducto = producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1);

        const productoDiv = document.createElement("div");
        productoDiv.classList.add("alert", "alert-warning", "d-flex", "justify-content-between", "align-items-center", "mt-2");
        productoDiv.innerHTML = `
            <span>📌 ${nombreProducto} | Stock: ${producto.stock}</span>
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">🗑 Eliminar</button>
        `;

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
        Swal.fire("❌ Error", "El nombre del producto solo debe contener letras.", "error");
        return;
    }

    if (isNaN(precioCompra) || precioCompra <= 0 || isNaN(precioVenta) || precioVenta <= 0 || isNaN(cantidadStock) || cantidadStock <= 0) {
        Swal.fire("❌ Error", "Los valores deben ser números válidos mayores a 0.", "error");
        return;
    }

    let margen = ((precioVenta - precioCompra) / precioCompra) * 100;

    let productoExistente = baseDeDatosProductos.find((producto) => producto.nombre.toLowerCase() === nombre.toLowerCase());

    if (productoExistente) {
        if (margen >= 25) {
            productoExistente.stock += cantidadStock;
            Swal.fire("✅ Actualizado", "El producto ya existía y se actualizó el stock.", "success");
        } else {
            Swal.fire("⚠️ Advertencia", "El producto no cumple con el margen mínimo del 25%.", "warning");
        }
    } else {
        if (margen >= 25) {
            baseDeDatosProductos.push({ nombre, stock: cantidadStock });
            Swal.fire("🎉 Producto Agregado", "Nuevo producto agregado al inventario.", "success");
        } else {
            Swal.fire("⚠️ Advertencia", "El producto no cumple con el margen mínimo del 25%.", "warning");
        }
    }

    localStorage.setItem("productos", JSON.stringify(baseDeDatosProductos));
    mostrarProductos();
    document.getElementById("formAgregarProducto").reset();
}

function eliminarProducto(index) {
    Swal.fire({
        title: "¿Eliminar producto?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            baseDeDatosProductos.splice(index, 1);
            localStorage.setItem("productos", JSON.stringify(baseDeDatosProductos));
            mostrarProductos();
            Swal.fire("✅ Eliminado", "El producto fue eliminado.", "success");
        }
    });
}

document.getElementById("formAgregarProducto").addEventListener("submit", agregarProducto);
mostrarProductos();
