import axios from 'axios';
import {
  ACT_PROFILE_FETCH_BY_USERID,
  ACT_PROFILE_UPDATE,
  ACT_PROFILE_UPDATING
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
      // TODO: Render no user profile found here
      console.log(err);
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
}