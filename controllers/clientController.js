const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');

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
const getClient = asyncHandler( async (req, res) => {
    const client = await Client.findById(req.params.id);
    // if Cast to ObjectId failed for value throw error
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
const createClient = asyncHandler( async (req, res) => {
    if (!req.body.name || !req.body.surname || !req.body.email || !req.body.phone || !req.body.address || !req.body.password) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    const client = await Client.create(req.body);
    res.status(200).json(client);

});

// @desc Update client
// @route PUT /api/clients/:id
// @access Private
const updateClient = asyncHandler( async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
        runValidators: true
    });
    if (client) {
        client.name = req.body.name || client.name;
        client.surname = req.body.surname || client.surname;
        client.email = req.body.email || client.email;
        client.phone = req.body.phone || client.phone;
        client.address = req.body.address || client.address;
        client.city = req.body.city || client.city;
        client.country = req.body.country || client.country;
        client.zip = req.body.zip || client.zip;
        client.password = req.body.password || client.password;
        client.photo = req.body.photo || client.photo;
        client.relatedContact = req.body.relatedContact || client.relatedContact;
        client.hourlyRate = req.body.hourlyRate || client.hourlyRate;
        client.vatRate = req.body.vatRate || client.vatRate;
        client.currency = req.body.currency || client.currency;
        client.notes = req.body.notes || client.notes;
        client.payments = req.body.payments || client.payments;
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
    // dont delete, just set deleted to true
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
    deleteClient
}