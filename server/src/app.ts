import "dotenv/config";
import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { testConnection } from "./db/testConnection.ts";
import mountRoutes from "./routes/index.ts";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mountRoutes(app);

await testConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
