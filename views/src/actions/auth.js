import axios from 'axios';
import {
  ACT_AUTH_SIGNING_IN,
  ACT_AUTH_SIGN_IN_SUCCESS,
  ACT_AUTH_SIGN_IN_FAIL,
  ACT_AUTH_SIGNING_UP,
  ACT_AUTH_SIGN_UP_FAIL,
  ACT_AUTH_SIGN_UP_SUCCESS
} from '../constants';

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
        history.push('/profile')
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
        history.push('/profile/')
      }
    } catch (err) {
      //TODO: Handle error signin - tell user to retry
      console.log(err)
    }
  }
};

//TODO: Redirect to /profile/id
