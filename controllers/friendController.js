const acLog = require('../utils/activityLog');
const User = require('../models/User');
const _ = require('lodash');

// @Method    GET
// @Path      /friend/request/:userId
// @Desc      Sending friend request to a user
const getFriendRequest = async (req, res) => {
  try {
    const friendId = req.params.userId;
    const userId = req.user._id;

    const existingFriend = await User.findById(friendId);
    const existingUser = await User.findById(userId);

    if (!existingUser || !existingFriend) {
      acLog(`${req.user.email} sent friend request to invalid user`);
      return res.send({ message: "Request to invalid user" });
    }

    // Check if both are friend already
    if (existingFriend.friend.list.includes(userId) && existingUser.friend.list.includes(friendId)) {
      acLog(`${req.user.email} sent friend request to an already friend ${existingFriend.email}`);
      return res.status(200).send({ message: "Already friend" });
    }

    // Adding request on both sides
    existingFriend.friend.requestFromList.push(userId);
    existingUser.friend.requestToList.push(friendId);

    await existingFriend.save();
    await existingUser.save();

    acLog(`${req.user.email} sent friend request to ${existingFriend.email}`);
    return res.status(200).send();
  } catch (err) {
    acLog(err);
    return res.send(err);
  }
}

// @Method    GET
// @Path      /friend/accept/:userId
// @Desc      Accept friend request to a user
const getAcceptFriendRequest = async (req, res) => {
  try {
    const friendId = req.params.userId;
    const userId = req.user._id;

    const existingFriend = await User.findById(friendId);
    const existingUser = await User.findById(userId);

    if (!existingUser || !existingFriend) {
      acLog(`${req.user.email} accepted friend request to invalid user`);
      return res.send({ message: "Request to invalid user" });
    }

    // Checking if requested
    let validTo = existingFriend.friend.requestToList.includes(userId);
    let validFrom = existingUser.friend.requestFromList.includes(friendId);

    if (validFrom && validTo) {
      let newFlistFriend = existingFriend.friend;
      let newFlistUser = existingUser.friend;

      // Remove request on both sides
      _.remove(newFlistFriend.requestToList, (id) => id.toString() === userId.toString());
      _.remove(newFlistUser.requestFromList, (id) => id.toString() === friendId.toString());

      // Add connection between two people
      newFlistFriend.list.push(userId);
      newFlistUser.list.push(friendId);

      // Assign to existing models
      existingFriend.friend = newFlistFriend;
      existingUser.friend = newFlistUser;

      await existingFriend.save();
      await existingUser.save();

      acLog(`${req.user.email} accepted friend request from ${existingFriend.email}`);
      return res.status(200).send();
    }

    acLog(`${req.user.email} perform invalid friend request`);
    return res.status({ message: "Invalid friend request" });
  } catch (err) {
    acLog(err);
    return res.send(err);
  }
}

// @Method    GET
// @Path      /friend/decline/:userId
// @Desc      Decline friend request to a user
const getDeclineFriendRequest = async (req, res) => {
  try {
    const friendId = req.params.userId;
    const userId = req.user._id;

    const existingFriend = await User.findById(friendId);
    const existingUser = await User.findById(userId);

    if (!existingUser || !existingFriend) {
      acLog(`${req.user.email} declined friend request to invalid user`);
      return res.send({ message: "Request to invalid user" });
    }

    // Checking if requested
    let validTo = existingFriend.friend.requestToList.includes(userId);
    let validFrom = existingUser.friend.requestFromList.includes(friendId);

    if (validFrom && validTo) {
      let newFlistFriend = existingFriend.friend;
      let newFlistUser = existingUser.friend;

      // Remove request on both sides
      _.remove(newFlistFriend.requestToList, (id) => id.toString() === userId.toString());
      _.remove(newFlistUser.requestFromList, (id) => id.toString() === friendId.toString());

      // Assign to existing models
      existingFriend.friend = newFlistFriend;
      existingUser.friend = newFlistUser;

      await existingFriend.save();
      await existingUser.save();

      acLog(`${req.user.email} declined friend request from ${existingFriend.email}`);
      return res.status(200).send();
    }

    acLog(`${req.user.email} perform invalid friend request`);
    return res.status({ message: "Invalid friend request" });
  } catch (err) {
    acLog(err);
    return res.send(err);
  }
}

// @Method    GET
// @Path      /friend/unfriend/:userId
// @Desc      Unfriend a user
const getUnfriend = async (req, res) => {
  try {
    const friendId = req.params.userId;
    const userId = req.user._id;

    const existingFriend = await User.findById(friendId);
    const existingUser = await User.findById(userId);

    if (!existingUser || !existingFriend) {
      acLog(`${req.user.email} sent unfriend request to invalid user`);
      return res.send({ message: "Request to invalid user" });
    }

    // Checking if both users are friend
    if (existingFriend.friend.list.includes(userId) && existingUser.friend.list.includes(friendId)) {
      let newFlistFriend = existingFriend.friend;
      let newFlistUser = existingUser.friend;

      // Remove request on both sides
      _.remove(newFlistFriend.list, (id) => id.toString() === userId.toString());
      _.remove(newFlistUser.list, (id) => id.toString() === friendId.toString());

      // Assign to existing models
      existingFriend.friend = newFlistFriend;
      existingUser.friend = newFlistUser;

      await existingFriend.save();
      await existingUser.save();

      acLog(`${req.user.email} has unfriended ${existingFriend.email}`);
      return res.status(200).send();
    }

    acLog(`${req.user.email} perform invalid unfriend request to a non-friend user ${existingFriend.email}`);
    return res.status({ message: "Invalid unfriend request" });
  } catch (err) {
    acLog(err);
    return res.send(err);
  }
}

// @Method    GET
// @Path      /friend/cancel/:userId
// @Desc      Cancel a friend request
const getCancelRequest = async (req, res) => {
  try {
    const friendId = req.params.userId;
    const userId = req.user._id;

    const existingFriend = await User.findById(friendId);
    const existingUser = await User.findById(userId);

    if (!existingUser || !existingFriend) {
      acLog(`${req.user.email} cancel invalid friend request`);
      return res.send({ message: "Request to invalid user" });
    }

    // Checking if both users are in request mode
    if (existingFriend.friend.requestFromList.includes(userId) && existingUser.friend.requestToList.includes(friendId)) {
      let newFlistFriend = existingFriend.friend;
      let newFlistUser = existingUser.friend;

      // Remove request on both sides
      _.remove(newFlistFriend.requestFromList, (id) => id.toString() === userId.toString());
      _.remove(newFlistUser.requestToList, (id) => id.toString() === friendId.toString());

      // Assign to existing models
      existingFriend.friend = newFlistFriend;
      existingUser.friend = newFlistUser;

      await existingFriend.save();
      await existingUser.save();

      acLog(`${req.user.email} has cancelled friend request to ${existingFriend.email}`);
      return res.status(200).send();
    }

    acLog(`${req.user.email} perform invalid cancel request`);
    return res.status({ message: "Invalid cancel request" });
  } catch (err) {
    acLog(err);
    return res.send(err);
  }
}

module.exports = {
  getFriendRequest,
  getAcceptFriendRequest,
  getDeclineFriendRequest,
  getCancelRequest,
  getUnfriend
};
