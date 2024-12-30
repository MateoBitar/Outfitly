// controllers/attendsController.js

// Importing necessary services to interact with user, event, and attendance data
const attendsService = require('../services/attendsService');
const userService = require('../services/userService');
const eventService = require('../services/eventService');

class AttendsController {

    // Method to handle user attending an event
    async attendEvent(req, res) {
        try {
            const {user_id, event_id} = req.body;

            // Check if the user exists by calling the user service
            const user = await userService.getUserById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the event exists by calling the event service
            const event = await eventService.getEventById(event_id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Call the service to mark the user as attending the event
            const newEventToAttend = await attendsService.attendEvent({ user_id, event_id });
            
            // Respond with the new attendance data
            res.status(201).json(newEventToAttend);
        } catch (e) {
            console.error('Error attending event:', e);
            res.status(500).json({message: 'Internal server error'});
        }
    }

    // Method to retrieve all events attended by a specific user
    async getEventsAttended(req, res) {
        try {
            const id = parseInt(req.params.user_id, 10);
            
            // Check if the user exists
            const user = await userService.getUserById(id);
            
            if (!user) {
                //return res.status(404).json({ message: 'User not found' });
                return res.status(404).render('errorView', { error: 'User not found' });
            }

            // Call the service to get the events the user has attended
            const eventsAttended = await attendsService.getEventsAttended(id);
            
            // Ensure eventsAttended is an array, even if no events are found
            //res.status(200).json(eventsAttended);
            if (Array.isArray(eventsAttended) && eventsAttended.length > 0) {
                // Render the eventsView with user and event data
                return res.render('eventsView', { user, events: eventsAttended });
            } else {
                // If no events, pass an empty array to events
                return res.render('eventsView', { user, events: [] });
            }
        } catch (e) {
            //console.error('Error fetching user attended events:', e);
            //res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('errorView', { error: 'Internal server error' });
        }
    }

    // Method to retrieve all attendees for a specific event
    async getAttendeesByEventId(req, res) {
        try {
            const id = parseInt(req.params.event_id, 10);

            // Check if the event exists
            const event = await eventService.getEventById(id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Call the service to get the list of attendees for the event
            const eventAttendees = await attendsService.getAttendeesByEventId(id);

            // Respond with the list of attendees
            res.status(200).json(eventAttendees);
        } catch (e) {
            console.error('Error fetching event attendees:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Method to handle user un-attending an event
    async unattendEvent(req, res) {
        try {
            const user_id = parseInt(req.params.user_id, 10);
            const event_id = parseInt(req.params.event_id, 10);

            // Call the service to remove the user from the event
            const success = await attendsService.unattendEvent(user_id, event_id);
            if (!success) {
                return res.status(404).json({ message: 'User or Event not found' });
            }

            // Respond with success message
            res.status(200).json({ message: 'Event unattended successfully' });
        } catch (e) {
            console.error('Error deleting attended event:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// Exporting the instance of the controller for use in routes
module.exports = new AttendsController();
