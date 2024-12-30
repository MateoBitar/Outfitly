// services/userService.js
const { initDB } = require('../config/database'); // Import the initDB function for database connection
const User = require('../models/userModel'); // Import the User model for user data manipulation

// Define the UserService class to handle user-related operations
class UserService {
    constructor() {
        this.pool = null; // Initialize the database pool as null
        this.init(); // Call the init method to initialize the database connection
    }

    // Initialize the database connection pool asynchronously
    async init() {
        this.pool = await initDB();
    }

    // Add a new user to the database
    async addUser(userData) {
        const { name, email, pass, gender, style = "Unknown", fav_color = "Unknown" } = userData; // Destructure user data with default values
        const [result] = await this.pool.query(
            'INSERT INTO users (username, email, pass, gender, style, fav_color) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, pass, gender, style, fav_color]
        );
        // Return the inserted user details, including the newly generated ID
        return {id: result.insertId, name, email, pass, gender, style, fav_color};
    }

    // Retrieve all users from the database
    async getAllUsers() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM users'); // Query to get all users
            return rows.map(User.fromRow); // Map each row to a User instance
        } catch (e) {
            console.error(e); // Log any error
            throw new Error(); // Rethrow a generic error to be handled by the caller
        }
    }

    // Retrieve a user by ID
    async getUserById(id) {
        const [rows] = await this.pool.query('SELECT * FROM users WHERE user_id = ?', [id]); // Query to get a user by ID
        if (rows.length === 0) return null; // Return null if no user is found
        return User.fromRow(rows[0]); // Convert the row to a User instance
    }

    // Update user details by ID
    async saveUser(id, userData) {
        const { name, email, pass, gender, style, fav_color } = userData; // Destructure updated user data
        const [result] = await this.pool.query(
            'UPDATE users SET username = ?, email = ?, pass = ?, gender = ?, style = ?, fav_color = ? WHERE user_id = ?',
            [name, email, pass , gender, style, fav_color, id]
        );
        return result.affectedRows > 0; // Return true if a row was updated
    }

    // Delete a user by ID
    async deleteUser(id) {
        const [result] = await this.pool.query('DELETE FROM users WHERE user_id = ?', [id]); // Query to delete a user by ID
        return result.affectedRows > 0; // Return true if a row was deleted
    }

    // Check if a username and password combination exists in the database for login
    async checkLogin(name, pass) {
        const [user] = await this.pool.query('SELECT * FROM users WHERE username = ? AND pass = ?', [name, pass]);
        return user.length ? user[0] : null; // Return user object if found
    }

    // Check if this username already exists
    async findUserByName(name) {
        // Query the database to check if this username is already in use
        const [existingUser] = await this.pool.query(
            'SELECT * FROM users WHERE username = ?', [name]);
        return existingUser.length ? existingUser[0] : false;
    }
}

module.exports = new UserService(); // Export an instance of UserService
