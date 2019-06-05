import _ from 'lodash';
import {
  ACT_POST_FETCH_ALL,
  ACT_POST_DELETE,
  ACT_POST_UPDATE,
  ACT_POST_LIKE
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case ACT_POST_FETCH_ALL:
      if (action.payload.length > 0) {
        return action.payload;
      }

      return state;
    case ACT_POST_DELETE:
      {
        const newPostArr = state.filter(p => p._id !== action.payload);

        return [...newPostArr];
      }
    case ACT_POST_UPDATE:
    case ACT_POST_LIKE:
      {
        console.log(action.payload.user)
        const oldPostIndex = _.findIndex(state, ['_id', action.payload._id]);
        const newPostArr = [...state];
        newPostArr[oldPostIndex] = action.payload;
        console.log(state, newPostArr)
        return newPostArr;
      }
    default:
      return state;
  }
};
