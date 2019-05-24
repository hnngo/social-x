import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInWithEmailAndPassword } from '../../actions';

const SignInForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit(props.signInWithEmailAndPassword)}>
        <div>
          <label>Email</label>
          <div>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="email"
            />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="password"
            />
          </div>
        </div>
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
