export class ProductController {
    
    constructor(productService) {
      this.productService = productService;
    }
  
    findAll = (req, res) => {
      const { price_lt, page = 1, limit = 10 } = req.query;
      const productosPaginados = this.productService.findAll({price_lt, page, limit});
      res.json(productosPaginados);
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

    createMany = (req, res) => {
      const productos = req.body;
    
      if (!Array.isArray(productos)) {
        return res.status(400).json({ error: "Se esperaba un array de productos" });
      }
    
      const creados = [];
      const duplicados = [];
    
      for (const prod of productos) {
        const { nombre, precioBase, descripcion } = prod;
    
        if (!nombre || !descripcion || typeof precioBase !== "number") {
          continue;
        }
    
        const nuevo = this.productService.create(nombre, precioBase, descripcion);
        if (nuevo) {
          creados.push(nuevo);
        } else {
          duplicados.push(nombre);
        }
      }
    
      res.status(201).json({
        creados: creados.length,
        duplicados,
        data: creados,
      });
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
  