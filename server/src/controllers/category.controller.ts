import { type Request, type Response } from "express";
import { db } from "../db/index.ts";
import { categorySchema } from "../schemas/category.schema.ts";
import { validateData } from "../functions/validateData.ts";
import {
  formatInsertQueryData,
  formatUpdateQueryData,
} from "../functions/formatQueryData.ts";

const getAllCategories = async (req: Request, res: Response) => {
  const categories = await db.query("SELECT * FROM categories ORDER BY id");

  return res.status(200).json(categories.rows);
};

const createCategory = async (req: Request, res: Response) => {
  const validatedData = validateData(categorySchema, req.body);

  const { fields, values, params } = formatInsertQueryData(validatedData);

  const query =
    "INSERT INTO categories (" +
    fields.join(", ") +
    ") VALUES (" +
    values.join(", ") +
    ") RETURNING *";

  const newCategory = await db.query(query, [...params]);

  return res.status(201).json(newCategory.rows);
};

const updateCategory = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const validatedData = validateData(categorySchema.partial(), req.body);

  if (validatedData === undefined) {
    return res.status(400).json({ message: "No data received" });
  }

  const { fields, params } = formatUpdateQueryData(validatedData);

  const query =
    "UPDATE categories SET " +
    fields.join(", ") +
    " WHERE id = $" +
    (fields.length + 1) +
    " RETURNING *";

  const updatedCategory = await db.query(query, [...params, id]);

  if (updatedCategory.rows.length === 0) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res.status(200).json(updatedCategory.rows);
};
export { getAllCategories, createCategory, updateCategory };
