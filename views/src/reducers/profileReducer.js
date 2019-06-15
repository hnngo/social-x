import _ from 'lodash';
import {
  ACT_PROFILE_FETCH_BY_USERID,
  ACT_PROFILE_FETCH_FAIL,
  ACT_PROFILE_UPDATE,
  ACT_PROFILE_UPDATING,
  ACT_POST_UPLOAD,
  ACT_POST_DELETE_P,
  ACT_POST_UPDATE_P,
  ACT_POST_LIKE_P,
  ACT_CMT_DELTE_P,
  ACT_CMT_UPLOAD_P,
  ACT_CMT_UPLOADING_P,
  ACT_FRIEND_SEND_REQUEST_P,
  ACT_FRIEND_CANCEL_REQUEST,
  ACT_FRIEND_CANCEL_REQUEST_P,
  ACT_FRIEND_ACCEPT_REQUEST,
  ACT_FRIEND_ACCEPT_REQUEST_P,
  ACT_FRIEND_DECLINE_REQUEST,
  ACT_FRIEND_DECLINE_REQUEST_P,
  ACT_FRIEND_UNFRIEND
} from '../constants';

export default (state = {}, action) => {
  if (action.payload && Object.keys(action.payload).includes("message")) {
    return state;
  }

  switch (action.type) {
    case ACT_PROFILE_FETCH_BY_USERID:
      return action.payload;
    case ACT_PROFILE_FETCH_FAIL:
      return { ...state, fetchFail: true };
    case ACT_POST_UPLOAD:
      return { ...state, post: [action.payload, ...state.post] };
    case ACT_POST_DELETE_P:
      {
        const newPostArr = state.post.filter(p => p._id !== action.payload);

        return { ...state, post: newPostArr };
      }
    case ACT_POST_UPDATE_P:
      {
        const oldPostIndex = _.findIndex(state.post, ['_id', action.payload._id]);
        const newPostArr = [...state.post];
        newPostArr[oldPostIndex] = action.payload;
        newPostArr[oldPostIndex].user = newPostArr[oldPostIndex].user._id;

        return { ...state, post: newPostArr };
      }
    case ACT_POST_LIKE_P:
      {
        const oldPostIndex = _.findIndex(state.post, ['_id', action.payload.postId]);
        const newPostArr = [...state.post];

        // Check if like or unlike
        if (newPostArr[oldPostIndex].likes.who.includes(action.payload.userId)) {
          _.remove(newPostArr[oldPostIndex].likes.who, (n) => n === action.payload.userId);
          newPostArr[oldPostIndex].likes.total -= 1;
        } else {
          newPostArr[oldPostIndex].likes.who.push(action.payload.userId)
          newPostArr[oldPostIndex].likes.total += 1;
        }

        return { ...state, post: newPostArr };
      }
    case ACT_CMT_DELTE_P:
      {
        const oldPostIndex = _.findIndex(state.post, ['_id', action.payload.postId]);
        const newPostArr = [...state.post];

        const newCmtArr = newPostArr[oldPostIndex].comments.content.filter(c => c._id.toString() !== action.payload.commentId);
        newPostArr[oldPostIndex].comments.content = newCmtArr;
        newPostArr[oldPostIndex].comments.total -= 1;

        return { ...state, post: newPostArr };
      }
    case ACT_CMT_UPLOADING_P:
      {
        const oldPostIndex = _.findIndex(state.post, ['_id', action.payload]);
        const newPostArr = [...state.post];

        newPostArr[oldPostIndex].isUploadingCmt = true;


        return { ...state, post: newPostArr };
      }
    case ACT_CMT_UPLOAD_P:
      {
        const oldPostIndex = _.findIndex(state.post, ['_id', action.payload._id]);
        const newPostArr = [...state.post];

        newPostArr[oldPostIndex] = action.payload;

        return { ...state, post: newPostArr, isUploadingCmt: false };
      }
    case ACT_PROFILE_UPDATE:
      return { ...action.payload, updatingProfile: false };
    case ACT_PROFILE_UPDATING:
      return { ...state, updatingProfile: true };
    case ACT_FRIEND_SEND_REQUEST_P:
      return { ...state, friend: action.payload.friend };
    case ACT_FRIEND_CANCEL_REQUEST_P:
      {
        const newFriendList = state.friend;

        // Remove friend request
        _.remove(newFriendList.requestFromList, (f) => f._id === action.payload);

        return { ...state, friend: newFriendList };
      }
    case ACT_FRIEND_CANCEL_REQUEST:
      {
        const newFriendList = state.friend;

        // Remove friend request
        _.remove(newFriendList.requestToList, (f) => f._id === action.payload);

        return { ...state, friend: newFriendList };
      }
    case ACT_FRIEND_ACCEPT_REQUEST:
      {
        const newFriendList = state.friend;

        // Remove friend request in RequestToList and add to Friend list
        _.remove(newFriendList.requestFromList, (f) => f._id === action.payload._id);
        newFriendList.list.push(action.payload);

        return { ...state, friend: newFriendList };
      }
    case ACT_FRIEND_ACCEPT_REQUEST_P:
      {
        const newFriendList = state.friend;

        // Remove friend request in RequestToList and add to Friend list
        const addedUser = _.remove(newFriendList.requestToList, (f) => f._id === action.payload);
        newFriendList.list.push(addedUser[0]);

        return { ...state, friend: newFriendList };
      }
    case ACT_FRIEND_DECLINE_REQUEST:
      {
        const newFriendList = state.friend;

        // Remove friend request in RequestToList
        _.remove(newFriendList.requestFromList, (f) => f._id === action.payload);

        return { ...state, friend: newFriendList };
      }
    case ACT_FRIEND_DECLINE_REQUEST_P:
      {
        const newFriendList = state.friend;

        // Remove friend request in RequestToList
        _.remove(newFriendList.requestToList, (f) => f._id === action.payload);

        return { ...state, friend: newFriendList };
      }
    case ACT_FRIEND_UNFRIEND:
      {
        const newFriendList = state.friend;

        // Remove friend request in RequestToList
        _.remove(newFriendList.list, (f) => f._id === action.payload);

        return { ...state, friend: newFriendList };
      }
    default:
      return state;
  }
};
