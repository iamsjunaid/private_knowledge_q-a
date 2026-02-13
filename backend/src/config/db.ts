import { Pool } from 'pg';
import { env } from './env';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export async function connectDB() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed');
    throw error;
  }
}

export async function checkDBHealth() {
  try {
    await pool.query('SELECT 1');
    return 'connected';
  } catch (error) {
    console.error('DB Health Check Error:', error);
    return 'disconnected';
  }
}