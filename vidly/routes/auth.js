const {User} = require('../models/user');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email});
  if (!user) res.status(400).send('Invalid e-mail or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) res.status(400).send('Invalid e-mail or password');

  res.send(true);
});

function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required() 
  };

  return Joi.validate(req, schema);
}

module.exports = router;