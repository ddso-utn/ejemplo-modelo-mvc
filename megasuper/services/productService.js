import { Producto } from "../models/entities/Producto.js";
import { NotFoundError, ValidationError, ConflictError } from "../errors/AppError.js";

export class ProductService {
  constructor(productRepository, categoryRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  async findAll(filters = {}) {
    const productos = await this.productRepository.findAll(filters);
    return productos.map(producto => this.toDTO(producto));
  }

  async findById(id) {
    const producto = await this.productRepository.findById(id);
    if (!producto) {
      throw new NotFoundError(`Producto con id ${id} no encontrado`);
    }
    return this.toDTO(producto);
  }

  async create(producto) {
    const { nombre, precioBase, descripcion, idCategoria } = producto;

    if (!nombre || typeof precioBase !== "number" || !idCategoria) {
      throw new ValidationError('Faltan campos requeridos o son inválidos');
    }
  
    const existente = await this.productRepository.findByName(nombre);
    if (existente) {
      throw new ConflictError(`Ya existe un producto con el nombre ${nombre}`);
    }

    const categoria = await this.categoryRepository.findById(idCategoria);
    if (!categoria) {
      throw new NotFoundError(`Categoría con id ${idCategoria} no encontrada`);
    }
  
    const nuevo = new Producto(nombre, precioBase);
    nuevo.setCategoria(categoria);

    if (descripcion) {
      nuevo.setDescripcion(descripcion);
    }

    const productoGuardado = await this.productRepository.save(nuevo);
    return this.toDTO(productoGuardado);
  }

  async delete(id) {
    const deleted = await this.productRepository.deleteById(id);
    if (!deleted) {
      throw new NotFoundError(`Producto con id ${id} no encontrado`);
    }
    return deleted;
  }

  toDTO(producto) {
    return {
      id: producto.id,
      nombre: producto.nombre,
      precioBase: producto.precioBase,
      descripcion: producto.descripcion,
      categoria: producto.categoria?.nombre,
      categoriaId: producto.categoria?.id
    };
  }
}
