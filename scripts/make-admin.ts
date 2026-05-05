import 'dotenv/config';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

async function main() {
  const adminEmail = 'admin@landnest.in';
  const adminUsername = 'adminabhivrat';
  const adminPassword = 'Asrpro123$';

  // Check if admin account already exists
  const { rows: existing } = await pool.query(
    'SELECT id, email, role FROM users WHERE username = $1 OR email = $2',
    [adminUsername, adminEmail]
  );

  if (existing.length > 0) {
    // Update existing to ensure role is admin
    await pool.query(
      "UPDATE users SET role = 'admin' WHERE username = $1 OR email = $2",
      [adminUsername, adminEmail]
    );
    console.log('Admin account already exists, role confirmed:', existing[0]);
  } else {
    // Create fresh admin account
    const hashedPassword = await hashPassword(adminPassword);
    const { rows } = await pool.query(
      `INSERT INTO users (username, password, name, email, phone, role)
       VALUES ($1, $2, $3, $4, $5, 'admin') RETURNING id, name, email, role`,
      [adminUsername, hashedPassword, 'Abhivrat Singh (Admin)', adminEmail, '6261642203']
    );
    console.log('Admin account created:', rows[0]);
  }

  // Also ensure businesswithabhivrat@gmail.com is admin
  await pool.query(
    "UPDATE users SET role = 'admin' WHERE email = 'businesswithabhivrat@gmail.com'"
  );
  console.log('businesswithabhivrat@gmail.com also set as admin');

  await pool.end();
}

main().catch(console.error);
