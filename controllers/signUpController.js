const User = require('../models/user');

exports.signUpGet = (req, res, next) => { 
  res.render('signUpForm');
};

exports.signUpPost = (req, res, next) =>{ 
  
};