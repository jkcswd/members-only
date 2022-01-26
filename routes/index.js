var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', passport.authenticate('local', { successRedirect: "/", failureRedirect: "/" }));

router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
