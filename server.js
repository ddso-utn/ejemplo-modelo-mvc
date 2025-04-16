import express from "express";
import { registerProductRoutes } from "./megasuper/routes/productRoutes.js";

export class Server {
  #controllers = {};
  #app;

  constructor(app, port = 3000) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json());
  }

  get app() {
    return this.#app;
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controller missing for the given route.");
    }
    return controller;
  }

  configureRoutes() {
    registerProductRoutes(this.app, this.getController.bind(this));
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}
