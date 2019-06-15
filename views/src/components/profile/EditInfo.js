import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import EditInfoForm from '../forms/EditInfoForm';
import UploadingLayout from '../posts/UploadingLayout';

const EditInfo = (props) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const { profile, discardEdit, auth } = props;

  useEffect(() => {
    if ((!profile.updatingProfile && isUpdating) || !auth.user) {
      discardEdit();
    }
  }, [
      profile.updatingProfile,
      discardEdit,
      isUpdating,
      auth.user
    ]
  );

  return (
    <div className="edit-container">
      <p className="edit-title">Edit Information</p>
      <EditInfoForm
        discardEdit={() => discardEdit()}
        OnUpdating={() => setIsUpdating(true)}
      />
      {
        isUpdating ?
          <UploadingLayout />
          :
          <div />
      }
    </div>
  );
}

const mapStateToProps = ({ auth, profile }) => {
  return ({ auth, profile });
}

export default connect(mapStateToProps)(EditInfo);
