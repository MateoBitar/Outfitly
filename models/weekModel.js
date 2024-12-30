// models/weekModel.js

// Define the Week class that represents a week entry in the database
class Week {
    // Constructor to initialize the Week object with properties
    constructor (id, day, user_id) {
        this.id = id;            // Unique identifier for the week entry
        this.day = day;          // The day of the week (e.g., 'Monday', 'Tuesday')
        this.user_id = user_id;  // The ID of the user associated with this week entry
    }

    // Static method to create a Week instance from a database row (used for mapping database results to model objects)
    static fromRow(row) {
        return new Week (
            row.calendar_id,    // The ID from the database column 'calendar_id'
            row.dayofweek,      // The day of the week from the database column 'dayofweek'
            row.user_id         // The user ID from the database column 'user_id'
        );
    }
}

module.exports = Week;  // Export the Week class to be used in other parts of the application
