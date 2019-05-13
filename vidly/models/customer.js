const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    phone: {
        type: String,
        minlength: 11,
        maxlength: 11
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(11).max(11)
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;