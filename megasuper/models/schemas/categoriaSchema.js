import mongoose from 'mongoose';
import { Categoria } from '../entities/categoria.js';

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'categorias'
});

// Vincular la clase Categoria con el schema
categoriaSchema.loadClass(Categoria);

export const CategoriaModel = mongoose.model('Categoria', categoriaSchema); 