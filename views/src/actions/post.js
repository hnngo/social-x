import axios from 'axios';
import {
  ACT_POST_FETCH_ALL,
  ACT_POST_UPLOAD,
  ACT_POST_DELETE,
  ACT_POST_UPDATE
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

export const uploadPost = (content) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/post/upload', { content });

      dispatch({
        type: ACT_POST_UPLOAD,
        payload: res.data
      });
    } catch (err) {
      console.log(err)
    }
  }
}

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/post/id/${postId}`);

      dispatch({
        type: ACT_POST_DELETE,
        payload: postId
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export const updatePost = (postId, content) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`/post/${postId}`, { content });

      dispatch({
        type: ACT_POST_UPDATE,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }
}
