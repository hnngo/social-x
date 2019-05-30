import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signUpWithEmailAndPassword } from '../../actions';
import InputField from './InputField';
import { SIGN_IN_FORM } from '../../constants';

// Validate process
const isNotNull = value => value ? undefined : "Please enter the field"
const isEmail = value =>
  value && /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    ? undefined : "Invalid email address";
const minLength = value => value && value.length >= 6 ? undefined : `Must be 6 characters or more`;

const SignUpForm = (props) => {
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
      <p>Sign Up</p>
      <form onSubmit={props.handleSubmit(() => props.signUpWithEmailAndPassword(props.formValues, props.history))}>
        <Field
          name="name"
          component={InputField}
          type="text"
          placeholder="your name"
          validate={isNotNull}
          icon={"fas fa-user"}
        />
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
        <Field
          name="cfpassword"
          component={InputField}
          type="password"
          placeholder="confirm password"
          validate={minLength}
          icon={"fas fa-key"}
        />
        <button type="submit">
          Confirm
        </button>
        <div
          className="sin-sup-switch"
          onClick={() => props.handleSwitchForm(SIGN_IN_FORM)}
        >
          Back to sign in
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

const validate = (values) => {
  const errors = {};

  if (values.password !== values.cfpassword) {
    errors.cfpassword = "Confirm password is not match"
  }

  return errors;
}

const mapStateToProps = ({ form }) => {
  if (form.signup) {
    return { formValues: form.signup.values };
  }

  return {};
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  withRouter(
    connect(mapStateToProps, {
      signUpWithEmailAndPassword
    })(SignUpForm)
  )
);