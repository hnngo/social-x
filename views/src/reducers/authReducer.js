import _ from 'lodash';
import {
  ACT_SAVE_SOCKET,
  ACT_FETCH_USER,
  ACT_CLEAR_ERROR_MSG,
  ACT_AUTH_SIGNING_IN,
  ACT_AUTH_SIGN_IN_FAIL,
  ACT_AUTH_SIGN_IN_SUCCESS,
  ACT_AUTH_SIGNING_UP,
  ACT_AUTH_SIGN_UP_FAIL,
  ACT_AUTH_SIGN_UP_SUCCESS,
  ACT_LOG_OUT,
  ACT_FRIEND_SEND_REQUEST
} from '../constants';

const INITIAL_STATE = {
  isLoading: false,
  user: null,
  errorMsg: null,
  socketInfo: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACT_SAVE_SOCKET:
      return { ...state, socketInfo: action.payload };
    case "@@redux-form/CHANGE":
    case ACT_CLEAR_ERROR_MSG:
      return { ...state, errorMsg: null }
    case ACT_AUTH_SIGNING_IN:
    case ACT_AUTH_SIGNING_UP:
      return { ...state, isLoading: true };
    case ACT_AUTH_SIGN_IN_FAIL:
    case ACT_AUTH_SIGN_UP_FAIL:
      return { ...INITIAL_STATE, errorMsg: action.payload.message, socketInfo: state.socketInfo };
    case ACT_AUTH_SIGN_IN_SUCCESS:
    case ACT_AUTH_SIGN_UP_SUCCESS:
    case ACT_FETCH_USER:
      if (action.payload && !_.isEqual(state.user, action.payload)) {
        // Emit info to server socket for storing authentication
        if (state.socketInfo) {
          state.socketInfo.emit('signIn', action.payload.id);
        }

        return { ...INITIAL_STATE, user: action.payload, socketInfo: state.socketInfo };
      }

      return state;
    case ACT_LOG_OUT:
      if (state.socketInfo) {
        state.socketInfo.emit('signOut');
      }

      return { ...INITIAL_STATE, socketInfo: state.socketInfo };
    case ACT_FRIEND_SEND_REQUEST:
      {
        const updatedUser = state.user;

        // Add friendId to requestTo
        updatedUser.friend.requestToList.push(action.payload);

        return { ...state, user: updatedUser };
      }
    default:
      return state;
  }
}
