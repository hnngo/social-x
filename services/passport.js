const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const keys = require('../config/keys');
const acLog = require('../utils/activityLog');

// Google OAuth Strategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleSecretKey,
    callbackURL: "/auth/google/callback",
    proxy: true
  }, async (accessToken, refresToken, profile, done) => {
    try {
      // Check if existing user
      const existingUser = await User.findOne({ email: profile._json.email });

      if (existingUser) {
        acLog(`Google OAuth login ${profile._json.email}`);
        return done(null, existingUser);
      }

      // Create new user
      new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email,
        registerDate: new Date(),
        avatar: "67936a5c0997cf0dfb7eb9d168cb6f38.jpeg"
      }).save()
        .then(newUser => {
          acLog(`Google OAuth new User created: ${newUser.email}`);

          // Return client new user profile
          done(null, newUser)
        })
        .catch(err => acLog(err));
    } catch (err) {
      acLog(err);
    }
  })
);

// Local Strategy
passport.use(
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {
    if (!email || !password) {
      acLog("Unsuccesful post sign in with invalid field(s)");
      return done(null, false, { message: "Invalid field(s)" });
    }

    // Check if there is exiting a user
    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        acLog("Anonymous try to login to unregistered user");
        return done(null, false, { message: "User is not found" });
      }

      // Check if user input right password
      bcrypt.compare(password, existingUser.password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          acLog(`${existingUser.email} login successfully`);
          return done(null, existingUser);
        } else {
          acLog(`${existingUser.email} login with wrong password`);
          return done(null, false, { message: "Password is incorrect" });
        }
      })
    } catch (err) {
      acLog(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user)
    })
    .catch(err => acLog(err));
});
