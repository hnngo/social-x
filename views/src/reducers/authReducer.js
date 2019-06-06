import _ from 'lodash';
import {
  ACT_FETCH_USER,
  ACT_CLEAR_ERROR_MSG,
  ACT_AUTH_SIGNING_IN,
  ACT_AUTH_SIGN_IN_FAIL,
  ACT_AUTH_SIGN_IN_SUCCESS,
  ACT_AUTH_SIGNING_UP,
  ACT_AUTH_SIGN_UP_FAIL,
  ACT_AUTH_SIGN_UP_SUCCESS,
  ACT_LOG_OUT
} from '../constants';

const INITIAL_STATE = {
  isLoading: false,
  user: null,
  errorMsg: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "@@redux-form/CHANGE":
    case ACT_CLEAR_ERROR_MSG:
      return { ...state, errorMsg: null }
    case ACT_AUTH_SIGNING_IN:
    case ACT_AUTH_SIGNING_UP:
      return { ...state, isLoading: true };
    case ACT_AUTH_SIGN_IN_FAIL:
    case ACT_AUTH_SIGN_UP_FAIL:
      return { ...INITIAL_STATE, errorMsg: action.payload.message };
    case ACT_AUTH_SIGN_IN_SUCCESS:
    case ACT_AUTH_SIGN_UP_SUCCESS:
    case ACT_FETCH_USER:
      if (action.payload && !_.isEqual(state.user, action.payload)) {
        return { ...INITIAL_STATE, user: action.payload };
      }
      
      return state;
    case ACT_LOG_OUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
