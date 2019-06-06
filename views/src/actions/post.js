import axios from 'axios';
import {
  ACT_POST_FETCH_ALL,
  ACT_POST_UPLOAD,
  ACT_POST_DELETE_F,
  ACT_POST_DELETE_P,
  ACT_POST_UPDATE_F,
  ACT_POST_UPDATE_P,
  ACT_POST_LIKE_F,
  ACT_POST_LIKE_P
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

export const deletePost = (postId, rootPath) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/post/id/${postId}`);

      let type = rootPath === "feed" ? ACT_POST_DELETE_F : ACT_POST_DELETE_P;

      dispatch({
        type,
        payload: postId
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export const updatePost = (postId, content, rootPath) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`/post/${postId}`, { content });

      let type = rootPath === "feed" ? ACT_POST_UPDATE_F : ACT_POST_UPDATE_P;

      dispatch({
        type,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export const likePost = (postId, rootPath) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/post/like/${postId}`);

      let type = rootPath === "feed" ? ACT_POST_LIKE_F : ACT_POST_LIKE_P;

      dispatch({
        type,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }
}
