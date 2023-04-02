const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {getTasksForUser, createTaskForUser, getTaskForUser, deleteTaskForUser, updateTaskForUser} = require("../controllers/taskController");

// @desc: Get tasks for a user
router.get('/:userId', protect, getTasksForUser);
// @desc: Get a task for a user
router.get('/:userId/:taskId', protect, getTaskForUser);
// @desc: Create a task for a user
router.post('/:userId', protect, createTaskForUser);
// @desc: Update a task for a user
router.put('/:userId/:taskId', protect, updateTaskForUser);
// @desc: Delete a task for a user
router.delete('/:userId/:taskId', protect, deleteTaskForUser);

module.exports = router;