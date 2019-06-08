const express = require('express');
const router = express.Router();
const { isLogin } = require('../utils/requireMiddleware');
const friendController = require('../controllers/friendController');

// @Method    GET
// @Path      /friend/:userId
// @Desc      Sending friend request to a user
router.get('/request/:userId', isLogin, friendController.getFriendRequest);

// @Method    GET
// @Path      /friend/accept/:userId
// @Desc      Accept friend request to a user
router.get('/accept/:userId', isLogin, friendController.getAcceptFriendRequest);

// @Method    GET
// @Path      /friend/decline/:userId
// @Desc      Decline friend request to a user
router.get('/decline/:userId', isLogin, friendController.getDeclineFriendRequest);

// @Method    GET
// @Path      /friend/unfriend/:userId
// @Desc      Unfriend a user
router.get('/unfriend/:userId', isLogin, friendController.getUnfriend);

module.exports = router;
