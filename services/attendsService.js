// services/attendsService.js
const { initDB } = require('../config/database');
const Attends = require('../models/attendsModel');

class AttendsService {
    constructor() {
        this.pool = null;  // Database connection pool
        this.init();  // Initialize the database connection
    }

    // Initialize database connection pool
    async init() {
        this.pool = await initDB();  // Set up the pool to interact with the database
    }

    // Add a user to an event
    async attendEvent(attendData) {
        const { user_id, event_id } = attendData;
        // Insert the attendance record into the 'attends' table
        await this.pool.query(
            'INSERT INTO attends (user_id, event_id) VALUES (?, ?)', [user_id, event_id]
        );
        // Return the user and event IDs to confirm the attendance was added
        return { user_id, event_id };
    }

    // Get all events attended by a specific user
    async getEventsAttended(user_id) {
        const [rows] = await this.pool.query(
            `SELECT attends.user_id, attends.event_id, events.event_name, events.description
            FROM attends 
            JOIN events ON attends.event_id = events.event_id
            WHERE attends.user_id = ?`, [user_id]);
        // If no events are found for the user, return null
        if (rows.length === 0) return [];
        // Map rows to the 'Attends' model and return the event data
        return rows
    }

    // Get all attendees for a specific event by event ID
    async getAttendeesByEventId(event_id) {
        const [rows] = await this.pool.query('SELECT user_id FROM attends WHERE event_id = ?', [event_id]);
        // If no attendees are found for the event, return null
        if (rows.length === 0) return null;
        // Map rows to the 'Attends' model and return the user data
        return rows.map(Attends.fromRow);
    }

    // Remove a user from attending an event
    async unattendEvent(user_id, event_id) {
        const [result] = await this.pool.query('DELETE FROM attends WHERE user_id = ? AND event_id = ?', [user_id, event_id]);
        // Return true if the attendance record was successfully deleted, otherwise false
        return result.affectedRows > 0;
    }
}

// Export the instance of AttendsService to be used elsewhere in the app
module.exports = new AttendsService();
