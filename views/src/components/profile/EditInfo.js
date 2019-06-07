import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import EditInfoForm from '../forms/EditInfoForm';

const EditInfo = (props) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const { profile, discardEdit } = props;

  useEffect(() => {
    if (!profile.updatingProfile && isUpdating) {
      discardEdit();
    }
  }, [profile.updatingProfile, discardEdit, isUpdating])

  return (
    <div className="edit-container">
      <p className="edit-title">Edit Information</p>
      <EditInfoForm
        discardEdit={() => discardEdit()}
        OnUpdating={() => setIsUpdating(true)}
      />
      {
        isUpdating ?
          <div className="updating-loading">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          :
          <div />
      }
    </div>
  );
}

const mapStateToProps = ({ profile }) => {
  return ({ profile });
}

export default connect(mapStateToProps)(EditInfo);
