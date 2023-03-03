const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const mongoose = require("mongoose");

// @desc: Register a new user
// @route POST /api/users/register
// @access Private
const registerUser = asyncHandler(async (req, res) => {
    const {name, surname, email, password, phone, address, city, country, zip, photo, timeZone, hourlyRate, taxRate, companyName, companyLogo, companyAdress, companyCity, companyCountry, companyZip, companyPhone, companyEmail, companyWebsite, companyVat, companyLegalStatus, companyCurrency, companyLanguage} = req.body;

        if (!name || !surname || !email || !password || !phone) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

        // Check if user already exists
    const userExist = await User.findOne({email});
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        name,
        surname,
        email,
        password: hashedPassword,
        phone,
        address,
        city,
        country,
        zip,
        photo,
        timeZone,
        hourlyRate,
        taxRate,
        companyName,
        companyLogo,
        companyAdress,
        companyCity,
        companyCountry,
        companyZip,
        companyPhone,
        companyEmail,
        companyWebsite,
        companyVat,
        companyLegalStatus,
        companyCurrency,
        companyLanguage
    });

// Create token
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

res.status(201).json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        zip: user.zip,
        photo: user.photo,
        timeZone: user.timeZone,
        hourlyRate: user.hourlyRate,
        taxRate: user.taxRate,
        companyName: user.companyName,
        companyLogo: user.companyLogo,
        companyAdress: user.companyAdress,
        companyCity: user.companyCity,
        companyCountry: user.companyCountry,
        companyZip: user.companyZip,
        companyPhone: user.companyPhone,
        companyEmail: user.companyEmail,
        companyWebsite: user.companyWebsite,
        companyVat: user.companyVat,
        companyLegalStatus: user.companyLegalStatus,
        companyCurrency: user.companyCurrency,
        companyLanguage: user.companyLanguage,
        token
    });
});

// @desc: Get current logged in user
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get current logged in user' });
});

// @desc: Login user
// @route POST /api/users/login
// @access Private
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Check for user email
    const user = await User.findOne({email});

    if (user && (await bycrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.city,
            country: user.country,
            zip: user.zip,
            photo: user.photo,
            timeZone: user.timeZone,
            hourlyRate: user.hourlyRate,
            taxRate: user.taxRate,
            companyName: user.companyName,
            companyLogo: user.companyLogo,
            companyAdress: user.companyAdress,
            companyCity: user.companyCity,
            companyCountry: user.companyCountry,
            companyZip: user.companyZip,
            companyPhone: user.companyPhone,
            companyEmail: user.companyEmail,
            companyWebsite: user.companyWebsite,
            companyVat: user.companyVat,
            companyLegalStatus: user.companyLegalStatus,
            companyCurrency: user.companyCurrency,
            companyLanguage: user.companyLanguage,
            token
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


module.exports = {
    registerUser,
    loginUser,
    getMe
}