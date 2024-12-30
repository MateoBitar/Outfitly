// routes/outfit_suggestRoutes.js
const express = require('express');
const { validateOutfitSuggestion, validateOutfitSuggestionId } = require('../validators/outfit_suggestDTO');
const outfitSuggestionController = require('../controllers/outfit_suggestController');

const router = express.Router();

// POST route to add a new outfit suggestion
// This route validates the request body (outfit suggestion data) and then passes it to the controller
router.post('/', validateOutfitSuggestion, (req, res) => outfitSuggestionController.addOutfitSuggestion(req, res));

router.get('/suggest-outfit', (req, res) => outfitSuggestionController.getOutfitSuggestionsByUserId(req, res));

// GET route to fetch all outfit suggestions
// This route does not require any specific validation, it simply fetches all suggestions and passes them to the controller
router.get('/', (req, res) => outfitSuggestionController.getAllOutfitSuggestions(req, res));

// GET route to fetch a specific outfit suggestion by ID
// This route validates the 'id' parameter in the URL and passes the request to the controller to fetch the suggestion
router.get('/:id', validateOutfitSuggestionId, (req, res) => outfitSuggestionController.getOutfitSuggestionById(req, res));

// PUT route to update an existing outfit suggestion by ID
// This route validates both the 'id' parameter and the body of the request, then passes the data to the controller to save the changes
router.put('/:id', [validateOutfitSuggestionId, validateOutfitSuggestion], (req, res) => outfitSuggestionController.saveOutfitSuggestion(req, res));

// DELETE route to delete a specific outfit suggestion by ID
// This route validates the 'id' parameter and then passes the request to the controller to delete the suggestion
router.delete('/:id', validateOutfitSuggestionId, (req, res) => outfitSuggestionController.deleteOutfitSuggestion(req, res));



module.exports = router;
