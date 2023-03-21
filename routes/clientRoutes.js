const express = require('express');
const router = express.Router();
const { getClient, getClients, createClient, updateClient, deleteClient } = require('../controllers/clientController');
const { getClientFolder, createClientFolder, getClientFolders, updateClientFolder, deleteClientFolder } = require('../controllers/folderController');
const { addEventToClient, getEventsForClient, getEventFromClient, updateEventForClient, deleteEventForClient } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// Client Routes
router.route('/').get(getClients).post(protect, createClient);
router.route('/:id').get(getClient).put(protect, updateClient).delete(protect, deleteClient);

// Folder Routes
router.route('/:clientId/folders').get(protect, getClientFolders)
router.route('/folders').post(protect, createClientFolder);
router.route('/:clientId/folders/:id').get(protect, getClientFolder).put(protect, updateClientFolder).delete(protect, deleteClientFolder);

// Event Routes
router.route('/:clientId/events').get(protect, getEventsForClient).post(protect, addEventToClient);
router.route('/:clientId/events/:eventId').get(protect, getEventFromClient);
router.route('/:clientId/events/:eventId').put(protect, updateEventForClient).delete(protect, deleteEventForClient);

module.exports = router;

