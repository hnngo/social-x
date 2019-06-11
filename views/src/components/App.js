import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import ProfilePage from './profile/ProfilePage';
import FeedPage from './FeedPage';
import socketIOClient from 'socket.io-client';
 
const App = () => {
  // Connect to socket IO app
  socketIOClient(process.env.REACT_APP_ROOT_URL);

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/feed" component={FeedPage} />
          <Route path="/profile/:userId" component={ProfilePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
