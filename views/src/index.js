import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers';
import './styles/styles.css';
import './styles/bootstrap.min.css';
import './styles/animate.css';
import * as serviceWorker from './serviceWorker';

// Test axios
import axios from 'axios';
window.axios = axios;

// Create redux store
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

serviceWorker.unregister();
