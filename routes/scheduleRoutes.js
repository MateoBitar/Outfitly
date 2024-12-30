// routes/scheduleRoutes.js

// Import necessary modules
const express = require('express');
const { validateSchedule, validateCalendar_Id, validateOutfit_Id } = require('../validators/scheduleDTO'); // Validators for data validation
const scheduleController = require('../controllers/scheduleController'); // Controller to handle requests

const router = express.Router(); // Initialize a new router

// Define routes

// POST /schedule: Schedule an outfit by providing calendar_id and outfit_id in the request body
// It validates the incoming request data using validateSchedule
router.post('/', validateSchedule, (req, res) => scheduleController.scheduleOutfit(req, res));

// GET /schedule: Retrieve all scheduled outfits
router.get('/', (req, res) => scheduleController.getAllScheduledOutfits(req, res));

// GET /schedule/calendar_id/:calendar_id: Retrieve outfits scheduled for a specific day (calendar_id)
// It validates that the calendar_id is valid
router.get('/calendar_id/:calendar_id', validateCalendar_Id, (req, res) => scheduleController.getOutfitsOfDayById(req, res));

// DELETE /schedule/calendar_id/outfit_id/:calendar_id/:outfit_id: Delete a scheduled outfit by calendar_id and outfit_id
// It validates both calendar_id and outfit_id
router.delete('/calendar_id/outfit_id/:calendar_id/:outfit_id', [validateCalendar_Id, validateOutfit_Id], (req, res) => scheduleController.deleteScheduledOutfit(req, res));

// Export the router so it can be used in other parts of the application
module.exports = router;
