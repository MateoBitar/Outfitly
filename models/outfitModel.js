// models/outfitModel.js

class Outfit {
    // Constructor to initialize an Outfit instance with specific attributes
    constructor(id, name, image, details, weather, user_id) {
        this.id = id;               // Unique identifier for the outfit
        this.name = name;           // Name of the outfit
        this.image = image;         // Image associated with the outfit
        this.details = details;     // Additional details about the outfit
        this.weather = weather;     // Weather condition suited for this outfit
        this.user_id = user_id;     // ID of the user who owns the outfit
    }

    // Static method to create an Outfit instance from a database row
    static fromRow(row) {
        return new Outfit(
            row.outfit_id,         // Map 'outfit_id' column from the row to 'id'
            row.outfit_name,       // Map 'outfit_name' column to 'name'
            row.outfit_image,      // Map 'outfit_image' column to 'image'
            row.details,           // Map 'details' column directly
            row.weather,           // Map 'weather' column directly
            row.user_id            // Map 'user_id' column directly
        );
    }
}

module.exports = Outfit; // Export the Outfit class for use in other files
