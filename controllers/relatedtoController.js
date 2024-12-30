// controllers/relatedtoController.js

// Importing services for handling event and suggestion data
const relatedtoService = require('../services/relatedtoService');
const eventService = require('../services/eventService');
const suggestService = require('../services/outfit_suggestService');

class RelatedToController {

    // Controller action for relating a suggestion to an event
    async relateSuggestionToEvent(req, res) {
        try {
            // Destructure event_id and suggest_id from the request body
            const { event_id, suggest_id } = req.body;
            
            // Check if the event exists by fetching it using the event_id
            const event = await eventService.getEventById(event_id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' }); // Return error if event does not exist
            }

            // Check if the suggestion exists by fetching it using the suggest_id
            const suggest = await suggestService.getOutfitSuggestionById(suggest_id);
            if (!suggest) {
                return res.status(404).json({ message: 'Suggestion not found' }); // Return error if suggestion does not exist
            }

            // Call the service to relate the suggestion to the event
            const newSuggestionForEvent = await relatedtoService.relateSuggestionToEvent({ event_id, suggest_id });

            // Send a successful response with the newly created suggestion-event relationship
            res.status(201).json(newSuggestionForEvent);
        } catch (e) {
            console.error('Error relating suggestion to event:', e); // Log any errors to the console
            res.status(500).json({ message: 'Internal server error' }); // Return generic server error if an exception occurs
        }
    }

    // Controller action for fetching all suggestions related to a specific event
    async getSuggestionsForEvent(req, res) {
        try {
            // Extract event_id from the request parameters
            const id = parseInt(req.params.event_id, 10);

            // Check if the event exists by fetching it using the event_id
            const event = await eventService.getEventById(id);
            if (!event) {
                //return res.status(404).json({ message: 'Event not found' }); // Return error if event does not exist
                return res.status(404).render('errorView', { error: 'Event not found'});
            }

            // Fetch all suggestions related to the event using the relatedtoService
            const eventSuggestions = await relatedtoService.getSuggestionsForEvent(id);

            // Return a success response with the related suggestions for the event
            //res.status(200).json(eventSuggestions);
            res.status(200).render('eventSuggestionView', { event, suggestions: eventSuggestions });
        } catch (e) {
            console.error('Error fetching event suggestions:', e); // Log any errors
            res.status(500).json({ message: 'Internal server error' }); // Return generic server error if an exception occurs
        }
    }

    // Controller action for fetching all events that are related to a specific suggestion
    async getEventsOfSuggestion(req, res) {
        try {
            // Extract suggest_id from the request parameters
            const id = parseInt(req.params.suggest_id, 10);

            // Check if the suggestion exists by fetching it using the suggest_id
            const suggest = await suggestService.getOutfitSuggestionById(id);
            if (!suggest) {
                return res.status(404).json({ message: 'Suggestion not found' }); // Return error if suggestion does not exist
            }

            // Fetch all events related to the suggestion using the relatedtoService
            const suggestionEvents = await relatedtoService.getEventsOfSuggestion(id);

            // Return a success response with the events related to the suggestion
            res.status(200).json(suggestionEvents);
        } catch (e) {
            console.error('Error fetching suggestion events:', e); // Log any errors
            res.status(500).json({ message: 'Internal server error' }); // Return generic server error if an exception occurs
        }
    }

    // Controller action for unlinking a suggestion from an event
    async unrelateSuggestionFromEvent(req, res) {
        try {
            // Extract event_id and suggest_id from the request parameters
            const event_id = parseInt(req.params.event_id, 10);
            const suggest_id = parseInt(req.params.suggest_id, 10);

            // Attempt to unlink the suggestion from the event using the relatedtoService
            const success = await relatedtoService.unrelateSuggestionFromEvent(event_id, suggest_id);
            if (!success) {
                return res.status(404).json({ message: 'Event or Suggestion not found' }); // Return error if either event or suggestion doesn't exist
            }

            // Return a success response if the unlink operation was successful
            res.status(200).json({ message: 'Suggestion unrelated from event successfully' });
        } catch (e) {
            console.error('Error unrelating event suggestion:', e); // Log any errors
            res.status(500).json({ message: 'Internal server error' }); // Return generic server error if an exception occurs
        }
    }
}

// Export the controller as an instance so it can be used in routes
module.exports = new RelatedToController();
