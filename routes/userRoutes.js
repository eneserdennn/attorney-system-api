const express = require('express');
const {registerUser, loginUser, getMe, getUserById} = require("../controllers/userController");
const {getTasksForUser, createTaskForUser, getTaskForUser, deleteTaskForUser, updateTaskForUser} = require("../controllers/taskController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");


// @desc: Register a new user
router.post('/', registerUser);
// @desc: Login a user
router.post('/login', loginUser);
// @desc: Get current logged in user
router.get('/me', protect, getMe);
// @desc: Get user by id
router.get('/:userId', protect, getUserById);

// @desc: Get tasks for a user
router.get('/:userId/tasks', protect, getTasksForUser);
// @desc: Get a task for a user
router.get('/:userId/tasks/:taskId', protect, getTaskForUser);
// @desc: Create a task for a user
router.post('/:userId/tasks', protect, createTaskForUser);
// @desc: Update a task for a user
router.put('/:userId/tasks/:taskId', protect, updateTaskForUser);
// @desc: Delete a task for a user
router.delete('/:userId/tasks/:taskId', protect, deleteTaskForUser);


module.exports = router;