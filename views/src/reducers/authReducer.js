import {
  ACT_FETCH_USER,
  ACT_AUTH_SIGNING_IN,
  ACT_AUTH_SIGN_IN_FAIL,
  ACT_AUTH_SIGN_IN_SUCCESS,
  ACT_AUTH_SIGNING_UP,
  ACT_AUTH_SIGN_UP_FAIL,
  ACT_AUTH_SIGN_UP_SUCCESS
} from '../constants';

const INITIAL_STATE = {
  isLoading: false,
  user: null,
  errorMsg: ""
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case ACT_AUTH_SIGNING_IN:
    case ACT_AUTH_SIGNING_UP:
      return { ...state, isLoading: true };
    case ACT_AUTH_SIGN_IN_FAIL:
    case ACT_AUTH_SIGN_UP_FAIL:
      return { ...INITIAL_STATE, errorMsg: action.payload.message };
    case ACT_AUTH_SIGN_IN_SUCCESS:
    case ACT_AUTH_SIGN_UP_SUCCESS:
    case ACT_FETCH_USER:
      if (action.payload) {
        return { ...INITIAL_STATE, user: action.payload };
      }
      
      return { ...state };
    default:
      return state;
  }
}
