const passport = require('passport');
const acLog = require('../utils/activityLog');

// @Method    GET
// @Path      /auth/google
// @Desc      Google OAuth with passport
const getGoogleOAuth = passport.authenticate(
  'google',
  {
    scope: ['profile', 'email']
  }
);


// @Method    GET
// @Path      /auth/google/callback
// @Desc      Google OAuth callback url
const getGoogleOAuthCallback = passport.authenticate('google');


// @Method    GET
// @Path      /auth/current_user
// @Desc      Get current user login
const getCurrentUser = (req, res) => {
  res.send(req.user);
};


// @Method    GET
// @Path      /auth/logout
// @Desc      User log out
const getLogOut = (req, res) => {
  acLog(`User ${req.user.email} has logged out`);
  req.logOut();
  res.redirect('/');
};

module.exports = {
  getGoogleOAuth,
  getGoogleOAuthCallback,
  getCurrentUser,
  getLogOut
};
