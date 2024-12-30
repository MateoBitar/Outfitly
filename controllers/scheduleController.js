// controllers/scheduleController.js

// Schedule Controller to manage scheduling and unscheduling of outfits
const scheduleService = require('../services/scheduleService');
const weekService = require('../services/weekService');
const outfitService = require('../services/outfitService');

class ScheduleController {

    // Method to schedule an outfit to a specific calendar entry (week)
    async scheduleOutfit(req, res) {
        try {
            const {calendar_id, outfit_id} = req.body; // Destructure calendar_id and outfit_id from the request body

            // Check if the specified calendar (week) exists
            const week = await weekService.getWeekById(calendar_id);
            if (!week) {
                return res.status(404).json({ message: 'Day not found' });
            }

            // Check if the specified outfit exists
            const outfit = await outfitService.getOutfitById(outfit_id);
            if (!outfit) {
                return res.status(404).json({ message: 'Outfit not found' });
            }

            // Schedule the outfit using the service
            const newScheduledOutfit = await scheduleService.scheduleOutfit({ calendar_id, outfit_id });
            res.status(201).json(newScheduledOutfit); // Return the new scheduled outfit

        } catch (e) {
            console.error('Error scheduling outfit:', e); // Log any errors
            res.status(500).json({message: 'Internal server error'}); // Return server error
        }
    }

    // Method to fetch all scheduled outfits
    async getAllScheduledOutfits(req, res) {
        try {
            const scheduledoutfits = await scheduleService.getAllScheduledOutfits(); // Get all scheduled outfits
            res.status(200).json(scheduledoutfits); // Return the scheduled outfits

        } catch (e) {
            console.error('Error fetching scheduled outfits:', e); // Log any errors
            res.status(500).json({ message: 'Internal server error' }); // Return server error
        }
    }

    // Method to get outfits scheduled for a specific calendar (week) by its ID
    async getOutfitsOfDayById(req, res) {
        try {
            const id = parseInt(req.params.calendar_id, 10); // Parse calendar ID from the request parameters

            // Check if the specified calendar (week) exists
            const week = await weekService.getWeekById(id);
            if (!week) {
                return res.status(404).json({ message: 'Day not found' });
            }

            // Get the outfits scheduled for the specified calendar (week)
            const outfitsoftheday = await scheduleService.getOutfitsOfDayById(id);
            if (!outfitsoftheday) {
                return res.status(404).json({ message: 'No outfits found for that day' });
            }

            res.status(200).json(outfitsoftheday); // Return the scheduled outfits

        } catch (e) {
            console.error('Error fetching outfits of the day:', e); // Log any errors
            res.status(500).json({ message: 'Internal server error' }); // Return server error
        }
    }

    // Method to delete (unschedule) an outfit from a specific calendar entry (week)
    async deleteScheduledOutfit(req, res) {
        try {
            const calendar_id = parseInt(req.params.calendar_id, 10); // Parse calendar ID from the request parameters
            const outfit_id = parseInt(req.params.outfit_id, 10); // Parse outfit ID from the request parameters

            // Attempt to delete the scheduled outfit
            const success = await scheduleService.deleteScheduledOutfit(calendar_id, outfit_id);
            if (!success) {
                return res.status(404).json({ message: 'Scheduled Outfit not found' });
            }

            res.status(200).json({ message: 'Outfit unscheduled successfully' }); // Return success message

        } catch (e) {
            console.error('Error deleting scheduled outfit:', e); // Log any errors
            res.status(500).json({ message: 'Internal server error' }); // Return server error
        }
    }
}

// Export the ScheduleController instance for use in routes
module.exports = new ScheduleController();