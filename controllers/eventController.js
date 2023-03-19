const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');

const addEventToClient = asyncHandler(async (req, res) => {
    const { name, startDate, endDate, place, description, calendar, associatedTo, id, title } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // convert to timestamp
    const startTimestamp = start.getTime();
    const endTimestamp = end.getTime();


    const client = await Client.findById(req.params.clientId);

    if (client) {
        const event = {
            name,
            startDate: startTimestamp,
            endDate: endTimestamp,
            place,
            description,
            calendar,
            associatedTo,
            id,
            title
        };

        client.events.push(event);

        await client.save();

        res.status(201).json(event);
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});

module.exports = {
    addEventToClient
}