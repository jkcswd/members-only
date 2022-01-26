var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', passport.authenticate('local', { successRedirect: "/", failureRedirect: "/" }));

module.exports = router;
