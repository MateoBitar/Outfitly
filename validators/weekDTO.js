// validators/weekDTO.js
const { body, param, validationResult } = require('express-validator');

const validateWeek = [
    // Validate the 'day' field
    body('day')
        .notEmpty()
        .withMessage('Day is required')
        .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
        .withMessage('Must be a valid day of the week (Make sure to write it in the following format: Monday)'),

    // Validate the 'user_id' field
    body('user_id')
        .notEmpty()
        .withMessage('User Id is required')
        .isInt()
        .withMessage('User Id must be an integer'),

    // Validation result check and error handling
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateWeekId = [
    // Validate the 'id' parameter in the route
    param('id').isInt().withMessage('Id must be an integer'),

    // Validation result check and error handling
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateWeek,
    validateWeekId
};
