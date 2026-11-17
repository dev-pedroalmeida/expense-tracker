import { type Express } from "express";
import categoryRoutes from "./category.routes.ts";
import transactionRoutes from "./transaction.routes.ts";

const mountRoutes = (app: Express) => {
  app.use("/categories", categoryRoutes);
  app.use("/transactions", transactionRoutes);
};

export default mountRoutes;
