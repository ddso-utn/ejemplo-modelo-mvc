import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { Server } from "./megasuper/server/server.js";
import { MongoDBClient } from "./megasuper/config/database.js";

import { ProductRepository } from "./megasuper/models/repositories/productRepository.js";
import { ProductService } from "./megasuper/services/productService.js";
import { ProductController } from "./megasuper/controllers/productController.js";

import { CategoryRepository } from "./megasuper/models/repositories/categoryRepository.js";
import { CategoryService } from "./megasuper/services/categoryService.js";
import { CategoryController } from "./megasuper/controllers/categoryController.js";

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app, port);

MongoDBClient.connect();

// Configuración de dependencias

const categoryRepo = new CategoryRepository();
const categoryService = new CategoryService(categoryRepo);
const categoryController = new CategoryController(categoryService);

const productRepo = new ProductRepository();
const productService = new ProductService(productRepo, categoryRepo);
const productController = new ProductController(productService);

// Registro de controladores en el servidor
server.setController(ProductController, productController);
server.setController(CategoryController, categoryController);

// Configuración de rutas y lanzamiento
server.configureRoutes();
server.launch();