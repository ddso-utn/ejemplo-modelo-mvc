import { ProductController } from "../controllers/productController.js";

export function registerProductRoutes(app, getController) {
  app.get("/products", (req, res) =>
    getController(ProductController).findAll(req, res)
  );

  app.get("/products/:id", (req, res) =>
    getController(ProductController).findById(req, res)
  );

  app.post("/products", (req, res) =>
    getController(ProductController).create(req, res)
  );

  app.delete("/products/:id", (req, res) =>
    getController(ProductController).delete(req, res)
  );

  app.put("/products/:id", (req, res) =>
    getController(ProductController).update(req, res)
  );
}
