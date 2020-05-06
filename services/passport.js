const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); //mongoID from the user record in DB
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Query DB to see if userID exists already
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // User exists in the DB
          done(null, existingUser);
        } else {
          //User does not exist in DB; Add new user to DB
          new User({ googleId: profile.id })
            .save() //async call; chain .then so when user is added and we get the result, we call done.
            .then((user) => done(null, user));
        }
      });
    }
  )
);
