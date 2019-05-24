import React from 'react';
import Homepage from './Homepage';
import Navbar from './Navbar';
import SignInForm from './forms/SignInForm';

const App = () => {
  return (
    <div>
      {/* Image Slide here */}
      <Navbar />
      <SignInForm />
      <Homepage />
    </div>
  );
}

export default App;
