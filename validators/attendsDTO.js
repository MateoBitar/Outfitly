// validators/attendsDTO.js
const { body, param, validationResult } = require('express-validator');

// Validate attendee data when creating a new attendance entry
// Checks if 'user_id' and 'event_id' are provided, and if they are integers
const validateAttendee = [
    body('user_id')  // Validate 'user_id' in the request body
        .notEmpty()  // Ensure it's not empty
        .withMessage('User Id is required')  // Custom error message if empty
        .isInt()  // Ensure it's an integer
        .withMessage('User Id must be an integer'),  // Custom error message if not an integer

    body('event_id')  // Validate 'event_id' in the request body
        .notEmpty()  // Ensure it's not empty
        .withMessage('Event Id is required')  // Custom error message if empty
        .isInt()  // Ensure it's an integer
        .withMessage('Event Id must be an integer'),  // Custom error message if not an integer

    // Middleware to handle validation results and return errors if any
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {  // If there are errors, return them in the response
            return res.status(400).json({ errors: errors.array() });
        }
        next();  // Proceed to the next middleware or controller
    }
];

// Validate user ID in URL parameters (for routes that require a 'user_id' param)
const validateUser_Id = [
    param('user_id')  // Validate 'user_id' in URL params
        .isInt()  // Ensure it's an integer
        .withMessage('User Id must be an integer'),  // Custom error message if not an integer

    // Middleware to handle validation results and return errors if any
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {  // If there are errors, return them in the response
            return res.status(400).json({ errors: errors.array() });
        }
        next();  // Proceed to the next middleware or controller
    }
];

// Validate event ID in URL parameters (for routes that require an 'event_id' param)
const validateEvent_Id = [
    param('event_id')  // Validate 'event_id' in URL params
        .isInt()  // Ensure it's an integer
        .withMessage('Event Id must be an integer'),  // Custom error message if not an integer

    // Middleware to handle validation results and return errors if any
    (req, res, next) => {
        const errors = validationResult(req);  // Collect validation errors
        if (!errors.isEmpty()) {  // If there are errors, return them in the response
            return res.status(400).json({ errors: errors.array() });
        }
        next();  // Proceed to the next middleware or controller
    }
];

module.exports = {
    validateAttendee,  // Export the validation for attendee data
    validateUser_Id,   // Export the validation for user_id in URL
    validateEvent_Id   // Export the validation for event_id in URL
};
