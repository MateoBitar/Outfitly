const express = require('express');
const { validateAddOutfit, validateSaveOutfit, validateOutfitId } = require('../validators/outfitDTO');
const outfitController = require('../controllers/outfitController');
const itemService = require('../services/itemService');
const router = express.Router();

// Route to render the items selection view
router.get('/create', async (req, res) => {
    try {
        const userId = res.locals.user.id;
        const items = await itemService.getUserItems(userId); // Fetch items
        res.render('selectItemsView', { items });
    } catch (error) {
        res.status(500).render('errorView', { error: 'Error fetching items' });
    }
});

// Route to handle item selection and redirect to outfit details form
router.post('/add-details', (req, res) => {
    try {
        const { selectedItems } = req.body;
        if (!selectedItems || selectedItems.length === 0) {
            return res.status(400).render('errorView', { error: 'No items selected' });
        }

        req.session.selectedItems = Array.isArray(selectedItems) ? selectedItems : [selectedItems];
        res.render('addOutfitView', { selectedItems: req.session.selectedItems });
    } catch (error) {
        res.status(500).render('errorView', { error: 'Internal server error' });
    }
});

// POST route to add a new outfit
// Validates the incoming data before passing it to the controller
router.post('/', validateAddOutfit, (req, res) => outfitController.addOutfit(req, res));

// GET route to fetch a specific user outfits by ID
// The 'validateOutfitId' middleware ensures that the 'id' parameter is valid before passing to the controller
router.get('/user_id/:id', validateOutfitId, (req, res) => outfitController.getOutfitsByUserId(req, res));

// GET route to fetch all outfits
// Calls the controller to fetch the outfits
router.get('/', (req, res) => outfitController.getAllOutfits(req, res));

// GET route to fetch a specific outfit by ID
// The 'validateOutfitId' middleware ensures that the 'id' parameter is valid before passing to the controller
router.get('/:id', validateOutfitId, (req, res) => outfitController.getOutfitById(req, res));

// PUT route to update an existing outfit by ID
// Validates the 'id' and outfit data, then calls the controller to save the changes
router.put('/:id', [validateOutfitId, validateSaveOutfit], (req, res) => outfitController.saveOutfit(req, res));

// DELETE route to remove an outfit by ID
// Validates the 'id' parameter before passing it to the controller
router.post('/delete/:id', validateOutfitId, (req, res) => outfitController.deleteOutfit(req, res));

module.exports = router;
