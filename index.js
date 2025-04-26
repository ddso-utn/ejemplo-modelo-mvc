import express from "express";
import { Server } from "./server.js";

import { ProductRepository } from "./megasuper/models/repositories/productRepository.js";
import { ProductService } from "./megasuper/services/productService.js";
import { ProductController } from "./megasuper/controllers/productController.js";
import routes from "./megasuper/routes/routes.js";

const app = express();
const server = new Server(app, 3000);

// Configuración de dependencias
const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);
const productController = new ProductController(productService);

// Registro del controlador en el servidor
server.setController(ProductController, productController);

// Configuración de rutas y lanzamiento
routes.forEach(route => {
    server.addRoute(route)
})
server.configureRoutes()
server.launch()