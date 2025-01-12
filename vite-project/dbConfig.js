import dotenv from 'dotenv';
import pg from 'pg';  // Use the default import for 'pg'
const { Pool } = pg; // Destructure Pool from pg

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

export { pool };
