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
    <div>
      <form onSubmit={props.handleSubmit(props.signInWithEmailAndPassword)}>
        <Field
          label="Email"
          name="email"
          component={InputField}
          type="email"
          placeholder="email"
          validate={isEmail}
        />
        <Field
          label="Password"
          name="password"
          component={InputField}
          type="password"
          placeholder="password"
          validate={minLength}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'signin'
})(connect(null, {
  signInWithEmailAndPassword
})(SignInForm));
