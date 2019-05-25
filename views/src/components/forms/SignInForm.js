import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInWithEmailAndPassword } from '../../actions';
import InputField from './InputField';

// Validate process
const isEmail = value =>
value && /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
  ? undefined :'Invalid email address';
const minLength = value => value && value.length >= 6 ? undefined : `Must be 6 characters or more`;

const SignInForm = (props) => {
  return (
    <div className="sin-form-container">
      <p>Sign In</p>
      <form onSubmit={props.handleSubmit(props.signInWithEmailAndPassword)}>
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
        <button type="submit">
          Sign In
        </button>
        <div className="google-btn">
          Login with Google
        </div>
        <div className="sin-sup-switch">
          New user? Click here to sign up
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'signin'
})(connect(null, {
  signInWithEmailAndPassword
})(SignInForm));
