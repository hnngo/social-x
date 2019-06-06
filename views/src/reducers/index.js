import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import feedReducer from './feedReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  feed: feedReducer,
  profile: profileReducer
});
