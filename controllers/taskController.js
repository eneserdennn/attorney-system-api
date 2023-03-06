const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

// @desc Get all tasks for a user
// @route GET /api/users/:userId/tasks
// @access Private
const getTasksForUser = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ userId: req.params.userId }).populate('userId');
    res.status(200).json(tasks);
});

// @desc Get a single task for a user
// @route GET /api/users/:userId/tasks/:taskId
// @access Private
const getTaskForUser = asyncHandler(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.taskId, userId: req.params.userId }).populate('userId');
    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }
    res.status(200).json(task);
});

// @desc Create a task for a user
// @route POST /api/users/:userId/tasks
// @access Private
const createTaskForUser = asyncHandler(async (req, res) => {
    const { taskName, startDate, associatedTo, taskType, priority, reminder, status, notes } = req.body;

    if (!taskName) {
        res.status(400);
        throw new Error('Please provide a task name');
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // crate task and push to user tasks array
    const task = await Task.create({
        taskName,
        startDate,
        associatedTo,
        taskType,
        priority,
        reminder,
        status,
        notes,
        userId: req.params.userId
    });

    user.tasks.push(task._id);
    await user.save();

    res.status(201).json(task);
});

// @desc Update a task for a user
// @route PUT /api/users/:userId/tasks/:taskId
// @access Private
const updateTaskForUser = asyncHandler(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.taskId, userId: req.params.userId });

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    task.taskName = req.body.taskName || task.taskName;
    task.startDate = req.body.startDate || task.startDate;
    task.associatedTo = req.body.associatedTo || task.associatedTo;
    task.taskType = req.body.taskType || task.taskType;
    task.priority = req.body.priority || task.priority;
    task.reminder = req.body.reminder || task.reminder;
    task.status = req.body.status || task.status;
    task.notes = req.body.notes || task.notes;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
});

// @desc Delete a task for a user
// @route DELETE /api/users/:userId/tasks/:taskId
// @access Private
const deleteTaskForUser = asyncHandler(async (req, res) => {
    const task = await Task.findOne({ _id: req.params.taskId, userId: req.params.userId });

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    await task.remove();
    res.status(200).json({ message: 'Task removed' });
});

module.exports = {
    getTasksForUser,
    getTaskForUser,
    createTaskForUser,
    updateTaskForUser,
    deleteTaskForUser
};
