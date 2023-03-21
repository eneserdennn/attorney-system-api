const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');

const addEventToClient = asyncHandler(async (req, res) => {
    const clientId = req.params.clientId;
    const { name, startDate, endDate, place, description, calendar, associatedTo, id, title } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // convert to timestamp
    const startTimestamp = start.getTime();
    const endTimestamp = end.getTime();

    const client = await Client.findById(clientId);

    if (client) {
        const event = {
            clientId,
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


// @desc Get events for client
// @route GET /api/clients/:clientId/events
// @access Private
const getEventsForClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.clientId);

    if (client) {
        res.status(200).json(client.events);
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});

// @desc Get a single event for a client
// @route GET /api/clients/:clientId/events/:eventId
// @access Private
const getEventFromClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.clientId);

    if (client) {
        const event = client.events.find(event => event.id === req.params.eventId);

        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});

// @desc Update an event for a client
// @route PUT /api/clients/:clientId/events/:eventId
// @access Private
const updateEventForClient = asyncHandler(async (req, res) => {
    const { name, startDate, endDate, place, description, calendar, associatedTo, id, title } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // convert to timestamp
    const startTimestamp = start.getTime();
    const endTimestamp = end.getTime();

    const client = await Client.findById(req.params.clientId);

    if (client) {
        const eventIndex = client.events.findIndex(event => event.id === req.params.eventId);

        if (eventIndex !== -1) {
            client.events[eventIndex].name = name || client.events[eventIndex].name;
            client.events[eventIndex].startDate = startTimestamp || client.events[eventIndex].startDate;
            client.events[eventIndex].endDate = endTimestamp || client.events[eventIndex].endDate;
            client.events[eventIndex].place = place || client.events[eventIndex].place;
            client.events[eventIndex].description = description || client.events[eventIndex].description;
            client.events[eventIndex].calendar = calendar || client.events[eventIndex].calendar;
            client.events[eventIndex].associatedTo = associatedTo || client.events[eventIndex].associatedTo;
            client.events[eventIndex].id = id || client.events[eventIndex].id;
            client.events[eventIndex].title = title || client.events[eventIndex].title;

            await client.save();

            res.status(200).json(client.events[eventIndex]);
        } else {
            res.status(404);
            throw new Error('Event not found');
        }
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});


// @desc Delete an event for a client
// @route DELETE /api/clients/:clientId/events/:eventId
// @access Private
const deleteEventForClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.clientId);

    if (client) {
        const updatedEvents = client.events.filter(event => event.id !== req.params.eventId);

        if (updatedEvents.length === client.events.length) {
            res.status(404);
            throw new Error('Event not found');
        }

        client.events = updatedEvents;

        await client.save();

        res.status(200).json({ message: 'Event removed' });
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
});




module.exports = {
    addEventToClient,
    getEventsForClient,
    getEventFromClient,
    updateEventForClient,
    deleteEventForClient
}