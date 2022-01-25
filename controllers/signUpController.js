const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.signUpGet = (req, res, next) => { 
  res.render('signUpForm');
};

exports.signUpPost = (req, res, next) => { 
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) { return next(err); }

    const user = new User(
      {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
        membershipStatus: 'member'
      }
    ).save(err => {
      if (err) { return next(err); }
  
      res.redirect('/');
    })
  })
};