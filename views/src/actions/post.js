import axios from 'axios';
import {
  ACT_POST_FETCH_ALL,
  ACT_POST_UPLOAD,
  ACT_POST_DELETE_F,
  ACT_POST_DELETE_P,
  ACT_POST_UPDATE_F,
  ACT_POST_UPDATE_P,
  ACT_POST_LIKE_F,
  ACT_POST_LIKE_P,
  ACT_CMT_DELTE_F,
  ACT_CMT_DELTE_P
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
  axios.delete(`/post/id/${postId}`);

  let type = rootPath === "feed" ? ACT_POST_DELETE_F : ACT_POST_DELETE_P;

  return {
    type,
    payload: postId
  };
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

export const likePost = (postId, userId, rootPath) => {
  axios.get(`/post/like/${postId}`);

  let type = rootPath === "feed" ? ACT_POST_LIKE_F : ACT_POST_LIKE_P;

  return {
    type,
    payload: {
      userId,
      postId
    }
  };
}

export const deleteComment = (commentId, postId, rootPath) => {
  axios.delete(`/post/comment/${commentId}/${postId}`);

  let type = rootPath === "feed" ? ACT_CMT_DELTE_F : ACT_CMT_DELTE_P;

  return {
    type,
    payload: {
      postId,
      commentId
    }
  };
}
