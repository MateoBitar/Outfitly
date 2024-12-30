// routes/associatedwithRoutes.js

// Importing necessary modules and dependencies
const express = require('express');
const { validateAssociation, validateOutfit_Id, validateEvent_Id } = require('../validators/associatedwithDTO');
const associatedwithController = require('../controllers/associatedwithController');

// Creating an instance of the express router to define routes
const router = express.Router();

// Define POST route for associating an outfit with an event
// Validates the request body using validateAssociation middleware
router.post('/', validateAssociation, (req, res) => associatedwithController.associateOutfitWithEvent(req, res));

// Define GET route to retrieve events where a specific outfit is used
// Validates the outfit_id parameter using validateOutfit_Id middleware
router.get('/outfit_id/:outfit_id', validateOutfit_Id, (req, res) => associatedwithController.getEventsWhereOutfitUsed(req, res));

// Define GET route to retrieve outfits used for a specific event
// Validates the event_id parameter using validateEvent_Id middleware
router.get('/event_id/:event_id', validateEvent_Id, (req, res) => associatedwithController.getOutfitsByEventId(req, res));

// Define DELETE route to unassociate an outfit from an event
// Validates both the outfit_id and event_id parameters using their respective middlewares
router.delete('/outfit_id/event_id/:outfit_id/:event_id', [validateOutfit_Id, validateEvent_Id], (req, res) => associatedwithController.unassociateOutfitFromEvent(req, res));

// Exporting the router to be used in the main app
module.exports = router;
