const express = require('express');
const router = express.Router();
const { getClient, getClients, createClient, updateClient, deleteClient } = require('../controllers/clientController');
const { getFolderFromClient, getFoldersForClient, addFolderToClient, updateFolderForClient} = require('../controllers/folderController');

const { protect } = require('../middleware/authMiddleware');

// Client Routes
router.route('/').get(getClients).post(protect, createClient);
router.route('/:id').get(getClient).put(protect, updateClient).delete(protect, deleteClient);

// Folder Routes
// router.route('/:clientId/folders').get(protect, getClientFolders)
// router.route('/folders').post(protect, createClientFolder);
// router.route('/:clientId/folders/:id').get(protect, getClientFolder).put(protect, updateClientFolder).delete(protect, deleteClientFolder);

router.route('/folders').get(protect, getFoldersForClient).post(protect, addFolderToClient);
router.route('/:clientId/folders/:folderId').get(protect, getFolderFromClient);
router.route('/:clientId/folders/:folderId').put(protect, updateFolderForClient);

module.exports = router;

