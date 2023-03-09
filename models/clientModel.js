const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
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
    phone: {
        type: String,
        default: ''
    },
    organization: {
        type: String,
        default: ''
    },
    quality: {
        type: String,
        default: ''
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
    events: {
        type: [Object]
    },
    currency: {
        type: String,
        default: ''
    },
    hourlyRate: {
        type: String
    },
    vatRate: {
        type: String
    },
    folders: {
        type: [Object]
    },
    isOrganization: {
        type: Boolean,
        default: false
    },
    photoPath: {
        type: String,
        ref: 'Picture'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    timeZone: {
        type: String,
        default: 'UTC'
    },
    folders: {
        type: [Object],
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Client', clientSchema);
