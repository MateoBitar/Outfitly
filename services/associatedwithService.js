// services/associatedwithService.js

// Importing database initialization function and model for associated with data
const { initDB } = require('../config/database');
const AssociatedWith = require('../models/associatedwithModel');

class AssociatedWithService {
    constructor() {
        this.pool = null; // Initialize pool as null for later connection pooling
        this.init(); // Call init method to establish the database connection
    }

    // Initialize the database connection pool
    async init() {
        this.pool = await initDB(); // Initialize the database pool using the imported initDB function
    }

    // Associate an outfit with an event
    async associateOutfitWithEvent(associatedwithData) {
        const { outfit_id, event_id } = associatedwithData;  // Destructure the outfit_id and event_id from the data

        // Insert the outfit_id and event_id into the associated_with table
        await this.pool.query(
            'INSERT INTO associated_with (outfit_id, event_id) VALUES (?, ?)', [outfit_id, event_id]
        );
        return { outfit_id, event_id };  // Return the association data
    }

    // Get all events where a specific outfit has been used
    async getEventsWhereOutfitUsed(outfit_id) {
        const [rows] = await this.pool.query('SELECT event_id FROM associated_with WHERE outfit_id = ?', [outfit_id]);
        
        // If no rows are found, return null
        if (rows.length === 0) return null;

        // Map through the rows and return instances of the AssociatedWith model
        return rows.map(AssociatedWith.fromRow);
    }

    // Get all outfits associated with a specific event
    async getOutfitsByEventId(event_id) {
        const [rows] = await this.pool.query('SELECT outfit_id FROM associated_with WHERE event_id = ?', [event_id]);
        
        // If no rows are found, return null
        if (rows.length === 0) return null;

        // Map through the rows and return instances of the AssociatedWith model
        return rows.map(AssociatedWith.fromRow);
    }

    // Remove an outfit association with an event
    async unassociateOutfitFromEvent(outfit_id, event_id) {
        const [result] = await this.pool.query('DELETE FROM associated_with WHERE outfit_id = ? AND event_id = ?', [outfit_id, event_id]);
        
        // Return true if a record was deleted, otherwise false
        return result.affectedRows > 0;
    }
}

// Exporting a singleton instance of AssociatedWithService for use in controllers
module.exports = new AssociatedWithService();
