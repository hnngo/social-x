import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import ProfilePage from './profile/ProfilePage';
import FeedPage from './feed/FeedPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/feed" component={FeedPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
