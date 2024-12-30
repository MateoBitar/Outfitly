// routes/weekRoutes.js
const express = require('express');
const { validateWeek, validateWeekId } = require('../validators/weekDTO');
const weekController = require('../controllers/weekController');

const router = express.Router();

// Route to add a new week entry
// Validates 'day' and 'user_id' from the request body before calling the controller
router.post('/', validateWeek, (req, res) => weekController.addWeek(req, res));

// Route to get all weeks
// Calls the controller to retrieve and return all weeks in the database
router.get('/', (req, res) => weekController.getAllWeeks(req, res));

// Route to get a specific week by its ID
// Validates the 'id' from the URL parameters before calling the controller
router.get('/:id', validateWeekId, (req, res) => weekController.getWeekById(req, res));

// Route to update an existing week by its ID
// Validates 'id' from the URL parameters and 'day' and 'user_id' from the request body
// Then calls the controller to save the updated week
router.put('/:id', [validateWeekId, validateWeek], (req, res) => weekController.saveWeek(req, res));

// Route to delete a specific week by its ID
// Validates the 'id' from the URL parameters before calling the controller to delete the week
router.delete('/:id', validateWeekId, (req, res) => weekController.deleteWeek(req, res));

module.exports = router;
