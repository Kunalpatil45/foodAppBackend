const foodpartners = require('../models/foodpartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authfoodpartnermiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodpartner = foodpartners.findById(decoded.id);
        req.foodpartner = foodpartner;
        next();
    }
    catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }


};

async function authusermiddleware(req, res, next) {
    // Similar logic for user authentication
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
    }
}

module.exports = {
    authfoodpartnermiddleware,
    authusermiddleware
}