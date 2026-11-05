import 'dotenv/config';
import express, { type Express, type Request, type Response} from 'express';
import {testConnection} from './db/testConnection.ts';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

await testConnection();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
