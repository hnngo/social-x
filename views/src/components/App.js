import React from 'react';
import Homepage from './Homepage';
import Navbar from './Navbar';
import SignInForm from './forms/SignInForm';
import SingUpForm from './forms/SingUpForm';

const App = () => {
  return (
    <div>
      <Navbar />
      <Homepage />
      <SignInForm />
      <SingUpForm />
    </div>
  );
}

export default App;
