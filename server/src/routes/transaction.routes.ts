import express, { type Request, type Response } from "express";
import * as transactionController from "../controllers/transaction.controller.ts";

const router = express.Router();

router.get("/", transactionController.getAllTransactions);

export default router;
