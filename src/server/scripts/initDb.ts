import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

async function initializeDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });


    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`);
    await connection.query(`USE ${process.env.MYSQL_DATABASE}`);

    // Create users table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const userId = uuidv4();

    try {
      await connection.query(
        'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
        [userId, 'test@example.com', hashedPassword]
      );
      console.log('Test user created successfully');
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.log('Test user already exists');
      } else {
        throw error;
      }
    }

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase().catch((error) => {
  console.error('Database initialization failed:', error);
  process.exit(1);
});
