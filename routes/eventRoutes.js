const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { addEventToClient, getEventsForClient, getEventFromClient, updateEventForClient, deleteEventForClient } = require('../controllers/eventController');

router.route('/:clientId').get(protect, getEventsForClient)
router.route('/').post(protect, addEventToClient);
router.route('/:clientId/:eventId').get(protect, getEventFromClient);
router.route('/:clientId/:eventId').put(protect, updateEventForClient).delete(protect, deleteEventForClient);

module.exports = router;