const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @Method    GET
// @Path      /auth/google
// @Desc      Google OAuth with passport
router.get('/google', authController.getGoogleOAuth);


// @Method    GET
// @Path      /auth/google/callback
// @Desc      Google OAuth callback url
router.get('/google/callback', authController.getGoogleOAuthCallback);


// @Method    GET
// @Path      /auth/current_user
// @Desc      Get current user login
router.get('/current_user', (req, res) => {
  res.send({ auth: "current_user" });
});


// @Method    GET
// @Path      /auth/logout
// @Desc      User log out
router.get('/logout', (req, res) => {
  res.send({ auth: "logout" });
});

module.exports = router;
