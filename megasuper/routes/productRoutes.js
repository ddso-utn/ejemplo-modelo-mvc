import { ProductController } from "../controllers/productController.js"
import express from "express"
import { productsErrorHandler } from "../middlewares/productsMiddleware.js"

export default function productRoutes(getController) {
  const router = express.Router()

  router.get("/products", async (req, res, next) => {
    try {
      getController(ProductController).findAll(req, res)
    } catch (error) {
      next(error)
    }
  })

  router.get("/products/:id", async (req, res, next) => {
    try {
      await getController(ProductController).findById(req, res)
    } catch (err) {
      next(err)
    }
  })

  router.post("/products", async (req, res, next) => {
    try {
      await getController(ProductController).create(req, res)
    } catch (err) {
      next(err)
    }
  })

  router.delete("/products/:id", async (req, res, next) => {
    try {
      await getController(ProductController).delete(req, res)
    } catch (err) {
      next(err)
    }
  })

  router.put("/products/:id", async (req, res, next) => {
    try {
      await getController(ProductController).update(req, res)
    } catch (err) {
      next(err)
    }
  })

  router.use(productsErrorHandler)

  return router
}
