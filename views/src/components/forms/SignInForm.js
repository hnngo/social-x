import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../../actions';
import InputField from './InputField';
import { SIGN_UP_FORM } from '../../constants';

// Validate process
const isEmail = value =>
  value && /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    ? undefined : 'Invalid email address';
const minLength = value => value && value.length >= 6 ? undefined : `Must be 6 characters or more`;

const SignInForm = (props) => {
  const renderLoading = () => {
    if (props.isLoading) {
      return (
        <div className="form-loading">
          <div className="spinner-container">
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  return (
    <div className="sin-sup-form-container">
      <p>Sign In</p>
      <form onSubmit={props.handleSubmit(() => props.signInWithEmailAndPassword(props.formValues, props.history))}>
        <Field
          name="email"
          component={InputField}
          type="email"
          placeholder="email@test.com"
          validate={isEmail}
          icon={"fas fa-envelope"}
        />
        <Field
          name="password"
          component={InputField}
          type="password"
          placeholder="password"
          validate={minLength}
          icon={"fas fa-key"}
        />
        <button
          type="submit"
        >
          Sign In
        </button>
        <div className="google-btn">
          <i className="fab fa-google" />
          Sign in with Google
        </div>
        <div
          className="sin-sup-switch"
          onClick={() => props.handleSwitchForm(SIGN_UP_FORM)}
        >
          New user? Click here to sign up
        </div>
        <div
          className="form-exit"
          onClick={props.handleExitForm}
        >
          <i className="fas fa-times" />
        </div>
      </form>
      {renderLoading()}
    </div>
  );
};

const mapStateToProps = ({ form }) => {
  if (form.signin) {
    return { formValues: form.signin.values };
  }

  return {};
}

export default reduxForm({
  form: 'signin'
})(
  withRouter(
    connect(mapStateToProps, {
      signInWithEmailAndPassword
    })(SignInForm)
  )
);
