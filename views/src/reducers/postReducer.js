import {
  ACT_POST_FETCH_ALL
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case ACT_POST_FETCH_ALL:
      if (action.payload.length > 0) {
        return action.payload;
      }

      return state;
    default:
      return state;
  }
};
