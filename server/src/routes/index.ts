import { type Express } from 'express';
import categoryRoutes from './category.routes.ts';

const mountRoutes = (app: Express) => {
  app.use('/categories', categoryRoutes);
}

export default mountRoutes;