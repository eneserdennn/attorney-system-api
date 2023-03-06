const express = require('express');
const {registerUser, loginUser, getMe, getUserById} = require("../controllers/userController");
const {getTasksForUser, createTaskForUser, getTaskForUser, deleteTaskForUser, updateTaskForUser} = require("../controllers/taskController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/:userId', protect, getUserById);
router.get('/:userId/tasks', protect, getTasksForUser);
router.get('/:userId/tasks/:taskId', protect, getTaskForUser);
router.post('/:userId/tasks', protect, createTaskForUser);
router.put('/:userId/tasks/:taskId', protect, updateTaskForUser);
router.delete('/:userId/tasks/:taskId', protect, deleteTaskForUser);


module.exports = router;