import axios from 'axios';
import {
  ACT_FRIEND_SEND_REQUEST
} from '../constants';

export const sendFriendRequest = (friendId) => {
  axios.get(`/friend/request/${friendId}`);

  return {
    type: ACT_FRIEND_SEND_REQUEST,
    payload: friendId
  };
}
