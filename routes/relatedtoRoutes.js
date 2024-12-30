// routes/relatedtoRoutes.js
const express = require('express');  // Import the express module
const {validateRelation, validateEvent_Id, validateSuggest_Id} = require('../validators/relatedtoDTO');  // Import validation middleware
const relatedtoController = require('../controllers/relatedtoController');  // Import the controller

const router = express.Router();  // Create an Express router

// Define routes

// POST route to relate a suggestion to an event
router.post('/', validateRelation, (req, res) => relatedtoController.relateSuggestionToEvent(req, res));

// GET route to get all suggestions for a specific event
router.get('/event_id/:event_id', validateEvent_Id, (req, res) => relatedtoController.getSuggestionsForEvent(req, res));

// GET route to get all events related to a specific suggestion
router.get('/suggest_id/:suggest_id', validateSuggest_Id, (req, res) => relatedtoController.getEventsOfSuggestion(req, res));

// DELETE route to remove the relationship between an event and suggestion
router.delete('/event_id/suggest_id/:event_id/:suggest_id', [validateEvent_Id, validateSuggest_Id], (req, res) => relatedtoController.unrelateSuggestionFromEvent(req, res));

module.exports = router;  // Export the router for use in the main app
