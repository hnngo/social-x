import axios from 'axios';
import {
  ACT_POST_FETCH_ALL
} from '../constants';

export const fetchAllPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/post/all');

      dispatch({
        type: ACT_POST_FETCH_ALL,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }
}