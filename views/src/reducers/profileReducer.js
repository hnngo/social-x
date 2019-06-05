import _ from 'lodash';
import {
  ACT_PROFILE_FETCH_BY_USERID,
  ACT_POST_UPLOAD,
  ACT_POST_DELETE,
  ACT_POST_UPDATE,
  ACT_POST_LIKE
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
      {
        const newPostArr = state.post.filter(p => p._id !== action.payload);

        return { ...state, post: newPostArr };
      }
    case ACT_POST_UPDATE:
    case ACT_POST_LIKE:
      {
        const oldPostIndex = _.findIndex(state.post, ['_id', action.payload._id]);
        const newPostArr = [...state.post];
        newPostArr[oldPostIndex] = action.payload;
        newPostArr[oldPostIndex].user = newPostArr[oldPostIndex].user._id;

        return { ...state, post: newPostArr };
      }
    default:
      return state;
  }
};
