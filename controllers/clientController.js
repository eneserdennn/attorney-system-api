const asyncHandler = require('express-async-handler');

// @desc Get all clients
// @route GET /api/clients
// @access Private
const getClients = asyncHandler(async (req, res) => {
        res.status(200).json({message: 'Get all clients'});
});

// @desc Get single client
// @route GET /api/clients/:id
// @access Private
const getClient = asyncHandler( async (req, res) => {
    res.status(200).json({message: `Get client with id ${req.params.id}`});
});

// @desc Create client
// @route POST /api/clients
// @access Private
const createClient = asyncHandler( async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('No client text');
    }
    res.status(201).json({message: 'Client created'});
});

// @desc Update client
// @route PUT /api/clients/:id
// @access Private
const updateClient = asyncHandler( async (req, res) => {
    res.status(200).json({message: `Client with id ${req.params.id} updated`});
});

// @desc Delete client
// @route DELETE /api/clients/:id
// @access Private
const deleteClient = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Client with id ${req.params.id} deleted`});
});

module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
}