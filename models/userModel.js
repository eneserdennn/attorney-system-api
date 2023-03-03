const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // name, surname, email, phone, address, city, country, zip, password, photo, timeZone, hourlyRate, taxRate, companyName, companyLogo, companyAdress, companyCity, companyCountry, companyZip, companyPhone, companyEmail, companyWebsite, companyVat, companyLegalStatus, companyCurrency, companyLanguage
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: false},
    city: {type: String, required: false},
    country: {type: String, required: false},
    zip: {type: String, required: false},
    photo: {type: String, required: false},
    timeZone: {type: String, required: false},
    hourlyRate: {type: String, required: false},
    taxRate: {type: String, required: false},
    companyName: {type: String, required: false},
    companyLogo: {type: String, required: false},
    companyAdress: {type: String, required: false},
    companyCity: {type: String, required: false},
    companyCountry: {type: String, required: false},
    companyZip: {type: String, required: false},
    companyPhone: {type: String, required: false},
    companyEmail: {type: String, required: false},
    companyWebsite: {type: String, required: false},
    companyVat: {type: String, required: false},
    companyLegalStatus: {type: String, required: false},
    companyCurrency: {type: String, required: false},
    companyLanguage: {type: String, required: false},
    deleted: {type: Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);