import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Navbar from './Navbar';
import ProfilePage from './profile/ProfilePage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
