let baseDeDatosProductos = [];

async function cargarInicial() {
  const almacen = JSON.parse(localStorage.getItem("productos"));
  console.log("LocalStorage previo:", almacen);

  if (almacen && almacen.length) {
    console.log("📥 Cargando productos desde localStorage");
    baseDeDatosProductos = almacen;
  } else {
    console.log("🌐 No hay datos guardados, cargando JSON local…");
    try {
      const resp = await fetch("data/productos.json");
      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      baseDeDatosProductos = await resp.json();
      console.log("✅ Datos JSON recibidos:", baseDeDatosProductos);
      localStorage.setItem("productos", JSON.stringify(baseDeDatosProductos));
    } catch (err) {
      console.error("❌ Error al cargar JSON local:", err);
      baseDeDatosProductos = [
        { nombre: "Mouse", stock: 15 },
        { nombre: "Teclado", stock: 10 },
        { nombre: "Monitor", stock: 8 },
        { nombre: "Parlante", stock: 20 },
        { nombre: "Celular", stock: 30 }
      ];
    }
  }
  mostrarProductos();
}

function mostrarProductos() {
  const lista = document.getElementById("productoLista");
  lista.innerHTML = "";
  baseDeDatosProductos.forEach((p, i) => {
    const nombre = p.nombre.charAt(0).toUpperCase() + p.nombre.slice(1);
    const div = document.createElement("div");
    div.className = "alert alert-warning d-flex justify-content-between align-items-center";
    div.innerHTML = `
      📌 ${nombre} | Stock: ${p.stock}
      <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${i})">Eliminar producto</button>
    `;
    lista.appendChild(div);
  });
}

function agregarProducto(e) {
  e.preventDefault();

  const N = document.getElementById("nombre").value.trim();
  const C = parseFloat(document.getElementById("precioCompra").value);
  const V = parseFloat(document.getElementById("precioVenta").value);
  const S = parseInt(document.getElementById("cantidadStock").value);
  const nombre = N.charAt(0).toUpperCase() + N.slice(1);

  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    Swal.fire("❌ Error", "Ingrese solo letras.", "error");
    return;
  }
  if ([C, V, S].some(x => isNaN(x) || x <= 0)) {
    Swal.fire("❌ Error", "Ingrese números mayores a 0.", "error");
    return;
  }
  const margen = ((V - C) / C) * 100;
  const ex = baseDeDatosProductos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

  if (ex) {
    if (margen >= 25) {
      ex.stock += S;
      Swal.fire("✅ Actualizado", "Stock actualizado.", "success");
    } else {
      Swal.fire("⚠️ Aviso", "No cumple margen 25%.", "warning");
    }
  } else {
    if (margen >= 25) {
      baseDeDatosProductos.push({ nombre, stock: S });
      Swal.fire("🎉 Agregado", "Producto agregado.", "success");
    } else {
      Swal.fire("⚠️ Aviso", "No cumple margen 25%.", "warning");
    }
  }

  localStorage.setItem("productos", JSON.stringify(baseDeDatosProductos));
  e.target.reset();
  mostrarProductos();
}

function eliminarProducto(i) {
  Swal.fire({
    title: "¿Eliminar?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar"
  }).then(r => {
    if (r.isConfirmed) {
      baseDeDatosProductos.splice(i, 1);
      localStorage.setItem("productos", JSON.stringify(baseDeDatosProductos));
      mostrarProductos();
      Swal.fire("🗑 Borrado", "Producto eliminado.", "success");
    }
  });
}

document.getElementById("formAgregarProducto").addEventListener("submit", agregarProducto);
cargarInicial();
