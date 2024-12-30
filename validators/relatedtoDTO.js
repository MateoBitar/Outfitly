// validators/relatedtoDTO.js
const { body, param, validationResult } = require('express-validator');

// Validate the relation (event_id and suggest_id) when creating or modifying relationships
const validateRelation = [
    // Validate event_id in the request body
    body('event_id')
        .notEmpty()
        .withMessage('Event Id is required')  // Ensure event_id is provided
        .isInt()
        .withMessage('Event Id must be an integer'),  // Ensure event_id is an integer
    
    // Validate suggest_id in the request body
    body('suggest_id')
        .notEmpty()
        .withMessage('Suggestion Id is required')  // Ensure suggest_id is provided
        .isInt()
        .withMessage('Suggestion Id must be an integer'),  // Ensure suggest_id is an integer

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);  // Get validation errors from the request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Return 400 if errors exist
        }
        next();  // Proceed to the next middleware or controller if no errors
    }
];

// Validate event_id in the URL parameters for specific routes
const validateEvent_Id = [
    param('event_id').isInt().withMessage('Event Id must be an integer'),  // Ensure event_id is an integer
    (req, res, next) => {
        const errors = validationResult(req);  // Get validation errors from the request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Return 400 if errors exist
        }
        next();  // Proceed if validation passes
    }
];

// Validate suggest_id in the URL parameters for specific routes
const validateSuggest_Id = [
    param('suggest_id').isInt().withMessage('Suggest Id must be an integer'),  // Ensure suggest_id is an integer
    (req, res, next) => {
        const errors = validationResult(req);  // Get validation errors from the request
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });  // Return 400 if errors exist
        }
        next();  // Proceed if validation passes
    }
];

module.exports = {
    validateRelation,  // Export the validation for event and suggestion relationships
    validateEvent_Id,  // Export the validation for event_id in URL params
    validateSuggest_Id  // Export the validation for suggest_id in URL params
}
