const Post = require('../models/Post');
const acLog = require('../utils/activityLog');

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
    res.send()
  }
};

const postUploadPost = (req, res) => {
  const { content } = req.body;

  new Post({
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
  }).save()
    .then((newPost) => {
      acLog(`${req.user.email} successfully uploaded a post id: ${newPost._id}`)
      res.send(newPost)
    })
    .catch(err => acLog(err));
}

module.exports = {
  postUploadPost,
  getPostById
};
