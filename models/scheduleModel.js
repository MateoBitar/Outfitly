// models/scheduleModel.js

// Schedule model to represent scheduled outfits
class Schedule {
    // Constructor to initialize the Schedule object with calendar_id and outfit_id
    constructor(calendar_id, outfit_id) {
        this.calendar_id = calendar_id; // Represents the calendar entry ID
        this.outfit_id = outfit_id; // Represents the outfit ID scheduled for that day
    }

    // Static method to create a Schedule instance from a database row
    static fromRow(row) {
        return new Schedule(
            row.calendar_id, // Calendar ID from the database row
            row.outfit_id // Outfit ID from the database row
        );
    }
}

// Export the Schedule model so it can be used elsewhere in the application
module.exports = Schedule;