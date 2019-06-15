import axios from 'axios';
import {
  ACT_PROFILE_FETCH_BY_USERID,
  ACT_PROFILE_UPDATE,
  ACT_PROFILE_UPDATING,
  ACT_PROFILE_FETCH_FAIL
} from '../constants';
import { retryAsyncActionExp } from './utils';

export const fetchProfileById = (userId, socket) => {
  return async (dispatch) => {
    const res = await retryAsyncActionExp(3, async () => {
      return await axios.get(`/user/profile/${userId}`);
    });

    if (res) {
      dispatch({
        type: ACT_PROFILE_FETCH_BY_USERID,
        payload: res.data
      });

      // Acknowledge to Socket Io which profile are watching
      if (userId && socket) {
        socket.emit('watch profile', userId);
      }
    } else {
      dispatch({ type: ACT_PROFILE_FETCH_FAIL });
    }
  }
}

export const updateProfileById = (userId, content) => {
  return async (dispatch) => {
    try {
      const {
        name,
        job,
        home,
        birthday
      } = content;

      dispatch({ type: ACT_PROFILE_UPDATING })

      let res = await axios.post(`/user/profile/edit/${userId}`, {
        name,
        job,
        home,
        birthday
      });

      // Create multipart file if contain
      if (content.file) {
        let formData = new FormData();
        formData.append("file", content.file);

        res = await axios.post(`/image/upload`, formData);
      }

      dispatch({
        type: ACT_PROFILE_UPDATE,
        payload: res.data
      })
    } catch (err) {
      console.log(err);
    }
  }
};
