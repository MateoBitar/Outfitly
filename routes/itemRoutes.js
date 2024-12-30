// routes/itemRoutes.js
const express = require('express');
const { validateAddItem, validateSaveItem, validateItemId } = require('../validators/itemDTO');
const itemController = require('../controllers/itemController');

const router = express.Router();

// Route to render the items creation view
router.get('/create', async (req, res) => {
    res.render('addGarmentView');
});

// Define the route for adding a new item
router.post('/', validateAddItem, (req, res) => itemController.addItem(req, res));
// This route is responsible for handling POST requests to add a new item to the system.
// It first validates the input data using the 'validateAddItem' middleware before passing it to the 'addItem' method in the controller.

// Define the route for fetching all items
router.get('/', (req, res) => itemController.getAllItems(req, res));
// This route handles GET requests to retrieve all items.
// It directly invokes the 'getAllItems' method in the controller to return a list of items.

// GET route to fetch a specific user items by ID
// The 'validateOutfitId' middleware ensures that the 'id' parameter is valid before passing to the controller
router.get('/user_id/:id', validateItemId, (req, res) => itemController.getGarmentsByUserId(req, res));

// Define the route for fetching a specific item by ID
router.get('/:id', validateItemId, (req, res) => itemController.getItemById(req, res));
// This route is used to get a single item based on the ID passed in the URL.
// The 'validateItemId' middleware ensures the ID is valid before invoking the 'getItemById' method in the controller.

// Define the route for updating an existing item by ID
router.put('/:id', [validateItemId, validateSaveItem], (req, res) => itemController.saveItem(req, res));
// This route handles PUT requests to update an item by its ID.
// It first validates the ID using 'validateItemId' and then validates the updated data using 'validateSaveItem' before calling the 'saveItem' method in the controller.

// Define the route for deleting an item by ID
router.post('/delete/:id', validateItemId, (req, res) => itemController.deleteItem(req, res));
// This route is used to delete an item by its ID.
// It validates the ID first with the 'validateItemId' middleware before passing the request to the 'deleteItem' method in the controller.

// Route to fetch user items and render the selection view
router.get('/select-items', (req, res) => wardrobeController.getUserItems(req, res));

module.exports = router;
// The router is exported so that it can be used in the main server file to handle the routes related to items.
