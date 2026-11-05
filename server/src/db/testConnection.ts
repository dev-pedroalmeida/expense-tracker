import { db } from "./index.ts";

async function testConnection() {
  try {
    await db.query('SELECT 1');
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

export { testConnection };