import { Producto } from "../models/entities/Producto.js";
import { ProductRepository } from "../models/repositories/productRepository.js"; 

export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  findAll({ price_lt = null, page = 1, limit = 10 }) {
    const max = price_lt !== null ? Number(price_lt) : null;
    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Math.max(Number(limit), 1), 100);
  
    let productos = this.productRepository.findByPage(pageNum, limitNum);
  
    if (max !== null) {
      productos = productos.filter(p => p.precioBase < max);
    }

    const total = this.productRepository.countAll();
    const total_pages = Math.ceil(total / limitNum);
  
    const data = productos.map(p => this.toDTO(p));  
    return {
      page: pageNum,
      per_page: limitNum,
      total: total,
      total_pages: total_pages,
      data: data,
    };
  }
  

  findById(id) {
    const producto = this.productRepository.findById(id);
    return producto ? this.toDTO(producto) : null;
  }

  create(nombre, precioBase, descripcion) {
    const existente = this.productRepository.findByName(nombre);
    if (existente) return null;

    const nuevo = new Producto(nombre, precioBase, descripcion);
    this.productRepository.save(nuevo);
    return this.toDTO(nuevo);
  }

  delete(id) {
    return this.productRepository.deleteById(id);
  }

  update(id, datos) {
    const producto = this.productRepository.findById(id);
    if (!producto) return { error: "not-found" };

    const otroConMismoNombre = this.productRepository.findByName(datos.nombre);
    if (otroConMismoNombre && otroConMismoNombre.id !== id) {
      return { error: "duplicate" };
    }

    producto.nombre = datos.nombre;
    producto.precioBase = datos.precioBase;
    producto.descripcion = datos.descripcion;

    const actualizado = this.productRepository.update(producto);
    return this.toDTO(actualizado);
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
