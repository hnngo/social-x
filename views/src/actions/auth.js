import axios from 'axios';
import {
  ACT_AUTH_SIGNING_IN,
  ACT_AUTH_SIGN_IN_RES
} from '../constants';

export const signInWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    // Indicate is loading
    dispatch({ type: ACT_AUTH_SIGNING_IN });

    try {
      const res = await axios.post("/auth/signin", { email, password });

      dispatch({
        type: ACT_AUTH_SIGN_IN_RES,
        payload: res.data
      });
    } catch(err) {
      //TODO: Handle error signin - tell user to retry
      console.log(err)
    }
  }
};

export const signUpWithEmailAndPassword = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/auth/signup", { name, email, password });

      console.log(res.data)
      dispatch({
        type: "User",
        payload: res.data
      })
    } catch(err) {
      //TODO: Handle error signin - tell user to retry
      console.log(err)
    }
  }
};
