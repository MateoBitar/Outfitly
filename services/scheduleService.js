// services/scheduleService.js

// Importing the database initialization and the Schedule model
const { initDB } = require('../config/database');
const Schedule = require('../models/scheduleModel');

// ScheduleService handles the business logic related to scheduling outfits
class ScheduleService {
    constructor() {
        this.pool = null; // Database connection pool
        this.init(); // Initialize the database connection
    }

    // Initializes the database connection pool
    async init() {
        this.pool = await initDB(); // Await the database initialization
    }

    // Schedules an outfit by inserting it into the 'schedule' table
    async scheduleOutfit(scheduleData) {
        const { calendar_id, outfit_id } = scheduleData;
        // Insert the calendar_id and outfit_id into the schedule table
        await this.pool.query(
            'INSERT INTO schedule (calendar_id, outfit_id) VALUES (?, ?)', [calendar_id, outfit_id]
        );
        return { calendar_id, outfit_id }; // Return the scheduled data
    }

    // Retrieves all scheduled outfits from the 'schedule' table
    async getAllScheduledOutfits() {
        try {
            // Query to get all rows from the schedule table
            const [rows] = await this.pool.query('SELECT * FROM schedule');
            // Map rows to the Schedule model and return
            return rows.map(Schedule.fromRow);
        } catch (e) {
            console.error(e); // Log any errors
            throw new Error(); // Throw an error if the query fails
        }
    }

    // Retrieves the outfits scheduled for a specific day by calendar_id
    async getOutfitsOfDayById(calendar_id) {
        // Query to get the outfit_id for the specific calendar_id
        const [rows] = await this.pool.query('SELECT outfit_id FROM schedule WHERE calendar_id = ?', [calendar_id]);
        if (rows.length === 0) return null; // If no outfits found, return null
        // Map rows to the Schedule model and return
        return rows.map(Schedule.fromRow);
    }

    // Deletes a scheduled outfit based on the calendar_id and outfit_id
    async deleteScheduledOutfit(calendar_id, outfit_id) {
        // Query to delete the specific outfit from the schedule table
        const [result] = await this.pool.query('DELETE FROM schedule WHERE calendar_id = ? AND outfit_id = ?', [calendar_id, outfit_id]);
        return result.affectedRows > 0; // Return true if the delete was successful
    }
}

// Exporting a new instance of ScheduleService for use in other parts of the application
module.exports = new ScheduleService();
