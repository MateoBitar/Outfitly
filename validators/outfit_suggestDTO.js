// validators/outfit_sugggestDTO.js
const { body, param, validationResult } = require('express-validator');

// Validator to validate the fields for adding/updating an outfit suggestion
const validateOutfitSuggestion = [
    // Validate that the 'date' field is an optional ISO8601 date string (valid date format)
    body('date')
        .optional()  // Date is not required but must be in ISO8601 format if provided
        .isISO8601()
        .withMessage('Outfit Suggestion Date must be a valid date'),
    
    // Validate that the 'user_id' is provided, is not empty, and is an integer
    body('user_id')
        .notEmpty()  // Ensure user_id is not empty
        .withMessage('User Id is required')
        .isInt()  // Ensure user_id is an integer
        .withMessage('User Id must be an integer'),
    
    // Validate that the 'outfit_id' is provided, is not empty, and is an integer
    body('outfit_id')
        .notEmpty()  // Ensure outfit_id is not empty
        .withMessage('Outfit Id is required')
        .isInt()  // Ensure outfit_id is an integer
        .withMessage('Outfit Id must be an integer'),

    // After validating, check if any errors exist and return them in the response
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Return errors if validation fails
        }
        next();  // Proceed to the next middleware or controller
    }
];

// Validator to validate that the 'id' parameter in the URL is an integer for retrieving/updating/deleting outfit suggestions
const validateOutfitSuggestionId = [
    param('id').isInt().withMessage('Id must be an integer'),  // Ensure 'id' parameter is an integer
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Return errors if validation fails
        }
        next();  // Proceed to the next middleware or controller
    }
];

module.exports = {
    validateOutfitSuggestion,  // Export the outfit suggestion validation
    validateOutfitSuggestionId  // Export the outfit suggestion ID validation
}
