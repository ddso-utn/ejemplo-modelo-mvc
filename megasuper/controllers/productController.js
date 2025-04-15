export class ProductController {
    
    constructor(productService) {
      this.productService = productService;
    }
  
    findAll = (req, res) => {
      const { price_lt } = req.query;
      const productos = this.productService.findAll(price_lt);
      res.json(productos);
    };
  
    findById = (req, res) => {
      const id = Number(req.params.id);
      const producto = this.productService.findById(id);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(producto);
    };
  
    create = (req, res) => {
      const { nombre, precioBase, descripcion } = req.body;
  
      if (!nombre || !descripcion || typeof precioBase !== "number") {
        return res.status(400).json({ error: "Datos inválidos" });
      }
  
      const nuevo = this.productService.create(nombre, precioBase, descripcion);
      if (!nuevo) {
        return res.status(409).json({ error: "Producto ya existente" });
      }
  
      res.status(201).json(nuevo);
    };
  
    delete = (req, res) => {
      const id = Number(req.params.id);
      const eliminado = this.productService.delete(id);
      if (!eliminado) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(204).send();
    };
  
    update = (req, res) => {
      const id = Number(req.params.id);
      const { nombre, precioBase, descripcion } = req.body;
  
      const actualizado = this.productService.update(id, { nombre, precioBase, descripcion });
  
      if (actualizado.error === "not-found") {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
  
      if (actualizado.error === "duplicate") {
        return res.status(409).json({ error: "Nombre en uso por otro producto" });
      }
  
      res.json(actualizado);
    };
  }
  