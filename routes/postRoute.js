const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')
const { isLogin } = require('../utils/requireMiddleware');

// @Method    Get
// @Path      /post/id/:postId
// @Desc      Get all posts in time order
router.get('/all', postController.getAllPost);

// @Method    Get
// @Path      /post/id/:postId
// @Desc      Get posts by Id
router.get('/id/:postId', postController.getPostById);

// @Method    Get
// @Path      /post/user/:userId
// @Desc      Get posts by user id
router.get('/user/:userId', postController.getPostByUserId);

// @Method    POST
// @Path      /post/upload
// @Desc      Upload a post to database
router.post('/upload', isLogin, postController.postUploadPost);

// @Method    DELETE
// @Path      /post/id/:postId
// @Desc      Delete a post by its id
router.delete('/id/:postId', postController.deletePostById);

// @Method    PATCH
// @Path      /post/:postId
// @Desc      Google OAuth with passport
// router.post('/:postId', isLogin);

module.exports = router;
