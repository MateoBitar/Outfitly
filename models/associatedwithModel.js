// models/associatedwithModel.js

// The AssociatedWith class represents the relationship between an outfit and an event
class AssociatedWith {
    constructor (outfit_id, event_id) {
        // Initialize the class with outfit_id and event_id
        this.outfit_id = outfit_id;
        this.event_id = event_id;
    }

    // Static method to convert a database row into an instance of the AssociatedWith class
    static fromRow(row) {
        // Creates a new AssociatedWith instance from a row of data
        return new AssociatedWith(
            row.outfit_id,  // Assign the outfit_id from the row
            row.event_id    // Assign the event_id from the row
        );
    }
}

// Export the AssociatedWith class to be used in other parts of the application
module.exports = AssociatedWith;
