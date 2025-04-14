import { ProductController } from "./megasuper/controllers/controller.js"

export class Server {

    #requiredControllers = [ProductController]
    #controllers = {}
    #app

    constructor(app, port = 3000, strict = false) {
        this.#app = app
        this.port = port
        this.strict = strict
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
        this.app.get("/users", (req, res) => this.getController(UserController).findAll(req, res))
    }

    launch() {
        if (this.strict && !this.#requiredControllers.every(
            requiredController => Object.keys(this.#controllers).includes(requiredController.name)
        )) {
            const missingControllersNames = this.#requiredControllers.filter(
                c => !Object.keys(this.#controllers).includes(c)
            ).map(c => c.name)
            const missingControllersString = missingControllersNames.join(", ") 
             throw new Error("Controllers are still missing: " + missingControllersNames)
        }
        this.app.listen(this.port, () => {console.log("Server running in port " + this.port)})
    }
}