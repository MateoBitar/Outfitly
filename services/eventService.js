// services/eventService.js
const { initDB } = require('../config/database');  // Import the initDB function for database connection
const Event = require('../models/eventModel');    // Import the Event model to map database rows to objects

class EventService {
    constructor() {
        this.pool = null; // Initialize pool to null, will hold database connection pool
        this.init();      // Call init method to initialize the pool
    }

    // Initialize the database connection pool
    async init() {
        this.pool = await initDB(); // Set the pool to the connection returned by initDB()
    }

    // Add a new event to the database
    async addEvent(eventData) {
        const {name, desc = "No Description"} = eventData; // Destructure eventData, set default description if none provided
        const [result] = await this.pool.query(
            'INSERT INTO events (event_name, description) VALUES (?, ?)', [name, desc] // Query to insert the event data
        );
        return {id: result.insertId, name, desc}; // Return event with generated ID, name, and description
    }

    // Get all events from the database
    async getAllEvents() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM events'); // Query to fetch all events
            return rows.map(Event.fromRow); // Map each row to an Event object
        } catch (e) {
            console.error(e); // Log any error that occurs
            throw new Error(); // Throw an error for further handling
        }
    }

    // Get a specific event by its ID
    async getEventById(id) {
        const [rows] = await this.pool.query('SELECT * FROM events WHERE event_id=?', [id]); // Query to fetch event by ID
        if (rows.length === 0) return null; // Return null if no event is found
        return Event.fromRow(rows[0]); // Return the event as an Event object
    }

    // Update an event by its ID
    async saveEvent(id, eventData) {
        const {name, desc} = eventData; // Destructure eventData for name and description
        const [result] = await this.pool.query(
            'UPDATE events SET event_name = ?, description = ? WHERE event_id = ?', [name, desc, id] // Update query
        );
        return result.affectedRows > 0; // Return true if rows were updated, otherwise false
    }

    // Delete an event by its ID
    async deleteEvent(id) {
        const [result] = await this.pool.query('DELETE FROM events WHERE event_id = ?', [id]); // Delete query
        return result.affectedRows > 0; // Return true if rows were deleted, otherwise false
    }
}

// Export the EventService instance for use in other parts of the application
module.exports = new EventService();
