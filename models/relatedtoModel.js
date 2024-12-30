// models/relatedtoModel.js

// RelatedTo model represents the relationship between events and suggestions in the database.
class RelatedTo {
    // Constructor initializes the event_id and suggest_id properties
    constructor(event_id, suggest_id) {
        this.event_id = event_id;   // ID of the related event
        this.suggest_id = suggest_id; // ID of the related suggestion
    }

    // Static method to create a RelatedTo instance from a database row (result from query)
    static fromRow(row) {
        return new RelatedTo(
            row.event_id,  // event ID from the row
            row.suggest_id // suggestion ID from the row
        );
    }
}

module.exports = RelatedTo; // Export the RelatedTo model for use in other parts of the app
