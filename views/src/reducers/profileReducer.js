import {
  ACT_PROFILE_FETCH_BY_USERID,
  ACT_POST_UPLOAD
} from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case ACT_PROFILE_FETCH_BY_USERID:
      if (!Object.keys(action.payload).includes("message")) {
        return action.payload;
      }

      return state;
    case ACT_POST_UPLOAD:
      if (!Object.keys(action.payload).includes("message")) {
        return { ...state, post: [action.payload, ...state.post] };
      }

      return state;
    default:
      return state;
  }
};
