import { ProductAlreadyExistsError } from "../exceptions/productAlreadyExists.js";
import { Producto } from "../models/entities/producto.js";

export class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async findAll({ price_lt = null, page = 1, limit = 10 }) {
    const max = price_lt !== null ? Number(price_lt) : null
    const pageNum = Math.max(Number(page), 1)
    const limitNum = Math.min(Math.max(Number(limit), 1), 100)

    let productos = await this.productRepository.findByPage(pageNum, limitNum)

    if (max !== null) {
      productos = productos.filter(p => p.precioBase < max)
    }

    const total = await this.productRepository.countAll()
    const total_pages = Math.ceil(total / limitNum)

    const data = productos.map(p => this.toDTO(p))
    return {
      page: pageNum,
      per_page: limitNum,
      total: total,
      total_pages: total_pages,
      data: data,
    }
  }


  async findById(id) {
    const producto = await this.productRepository.findById(id)
    return producto ? this.toDTO(producto) : null
  }

  async create(nombre, precioBase, descripcion) {
    const existente = await this.productRepository.findByName(nombre)
    if (existente) {
      throw new ProductAlreadyExistsError(nombre)
    }

    const nuevo = new Producto(nombre, precioBase, descripcion)
    await this.productRepository.save(nuevo)
    return this.toDTO(nuevo)
  }

  async delete(id) {
    return await this.productRepository.deleteById(id)
  }

  async update(id, datos) {
    const producto = await this.productRepository.findById(id)
    if (!producto) return { error: "not-found" }

    const otroConMismoNombre = await this.productRepository.findByName(datos.nombre)
    if (otroConMismoNombre && otroConMismoNombre.id !== id) {
      return { error: "duplicate" }
    }

    producto.nombre = datos.nombre
    producto.precioBase = datos.precioBase
    producto.descripcion = datos.descripcion

    const actualizado = await this.productRepository.update(producto)
    return this.toDTO(actualizado)
  }

  toDTO(producto) {
    return {
      id: producto.id,
      nombre: producto.nombre,
      precioBase: producto.precioBase,
      descripcion: producto.descripcion
    }
  }
}
