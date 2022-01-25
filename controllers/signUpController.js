const User = require('../models/user');

exports.signUpGet = (req, res, next) => { 
  res.render('signUpForm');
};

exports.signUpPost = (req, res, next) => { 
  const user = new User(
    {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      membershipStatus: 'member'
    }
  ).save(err => {
    if (err) { return next(err); }

    res.redirect('/');
  })
};