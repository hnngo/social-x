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
      posts = await Post.find().sort({ postDate: -1 }).limit(+req.query.limit);
    } else {
      posts = await Post.find().sort({ postDate: -1 });
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
    res.send({ message: "Error when retrieving posts" });
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
    res.send({ message: "Error when retrieving posts" });
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
    currentUser.post.push(newPost._id);
    await currentUser.save();

    acLog(`${req.user.email} successfully uploaded a post id: ${newPost._id}`);
    res.send(newPost);

  } catch (err) {
    acLog(err);
  }
};

// @Method    DELETE
// @Path      /post/id/:postId
// @Desc      Delete a post by its id
const deletePostById = async (req, res) => {
  if (!req.user) {
    acLog("Anonymous try to delete a post");
    return res.status(400).send({ message: "You need to login to perform this function" });
  }

  try {
    const { postId } = req.params;
    let currentUser = await User.findById(req.user._id);
    const postsOfUser = req.user.post;

    if (!currentUser || !postsOfUser.includes(postId)) {
      acLog(err);
      return res.send({ message: "You are not allowed to delete the post" });
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
    res.status(400).send({ message: err });
  }
}

module.exports = {
  getAllPost,
  getPostById,
  getPostByUserId,
  postUploadPost,
  deletePostById
};
