import React from 'react';
import SignInForm from './forms/SignInForm';

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="nav-response">
        <div className="nav-brand">
          <p>Social X</p>
        </div>
        <div className="nav-link d-none d-sm-block">
          <ul>
            <li>Sign In</li>
            <li>Sign Up</li>
          </ul>
        </div>
        <div className="nav-small-container d-block d-sm-none">
          <i className="fas fa-bars" />
          <div className="nav-small-btn">
            <div>
              <p>Sign In</p>
            </div>
            <div>
              <p>Sign Up</p>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-sin-form">
        <SignInForm />
      </div>
    </div>
  );
};

export default Navbar;
