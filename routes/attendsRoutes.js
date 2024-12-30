// routes/attendsRoutes.js
const express = require('express');
const { validateAttendee, validateUser_Id, validateEvent_Id } = require('../validators/attendsDTO');
const attendsController = require('../controllers/attendsController');

const router = express.Router();

// Route to allow a user to attend an event
// It expects a POST request with 'user_id' and 'event_id' in the request body
// The request is validated using the 'validateAttendee' middleware
router.post('/', validateAttendee, (req, res) => attendsController.attendEvent(req, res));

// Route to fetch all events attended by a specific user
// It expects a GET request with 'user_id' as a URL parameter
// The 'validateUser_Id' middleware ensures the 'user_id' is a valid integer
router.get('/user_id/:user_id', validateUser_Id, (req, res) => attendsController.getEventsAttended(req, res));

// Route to fetch all attendees for a specific event
// It expects a GET request with 'event_id' as a URL parameter
// The 'validateEvent_Id' middleware ensures the 'event_id' is a valid integer
router.get('/event_id/:event_id', validateEvent_Id, (req, res) => attendsController.getAttendeesByEventId(req, res));

// Route to remove a user's attendance for a specific event
// It expects a DELETE request with 'user_id' and 'event_id' as URL parameters
// The 'validateUser_Id' and 'validateEvent_Id' middlewares ensure the IDs are valid
router.delete('/user_id/event_id/:user_id/:event_id', [validateUser_Id, validateEvent_Id], (req, res) => attendsController.unattendEvent(req, res));

// Export the router for use in the main application
module.exports = router;
