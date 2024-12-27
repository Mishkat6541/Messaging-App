import dotenv from 'dotenv';
import pg from 'pg';  // Use the default import for 'pg'
const { Pool } = pg; // Destructure Pool from pg

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

export { pool };
