const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.joinGet = (req, res, next) => { 
  res.render('join');
};

exports.joinPost = [
  body('password', 'Empty Password').trim().isLength({ min: 1 }).escape(),

]