import {
  ACT_AUTH_SIGNING_IN,
  ACT_AUTH_SIGN_IN_RES
} from '../constants';

const INITIAL_STATE = {
  isLoading: false,
  user: {},
  errorMsg: ""
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case ACT_AUTH_SIGNING_IN:
      return { ...state, isLoading: true };
    case ACT_AUTH_SIGN_IN_RES:
      if (Object.keys(action.payload).includes("message")) {
        return { ...state, errorMsg: action.payload.message };
      }

      return { ...state, user: action.payload };
    default:
      return state;
  }
}
