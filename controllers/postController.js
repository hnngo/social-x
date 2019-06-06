const _ = require('lodash');
const Post = require('../models/Post');
const User = require('../models/User');
const acLog = require('../utils/activityLog');

// @Method    Get
// @Path      /post/id/:postId
// @Desc      Get all posts in time order
// @Querry    ?limit : get limit number of posts, default is all
const getAllPost = async (req, res) => {
  try {
    let posts;
    if (!isNaN(req.query.limit)) {
      posts = await Post.find()
        .sort({ postDate: -1 })
        .limit(+req.query.limit)
        .populate({
          path: 'user',
          select: 'name _id'
        })
        .populate({
          path: "comments.content.user",
          model: "User",
          select: "_id name"
        });
    } else {
      posts = await Post.find()
        .sort({ postDate: -1 })
        .populate({
          path: 'user',
          select: 'name _id',
        })
        .populate({
          path: "comments.content.user",
          model: "User",
          select: "_id name"
        });
    }

    if (posts) {
      return res.send(posts);
    }
  } catch (err) {
    acLog(err);
    return res.status(400).send({ message: "No post was found" })
  }
};

// @Method    Get
// @Path      /post/id/:postId
// @Desc      Get posts by Id
const getPostById = async (req, res) => {
  try {
    const existingPost = await Post.findById(req.params.postId);

    if (existingPost) {
      res.send(existingPost)
    } else {
      res.status(404).send({ message: "Post not found" })
    }
  } catch (err) {
    acLog(err);
    res.status(400).send(err);
  }
};

// @Method    Get
// @Path      /post/user/:userId
// @Desc      Get posts by user id
const getPostByUserId = async (req, res) => {
  try {
    const existingPosts = await Post.find({ user: req.params.userId });

    if (existingPosts) {
      res.send(existingPosts);
    }
  } catch (err) {
    acLog(err);
    res.status(400).send(err);
  }
};


// @Method    POST
// @Path      /post/upload
// @Desc      Google OAuth with passport
const postUploadPost = async (req, res) => {
  const { content } = req.body;

  try {
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      acLog("Anonymous try to upload a post");
      return res.status(400).send({ message: "You must login to perform this action" });
    }

    const newPost = new Post({
      user: req.user._id,
      postDate: new Date(),
      lastUpdatedDate: new Date(),
      content,
      likes: {
        total: 0,
        who: []
      },
      comments: {
        total: 0,
        who: []
      }
    });

    await newPost.save();

    // Update post on User model
    currentUser.post.unshift(newPost._id);
    await currentUser.save();

    acLog(`${req.user.email} successfully uploaded a post id: ${newPost._id}`);
    res.send(newPost);
  } catch (err) {
    acLog(err);
    res.status(400).send(err);
  }
};

// @Method    DELETE
// @Path      /post/id/:postId
// @Desc      Delete a post by its id
const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    let currentUser = await User.findById(req.user._id);
    const postsOfUser = req.user.post;

    if (!currentUser || !postsOfUser.includes(postId)) {
      acLog(err);
      return res.send({ message: "You are not allowed to delete this post" });
    }

    Post.findByIdAndDelete(postId)
      .then(() => {
        // Remove posts from User model
        const newPostArr = currentUser.post.filter(id => id.toString() !== postId);

        currentUser.post = newPostArr;
        currentUser.save()
          .then(() => {
            acLog(`${req.user.email} delete successfully post id ${postId}`);

            res.send(currentUser.post);
          })
          .catch(err => acLog(err))
      })
      .catch(err => acLog(err));

  } catch (err) {
    acLog(err);
    res.status(400).send(err);
  }
}

// @Method    PATCH
// @Path      /post/:postId
// @Desc      Edit content of the post
const patchPostById = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content || content.length === 0) {
      acLog(`${req.user.email} invalidly edit post id ${postId}`);
      return res.status(400).send({ message: "The edited post content is invalid" });
    }

    // Check if existing a post
    const existingPost = await Post.findById(postId).populate({
      path: 'user',
      select: 'name _id'
    });

    if (!existingPost || existingPost.user._id.toString() !== req.user._id.toString()) {
      acLog(`${req.user.email} is not allowed to edit post id ${postId}`);
      return res.status(400).send({ message: "You are not allowed to edit this post" });
    }

    // Replace the existing content with new one
    existingPost.content = content;
    existingPost.lastUpdatedDate = new Date();
    await existingPost.save();

    acLog(`${req.user.email} edited successfully post id ${postId}`);
    return res.send(existingPost);
  } catch (err) {
    acLog(err);
    res.status(400).send(err)
  }
}

