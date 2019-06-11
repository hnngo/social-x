import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';
import { logOut, fetchUser } from '../actions';
import {
  SIGN_IN_FORM,
  SIGN_UP_FORM
} from '../constants';
import imageUrl from '../imgURL.json';

const HeaderBar = (props) => {
  const [showForm, setShowForm] = useState(false);
  const { user, fetchUser, profile } = props;

  useEffect(() => {
    fetchUser();

    if (user) {
      setShowForm(false);
    }
  }, [user, fetchUser, profile]);

  const renderForm = () => {
    if (showForm === SIGN_IN_FORM) {
      return (
        <div className="animated fadeIn">
          <SignInForm
            handleExitForm={() => setShowForm(false)}
            handleSwitchForm={(type) => setShowForm(type)}
            isLoading={props.isLoading}
          />
        </div>
      );
    } else if (showForm === SIGN_UP_FORM) {
      return (
        <div className="animated fadeIn">
          <SignUpForm
            handleExitForm={() => setShowForm(false)}
            handleSwitchForm={(type) => setShowForm(type)}
            isLoading={props.isLoading}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }

  const renderContent = () => {
    if (props.user) {
      return (
        <ul>
          <li>
            <a href={`/profile/${props.user.id}`}>
              <img src={`/image/${props.user.avatar}`} alt="avatar" />
              {props.user.name}
            </a>
          </li>
          <li onClick={
            () => {
              props.logOut();

              // Sign out for profile page
              if (props.onSignOut) {
                props.onSignOut();
              }
            }
          }>
            Sign Out
          </li>
        </ul>
      );
    } else {
      return (
        <ul style={{ marginTop: "13px" }}>
          <li onClick={() => setShowForm(SIGN_IN_FORM)}>
            Sign In
          </li>
          <li onClick={() => setShowForm(SIGN_UP_FORM)}>
            Sign Up
          </li>
        </ul>
      );
    }
  }

  return (
    <div>
      <div className="hb-background">
        <div className="container">
          <div className="hb-container">
            <div className="hb-rootname">
              <a
                href="/feed"
              >
                <img src={imageUrl.logoImage} alt="logo"/>
              </a>
            </div>
            <div className="hb-auth-features">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      {renderForm()}
    </div>
  );
};

const mapStateToProps = ({ auth, profile }) => {
  return {
    user: auth.user,
    isLoading: auth.isLoading,
    profile
  };
}

export default connect(mapStateToProps, {
  logOut,
  fetchUser
})(HeaderBar);
