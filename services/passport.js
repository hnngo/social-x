const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const keys = require('../config/keys');
const acLog = require('../utils/activityLog');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleSecretKey,
    callbackURL: "/auth/google/callback"
  }, async (accessToken, refresToken, profile, done) => {
    try {
      // Check if existing user
      const existingUser = await User.findOne({ email: profile._json.email });

      if (existingUser) {
        //TODO: Check if that user has googleId, if not assign the new one
        acLog(`Google OAuth login: ${profile._json.email}`);

        return done(null, existingUser);
      }

      // Create new user
      new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email,
        registerDate: new Date()
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
