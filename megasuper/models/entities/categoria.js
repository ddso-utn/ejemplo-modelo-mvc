export class Categoria {
    // Ejemplo de relación bidireccional en objetos pero no en el mundo persistente
    productos = []; 

    constructor(nombre) {
        this.nombre = nombre;
    }

    agregarProducto(producto) {
        if (!this.productos.includes(producto)) {
            this.productos.push(producto);
            producto.setCategoria(this);
        }
    }

    removerProducto(producto) {
        const index = this.productos.indexOf(producto);
        if (index > -1) {
            this.productos.splice(index, 1);
            producto.setCategoria(null);
        }
    }

    getProductos() {
        return this.productos;
    }
}