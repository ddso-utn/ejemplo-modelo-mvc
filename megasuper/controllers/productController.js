export class ProductController {
  constructor(productService) {
    this.productService = productService
  }

  async findAll(req, res, asdf) {
    const { price_lt, page = 1, limit = 10 } = req.query
    const productosPaginados = await this.productService.findAll({
      price_lt,
      page,
      limit,
    })

    res.json(productosPaginados)
  }

  async findById(req, res) {
    const id = Number(req.params.id)
    const producto = await this.productService.findById(id)
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(producto)
  }

  async create(req, res) {
    const producto = req.body
    const { nombre, precioBase, descripcion } = producto

    if (!nombre || !descripcion || typeof precioBase !== "number") {
      return res.status(400).json({ error: "Datos inválidos" })
    }

    const nuevo = await this.productService.create(
      nombre,
      precioBase,
      descripcion,
    )
    console.log(nuevo)
    if (!nuevo) {
      return res.status(409).json({ error: "Producto ya existente" })
    }
    res.status(201).json(nuevo)
  }

  async delete(req, res) {
    const id = Number(req.params.id)
    const eliminado = await this.productService.delete(id)
    if (!eliminado) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.status(204).send()
  }

  async update(req, res) {
    const id = Number(req.params.id)
    const { nombre, precioBase, descripcion } = req.body

    const actualizado = await this.productService.update(id, {
      nombre,
      precioBase,
      descripcion,
    })

    if (actualizado.error === "not-found") {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    if (actualizado.error === "duplicate") {
      return res.status(409).json({ error: "Nombre en uso por otro producto" })
    }

    res.json(actualizado)
  }
}
