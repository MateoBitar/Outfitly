// validators/scheduleDTO.js

// Importing necessary functions from express-validator for validation
const { body, param, validationResult } = require('express-validator');

// Validator for creating a new schedule (relating calendar_id and outfit_id)
const validateSchedule = [
    // Validate that 'calendar_id' exists and is an integer
    body('calendar_id')
        .notEmpty()  // Ensure 'calendar_id' is not empty
        .withMessage('Calendar Id is required')  // Custom error message if missing
        .isInt()  // Ensure 'calendar_id' is an integer
        .withMessage('Calendar Id must be an integer'), // Custom error message if not an integer

    // Validate that 'outfit_id' exists and is an integer
    body('outfit_id')
        .notEmpty()  // Ensure 'outfit_id' is not empty
        .withMessage('Outfit Id is required')  // Custom error message if missing
        .isInt()  // Ensure 'outfit_id' is an integer
        .withMessage('Outfit Id must be an integer'), // Custom error message if not an integer

    // Final validation step to check for validation errors
    (req, res, next) => {
        // Check if there are any validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If errors exist, respond with a 400 status and list the errors
            return res.status(400).json({ errors: errors.array() });
        }
        // If no errors, proceed to the next middleware or controller
        next();
    }
];

// Validator to validate 'calendar_id' as a URL parameter
const validateCalendar_Id = [
    // Validate 'calendar_id' from the URL parameters
    param('calendar_id').isInt().withMessage('Calendar Id must be an integer'),  // Ensure it is an integer

    // Final validation step to check for errors in the URL parameter
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return 400 status with the errors if validation fails
            return res.status(400).json({ errors: errors.array() });
        }
        next();  // Proceed if validation is successful
    }
];

// Validator to validate 'outfit_id' as a URL parameter
const validateOutfit_Id = [
    // Validate 'outfit_id' from the URL parameters
    param('outfit_id').isInt().withMessage('Outfit Id must be an integer'),  // Ensure it is an integer

    // Final validation step to check for errors in the URL parameter
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return 400 status with the errors if validation fails
            return res.status(400).json({ errors: errors.array() });
        }
        next();  // Proceed if validation is successful
    }
];

// Exporting the validators for use in routes
module.exports = {
    validateSchedule,
    validateCalendar_Id,
    validateOutfit_Id
};
