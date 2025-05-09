import { ProductController } from "../controllers/productController.js";

export function registerProductRoutes(app, getController) {
  app.get("/products", (req, res, next) =>
    getController(ProductController).findAll(req, res, next)
  );

  app.get("/products/:id", (req, res, next) =>
    getController(ProductController).findById(req, res, next)
  );

  app.post("/products", (req, res, next) =>
    getController(ProductController).create(req, res, next)
  );

  app.delete("/products/:id", (req, res, next) =>
    getController(ProductController).delete(req, res, next)
  );

  app.put("/products/:id", (req, res, next) =>
    getController(ProductController).update(req, res, next)
  );
}
