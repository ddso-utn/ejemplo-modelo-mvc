import { Producto } from "../models/entities/Producto.js";

export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  findAll(price_lt = null) {
    let productos = this.productRepository.findAll();
    if (price_lt) {
      const max = Number(price_lt);
      productos = productos.filter(p => p.precioBase < max);
    }
    return productos.map(p => this.toDTO(p));
  }

  findById(id) {
    const producto = this.productRepository.findById(id);
    return producto ? this.toDTO(producto) : null;
  }

  create(producto) {
    const { nombre, precioBase, descripcion } = producto;
  
    const existente = this.productRepository.findByName(nombre);
    if (existente) return null;
  
    const nuevo = new Producto(nombre, precioBase, descripcion);
  
    this.productRepository.save(nuevo);
    return this.toDTO(nuevo);
  }

  delete(id) {
    return this.productRepository.deleteById(id);
  }

  toDTO(producto) {
    return {
      id: producto.id,
      nombre: producto.nombre,
      precioBase: producto.precioBase,
      descripcion: producto.descripcion
    };
  }
}
