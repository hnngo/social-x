import React, { useState } from 'react';
import { connect } from 'react-redux';
import EditInfoForm from '../forms/EditInfoForm';

const EditInfo = (props) => {
  const { profile } = props;

  return (
    <div className="edit-container">
      <p className="edit-title">Edit Information</p>
      <EditInfoForm />
    </div>
  );
}

const mapStateToProps = ({ profile }) => {
  return ({ profile });
}

export default connect(mapStateToProps)(EditInfo);
