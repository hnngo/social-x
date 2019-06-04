const User = require('../models/User');
const acLog = require('../utils/activityLog');

const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const existingUser = await User.findById(userId)
      .select({
        password: false
      })
      .populate("post");

    if (!existingUser) {
      return res.status(400).send({ message: "There is no such user" });
    }

    return res.send(existingUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getUserProfile
};
