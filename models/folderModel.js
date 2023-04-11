const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    folderName: {
        type: String,
        required: true
    },
    nature: {
        type: String
    },
    jurisdictions: {
        type: String
    },
    currency: {
        type: String
    },
    language: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    billingMethod: {
        type: String
    },
    applicableRate: {
        type: String
    },
    budgetedAmount: {
        type: String
    },
    fixedExpenses: {
        type: String
    },
    documentsPath: [{
        _id: false,
        name: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});

module.exports = mongoose.model('Folder', folderSchema);
