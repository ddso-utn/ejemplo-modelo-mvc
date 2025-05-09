export class Producto {
    categoria = null;
    cantidad = null; //No es persistente porque no está definido en el schema
    
    constructor(nombre, precioBase) {
        this.nombre = nombre;
        this.precioBase = precioBase;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    setCategoria(categoria) {
        // Si ya tenía una categoría, la removemos de la lista de productos de esa categoría
        if (this.categoria && this.categoria !== categoria) {
            this.categoria.removerProducto(this);
        }
        
        this.categoria = categoria;
        
        // Si la nueva categoría no es null, agregamos este producto a su lista
        if (categoria && !categoria.getProductos().includes(this)) {
            categoria.agregarProducto(this);
        }
    }

    getCategoria() {
        return this.categoria;
    }

    tuPrecioEsMayorQue(precio) {
        return this.precioBase > precio;
    }

    tuPrecioEsMenorQue(precio) {
        return this.precioBase < precio;
    }
}