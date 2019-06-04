import {
  ACT_PROFILE_FETCH_BY_USERID,
  ACT_POST_UPLOAD,
  ACT_POST_DELETE
} from '../constants';

export default (state = {}, action) => {
  if (action.payload && Object.keys(action.payload).includes("message")) {
    return state;
  }

  switch (action.type) {
    case ACT_PROFILE_FETCH_BY_USERID:
      return action.payload;
    case ACT_POST_UPLOAD:
      return { ...state, post: [action.payload, ...state.post] };
    case ACT_POST_DELETE:
      const newPostArr = state.post.filter(p => p._id !== action.payload);

      return  { ...state, post: newPostArr };
    default:
      return state;
  }
};
