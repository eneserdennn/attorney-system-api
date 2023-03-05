const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');
const User = require("../models/userModel");

// @desc Get all clients
// @route GET /api/clients
// @access Private
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find({});
    res.status(200).json(clients);
});

// @desc Get single client
// @route GET /api/clients/:id
// @access Private
const getClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) {
        res.status(404);
        throw new Error('Client not found');
    } else {
        res.status(200).json(client);
    }
});

// @desc Create client
// @route POST /api/clients
// @access Private
const createClient = asyncHandler(async (req, res) => {
    const {
        name,
        surname,
        email,
        password,
        phone,
        address,
        city,
        country,
        currency,
        hourlyRate,
        vatRate,
    } = req.body;

    if (!name || !surname || !email || !password) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    // Check if client already exists
    const existingClient = await Client.findOne({ email });

    if (existingClient) {
        res.status(400);
        throw new Error('Client already exists');
    }



    const user = await User.findById(req.user?.id);

    if (!user) {
        res.status(401);
        throw new Error('User not authenticated');
    }

    const client = await Client.create({
        userId: user._id,
        name,
        surname,
        email,
        password,
        phone,
        address,
        city,
        country,
        currency,
        hourlyRate,
        vatRate,
    });

    // push client to user
    user.clients.push(client._id);
    await user.save();

    res.status(200).json(client);
});


// @desc Update client
// @route PUT /api/clients/:id
// @access Private
const updateClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);

    if (client) {
        client.name = req.body.name || client.name;
        client.surname = req.body.surname || client.surname;
        client.email = req.body.email || client.email;
        client.phone = req.body.phone || client.phone;
        client.address = req.body.address || client.address;
        client.city = req.body.city || client.city;
        client.country = req.body.country || client.country;
        client.hourlyRate = req.body.hourlyRate || client.hourlyRate;
        client.vatRate = req.body.vatRate || client.vatRate;
        client.currency = req.body.currency || client.currency;
        client.photoPath = req.body.photoPath || client.photoPath;
        client.deleted = req.body.deleted || client.deleted;

        const updatedClient = await client.save();
        res.status(200).json(updatedClient);
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});

// @desc Delete client
// @route DELETE /api/clients/:id
// @access Private
const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (client) {
        client.deleted = true;
        const updatedClient = await client.save();
        res.status(200).json(updatedClient);
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});

module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
};
