const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const password = 'PASSWORD'

exports.joinGet = (req, res, next) => { 
  res.render('join');
};

exports.joinPost = [
  body('password', 'Password not correct').trim().custom((value, password) => value === password).escape(),

  (req, res, next) => { 
    User.findByIdAndUpdate(req.user.id, { membershipStatus: true }, {}, (err, doc) => {
      if(err) { return next(err); }

      res.send('You have joined the club')
    });
  }
]