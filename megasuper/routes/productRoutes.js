import { ProductController } from "../controllers/productController.js";
import express from 'express'

export default function productRoutes(getController) {
  const router = express.Router()

  router.get("/products", (req, res) =>
    getController(ProductController).findAll(req, res)
  );

  router.get("/products/:id", (req, res) =>
    getController(ProductController).findById(req, res)
  );

  router.post("/products", (req, res) =>
    getController(ProductController).create(req, res)
  );

  router.delete("/products/:id", (req, res) =>
    getController(ProductController).delete(req, res)
  );

  router.put("/products/:id", (req, res) =>
    getController(ProductController).update(req, res)
  );

  return router
}
