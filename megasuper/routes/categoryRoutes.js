import { CategoryController } from "../controllers/categoryController.js";

export function registerCategoryRoutes(app, getController) {
    app.get("/categories", (req, res, next) =>
        getController(CategoryController).findAll(req, res, next)
    );

    app.get("/categories/:id", (req, res, next) =>
        getController(CategoryController).findById(req, res, next)
    );

    app.post("/categories", (req, res, next) =>
        getController(CategoryController).create(req, res, next)
    );

    app.delete("/categories/:id", (req, res, next) =>
        getController(CategoryController).delete(req, res, next)
    );
} 