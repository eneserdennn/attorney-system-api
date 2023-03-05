const express = require('express');
const router = express.Router();
const { getClient, getClients, createClient, updateClient, deleteClient } = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getClients).post(protect, createClient);
router.route('/:id').get(getClient).put(updateClient).delete(deleteClient);

module.exports = router;

