import axios from 'axios';
import {
  ACT_FRIEND_SEND_REQUEST,
  ACT_FRIEND_CANCEL_REQUEST,
  ACT_FRIEND_ACCEPT_REQUEST,
  ACT_FRIEND_DECLINE_REQUEST,
  ACT_FRIEND_UNFRIEND
} from '../constants';

export const sendFriendRequest = (friendId) => {
  axios.get(`/friend/request/${friendId}`);

  return {
    type: ACT_FRIEND_SEND_REQUEST,
    payload: friendId
  };
};

export const cancelFriendRequest = (friendId) => {
  axios.get(`/friend/cancel/${friendId}`);

  return {
    type: ACT_FRIEND_CANCEL_REQUEST,
    payload: friendId
  };
};

export const acceptFriendRequest = (friendInfo) => {
  axios.get(`/friend/accept/${friendInfo._id}`);

  return {
    type: ACT_FRIEND_ACCEPT_REQUEST,
    payload: friendInfo
  };
}

export const declineFriendRequest = (friendId) => {
  axios.get(`/friend/decline/${friendId}`);

  return {
    type: ACT_FRIEND_DECLINE_REQUEST,
    payload: friendId
  };
}

export const unfriend = (friendId) => {
  axios.get(`/friend/unfriend/${friendId}`);

  return {
    type: ACT_FRIEND_UNFRIEND,
    payload: friendId
  };
}

