import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function resetProperties() {
  try {
    console.log('Dropping tables...');
    await pool.query('DROP TABLE IF EXISTS property_images CASCADE');
    await pool.query('DROP TABLE IF EXISTS properties CASCADE');
    await pool.query('DROP TABLE IF EXISTS session CASCADE');
    console.log('Tables dropped successfully!');
    console.log('Now run: npm run db:push');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

resetProperties();
