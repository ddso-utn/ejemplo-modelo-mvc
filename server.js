import express from "express"  
import { ProductController } from "./megasuper/controllers/productController.js"

export class Server {

    #controllers = {}
    #app

    constructor(app, port = 3000) {
        this.#app = app
        this.port = port
        this.#app.use(express.json()) 
    }

    get app() { return this.#app }

    setController(controllerClass, controller) {
        this.#controllers[controllerClass.name] = controller
    }

    getController(controllerClass) {
        const controller = this.#controllers[controllerClass.name]
        if (!controller) { throw new Error("Controller missing for the given route.") }
        return controller
    }

    configureRoutes() {
        this.app.get("/products", (req, res) => this.getController(ProductController).findAll(req,res))
        this.app.get("/products/:id", (req, res) => this.getController(ProductController).findById(req,res))
        this.app.post("/products", (req, res) => this.getController(ProductController).create(req,res))
        this.app.delete("/products/:id", (req, res) => this.getController(ProductController).delete(req,res))
        this.app.put("/products/:id", (req, res) => this.getController(ProductController).update(req,res))
        this.app.post("/products/batch", (req, res) => this.getController(ProductController).createMany(req,res))
    }

    launch() {
        this.app.listen(this.port, () => {
            console.log("Server running on port " + this.port)
        })
    }
}
