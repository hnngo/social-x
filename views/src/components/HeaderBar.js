import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';
import { logOut, fetchUser } from '../actions';
import {
  SIGN_IN_FORM,
  SIGN_UP_FORM
} from '../constants';

const avaImgUrl = "https://lh3.googleusercontent.com/3rhgWbCOvAx946IGRbx71p02Oi6hmE7Bli7ymXCqvt9oyrhnEoYR5_stB3BZbaIAwLey2aXag06zjqqVN5OYQAyvFjMl7IhYIMZqupGV09INS3F1Tx3V02jSzpvzrUeGxuasP9aExRusY2a4hImokhQ_QYTXvtJt35Sk5ezFAZl40zTjOtCZ7iiUwnJjnQ8tE9gyKRDxz6lQcOmseEMvrXvtAkdDILUFlWDE_LXuB6CIcvnxNkjrIwm5_w7l5opNZIGlkwlY9cPMNHsmGQfjBbP3kLwf2qf1oBnGs5VMRVWXrtYUtEtNADXl2oMbMQ2-L4yoNHydPTJTcr6ra8LN8WZLcpQMwxrCl9BbxzdqRKeFO_J6EJYU5Q-DAI84us5nQOgqPjR_U7FiHTOyvRumxC0naBHKrJtLt-UKB48BkqBNpt9TwhgLOdlw4dSrpTIWxelQQpOt_iinc4mfbdt1q498g8vSxX63QdN-BNRxKL6AH5FuVX5JbhXpPRO4GbsLS99sH0mujYIZmfZm7ze3Gt7pXlq8TL7Ao4dFBypvrIVoSHROSeZrFyPMyguVjYlEWuH2n6rpNfanZbB9b14jRhtZNWULELP1UnByVHzamHRSv6knIJD_euPPnhTea5Q6csG1N-xhjLB2YWdCPChL-JUhgrn9ilA=s225-no";

const HeaderBar = (props) => {
  const [showForm, setShowForm] = useState(false);
  const { user, fetchUser } = props;

  useEffect(() => {
    fetchUser();

    if (user) {
      setShowForm(false);
    }
  }, [user, fetchUser]);

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
          <li onClick={() => props.history.push(`/profile/${props.user.id}`)}>
            <img src={avaImgUrl} alt="avatar" />
            {props.user.name}
          </li>
          <li onClick={() => props.logOut()}>
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
              <p
                onClick={() => props.history.push("/feed")}
              >Feeds</p>
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

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    isLoading: auth.isLoading
  };
}

export default withRouter(
  connect(mapStateToProps, {
    logOut,
    fetchUser
  })(HeaderBar)
);
