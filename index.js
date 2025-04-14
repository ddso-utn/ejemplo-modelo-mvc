import { Server } from "./server.js"
import { MockProductRepository } from "./products/product.repository.js"
import { ProductController } from "./products/product.controller.js"
import express from 'express'
import { config } from "./config.js"

const productRepository = new MockProductRepository()
const productController = new ProductController(productRepository)

const server = new Server(
    express(),
    config.SERVER_PORT,
    true
)
server.setController(ProductController, productController)
server.configureRoutes()
server.launch()