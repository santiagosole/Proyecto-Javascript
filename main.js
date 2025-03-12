
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


class Producto {
    constructor(nombre, costo, precioVenta) {
        this.nombre = nombre;
        this.costo = costo;
        this.precioVenta = precioVenta;
        this.margen = this.calcularMargen();
    }
    
    calcularMargen() {
        return ((this.precioVenta - this.costo) / this.costo) * 100;
    }
}

let productos = [];

function simuladorCompra() {
    let continuar = true;
    
    while (continuar) {
        let nombre = prompt("Ingrese el nombre del producto:");
        let costo = parseFloat(prompt("Ingrese el costo de la mercadería ($):"));
        let precioVenta = parseFloat(prompt("Ingrese el precio de venta ($):"));

        if (isNaN(costo) || isNaN(precioVenta) || costo <= 0 || precioVenta <= 0 || !nombre) {
            alert("Por favor, ingrese valores válidos.");
            continue;
        }
        
        let producto = new Producto(nombre, costo, precioVenta);
        productos.push(producto);
        
        alert(`Producto agregado: ${producto.nombre}\nMargen de ganancia: ${producto.margen.toFixed(2)}%`);

        if (producto.margen >= 25) {
            alert("El margen de ganancia es correcto.");
        } else {
            alert("El margen de ganancia es bajo, considere ajustar el precio.");
        }
        
        continuar = confirm("¿Desea ingresar otro producto?");
    }
    
    mostrarProductos();
}

function mostrarProductos() {
    console.log("Lista de productos ingresados:");
    productos.forEach(producto => {
        console.log(`${producto.nombre}: Costo $${producto.costo}, Precio de venta $${producto.precioVenta}, Margen ${producto.margen.toFixed(2)}%`);
    });

    let productosBajoMargen = productos.filter(prod => prod.margen < 25);
    console.log("Productos con margen bajo:", productosBajoMargen);
}

simuladorCompra();
