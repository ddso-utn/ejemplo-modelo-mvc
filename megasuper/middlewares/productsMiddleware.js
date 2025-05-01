import { ProductNotFoundError } from "../exceptions/productNotFound.js"
import { ProductAlreadyExistsError } from "../exceptions/productAlreadyExists.js"

export function productsErrorHandler(err, req, res, _next) {
  console.error(err)

  if (err.constructor.name == ProductNotFoundError.name) {
    res.status(404).json({ id: err.productId })
    return
  }

  if (err.constructor.name == ProductAlreadyExistsError.name) {
    res.status(409).json({ error: err.message })
    return
  }

  res.status(500).json({ error: err.stack })
}
