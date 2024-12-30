// models/containsModel.js

// Define the Contains model class to represent the relationship between items and outfits
class Contains {
    // Constructor to initialize the Contains model with item_id and outfit_id
    constructor(item_id, outfit_id) {
        this.item_id = item_id;  // Unique identifier for the item
        this.outfit_id = outfit_id;  // Unique identifier for the outfit
    }

    // Static method to create a Contains instance from a database row
    static fromRow(row) {
        // Returns a new Contains object with values from the row object
        return new Contains(
            row.item_id,  // Map the item_id from the row
            row.outfit_id  // Map the outfit_id from the row
        );
    }
}

// Export the Contains model for use in the service layer
module.exports = Contains;
