import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers';
import './styles/styles.css';
import './styles/bootstrap.min.css';
import './styles/animate.css';
import * as serviceWorker from './serviceWorker';

// Create redux store
let store;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, {}, composeEnhancers(
    applyMiddleware(reduxThunk)
  ));
} else {
  store = createStore(
    rootReducer,
    {},
    applyMiddleware(reduxThunk)
  );
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

serviceWorker.unregister();
