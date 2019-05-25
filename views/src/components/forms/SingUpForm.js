import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUpWithEmailAndPassword } from '../../actions';
import InputField from './InputField';

// Validate process
const isNotNull = value => value ? undefined : "Please enter the field"
const isEmail = value =>
  value && /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    ? undefined : "Invalid email address";
const minLength = value => value && value.length >= 6 ? undefined : `Must be 6 characters or more`;

const SignUpForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit(props.signUpWithEmailAndPassword)}>
        <Field
          label="Name"
          name="name"
          component={InputField}
          type="text"
          placeholder="name"
          validate={isNotNull}
        />
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
        <Field
          label="Confirm Password"
          name="cfpassword"
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

const validate = (values) => {
  const errors = {};

  if (values.password !== values.cfpassword) {
    errors.cfpassword = "Confirm password is not match"
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'signup'
})(connect(null, {
  signUpWithEmailAndPassword
})(SignUpForm));
