// validators/associatedwithDTO.js

// Importing required modules from 'express-validator' for validating input
const { body, param, validationResult } = require('express-validator');

// Validator for checking the association between outfits and events
const validateAssociation = [
    // Validate that 'outfit_id' is present and is an integer
    body('outfit_id')
        .notEmpty()  // Ensure the field is not empty
        .withMessage('Outfit Id is required')  // Custom error message if empty
        .isInt()  // Ensure the value is an integer
        .withMessage('Outfit Id must be an integer'),  // Custom error message if not an integer
    
    // Validate that 'event_id' is present and is an integer
    body('event_id')
        .notEmpty()  // Ensure the field is not empty
        .withMessage('Event Id is required')  // Custom error message if empty
        .isInt()  // Ensure the value is an integer
        .withMessage('Event Id must be an integer'),  // Custom error message if not an integer

    // Custom middleware to check validation results
    (req, res, next) => {
        const errors = validationResult(req);  // Get all validation errors
        if (!errors.isEmpty()) {  // If errors exist
            return res.status(400).json({ errors: errors.array() });  // Respond with errors
        }
        next();  // Proceed to the next middleware if no errors
    }
];

// Validator for checking that 'outfit_id' is a valid integer in URL params
const validateOutfit_Id = [
    param('outfit_id').isInt().withMessage('Outfit Id must be an integer'),  // Ensure outfit_id is an integer
    
    // Custom middleware to check validation results for 'outfit_id'
    (req, res, next) => {
        const errors = validationResult(req);  // Get validation errors
        if (!errors.isEmpty()) {  // If errors exist
            return res.status(400).json({ errors: errors.array() });  // Respond with errors
        }
        next();  // Proceed to next middleware if no errors
    }
];

// Validator for checking that 'event_id' is a valid integer in URL params
const validateEvent_Id = [
    param('event_id').isInt().withMessage('Event Id must be an integer'),  // Ensure event_id is an integer
    
    // Custom middleware to check validation results for 'event_id'
    (req, res, next) => {
        const errors = validationResult(req);  // Get validation errors
        if (!errors.isEmpty()) {  // If errors exist
            return res.status(400).json({ errors: errors.array() });  // Respond with errors
        }
        next();  // Proceed to next middleware if no errors
    }
];

// Exporting the validators to be used in route handlers
module.exports = {
    validateAssociation,  // Validate the association between outfits and events
    validateOutfit_Id,    // Validate the outfit ID in the URL
    validateEvent_Id      // Validate the event ID in the URL
};
