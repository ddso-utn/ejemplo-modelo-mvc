import { CategoriaModel } from '../schemas/categoriaSchema.js';
//import { ProductoModel } from '../schemas/productoSchema.js';

export class CategoryRepository {
    constructor() {
        this.model = CategoriaModel;
    }
  
    async findAll() {
        const categorias = await this.model.find();
        // Para cada categoría, cargamos sus productos
        // for (const categoria of categorias) {
        //     const productos = await ProductoModel.find({ categoria: categoria._id });
        //     categoria.productos = productos;
        // }
        return categorias;
    }
  
    async findById(id) {
        const categoria = await this.model.findById(id);
        // if (categoria) {
        //     const productos = await ProductoModel.find({ categoria: categoria._id });
        //     categoria.productos = productos;
        // }
        return categoria;
    }
  
    async findByName(nombre) {
        const categoria = await this.model.findOne({ nombre });
        // if (categoria) {
        //     const productos = await ProductoModel.find({ categoria: categoria._id });
        //     categoria.productos = productos;
        // }
        return categoria;
    }
  
    async save(categoria) {
        if (categoria.id) {
            const categoriaActualizada = await this.model.findByIdAndUpdate(
                categoria.id,
                categoria,
                { new: true, runValidators: true }
            );
            // if (categoriaActualizada) {
            //     const productos = await ProductoModel.find({ categoria: categoriaActualizada._id });
            //     categoriaActualizada.productos = productos;
            // }
            return categoriaActualizada;
        } else {
            const nuevaCategoria = new this.model(categoria);
            const categoriaGuardada = await nuevaCategoria.save();
            categoriaGuardada.productos = []; // Nueva categoría, sin productos
            return categoriaGuardada;
        }
    }
  
    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id);
        return resultado !== null;
    }
} 