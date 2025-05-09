import { Categoria } from "../models/entities/categoria.js";
import { ValidationError, ConflictError, NotFoundError } from "../errors/AppError.js";

export class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async findAll() {
        const categorias = await this.categoryRepository.findAll();
        return categorias.map(c => this.toDTO(c));
    }

    async findById(id) {
        const categoria = await this.categoryRepository.findById(id);
        if (!categoria) {
            throw new NotFoundError(`Categoría con id ${id} no encontrada`);
        }
        return this.toDTO(categoria);
    }

    async create(categoria) {
        const { nombre } = categoria;
        
        if (!nombre) {
            throw new ValidationError('El nombre de la categoría es requerido');
        }
    
        const existente = await this.categoryRepository.findByName(nombre);
        if (existente) {
            throw new ConflictError(`Ya existe una categoría con el nombre ${nombre}`);
        }
    
        const nueva = new Categoria(nombre);
        const categoriaGuardada = await this.categoryRepository.save(nueva);
        return this.toDTO(categoriaGuardada);
    }

    async delete(id) {
        const deleted = await this.categoryRepository.deleteById(id);
        if (!deleted) {
            throw new NotFoundError(`Categoría con id ${id} no encontrada`);
        }
        return deleted;
    }

    toDTO(categoria) {
        return {
            id: categoria.id,
            nombre: categoria.nombre,
        };
    }
} 