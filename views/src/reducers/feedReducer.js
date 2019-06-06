import _ from 'lodash';
import {
  ACT_POST_FETCH_ALL,
  ACT_POST_DELETE_F,
  ACT_POST_UPDATE_F,
  ACT_POST_LIKE_F
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case ACT_POST_FETCH_ALL:
      if (action.payload.length > 0) {
        return action.payload;
      }

      return state;
    case ACT_POST_DELETE_F:
      {
        const newPostArr = state.filter(p => p._id !== action.payload);

        return [...newPostArr];
      }
    case ACT_POST_UPDATE_F:
      {
        const oldPostIndex = _.findIndex(state, ['_id', action.payload._id]);
        const newPostArr = [...state];
        newPostArr[oldPostIndex] = action.payload;

        return newPostArr;
      }
    case ACT_POST_LIKE_F:
      {
        const oldPostIndex = _.findIndex(state, ['_id', action.payload.postId]);
        const newPostArr = [...state];

        // Check if like or unlike
        if (newPostArr[oldPostIndex].likes.who.includes(action.payload.userId)) {
          _.remove(newPostArr[oldPostIndex].likes.who, (n) => n === action.payload.userId);
          newPostArr[oldPostIndex].likes.total -= 1;
        } else {
          newPostArr[oldPostIndex].likes.who.push(action.payload.userId)
          newPostArr[oldPostIndex].likes.total += 1;
        }
        
        return newPostArr;
      }
    default:
      return state;
  }
};
