// models/attendsModel.js

// The Attends class represents the relationship between a user and an event that they are attending.
class Attends {
    // Constructor to initialize the Attends object with 'user_id' and 'event_id'
    constructor (user_id, event_id) {
        this.user_id = user_id;  // The ID of the user attending the event
        this.event_id = event_id; // The ID of the event the user is attending
    }

    // Static method to convert a database row into an Attends object
    // This is useful when fetching data from the database
    static fromRow(row) {
        // Maps a database row to an Attends object with 'user_id' and 'event_id'
        return new Attends (
            row.user_id,  // The ID of the user
            row.event_id  // The ID of the event
        );
    }
}

// Exporting the Attends class so it can be used in other parts of the application
module.exports = Attends;
