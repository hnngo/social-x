const User = require('../models/User');
const acLog = require('../utils/activityLog');


// @Method    GET
// @Path      /user/profile/:userId
// @Desc      Get profile user by userId
const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const existingUser = await User.findById(userId)
      .select({
        password: false
      })
      .populate({
        path: "post",
        populate: {
          path: "comments.content.user",
          model: "User",
          select: "_id name"
        }
      });


    if (!existingUser) {
      return res.status(400).send({ message: "There is no such user" });
    }

    return res.send(existingUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

// @Method    POST
// @Path      /user/profile/edit/:userId
// @Desc      Update profile information
const postEditProfile = async (req, res) => {
  try {
    const {
      name,
      job,
      home,
      birthday
    } = req.body;

    let formattedBday = new Date(birthday);

    if (!name) {
      acLog(`${req.user.email} fail to update invalid name`);
      return res.send({ message: "Invalid name" });
    }

    const existingUser = await User.findById(req.user._id)
      .select({
        password: false
      })
      .populate({
        path: "post",
        populate: {
          path: "comments.content.user",
          model: "User",
          select: "_id name"
        }
      });

    if (!existingUser) {
      acLog(`No user ${req.user.email} found`);
      return res.send({ message: "Invalid user" });
    }

    // Updating new information
    existingUser.name = name;
    existingUser.job = job;
    existingUser.birthday = formattedBday;
    existingUser.home = home;

    await existingUser.save();
    acLog(`${req.user.email} updated successfully profile`);
    return res.send(existingUser);
  } catch (err) {
    acLog(err);
    return res.status(400).send(err);
  }
}

module.exports = {
  getUserProfile,
  postEditProfile
};
