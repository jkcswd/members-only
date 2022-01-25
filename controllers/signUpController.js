const User = require('../models/user');
const bcrypt = require('bcryptjs')
const { body,validationResult } = require('express-validator');

exports.signUpGet = (req, res, next) => { 
  res.render('signUpForm');
};

exports.signUpPost = [
  // TODO: add more validation
  body('first_name', 'Empty first name').trim().isLength({ min: 1 }).escape(),
  body('last_name', 'Empty last name').trim().isLength({ min: 1 }).escape(),
  body('username', 'Empty username').trim().isLength({ min: 1 }).escape(),
  body('password', 'password must be 6 characters').trim().isLength({ min: 6 }).escape(),
  body('confirm_password', 'passwords must match').trim().custom((value, { req }) => value === req.body.password).escape(),

  (req, res, next) => { 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('signUpForm', { errors: errors.array() });
    }else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) { return next(err); }
  
        const user = new User(
          {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            username: req.body.username,
            password: hashedPassword,
            membershipStatus: false
          }
        ).save(err => {
          if (err) { return next(err); }
      
          res.redirect('/');
        })
      })
    } 
  }
]