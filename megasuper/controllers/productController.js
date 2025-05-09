export class ProductController {
    
    constructor(productService) {
      this.productService = productService;
    }
  
    async findAll(req, res, next) {
      try {
        const filters = {
          idCategoria: req.query.idCategoria,
          precioGt: req.query.precioGt,
          precioLt: req.query.precioLt
        };
        const productos = await this.productService.findAll(filters);
        res.json(productos);
      } catch (error) {
        next(error);
      }
    }
  
    async findById(req, res, next) {
      try {
        const producto = await this.productService.findById(req.params.id);
        res.json(producto);
      } catch (error) {
        next(error);
      }
    }
  
    async create(req, res, next) {
      try {
        const nuevo = await this.productService.create(req.body);
        res.status(201).json(nuevo);
      } catch (error) {
        next(error);
      }
    }
  
    async delete(req, res, next) {
      try {
        await this.productService.delete(req.params.id);
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }

    async update(req, res, next) {
      try {
        const actualizado = await this.productService.update(req.params.id, req.body);
        res.json(actualizado);
      } catch (error) {
        next(error);
      }
    }
}
  