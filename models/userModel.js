const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clients: {
        type: [Object],
        required: false,
    },
    picturePath: {
        type: String,
        ref: 'Picture'
    },
    timeZone: {
        type: String,
        default: 'UTC'
    },
    hourlyRate: {
        type: String,
        required: false
    },
    taxRate: {
        type: String,
        required: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    tasks: {
        type: [Object],
        required: false
    },
    natures: {
        type: String,
        default: ''
    },
    folders: {
        type: [Object],
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
