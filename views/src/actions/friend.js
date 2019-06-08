import axios from 'axios';
import {
  ACT_FRIEND_SEND_REQUEST,
  ACT_FRIEND_CANCEL_REQUEST
} from '../constants';

export const sendFriendRequest = (friendId) => {
  axios.get(`/friend/request/${friendId}`);

  return {
    type: ACT_FRIEND_SEND_REQUEST,
    payload: friendId
  };
}

export const cancelFriendRequest = (friendId) => {
  axios.get(`/friend/cancel/${friendId}`);

  return {
    type: ACT_FRIEND_CANCEL_REQUEST,
    payload: friendId
  };
}
