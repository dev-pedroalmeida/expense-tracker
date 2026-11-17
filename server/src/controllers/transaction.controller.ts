import { type Request, type Response } from "express";
import { db } from "../db/index.ts";
import { transactionSchema } from "../schemas/transaction.schema.ts";
import { validateData } from "../functions/validateData.ts";
import {
  formatInsertQueryData,
  formatUpdateQueryData,
} from "../functions/formatQueryData.ts";

const getAllTransactions = async (req: Request, res: Response) => {
  const transactions = await db.query("SELECT * FROM transactions ORDER BY id");

  return res.status(200).json(transactions.rows);
};

const createTransaction = async (req: Request, res: Response) => {
  const validatedData = validateData(transactionSchema, req.body);

  const { fields, values, params } = formatInsertQueryData(validatedData);

  const query =
    "INSERT INTO transactions (" +
    fields.join(", ") +
    ") VALUES (" +
    values.join(", ") +
    ") RETURNING *";

  const newTransaction = await db.query(query, [...params]);

  return res.status(201).json(newTransaction.rows);
};

const updateTransaction = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;
  const validatedData = validateData(transactionSchema.partial(), req.body);

  if (Object.keys(validatedData).length === 0) {
    return res.status(400).json({ message: "No data received to update!" });
  }

  const { fields, params } = formatUpdateQueryData(validatedData);

  const query =
    "UPDATE transactions SET " +
    fields.join(", ") +
    " WHERE id = $" +
    (fields.length + 1) +
    " RETURNING *";

  const updatedTransaction = await db.query(query, [...params, id]);

  if (updatedTransaction.rows.length === 0) {
    return res.status(404).json({ message: "Transaction not found!" });
  }

  return res.status(200).json(updatedTransaction.rows);
};

const deleteTransaction = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;

  const query = "DELETE FROM transactions WHERE id = $1 RETURNING *";

  const result = await db.query(query, [id]);

  if(result.rowCount === 0) {
    return res.status(404).json({message: "Transaction not found!"})
  }

  return res.status(200).json({ message: "Transaction deleted successfully!" });
};

export { getAllTransactions, createTransaction, updateTransaction, deleteTransaction };
