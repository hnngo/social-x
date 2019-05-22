const express = require('express');
const router = express.Router();

// @Method    GET
// @Path      /auth/google
// @Desc      Google OAuth with passport
router.get('/google', (req, res) => {
  res.send({ auth: "google" });
});


// @Method    GET
// @Path      /auth/google/callback
// @Desc      Google OAuth callback url
router.get('/google/callback', (req, res) => {
  res.send({ auth: "google/callback" });
});


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
