// services/outfit_suggestService.js
const { initDB } = require('../config/database');
const OutfitSuggestion = require('../models/outfit_suggestModel');

// OutfitSuggestionService class handles database operations related to outfit suggestions
class OutfitSuggestionService {
    constructor() {
        this.pool = null;
        this.init(); // Initialize the database connection pool
    }

    // Initializes the database connection pool
    async init() {
        this.pool = await initDB();
    }

    // Adds a new outfit suggestion to the database
    async addOutfitSuggestion(outfitsuggestionData) {
        const { user_id, outfit_id } = outfitsuggestionData; // Extract user_id and outfit_id from the input data
        const [result] = await this.pool.query(
            'INSERT INTO outfit_suggest (suggest_date, user_id, outfit_id) VALUES (NOW(), ?, ?)', 
            [user_id, outfit_id] // Use current time (NOW()) for suggest_date
        );
        return {id: result.insertId, user_id, outfit_id}; // Return the inserted data including the generated id
    }

    // Retrieves all outfit suggestions from the database
    async getAllOutfitSuggestions() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM outfit_suggest');
            return rows.map(OutfitSuggestion.fromRow); // Convert each row into an OutfitSuggestion instance
        } catch (e) {
            console.error(e);
            throw new Error(); // Handle any errors during the database query
        }
    }

    // Retrieves a single outfit suggestion by its ID
    async getOutfitSuggestionById(id) {
        const [rows] = await this.pool.query('SELECT * FROM outfit_suggest WHERE suggest_id = ?', [id]);
        if (rows.length === 0) return null; // Return null if no record is found
        return OutfitSuggestion.fromRow(rows[0]); // Convert the row into an OutfitSuggestion instance
    }

    // Updates an existing outfit suggestion in the database
    async saveOutfitSuggestion(id, outfitsuggestionData) {
        const { user_id, outfit_id } = outfitsuggestionData;
        const [result] = await this.pool.query(
            'UPDATE outfit_suggest SET user_id = ?, outfit_id = ? WHERE suggest_id = ?',
            [user_id, outfit_id, id] // Update the suggestion based on the provided id
        );
        return result.affectedRows > 0; // Return true if any row was affected (indicating a successful update)
    }

    // Deletes an outfit suggestion by its ID
    async deleteOutfitSuggestion(id) {
        const [result] = await this.pool.query('DELETE FROM outfit_suggest WHERE suggest_id = ?', [id]);
        return result.affectedRows > 0; // Return true if any row was deleted (indicating a successful deletion)
    }

    async getOutfitSuggestionsByUserId(user_id) {
        try {
            const [rows] = await this.pool.query(`
                SELECT outfit_suggest.suggest_id, outfit_suggest.outfit_id, outfits.outfit_image, outfits.outfit_name
                FROM outfit_suggest INNER JOIN outfits ON outfit_suggest.outfit_id = outfits.outfit_id
                WHERE outfit_suggest.user_id = ?`, [user_id]);
            return rows; // Return the outfit suggestions with image and name
        } catch (error) {
            console.error('Error fetching outfit suggestions:', error);
            throw error;  // Re-throw the error for further handling
        }
    }    
}

// Exporting the service as a singleton instance
module.exports = new OutfitSuggestionService();