// @Method    GET
// @Path      /post/like/:postId
// @Desc      Like/unlike the post
const getLikeUnlikePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    const existingPost = await Post.findById(postId).populate({
      path: 'user',
      select: 'name _id'
    });

    if (!postId || !existingPost) {
      acLog(`${req.user.email} likes an invalid post`);
      return res.status(400).send({ message: "Cannot like this post" });
    }

    // Check if user already like or not
    const isLikedByUserIndex = _.findIndex(existingPost.likes.who, (w) => w.toString() === userId.toString());

    // Update likes array
    if (isLikedByUserIndex >= 0) {
      // Unlike action
      existingPost.likes.who.splice(isLikedByUserIndex, 1);
      existingPost.likes.total -= 1;
      await existingPost.save();
      acLog(`${req.user.email} unliked post id ${postId}`);
    } else {
      // Like action
      existingPost.likes.who.push(userId);
      existingPost.likes.total += 1;
      await existingPost.save();
      acLog(`${req.user.email} liked post id ${postId}`);
    }

    return res.send(existingPost);
  } catch (err) {
    acLog(err);
    return res.status(400).send(err);
  }
}

// @Method    POST
// @Path      /post/comment/:postId
// @Desc      Comment a post
const postCommentById = async (req, res) => {
  try {
    const { comment } = req.body;
    const { postId } = req.params;
    const userId = req.user._id;

    if (!comment || !postId) {
      acLog(`${req.user.email} performed an invalid action`);
      return res.status(400).send({ message: "Invalid action" });
    }

    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      acLog(`${req.user.email} comment an invalid post`);
      return res.status(400).send({ message: "The post does not exist" });
    }

    const commentContent = {
      comment,
      user: userId,
      commentDate: new Date()
    }

    existingPost.comments.content.unshift(commentContent);
    existingPost.comments.total += 1;
    await existingPost.save();

    acLog(`${req.user.email} commented post id ${postId}`);
    return res.send(existingPost);
  } catch (err) {
    acLog(err);
    return res.status(400).send(err);
  }
}

// @Method    DELETE
// @Path      /post/comment/:commentId/:postId
// @Desc      Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.params;
    const userId = req.user._id;

    if (!commentId || !postId) {
      acLog(`${req.user.email} performed an invalid action`);
      return res.status(400).send({ message: "Invalid action" });
    }

    const existingPost = await Post.findById(postId)
      .populate({
        path: "user",
        select: "_id name",
        model: "User"
      })
      .populate({
        path: "comments.content.user",
        model: "User",
        select: "_id name"
      });

    if (!existingPost) {
      acLog(`${req.user.email} comment an invalid post`);
      return res.status(400).send({ message: "The post does not exist" });
    }

    // Check if user have permission to delete
    let isAllowedToDelete = false;

    // Check if that comment is belongs to that user
    let cmtIndex = _.findIndex(existingPost.comments.content, (c) => c._id.toString() === commentId.toString());
    let cmtUserId = existingPost.comments.content[cmtIndex].user._id;
    if (cmtUserId.toString() === userId.toString()) {
      isAllowedToDelete = isAllowedToDelete || true;
    }
    
    // Check if that post is belongs to that user
    if (existingPost.user._id.toString() === userId.toString()) {
      isAllowedToDelete = isAllowedToDelete || true;
    }

    // Make decision
    if (isAllowedToDelete) {
      let newContent = existingPost.comments.content.filter(c => c._id.toString() !== commentId.toString());
      existingPost.comments.content = newContent;
      existingPost.comments.total -= 1;
      await existingPost.save();
  
      acLog(`${req.user.email} deleted successfully comment id ${commentId} in post id ${postId}`);
      return res.send(existingPost);
    }

    acLog(`${req.user.email} make invalid action`);
    return res.send({ message: "Invalid action" });
  } catch (err) {
    acLog(err);
    return res.status(400).send(err);
  }
}

module.exports = {
  getAllPost,
  getPostById,
  getPostByUserId,
  getLikeUnlikePostById,
  postUploadPost,
  postCommentById,
  deletePostById,
  deleteComment,
  patchPostById
};
