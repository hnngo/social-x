const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleSecretKey,
    callbackURL: "/auth/google/callback"
  }, (accessToken, refresToken, profile, cb) => {
    console.log(profile);
  })
);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
