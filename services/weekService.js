// services/weekService.js
const { initDB } = require('../config/database');  // Import database initialization function
const Week = require('../models/weekModel');     // Import the Week model to map database results to Week objects

class WeekService {
    constructor() {
        this.pool = null;  // This will store the database connection pool
        this.init();       // Initialize the database connection
    }

    // Initialize the database connection
    async init() {
        this.pool = await initDB();  // Set up the pool for database queries
    }

    // Add a new week entry to the database
    async addWeek(weekData) {
        const { day, user_id } = weekData;  // Destructure the data from the input
        const [result] = await this.pool.query(
            'INSERT INTO weekly_calendar (dayofweek, user_id) VALUES (?, ?)',  // Query to insert the new week
            [day, user_id]  // Values to insert into the database
        );
        // Return the inserted week's data with its ID
        return { id: result.insertId, day, user_id };
    }

    // Fetch all week entries from the database
    async getAllWeeks() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM weekly_calendar');  // Query to fetch all weeks
            // Map the database rows to Week model instances
            return rows.map(Week.fromRow);
        } catch (e) {
            console.error(e);  // Log any error that occurs during the query
            throw new Error();  // Throw a general error (you can customize this)
        }
    }

    // Fetch a specific week by its ID
    async getWeekById(id) {
        const [rows] = await this.pool.query('SELECT * FROM weekly_calendar WHERE calendar_id = ?', [id]);  // Query for a single week
        if (rows.length === 0) return null;  // If no rows are found, return null
        return Week.fromRow(rows[0]);  // Return the mapped Week object
    }

    // Save updates to an existing week
    async saveWeek(id, weekData) {
        const { day, user_id } = weekData;  // Destructure the week data to update
        const [result] = await this.pool.query(
            'UPDATE weekly_calendar SET dayofweek = ?, user_id = ? WHERE calendar_id = ?',  // Query to update the week
            [day, user_id, id]  // The updated values and the target week ID
        );
        // Return true if the week was updated, otherwise false
        return result.affectedRows > 0;
    }

    // Delete a specific week entry from the database
    async deleteWeek(id) {
        const [result] = await this.pool.query('DELETE FROM weekly_calendar WHERE calendar_id = ?', [id]);  // Query to delete the week by its ID
        // Return true if the week was deleted, otherwise false
        return result.affectedRows > 0;
    }
}

module.exports = new WeekService();  // Export an instance of the WeekService class
