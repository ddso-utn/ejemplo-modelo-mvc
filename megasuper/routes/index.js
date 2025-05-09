import { registerProductRoutes } from './productRoutes.js';
import { registerCategoryRoutes } from './categoryRoutes.js';

export function configureRoutes(app, getController) {
    registerProductRoutes(app, getController);
    registerCategoryRoutes(app, getController);
} 