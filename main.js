
// PRIMER PRE ENTREGA//

/*function simuladorCompra() {
    let costo = parseFloat(prompt("Ingrese el costo de la mercadería ($):"));
    let precioVenta = parseFloat(prompt("Ingrese el precio de venta ($):"));

    if (isNaN(costo) || isNaN(precioVenta) || costo <= 0 || precioVenta <= 0) {
        console.log("Error: Datos ingresados no válidos.");
        alert("Por favor, ingrese valores válidos.");
        return;
    }
    
    let margen = calcularMargen(costo, precioVenta);
    
    console.log(`Costo: $${costo}`);
    console.log(`Precio de venta: $${precioVenta}`);
    console.log(`Margen de ganancia calculado: ${margen.toFixed(2)}%`);
    
    alert(`Margen de ganancia: ${margen.toFixed(2)}%`);
    
    if (margen >= 25) {
        console.log("El margen de ganancia es correcto.");
        alert("El margen de ganancia es correcto.");
    } else {
        console.log("El margen de ganancia es bajo, considere ajustar el precio.");
        alert("El margen de ganancia es bajo, considere ajustar el precio.");
    }
}

function calcularMargen(costo, precioVenta) {
    return ((precioVenta - costo) / costo) * 100;
}

simuladorCompra();*/


const baseDeDatosProductos = [
    { nombre: "Mouse", precio: 20000, stock: 15 },
    { nombre: "Teclado", precio: 15000, stock: 10 },
    { nombre: "Monitor", precio: 80000, stock: 8 },
    { nombre: "Parlante", precio: 25000, stock: 20 },
    { nombre: "Celular", precio: 120000, stock: 30 }
];

let listaProductos = [];

function agregarProducto() {
    let nombre;
    do {
        nombre = prompt("Ingresa el nombre del producto").trim();
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            alert("Error: Ingresa solo letras en el nombre del producto.");
        }
    } while (!/^[a-zA-Z\s]+$/.test(nombre));

    let precioCompra;
    do {
        precioCompra = parseFloat(prompt("Ingresa el precio de compra del producto"));
        if (isNaN(precioCompra) || precioCompra <= 0) {
            alert("Error: Ingresa un precio de compra válido (solo números mayores a 0).");
        }
    } while (isNaN(precioCompra) || precioCompra <= 0);

    let precioVenta;
    do {
        precioVenta = parseFloat(prompt("Ingresa el precio de venta del producto"));
        if (isNaN(precioVenta) || precioVenta <= 0) {
            alert("Error: Ingresa un precio de venta válido (solo números mayores a 0).");
        }
    } while (isNaN(precioVenta) || precioVenta <= 0);

    let productoBase = baseDeDatosProductos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    let margen = ((precioVenta - precioCompra) / precioCompra) * 100;

    if (productoBase) {
        if (margen >= 25) {
            alert("El producto ya existe en la base de datos y supera el margen requerido.");
        } else {
            alert("El producto existe en la base de datos pero debes subir el precio para que supere el margen del 25%.");
        }
    } else {
        if (margen >= 25) {
            baseDeDatosProductos.push({ nombre, precio: precioCompra, stock: 1 });
            alert("El producto no estaba en la base, pero supera el margen y ha sido agregado.");
        } else {
            alert("El producto no está en la base de datos. Si subes el precio, podría sumarse.");
        }
    }

    console.table(baseDeDatosProductos);
}

agregarProducto();