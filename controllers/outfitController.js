// controllers/outfitController.js
const containsService = require('../services/containsService');
const outfitService = require('../services/outfitService'); // Import the outfit service
const userService = require('../services/userService'); // Import the user service to validate user existence
const outfit_suggestService = require('../services/outfit_suggestService');
class OutfitController {

    // Add a new outfit
    async addOutfit(req, res) {
        try {
            const { name, base64Image, details, weather, user_id, item_ids } = req.body;

            // Check if the user exists
            const user = await userService.getUserById(user_id);
            if (!user) {
                //return res.status(404).json({ message: 'User not found' });
                res.status(404).render('errorView', { error: 'User not found' });
            }

            if (!base64Image.startsWith('data:image')) {
                throw new Error('Invalid image format');
            }

            // Create and add the outfit
            const newOutfit = await outfitService.addOutfit({ name, base64Image, details, weather, user_id });

            if (item_ids && Array.isArray(item_ids)) {
                for (const itemId of item_ids) {
                    await containsService.linkItemToOutfit({ item_id: itemId, outfit_id: newOutfit.id });
                }
            }

            // Add outfit suggestion
            await outfit_suggestService.addOutfitSuggestion({ user_id: res.locals.user.id, outfit_id: newOutfit.id });
            
            //res.status(201).json(newOutfit);
            res.redirect(`/outfitly/outfits/user_id/${res.locals.user.id}`);
        } catch (e) {
            //console.error('Error creating outfit:', e);
            //res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('errorView', { error: 'Failed to create outfit' });
        }
    }

    // Retrieve all outfits
    async getAllOutfits(req, res) {
        try {
            const outfits = await outfitService.getAllOutfits();
            res.status(200).json(outfits);
        } catch (e) {
            console.error('Error fetching outfits:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Retrieve a specific outfit by ID
    async getOutfitById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const outfit = await outfitService.getOutfitById(id);

            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found' });
            }

            res.status(200).json(outfit);
        } catch (e) {
            console.error('Error fetching outfit:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Update an outfit by ID
    async saveOutfit(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, image, details, weather, user_id } = req.body;

            // Check if the user exists
            const user = await userService.getUserById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the outfit
            const success = await outfitService.saveOutfit(id, { name, image, details, weather, user_id });
            if (!success) {
                return res.status(404).json({ message: 'Outfit not found or no changes made' });
            }

            res.status(200).json({ message: 'Outfit updated successfully' });
        } catch (e) {
            console.error('Error saving outfit:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Delete an outfit by ID
    async deleteOutfit(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await outfitService.deleteOutfit(id);

            if (!success) {
                //return res.status(404).json({ message: 'Outfit not found' });
                return res.status(404).render('errorView', { error: 'Outfit not found' });
            }

            //res.status(200).json({ message: 'Outfit deleted successfully' });
            res.status(404).redirect(`/outfitly/outfits/user_id/${res.locals.user.id}`);
        } catch (e) {
            console.error('Error deleting outfit:', e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Retrieve a outfits by user ID
    async getOutfitsByUserId(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const outfits = await outfitService.getOutfitsByUserId(id);
            if (!outfits) {
                //return res.status(404).json({ message: 'User not found' });
                return res.status(404).render('errorView', { error: 'User not found' });
            }

            // Ensure details are always present
            outfits.forEach(outfit => {
                if (!outfit.details || outfit.details.trim() === '') {
                    outfit.details = 'No details';
                }
            });

            //res.status(200).json(outfit);
            res.status(200).render('outfitsView', { outfits });
        } catch (e) {
            //console.error('Error fetching outfit:', e);
            //res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('errorView', { error: 'Failed to fetch outfits' });
        }
    }

}

module.exports = new OutfitController(); // Export a singleton instance of OutfitController
