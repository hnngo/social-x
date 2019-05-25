import axios from 'axios';
import { SIGN_IN_WITH_EMAIL_AND_PWD } from './type';

export const signInWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/auth/signin", { email, password });

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
