// routes/eventRoutes.js
const express = require('express');  // Importing express library to create a router
const { validateAddEvent, validateSaveEvent, validateEventId } = require('../validators/eventDTO');  // Importing validators for the routes
const eventController = require('../controllers/eventController');  // Importing the event controller to handle route actions

const router = express.Router();  // Creating a new router instance for event-related routes

// Define routes for the event-related operations

// Route to render the event creation form
router.get('/create', (req, res) => {
    const suggest_id = req.query.suggest_id;
    // Assuming user is available in req.locals
    res.render('addEventView', { user: res.locals.user, suggest_id });
});

// POST route to create a new event
// Applies validateAddEvent middleware to validate the incoming request data
router.post('/', validateAddEvent, (req, res) => eventController.addEvent(req, res));

// GET route to fetch all events
router.get('/', (req, res) => eventController.getAllEvents(req, res));

// GET route to fetch a specific event by its ID
// Applies validateEventId middleware to validate the 'id' parameter in the URL
router.get('/:id', validateEventId, (req, res) => eventController.getEventById(req, res));

// PUT route to update an existing event by its ID
// Applies both validateEventId and validateSaveEvent middleware to validate both the 'id' and the request body
router.put('/:id', [validateEventId, validateSaveEvent], (req, res) => eventController.saveEvent(req, res));

// DELETE route to delete an event by its ID
// Applies validateEventId middleware to validate the 'id' parameter in the URL
router.post('/delete/:id', validateEventId, (req, res) => eventController.deleteEvent(req, res));

module.exports = router;  // Export the router so it can be used in the main app file
