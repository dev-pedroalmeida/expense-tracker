import { type Request, type Response } from 'express';
import { db } from '../db/index.ts';
import { categorySchema } from '../schemas/category.schema.ts';
import { validateData } from '../functions/validateData.ts';

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await db.query('SELECT * FROM categories');

    return res.status(200).json(categories.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const validatedData = validateData(categorySchema, req.body);

    const newCategory = await db.query('INSERT INTO categories (name, color) VALUES ($1, $2) RETURNING *', [validatedData.name, validatedData.color]);

    return res.status(201).json(newCategory.rows);
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Internal server error' });
  }
}

export {
  getAllCategories,
  createCategory
}