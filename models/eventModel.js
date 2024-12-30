// models/eventModel.js

// Event class that represents an event in the system.
class Event {
    constructor (id, name, desc) {
        this.id = id;         // Unique identifier for the event
        this.name = name;     // Name of the event
        this.desc = desc;     // Description of the event
    }

    // Static method to create an Event instance from a database row
    static fromRow(row) {
        return new Event (
            row.event_id,        // Database column 'event_id' will be mapped to 'id'
            row.event_name,      // Database column 'event_name' will be mapped to 'name'
            row.description      // Database column 'description' will be mapped to 'desc'
        );
    }
}

// Export the Event class so it can be used elsewhere in the application
module.exports = Event;
