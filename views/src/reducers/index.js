import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  post: postReducer,
  profile: profileReducer
});
