import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import Homepage from './Homepage';
import ProfilePage from './profile/ProfilePage';
import FeedPage from './FeedPage';
import { saveSocket } from '../actions';
import PageNotFound from './PageNotFound';

const App = (props) => {
  const { saveSocket } = props;

  useEffect(() => {
    // Connect to socket IO app
    const socket = socketIOClient(process.env.REACT_APP_ROOT_URL);

    // Save socket info when first loading up
    saveSocket(socket);

    return () => socket.close();
  }, [saveSocket])

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/feed" component={FeedPage} />
          <Route path="/profile/:userId" component={ProfilePage}/>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default connect(null, { saveSocket })(App);
