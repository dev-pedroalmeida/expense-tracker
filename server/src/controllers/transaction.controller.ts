import { type Request, type Response } from "express";
import { db } from "../db/index.ts";
import { transactionSchema } from "../schemas/transaction.schema.ts";
import { validateData } from "../functions/validateData.ts";
import {
  formatInsertQueryData,
  formatUpdateQueryData,
} from "../functions/formatQueryData.ts";

const getAllTransactions = async ( req: Request, res: Response ) => {
  const transactions = await db.query("SELECT * FROM transactions ORDER BY id")

  return res.status(200).json(transactions.rows)
}

export {
  getAllTransactions
}