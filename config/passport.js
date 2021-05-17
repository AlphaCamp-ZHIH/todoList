const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = () => {

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback:true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false)
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false);
            }
            return done(null, user);
          })
      })
      .catch(e => console.log(e));

  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((userId, done) => {
    User.findById(userId)
      .lean()
      .then(user => done(null, user))
      .catch(err => console.log(err));
  })
};