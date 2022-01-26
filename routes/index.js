var express = require('express');
const passport = require('passport');
const Message = require('../models/message');
var router = express.Router();

router.get('/', function(req, res, next) {
  Message.find().populate('user').exec((err, messages) => {
    if(err) { return next(err); }

    res.render('index', { messages });
  })  
});

router.post('/login', passport.authenticate('local', { successRedirect: "/", failureRedirect: "/" }));

router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
