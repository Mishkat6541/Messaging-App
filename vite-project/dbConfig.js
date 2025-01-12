import dotenv from 'dotenv';
import pg from 'pg';  // Use the default import for 'pg'
const { Pool } = pg; // Destructure Pool from pg

dotenv.config();

// Use DATABASE_URL directly, no need for the condition
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,  // Use the connectionString directly
  ssl: process.env.NODE_ENV === 'production' // Enable SSL in production (optional)
});

export { pool };
