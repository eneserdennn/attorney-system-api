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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
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
    documentsPath: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Folder', folderSchema);
