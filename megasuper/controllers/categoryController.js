export class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
  
    async findAll(req, res, next) {
        try {
            const categorias = await this.categoryService.findAll();
            res.json(categorias);
        } catch (error) {
            next(error);
        }
    }
  
    async findById(req, res, next) {
        try {
            const categoria = await this.categoryService.findById(req.params.id);
            res.json(categoria);
        } catch (error) {
            next(error);
        }
    }
  
    async create(req, res, next) {
        try {
            const nueva = await this.categoryService.create(req.body);
            res.status(201).json(nueva);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await this.categoryService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
} 