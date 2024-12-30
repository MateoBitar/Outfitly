// controllers/associatedwithController.js

// Import necessary services to interact with outfits, events, and the associated relationship
const associatedwithService = require('../services/associatedwithService');
const outfitService = require('../services/outfitService');
const eventService = require('../services/eventService');

class AssociatedWithController {

    // Handles associating an outfit with an event
    async associateOutfitWithEvent(req, res) {
        try {
            // Destructure outfit_id and event_id from the request body
            const { outfit_id, event_id } = req.body;

            // Check if the outfit exists
            const outfit = await outfitService.getOutfitById(outfit_id);
            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found' });
            }

            // Check if the event exists
            const event = await eventService.getEventById(event_id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Create a new association between the outfit and event
            const newAssociation = await associatedwithService.associateOutfitWithEvent({ outfit_id, event_id });

            // Respond with the newly created association
            res.status(201).json(newAssociation);
        } catch (e) {
            // Handle errors and log them
            console.error('Error associating outfit with event:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Handles retrieving events where a specific outfit has been used
    async getEventsWhereOutfitUsed(req, res) {
        try {
            // Parse the outfit_id from the request parameters
            const id = parseInt(req.params.outfit_id, 10);

            // Check if the outfit exists
            const outfit = await outfitService.getOutfitById(id);
            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found' });
            }

            // Get the list of events where the outfit has been used
            const eventsWhereOutfitUsed = await associatedwithService.getEventsWhereOutfitUsed(id);

            // Respond with the events
            res.status(200).json(eventsWhereOutfitUsed);
        } catch (e) {
            // Handle errors and log them
            console.error('Error fetching events where outfit was used:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Handles retrieving outfits used in a specific event
    async getOutfitsByEventId(req, res) {
        try {
            // Parse the event_id from the request parameters
            const id = parseInt(req.params.event_id, 10);

            // Check if the event exists
            const event = await eventService.getEventById(id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Get the list of outfits associated with the event
            const eventOutfits = await associatedwithService.getOutfitsByEventId(id);

            // Respond with the outfits
            res.status(200).json(eventOutfits);
        } catch (e) {
            // Handle errors and log them
            console.error('Error fetching event outfits:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Handles unassociating an outfit from an event
    async unassociateOutfitFromEvent(req, res) {
        try {
            // Parse the outfit_id and event_id from the request parameters
            const outfit_id = parseInt(req.params.outfit_id, 10);
            const event_id = parseInt(req.params.event_id, 10);

            // Attempt to remove the association between the outfit and event
            const success = await associatedwithService.unassociateOutfitFromEvent(outfit_id, event_id);
            if (!success) {
                return res.status(404).json({ message: 'Outfit or Event not found' });
            }

            // Respond with success message
            res.status(200).json({ message: 'Outfit unassociated from event successfully' });
        } catch (e) {
            // Handle errors and log them
            console.error('Error deleting event outfit:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// Export the controller as a singleton to be used in routes
module.exports = new AssociatedWithController();
