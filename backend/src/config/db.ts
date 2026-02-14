import { Pool } from 'pg';
import { env } from './env';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export async function checkDBHealth() {
  try {
    await pool.query('SELECT 1');
    return 'connected✅';
  } catch (error) {
    console.error('DB Health Check Error:', error);
    return 'disconnected❌';
  }
}