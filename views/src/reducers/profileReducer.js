import {
  ACT_PROFILE_FETCH_BY_USERID
} from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case ACT_PROFILE_FETCH_BY_USERID:
      if (!Object.keys(action.payload).includes("message")) {
        return action.payload;
      }
      
      return state;
    default:
      return state;
  }
};
