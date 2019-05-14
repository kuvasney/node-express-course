const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().sort('username');
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email});
  if (user) res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['username', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  res.send(_.pick(user, ['_id', 'username', 'email']));
});

module.exports = router;