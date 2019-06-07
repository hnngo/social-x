const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { isLogin } = require('../utils/requireMiddleware'); 

// @Method    GET
// @Path      /user/profile/:userId
// @Desc      Get profile user by userId
router.get('/profile/:userId', profileController.getUserProfile);


// @Method    POST
// @Path      /user/profile/edit/:userId
// @Desc      Update profile information
router.post('/profile/edit/:userId', isLogin, profileController.postEditProfile);

module.exports = router;
