import React from 'react';
import { connect } from 'react-redux';

const ErrorMsg = (props) => {
  if (props.auth.errorMsg) {
    return (
      <p className="form-errmsg animated shake">{props.auth.errorMsg}</p>
    );
  }

  return <div />;
};

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(ErrorMsg);
