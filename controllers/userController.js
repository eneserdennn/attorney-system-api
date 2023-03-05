const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// @desc: Register a new user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, phone, address, city, country, picturePath, timeZone, hourlyRate, taxRate } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        address,
        city,
        country,
        picturePath,
        timeZone,
        hourlyRate,
        taxRate
    });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        picturePath: user.picturePath,
        timeZone: user.timeZone,
        hourlyRate: user.hourlyRate,
        taxRate: user.taxRate,
        token
    });
});

// @desc: Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        clients: user.clients,
        picturePath: user.picturePath,
        timeZone: user.timeZone,
        hourlyRate: user.hourlyRate,
        taxRate: user.taxRate,
        token,
    });
});

// @desc: Get current logged in user
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName, email, clients } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        firstName,
        lastName,
        email,
        clients
    });
});

// Export methods
module.exports = {
    registerUser,
    loginUser,
    getMe,
};

