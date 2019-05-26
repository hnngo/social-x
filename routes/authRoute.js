const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLogin } = require('../utils/requireMiddleware');

// @Method    GET
// @Path      /auth/google
// @Desc      Google OAuth with passport
router.get('/google', authController.getGoogleOAuth);


// @Method    GET
// @Path      /auth/google/callback
// @Desc      Google OAuth callback url
router.get('/google/callback', authController.getGoogleOAuthCallback, (req, res) => {
  res.redirect(`/profile/${req.user._id}`);
});


// @Method    GET
// @Path      /auth/current_user
// @Desc      Get current user login
router.get('/current_user', authController.getCurrentUser);


// @Method    GET
// @Path      /auth/logout
// @Desc      User log out
router.get('/logout', isLogin, authController.getLogOut);


// @Method    POST
// @Path      /auth/singin
// @Desc      User sign in
router.post('/signin', authController.postSignInWithEmailAndPassword);


// @Method    POST
// @Path      /auth/singup
// @Desc      Sing up new user with email and pwd
router.post('/signup', authController.postSignUpWithEmailAndPassword);

module.exports = router;
