// services/containsService.js
const { initDB } = require('../config/database');  // Import the database initialization function
const Contains = require('../models/containsModel');  // Import the Contains model

class ContainsService {
    constructor() {
        this.pool = null;  // Initialize the database connection pool as null
        this.init();  // Call the init method to establish the DB connection
    }

    // Method to initialize the database connection
    async init() {
        this.pool = await initDB();  // Assign the pool object after initializing the database
    }

    // Method to link an item to an outfit (inserting a record into 'contains' table)
    async linkItemToOutfit(containsData) {
        const { item_id, outfit_id } = containsData;  // Destructure item_id and outfit_id from input data
        await this.pool.query(
            'INSERT INTO contains (item_id, outfit_id) VALUES (?, ?)', [item_id, outfit_id]  // Insert the record into 'contains' table
        );
        return { item_id, outfit_id };  // Return the linked data
    }

    // Method to get all items in a specific outfit
    async getItemsInOutfit(outfit_id) {
        const [rows] = await this.pool.query('SELECT item_id FROM contains WHERE outfit_id = ?', [outfit_id]);  // Query for items in the given outfit
        if (rows.length === 0) return null;  // Return null if no items are found
        return rows.map(Contains.fromRow);  // Map the rows to Contains model instances and return them
    }

    // Method to get all outfits that use a specific item
    async getOutfitsUsingItem(item_id) {
        const [rows] = await this.pool.query('SELECT outfit_id FROM contains WHERE item_id = ?', [item_id]);  // Query for outfits using the given item
        if (rows.length === 0) return null;  // Return null if no outfits are found
        return rows.map(Contains.fromRow);  // Map the rows to Contains model instances and return them
    }

    // Method to unlink an item from an outfit (deleting the record from 'contains' table)
    async unlinkItemFromOutfit(item_id, outfit_id) {
        const [result] = await this.pool.query('DELETE FROM contains WHERE item_id = ? AND outfit_id = ?', [item_id, outfit_id]);  // Delete the link from the 'contains' table
        return result.affectedRows > 0;  // Return true if the deletion was successful
    }
}

// Export an instance of ContainsService for use in other parts of the application
module.exports = new ContainsService();
