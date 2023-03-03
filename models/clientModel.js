const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    // name, surname, email, phone, address, city, country, zip, password, photo, relatedContact, hourlyRate, vatRate, currency, notes, payments, createdAt, updatedAt
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: false},
    country: {type: String, required: false},
    zip: {type: String, required: false},
    password: {type: String, required: true},
    photo: {type: String, required: false},
    relatedContact: {type: String, required: false},
    hourlyRate: {type: String, required: false},
    vatRate: {type: String, required: false},
    currency: {type: String, required: false},
    notes: {type: String, required: false},
    payments: {type: String, required: false},
    deleted: {type: Boolean, default: false},
}, {timestamps: true});


module.exports = mongoose.model('Client', clientSchema);