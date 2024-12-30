// config/database.js

// Database configuration using MySQL with the mysql2 library
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

let pool; // Declare the pool variable for managing database connections

// Initialize the database connection pool
const initDB = async () => {
  if (!pool) { // If no pool is initialized, create a new one
    pool = mysql.createPool({
      host: process.env.DB_HOST, // MySQL host (from environment variables)
      user: process.env.DB_USER, // MySQL username (from environment variables)
      password: process.env.DB_PASSWORD, // MySQL password (from environment variables)
      database: process.env.DB_NAME, // MySQL database name (from environment variables)
      port: process.env.DB_PORT || 3307, // MySQL port (defaults to 3307 if not specified)
      waitForConnections: true, // Allow waiting for connections if the pool is full
      connectionLimit: 10, // Maximum number of connections in the pool
      queueLimit: 0, // No limit on the queue of waiting connections
    });

    // Test the database connection
    try {
      await pool.getConnection(); // Attempt to get a connection from the pool
      console.log('Connected to MySQL database'); // Log success if connection is established
    } catch (error) {
      console.error('Unable to connect to MySQL:', error); // Log an error if connection fails
      process.exit(1); // Exit the application if the connection cannot be established
    }
  }
  return pool; // Return the pool for database interactions
};

module.exports = { initDB }; // Export the initDB function to be used elsewhere in the app