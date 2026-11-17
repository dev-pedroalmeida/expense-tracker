import express, { type Request, type Response } from "express";
import * as transactionController from "../controllers/transaction.controller.ts";

const router = express.Router();

router.get("/", transactionController.getAllTransactions);
router.post("/", transactionController.createTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

export default router;
  