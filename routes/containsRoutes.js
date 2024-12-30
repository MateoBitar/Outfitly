// routes/containsRoutes.js

// Import required modules
const express = require('express');  // Express framework for routing
const { validateLink, validateItem_Id, validateOutfit_Id } = require('../validators/containsDTO');  // Import validation middlewares
const containsController = require('../controllers/containsController');  // Import the controller that handles the logic

const router = express.Router();  // Create an Express router

// Define routes and bind them to the appropriate controller methods

// POST route to link an item to an outfit
// This route validates the data using validateLink middleware before calling the controller method to handle the logic
router.post('/', validateLink, (req, res) => containsController.linkItemToOutfit(req, res));

// GET route to get all items in a specific outfit
// The route validates the 'outfit_id' parameter using validateOutfit_Id middleware before fetching the data
router.get('/outfit_id/:outfit_id', validateOutfit_Id, (req, res) => containsController.getItemsInOutfit(req, res));

// GET route to get all outfits using a specific item
// The route validates the 'item_id' parameter using validateItem_Id middleware before fetching the data
router.get('/item_id/:item_id', validateItem_Id, (req, res) => containsController.getOutfitsUsingItem(req, res));

// DELETE route to unlink an item from an outfit
// The route validates both 'item_id' and 'outfit_id' parameters before calling the controller to unlink the item
router.delete('/item_id/outfit_id/:item_id/:outfit_id', [validateItem_Id, validateOutfit_Id], (req, res) => containsController.unlinkItemFromOutfit(req, res));

// Export the router to be used in the main application
module.exports = router;
