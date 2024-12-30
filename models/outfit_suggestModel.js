// models/outfit_suggestModel.js
const moment = require("moment");

// OutfitSuggestion class representing an outfit suggestion entry in the database
class OutfitSuggestion {
    // Constructor to initialize an OutfitSuggestion instance
    constructor(id, date, user_id, outfit_id) {
        this.id = id;          // Unique identifier for the suggestion
        this.date = date;      // Date of the outfit suggestion
        this.user_id = user_id;  // ID of the user who created the suggestion
        this.outfit_id = outfit_id; // ID of the suggested outfit
    }

    // Static method to convert a database row into an OutfitSuggestion instance
    static fromRow(row) {
        return new OutfitSuggestion (
            row.suggest_id, // Mapping the suggest_id field from the database to id
            moment(row.suggest_date).format("YYYY-MM-DD"), // Format the date using moment.js
            row.user_id,    // Mapping the user_id from the database row
            row.outfit_id   // Mapping the outfit_id from the database row
        );
    }
}

// Exporting the OutfitSuggestion model for use in other parts of the application
module.exports = OutfitSuggestion;
