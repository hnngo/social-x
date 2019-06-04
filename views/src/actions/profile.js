import axios from 'axios';
import {
  ACT_PROFILE_FETCH_BY_USERID
} from '../constants';

export const fetchProfileById = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/user/profile/${userId}`);
      
      dispatch({
        type: ACT_PROFILE_FETCH_BY_USERID,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }
}