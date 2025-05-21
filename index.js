import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { Server } from "./server.js"
import routes from "./megasuper/routes/routes.js"

import { ProductRepository } from "./megasuper/models/repositories/productRepository.js"
import { ProductService } from "./megasuper/services/productService.js"
import { ProductController } from "./megasuper/controllers/productController.js"

const app = express()
const port = process.env.SERVER_PORT || 3000
const server = new Server(app, port)

// Configuración de dependencias
const productRepo = new ProductRepository()
const productService = new ProductService(productRepo)
const productController = new ProductController(productService)

// Registro del controlador en el servidor
server.setController(ProductController, productController)

// Configuración de rutas y lanzamiento
routes.forEach((r) => {
  server.addRoute(r)
})
server.configureRoutes()
server.launch()
