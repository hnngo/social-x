import axios from 'axios';
import {
  ACT_FETCH_USER,
  ACT_LOG_OUT,
  ACT_CLEAR_ERROR_MSG,
  ACT_AUTH_SIGNING_IN,
  ACT_AUTH_SIGN_IN_SUCCESS,
  ACT_AUTH_SIGN_IN_FAIL,
  ACT_AUTH_SIGNING_UP,
  ACT_AUTH_SIGN_UP_FAIL,
  ACT_AUTH_SIGN_UP_SUCCESS,
  ACT_SAVE_SOCKET
} from '../constants';

export const saveSocket = (socket) => {
  return {
    type: ACT_SAVE_SOCKET,
    payload: socket
  }
};

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/auth/current_user');

      dispatch({
        type: ACT_FETCH_USER,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const clearErrMsg = () => {
  return ({
    type: ACT_CLEAR_ERROR_MSG
  })
};

export const signInWithEmailAndPassword = ({ email, password }, history) => {
  return async (dispatch) => {
    // Indicate is loading
    dispatch({ type: ACT_AUTH_SIGNING_IN });

    try {
      const res = await axios.post("/auth/signin", { email, password });

      let type;
      if (Object.keys(res.data).includes("message")) {
        type = ACT_AUTH_SIGN_IN_FAIL;
      } else {
        type = ACT_AUTH_SIGN_IN_SUCCESS;
      }

      dispatch({
        type,
        payload: res.data
      });

      // Redirect to profile page
      if (type === ACT_AUTH_SIGN_IN_SUCCESS) {
        history.push(`/profile/${res.data.id}`);
      }
    } catch (err) {
      //TODO: Handle error signin - tell user to retry
      console.log(err)
    }
  }
};

export const signUpWithEmailAndPassword = ({ name, email, password }, history) => {
  return async (dispatch) => {
    // Indicate is loading
    dispatch({ type: ACT_AUTH_SIGNING_UP });

    try {
      const res = await axios.post("/auth/signup", { name, email, password });

      let type;
      if (Object.keys(res.data).includes("message")) {
        type = ACT_AUTH_SIGN_UP_FAIL;
      } else {
        type = ACT_AUTH_SIGN_UP_SUCCESS;
      }

      dispatch({
        type,
        payload: res.data
      });

      // Redirect to profile page
      if (type === ACT_AUTH_SIGN_UP_SUCCESS) {
        history.push(`/profile/${res.data.id}`);
      }
    } catch (err) {
      //TODO: Handle error signin - tell user to retry
      console.log(err)
    }
  }
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      await axios.get('/auth/logout');

      dispatch({
        type: ACT_LOG_OUT
      });
    } catch (err) {
      console.log(err);
    }
  }
};
