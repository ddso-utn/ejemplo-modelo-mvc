import mongoose from 'mongoose';
import { Producto } from '../entities/Producto.js';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return v.length >= 3;
            },
            message: 'El nombre debe tener al menos 3 caracteres'
        }
    },
    precioBase: {
        type: Number,
        required: true,
        min: 0
    },
    descripcion: {
        type: String,
        trim: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
}, {
    timestamps: true
});

// Vincular la clase Producto con el schema
productoSchema.loadClass(Producto);

export const ProductoModel = mongoose.model('Producto', productoSchema); 