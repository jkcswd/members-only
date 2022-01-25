const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (err) { return done(err); }
          
          if (res) {
            return done(null, user)
          } else {
            return done(null, false, { message: "Incorrect password" })
          }
        });

        return done(null, user);
      });
    })
  );
};