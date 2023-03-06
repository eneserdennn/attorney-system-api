const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    associatedTo: {
        type: String
    },
    taskType: {
        type: String
    },
    priority: {
        type: String
    },
    reminder: {
        type: Date
    },
    status: {
        type: String
    },
    notes: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);