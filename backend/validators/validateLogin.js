const { body } = require('express-validator');

exports.validateSignin = [
    body('userName').not().isEmpty().withMessage('Valid username is required'),
    body('password').not().isEmpty().withMessage('Password is required')
];
