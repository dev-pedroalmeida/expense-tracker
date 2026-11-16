import express, { type Request, type Response } from 'express';
import * as categoriesController from '../controllers/category.controller.ts';

const router = express.Router();

router.get('/', categoriesController.getAllCategories);
router.post('/', categoriesController.createCategory);
router.put('/:id', categoriesController.updateCategory);

export default router;