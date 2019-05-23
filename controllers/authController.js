const passport = require('passport');

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



// @Method    GET
// @Path      /auth/logout
// @Desc      User log out


module.exports = {
  getGoogleOAuth,
  getGoogleOAuthCallback
};
