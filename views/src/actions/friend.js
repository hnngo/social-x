import axios from 'axios';
import {
  ACT_FRIEND_SEND_REQUEST,
  ACT_FRIEND_SEND_REQUEST_P,
  ACT_FRIEND_CANCEL_REQUEST,
  ACT_FRIEND_CANCEL_REQUEST_P,
  ACT_FRIEND_ACCEPT_REQUEST,
  ACT_FRIEND_ACCEPT_REQUEST_P,
  ACT_FRIEND_DECLINE_REQUEST,
  ACT_FRIEND_DECLINE_REQUEST_P,
  ACT_FRIEND_UNFRIEND
} from '../constants';

export const sendFriendRequest = (friendId) => {
  return async (dispatch) => {
    dispatch({
      type: ACT_FRIEND_SEND_REQUEST,
      payload: friendId
    });

    const res = await axios.get(`/friend/request/${friendId}`);

    dispatch({
      type: ACT_FRIEND_SEND_REQUEST_P,
      payload: res.data
    });
  }
};

export const cancelFriendRequest = (friendId, fromUser = false) => {
  axios.get(`/friend/cancel/${friendId}`);

  if (fromUser) {
    return {
      type: ACT_FRIEND_CANCEL_REQUEST_P,
      payload: fromUser
    }
  }

  return {
    type: ACT_FRIEND_CANCEL_REQUEST,
    payload: friendId
  };
};

export const acceptFriendRequest = (friendInfo, fromUser=false) => {
  if (fromUser) {
    axios.get(`/friend/accept/${friendInfo}`);
    return {
      type: ACT_FRIEND_ACCEPT_REQUEST_P,
      payload: fromUser
    };
  }

  axios.get(`/friend/accept/${friendInfo._id}`);

  return {
    type: ACT_FRIEND_ACCEPT_REQUEST,
    payload: friendInfo
  };
}

export const declineFriendRequest = (friendId, fromUser=false) => {
  axios.get(`/friend/decline/${friendId}`);

  if (fromUser) {
    return {
      type: ACT_FRIEND_DECLINE_REQUEST_P,
      payload: fromUser
    };
  }

  return {
    type: ACT_FRIEND_DECLINE_REQUEST,
    payload: friendId
  };
}

export const unfriend = (friendId, fromUser=false) => {
  axios.get(`/friend/unfriend/${friendId}`);

  if (fromUser) {
    return {
      type: ACT_FRIEND_UNFRIEND,
      payload: fromUser
    };
  }

  return {
    type: ACT_FRIEND_UNFRIEND,
    payload: friendId
  };
}
