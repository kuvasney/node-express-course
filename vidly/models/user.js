const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required() 
  };

  return Joi.validate(user, schema);
}

exports.userSchema = userSchema
exports.User = User; 
exports.validate = validateUser;