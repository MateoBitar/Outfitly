// controllers/containsController.js
const containsService = require('../services/containsService');
const itemService = require('../services/itemService');
const outfitService = require('../services/outfitService');

// ContainsController handles the business logic related to linking items to outfits
class ContainsController {

    // Link an item to an outfit
    async linkItemToOutfit(req, res) {
        try {
            const {item_id, outfit_id} = req.body;  // Extract item_id and outfit_id from the request body

            // Check if the item exists
            const item = await itemService.getItemById(item_id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });  // Return error if item not found
            }

            // Check if the outfit exists
            const outfit = await outfitService.getOutfitById(outfit_id);
            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found' });  // Return error if outfit not found
            }

            // Link the item to the outfit using the service
            const newLink = await containsService.linkItemToOutfit({ item_id, outfit_id });
            res.status(201).json(newLink);  // Respond with the new link
        } catch (e) {
            console.error('Error linking item to outfit:', e);
            res.status(500).json({message: 'Internal server error'});  // Handle errors
        }
    }

    // Get all items in a specific outfit
    async getItemsInOutfit(req, res) {
        try {
            const id = parseInt(req.params.outfit_id, 10);  // Extract the outfit_id from the request parameters

            // Check if the outfit exists
            const outfit = await outfitService.getOutfitById(id);
            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found'});  // Return error if outfit not found
            }

            // Fetch items linked to the outfit
            const itemsInOutfit = await containsService.getItemsInOutfit(id);
            res.status(200).json(itemsInOutfit);  // Respond with the list of items in the outfit
        } catch (e) {
            console.error('Error fetching items in outfits:', e);
            res.status(500).json({ message: 'Internal server error' });  // Handle errors
        }
    }

    // Get all outfits using a specific item
    async getOutfitsUsingItem(req, res) {
        try {
            const id = parseInt(req.params.item_id, 10);  // Extract the item_id from the request parameters

            // Check if the item exists
            const item = await itemService.getItemById(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });  // Return error if item not found
            }

            // Fetch outfits that contain the item
            const outfitsUsingItem = await containsService.getOutfitsUsingItem(id);
            res.status(200).json(outfitsUsingItem);  // Respond with the list of outfits using the item
        } catch (e) {
            console.error('Error fetching outfits using item:', e);
            res.status(500).json({ message: 'Internal server error' });  // Handle errors
        }
    }

    // Unlink an item from an outfit
    async unlinkItemFromOutfit(req, res) {
        try {
            const item_id = parseInt(req.params.item_id, 10);  // Extract item_id from the request parameters
            const outfit_id = parseInt(req.params.outfit_id, 10);  // Extract outfit_id from the request parameters

            // Unlink the item from the outfit using the service
            const success = await containsService.unlinkItemFromOutfit(item_id, outfit_id);
            if (!success) {
                return res.status(404).json({ message: 'Item or Outfit not found' });  // Return error if the unlinking was unsuccessful
            }

            res.status(200).json({ message: 'Item unlinked from outfit successfully' });  // Respond with success message
        } catch (e) {
            console.error('Error unlinking outfit item:', e);
            res.status(500).json({ message: 'Internal server error' });  // Handle errors
        }
    }
}

// Export the ContainsController as a singleton instance
module.exports = new ContainsController();
