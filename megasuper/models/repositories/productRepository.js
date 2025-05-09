import { ProductoModel } from '../schemas/productoSchema.js';

export class ProductRepository {
    constructor() {
        this.model = ProductoModel;
    }
  
    async findAll(filters = {}) {
        const query = {};
        if (filters.idCategoria) {
            query.categoria = filters.idCategoria;
        }
        if (filters.precioGt) {
            query.precioBase = { $gt: Number(filters.precioGt) };
        }
        if (filters.precioLt) {
            query.precioBase = { $lt: Number(filters.precioLt) };
        }
        return await this.model.find(query).populate('categoria');
    }
  
    async findById(id) {
        return await this.model.findById(id).populate('categoria');
    }
  
    async findByName(nombre) {
        return await this.model.findOne({ nombre }).populate('categoria');
    }
  
    async save(producto) {
        const query = producto.id ? { _id: producto.id } : { _id: new this.model()._id };
        return await this.model.findOneAndUpdate(
            query,
            producto,
            { 
                new: true, 
                runValidators: true,
                upsert: true
            }
        ).populate('categoria');
    }
  
    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id);
        return resultado !== null;
    }
}
  