import React, { useState } from 'react';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SingUpForm';
import {
  SIGN_IN_FORM,
  SIGN_UP_FORM
} from '../constants';

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  const renderForm = () => {
    if (showForm === SIGN_IN_FORM) {
      return (
        <div className="nav-sin-form animated fadeIn slow">
          <SignInForm
            handleExitForm={() => setShowForm(false)}
            handleSwitchForm={(type) => setShowForm(type)}
          />
        </div>
      );
    } else if (showForm === SIGN_UP_FORM) {
      return (
        <div className="nav-sin-form animated fadeIn slow">
          <SignUpForm
            handleExitForm={() => setShowForm(false)}
            handleSwitchForm={(type) => setShowForm(type)}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }

  return (
    <div className="nav-container">
      <div className="nav-response">
        <div className="nav-brand">
          <p>Social X</p>
        </div>
        <div className="nav-link d-none d-sm-block">
          <ul>
            <li
              onClick={() => setShowForm(SIGN_IN_FORM)}
            >Sign In</li>
            <li
              onClick={() => setShowForm(SIGN_UP_FORM)}
            >Sign Up</li>
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
      {renderForm()}
    </div>
  );
};

export default Navbar;
