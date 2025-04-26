import express from "express";  
import { ProductController } from "./megasuper/controllers/productController.js";

export class Server {

    #controllers = {}
    #routes = []
    #app

    constructor(app, port = 3000) {
        this.#app = app
        this.port = port
        this.#app.use(express.json()); 
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
       this.#routes.forEach(route => {
            const router = route(this.getController.bind(this))
            this.#app.use(router)
        })
    }

    addRoute(route) {
        this.#routes.push(route)
    }

    launch() {
        this.app.listen(this.port, () => {
            console.log("Server running on port " + this.port)
        })
    }
}
