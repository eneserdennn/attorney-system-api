const express = require('express');
const router = express.Router();
const { getClient, getClients, createClient, updateClient, deleteClient } = require('../controllers/clientController');
const { getClientFolder, createClientFolder, getClientFolders, updateClientFolder, deleteClientFolder } = require('../controllers/folderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getClients).post(protect, createClient);
router.route('/:id').get(protect, getClient).put(protect, updateClient).delete(protect, deleteClient);
router.route('/:clientId/folders').get(protect, getClientFolders).post(protect, createClientFolder);
router.route('/:clientId/folders/:id').get(protect, getClientFolder).put(protect, updateClientFolder).delete(protect, deleteClientFolder);

module.exports = router;

