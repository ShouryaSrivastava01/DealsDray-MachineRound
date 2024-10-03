const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Login = require('../models/t_login');


exports.signUp =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userName, password } = req.body;
    const data = new Login({
        f_sno: new mongoose.Types.ObjectId(),
        f_userName: userName,
        f_Pwd: password 
    });
    try {
        const userSaved = await data.save();
        res.status(201).json({
            message: 'User created successfully',
            user: userSaved
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'An error occurred while processing your request.'
        });
    }
}

exports.signIn = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {message : errors.array()[0].msg });
    }
    const { userName, password } = req.body;
    try {
        const user = await Login.findOne({ f_userName : userName });
        if (!user) {
            return res.status(400).json({ message: 'Invalid user name' });
        }
        if (password !== user.f_Pwd) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        res.status(200).json({
            message: 'Sign-in successful',
            user: user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'An error occurred while processing your request.'
        });
    }
};
