const express = require('express');
const router = express.Router();
const { getClient, getClients, createClient, updateClient, deleteClient } = require('../controllers/clientController');

const { protect } = require('../middleware/authMiddleware');

// Client Routes
router.route('/').get(getClients).post(protect, createClient);
router.route('/:id').get(getClient).put(protect, updateClient).delete(protect, deleteClient);


module.exports = router;

