import {
  ACT_POST_FETCH_ALL,
  ACT_POST_DELETE
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case ACT_POST_FETCH_ALL:
      if (action.payload.length > 0) {
        return action.payload;
      }

      return state;
    case ACT_POST_DELETE:
      const newPostArr = state.filter(p => p._id !== action.payload);

      return [...newPostArr];
    default:
      return state;
  }
};
