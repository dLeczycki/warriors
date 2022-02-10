import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'warriors',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
})