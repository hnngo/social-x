import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InputField from './InputField';
import { SIGN_IN_FORM } from '../../constants';
import ErrorMsg from './ErrorMsg';
import valid from './validate';
import {
  signUpWithEmailAndPassword,
  clearErrMsg
} from '../../actions';

const SignUpForm = (props) => {
  const { clearErrMsg } = props;
  useEffect(() => {
    clearErrMsg();
  }, [clearErrMsg]);

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
          validate={valid.isNotNull}
          icon={"fas fa-user"}
        />
        <Field
          name="email"
          component={InputField}
          type="email"
          placeholder="email@test.com"
          validate={valid.isEmail}
          icon={"fas fa-envelope"}
        />
        <Field
          name="password"
          component={InputField}
          type="password"
          placeholder="password"
          validate={valid.minLength6}
          icon={"fas fa-key"}
        />
        <Field
          name="cfpassword"
          component={InputField}
          type="password"
          placeholder="confirm password"
          validate={valid.minLength6}
          icon={"fas fa-key"}
        />
        <ErrorMsg />
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
      signUpWithEmailAndPassword,
      clearErrMsg
    })(SignUpForm)
  )
);
